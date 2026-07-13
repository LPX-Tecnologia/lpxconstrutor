// ==========================================================
// ===== LPXCONSTRUTOR - FUNCIONAL (BUSCA + PUBLICAÇÃO) =====
// ==========================================================

if (!window.app || !window.app._app) { 
    window.app = window.app || {}; 
    window.app._app = window.app._app || null; 
}

window.app = {
    _app: null,
    fazerLogin: function(){ window.app._app.fazerLogin(); },
    mostrarTela: function(id){ window.app._app.mostrarTela(id); },
    voltarTela: function(){ window.app._app.voltarTela(); },
    cadastrar: function(){ window.app._app.cadastrar(); },
    sair: function(){ window.app._app.sair(); },
    buscarProfissionais: function(){ window.app._app.buscarProfissionais(); },
    verPerfil: function(uid){ window.app._app.verPerfil(uid); },
    abrirTelaPublicacao: function(){ window.app._app.abrirTelaPublicacao(); },
    publicarVaga: function(){ window.app._app.publicarVaga(); },
    previewFotoObra: function(e){ window.app._app.previewFotoObra(e); },
    carregarMinhasObras: function(){ window.app._app.carregarMinhasObras(); },
    verDetalheObra: function(oid){ window.app._app.verDetalheObra(oid); },
    uploadFotoPerfil: function(e){ window.app._app.uploadFotoPerfil(e); },
    abrirEditarPerfil: function(){ window.app._app.abrirEditarPerfil(); },
    salvarPerfil: function(){ window.app._app.salvarPerfil(); },
    mostrarSecao: function(secao){ window.app._app.mostrarSecao(secao); },
    selecionarTema: function(t){ window.app._app.selecionarTema(t); },
    carregarRede: function(){ window.app._app.carregarRede(); },
    adicionarNaRede: function(uid){ window.app._app.adicionarNaRede(uid); },
    removerDaRede: function(uid){ window.app._app.removerDaRede(uid); },
    carregarFeed: function(){ window.app._app.carregarFeed(); },
    mostrarDocumento: function(tipo){ window.app._app.mostrarDocumento(tipo); },
    mudarTab: function(t){ window.app._app.mudarTab(t); }
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
    console.log('🚀 LPXCONSTRUTOR');
    window.app._app = this;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    // Verificar login
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) {
        try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {}
    }
    
    s.mostrarSplash();
    
    setTimeout(function() {
        s.esconderSplash();
        if (s.usuarioLogado) {
            s.mostrarTela('homeScreen');
        } else {
            s.mostrarTela('loginScreen');
        }
    }, 1500);
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) {
        splash = document.createElement('div');
        splash.id = 'splashScreen';
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;';
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;">' +
            '<p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p>';
        document.body.appendChild(splash);
    }
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
    
    document.querySelectorAll('.screen').forEach(function(x) { 
        x.classList.remove('active'); 
        x.style.display = 'none'; 
    });
    
    var tela = document.getElementById(id);
    if (!tela) {
        // Criar tela se não existir
        tela = document.createElement('div');
        tela.id = id;
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    // Bottom nav
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var mostrar = ['homeScreen','buscaScreen','meuPerfilScreen'];
        nav.style.display = mostrar.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    // Carregar conteúdo
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
};

App.prototype.voltarTela = function() {
    var s = this;
    if (s.historicoTelas.length > 0) {
        var anterior = s.historicoTelas.pop();
        var atual = s.telaAtual;
        s.telaAtual = null; // Evitar salvar no histórico
        s.mostrarTela(anterior);
    } else {
        s.mostrarTela('homeScreen');
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value?.trim() || '';
    
    if (!email || !senha) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    
    // Buscar no localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('Usuários cadastrados:', usuarios.length);
    
    var usuario = usuarios.find(function(u) { 
        return u.email.toLowerCase() === email.toLowerCase() && u.senha === senha; 
    });
    
    if (usuario) {
        s.usuarioLogado = usuario;
        localStorage.setItem('usuarioLPX', JSON.stringify(usuario));
        s.historicoTelas = [];
        s.mostrarToast('Bem-vindo, ' + usuario.nome + '!', 'sucesso');
        s.mostrarTela('homeScreen');
        return;
    }
    
    s.mostrarToast('Email ou senha incorretos!', 'erro');
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
        s.mostrarToast('Preencha todos os campos obrigatórios!', 'erro');
        return;
    }
    
    // SALVAR NO LOCALSTORAGE
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    
    // Verificar duplicado
    if (usuarios.find(function(u) { return u.email.toLowerCase() === dados.email.toLowerCase(); })) {
        s.mostrarToast('Email já cadastrado!', 'erro');
        return;
    }
    
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    
    console.log('✅ Usuário cadastrado:', dados.nome, '| Total:', usuarios.length);
    console.log('📋 Lista de usuários:', usuarios.map(function(u) { return u.nome + ' (' + u.tipo + ')'; }));
    
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
    this.mostrarToast('Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var user = s.usuarioLogado;
    var home = document.getElementById('homeScreen');
    
    var h = new Date().getHours();
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    home.innerHTML = 
        '<div style="background:#1A3A5C;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') +
        '</div>' +
        '<div style="color:white;font-weight:bold;">👋 ' + sd + ', ' + user.nome + '!</div>' +
        '</div>' +
        
        '<div style="display:flex;background:white;padding:10px;gap:5px;">' +
        '<button onclick="window.app.mudarTab(\'feed\')" id="tabFeed" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>' +
        '<button onclick="window.app.mudarTab(\'rede\')" id="tabRede" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>' +
        '</div>' +
        
        '<div id="feedContainer" style="padding:10px;"></div>' +
        '<div id="redeContainer" style="padding:10px;display:none;"></div>' +
        
        (user.tipo === 'empreiteiro' ? 
        '<button onclick="window.app.abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(245,158,11,0.5);z-index:999;cursor:pointer;">📢</button>' : '');
    
    s.carregarFeed();
};

App.prototype.mudarTab = function(tab) {
    this.tabAtual = tab;
    document.getElementById('tabFeed').style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb';
    document.getElementById('tabFeed').style.color = tab === 'feed' ? 'white' : '#1A3A5C';
    document.getElementById('tabRede').style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb';
    document.getElementById('tabRede').style.color = tab === 'rede' ? 'white' : '#1A3A5C';
    document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this;
    var c = document.getElementById('feedContainer');
    if (!c) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    console.log('Vagas no feed:', vagas.length);
    
    if (vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;margin-top:10px;">' +
            '<div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
            '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;margin-top:10px;cursor:pointer;">📢 PUBLICAR</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    vagas.forEach(function(v) {
        var destaque = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + 
            (destaque ? 'border:3px solid #f59e0b;' : '') + '" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        
        if (destaque) html += '<div style="background:#f59e0b;color:white;display:inline-block;padding:3px 10px;border-radius:10px;font-size:11px;margin-bottom:8px;">⭐ SUA OBRA</div>';
        
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        
        html += '<div style="font-weight:bold;font-size:16px;">' + v.titulo + '</div>';
        html += '<div style="color:#666;font-size:13px;">📍 ' + v.endereco + '</div>';
        html += '<div style="margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div></div>';
    });
    
    c.innerHTML = html;
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this;
    var c = document.getElementById('redeContainer');
    if (!c) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhas = conexoes.filter(function(con) { 
        return con.usuarioId === s.usuarioLogado.id || con.amigoId === s.usuarioLogado.id; 
    });
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🔗</div><h3>Rede vazia</h3>' +
            '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;margin-top:10px;cursor:pointer;">🔍 Buscar</button></div>';
        return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var html = '';
    
    minhas.forEach(function(con) {
        var amigoId = con.usuarioId === s.usuarioLogado.id ? con.amigoId : con.usuarioId;
        var amigo = usuarios.find(function(u) { return u.id === amigoId; });
        
        if (amigo) {
            html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigoId + '\')">';
            html += '<div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">';
            html += amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">👷</div>';
            html += '</div>';
            html += '<div style="flex:1;"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao || 'Profissional') + '</small></div>';
            html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + amigoId + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;">✕</button>';
            html += '</div>';
        }
    });
    
    c.innerHTML = html || '<div style="text-align:center;padding:20px;">Nenhum amigo encontrado</div>';
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado) return;
    if (s.usuarioLogado.id === amigoId) { s.mostrarToast('Não pode adicionar a si mesmo!', 'erro'); return; }
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var existe = conexoes.find(function(c) { 
        return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
               (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id); 
    });
    
    if (existe) { s.mostrarToast('Já está na sua rede!', 'erro'); return; }
    
    conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('Adicionado!', 'sucesso');
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    conexoes = conexoes.filter(function(c) { 
        return !((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
                 (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id)); 
    });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('Removido', 'sucesso');
    s.carregarRede();
};

// ===== BUSCA (CORRIGIDA) =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    // LER TODOS OS USUÁRIOS
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('🔍 Buscando profissionais...');
    console.log('Total de usuários no localStorage:', usuarios.length);
    console.log('Lista:', usuarios.map(function(u) { return u.nome + ' (' + u.tipo + ')'; }));
    
    // FILTRAR: tipo profissional, não mostrar o próprio usuário
    var profissionais = [];
    for (var i = 0; i < usuarios.length; i++) {
        var u = usuarios[i];
        if (u.tipo === 'profissional' && u.id !== (s.usuarioLogado ? s.usuarioLogado.id : '')) {
            profissionais.push(u);
        }
    }
    
    console.log('Profissionais encontrados:', profissionais.length);
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">👷</div>' +
            '<h3>Nenhum profissional encontrado</h3>' +
            '<p style="color:#666;">Cadastre-se como profissional para aparecer aqui</p>' +
            '<p style="color:#999;font-size:12px;">Usuários totais: ' + usuarios.length + '</p>' +
            '</div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;color:#666;">' + profissionais.length + ' profissional(is)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">';
        html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">';
        html += p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        html += '</div>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;">' + p.nome + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:12px;color:#999;">📅 ' + (p.experiencia || '0') + ' anos</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button>';
        html += '</div>';
    }
    
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    
    if (!user) { s.mostrarToast('Profissional não encontrado', 'erro'); return; }
    
    var tela = document.getElementById('perfilPublicoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="width:90px;height:90px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:40px;">👷</div>') +
        '</div><h2>' + user.nome + '</h2><p style="color:#f0c27f;">🔧 ' + (user.profissao || 'Profissional') + '</p></div>' +
        '<div style="padding:20px;">' +
        '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;">' +
        '<p><strong>📧</strong> ' + (user.email || '') + '</p><p><strong>📱</strong> ' + (user.celular || '') + '</p></div>' +
        '<button onclick="window.app.adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>';
    
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA (FUNCIONAL) =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="padding:20px;">' +
        '<h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">📌 Título *</label>' +
        '<input id="pubTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">📍 Endereço *</label>' +
        '<input id="pubEndereco" placeholder="Rua Exemplo, 123" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">👷 Profissões</label>' +
        '<input id="pubProfissoes" placeholder="Pedreiro, Eletricista" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">💰 Valor/hora (R$) *</label>' +
        '<input id="pubValor" type="number" placeholder="25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">📝 Descrição</label>' +
        '<textarea id="pubDescricao" placeholder="Detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;min-height:60px;box-sizing:border-box;"></textarea>' +
        '</div>' +
        
        '<div style="margin-bottom:15px;">' +
        '<label style="font-weight:bold;display:block;margin-bottom:4px;">📸 Foto</label>' +
        '<img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;">' +
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;">📁 Escolher Foto</button>' +
        '</div>' +
        
        '<button onclick="window.app.publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR</button>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button>' +
        '</div>';
    
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

App.prototype.publicarVaga = function() {
    var s = this;
    
    var titulo = document.getElementById('pubTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('pubEndereco')?.value?.trim() || '';
    var profissoes = document.getElementById('pubProfissoes')?.value?.trim() || 'Geral';
    var valor = document.getElementById('pubValor')?.value?.trim() || '';
    var descricao = document.getElementById('pubDescricao')?.value?.trim() || '';
    
    console.log('📝 Dados:', { titulo, endereco, profissoes, valor });
    
    if (!titulo) { s.mostrarToast('Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('Digite o endereço!', 'erro'); return; }
    if (!valor) { s.mostrarToast('Digite o valor!', 'erro'); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valor,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || null,
        status: 'disponivel',
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null,
        dataCriacao: new Date().toISOString()
    };
    
    // SALVAR
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    console.log('✅ Vaga publicada! Total:', vagas.length);
    console.log('📊 Vaga:', vaga);
    
    // Limpar
    document.getElementById('pubTitulo').value = '';
    document.getElementById('pubEndereco').value = '';
    document.getElementById('pubProfissoes').value = '';
    document.getElementById('pubValor').value = '';
    document.getElementById('pubDescricao').value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('Obra publicada! 🏗️', 'sucesso');
    
    setTimeout(function() {
        s.historicoTelas = [];
        s.mostrarTela('homeScreen');
        s.carregarFeed();
    }, 500);
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer');
    if (!c) return;
    if (!s.usuarioLogado) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
    
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:40px;"><h3>Nenhuma obra</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <strong>' + minhas.length + '</strong> obra(s)</div>';
    minhas.forEach(function(v) {
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        if (v.fotoObra) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div style="font-weight:bold;">' + v.titulo + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + v.endereco + '</div>';
        html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '</div>';
    });
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var v = vagas.find(function(x) { return x.id === oid; });
    if (!v) return;
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + v.titulo + '</h2>';
    html += '<p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p><p>💰 R$' + v.valorHora + '/h</p>';
    html += '<p>👤 ' + (v.autorNome || 'Anônimo') + '</p>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;margin-top:10px;cursor:pointer;">⬅ Fechar</button>';
    html += '</div></div></div>';
    
    var antigo = document.getElementById('modalObra');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== PERFIL USUÁRIO =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="width:90px;height:90px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPreview">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:40px;">👷</div>') +
        '</div><input type="file" id="inputFoto" accept="image/*" style="display:none;" onchange="window.app.uploadFotoPerfil(event)">' +
        '<h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo) + '</p></div>' +
        
        '<div style="display:flex;gap:5px;padding:15px;">' +
        '<button onclick="window.app.mostrarSecao(\'info\')" id="btnInfo" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">📋 INFO</button>' +
        '<button onclick="window.app.mostrarSecao(\'config\')" id="btnConfig" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">⚙️ CONFIG</button>' +
        '</div>' +
        '<div id="secaoConteudo" style="padding:15px;"></div>';
    
    s.mostrarSecao('info');
};

App.prototype.mostrarSecao = function(secao) {
    var s = this;
    var c = document.getElementById('secaoConteudo');
    if (!c) return;
    
    document.getElementById('btnInfo').style.background = secao === 'info' ? '#1A3A5C' : '#e5e7eb';
    document.getElementById('btnInfo').style.color = secao === 'info' ? 'white' : '#1A3A5C';
    document.getElementById('btnConfig').style.background = secao === 'config' ? '#1A3A5C' : '#e5e7eb';
    document.getElementById('btnConfig').style.color = secao === 'config' ? 'white' : '#1A3A5C';
    
    var user = s.usuarioLogado;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    if (secao === 'info') {
        c.innerHTML = 
            '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><strong>' + (user.experiencia || '0') + '</strong><br><small>Anos</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><strong>' + (user.score || 0).toFixed(1) + '</strong><br><small>Score</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();"><strong style="color:#10B981;">' + totalObras + '</strong><br><small>Obras</small></div></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">' +
            '<p><strong>📧</strong> ' + (user.email || '') + '</p><p><strong>📱</strong> ' + (user.celular || '') + '</p><p><strong>🔧</strong> ' + (user.profissao || '') + '</p></div>' +
            '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
    } else {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">' +
            '<h3>🎨 Tema</h3>' +
            '<button onclick="window.app.selecionarTema(\'claro\')" style="background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:10px;border-radius:8px;margin-right:5px;cursor:pointer;">☀️ Claro</button>' +
            '<button onclick="window.app.selecionarTema(\'escuro\')" style="background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:10px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;">' +
            '<h3>📄 Documentos</h3>' +
            '<button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso</button>' +
            '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade</button>' +
            '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;">ℹ️ Sobre</button></div>';
    }
};

// ===== UPLOAD FOTO =====
App.prototype.uploadFotoPerfil = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('fotoPreview').src = e.target.result;
        s.usuarioLogado.fotoPerfil = e.target.result;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var idx = usuarios.findIndex(function(u) { return u.id === s.usuarioLogado.id; });
        if (idx >= 0) { usuarios[idx].fotoPerfil = e.target.result; localStorage.setItem('usuariosLPX', JSON.stringify(usuarios)); }
        
        s.mostrarToast('Foto atualizada!', 'sucesso');
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
    html += '<input id="editNome" value="' + (user.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editCelular" value="' + (user.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editProfissao" value="' + (user.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;box-sizing:border-box;">';
    html += '<div style="display:flex;gap:10px;">';
    html += '<button onclick="window.app.salvarPerfil()" style="flex:1;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">💾 SALVAR</button>';
    html += '<button onclick="document.getElementById(\'modalEditar\').remove()" style="flex:1;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button>';
    html += '</div></div></div>';
    
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    s.usuarioLogado.nome = document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome;
    s.usuarioLogado.celular = document.getElementById('editCelular')?.value?.trim() || '';
    s.usuarioLogado.profissao = document.getElementById('editProfissao')?.value?.trim() || '';
    s.usuarioLogado.experiencia = document.getElementById('editExperiencia')?.value?.trim() || '0';
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var idx = usuarios.findIndex(function(u) { return u.id === s.usuarioLogado.id; });
    if (idx >= 0) { usuarios[idx] = s.usuarioLogado; localStorage.setItem('usuariosLPX', JSON.stringify(usuarios)); }
    
    document.getElementById('modalEditar')?.remove();
    s.mostrarToast('Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    var tela = document.getElementById('documentoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    var conteudos = {
        termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p><p>É proibido: discriminação, assédio, informações falsas.</p>',
        privacidade: '<h3>Política de Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p><p>Não compartilhamos informações com terceiros.</p>',
        sobre: '<h3>Sobre</h3><p>LPXCONSTRUTOR v1.0.0</p><p>Rede Profissional da Construção Civil</p>'
    };
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button></div>' +
        '<div style="padding:20px;line-height:1.8;">' + (conteudos[tipo] || '') + '</div>';
    
    s.mostrarTela('documentoScreen');
};

App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('Tema alterado!', 'sucesso');
    this.carregarMeuPerfil();
};

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if (!toast) { 
        toast = document.createElement('div'); 
        toast.id = 'toast'; 
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1F2937;color:white;padding:12px 24px;border-radius:25px;z-index:99999;font-weight:bold;display:none;text-align:center;max-width:90%;'; 
        document.body.appendChild(toast); 
    }
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    clearTimeout(this._tt);
    this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR PRONTO!');
    
    // DEBUG: Mostrar dados salvos
    console.log('📊 Dados salvos:');
    console.log('Usuários:', JSON.parse(localStorage.getItem('usuariosLPX') || '[]').length);
    console.log('Vagas:', JSON.parse(localStorage.getItem('vagasLPX') || '[]').length);
    console.log('Conexões:', JSON.parse(localStorage.getItem('conexoesLPX') || '[]').length);
});
