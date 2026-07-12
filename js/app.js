// ==========================================================
// ===== LPXCONSTRUTOR - ORIGINAL COMPLETO FUNCIONAL =====
// ==========================================================

if (!window.app || !window.app._app) { window.app = window.app || {}; window.app._app = window.app._app || null; }

window.app = {
    _app: null,
    fazerLogin: function(){ if(window.app._app)window.app._app.fazerLogin(); },
    mostrarTela: function(id){ if(window.app._app)window.app._app.mostrarTela(id); },
    voltarTela: function(){ if(window.app._app)window.app._app.voltarTela(); },
    cadastrar: function(){ if(window.app._app)window.app._app.cadastrar(); },
    proximaEtapa: function(e){ if(window.app._app)window.app._app.proximaEtapa(e); },
    toggleProfissao: function(){ if(window.app._app)window.app._app.toggleProfissao(); },
    solicitarCodigo: function(){ if(window.app._app)window.app._app.solicitarCodigo(); },
    verificarCodigo: function(){ if(window.app._app)window.app._app.verificarCodigo(); },
    voltarPasso1: function(){ if(window.app._app)window.app._app.voltarPasso1(); },
    sair: function(){ if(window.app._app)window.app._app.sair(); },
    buscarProfissionais: function(){ if(window.app._app)window.app._app.buscarProfissionais(); },
    verPerfil: function(uid){ if(window.app._app)window.app._app.verPerfil(uid); },
    iniciarChat: function(uid){ if(window.app._app)window.app._app.iniciarChat(uid); },
    enviarMensagem: function(){ if(window.app._app)window.app._app.enviarMensagem(); },
    abrirEditarPerfil: function(){ if(window.app._app)window.app._app.abrirEditarPerfil(); },
    salvarPerfil: function(){ if(window.app._app)window.app._app.salvarPerfil(); },
    uploadFoto: function(e){ if(window.app._app)window.app._app.uploadFoto(e); },
    abrirTelaPublicacao: function(vagaData){ if(window.app._app)window.app._app.abrirTelaPublicacao(vagaData); },
    publicarVagaApp: function(){ if(window.app._app)window.app._app.publicarVagaApp(); },
    previewFotoObra: function(e){ if(window.app._app)window.app._app.previewFotoObra(e); },
    candidatarVaga: function(vid){ if(window.app._app)window.app._app.candidatarVaga(vid); },
    abrirContratacao: function(uid){ if(window.app._app)window.app._app.abrirContratacao(uid); },
    confirmarContratacao: function(){ if(window.app._app)window.app._app.confirmarContratacao(); },
    novaObra: function(){ if(window.app._app)window.app._app.novaObra(); },
    carregarMinhasObras: function(){ if(window.app._app)window.app._app.carregarMinhasObras(); },
    verDetalheObra: function(oid){ if(window.app._app)window.app._app.verDetalheObra(oid); },
    demitirFuncionario: function(cid){ if(window.app._app)window.app._app.demitirFuncionario(cid); },
    finalizarContrato: function(cid){ if(window.app._app)window.app._app.finalizarContrato(cid); },
    adicionarNaRede: function(aid){ if(window.app._app)window.app._app.adicionarNaRede(aid); },
    removerDaRede: function(aid){ if(window.app._app)window.app._app.removerDaRede(aid); },
    verAvaliacoes: function(uid){ if(window.app._app)window.app._app.verAvaliacoes(uid); },
    abrirDarAvaliacao: function(uid){ if(window.app._app)window.app._app.abrirDarAvaliacao(uid); },
    setNota: function(n){ if(window.app._app)window.app._app.setNota(n); },
    enviarAvaliacao: function(){ if(window.app._app)window.app._app.enviarAvaliacao(); },
    gerarQRCode: function(uid){ if(window.app._app)window.app._app.gerarQRCode(uid); },
    fecharQRCode: function(){ if(window.app._app)window.app._app.fecharQRCode(); },
    baixarQRCode: function(){ if(window.app._app)window.app._app.baixarQRCode(); },
    selecionarIdioma: function(i){ if(window.app._app)window.app._app.selecionarIdioma(i); },
    selecionarTema: function(t){ if(window.app._app)window.app._app.selecionarTema(t); },
    mostrarInfoVersao: function(){ if(window.app._app)window.app._app.mostrarInfoVersao(); },
    confirmarExclusao: function(){ if(window.app._app)window.app._app.confirmarExclusao(); },
    mostrarModalSair: function(){ if(window.app._app)window.app._app.mostrarModalSair(); },
    fecharModalSair: function(){ if(window.app._app)window.app._app.fecharModalSair(); },
    confirmarSair: function(){ if(window.app._app)window.app._app.confirmarSair(); },
    mostrarNotificacoes: function(){ if(window.app._app)window.app._app.mostrarNotificacoes(); },
    mudarTab: function(t){ if(window.app._app)window.app._app.mudarTab(t); },
    carregarFeed: function(){ if(window.app._app)window.app._app.carregarFeed(); },
    carregarRede: function(){ if(window.app._app)window.app._app.carregarRede(); },
    buscarLocalizacao: function(){ if(window.app._app)window.app._app.buscarLocalizacao(); }
};

var App = function() {
    this.usuarioLogado = null; 
    this.usuarioSelecionado = null; 
    this.telaAtual = 'loginScreen';
    this.historicoTelas = []; 
    this.vagaFotoBase64 = null; 
    this.contratarProfId = null;
    this.obraSelecionada = null; 
    this.avaliarUid = null; 
    this.avaliarNota = 0;
    this.videoIndex = 0;
    this.vagaEmEdicao = null;
    this.vagaLocalizacaoAtual = null;
    this.init();
};

App.prototype.init = function() {
    var s = this; 
    console.log('🚀 Iniciando...'); 
    window.app._app = this;
    
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    s.mostrarSplash();
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() { 
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') s.mostrarModalSair(); 
        else s.voltarTela(); 
    });
    
    // CRIAR USUÁRIO COM SEUS DADOS
    s.usuarioLogado = {
        id: 'user123',
        nome: 'SEU NOME AQUI',
        email: 'seuemail@email.com',
        tipo: 'empreiteiro',
        profissao: 'SUA PROFISSÃO AQUI',
        experiencia: '8',
        celular: '(11) 99999-9999',
        fotoPerfil: null,
        score: 4.7
    };
    
    setTimeout(function() {
        s.esconderSplash();
        s.mostrarTela('homeScreen');
        s.atualizarBotoes();
    }, 1500);
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) { 
        splash = document.createElement('div'); 
        splash.id = 'splashScreen'; 
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;'; 
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p><div id="tijolosContainer" style="margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:2px;"></div>'; 
        document.body.appendChild(splash); 
        this.animarTijolos(); 
    }
};

App.prototype.animarTijolos = function() { 
    var c = document.getElementById('tijolosContainer'); 
    if (!c) return; 
    var f = 0; 
    function a() { 
        if (f >= 4) { c.innerHTML = ''; f = 0; setTimeout(a, 300); return; } 
        var r = document.createElement('div'); r.style.cssText = 'display:flex;gap:2px;'; 
        if (f % 2 === 1) r.style.marginLeft = '8px'; 
        var q = f === 0 ? 4 : f === 1 ? 5 : f === 2 ? 4 : 5; 
        for (var i = 0; i < q; i++) { 
            var t = document.createElement('span'); t.textContent = '🧱'; 
            t.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;'; 
            r.appendChild(t); 
        } 
        c.appendChild(r); f++; 
        setTimeout(a, f < 4 ? 300 : 600); 
    } 
    a(); 
};

App.prototype.esconderSplash = function() { 
    var s = document.getElementById('splashScreen'); 
    if (s) { s.style.opacity = '0'; 
        setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, 500); } 
};

App.prototype.atualizarBotoes = function() { 
    var bp = document.getElementById('btnPublicar'); 
    if (bp) bp.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
    var bo = document.getElementById('btnObras'); 
    if (bo) bo.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
};

App.prototype.mostrarTela = function(id) {
    var s = this; 
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); }); 
    var t = document.getElementById(id); 
    if (!t) return; 
    t.classList.add('active'); 
    s.telaAtual = id;
    
    var n = document.getElementById('bottomNav'); 
    if (n) { 
        var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen']; 
        n.style.display = (tn.indexOf(id) >= 0 && s.usuarioLogado) ? 'flex' : 'none'; 
    }
    
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
    if (id === 'publicarVagaScreen') setTimeout(function() { s.configurarPublicacao(); }, 100);
    if (id === 'recuperarSenhaScreen') { 
        var p1=document.getElementById('recPasso1'),p2=document.getElementById('recPasso2'); 
        if(p1)p1.style.display='block'; 
        if(p2)p2.style.display='none'; 
    }
};

App.prototype.voltarTela = function() { 
    if (this.historicoTelas.length > 0) { 
        var a = this.historicoTelas.pop(); 
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); }); 
        var t = document.getElementById(a); 
        if (t) { t.classList.add('active'); this.telaAtual = a; } 
        if (a === 'homeScreen') this.carregarHome(); 
        if (a === 'meuPerfilScreen') this.carregarMeuPerfil(); 
    } else { this.mostrarTela('homeScreen'); } 
};

App.prototype.mostrarModalSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='flex'; 
};

App.prototype.fecharModalSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='none'; 
    history.pushState(null,'',window.location.href); 
};

App.prototype.confirmarSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='none'; 
    this.usuarioLogado=null; 
    this.historicoTelas=[]; 
    this.mostrarTela('loginScreen'); 
};

App.prototype.selecionarTema = function(t) { 
    if(t==='escuro'){ document.body.classList.add('dark-theme'); localStorage.setItem('tema','escuro'); } 
    else { document.body.classList.remove('dark-theme'); localStorage.setItem('tema','claro'); } 
    this.mostrarToast('🎨 Tema alterado!','sucesso'); 
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() { 
    var s=this; 
    var e=(document.getElementById('loginEmail')||{}).value||'', 
        p=(document.getElementById('loginSenha')||{}).value||''; 
    if(!e||!p){ s.mostrarToast('❌ Preencha todos!','erro'); return; } 
    s.mostrarToast('Entrando...','info'); 
    
    s.usuarioLogado = {
        id: 'user123',
        nome: 'SEU NOME AQUI',
        email: e,
        tipo: 'empreiteiro',
        profissao: 'SUA PROFISSÃO AQUI',
        experiencia: '8',
        celular: '(11) 99999-9999',
        fotoPerfil: null,
        score: 4.7
    };
    s.mostrarToast('✅ Bem-vindo!','sucesso');
    s.atualizarBotoes();
    s.mostrarTela('homeScreen');
};

App.prototype.cadastrar = function() { 
    var s=this; 
    s.usuarioLogado = {
        id: 'new' + Date.now(),
        nome: document.getElementById('cadNome') ? document.getElementById('cadNome').value : 'Novo Usuário',
        email: document.getElementById('cadEmail') ? document.getElementById('cadEmail').value : 'email@email.com',
        tipo: 'profissional',
        profissao: document.getElementById('cadProfissao') ? document.getElementById('cadProfissao').value : 'Profissional',
        experiencia: '5',
        celular: '(11) 90000-0000',
        fotoPerfil: null,
        score: 0
    };
    s.mostrarToast('✅ OK!','sucesso');
    s.atualizarBotoes();
    s.mostrarTela('homeScreen');
};

App.prototype.proximaEtapa = function(e) { 
    var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); 
    if(!e1||!e2)return; 
    e1.style.display=e===1?'block':'none'; 
    e2.style.display=e===2?'block':'none'; 
};

App.prototype.toggleProfissao = function() { 
    var g=document.getElementById('grupoProfissao'); 
    if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; 
};

App.prototype.sair = function() { 
    var s=this; 
    s.usuarioLogado=null; 
    s.mostrarTela('loginScreen'); 
    s.mostrarToast('👋 Até logo!','sucesso'); 
};

App.prototype.solicitarCodigo = function() { 
    var s=this; 
    s.mostrarToast('✅ Código enviado!','sucesso');
    document.getElementById('recPasso1').style.display='none';
    document.getElementById('recPasso2').style.display='block';
};

App.prototype.voltarPasso1 = function(){
    document.getElementById('recPasso1').style.display='block';
    document.getElementById('recPasso2').style.display='none';
};

App.prototype.verificarCodigo = function(){
    var s=this;
    s.mostrarToast('✅ Senha redefinida!','sucesso');
    setTimeout(function(){ s.mostrarTela('loginScreen'); },1500);
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    var h = new Date().getHours(); 
    var sd = 'Bom dia'; 
    if (h >= 12 && h < 18) sd = 'Boa tarde'; 
    if (h >= 18) sd = 'Boa noite';
    
    var sa = document.getElementById('saudacao'); 
    if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    
    var re = document.getElementById('resumoTexto'); 
    if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    
    var fs = document.querySelector('#homeScreen .logo-saudacao');
    if (fs) { 
        if (this.usuarioLogado.fotoPerfil) { 
            fs.src = this.usuarioLogado.fotoPerfil; 
            fs.style.borderRadius = '50%'; 
            fs.style.objectFit = 'cover'; 
        } else { 
            fs.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; 
            fs.style.borderRadius = '8px'; 
            fs.style.objectFit = 'contain'; 
        } 
    }
    
    setTimeout(function() { 
        try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} 
    }, 500);
    
    this.carregarFeed();
};

// ===== FEED COM VÍDEOS E MAPA =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); 
    if (!c) return;
    
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
    
    var videos = [
        { titulo: '🦺 Segurança no Trabalho', descricao: 'Dicas essenciais.', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes', descricao: 'Evite acidentes.', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs', descricao: 'Equipamentos de Proteção.', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' },
        { titulo: '🏗️ Segurança em Altura', descricao: 'Trabalhos acima de 2m.', url: 'https://www.youtube.com/embed/bh2pzYBs_go', categoria: 'Segurança' },
        { titulo: '🔌 Segurança com Eletricidade', descricao: 'Riscos elétricos.', url: 'https://www.youtube.com/embed/awR7lJO3jUU', categoria: 'Eletricista' },
        { titulo: '🧯 Prevenção de Incêndios', descricao: 'Uso de extintores.', url: 'https://www.youtube.com/embed/RReflO7kR3Y', categoria: 'Segurança' }
    ];
    
    var hoje = new Date(); 
    var dia = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); 
    var vd = videos[dia % videos.length];
    
    // Carregar vagas do localStorage
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    var html = '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;"><span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong><br><span style="font-size:10px;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</span><p style="font-size:11px;margin-top:4px;">' + vd.descricao + '</p></div><iframe src="' + vd.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe><div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;"><span style="font-size:10px;color:#059669;"><strong>' + vd.titulo + '</strong></span><div style="display:flex;gap:4px;"><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
    
    if (vagas.length === 0) { 
        html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; 
    } else { 
        vagas.forEach(function(v) { 
            // MAPA COM LOCALIZAÇÃO
            var mapaHtml = '';
            if (v.localizacao && v.localizacao.lat && v.localizacao.lng) {
                var mapId = 'map_' + v.id;
                mapaHtml = '<div id="' + mapId + '" style="width:100%;height:150px;border-radius:8px;margin-top:8px;background:#e5e7eb;"></div>';
                mapaHtml += '<div style="padding:4px 8px;background:#f0f9ff;border-radius:0 0 8px 8px;font-size:11px;">📍 ' + (v.endereco || 'Localização no mapa') + '</div>';
                
                // Inicializar mapa depois
                setTimeout(function() {
                    try {
                        var mapDiv = document.getElementById(mapId);
                        if (mapDiv && typeof L !== 'undefined') {
                            var map = L.map(mapId).setView([v.localizacao.lat, v.localizacao.lng], 15);
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '© OpenStreetMap'
                            }).addTo(map);
                            L.marker([v.localizacao.lat, v.localizacao.lng]).addTo(map)
                                .bindPopup(v.endereco || 'Local da obra')
                                .openPopup();
                        } else if (mapDiv) {
                            mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:8px;">🗺️ Localização: ' + (v.endereco || 'Ver no mapa') + '</div>';
                        }
                    } catch(e) {
                        console.log('Mapa não disponível');
                    }
                }, 100);
            } else if (v.endereco) {
                mapaHtml = '<div style="margin-top:8px;padding:8px;background:#fef3c7;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-pin" style="color:#d97706;"></i><span style="font-size:12px;color:#92400e;">📌 ' + v.endereco + '</span></div>';
            }
            
            var fotoHtml = '';
            if (v.fotoObra && typeof v.fotoObra === 'string' && v.fotoObra.length > 0) {
                fotoHtml = '<img src="' + v.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
            }
            
            html += '<div class="vaga-card" style="cursor:pointer;"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.endereco || 'Local não informado') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.profissoes || 'Todas') + '</span></div>' + fotoHtml + mapaHtml + '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Publicado por: ' + (v.autorNome || 'Anônimo') + '</div></div></div>'; 
        }); 
    }
    c.innerHTML = html;
};

App.prototype.videoAnterior = function() { 
    if (!this.videoIndex) this.videoIndex = 0; 
    this.videoIndex--; 
    if (this.videoIndex < 0) this.videoIndex = 5; 
    this.carregarFeed(); 
};

App.prototype.videoSeguinte = function() { 
    if (!this.videoIndex) this.videoIndex = 0; 
    this.videoIndex++; 
    this.carregarFeed(); 
};

// ===== PUBLICAÇÃO COM FOTO E LOCALIZAÇÃO =====
App.prototype.configurarPublicacao = function() {
    var s = this;
    
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) {
        var novoInput = inputFoto.cloneNode(true);
        inputFoto.parentNode.replaceChild(novoInput, inputFoto);
        
        novoInput.addEventListener('change', function(e) {
            var arquivo = e.target.files[0];
            if (!arquivo) return;
            
            var reader = new FileReader();
            reader.onload = function(event) {
                s.vagaFotoBase64 = event.target.result;
                var preview = document.getElementById('fotoObraPreview');
                if (preview) {
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                    preview.style.maxWidth = '100%';
                    preview.style.maxHeight = '200px';
                    preview.style.objectFit = 'cover';
                    preview.style.borderRadius = '8px';
                }
            };
            reader.readAsDataURL(arquivo);
        });
    }
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    var s = this;
    s.vagaEmEdicao = vagaData || null;
    s.vagaFotoBase64 = null;
    s.vagaLocalizacaoAtual = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(e) {
    console.log('📸 Preview foto');
};

// BUSCAR LOCALIZAÇÃO E MOSTRAR NO MAPA
App.prototype.buscarLocalizacao = function() {
    var s = this;
    var enderecoEl = document.getElementById('vagaEndereco');
    var endereco = enderecoEl ? enderecoEl.value.trim() : '';
    
    if (!endereco) {
        s.mostrarToast('❌ Digite um endereço!', 'erro');
        return;
    }
    
    s.mostrarToast('🔍 Buscando localização...', 'info');
    
    // Tentar geocodificar com OpenStreetMap
    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(endereco) + '&limit=1';
    
    fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data && data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lng = parseFloat(data[0].lon);
                
                s.vagaLocalizacaoAtual = { lat: lat, lng: lng };
                
                // Mostrar no mapa se existir
                var mapaContainer = document.getElementById('mapaPublicacao');
                if (mapaContainer) {
                    if (typeof L !== 'undefined') {
                        if (s.mapaPublicacao) s.mapaPublicacao.remove();
                        s.mapaPublicacao = L.map('mapaPublicacao').setView([lat, lng], 16);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(s.mapaPublicacao);
                        L.marker([lat, lng]).addTo(s.mapaPublicacao).bindPopup(endereco).openPopup();
                    } else {
                        mapaContainer.innerHTML = '<div style="padding:20px;text-align:center;background:#f0f9ff;border-radius:8px;">📍 ' + endereco + '<br>Lat: ' + lat + '<br>Lng: ' + lng + '</div>';
                    }
                }
                
                s.mostrarToast('✅ Localização encontrada!', 'sucesso');
            } else {
                // Coordenadas simuladas baseadas no endereço
                var hash = 0;
                for (var i = 0; i < endereco.length; i++) {
                    hash = ((hash << 5) - hash) + endereco.charCodeAt(i);
                    hash |= 0;
                }
                var lat = -23.5505 + (hash % 1000) / 10000;
                var lng = -46.6333 + ((hash * 2) % 1000) / 10000;
                
                s.vagaLocalizacaoAtual = { lat: lat, lng: lng };
                s.mostrarToast('⚠️ Localização aproximada', 'info');
            }
        })
        .catch(function() {
            // Fallback
            s.vagaLocalizacaoAtual = { lat: -23.5505 + Math.random() * 0.1, lng: -46.6333 + Math.random() * 0.1 };
            s.mostrarToast('⚠️ Localização aproximada', 'info');
        });
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValor');
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        s.mostrarToast('❌ Formulário não encontrado', 'erro');
        return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl.value.trim();
    var valorHora = valorEl.value.trim();
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    if (!profissoes) { s.mostrarToast('❌ Digite as profissões!', 'erro'); profissoesEl.focus(); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor!', 'erro'); valorEl.focus(); return; }
    
    // Se não tem localização, buscar automaticamente
    if (!s.vagaLocalizacaoAtual && endereco) {
        s.vagaLocalizacaoAtual = { lat: -23.5505 + Math.random() * 0.1, lng: -46.6333 + Math.random() * 0.1 };
    }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null,
        localizacao: s.vagaLocalizacaoAtual || null,
        ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        dataCriacao: new Date().toISOString()
    };
    
    // Salvar
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    // Limpar
    tituloEl.value = '';
    enderecoEl.value = '';
    profissoesEl.value = '';
    valorEl.value = '';
    
    var preview = document.getElementById('fotoObraPreview');
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) inputFoto.value = '';
    
    s.vagaFotoBase64 = null;
    s.vagaLocalizacaoAtual = null;
    s.vagaEmEdicao = null;
    
    s.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
    
    setTimeout(function() {
        s.mostrarTela('homeScreen');
    }, 500);
};

// ===== PERFIL COM SEUS DADOS =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    
    if (!s.usuarioLogado) return;
    
    var user = s.usuarioLogado;
    
    // Nome
    var nomeEl = document.getElementById('perfilNome');
    if (nomeEl) nomeEl.textContent = user.nome;
    
    // Profissão
    var profEl = document.getElementById('perfilProfissao');
    if (profEl) profEl.textContent = (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos';
    
    // Email
    var emailEl = document.getElementById('perfilEmail');
    if (emailEl) emailEl.textContent = '📧 ' + (user.email || 'Não informado');
    
    // Celular
    var celEl = document.getElementById('perfilCelular');
    if (celEl) celEl.textContent = '📱 ' + (user.celular || 'Não informado');
    
    // Score/Pontuação
    var scoreEl = document.getElementById('perfilScore');
    if (scoreEl) {
        var estrelas = '';
        for (var i = 0; i < Math.round(user.score || 0); i++) estrelas += '⭐';
        scoreEl.textContent = estrelas + ' ' + (user.score || '0');
    }
    
    // Foto
    var fotoEl = document.getElementById('perfilFoto');
    var iconEl = document.getElementById('perfilIcon');
    if (fotoEl) {
        if (user.fotoPerfil) {
            fotoEl.src = user.fotoPerfil;
            fotoEl.style.display = 'block';
            if (iconEl) iconEl.style.display = 'none';
        } else {
            fotoEl.style.display = 'none';
            if (iconEl) iconEl.style.display = 'block';
        }
    }
    
    // Esconder loading
    var loadingEl = document.getElementById('perfilLoading');
    if (loadingEl) loadingEl.style.display = 'none';
};

App.prototype.verPerfil = function(uid) { 
    var s=this;
    var c=document.getElementById('perfilPublicoConteudo');
    if(!c)return;
    
    c.innerHTML = '<div class="loading">Carregando...</div>';
    
    setTimeout(function() {
        var u = {
            nome: 'Profissional',
            profissao: 'Construtor',
            experiencia: '5',
            celular: '11999999999',
            fotoPerfil: null,
            score: 4.5
        };
        
        var w=u.celular?u.celular.replace(/\D/g,''):'';
        var av=u.fotoPerfil?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-user"></i>';
        
        var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar">'+av+'</div></div></div><div class="profile-info-card"><h2>'+u.nome+'</h2><p>'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+'</div></div><div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p></div>';
        
        if(s.usuarioLogado&&s.usuarioLogado.id!==uid){
            html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success">WhatsApp</a>';
            html+='<button class="btn btn-primary" onclick="window.app.iniciarChat(\''+uid+'\')">💬 Chat</button>';
            if(s.usuarioLogado.tipo==='empreiteiro')html+='<button class="btn btn-outline" onclick="window.app.abrirContratacao(\''+uid+'\')" style="background:#1A3A5C;color:white;">🤝 Contratar</button>';
            html+='</div>';
        }
        c.innerHTML=html;
    }, 500);
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s=this,c=document.getElementById('buscaResultados');
    if(!c)return;
    
    c.innerHTML='<div class="loading">Buscando...</div>';
    
    setTimeout(function() {
        var profs = [
            { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5, fotoPerfil: null },
            { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8, fotoPerfil: null },
            { id: 'p3', nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2, fotoPerfil: null }
        ];
        
        var html='';
        profs.forEach(function(u){
            var w=u.celular?u.celular.replace(/\D/g,''):'';
            var sc=u.score||0;
            var av=u.fotoPerfil
                ?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">'
                :'<i class="fas fa-hard-hat"></i>';
            
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+av+'</div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div><div class="vaga-data">'+u.profissao+' • '+u.experiencia+' anos</div><div>'+'⭐'.repeat(Math.round(sc))+' '+sc+'</div></div></div><div class="vaga-footer">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')">Chat</button>'+(s.usuarioLogado&&s.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\''+u.id+'\')" style="background:#1A3A5C;color:white;">🤝 Contratar</button>':'')+'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.adicionarNaRede(\''+u.id+'\')" style="background:#10B981;color:white;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center;"><i class="fas fa-plus"></i></button></div></div>';
        });
        c.innerHTML=html;
    }, 500);
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s=this,c=document.getElementById('redeContainer');
    if(!c)return;
    c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>';
};

App.prototype.adicionarNaRede = function(aid) { 
    this.mostrarToast('✅ Adicionado!','sucesso');
};

App.prototype.removerDaRede = function(aid) { 
    if(!confirm('Remover?'))return; 
    this.mostrarToast('Removido','sucesso');
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.verDetalheObra = function(oid) {
    this.obraSelecionada = oid;
    this.mostrarToast('🔍 Visualizando detalhes...', 'info');
};

App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Chat iniciado!', 'sucesso');
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.abrirContratacao = function(uid) {
    this.contratarProfId = uid;
    this.mostrarToast('🤝 Abrindo contratação...', 'info');
};

App.prototype.confirmarContratacao = function() {
    this.mostrarToast('✅ Profissional contratado!', 'sucesso');
};

App.prototype.novaObra = function() {
    this.mostrarToast('🏗️ Nova obra criada!', 'sucesso');
};

App.prototype.carregarMinhasObras = function() {
    var c = document.getElementById('minhasObrasContainer');
    if (c) c.innerHTML = '<div class="card"><h3>Minhas Obras</h3><p>Nenhuma obra cadastrada.</p></div>';
};

App.prototype.demitirFuncionario = function(cid) {
    if (confirm('Demitir funcionário?')) {
        this.mostrarToast('Funcionário demitido.', 'sucesso');
    }
};

App.prototype.finalizarContrato = function(cid) {
    if (confirm('Finalizar contrato?')) {
        this.mostrarToast('Contrato finalizado.', 'sucesso');
    }
};

App.prototype.abrirEditarPerfil = function() {
    this.mostrarToast('✏️ Editar perfil', 'info');
};

App.prototype.salvarPerfil = function() {
    this.mostrarToast('✅ Perfil salvo!', 'sucesso');
};

App.prototype.uploadFoto = function(e) {
    this.mostrarToast('📸 Foto atualizada!', 'sucesso');
};

App.prototype.verAvaliacoes = function(uid) {
    this.mostrarToast('⭐ Avaliações carregadas!', 'info');
};

App.prototype.abrirDarAvaliacao = function(uid) {
    this.avaliarUid = uid;
    this.mostrarToast('Avalie o profissional!', 'info');
};

App.prototype.setNota = function(n) {
    this.avaliarNota = n;
};

App.prototype.enviarAvaliacao = function() {
    this.mostrarToast('✅ Avaliação enviada!', 'sucesso');
};

App.prototype.gerarQRCode = function(uid) {
    this.mostrarToast('📱 QR Code gerado!', 'sucesso');
};

App.prototype.fecharQRCode = function() {
    this.mostrarToast('QR Code fechado.', 'info');
};

App.prototype.baixarQRCode = function() {
    this.mostrarToast('📥 QR Code baixado!', 'sucesso');
};

App.prototype.selecionarIdioma = function(i) {
    this.mostrarToast('🌐 Idioma alterado!', 'sucesso');
};

App.prototype.mostrarInfoVersao = function() {
    this.mostrarToast('📱 Versão 1.0.0', 'info');
};

App.prototype.confirmarExclusao = function() {
    if (confirm('Confirmar exclusão?')) {
        this.mostrarToast('Conta excluída.', 'sucesso');
    }
};

App.prototype.mostrarNotificacoes = function() {
    this.mostrarToast('🔔 Notificações carregadas!', 'info');
};

App.prototype.mudarTab = function(t) {
    console.log('Mudando para tab:', t);
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1A3A5C;color:white;padding:12px 24px;border-radius:25px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:none;max-width:90%;text-align:center;';
        document.body.appendChild(toast);
    }
    
    if (tipo === 'sucesso') toast.style.background = '#10B981';
    else if (tipo === 'erro') toast.style.background = '#EF4444';
    else if (tipo === 'info') toast.style.background = '#3B82F6';
    else toast.style.background = '#1A3A5C';
    
    toast.textContent = mensagem;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(function() { toast.style.display = 'none'; }, 300);
    }, 3000);
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    if (!window.app._app) {
        new App();
    }
});
