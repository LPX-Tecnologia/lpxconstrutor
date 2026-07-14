// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO E INTEGRADO =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

// Funções globais que o HTML chama via onclick
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

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR - Integrado');
    window.app._app = s;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    // Remover splash antigo
    var splashAntigo = document.getElementById('splashScreen');
    if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    
    // Splash screen
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    // Firebase Auth - listener
    if (typeof auth !== 'undefined') {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log('🔥 Firebase Auth: logado como', user.email);
                databaseService.buscarUsuario(user.uid).then(function(userData) {
                    if (userData) {
                        s.usuarioLogado = userData;
                        localStorage.setItem('usuarioLPX', JSON.stringify(userData));
                        s.atualizarUI();
                        if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') {
                            s.mostrarTela('homeScreen');
                        }
                    }
                }).catch(function() {
                    // Fallback localStorage
                    var salvo = localStorage.getItem('usuarioLPX');
                    if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
                });
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.mostrarTela('loginScreen');
            }
            // Esconder splash
            setTimeout(function() {
                splash.style.opacity = '0';
                setTimeout(function() {
                    if (splash.parentNode) splash.parentNode.removeChild(splash);
                }, 500);
            }, 1500);
        });
    } else {
        // Sem Firebase - usar localStorage
        var salvo = localStorage.getItem('usuarioLPX');
        if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
        
        setTimeout(function() {
            splash.style.opacity = '0';
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
                if (s.usuarioLogado) { s.mostrarTela('homeScreen'); }
                else { s.mostrarTela('loginScreen'); }
            }, 500);
        }, 1500);
    }
};

App.prototype.atualizarUI = function() {
    var user = this.usuarioLogado;
    if (!user) return;
    var saudacao = document.getElementById('saudacao');
    if (saudacao) {
        var h = new Date().getHours();
        var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
        saudacao.textContent = '👋 ' + sd + ', ' + (user.nome || 'Usuário') + '!';
    }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Tela:', id);
    
    var splash = document.getElementById('splashScreen');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    
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
    
    // Bottom nav
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var mostrar = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen','publicarVagaScreen'];
        nav.style.display = mostrar.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen' && s.usuarioSelecionado) s.carregarMensagens();
};

App.prototype.voltarTela = function() {
    var splash = document.getElementById('splashScreen');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    
    if (this.historicoTelas.length > 0) {
        var ant = this.historicoTelas.pop();
        this.telaAtual = null;
        this.mostrarTela(ant);
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = (document.getElementById('loginEmail') || {}).value || '';
    var senha = (document.getElementById('loginSenha') || {}).value || '';
    
    if (!email || !senha) { s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    
    s.mostrarToast('Entrando...', 'info');
    
    if (typeof authService !== 'undefined') {
        authService.login(email, senha).then(function(r) {
            if (r.sucesso) {
                s.usuarioLogado = r.usuario;
                localStorage.setItem('usuarioLPX', JSON.stringify(r.usuario));
                s.historicoTelas = [];
                s.mostrarToast('✅ Bem-vindo, ' + r.usuario.nome + '!', 'sucesso');
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ ' + (r.erro || 'Erro ao fazer login'), 'erro');
            }
        }).catch(function() {
            s.mostrarToast('❌ Erro de conexão', 'erro');
        });
    } else {
        // Login local
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var encontrado = usuarios.find(function(u) { return u.email.toLowerCase() === email.toLowerCase() && u.senha === senha; });
        if (encontrado) {
            s.usuarioLogado = encontrado;
            localStorage.setItem('usuarioLPX', JSON.stringify(encontrado));
            s.historicoTelas = [];
            s.mostrarToast('✅ Bem-vindo, ' + encontrado.nome + '!', 'sucesso');
            s.mostrarTela('homeScreen');
        } else {
            s.mostrarToast('❌ Email ou senha incorretos!', 'erro');
        }
    }
};

App.prototype.cadastrar = function() {
    var s = this;
    var dados = {
        nome: (document.getElementById('cadNome') || {}).value || '',
        email: (document.getElementById('cadEmail') || {}).value || '',
        senha: (document.getElementById('cadSenha') || {}).value || '',
        tipo: (document.getElementById('cadTipo') || {}).value || 'profissional',
        celular: (document.getElementById('cadCelular') || {}).value || '',
        profissao: (document.getElementById('cadProfissao') || {}).value || '',
        experiencia: (document.getElementById('cadExperiencia') || {}).value || '0',
        cpf: ((document.getElementById('cadCPF') || {}).value || '').replace(/\D/g, ''),
        habilidades: (document.getElementById('cadHabilidades') || {}).value || ''
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('❌ Preencha todos os campos obrigatórios!', 'erro'); return;
    }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    if (typeof authService !== 'undefined') {
        authService.cadastrar(dados).then(function(r) {
            if (r.sucesso) {
                s.usuarioLogado = r.usuario;
                localStorage.setItem('usuarioLPX', JSON.stringify(r.usuario));
                s.historicoTelas = [];
                s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ ' + (r.erro || 'Erro ao cadastrar'), 'erro');
            }
        });
    } else {
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        if (usuarios.find(function(u) { return u.email.toLowerCase() === dados.email.toLowerCase(); })) {
            s.mostrarToast('❌ Email já cadastrado!', 'erro'); return;
        }
        dados.id = 'user_' + Date.now();
        dados.score = 0;
        dados.fotoPerfil = null;
        usuarios.push(dados);
        localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
        s.usuarioLogado = dados;
        localStorage.setItem('usuarioLPX', JSON.stringify(dados));
        s.historicoTelas = [];
        s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
        s.mostrarTela('homeScreen');
    }
};

App.prototype.sair = function() {
    if (typeof authService !== 'undefined') authService.logout();
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    this.historicoTelas = [];
    this.mostrarTela('loginScreen');
    this.mostrarToast('👋 Até logo!', 'sucesso');
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
    html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    }
    html += '</div>';
    html += '<div style="flex:1;"><span style="font-size:15px;" id="saudacao">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div>';
    html += '<span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span>';
    html += '</div>';
    
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;">';
    html += '<button id="tabFeed" onclick="window.app.mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>';
    html += '<button id="tabRede" onclick="window.app.mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>';
    html += '</div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div>';
    html += '<div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    if (user.tipo === 'empreiteiro') {
        html += '<button onclick="window.app.abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
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
    
    c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando obras...</div>';
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarVagas().then(function(vagas) {
            s.renderizarFeed(c, vagas);
        }).catch(function() {
            var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
            s.renderizarFeed(c, vagasLocal);
        });
    } else {
        var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        s.renderizarFeed(c, vagasLocal);
    }
};

App.prototype.renderizarFeed = function(c, vagas) {
    var s = this;
    
    if (!vagas || vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>';
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
            html += '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button>';
            html += '</div>';
        }
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">';
        html += '<div style="font-weight:bold;font-size:16px;">' + (v.titulo || 'Sem título') + '</div>';
        html += '<div style="color:#666;font-size:13px;">📍 ' + (v.endereco || '') + '</div>';
        html += '<div style="margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span>';
        html += '</div></div></div>';
    }
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid, event) {
    if (event) event.stopPropagation();
    if (!confirm('Apagar esta obra?')) return;
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).delete().then(function() {
            window.app._app.mostrarToast('Obra apagada!', 'sucesso');
            window.app._app.carregarFeed();
        }).catch(function() {
            window.app._app.apagarObraLocal(oid);
        });
    } else {
        this.apagarObraLocal(oid);
    }
};

App.prototype.apagarObraLocal = function(oid) {
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var novas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id !== oid) novas.push(vagas[i]);
    }
    localStorage.setItem('vagasLPX', JSON.stringify(novas));
    this.mostrarToast('Obra apagada!', 'sucesso');
    this.carregarFeed();
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this;
    var c = document.getElementById('redeContainer');
    if (!c) return;
    
    if (!s.usuarioLogado) {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Faça login</h3></div>';
        return;
    }
    
    c.innerHTML = '<div style="text-align:center;padding:30px;">🔗 Carregando rede...</div>';
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarConexoes(s.usuarioLogado.id).then(function(conexoes) {
            s.renderizarRede(c, conexoes);
        }).catch(function() {
            var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
            var minhas = [];
            for (var i = 0; i < conexoesLocal.length; i++) {
                if (conexoesLocal[i].usuarioId === s.usuarioLogado.id || conexoesLocal[i].amigoId === s.usuarioLogado.id) {
                    minhas.push(conexoesLocal[i]);
                }
            }
            s.renderizarRede(c, minhas);
        });
    } else {
        var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
        var minhas = [];
        for (var i = 0; i < conexoesLocal.length; i++) {
            if (conexoesLocal[i].usuarioId === s.usuarioLogado.id || conexoesLocal[i].amigoId === s.usuarioLogado.id) {
                minhas.push(conexoesLocal[i]);
            }
        }
        s.renderizarRede(c, minhas);
    }
};

App.prototype.renderizarRede = function(c, conexoes) {
    var s = this;
    
    if (!conexoes || conexoes.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🔗</div><h3>Sua rede está vazia</h3>' +
            '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar Profissionais</button></div>';
        return;
    }
    
    // Buscar dados de cada amigo
    var html = '<div style="text-align:center;padding:10px;">🔗 ' + conexoes.length + ' conexão(ões)</div>';
    var processados = 0;
    
    for (var i = 0; i < conexoes.length; i++) {
        var con = conexoes[i];
        var amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId;
        
        databaseService.buscarUsuario(amigoId).then(function(amigo) {
            processados++;
            if (amigo) {
                html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
                html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">';
                html += amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>';
                html += '</div>';
                html += '<div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')"><strong>' + (amigo.nome || 'Usuário') + '</strong><br><small>' + (amigo.profissao || 'Profissional') + '</small></div>';
                html += '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button>';
                html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigo.id + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;font-size:18px;">✕</button>';
                html += '</div>';
            }
            if (processados >= conexoes.length) {
                c.innerHTML = html + '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>';
            }
        }).catch(function() {
            processados++;
            if (processados >= conexoes.length) {
                c.innerHTML = html + '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;margin-top:10px;">🔍 Buscar Mais</button>';
            }
        });
    }
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) return;
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').add({
            usuarioId: s.usuarioLogado.id,
            amigoId: amigoId,
            status: 'ativo',
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            s.mostrarToast('✅ Adicionado à rede!', 'sucesso');
            s.carregarRede();
        }).catch(function() {
            s.mostrarToast('❌ Erro ao adicionar', 'erro');
        });
    } else {
        var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
        var existe = conexoes.find(function(c) {
            return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id);
        });
        if (existe) { s.mostrarToast('Já está na rede!', 'erro'); return; }
        conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' });
        localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
        s.mostrarToast('✅ Adicionado!', 'sucesso');
        s.carregarRede();
    }
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    if (!confirm('Remover esta conexão?')) return;
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if ((d.usuarioId === s.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === s.usuarioLogado.id)) {
                    db.collection('conexoes').doc(doc.id).delete();
                }
            });
        });
    }
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var novas = [];
    for (var i = 0; i < conexoes.length; i++) {
        var c = conexoes[i];
        if (!((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id))) {
            novas.push(c);
        }
    }
    localStorage.setItem('conexoesLPX', JSON.stringify(novas));
    s.mostrarToast('Removido', 'sucesso');
    s.carregarRede();
};

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) {
    var s = this;
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarUsuario(uid).then(function(user) {
            if (user) {
                s.usuarioSelecionado = user;
                s.abrirChat(user);
            }
        });
    } else {
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var user = usuarios.find(function(u) { return u.id === uid; });
        if (user) {
            s.usuarioSelecionado = user;
            s.abrirChat(user);
        }
    }
};

App.prototype.abrirChat = function(user) {
    var s = this;
    
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<button onclick="window.app.voltarTela()" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
        '<strong>💬 ' + user.nome + '</strong></div>' +
        '<div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div>' +
        '<div style="padding:10px;background:white;display:flex;gap:10px;">' +
        '<input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;">' +
        '<button onclick="window.app.enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>';
    
    s.mostrarTela('chatScreen');
    s.carregarMensagens();
};

App.prototype.carregarMensagens = function() {
    var s = this;
    var c = document.getElementById('chatMensagens');
    if (!c || !s.usuarioSelecionado) return;
    
    if (typeof chatService !== 'undefined') {
        chatService.escutarMensagens(s.usuarioLogado.id, s.usuarioSelecionado.id, function(mensagens) {
            if (mensagens.length === 0) {
                c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>';
                return;
            }
            var html = '';
            for (var i = 0; i < mensagens.length; i++) {
                var m = mensagens[i].data;
                var ehMeu = m.remetenteId === s.usuarioLogado.id;
                html += '<div style="display:flex;justify-content:' + (ehMeu ? 'flex-end' : 'flex-start') + ';margin-bottom:10px;">';
                html += '<div style="max-width:70%;padding:10px 15px;border-radius:15px;' + (ehMeu ? 'background:#1A3A5C;color:white;' : 'background:white;') + '">';
                html += m.conteudo + '<div style="font-size:10px;opacity:0.7;">' + (m.dataEnvio ? new Date(m.dataEnvio.toDate()).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) : '') + '</div>';
                html += '</div></div>';
            }
            c.innerHTML = html;
            c.scrollTop = c.scrollHeight;
        });
    } else {
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
    }
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioSelecionado) return;
    
    var texto = input.value.trim();
    if (!texto) return;
    
    if (typeof chatService !== 'undefined') {
        chatService.enviarMensagem(s.usuarioLogado.id, s.usuarioSelecionado.id, texto).then(function() {
            input.value = '';
        });
    } else {
        var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        mensagens.push({
            id: 'msg_' + Date.now(),
            remetenteId: s.usuarioLogado.id,
            destinatarioId: s.usuarioSelecionado.id,
            conteudo: texto,
            data: new Date().toISOString()
        });
        localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
        input.value = '';
        s.carregarMensagens();
    }
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    c.innerHTML = '<div style="text-align:center;padding:30px;">🔍 Buscando...</div>';
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarTodosUsuarios().then(function(todos) {
            var profissionais = [];
            var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
                    profissionais.push(todos[i]);
                }
            }
            s.renderizarBusca(c, profissionais);
        }).catch(function() {
            s.buscarLocal(c);
        });
    } else {
        s.buscarLocal(c);
    }
};

App.prototype.buscarLocal = function(c) {
    var s = this;
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var profissionais = [];
    var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
            profissionais.push(todos[i]);
        }
    }
    s.renderizarBusca(c, profissionais);
};

App.prototype.renderizarBusca = function(c, profissionais) {
    var s = this;
    
    if (!profissionais || profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">👷</div><h3>Nenhum profissional encontrado</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;">👷 ' + profissionais.length + ' profissional(is)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        var score = p.score || 0;
        
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;flex-shrink:0;" onclick="window.app.verPerfil(\'' + p.id + '\')">';
        html += p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        html += '</div>';
        html += '<div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">';
        html += '<div style="font-weight:bold;">' + (p.nome || 'Sem nome') + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:12px;color:#999;">📅 ' + (p.experiencia || '0') + ' anos</div>';
        html += '<div style="color:#f59e0b;">⭐ ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button>';
        html += '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button>';
        html += '</div>';
    }
    
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarUsuario(uid).then(function(user) {
            if (user) s.mostrarPerfilPublico(user);
            else s.mostrarToast('Profissional não encontrado', 'erro');
        });
    } else {
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var user = usuarios.find(function(u) { return u.id === uid; });
        if (user) s.mostrarPerfilPublico(user);
        else s.mostrarToast('Não encontrado', 'erro');
    }
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
        '<button onclick="window.app.iniciarChat(\'' + user.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">💬 Chat</button>' +
        '<button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>';
    
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
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Escolher Foto</button>' +
        '<button onclick="window.app.publicarVagaApp()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR</button>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('pubFotoPreview').src = e.target.result;
        window.app._app.vagaFotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVagaApp = function() {
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
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: parseFloat(valor) || 0,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || '',
        status: 'disponivel',
        usuarioId: s.usuarioLogado.id,
        interessados: [],
        ativa: true
    };
    
    if (typeof databaseService !== 'undefined') {
        databaseService.criarVaga(vaga).then(function(r) {
            if (r.sucesso) {
                s.limparFormularioPublicacao();
                s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
                setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800);
            } else {
                s.mostrarToast('❌ Erro ao publicar', 'erro');
            }
        });
    } else {
        vaga.id = 'vaga_' + Date.now();
        vaga.autorId = s.usuarioLogado.id;
        vaga.autorNome = s.usuarioLogado.nome;
        vaga.autorFoto = s.usuarioLogado.fotoPerfil || null;
        vaga.dataCriacao = new Date().toISOString();
        
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vagas.unshift(vaga);
        localStorage.setItem('vagasLPX', JSON.stringify(vagas));
        
        s.limparFormularioPublicacao();
        s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
        setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800);
    }
};

App.prototype.limparFormularioPublicacao = function() {
    document.getElementById('pubTitulo').value = '';
    document.getElementById('pubEndereco').value = '';
    document.getElementById('pubProfissoes').value = 'Geral';
    document.getElementById('pubValor').value = '';
    document.getElementById('pubDescricao').value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    this.vagaFotoBase64 = null;
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!c || !s.usuarioLogado) return;
    
    if (typeof databaseService !== 'undefined') {
        databaseService.buscarVagas().then(function(vagas) {
            var minhas = vagas.filter(function(v) { return v.usuarioId === s.usuarioLogado.id || v.autorId === s.usuarioLogado.id; });
            s.renderizarMinhasObras(c, minhas);
        });
    } else {
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        var minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
        s.renderizarMinhasObras(c, minhas);
    }
};

App.prototype.renderizarMinhasObras = function(c, minhas) {
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>';
    for (var i = 0; i < minhas.length; i++) {
        var v = minhas[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + (v.titulo || 'Sem título') + '</b><br><small>📍 ' + (v.endereco || '') + '</small><br>';
        html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span></div>';
        html += '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;margin-top:5px;">🗑️ Apagar</button>';
        html += '</div>';
    }
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).get().then(function(doc) {
            if (doc.exists) {
                s.mostrarDetalheObraModal({ id: doc.id, ...doc.data() });
            } else {
                // Buscar local
                var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
                var v = vagas.find(function(x) { return x.id === oid; });
                if (v) s.mostrarDetalheObraModal(v);
            }
        });
    } else {
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        var v = vagas.find(function(x) { return x.id === oid; });
        if (v) s.mostrarDetalheObraModal(v);
    }
};

App.prototype.mostrarDetalheObraModal = function(v) {
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + (v.titulo || 'Sem título') + '</h2>';
    html += '<p>📍 ' + (v.endereco || '') + '</p>';
    html += '<p>👷 ' + (v.profissoes || 'Todas') + '</p>';
    html += '<p>💰 R$' + (v.valorHora || '0') + '/h</p>';
    if (v.descricao) html += '<p>📝 ' + v.descricao + '</p>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button>';
    html += '</div></div></div>';
    
    var antigo = document.getElementById('modalObra');
    if (antigo) antigo.remove();
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
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id || v.usuarioId === user.id; }).length;
    
    tela.innerHTML = 
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') +
        '</div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;">' +
        '<p style="font-size:10px;color:#ccc;">Toque para alterar foto</p>' +
        '<h2>' + (user.nome || 'Usuário') + '</h2>' +
        '<p style="color:#f0c27f;">' + (user.profissao || user.tipo || '') + '</p></div>' +
        
        '<div style="display:flex;gap:5px;padding:15px;">' +
        '<button id="btnInfo" onclick="window.app.mostrarSecao(\'info\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">📋 INFO</button>' +
        '<button id="btnConfig" onclick="window.app.mostrarSecao(\'config\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">⚙️ CONFIG</button>' +
        '<button id="btnAlertas" onclick="window.app.mostrarSecao(\'alertas\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">🔔 ALERTAS</button>' +
        '</div>' +
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
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id || v.usuarioId === user.id; }).length;
    
    if (secao === 'info') {
        c.innerHTML = 
            '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.experiencia || '0') + '</b><br><small>Anos</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.score || 0).toFixed(1) + '</b><br><small>Score</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><b style="color:#10B981;">' + totalObras + '</b><br><small>Obras</small></div></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p><p>🔧 ' + (user.profissao || '') + '</p></div>' +
            '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
            '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
    } else if (secao === 'config') {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><h3>🎨 Tema</h3>' +
            '<button onclick="window.app.selecionarTema(\'claro\')" style="background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">☀️ Claro</button>' +
            '<button onclick="window.app.selecionarTema(\'escuro\')" style="background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;"><h3>🌐 Idioma</h3>' +
            '<button onclick="window.app.selecionarIdioma(\'pt\')" style="background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">🇧🇷 PT</button>' +
            '<button onclick="window.app.selecionarIdioma(\'en\')" style="background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;margin-right:5px;">🇺🇸 EN</button>' +
            '<button onclick="window.app.selecionarIdioma(\'es\')" style="background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🇪🇸 ES</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;"><h3>📄 Documentos</h3>' +
            '<button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button>' +
            '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade</button>' +
            '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;cursor:pointer;">ℹ️ Sobre</button></div>';
    } else {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>';
    }
};

App.prototype.uploadFoto = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var foto = e.target.result;
        var preview = document.getElementById('fotoPerfilPreview');
        if (preview) preview.src = foto;
        
        if (typeof databaseService !== 'undefined') {
            databaseService.atualizarUsuario(s.usuarioLogado.id, { fotoPerfil: foto }).then(function() {
                s.usuarioLogado.fotoPerfil = foto;
                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                s.mostrarToast('✅ Foto atualizada!', 'sucesso');
            });
        } else {
            s.usuarioLogado.fotoPerfil = foto;
            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
            s.mostrarToast('✅ Foto atualizada!', 'sucesso');
        }
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
    html += '<button onclick="window.app.salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button>';
    html += '<button onclick="document.getElementById(\'modalEditar\').remove()" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    var dados = {
        nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome,
        celular: document.getElementById('editCelular')?.value?.trim() || '',
        profissao: document.getElementById('editProfissao')?.value?.trim() || '',
        experiencia: document.getElementById('editExperiencia')?.value?.trim() || '0'
    };
    
    if (!dados.nome) { s.mostrarToast('Nome obrigatório!', 'erro'); return; }
    
    if (typeof databaseService !== 'undefined') {
        databaseService.atualizarUsuario(s.usuarioLogado.id, dados).then(function(r) {
            if (r.sucesso) {
                s.usuarioLogado.nome = dados.nome;
                s.usuarioLogado.celular = dados.celular;
                s.usuarioLogado.profissao = dados.profissao;
                s.usuarioLogado.experiencia = dados.experiencia;
                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                document.getElementById('modalEditar')?.remove();
                s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
                s.carregarMeuPerfil();
            }
        });
    } else {
        s.usuarioLogado.nome = dados.nome;
        s.usuarioLogado.celular = dados.celular;
        s.usuarioLogado.profissao = dados.profissao;
        s.usuarioLogado.experiencia = dados.experiencia;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        document.getElementById('modalEditar')?.remove();
        s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
        s.carregarMeuPerfil();
    }
};

// ===== NOTIFICAÇÕES =====
App.prototype.mostrarNotificacoes = function() {
    var html = '<div id="modalNotificacoes" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    html += '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between;">';
    html += '<h3 style="margin:0;">🔔 Notificações</h3>';
    html += '<button onclick="document.getElementById(\'modalNotificacoes\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button>';
    html += '</div><div style="padding:15px;text-align:center;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div></div></div>';
    
    var antigo = document.getElementById('modalNotificacoes');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var tela = document.getElementById('documentoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    var titulos = { termos: '📄 Termos de Uso', privacidade: '🔒 Privacidade', sobre: 'ℹ️ Sobre', diretrizes: '📋 Diretrizes' };
    var conteudos = {
        termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>',
        privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p>',
        sobre: '<div style="text-align:center;"><img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:80px;"><h3>LPXCONSTRUTOR v1.0.0</h3><p>Rede Profissional da Construção Civil</p></div>',
        diretrizes: '<h3>Diretrizes</h3><p>Respeito mútuo, segurança e qualidade.</p>'
    };
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;display:flex;align-items:center;gap:15px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2 style="margin:0;font-size:18px;">' + (titulos[tipo] || '') + '</h2></div>' +
        '<div style="padding:20px;line-height:1.8;">' + (conteudos[tipo] || '') + '</div>';
    
    this.mostrarTela('documentoScreen');
};

App.prototype.mostrarInfoVersao = function() { this.mostrarToast('🏗️ LPXConstrutor v1.0.0', 'info'); };
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
App.prototype.candidatarVaga = function(vid) { this.mostrarToast('✅ Candidatura enviada!', 'sucesso'); };
App.prototype.verAvaliacoes = function(uid) { this.mostrarToast('📊 Avaliações em desenvolvimento', 'info'); };
App.prototype.fecharModalSair = function() { var m = document.getElementById('modalSair'); if(m) m.style.display='none'; };
App.prototype.confirmarSair = function() { this.sair(); };
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
    if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR INTEGRADO!');
    console.log('✅ Firebase Auth + Firestore');
    console.log('✅ window.app configurado para onclick');
});
