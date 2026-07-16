// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO FINAL (FIREBASE + LOCAL) =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

// Funções globais
window.app.fazerLogin = function() { if(window.app._app) window.app._app.fazerLogin(); };
window.app.mostrarTela = function(id) { if(window.app._app) window.app._app.mostrarTela(id); };
window.app.voltarTela = function() { if(window.app._app) window.app._app.voltarTela(); };
window.app.cadastrar = function() { if(window.app._app) window.app._app.cadastrar(); };
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
window.app.selecionarTema = function(t) { if(window.app._app) window.app._app.selecionarTema(t); };
window.app.mostrarDocumento = function(t) { if(window.app._app) window.app._app.mostrarDocumento(t); };
window.app.mudarTab = function(t) { if(window.app._app) window.app._app.mudarTab(t); };
window.app.adicionarNaRede = function(uid) { if(window.app._app) window.app._app.adicionarNaRede(uid); };
window.app.removerDaRede = function(uid) { if(window.app._app) window.app._app.removerDaRede(uid); };
window.app.apagarObra = function(oid, event) { if(window.app._app) window.app._app.apagarObra(oid, event); };
window.app.mostrarNotificacoes = function() { if(window.app._app) window.app._app.mostrarNotificacoes(); };
window.app.iniciarChat = function(uid) { if(window.app._app) window.app._app.iniciarChat(uid); };
window.app.enviarMensagem = function() { if(window.app._app) window.app._app.enviarMensagem(); };
window.app.gerarQRCodeCompartilhar = function() { if(window.app._app) window.app._app.gerarQRCodeCompartilhar(); };
window.app.fecharQRCode = function() { var m = document.getElementById('modalQRCodeCompartilhar'); if(m) m.remove(); };
window.app.abrirMapaLocalizacao = function() { if(window.app._app) window.app._app.abrirMapaLocalizacao(); };
window.app.salvarLocalizacao = function() { if(window.app._app) window.app._app.salvarLocalizacao(); };
window.app.atualizarCidades = function(c) { if(window.app._app) window.app._app.atualizarCidades(c); };
window.app.atualizarBairros = function(b) { if(window.app._app) window.app._app.atualizarBairros(b); };
window.app.limparNotificacoes = function() { if(window.app._app) window.app._app.limparNotificacoes(); };

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this._enviandoMensagem = false;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR');
    window.app._app = s;
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    var splashAntigo = document.getElementById('splashScreen'); if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    var salvo = localStorage.getItem('usuarioLPX'); if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
    var splash = document.createElement('div'); splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p>';
    document.body.appendChild(splash);
    
    // Carregar dados do Firebase ao iniciar
    setTimeout(function() { s.carregarDadosFirebase(); }, 500);
    
    setTimeout(function() { splash.style.opacity = '0'; setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); if (s.usuarioLogado) { s.mostrarTela('homeScreen'); } else { s.mostrarTela('loginScreen'); } }, 500); }, 2000);
    
    // Sincronizar a cada 30 segundos
    setInterval(function() { if (s.usuarioLogado) s.carregarDadosFirebase(); }, 30000);
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    var splash = document.getElementById('splashScreen'); if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    var telas = document.querySelectorAll('.screen'); for (var i = 0; i < telas.length; i++) { telas[i].classList.remove('active'); telas[i].style.display = 'none'; }
    var tela = document.getElementById(id); if (!tela) { tela = document.createElement('div'); tela.id = id; tela.className = 'screen'; tela.style.display = 'none'; document.body.appendChild(tela); }
    tela.classList.add('active'); tela.style.display = 'block'; s.telaAtual = id;
    var nav = document.getElementById('bottomNav');
    if (nav) { var semNav = ['loginScreen','cadastroScreen','recuperarSenhaScreen']; nav.style.display = semNav.indexOf(id) >= 0 ? 'none' : 'flex'; }
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen') s.carregarListaConversas();
    if (id === 'configScreen') s.carregarConfigScreen();
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) { this.mostrarTela(this.historicoTelas.pop()); }
    else { this.mostrarTela('homeScreen'); }
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = (document.getElementById('loginEmail') || {}).value || '';
    var senha = (document.getElementById('loginSenha') || {}).value || '';
    if (!email || !senha) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    
    // Tentar Firebase primeiro
    if (typeof firebase !== 'undefined' && firebase.auth) {
        s.mostrarToast('Entrando...', 'info');
        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(userCredential) {
            var user = userCredential.user;
            // Buscar dados no Firestore
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                    if (doc.exists) {
                        var userData = doc.data(); userData.id = doc.id;
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
            s.loginLocal(email, senha);
        });
    } else {
        s.loginLocal(email, senha);
    }
};

App.prototype.loginLocal = function(email, senha) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === email.toLowerCase() && usuarios[i].senha === senha) {
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
        nome: (document.getElementById('cadNome') || {}).value || '',
        email: (document.getElementById('cadEmail') || {}).value || '',
        senha: (document.getElementById('cadSenha') || {}).value || '',
        tipo: (document.getElementById('cadTipo') || {}).value || 'profissional',
        celular: (document.getElementById('cadCelular') || {}).value || '',
        profissao: (document.getElementById('cadProfissao') || {}).value || '',
        experiencia: (document.getElementById('cadExperiencia') || {}).value || '0',
        score: 0, fotoPerfil: null, dataCadastro: new Date().toISOString()
    };
    if (!dados.nome || !dados.email || !dados.senha) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) { if (usuarios[i].email.toLowerCase() === dados.email.toLowerCase()) { s.mostrarToast('Email já cadastrado!', 'erro'); return; } }
    usuarios.push(dados); localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    
    // Salvar no Firebase
    s.salvarUsuarioFirebase(dados);
    
    // Criar conta no Firebase Auth
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha).then(function(userCredential) {
            dados.id = userCredential.user.uid;
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(dados.id).set(dados).catch(function(){});
            }
            localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
        }).catch(function(){});
    }
    
    s.usuarioLogado = dados; localStorage.setItem('usuarioLPX', JSON.stringify(dados)); s.historicoTelas = [];
    s.mostrarToast('Cadastro realizado!', 'sucesso'); setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
};

App.prototype.sair = function() {
    if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut().catch(function(){});
    this.usuarioLogado = null; localStorage.removeItem('usuarioLPX'); this.historicoTelas = [];
    this.mostrarTela('loginScreen'); this.mostrarToast('Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this; if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    var user = s.usuarioLogado, home = document.getElementById('homeScreen'); if (!home) return;
    var h = new Date().getHours(), sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    var html = '<div style="background:#1A3A5C;color:white;padding:12px 15px;display:flex;align-items:center;">';
    html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') + '</div>';
    html += '<div style="flex:1;"><span style="font-size:15px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div><span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span></div>';
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;"><button id="tabFeed" onclick="window.app.mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button><button id="tabRede" onclick="window.app.mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button></div>';
    html += '<div id="feedContainer" style="padding:10px;"></div><div id="redeContainer" style="padding:10px;display:none;"></div>';
    if (user.tipo === 'empreiteiro') html += '<button onclick="window.app.abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
    home.innerHTML = html; s.carregarFeed();
};

App.prototype.mudarTab = function(tab) { this.tabAtual = tab; var bf = document.getElementById('tabFeed'), br = document.getElementById('tabRede'); if (bf) { bf.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; bf.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; } if (br) { br.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; br.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; } var fc = document.getElementById('feedContainer'), rc = document.getElementById('redeContainer'); if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none'; if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none'; if (tab === 'feed') this.carregarFeed(); if (tab === 'rede') this.carregarRede(); };

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando obras...</div>';
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    if (vagas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>'; return; }
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i], destaque = s.usuarioLogado && (v.autorId === s.usuarioLogado.id || v.usuarioId === s.usuarioLogado.id);
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + (destaque ? 'border:3px solid #f59e0b;' : '') + '">';
        if (destaque) html += '<span style="background:#f59e0b;color:white;padding:3px 10px;border-radius:10px;font-size:11px;">⭐ SUA OBRA</span> ';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><div style="font-weight:bold;font-size:16px;">' + (v.titulo || 'Sem título') + '</div><div style="color:#666;font-size:13px;">📍 ' + (v.endereco || '') + '</div><div style="font-size:11px;color:#999;">👤 ' + (v.autorNome || 'Anônimo') + '</div><div style="margin-top:8px;"><span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span> <span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span></div></div></div>';
    }
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid, event) { if (event) event.stopPropagation(); if (!confirm('Apagar?')) return; var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]'), novas = []; for (var i = 0; i < vagas.length; i++) { if (vagas[i].id !== oid) novas.push(vagas[i]); } localStorage.setItem('vagasLPX', JSON.stringify(novas)); if (typeof db !== 'undefined') db.collection('vagas').doc(oid).delete().catch(function(){}); this.mostrarToast('Apagada!', 'sucesso'); this.carregarFeed(); };

// ===== REDE =====
App.prototype.carregarRede = function() { var s = this, c = document.getElementById('redeContainer'); if (!c) return; if (!s.usuarioLogado) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Faça login</h3></div>'; return; } var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'), minhas = []; for (var i = 0; i < conexoes.length; i++) { if (conexoes[i].usuarioId === s.usuarioLogado.id || conexoes[i].amigoId === s.usuarioLogado.id) minhas.push(conexoes[i]); } if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🔗</div><h3>Rede vazia</h3><button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>'; return; } var html = '<div style="text-align:center;padding:10px;">🔗 ' + minhas.length + ' conexão(ões)</div>'; var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); for (var j = 0; j < minhas.length; j++) { var amigoId = minhas[j].usuarioId === s.usuarioLogado.id ? minhas[j].amigoId : minhas[j].usuarioId; var amigo = usuarios.find(function(u) { return u.id === amigoId; }); if (amigo) { html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigoId + '\')">' + (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigoId + '\')"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao || '') + '</small></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigoId + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button><button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigoId + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;font-size:18px;">✕</button></div>'; } } c.innerHTML = html; };
App.prototype.adicionarNaRede = function(amigoId) { var s = this; if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) return; var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'); var existe = conexoes.find(function(c) { return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id); }); if (existe) { s.mostrarToast('Já está na rede!', 'erro'); return; } conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' }); localStorage.setItem('conexoesLPX', JSON.stringify(conexoes)); s.salvarConexaoFirebase({ usuarioId: s.usuarioLogado.id, amigoId: amigoId }); s.mostrarToast('Adicionado!', 'sucesso'); s.carregarRede(); };
App.prototype.removerDaRede = function(amigoId) { var s = this; if (!confirm('Remover?')) return; var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'), novas = []; for (var i = 0; i < conexoes.length; i++) { var c = conexoes[i]; if (!((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id))) novas.push(c); } localStorage.setItem('conexoesLPX', JSON.stringify(novas)); s.mostrarToast('Removido', 'sucesso'); s.carregarRede(); };

// ===== CHAT =====
App.prototype.carregarListaConversas = function() { var s = this; if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; } var tela = document.getElementById('chatScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); } s.usuarioSelecionado = null; var html = '<div style="background:#1A3A5C;color:white;padding:15px;"><h3>💬 Mensagens</h3></div><div style="padding:10px;">'; var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]'); var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); var minhas = []; for (var i = 0; i < conexoes.length; i++) { if (conexoes[i].usuarioId === s.usuarioLogado.id || conexoes[i].amigoId === s.usuarioLogado.id) { var amigoId = conexoes[i].usuarioId === s.usuarioLogado.id ? conexoes[i].amigoId : conexoes[i].usuarioId; var amigo = usuarios.find(function(u) { return u.id === amigoId; }); if (amigo) minhas.push(amigo); } } if (minhas.length === 0) { html += '<div style="text-align:center;padding:40px;"><div style="font-size:50px;">💬</div><h3>Nenhuma conversa</h3><button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">🔍 Buscar</button></div>'; } else { for (var j = 0; j < minhas.length; j++) { var a = minhas[j]; html += '<div onclick="window.app.iniciarChat(\'' + a.id + '\')" style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">' + (a.fotoPerfil ? '<img src="' + a.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>') + '</div><div style="flex:1;"><strong>' + a.nome + '</strong><br><small>' + (a.profissao || '') + '</small></div></div>'; } } html += '</div>'; tela.innerHTML = html; s.mostrarTela('chatScreen'); };

App.prototype.iniciarChat = function(uid) { var s = this; var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); var u = usuarios.find(function(x) { return x.id === uid; }); if (!u) { s.mostrarToast('Usuário não encontrado', 'erro'); return; } s.usuarioSelecionado = u; var tela = document.getElementById('chatScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;"><button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button><strong>💬 ' + u.nome + '</strong></div><div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div><div style="padding:10px;background:white;display:flex;gap:10px;"><input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;"><button onclick="window.app.enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>'; s.mostrarTela('chatScreen'); s.carregarMensagensLocal(); };

App.prototype.carregarMensagensLocal = function() { var s = this, c = document.getElementById('chatMensagens'); if (!c || !s.usuarioSelecionado) return; var msgs = JSON.parse(localStorage.getItem('mensagensLPX') || '[]'), rel = []; for (var i = 0; i < msgs.length; i++) { var m = msgs[i]; if ((m.remetenteId === s.usuarioLogado.id && m.destinatarioId === s.usuarioSelecionado.id) || (m.remetenteId === s.usuarioSelecionado.id && m.destinatarioId === s.usuarioLogado.id)) rel.push(m); } if (rel.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>'; return; } var html = ''; for (var j = 0; j < rel.length; j++) { var msg = rel[j], meu = msg.remetenteId === s.usuarioLogado.id; html += '<div style="display:flex;justify-content:' + (meu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;"><div style="max-width:75%;padding:10px 14px;border-radius:18px;' + (meu ? 'background:#1A3A5C;color:white;' : 'background:white;color:#333;') + '">' + msg.conteudo + '</div></div>'; } c.innerHTML = html; c.scrollTop = c.scrollHeight; };

App.prototype.enviarMensagem = function() { var s = this, inp = document.getElementById('chatInput'); if (!inp || !s.usuarioSelecionado) return; var txt = inp.value.trim(); if (!txt) return; if (s._enviandoMensagem) return; s._enviandoMensagem = true; var msg = { id: 'msg_' + Date.now(), remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id, conteudo: txt, lida: false, dataEnvio: new Date().toISOString() }; var msgs = JSON.parse(localStorage.getItem('mensagensLPX') || '[]'); msgs.push(msg); localStorage.setItem('mensagensLPX', JSON.stringify(msgs)); s.salvarMensagemFirebase(msg); inp.value = ''; s._enviandoMensagem = false; s.carregarMensagensLocal(); s.mostrarToast('Enviado!', 'sucesso'); };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() { var s = this, c = document.getElementById('buscaResultados'); if (!c) return; c.innerHTML = '<div style="text-align:center;padding:30px;">🔍 Buscando...</div>'; var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'); var profissionais = [], meuId = s.usuarioLogado ? s.usuarioLogado.id : ''; for (var i = 0; i < todos.length; i++) { if (todos[i].id !== meuId) profissionais.push(todos[i]); } if (profissionais.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhum profissional</h3><p>Total: ' + todos.length + ' usuários</p></div>'; return; } var html = '<div style="text-align:center;padding:10px;">👷 ' + profissionais.length + ' profissional(is)</div>'; for (var j = 0; j < profissionais.length; j++) { var p = profissionais[j]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">' + (p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')"><div style="font-weight:bold;">' + (p.nome || 'Sem nome') + '</div><div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button><button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button></div>'; } c.innerHTML = html; };

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) { var s = this, usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]'), u = usuarios.find(function(x) { return x.id === uid; }); if (!u) { s.mostrarToast('Não encontrado', 'erro'); return; } var t = document.getElementById('perfilPublicoScreen'); if (!t) { t = document.createElement('div'); t.id = 'perfilPublicoScreen'; t.className = 'screen'; document.body.appendChild(t); } t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') + '</div><h2>' + u.nome + '</h2><p>🔧 ' + (u.profissao || 'Profissional') + '</p></div><div style="padding:20px;"><div style="background:white;border-radius:10px;padding:15px;"><p>📧 ' + (u.email || '') + '</p><p>📱 ' + (u.celular || '') + '</p></div><button onclick="window.app.iniciarChat(\'' + u.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-top:10px;">💬 Chat</button><button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-top:10px;">🔗 Adicionar</button><button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>'; s.mostrarTela('perfilPublicoScreen'); };

// ===== PUBLICAR =====
App.prototype.abrirTelaPublicacao = function() { var s = this; if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; } var t = document.getElementById('publicarVagaScreen'); if (!t) { t = document.createElement('div'); t.id = 'publicarVagaScreen'; t.className = 'screen'; document.body.appendChild(t); } t.innerHTML = '<div style="padding:20px;"><h2 style="text-align:center;">📢 PUBLICAR OBRA</h2><p style="text-align:center;color:#666;">Por: <b>' + s.usuarioLogado.nome + '</b></p><input id="pubTitulo" placeholder="📌 Título *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="pubEndereco" placeholder="📍 Endereço *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="pubProfissoes" placeholder="👷 Profissões" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="pubValor" type="number" placeholder="💰 Valor/hora *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;"><input type="file" id="pubFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;"><button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Foto</button><button onclick="window.app.publicarVagaApp()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">📢 PUBLICAR</button><button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>'; s.vagaFotoBase64 = null; s.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(e) { var f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { var p = document.getElementById('pubFotoPreview'); if (p) { p.src = ev.target.result; p.style.objectFit = 'cover'; } window.app._app.vagaFotoBase64 = ev.target.result; }; r.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var s = this; var t = (document.getElementById('pubTitulo')||{}).value||'', e = (document.getElementById('pubEndereco')||{}).value||'', p = (document.getElementById('pubProfissoes')||{}).value||'Geral', v = (document.getElementById('pubValor')||{}).value||''; if (!t||!e||!v) { s.mostrarToast('Preencha todos!', 'erro'); return; } var vaga = { id: 'vaga_'+Date.now(), titulo: t, endereco: e, profissoes: p, valorHora: parseFloat(v)||0, fotoObra: s.vagaFotoBase64||'', status: 'disponivel', autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome, autorFoto: s.usuarioLogado.fotoPerfil||null, dataCriacao: new Date().toISOString() }; var vagas = JSON.parse(localStorage.getItem('vagasLPX')||'[]'); vagas.unshift(vaga); localStorage.setItem('vagasLPX', JSON.stringify(vagas)); s.salvarVagaFirebase(vaga); document.getElementById('pubTitulo').value = ''; document.getElementById('pubEndereco').value = ''; document.getElementById('pubProfissoes').value = 'Geral'; document.getElementById('pubValor').value = ''; document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; s.vagaFotoBase64 = null; s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso'); setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800); };

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() { var s = this, c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer'); if (!c || !s.usuarioLogado) return; var vagas = JSON.parse(localStorage.getItem('vagasLPX')||'[]'), minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id || v.usuarioId === s.usuarioLogado.id; }); var te = document.getElementById('totalObras'); if (te) te.textContent = minhas.length; if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; } var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>'; for (var i = 0; i < minhas.length; i++) { var v = minhas[i]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' : '') + '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + (v.titulo||'Sem título') + '</b><br><small>📍 ' + (v.endereco||'') + '</small><br><span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + (v.valorHora||'0') + '/h</span></div></div>'; } c.innerHTML = html; };

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) { var vagas = JSON.parse(localStorage.getItem('vagasLPX')||'[]'), v = vagas.find(function(x) { return x.id === oid; }); if (!v) return; var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()"><div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">' : '') + '<div style="padding:20px;"><h2>' + v.titulo + '</h2><p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p><p>💰 R$' + v.valorHora + '/h</p>'; if (v.endereco) html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(v.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Google Maps</a>'; html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button></div></div></div>'; var a = document.getElementById('modalObra'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', html); };

// ===== PERFIL COMPLETO =====
App.prototype.carregarMeuPerfil = function() {
    var s = this; if (!s.usuarioLogado) return;
    var user = s.usuarioLogado, tela = document.getElementById('meuPerfilScreen'); if (!tela) return;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX')||'[]'), totalObras = vagas.filter(function(v) { return v.autorId === user.id || v.usuarioId === user.id; }).length;
    tela.innerHTML = 
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;" id="fotoPerfilPreview">') +
        '</div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;">' +
        '<p style="font-size:10px;color:#ccc;">📷 Toque para alterar foto</p><h2>' + user.nome + '</h2>' +
        '<p style="color:#f0c27f;">' + (user.profissao || user.tipo || '') + ' • ⭐ ' + (user.score || 0).toFixed(1) + '</p></div>' +
        '<div style="display:flex;gap:8px;padding:15px;background:white;">' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;">' + (user.experiencia||'0') + '</div><div style="font-size:11px;color:#666;">Anos</div></div>' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#f59e0b;">' + (user.score||0).toFixed(1) + '</div><div style="font-size:11px;color:#666;">Score</div></div>' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><div style="font-size:22px;font-weight:bold;color:#10B981;">' + totalObras + '</div><div style="font-size:11px;color:#666;">Obras</div></div></div>' +
        '<div style="background:white;margin:0 15px 10px;border-radius:12px;padding:15px;"><h3>👤 Dados</h3>' +
        '<p><i class="fas fa-envelope"></i> ' + (user.email||'') + '</p>' +
        '<p><i class="fas fa-phone"></i> ' + (user.celular||'') + '</p>' +
        '<p><i class="fas fa-briefcase"></i> ' + (user.profissao||'') + '</p>' +
        '<p style="cursor:pointer;" onclick="window.app.abrirMapaLocalizacao()"><i class="fas fa-map-marker-alt" style="color:#F47920;"></i> ' + (user.localizacao ? (user.localizacao.cidade||'') + ', ' + (user.localizacao.estado||'') : 'Adicionar 📍') + '</p></div>' +
        '<div style="padding:0 15px;">' +
        '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
        '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">✏️ Editar Perfil</button>' +
        '<button onclick="window.app.gerarQRCodeCompartilhar()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">📱 Compartilhar</button>' +
        '<button onclick="window.app.mostrarTela(\'configScreen\')" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;">⚙️ Configurações</button></div>';
};

// ===== LOCALIZAÇÃO =====
App.prototype.abrirMapaLocalizacao = function() {
    var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado;
    var h = '<div id="modalLoc" style="position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;">';
    h += '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="document.getElementById(\'modalLoc\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>📍 Minha Localização</h2></div>';
    h += '<div style="padding:20px;">';
    h += '<label style="font-weight:bold;">🗺️ Estado</label><select id="locEstado" onchange="window.app.atualizarCidades()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><option value="">Selecione o estado...</option>' + s.getEstadosHTML(u.localizacao?u.localizacao.estado:'') + '</select>';
    h += '<label style="font-weight:bold;">🏙️ Cidade</label><select id="locCidade" onchange="window.app.atualizarBairros()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><option value="">Selecione a cidade...</option></select>';
    h += '<label style="font-weight:bold;">📍 Bairro</label><select id="locBairro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;"><option value="">Selecione o bairro...</option></select>';
    h += '<button onclick="window.app.salvarLocalizacao()" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">💾 SALVAR LOCALIZAÇÃO</button>';
    h += '</div></div>';
    var a = document.getElementById('modalLoc'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h);
    if (u.localizacao && u.localizacao.estado) { setTimeout(function() { window.app.atualizarCidades(u.localizacao.cidade); }, 300); if (u.localizacao.bairro) { setTimeout(function() { window.app.atualizarBairros(u.localizacao.bairro); }, 600); } }
};

App.prototype.getEstadosHTML = function(sel) { var e = {'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará','DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins'}; var h = ''; for (var s in e) h += '<option value="' + s + '"' + (sel === s ? ' selected' : '') + '>' + e[s] + ' (' + s + ')</option>'; return h; };

App.prototype.getTodasCidades = function() { return {'SP':['São Paulo','Campinas','Santos','Guarulhos','São Bernardo do Campo','Ribeirão Preto','Sorocaba','São José dos Campos'],'RJ':['Rio de Janeiro','Niterói','Duque de Caxias','Nova Iguaçu','Campos dos Goytacazes'],'MG':['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Montes Claros'],'BA':['Salvador','Feira de Santana','Vitória da Conquista','Camaçari'],'PR':['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel'],'RS':['Porto Alegre','Caxias do Sul','Pelotas','Canoas','Santa Maria'],'PE':['Recife','Jaboatão','Olinda','Caruaru'],'CE':['Fortaleza','Caucaia','Juazeiro do Norte','Sobral'],'SC':['Florianópolis','Joinville','Blumenau','São José','Chapecó','Criciúma'],'GO':['Goiânia','Aparecida','Anápolis','Rio Verde'],'DF':['Brasília','Taguatinga','Ceilândia'],'ES':['Vitória','Vila Velha','Serra','Cariacica'],'PA':['Belém','Ananindeua','Santarém'],'MA':['São Luís','Imperatriz'],'MT':['Cuiabá','Várzea Grande','Rondonópolis'],'MS':['Campo Grande','Dourados','Três Lagoas'],'PB':['João Pessoa','Campina Grande'],'RN':['Natal','Mossoró','Parnamirim'],'AL':['Maceió','Arapiraca'],'PI':['Teresina','Parnaíba'],'SE':['Aracaju','Lagarto'],'AM':['Manaus','Parintins'],'RO':['Porto Velho','Ji-Paraná'],'TO':['Palmas','Araguaína'],'AC':['Rio Branco','Cruzeiro do Sul'],'AP':['Macapá','Santana'],'RR':['Boa Vista','Rorainópolis']}; };

App.prototype.getBairrosPorCidade = function(cidade) { var b = {'São Paulo':['Centro','Pinheiros','Vila Mariana','Moema','Itaim Bibi','Tatuapé','Santana'],'Rio de Janeiro':['Copacabana','Ipanema','Leblon','Barra','Botafogo','Tijuca'],'Belo Horizonte':['Savassi','Lourdes','Pampulha','Buritis'],'Florianópolis':['Centro','Lagoa','Ingleses','Canasvieiras'],'Joinville':['Centro','América','Glória','Costa e Silva'],'Curitiba':['Centro','Batel','Água Verde'],'Porto Alegre':['Moinhos','Bela Vista','Centro'],'Salvador':['Barra','Ondina','Pituba'],'Recife':['Boa Viagem','Pina','Graças'],'Fortaleza':['Meireles','Aldeota','Praia de Iracema'],'Brasília':['Asa Sul','Asa Norte','Sudoeste']}; return b[cidade] || ['Centro']; };

App.prototype.atualizarCidades = function(cidadeSel) { var ee = document.getElementById('locEstado'), ce = document.getElementById('locCidade'); if (!ee || !ce) return; var estado = ee.value, cidades = this.getTodasCidades(); ce.innerHTML = '<option value="">Selecione a cidade...</option>'; if (estado && cidades[estado]) { for (var i = 0; i < cidades[estado].length; i++) { ce.innerHTML += '<option value="' + cidades[estado][i] + '"' + (cidadeSel === cidades[estado][i] ? ' selected' : '') + '>' + cidades[estado][i] + '</option>'; } } var be = document.getElementById('locBairro'); if (be) be.innerHTML = '<option value="">Selecione o bairro...</option>'; };

App.prototype.atualizarBairros = function(bairroSel) { var ce = document.getElementById('locCidade'), be = document.getElementById('locBairro'); if (!ce || !be) return; var cidade = ce.value, bairros = this.getBairrosPorCidade(cidade); be.innerHTML = '<option value="">Selecione o bairro...</option>'; if (bairros) { for (var i = 0; i < bairros.length; i++) { be.innerHTML += '<option value="' + bairros[i] + '"' + (bairroSel === bairros[i] ? ' selected' : '') + '>' + bairros[i] + '</option>'; } } };

App.prototype.salvarLocalizacao = function() { var s = this; var estado = document.getElementById('locEstado')?.value || '', cidade = document.getElementById('locCidade')?.value || '', bairro = document.getElementById('locBairro')?.value || ''; if (!estado) { s.mostrarToast('❌ Selecione o estado!', 'erro'); return; } if (!cidade) { s.mostrarToast('❌ Selecione a cidade!', 'erro'); return; } s.usuarioLogado.localizacao = { estado: estado, cidade: cidade, bairro: bairro }; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof db !== 'undefined') { db.collection('usuarios').doc(s.usuarioLogado.id).update({ localizacao: s.usuarioLogado.localizacao }).catch(function(){}); } document.getElementById('modalLoc')?.remove(); s.mostrarToast('✅ Localização salva!', 'sucesso'); s.carregarMeuPerfil(); };

// ===== CONFIGURAÇÕES / QR CODE / UPLOAD / EDITAR =====
App.prototype.carregarConfigScreen = function() { var s = this, t = document.getElementById('configScreen'); if (!t) { t = document.createElement('div'); t.id = 'configScreen'; t.className = 'screen'; document.body.appendChild(t); } t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>⚙️ Configurações</h2></div><div style="padding:15px;"><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;"><button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual==='claro'?'#1A3A5C':'#e5e7eb') + ';background:' + (s.temaAtual==='claro'?'#1A3A5C':'white') + ';color:' + (s.temaAtual==='claro'?'white':'#1A3A5C') + ';cursor:pointer;">☀️ Claro</button><button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual==='escuro'?'#1A3A5C':'#e5e7eb') + ';background:' + (s.temaAtual==='escuro'?'#1A3A5C':'white') + ';color:' + (s.temaAtual==='escuro'?'white':'#1A3A5C') + ';cursor:pointer;">🌙 Escuro</button></div></div><div style="background:white;border-radius:12px;padding:15px;"><h3>📄 Documentos</h3><button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button><button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">🔒 Privacidade</button></div></div>'; s.mostrarTela('configScreen'); };
App.prototype.gerarQRCodeCompartilhar = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado, url = window.location.origin + window.location.pathname + '?perfil=' + u.id; var h = '<div id="modalQR" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)window.app.fecharQRCode()"><div style="background:white;border-radius:20px;padding:30px;text-align:center;max-width:350px;" onclick="event.stopPropagation()"><h3>📱 Compartilhar</h3><div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:10px auto;border:3px solid #F47920;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:35px;">👷</div>') + '</div><p>' + u.nome + '</p><div id="qrcodeContainer" style="display:flex;justify-content:center;margin:15px 0;"></div><button onclick="window.app.fecharQRCode()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:10px;cursor:pointer;">FECHAR</button></div></div>'; var a = document.getElementById('modalQR'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h); setTimeout(function() { var c = document.getElementById('qrcodeContainer'); if (c && typeof QRCode !== 'undefined') { c.innerHTML = ''; new QRCode(c, { text: url, width: 180, height: 180, colorDark: '#1A3A5C', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } }, 300); };
App.prototype.uploadFoto = function(e) { var s = this, f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { var foto = ev.target.result; s.usuarioLogado.fotoPerfil = foto; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: foto }).catch(function(){}); var p = document.getElementById('fotoPerfilPreview'); if (p) p.src = foto; s.mostrarToast('Foto atualizada!', 'sucesso'); }; r.readAsDataURL(f); };
App.prototype.abrirEditarPerfil = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado; var h = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;"><div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;"><h3>✏️ Editar Perfil</h3><input id="editNome" value="' + (u.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editCelular" value="' + (u.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editProfissao" value="' + (u.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editExperiencia" type="number" value="' + (u.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;"><button onclick="window.app.salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button><button onclick="document.getElementById(\'modalEditar\').remove()" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button></div></div>'; document.body.insertAdjacentHTML('beforeend', h); };
App.prototype.salvarPerfil = function() { var s = this; var d = { nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome, celular: document.getElementById('editCelular')?.value?.trim() || '', profissao: document.getElementById('editProfissao')?.value?.trim() || '', experiencia: document.getElementById('editExperiencia')?.value?.trim() || '0' }; if (!d.nome) { s.mostrarToast('Nome obrigatório!', 'erro'); return; } s.usuarioLogado.nome = d.nome; s.usuarioLogado.celular = d.celular; s.usuarioLogado.profissao = d.profissao; s.usuarioLogado.experiencia = d.experiencia; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update(d).catch(function(){}); document.getElementById('modalEditar')?.remove(); s.mostrarToast('Perfil atualizado!', 'sucesso'); s.carregarMeuPerfil(); };
App.prototype.mostrarDocumento = function(tipo) { var t = document.getElementById('documentoScreen'); if (!t) { t = document.createElement('div'); t.id = 'documentoScreen'; t.className = 'screen'; document.body.appendChild(t); } var tt = { termos: '📄 Termos', privacidade: '🔒 Privacidade' }; var cc = { termos: '<h3>Termos</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>', privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p>' }; t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>' + (tt[tipo] || '') + '</h2></div><div style="padding:20px;">' + (cc[tipo] || '') + '</div>'; this.mostrarTela('documentoScreen'); };
App.prototype.selecionarTema = function(tema) { this.temaAtual = tema; localStorage.setItem('tema', tema); if (tema === 'escuro') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme'); this.mostrarToast('Tema alterado!', 'sucesso'); };
App.prototype.mostrarNotificacoes = function() { this.mostrarToast('🔔 Nenhuma notificação', 'info'); };
App.prototype.limparNotificacoes = function() { this.mostrarToast('Notificações limpas!', 'sucesso'); };

// ===== FIREBASE - SINCRONIZAÇÃO =====
App.prototype.salvarUsuarioFirebase = function(dados) { if (typeof db === 'undefined') return; db.collection('usuarios').doc(dados.id).set(dados).then(function() { console.log('✅ Usuário salvo no Firebase'); }).catch(function(err) { console.log('⚠️ Firebase offline:', err.message); }); };
App.prototype.salvarVagaFirebase = function(vaga) { if (typeof db === 'undefined') return; db.collection('vagas').add(vaga).then(function(docRef) { console.log('✅ Vaga salva no Firebase:', docRef.id); var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]'); for (var i = 0; i < vagasLocal.length; i++) { if (vagasLocal[i].id === vaga.id) { vagasLocal[i].firebaseId = docRef.id; break; } } localStorage.setItem('vagasLPX', JSON.stringify(vagasLocal)); }).catch(function(err) { console.log('⚠️ Firebase offline'); }); };
App.prototype.salvarConexaoFirebase = function(conexao) { if (typeof db === 'undefined') return; db.collection('conexoes').add(conexao).then(function() { console.log('✅ Conexão salva no Firebase'); }).catch(function(err) { console.log('⚠️ Firebase offline'); }); };
App.prototype.salvarMensagemFirebase = function(msg) { if (typeof db === 'undefined') return; db.collection('mensagens').add(msg).then(function() { console.log('✅ Mensagem salva no Firebase'); }).catch(function(err) { console.log('⚠️ Firebase offline'); }); };

App.prototype.carregarDadosFirebase = function() {
    if (typeof db === 'undefined') { console.log('⚠️ Firebase não disponível'); return; }
    console.log('🔥 Sincronizando com Firebase...');
    
    // Carregar usuários
    db.collection('usuarios').get().then(function(snap) {
        var usuariosLocal = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        snap.forEach(function(doc) { var u = doc.data(); u.id = doc.id; if (!usuariosLocal.find(function(ul) { return ul.email === u.email; })) { usuariosLocal.push(u); } });
        localStorage.setItem('usuariosLPX', JSON.stringify(usuariosLocal));
        console.log('✅ Usuários sincronizados:', usuariosLocal.length);
    }).catch(function() {});
    
    // Carregar vagas
    db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
        var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; v.firebaseId = doc.id; if (!vagasLocal.find(function(vl) { return vl.firebaseId === doc.id; })) { vagasLocal.push(v); } });
        localStorage.setItem('vagasLPX', JSON.stringify(vagasLocal));
        console.log('✅ Vagas sincronizadas:', vagasLocal.length);
    }).catch(function() {});
    
    // Carregar conexões
    db.collection('conexoes').get().then(function(snap) {
        var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
        snap.forEach(function(doc) { var c = doc.data(); c.id = doc.id; if (!conexoesLocal.find(function(cl) { return (cl.usuarioId === c.usuarioId && cl.amigoId === c.amigoId) || (cl.usuarioId === c.amigoId && cl.amigoId === c.usuarioId); })) { conexoesLocal.push(c); } });
        localStorage.setItem('conexoesLPX', JSON.stringify(conexoesLocal));
        console.log('✅ Conexões sincronizadas:', conexoesLocal.length);
    }).catch(function() {});
    
    // Carregar mensagens
    db.collection('mensagens').orderBy('dataEnvio', 'asc').get().then(function(snap) {
        var msgsLocal = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        snap.forEach(function(doc) { var m = doc.data(); m.id = doc.id; if (!msgsLocal.find(function(ml) { return ml.id === doc.id; })) { msgsLocal.push(m); } });
        localStorage.setItem('mensagensLPX', JSON.stringify(msgsLocal));
        console.log('✅ Mensagens sincronizadas:', msgsLocal.length);
    }).catch(function() {});
};

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:14px 24px;border-radius:12px;z-index:99999;font-weight:bold;display:none;text-align:center;max-width:90%;'; document.body.appendChild(toast); }
    toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1A3A5C'; toast.style.color = 'white'; toast.style.display = 'block';
    clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO!');
    console.log('🔥 Sincronização Firebase ativada');
    console.log('📱 Conectando múltiplos dispositivos');
});
