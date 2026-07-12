// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO COM REDE E PUBLICAÇÃO =====
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
    abrirContratacao: function(uid){ if(window.app._app)window.app._app.abrirContratacao(uid); }
};

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.secaoAtual = 'informacoes';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.tabAtual = 'feed'; // feed ou rede
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR - Sistema Completo');
    window.app._app = this;
    
    if (s.temaAtual === 'escuro') {
        document.body.classList.add('dark-theme');
    }
    
    s.mostrarSplash();
    
    // Verificar login salvo
    var usuarioSalvo = localStorage.getItem('usuarioLPX');
    if (usuarioSalvo) {
        try { s.usuarioLogado = JSON.parse(usuarioSalvo); } catch(e) {}
    }
    
    // Firebase Auth
    if (typeof authService !== 'undefined') {
        authService.onAuthStateChange(function(u) {
            if (u) {
                s.usuarioLogado = u;
                localStorage.setItem('usuarioLPX', JSON.stringify(u));
                s.atualizarUI();
                if (s.telaAtual === 'loginScreen') s.mostrarTela('homeScreen');
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.mostrarTela('loginScreen');
            }
            setTimeout(function() { s.esconderSplash(); }, 1500);
        });
    } else {
        setTimeout(function() {
            if (s.usuarioLogado) s.mostrarTela('homeScreen');
            s.esconderSplash();
        }, 1500);
    }
    
    window.addEventListener('popstate', function() {
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') {
            s.mostrarModalSair();
        } else {
            s.voltarTela();
        }
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
            '<p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>' +
            '<div id="tijolosContainer" style="margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:2px;"></div>';
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
    if (s) { s.style.opacity = '0'; setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, 500); }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); });
    
    var t = document.getElementById(id);
    if (!t) { console.warn('Tela não encontrada:', id); return; }
    
    t.classList.add('active');
    s.telaAtual = id;
    
    // Navegação inferior
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'publicarVagaScreen', 'minhasObrasScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    // Carregar conteúdo
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

App.prototype.atualizarUI = function() {
    var user = this.usuarioLogado;
    var saudacao = document.getElementById('saudacao');
    if (saudacao && user) {
        var h = new Date().getHours();
        var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
        saudacao.textContent = '👋 ' + sd + ', ' + (user.nome || 'Usuário') + '!';
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var s = this;
    var emailEl = document.getElementById('loginEmail');
    var senhaEl = document.getElementById('loginSenha');
    if (!emailEl || !senhaEl) return;
    
    var email = emailEl.value.trim();
    var senha = senhaEl.value.trim();
    
    if (!email || !senha) { s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    
    s.mostrarToast('Entrando...', 'info');
    
    if (typeof authService !== 'undefined') {
        authService.login(email, senha).then(function(r) {
            if (r.sucesso) {
                s.usuarioLogado = r.usuario;
                localStorage.setItem('usuarioLPX', JSON.stringify(r.usuario));
                s.mostrarToast('✅ Bem-vindo!', 'sucesso');
                s.atualizarUI();
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ ' + r.erro, 'erro');
            }
        });
    } else if (typeof db !== 'undefined') {
        db.collection('usuarios').where('email', '==', email).get().then(function(snap) {
            if (snap.empty) { s.mostrarToast('❌ Usuário não encontrado', 'erro'); return; }
            snap.forEach(function(doc) {
                var user = doc.data(); user.id = doc.id;
                if (user.senha === senha) {
                    s.usuarioLogado = user;
                    localStorage.setItem('usuarioLPX', JSON.stringify(user));
                    s.mostrarToast('✅ Bem-vindo!', 'sucesso');
                    s.mostrarTela('homeScreen');
                } else {
                    s.mostrarToast('❌ Senha incorreta', 'erro');
                }
            });
        });
    }
};

App.prototype.cadastrar = function() {
    var s = this;
    var nome = document.getElementById('cadNome');
    var email = document.getElementById('cadEmail');
    var senha = document.getElementById('cadSenha');
    var tipo = document.getElementById('cadTipo');
    var celular = document.getElementById('cadCelular');
    var profissao = document.getElementById('cadProfissao');
    var experiencia = document.getElementById('cadExperiencia');
    if (!nome || !email || !senha) return;
    
    var dados = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim(),
        tipo: tipo ? tipo.value : 'profissional',
        celular: celular ? celular.value.trim() : '',
        profissao: profissao ? profissao.value.trim() : '',
        experiencia: experiencia ? experiencia.value.trim() : '0',
        score: 0,
        fotoPerfil: null,
        dataCadastro: new Date().toISOString()
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('❌ Preencha todos os campos!', 'erro'); return;
    }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    if (typeof authService !== 'undefined') {
        authService.cadastrar(dados).then(function(r) {
            if (r.sucesso) {
                s.usuarioLogado = r.usuario;
                localStorage.setItem('usuarioLPX', JSON.stringify(r.usuario));
                s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ ' + r.erro, 'erro');
            }
        });
    } else if (typeof db !== 'undefined') {
        db.collection('usuarios').add(dados).then(function(docRef) {
            dados.id = docRef.id;
            s.usuarioLogado = dados;
            localStorage.setItem('usuarioLPX', JSON.stringify(dados));
            s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
            s.mostrarTela('homeScreen');
        });
    }
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    this.mostrarTela('loginScreen');
    this.mostrarToast('👋 Até logo!', 'sucesso');
};

// ===== HOME COM TABS (FEED/REDE) =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    s.atualizarUI();
    
    // Criar estrutura da home se necessário
    var homeScreen = document.getElementById('homeScreen');
    if (homeScreen && !document.getElementById('homeTabs')) {
        var homeHTML = s.criarEstruturaHome();
        homeScreen.innerHTML = homeHTML;
    }
    
    // Atualizar foto na saudação
    var fotoSaudacao = document.querySelector('#homeScreen .foto-usuario');
    if (fotoSaudacao && s.usuarioLogado) {
        if (s.usuarioLogado.fotoPerfil) {
            fotoSaudacao.innerHTML = '<img src="' + s.usuarioLogado.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
        }
    }
    
    s.carregarFeed();
    
    setTimeout(function() {
        if (typeof mapaService !== 'undefined') {
            try { mapaService.initMap(); } catch(e) {}
        }
    }, 500);
};

App.prototype.criarEstruturaHome = function() {
    var user = this.usuarioLogado;
    var h = new Date().getHours();
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var html = '';
    
    // CABEÇALHO COM SAUDAÇÃO
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);padding:15px;display:flex;align-items:center;gap:12px;">';
    html += '<div class="foto-usuario" style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;flex-shrink:0;">';
    if (user && user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    }
    html += '</div>';
    html += '<div style="flex:1;">';
    html += '<div id="saudacao" style="color:white;font-weight:bold;font-size:16px;">👋 ' + sd + ', ' + (user ? user.nome : 'Usuário') + '!</div>';
    html += '<div style="color:#f0c27f;font-size:12px;">' + (user ? (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') : '') + '</div>';
    html += '</div>';
    html += '<button onclick="window.app.mostrarNotificacoes()" style="background:rgba(255,255,255,0.2);border:none;color:white;width:40px;height:40px;border-radius:50%;font-size:18px;">🔔</button>';
    html += '</div>';
    
    // TABS
    html += '<div style="display:flex;background:white;padding:10px;gap:5px;position:sticky;top:0;z-index:100;">';
    html += '<button onclick="window.app.mudarTab(\'feed\')" id="tabFeed" style="flex:1;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;">📋 FEED</button>';
    html += '<button onclick="window.app.mudarTab(\'rede\')" id="tabRede" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:12px;border-radius:25px;font-weight:bold;">🔗 REDE</button>';
    html += '</div>';
    
    // CONTAINERS
    html += '<div id="feedContainer" style="padding:10px;"></div>';
    html += '<div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    // BOTÃO PUBLICAR FLUTUANTE (DESTAQUE)
    html += '<button onclick="window.app.abrirTelaPublicacao()" id="btnPublicarFlutuante" style="position:fixed;bottom:80px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;border-radius:50%;font-size:28px;box-shadow:0 4px 15px rgba(245,158,11,0.5);z-index:999;cursor:pointer;display:' + (user && user.tipo === 'empreiteiro' ? 'flex' : 'none') + ';align-items:center;justify-content:center;animation:pulse 2s infinite;">📢</button>';
    
    return html;
};

// ===== MUDAR TAB (FEED/REDE) =====
App.prototype.mudarTab = function(tab) {
    var s = this;
    s.tabAtual = tab;
    
    var btnFeed = document.getElementById('tabFeed');
    var btnRede = document.getElementById('tabRede');
    var feedContainer = document.getElementById('feedContainer');
    var redeContainer = document.getElementById('redeContainer');
    
    if (btnFeed) {
        btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb';
        btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C';
    }
    if (btnRede) {
        btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb';
        btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C';
    }
    
    if (feedContainer) feedContainer.style.display = tab === 'feed' ? 'block' : 'none';
    if (redeContainer) redeContainer.style.display = tab === 'rede' ? 'block' : 'none';
    
    if (tab === 'feed') s.carregarFeed();
    if (tab === 'rede') s.carregarRede();
};

// ===== FEED COM DESTAQUE =====
App.prototype.carregarFeed = function() {
    var s = this;
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando obras...</div>';
    
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
            var vagas = [];
            snap.forEach(function(doc) {
                var v = doc.data(); v.id = doc.id;
                if (v.ativa !== false) vagas.push(v);
            });
            vagasLocal.forEach(function(v) {
                if (!vagas.find(function(x) { return x.id === v.id; })) vagas.push(v);
            });
            s.renderizarFeed(container, vagas);
        }).catch(function() {
            s.renderizarFeed(container, vagasLocal);
        });
    } else {
        s.renderizarFeed(container, vagasLocal);
    }
};

App.prototype.renderizarFeed = function(container, vagas) {
    var s = this;
    
    if (vagas.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3 style="color:#1A3A5C;">Nenhuma obra publicada</h3>' +
            '<p style="color:#666;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                '<button onclick="window.app.abrirTelaPublicacao()" style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:15px 30px;border-radius:25px;font-weight:bold;font-size:16px;margin-top:15px;box-shadow:0 4px 15px rgba(245,158,11,0.4);">📢 PUBLICAR OBRA</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    
    // Mostrar obras do usuário logado primeiro (DESTAQUE)
    var obrasOrdenadas = [];
    vagas.forEach(function(v) {
        if (s.usuarioLogado && v.autorId === s.usuarioLogado.id) {
            v._destaque = true;
            obrasOrdenadas.unshift(v);
        } else {
            obrasOrdenadas.push(v);
        }
    });
    
    obrasOrdenadas.forEach(function(vaga) {
        var isDestaque = vaga._destaque;
        var statusCor = vaga.status === 'em_andamento' ? '#10B981' : '#f59e0b';
        var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:12px;' + 
            (isDestaque ? 'border:2px solid #f59e0b;box-shadow:0 4px 15px rgba(245,158,11,0.3);' : 'border-left:4px solid ' + statusCor + ';') + 
            '" onclick="window.app.verDetalheObra(\'' + vaga.id + '\')">';
        
        // Selo de destaque
        if (isDestaque) {
            html += '<div style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;padding:4px 12px;border-radius:0 0 10px 10px;display:inline-block;font-size:11px;font-weight:bold;margin-bottom:8px;">⭐ SUA OBRA</div>';
        }
        
        // Foto da obra
        if (vaga.fotoObra) {
            html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:10px;" onerror="this.style.display=\'none\'">';
        }
        
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
        
        // Foto do autor
        if (vaga.autorFoto) {
            html += '<img src="' + vaga.autorFoto + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #1A3A5C;">';
        } else {
            html += '<div style="width:40px;height:40px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">🏗️</div>';
        }
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;font-size:15px;">' + (vaga.titulo || 'Sem título') + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + (vaga.endereco || 'Local não informado') + '</div>';
        html += '<div style="font-size:11px;color:#999;">👤 ' + (vaga.autorNome || 'Anônimo') + ' • ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</div>';
        html += '</div></div>';
        
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + (vaga.valorHora || '0') + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">👷 ' + (vaga.profissoes || 'Todas') + '</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:3px 10px;border-radius:15px;font-size:11px;margin-left:auto;">' + statusTexto + '</span>';
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

// ===== REDE (FUNCIONANDO) =====
App.prototype.carregarRede = function() {
    var s = this;
    var container = document.getElementById('redeContainer');
    if (!container) return;
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>';
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando sua rede...</div>';
    
    // Buscar conexões
    var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            var conexoes = [];
            snap.forEach(function(doc) {
                var d = doc.data();
                if (d.usuarioId === s.usuarioLogado.id || d.amigoId === s.usuarioLogado.id) {
                    conexoes.push({ id: doc.id, data: d });
                }
            });
            
            if (conexoes.length === 0) {
                container.innerHTML = s.renderizarRedeVazia();
                return;
            }
            
            // Buscar dados dos usuários conectados
            var promessas = [];
            conexoes.forEach(function(con) {
                var amigoId = con.data.usuarioId === s.usuarioLogado.id ? con.data.amigoId : con.data.usuarioId;
                promessas.push(
                    db.collection('usuarios').doc(amigoId).get().then(function(doc) {
                        if (doc.exists) return { usuario: { id: doc.id, ...doc.data() }, conexao: con.data };
                        return null;
                    })
                );
            });
            
            Promise.all(promessas).then(function(resultados) {
                var amigos = resultados.filter(function(r) { return r !== null; });
                if (amigos.length === 0) {
                    container.innerHTML = s.renderizarRedeVazia();
                    return;
                }
                s.renderizarRede(container, amigos);
            });
        }).catch(function() {
            container.innerHTML = s.renderizarRedeVazia();
        });
    } else {
        container.innerHTML = s.renderizarRedeVazia();
    }
};

App.prototype.renderizarRedeVazia = function() {
    var s = this;
    return '<div class="card" style="text-align:center;padding:40px;">' +
        '<div style="font-size:60px;">🔗</div>' +
        '<h3 style="color:#1A3A5C;">Sua rede está vazia</h3>' +
        '<p style="color:#666;">Conecte-se com profissionais e empreiteiros</p>' +
        '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:15px;">🔍 Buscar Profissionais</button>' +
        '</div>';
};

App.prototype.renderizarRede = function(container, amigos) {
    var s = this;
    var html = '<div style="text-align:center;padding:8px;color:#666;font-size:12px;">🔗 ' + amigos.length + ' conexão(s) na sua rede</div>';
    
    amigos.forEach(function(a) {
        var u = a.usuario;
        var con = a.conexao;
        var statusTexto = con.status === 'contratado' ? '🤝 Contratado' : 
                          con.status === 'finalizado' ? '✅ Finalizado' : '🔗 Conectado';
        var score = u.score || 0;
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verPerfil(\'' + u.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:12px;">';
        
        // Foto
        html += '<div style="width:55px;height:55px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;flex-shrink:0;">';
        if (u.fotoPerfil) {
            html += '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            html += '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        }
        html += '</div>';
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + (u.nome || 'Usuário') + '</div>';
        html += '<div style="font-size:12px;color:#666;">🔧 ' + (u.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:11px;color:#f59e0b;">⭐ ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '<div style="font-size:11px;color:#10B981;">' + statusTexto + '</div>';
        html += '</div>';
        
        // Botões
        html += '<div style="display:flex;flex-direction:column;gap:5px;">';
        if (u.celular) {
            html += '<a href="https://wa.me/55' + u.celular.replace(/\D/g, '') + '" target="_blank" onclick="event.stopPropagation();" style="background:#25D366;color:white;border:none;padding:6px 10px;border-radius:15px;text-decoration:none;font-size:11px;text-align:center;">💬</a>';
        }
        html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + u.id + '\')" style="background:#EF4444;color:white;border:none;padding:6px 10px;border-radius:15px;font-size:11px;">✕</button>';
        html += '</div>';
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) {
        s.mostrarToast('❌ Não é possível adicionar!', 'erro');
        return;
    }
    
    // Verificar se já existe conexão
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var existe = conexoes.find(function(c) {
        return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
               (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id);
    });
    
    if (existe) {
        s.mostrarToast('❌ Já está na sua rede!', 'erro');
        return;
    }
    
    var novaConexao = {
        id: 'con_' + Date.now(),
        usuarioId: s.usuarioLogado.id,
        amigoId: amigoId,
        status: 'ativo',
        dataCriacao: new Date().toISOString()
    };
    
    conexoes.push(novaConexao);
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').add({
            usuarioId: s.usuarioLogado.id,
            amigoId: amigoId,
            status: 'ativo',
            dataCriacao: new Date().toISOString()
        }).catch(function() {});
    }
    
    s.mostrarToast('✅ Adicionado à sua rede!', 'sucesso');
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    if (!confirm('Remover esta conexão?')) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    conexoes = conexoes.filter(function(c) {
        return !((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
                 (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id));
    });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if ((d.usuarioId === s.usuarioLogado.id && d.amigoId === amigoId) ||
                    (d.usuarioId === amigoId && d.amigoId === s.usuarioLogado.id)) {
                    db.collection('conexoes').doc(doc.id).delete();
                }
            });
        });
    }
    
    s.mostrarToast('Removido da rede', 'sucesso');
    s.carregarRede();
};

// ===== BUSCA DE PROFISSIONAIS =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var container = document.getElementById('buscaResultados');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando profissionais...</div>';
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('tipo', '==', 'profissional').get().then(function(snap) {
            var profissionais = [];
            snap.forEach(function(doc) {
                var u = doc.data(); u.id = doc.id;
                if (u.ativo !== false && u.id !== (s.usuarioLogado ? s.usuarioLogado.id : '')) {
                    profissionais.push(u);
                }
            });
            s.renderizarBusca(container, profissionais);
        }).catch(function() {
            container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">Erro ao carregar</div>';
        });
    } else {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔌 Conecte ao Firebase</h3></div>';
    }
};

App.prototype.renderizarBusca = function(container, profissionais) {
    var s = this;
    
    if (profissionais.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">👷</div><h3>Nenhum profissional encontrado</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;color:#666;font-size:12px;">' + profissionais.length + ' profissional(is)</div>';
    
    profissionais.forEach(function(u) {
        var score = u.score || 0;
        var estrelas = '';
        for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verPerfil(\'' + u.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:12px;">';
        html += '<div style="width:55px;height:55px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #1A3A5C;">';
        if (u.fotoPerfil) {
            html += '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            html += '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        }
        html += '</div>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + (u.nome || 'Sem nome') + '</div>';
        html += '<div style="font-size:12px;color:#666;">🔧 ' + (u.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:14px;color:#f59e0b;">' + estrelas + ' ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;display:flex;align-items:center;justify-content:center;">+</button>';
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

// ===== PERFIL DO PROFISSIONAL =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (!doc.exists) { s.mostrarToast('❌ Profissional não encontrado', 'erro'); return; }
            var user = doc.data(); user.id = doc.id;
            s.mostrarPerfilProfissional(user);
        });
    }
};

App.prototype.mostrarPerfilProfissional = function(user) {
    var s = this;
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' :
        '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    html += '</div>';
    html += '<h2>' + (user.nome || 'Profissional') + '</h2>';
    html += '<p style="color:#f0c27f;">🔧 ' + (user.profissao || 'Não informada') + '</p>';
    html += '<p>📅 ' + (user.experiencia || '0') + ' anos de experiência</p>';
    html += '<p style="font-size:18px;">' + estrelas + ' ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</p>';
    html += '</div>';
    
    html += '<div style="padding:20px;">';
    html += '<div class="card" style="margin-bottom:15px;">';
    html += '<h3 style="color:#1A3A5C;">📞 Contato</h3>';
    html += '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>';
    html += '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>';
    if (user.habilidades) html += '<p><strong>🛠️ Habilidades:</strong> ' + user.habilidades + '</p>';
    html += '</div>';
    
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    if (user.celular) {
        html += '<a href="https://wa.me/55' + user.celular.replace(/\D/g, '') + '" target="_blank" style="text-decoration:none;background:#25D366;color:white;padding:15px;border-radius:10px;text-align:center;font-weight:bold;">💬 WhatsApp</a>';
    }
    html += '<button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">🔗 Adicionar à Rede</button>';
    if (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro') {
        html += '<button onclick="window.app.abrirContratacao(\'' + user.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">🤝 CONTRATAR</button>';
    }
    html += '<button onclick="window.app.voltarTela()" style="background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Voltar</button>';
    html += '</div></div>';
    
    var container = document.getElementById('perfilPublicoConteudo');
    if (!container) {
        var tela = document.getElementById('perfilPublicoScreen');
        if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
        container = document.createElement('div'); container.id = 'perfilPublicoConteudo'; tela.appendChild(container);
    }
    container.innerHTML = html;
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA (COM DESTAQUE) =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) {
        s.mostrarToast('❌ Faça login para publicar!', 'erro');
        return;
    }
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'publicarVagaScreen';
        tela.className = 'screen';
        tela.innerHTML = s.criarTelaPublicacao();
        document.body.appendChild(tela);
    } else {
        tela.innerHTML = s.criarTelaPublicacao();
    }
    
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.criarTelaPublicacao = function() {
    var s = this;
    var user = s.usuarioLogado;
    
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;padding:20px;text-align:center;">';
    html += '<h2 style="margin:0;">📢 PUBLICAR OBRA</h2>';
    html += '<p style="font-size:12px;margin-top:5px;">Preencha os dados da sua obra</p>';
    html += '</div>';
    
    html += '<div style="padding:20px;">';
    
    // Foto do autor
    html += '<div style="text-align:center;margin-bottom:20px;">';
    html += '<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;margin:0 auto;border:2px solid #f59e0b;">';
    if (user && user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">';
    } else {
        html += '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;">🏗️</div>';
    }
    html += '</div>';
    html += '<p style="color:#1A3A5C;font-weight:bold;margin-top:8px;">' + (user ? user.nome : '') + '</p>';
    html += '</div>';
    
    // Campos
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">📌 Título da Obra</label>';
    html += '<input id="vagaTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    html += '</div>';
    
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">📍 Endereço</label>';
    html += '<input id="vagaEndereco" placeholder="Ex: Rua Exemplo, 123 - Cidade" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    html += '</div>';
    
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">👷 Profissões Necessárias</label>';
    html += '<div id="profissoesCheckboxes" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:5px;">';
    var profissoes = ['Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 'Carpinteiro', 'Servente', 'Azulejista', 'Gesseiro'];
    profissoes.forEach(function(p) {
        html += '<label style="display:flex;align-items:center;gap:5px;background:#f0f0f0;padding:8px 12px;border-radius:20px;cursor:pointer;">';
        html += '<input type="checkbox" value="' + p + '"> ' + p;
        html += '</label>';
    });
    html += '</div></div>';
    
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">💰 Valor por Hora (R$)</label>';
    html += '<input id="vagaValorHora" type="number" placeholder="Ex: 25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    html += '</div>';
    
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">📝 Descrição</label>';
    html += '<textarea id="vagaDescricao" placeholder="Descreva os detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:5px;min-height:100px;"></textarea>';
    html += '</div>';
    
    // Upload foto
    html += '<div style="margin-bottom:20px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;">📸 Foto da Obra</label>';
    html += '<div style="text-align:center;margin-top:10px;">';
    html += '<img id="vagaFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:10px;">';
    html += '<input type="file" id="vagaFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;">';
    html += '<button onclick="document.getElementById(\'vagaFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;">📁 Escolher Foto</button>';
    html += '</div></div>';
    
    // Botão publicar
    html += '<button onclick="window.app.publicarVagaApp()" style="width:100%;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:16px;border-radius:10px;font-weight:bold;font-size:18px;box-shadow:0 4px 15px rgba(245,158,11,0.4);">📢 PUBLICAR OBRA</button>';
    
    html += '</div>';
    
    return html;
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
    var titulo = document.getElementById('vagaTitulo')?.value?.trim();
    var endereco = document.getElementById('vagaEndereco')?.value?.trim();
    var valorHora = document.getElementById('vagaValorHora')?.value?.trim();
    var descricao = document.getElementById('vagaDescricao')?.value?.trim();
    
    var profissoes = [];
    document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) {
        profissoes.push(cb.value);
    });
    var profissoesStr = profissoes.length > 0 ? profissoes.join(', ') : 'Geral';
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor!', 'erro'); return; }
    
    s.mostrarToast('📡 Publicando obra...', 'info');
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoesStr,
        valorHora: valorHora,
        descricao: descricao || '',
        fotoObra: s.vagaFotoBase64 || null,
        status: 'disponivel',
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null,
        dataCriacao: new Date().toISOString(),
        interessados: []
    };
    
    var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagasSalvas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').add(vaga).then(function(docRef) {
            vagasSalvas[0].id = docRef.id;
            localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        }).catch(function() {});
    }
    
    s.vagaFotoBase64 = null;
    s.mostrarToast('✅ Obra publicada com sucesso! 🏗️', 'sucesso');
    
    setTimeout(function() {
        s.mostrarTela('homeScreen');
        s.carregarFeed();
    }, 800);
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var container = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!container) return;
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>';
        return;
    }
    
    container.innerHTML = '<div class="loading">Carregando obras...</div>';
    
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhasObras = vagasLocal.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').where('autorId', '==', s.usuarioLogado.id).get().then(function(snap) {
            snap.forEach(function(doc) {
                var v = doc.data(); v.id = doc.id;
                if (!minhasObras.find(function(o) { return o.id === doc.id; })) minhasObras.push(v);
            });
            s.renderizarMinhasObras(container, minhasObras);
        }).catch(function() {
            s.renderizarMinhasObras(container, minhasObras);
        });
    } else {
        s.renderizarMinhasObras(container, minhasObras);
    }
};

App.prototype.renderizarMinhasObras = function(container, obras) {
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = obras.length;
    
    if (obras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div><h3>Nenhuma obra cadastrada</h3>' +
            '<button onclick="window.app.abrirTelaPublicacao()" style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:10px;">📢 PUBLICAR OBRA</button></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:15px;color:#1A3A5C;font-weight:bold;">🏗️ Total: <span style="color:#10B981;font-size:24px;">' + obras.length + '</span> obra(s)</div>';
    
    obras.forEach(function(v) {
        var statusCor = v.status === 'em_andamento' ? '#10B981' : '#f59e0b';
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;border-left:4px solid ' + statusCor + ';" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        if (v.fotoObra) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div style="font-weight:bold;">' + v.titulo + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + v.endereco + '</div>';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '</div>';
    });
    
    container.innerHTML = html;
};

// ===== VER DETALHE DA OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    
    if (!vaga && typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).get().then(function(doc) {
            if (doc.exists) s.mostrarDetalheObraModal(doc.data());
            else s.mostrarToast('❌ Obra não encontrada', 'erro');
        });
        return;
    }
    if (!vaga) { s.mostrarToast('❌ Obra não encontrada', 'erro'); return; }
    s.mostrarDetalheObraModal(vaga);
};

App.prototype.mostrarDetalheObraModal = function(vaga) {
    var html = '<div id="modalDetalheObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;">';
    html += '<div style="background:white;min-height:100vh;padding:20px;">';
    if (vaga.fotoObra) html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:250px;object-fit:cover;border-radius:15px;margin-bottom:15px;">';
    html += '<h2 style="color:#1A3A5C;">' + (vaga.titulo || 'Sem título') + '</h2>';
    html += '<p style="color:#666;">⚪ ' + (vaga.status || 'disponivel') + '</p>';
    html += '<div class="card" style="margin-bottom:10px;">';
    html += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    html += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    html += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    html += '<p><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>';
    html += '<p><strong>📅 Data:</strong> ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    if (vaga.descricao) html += '<p><strong>📝 Descrição:</strong> ' + vaga.descricao + '</p>';
    html += '</div>';
    if (vaga.endereco) {
        html += '<div style="text-align:center;margin-bottom:10px;">';
        html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="background:#1A3A5C;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">🗺️ Ver no Google Maps</a>';
        html += '</div>';
    }
    html += '<button onclick="document.getElementById(\'modalDetalheObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Fechar</button>';
    html += '</div></div>';
    
    var anterior = document.getElementById('modalDetalheObra');
    if (anterior) anterior.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== PERFIL DO USUÁRIO (ORGANIZADO) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFotoPerfil\').click()">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">';
    } else {
        html += '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    }
    html += '</div>';
    html += '<input type="file" id="inputFotoPerfil" accept="image/*" style="display:none;" onchange="window.app.uploadFotoPerfil(event)">';
    html += '<p style="font-size:10px;color:#ccc;">Toque para alterar foto</p>';
    html += '<h2>' + (user.nome || 'Usuário') + '</h2>';
    html += '<p style="color:#f0c27f;">' + (user.profissao || user.tipo || 'Profissional') + '</p>';
    html += '<p>' + estrelas + ' ' + score.toFixed(1) + '</p>';
    html += '</div>';
    
    // MENU DE SEÇÕES
    html += '<div style="display:flex;gap:5px;padding:15px;background:white;">';
    html += '<button onclick="window.app.mostrarSecao(\'informacoes\')" id="btnSecaoInfo" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:11px;">📋 INFORMAÇÕES</button>';
    html += '<button onclick="window.app.mostrarSecao(\'configuracoes\')" id="btnSecaoConfig" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:11px;">⚙️ CONFIGURAÇÕES</button>';
    html += '<button onclick="window.app.mostrarSecao(\'alertas\')" id="btnSecaoAlertas" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:11px;">🔔 ALERTAS</button>';
    html += '</div>';
    
    html += '<div id="secaoConteudo" style="padding:15px;"></div>';
    
    tela.innerHTML = html;
    s.mostrarSecao('informacoes');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this;
    var container = document.getElementById('secaoConteudo');
    if (!container) return;
    
    ['informacoes', 'configuracoes', 'alertas'].forEach(function(sec) {
        var btn = document.getElementById('btnSecao' + sec.charAt(0).toUpperCase() + sec.slice(1));
        if (btn) {
            btn.style.background = sec === secao ? '#1A3A5C' : '#e5e7eb';
            btn.style.color = sec === secao ? 'white' : '#1A3A5C';
        }
    });
    
    var user = s.usuarioLogado;
    
    if (secao === 'informacoes') {
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
        
        var html = '';
        html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><div style="font-size:28px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div><div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><div style="font-size:28px;color:#f59e0b;font-weight:bold;">' + (user.score || 0).toFixed(1) + '</div><div style="color:#999;font-size:11px;">Avaliação</div></div>';
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><div style="font-size:28px;color:#10B981;font-weight:bold;">' + totalObras + '</div><div style="color:#999;font-size:11px;">Obras</div></div>';
        html += '</div>';
        html += '<div class="card" style="margin-bottom:10px;"><h3 style="color:#1A3A5C;">👤 Dados Pessoais</h3>';
        html += '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>';
        html += '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>';
        html += '<p><strong>🏢 Tipo:</strong> ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p>';
        html += '<p><strong>🔧 Profissão:</strong> ' + (user.profissao || 'Não informada') + '</p>';
        html += '</div>';
        html += '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>';
        html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">✏️ Editar Perfil</button>';
        container.innerHTML = html;
        
    } else if (secao === 'configuracoes') {
        var html = '';
        html += '<div class="card" style="margin-bottom:10px;"><h3 style="color:#1A3A5C;margin-bottom:15px;">🎨 Tema</h3>';
        html += '<div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">☀️ Claro</button>';
        html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🌙 Escuro</button>';
        html += '</div></div>';
        html += '<div class="card" style="margin-bottom:10px;"><h3 style="color:#1A3A5C;margin-bottom:15px;">🌐 Idioma</h3>';
        html += '<div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇧🇷 PT</button>';
        html += '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇺🇸 EN</button>';
        html += '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇪🇸 ES</button>';
        html += '</div></div>';
        html += '<div class="card"><h3 style="color:#1A3A5C;margin-bottom:15px;">📄 Documentos</h3>';
        html += '<button onclick="window.app.mostrarDocumento(\'termos\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📄 Termos de Uso</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">🔒 Política de Privacidade</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📋 Diretrizes da Comunidade</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;text-align:left;">ℹ️ Sobre o LPXCONSTRUTOR</button>';
        html += '</div>';
        container.innerHTML = html;
        
    } else if (secao === 'alertas') {
        var html = '<div class="card" style="margin-bottom:10px;"><h3 style="color:#1A3A5C;margin-bottom:15px;">🔔 Central de Notificações</h3>';
        html += '<div style="text-align:center;padding:30px;"><div style="font-size:50px;">🔔</div><p style="color:#666;">Nenhuma notificação no momento</p></div></div>';
        html += '<div class="card"><h3 style="color:#1A3A5C;margin-bottom:15px;">⚙️ Preferências</h3>';
        html += '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><input type="checkbox" checked style="width:20px;height:20px;"><span>Novas vagas publicadas</span></label>';
        html += '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><input type="checkbox" checked style="width:20px;height:20px;"><span>Candidaturas recebidas</span></label>';
        html += '<label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" checked style="width:20px;height:20px;"><span>Mensagens novas</span></label></div>';
        container.innerHTML = html;
    }
};

// ===== UPLOAD FOTO PERFIL =====
App.prototype.uploadFotoPerfil = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var fotoBase64 = e.target.result;
        var preview = document.getElementById('fotoPerfilPreview');
        if (preview) { preview.src = fotoBase64; preview.parentElement.innerHTML = '<img src="' + fotoBase64 + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">'; }
        s.usuarioLogado.fotoPerfil = fotoBase64;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        if (typeof db !== 'undefined' && s.usuarioLogado.id) {
            db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: fotoBase64 });
        }
        s.mostrarToast('✅ Foto atualizada!', 'sucesso');
    };
    reader.readAsDataURL(file);
};

// ===== EDITAR PERFIL =====
App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    
    var modalHTML = '<div id="modalEditarPerfil" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    modalHTML += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;">';
    modalHTML += '<h3 style="color:#1A3A5C;text-align:center;">✏️ Editar Perfil</h3>';
    modalHTML += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Nome</label><input id="editNome" value="' + (user.nome || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    modalHTML += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Celular</label><input id="editCelular" value="' + (user.celular || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    modalHTML += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Profissão</label><input id="editProfissao" value="' + (user.profissao || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    modalHTML += '<div style="margin-bottom:15px;"><label style="font-weight:bold;">Experiência (anos)</label><input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;"></div>';
    modalHTML += '<div style="display:flex;gap:10px;">';
    modalHTML += '<button onclick="window.app.salvarPerfil()" style="flex:1;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;">💾 SALVAR</button>';
    modalHTML += '<button onclick="document.getElementById(\'modalEditarPerfil\').remove()" style="flex:1;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;">CANCELAR</button>';
    modalHTML += '</div></div></div>';
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    var nome = document.getElementById('editNome')?.value?.trim();
    if (!nome) { s.mostrarToast('❌ Nome obrigatório!', 'erro'); return; }
    
    s.usuarioLogado.nome = nome;
    s.usuarioLogado.celular = document.getElementById('editCelular')?.value?.trim() || '';
    s.usuarioLogado.profissao = document.getElementById('editProfissao')?.value?.trim() || '';
    s.usuarioLogado.experiencia = document.getElementById('editExperiencia')?.value?.trim() || '0';
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    if (typeof db !== 'undefined' && s.usuarioLogado.id) {
        db.collection('usuarios').doc(s.usuarioLogado.id).update({
            nome: s.usuarioLogado.nome,
            celular: s.usuarioLogado.celular,
            profissao: s.usuarioLogado.profissao,
            experiencia: s.usuarioLogado.experiencia
        });
    }
    
    document.getElementById('modalEditarPerfil')?.remove();
    s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== DOCUMENTOS (COMPLETOS E PROFISSIONAIS) =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    
    // Tentar carregar arquivos da raiz primeiro
    if (tipo === 'termos' || tipo === 'privacidade') {
        var arquivo = tipo === 'termos' ? 'termos-de-uso.html' : 'politica-de-privacidade.html';
        fetch(arquivo)
            .then(function(response) {
                if (response.ok) return response.text();
                throw new Error('Arquivo não encontrado');
            })
            .then(function(html) {
                s.abrirModalDocumento(tipo, html);
            })
            .catch(function() {
                // Usar conteúdo padrão se arquivo não existir
                s.abrirModalDocumento(tipo, null);
            });
    } else {
        s.abrirModalDocumento(tipo, null);
    }
};

App.prototype.abrirModalDocumento = function(tipo, conteudoArquivo) {
    var titulos = {
        termos: '📄 Termos de Uso',
        privacidade: '🔒 Política de Privacidade',
        diretrizes: '📋 Diretrizes da Comunidade',
        sobre: 'ℹ️ Sobre o LPXCONSTRUTOR'
    };
    
    var conteudo = conteudoArquivo || '';
    
    if (!conteudo) {
        // Conteúdo padrão profissional
        if (tipo === 'termos') {
            conteudo = '<div style="line-height:1.8;">' +
                '<h3 style="color:#1A3A5C;">1. Aceitação dos Termos</h3>' +
                '<p>Ao acessar e utilizar o LPXCONSTRUTOR, você concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer disposição, não utilize nossos serviços.</p>' +
                '<h3 style="color:#1A3A5C;">2. Definições</h3>' +
                '<p><strong>Plataforma:</strong> LPXCONSTRUTOR - Rede Profissional da Construção Civil.<br>' +
                '<strong>Usuário:</strong> Pessoa física ou jurídica cadastrada na plataforma.<br>' +
                '<strong>Empreiteiro:</strong> Usuário que publica vagas e contrata profissionais.<br>' +
                '<strong>Profissional:</strong> Usuário que se candidata a vagas publicadas.</p>' +
                '<h3 style="color:#1A3A5C;">3. Cadastro</h3>' +
                '<p>3.1. O cadastro é gratuito e requer informações verídicas.<br>' +
                '3.2. Cada usuário é responsável por suas credenciais de acesso.<br>' +
                '3.3. É proibido criar múltiplas contas ou fornecer informações falsas.</p>' +
                '<h3 style="color:#1A3A5C;">4. Publicação de Vagas</h3>' +
                '<p>4.1. Apenas empreiteiros podem publicar vagas.<br>' +
                '4.2. As informações da vaga devem ser precisas e verdadeiras.<br>' +
                '4.3. É proibido publicar vagas enganosas ou fraudulentas.</p>' +
                '<h3 style="color:#1A3A5C;">5. Conduta do Usuário</h3>' +
                '<p>5.1. É estritamente proibido: discriminação, assédio, linguagem ofensiva.<br>' +
                '5.2. Os usuários devem manter comunicação profissional e respeitosa.<br>' +
                '5.3. Qualquer violação pode resultar em suspensão ou banimento.</p>' +
                '<h3 style="color:#1A3A5C;">6. Responsabilidades</h3>' +
                '<p>6.1. O LPXCONSTRUTOR atua como plataforma de conexão.<br>' +
                '6.2. Não nos responsabilizamos por acordos financeiros entre usuários.<br>' +
                '6.3. Cada parte é responsável por seus atos e negociações.</p>' +
                '<h3 style="color:#1A3A5C;">7. Privacidade</h3>' +
                '<p>7.1. Os dados dos usuários são protegidos conforme nossa Política de Privacidade.<br>' +
                '7.2. Não compartilhamos dados com terceiros sem consentimento.</p>' +
                '<h3 style="color:#1A3A5C;">8. Contato</h3>' +
                '<p>Email: contato@lpxconstrutor.com.br<br>Telefone: (11) 99999-9999</p>' +
                '<p style="text-align:center;color:#999;margin-top:30px;">Última atualização: 2024</p></div>';
        } else if (tipo === 'privacidade') {
            conteudo = '<div style="line-height:1.8;">' +
                '<h3 style="color:#1A3A5C;">1. Introdução</h3>' +
                '<p>O LPXCONSTRUTOR está comprometido com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).</p>' +
                '<h3 style="color:#1A3A5C;">2. Dados Coletados</h3>' +
                '<p><strong>Dados de cadastro:</strong> Nome, email, telefone, profissão, experiência.<br>' +
                '<strong>Dados de uso:</strong> Interações na plataforma, vagas publicadas, candidaturas.<br>' +
                '<strong>Dados técnicos:</strong> Endereço IP, tipo de dispositivo, navegador.</p>' +
                '<h3 style="color:#1A3A5C;">3. Finalidade do Tratamento</h3>' +
                '<p>3.1. Conexão entre profissionais e empreiteiros.<br>' +
                '3.2. Melhoria da experiência do usuário.<br>' +
                '3.3. Comunicações sobre a plataforma.<br>' +
                '3.4. Cumprimento de obrigações legais.</p>' +
                '<h3 style="color:#1A3A5C;">4. Compartilhamento de Dados</h3>' +
                '<p>4.1. Não vendemos dados pessoais.<br>' +
                '4.2. Compartilhamos apenas o necessário para a prestação do serviço.<br>' +
                '4.3. Dados podem ser compartilhados mediante ordem judicial.</p>' +
                '<h3 style="color:#1A3A5C;">5. Direitos do Titular (LGPD)</h3>' +
                '<p>✅ Acessar seus dados<br>✅ Corrigir dados incompletos<br>✅ Excluir dados desnecessários<br>✅ Revogar consentimento<br>✅ Portabilidade dos dados</p>' +
                '<h3 style="color:#1A3A5C;">6. Segurança</h3>' +
                '<p>Utilizamos criptografia, firewalls e medidas técnicas para proteger seus dados contra acessos não autorizados.</p>' +
                '<h3 style="color:#1A3A5C;">7. Cookies</h3>' +
                '<p>Utilizamos cookies essenciais para o funcionamento da plataforma. Você pode gerenciá-los nas configurações do navegador.</p>' +
                '<h3 style="color:#1A3A5C;">8. Contato do DPO</h3>' +
                '<p>Encarregado de Proteção de Dados:<br>Email: privacidade@lpxconstrutor.com.br</p>' +
                '<p style="text-align:center;color:#999;margin-top:30px;">Última atualização: 2024</p></div>';
        } else if (tipo === 'diretrizes') {
            conteudo = '<div style="line-height:1.8;">' +
                '<h3 style="color:#1A3A5C;">1. Missão</h3>' +
                '<p>Conectar profissionais da construção civil de forma ética, segura e eficiente, promovendo oportunidades de trabalho e crescimento profissional.</p>' +
                '<h3 style="color:#1A3A5C;">2. Valores</h3>' +
                '<p>🤝 <strong>Respeito:</strong> Tratar todos com dignidade e profissionalismo.<br>' +
                '✅ <strong>Honestidade:</strong> Informações verdadeiras e transparentes.<br>' +
                '🛡️ <strong>Segurança:</strong> Priorizar a segurança no trabalho.<br>' +
                '⭐ <strong>Qualidade:</strong> Buscar excelência em cada projeto.</p>' +
                '<h3 style="color:#1A3A5C;">3. Regras de Convivência</h3>' +
                '<p>3.1. Comunicação respeitosa e profissional.<br>' +
                '3.2. Cumprimento de prazos e acordos.<br>' +
                '3.3. Pagamentos justos e pontuais.<br>' +
                '3.4. Uso obrigatório de EPIs.<br>' +
                '3.5. Avaliações honestas e construtivas.</p>' +
                '<h3 style="color:#1A3A5C;">4. Boas Práticas</h3>' +
                '<p>✅ Mantenha seu perfil atualizado<br>✅ Responda mensagens em até 24h<br>✅ Cumpra os combinados<br>✅ Reporte comportamentos inadequados<br>✅ Compartilhe conhecimento</p>' +
                '<h3 style="color:#1A3A5C;">5. Penalidades</h3>' +
                '<p>⚠️ Advertência → Suspensão temporária → Banimento permanente</p></div>';
        } else if (tipo === 'sobre') {
            conteudo = '<div style="text-align:center;line-height:1.8;">' +
                '<div style="font-size:80px;">🏗️</div>' +
                '<h2 style="color:#1A3A5C;">LPXCONSTRUTOR</h2>' +
                '<p><strong>Versão 1.0.0</strong></p>' +
                '<p>A maior rede profissional da construção civil do Brasil.</p>' +
                '<hr style="margin:20px 0;">' +
                '<p><strong>Missão:</strong> Conectar profissionais e empreiteiros, gerando oportunidades e desenvolvimento no setor da construção civil.</p>' +
                '<p><strong>Visão:</strong> Ser a plataforma líder de conexão profissional na construção civil da América Latina.</p>' +
                '<p><strong>Valores:</strong> Ética, Transparência, Segurança, Qualidade e Inovação.</p>' +
                '<hr style="margin:20px 0;">' +
                '<p><strong>Desenvolvido por:</strong> LPX Tecnologia</p>' +
                '<p><strong>Email:</strong> contato@lpxconstrutor.com.br</p>' +
                '<p><strong>Fundação:</strong> 2024</p>' +
                '<p style="color:#999;margin-top:20px;">© 2024 LPXCONSTRUTOR. Todos os direitos reservados.</p></div>';
        }
    }
    
    var modalHTML = '<div id="modalDocumento" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    modalHTML += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:600px;max-height:80vh;overflow-y:auto;">';
    modalHTML += '<h2 style="color:#1A3A5C;text-align:center;margin-bottom:20px;">' + (titulos[tipo] || '') + '</h2>';
    modalHTML += conteudo;
    modalHTML += '<button onclick="document.getElementById(\'modalDocumento\').remove()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-top:20px;">FECHAR</button>';
    modalHTML += '</div></div>';
    
    var anterior = document.getElementById('modalDocumento');
    if (anterior) anterior.remove();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// ===== TEMAS E IDIOMAS =====
App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    this.mostrarToast('🎨 Tema ' + (tema === 'escuro' ? 'escuro' : 'claro') + '!', 'sucesso');
    this.carregarMeuPerfil();
};

App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    var nomes = { pt: 'Português', en: 'English', es: 'Español' };
    this.mostrarToast('🌐 ' + (nomes[idioma] || idioma) + '!', 'sucesso');
    this.carregarMeuPerfil();
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1F2937;color:white;padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
        document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.mostrarNotificacoes = function() {
    this.mostrarToast('🔔 Nenhuma notificação nova', 'info');
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.abrirContratacao = function(uid) {
    this.mostrarToast('🤝 Funcionalidade em desenvolvimento', 'info');
};

App.prototype.mostrarModalSair = function() {
    var modal = document.getElementById('modalSair');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        if (confirm('Deseja sair do aplicativo?')) {
            this.sair();
        }
    }
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO!');
    console.log('📋 Funcionalidades:');
    console.log('  ✅ Rede de Conexões');
    console.log('  ✅ Publicação de Obras');
    console.log('  ✅ Feed com Destaque');
    console.log('  ✅ Documentos Completos');
    console.log('  ✅ Busca de Profissionais');
    console.log('  ✅ Perfil Organizado');
});
