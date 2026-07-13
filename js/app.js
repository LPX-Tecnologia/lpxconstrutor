// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO FINAL CORRIGIDO =====
// ==========================================================

var appInstancia = null;

// Funções globais
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
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR');
    appInstancia = s;
    
    var salvo = localStorage.getItem('usuarioLPX');
    if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
    
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100px;"><p style="color:white;font-size:20px;font-weight:bold;margin-top:15px;">LPXCONSTRUTOR</p>';
    document.body.appendChild(splash);
    
    // Configurar o sino que já existe no HTML
    s.configurarSino();
    
    // Configurar bottom nav
    s.configurarBottomNav();
    
    setTimeout(function() {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
        if (s.usuarioLogado) { s.mostrarTela('homeScreen'); }
        else { s.mostrarTela('loginScreen'); }
    }, 1500);
};

// ===== CONFIGURAR SINO EXISTENTE =====
App.prototype.configurarSino = function() {
    var s = this;
    
    // Procurar o sino no HTML (pode ter vários IDs)
    var sinos = document.querySelectorAll('[onclick*="notificacao"], [onclick*="Notificacao"], .sino, .notification-bell, #btnNotificacoes, #notificacoesBtn');
    
    // Também procurar por qualquer elemento com ícone de sino
    var todosElementos = document.querySelectorAll('button, a, div, span, i');
    for (var i = 0; i < todosElementos.length; i++) {
        var el = todosElementos[i];
        var onclick = el.getAttribute('onclick') || '';
        var texto = (el.textContent || '').trim();
        var className = el.className || '';
        
        if (onclick.indexOf('notificac') >= 0 || onclick.indexOf('Notificac') >= 0 ||
            texto === '🔔' || texto.indexOf('🔔') >= 0 ||
            className.indexOf('notific') >= 0 || className.indexOf('bell') >= 0) {
            sinos.push(el);
        }
    }
    
    // Configurar cada sino encontrado
    for (var i = 0; i < sinos.length; i++) {
        var sino = sinos[i];
        sino.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            mostrarNotificacoes();
        };
        sino.style.cursor = 'pointer';
        sino.setAttribute('data-sino', 'true');
    }
    
    // Atualizar contador de notificações
    s.atualizarContadorNotificacoes();
};

App.prototype.atualizarContadorNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var naoLidas = 0;
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id && !notificacoes[i].lida) {
            naoLidas++;
        }
    }
    
    // Atualizar todos os sinos
    var sinos = document.querySelectorAll('[data-sino="true"]');
    for (var i = 0; i < sinos.length; i++) {
        var sino = sinos[i];
        if (naoLidas > 0) {
            sino.setAttribute('data-badge', naoLidas);
            sino.style.position = 'relative';
            
            // Remover badge anterior se existir
            var badgeAntigo = sino.querySelector('.badge-notificacao');
            if (badgeAntigo) badgeAntigo.remove();
            
            var badge = document.createElement('span');
            badge.className = 'badge-notificacao';
            badge.textContent = naoLidas > 99 ? '99+' : naoLidas;
            badge.style.cssText = 'position:absolute;top:-8px;right:-8px;background:#EF4444;color:white;border-radius:50%;min-width:20px;height:20px;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:bold;padding:2px;';
            sino.appendChild(badge);
        } else {
            var badge = sino.querySelector('.badge-notificacao');
            if (badge) badge.remove();
            sino.removeAttribute('data-badge');
        }
    }
};

// ===== CONFIGURAR BOTTOM NAV =====
App.prototype.configurarBottomNav = function() {
    var nav = document.getElementById('bottomNav');
    if (!nav) return;
    
    // Procurar botões dentro do bottomNav
    var botoes = nav.querySelectorAll('button, a, div[onclick], span[onclick]');
    
    for (var i = 0; i < botoes.length; i++) {
        var btn = botoes[i];
        var texto = (btn.textContent || '').toLowerCase().trim();
        var onclick = btn.getAttribute('onclick') || '';
        
        // Detectar qual botão é qual pelo texto ou ícone
        if (texto.indexOf('home') >= 0 || texto.indexOf('🏠') >= 0 || onclick.indexOf('home') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); mostrarTela('homeScreen'); };
        } else if (texto.indexOf('buscar') >= 0 || texto.indexOf('🔍') >= 0 || onclick.indexOf('buscar') >= 0 || onclick.indexOf('busca') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); mostrarTela('buscaScreen'); };
        } else if (texto.indexOf('perfil') >= 0 || texto.indexOf('👤') >= 0 || onclick.indexOf('perfil') >= 0 || onclick.indexOf('meuPerfil') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); mostrarTela('meuPerfilScreen'); };
        } else if (texto.indexOf('chat') >= 0 || texto.indexOf('💬') >= 0 || onclick.indexOf('chat') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); mostrarTela('chatScreen'); };
        } else if (texto.indexOf('obra') >= 0 || texto.indexOf('🏗️') >= 0 || onclick.indexOf('obra') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); mostrarTela('minhasObrasScreen'); };
        } else if (texto.indexOf('publicar') >= 0 || texto.indexOf('📢') >= 0 || onclick.indexOf('publicar') >= 0) {
            btn.onclick = function(e) { e.preventDefault(); abrirTelaPublicacao(); };
        }
        
        btn.style.cursor = 'pointer';
    }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Tela:', id);
    
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
        document.body.appendChild(tela);
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    // Atualizar bottom nav - destacar botão ativo
    s.destacarBotaoAtivo(id);
    
    // Carregar conteúdo
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen' && s.usuarioSelecionado) s.carregarMensagens();
};

App.prototype.destacarBotaoAtivo = function(id) {
    var nav = document.getElementById('bottomNav');
    if (!nav) return;
    
    var botoes = nav.querySelectorAll('button, a, div[onclick], span[onclick]');
    var mapaTelas = {
        'homeScreen': ['home', '🏠', 'inicio'],
        'buscaScreen': ['buscar', '🔍', 'busca'],
        'meuPerfilScreen': ['perfil', '👤'],
        'chatScreen': ['chat', '💬'],
        'minhasObrasScreen': ['obra', '🏗️'],
        'publicarVagaScreen': ['publicar', '📢']
    };
    
    var palavrasAtivas = mapaTelas[id] || [];
    
    for (var i = 0; i < botoes.length; i++) {
        var btn = botoes[i];
        var texto = (btn.textContent || '').toLowerCase();
        var ativo = false;
        
        for (var j = 0; j < palavrasAtivas.length; j++) {
            if (texto.indexOf(palavrasAtivas[j]) >= 0) {
                ativo = true;
                break;
            }
        }
        
        if (ativo) {
            btn.style.color = '#f59e0b';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.color = '';
            btn.style.fontWeight = '';
        }
    }
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
            s.atualizarContadorNotificacoes();
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
        score: 0, fotoPerfil: null
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
    html += '<div style="flex:1;"><span style="font-size:16px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div>';
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

// ===== APAGAR OBRA =====
App.prototype.apagarObra = function(oid, event) {
    event.stopPropagation();
    if (!confirm('Apagar esta obra?')) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var novas = [];
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id !== oid) novas.push(vagas[i]);
    }
    localStorage.setItem('vagasLPX', JSON.stringify(novas));
    
    this.adicionarNotificacao(this.usuarioLogado.id, '🗑️ Obra apagada', 'Sua obra foi removida.');
    this.mostrarToast('Obra apagada!', 'sucesso');
    this.carregarFeed();
};

// ===== NOTIFICAÇÕES =====
App.prototype.adicionarNotificacao = function(usuarioId, titulo, mensagem) {
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        usuarioId: usuarioId,
        titulo: titulo,
        mensagem: mensagem,
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    this.atualizarContadorNotificacoes();
};

App.prototype.mostrarNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var minhasNotif = [];
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) minhasNotif.push(notificacoes[i]);
    }
    
    // Marcar como lidas
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id) notificacoes[i].lida = true;
    }
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    s.atualizarContadorNotificacoes();
    
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
            html += '<div style="width:45px;height:45px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;" onclick="verPerfil(\'' + amigoId + '\')">👷</div>';
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
    
    s.adicionarNotificacao(amigoId, '🔗 Nova conexão!', (s.usuarioLogado.nome || 'Alguém') + ' adicionou você.');
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
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'chatScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<button onclick="voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 12px;border-radius:8px;cursor:pointer;">⬅</button>' +
        '<div style="flex:1;"><strong>💬 ' + user.nome + '</strong></div></div>' +
        '<div id="chatMensagens" style="padding:15px;height:calc(100vh - 140px);overflow-y:auto;background:#f5f5f5;"></div>' +
        '<div style="padding:10px;background:white;display:flex;gap:10px;">' +
        '<input id="chatInput" placeholder="Digite..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;">' +
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
        html += m.conteudo;
        html += '<div style="font-size:10px;opacity:0.7;">' + new Date(m.data).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) + '</div>';
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
        remetenteId: s.usuarioLogado.id,
        destinatarioId: s.usuarioSelecionado.id,
        conteudo: texto,
        data: new Date().toISOString()
    });
    localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
    
    s.adicionarNotificacao(s.usuarioSelecionado.id, '💬 Nova mensagem', s.usuarioLogado.nome + ' enviou uma mensagem.');
    
    input.value = '';
    s.carregarMensagens();
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    var todos = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var profissionais = [];
    var meuId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].tipo === 'profissional' && todos[i].id !== meuId) {
            profissionais.push(todos[i]);
        }
    }
    
    if (profissionais.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">👷</div><h3>Nenhum profissional</h3></div>';
        return;
    }
    
    var html = '<div style="text-align:center;padding:8px;">' + profissionais.length + ' profissional(is)</div>';
    
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:50px;height:50px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;" onclick="verPerfil(\'' + p.id + '\')">👷</div>';
        html += '<div style="flex:1;cursor:pointer;" onclick="verPerfil(\'' + p.id + '\')">';
        html += '<div style="font-weight:bold;">' + p.nome + '</div>';
        html += '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>';
        html += '</div>';
        html += '<button onclick="event.stopPropagation();iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button>';
        html += '<button onclick="event.stopPropagation();adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;">+</button>';
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
        '<div style="font-size:60px;">👷</div><h2>' + user.nome + '</h2>' +
        '<p>🔧 ' + (user.profissao || 'Profissional') + ' | ⭐ ' + (user.score || 0).toFixed(1) + '</p></div>' +
        '<div style="padding:20px;">' +
        '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;">' +
        '<p>📧 ' + (user.email || '') + '</p><p>📱 ' + (user.celular || '') + '</p></div>' +
        '<button onclick="iniciarChat(\'' + user.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">💬 Chat</button>' +
        '<button onclick="adicionarNaRede(\'' + user.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🔗 Adicionar</button>' +
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
        '<h2 style="text-align:center;">📢 PUBLICAR OBRA</h2>' +
        '<input id="pubTitulo" placeholder="Título *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubEndereco" placeholder="Endereço *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubProfissoes" placeholder="Profissões" value="Geral" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<input id="pubValor" type="number" placeholder="Valor/hora (R$) *" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">' +
        '<img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;max-height:150px;object-fit:contain;border-radius:8px;border:2px dashed #ddd;margin-bottom:8px;">' +
        '<input type="file" id="pubFotoInput" accept="image/*" onchange="previewFotoObra(event)" style="display:none;">' +
        '<button onclick="document.getElementById(\'pubFotoInput\').click()" style="background:#e5e7eb;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;margin-bottom:15px;">📁 Foto</button>' +
        '<button onclick="publicarVaga()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">📢 PUBLICAR</button>' +
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
    
    if (!titulo) { s.mostrarToast('Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('Digite o endereço!', 'erro'); return; }
    if (!valor) { s.mostrarToast('Digite o valor!', 'erro'); return; }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: valor,
        fotoObra: s.vagaFotoBase64 || null, status: 'disponivel',
        autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null, dataCriacao: new Date().toISOString()
    };
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    document.getElementById('pubTitulo').value = '';
    document.getElementById('pubEndereco').value = '';
    document.getElementById('pubProfissoes').value = 'Geral';
    document.getElementById('pubValor').value = '';
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
    s.vagaFotoBase64 = null;
    
    s.mostrarToast('✅ Obra publicada!', 'sucesso');
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
    
    if (minhas.length === 0) {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>';
        return;
    }
    
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
    html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button>';
    html += '</div></div></div>';
    
    fecharModal('modalObra');
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
        '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:0 auto 10px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:35px;">👷</div>') +
        '</div><input type="file" id="inputFoto" accept="image/*" onchange="uploadFotoPerfil(event)" style="display:none;">' +
        '<h2>' + user.nome + '</h2><p>' + (user.profissao || user.tipo || '') + '</p></div>' +
        
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
            '<div style="background:white;border-radius:10px;padding:15px;"><h3>📄 Documentos</h3>' +
            '<button onclick="mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button>' +
            '<button onclick="mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Privacidade</button>' +
            '<button onclick="mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;background:#e5e7eb;border:none;padding:10px;border-radius:8px;cursor:pointer;">ℹ️ Sobre</button></div>';
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
        s.mostrarToast('Foto atualizada!', 'sucesso');
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
    html += '<h3 style="text-align:center;">✏️ Editar Perfil</h3>';
    html += '<input id="editNome" value="' + (user.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editCelular" value="' + (user.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editProfissao" value="' + (user.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;box-sizing:border-box;">';
    html += '<input id="editExperiencia" type="number" value="' + (user.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;box-sizing:border-box;">';
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
    s.mostrarToast('Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

App.prototype.mostrarDocumento = function(tipo) {
    var tela = document.getElementById('documentoScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'documentoScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
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
    console.log('✅ LPXCONSTRUTOR COMPLETO!');
    console.log('✅ Sino configurado');
    console.log('✅ Bottom nav configurado');
    console.log('✅ Buscar, Chat, Perfil acessíveis');
});
