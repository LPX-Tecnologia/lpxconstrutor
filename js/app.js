// ==========================================================
// ===== LPXCONSTRUTOR - SISTEMA COMPLETO E ORGANIZADO =====
// ==========================================================

// ===== INICIALIZAÇÃO =====
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
    selecionarIdioma: function(i){ if(window.app._app)window.app._app.selecionarIdioma(i); }
};

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.secaoAtual = 'informacoes';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR Iniciando...');
    window.app._app = this;
    
    // Aplicar tema salvo
    if (s.temaAtual === 'escuro') {
        document.body.classList.add('dark-theme');
    }
    
    s.mostrarSplash();
    
    // Verificar login automático
    var usuarioSalvo = localStorage.getItem('usuarioLPX');
    if (usuarioSalvo) {
        try {
            s.usuarioLogado = JSON.parse(usuarioSalvo);
        } catch(e) {}
    }
    
    // Firebase Auth
    if (typeof authService !== 'undefined') {
        authService.onAuthStateChange(function(u) {
            if (u) {
                s.usuarioLogado = u;
                localStorage.setItem('usuarioLPX', JSON.stringify(u));
                s.atualizarUI();
                if (s.telaAtual === 'loginScreen') {
                    s.mostrarTela('homeScreen');
                }
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.mostrarTela('loginScreen');
            }
            setTimeout(function() { s.esconderSplash(); }, 1500);
        });
    } else {
        setTimeout(function() {
            if (s.usuarioLogado) {
                s.mostrarTela('homeScreen');
            }
            s.esconderSplash();
        }, 1500);
    }
    
    // Evento voltar do navegador
    window.addEventListener('popstate', function() {
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') {
            s.mostrarModalSair();
        } else {
            s.voltarTela();
        }
    });
};

// ===== SPLASH SCREEN =====
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
        var r = document.createElement('div');
        r.style.cssText = 'display:flex;gap:2px;';
        if (f % 2 === 1) r.style.marginLeft = '8px';
        var q = f === 0 ? 4 : f === 1 ? 5 : f === 2 ? 4 : 5;
        for (var i = 0; i < q; i++) {
            var t = document.createElement('span');
            t.textContent = '🧱';
            t.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;';
            r.appendChild(t);
        }
        c.appendChild(r);
        f++;
        setTimeout(a, f < 4 ? 300 : 600);
    }
    a();
};

App.prototype.esconderSplash = function() {
    var s = document.getElementById('splashScreen');
    if (s) {
        s.style.opacity = '0';
        setTimeout(function() {
            if (s.parentNode) s.parentNode.removeChild(s);
        }, 500);
    }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    document.querySelectorAll('.screen').forEach(function(x) {
        x.classList.remove('active');
    });
    
    var t = document.getElementById(id);
    if (!t) {
        console.warn('Tela não encontrada:', id);
        return;
    }
    
    t.classList.add('active');
    s.telaAtual = id;
    
    // Mostrar/esconder navegação inferior
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    // Carregar conteúdo conforme tela
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        var anterior = this.historicoTelas.pop();
        this.mostrarTela(anterior);
    } else {
        this.mostrarTela('homeScreen');
    }
};

App.prototype.atualizarUI = function() {
    var user = this.usuarioLogado;
    
    // Atualizar nome na home
    var saudacao = document.getElementById('saudacao');
    if (saudacao && user) {
        var h = new Date().getHours();
        var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
        saudacao.textContent = '👋 ' + sd + ', ' + (user.nome || 'Usuário') + '!';
    }
    
    // Atualizar foto na home
    var fotoHome = document.querySelector('#homeScreen .logo-saudacao');
    if (fotoHome && user) {
        if (user.fotoPerfil) {
            fotoHome.src = user.fotoPerfil;
            fotoHome.style.borderRadius = '50%';
            fotoHome.style.objectFit = 'cover';
        }
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
    
    if (!email || !senha) {
        s.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
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
    } else {
        // Login local para teste
        if (typeof db !== 'undefined') {
            db.collection('usuarios').where('email', '==', email).get().then(function(snap) {
                if (snap.empty) {
                    s.mostrarToast('❌ Usuário não encontrado', 'erro');
                    return;
                }
                snap.forEach(function(doc) {
                    var user = doc.data();
                    user.id = doc.id;
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
        s.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
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
    var s = this;
    if (typeof authService !== 'undefined') {
        authService.logout();
    }
    s.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    s.mostrarTela('loginScreen');
    s.mostrarToast('👋 Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    this.atualizarUI();
    
    // Carregar feed
    var feedContainer = document.getElementById('feedContainer');
    if (feedContainer) {
        this.carregarFeed();
    }
    
    // Inicializar mapa
    setTimeout(function() {
        if (typeof mapaService !== 'undefined') {
            try { mapaService.initMap(); } catch(e) {}
        }
    }, 500);
};

// ===== FEED COM DADOS REAIS =====
App.prototype.carregarFeed = function() {
    var s = this;
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando obras...</div>';
    
    // Buscar vagas do Firebase e localStorage
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
            var vagas = [];
            snap.forEach(function(doc) {
                var v = doc.data();
                v.id = doc.id;
                if (v.ativa !== false) vagas.push(v);
            });
            
            // Mesclar com localStorage
            vagasLocal.forEach(function(v) {
                if (!vagas.find(function(x) { return x.id === v.id; })) {
                    vagas.push(v);
                }
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
            '<h3>Nenhuma obra publicada</h3>' +
            '<p style="color:#666;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:bold;margin-top:10px;">📢 PUBLICAR OBRA</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    
    vagas.forEach(function(vaga) {
        var statusCor = vaga.status === 'em_andamento' ? '#10B981' : '#f59e0b';
        var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:12px;border-left:4px solid ' + statusCor + ';" onclick="window.app.verDetalheObra(\'' + vaga.id + '\')">';
        
        // Foto da obra
        if (vaga.fotoObra) {
            html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-bottom:10px;" onerror="this.style.display=\'none\'">';
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
        html += '<div style="font-size:11px;color:#999;">👤 ' + (vaga.autorNome || 'Anônimo') + '</div>';
        html += '</div></div>';
        
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + (vaga.valorHora || '0') + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">👷 ' + (vaga.profissoes || 'Todas') + '</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:3px 10px;border-radius:15px;font-size:11px;margin-left:auto;">' + statusTexto + '</span>';
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

// ===== BUSCA COM DADOS REAIS =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var container = document.getElementById('buscaResultados');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando profissionais...</div>';
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('tipo', '==', 'profissional').get().then(function(snap) {
            var profissionais = [];
            snap.forEach(function(doc) {
                var u = doc.data();
                u.id = doc.id;
                if (u.ativo !== false && u.id !== s.usuarioLogado?.id) {
                    profissionais.push(u);
                }
            });
            s.renderizarBusca(container, profissionais);
        }).catch(function() {
            container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">Erro ao carregar</div>';
        });
    } else {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<h3>🔌 Conecte ao Firebase</h3><p>Para ver profissionais reais</p></div>';
    }
};

App.prototype.renderizarBusca = function(container, profissionais) {
    var s = this;
    
    if (profissionais.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">👷</div>' +
            '<h3>Nenhum profissional encontrado</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;color:#666;font-size:12px;">' + profissionais.length + ' profissional(is) encontrado(s)</div>';
    
    profissionais.forEach(function(u) {
        var score = u.score || 0;
        var estrelas = '';
        for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verPerfil(\'' + u.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:12px;">';
        
        // Foto do profissional
        html += '<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #1A3A5C;">';
        if (u.fotoPerfil) {
            html += '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            html += '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        }
        html += '</div>';
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;font-size:16px;">' + (u.nome || 'Sem nome') + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (u.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:12px;color:#999;">📅 ' + (u.experiencia || '0') + ' anos de experiência</div>';
        html += '<div style="font-size:14px;color:#f59e0b;">' + estrelas + ' ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '</div>';
        
        html += '<i class="fas fa-chevron-right" style="color:#ccc;"></i>';
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

// ===== PERFIL DO PROFISSIONAL (DADOS REAIS) =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (!doc.exists) {
                s.mostrarToast('❌ Profissional não encontrado', 'erro');
                return;
            }
            var user = doc.data();
            user.id = doc.id;
            s.mostrarPerfilProfissional(user);
        });
    }
};

App.prototype.mostrarPerfilProfissional = function(user) {
    var s = this;
    var container = document.getElementById('perfilPublicoConteudo');
    
    if (!container) {
        // Criar tela se não existir
        var tela = document.getElementById('perfilPublicoScreen');
        if (!tela) {
            tela = document.createElement('div');
            tela.id = 'perfilPublicoScreen';
            tela.className = 'screen';
            document.body.appendChild(tela);
        }
        container = document.createElement('div');
        container.id = 'perfilPublicoConteudo';
        tela.appendChild(container);
    }
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px 30px;text-align:center;border-radius:0 0 30px 30px;">';
    
    // Foto grande
    html += '<div style="width:120px;height:120px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">';
    } else {
        html += '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    }
    html += '</div>';
    
    html += '<h2 style="margin:10px 0;font-size:24px;">' + (user.nome || 'Profissional') + '</h2>';
    html += '<p style="color:#f0c27f;font-size:16px;">🔧 ' + (user.profissao || 'Não informada') + '</p>';
    html += '<p style="font-size:14px;">📅 ' + (user.experiencia || '0') + ' anos de experiência</p>';
    html += '<p style="font-size:20px;">' + estrelas + ' ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</p>';
    html += '</div>';
    
    // Informações de contato
    html += '<div style="padding:20px;">';
    html += '<div class="card" style="margin-bottom:15px;">';
    html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">📞 Contato</h3>';
    html += '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>';
    html += '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>';
    
    if (user.habilidades) {
        html += '<p><strong>🛠️ Habilidades:</strong> ' + user.habilidades + '</p>';
    }
    html += '</div>';
    
    // Botões de ação
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    
    if (user.celular) {
        var whatsapp = user.celular.replace(/\D/g, '');
        html += '<a href="https://wa.me/55' + whatsapp + '" target="_blank" style="text-decoration:none;background:#25D366;color:white;padding:15px;border-radius:10px;text-align:center;font-weight:bold;display:block;">' +
            '<i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
    }
    
    if (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro') {
        html += '<button onclick="window.app.abrirContratacao(\'' + user.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">🤝 CONTRATAR</button>';
    }
    
    html += '<button onclick="window.app.voltarTela()" style="background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Voltar</button>';
    html += '</div></div>';
    
    container.innerHTML = html;
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA COM FOTO =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.tipo !== 'empreiteiro') {
        s.mostrarToast('❌ Apenas empreiteiros podem publicar!', 'erro');
        return;
    }
    
    s.mostrarTela('publicarVagaScreen');
    
    // Limpar formulário
    setTimeout(function() {
        var campos = ['vagaTitulo', 'vagaEndereco', 'vagaValorHora', 'vagaDescricao'];
        campos.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
        });
        
        var preview = document.getElementById('vagaFotoPreview');
        if (preview) preview.src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
        
        s.vagaFotoBase64 = null;
    }, 200);
};

App.prototype.previewFotoObra = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    
    // Preview
    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('vagaFotoPreview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        s.vagaFotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    
    var titulo = document.getElementById('vagaTitulo')?.value?.trim();
    var endereco = document.getElementById('vagaEndereco')?.value?.trim();
    var valorHora = document.getElementById('vagaValorHora')?.value?.trim();
    var descricao = document.getElementById('vagaDescricao')?.value?.trim();
    
    // Pegar profissões dos checkboxes
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
    
    // Salvar no localStorage
    var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagasSalvas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
    
    // Salvar no Firebase
    if (typeof db !== 'undefined') {
        db.collection('vagas').add(vaga).then(function(docRef) {
            vaga.id = docRef.id;
            // Atualizar localStorage com ID do Firebase
            vagasSalvas[0].id = docRef.id;
            localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        }).catch(function(err) {
            console.log('Salvo apenas local:', err);
        });
    }
    
    // Limpar formulário
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada com sucesso! 🏗️', 'sucesso');
    
    setTimeout(function() {
        s.mostrarTela('homeScreen');
        s.carregarFeed();
        s.carregarMeuPerfil();
    }, 800);
};

// ===== MINHAS OBRAS (COM CONTAGEM REAL) =====
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
    var minhasObras = vagasLocal.filter(function(v) {
        return v.autorId === s.usuarioLogado.id;
    });
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').where('autorId', '==', s.usuarioLogado.id).get().then(function(snap) {
            snap.forEach(function(doc) {
                var v = doc.data();
                v.id = doc.id;
                if (!minhasObras.find(function(o) { return o.id === doc.id; })) {
                    minhasObras.push(v);
                }
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
    // Atualizar contador
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = obras.length;
    
    if (obras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3>Nenhuma obra cadastrada</h3>' +
            '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:bold;margin-top:10px;">📢 PUBLICAR OBRA</button>' +
            '</div>';
        return;
    }
    
    var html = '<div style="padding:15px;">';
    html += '<div style="text-align:center;margin-bottom:15px;color:#1A3A5C;font-weight:bold;">🏗️ Total de Obras: <span style="color:#10B981;font-size:24px;">' + obras.length + '</span></div>';
    
    obras.forEach(function(v) {
        var statusCor = v.status === 'em_andamento' ? '#10B981' : '#f59e0b';
        var statusTexto = v.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:12px;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        
        if (v.fotoObra) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + v.titulo + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + v.endereco + '</div>';
        html += '<div style="display:flex;gap:6px;margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:3px 10px;border-radius:15px;font-size:11px;">' + statusTexto + '</span>';
        html += '</div></div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
};

// ===== PERFIL DO USUÁRIO (ORGANIZADO) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    // Contar obras
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '';
    
    // CABEÇALHO
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFotoPerfil\').click()">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">';
    } else {
        html += '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    }
    html += '</div>';
    html += '<input type="file" id="inputFotoPerfil" accept="image/*" style="display:none;" onchange="window.app.uploadFotoPerfil(event)">';
    html += '<p style="font-size:10px;color:#ccc;margin-top:5px;">Toque para alterar foto</p>';
    html += '<h2 style="margin:10px 0;">' + (user.nome || 'Usuário') + '</h2>';
    html += '<p style="color:#f0c27f;">' + (user.profissao || user.tipo || 'Profissional') + '</p>';
    html += '<p>' + estrelas + ' ' + score.toFixed(1) + '</p>';
    html += '</div>';
    
    // MENU DE SEÇÕES
    html += '<div style="display:flex;gap:5px;padding:15px;background:white;margin-bottom:5px;">';
    html += '<button onclick="window.app.mostrarSecao(\'informacoes\')" id="btnSecaoInfo" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:12px;">📋 INFORMAÇÕES</button>';
    html += '<button onclick="window.app.mostrarSecao(\'configuracoes\')" id="btnSecaoConfig" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:12px;">⚙️ CONFIGURAÇÕES</button>';
    html += '<button onclick="window.app.mostrarSecao(\'alertas\')" id="btnSecaoAlertas" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:12px;">🔔 ALERTAS</button>';
    html += '</div>';
    
    // CONTEÚDO DAS SEÇÕES
    html += '<div id="secaoConteudo" style="padding:0 15px;"></div>';
    
    tela.innerHTML = html;
    
    // Mostrar seção padrão
    s.mostrarSecao('informacoes');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this;
    var container = document.getElementById('secaoConteudo');
    if (!container) return;
    
    // Atualizar botões
    ['informacoes', 'configuracoes', 'alertas'].forEach(function(sec) {
        var btn = document.getElementById('btnSecao' + sec.charAt(0).toUpperCase() + sec.slice(1));
        if (btn) {
            btn.style.background = sec === secao ? '#1A3A5C' : '#e5e7eb';
            btn.style.color = sec === secao ? 'white' : '#1A3A5C';
        }
    });
    
    var user = s.usuarioLogado;
    
    if (secao === 'informacoes') {
        // SEÇÃO INFORMAÇÕES
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
        
        var html = '';
        
        // Estatísticas
        html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">';
        html += '<div style="font-size:28px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div>';
        html += '<div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
        
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">';
        html += '<div style="font-size:28px;color:#f59e0b;font-weight:bold;">' + (user.score || 0).toFixed(1) + '</div>';
        html += '<div style="color:#999;font-size:11px;">Avaliação</div></div>';
        
        html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();">';
        html += '<div style="font-size:28px;color:#10B981;font-weight:bold;">' + totalObras + '</div>';
        html += '<div style="color:#999;font-size:11px;">Obras</div></div>';
        html += '</div>';
        
        // Dados pessoais
        html += '<div class="card" style="margin-bottom:10px;">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:10px;">👤 Dados Pessoais</h3>';
        html += '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>';
        html += '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>';
        html += '<p><strong>🏢 Tipo:</strong> ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p>';
        html += '<p><strong>🔧 Profissão:</strong> ' + (user.profissao || 'Não informada') + '</p>';
        html += '</div>';
        
        // Botão Minhas Obras
        html += '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>';
        
        // Botão Editar Perfil
        html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">✏️ Editar Perfil</button>';
        
        container.innerHTML = html;
        
    } else if (secao === 'configuracoes') {
        // SEÇÃO CONFIGURAÇÕES
        var html = '';
        
        // Tema
        html += '<div class="card" style="margin-bottom:10px;">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">🎨 Tema</h3>';
        html += '<div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">☀️ Claro</button>';
        html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🌙 Escuro</button>';
        html += '</div></div>';
        
        // Idioma
        html += '<div class="card" style="margin-bottom:10px;">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">🌐 Idioma</h3>';
        html += '<div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇧🇷 PT</button>';
        html += '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇺🇸 EN</button>';
        html += '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;">🇪🇸 ES</button>';
        html += '</div></div>';
        
        // Documentos
        html += '<div class="card" style="margin-bottom:10px;">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">📄 Documentos</h3>';
        html += '<button onclick="window.app.mostrarDocumento(\'termos\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📄 Termos de Uso</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">🔒 Política de Privacidade</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;">📋 Diretrizes</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;text-align:left;">ℹ️ Sobre</button>';
        html += '</div>';
        
        container.innerHTML = html;
        
    } else if (secao === 'alertas') {
        // SEÇÃO ALERTAS
        var html = '';
        
        html += '<div class="card" style="margin-bottom:10px;">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">🔔 Central de Notificações</h3>';
        
        // Buscar notificações reais
        var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
        
        if (notificacoes.length === 0) {
            html += '<div style="text-align:center;padding:30px;">';
            html += '<div style="font-size:50px;">🔔</div>';
            html += '<p style="color:#666;">Nenhuma notificação no momento</p>';
            html += '</div>';
        } else {
            notificacoes.forEach(function(notif) {
                html += '<div style="background:#f0f9ff;padding:12px;border-radius:8px;margin-bottom:8px;border-left:4px solid #1A3A5C;">';
                html += '<div style="font-weight:bold;">' + notif.titulo + '</div>';
                html += '<div style="font-size:12px;color:#666;">' + notif.mensagem + '</div>';
                html += '<div style="font-size:10px;color:#999;">' + new Date(notif.data).toLocaleString('pt-BR') + '</div>';
                html += '</div>';
            });
        }
        
        html += '</div>';
        
        // Preferências de alerta
        html += '<div class="card">';
        html += '<h3 style="color:#1A3A5C;margin-bottom:15px;">⚙️ Preferências</h3>';
        html += '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
        html += '<input type="checkbox" checked style="width:20px;height:20px;">';
        html += '<span>Novas vagas publicadas</span></label>';
        html += '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
        html += '<input type="checkbox" checked style="width:20px;height:20px;">';
        html += '<span>Candidaturas recebidas</span></label>';
        html += '<label style="display:flex;align-items:center;gap:10px;">';
        html += '<input type="checkbox" checked style="width:20px;height:20px;">';
        html += '<span>Mensagens novas</span></label>';
        html += '</div>';
        
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
        
        // Atualizar preview
        var preview = document.getElementById('fotoPerfilPreview');
        if (preview) {
            preview.src = fotoBase64;
            preview.parentElement.innerHTML = '<img src="' + fotoBase64 + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">';
        }
        
        // Salvar no perfil
        s.usuarioLogado.fotoPerfil = fotoBase64;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        
        // Atualizar no Firebase
        if (typeof db !== 'undefined' && s.usuarioLogado.id) {
            db.collection('usuarios').doc(s.usuarioLogado.id).update({
                fotoPerfil: fotoBase64
            }).then(function() {
                s.mostrarToast('✅ Foto atualizada!', 'sucesso');
            });
        } else {
            s.mostrarToast('✅ Foto atualizada!', 'sucesso');
        }
        
        // Atualizar foto na home
        var fotoHome = document.querySelector('#homeScreen .logo-saudacao');
        if (fotoHome) {
            fotoHome.src = fotoBase64;
            fotoHome.style.borderRadius = '50%';
            fotoHome.style.objectFit = 'cover';
        }
    };
    reader.readAsDataURL(file);
};

// ===== EDITAR PERFIL =====
App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var user = s.usuarioLogado;
    
    // Criar modal de edição
    var modalHTML = '<div id="modalEditarPerfil" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    modalHTML += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;max-height:80vh;overflow-y:auto;">';
    modalHTML += '<h3 style="color:#1A3A5C;text-align:center;">✏️ Editar Perfil</h3>';
    
    modalHTML += '<div style="margin-bottom:15px;">';
    modalHTML += '<label style="font-weight:bold;color:#1A3A5C;">Nome</label>';
    modalHTML += '<input id="editNome" value="' + (user.nome || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    modalHTML += '</div>';
    
    modalHTML += '<div style="margin-bottom:15px;">';
    modalHTML += '<label style="font-weight:bold;color:#1A3A5C;">Celular</label>';
    modalHTML += '<input id="editCelular" value="' + (user.celular || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    modalHTML += '</div>';
    
    modalHTML += '<div style="margin-bottom:15px;">';
    modalHTML += '<label style="font-weight:bold;color:#1A3A5C;">Profissão</label>';
    modalHTML += '<input id="editProfissao" value="' + (user.profissao || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    modalHTML += '</div>';
    
    modalHTML += '<div style="margin-bottom:15px;">';
    modalHTML += '<label style="font-weight:bold;color:#1A3A5C;">Experiência (anos)</label>';
    modalHTML += '<input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-top:5px;">';
    modalHTML += '</div>';
    
    modalHTML += '<div style="display:flex;gap:10px;">';
    modalHTML += '<button onclick="window.app.salvarPerfil()" style="flex:1;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;">💾 SALVAR</button>';
    modalHTML += '<button onclick="document.getElementById(\'modalEditarPerfil\').remove()" style="flex:1;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;">CANCELAR</button>';
    modalHTML += '</div>';
    
    modalHTML += '</div></div>';
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    
    var nome = document.getElementById('editNome')?.value?.trim();
    var celular = document.getElementById('editCelular')?.value?.trim();
    var profissao = document.getElementById('editProfissao')?.value?.trim();
    var experiencia = document.getElementById('editExperiencia')?.value?.trim();
    
    if (!nome) {
        s.mostrarToast('❌ Nome é obrigatório!', 'erro');
        return;
    }
    
    // Atualizar usuário
    s.usuarioLogado.nome = nome;
    s.usuarioLogado.celular = celular;
    s.usuarioLogado.profissao = profissao;
    s.usuarioLogado.experiencia = experiencia;
    
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    // Atualizar Firebase
    if (typeof db !== 'undefined' && s.usuarioLogado.id) {
        db.collection('usuarios').doc(s.usuarioLogado.id).update({
            nome: nome,
            celular: celular,
            profissao: profissao,
            experiencia: experiencia
        }).then(function() {
            s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
        });
    } else {
        s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    }
    
    // Fechar modal
    var modal = document.getElementById('modalEditarPerfil');
    if (modal) modal.remove();
    
    // Recarregar perfil
    s.carregarMeuPerfil();
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
    
    this.mostrarToast('🎨 Tema ' + (tema === 'escuro' ? 'escuro' : 'claro') + ' aplicado!', 'sucesso');
    this.carregarMeuPerfil();
};

App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    
    var nomes = { pt: 'Português', en: 'English', es: 'Español' };
    this.mostrarToast('🌐 Idioma: ' + (nomes[idioma] || idioma), 'sucesso');
    this.carregarMeuPerfil();
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var titulos = {
        termos: '📄 Termos de Uso',
        privacidade: '🔒 Política de Privacidade',
        diretrizes: '📋 Diretrizes da Comunidade',
        sobre: 'ℹ️ Sobre o LPXCONSTRUTOR'
    };
    
    var conteudos = {
        termos: '<p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos de uso.</p><p>É proibido: discriminação, assédio, informações falsas.</p>',
        privacidade: '<p>Seus dados são protegidos pela LGPD.</p><p>Não compartilhamos suas informações com terceiros.</p>',
        diretrizes: '<p>Respeito mútuo entre profissionais e empreiteiros.</p><p>Avaliações honestas e comunicação clara.</p>',
        sobre: '<div style="text-align:center;"><div style="font-size:60px;">🏗️</div><h2>LPXCONSTRUTOR</h2><p>Versão 1.0.0</p><p>Rede Profissional da Construção Civil</p></div>'
    };
    
    // Criar modal
    var modalHTML = '<div id="modalDocumento" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    modalHTML += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto;">';
    modalHTML += '<h3 style="color:#1A3A5C;text-align:center;margin-bottom:15px;">' + (titulos[tipo] || '') + '</h3>';
    modalHTML += '<div style="line-height:1.6;">' + (conteudos[tipo] || '') + '</div>';
    modalHTML += '<button onclick="document.getElementById(\'modalDocumento\').remove()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;margin-top:15px;">FECHAR</button>';
    modalHTML += '</div></div>';
    
    // Remover anterior se existir
    var anterior = document.getElementById('modalDocumento');
    if (anterior) anterior.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// ===== VER DETALHE DA OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    
    if (!vaga && typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).get().then(function(doc) {
            if (doc.exists) {
                s.mostrarDetalheObraModal(doc.data());
            } else {
                s.mostrarToast('❌ Obra não encontrada', 'erro');
            }
        });
        return;
    }
    
    if (!vaga) {
        s.mostrarToast('❌ Obra não encontrada', 'erro');
        return;
    }
    
    s.mostrarDetalheObraModal(vaga);
};

App.prototype.mostrarDetalheObraModal = function(vaga) {
    var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
    
    var modalHTML = '<div id="modalDetalheObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;">';
    modalHTML += '<div style="background:white;min-height:100vh;padding:20px;">';
    
    // Foto da obra
    if (vaga.fotoObra) {
        modalHTML += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:250px;object-fit:cover;border-radius:15px;margin-bottom:15px;">';
    }
    
    modalHTML += '<h2 style="color:#1A3A5C;">' + (vaga.titulo || 'Sem título') + '</h2>';
    modalHTML += '<p style="color:#666;">' + statusTexto + '</p>';
    
    modalHTML += '<div class="card" style="margin-bottom:10px;">';
    modalHTML += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    modalHTML += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    modalHTML += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    modalHTML += '<p><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>';
    modalHTML += '<p><strong>📅 Data:</strong> ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    modalHTML += '</div>';
    
    // Mapa
    if (vaga.endereco) {
        modalHTML += '<div style="text-align:center;margin-bottom:10px;">';
        modalHTML += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="background:#1A3A5C;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">🗺️ Ver no Google Maps</a>';
        modalHTML += '</div>';
    }
    
    modalHTML += '<button onclick="document.getElementById(\'modalDetalheObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Fechar</button>';
    
    modalHTML += '</div></div>';
    
    var anterior = document.getElementById('modalDetalheObra');
    if (anterior) anterior.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
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
    this._toastTimeout = setTimeout(function() {
        toast.style.display = 'none';
    }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR PRONTO!');
});
