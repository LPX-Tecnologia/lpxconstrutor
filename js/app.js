// ==========================================================
// LPXCONSTRUTOR v2.0.3 - APP PRINCIPAL CORRIGIDO
// ==========================================================

const APP_VERSION = "2.0.3";

console.log(`🏗️ LPXCONSTRUTOR v${APP_VERSION}`);

window.app = {
    _app: null,
    fazerLogin: function() { if(this._app) this._app.fazerLogin(); },
    mostrarTela: function(id) { if(this._app) this._app.mostrarTela(id); },
    voltarTela: function() { if(this._app) this._app.voltarTela(); },
    cadastrar: function() { if(this._app) this._app.cadastrar(); },
    sair: function() { if(this._app) this._app.sair(); },
    confirmarSair: function() { if(this._app) this._app.sair(); },
    fecharModalSair: function() { var m = document.getElementById('modalSair'); if(m) m.style.display = 'none'; },
    buscarProfissionais: function() { if(this._app) this._app.buscarProfissionais(); },
    verPerfil: function(uid) { if(this._app) this._app.verPerfil(uid); },
    abrirTelaPublicacao: function() { if(this._app) this._app.abrirTelaPublicacao(); },
    publicarVagaApp: function() { if(this._app) this._app.publicarVagaApp(); },
    previewFotoObra: function(e) { if(this._app) this._app.previewFotoObra(e); },
    carregarMinhasObras: function() { if(this._app) this._app.carregarMinhasObras(); },
    verDetalheObra: function(oid) { if(this._app) this._app.verDetalheObra(oid); },
    uploadFoto: function(e) { if(this._app) this._app.uploadFoto(e); },
    abrirEditarPerfil: function() { if(this._app) this._app.abrirEditarPerfil(); },
    salvarPerfil: function() { if(this._app) this._app.salvarPerfil(); },
    selecionarTema: function(t) { if(this._app) this._app.selecionarTema(t); },
    mostrarDocumento: function(t) { if(this._app) this._app.mostrarDocumento(t); },
    mudarTab: function(t) { if(this._app) this._app.mudarTab(t); },
    adicionarNaRede: function(uid) { if(this._app) this._app.adicionarNaRede(uid); },
    apagarObra: function(oid, ev) { if(this._app) this._app.apagarObra(oid, ev); },
    mostrarNotificacoes: function() { if(this._app) this._app.mostrarNotificacoes(); },
    iniciarChat: function(uid) { if(this._app) this._app.iniciarChat(uid); },
    enviarMensagem: function() { if(this._app) this._app.enviarMensagem(); },
    gerarQRCodeCompartilhar: function() { if(this._app) this._app.gerarQRCodeCompartilhar(); },
    abrirMapaLocalizacao: function() { if(this._app) this._app.abrirMapaLocalizacao(); },
    salvarLocalizacao: function() { if(this._app) this._app.salvarLocalizacao(); },
    atualizarCidades: function(c) { if(this._app) this._app.atualizarCidades(c); },
    atualizarBairros: function(b) { if(this._app) this._app.atualizarBairros(b); },
    aceitarConvite: function(nid, de) { if(this._app) this._app.aceitarConvite(nid, de); },
    recusarConvite: function(nid, de) { if(this._app) this._app.recusarConvite(nid, de); },
    novaObra: function() { if(this._app) this._app.abrirTelaPublicacao(); },
    proximaEtapa: function(e) { if(this._app) this._app.proximaEtapa(e); },
    toggleProfissao: function() { if(this._app) this._app.toggleProfissao(); },
    solicitarCodigo: function() { if(this._app) this._app.solicitarCodigo(); },
    verificarCodigo: function() { if(this._app) this._app.verificarCodigo(); },
    voltarPasso1: function() { if(this._app) this._app.voltarPasso1(); },
    carregarListaConversas: function() { if(this._app) this._app.carregarListaConversas(); }
};

// ===== APP PRINCIPAL =====
var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this._enviandoMensagem = false;
    this._listenerFeed = null;
    this._listenerChat = null;
    this._listenerNotificacoes = null;
    this._vagasCache = [];
    this._publicando = false;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 App iniciado');
    
    window.app._app = s;
    
    var nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = 'none';
    
    if (s.temaAtual === 'escuro') {
        document.body.classList.add('dark-theme');
    }
    
    // Verifica usuário logado
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('✅ Usuário autenticado:', user.uid);
                if (typeof db !== 'undefined') {
                    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            s.usuarioLogado = doc.data();
                            s.usuarioLogado.id = doc.id;
                            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                            s.mostrarTela('homeScreen');
                            s.iniciarFeedListener();
                            s.iniciarListenerNotificacoes();
                        } else {
                            s.mostrarTela('loginScreen');
                        }
                    }).catch(function() {
                        s.mostrarTela('loginScreen');
                    });
                }
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.pararFeedListener();
                s.mostrarTela('loginScreen');
            }
        });
    } else {
        setTimeout(function() { s.mostrarTela('loginScreen'); }, 1500);
    }
};

App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Navegando para:', id);
    
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
        document.body.appendChild(tela);
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasSemNav = ['loginScreen', 'cadastroScreen', 'recuperarSenhaScreen'];
        nav.style.display = telasSemNav.indexOf(id) >= 0 ? 'none' : 'flex';
        
        var navItems = nav.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === id) item.classList.add('active');
        });
    }
    
    switch(id) {
        case 'homeScreen': s.carregarHome(); break;
        case 'meuPerfilScreen': s.carregarMeuPerfil(); break;
        case 'buscaScreen': s.buscarProfissionais(); break;
        case 'minhasObrasScreen': s.carregarMinhasObras(); break;
        case 'chatScreen': if (!s.usuarioSelecionado) s.carregarListaConversas(); break;
        case 'configScreen': s.carregarConfigScreen(); break;
    }
    
    // Mostrar botões de empreiteiro
    if (id === 'homeScreen' && s.usuarioLogado) {
        var btnPublicar = document.getElementById('btnPublicar');
        var btnObras = document.getElementById('btnObras');
        if (btnPublicar) btnPublicar.style.display = s.usuarioLogado.tipo === 'empreiteiro' ? 'flex' : 'none';
        if (btnObras) btnObras.style.display = s.usuarioLogado.tipo === 'empreiteiro' ? 'flex' : 'none';
    }
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        this.mostrarTela(this.historicoTelas.pop());
    } else {
        this.mostrarTela('homeScreen');
    }
};

App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value || '';
    
    if (!email || !senha) {
        s.mostrarToast('Preencha email e senha!', 'erro');
        return;
    }
    
    var btn = document.getElementById('btnLogin');
    if (btn) { btn.textContent = '⏳ Entrando...'; btn.disabled = true; }
    
    s.mostrarToast('Entrando...', 'info');
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function(userCredential) {
                return db.collection('usuarios').doc(userCredential.user.uid).get();
            })
            .then(function(doc) {
                if (doc.exists) {
                    s.usuarioLogado = doc.data();
                    s.usuarioLogado.id = doc.id;
                    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                    s.historicoTelas = [];
                    s.mostrarToast('Bem-vindo, ' + s.usuarioLogado.nome + '!', 'sucesso');
                    s.mostrarTela('homeScreen');
                } else {
                    s.mostrarToast('Usuário não encontrado!', 'erro');
                }
            })
            .catch(function(err) {
                var msg = 'Email ou senha incorretos!';
                if (err.code === 'auth/user-not-found') msg = 'Usuário não encontrado!';
                else if (err.code === 'auth/wrong-password') msg = 'Senha incorreta!';
                s.mostrarToast(msg, 'erro');
            })
            .finally(function() {
                if (btn) { btn.textContent = 'ENTRAR'; btn.disabled = false; }
            });
    }
};

App.prototype.cadastrar = function() {
    var s = this;
    var dados = {
        nome: document.getElementById('cadNome')?.value?.trim() || '',
        email: document.getElementById('cadEmail')?.value?.trim() || '',
        senha: document.getElementById('cadSenha')?.value || '',
        tipo: document.getElementById('cadTipo')?.value || 'profissional',
        celular: document.getElementById('cadCelular')?.value?.trim() || '',
        cpf: document.getElementById('cadCPF')?.value?.trim() || '',
        profissao: document.getElementById('cadProfissao')?.value || '',
        experiencia: document.getElementById('cadExperiencia')?.value || '0',
        habilidades: document.getElementById('cadHabilidades')?.value?.trim() || '',
        score: 0,
        fotoPerfil: null
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    if (dados.senha.length < 6) {
        s.mostrarToast('Senha deve ter no mínimo 6 caracteres!', 'erro');
        return;
    }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha)
        .then(function(userCredential) {
            dados.id = userCredential.user.uid;
            dados.dataCriacao = firebase.firestore.FieldValue.serverTimestamp();
            dados.ativo = true;
            return db.collection('usuarios').doc(dados.id).set(dados);
        })
        .then(function() {
            s.usuarioLogado = dados;
            localStorage.setItem('usuarioLPX', JSON.stringify(dados));
            s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
            s.mostrarTela('homeScreen');
        })
        .catch(function(err) {
            var msg = err.code === 'auth/email-already-in-use' ? 'Email já cadastrado!' : 'Erro ao cadastrar';
            s.mostrarToast(msg, 'erro');
        });
};

App.prototype.sair = function() {
    if (this._listenerFeed) { this._listenerFeed(); this._listenerFeed = null; }
    if (this._listenerChat) { this._listenerChat(); this._listenerChat = null; }
    if (this._listenerNotificacoes) { this._listenerNotificacoes(); this._listenerNotificacoes = null; }
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut();
    }
    
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    localStorage.removeItem('usuarioLPX');
    this.historicoTelas = [];
    
    var modal = document.getElementById('modalSair');
    if (modal) modal.style.display = 'none';
    
    this.mostrarTela('loginScreen');
};

App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var u = s.usuarioLogado;
    var hr = new Date().getHours();
    var saudacao = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    
    var elSaudacao = document.getElementById('saudacao');
    if (elSaudacao) elSaudacao.textContent = '👋 ' + saudacao + ', ' + u.nome + '!';
    
    var elResumo = document.getElementById('resumoTexto');
    if (elResumo) elResumo.textContent = u.tipo === 'empreiteiro' ? '🏰 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
    
    if (typeof mapaService !== 'undefined' && !s._mapaInicializado) {
        mapaService.initMap();
        s._mapaInicializado = true;
    }
};

App.prototype.mudarTab = function(t) {
    this.tabAtual = t;
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) { tab.classList.remove('active'); });
    
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer');
    
    if (t === 'feed') {
        if (fc) fc.style.display = 'flex';
        if (rc) rc.style.display = 'none';
        tabs[0]?.classList.add('active');
    } else {
        if (fc) fc.style.display = 'none';
        if (rc) rc.style.display = 'flex';
        tabs[1]?.classList.add('active');
        this.carregarRede();
    }
};

App.prototype.iniciarFeedListener = function() {
    var s = this;
    if (s._listenerFeed || typeof db === 'undefined') return;
    
    s._listenerFeed = db.collection('vagas')
        .where('ativa', '==', true)
        .orderBy('dataCriacao', 'desc')
        .onSnapshot(function(snap) {
            var vagas = [];
            snap.forEach(function(doc) {
                var vaga = doc.data();
                vaga.id = doc.id;
                vagas.push(vaga);
            });
            s._vagasCache = vagas;
            s.renderizarFeed(vagas);
        });
};

App.prototype.pararFeedListener = function() {
    if (this._listenerFeed) { this._listenerFeed(); this._listenerFeed = null; }
};

App.prototype.renderizarFeed = function(vagas) {
    var s = this;
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    if (!vagas || vagas.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra publicada</h3><p>Seja o primeiro a publicar!</p></div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        var dono = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        
        html += '<div class="vaga-card">' +
            '<div class="vaga-header">' +
            '<div class="vaga-avatar">' + (v.autorFoto ? '<img src="' + v.autorFoto + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '👷') + '</div>' +
            '<div class="vaga-info"><div class="vaga-nome">' + (v.autorNome || 'Anônimo') + '</div><div class="vaga-data">' + (v.dataCriacao?.toDate?.().toLocaleDateString('pt-BR') || '') + '</div></div>' +
            (dono ? '<span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:12px;font-size:11px;">⭐ SUA</span>' : '') +
            '</div>' +
            '<div class="vaga-body">' +
            (v.fotoObra ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;">' : '') +
            '<div class="vaga-titulo">' + (v.titulo || 'Sem título') + '</div>' +
            '<div style="color:#666;font-size:13px;">📍 ' + (v.endereco || '') + '</div>' +
            '<div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.profissoes || 'Geral') + '</span></div>' +
            '</div>' +
            '<div class="vaga-footer">' +
            '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver Detalhes</button>' +
            (dono ? '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">🗑️ Apagar</button>' : '') +
            '</div></div>';
    }
    container.innerHTML = html;
};

App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = mensagem;
    toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1A3A5C';
    toast.style.color = 'white';
    toast.style.display = 'block';
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ LPXCONSTRUTOR v' + APP_VERSION + ' - CORRIGIDO');
    window.app._app = new App();
});
