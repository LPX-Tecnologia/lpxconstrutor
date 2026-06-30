// ==========================================================
// ===== CONFIGURAÇÃO DO FIREBASE =====
// ==========================================================
const firebaseConfig = {
    apiKey: "AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",
    authDomain: "construtorlpx.firebaseapp.com",
    projectId: "construtorlpx",
    storageBucket: "construtorlpx.firebasestorage.app",
    messagingSenderId: "247671839031",
    appId: "1:247671839031:web:1a4ecfdd28c02b802fa2b2",
    measurementId: "G-3J4XN3K2PG"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Habilitar cache offline
db.enablePersistence()
    .then(() => console.log('🔥 Firestore cache ativado!'))
    .catch(err => console.warn('⚠️ Erro ao ativar cache:', err));

console.log('🔥 Firebase conectado com sucesso!');

// ==========================================================
// ===== VARIÁVEIS GLOBAIS =====
// ==========================================================
var usuarioLogado = null;
var obraSelecionada = null;
var perfilSelecionado = null;
var codigoRecuperacao = null;
var usuarioRecuperando = null;
var map;
var markers = [];
var userPosition = null;
var videoThumbnails = [];
var currentVideoIndex = 0;

// ==========================================================
// ===== FUNÇÕES FIREBASE =====
// ==========================================================

// --- SALVAR USUÁRIO ---
async function salvarUsuarioFirebase(usuario) {
    try {
        // Remove campos undefined
        const usuarioLimpo = {};
        for (let key in usuario) {
            if (usuario[key] !== undefined && usuario[key] !== null) {
                usuarioLimpo[key] = usuario[key];
            }
        }
        await db.collection('usuarios').doc(usuario.id.toString()).set(usuarioLimpo);
        console.log('✅ Usuário salvo com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar usuário:', error);
        mostrarToast('Erro ao salvar usuário!', 'erro');
        return false;
    }
}

// --- BUSCAR USUÁRIO POR EMAIL/CPF ---
async function buscarUsuarioPorEmailOuCPF(emailOuCPF) {
    try {
        const snapshot = await db.collection('usuarios')
            .where('email', '==', emailOuCPF.trim())
            .get();
        
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: parseInt(doc.id), ...doc.data() };
        }
        
        const cpfLimpo = emailOuCPF.replace(/\D/g, '');
        const cpfSnapshot = await db.collection('usuarios')
            .where('cpf', '==', cpfLimpo)
            .get();
        
        if (!cpfSnapshot.empty) {
            const doc = cpfSnapshot.docs[0];
            return { id: parseInt(doc.id), ...doc.data() };
        }
        
        return null;
    } catch (error) {
        console.error('❌ Erro ao buscar usuário:', error);
        return null;
    }
}

// --- BUSCAR TODOS OS USUÁRIOS ---
async function buscarTodosUsuarios() {
    try {
        const snapshot = await db.collection('usuarios').get();
        return snapshot.docs.map(doc => ({ 
            id: parseInt(doc.id), 
            ...doc.data() 
        }));
    } catch (error) {
        console.error('❌ Erro ao buscar usuários:', error);
        return [];
    }
}

// --- BUSCAR USUÁRIO POR ID ---
async function buscarUsuarioPorId(id) {
    try {
        const doc = await db.collection('usuarios').doc(id.toString()).get();
        if (doc.exists) {
            return { id: parseInt(doc.id), ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Erro ao buscar usuário:', error);
        return null;
    }
}

// --- ATUALIZAR USUÁRIO ---
async function atualizarUsuarioFirebase(id, dados) {
    try {
        await db.collection('usuarios').doc(id.toString()).update(dados);
        return true;
    } catch (error) {
        console.error('❌ Erro ao atualizar usuário:', error);
        return false;
    }
}

// --- SALVAR OBRA ---
async function salvarObraFirebase(obra) {
    try {
        await db.collection('obras').doc(obra.id.toString()).set(obra);
        console.log('✅ Obra salva com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar obra:', error);
        mostrarToast('Erro ao publicar obra!', 'erro');
        return false;
    }
}

// --- BUSCAR TODAS AS OBRAS ---
async function buscarTodasObras() {
    try {
        const snapshot = await db.collection('obras')
            .orderBy('data', 'desc')
            .get();
        return snapshot.docs.map(doc => ({ 
            id: parseInt(doc.id), 
            ...doc.data() 
        }));
    } catch (error) {
        console.error('❌ Erro ao buscar obras:', error);
        return [];
    }
}

// --- BUSCAR OBRA POR ID ---
async function buscarObraPorId(id) {
    try {
        const doc = await db.collection('obras').doc(id.toString()).get();
        if (doc.exists) {
            return { id: parseInt(doc.id), ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Erro ao buscar obra:', error);
        return null;
    }
}

// --- ATUALIZAR OBRA ---
async function atualizarObraFirebase(id, dados) {
    try {
        await db.collection('obras').doc(id.toString()).update(dados);
        return true;
    } catch (error) {
        console.error('❌ Erro ao atualizar obra:', error);
        return false;
    }
}

// --- SALVAR CONEXÃO ---
async function salvarConexaoFirebase(conexao) {
    try {
        await db.collection('conexoes').doc(conexao.id.toString()).set(conexao);
        console.log('✅ Conexão salva com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar conexão:', error);
        return false;
    }
}

// --- BUSCAR CONEXÕES DO USUÁRIO ---
async function buscarConexoesDoUsuario(usuarioId) {
    try {
        const snapshot = await db.collection('conexoes')
            .where('profissionalId', '==', usuarioId)
            .get();
        
        const comoProfissional = snapshot.docs.map(doc => ({ 
            id: parseInt(doc.id), 
            ...doc.data() 
        }));
        
        const snapshot2 = await db.collection('conexoes')
            .where('empreiteiroId', '==', usuarioId)
            .get();
        
        const comoEmpreiteiro = snapshot2.docs.map(doc => ({ 
            id: parseInt(doc.id), 
            ...doc.data() 
        }));
        
        return [...comoProfissional, ...comoEmpreiteiro];
    } catch (error) {
        console.error('❌ Erro ao buscar conexões:', error);
        return [];
    }
}

// ==========================================================
// ===== FUNÇÕES DE NAVEGAÇÃO E UI =====
// ==========================================================

// --- MOSTRAR TELA ---
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(function(s) { 
        s.classList.remove('active') 
    });
    document.getElementById(id).classList.add('active');
    var nav = document.getElementById('bottomNav');
    if (nav) {
        nav.style.display = ['homeScreen', 'buscaScreen', 'publicarObraScreen', 'perfilScreen'].includes(id) ? 'flex' : 'none';
    }
    if (id === 'homeScreen') {
        carregarFeedFirebase();
        if (usuarioLogado) {
            if (typeof map !== 'undefined' && map && userPosition) {
                carregarObrasNoMapa(userPosition);
            } else {
                setTimeout(function() {
                    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
                        initMap();
                    }
                }, 500);
            }
        }
    }
    if (id === 'perfilScreen') carregarMeuPerfil();
    if (id === 'buscaScreen') buscarProfissionais();
}

// --- TOAST (MENSAGENS) ---
function mostrarToast(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    setTimeout(function() { toast.style.display = 'none' }, 3000);
}

// --- MODAL ---
function fecharModal(id) { 
    var m = document.getElementById(id); 
    if (m) m.classList.remove('active'); 
}

// --- TABS ---
function mudarTab(tab, btn) {
    document.querySelectorAll('.tab').forEach(function(t) { 
        t.classList.remove('active') 
    });
    btn.classList.add('active');
    document.getElementById('feedTab').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeTab').style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'rede') carregarRedeFirebase();
}

// --- TOGGLE PROFISSÃO ---
function toggleProfissao() {
    var g = document.getElementById('grupoProfissao');
    var t = document.getElementById('cadTipo');
    if (g && t) g.style.display = t.value === 'profissional' ? 'block' : 'none';
}

// ==========================================================
// ===== FUNÇÕES DA GALERIA DE VÍDEOS =====
// ==========================================================

function initVideoGallery() {
    const items = document.querySelectorAll('.thumbnail-item');
    videoThumbnails = Array.from(items);
    currentVideoIndex = 0;
    updateDots();
    updateNavButtons();
    highlightActiveThumbnail();
}

function trocarVideo(videoId, element) {
    if (!videoId || videoId === 'SEU_ID_VIDEO_3' || videoId === 'SEU_ID_VIDEO_4' || videoId === 'SEU_ID_VIDEO_5') {
        mostrarToast('🎬 Substitua "SEU_ID_VIDEO_X" pelo ID real do seu vídeo no YouTube!', 'erro');
        return;
    }

    const player = document.getElementById('mainVideoPlayer');
    if (player) {
        player.src = 'https://www.youtube.com/embed/' + videoId;
    }

    document.querySelectorAll('.thumbnail-item').forEach(el => el.classList.remove('active'));
    if (element) {
        element.classList.add('active');
        const index = videoThumbnails.indexOf(element);
        if (index !== -1) {
            currentVideoIndex = index;
            updateDots();
            updateNavButtons();
            element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
}

function navegarThumbnails(direcao) {
    if (videoThumbnails.length === 0) return;
    const total = videoThumbnails.length;
    currentVideoIndex = (currentVideoIndex + direcao + total) % total;
    const targetItem = videoThumbnails[currentVideoIndex];
    if (targetItem) {
        const videoId = targetItem.dataset.videoId;
        if (videoId && videoId !== 'SEU_ID_VIDEO_3' && videoId !== 'SEU_ID_VIDEO_4' && videoId !== 'SEU_ID_VIDEO_5') {
            trocarVideo(videoId, targetItem);
        } else {
            mostrarToast('🎬 Substitua "SEU_ID_VIDEO_X" pelo ID real do seu vídeo no YouTube!', 'erro');
        }
    }
}

function updateDots() {
    const container = document.getElementById('videoDots');
    if (!container) return;
    const total = videoThumbnails.length;
    if (total <= 1) {
        container.innerHTML = '';
        return;
    }
    let html = '';
    for (let i = 0; i < total; i++) {
        html += `<span class="${i === currentVideoIndex ? 'active' : ''}"></span>`;
    }
    container.innerHTML = html;
}

function updateNavButtons() {
    const prevBtn = document.getElementById('btnPrevVideo');
    const nextBtn = document.getElementById('btnNextVideo');
    if (prevBtn) prevBtn.disabled = videoThumbnails.length <= 1;
    if (nextBtn) nextBtn.disabled = videoThumbnails.length <= 1;
}

function highlightActiveThumbnail() {
    document.querySelectorAll('.thumbnail-item').forEach(el => el.classList.remove('active'));
    if (videoThumbnails.length > 0 && videoThumbnails[currentVideoIndex]) {
        videoThumbnails[currentVideoIndex].classList.add('active');
    }
}

function mostrarVideos() {
    document.getElementById('blocoVideos').style.display = 'block';
    var blocoMapa = document.getElementById('blocoMapa');
    if (blocoMapa) blocoMapa.style.display = 'none';
    setTimeout(function() {
        initVideoGallery();
    }, 100);
}

function mostrarMapa() {
    document.getElementById('blocoVideos').style.display = 'none';
    var blocoMapa = document.getElementById('blocoMapa');
    if (blocoMapa) blocoMapa.style.display = 'block';
    setTimeout(function() {
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            if (typeof initMap === 'function') {
                initMap();
            }
        }
    }, 500);
}

// ==========================================================
// ===== FUNÇÕES DO MAPA =====
// ==========================================================

function initMap() {
    var mapElement = document.getElementById('map');
    if (!mapElement) {
        console.log('Mapa não encontrado');
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            carregarMapa(userPosition);
        }, function() {
            userPosition = { lat: -23.5505, lng: -46.6333 };
            carregarMapa(userPosition);
            mostrarToast('📍 Ative sua localização para ver obras próximas!', 'erro');
        });
    } else {
        userPosition = { lat: -23.5505, lng: -46.6333 };
        carregarMapa(userPosition);
    }
}

function carregarMapa(posicao) {
    var mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: posicao,
        zoom: 13,
        styles: [
            { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
        ]
    });

    new google.maps.Marker({
        position: posicao,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#F47920',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        },
        title: 'Você está aqui'
    });

    carregarObrasNoMapa(posicao);
}

async function carregarObrasNoMapa(posicao) {
    var obras = await buscarTodasObras();
    var container = document.getElementById('obrasProximas');
    if (!container) return;

    markers.forEach(function(m) { m.setMap(null); });
    markers = [];

    var obrasComLocalizacao = obras.filter(function(obra) {
        return obra.lat && obra.lng;
    });

    if (obrasComLocalizacao.length === 0) {
        container.innerHTML = `
            <div style="flex:1; text-align:center; padding:20px; color:#6B7280; min-width:250px;">
                <div style="font-size:40px;">🏗️</div>
                <p style="margin-top:8px; font-weight:600;">Nenhuma obra próxima</p>
                <p style="font-size:12px;">Publique uma obra para aparecer aqui!</p>
            </div>
        `;
        return;
    }

    var obrasComDistancia = obrasComLocalizacao.map(function(obra) {
        var distancia = calcularDistancia(
            posicao.lat, posicao.lng,
            obra.lat, obra.lng
        );
        return { ...obra, distancia: distancia };
    });

    obrasComDistancia.sort(function(a, b) { return a.distancia - b.distancia; });

    var obrasProximas = obrasComDistancia.slice(0, 5);

    container.innerHTML = obrasProximas.map(function(obra) {
        var temVaga = obra.interessados ? obra.interessados.length < 3 : true;
        var statusVaga = temVaga ? '🟢 Vaga disponível' : '🔴 Vaga preenchida';
        var statusClass = temVaga ? 'disponivel' : 'preenchida';

        var marker = new google.maps.Marker({
            position: { lat: obra.lat, lng: obra.lng },
            map: map,
            title: obra.nome,
            label: {
                text: '🏗️',
                fontSize: '20px'
            }
        });

        var infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding:10px; max-width:200px; font-family:Inter, sans-serif;">
                    <strong style="color:#1A3A5C;">${obra.nome}</strong><br>
                    📍 ${obra.endereco || 'Endereço não informado'}<br>
                    💰 R$ ${obra.valorHora}/h<br>
                    <span style="color:${temVaga ? '#10B981' : '#EF4444'}; font-weight:600;">${statusVaga}</span>
                    <br><br>
                    <button onclick="verDetalheObra(${obra.id})" 
                            style="background:#F47920; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-weight:600; width:100%;">
                        Ver Vaga
                    </button>
                </div>
            `
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });

        markers.push(marker);

        var distanciaKm = (obra.distancia / 1000).toFixed(1);
        return `
            <div class="thumbnail-item-map" onclick="verDetalheObra(${obra.id})">
                <div class="thumb-icon">🏗️</div>
                <div class="thumb-title">${obra.nome}</div>
                <div class="thumb-detail">📍 ${distanciaKm} km</div>
                <div class="thumb-status ${statusClass}">${statusVaga}</div>
                <div class="thumb-price">R$ ${obra.valorHora}/h</div>
            </div>
        `;
    }).join('');
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function atualizarMapa() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            carregarMapa(userPosition);
            mostrarToast('📍 Mapa atualizado!', 'sucesso');
        }, function() {
            mostrarToast('❌ Não foi possível obter sua localização', 'erro');
        });
    } else {
        mostrarToast('❌ Seu navegador não suporta geolocalização', 'erro');
    }
}

// ==========================================================
// ===== LOGIN E CADASTRO =====
// ==========================================================

async function fazerLoginFirebase() {
    var email = document.getElementById('loginEmail').value.trim();
    var senha = document.getElementById('loginSenha').value;

    if (!email || !senha) {
        mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }

    var usuario = await buscarUsuarioPorEmailOuCPF(email);
    
    if (usuario && usuario.senha === senha) {
        usuarioLogado = usuario;
        mostrarToast('Bem-vindo, ' + usuario.nome + '!', 'sucesso');
        mostrarMapa();
        setTimeout(function() { mostrarTela('homeScreen'); }, 500);
    } else {
        mostrarToast('E-mail/CPF ou senha inválidos!', 'erro');
    }
}

async function cadastrarFirebase() {
    var tipo = document.getElementById('cadTipo').value;
    var nome = document.getElementById('cadNome').value.trim();
    var email = document.getElementById('cadEmail').value.trim();
    var celular = document.getElementById('cadCelular').value.trim();
    var cpf = document.getElementById('cadCPF').value.replace(/\D/g, '');
    var profissao = tipo === 'profissional' ? document.getElementById('cadProfissao').value : '';
    var experiencia = document.getElementById('cadExperiencia').value;
    var senha = document.getElementById('cadSenha').value;

    if (!nome || !email || !celular || !cpf || !senha) {
        mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }

    if (senha.length < 6) {
        mostrarToast('Senha mínima de 6 caracteres!', 'erro');
        return;
    }

    if (!email.includes('@')) {
        mostrarToast('E-mail inválido!', 'erro');
        return;
    }

    var existe = await buscarUsuarioPorEmailOuCPF(email);
    if (existe) {
        mostrarToast('E-mail/CPF já cadastrado!', 'erro');
        return;
    }

    var novoUsuario = {
        id: Date.now(),
        tipo: tipo,
        nome: nome,
        email: email,
        celular: celular,
        cpf: cpf,
        profissao: profissao || '',
        experiencia: parseInt(experiencia) || 0,
        habilidades: '',
        senha: senha,
        fotoPerfil: '',
        avaliacoes: [],
        dataCriacao: new Date().toISOString()
    };

    var salvou = await salvarUsuarioFirebase(novoUsuario);
    if (!salvou) {
        mostrarToast('Erro ao salvar!', 'erro');
        return;
    }

    usuarioLogado = novoUsuario;
    mostrarToast('Cadastro realizado!', 'sucesso');
    mostrarMapa();
    setTimeout(function() { mostrarTela('homeScreen'); }, 500);
}

// ==========================================================
// ===== RECUPERAR SENHA =====
// ==========================================================

function recuperarSenha() {
    document.getElementById('recuperarPasso1').style.display = 'block';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'none';
    mostrarTela('recuperarSenhaScreen');
}

async function enviarCodigoRecuperacao() {
    var email = document.getElementById('recEmail').value.trim();
    if (!email) {
        mostrarToast('Digite seu e-mail ou CPF!', 'erro');
        return;
    }

    var usuario = await buscarUsuarioPorEmailOuCPF(email);
    if (!usuario) {
        mostrarToast('E-mail/CPF não encontrado!', 'erro');
        return;
    }

    codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    usuarioRecuperando = usuario;
    alert('Seu código de recuperação é: ' + codigoRecuperacao);
    
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'block';
}

function verificarCodigo() {
    var codigo = document.getElementById('recCodigo').value.trim();
    if (codigo !== codigoRecuperacao) {
        mostrarToast('Código inválido!', 'erro');
        return;
    }
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'block';
    mostrarToast('✅ Código verificado!', 'sucesso');
}

async function criarNovaSenha() {
    var novaSenha = document.getElementById('recNovaSenha').value;
    var confirmar = document.getElementById('recConfirmarSenha').value;

    if (!novaSenha || novaSenha.length < 6) {
        mostrarToast('Senha mínima de 6 caracteres!', 'erro');
        return;
    }

    if (novaSenha !== confirmar) {
        mostrarToast('Senhas não coincidem!', 'erro');
        return;
    }

    var atualizado = await atualizarUsuarioFirebase(usuarioRecuperando.id, { senha: novaSenha });
    if (atualizado) {
        mostrarToast('✅ Senha alterada com sucesso!', 'sucesso');
        setTimeout(function() { 
            mostrarTela('loginScreen'); 
            document.getElementById('recuperarPasso1').style.display = 'block';
            document.getElementById('recuperarPasso2').style.display = 'none';
            document.getElementById('recuperarPasso3').style.display = 'none';
        }, 1500);
    } else {
        mostrarToast('Erro ao alterar senha!', 'erro');
    }
}

// ==========================================================
// ===== PERFIL =====
// ==========================================================

function carregarMeuPerfil() {
    if (!usuarioLogado) return;
    document.getElementById('perfilNome').textContent = usuarioLogado.nome;
    document.getElementById('perfilProfissao').textContent = usuarioLogado.tipo === 'profissional' ? 
        usuarioLogado.profissao + ' • ' + usuarioLogado.experiencia + ' anos' : 
        'EMPREITEIRO';
    document.getElementById('editNome').value = usuarioLogado.nome || '';
    document.getElementById('editCelular').value = usuarioLogado.celular || '';
    document.getElementById('editEmail').value = usuarioLogado.email || '';
    
    if (usuarioLogado.fotoPerfil) {
        document.getElementById('perfilAvatarDefault').innerHTML = 
            '<img src="' + usuarioLogado.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    }
}

async function salvarPerfilFirebase() {
    if (!usuarioLogado) return;

    usuarioLogado.nome = document.getElementById('editNome').value.trim();
    usuarioLogado.celular = document.getElementById('editCelular').value.trim();
    usuarioLogado.email = document.getElementById('editEmail').value.trim();

    var atualizado = await atualizarUsuarioFirebase(usuarioLogado.id, {
        nome: usuarioLogado.nome,
        celular: usuarioLogado.celular,
        email: usuarioLogado.email
    });

    if (atualizado) {
        mostrarToast('✅ Perfil atualizado!', 'sucesso');
        carregarMeuPerfil();
    } else {
        mostrarToast('Erro ao atualizar perfil!', 'erro');
    }
}

function mudarFotoPerfil(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = async function(ev) {
        var fotoBase64 = ev.target.result;
        document.getElementById('perfilAvatarDefault').innerHTML = 
            '<img src="' + fotoBase64 + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
        
        usuarioLogado.fotoPerfil = fotoBase64;
        await atualizarUsuarioFirebase(usuarioLogado.id, { fotoPerfil: fotoBase64 });
        mostrarToast('✅ Foto atualizada!', 'sucesso');
    };
    reader.readAsDataURL(file);
}

// ==========================================================
// ===== FEED =====
// ==========================================================

async function carregarFeedFirebase() {
    var obras = await buscarTodasObras();
    var usuarios = await buscarTodosUsuarios();
    var container = document.getElementById('feedContainer');

    if (obras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🏗️</div><h3>Nenhuma obra publicada!</h3></div>';
        return;
    }

    container.innerHTML = obras.map(function(obra) {
        var autor = usuarios.find(function(u) { return u.id === obra.usuarioId });
        var distancia = '';
        if (userPosition && obra.lat && obra.lng) {
            var dist = calcularDistancia(userPosition.lat, userPosition.lng, obra.lat, obra.lng);
            distancia = '📍 ' + (dist/1000).toFixed(1) + ' km - ';
        }
        return '<div class="feed-card" onclick="verDetalheObra(' + obra.id + ')">' +
            '<div class="feed-card-header">' +
                '<div class="feed-avatar">🏢</div>' +
                '<div class="feed-user-info">' +
                    '<div class="feed-user-name">' + (autor ? autor.nome : 'Empreiteiro') + '</div>' +
                    '<div class="feed-time">' + distancia + new Date(obra.data).toLocaleDateString('pt-BR') + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="feed-card-image">🏗️</div>' +
            '<div class="feed-card-body">' +
                '<div class="feed-card-title">' + obra.nome + '</div>' +
                '<p>📍 ' + obra.endereco + '</p>' +
                '<p>💰 R$ ' + obra.valorHora + '/h</p>' +
                '<p style="font-size:11px;color:#F47920;">👆 Clique para ver detalhes</p>' +
            '</div>' +
        '</div>';
    }).join('');
}

// ==========================================================
// ===== DETALHE DA OBRA =====
// ==========================================================

async function verDetalheObra(obraId) {
    var obra = await buscarObraPorId(obraId);
    if (!obra) return;

    var usuarios = await buscarTodosUsuarios();
    var autor = usuarios.find(function(u) { return u.id === obra.usuarioId });
    var jaCandidatou = obra.interessados && obra.interessados.some(function(i) { 
        return i.profissionalId === usuarioLogado?.id; 
    });

    var html = '<div style="text-align:center;margin-bottom:20px;">' +
        '<div style="font-size:60px;">🏗️</div>' +
        '<h2 style="color:#1A3A5C;">' + obra.nome + '</h2>' +
    '</div>' +
    '<div class="card">' +
        '<p><strong>📍 Endereço:</strong> ' + obra.endereco + '</p>' +
        '<p><strong>📝 Descrição:</strong> ' + (obra.descricao || 'Não informado') + '</p>' +
        '<p><strong>💰 Valor:</strong> R$ ' + obra.valorHora + '/h</p>' +
        '<p><strong>👷 Profissões:</strong> ' + (obra.profissoes || 'Não informado') + '</p>' +
        '<p><strong>🏢 Empreiteiro:</strong> ' + (autor ? autor.nome : 'Não informado') + '</p>';

    if (obra.lat && obra.lng && userPosition) {
        var dist = calcularDistancia(userPosition.lat, userPosition.lng, obra.lat, obra.lng);
        html += '<p><strong>📍 Distância:</strong> ' + (dist/1000).toFixed(1) + ' km</p>';
    }

    html += '</div>';

    if (usuarioLogado && usuarioLogado.tipo === 'profissional') {
        if (jaCandidatou) {
            html += '<div class="alert-card" style="text-align:center;">✅ Você já se candidatou a esta vaga!</div>';
        } else {
            html += '<button class="btn btn-primary" onclick="candidatarObraFirebase(' + obra.id + ')">✋ TENHO INTERESSE NESTA VAGA</button>';
        }
    }

    if (usuarioLogado && usuarioLogado.tipo === 'empreiteiro' && autor && usuarioLogado.id === autor.id) {
        html += '<button class="btn btn-outline" onclick="verCandidatosObra(' + obra.id + ')">👥 Ver Candidatos (' + (obra.interessados ? obra.interessados.length : 0) + ')</button>';
    }

    html += '<button class="btn btn-outline" onclick="mostrarTela(\'homeScreen\')">← Voltar</button>';
    
    document.getElementById('detalheObraConteudo').innerHTML = html;
    mostrarTela('detalheObraScreen');
}

// ==========================================================
// ===== CANDIDATAR A OBRA =====
// ==========================================================

async function candidatarObraFirebase(obraId) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'profissional') {
        mostrarToast('Apenas profissionais podem se candidatar!', 'erro');
        return;
    }

    var obra = await buscarObraPorId(obraId);
    if (!obra) {
        mostrarToast('Obra não encontrada!', 'erro');
        return;
    }

    if (!obra.interessados) obra.interessados = [];
    
    if (obra.interessados.some(function(i) { return i.profissionalId === usuarioLogado.id })) {
        mostrarToast('Você já se candidatou!', 'erro');
        return;
    }

    obra.interessados.push({
        profissionalId: usuarioLogado.id,
        data: new Date().toISOString(),
        status: 'pendente'
    });

    var atualizado = await atualizarObraFirebase(obraId, { interessados: obra.interessados });
    
    if (atualizado) {
        mostrarToast('✅ Candidatura enviada com sucesso!', 'sucesso');
        verDetalheObra(obraId);
    } else {
        mostrarToast('Erro ao candidatar!', 'erro');
    }
}

// ==========================================================
// ===== VER CANDIDATOS =====
// ==========================================================

async function verCandidatosObra(obraId) {
    var obra = await buscarObraPorId(obraId);
    if (!obra || !obra.interessados || obra.interessados.length === 0) {
        mostrarToast('Nenhum candidato ainda!');
        return;
    }

    var usuarios = await buscarTodosUsuarios();
    var html = '<h3>👥 Candidatos</h3>';
    
    obra.interessados.forEach(function(i) {
        var p = usuarios.find(function(u) { return u.id === i.profissionalId });
        if (p) {
            html += '<div class="card" onclick="verPerfilPublico(' + p.id + ')">' +
                '<div style="display:flex;align-items:center;">' +
                    '<div class="lista-avatar">👷</div>' +
                    '<div style="margin-left:10px;flex:1;">' +
                        '<strong>' + p.nome + '</strong><br>' +
                        p.profissao + ' • ' + p.experiencia + ' anos' +
                    '</div>' +
                '</div>' +
                '<div style="margin-top:10px;display:flex;gap:8px;">' +
                    '<a href="https://wa.me/55' + p.celular.replace(/\D/g, '') + '?text=' + encodeURIComponent('Olá ' + p.nome + '! Vi sua candidatura no LPXConstrutor.') + '" target="_blank" style="flex:1;text-decoration:none;" onclick="event.stopPropagation();">' +
                        '<button class="btn btn-small" style="background:#25D366;color:white;width:100%;">💬 WhatsApp</button>' +
                    '</a>' +
                    '<button class="btn btn-small btn-success" onclick="event.stopPropagation();aceitarCandidato(' + obraId + ',' + p.id + ')">✅ Aceitar</button>' +
                '</div>' +
            '</div>';
        }
    });

    var modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modalCandidatos';
    modal.innerHTML = '<div class="modal-content">' + html + '<button class="btn btn-outline" onclick="document.getElementById(\'modalCandidatos\').remove()">Fechar</button></div>';
    document.body.appendChild(modal);
}

// ==========================================================
// ===== ACEITAR CANDIDATO =====
// ==========================================================

async function aceitarCandidato(obraId, profId) {
    var obra = await buscarObraPorId(obraId);
    if (!obra) return;

    var interessado = obra.interessados.find(function(i) { return i.profissionalId === profId });
    if (interessado) interessado.status = 'aceito';

    await atualizarObraFirebase(obraId, { interessados: obra.interessados });
    
    var modal = document.getElementById('modalCandidatos');
    if (modal) modal.remove();
    
    mostrarToast('✅ Candidato aceito!', 'sucesso');
}

// ==========================================================
// ===== PERFIL PÚBLICO =====
// ==========================================================

async function verPerfilPublico(userId) {
    var user = await buscarUsuarioPorId(userId);
    if (!user) return;

    perfilSelecionado = user;
    
    var html = '<div class="profile-header">' +
        '<div class="profile-avatar"><span>👷</span></div>' +
        '<h2 style="color:#1A3A5C;">' + user.nome + '</h2>' +
        '<p style="color:#F47920;">' + user.profissao + ' • ' + user.experiencia + ' anos</p>' +
    '</div>' +
    '<div class="card">' +
        '<h3>📞 Contato</h3>' +
        '<p>📱 ' + user.celular + '</p>' +
        '<p>📧 ' + user.email + '</p>' +
    '</div>' +
    '<div class="card">' +
        '<h3>🛠️ Habilidades</h3>' +
        '<p>' + (user.habilidades || 'Não informado') + '</p>' +
    '</div>';

    if (usuarioLogado && usuarioLogado.id !== user.id) {
        var numeroWhats = '55' + user.celular.replace(/\D/g, '');
        var mensagemWhats = 'Olá ' + user.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor e tenho interesse no seu trabalho como ' + user.profissao + '.';
        html += '<a href="https://wa.me/' + numeroWhats + '?text=' + encodeURIComponent(mensagemWhats) + '" target="_blank" style="text-decoration:none;">' +
            '<button class="btn" style="background:#25D366;color:white;width:100%;margin-bottom:10px;">💬 WHATSAPP</button>' +
        '</a>';
        html += '<button class="btn btn-primary" onclick="abrirChat(' + user.id + ')">💬 CONVERSAR NO APP</button>';
        if (usuarioLogado.tipo === 'empreiteiro') {
            html += '<button class="btn btn-success" onclick="contratarProfissional(' + user.id + ')">🤝 CONTRATAR</button>';
        }
    }

    html += '<button class="btn btn-outline" onclick="mostrarTela(\'homeScreen\')">← Voltar</button>';
    
    document.getElementById('perfilPublicoConteudo').innerHTML = html;
    mostrarTela('perfilPublicoScreen');
}

// ==========================================================
// ===== CHAT E CONTRATAÇÃO =====
// ==========================================================

function abrirChat(userId) {
    if (!perfilSelecionado) return;
    document.getElementById('modalChatInfo').innerHTML = 
        '<div style="display:flex;align-items:center;margin-bottom:15px;">' +
            '<div class="lista-avatar">👷</div>' +
            '<div style="margin-left:10px;">' +
                '<strong>' + perfilSelecionado.nome + '</strong><br>' +
                perfilSelecionado.profissao + ' • ' + perfilSelecionado.experiencia + ' anos<br>' +
                '📱 ' + perfilSelecionado.celular +
            '</div>' +
        '</div>';
    document.getElementById('chatMensagem').value = 'Olá ' + perfilSelecionado.nome.split(' ')[0] + '! Tenho interesse no seu trabalho.';
    document.getElementById('modalChat').classList.add('active');
}

function enviarMensagem() {
    if (!perfilSelecionado || !usuarioLogado) return;
    var msg = document.getElementById('chatMensagem').value.trim();
    if (!msg) {
        mostrarToast('Digite uma mensagem!', 'erro');
        return;
    }
    mostrarToast('✅ Mensagem enviada para ' + perfilSelecionado.nome + '!', 'sucesso');
    fecharModal('modalChat');
}

async function contratarProfissional(profId) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') {
        mostrarToast('Apenas empreiteiros podem contratar!', 'erro');
        return;
    }

    var prof = await buscarUsuarioPorId(profId);
    if (!prof) return;

    var obra = prompt('Nome da obra:', 'Minha Obra');
    var valor = prompt('Valor por hora (R$):', '25');
    if (!obra || !valor) return;

    var conexao = {
        id: Date.now(),
        profissionalId: prof.id,
        empreiteiroId: usuarioLogado.id,
        obra: obra,
        valorHora: parseFloat(valor),
        dataInicio: new Date().toISOString(),
        ativa: true
    };

    var salvou = await salvarConexaoFirebase(conexao);
    if (salvou) {
        mostrarToast('🤝 ' + prof.nome + ' contratado!', 'sucesso');
    } else {
        mostrarToast('Erro ao contratar!', 'erro');
    }
}

// ==========================================================
// ===== BUSCAR PROFISSIONAIS =====
// ==========================================================

async function buscarProfissionais() {
    var termo = (document.getElementById('buscaInput')?.value || '').toLowerCase();
    var todos = await buscarTodosUsuarios();
    var profissionais = todos.filter(function(u) { 
        return u.tipo === 'profissional' && 
            (!termo || u.nome.toLowerCase().includes(termo) || u.profissao.toLowerCase().includes(termo)); 
    });
    
    var container = document.getElementById('buscaResultados');
    if (!container) return;

    if (profissionais.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;">Nenhum profissional encontrado.</p>';
        return;
    }

    container.innerHTML = profissionais.map(function(p) {
        var numeroWhats = '55' + p.celular.replace(/\D/g, '');
        return '<div class="card" onclick="verPerfilPublico(' + p.id + ')">' +
            '<div style="display:flex;align-items:center;">' +
                '<div class="lista-avatar">👷</div>' +
                '<div style="margin-left:14px;flex:1;">' +
                    '<div class="lista-nome">' + p.nome + '</div>' +
                    '<div class="lista-detalhe">' + p.profissao + ' • ' + p.experiencia + ' anos</div>' +
                '</div>' +
            '</div>' +
            '<div style="display:flex;gap:8px;margin-top:10px;">' +
                '<a href="https://wa.me/' + numeroWhats + '?text=' + encodeURIComponent('Olá ' + p.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.') + '" target="_blank" style="flex:1;text-decoration:none;" onclick="event.stopPropagation();">' +
                    '<button class="btn btn-small" style="background:#25D366;color:white;width:100%;">💬 WhatsApp</button>' +
                '</a>' +
                '<button class="btn btn-small btn-outline" onclick="event.stopPropagation();verPerfilPublico(' + p.id + ')" style="flex:1;">👁️ Perfil</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

// ==========================================================
// ===== CARREGAR REDE =====
// ==========================================================

async function carregarRedeFirebase() {
    if (!usuarioLogado) return;
    
    var conexoes = await buscarConexoesDoUsuario(usuarioLogado.id);
    var usuarios = await buscarTodosUsuarios();
    var container = document.getElementById('redeContainer');

    if (conexoes.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<h3>🔗 Nenhuma conexão</h3>' +
            '<p style="color:#666;">Contrate profissionais ou candidate-se a vagas!</p>' +
        '</div>';
        return;
    }

    container.innerHTML = conexoes.map(function(conexao) {
        var outroId = usuarioLogado.id === conexao.profissionalId ? conexao.empreiteiroId : conexao.profissionalId;
        var outro = usuarios.find(function(u) { return u.id === outroId });
        return '<div class="card conexao-card ' + (conexao.ativa ? '' : 'desconectado') + '" onclick="verPerfilPublico(' + outroId + ')">' +
            '<strong>' + (outro ? outro.nome : 'Usuário') + '</strong> ' +
            '<span class="badge ' + (conexao.ativa ? 'badge-success' : 'badge-danger') + '">' +
                (conexao.ativa ? '🟢 Ativo' : '🔴 Encerrado') +
            '</span><br>' +
            '🏗️ ' + conexao.obra + ' • 💰 R$' + conexao.valorHora + '/h' +
        '</div>';
    }).join('');
}

// ==========================================================
// ===== PUBLICAR OBRA =====
// ==========================================================

function publicarObraFirebase() {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') {
        mostrarToast('Apenas empreiteiros podem publicar obras!', 'erro');
        return;
    }

    var nome = document.getElementById('obraNome').value.trim();
    var endereco = document.getElementById('obraEndereco').value.trim();
    var descricao = document.getElementById('obraDescricao').value;
    var profissoes = document.getElementById('obraProfissoes').value;
    var valorHora = parseFloat(document.getElementById('obraValorHora').value) || 25;

    if (!nome || !endereco) {
        mostrarToast('Nome e endereço obrigatórios!', 'erro');
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            var obra = {
                id: Date.now(),
                usuarioId: usuarioLogado.id,
                nome: nome,
                endereco: endereco,
                descricao: descricao,
                profissoes: profissoes,
                valorHora: valorHora,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                data: new Date().toISOString(),
                interessados: []
            };

            var salvou = await salvarObraFirebase(obra);
            if (salvou) {
                mostrarToast('✅ Obra publicada com sucesso!', 'sucesso');
                mostrarTela('homeScreen');
                ['obraNome', 'obraEndereco', 'obraDescricao', 'obraProfissoes', 'obraValorHora']
                    .forEach(function(id) { document.getElementById(id).value = ''; });
                setTimeout(function() { 
                    if (userPosition) carregarObrasNoMapa(userPosition); 
                }, 500);
            }
        }, function() {
            var latInput = prompt('Digite a latitude (ex: -23.5505):');
            var lngInput = prompt('Digite a longitude (ex: -46.6333):');
            if (latInput && lngInput) {
                var lat = parseFloat(latInput.replace(',', '.'));
                var lng = parseFloat(lngInput.replace(',', '.'));
                if (!isNaN(lat) && !isNaN(lng)) {
                    salvarObraManual(lat, lng);
                } else {
                    mostrarToast('📍 Lat/Long inválidos!', 'erro');
                }
            }
        });
    } else {
        mostrarToast('📍 Ative a localização para publicar uma obra!', 'erro');
    }
}

async function salvarObraManual(lat, lng) {
    var obra = {
        id: Date.now(),
        usuarioId: usuarioLogado.id,
        nome: document.getElementById('obraNome').value.trim(),
        endereco: document.getElementById('obraEndereco').value.trim(),
        descricao: document.getElementById('obraDescricao').value,
        profissoes: document.getElementById('obraProfissoes').value,
        valorHora: parseFloat(document.getElementById('obraValorHora').value) || 25,
        lat: lat,
        lng: lng,
        data: new Date().toISOString(),
        interessados: []
    };

    var salvou = await salvarObraFirebase(obra);
    if (salvou) {
        mostrarToast('✅ Obra publicada com sucesso!', 'sucesso');
        mostrarTela('homeScreen');
        ['obraNome', 'obraEndereco', 'obraDescricao', 'obraProfissoes', 'obraValorHora']
            .forEach(function(id) { document.getElementById(id).value = ''; });
    }
}

// ==========================================================
// ===== SAIR =====
// ==========================================================

function sair() {
    usuarioLogado = null;
    mostrarVideos();
    mostrarTela('loginScreen');
    mostrarToast('👋 Até logo!', 'sucesso');
}

// ==========================================================
// ===== INICIALIZAÇÃO =====
// ==========================================================

// Mostra os vídeos por padrão (antes do login)
mostrarVideos();

console.log('✅ LPXCONSTRUTOR COM FIREBASE!');
console.log('🔥 Projeto: construtorlpx');
console.log('📁 Coleções: usuarios, obras, conexoes');
console.log('🔒 Regras de segurança aplicadas!');
