// ==========================================================
// ===== LPXCONSTRUTOR - FUNCIONAL =====
// ==========================================================

var appInstancia = null;

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.usuarioSelecionado = null;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 App iniciando');
    appInstancia = s;
    
    // Remover splash antigo
    var sAntigo = document.getElementById('splashScreen');
    if (sAntigo) sAntigo.remove();
    
    // Login salvo
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) {
        try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {}
    }
    
    // Splash
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;';
    splash.innerHTML = '<div style="font-size:80px;">🏗️</div><p style="color:white;font-size:24px;font-weight:bold;margin-top:15px;">LPXCONSTRUTOR</p>';
    document.body.appendChild(splash);
    
    // Configurar navegação
    s.configurarNavegacao();
    
    setTimeout(function() {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s';
        setTimeout(function() {
            if (splash.parentNode) splash.remove();
            if (s.usuarioLogado) {
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarTela('loginScreen');
            }
        }, 500);
    }, 1500);
};

// ===== CONFIGURAR NAVEGAÇÃO =====
App.prototype.configurarNavegacao = function() {
    var s = this;
    
    // Esperar o DOM estar pronto e então configurar
    setTimeout(function() {
        // Bottom Nav
        var nav = document.getElementById('bottomNav');
        if (nav) {
            var botoes = nav.querySelectorAll('button, a, .nav-item, [onclick]');
            console.log('📱 Botões encontrados no bottomNav:', botoes.length);
            
            for (var i = 0; i < botoes.length; i++) {
                var btn = botoes[i];
                var texto = (btn.textContent || '').toLowerCase().trim();
                var icone = btn.querySelector('i');
                var classeIcone = icone ? icone.className : '';
                
                // Remover onclick antigo
                btn.removeAttribute('onclick');
                btn.style.cursor = 'pointer';
                
                // Home
                if (texto.indexOf('home') >= 0 || texto.indexOf('início') >= 0 || texto.indexOf('🏠') >= 0 || classeIcone.indexOf('fa-home') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.mostrarTela('homeScreen'); };
                    console.log('  ✅ Botão Home configurado');
                }
                // Buscar
                else if (texto.indexOf('buscar') >= 0 || texto.indexOf('busca') >= 0 || texto.indexOf('🔍') >= 0 || classeIcone.indexOf('fa-search') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.mostrarTela('buscaScreen'); };
                    console.log('  ✅ Botão Buscar configurado');
                }
                // Perfil
                else if (texto.indexOf('perfil') >= 0 || texto.indexOf('👤') >= 0 || classeIcone.indexOf('fa-user') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.mostrarTela('meuPerfilScreen'); };
                    console.log('  ✅ Botão Perfil configurado');
                }
                // Chat
                else if (texto.indexOf('chat') >= 0 || texto.indexOf('💬') >= 0 || classeIcone.indexOf('fa-comment') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.mostrarTela('chatScreen'); };
                    console.log('  ✅ Botão Chat configurado');
                }
                // Obras
                else if (texto.indexOf('obra') >= 0 || texto.indexOf('🏗️') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.mostrarTela('minhasObrasScreen'); };
                    console.log('  ✅ Botão Obras configurado');
                }
                // Publicar
                else if (texto.indexOf('publicar') >= 0 || texto.indexOf('📢') >= 0 || classeIcone.indexOf('fa-plus') >= 0) {
                    btn.onclick = function(e) { e.preventDefault(); s.abrirTelaPublicacao(); };
                    console.log('  ✅ Botão Publicar configurado');
                }
            }
        } else {
            console.log('⚠️ BottomNav não encontrado, tentando novamente...');
            // Tentar novamente
            setTimeout(function() { s.configurarNavegacao(); }, 1000);
        }
        
        // Sino de notificações
        var sinos = document.querySelectorAll('[onclick*="notif"], [onclick*="Notif"], .fa-bell, .sino');
        for (var j = 0; j < sinos.length; j++) {
            sinos[j].onclick = function(e) { e.preventDefault(); s.mostrarNotificacoes(); };
            sinos[j].style.cursor = 'pointer';
        }
        
        // Links de login/cadastro
        var links = document.querySelectorAll('a');
        for (var k = 0; k < links.length; k++) {
            var link = links[k];
            var href = link.getAttribute('href') || '';
            if (href.indexOf('login') >= 0 || link.textContent.toLowerCase().indexOf('login') >= 0) {
                link.onclick = function(e) { e.preventDefault(); s.mostrarTela('loginScreen'); };
            }
            if (href.indexOf('cadastr') >= 0 || link.textContent.toLowerCase().indexOf('cadastr') >= 0) {
                link.onclick = function(e) { e.preventDefault(); s.mostrarTela('cadastroScreen'); };
            }
        }
        
    }, 500);
};

// ===== MOSTRAR TELA =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Mostrando:', id);
    
    // Garantir que splash sumiu
    var splash = document.getElementById('splashScreen');
    if (splash) splash.remove();
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    // Esconder todas
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
    
    // Carregar conteúdo
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.carregarBusca();
    if (id === 'loginScreen') s.carregarLogin();
    if (id === 'cadastroScreen') s.carregarCadastro();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
};

App.prototype.voltarTela = function() {
    var splash = document.getElementById('splashScreen');
    if (splash) splash.remove();
    
    if (this.historicoTelas.length > 0) {
        var ant = this.historicoTelas.pop();
        this.telaAtual = null;
        this.mostrarTela(ant);
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== LOGIN =====
App.prototype.carregarLogin = function() {
    var tela = document.getElementById('loginScreen');
    if (!tela) return;
    
    tela.innerHTML = 
        '<div style="text-align:center;padding:40px 20px;">' +
        '<div style="font-size:60px;">🏗️</div>' +
        '<h1 style="color:#1A3A5C;">LPXCONSTRUTOR</h1>' +
        '<div style="margin-top:30px;">' +
        '<input id="loginEmail" type="email" placeholder="Email" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;font-size:16px;">' +
        '<input id="loginSenha" type="password" placeholder="Senha" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:15px;box-sizing:border-box;font-size:16px;">' +
        '<button onclick="appInstancia.fazerLogin()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-size:18px;font-weight:bold;cursor:pointer;">ENTRAR</button>' +
        '</div>' +
        '<p style="margin-top:20px;">Não tem conta? <a href="#" onclick="appInstancia.mostrarTela(\'cadastroScreen\')" style="color:#f59e0b;">Cadastre-se</a></p>' +
        '</div>';
};

App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value?.trim() || '';
    
    if (!email || !senha) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === email.toLowerCase() && usuarios[i].senha === senha) {
            s.usuarioLogado = usuarios[i];
            localStorage.setItem('usuarioLPX', JSON.stringify(usuarios[i]));
            s.historicoTelas = [];
            s.mostrarToast('Bem-vindo!', 'sucesso');
            s.mostrarTela('homeScreen');
            return;
        }
    }
    s.mostrarToast('Email ou senha incorretos!', 'erro');
};

// ===== CADASTRO =====
App.prototype.carregarCadastro = function() {
    var tela = document.getElementById('cadastroScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'cadastroScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="text-align:center;padding:40px 20px;">' +
        '<h1 style="color:#1A3A5C;">📝 CADASTRO</h1>' +
        '<input id="cadNome" placeholder="Nome completo" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="cadEmail" type="email" placeholder="Email" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="cadSenha" type="password" placeholder="Senha" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;">' +
        '<select id="cadTipo" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;">' +
        '<option value="profissional">👷 Profissional</option><option value="empreiteiro">🏢 Empreiteiro</option></select>' +
        '<input id="cadProfissao" placeholder="Profissão" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="cadCelular" placeholder="Celular" style="width:100%;padding:15px;border:1px solid #ddd;border-radius:10px;margin-bottom:15px;box-sizing:border-box;">' +
        '<button onclick="appInstancia.cadastrar()" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-size:18px;font-weight:bold;cursor:pointer;">CADASTRAR</button>' +
        '<p style="margin-top:20px;">Já tem conta? <a href="#" onclick="appInstancia.mostrarTela(\'loginScreen\')" style="color:#f59e0b;">Faça login</a></p>' +
        '</div>';
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
        experiencia: '0',
        score: 0,
        fotoPerfil: null
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('Preencha todos os campos!', 'erro'); return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === dados.email.toLowerCase()) {
            s.mostrarToast('Email já cadastrado!', 'erro'); return;
        }
    }
    
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.historicoTelas = [];
    s.mostrarToast('Cadastro realizado!', 'sucesso');
    s.mostrarTela('homeScreen');
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
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
    
    home.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;">' +
        '<span style="font-size:16px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span>' +
        '<span style="float:right;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span>' +
        '</div>' +
        '<div style="display:flex;background:white;padding:8px;gap:5px;">' +
        '<button id="tabFeed" onclick="appInstancia.carregarFeed()" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>' +
        '<button id="tabRede" onclick="appInstancia.carregarRede()" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>' +
        '</div>' +
        '<div id="feedContainer" style="padding:10px;"></div>';
    
    s.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this;
    var c = document.getElementById('feedContainer');
    if (!c) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    if (vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="appInstancia.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        var destaque = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + (destaque ? 'border:3px solid #f59e0b;' : '') + '">';
        if (destaque) html += '<span style="background:#f59e0b;color:white;padding:3px 10px;border-radius:10px;font-size:11px;">⭐ SUA OBRA</span> ';
        if (destaque) html += '<button onclick="appInstancia.apagarObra(\'' + v.id + '\')" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button>';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin:8px 0;">';
        html += '<div style="font-weight:bold;font-size:16px;">' + v.titulo + '</div>';
        html += '<div style="color:#666;">📍 ' + v.endereco + '</div>';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div>';
    }
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid) {
    if (!confirm('Apagar esta obra?')) return;
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
    var c = document.getElementById('feedContainer');
    if (!c) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhas = [];
    for (var i = 0; i < conexoes.length; i++) {
        if (conexoes[i].usuarioId === s.usuarioLogado.id || conexoes[i].amigoId === s.usuarioLogado.id) {
            minhas.push(conexoes[i]);
        }
    }
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;"><div style="font-size:50px;">🔗</div><h3>Rede vazia</h3><button onclick="appInstancia.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>';
        return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var html = '';
    for (var i = 0; i < minhas.length; i++) {
        var amigoId = minhas[i].usuarioId === s.usuarioLogado.id ? minhas[i].amigoId : minhas[i].usuarioId;
        var amigo = null;
        for (var j = 0; j < usuarios.length; j++) {
            if (usuarios[j].id === amigoId) { amigo = usuarios[j]; break; }
        }
        if (amigo) {
            html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">';
            html += '<strong>' + amigo.nome + '</strong> - ' + (amigo.profissao || 'Profissional');
            html += '</div>';
        }
    }
    c.innerHTML = html;
    
    // Atualizar botões
    document.getElementById('tabFeed').style.background = '#e5e7eb';
    document.getElementById('tabFeed').style.color = '#1A3A5C';
    document.getElementById('tabRede').style.background = '#1A3A5C';
    document.getElementById('tabRede').style.color = 'white';
};

// ===== BUSCA =====
App.prototype.carregarBusca = function() {
    var s = this;
    var tela = document.getElementById('buscaScreen');
    if (!tela) return;
    
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var profissionais = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== s.usuarioLogado?.id) {
            profissionais.push(todos[i]);
        }
    }
    
    var html = '<div style="background:#1A3A5C;color:white;padding:15px;">🔍 Buscar Profissionais</div>';
    
    if (profissionais.length === 0) {
        html += '<div style="text-align:center;padding:40px;"><div style="font-size:50px;">👷</div><h3>Nenhum profissional</h3></div>';
    } else {
        for (var i = 0; i < profissionais.length; i++) {
            var p = profissionais[i];
            html += '<div style="background:white;border-radius:10px;padding:12px;margin:10px;display:flex;align-items:center;gap:10px;">';
            html += '<div style="font-size:30px;">👷</div>';
            html += '<div style="flex:1;"><strong>' + p.nome + '</strong><br><small>' + (p.profissao || '') + '</small></div>';
            html += '<button onclick="appInstancia.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;padding:8px 12px;border-radius:15px;cursor:pointer;">+</button>';
            html += '</div>';
        }
    }
    
    tela.innerHTML = html;
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="font-size:60px;">👷</div>' +
        '<h2>' + user.nome + '</h2>' +
        '<p>' + (user.profissao || user.tipo) + '</p>' +
        '</div>' +
        '<div style="padding:20px;">' +
        '<p><strong>Email:</strong> ' + user.email + '</p>' +
        '<p><strong>Tipo:</strong> ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p>' +
        '<button onclick="appInstancia.sair()" style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;margin-top:20px;cursor:pointer;">🚪 Sair</button>' +
        '</div>';
};

// ===== PUBLICAR =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="padding:20px;">' +
        '<h2 style="text-align:center;">📢 PUBLICAR OBRA</h2>' +
        '<input id="pubTitulo" placeholder="Título" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">' +
        '<input id="pubEndereco" placeholder="Endereço" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">' +
        '<input id="pubProfissoes" placeholder="Profissões" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">' +
        '<input id="pubValor" type="number" placeholder="Valor/hora" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;">' +
        '<button onclick="appInstancia.publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">📢 PUBLICAR</button>' +
        '<button onclick="appInstancia.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button>' +
        '</div>';
    
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVaga = function() {
    var s = this;
    var titulo = document.getElementById('pubTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('pubEndereco')?.value?.trim() || '';
    var profissoes = document.getElementById('pubProfissoes')?.value?.trim() || 'Geral';
    var valor = document.getElementById('pubValor')?.value?.trim() || '';
    
    if (!titulo || !endereco || !valor) {
        s.mostrarToast('Preencha todos os campos!', 'erro'); return;
    }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: valor,
        fotoObra: null, status: 'disponivel',
        autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome,
        dataCriacao: new Date().toISOString()
    };
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    s.mostrarToast('✅ Obra publicada!', 'sucesso');
    s.mostrarTela('homeScreen');
    s.carregarFeed();
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var tela = document.getElementById('minhasObrasScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'minhasObrasScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].autorId === s.usuarioLogado?.id) minhas.push(vagas[i]);
    }
    
    var html = '<div style="background:#1A3A5C;color:white;padding:15px;">🏗️ Minhas Obras</div>';
    
    if (minhas.length === 0) {
        html += '<div style="text-align:center;padding:40px;"><h3>Nenhuma obra</h3></div>';
    } else {
        for (var i = 0; i < minhas.length; i++) {
            var v = minhas[i];
            html += '<div style="background:white;border-radius:10px;padding:12px;margin:10px;">';
            html += '<strong>' + v.titulo + '</strong><br>';
            html += '<small>📍 ' + v.endereco + '</small><br>';
            html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
            html += '</div>';
        }
    }
    
    tela.innerHTML = html;
    s.mostrarTela('minhasObrasScreen');
};

// ===== NOTIFICAÇÕES =====
App.prototype.mostrarNotificacoes = function() {
    var s = this;
    var html = '<div id="modalNotif" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    html += '<div style="background:#1A3A5C;color:white;padding:15px;"><h3>🔔 Notificações</h3></div>';
    html += '<div style="padding:20px;text-align:center;"><div style="font-size:50px;">🔔</div><p>Nenhuma notificação</p></div>';
    html += '<button onclick="document.getElementById(\'modalNotif\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;">Fechar</button>';
    html += '</div></div>';
    
    var antigo = document.getElementById('modalNotif');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
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
    
    conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('Adicionado!', 'sucesso');
};

App.prototype.mostrarToast = function(m, t) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:' + (t === 'erro' ? '#EF4444' : '#10B981') + ';color:white;padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;';
    toast.textContent = m;
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    // Remover splash antigo
    var s = document.getElementById('splashScreen');
    if (s) s.remove();
    
    appInstancia = new App();
    console.log('✅ LPXCONSTRUTOR PRONTO!');
    console.log('📱 Para navegar, use os botões do menu inferior');
    console.log('👆 Ou chame diretamente: appInstancia.mostrarTela("homeScreen")');
});
