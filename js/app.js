// ==========================================================
// ===== CORREÇÃO COMPLETA DO SISTEMA DE MENSAGENS =====
// ==========================================================

// ===== 1. LISTA DE CONVERSAS CORRIGIDA =====
App.prototype.carregarListaConversas = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    s.usuarioSelecionado = null;
    s.pararListenerChat();
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;"><h3 style="margin:0;">💬 Mensagens</h3></div><div id="listaConversas" style="padding:10px;"><div style="text-align:center;padding:30px;">🔍 Buscando conversas...</div></div>';
    s.mostrarTela('chatScreen');
    s.buscarTodasConversas();
};

// ===== BUSCAR TODAS AS CONVERSAS (LOCAL + FIREBASE) =====
App.prototype.buscarTodasConversas = function() {
    var s = this;
    var container = document.getElementById('listaConversas');
    if (!container) return;
    
    // Primeiro buscar conexões (amigos)
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var minhasConexoes = [];
    
    for (var i = 0; i < conexoes.length; i++) {
        if (conexoes[i].usuarioId === s.usuarioLogado.id || conexoes[i].amigoId === s.usuarioLogado.id) {
            minhasConexoes.push(conexoes[i]);
        }
    }
    
    // Também buscar mensagens existentes
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    var conversasMap = {};
    
    // Agrupar mensagens por conversa
    for (var j = 0; j < mensagens.length; j++) {
        var msg = mensagens[j];
        if (msg.remetenteId === s.usuarioLogado.id || msg.destinatarioId === s.usuarioLogado.id) {
            var outroId = msg.remetenteId === s.usuarioLogado.id ? msg.destinatarioId : msg.remetenteId;
            if (!conversasMap[outroId]) {
                conversasMap[outroId] = {
                    id: outroId,
                    ultimaMensagem: msg.conteudo,
                    data: msg.dataEnvio || msg.data,
                    naoLidas: 0
                };
            } else {
                // Atualizar com a mensagem mais recente
                var dataAtual = conversasMap[outroId].data;
                var dataNova = msg.dataEnvio || msg.data;
                if (new Date(dataNova) > new Date(dataAtual)) {
                    conversasMap[outroId].ultimaMensagem = msg.conteudo;
                    conversasMap[outroId].data = dataNova;
                }
            }
        }
    }
    
    // Adicionar conexões que não têm mensagens ainda
    for (var k = 0; k < minhasConexoes.length; k++) {
        var amigoId = minhasConexoes[k].usuarioId === s.usuarioLogado.id ? 
                      minhasConexoes[k].amigoId : minhasConexoes[k].usuarioId;
        
        if (!conversasMap[amigoId]) {
            conversasMap[amigoId] = {
                id: amigoId,
                ultimaMensagem: 'Toque para conversar',
                data: new Date().toISOString(),
                naoLidas: 0,
                semMensagens: true
            };
        }
    }
    
    // Buscar nomes e fotos dos usuários
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var ids = Object.keys(conversasMap);
    
    for (var m = 0; m < ids.length; m++) {
        var uid = ids[m];
        var user = usuarios.find(function(u) { return u.id === uid; });
        if (user) {
            conversasMap[uid].nome = user.nome;
            conversasMap[uid].foto = user.fotoPerfil;
            conversasMap[uid].profissao = user.profissao;
        }
    }
    
    // Contar mensagens não lidas
    for (var n = 0; n < mensagens.length; n++) {
        var m2 = mensagens[n];
        if (m2.destinatarioId === s.usuarioLogado.id && !m2.lida) {
            if (conversasMap[m2.remetenteId]) {
                conversasMap[m2.remetenteId].naoLidas++;
            }
        }
    }
    
    console.log('📊 Conversas encontradas:', ids.length);
    s.renderizarListaConversas(conversasMap, container);
    
    // Atualizar badge com total de não lidas
    s.atualizarBadgeMensagens();
};

// ===== ATUALIZAR BADGE DE MENSAGENS (NÚMERO VERMELHO) =====
App.prototype.atualizarBadgeMensagens = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    var naoLidas = 0;
    
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].destinatarioId === s.usuarioLogado.id && !mensagens[i].lida) {
            naoLidas++;
        }
    }
    
    console.log('🔴 Mensagens não lidas:', naoLidas);
    
    // Atualizar badge de notificações geral
    var badge = document.getElementById('badgeNotificacoes');
    if (badge) {
        if (naoLidas > 0) {
            badge.textContent = naoLidas > 99 ? '99+' : naoLidas;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    // Também atualizar contador na lista de conversas
    var totalNaoLidas = document.getElementById('totalNaoLidas');
    if (totalNaoLidas) {
        totalNaoLidas.textContent = naoLidas;
        totalNaoLidas.style.display = naoLidas > 0 ? 'inline' : 'none';
    }
};

// ===== RENDERIZAR LISTA DE CONVERSAS (MELHORADA) =====
App.prototype.renderizarListaConversas = function(conversas, container) {
    var s = this;
    var ids = Object.keys(conversas);
    
    // Ordenar por data (mais recente primeiro)
    ids.sort(function(a, b) {
        var da = new Date(conversas[a].data || 0);
        var db = new Date(conversas[b].data || 0);
        return db - da;
    });
    
    if (ids.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;">' +
            '<div style="font-size:50px;">💬</div>' +
            '<h3>Nenhuma conversa</h3>' +
            '<p style="color:#666;">Adicione profissionais na rede para conversar</p>' +
            '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">🔍 Buscar Profissionais</button>' +
            '</div>';
        return;
    }
    
    var html = '';
    
    for (var i = 0; i < ids.length; i++) {
        var conv = conversas[ids[i]];
        var nome = conv.nome || 'Usuário (' + conv.id.substring(0, 8) + '...)';
        var ultimaMsg = conv.ultimaMensagem || 'Nova conversa';
        var naoLidas = conv.naoLidas || 0;
        var data = conv.data ? new Date(conv.data) : new Date();
        var dataStr = '';
        
        // Formatar data
        var hoje = new Date();
        if (data.toDateString() === hoje.toDateString()) {
            dataStr = data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        } else {
            dataStr = data.toLocaleDateString('pt-BR');
        }
        
        html += '<div onclick="window.app.abrirConversa(\'' + conv.id + '\')" style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;' + 
            (naoLidas > 0 ? 'border-left:4px solid #10B981;background:#f0fdf4;' : '') + '">';
        
        // Avatar
        html += '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;flex-shrink:0;">';
        if (conv.foto) {
            html += '<img src="' + conv.foto + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            html += '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:22px;">👷</div>';
        }
        html += '</div>';
        
        // Info
        html += '<div style="flex:1;min-width:0;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
        html += '<strong style="color:#1A3A5C;">' + nome + '</strong>';
        html += '<span style="font-size:11px;color:#999;">' + dataStr + '</span>';
        html += '</div>';
        html += '<div style="font-size:13px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + ultimaMsg + '</div>';
        if (conv.profissao) html += '<small style="color:#999;">🔧 ' + conv.profissao + '</small>';
        html += '</div>';
        
        // Badge de não lidas
        if (naoLidas > 0) {
            html += '<span style="background:#EF4444;color:white;border-radius:50%;min-width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;flex-shrink:0;">' + naoLidas + '</span>';
        }
        
        html += '</div>';
    }
    
    container.innerHTML = html;
};

// ===== ABRIR CONVERSA E MARCAR COMO LIDA =====
App.prototype.abrirConversa = function(uid) {
    var s = this;
    console.log('💬 Abrindo conversa com:', uid);
    
    // Buscar dados do usuário
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var user = usuarios.find(function(u) { return u.id === uid; });
    
    if (user) {
        s.usuarioSelecionado = user;
        s.abrirChat(user);
        s.iniciarListenerMensagens();
        
        // MARCAR MENSAGENS COMO LIDAS
        s.marcarMensagensComoLidas(uid);
        return;
    }
    
    // Se não encontrou no localStorage, criar um usuário básico
    var userBasico = {
        id: uid,
        nome: 'Usuário',
        profissao: 'Profissional',
        fotoPerfil: null
    };
    s.usuarioSelecionado = userBasico;
    s.abrirChat(userBasico);
    s.iniciarListenerMensagens();
    s.marcarMensagensComoLidas(uid);
};

// ===== MARCAR MENSAGENS COMO LIDAS =====
App.prototype.marcarMensagensComoLidas = function(remetenteId) {
    var s = this;
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    var alterou = false;
    
    for (var i = 0; i < mensagens.length; i++) {
        if (mensagens[i].destinatarioId === s.usuarioLogado.id && 
            mensagens[i].remetenteId === remetenteId && 
            !mensagens[i].lida) {
            mensagens[i].lida = true;
            alterou = true;
        }
    }
    
    if (alterou) {
        localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
        console.log('✅ Mensagens marcadas como lidas');
        s.atualizarBadgeMensagens();
    }
};

// ===== ENVIAR MENSAGEM (COM NOTIFICAÇÃO GARANTIDA) =====
App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioSelecionado) return;
    
    var texto = input.value.trim();
    if (!texto) return;
    
    // Evitar envio duplicado
    if (s._enviandoMensagem) return;
    s._enviandoMensagem = true;
    
    var btnEnviar = document.getElementById('btnEnviarMsg');
    if (btnEnviar) { btnEnviar.disabled = true; btnEnviar.textContent = '...'; }
    
    console.log('📤 Enviando para:', s.usuarioSelecionado.nome);
    
    // Salvar no localStorage
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    var novaMsg = {
        id: 'msg_' + Date.now(),
        remetenteId: s.usuarioLogado.id,
        destinatarioId: s.usuarioSelecionado.id,
        conteudo: texto,
        lida: false,
        dataEnvio: new Date().toISOString()
    };
    mensagens.push(novaMsg);
    localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
    
    console.log('💾 Mensagem salva localmente');
    
    // Tentar Firebase também
    if (typeof db !== 'undefined') {
        db.collection('mensagens').add({
            remetenteId: s.usuarioLogado.id,
            destinatarioId: s.usuarioSelecionado.id,
            participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
            conteudo: texto,
            lida: false,
            dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            console.log('🔥 Mensagem salva no Firebase');
        }).catch(function(err) {
            console.log('⚠️ Firebase offline, apenas local');
        });
    }
    
    // Limpar input
    input.value = '';
    input.focus();
    s._enviandoMensagem = false;
    if (btnEnviar) { btnEnviar.disabled = false; btnEnviar.textContent = 'Enviar'; }
    
    // NOTIFICAR O DESTINATÁRIO
    s.adicionarNotificacao(
        s.usuarioSelecionado.id,
        '💬 ' + s.usuarioLogado.nome,
        texto.substring(0, 50)
    );
    
    // Atualizar a tela de chat
    s.carregarMensagensLocal();
    
    // Mostrar toast de confirmação
    s.mostrarToast('✅ Enviado!', 'sucesso');
};

// ===== CARREGAR MENSAGENS LOCAL =====
App.prototype.carregarMensagensLocal = function() {
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
    for (var j = 0; j < relevantes.length; j++) {
        var msg = relevantes[j];
        var ehMeu = msg.remetenteId === s.usuarioLogado.id;
        var data = '';
        try {
            data = new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        } catch(e) {
            data = '';
        }
        
        html += '<div style="display:flex;justify-content:' + (ehMeu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;">';
        html += '<div style="max-width:75%;padding:10px 14px;border-radius:18px;' + 
            (ehMeu ? 'background:#1A3A5C;color:white;border-bottom-right-radius:4px;' : 
                    'background:white;color:#333;border-bottom-left-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.1);') + '">';
        html += '<div style="font-size:14px;">' + msg.conteudo + '</div>';
        html += '<div style="font-size:10px;opacity:0.7;text-align:right;margin-top:3px;">' + data + (ehMeu ? ' ✓' : '') + '</div>';
        html += '</div></div>';
    }
    
    c.innerHTML = html;
    c.scrollTop = c.scrollHeight;
};

// ===== LISTENER DE MENSAGENS (VERIFICA NOVAS MENSAGENS) =====
App.prototype.iniciarListenerMensagens = function() {
    var s = this;
    
    // Verificar novas mensagens a cada 3 segundos
    if (s._intervaloVerificarMsg) clearInterval(s._intervaloVerificarMsg);
    
    s._intervaloVerificarMsg = setInterval(function() {
        if (!s.usuarioLogado || !s.usuarioSelecionado) return;
        
        var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        var novasRecebidas = [];
        
        for (var i = 0; i < mensagens.length; i++) {
            var m = mensagens[i];
            if (m.remetenteId === s.usuarioSelecionado.id && 
                m.destinatarioId === s.usuarioLogado.id && 
                !m.lida) {
                novasRecebidas.push(m);
                // Marcar como lida se estiver na tela de chat
                if (s.telaAtual === 'chatScreen') {
                    mensagens[i].lida = true;
                }
            }
        }
        
        if (novasRecebidas.length > 0) {
            localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
            
            // Atualizar tela de chat
            if (s.telaAtual === 'chatScreen') {
                s.carregarMensagensLocal();
            }
            
            // Notificar se não estiver na tela
            if (s.telaAtual !== 'chatScreen') {
                s.adicionarNotificacao(
                    s.usuarioLogado.id,
                    '💬 ' + (s.usuarioSelecionado.nome || 'Nova mensagem'),
                    novasRecebidas[novasRecebidas.length - 1].conteudo.substring(0, 50)
                );
            }
            
            s.atualizarBadgeMensagens();
        }
    }, 2000); // Verificar a cada 2 segundos
};

// ===== PARAR VERIFICAÇÃO DE MENSAGENS =====
App.prototype.pararListenerChat = function() {
    if (this._intervaloVerificarMsg) {
        clearInterval(this._intervaloVerificarMsg);
        this._intervaloVerificarMsg = null;
    }
};

// ===== CORREÇÃO NO MOSTRAR TELA =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    var splash = document.getElementById('splashScreen');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    
    var telas = document.querySelectorAll('.screen');
    for (var i = 0; i < telas.length; i++) { telas[i].classList.remove('active'); telas[i].style.display = 'none'; }
    
    var tela = document.getElementById(id);
    if (!tela) { tela = document.createElement('div'); tela.id = id; tela.className = 'screen'; tela.style.display = 'none'; document.body.appendChild(tela); }
    
    tela.classList.add('active'); tela.style.display = 'block'; s.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasSemNav = ['loginScreen', 'cadastroScreen', 'recuperarSenhaScreen'];
        if (telasSemNav.indexOf(id) >= 0) { nav.style.display = 'none'; }
        else { var mostrar = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen','publicarVagaScreen','configScreen']; nav.style.display = mostrar.indexOf(id) >= 0 ? 'flex' : 'none'; }
    }
    
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen') {
        if (s.usuarioSelecionado) { 
            s.carregarMensagensLocal(); 
        } else { 
            s.carregarListaConversas(); 
        }
    }
    if (id === 'configScreen') s.carregarConfigScreen();
};

// ===== ATUALIZAR NOTIFICAÇÕES (INCLUIR MENSAGENS) =====
App.prototype.atualizarBadgeNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
    
    // Contar notificações não lidas
    var notifNaoLidas = 0;
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].usuarioId === s.usuarioLogado.id && !notificacoes[i].lida) {
            notifNaoLidas++;
        }
    }
    
    // Contar mensagens não lidas
    var msgNaoLidas = 0;
    for (var j = 0; j < mensagens.length; j++) {
        if (mensagens[j].destinatarioId === s.usuarioLogado.id && !mensagens[j].lida) {
            msgNaoLidas++;
        }
    }
    
    var totalNaoLidas = notifNaoLidas + msgNaoLidas;
    
    console.log('🔴 Total não lidas:', totalNaoLidas, '(notif:', notifNaoLidas, 'msg:', msgNaoLidas, ')');
    
    var badge = document.getElementById('badgeNotificacoes');
    if (badge) {
        if (totalNaoLidas > 0) {
            badge.textContent = totalNaoLidas > 99 ? '99+' : totalNaoLidas;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
};
