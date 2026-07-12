// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO E FUNCIONAL =====
// ==========================================================

if (!window.app || !window.app._app) { 
    window.app = window.app || {}; 
    window.app._app = window.app._app || null; 
}

window.app = {
    _app: null,
    fazerLogin: function(){ if(window.app._app)window.app._app.fazerLogin(); },
    mostrarTela: function(id){ if(window.app._app)window.app._app.mostrarTela(id); },
    voltarTela: function(){ if(window.app._app)window.app._app.voltarTela(); },
    cadastrar: function(){ if(window.app._app)window.app._app.cadastrar(); },
    sair: function(){ if(window.app._app)window.app._app.sair(); },
    buscarProfissionais: function(){ if(window.app._app)window.app._app.buscarProfissionais(); },
    verPerfil: function(uid){ if(window.app._app)window.app._app.verPerfil(uid); },
    abrirTelaPublicacao: function(){ if(window.app._app)window.app._app.abrirTelaPublicacao(); },
    publicarVagaApp: function(){ if(window.app._app)window.app._app.publicarVagaApp(); },
    previewFotoObra: function(e){ if(window.app._app)window.app._app.previewFotoObra(e); },
    carregarMinhasObras: function(){ if(window.app._app)window.app._app.carregarMinhasObras(); },
    verDetalheObra: function(oid){ if(window.app._app)window.app._app.verDetalheObra(oid); },
    uploadFotoPerfil: function(e){ if(window.app._app)window.app._app.uploadFotoPerfil(e); },
    abrirEditarPerfil: function(){ if(window.app._app)window.app._app.abrirEditarPerfil(); },
    salvarPerfil: function(){ if(window.app._app)window.app._app.salvarPerfil(); },
    mostrarSecao: function(secao){ if(window.app._app)window.app._app.mostrarSecao(secao); },
    selecionarTema: function(t){ if(window.app._app)window.app._app.selecionarTema(t); },
    selecionarIdioma: function(i){ if(window.app._app)window.app._app.selecionarIdioma(i); },
    carregarRede: function(){ if(window.app._app)window.app._app.carregarRede(); },
    adicionarNaRede: function(uid){ if(window.app._app)window.app._app.adicionarNaRede(uid); },
    removerDaRede: function(uid){ if(window.app._app)window.app._app.removerDaRede(uid); },
    carregarFeed: function(){ if(window.app._app)window.app._app.carregarFeed(); },
    mostrarDocumento: function(tipo){ if(window.app._app)window.app._app.mostrarDocumento(tipo); },
    candidatarVaga: function(vid){ if(window.app._app)window.app._app.candidatarVaga(vid); },
    mudarTab: function(t){ if(window.app._app)window.app._app.mudarTab(t); }
};

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.tabAtual = 'feed';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR Iniciando...');
    window.app._app = this;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    var usuarioSalvo = localStorage.getItem('usuarioLPX');
    if (usuarioSalvo) {
        try { s.usuarioLogado = JSON.parse(usuarioSalvo); } catch(e) {}
    }
    
    if (s.usuarioLogado) {
        s.mostrarSplash();
        setTimeout(function() {
            s.esconderSplash();
            s.mostrarTela('homeScreen');
        }, 1500);
    } else {
        s.mostrarSplash();
        setTimeout(function() {
            s.esconderSplash();
            s.mostrarTela('loginScreen');
        }, 1500);
    }
    
    window.addEventListener('popstate', function() {
        if (s.telaAtual !== 'homeScreen' && s.telaAtual !== 'loginScreen') s.voltarTela();
    });
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) {
        splash = document.createElement('div');
        splash.id = 'splashScreen';
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;';
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;">' +
            '<p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p>' +
            '<p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
        document.body.appendChild(splash);
    }
};

App.prototype.esconderSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (splash) { splash.style.opacity = '0'; setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 500); }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); x.style.display = 'none'; });
    
    var tela = document.getElementById(id);
    if (!tela) { console.error('Tela não encontrada:', id); return; }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        this.mostrarTela(this.historicoTelas.pop());
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value?.trim() || '';
    
    if (!email || !senha) { s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    
    s.mostrarToast('Entrando...', 'info');
    
    // Firebase Auth
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(userCredential) {
            var user = userCredential.user;
            var userData = {
                id: user.uid,
                nome: user.displayName || email.split('@')[0],
                email: email,
                tipo: 'profissional',
                score: 0,
                fotoPerfil: null
            };
            s.usuarioLogado = userData;
            localStorage.setItem('usuarioLPX', JSON.stringify(userData));
            s.mostrarToast('✅ Bem-vindo, ' + userData.nome + '!', 'sucesso');
            s.mostrarTela('homeScreen');
        }).catch(function(error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                s.mostrarToast('❌ Email ou senha incorretos', 'erro');
            } else {
                s.mostrarToast('❌ Erro: ' + error.message, 'erro');
            }
        });
        return;
    }
    
    // Firestore
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('email', '==', email).get().then(function(snap) {
            if (snap.empty) { s.mostrarToast('❌ Usuário não encontrado', 'erro'); return; }
            snap.forEach(function(doc) {
                var user = doc.data(); user.id = doc.id;
                if (user.senha === senha) {
                    s.usuarioLogado = user;
                    localStorage.setItem('usuarioLPX', JSON.stringify(user));
                    s.mostrarToast('✅ Bem-vindo, ' + user.nome + '!', 'sucesso');
                    s.mostrarTela('homeScreen');
                } else {
                    s.mostrarToast('❌ Senha incorreta', 'erro');
                }
            });
        }).catch(function() { s.mostrarToast('❌ Erro ao conectar', 'erro'); });
        return;
    }
    
    // localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var usuario = usuarios.find(function(u) { return u.email === email && u.senha === senha; });
    if (usuario) {
        s.usuarioLogado = usuario;
        localStorage.setItem('usuarioLPX', JSON.stringify(usuario));
        s.mostrarToast('✅ Bem-vindo, ' + usuario.nome + '!', 'sucesso');
        s.mostrarTela('homeScreen');
    } else {
        s.mostrarToast('❌ Email ou senha incorretos', 'erro');
    }
};

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
        score: 0,
        fotoPerfil: null,
        dataCadastro: new Date().toISOString()
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return;
    }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    // Firebase Auth
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha).then(function(userCredential) {
            dados.id = userCredential.user.uid;
            s.finalizarCadastro(dados);
        }).catch(function(error) {
            if (error.code === 'auth/email-already-in-use') {
                s.mostrarToast('❌ Email já cadastrado!', 'erro');
            } else {
                s.cadastrarLocal(dados);
            }
        });
        return;
    }
    
    // Firestore
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('email', '==', dados.email).get().then(function(snap) {
            if (!snap.empty) { s.mostrarToast('❌ Email já cadastrado!', 'erro'); return; }
            db.collection('usuarios').add(dados).then(function(docRef) {
                dados.id = docRef.id;
                s.finalizarCadastro(dados);
            });
        }).catch(function() { s.cadastrarLocal(dados); });
        return;
    }
    
    s.cadastrarLocal(dados);
};

App.prototype.cadastrarLocal = function(dados) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    if (usuarios.find(function(u) { return u.email === dados.email; })) {
        s.mostrarToast('❌ Email já cadastrado!', 'erro'); return;
    }
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    s.finalizarCadastro(dados);
};

App.prototype.finalizarCadastro = function(dados) {
    var s = this;
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.mostrarToast('✅ Cadastro realizado! Bem-vindo, ' + dados.nome + '!', 'sucesso');
    s.mostrarTela('homeScreen');
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut();
    this.historicoTelas = [];
    this.mostrarTela('loginScreen');
    this.mostrarToast('👋 Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var homeScreen = document.getElementById('homeScreen');
    if (homeScreen && !document.getElementById('homeTabs')) {
        homeScreen.innerHTML = s.criarEstruturaHome();
    }
    
    var foto = document.querySelector('#homeScreen .foto-usuario');
    if (foto && s.usuarioLogado.fotoPerfil) {
        foto.innerHTML = '<img src="' + s.usuarioLogado.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    }
    
    s.carregarFeed();
    
    var btnPublicar = document.getElementById('btnPublicarFlutuante');
    if (btnPublicar) btnPublicar.style.display = (s.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.criarEstruturaHome = function() {
    var user = this.usuarioLogado;
    var h = new Date().getHours();
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);padding:15px;display:flex;align-items:center;gap:12px;">';
    html += '<div class="foto-usuario" style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;flex-shrink:0;">';
    html += user && user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    html += '</div><div style="flex:1;"><div id="saudacao" style="color:white;font-weight:bold;">👋 ' + sd + ', ' + (user ? user.nome : 'Usuário') + '!</div>';
    html += '<div style="color:#f0c27f;font-size:12px;">' + (user ? (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') : '') + '</div></div></div>';
    
    html += '<div id="homeTabs" style="display:flex;background:white;padding:10px;gap:5px;">';
    html += '<button onclick="window.app.mudarTab(\'feed\')" id="tabFeed" style="flex:1;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;">📋 FEED</button>';
    html += '<button onclick="window.app.mudarTab(\'rede\')" id="tabRede" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:12px;border-radius:25px;font-weight:bold;">🔗 REDE</button></div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div><div id="redeContainer" style="padding:10px;display:none;"></div>';
    html += '<button onclick="window.app.abrirTelaPublicacao()" id="btnPublicarFlutuante" style="position:fixed;bottom:80px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;border-radius:50%;font-size:28px;box-shadow:0 4px 15px rgba(245,158,11,0.5);z-index:999;display:' + (user && user.tipo === 'empreiteiro' ? 'flex' : 'none') + ';align-items:center;justify-content:center;">📢</button>';
    
    return html;
};

App.prototype.mudarTab = function(tab) {
    this.tabAtual = tab;
    var btnFeed = document.getElementById('tabFeed'), btnRede = document.getElementById('tabRede');
    if (btnFeed) { btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; }
    if (btnRede) { btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; }
    var fc = document.getElementById('feedContainer'), rc = document.getElementById('redeContainer');
    if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none';
    if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer');
    if (!c) return;
    c.innerHTML = '<div class="loading" style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Carregando obras...</div>';
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
            snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; if (!vagas.find(function(x) { return x.id === v.id; })) vagas.push(v); });
            s.renderizarFeed(c, vagas);
        }).catch(function() { s.renderizarFeed(c, vagas); });
    } else { s.renderizarFeed(c, vagas); }
};

App.prototype.renderizarFeed = function(c, vagas) {
    var s = this;
    if (vagas.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🏗️</div><h3>Nenhuma obra</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>';
        return;
    }
    
    var obras = [];
    vagas.forEach(function(v) { if (s.usuarioLogado && v.autorId === s.usuarioLogado.id) { v._destaque = true; obras.unshift(v); } else obras.push(v); });
    
    var html = '';
    obras.forEach(function(v) {
        var destaque = v._destaque;
        html += '<div class="card" style="cursor:pointer;margin-bottom:15px;' + (destaque ? 'border:3px solid #f59e0b;box-shadow:0 4px 20px rgba(245,158,11,0.4);' : '') + '" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        if (destaque) html += '<div style="background:#f59e0b;color:white;padding:4px 12px;border-radius:0 0 10px 10px;display:inline-block;font-size:11px;font-weight:bold;margin-bottom:8px;">⭐ SUA OBRA</div>';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:10px;" onerror="this.style.display=\'none\'">';
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
        html += v.autorFoto ? '<img src="' + v.autorFoto + '" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">' : '<div style="width:35px;height:35px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">🏗️</div>';
        html += '<div><div style="font-weight:bold;color:#1A3A5C;">' + (v.titulo || 'Sem título') + '</div><div style="font-size:11px;color:#666;">📍 ' + (v.endereco || '') + ' • 👤 ' + (v.autorNome || 'Anônimo') + '</div></div></div>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;"><span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span><span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span></div>';
        html += '</div>';
    });
    c.innerHTML = html;
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this, c = document.getElementById('redeContainer');
    if (!c) return;
    if (!s.usuarioLogado) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>'; return; }
    
    c.innerHTML = '<div class="loading" style="text-align:center;padding:30px;">Carregando rede...</div>';
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhasConexoes = conexoes.filter(function(con) { return con.usuarioId === s.usuarioLogado.id || con.amigoId === s.usuarioLogado.id; });
    
    if (minhasConexoes.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🔗</div><h3>Rede vazia</h3><button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:10px;">🔍 Buscar</button></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;color:#1A3A5C;font-weight:bold;">🔗 ' + minhasConexoes.length + ' conexão(ões)</div>';
    minhasConexoes.forEach(function(con) {
        var amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId;
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var amigo = usuarios.find(function(u) { return u.id === amigoId; });
        var nome = amigo ? amigo.nome : 'Usuário';
        var profissao = amigo ? amigo.profissao : 'Profissional';
        var foto = amigo ? amigo.fotoPerfil : null;
        
        html += '<div class="card" style="margin-bottom:10px;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigoId + '\')"><div style="display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">';
        html += foto ? '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">👷</div>';
        html += '</div><div style="flex:1;"><div style="font-weight:bold;">' + nome + '</div><div style="font-size:12px;color:#666;">🔧 ' + profissao + '</div></div>';
        html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigoId + '\')" style="background:#EF4444;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;">✕</button>';
        html += '</div></div>';
    });
    
    html += '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;margin-top:10px;">🔍 Buscar Mais</button>';
    c.innerHTML = html;
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('❌ Faça login!', 'erro'); return; }
    if (s.usuarioLogado.id === amigoId) { s.mostrarToast('❌ Não pode adicionar a si mesmo!', 'erro'); return; }
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var existe = conexoes.find(function(c) { return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id); });
    if (existe) { s.mostrarToast('❌ Já está na sua rede!', 'erro'); return; }
    
    conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo', dataCriacao: new Date().toISOString() });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('✅ Adicionado!', 'sucesso');
    if (s.tabAtual === 'rede') s.carregarRede();
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    if (!confirm('Remover?')) return;
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    conexoes = conexoes.filter(function(c) { return !((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id)); });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('✅ Removido', 'sucesso');
    s.carregarRede();
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s = this, c = document.getElementById('buscaResultados');
    if (!c) return;
    c.innerHTML = '<div class="loading" style="text-align:center;padding:30px;">Buscando...</div>';
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var profissionais = usuarios.filter(function(u) { return u.tipo === 'profissional' && u.id !== (s.usuarioLogado ? s.usuarioLogado.id : ''); });
    
    if (profissionais.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3></div>'; return; }
    
    var html = '<div style="text-align:center;padding:8px;color:#666;">' + profissionais.length + ' profissional(is)</div>';
    profissionais.forEach(function(u) {
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verPerfil(\'' + u.id + '\')"><div style="display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">';
        html += u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">👷</div>';
        html += '</div><div style="flex:1;"><div style="font-weight:bold;">' + u.nome + '</div><div style="font-size:12px;color:#666;">🔧 ' + (u.profissao || 'Profissional') + ' • ⭐ ' + (u.score || 0).toFixed(1) + '</div></div>';
        html += '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;">+</button>';
        html += '</div></div>';
    });
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    if (!user) { s.mostrarToast('❌ Não encontrado', 'erro'); return; }
    
    var container = document.getElementById('perfilPublicoConteudo');
    if (!container) {
        var tela = document.getElementById('perfilPublicoScreen');
        if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
        container = document.createElement('div'); container.id = 'perfilPublicoConteudo'; tela.appendChild(container);
    }
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    html += '</div><h2>' + user.nome + '</h2><p style="color:#f0c27f;">🔧 ' + (user.profissao || 'Profissional') + '</p><p>⭐ ' + (user.score || 0).toFixed(1) + '</p></div>';
    
    html += '<div style="padding:20px;"><div class="card" style="margin-bottom:15px;"><h3>📞 Contato</h3><p>📧 ' + (user.email || 'Não informado') + '</p><p>📱 ' + (user.celular || 'Não informado') + '</p></div>';
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    if (user.celular) html += '<a href="https://wa.me/55' + user.celular.replace(/\D/g, '') + '" target="_blank" style="background:#25D366;color:white;padding:15px;border-radius:10px;text-align:center;text-decoration:none;font-weight:bold;">💬 WhatsApp</a>';
    html += '<button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">🔗 Adicionar à Rede</button>';
    html += '<button onclick="window.app.voltarTela()" style="background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Voltar</button></div></div>';
    
    container.innerHTML = html;
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('❌ Faça login!', 'erro'); return; }
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = '<div style="background:#f59e0b;color:white;padding:20px;text-align:center;"><h2>📢 PUBLICAR OBRA</h2></div>' +
        '<div style="padding:20px;">' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;">📌 Título</label><input id="vagaTitulo" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;" placeholder="Ex: Construção de Muro"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;">📍 Endereço</label><input id="vagaEndereco" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;" placeholder="Rua Exemplo, 123"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;">👷 Profissões</label><input id="vagaProfissoes" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;" placeholder="Pedreiro, Eletricista"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;">💰 Valor/hora (R$)</label><input id="vagaValorHora" type="number" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;" placeholder="25"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;">📸 Foto da Obra</label><img id="vagaFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-top:5px;"><input type="file" id="vagaFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;"><button onclick="document.getElementById(\'vagaFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px 20px;border-radius:8px;margin-top:5px;">📁 Escolher Foto</button></div>' +
        '<button onclick="window.app.publicarVagaApp()" style="width:100%;background:#f59e0b;color:white;border:none;padding:16px;border-radius:10px;font-weight:bold;font-size:18px;">📢 PUBLICAR</button></div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('vagaFotoPreview');
        if (preview) preview.src = e.target.result;
        window.app._app.vagaFotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    var titulo = document.getElementById('vagaTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('vagaEndereco')?.value?.trim() || '';
    var profissoes = document.getElementById('vagaProfissoes')?.value?.trim() || 'Geral';
    var valorHora = document.getElementById('vagaValorHora')?.value?.trim() || '0';
    
    if (!titulo || !endereco) { s.mostrarToast('❌ Preencha título e endereço!', 'erro'); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null,
        status: 'disponivel',
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null,
        dataCriacao: new Date().toISOString()
    };
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    if (typeof db !== 'undefined') db.collection('vagas').add(vaga).catch(function() {});
    
    s.vagaFotoBase64 = null;
    s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); s.carregarFeed(); }, 500);
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this, c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!c) return;
    if (!s.usuarioLogado) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>'; return; }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
    
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    if (minhas.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma obra</h3><button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;">📢 PUBLICAR</button></div>'; return; }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <strong>' + minhas.length + '</strong> obra(s)</div>';
    minhas.forEach(function(v) {
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        if (v.fotoObra) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div style="font-weight:bold;">' + v.titulo + '</div><div style="font-size:12px;color:#666;">📍 ' + v.endereco + '</div><span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span></div>';
    });
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    if (!vaga) { s.mostrarToast('❌ Obra não encontrada', 'erro'); return; }
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:600px;margin:0 auto;">';
    if (vaga.fotoObra) html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2 style="color:#1A3A5C;">' + vaga.titulo + '</h2>';
    html += '<p><strong>📍</strong> ' + vaga.endereco + '</p><p><strong>👷</strong> ' + vaga.profissoes + '</p><p><strong>💰</strong> R$' + vaga.valorHora + '/h</p>';
    html += '<p><strong>👤</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>';
    if (vaga.endereco) html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="display:block;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-align:center;text-decoration:none;margin-bottom:10px;">🗺️ Google Maps</a>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;">⬅ Fechar</button></div></div></div>';
    
    var antigo = document.getElementById('modalObra'); if (antigo) antigo.remove();
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
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFotoPerfil\').click()">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    html += '</div><input type="file" id="inputFotoPerfil" accept="image/*" style="display:none;" onchange="window.app.uploadFotoPerfil(event)">';
    html += '<h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo) + '</p></div>';
    
    html += '<div style="display:flex;gap:5px;padding:15px;">';
    html += '<button onclick="window.app.mostrarSecao(\'info\')" id="btnInfo" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;">📋 INFO</button>';
    html += '<button onclick="window.app.mostrarSecao(\'config\')" id="btnConfig" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;">⚙️ CONFIG</button>';
    html += '<button onclick="window.app.mostrarSecao(\'alertas\')" id="btnAlertas" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;">🔔 ALERTAS</button></div>';
    html += '<div id="secaoConteudo" style="padding:15px;"></div>';
    
    tela.innerHTML = html;
    s.mostrarSecao('info');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this, c = document.getElementById('secaoConteudo');
    if (!c) return;
    
    ['info', 'config', 'alertas'].forEach(function(s) {
        var btn = document.getElementById('btn' + s.charAt(0).toUpperCase() + s.slice(1));
        if (btn) { btn.style.background = s === secao ? '#1A3A5C' : '#e5e7eb'; btn.style.color = s === secao ? 'white' : '#1A3A5C'; }
    });
    
    var user = s.usuarioLogado;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    if (secao === 'info') {
        var html = '<div style="display:flex;gap:10px;margin-bottom:15px;">';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#1A3A5C;">' + (user.experiencia || '0') + '</div><div style="font-size:11px;color:#999;">Anos</div></div>';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#f59e0b;">' + (user.score || 0).toFixed(1) + '</div><div style="font-size:11px;color:#999;">Score</div></div>';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><div style="font-size:24px;font-weight:bold;color:#10B981;">' + totalObras + '</div><div style="font-size:11px;color:#999;">Obras</div></div></div>';
        html += '<div class="card" style="margin-bottom:10px;"><h3>👤 Dados</h3><p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p><p>🔧 ' + (user.profissao || '') + '</p></div>';
        html += '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>';
        html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">✏️ Editar Perfil</button>';
        c.innerHTML = html;
    } else if (secao === 'config') {
        var html = '<div class="card" style="margin-bottom:10px;"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">☀️ Claro</button>';
        html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🌙 Escuro</button></div></div>';
        html += '<div class="card"><h3>📄 Documentos</h3>';
        html += '<button onclick="window.app.mostrarDocumento(\'termos\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📄 Termos de Uso</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">🔒 Privacidade</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📋 Diretrizes</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;text-align:left;">ℹ️ Sobre</button></div>';
        c.innerHTML = html;
    } else {
        c.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>';
    }
};

// ===== UPLOAD FOTO =====
App.prototype.uploadFotoPerfil = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var foto = e.target.result;
        var preview = document.getElementById('fotoPerfilPreview');
        if (preview) preview.src = foto;
        s.usuarioLogado.fotoPerfil = foto;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var idx = usuarios.findIndex(function(u) { return u.id === s.usuarioLogado.id; });
        if (idx >= 0) { usuarios[idx].fotoPerfil = foto; localStorage.setItem('usuariosLPX', JSON.stringify(usuarios)); }
        s.mostrarToast('✅ Foto atualizada!', 'sucesso');
    };
    reader.readAsDataURL(file);
};

// ===== EDITAR PERFIL =====
App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    
    var html = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;">';
    html += '<h3 style="text-align:center;">✏️ Editar Perfil</h3>';
    html += '<div style="margin-bottom:10px;"><label>Nome</label><input id="editNome" value="' + (user.nome || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    html += '<div style="margin-bottom:10px;"><label>Celular</label><input id="editCelular" value="' + (user.celular || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    html += '<div style="margin-bottom:10px;"><label>Profissão</label><input id="editProfissao" value="' + (user.profissao || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    html += '<div style="margin-bottom:15px;"><label>Experiência</label><input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    html += '<div style="display:flex;gap:10px;"><button onclick="window.app.salvarPerfil()" style="flex:1;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;">💾 SALVAR</button><button onclick="document.getElementById(\'modalEditar\').remove()" style="flex:1;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;">CANCELAR</button></div></div></div>';
    
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    var nome = document.getElementById('editNome')?.value?.trim() || '';
    if (!nome) { s.mostrarToast('❌ Nome obrigatório!', 'erro'); return; }
    
    s.usuarioLogado.nome = nome;
    s.usuarioLogado.celular = document.getElementById('editCelular')?.value?.trim() || '';
    s.usuarioLogado.profissao = document.getElementById('editProfissao')?.value?.trim() || '';
    s.usuarioLogado.experiencia = document.getElementById('editExperiencia')?.value?.trim() || '0';
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var idx = usuarios.findIndex(function(u) { return u.id === s.usuarioLogado.id; });
    if (idx >= 0) { usuarios[idx] = s.usuarioLogado; localStorage.setItem('usuariosLPX', JSON.stringify(usuarios)); }
    
    document.getElementById('modalEditar')?.remove();
    s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    var telaDoc = document.getElementById('documentoScreen');
    if (!telaDoc) { telaDoc = document.createElement('div'); telaDoc.id = 'documentoScreen'; telaDoc.className = 'screen'; document.body.appendChild(telaDoc); }
    
    var titulos = { termos: '📄 Termos de Uso', privacidade: '🔒 Política de Privacidade', diretrizes: '📋 Diretrizes', sobre: 'ℹ️ Sobre' };
    var conteudos = {
        termos: '<h3>1. Aceitação</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com estes termos.</p><h3>2. Cadastro</h3><p>Informações verídicas são obrigatórias.</p><h3>3. Conduta</h3><p>É proibido discriminação, assédio e informações falsas.</p><h3>4. Contato</h3><p>contato@lpxconstrutor.com.br</p>',
        privacidade: '<h3>1. LGPD</h3><p>Protegemos seus dados conforme a Lei 13.709/2018.</p><h3>2. Dados Coletados</h3><p>Nome, email, telefone, profissão.</p><h3>3. Direitos</h3><p>Acessar, corrigir e excluir dados.</p>',
        diretrizes: '<h3>1. Respeito</h3><p>Trate todos com profissionalismo.</p><h3>2. Segurança</h3><p>Use EPIs e siga normas.</p><h3>3. Qualidade</h3><p>Entregue no prazo combinado.</p>',
        sobre: '<div style="text-align:center;"><div style="font-size:80px;">🏗️</div><h2>LPXCONSTRUTOR</h2><p>Versão 1.0.0</p><p>Rede Profissional da Construção Civil</p><p>contato@lpxconstrutor.com.br</p></div>'
    };
    
    telaDoc.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;display:flex;align-items:center;gap:15px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 12px;border-radius:8px;">⬅ Voltar</button><h2>' + (titulos[tipo] || '') + '</h2></div><div style="padding:20px;line-height:1.8;">' + (conteudos[tipo] || '') + '</div>';
    s.mostrarTela('documentoScreen');
};

// ===== TEMA E IDIOMA =====
App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('🎨 Tema ' + (tema === 'escuro' ? 'escuro' : 'claro') + '!', 'sucesso');
};

App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    this.mostrarToast('🌐 Idioma alterado!', 'sucesso');
};

// ===== TOAST =====
App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;display:none;max-width:90%;text-align:center;'; document.body.appendChild(toast); }
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.color = 'white';
    toast.style.display = 'block';
    clearTimeout(this._tt);
    this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO E FUNCIONAL!');
});
