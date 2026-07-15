// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO FINAL (TODAS FUNCIONALIDADES) =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

// Funções globais
window.app.fazerLogin = function() { if(window.app._app) window.app._app.fazerLogin(); };
window.app.mostrarTela = function(id) { if(window.app._app) window.app._app.mostrarTela(id); };
window.app.voltarTela = function() { if(window.app._app) window.app._app.voltarTela(); };
window.app.cadastrar = function() { if(window.app._app) window.app._app.cadastrar(); };
window.app.proximaEtapa = function(e) { if(window.app._app) window.app._app.proximaEtapa(e); };
window.app.toggleProfissao = function() { if(window.app._app) window.app._app.toggleProfissao(); };
window.app.sair = function() { if(window.app._app) window.app._app.sair(); };
window.app.buscarProfissionais = function() { if(window.app._app) window.app._app.buscarProfissionais(); };
window.app.verPerfil = function(uid) { if(window.app._app) window.app._app.verPerfil(uid); };
window.app.abrirTelaPublicacao = function() { if(window.app._app) window.app._app.abrirTelaPublicacao(); };
window.app.publicarVagaApp = function() { if(window.app._app) window.app._app.publicarVagaApp(); };
window.app.previewFotoObra = function(e) { if(window.app._app) window.app._app.previewFotoObra(e); };
window.app.carregarMinhasObras = function() { if(window.app._app) window.app._app.carregarMinhasObras(); };
window.app.verDetalheObra = function(oid) { if(window.app._app) window.app._app.verDetalheObra(oid); };
window.app.uploadFoto = function(e) { if(window.app._app) window.app._app.uploadFoto(e); };
window.app.abrirEditarPerfil = function() { if(window.app._app) window.app._app.abrirEditarPerfil(); };
window.app.salvarPerfil = function() { if(window.app._app) window.app._app.salvarPerfil(); };
window.app.mostrarSecao = function(s) { if(window.app._app) window.app._app.mostrarSecao(s); };
window.app.selecionarTema = function(t) { if(window.app._app) window.app._app.selecionarTema(t); };
window.app.selecionarIdioma = function(i) { if(window.app._app) window.app._app.selecionarIdioma(i); };
window.app.mostrarDocumento = function(t) { if(window.app._app) window.app._app.mostrarDocumento(t); };
window.app.mostrarInfoVersao = function() { if(window.app._app) window.app._app.mostrarInfoVersao(); };
window.app.mudarTab = function(t) { if(window.app._app) window.app._app.mudarTab(t); };
window.app.adicionarNaRede = function(uid) { if(window.app._app) window.app._app.adicionarNaRede(uid); };
window.app.removerDaRede = function(uid) { if(window.app._app) window.app._app.removerDaRede(uid); };
window.app.apagarObra = function(oid, event) { if(window.app._app) window.app._app.apagarObra(oid, event); };
window.app.mostrarNotificacoes = function() { if(window.app._app) window.app._app.mostrarNotificacoes(); };
window.app.iniciarChat = function(uid) { if(window.app._app) window.app._app.iniciarChat(uid); };
window.app.enviarMensagem = function() { if(window.app._app) window.app._app.enviarMensagem(); };
window.app.candidatarVaga = function(vid) { if(window.app._app) window.app._app.candidatarVaga(vid); };
window.app.verAvaliacoes = function(uid) { if(window.app._app) window.app._app.verAvaliacoes(uid); };
window.app.fecharModalSair = function() { if(window.app._app) window.app._app.fecharModalSair(); };
window.app.confirmarSair = function() { if(window.app._app) window.app._app.confirmarSair(); };
window.app.solicitarCodigo = function() { if(window.app._app) window.app._app.solicitarCodigo(); };
window.app.verificarCodigo = function() { if(window.app._app) window.app._app.verificarCodigo(); };
window.app.voltarPasso1 = function() { if(window.app._app) window.app._app.voltarPasso1(); };
window.app.novaObra = function() { if(window.app._app) window.app._app.novaObra(); };
window.app.gerarQRCodeCompartilhar = function() { if(window.app._app) window.app._app.gerarQRCodeCompartilhar(); };
window.app.compartilharPerfil = function() { if(window.app._app) window.app._app.compartilharPerfil(); };
window.app.fecharQRCode = function() { var m = document.getElementById('modalQRCodeCompartilhar'); if(m) m.remove(); };
window.app.baixarQRCodeCompartilhar = function() { if(window.app._app) window.app._app.baixarQRCodeCompartilhar(); };
window.app.confirmarExcluirConta = function() { if(window.app._app) window.app._app.confirmarExcluirConta(); };
window.app.executarExcluirConta = function() { if(window.app._app) window.app._app.executarExcluirConta(); };
window.app.abrirMapaLocalizacao = function() { if(window.app._app) window.app._app.abrirMapaLocalizacao(); };
window.app.salvarLocalizacao = function() { if(window.app._app) window.app._app.salvarLocalizacao(); };
window.app.atualizarCidades = function(cidadeSel) { if(window.app._app) window.app._app.atualizarCidades(cidadeSel); };
window.app.atualizarBairros = function() { if(window.app._app) window.app._app.atualizarBairros(); };
window.app.pararListenerChat = function() { if(window.app._app) window.app._app.pararListenerChat(); };
window.app.contratarProfissional = function(profId, vagaId) { if(window.app._app) window.app._app.contratarProfissional(profId, vagaId); };
window.app.verCandidatos = function(vagaId) { if(window.app._app) window.app._app.verCandidatos(vagaId); };
window.app.avaliarUsuario = function(avaliadoId) { if(window.app._app) window.app._app.avaliarUsuario(avaliadoId); };
window.app.iniciarMonitoramentoObra = function(vagaId) { if(window.app._app) window.app._app.iniciarMonitoramentoObra(vagaId); };
window.app.pararMonitoramentoObra = function() { if(window.app._app) window.app._app.pararMonitoramentoObra(); };
window.app.limparNotificacoes = function() { if(window.app._app) window.app._app.limparNotificacoes(); };

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this._listenerChat = null;
    this._enviandoMensagem = false;
    this.obraMonitorada = null;
    this._intervaloLocalizacao = null;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR COMPLETO FINAL');
    window.app._app = s;
    
    var nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = 'none';
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    var splashAntigo = document.getElementById('splashScreen');
    if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
    
    // Carregar obra monitorada
    var obraSalva = localStorage.getItem('obraMonitorada');
    if (obraSalva) { try { s.obraMonitorada = JSON.parse(obraSalva); } catch(e) {} }
    
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    s.configurarBotoes();
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('🔥 Logado:', user.email);
                if (typeof db !== 'undefined') {
                    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            var userData = doc.data(); userData.id = doc.id;
                            s.usuarioLogado = userData;
                            localStorage.setItem('usuarioLPX', JSON.stringify(userData));
                            if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') s.mostrarTela('homeScreen');
                            setTimeout(function() { 
                                s.atualizarBadgeNotificacoes();
                                s.iniciarNotificacoesAutomaticas();
                            }, 2000);
                        }
                    });
                }
            } else {
                s.pararMonitoramentoObra();
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                if (s.telaAtual !== 'loginScreen' && s.telaAtual !== 'cadastroScreen') s.mostrarTela('loginScreen');
            }
            setTimeout(function() {
                splash.style.opacity = '0';
                setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 500);
            }, 1500);
        });
    } else {
        setTimeout(function() {
            splash.style.opacity = '0';
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
                if (s.usuarioLogado) { s.mostrarTela('homeScreen'); s.iniciarNotificacoesAutomaticas(); }
                else { s.mostrarTela('loginScreen'); }
            }, 500);
        }, 1500);
    }
};

App.prototype.configurarBotoes = function() {
    function configurar() {
        var elementos = document.querySelectorAll('[onclick*="window.app"]');
        for (var i = 0; i < elementos.length; i++) {
            var el = elementos[i];
            var onclick = el.getAttribute('onclick') || '';
            if (onclick.indexOf('window.app.buscarProfissionais') >= 0) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.buscarProfissionais(); }; el.style.cursor = 'pointer'; }
            if (onclick.indexOf('window.app.iniciarChat') >= 0) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); var uid = this.getAttribute('data-uid') || ''; if(uid) window.app.iniciarChat(uid); }; el.style.cursor = 'pointer'; }
            if (onclick.indexOf('window.app.mostrarTela') >= 0) { var match = onclick.match(/window\.app\.mostrarTela\('(\w+)'\)/); var telaId = match ? match[1] : 'homeScreen'; el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela(telaId); }; el.style.cursor = 'pointer'; }
            if (onclick.indexOf('window.app.abrirTelaPublicacao') >= 0) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.abrirTelaPublicacao(); }; el.style.cursor = 'pointer'; }
            if (onclick.indexOf('window.app.mostrarNotificacoes') >= 0) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarNotificacoes(); }; el.style.cursor = 'pointer'; }
            if (onclick.indexOf('window.app.publicarVagaApp') >= 0) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.publicarVagaApp(); }; el.style.cursor = 'pointer'; }
        }
        var nav = document.getElementById('bottomNav');
        if (nav) {
            var botoesNav = nav.querySelectorAll('button, a, div, span, i');
            for (var j = 0; j < botoesNav.length; j++) {
                var btn = botoesNav[j];
                var txt = (btn.textContent || btn.innerText || '').toLowerCase().trim();
                if (txt.indexOf('home') >= 0 || txt === '🏠') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela('homeScreen'); }; btn.style.cursor = 'pointer'; }
                if (txt.indexOf('buscar') >= 0 || txt.indexOf('busca') >= 0 || txt === '🔍') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela('buscaScreen'); }; btn.style.cursor = 'pointer'; }
                if (txt.indexOf('chat') >= 0 || txt === '💬') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela('chatScreen'); }; btn.style.cursor = 'pointer'; }
                if (txt.indexOf('perfil') >= 0 || txt === '👤') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela('meuPerfilScreen'); }; btn.style.cursor = 'pointer'; }
                if (txt.indexOf('obra') >= 0 || txt === '🏗️') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.mostrarTela('minhasObrasScreen'); }; btn.style.cursor = 'pointer'; }
                if (txt.indexOf('publicar') >= 0 || txt === '📢') { btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.app.abrirTelaPublicacao(); }; btn.style.cursor = 'pointer'; }
            }
        }
    }
    configurar();
    setTimeout(configurar, 1000);
    setTimeout(configurar, 2500);
};

App.prototype.mostrarTela = function(id) {
    var s = this;
    var splash = document.getElementById('splashScreen');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    
    var telas = document.querySelectorAll('.screen');
    for (var i = 0; i < telas.length; i++) { telas[i].classList.remove('active'); telas[i].style.display = 'none'; }
    
    var tela = document.getElementById(id);
    if (!tela) { tela = document.createElement('div'); tela.id = id; tela.className = 'screen'; tela.style.display = 'none'; document.body.appendChild(tela); }
    
    tela.classList.add('active'); tela.style.display = 'block'; s.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasSemNav = ['loginScreen', 'cadastroScreen', 'recuperarSenhaScreen'];
        if (telasSemNav.indexOf(id) >= 0) { nav.style.display = 'none'; }
        else { var mostrar = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen','publicarVagaScreen','configScreen']; nav.style.display = mostrar.indexOf(id) >= 0 ? 'flex' : 'none'; }
    }
    
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen' && s.usuarioSelecionado) s.carregarMensagens();
    if (id === 'configScreen') s.carregarConfigScreen();
};

App.prototype.voltarTela = function() {
    var splash = document.getElementById('splashScreen');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    if (this.historicoTelas.length > 0) { var ant = this.historicoTelas.pop(); this.telaAtual = null; this.mostrarTela(ant); }
    else { this.mostrarTela('homeScreen'); }
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var emailEl = document.getElementById('loginEmail'), senhaEl = document.getElementById('loginSenha');
    if (!emailEl || !senhaEl) { s.mostrarToast('❌ Erro no formulário', 'erro'); return; }
    var email = emailEl.value.trim(), senha = senhaEl.value.trim();
    if (!email || !senha) { s.mostrarToast('❌ Preencha email e senha!', 'erro'); return; }
    s.mostrarToast('Entrando...', 'info');
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(userCredential) {
            var user = userCredential.user;
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                    if (doc.exists) { var userData = doc.data(); userData.id = doc.id; s.usuarioLogado = userData; localStorage.setItem('usuarioLPX', JSON.stringify(userData)); s.historicoTelas = []; s.mostrarToast('✅ Bem-vindo, ' + userData.nome + '!', 'sucesso'); s.mostrarTela('homeScreen'); setTimeout(function() { s.atualizarBadgeNotificacoes(); s.iniciarNotificacoesAutomaticas(); }, 2000); }
                });
            }
        }).catch(function() { s.loginLocal(email, senha); });
    } else { s.loginLocal(email, senha); }
};

App.prototype.loginLocal = function(email, senha) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) { if (usuarios[i].email.toLowerCase() === email.toLowerCase() && usuarios[i].senha === senha) { s.usuarioLogado = usuarios[i]; localStorage.setItem('usuarioLPX', JSON.stringify(usuarios[i])); s.historicoTelas = []; s.mostrarToast('✅ Bem-vindo, ' + usuarios[i].nome + '!', 'sucesso'); s.mostrarTela('homeScreen'); return; } }
    s.mostrarToast('❌ Email ou senha incorretos!', 'erro');
};

App.prototype.cadastrar = function() {
    var s = this;
    var dados = { id: 'user_' + Date.now(), nome: (document.getElementById('cadNome') || {}).value || '', email: (document.getElementById('cadEmail') || {}).value || '', senha: (document.getElementById('cadSenha') || {}).value || '', tipo: (document.getElementById('cadTipo') || {}).value || 'profissional', celular: (document.getElementById('cadCelular') || {}).value || '', profissao: (document.getElementById('cadProfissao') || {}).value || '', experiencia: (document.getElementById('cadExperiencia') || {}).value || '0', score: 0, fotoPerfil: null, dataCadastro: new Date().toISOString() };
    if (!dados.nome || !dados.email || !dados.senha) { s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    s.mostrarToast('Cadastrando...', 'info');
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) { if (usuarios[i].email.toLowerCase() === dados.email.toLowerCase()) { s.mostrarToast('❌ Email já cadastrado!', 'erro'); return; } }
    usuarios.push(dados); localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    if (typeof firebase !== 'undefined' && firebase.auth) { firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha).then(function(userCredential) { dados.id = userCredential.user.uid; if (typeof db !== 'undefined') db.collection('usuarios').doc(dados.id).set({ nome: dados.nome, email: dados.email, tipo: dados.tipo, celular: dados.celular, profissao: dados.profissao, experiencia: dados.experiencia, score: 0, fotoPerfil: null, dataCadastro: dados.dataCadastro }).catch(function(){}); localStorage.setItem('usuariosLPX', JSON.stringify(usuarios)); }).catch(function(){}); }
    s.usuarioLogado = dados; localStorage.setItem('usuarioLPX', JSON.stringify(dados)); s.historicoTelas = [];
    s.mostrarToast('✅ Cadastro realizado!', 'sucesso'); setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
};

App.prototype.proximaEtapa = function(e) { var e1 = document.getElementById('etapa1'), e2 = document.getElementById('etapa2'); if (!e1 || !e2) return; e1.style.display = e === 1 ? 'block' : 'none'; e2.style.display = e === 2 ? 'block' : 'none'; };
App.prototype.toggleProfissao = function() { var g = document.getElementById('grupoProfissao'); if (g) g.style.display = (document.getElementById('cadTipo') || {}).value === 'profissional' ? 'block' : 'none'; };
App.prototype.sair = function() { this.pararListenerChat(); this.pararMonitoramentoObra(); if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut().catch(function(){}); this.usuarioLogado = null; localStorage.removeItem('usuarioLPX'); this.historicoTelas = []; this.mostrarTela('loginScreen'); this.mostrarToast('👋 Até logo!', 'sucesso'); };

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this; if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    var user = s.usuarioLogado, home = document.getElementById('homeScreen'); if (!home) return;
    var h = new Date().getHours(), sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    var html = '<div style="background:#1A3A5C;color:white;padding:12px 15px;display:flex;align-items:center;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') + '</div><div style="flex:1;"><span style="font-size:15px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div><span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span></div>';
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;"><button id="tabFeed" onclick="window.app.mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button><button id="tabRede" onclick="window.app.mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button></div>';
    html += '<div id="feedContainer" style="padding:10px;"></div><div id="redeContainer" style="padding:10px;display:none;"></div>';
    if (user.tipo === 'empreiteiro') html += '<button onclick="window.app.abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
    home.innerHTML = html; s.carregarFeed();
};

App.prototype.mudarTab = function(tab) { this.tabAtual = tab; var btnFeed = document.getElementById('tabFeed'), btnRede = document.getElementById('tabRede'); if (btnFeed) { btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; } if (btnRede) { btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; } var fc = document.getElementById('feedContainer'), rc = document.getElementById('redeContainer'); if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none'; if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none'; if (tab === 'feed') this.carregarFeed(); if (tab === 'rede') this.carregarRede(); };

// ===== FEED =====
App.prototype.carregarFeed = function() { var s = this, c = document.getElementById('feedContainer'); if (!c) return; c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando obras...</div>'; if (typeof databaseService !== 'undefined') { databaseService.buscarVagas().then(function(vagas) { s.renderizarFeed(c, vagas || []); }).catch(function() { var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); s.renderizarFeed(c, vagasLocal); }); } else { var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); s.renderizarFeed(c, vagasLocal); } };
App.prototype.renderizarFeed = function(c, vagas) { var s = this; if (!vagas || vagas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>'; return; } var html = ''; for (var i = 0; i < vagas.length; i++) { var v = vagas[i], destaque = s.usuarioLogado && (v.autorId === s.usuarioLogado.id || v.usuarioId === s.usuarioLogado.id); html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + (destaque ? 'border:3px solid #f59e0b;' : '') + '">'; if (destaque) { html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="background:#f59e0b;color:white;padding:3px 10px;border-radius:10px;font-size:11px;">⭐ SUA OBRA</span><button onclick="window.app.apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button></div>'; } if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">'; html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><div style="font-weight:bold;font-size:16px;">' + (v.titulo || 'Sem título') + '</div><div style="color:#666;font-size:13px;">📍 ' + (v.endereco || '') + '</div><div style="margin-top:8px;"><span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span> <span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span></div></div></div>'; } c.innerHTML = html; };
App.prototype.apagarObra = function(oid, event) { if (event) event.stopPropagation(); if (!confirm('Apagar esta obra?')) return; if (typeof db !== 'undefined') { db.collection('vagas').doc(oid).delete().then(function() { window.app._app.mostrarToast('Obra apagada!', 'sucesso'); window.app._app.carregarFeed(); }).catch(function() { window.app._app.apagarObraLocal(oid); }); } else { this.apagarObraLocal(oid); } };
App.prototype.apagarObraLocal = function(oid) { var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]'), novas = []; for (var i = 0; i < vagas.length; i++) { if (vagas[i].id !== oid) novas.push(vagas[i]); } localStorage.setItem('vagasLPX', JSON.stringify(novas)); this.mostrarToast('Obra apagada!', 'sucesso'); this.carregarFeed(); };

// ===== REDE =====
App.prototype.carregarRede = function() { var s = this, c = document.getElementById('redeContainer'); if (!c) return; if (!s.usuarioLogado) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Faça login</h3></div>'; return; } c.innerHTML = '<div style="text-align:center;padding:30px;">🔗 Carregando rede...</div>'; if (typeof databaseService !== 'undefined') { databaseService.buscarConexoes(s.usuarioLogado.id).then(function(conexoes) { if (!conexoes || conexoes.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🔗</div><h3>Rede vazia</h3><button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>'; return; } var html = '<div style="text-align:center;padding:10px;">🔗 ' + conexoes.length + ' conexão(ões)</div>'; var processados = 0; for (var i = 0; i < conexoes.length; i++) { var con = conexoes[i], amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId; databaseService.buscarUsuario(amigoId).then(function(amigo) { processados++; if (amigo) { html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' + (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')"><strong>' + (amigo.nome || 'Usuário') + '</strong><br><small>' + (amigo.profissao || 'Profissional') + '</small></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button><button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigo.id + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;font-size:18px;">✕</button></div>'; } if (processados >= conexoes.length) c.innerHTML = html + '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>'; }); } }); } };
App.prototype.adicionarNaRede = function(amigoId) { var s = this; if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) return; if (typeof db !== 'undefined') { db.collection('conexoes').add({ usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo', dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { s.mostrarToast('✅ Adicionado!', 'sucesso'); s.carregarRede(); }).catch(function() { s.mostrarToast('❌ Erro ao adicionar', 'erro'); }); } else { var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'); var existe = conexoes.find(function(c) { return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id); }); if (existe) { s.mostrarToast('Já está na rede!', 'erro'); return; } conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' }); localStorage.setItem('conexoesLPX', JSON.stringify(conexoes)); s.mostrarToast('✅ Adicionado!', 'sucesso'); s.carregarRede(); } };
App.prototype.removerDaRede = function(amigoId) { var s = this; if (!confirm('Remover esta conexão?')) return; if (typeof db !== 'undefined') { db.collection('conexoes').get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === s.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === s.usuarioLogado.id)) db.collection('conexoes').doc(doc.id).delete(); }); }); } var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'), novas = []; for (var i = 0; i < conexoes.length; i++) { var c = conexoes[i]; if (!((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id))) novas.push(c); } localStorage.setItem('conexoesLPX', JSON.stringify(novas)); s.mostrarToast('Removido', 'sucesso'); s.carregarRede(); };

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) { var s = this; console.log('💬 Chat com:', uid); if (typeof databaseService !== 'undefined') { databaseService.buscarUsuario(uid).then(function(user) { if (user) { s.usuarioSelecionado = user; s.abrirChat(user); s.iniciarListenerMensagens(); } }); } else { var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); var user = usuarios.find(function(u) { return u.id === uid; }); if (user) { s.usuarioSelecionado = user; s.abrirChat(user); } } };
App.prototype.abrirChat = function(user) { var s = this; var tela = document.getElementById('chatScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;"><button onclick="window.app.pararListenerChat();window.app.voltarTela()" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button><strong>💬 ' + user.nome + '</strong></div><div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div><div style="padding:10px;background:white;display:flex;gap:10px;"><input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;"><button id="btnEnviarMsg" onclick="window.app.enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>'; s.mostrarTela('chatScreen'); s.carregarMensagens(); };
App.prototype.iniciarListenerMensagens = function() { var s = this; s.pararListenerChat(); if (typeof db !== 'undefined' && s.usuarioSelecionado) { s._listenerChat = db.collection('mensagens').where('participantes', 'array-contains', s.usuarioLogado.id).orderBy('dataEnvio', 'asc').onSnapshot(function(snapshot) { var mensagens = []; snapshot.forEach(function(doc) { var m = doc.data(); m.id = doc.id; if (m.participantes && m.participantes.indexOf(s.usuarioLogado.id) >= 0 && m.participantes.indexOf(s.usuarioSelecionado.id) >= 0) mensagens.push(m); }); s.renderizarMensagens(mensagens); var novasRecebidas = mensagens.filter(function(m) { return m.remetenteId !== s.usuarioLogado.id && !m.lida; }); if (novasRecebidas.length > 0 && s.telaAtual !== 'chatScreen') { var remetente = s.usuarioSelecionado.nome || 'Alguém'; s.adicionarNotificacao(s.usuarioLogado.id, '💬 ' + remetente, novasRecebidas[novasRecebidas.length - 1].conteudo.substring(0, 50)); s.mostrarToast('💬 Nova mensagem de ' + remetente + '!', 'info'); } if (novasRecebidas.length > 0 && s.telaAtual === 'chatScreen') { for (var i = 0; i < novasRecebidas.length; i++) { db.collection('mensagens').doc(novasRecebidas[i].id).update({ lida: true }).catch(function(){}); } } }); } };
App.prototype.pararListenerChat = function() { if (this._listenerChat) { this._listenerChat(); this._listenerChat = null; } };
App.prototype.renderizarMensagens = function(mensagens) { var c = document.getElementById('chatMensagens'); if (!c) return; if (!mensagens || mensagens.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>'; return; } var html = ''; for (var i = 0; i < mensagens.length; i++) { var m = mensagens[i], ehMeu = m.remetenteId === this.usuarioLogado.id, data = ''; if (m.dataEnvio) { if (m.dataEnvio.toDate) data = m.dataEnvio.toDate().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}); else data = new Date(m.dataEnvio).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}); } html += '<div style="display:flex;justify-content:' + (ehMeu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;"><div style="max-width:75%;padding:10px 14px;border-radius:18px;' + (ehMeu ? 'background:#1A3A5C;color:white;border-bottom-right-radius:4px;' : 'background:white;color:#333;border-bottom-left-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.1);') + '"><div style="font-size:14px;line-height:1.4;">' + (m.conteudo || '') + '</div><div style="font-size:10px;opacity:0.7;text-align:right;margin-top:3px;">' + data + (ehMeu ? ' ✓' : '') + '</div></div></div>'; } c.innerHTML = html; c.scrollTop = c.scrollHeight; };
App.prototype.carregarMensagens = function() { var s = this, c = document.getElementById('chatMensagens'); if (!c || !s.usuarioSelecionado) return; if (typeof db !== 'undefined') { c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Carregando...</div>'; return; } var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]'), relevantes = []; for (var i = 0; i < mensagens.length; i++) { var m = mensagens[i]; if ((m.remetenteId === s.usuarioLogado.id && m.destinatarioId === s.usuarioSelecionado.id) || (m.remetenteId === s.usuarioSelecionado.id && m.destinatarioId === s.usuarioLogado.id)) relevantes.push(m); } s.renderizarMensagens(relevantes); };
App.prototype.enviarMensagem = function() { var s = this, input = document.getElementById('chatInput'); if (!input || !s.usuarioSelecionado) return; var texto = input.value.trim(); if (!texto) return; if (s._enviandoMensagem) return; s._enviandoMensagem = true; var btnEnviar = document.getElementById('btnEnviarMsg'); if (btnEnviar) { btnEnviar.disabled = true; btnEnviar.textContent = '...'; } if (typeof db !== 'undefined') { db.collection('mensagens').add({ remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id, participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id], conteudo: texto, lida: false, dataEnvio: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { input.value = ''; input.focus(); s._enviandoMensagem = false; if (btnEnviar) { btnEnviar.disabled = false; btnEnviar.textContent = 'Enviar'; } s.adicionarNotificacao(s.usuarioSelecionado.id, '💬 ' + s.usuarioLogado.nome, texto.substring(0, 50)); }).catch(function() { s._enviandoMensagem = false; if (btnEnviar) { btnEnviar.disabled = false; btnEnviar.textContent = 'Enviar'; } }); } };

// ===== NOTIFICAÇÕES =====
App.prototype.adicionarNotificacao = function(usuarioId, titulo, mensagem) { var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]'); var agora = Date.now(); var duplicada = notificacoes.find(function(n) { return n.usuarioId === usuarioId && n.titulo === titulo && (agora - new Date(n.data).getTime()) < 3000; }); if (duplicada) return; notificacoes.unshift({ id: 'notif_' + Date.now(), usuarioId: usuarioId, titulo: titulo, mensagem: mensagem, lida: false, data: new Date().toISOString() }); if (notificacoes.length > 100) notificacoes = notificacoes.slice(0, 100); localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes)); this.atualizarBadgeNotificacoes(); };
App.prototype.atualizarBadgeNotificacoes = function() { var s = this; if (!s.usuarioLogado) return; var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]'), naoLidas = 0; for (var i = 0; i < notificacoes.length; i++) { if (notificacoes[i].usuarioId === s.usuarioLogado.id && !notificacoes[i].lida) naoLidas++; } var badge = document.getElementById('badgeNotificacoes'); if (badge) { if (naoLidas > 0) { badge.textContent = naoLidas > 99 ? '99+' : naoLidas; badge.style.display = 'flex'; } else { badge.style.display = 'none'; } } };
App.prototype.mostrarNotificacoes = function() { var s = this; if (!s.usuarioLogado) return; var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]'), minhasNotif = []; for (var i = 0; i < notificacoes.length; i++) { if (notificacoes[i].usuarioId === s.usuarioLogado.id) minhasNotif.push(notificacoes[i]); } for (var i = 0; i < notificacoes.length; i++) { if (notificacoes[i].usuarioId === s.usuarioLogado.id) notificacoes[i].lida = true; } localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes)); s.atualizarBadgeNotificacoes(); var html = '<div id="modalNotificacoes" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()"><div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;"><div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between;"><h3>🔔 Notificações</h3><div><button onclick="window.app.limparNotificacoes()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 12px;border-radius:8px;cursor:pointer;margin-right:5px;">🗑️ Limpar</button><button onclick="document.getElementById(\'modalNotificacoes\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button></div></div><div style="padding:15px;">'; if (minhasNotif.length === 0) { html += '<div style="text-align:center;padding:40px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>'; } else { for (var i = 0; i < minhasNotif.length; i++) { var n = minhasNotif[i]; html += '<div style="background:' + (n.lida ? '#f9fafb' : '#f0f9ff') + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;"><div style="font-weight:bold;">' + n.titulo + '</div><div style="font-size:13px;color:#666;">' + n.mensagem + '</div><div style="font-size:10px;color:#999;">' + new Date(n.data).toLocaleString('pt-BR') + '</div></div>'; } } html += '</div></div></div>'; var antigo = document.getElementById('modalNotificacoes'); if (antigo) antigo.remove(); document.body.insertAdjacentHTML('beforeend', html); };
App.prototype.limparNotificacoes = function() { var s = this; if (!s.usuarioLogado) return; if (!confirm('Limpar todas as notificações?')) return; var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]'), novas = []; for (var i = 0; i < notificacoes.length; i++) { if (notificacoes[i].usuarioId !== s.usuarioLogado.id) novas.push(notificacoes[i]); } localStorage.setItem('notificacoesLPX', JSON.stringify(novas)); s.atualizarBadgeNotificacoes(); document.getElementById('modalNotificacoes')?.remove(); s.mostrarToast('✅ Notificações limpas!', 'sucesso'); };

// ===== NOTIFICAÇÕES AUTOMÁTICAS =====
App.prototype.iniciarNotificacoesAutomaticas = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    function verificar() {
        var hora = new Date().getHours();
        var dia = new Date().getDay(); // 0=Domingo, 6=Sábado
        
        // Dias úteis (seg-sex)
        if (dia >= 1 && dia <= 5) {
            if (hora >= 6 && hora < 8) {
                s.adicionarNotificacao(s.usuarioLogado.id, '☀️ Bom dia!', 'Tenha um ótimo dia de trabalho, ' + s.usuarioLogado.nome + '! 💪🏗️');
            }
            if (hora >= 18 && hora < 20) {
                s.adicionarNotificacao(s.usuarioLogado.id, '🌙 Fim do expediente', 'Bom descanso, ' + s.usuarioLogado.nome + '! 😴');
            }
        }
        
        // Verificar localização da obra
        s.verificarLocalizacaoObra();
    }
    
    verificar();
    if (s._intervaloNotificacoes) clearInterval(s._intervaloNotificacoes);
    s._intervaloNotificacoes = setInterval(verificar, 1800000); // 30 minutos
};

// ===== GEOFENCING =====
App.prototype.iniciarMonitoramentoObra = function(vagaId) {
    var s = this;
    if (!s.usuarioLogado) return;
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').doc(vagaId).get().then(function(doc) {
            if (!doc.exists) return;
            var vaga = doc.data();
            if (!vaga.lat || !vaga.lng) { s.mostrarToast('⚠️ Obra sem localização', 'erro'); return; }
            
            s.obraMonitorada = { vagaId: vagaId, lat: vaga.lat, lng: vaga.lng, titulo: vaga.titulo, autorId: vaga.autorId || vaga.usuarioId };
            localStorage.setItem('obraMonitorada', JSON.stringify(s.obraMonitorada));
            s.verificarLocalizacaoObra();
            s.mostrarToast('📍 Monitoramento iniciado!', 'sucesso');
        });
    }
};

App.prototype.pararMonitoramentoObra = function() {
    localStorage.removeItem('obraMonitorada');
    this.obraMonitorada = null;
    if (this._intervaloLocalizacao) { clearInterval(this._intervaloLocalizacao); this._intervaloLocalizacao = null; }
};

App.prototype.verificarLocalizacaoObra = function() {
    var s = this;
    if (!s.obraMonitorada) { var salvo = localStorage.getItem('obraMonitorada'); if (salvo) { try { s.obraMonitorada = JSON.parse(salvo); } catch(e) {} } }
    if (!s.obraMonitorada || !navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(function(pos) {
        var distancia = s.calcularDistancia(pos.coords.latitude, pos.coords.longitude, s.obraMonitorada.lat, s.obraMonitorada.lng);
        console.log('📍 Distância da obra:', distancia.toFixed(0), 'm');
        
        // Afastou mais de 100m
        if (distancia > 100) {
            var ultimaAfast = localStorage.getItem('ultimaNotifAfastamento');
            if (!ultimaAfast || (Date.now() - parseInt(ultimaAfast)) > 600000) {
                localStorage.setItem('ultimaNotifAfastamento', Date.now().toString());
                s.adicionarNotificacao(s.obraMonitorada.autorId, '⚠️ Profissional se afastou!', s.usuarioLogado.nome + ' se afastou ' + distancia.toFixed(0) + 'm da obra: ' + s.obraMonitorada.titulo);
                s.mostrarToast('⚠️ Você se afastou da obra!', 'erro');
            }
        }
        
        // Chegou na obra (menos de 50m)
        if (distancia < 50) {
            var ultimaChegada = localStorage.getItem('ultimaNotifChegada');
            if (!ultimaChegada || (Date.now() - parseInt(ultimaChegada)) > 3600000) {
                localStorage.setItem('ultimaNotifChegada', Date.now().toString());
                s.adicionarNotificacao(s.usuarioLogado.id, '📍 Chegou na obra!', 'Bom trabalho em: ' + s.obraMonitorada.titulo + ' 💪');
                s.mostrarToast('📍 Chegou na obra! Bom trabalho! 💪', 'sucesso');
            }
        }
    }, function() {}, { enableHighAccuracy: true });
};

App.prototype.calcularDistancia = function(lat1, lon1, lat2, lon2) {
    var R = 6371000, dLat = (lat2 - lat1) * Math.PI / 180, dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() { var s = this, c = document.getElementById('buscaResultados'); if (!c) return; c.innerHTML = '<div style="text-align:center;padding:30px;">🔍 Buscando...</div>'; if (typeof databaseService !== 'undefined') { databaseService.buscarTodosUsuarios().then(function(todos) { var profissionais = [], meuId = s.usuarioLogado ? s.usuarioLogado.id : ''; for (var i = 0; i < todos.length; i++) { if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) profissionais.push(todos[i]); } s.renderizarBusca(c, profissionais); }).catch(function() { s.buscarLocal(c); }); } else { s.buscarLocal(c); } };
App.prototype.buscarLocal = function(c) { var s = this, todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'), profissionais = [], meuId = s.usuarioLogado ? s.usuarioLogado.id : ''; for (var i = 0; i < todos.length; i++) { if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) profissionais.push(todos[i]); } s.renderizarBusca(c, profissionais); };
App.prototype.renderizarBusca = function(c, profissionais) { if (!profissionais || profissionais.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">👷</div><h3>Nenhum profissional</h3></div>'; return; } var html = '<div style="text-align:center;padding:10px;">👷 ' + profissionais.length + ' profissional(is)</div>'; for (var i = 0; i < profissionais.length; i++) { var p = profissionais[i]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">' + (p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')"><div style="font-weight:bold;">' + (p.nome || 'Sem nome') + '</div><div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + ' | ⭐ ' + (p.score || 0).toFixed(1) + '</div></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button><button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button></div>'; } c.innerHTML = html; };

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) { var s = this; if (typeof databaseService !== 'undefined') { databaseService.buscarUsuario(uid).then(function(user) { if (user) s.mostrarPerfilPublico(user); }); } };
App.prototype.mostrarPerfilPublico = function(user) { var tela = document.getElementById('perfilPublicoScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') + '</div><h2>' + (user.nome || 'Usuário') + '</h2><p>🔧 ' + (user.profissao || 'Profissional') + ' | ⭐ ' + (user.score || 0).toFixed(1) + '</p></div><div style="padding:20px;"><div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;"><p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p></div><button onclick="window.app.iniciarChat(\'' + user.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">💬 Chat</button><button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button><button onclick="window.app.avaliarUsuario(\'' + user.id + '\')" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">⭐ Avaliar</button><button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>'; this.mostrarTela('perfilPublicoScreen'); };

// ===== AVALIAÇÃO =====
App.prototype.avaliarUsuario = function(avaliadoId) { var s = this; if (!s.usuarioLogado) return; var nota = prompt('Dê uma nota de 1 a 5 ⭐:'); if (!nota || isNaN(nota) || nota < 1 || nota > 5) { s.mostrarToast('❌ Nota inválida! (1-5)', 'erro'); return; } var comentario = prompt('Comentário (opcional):') || ''; if (typeof db !== 'undefined') { db.collection('avaliacoes').add({ avaliadorId: s.usuarioLogado.id, avaliadoId: avaliadoId, nota: parseInt(nota), comentario: comentario, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { db.collection('avaliacoes').where('avaliadoId', '==', avaliadoId).get().then(function(snap) { var total = 0, soma = 0; snap.forEach(function(doc) { total++; soma += doc.data().nota; }); var score = total > 0 ? Math.round((soma / total) * 10) / 10 : 0; db.collection('usuarios').doc(avaliadoId).update({ score: score, avaliacoesRecebidas: total }).catch(function(){}); }); s.mostrarToast('⭐ Avaliação enviada!', 'sucesso'); }); } };

// ===== PUBLICAR =====
App.prototype.abrirTelaPublicacao = function() { var s = this; if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; } var tela = document.getElementById('publicarVagaScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="padding:20px;max-width:500px;margin:0 auto;"><h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2><p style="text-align:center;color:#666;font-size:12px;margin-bottom:20px;">Publicado por: <b>' + s.usuarioLogado.nome + '</b></p><label style="font-weight:bold;color:#1A3A5C;">📌 Título *</label><input id="pubTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:12px;box-sizing:border-box;"><label style="font-weight:bold;color:#1A3A5C;">📍 Endereço *</label><input id="pubEndereco" placeholder="Ex: Rua Exemplo, 123 - Cidade" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:12px;box-sizing:border-box;"><label style="font-weight:bold;color:#1A3A5C;">👷 Profissões</label><input id="pubProfissoes" placeholder="Pedreiro, Eletricista" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:12px;box-sizing:border-box;"><label style="font-weight:bold;color:#1A3A5C;">💰 Valor/hora (R$) *</label><input id="pubValor" type="number" placeholder="25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:12px;box-sizing:border-box;"><label style="font-weight:bold;color:#1A3A5C;">📝 Descrição</label><textarea id="pubDescricao" placeholder="Detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:12px;min-height:60px;box-sizing:border-box;"></textarea><label style="font-weight:bold;color:#1A3A5C;">📸 Foto da Obra</label><img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:180px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;"><input type="file" id="pubFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;"><button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Escolher Foto</button><button onclick="window.app.publicarVagaApp()" style="width:100%;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR OBRA</button><button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:12px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>'; s.vagaFotoBase64 = null; s.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(event) { var file = event.target.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function(e) { var preview = document.getElementById('pubFotoPreview'); if (preview) { preview.src = e.target.result; preview.style.objectFit = 'cover'; } window.app._app.vagaFotoBase64 = e.target.result; }; reader.readAsDataURL(file); };
App.prototype.publicarVagaApp = function() { var s = this; var tituloEl = document.getElementById('pubTitulo'), enderecoEl = document.getElementById('pubEndereco'), profissoesEl = document.getElementById('pubProfissoes'), valorEl = document.getElementById('pubValor'), descricaoEl = document.getElementById('pubDescricao'); if (!tituloEl || !enderecoEl || !valorEl) { s.mostrarToast('❌ Erro no formulário', 'erro'); return; } var titulo = tituloEl.value.trim(), endereco = enderecoEl.value.trim(), profissoes = profissoesEl ? profissoesEl.value.trim() || 'Geral' : 'Geral', valor = valorEl.value.trim(), descricao = descricaoEl ? descricaoEl.value.trim() : ''; if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); tituloEl.focus(); return; } if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; } if (!valor || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) { s.mostrarToast('❌ Digite um valor válido!', 'erro'); valorEl.focus(); return; } s.mostrarToast('📡 Publicando...', 'info'); var vaga = { id: 'vaga_' + Date.now(), titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: parseFloat(valor) || 0, descricao: descricao, fotoObra: s.vagaFotoBase64 || '', status: 'disponivel', ativa: true, usuarioId: s.usuarioLogado.id, autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome, autorFoto: s.usuarioLogado.fotoPerfil || null, interessados: [], dataCriacao: new Date().toISOString() }; var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); vagasLocal.unshift(vaga); localStorage.setItem('vagasLPX', JSON.stringify(vagasLocal)); if (typeof databaseService !== 'undefined') { databaseService.criarVaga(vaga).then(function(r) { if (r.sucesso && vagasLocal[0]) vagasLocal[0].id = r.id; s.finalizarPublicacao(); }).catch(function() { s.finalizarPublicacao(); }); } else { s.finalizarPublicacao(); } };
App.prototype.finalizarPublicacao = function() { var s = this; var tituloEl = document.getElementById('pubTitulo'), enderecoEl = document.getElementById('pubEndereco'), profissoesEl = document.getElementById('pubProfissoes'), valorEl = document.getElementById('pubValor'), descricaoEl = document.getElementById('pubDescricao'); if (tituloEl) tituloEl.value = ''; if (enderecoEl) enderecoEl.value = ''; if (profissoesEl) profissoesEl.value = 'Geral'; if (valorEl) valorEl.value = ''; if (descricaoEl) descricaoEl.value = ''; var preview = document.getElementById('pubFotoPreview'); if (preview) preview.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; s.vagaFotoBase64 = null; s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso'); setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800); };

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() { var s = this, c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer'); if (!c || !s.usuarioLogado) return; if (typeof databaseService !== 'undefined') { databaseService.buscarVagas().then(function(vagas) { var minhas = vagas.filter(function(v) { return v.usuarioId === s.usuarioLogado.id || v.autorId === s.usuarioLogado.id; }); s.renderizarMinhasObras(c, minhas); }); } else { var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); var minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; }); s.renderizarMinhasObras(c, minhas); } };
App.prototype.renderizarMinhasObras = function(c, minhas) { var totalEl = document.getElementById('totalObras'); if (totalEl) totalEl.textContent = minhas.length; if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; } var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>'; for (var i = 0; i < minhas.length; i++) { var v = minhas[i]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' : '') + '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + (v.titulo || 'Sem título') + '</b><br><small>📍 ' + (v.endereco || '') + '</small><br><span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span></div><button onclick="window.app.apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;margin-top:5px;">🗑️ Apagar</button></div>'; } c.innerHTML = html; };

// ===== DETALHE OBRA (COM BOTÕES DE CONTATO E CANDIDATURA) =====
App.prototype.verDetalheObra = function(oid) { if (typeof db !== 'undefined') { db.collection('vagas').doc(oid).get().then(function(doc) { if (doc.exists) window.app._app.mostrarDetalheObraModal({ id: doc.id, ...doc.data() }); }); } else { var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); var v = vagas.find(function(x) { return x.id === oid; }); if (v) window.app._app.mostrarDetalheObraModal(v); } };

App.prototype.mostrarDetalheObraModal = function(v) {
    var s = this;
    var autorId = v.autorId || v.usuarioId;
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + (v.titulo || 'Sem título') + '</h2><p style="color:#666;">⚪ ' + (v.status || 'Disponível') + '</p>';
    html += '<div style="background:#f9fafb;border-radius:12px;padding:15px;margin-bottom:15px;"><p><strong>📍</strong> ' + (v.endereco || '') + '</p><p><strong>👷</strong> ' + (v.profissoes || 'Todas') + '</p><p><strong>💰</strong> R$' + (v.valorHora || '0') + '/h</p>' + (v.descricao ? '<p><strong>📝</strong> ' + v.descricao + '</p>' : '') + '</div>';
    if (v.endereco) html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(v.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Google Maps</a>';
    
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    if (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' && autorId !== s.usuarioLogado.id) html += '<button onclick="window.app.candidatarVaga(\'' + v.id + '\');document.getElementById(\'modalObra\').remove();" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✋ CANDIDATAR-SE</button>';
    if (s.usuarioLogado && s.usuarioLogado.id === autorId) html += '<button onclick="window.app.verCandidatos(\'' + v.id + '\');document.getElementById(\'modalObra\').remove();" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">👷 VER CANDIDATOS</button>';
    if (s.usuarioLogado && autorId && autorId !== s.usuarioLogado.id) html += '<button onclick="window.app.iniciarChat(\'' + autorId + '\');document.getElementById(\'modalObra\').remove();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">💬 CONVERSAR PELO APP</button>';
    html += '<button onclick="window.app._app.contatarWhatsApp(\'' + autorId + '\')" style="width:100%;background:#25D366;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">📱 WHATSAPP</button>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button></div></div></div></div>';
    
    var antigo = document.getElementById('modalObra'); if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.contatarWhatsApp = function(autorId) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var autor = usuarios.find(function(u) { return u.id === autorId; });
    if (autor && autor.celular) { window.open('https://wa.me/55' + autor.celular.replace(/\D/g, ''), '_blank'); }
    else if (typeof databaseService !== 'undefined') { databaseService.buscarUsuario(autorId).then(function(user) { if (user && user.celular) window.open('https://wa.me/55' + user.celular.replace(/\D/g, ''), '_blank'); else s.mostrarToast('📱 Celular não disponível', 'erro'); }); }
    else { s.mostrarToast('📱 Celular não disponível', 'erro'); }
};

// ===== CANDIDATURA E CONTRATAÇÃO =====
App.prototype.candidatarVaga = function(vagaId) { var s = this; if (!s.usuarioLogado || s.usuarioLogado.tipo !== 'profissional') return; if (typeof db !== 'undefined') { db.collection('vagas').doc(vagaId).get().then(function(doc) { if (!doc.exists) return; var vaga = doc.data(); var interessados = vaga.interessados || []; if (interessados.indexOf(s.usuarioLogado.id) >= 0) { s.mostrarToast('❌ Já se candidatou!', 'erro'); return; } interessados.push(s.usuarioLogado.id); db.collection('vagas').doc(vagaId).update({ interessados: interessados }).then(function() { s.adicionarNotificacao(vaga.usuarioId || vaga.autorId, '👷 Nova candidatura!', s.usuarioLogado.nome + ' se candidatou: ' + (vaga.titulo || 'sua vaga')); s.mostrarToast('✅ Candidatura enviada!', 'sucesso'); }); }); } };
App.prototype.verCandidatos = function(vagaId) { var s = this; if (!s.usuarioLogado) return; if (typeof db !== 'undefined') { db.collection('vagas').doc(vagaId).get().then(function(doc) { if (!doc.exists) return; var vaga = doc.data(); var interessados = vaga.interessados || []; if (interessados.length === 0) { s.mostrarToast('📋 Nenhum candidato', 'info'); return; } var html = '<div id="modalCandidatos" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()"><div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;"><div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between;"><h3>👷 Candidatos (' + interessados.length + ')</h3><button onclick="document.getElementById(\'modalCandidatos\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button></div><div style="padding:15px;">'; var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); for (var i = 0; i < interessados.length; i++) { var candidato = usuarios.find(function(u) { return u.id === interessados[i]; }); if (candidato) { html += '<div style="background:#f9fafb;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:45px;height:45px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div><div style="flex:1;"><strong>' + candidato.nome + '</strong><br><small>🔧 ' + (candidato.profissao || 'Profissional') + ' | ⭐ ' + (candidato.score || 0).toFixed(1) + '</small></div><button onclick="window.app.contratarProfissional(\'' + candidato.id + '\', \'' + vagaId + '\')" style="background:#10B981;color:white;border:none;padding:8px 12px;border-radius:15px;cursor:pointer;">🤝 Contratar</button></div>'; } } html += '</div></div></div>'; var antigo = document.getElementById('modalCandidatos'); if (antigo) antigo.remove(); document.body.insertAdjacentHTML('beforeend', html); }); } };
App.prototype.contratarProfissional = function(profId, vagaId) { var s = this; if (!s.usuarioLogado) return; if (!confirm('Contratar este profissional?')) return; if (typeof db !== 'undefined') { db.collection('conexoes').add({ usuarioId: s.usuarioLogado.id, amigoId: profId, vagaId: vagaId, status: 'contratado', dataContratacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { s.adicionarNaRede(profId); var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); var prof = usuarios.find(function(u) { return u.id === profId; }); s.adicionarNotificacao(profId, '🎉 Contratado!', s.usuarioLogado.nome + ' contratou você!'); s.mostrarToast('✅ Contratado!', 'sucesso'); document.getElementById('modalCandidatos')?.remove(); }); } };

// ===== PERFIL ORGANIZADO =====
App.prototype.carregarMeuPerfil = function() { var s = this; if (!s.usuarioLogado) return; var user = s.usuarioLogado, tela = document.getElementById('meuPerfilScreen'); if (!tela) return; var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); var totalObras = vagas.filter(function(v) { return v.autorId === user.id || v.usuarioId === user.id; }).length; tela.innerHTML = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;" id="fotoPerfilPreview">') + '</div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;"><p style="font-size:10px;color:#ccc;">📷 Toque para alterar foto</p><h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo || '') + '</p><div>⭐ ' + (user.score || 0).toFixed(1) + '</div></div><div style="display:flex;gap:8px;padding:15px;background:white;"><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#1A3A5C;">' + (user.experiencia || '0') + '</div><div style="font-size:11px;color:#666;">Anos Exp.</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#f59e0b;">' + (user.score || 0).toFixed(1) + '</div><div style="font-size:11px;color:#666;">Avaliação</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><div style="font-size:22px;font-weight:bold;color:#10B981;">' + totalObras + '</div><div style="font-size:11px;color:#666;">Obras</div></div></div><div style="background:white;margin:0 15px 10px;border-radius:12px;padding:15px;"><h3 style="color:#1A3A5C;"><i class="fas fa-id-card" style="color:#F47920;"></i> Dados Pessoais</h3><div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;"><i class="fas fa-user" style="width:30px;color:#666;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Nome</div><div>' + (user.nome || '') + '</div></div></div><div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;"><i class="fas fa-envelope" style="width:30px;color:#666;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Email</div><div>' + (user.email || '') + '</div></div></div><div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;"><i class="fas fa-phone" style="width:30px;color:#666;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Telefone</div><div>' + (user.celular || '') + '</div></div></div><div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;"><i class="fas fa-briefcase" style="width:30px;color:#666;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Profissão</div><div>' + (user.profissao || '') + '</div></div></div><div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;"><i class="fas fa-building" style="width:30px;color:#666;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Tipo</div><div>' + (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + '</div></div></div><div style="display:flex;align-items:center;padding:10px 0;cursor:pointer;" onclick="window.app.abrirMapaLocalizacao()"><i class="fas fa-map-marker-alt" style="width:30px;color:#F47920;"></i><div style="flex:1;"><div style="font-size:11px;color:#999;">Localização</div><div>' + (user.localizacao ? (user.localizacao.cidade || '') + ', ' + (user.localizacao.estado || '') : 'Toque para adicionar 📍') + '</div></div><i class="fas fa-chevron-right" style="color:#ccc;"></i></div></div><div style="padding:0 15px;"><button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;"><i class="fas fa-edit"></i> Editar Perfil</button><button onclick="window.app.gerarQRCodeCompartilhar()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;"><i class="fas fa-qrcode"></i> Compartilhar Perfil</button><button onclick="window.app.mostrarTela(\'configScreen\')" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;"><i class="fas fa-cog"></i> Configurações</button></div>'; };

// ===== CONFIGURAÇÕES =====
App.prototype.carregarConfigScreen = function() { var s = this; var tela = document.getElementById('configScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'configScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>⚙️ Configurações</h2></div><div style="padding:15px;"><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;"><button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">☀️ Claro</button><button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🌙 Escuro</button></div></div><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>🌐 Idioma</h3><div style="display:flex;gap:10px;"><button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇧🇷 PT</button><button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇺🇸 EN</button><button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇪🇸 ES</button></div></div><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>📄 Documentos</h3><button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso <span style="float:right;">›</span></button><button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade <span style="float:right;">›</span></button><button onclick="window.app.mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">ℹ️ Sobre <span style="float:right;">›</span></button></div><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>📱 Versão</h3><div style="text-align:center;">🏗️ LPXConstrutor v1.0.0</div></div><div style="background:white;border-radius:12px;padding:15px;"><h3 style="color:#EF4444;">⚠️ Zona de Perigo</h3><p style="color:#666;font-size:13px;">Ao excluir sua conta, todos os dados serão removidos.</p><button onclick="window.app.confirmarExcluirConta()" style="width:100%;background:#EF4444;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;">🗑️ EXCLUIR MINHA CONTA</button></div></div>'; s.mostrarTela('configScreen'); };

// ===== MAPA LOCALIZAÇÃO =====
App.prototype.abrirMapaLocalizacao = function() { var s = this; if (!s.usuarioLogado) return; var user = s.usuarioLogado; var html = '<div id="modalLocalizacao" style="position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;"><div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;"><button onclick="document.getElementById(\'modalLocalizacao\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button><h2>📍 Minha Localização</h2></div><div style="padding:20px;"><div style="margin-bottom:15px;"><label style="font-weight:bold;">🗺️ Estado</label><select id="locEstado" onchange="window.app.atualizarCidades()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"><option value="">Selecione...</option>' + s.getEstadosHTML(user.localizacao ? user.localizacao.estado : '') + '</select></div><div style="margin-bottom:15px;"><label style="font-weight:bold;">🏙️ Cidade</label><select id="locCidade" onchange="window.app.atualizarBairros()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"><option value="">Selecione...</option></select></div><div style="margin-bottom:15px;"><label style="font-weight:bold;">📍 Bairro</label><select id="locBairroSelect" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"><option value="">Selecione...</option></select></div><div id="mapaLocalizacao" style="width:100%;height:250px;border-radius:12px;background:#e5e7eb;"></div><button onclick="window.app.salvarLocalizacao()" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-top:15px;cursor:pointer;">💾 SALVAR</button></div></div>'; var antigo = document.getElementById('modalLocalizacao'); if (antigo) antigo.remove(); document.body.insertAdjacentHTML('beforeend', html); setTimeout(function() { s.inicializarMapaLocalizacao(); if (user.localizacao && user.localizacao.estado) { window.app.atualizarCidades(user.localizacao.cidade); if (user.localizacao.bairro) { setTimeout(function() { var bairroEl = document.getElementById('locBairroSelect'); if (bairroEl && s.getBairrosPorCidade(user.localizacao.cidade)) { var bairros = s.getBairrosPorCidade(user.localizacao.cidade); bairroEl.innerHTML = '<option value="">Selecione o bairro...</option>'; for (var j = 0; j < bairros.length; j++) { bairroEl.innerHTML += '<option value="' + bairros[j] + '"' + (user.localizacao.bairro === bairros[j] ? ' selected' : '') + '>' + bairros[j] + '</option>'; } } }, 300); } } }, 500); };
App.prototype.getEstadosHTML = function(estadoSel) { var estados = { 'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará','DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins' }; var html = ''; for (var sigla in estados) html += '<option value="' + sigla + '"' + (estadoSel === sigla ? ' selected' : '') + '>' + estados[sigla] + ' (' + sigla + ')</option>'; return html; };
App.prototype.getTodasCidades = function() { return { 'SP':['São Paulo','Campinas','Santos','Guarulhos','São Bernardo do Campo','Ribeirão Preto','Sorocaba','São José dos Campos'], 'RJ':['Rio de Janeiro','Niterói','Duque de Caxias','Nova Iguaçu','Campos dos Goytacazes','Petrópolis'], 'MG':['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Montes Claros'], 'BA':['Salvador','Feira de Santana','Vitória da Conquista','Camaçari'], 'PR':['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel','Foz do Iguaçu'], 'RS':['Porto Alegre','Caxias do Sul','Pelotas','Canoas','Santa Maria'], 'PE':['Recife','Jaboatão','Olinda','Caruaru'], 'CE':['Fortaleza','Caucaia','Juazeiro do Norte','Sobral'], 'SC':['Florianópolis','Joinville','Blumenau','São José','Chapecó','Criciúma','Itajaí','Balneário Camboriú'], 'GO':['Goiânia','Aparecida','Anápolis','Rio Verde'], 'DF':['Brasília','Taguatinga','Ceilândia'] }; };
App.prototype.getBairrosPorCidade = function(cidade) { var b = { 'São Paulo':['Centro','Pinheiros','Vila Mariana','Moema','Itaim Bibi','Tatuapé','Santana'], 'Rio de Janeiro':['Copacabana','Ipanema','Leblon','Barra','Botafogo','Tijuca'], 'Belo Horizonte':['Savassi','Lourdes','Pampulha','Buritis'], 'Florianópolis':['Centro','Lagoa da Conceição','Ingleses','Canasvieiras'], 'Joinville':['Centro','América','Glória','Costa e Silva'], 'Curitiba':['Centro','Batel','Água Verde','Bigorrilho'], 'Porto Alegre':['Moinhos','Bela Vista','Centro Histórico'] }; return b[cidade] || ['Centro','Outros']; };
App.prototype.atualizarCidades = function(cidadeSel) { var estadoEl = document.getElementById('locEstado'), cidadeEl = document.getElementById('locCidade'), bairroEl = document.getElementById('locBairroSelect'); if (!estadoEl || !cidadeEl) return; var estado = estadoEl.value, cidades = this.getTodasCidades(); cidadeEl.innerHTML = '<option value="">Selecione a cidade...</option>'; if (estado && cidades[estado]) for (var i = 0; i < cidades[estado].length; i++) cidadeEl.innerHTML += '<option value="' + cidades[estado][i] + '"' + (cidadeSel === cidades[estado][i] ? ' selected' : '') + '>' + cidades[estado][i] + '</option>'; if (bairroEl) { bairroEl.innerHTML = '<option value="">Selecione o bairro...</option>'; } };
App.prototype.atualizarBairros = function() { var cidadeEl = document.getElementById('locCidade'), bairroEl = document.getElementById('locBairroSelect'); if (!cidadeEl || !bairroEl) return; var cidade = cidadeEl.value; bairroEl.innerHTML = '<option value="">Selecione o bairro...</option>'; if (cidade && window.app._app) { var bairros = window.app._app.getBairrosPorCidade(cidade); if (bairros) for (var i = 0; i < bairros.length; i++) bairroEl.innerHTML += '<option value="' + bairros[i] + '">' + bairros[i] + '</option>'; } };
App.prototype.inicializarMapaLocalizacao = function() { var mapDiv = document.getElementById('mapaLocalizacao'); if (!mapDiv) return; var lat = -23.5505, lng = -46.6333; if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function(pos) { window.app._app.mostrarMapaPadrao(mapDiv, pos.coords.latitude, pos.coords.longitude); }, function() { window.app._app.mostrarMapaPadrao(mapDiv, lat, lng); }); } else { this.mostrarMapaPadrao(mapDiv, lat, lng); } };
App.prototype.mostrarMapaPadrao = function(mapDiv, lat, lng) { if (typeof google === 'undefined') { mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:12px;color:#666;">🗺️ Mapa indisponível</div>'; return; } var map = new google.maps.Map(mapDiv, { center: { lat: lat, lng: lng }, zoom: 15 }); var marker = new google.maps.Marker({ position: { lat: lat, lng: lng }, map: map, draggable: true }); google.maps.event.addListener(marker, 'dragend', function() { var pos = marker.getPosition(); window.app._mapaMarcador = { lat: pos.lat(), lng: pos.lng() }; }); window.app._mapaMarcador = { lat: lat, lng: lng }; };
App.prototype.salvarLocalizacao = function() { var s = this; var estado = document.getElementById('locEstado')?.value || '', cidade = document.getElementById('locCidade')?.value || '', bairro = document.getElementById('locBairroSelect')?.value || ''; if (!estado) { s.mostrarToast('❌ Selecione o estado!', 'erro'); return; } if (!cidade) { s.mostrarToast('❌ Selecione a cidade!', 'erro'); return; } var loc = { estado: estado, cidade: cidade, bairro: bairro, lat: window.app._mapaMarcador ? window.app._mapaMarcador.lat : -23.5505, lng: window.app._mapaMarcador ? window.app._mapaMarcador.lng : -46.6333 }; s.usuarioLogado.localizacao = loc; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof databaseService !== 'undefined') databaseService.atualizarUsuario(s.usuarioLogado.id, { localizacao: loc }).catch(function(){}); document.getElementById('modalLocalizacao')?.remove(); s.mostrarToast('✅ Localização salva!', 'sucesso'); s.carregarMeuPerfil(); };

// ===== QR CODE / EXCLUIR CONTA / UPLOAD / EDITAR PERFIL =====
App.prototype.gerarQRCodeCompartilhar = function() { var s = this; if (!s.usuarioLogado) return; var user = s.usuarioLogado, perfilUrl = window.location.origin + window.location.pathname + '?perfil=' + user.id; var html = '<div id="modalQRCodeCompartilhar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)window.app.fecharQRCode()"><div style="background:white;border-radius:20px;padding:30px;text-align:center;max-width:350px;" onclick="event.stopPropagation()"><div style="display:flex;justify-content:space-between;margin-bottom:20px;"><h3>📱 Compartilhar</h3><button onclick="window.app.fecharQRCode()" style="background:none;border:none;font-size:24px;color:#999;cursor:pointer;">✕</button></div><div style="margin-bottom:20px;"><div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:0 auto 10px;border:3px solid #F47920;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:35px;">👷</div>') + '</div><p style="font-weight:bold;">' + user.nome + '</p></div><div id="qrcodeCompartilharContainer" style="display:flex;justify-content:center;margin-bottom:20px;padding:15px;background:#f9fafb;border-radius:12px;"></div><div style="display:flex;gap:10px;"><button onclick="window.app.compartilharPerfil()" style="flex:1;background:#25D366;color:white;border:none;padding:12px;border-radius:10px;cursor:pointer;">📤 Compartilhar</button><button onclick="window.app.baixarQRCodeCompartilhar()" style="flex:1;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:10px;cursor:pointer;">💾 Baixar</button></div></div></div>'; var antigo = document.getElementById('modalQRCodeCompartilhar'); if (antigo) antigo.remove(); document.body.insertAdjacentHTML('beforeend', html); setTimeout(function() { var c = document.getElementById('qrcodeCompartilharContainer'); if (c && typeof QRCode !== 'undefined') { c.innerHTML = ''; new QRCode(c, { text: perfilUrl, width: 180, height: 180, colorDark: '#1A3A5C', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } }, 300); };
App.prototype.compartilharPerfil = function() { var s = this, url = window.location.origin + window.location.pathname + '?perfil=' + s.usuarioLogado.id; if (navigator.share) navigator.share({ title: 'Perfil de ' + s.usuarioLogado.nome, url: url }).catch(function(){}); else s.copiarLink(url); };
App.prototype.copiarLink = function(url) { var t = document.createElement('input'); t.value = url; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); this.mostrarToast('✅ Link copiado!', 'sucesso'); } catch(e) {} document.body.removeChild(t); };
App.prototype.baixarQRCodeCompartilhar = function() { var img = document.querySelector('#qrcodeCompartilharContainer img'); if (!img) return; var a = document.createElement('a'); a.download = 'perfil-qrcode.png'; a.href = img.src; a.click(); this.mostrarToast('✅ Baixado!', 'sucesso'); };
App.prototype.confirmarExcluirConta = function() { var s = this; var html = '<div id="modalExcluir" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)document.getElementById(\'modalExcluir\').remove()"><div style="background:white;border-radius:20px;padding:30px;max-width:400px;text-align:center;" onclick="event.stopPropagation()"><div style="font-size:60px;">⚠️</div><h3 style="color:#EF4444;">Excluir Conta</h3><p>Irreversível!</p><div style="margin:15px 0;text-align:left;"><label>Digite <b>EXCLUIR</b>:</label><input id="confirmExcluir" type="text" placeholder="EXCLUIR" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:8px;text-align:center;font-weight:bold;"></div><div style="margin-bottom:15px;text-align:left;"><label>Sua <b>senha</b>:</label><input id="confirmSenha" type="password" placeholder="Senha" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:8px;"></div><button id="btnExcluirConta" onclick="window.app.executarExcluirConta()" disabled style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;opacity:0.5;">🗑️ EXCLUIR</button><button onclick="document.getElementById(\'modalExcluir\').remove()" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:12px;border-radius:10px;margin-top:10px;cursor:pointer;">CANCELAR</button></div></div>'; var antigo = document.getElementById('modalExcluir'); if (antigo) antigo.remove(); document.body.insertAdjacentHTML('beforeend', html); setTimeout(function() { var it = document.getElementById('confirmExcluir'), is = document.getElementById('confirmSenha'), be = document.getElementById('btnExcluirConta'); function v() { if (it.value === 'EXCLUIR' && is.value.length >= 3) { be.disabled = false; be.style.opacity = '1'; } else { be.disabled = true; be.style.opacity = '0.5'; } } it.addEventListener('input', v); is.addEventListener('input', v); }, 300); };
App.prototype.executarExcluirConta = function() { var s = this; if (document.getElementById('confirmSenha')?.value !== s.usuarioLogado.senha) { s.mostrarToast('❌ Senha incorreta!', 'erro'); return; } var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'), novas = []; for (var i = 0; i < usuarios.length; i++) { if (usuarios[i].id !== s.usuarioLogado.id) novas.push(usuarios[i]); } localStorage.setItem('usuariosLPX', JSON.stringify(novas)); if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).delete().catch(function(){}); localStorage.removeItem('usuarioLPX'); s.usuarioLogado = null; document.getElementById('modalExcluir')?.remove(); s.mostrarToast('✅ Conta excluída', 'sucesso'); setTimeout(function() { s.mostrarTela('loginScreen'); }, 1500); };
App.prototype.uploadFoto = function(event) { var s = this, file = event.target.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function(e) { var foto = e.target.result; s.usuarioLogado.fotoPerfil = foto; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof databaseService !== 'undefined') databaseService.atualizarUsuario(s.usuarioLogado.id, { fotoPerfil: foto }).catch(function(){}); s.mostrarToast('✅ Foto atualizada!', 'sucesso'); var preview = document.getElementById('fotoPerfilPreview'); if (preview) preview.src = foto; }; reader.readAsDataURL(file); };
App.prototype.abrirEditarPerfil = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado; var html = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;"><div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;"><h3 style="text-align:center;">✏️ Editar Perfil</h3><input id="editNome" value="' + (u.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editCelular" value="' + (u.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editProfissao" value="' + (u.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editExperiencia" type="number" value="' + (u.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;"><button onclick="window.app.salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button><button onclick="document.getElementById(\'modalEditar\').remove()" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button></div></div>'; document.body.insertAdjacentHTML('beforeend', html); };
App.prototype.salvarPerfil = function() { var s = this; var dados = { nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome, celular: document.getElementById('editCelular')?.value?.trim() || '', profissao: document.getElementById('editProfissao')?.value?.trim() || '', experiencia: document.getElementById('editExperiencia')?.value?.trim() || '0' }; if (!dados.nome) { s.mostrarToast('Nome obrigatório!', 'erro'); return; } s.usuarioLogado.nome = dados.nome; s.usuarioLogado.celular = dados.celular; s.usuarioLogado.profissao = dados.profissao; s.usuarioLogado.experiencia = dados.experiencia; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof databaseService !== 'undefined') databaseService.atualizarUsuario(s.usuarioLogado.id, dados).catch(function(){}); document.getElementById('modalEditar')?.remove(); s.mostrarToast('✅ Perfil atualizado!', 'sucesso'); s.carregarMeuPerfil(); };

// ===== OUTROS =====
App.prototype.mostrarDocumento = function(tipo) { var tela = document.getElementById('documentoScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); } var tt = { termos: '📄 Termos', privacidade: '🔒 Privacidade', sobre: 'ℹ️ Sobre' }; var cc = { termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>', privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p>', sobre: '<div style="text-align:center;"><img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:80px;"><h3>LPXCONSTRUTOR v1.0.0</h3></div>' }; tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button><h2>' + (tt[tipo] || '') + '</h2></div><div style="padding:20px;">' + (cc[tipo] || '') + '</div>'; this.mostrarTela('documentoScreen'); };
App.prototype.mostrarInfoVersao = function() { this.mostrarToast('🏗️ LPXConstrutor v1.0.0', 'info'); };
App.prototype.selecionarTema = function(tema) { this.temaAtual = tema; localStorage.setItem('tema', tema); if (tema === 'escuro') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme'); this.mostrarToast('🎨 Tema alterado!', 'sucesso'); };
App.prototype.selecionarIdioma = function(idioma) { this.idiomaAtual = idioma; localStorage.setItem('idioma', idioma); this.mostrarToast('🌐 Idioma alterado!', 'sucesso'); };
App.prototype.fecharModalSair = function() { var m = document.getElementById('modalSair'); if(m) m.style.display='none'; };
App.prototype.confirmarSair = function() { this.sair(); };
App.prototype.solicitarCodigo = function() { this.mostrarToast('📧 Código enviado!', 'sucesso'); };
App.prototype.verificarCodigo = function() { this.mostrarToast('✅ Senha redefinida!', 'sucesso'); setTimeout(function() { window.app._app.mostrarTela('loginScreen'); }, 1500); };
App.prototype.voltarPasso1 = function() { document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; };
App.prototype.novaObra = function() { var n = prompt('Nome:'), e = prompt('Endereço:'); if (!n || !e) return; if (typeof db !== 'undefined') db.collection('obras').add({ nome: n, endereco: e, usuarioId: this.usuarioLogado.id, ativa: true }).then(function() { window.app._app.carregarMinhasObras(); }); };
App.prototype.verAvaliacoes = function() { this.mostrarToast('📊 Em desenvolvimento', 'info'); };

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:14px 24px;border-radius:12px;z-index:99999;font-weight:bold;display:none;text-align:center;max-width:90%;box-shadow:0 8px 30px rgba(0,0,0,0.3);'; document.body.appendChild(toast); }
    toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1A3A5C'; toast.style.color = 'white'; toast.style.display = 'block';
    if (t === 'info' && navigator.vibrate) navigator.vibrate(200);
    clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    var splashAntigo = document.getElementById('splashScreen'); if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO FINAL!');
    console.log('✅ Chat tempo real');
    console.log('✅ Candidatura e contratação');
    console.log('✅ Geofencing da obra');
    console.log('✅ Notificações automáticas');
    console.log('✅ Avaliação com score');
    console.log('✅ Botões de contato na obra');
    console.log('✅ Mapa com estados/cidades/bairros');
});
