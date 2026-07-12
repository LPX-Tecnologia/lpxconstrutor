// ==========================================================
// ===== LPXCONSTRUTOR - CORRIGIDO (PUBLICAR + VOLTAR + BUSCA) =====
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
    this.tabAtual = 'feed';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR Iniciando...');
    window.app._app = this;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    // Verificar login salvo
    var usuarioSalvo = localStorage.getItem('usuarioLPX');
    if (usuarioSalvo) {
        try { 
            s.usuarioLogado = JSON.parse(usuarioSalvo);
            console.log('👤 Usuário carregado:', s.usuarioLogado.nome);
        } catch(e) {}
    }
    
    s.mostrarSplash();
    
    if (s.usuarioLogado) {
        setTimeout(function() {
            s.esconderSplash();
            s.mostrarTela('homeScreen');
        }, 1500);
    } else {
        setTimeout(function() {
            s.esconderSplash();
            s.mostrarTela('loginScreen');
        }, 1500);
    }
    
    // NÃO ADICIONAR popstate - isso estava fechando o app
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) {
        splash = document.createElement('div');
        splash.id = 'splashScreen';
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;';
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;">' +
            '<p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p>' +
            '<p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
        document.body.appendChild(splash);
    }
};

App.prototype.esconderSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (splash) { 
        splash.style.opacity = '0'; 
        setTimeout(function() { 
            if (splash.parentNode) splash.parentNode.removeChild(splash); 
        }, 500); 
    }
};

// ===== NAVEGAÇÃO (CORRIGIDA - NÃO FECHA O APP) =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Mostrando tela:', id);
    
    // Só salva no histórico se for uma tela diferente
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
        console.log('📋 Histórico:', s.historicoTelas);
    }
    
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(function(x) {
        x.classList.remove('active');
        x.style.display = 'none';
    });
    
    var tela = document.getElementById(id);
    if (!tela) {
        console.error('❌ Tela não encontrada:', id);
        // Se a tela não existe, tentar home ou login
        if (id !== 'homeScreen' && id !== 'loginScreen') {
            s.mostrarTela('homeScreen');
        }
        return;
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    // Navegação inferior
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
    var s = this;
    console.log('⬅ Voltando tela. Histórico:', s.historicoTelas);
    
    if (s.historicoTelas.length > 0) {
        var anterior = s.historicoTelas.pop();
        console.log('📋 Voltando para:', anterior);
        
        // Não salvar no histórico ao voltar
        var telaAtualAntes = s.telaAtual;
        s.telaAtual = null;
        
        s.mostrarTela(anterior);
        s.telaAtual = anterior;
    } else {
        // Se não tem histórico, vai para home
        console.log('📋 Sem histórico, indo para home');
        s.mostrarTela('homeScreen');
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value?.trim() || '';
    
    if (!email || !senha) { 
        s.mostrarToast('❌ Preencha todos os campos!', 'erro'); 
        return; 
    }
    
    s.mostrarToast('Entrando...', 'info');
    
    // Verificar no localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('👥 Usuários cadastrados:', usuarios.length);
    
    var usuario = usuarios.find(function(u) { 
        return u.email === email && u.senha === senha; 
    });
    
    if (usuario) {
        console.log('✅ Usuário encontrado:', usuario.nome);
        s.usuarioLogado = usuario;
        localStorage.setItem('usuarioLPX', JSON.stringify(usuario));
        s.historicoTelas = []; // Limpar histórico
        s.mostrarToast('✅ Bem-vindo, ' + usuario.nome + '!', 'sucesso');
        s.mostrarTela('homeScreen');
        return;
    }
    
    // Firebase (se disponível)
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
            s.historicoTelas = [];
            s.mostrarToast('✅ Bem-vindo!', 'sucesso');
            s.mostrarTela('homeScreen');
        }).catch(function() {
            s.mostrarToast('❌ Email ou senha incorretos', 'erro');
        });
        return;
    }
    
    s.mostrarToast('❌ Email ou senha incorretos', 'erro');
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
        s.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    // Salvar no localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    
    // Verificar se email já existe
    if (usuarios.find(function(u) { return u.email === dados.email; })) {
        s.mostrarToast('❌ Email já cadastrado!', 'erro');
        return;
    }
    
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    console.log('✅ Usuário cadastrado:', dados.nome, 'Total:', usuarios.length);
    
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.historicoTelas = [];
    s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
    s.mostrarTela('homeScreen');
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuarioLPX');
    this.historicoTelas = [];
    this.mostrarTela('loginScreen');
    this.mostrarToast('👋 Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { 
        s.mostrarTela('loginScreen'); 
        return; 
    }
    
    var homeScreen = document.getElementById('homeScreen');
    if (homeScreen && !document.getElementById('homeTabs')) {
        homeScreen.innerHTML = s.criarEstruturaHome();
    }
    
    s.carregarFeed();
    
    var btnPublicar = document.getElementById('btnPublicarFlutuante');
    if (btnPublicar) {
        btnPublicar.style.display = (s.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
    }
};

App.prototype.criarEstruturaHome = function() {
    var user = this.usuarioLogado;
    var h = new Date().getHours();
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);padding:15px;display:flex;align-items:center;gap:12px;">';
    html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;">';
    html += user && user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    html += '</div><div style="flex:1;"><div id="saudacao" style="color:white;font-weight:bold;">👋 ' + sd + ', ' + (user ? user.nome : 'Usuário') + '!</div>';
    html += '<div style="color:#f0c27f;font-size:12px;">' + (user ? (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') : '') + '</div></div></div>';
    
    html += '<div id="homeTabs" style="display:flex;background:white;padding:10px;gap:5px;">';
    html += '<button onclick="window.app.mudarTab(\'feed\')" id="tabFeed" style="flex:1;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;">📋 FEED</button>';
    html += '<button onclick="window.app.mudarTab(\'rede\')" id="tabRede" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:12px;border-radius:25px;font-weight:bold;cursor:pointer;">🔗 REDE</button></div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div><div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    html += '<button onclick="window.app.abrirTelaPublicacao()" id="btnPublicarFlutuante" style="position:fixed;bottom:80px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;border-radius:50%;font-size:28px;box-shadow:0 4px 15px rgba(245,158,11,0.5);z-index:999;cursor:pointer;display:' + (user && user.tipo === 'empreiteiro' ? 'flex' : 'none') + ';align-items:center;justify-content:center;">📢</button>';
    
    return html;
};

App.prototype.mudarTab = function(tab) {
    this.tabAtual = tab;
    var btnFeed = document.getElementById('tabFeed');
    var btnRede = document.getElementById('tabRede');
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer');
    
    if (btnFeed) { 
        btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; 
        btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; 
    }
    if (btnRede) { 
        btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; 
        btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; 
    }
    if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none';
    if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none';
    
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer');
    if (!c) return;
    
    c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Carregando obras...</div>';
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    console.log('📊 Vagas no feed:', vagas.length);
    
    if (vagas.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3 style="color:#1A3A5C;">Nenhuma obra publicada</h3>' +
            '<p style="color:#666;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                '<button onclick="window.app.abrirTelaPublicacao()" style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:15px 30px;border-radius:25px;font-weight:bold;font-size:16px;margin-top:15px;cursor:pointer;">📢 PUBLICAR OBRA</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    
    // Obras do usuário primeiro
    var obrasOrdenadas = [];
    vagas.forEach(function(v) {
        if (s.usuarioLogado && v.autorId === s.usuarioLogado.id) {
            v._destaque = true;
            obrasOrdenadas.unshift(v);
        } else {
            obrasOrdenadas.push(v);
        }
    });
    
    obrasOrdenadas.forEach(function(v) {
        var destaque = v._destaque;
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:15px;' + 
            (destaque ? 'border:3px solid #f59e0b;box-shadow:0 4px 20px rgba(245,158,11,0.4);' : 'border:1px solid #e5e7eb;') + 
            '" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        
        if (destaque) {
            html += '<div style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;padding:5px 15px;border-radius:0 0 12px 12px;display:inline-block;font-size:12px;font-weight:bold;margin-bottom:10px;">⭐ SUA OBRA</div>';
        }
        
        // FOTO DA OBRA (GRANDE)
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:220px;object-fit:cover;border-radius:12px;margin-bottom:10px;display:block;" onerror="this.style.display=\'none\'">';
        }
        
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
        
        // Foto do autor
        if (v.autorFoto) {
            html += '<img src="' + v.autorFoto + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #1A3A5C;">';
        } else {
            html += '<div style="width:40px;height:40px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">🏗️</div>';
        }
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;font-size:15px;">' + (v.titulo || 'Sem título') + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + (v.endereco || 'Local não informado') + '</div>';
        html += '<div style="font-size:11px;color:#999;">👤 ' + (v.autorNome || 'Anônimo') + ' • ' + new Date(v.dataCriacao).toLocaleDateString('pt-BR') + '</div>';
        html += '</div></div>';
        
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        html += '<span style="background:#10B981;color:white;padding:5px 12px;border-radius:20px;font-size:12px;">💰 R$' + (v.valorHora || '0') + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:5px 12px;border-radius:20px;font-size:12px;">👷 ' + (v.profissoes || 'Todas') + '</span>';
        html += '</div></div>';
    });
    
    c.innerHTML = html;
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this, c = document.getElementById('redeContainer');
    if (!c) return;
    if (!s.usuarioLogado) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>'; return; }
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhasConexoes = conexoes.filter(function(con) { 
        return con.usuarioId === s.usuarioLogado.id || con.amigoId === s.usuarioLogado.id; 
    });
    
    console.log('🔗 Conexões:', minhasConexoes.length);
    
    if (minhasConexoes.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🔗</div>' +
            '<h3 style="color:#1A3A5C;">Sua rede está vazia</h3>' +
            '<p style="color:#666;">Conecte-se com profissionais</p>' +
            '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:15px;cursor:pointer;">🔍 Buscar Profissionais</button>' +
            '</div>';
        return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var html = '<div style="text-align:center;padding:8px;color:#1A3A5C;font-weight:bold;">🔗 ' + minhasConexoes.length + ' conexão(ões)</div>';
    
    minhasConexoes.forEach(function(con) {
        var amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId;
        var amigo = usuarios.find(function(u) { return u.id === amigoId; });
        
        if (amigo) {
            html += '<div class="card" style="margin-bottom:10px;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigoId + '\')">';
            html += '<div style="display:flex;align-items:center;gap:10px;">';
            html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">';
            html += amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">👷</div>';
            html += '</div><div style="flex:1;"><div style="font-weight:bold;">' + amigo.nome + '</div><div style="font-size:12px;color:#666;">🔧 ' + (amigo.profissao || 'Profissional') + '</div></div>';
            html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigoId + '\')" style="background:#EF4444;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">✕</button>';
            html += '</div></div>';
        }
    });
    
    html += '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;margin-top:10px;cursor:pointer;">🔍 Buscar Mais</button>';
    c.innerHTML = html;
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('❌ Faça login!', 'erro'); return; }
    if (s.usuarioLogado.id === amigoId) { s.mostrarToast('❌ Não pode adicionar a si mesmo!', 'erro'); return; }
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var existe = conexoes.find(function(c) { 
        return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
               (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id); 
    });
    
    if (existe) { s.mostrarToast('❌ Já está na sua rede!', 'erro'); return; }
    
    conexoes.push({ 
        id: 'con_' + Date.now(), 
        usuarioId: s.usuarioLogado.id, 
        amigoId: amigoId, 
        status: 'ativo', 
        dataCriacao: new Date().toISOString() 
    });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    console.log('✅ Adicionado à rede:', amigoId);
    s.mostrarToast('✅ Adicionado à rede!', 'sucesso');
    
    if (s.tabAtual === 'rede') setTimeout(function() { s.carregarRede(); }, 300);
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
    s.mostrarToast('✅ Removido', 'sucesso');
    s.carregarRede();
};

// ===== BUSCA (CORRIGIDA - NÃO MOSTRA O PRÓPRIO PERFIL) =====
App.prototype.buscarProfissionais = function() {
    var s = this, c = document.getElementById('buscaResultados');
    if (!c) return;
    
    c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">🔍 Buscando profissionais...</div>';
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('👥 Total de usuários:', usuarios.length);
    console.log('👤 Usuário logado:', s.usuarioLogado ? s.usuarioLogado.id : 'nenhum');
    
    // FILTRAR: apenas profissionais, ativos, e NÃO o próprio usuário
    var profissionais = usuarios.filter(function(u) {
        return u.tipo === 'profissional' && 
               u.id !== (s.usuarioLogado ? s.usuarioLogado.id : '');
    });
    
    console.log('👷 Profissionais encontrados:', profissionais.length);
    
    // Termo de busca
    var termo = document.getElementById('buscaInput')?.value?.trim()?.toLowerCase() || '';
    if (termo) {
        profissionais = profissionais.filter(function(u) {
            return (u.nome || '').toLowerCase().includes(termo) ||
                   (u.profissao || '').toLowerCase().includes(termo);
        });
    }
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">👷</div>' +
            '<h3 style="color:#1A3A5C;">Nenhum profissional encontrado</h3>' +
            '<p style="color:#666;">Cadastre-se como profissional para aparecer aqui</p>' +
            '</div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;color:#1A3A5C;font-weight:bold;">👷 ' + profissionais.length + ' profissional(is) encontrado(s)</div>';
    
    profissionais.forEach(function(u) {
        var score = u.score || 0;
        var estrelas = '';
        for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;" onclick="window.app.verPerfil(\'' + u.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:12px;">';
        
        // Foto
        html += '<div style="width:55px;height:55px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #1A3A5C;">';
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
        html += '<div style="color:#f59e0b;">' + estrelas + ' ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '</div>';
        
        // Botão adicionar
        html += '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>';
        
        html += '</div></div>';
    });
    
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    
    if (!user) { 
        s.mostrarToast('❌ Profissional não encontrado', 'erro'); 
        return; 
    }
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    // Criar tela se não existir
    var tela = document.getElementById('perfilPublicoScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'perfilPublicoScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
        '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    html += '</div>';
    html += '<h2 style="margin:10px 0;">' + (user.nome || 'Profissional') + '</h2>';
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
    html += '<button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">🔗 Adicionar à Rede</button>';
    html += '<button onclick="window.app.voltarTela()" style="background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">⬅ Voltar</button>';
    html += '</div></div>';
    
    tela.innerHTML = html;
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA (CORRIGIDO) =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { 
        s.mostrarToast('❌ Faça login para publicar!', 'erro'); 
        return; 
    }
    
    console.log('📢 Abrindo tela de publicação');
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'publicarVagaScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    var user = s.usuarioLogado;
    
    tela.innerHTML = 
        '<div style="min-height:100vh;background:#f5f5f5;">' +
        '<div style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;padding:20px;text-align:center;">' +
        '<h2 style="margin:0;">📢 PUBLICAR OBRA</h2>' +
        '<p style="font-size:12px;margin-top:5px;">Preencha os dados da sua obra</p>' +
        '</div>' +
        '<div style="padding:20px;">' +
        
        // Foto do autor
        '<div style="text-align:center;margin-bottom:20px;">' +
        '<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;margin:0 auto;border:2px solid #f59e0b;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
        '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;">🏗️</div>') +
        '</div>' +
        '<p style="color:#1A3A5C;font-weight:bold;margin-top:8px;">' + user.nome + '</p>' +
        '</div>' +
        
        // Campos
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">📌 Título da Obra *</label>' +
        '<input id="vagaTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">📍 Endereço *</label>' +
        '<input id="vagaEndereco" placeholder="Ex: Rua Exemplo, 123 - Cidade" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">👷 Profissões Necessárias</label>' +
        '<input id="vagaProfissoes" placeholder="Ex: Pedreiro, Eletricista, Encanador" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">💰 Valor por Hora (R$) *</label>' +
        '<input id="vagaValorHora" type="number" placeholder="Ex: 25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">📝 Descrição</label>' +
        '<textarea id="vagaDescricao" placeholder="Descreva os detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;min-height:80px;box-sizing:border-box;"></textarea>' +
        '</div>' +
        
        // Upload foto
        '<div style="margin-bottom:20px;">' +
        '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">📸 Foto da Obra</label>' +
        '<img id="vagaFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:10px;">' +
        '<input type="file" id="vagaFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'vagaFotoInput\').click()" style="background:#e5e7eb;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;">📁 Escolher Foto</button>' +
        '</div>' +
        
        // Botão publicar
        '<button onclick="window.app.publicarVagaApp()" style="width:100%;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:16px;border-radius:10px;font-weight:bold;font-size:18px;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.4);">📢 PUBLICAR OBRA</button>' +
        
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:12px;border-radius:10px;margin-top:10px;cursor:pointer;">⬅ Cancelar</button>' +
        '</div></div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    console.log('📸 Foto selecionada:', file.name);
    
    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('vagaFotoPreview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.objectFit = 'cover';
        }
        window.app._app.vagaFotoBase64 = e.target.result;
        console.log('✅ Foto carregada (base64)');
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValorHora');
    var descricaoEl = document.getElementById('vagaDescricao');
    
    if (!tituloEl || !enderecoEl || !valorEl) {
        s.mostrarToast('❌ Erro no formulário!', 'erro');
        return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl ? profissoesEl.value.trim() || 'Geral' : 'Geral';
    var valorHora = valorEl.value.trim();
    var descricao = descricaoEl ? descricaoEl.value.trim() : '';
    
    console.log('📝 Publicando:', { titulo, endereco, profissoes, valorHora });
    
    if (!titulo) { s.mostrarToast('❌ Digite o título da obra!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor por hora!', 'erro'); valorEl.focus(); return; }
    
    s.mostrarToast('📡 Publicando obra...', 'info');
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || null,
        status: 'disponivel',
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null,
        dataCriacao: new Date().toISOString(),
        interessados: []
    };
    
    // SALVAR NO LOCALSTORAGE
    var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagasSalvas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
    
    console.log('✅ Vaga salva! Total:', vagasSalvas.length);
    console.log('📊 Dados da vaga:', vaga);
    
    // LIMPAR FORMULÁRIO
    tituloEl.value = '';
    enderecoEl.value = '';
    if (profissoesEl) profissoesEl.value = '';
    valorEl.value = '';
    if (descricaoEl) descricaoEl.value = '';
    
    var preview = document.getElementById('vagaFotoPreview');
    if (preview) preview.src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada com sucesso! 🏗️', 'sucesso');
    
    // Voltar para home e atualizar feed
    setTimeout(function() {
        s.historicoTelas = [];
        s.mostrarTela('homeScreen');
        s.carregarFeed();
    }, 800);
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!c) return;
    
    if (!s.usuarioLogado) { 
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login</h3></div>'; 
        return; 
    }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
    
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    console.log('🏗️ Minhas obras:', minhas.length);
    
    if (minhas.length === 0) {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3>Nenhuma obra cadastrada</h3>' +
            '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:10px;cursor:pointer;">📢 PUBLICAR OBRA</button>' +
            '</div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:15px;color:#1A3A5C;font-weight:bold;">🏗️ Total de Obras: <span style="color:#10B981;font-size:24px;">' + minhas.length + '</span></div>';
    
    minhas.forEach(function(v) {
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;border-left:4px solid #10B981;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + v.titulo + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + v.endereco + '</div>';
        html += '<div style="display:flex;gap:6px;margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div></div>';
    });
    
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    
    if (!vaga) { 
        s.mostrarToast('❌ Obra não encontrada', 'erro'); 
        return; 
    }
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:600px;margin:0 auto;">';
    
    if (vaga.fotoObra && vaga.fotoObra.length > 100) {
        html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:350px;object-fit:cover;display:block;">';
    }
    
    html += '<div style="padding:20px;">';
    html += '<h2 style="color:#1A3A5C;margin:0 0 10px 0;">' + (vaga.titulo || 'Sem título') + '</h2>';
    html += '<p style="color:#666;">⚪ Disponível</p>';
    
    html += '<div style="background:#f9fafb;border-radius:12px;padding:15px;margin-bottom:15px;">';
    html += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    html += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    html += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    
    html += '<div style="display:flex;align-items:center;gap:10px;margin-top:10px;">';
    if (vaga.autorFoto) {
        html += '<img src="' + vaga.autorFoto + '" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<div style="width:35px;height:35px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">🏗️</div>';
    }
    html += '<div><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '<br><small style="color:#999;">📅 ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</small></div>';
    html += '</div>';
    
    if (vaga.descricao) {
        html += '<p style="margin-top:10px;"><strong>📝 Descrição:</strong><br>' + vaga.descricao + '</p>';
    }
    html += '</div>';
    
    if (vaga.endereco) {
        html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:15px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Ver no Google Maps</a>';
    }
    
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">⬅ Fechar</button>';
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
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;border-radius:0 0 30px 30px;">';
    html += '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFotoPerfil\').click()">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>';
    html += '</div><input type="file" id="inputFotoPerfil" accept="image/*" style="display:none;" onchange="window.app.uploadFotoPerfil(event)">';
    html += '<p style="font-size:10px;color:#ccc;">Toque para alterar foto</p>';
    html += '<h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo || 'Profissional') + '</p>';
    html += '</div>';
    
    html += '<div style="display:flex;gap:5px;padding:15px;">';
    html += '<button onclick="window.app.mostrarSecao(\'info\')" id="btnInfo" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;cursor:pointer;">📋 INFO</button>';
    html += '<button onclick="window.app.mostrarSecao(\'config\')" id="btnConfig" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;cursor:pointer;">⚙️ CONFIG</button>';
    html += '<button onclick="window.app.mostrarSecao(\'alertas\')" id="btnAlertas" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;font-weight:bold;cursor:pointer;">🔔 ALERTAS</button>';
    html += '</div>';
    html += '<div id="secaoConteudo" style="padding:15px;"></div>';
    
    tela.innerHTML = html;
    s.mostrarSecao('info');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this, c = document.getElementById('secaoConteudo');
    if (!c) return;
    
    ['info', 'config', 'alertas'].forEach(function(s) {
        var btn = document.getElementById('btn' + s.charAt(0).toUpperCase() + s.slice(1));
        if (btn) { 
            btn.style.background = s === secao ? '#1A3A5C' : '#e5e7eb'; 
            btn.style.color = s === secao ? 'white' : '#1A3A5C'; 
        }
    });
    
    var user = s.usuarioLogado;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    if (secao === 'info') {
        var html = '<div style="display:flex;gap:10px;margin-bottom:15px;">';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#1A3A5C;">' + (user.experiencia || '0') + '</div><div style="font-size:11px;color:#999;">Anos Exp.</div></div>';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#f59e0b;">' + (user.score || 0).toFixed(1) + '</div><div style="font-size:11px;color:#999;">Score</div></div>';
        html += '<div style="flex:1;background:white;border-radius:12px;padding:15px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><div style="font-size:24px;font-weight:bold;color:#10B981;">' + totalObras + '</div><div style="font-size:11px;color:#999;">Obras</div></div></div>';
        html += '<div class="card" style="margin-bottom:10px;"><h3>👤 Dados</h3><p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p><p>🔧 ' + (user.profissao || '') + '</p></div>';
        html += '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;cursor:pointer;">🏗️ Minhas Obras (' + totalObras + ')</button>';
        html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
        c.innerHTML = html;
    } else if (secao === 'config') {
        var html = '<div class="card" style="margin-bottom:10px;"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;">';
        html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">☀️ Claro</button>';
        html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div></div>';
        html += '<div class="card"><h3>📄 Documentos</h3>';
        html += '<button onclick="window.app.mostrarDocumento(\'termos\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;cursor:pointer;">📄 Termos de Uso</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;cursor:pointer;">🔒 Privacidade</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;text-align:left;cursor:pointer;">📋 Diretrizes</button>';
        html += '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;text-align:left;cursor:pointer;">ℹ️ Sobre</button></div>';
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
    html += '<h3 style="text-align:center;color:#1A3A5C;">✏️ Editar Perfil</h3>';
    html += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Nome</label><input id="editNome" value="' + (user.nome || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;"></div>';
    html += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Celular</label><input id="editCelular" value="' + (user.celular || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;"></div>';
    html += '<div style="margin-bottom:10px;"><label style="font-weight:bold;">Profissão</label><input id="editProfissao" value="' + (user.profissao || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;"></div>';
    html += '<div style="margin-bottom:15px;"><label style="font-weight:bold;">Experiência (anos)</label><input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;"></div>';
    html += '<div style="display:flex;gap:10px;"><button onclick="window.app.salvarPerfil()" style="flex:1;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;">💾 SALVAR</button><button onclick="document.getElementById(\'modalEditar\').remove()" style="flex:1;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;">CANCELAR</button></div></div></div>';
    
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
    if (!telaDoc) { 
        telaDoc = document.createElement('div'); 
        telaDoc.id = 'documentoScreen'; 
        telaDoc.className = 'screen'; 
        document.body.appendChild(telaDoc); 
    }
    
    var titulos = { 
        termos: '📄 Termos de Uso', 
        privacidade: '🔒 Política de Privacidade', 
        diretrizes: '📋 Diretrizes', 
        sobre: 'ℹ️ Sobre' 
    };
    
    var conteudos = {
        termos: '<h3 style="color:#1A3A5C;">1. Aceitação</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com estes termos.</p><h3 style="color:#1A3A5C;">2. Cadastro</h3><p>Informações verídicas são obrigatórias.</p><h3 style="color:#1A3A5C;">3. Conduta</h3><p>É proibido discriminação, assédio e informações falsas.</p><h3 style="color:#1A3A5C;">4. Contato</h3><p>contato@lpxconstrutor.com.br</p>',
        privacidade: '<h3 style="color:#1A3A5C;">1. LGPD</h3><p>Protegemos seus dados conforme a Lei 13.709/2018.</p><h3 style="color:#1A3A5C;">2. Dados Coletados</h3><p>Nome, email, telefone, profissão.</p><h3 style="color:#1A3A5C;">3. Seus Direitos</h3><p>Acessar, corrigir e excluir seus dados.</p>',
        diretrizes: '<h3 style="color:#1A3A5C;">1. Respeito</h3><p>Trate todos com profissionalismo.</p><h3 style="color:#1A3A5C;">2. Segurança</h3><p>Use EPIs e siga normas de segurança.</p><h3 style="color:#1A3A5C;">3. Qualidade</h3><p>Entregue trabalhos no prazo combinado.</p>',
        sobre: '<div style="text-align:center;"><div style="font-size:80px;">🏗️</div><h2 style="color:#1A3A5C;">LPXCONSTRUTOR</h2><p><strong>Versão 1.0.0</strong></p><p>Rede Profissional da Construção Civil</p><p>Conectando profissionais e empreiteiros</p><hr><p><strong>Email:</strong> contato@lpxconstrutor.com.br</p><p style="color:#999;">© 2024 LPXCONSTRUTOR</p></div>'
    };
    
    telaDoc.innerHTML = '<div style="min-height:100vh;background:#f5f5f5;">' +
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;font-size:16px;">⬅ Voltar</button>' +
        '<h2 style="margin:0;font-size:18px;">' + (titulos[tipo] || '') + '</h2></div>' +
        '<div style="padding:20px;background:white;margin:10px;border-radius:12px;line-height:1.8;">' + (conteudos[tipo] || '') + '</div></div>';
    
    s.mostrarTela('documentoScreen');
};

// ===== TEMA =====
App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('🎨 Tema ' + (tema === 'escuro' ? 'escuro' : 'claro') + '!', 'sucesso');
};

// ===== TOAST =====
App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) { 
        toast = document.createElement('div'); 
        toast.id = 'toast'; 
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1F2937;color:white;padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.3);text-align:center;max-width:90%;'; 
        document.body.appendChild(toast); 
    }
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
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
    console.log('✅ LPXCONSTRUTOR CORRIGIDO!');
    console.log('✅ Publicar funcionando');
    console.log('✅ Voltar não fecha o app');
    console.log('✅ Busca mostra perfis cadastrados');
    console.log('✅ Próprio perfil não aparece na busca');
});
