// ==========================================================
// ===== LPXCONSTRUTOR - CORRIGIDO REDE + VOLTAR + BUSCA =====
// ==========================================================

var appInstancia = null;

function fazerLogin() { if(appInstancia) appInstancia.fazerLogin(); }
function cadastrar() { if(appInstancia) appInstancia.cadastrar(); }
function mostrarTela(id) { if(appInstancia) appInstancia.mostrarTela(id); }
function voltarTela() { if(appInstancia) appInstancia.voltarTela(); }
function sair() { if(appInstancia) appInstancia.sair(); }
function buscarProfissionais() { if(appInstancia) appInstancia.buscarProfissionais(); }
function verPerfil(uid) { if(appInstancia) appInstancia.verPerfil(uid); }
function abrirTelaPublicacao() { if(appInstancia) appInstancia.abrirTelaPublicacao(); }
function publicarVaga() { if(appInstancia) appInstancia.publicarVaga(); }
function previewFotoObra(e) { if(appInstancia) appInstancia.previewFotoObra(e); }
function carregarMinhasObras() { if(appInstancia) appInstancia.carregarMinhasObras(); }
function verDetalheObra(oid) { if(appInstancia) appInstancia.verDetalheObra(oid); }
function uploadFotoPerfil(e) { if(appInstancia) appInstancia.uploadFotoPerfil(e); }
function abrirEditarPerfil() { if(appInstancia) appInstancia.abrirEditarPerfil(); }
function salvarPerfil() { if(appInstancia) appInstancia.salvarPerfil(); }
function mostrarSecao(s) { if(appInstancia) appInstancia.mostrarSecao(s); }
function selecionarTema(t) { if(appInstancia) appInstancia.selecionarTema(t); }
function selecionarIdioma(i) { if(appInstancia) appInstancia.selecionarIdioma(i); }
function mostrarDocumento(t) { if(appInstancia) appInstancia.mostrarDocumento(t); }
function mostrarInfoVersao() { if(appInstancia) appInstancia.mostrarInfoVersao(); }
function mudarTab(t) { if(appInstancia) appInstancia.mudarTab(t); }
function adicionarNaRede(uid) { if(appInstancia) appInstancia.adicionarNaRede(uid); }
function removerDaRede(uid) { if(appInstancia) appInstancia.removerDaRede(uid); }
function apagarObra(oid, event) { if(appInstancia) appInstancia.apagarObra(oid, event); }
function mostrarNotificacoes() { if(appInstancia) appInstancia.mostrarNotificacoes(); }
function iniciarChat(uid) { if(appInstancia) appInstancia.iniciarChat(uid); }
function enviarMensagem() { if(appInstancia) appInstancia.enviarMensagem(); }
function fecharModal(id) { var m = document.getElementById(id); if(m) m.remove(); }

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.usuarioSelecionado = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR');
    appInstancia = s;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    var splashAntigo = document.getElementById('splashScreen');
    if (splashAntigo) splashAntigo.remove();
    
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
    
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    // NÃO adicionar popstate - isso fecha o app
    // window.addEventListener('popstate', ...) REMOVIDO
    
    setTimeout(function() {
        splash.style.opacity = '0';
        setTimeout(function() {
            if (splash.parentNode) splash.remove();
            if (s.usuarioLogado) { s.mostrarTela('homeScreen'); }
            else { s.mostrarTela('loginScreen'); }
        }, 500);
    }, 2000);
};

// ===== NAVEGAÇÃO (SEM FECHAR O APP) =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Tela:', id);
    
    var splash = document.getElementById('splashScreen');
    if (splash) splash.remove();
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    var telas = document.querySelectorAll('.screen');
    for (var i = 0; i < telas.length; i++) {
        telas[i].classList.remove('active');
        telas[i].style.display = 'none';
    }
    
    var tela = document.getElementById(id);
    if (!tela) {
        tela = document.createElement('div');
        tela.id = id;
        tela.className = 'screen';
        tela.style.display = 'none';
        document.body.appendChild(tela);
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen' && s.usuarioSelecionado) s.carregarMensagens();
};

App.prototype.voltarTela = function() {
    var splash = document.getElementById('splashScreen');
    if (splash) splash.remove();
    
    if (this.historicoTelas.length > 0) {
        var ant = this.historicoTelas.pop();
        this.telaAtual = null;
        this.mostrarTela(ant);
    } else {
        // NÃO FECHAR O APP - apenas voltar para home
        this.mostrarTela('homeScreen');
    }
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    if (!email || !senha) return;
    
    var e = email.value.trim();
    var p = senha.value.trim();
    if (!e || !p) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    
    // Tentar Firebase primeiro
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(e, p).then(function(userCredential) {
            var user = userCredential.user;
            // Buscar dados no Firestore
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                    if (doc.exists) {
                        var userData = doc.data();
                        userData.id = doc.id;
                        s.usuarioLogado = userData;
                        localStorage.setItem('usuarioLPX', JSON.stringify(userData));
                        s.historicoTelas = [];
                        s.mostrarToast('Bem-vindo, ' + userData.nome + '!', 'sucesso');
                        s.mostrarTela('homeScreen');
                    }
                });
            }
        }).catch(function() {
            // Fallback para localStorage
            s.loginLocal(e, p);
        });
    } else {
        s.loginLocal(e, p);
    }
};

App.prototype.loginLocal = function(e, p) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === e.toLowerCase() && usuarios[i].senha === p) {
            s.usuarioLogado = usuarios[i];
            localStorage.setItem('usuarioLPX', JSON.stringify(usuarios[i]));
            s.historicoTelas = [];
            s.mostrarToast('Bem-vindo, ' + usuarios[i].nome + '!', 'sucesso');
            s.mostrarTela('homeScreen');
            return;
        }
    }
    s.mostrarToast('Email ou senha incorretos!', 'erro');
};

// ===== CADASTRO =====
App.prototype.cadastrar = function() {
    var s = this;
    var dados = {
        id: 'user_' + Date.now(),
        nome: document.getElementById('cadNome')?.value?.trim() || '',
        email: document.getElementById('cadEmail')?.value?.trim() || '',
        senha: document.getElementById('cadSenha')?.value?.trim() || '',
        tipo: document.getElementById('cadTipo')?.value || 'profissional',
        celular: document.getElementById('cadCelular')?.value?.trim() || '',
        profissao: document.getElementById('cadProfissao')?.value?.trim() || '',
        experiencia: document.getElementById('cadExperiencia')?.value?.trim() || '0',
        score: 0, fotoPerfil: null, dataCadastro: new Date().toISOString()
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('Preencha todos os campos!', 'erro'); return;
    }
    
    // Salvar no localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === dados.email.toLowerCase()) {
            s.mostrarToast('Email já cadastrado!', 'erro'); return;
        }
    }
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    
    // Salvar no Firebase também
    if (typeof db !== 'undefined') {
        db.collection('usuarios').add(dados).then(function(docRef) {
            dados.id = docRef.id;
            localStorage.setItem('usuarioLPX', JSON.stringify(dados));
        }).catch(function() {});
    }
    
    console.log('✅ Cadastrado:', dados.nome, '| Tipo:', dados.tipo);
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.historicoTelas = [];
    s.mostrarToast('Cadastro realizado!', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut();
    this.historicoTelas = [];
    this.mostrarTela('loginScreen');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var user = s.usuarioLogado;
    var home = document.getElementById('homeScreen');
    if (!home) return;
    
    var h = new Date().getHours();
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var html = '';
    html += '<div style="background:#1A3A5C;color:white;padding:12px 15px;display:flex;align-items:center;">';
    html += '<div class="foto-usuario" style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    }
    html += '</div>';
    html += '<div style="flex:1;"><span style="font-size:15px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div>';
    html += '<span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span>';
    html += '</div>';
    
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;">';
    html += '<button id="tabFeed" onclick="mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>';
    html += '<button id="tabRede" onclick="mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>';
    html += '</div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div>';
    html += '<div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    if (user.tipo === 'empreiteiro') {
        html += '<button onclick="abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
    }
    
    home.innerHTML = html;
    s.carregarFeed();
};

App.prototype.mudarTab = function(tab) {
    this.tabAtual = tab;
    var btnFeed = document.getElementById('tabFeed');
    var btnRede = document.getElementById('tabRede');
    if (btnFeed) { btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; }
    if (btnRede) { btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; }
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer');
    if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none';
    if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this;
    var c = document.getElementById('feedContainer');
    if (!c) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    // Também buscar do Firebase
    if (typeof db !== 'undefined') {
        db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
            snap.forEach(function(doc) {
                var v = doc.data(); v.id = doc.id;
                if (!vagas.find(function(x) { return x.id === v.id; })) vagas.push(v);
            });
            s.renderizarFeed(c, vagas);
        }).catch(function() {
            s.renderizarFeed(c, vagas);
        });
    } else {
        s.renderizarFeed(c, vagas);
    }
};

App.prototype.renderizarFeed = function(c, vagas) {
    var s = this;
    
    if (vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        var destaque = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + (destaque ? 'border:3px solid #f59e0b;' : '') + '">';
        if (destaque) {
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">';
            html += '<span style="background:#f59e0b;color:white;padding:3px 10px;border-radius:10px;font-size:11px;">⭐ SUA OBRA</span>';
            html += '<button onclick="apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button>';
            html += '</div>';
        }
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        html += '<div onclick="verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">';
        html += '<div style="font-weight:bold;font-size:16px;">' + v.titulo + '</div>';
        html += '<div style="color:#666;font-size:13px;">📍 ' + v.endereco + '</div>';
        html += '<div style="margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div></div></div>';
    }
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid, event) {
    if (event) event.stopPropagation();
    if (!confirm('Apagar esta obra?')) return;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var novas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id !== oid) novas.push(vagas[i]);
    }
    localStorage.setItem('vagasLPX', JSON.stringify(novas));
    if (typeof db !== 'undefined') db.collection('vagas').doc(oid).delete().catch(function(){});
    this.mostrarToast('Obra apagada!', 'sucesso');
    this.carregarFeed();
};

// ===== NOTIFICAÇÕES =====
App.prototype.adicionarNotificacao = function(usuarioId, titulo, mensagem) {
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({ id: 'notif_' + Date.now(), usuarioId: usuarioId, titulo: titulo, mensagem: mensagem, lida: false, data: new Date().toISOString() });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
};

App.prototype.mostrarNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var minhasNotif = [];
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) minhasNotif.push(notificacoes[i]);
    }
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) notificacoes[i].lida = true;
    }
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    var html = '<div id="modalNotificacoes" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)fecharModal(\'modalNotificacoes\')">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    html += '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between;">';
    html += '<h3 style="margin:0;">🔔 Notificações</h3>';
    html += '<button onclick="fecharModal(\'modalNotificacoes\')" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button>';
    html += '</div><div style="padding:15px;">';
    
    if (minhasNotif.length === 0) {
        html += '<div style="text-align:center;padding:40px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>';
    } else {
        for (var i = 0; i < minhasNotif.length; i++) {
            var n = minhasNotif[i];
            html += '<div style="background:#f9fafb;border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;">';
            html += '<div style="font-weight:bold;">' + n.titulo + '</div>';
            html += '<div style="font-size:13px;color:#666;">' + n.mensagem + '</div>';
            html += '<div style="font-size:10px;color:#999;">' + new Date(n.data).toLocaleString('pt-BR') + '</div>';
            html += '</div>';
        }
    }
    html += '</div></div></div>';
    fecharModal('modalNotificacoes');
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== REDE (CORRIGIDA - BUSCA NO FIREBASE E LOCALSTORAGE) =====
App.prototype.carregarRede = function() {
    var s = this;
    var c = document.getElementById('redeContainer');
    if (!c) {
        console.log('❌ redeContainer não encontrado');
        return;
    }
    
    if (!s.usuarioLogado) {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Faça login</h3></div>';
        return;
    }
    
    c.innerHTML = '<div style="text-align:center;padding:30px;">🔗 Carregando rede...</div>';
    
    console.log('🔗 Buscando conexões...');
    
    // Buscar conexões do localStorage
    var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhasConexoes = [];
    for (var i = 0; i < conexoesLocal.length; i++) {
        if (conexoesLocal[i].usuarioId === s.usuarioLogado.id || conexoesLocal[i].amigoId === s.usuarioLogado.id) {
            minhasConexoes.push(conexoesLocal[i]);
        }
    }
    
    // Buscar do Firebase também
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if (d.usuarioId === s.usuarioLogado.id || d.amigoId === s.usuarioLogado.id) {
                    var existe = minhasConexoes.find(function(c) {
                        return (c.usuarioId === d.usuarioId && c.amigoId === d.amigoId) ||
                               (c.usuarioId === d.amigoId && c.amigoId === d.usuarioId);
                    });
                    if (!existe) {
                        minhasConexoes.push({ id: doc.id, usuarioId: d.usuarioId, amigoId: d.amigoId, status: d.status || 'ativo' });
                    }
                }
            });
            
            console.log('📊 Conexões encontradas:', minhasConexoes.length);
            s.renderizarRede(c, minhasConexoes);
        }).catch(function() {
            s.renderizarRede(c, minhasConexoes);
        });
    } else {
        s.renderizarRede(c, minhasConexoes);
    }
};

App.prototype.renderizarRede = function(c, conexoes) {
    var s = this;
    
    if (conexoes.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🔗</div>' +
            '<h3 style="color:#1A3A5C;">Sua rede está vazia</h3>' +
            '<p style="color:#666;">Conecte-se com profissionais</p>' +
            '<button onclick="mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Profissionais</button>' +
            '</div>';
        return;
    }
    
    // Buscar dados dos amigos
    var usuariosLocal = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var html = '<div style="text-align:center;padding:10px;color:#1A3A5C;font-weight:bold;">🔗 ' + conexoes.length + ' conexão(ões)</div>';
    
    var processados = 0;
    
    for (var i = 0; i < conexoes.length; i++) {
        var con = conexoes[i];
        var amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId;
        
        // Buscar no localStorage primeiro
        var amigo = usuariosLocal.find(function(u) { return u.id === amigoId; });
        
        if (amigo) {
            html += s.criarCardAmigo(amigo, amigoId, con);
            processados++;
        } else if (typeof db !== 'undefined') {
            // Buscar no Firebase
            db.collection('usuarios').doc(amigoId).get().then(function(doc) {
                if (doc.exists) {
                    var amigoData = doc.data();
                    amigoData.id = doc.id;
                    // Salvar no localStorage
                    if (!usuariosLocal.find(function(u) { return u.id === amigoData.id; })) {
                        usuariosLocal.push(amigoData);
                        localStorage.setItem('usuariosLPX', JSON.stringify(usuariosLocal));
                    }
                    html += s.criarCardAmigo(amigoData, amigoId, con);
                }
                processados++;
                if (processados >= conexoes.length) {
                    c.innerHTML = html + '<button onclick="mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>';
                }
            }).catch(function() {
                processados++;
                if (processados >= conexoes.length) {
                    c.innerHTML = html + '<button onclick="mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>';
                }
            });
        } else {
            processados++;
        }
    }
    
    // Se todos foram processados (localStorage)
    if (processados >= conexoes.length) {
        c.innerHTML = html + '<button onclick="mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>';
    }
};

App.prototype.criarCardAmigo = function(amigo, amigoId, con) {
    var html = '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
    html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="verPerfil(\'' + amigoId + '\')">';
    html += amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>';
    html += '</div>';
    html += '<div style="flex:1;cursor:pointer;" onclick="verPerfil(\'' + amigoId + '\')"><strong>' + (amigo.nome || 'Usuário') + '</strong><br><small>' + (amigo.profissao || 'Profissional') + '</small></div>';
    html += '<button onclick="event.stopPropagation();iniciarChat(\'' + amigoId + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button>';
    html += '<button onclick="event.stopPropagation();removerDaRede(\'' + amigoId + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;font-size:18px;">✕</button>';
    html += '</div>';
    return html;
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    for (var i = 0; i < conexoes.length; i++) {
        var c = conexoes[i];
        if ((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id)) {
            s.mostrarToast('Já está na rede!', 'erro'); return;
        }
    }
    
    var novaConexao = { id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' };
    conexoes.push(novaConexao);
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').add({
            usuarioId: s.usuarioLogado.id,
            amigoId: amigoId,
            status: 'ativo',
            dataCriacao: new Date().toISOString()
        }).catch(function(){});
    }
    
    s.mostrarToast('✅ Adicionado à rede!', 'sucesso');
    s.carregarRede();
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    if (!confirm('Remover esta conexão?')) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var novas = [];
    for (var i = 0; i < conexoes.length; i++) {
        var c = conexoes[i];
        if (!((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id))) {
            novas.push(c);
        }
    }
    localStorage.setItem('conexoesLPX', JSON.stringify(novas));
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if ((d.usuarioId === s.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === s.usuarioLogado.id)) {
                    db.collection('conexoes').doc(doc.id).delete();
                }
            });
        }).catch(function(){});
    }
    
    s.mostrarToast('Removido', 'sucesso');
    s.carregarRede();
};

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    
    if (!user && typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                var u = doc.data(); u.id = doc.id;
                s.usuarioSelecionado = u;
                s.abrirChat(u);
            }
        });
        return;
    }
    
    if (!user) return;
    s.usuarioSelecionado = user;
    s.abrirChat(user);
};

App.prototype.abrirChat = function(user) {
    var s = this;
    
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<button onclick="voltarTela()" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
        '<strong>💬 ' + user.nome + '</strong></div>' +
        '<div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div>' +
        '<div style="padding:10px;background:white;display:flex;gap:10px;">' +
        '<input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;">' +
        '<button onclick="enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>';
    
    s.mostrarTela('chatScreen');
    s.carregarMensagens();
};

App.prototype.carregarMensagens = function() {
    var s = this;
    var c = document.getElementById('chatMensagens');
    if (!c || !s.usuarioSelecionado) return;
    
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    var relevantes = [];
    for (var i = 0; i < mensagens.length; i++) {
        var m = mensagens[i];
        if ((m.remetenteId === s.usuarioLogado.id && m.destinatarioId === s.usuarioSelecionado.id) ||
            (m.remetenteId === s.usuarioSelecionado.id && m.destinatarioId === s.usuarioLogado.id)) {
            relevantes.push(m);
        }
    }
    
    if (relevantes.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < relevantes.length; i++) {
        var m = relevantes[i];
        var ehMeu = m.remetenteId === s.usuarioLogado.id;
        html += '<div style="display:flex;justify-content:' + (ehMeu ? 'flex-end' : 'flex-start') + ';margin-bottom:10px;">';
        html += '<div style="max-width:70%;padding:10px 15px;border-radius:15px;' + (ehMeu ? 'background:#1A3A5C;color:white;' : 'background:white;') + '">';
        html += m.conteudo + '<div style="font-size:10px;opacity:0.7;">' + new Date(m.data).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) + '</div>';
        html += '</div></div>';
    }
    c.innerHTML = html;
    c.scrollTop = c.scrollHeight;
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioSelecionado) return;
    var texto = input.value.trim();
    if (!texto) return;
    
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    mensagens.push({
        id: 'msg_' + Date.now(),
        remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id,
        conteudo: texto, data: new Date().toISOString()
    });
    localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
    s.adicionarNotificacao(s.usuarioSelecionado.id, '💬 Nova mensagem', s.usuarioLogado.nome + ' enviou uma mensagem.');
    input.value = '';
    s.carregarMensagens();
};

// ===== BUSCA (CORRIGIDA) =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    c.innerHTML = '<div style="text-align:center;padding:30px;">🔍 Buscando...</div>';
    
    // Buscar do localStorage
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    
    // Buscar do Firebase também
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('tipo', '==', 'profissional').get().then(function(snap) {
            snap.forEach(function(doc) {
                var u = doc.data(); u.id = doc.id;
                if (!todos.find(function(x) { return x.id === u.id; })) {
                    todos.push(u);
                }
            });
            // Salvar no localStorage
            localStorage.setItem('usuariosLPX', JSON.stringify(todos));
            s.renderizarBusca(c, todos);
        }).catch(function() {
            s.renderizarBusca(c, todos);
        });
    } else {
        s.renderizarBusca(c, todos);
    }
};

App.prototype.renderizarBusca = function(c, todos) {
    var s = this;
    var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    // Filtrar profissionais (não mostrar o próprio)
    var profissionais = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
            profissionais.push(todos[i]);
        }
    }
    
    console.log('👷 Profissionais:', profissionais.length, 'de', todos.length, 'usuários');
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">👷</div>' +
            '<h3>Nenhum profissional encontrado</h3>' +
            '<p style="color:#666;">Total de usuários: <b>' + todos.length + '</b></p>' +
            '<p style="color:#999;font-size:12px;">Cadastre outros usuários como "profissional"</p></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;">👷 ' + profissionais.length + ' profissional(is)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        var score = p.score || 0;
        
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;flex-shrink:0;" onclick="verPerfil(\'' + p.id + '\')">';
        html += p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        html += '</div>';
        html += '<div style="flex:1;cursor:pointer;" onclick="verPerfil(\'' + p.id + '\')">';
        html += '<div style="font-weight:bold;">' + (p.nome || 'Sem nome') + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:12px;color:#999;">📅 ' + (p.experiencia || '0') + ' anos</div>';
        html += '<div style="color:#f59e0b;">⭐ ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button>';
        html += '<button onclick="event.stopPropagation();adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button>';
        html += '</div>';
    }
    
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    
    if (!user && typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                var u = doc.data(); u.id = doc.id;
                s.mostrarPerfilPublico(u);
            } else {
                s.mostrarToast('Não encontrado', 'erro');
            }
        });
        return;
    }
    
    if (!user) { s.mostrarToast('Não encontrado', 'erro'); return; }
    s.mostrarPerfilPublico(user);
};

App.prototype.mostrarPerfilPublico = function(user) {
    var s = this;
    var tela = document.getElementById('perfilPublicoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') +
        '</div><h2>' + (user.nome || 'Usuário') + '</h2>' +
        '<p>🔧 ' + (user.profissao || 'Profissional') + ' | 📅 ' + (user.experiencia || '0') + ' anos</p>' +
        '<p>⭐ ' + (user.score || 0).toFixed(1) + '</p></div>' +
        '<div style="padding:20px;">' +
        '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;">' +
        '<p><strong>📧</strong> ' + (user.email || '') + '</p>' +
        '<p><strong>📱</strong> ' + (user.celular || '') + '</p></div>' +
        '<button onclick="iniciarChat(\'' + user.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">💬 Chat</button>' +
        '<button onclick="adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>';
    
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="padding:20px;max-width:500px;margin:0 auto;">' +
        '<h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2>' +
        '<p style="text-align:center;color:#666;font-size:12px;margin-bottom:20px;">Publicado por: <b>' + s.usuarioLogado.nome + '</b></p>' +
        '<label style="font-weight:bold;color:#1A3A5C;">📌 Título *</label>' +
        '<input id="pubTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<label style="font-weight:bold;color:#1A3A5C;">📍 Endereço *</label>' +
        '<input id="pubEndereco" placeholder="Ex: Rua Exemplo, 123" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<label style="font-weight:bold;color:#1A3A5C;">👷 Profissões</label>' +
        '<input id="pubProfissoes" placeholder="Pedreiro, Eletricista" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<label style="font-weight:bold;color:#1A3A5C;">💰 Valor/hora (R$) *</label>' +
        '<input id="pubValor" type="number" placeholder="25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<label style="font-weight:bold;color:#1A3A5C;">📝 Descrição</label>' +
        '<textarea id="pubDescricao" placeholder="Detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;min-height:60px;box-sizing:border-box;"></textarea>' +
        '<label style="font-weight:bold;color:#1A3A5C;">📸 Foto</label>' +
        '<img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;">' +
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Escolher Foto</button>' +
        '<button onclick="publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('pubFotoPreview').src = e.target.result;
        appInstancia.vagaFotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVaga = function() {
    var s = this;
    var titulo = document.getElementById('pubTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('pubEndereco')?.value?.trim() || '';
    var profissoes = document.getElementById('pubProfissoes')?.value?.trim() || 'Geral';
    var valor = document.getElementById('pubValor')?.value?.trim() || '';
    var descricao = document.getElementById('pubDescricao')?.value?.trim() || '';
    
    if (!titulo) { s.mostrarToast('Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('Digite o endereço!', 'erro'); return; }
    if (!valor) { s.mostrarToast('Digite o valor!', 'erro'); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: valor,
        descricao: descricao, fotoObra: s.vagaFotoBase64 || null, status: 'disponivel',
        autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null, dataCriacao: new Date().toISOString()
    };
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').add(vaga).then(function(docRef) {
            vaga.id = docRef.id;
            vagas[0].id = docRef.id;
            localStorage.setItem('vagasLPX', JSON.stringify(vagas));
        }).catch(function(){});
    }
    
    document.getElementById('pubTitulo').value = '';
    document.getElementById('pubEndereco').value = '';
    document.getElementById('pubProfissoes').value = 'Geral';
    document.getElementById('pubValor').value = '';
    document.getElementById('pubDescricao').value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
    setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800);
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!c || !s.usuarioLogado) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].autorId === s.usuarioLogado.id) minhas.push(vagas[i]);
    }
    
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>';
    for (var i = 0; i < minhas.length; i++) {
        var v = minhas[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div onclick="verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + v.titulo + '</b><br><small>📍 ' + v.endereco + '</small><br>';
        html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + v.valorHora + '/h</span></div>';
        html += '<button onclick="apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;margin-top:5px;">🗑️ Apagar</button>';
        html += '</div>';
    }
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var v = null;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].id === oid) { v = vagas[i]; break; } }
    if (!v) return;
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + v.titulo + '</h2>';
    html += '<p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p><p>💰 R$' + v.valorHora + '/h</p>';
    if (v.descricao) html += '<p>📝 ' + v.descricao + '</p>';
    html += '<p>👤 ' + (v.autorNome || 'Anônimo') + '</p>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button>';
    html += '</div></div></div>';
    
    fecharModal('modalObra');
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== PERFIL DO USUÁRIO =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].autorId === user.id) totalObras++; }
    
    tela.innerHTML = 
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') +
        '</div><input type="file" id="inputFoto" accept="image/*" onchange="uploadFotoPerfil(event)" style="display:none;">' +
        '<p style="font-size:10px;color:#ccc;">Toque para alterar foto</p>' +
        '<h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo || '') + '</p></div>' +
        '<div style="display:flex;gap:5px;padding:15px;">' +
        '<button id="btnInfo" onclick="mostrarSecao(\'info\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">📋 INFO</button>' +
        '<button id="btnConfig" onclick="mostrarSecao(\'config\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">⚙️ CONFIG</button>' +
        '<button id="btnAlertas" onclick="mostrarSecao(\'alertas\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">🔔 ALERTAS</button></div>' +
        '<div id="secaoConteudo" style="padding:15px;"></div>';
    
    s.mostrarSecao('info');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this;
    var c = document.getElementById('secaoConteudo');
    if (!c) return;
    
    ['info', 'config', 'alertas'].forEach(function(sec) {
        var btn = document.getElementById('btn' + sec.charAt(0).toUpperCase() + sec.slice(1));
        if (btn) { btn.style.background = sec === secao ? '#1A3A5C' : '#e5e7eb'; btn.style.color = sec === secao ? 'white' : '#1A3A5C'; }
    });
    
    var user = s.usuarioLogado;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].autorId === user.id) totalObras++; }
    
    if (secao === 'info') {
        c.innerHTML = 
            '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.experiencia || '0') + '</b><br><small>Anos</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.score || 0).toFixed(1) + '</b><br><small>Score</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;cursor:pointer;" onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();"><b style="color:#10B981;">' + totalObras + '</b><br><small>Obras</small></div></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p><p>🔧 ' + (user.profissao || '') + '</p></div>' +
            '<button onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
            '<button onclick="abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
    } else if (secao === 'config') {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><h3>🎨 Tema</h3>' +
            '<button onclick="selecionarTema(\'claro\')" style="background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">☀️ Claro</button>' +
            '<button onclick="selecionarTema(\'escuro\')" style="background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><h3>🌐 Idioma</h3>' +
            '<button onclick="selecionarIdioma(\'pt\')" style="background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">🇧🇷 PT</button>' +
            '<button onclick="selecionarIdioma(\'en\')" style="background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">🇺🇸 EN</button>' +
            '<button onclick="selecionarIdioma(\'es\')" style="background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🇪🇸 ES</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;"><h3>📄 Documentos</h3>' +
            '<button onclick="mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button>' +
            '<button onclick="mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade</button>' +
            '<button onclick="mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;cursor:pointer;">ℹ️ Sobre</button></div>';
    } else {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>';
    }
};

App.prototype.uploadFotoPerfil = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        s.usuarioLogado.fotoPerfil = e.target.result;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        if (typeof db !== 'undefined' && s.usuarioLogado.id) {
            db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: e.target.result }).catch(function(){});
        }
        s.mostrarToast('✅ Foto atualizada!', 'sucesso');
        s.carregarMeuPerfil();
    };
    reader.readAsDataURL(file);
};

App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    
    var html = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;">';
    html += '<h3 style="text-align:center;">✏️ Editar Perfil</h3>';
    html += '<input id="editNome" value="' + (user.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">';
    html += '<input id="editCelular" value="' + (user.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">';
    html += '<input id="editProfissao" value="' + (user.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">';
    html += '<input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;">';
    html += '<button onclick="salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button>';
    html += '<button onclick="fecharModal(\'modalEditar\')" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    s.usuarioLogado.nome = document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome;
    s.usuarioLogado.celular = document.getElementById('editCelular')?.value?.trim() || '';
    s.usuarioLogado.profissao = document.getElementById('editProfissao')?.value?.trim() || '';
    s.usuarioLogado.experiencia = document.getElementById('editExperiencia')?.value?.trim() || '0';
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    if (typeof db !== 'undefined' && s.usuarioLogado.id) {
        db.collection('usuarios').doc(s.usuarioLogado.id).update({
            nome: s.usuarioLogado.nome, celular: s.usuarioLogado.celular,
            profissao: s.usuarioLogado.profissao, experiencia: s.usuarioLogado.experiencia
        }).catch(function(){});
    }
    fecharModal('modalEditar');
    s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

App.prototype.mostrarDocumento = function(tipo) {
    var tela = document.getElementById('documentoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    var c = { termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>', privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p>', sobre: '<h3>Sobre</h3><p>LPXCONSTRUTOR v1.0.0</p>' };
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button></div><div style="padding:20px;">' + (c[tipo] || '') + '</div>';
    this.mostrarTela('documentoScreen');
};

App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('🎨 Tema alterado!', 'sucesso');
};

App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    this.mostrarToast('🌐 Idioma alterado!', 'sucesso');
};

App.prototype.mostrarInfoVersao = function() { this.mostrarToast('🏗️ LPXConstrutor v1.0.0', 'info'); };

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;display:none;text-align:center;max-width:90%;';
        document.body.appendChild(toast);
    }
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.color = 'white';
    toast.style.display = 'block';
    clearTimeout(this._tt);
    this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    var splashAntigo = document.getElementById('splashScreen');
    if (splashAntigo) splashAntigo.remove();
    
    appInstancia = new App();
    console.log('✅ LPXCONSTRUTOR CORRIGIDO!');
    console.log('✅ Rede - busca Firebase + localStorage');
    console.log('✅ Voltar - não fecha o app');
    console.log('✅ Busca - encontra perfis cadastrados');
});
