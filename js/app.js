// ==========================================================
// ===== LPXCONSTRUTOR - FUNCIONAL =====
// ==========================================================

var appInstancia = null;

// Funções globais diretas
function fazerLogin() { if(appInstancia) appInstancia.fazerLogin(); }
function cadastrar() { if(appInstancia) appInstancia.cadastrar(); }
function mostrarTela(id) { if(appInstancia) appInstancia.mostrarTela(id); }
function voltarTela() { if(appInstancia) appInstancia.voltarTela(); }
function sair() { if(appInstancia) appInstancia.sair(); }
function buscarProfissionais() { if(appInstancia) appInstancia.buscarProfissionais(); }
function verPerfil(uid) { if(appInstancia) appInstancia.verPerfil(uid); }
function abrirTelaPublicacao() { if(appInstancia) appInstancia.abrirTelaPublicacao(); }
function publicarVaga() { if(appInstancia) appInstancia.publicarVaga(); }
function previewFotoObra(e) { if(appInstancia) appInstancia.previewFotoObra(e); }
function carregarMinhasObras() { if(appInstancia) appInstancia.carregarMinhasObras(); }
function verDetalheObra(oid) { if(appInstancia) appInstancia.verDetalheObra(oid); }
function uploadFotoPerfil(e) { if(appInstancia) appInstancia.uploadFotoPerfil(e); }
function abrirEditarPerfil() { if(appInstancia) appInstancia.abrirEditarPerfil(); }
function salvarPerfil() { if(appInstancia) appInstancia.salvarPerfil(); }
function mostrarSecao(s) { if(appInstancia) appInstancia.mostrarSecao(s); }
function selecionarTema(t) { if(appInstancia) appInstancia.selecionarTema(t); }
function mostrarDocumento(t) { if(appInstancia) appInstancia.mostrarDocumento(t); }
function mudarTab(t) { if(appInstancia) appInstancia.mudarTab(t); }
function adicionarNaRede(uid) { if(appInstancia) appInstancia.adicionarNaRede(uid); }
function removerDaRede(uid) { if(appInstancia) appInstancia.removerDaRede(uid); }

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 App iniciando...');
    appInstancia = s;
    
    // Verificar login salvo
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) {
        try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {}
    }
    
    // Mostrar splash
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100px;"><p style="color:white;font-size:20px;font-weight:bold;margin-top:15px;">LPXCONSTRUTOR</p>';
    document.body.appendChild(splash);
    
    setTimeout(function() {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
        if (s.usuarioLogado) {
            s.mostrarTela('homeScreen');
        } else {
            s.mostrarTela('loginScreen');
        }
    }, 1500);
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Mostrando:', id);
    
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
    if (this.historicoTelas.length > 0) {
        var ant = this.historicoTelas.pop();
        var atual = this.telaAtual;
        this.telaAtual = null;
        this.mostrarTela(ant);
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    
    if (!email || !senha) {
        alert('Campos de login não encontrados! Verifique o HTML.');
        return;
    }
    
    var e = email.value.trim();
    var p = senha.value.trim();
    
    if (!e || !p) {
        s.mostrarToast('Preencha email e senha!', 'erro');
        return;
    }
    
    console.log('🔑 Login:', e);
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('Usuários:', usuarios.length);
    
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === e.toLowerCase() && usuarios[i].senha === p) {
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
App.prototype.cadastrar = function() {
    var s = this;
    
    var nomeEl = document.getElementById('cadNome');
    var emailEl = document.getElementById('cadEmail');
    var senhaEl = document.getElementById('cadSenha');
    var tipoEl = document.getElementById('cadTipo');
    var celularEl = document.getElementById('cadCelular');
    var profissaoEl = document.getElementById('cadProfissao');
    var experienciaEl = document.getElementById('cadExperiencia');
    
    if (!nomeEl || !emailEl || !senhaEl) {
        alert('Campos de cadastro não encontrados!');
        return;
    }
    
    var dados = {
        id: 'user_' + Date.now(),
        nome: nomeEl.value.trim(),
        email: emailEl.value.trim(),
        senha: senhaEl.value.trim(),
        tipo: tipoEl ? tipoEl.value : 'profissional',
        celular: celularEl ? celularEl.value.trim() : '',
        profissao: profissaoEl ? profissaoEl.value.trim() : '',
        experiencia: experienciaEl ? experienciaEl.value.trim() : '0',
        score: 0,
        fotoPerfil: null
    };
    
    if (!dados.nome || !dados.email || !dados.senha) {
        s.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    
    // Verificar duplicado
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === dados.email.toLowerCase()) {
            s.mostrarToast('Email já cadastrado!', 'erro');
            return;
        }
    }
    
    usuarios.push(dados);
    localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
    
    console.log('✅ Cadastrado:', dados.nome, 'Total:', usuarios.length);
    
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.historicoTelas = [];
    
    // Limpar campos
    nomeEl.value = '';
    emailEl.value = '';
    senhaEl.value = '';
    
    s.mostrarToast('Cadastro realizado!', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
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
    
    var html = '';
    html += '<div style="background:#1A3A5C;color:white;padding:15px;">';
    html += '<span style="font-size:18px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span>';
    html += '<span style="float:right;font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span>';
    html += '</div>';
    
    // TABS
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;">';
    html += '<button id="tabFeed" onclick="mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>';
    html += '<button id="tabRede" onclick="mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>';
    html += '</div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div>';
    html += '<div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    // Botão publicar flutuante
    if (user.tipo === 'empreiteiro') {
        html += '<button onclick="abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:999;cursor:pointer;">📢</button>';
    }
    
    home.innerHTML = html;
    s.carregarFeed();
};

App.prototype.mudarTab = function(tab) {
    this.tabAtual = tab;
    
    var btnFeed = document.getElementById('tabFeed');
    var btnRede = document.getElementById('tabRede');
    var feed = document.getElementById('feedContainer');
    var rede = document.getElementById('redeContainer');
    
    if (btnFeed) {
        btnFeed.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb';
        btnFeed.style.color = tab === 'feed' ? 'white' : '#1A3A5C';
    }
    if (btnRede) {
        btnRede.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb';
        btnRede.style.color = tab === 'rede' ? 'white' : '#1A3A5C';
    }
    if (feed) feed.style.display = tab === 'feed' ? 'block' : 'none';
    if (rede) rede.style.display = tab === 'rede' ? 'block' : 'none';
    
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this;
    var c = document.getElementById('feedContainer');
    if (!c) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    console.log('📊 Feed - Vagas:', vagas.length);
    
    if (vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🏗️</div>' +
            '<h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
            '<button onclick="abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">📢 PUBLICAR</button>' : '') +
            '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        var destaque = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + 
            (destaque ? 'border:3px solid #f59e0b;' : '') + '" onclick="verDetalheObra(\'' + v.id + '\')">';
        
        if (destaque) {
            html += '<div style="background:#f59e0b;color:white;display:inline-block;padding:3px 10px;border-radius:10px;font-size:11px;margin-bottom:8px;">⭐ SUA OBRA</div>';
        }
        
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        
        html += '<div style="font-weight:bold;font-size:16px;">' + v.titulo + '</div>';
        html += '<div style="color:#666;font-size:13px;">📍 ' + v.endereco + '</div>';
        html += '<div style="color:#999;font-size:11px;">👤 ' + (v.autorNome || 'Anônimo') + '</div>';
        html += '<div style="margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div></div>';
    }
    
    c.innerHTML = html;
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this;
    var c = document.getElementById('redeContainer');
    if (!c) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhas = [];
    
    for (var i = 0; i < conexoes.length; i++) {
        if (conexoes[i].usuarioId === s.usuarioLogado.id || conexoes[i].amigoId === s.usuarioLogado.id) {
            minhas.push(conexoes[i]);
        }
    }
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🔗</div><h3>Rede vazia</h3>' +
            '<button onclick="mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>';
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
            html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
            html += '<div style="width:40px;height:40px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">👷</div>';
            html += '<div style="flex:1;" onclick="verPerfil(\'' + amigoId + '\')"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao || '') + '</small></div>';
            html += '<button onclick="event.stopPropagation();removerDaRede(\'' + amigoId + '\')" style="color:red;border:none;background:none;cursor:pointer;">✕</button>';
            html += '</div>';
        }
    }
    
    c.innerHTML = html || '<div style="text-align:center;padding:20px;">Nenhum amigo</div>';
};

App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.id === amigoId) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    
    for (var i = 0; i < conexoes.length; i++) {
        var c = conexoes[i];
        if ((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
            (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id)) {
            s.mostrarToast('Já está na rede!', 'erro');
            return;
        }
    }
    
    conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    s.mostrarToast('Adicionado!', 'sucesso');
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var novas = [];
    
    for (var i = 0; i < conexoes.length; i++) {
        var c = conexoes[i];
        if (!((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
              (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id))) {
            novas.push(c);
        }
    }
    
    localStorage.setItem('conexoesLPX', JSON.stringify(novas));
    s.mostrarToast('Removido', 'sucesso');
    s.carregarRede();
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('🔍 Busca - Total usuários:', todos.length);
    
    var profissionais = [];
    var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
            profissionais.push(todos[i]);
        }
    }
    
    console.log('👷 Profissionais:', profissionais.length);
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">👷</div><h3>Nenhum profissional</h3>' +
            '<p style="color:#666;">Total usuários: ' + todos.length + '</p></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;">' + profissionais.length + ' profissional(is)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:50px;height:50px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        html += '<div style="flex:1;" onclick="verPerfil(\'' + p.id + '\')">';
        html += '<div style="font-weight:bold;">' + p.nome + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>';
        html += '<div style="font-size:12px;color:#999;">📅 ' + (p.experiencia || '0') + ' anos</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button>';
        html += '</div>';
    }
    
    c.innerHTML = html;
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = null;
    
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === uid) { user = usuarios[i]; break; }
    }
    
    if (!user) { s.mostrarToast('Não encontrado', 'erro'); return; }
    
    var tela = document.getElementById('perfilPublicoScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'perfilPublicoScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="font-size:60px;">👷</div><h2>' + user.nome + '</h2>' +
        '<p>🔧 ' + (user.profissao || 'Profissional') + '</p></div>' +
        '<div style="padding:20px;">' +
        '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;">' +
        '<p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p></div>' +
        '<button onclick="adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>';
    
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR OBRA =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    
    console.log('📢 Abrindo publicação');
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'publicarVagaScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.innerHTML = 
        '<div style="padding:20px;">' +
        '<h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2>' +
        '<p style="text-align:center;color:#666;font-size:12px;">' + s.usuarioLogado.nome + '</p>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;">📌 Título *</label>' +
        '<input id="pubTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;">📍 Endereço *</label>' +
        '<input id="pubEndereco" placeholder="Rua Exemplo, 123" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;">👷 Profissões</label>' +
        '<input id="pubProfissoes" placeholder="Pedreiro, Eletricista" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;">💰 Valor/hora (R$) *</label>' +
        '<input id="pubValor" type="number" placeholder="25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;">' +
        '</div>' +
        
        '<div style="margin-bottom:12px;">' +
        '<label style="font-weight:bold;">📸 Foto</label>' +
        '<img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;">' +
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;">📁 Escolher Foto</button>' +
        '</div>' +
        
        '<button onclick="publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR OBRA</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button>' +
        '</div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('pubFotoPreview');
        if (preview) preview.src = e.target.result;
        appInstancia.vagaFotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
};

App.prototype.publicarVaga = function() {
    var s = this;
    
    var tituloEl = document.getElementById('pubTitulo');
    var enderecoEl = document.getElementById('pubEndereco');
    var profissoesEl = document.getElementById('pubProfissoes');
    var valorEl = document.getElementById('pubValor');
    
    if (!tituloEl || !enderecoEl || !valorEl) {
        alert('Erro: Campos não encontrados!');
        return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl ? profissoesEl.value.trim() || 'Geral' : 'Geral';
    var valor = valorEl.value.trim();
    
    console.log('📝 Publicando:', titulo, endereco, valor);
    
    if (!titulo) { s.mostrarToast('Digite o título!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    if (!valor) { s.mostrarToast('Digite o valor!', 'erro'); valorEl.focus(); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valor,
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
    
    console.log('✅ Vaga salva! Total:', vagas.length);
    
    // LIMPAR
    tituloEl.value = '';
    enderecoEl.value = '';
    if (profissoesEl) profissoesEl.value = 'Geral';
    valorEl.value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
    
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
    if (!c || !s.usuarioLogado) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].autorId === s.usuarioLogado.id) minhas.push(vagas[i]);
    }
    
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = minhas.length;
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>';
    for (var i = 0; i < minhas.length; i++) {
        var v = minhas[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;" onclick="verDetalheObra(\'' + v.id + '\')">';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<b>' + v.titulo + '</b><br><small>📍 ' + v.endereco + '</small><br>';
        html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '</div>';
    }
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var v = null;
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id === oid) { v = vagas[i]; break; }
    }
    if (!v) return;
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + v.titulo + '</h2>';
    html += '<p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p><p>💰 R$' + v.valorHora + '/h</p>';
    html += '<p>👤 ' + (v.autorNome || 'Anônimo') + '</p>';
    html += '<p>📅 ' + new Date(v.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button>';
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
    if (!tela) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].autorId === user.id) totalObras++;
    }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="font-size:60px;">👷</div><h2>' + user.nome + '</h2>' +
        '<p>' + (user.profissao || user.tipo || '') + '</p></div>' +
        
        '<div style="display:flex;gap:5px;padding:15px;">' +
        '<button id="btnInfo" onclick="mostrarSecao(\'info\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">📋 INFO</button>' +
        '<button id="btnConfig" onclick="mostrarSecao(\'config\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">⚙️ CONFIG</button>' +
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
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].autorId === user.id) totalObras++;
    }
    
    if (secao === 'info') {
        c.innerHTML = 
            '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.experiencia || '0') + '</b><br><small>Anos</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;"><b>' + (user.score || 0).toFixed(1) + '</b><br><small>Score</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;cursor:pointer;" onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();"><b style="color:#10B981;">' + totalObras + '</b><br><small>Obras</small></div>' +
            '</div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">' +
            '<p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p><p>🔧 ' + (user.profissao || '') + '</p></div>' +
            '<button onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
            '<button onclick="abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
    } else {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">' +
            '<h3>🎨 Tema</h3>' +
            '<button onclick="selecionarTema(\'claro\')" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-right:5px;cursor:pointer;">☀️ Claro</button>' +
            '<button onclick="selecionarTema(\'escuro\')" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;">' +
            '<h3>📄 Documentos</h3>' +
            '<button onclick="mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button>' +
            '<button onclick="mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade</button>' +
            '<button onclick="mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;">ℹ️ Sobre</button></div>';
    }
};

// ===== UPLOAD FOTO =====
App.prototype.uploadFotoPerfil = function(event) {
    var s = this;
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        s.usuarioLogado.fotoPerfil = e.target.result;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === s.usuarioLogado.id) {
                usuarios[i].fotoPerfil = e.target.result;
                localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
                break;
            }
        }
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
    html += '<button onclick="salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button>';
    html += '<button onclick="document.getElementById(\'modalEditar\').remove()" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button>';
    html += '</div></div>';
    
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
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === s.usuarioLogado.id) {
            usuarios[i] = s.usuarioLogado;
            localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
            break;
        }
    }
    
    document.getElementById('modalEditar')?.remove();
    s.mostrarToast('Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var tela = document.getElementById('documentoScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'documentoScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    var c = {
        termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>',
        privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos pela LGPD.</p>',
        sobre: '<h3>Sobre</h3><p>LPXCONSTRUTOR v1.0</p>'
    };
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button></div><div style="padding:20px;">' + (c[tipo] || '') + '</div>';
    this.mostrarTela('documentoScreen');
};

App.prototype.selecionarTema = function(tema) {
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('Tema alterado!', 'sucesso');
};

// ===== TOAST =====
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
    appInstancia = new App();
    console.log('✅ LPXCONSTRUTOR PRONTO!');
});
