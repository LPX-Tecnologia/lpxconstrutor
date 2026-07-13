// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO RESTAURADO =====
// ==========================================================

var appInstancia = null;

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
function selecionarIdioma(i) { if(appInstancia) appInstancia.selecionarIdioma(i); }
function mostrarDocumento(t) { if(appInstancia) appInstancia.mostrarDocumento(t); }
function mostrarInfoVersao() { if(appInstancia) appInstancia.mostrarInfoVersao(); }
function mudarTab(t) { if(appInstancia) appInstancia.mudarTab(t); }
function adicionarNaRede(uid) { if(appInstancia) appInstancia.adicionarNaRede(uid); }
function removerDaRede(uid) { if(appInstancia) appInstancia.removerDaRede(uid); }
function apagarObra(oid, event) { if(appInstancia) appInstancia.apagarObra(oid, event); }
function mostrarNotificacoes() { if(appInstancia) appInstancia.mostrarNotificacoes(); }
function iniciarChat(uid) { if(appInstancia) appInstancia.iniciarChat(uid); }
function enviarMensagem() { if(appInstancia) appInstancia.enviarMensagem(); }
function fecharModal(id) { var m = document.getElementById(id); if(m) m.remove(); }

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.usuarioSelecionado = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this.idiomaAtual = localStorage.getItem('idioma') || 'pt';
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR');
    appInstancia = s;
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    var splashAntigo = document.getElementById('splashScreen');
    if (splashAntigo) splashAntigo.remove();
    
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
    
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    setTimeout(function() {
        splash.style.opacity = '0';
        setTimeout(function() {
            if (splash.parentNode) splash.remove();
            if (s.usuarioLogado) { s.mostrarTela('homeScreen'); }
            else { s.mostrarTela('loginScreen'); }
        }, 500);
    }, 2000);
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Tela:', id);
    
    var splash = document.getElementById('splashScreen');
    if (splash) splash.remove();
    
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
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var mostrar = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen'];
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
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    if (!email || !senha) return;
    
    var e = email.value.trim();
    var p = senha.value.trim();
    if (!e || !p) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email.toLowerCase() === e.toLowerCase() && usuarios[i].senha === p) {
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
        nome: document.getElementById('cadNome')?.value?.trim() || '',
        email: document.getElementById('cadEmail')?.value?.trim() || '',
        senha: document.getElementById('cadSenha')?.value?.trim() || '',
        tipo: document.getElementById('cadTipo')?.value || 'profissional',
        celular: document.getElementById('cadCelular')?.value?.trim() || '',
        profissao: document.getElementById('cadProfissao')?.value?.trim() || '',
        experiencia: document.getElementById('cadExperiencia')?.value?.trim() || '0',
        score: 0, fotoPerfil: null, dataCadastro: new Date().toISOString()
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
    console.log('✅ Cadastrado:', dados.nome, '| Tipo:', dados.tipo, '| Total:', usuarios.length);
    
    s.usuarioLogado = dados;
    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
    s.historicoTelas = [];
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
    html += '<div style="background:#1A3A5C;color:white;padding:12px 15px;display:flex;align-items:center;">';
    html += '<div class="foto-usuario" style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">';
    }
    html += '</div>';
    html += '<div style="flex:1;"><span style="font-size:15px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div>';
    html += '<span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span>';
    html += '</div>';
    
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;">';
    html += '<button id="tabFeed" onclick="mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button>';
    html += '<button id="tabRede" onclick="mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button>';
    html += '</div>';
    
    html += '<div id="feedContainer" style="padding:10px;"></div>';
    html += '<div id="redeContainer" style="padding:10px;display:none;"></div>';
    
    if (user.tipo === 'empreiteiro') {
        html += '<button onclick="abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
    }
    
    home.innerHTML = html;
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
    
    if (vagas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>';
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
            html += '<button onclick="apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button>';
            html += '</div>';
        }
        
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        }
        
        html += '<div onclick="verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">';
        html += '<div style="font-weight:bold;font-size:16px;">' + v.titulo + '</div>';
        html += '<div style="color:#666;font-size:13px;">📍 ' + v.endereco + '</div>';
        html += '<div style="margin-top:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + v.valorHora + '/h</span> ';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '</div></div></div>';
    }
    
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid, event) {
    if (event) event.stopPropagation();
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

// ===== NOTIFICAÇÕES =====
App.prototype.adicionarNotificacao = function(usuarioId, titulo, mensagem) {
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        usuarioId: usuarioId, titulo: titulo, mensagem: mensagem,
        lida: false, data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
};

App.prototype.mostrarNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var minhasNotif = [];
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) minhasNotif.push(notificacoes[i]);
    }
    
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) notificacoes[i].lida = true;
    }
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    var html = '<div id="modalNotificacoes" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)fecharModal(\'modalNotificacoes\')">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    html += '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between;">';
    html += '<h3 style="margin:0;">🔔 Notificações</h3>';
    html += '<button onclick="fecharModal(\'modalNotificacoes\')" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button>';
    html += '</div><div style="padding:15px;">';
    
    if (minhasNotif.length === 0) {
        html += '<div style="text-align:center;padding:40px;"><div style="font-size:50px;">🔔</div><h3>Nenhuma notificação</h3></div>';
    } else {
        for (var i = 0; i < minhasNotif.length; i++) {
            var n = minhasNotif[i];
            html += '<div style="background:#f9fafb;border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;">';
            html += '<div style="font-weight:bold;">' + n.titulo + '</div>';
            html += '<div style="font-size:13px;color:#666;">' + n.mensagem + '</div>';
            html += '<div style="font-size:10px;color:#999;">' + new Date(n.data).toLocaleString('pt-BR') + '</div>';
            html += '</div>';
        }
    }
    
    html += '</div></div></div>';
    
    fecharModal('modalNotificacoes');
    document.body.insertAdjacentHTML('beforeend', html);
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
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🔗</div><h3>Rede vazia</h3><button onclick="mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>';
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
            html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="verPerfil(\'' + amigoId + '\')">';
            html += amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>';
            html += '</div>';
            html += '<div style="flex:1;cursor:pointer;" onclick="verPerfil(\'' + amigoId + '\')"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao || '') + '</small></div>';
            html += '<button onclick="event.stopPropagation();iniciarChat(\'' + amigoId + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button>';
            html += '<button onclick="event.stopPropagation();removerDaRede(\'' + amigoId + '\')" style="color:#EF4444;border:none;background:none;cursor:pointer;">✕</button>';
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
        if ((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) || (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id)) {
            s.mostrarToast('Já está na rede!', 'erro'); return;
        }
    }
    
    conexoes.push({ id: 'con_' + Date.now(), usuarioId: s.usuarioLogado.id, amigoId: amigoId, status: 'ativo' });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var amigo = null;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === amigoId) { amigo = usuarios[i]; break; }
    }
    if (amigo) s.adicionarNotificacao(amigoId, '🔗 Nova conexão!', s.usuarioLogado.nome + ' adicionou você.');
    s.mostrarToast('Adicionado!', 'sucesso');
};

App.prototype.removerDaRede = function(amigoId) {
    var s = this;
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
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = null;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === uid) { user = usuarios[i]; break; }
    }
    if (!user) return;
    
    s.usuarioSelecionado = user;
    
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<button onclick="voltarTela()" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
        '<strong>💬 ' + user.nome + '</strong></div>' +
        '<div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div>' +
        '<div style="padding:10px;background:white;display:flex;gap:10px;">' +
        '<input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;">' +
        '<button onclick="enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>';
    
    s.mostrarTela('chatScreen');
    s.carregarMensagens();
};

App.prototype.carregarMensagens = function() {
    var s = this;
    var c = document.getElementById('chatMensagens');
    if (!c || !s.usuarioSelecionado) return;
    
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
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioSelecionado) return;
    
    var texto = input.value.trim();
    if (!texto) return;
    
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    mensagens.push({
        id: 'msg_' + Date.now(),
        remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id,
        conteudo: texto, data: new Date().toISOString()
    });
    localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
    
    s.adicionarNotificacao(s.usuarioSelecionado.id, '💬 Nova mensagem', s.usuarioLogado.nome + ' enviou uma mensagem.');
    input.value = '';
    s.carregarMensagens();
};

// ===== BUSCA (CORRIGIDA - MOSTRA PROFISSIONAIS CADASTRADOS) =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    console.log('🔍 Busca - Total de usuários:', todos.length);
    console.log('📋 Lista:', todos.map(function(u) { return u.nome + ' (' + u.tipo + ')'; }));
    
    var profissionais = [];
    var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
            profissionais.push(todos[i]);
        }
    }
    
    console.log('👷 Profissionais encontrados:', profissionais.length);
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">👷</div>' +
            '<h3>Nenhum profissional encontrado</h3>' +
            '<p style="color:#666;">Total de usuários no sistema: <b>' + todos.length + '</b></p>' +
            '<p style="color:#999;font-size:12px;">Cadastre outros usuários como "profissional" para aparecer aqui</p></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;color:#666;">' + profissionais.length + ' profissional(is) encontrado(s)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;flex-shrink:0;" onclick="verPerfil(\'' + p.id + '\')">';
        html += p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        html += '</div>';
        html += '<div style="flex:1;cursor:pointer;" onclick="verPerfil(\'' + p.id + '\')">';
        html += '<div style="font-weight:bold;">' + p.nome + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + ' • 📅 ' + (p.experiencia || '0') + ' anos</div>';
        html += '<div style="color:#f59e0b;">⭐ ' + (p.score || 0).toFixed(1) + '</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button>';
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
    if (!tela) { tela = document.createElement('div'); tela.id = 'perfilPublicoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') +
        '</div><h2>' + user.nome + '</h2>' +
        '<p>🔧 ' + (user.profissao || 'Profissional') + ' | 📅 ' + (user.experiencia || '0') + ' anos</p>' +
        '<p>⭐ ' + (user.score || 0).toFixed(1) + '</p></div>' +
        '<div style="padding:20px;">' +
        '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;">' +
        '<p><strong>📧 Email:</strong> ' + (user.email || '') + '</p>' +
        '<p><strong>📱 Celular:</strong> ' + (user.celular || '') + '</p></div>' +
        '<button onclick="iniciarChat(\'' + user.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">💬 Chat</button>' +
        '<button onclick="adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar à Rede</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>';
    
    s.mostrarTela('perfilPublicoScreen');
};

// ===== PUBLICAR =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="padding:20px;">' +
        '<h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2>' +
        '<p style="text-align:center;color:#666;font-size:12px;">Publicado por: <b>' + s.usuarioLogado.nome + '</b></p>' +
        '<input id="pubTitulo" placeholder="📌 Título *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubEndereco" placeholder="📍 Endereço *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubProfissoes" placeholder="👷 Profissões" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubValor" type="number" placeholder="💰 Valor/hora (R$) *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<textarea id="pubDescricao" placeholder="📝 Descrição" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;min-height:60px;box-sizing:border-box;"></textarea>' +
        '<img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;">' +
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Escolher Foto</button>' +
        '<button onclick="publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">📢 PUBLICAR OBRA</button>' +
        '<button onclick="voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:10px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>';
    
    s.vagaFotoBase64 = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('pubFotoPreview').src = e.target.result;
        appInstancia.vagaFotoBase64 = e.target.result;
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
    
    if (!titulo) { s.mostrarToast('Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('Digite o endereço!', 'erro'); return; }
    if (!valor) { s.mostrarToast('Digite o valor!', 'erro'); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: valor,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || null, status: 'disponivel',
        autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null, dataCriacao: new Date().toISOString()
    };
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    console.log('✅ Vaga publicada! Total:', vagas.length);
    
    document.getElementById('pubTitulo').value = '';
    document.getElementById('pubEndereco').value = '';
    document.getElementById('pubProfissoes').value = 'Geral';
    document.getElementById('pubValor').value = '';
    document.getElementById('pubDescricao').value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada! 🏗️', 'sucesso');
    setTimeout(function() { s.historicoTelas = []; s.mostrarTela('homeScreen'); s.carregarFeed(); }, 800);
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
    
    if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; }
    
    var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>';
    for (var i = 0; i < minhas.length; i++) {
        var v = minhas[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div onclick="verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + v.titulo + '</b><br><small>📍 ' + v.endereco + '</small><br>';
        html += '<span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + v.valorHora + '/h</span></div>';
        html += '<button onclick="apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;margin-top:5px;">🗑️ Apagar</button>';
        html += '</div>';
    }
    c.innerHTML = html;
};

// ===== DETALHE OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var v = null;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].id === oid) { v = vagas[i]; break; } }
    if (!v) return;
    
    var html = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
    if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
    html += '<div style="padding:20px;"><h2>' + v.titulo + '</h2>';
    html += '<p><strong>📍</strong> ' + v.endereco + '</p>';
    html += '<p><strong>👷</strong> ' + v.profissoes + '</p>';
    html += '<p><strong>💰</strong> R$' + v.valorHora + '/h</p>';
    if (v.descricao) html += '<p><strong>📝</strong> ' + v.descricao + '</p>';
    html += '<p><strong>👤</strong> ' + (v.autorNome || 'Anônimo') + '</p>';
    html += '<p><strong>📅</strong> ' + new Date(v.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    if (v.endereco) html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(v.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-decoration:none;margin-bottom:10px;">🗺️ Ver no Google Maps</a>';
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button>';
    html += '</div></div></div>';
    
    fecharModal('modalObra');
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== PERFIL DO USUÁRIO (COMPLETO COM TUDO) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].autorId === user.id) totalObras++; }
    
    tela.innerHTML = 
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : 
        '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;" id="fotoPerfilPreview">') +
        '</div><input type="file" id="inputFoto" accept="image/*" onchange="uploadFotoPerfil(event)" style="display:none;">' +
        '<p style="font-size:10px;color:#ccc;">Toque para alterar foto</p>' +
        '<h2>' + user.nome + '</h2>' +
        '<p style="color:#f0c27f;">' + (user.profissao || user.tipo || 'Usuário') + '</p></div>' +
        
        '<div style="display:flex;gap:5px;padding:15px;">' +
        '<button id="btnInfo" onclick="mostrarSecao(\'info\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">📋 INFORMAÇÕES</button>' +
        '<button id="btnConfig" onclick="mostrarSecao(\'config\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">⚙️ CONFIGURAÇÕES</button>' +
        '<button id="btnAlertas" onclick="mostrarSecao(\'alertas\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:8px;cursor:pointer;">🔔 ALERTAS</button>' +
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
        if (btn) {
            btn.style.background = sec === secao ? '#1A3A5C' : '#e5e7eb';
            btn.style.color = sec === secao ? 'white' : '#1A3A5C';
        }
    });
    
    var user = s.usuarioLogado;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = 0;
    for (var i = 0; i < vagas.length; i++) { if (vagas[i].autorId === user.id) totalObras++; }
    
    if (secao === 'info') {
        c.innerHTML = 
            '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><b style="font-size:22px;color:#1A3A5C;">' + (user.experiencia || '0') + '</b><br><small>Anos Exp.</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><b style="font-size:22px;color:#f59e0b;">' + (user.score || 0).toFixed(1) + '</b><br><small>Avaliação</small></div>' +
            '<div style="flex:1;background:white;border-radius:10px;padding:15px;text-align:center;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.1);" onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();"><b style="font-size:22px;color:#10B981;">' + totalObras + '</b><br><small>Obras</small></div>' +
            '</div>' +
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">👤 Dados Pessoais</h3>' +
            '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>' +
            '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>' +
            '<p><strong>🏢 Tipo:</strong> ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p>' +
            '<p><strong>🔧 Profissão:</strong> ' + (user.profissao || 'Não informada') + '</p></div>' +
            '<button onclick="mostrarTela(\'minhasObrasScreen\');carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
            '<button onclick="abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">✏️ Editar Perfil</button>';
    } else if (secao === 'config') {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">🎨 Tema</h3>' +
            '<div style="display:flex;gap:10px;">' +
            '<button onclick="selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">☀️ Claro</button>' +
            '<button onclick="selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🌙 Escuro</button></div></div>' +
            
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">🌐 Idioma</h3>' +
            '<div style="display:flex;gap:10px;">' +
            '<button onclick="selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🇧🇷 PT</button>' +
            '<button onclick="selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🇺🇸 EN</button>' +
            '<button onclick="selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:none;padding:12px;border-radius:8px;cursor:pointer;">🇪🇸 ES</button></div></div>' +
            
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">📄 Documentos</h3>' +
            '<button onclick="mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso</button>' +
            '<button onclick="mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Política de Privacidade</button>' +
            '<button onclick="mostrarDocumento(\'diretrizes\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📋 Diretrizes da Comunidade</button>' +
            '<button onclick="mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:12px;border-radius:8px;cursor:pointer;">ℹ️ Sobre o LPXCONSTRUTOR</button></div>' +
            
            '<div style="background:white;border-radius:10px;padding:15px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">📱 Versão</h3>' +
            '<button onclick="mostrarInfoVersao()" style="width:100%;background:#e5e7eb;border:none;padding:12px;border-radius:8px;cursor:pointer;">🏗️ LPXConstrutor v1.0.0</button></div>';
    } else if (secao === 'alertas') {
        c.innerHTML = 
            '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">🔔 Central de Notificações</h3>' +
            '<div style="text-align:center;padding:30px;"><div style="font-size:50px;">🔔</div><p style="color:#666;">Nenhuma notificação no momento</p></div></div>' +
            '<div style="background:white;border-radius:10px;padding:15px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' +
            '<h3 style="color:#1A3A5C;">⚙️ Preferências</h3>' +
            '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><input type="checkbox" checked> Novas vagas publicadas</label>' +
            '<label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><input type="checkbox" checked> Candidaturas recebidas</label>' +
            '<label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" checked> Mensagens novas</label></div>';
    }
};

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
        s.mostrarToast('✅ Foto atualizada!', 'sucesso');
        s.carregarMeuPerfil();
    };
    reader.readAsDataURL(file);
};

App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    
    var html = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;">';
    html += '<h3 style="text-align:center;color:#1A3A5C;">✏️ Editar Perfil</h3>';
    html += '<label style="font-weight:bold;">Nome</label><input id="editNome" value="' + (user.nome || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<label style="font-weight:bold;">Celular</label><input id="editCelular" value="' + (user.celular || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<label style="font-weight:bold;">Profissão</label><input id="editProfissao" value="' + (user.profissao || '') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<label style="font-weight:bold;">Experiência (anos)</label><input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;box-sizing:border-box;">';
    html += '<button onclick="salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;margin-bottom:5px;">💾 SALVAR</button>';
    html += '<button onclick="fecharModal(\'modalEditar\')" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button>';
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
    
    fecharModal('modalEditar');
    s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    var tela = document.getElementById('documentoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    var titulos = { termos: '📄 Termos de Uso', privacidade: '🔒 Política de Privacidade', diretrizes: '📋 Diretrizes da Comunidade', sobre: 'ℹ️ Sobre o LPXCONSTRUTOR' };
    var conteudos = {
        termos: '<h3 style="color:#1A3A5C;">1. Aceitação dos Termos</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda integralmente com estes Termos de Uso.</p><h3 style="color:#1A3A5C;">2. Cadastro</h3><p>O cadastro é gratuito e requer informações verídicas.</p><h3 style="color:#1A3A5C;">3. Conduta</h3><p>É proibido: discriminação, assédio, informações falsas.</p><h3 style="color:#1A3A5C;">4. Contato</h3><p>contato@lpxconstrutor.com.br</p>',
        privacidade: '<h3 style="color:#1A3A5C;">1. LGPD</h3><p>Protegemos seus dados conforme a Lei 13.709/2018.</p><h3 style="color:#1A3A5C;">2. Dados Coletados</h3><p>Nome, email, telefone, profissão.</p><h3 style="color:#1A3A5C;">3. Seus Direitos</h3><p>Acessar, corrigir e excluir dados.</p>',
        diretrizes: '<h3 style="color:#1A3A5C;">1. Respeito Mútuo</h3><p>Trate todos com profissionalismo.</p><h3 style="color:#1A3A5C;">2. Segurança</h3><p>Use EPIs e siga normas.</p><h3 style="color:#1A3A5C;">3. Qualidade</h3><p>Entregue no prazo combinado.</p>',
        sobre: '<div style="text-align:center;"><img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100px;"><h2 style="color:#1A3A5C;">LPXCONSTRUTOR</h2><p><strong>Versão 1.0.0</strong></p><p>Rede Profissional da Construção Civil</p><hr><p><strong>Desenvolvido por:</strong> LPX Tecnologia</p><p><strong>Email:</strong> contato@lpxconstrutor.com.br</p><p style="color:#999;">© 2024 LPXCONSTRUTOR</p></div>'
    };
    
    tela.innerHTML = '<div style="min-height:100vh;background:#f5f5f5;">' +
        '<div style="background:#1A3A5C;color:white;padding:20px;display:flex;align-items:center;gap:15px;">' +
        '<button onclick="voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2 style="margin:0;font-size:18px;">' + (titulos[tipo] || '') + '</h2></div>' +
        '<div style="padding:20px;background:white;margin:10px;border-radius:12px;line-height:1.8;">' + (conteudos[tipo] || '') + '</div></div>';
    
    s.mostrarTela('documentoScreen');
};

// ===== TEMA E IDIOMA =====
App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    this.mostrarToast('🎨 Tema ' + (tema === 'escuro' ? 'escuro' : 'claro') + '!', 'sucesso');
    this.carregarMeuPerfil();
};

App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    var nomes = { pt: 'Português', en: 'English', es: 'Español' };
    this.mostrarToast('🌐 Idioma: ' + (nomes[idioma] || idioma), 'sucesso');
    this.carregarMeuPerfil();
};

App.prototype.mostrarInfoVersao = function() {
    this.mostrarToast('🏗️ LPXConstrutor v1.0.0 - Rede Profissional da Construção', 'info');
};

// ===== TOAST =====
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
    if (splashAntigo) splashAntigo.remove();
    
    appInstancia = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO!');
    console.log('📋 Funcionalidades:');
    console.log('  ✅ Login/Cadastro');
    console.log('  ✅ Feed com obras');
    console.log('  ✅ Rede de conexões');
    console.log('  ✅ Busca de profissionais');
    console.log('  ✅ Chat');
    console.log('  ✅ Perfil completo');
    console.log('  ✅ Tema claro/escuro');
    console.log('  ✅ Idiomas PT/EN/ES');
    console.log('  ✅ Documentos');
    console.log('  ✅ Versão do app');
});
