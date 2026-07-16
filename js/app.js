// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO FINAL =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

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
window.app.selecionarTema = function(t) { if(window.app._app) window.app._app.selecionarTema(t); };
window.app.mostrarDocumento = function(t) { if(window.app._app) window.app._app.mostrarDocumento(t); };
window.app.mudarTab = function(t) { if(window.app._app) window.app._app.mudarTab(t); };
window.app.adicionarNaRede = function(uid) { if(window.app._app) window.app._app.adicionarNaRede(uid); };
window.app.removerDaRede = function(uid) { if(window.app._app) window.app._app.removerDaRede(uid); };
window.app.apagarObra = function(oid, event) { if(window.app._app) window.app._app.apagarObra(oid, event); };
window.app.mostrarNotificacoes = function() { if(window.app._app) window.app._app.mostrarNotificacoes(); };
window.app.iniciarChat = function(uid) { if(window.app._app) window.app._app.iniciarChat(uid); };
window.app.enviarMensagem = function() { if(window.app._app) window.app._app.enviarMensagem(); };
window.app.gerarQRCodeCompartilhar = function() { if(window.app._app) window.app._app.gerarQRCodeCompartilhar(); };
window.app.fecharQRCode = function() { var m = document.getElementById('modalQRCodeCompartilhar'); if(m) m.remove(); };
window.app.abrirMapaLocalizacao = function() { if(window.app._app) window.app._app.abrirMapaLocalizacao(); };
window.app.salvarLocalizacao = function() { if(window.app._app) window.app._app.salvarLocalizacao(); };
window.app.atualizarCidades = function(c) { if(window.app._app) window.app._app.atualizarCidades(c); };
window.app.atualizarBairros = function(b) { if(window.app._app) window.app._app.atualizarBairros(b); };
window.app.aceitarConvite = function(nid, de) { if(window.app._app) window.app._app.aceitarConvite(nid, de); };
window.app.recusarConvite = function(nid, de) { if(window.app._app) window.app._app.recusarConvite(nid, de); };

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.tabAtual = 'feed';
    this.temaAtual = localStorage.getItem('tema') || 'claro';
    this._enviandoMensagem = false;
    this._listenerFeed = null;
    this._listenerRede = null;
    this._listenerChat = null;
    this._listenerNotificacoes = null;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR COMPLETO');
    window.app._app = s;
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    var splashAntigo = document.getElementById('splashScreen'); if (splashAntigo && splashAntigo.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    
    var splash = document.createElement('div'); splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('🔥 Logado:', user.email);
                if (typeof db !== 'undefined') {
                    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            s.usuarioLogado = doc.data(); s.usuarioLogado.id = doc.id;
                            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                            s.mostrarTela('homeScreen');
                            s.iniciarListenerNotificacoes();
                        }
                    });
                }
            } else {
                s.usuarioLogado = null; localStorage.removeItem('usuarioLPX');
                s.mostrarTela('loginScreen');
            }
            setTimeout(function() { splash.style.opacity = '0'; setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 500); }, 2000);
        });
    } else {
        var salvo = localStorage.getItem('usuarioLPX');
        if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
        setTimeout(function() { splash.style.opacity = '0'; setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); if (s.usuarioLogado) s.mostrarTela('homeScreen'); else s.mostrarTela('loginScreen'); }, 500); }, 2000);
    }
};

// ===== LISTENER DE NOTIFICAÇÕES EM TEMPO REAL =====
App.prototype.iniciarListenerNotificacoes = function() {
    var s = this;
    if (typeof db === 'undefined' || !s.usuarioLogado) return;
    if (s._listenerNotificacoes) s._listenerNotificacoes();
    
    s._listenerNotificacoes = db.collection('notificacoes')
        .where('usuarioId', '==', s.usuarioLogado.id)
        .where('lida', '==', false)
        .onSnapshot(function(snap) {
            var count = snap.size;
            var badge = document.getElementById('badgeNotificacoes');
            if (badge) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
            if (count > 0) {
                snap.docChanges().forEach(function(change) {
                    if (change.type === 'added') {
                        var n = change.doc.data();
                        s.mostrarToast('🔔 ' + n.titulo, 'info');
                    }
                });
            }
        });
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    var telas = document.querySelectorAll('.screen'); for (var i = 0; i < telas.length; i++) { telas[i].classList.remove('active'); telas[i].style.display = 'none'; }
    var tela = document.getElementById(id); if (!tela) { tela = document.createElement('div'); tela.id = id; tela.className = 'screen'; tela.style.display = 'none'; document.body.appendChild(tela); }
    tela.classList.add('active'); tela.style.display = 'block'; s.telaAtual = id;
    var nav = document.getElementById('bottomNav');
    if (nav) { var semNav = ['loginScreen','cadastroScreen','recuperarSenhaScreen']; nav.style.display = semNav.indexOf(id) >= 0 ? 'none' : 'flex'; }
    if (id === 'homeScreen') s.carregarHome();
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
    if (id === 'buscaScreen') s.buscarProfissionais();
    if (id === 'minhasObrasScreen') s.carregarMinhasObras();
    if (id === 'chatScreen') s.carregarListaConversas();
    if (id === 'configScreen') s.carregarConfigScreen();
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) this.mostrarTela(this.historicoTelas.pop());
    else this.mostrarTela('homeScreen');
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = (document.getElementById('loginEmail') || {}).value || '';
    var senha = (document.getElementById('loginSenha') || {}).value || '';
    if (!email || !senha) { s.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    s.mostrarToast('Entrando...', 'info');
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(userCredential) {
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(userCredential.user.uid).get().then(function(doc) {
                    if (doc.exists) {
                        s.usuarioLogado = doc.data(); s.usuarioLogado.id = doc.id;
                        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                        s.historicoTelas = [];
                        s.mostrarToast('Bem-vindo, ' + s.usuarioLogado.nome + '!', 'sucesso');
                        s.mostrarTela('homeScreen');
                        s.iniciarListenerNotificacoes();
                    }
                });
            }
        }).catch(function(err) { s.mostrarToast('Email ou senha incorretos!', 'erro'); });
    }
};

// ===== CADASTRO =====
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
        score: 0, fotoPerfil: null, localizacao: null,
        dataCadastro: firebase.firestore?.FieldValue?.serverTimestamp() || new Date().toISOString()
    };
    if (!dados.nome || !dados.email || !dados.senha) { s.mostrarToast('Preencha todos!', 'erro'); return; }
    s.mostrarToast('Cadastrando...', 'info');
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha).then(function(userCredential) {
            var uid = userCredential.user.uid; dados.id = uid;
            if (typeof db !== 'undefined') {
                db.collection('usuarios').doc(uid).set(dados).then(function() {
                    s.usuarioLogado = dados;
                    localStorage.setItem('usuarioLPX', JSON.stringify(dados));
                    s.historicoTelas = [];
                    s.mostrarToast('Cadastro realizado!', 'sucesso');
                    s.mostrarTela('homeScreen');
                });
            }
        }).catch(function(err) {
            if (err.code === 'auth/email-already-in-use') s.mostrarToast('Email já cadastrado!', 'erro');
            else s.mostrarToast('Erro: ' + err.message, 'erro');
        });
    }
};

App.prototype.sair = function() {
    if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut();
    this.usuarioLogado = null; localStorage.removeItem('usuarioLPX');
    this.historicoTelas = []; this.mostrarTela('loginScreen');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this; if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    var user = s.usuarioLogado, home = document.getElementById('homeScreen'); if (!home) return;
    var h = new Date().getHours(), sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    var html = '<div style="background:#1A3A5C;color:white;padding:12px 15px;display:flex;align-items:center;">';
    html += '<div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;margin-right:10px;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') + '</div>';
    html += '<div style="flex:1;"><span style="font-size:15px;">👋 ' + sd + ', <b>' + user.nome + '</b>!</span></div><span style="font-size:12px;">' + (user.tipo === 'empreiteiro' ? '🏢' : '👷') + '</span></div>';
    html += '<div style="display:flex;background:white;padding:8px;gap:5px;"><button id="tabFeed" onclick="window.app.mudarTab(\'feed\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">📋 FEED</button><button id="tabRede" onclick="window.app.mudarTab(\'rede\')" style="flex:1;background:#e5e7eb;color:#1A3A5C;border:none;padding:10px;border-radius:20px;font-weight:bold;cursor:pointer;">🔗 REDE</button></div>';
    html += '<div id="feedContainer" style="padding:10px;"></div><div id="redeContainer" style="padding:10px;display:none;"></div>';
    if (user.tipo === 'empreiteiro') html += '<button onclick="window.app.abrirTelaPublicacao()" style="position:fixed;bottom:80px;right:20px;width:55px;height:55px;background:#f59e0b;color:white;border:none;border-radius:50%;font-size:24px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:998;cursor:pointer;">📢</button>';
    home.innerHTML = html; s.carregarFeed();
};

App.prototype.mudarTab = function(tab) { this.tabAtual = tab; var bf = document.getElementById('tabFeed'), br = document.getElementById('tabRede'); if (bf) { bf.style.background = tab === 'feed' ? '#1A3A5C' : '#e5e7eb'; bf.style.color = tab === 'feed' ? 'white' : '#1A3A5C'; } if (br) { br.style.background = tab === 'rede' ? '#1A3A5C' : '#e5e7eb'; br.style.color = tab === 'rede' ? 'white' : '#1A3A5C'; } var fc = document.getElementById('feedContainer'), rc = document.getElementById('redeContainer'); if (fc) fc.style.display = tab === 'feed' ? 'block' : 'none'; if (rc) rc.style.display = tab === 'rede' ? 'block' : 'none'; if (tab === 'feed') this.carregarFeed(); if (tab === 'rede') this.carregarRede(); };

// ===== FEED (TEMPO REAL) =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando obras...</div>';
    if (typeof db !== 'undefined') {
        if (s._listenerFeed) s._listenerFeed();
        s._listenerFeed = db.collection('vagas').where('ativa', '==', true).orderBy('dataCriacao', 'desc')
            .onSnapshot(function(snap) {
                var vagas = []; snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; vagas.push(v); });
                s.renderizarFeed(c, vagas);
            });
    }
};

App.prototype.renderizarFeed = function(c, vagas) {
    var s = this;
    if (vagas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">📢 PUBLICAR</button>' : '') + '</div>'; return; }
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i], destaque = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;' + (destaque ? 'border:3px solid #f59e0b;' : '') + '">';
        if (destaque) html += '<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span style="background:#f59e0b;color:white;padding:3px 10px;border-radius:10px;font-size:11px;">⭐ SUA OBRA</span><button onclick="window.app.apagarObra(\'' + v.id + '\', event)" style="background:#EF4444;color:white;border:none;padding:3px 10px;border-radius:10px;font-size:11px;cursor:pointer;">🗑️</button></div>';
        if (v.fotoObra && v.fotoObra.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px;">';
        html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><div style="font-weight:bold;font-size:16px;">' + (v.titulo || 'Sem título') + '</div><div style="color:#666;font-size:13px;">📍 ' + (v.endereco || '') + '</div><div style="font-size:11px;color:#999;">👤 ' + (v.autorNome || 'Anônimo') + '</div><div style="margin-top:8px;"><span style="background:#10B981;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span> <span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span></div></div></div>';
    }
    c.innerHTML = html;
};

App.prototype.apagarObra = function(oid, event) { if (event) event.stopPropagation(); if (!confirm('Apagar?')) return; if (typeof db !== 'undefined') db.collection('vagas').doc(oid).update({ ativa: false }); this.mostrarToast('Apagada!', 'sucesso'); };

// ===== PUBLICAR (LAYOUT ORIGINAL) =====
App.prototype.abrirTelaPublicacao = function() {
    var s = this; if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    var tela = document.getElementById('publicarVagaScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'publicarVagaScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    tela.innerHTML = '<div style="padding:20px;max-width:500px;margin:0 auto;"><h2 style="text-align:center;color:#1A3A5C;">📢 PUBLICAR OBRA</h2><p style="text-align:center;color:#666;font-size:12px;margin-bottom:20px;">Publicado por: <b>' + s.usuarioLogado.nome + '</b></p>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">📌 Título da Obra *</label><input id="pubTitulo" placeholder="Ex: Construção de Muro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;font-size:14px;"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">📍 Endereço *</label><input id="pubEndereco" placeholder="Ex: Rua Exemplo, 123 - Cidade" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;font-size:14px;"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">👷 Profissões Necessárias</label><div id="profissoesCheckboxes" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"><label class="checkbox-item"><input type="checkbox" value="servente"> Servente</label><label class="checkbox-item"><input type="checkbox" value="pedreiro"> Pedreiro</label><label class="checkbox-item"><input type="checkbox" value="carpinteiro"> Carpinteiro</label><label class="checkbox-item"><input type="checkbox" value="encanador"> Encanador</label><label class="checkbox-item"><input type="checkbox" value="eletricista"> Eletricista</label><label class="checkbox-item"><input type="checkbox" value="pintor"> Pintor</label><label class="checkbox-item"><input type="checkbox" value="gesseiro"> Gesseiro</label></div></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">💰 Valor por Hora (R$) *</label><input id="pubValor" type="number" placeholder="Ex: 25" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;font-size:14px;"></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">📝 Descrição</label><textarea id="pubDescricao" placeholder="Descreva os detalhes da obra..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;min-height:80px;box-sizing:border-box;font-size:14px;"></textarea></div>' +
        '<div style="margin-bottom:15px;"><label style="font-weight:bold;color:#1A3A5C;">📸 Foto da Obra</label><div class="foto-obra-container" onclick="document.getElementById(\'pubFotoInput\').click()" style="position:relative;cursor:pointer;border-radius:12px;overflow:hidden;border:2px dashed #ccc;"><img id="pubFotoPreview" src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:200px;object-fit:cover;border-radius:12px;"><div class="foto-obra-overlay" style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);color:white;padding:12px;text-align:center;">📷 Adicionar Foto</div></div><input type="file" id="pubFotoInput" accept="image/*" onchange="window.app.previewFotoObra(event)" style="display:none;"></div>' +
        '<button onclick="window.app.publicarVagaApp()" style="width:100%;background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.4);">📢 PUBLICAR OBRA</button>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:12px;border-radius:10px;margin-top:8px;cursor:pointer;">Cancelar</button></div>';
    s.vagaFotoBase64 = null; s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(e) { var f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { var p = document.getElementById('pubFotoPreview'); if (p) { p.src = ev.target.result; p.style.objectFit = 'cover'; } window.app._app.vagaFotoBase64 = ev.target.result; }; r.readAsDataURL(f); };

App.prototype.publicarVagaApp = function() {
    var s = this;
    var titulo = (document.getElementById('pubTitulo')||{}).value||'';
    var endereco = (document.getElementById('pubEndereco')||{}).value||'';
    var valor = (document.getElementById('pubValor')||{}).value||'';
    var descricao = (document.getElementById('pubDescricao')||{}).value||'';
    var profissoes = []; var checks = document.querySelectorAll('#profissoesCheckboxes input:checked');
    for (var i = 0; i < checks.length; i++) profissoes.push(checks[i].value);
    var profissoesStr = profissoes.length > 0 ? profissoes.join(', ') : 'Geral';
    if (!titulo||!endereco||!valor) { s.mostrarToast('Preencha todos!', 'erro'); return; }
    s.mostrarToast('Publicando...', 'info');
    var vaga = { titulo: titulo, endereco: endereco, profissoes: profissoesStr, valorHora: parseFloat(valor)||0, descricao: descricao, fotoObra: s.vagaFotoBase64||'', status: 'disponivel', ativa: true, autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome, autorFoto: s.usuarioLogado.fotoPerfil||null, interessados: [], dataCriacao: firebase.firestore.FieldValue.serverTimestamp() };
    if (typeof db !== 'undefined') {
        db.collection('vagas').add(vaga).then(function() { s.limparFormPublicacao(); s.mostrarToast('✅ Obra publicada!', 'sucesso'); s.historicoTelas = []; s.mostrarTela('homeScreen'); });
    }
};

App.prototype.limparFormPublicacao = function() {
    document.getElementById('pubTitulo').value = ''; document.getElementById('pubEndereco').value = '';
    document.getElementById('pubValor').value = ''; document.getElementById('pubDescricao').value = '';
    var checks = document.querySelectorAll('#profissoesCheckboxes input'); for (var i = 0; i < checks.length; i++) checks[i].checked = false;
    document.getElementById('pubFotoPreview').src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; this.vagaFotoBase64 = null;
};

// ===== REDE (COM CONVITES) =====
App.prototype.carregarRede = function() {
    var s = this, c = document.getElementById('redeContainer'); if (!c || !s.usuarioLogado) return;
    c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando rede...</div>';
    if (typeof db !== 'undefined') {
        if (s._listenerRede) s._listenerRede();
        s._listenerRede = db.collection('conexoes').where('participantes', 'array-contains', s.usuarioLogado.id).where('status', '==', 'ativo')
            .onSnapshot(function(snap) {
                var conexoes = []; snap.forEach(function(doc) { conexoes.push({ id: doc.id, data: doc.data() }); });
                if (conexoes.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">🔗</div><h3>Rede vazia</h3><button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">🔍 Buscar</button></div>'; return; }
                s.renderizarRede(c, conexoes);
            });
    }
};

App.prototype.renderizarRede = function(c, conexoes) {
    var s = this; var html = '<div style="text-align:center;padding:10px;">🔗 ' + conexoes.length + ' conexão(ões)</div>'; var processados = 0;
    for (var i = 0; i < conexoes.length; i++) {
        var amigoId = conexoes[i].data.participantes.find(function(p) { return p !== s.usuarioLogado.id; });
        if (typeof db !== 'undefined' && amigoId) {
            db.collection('usuarios').doc(amigoId).get().then(function(doc) {
                processados++; if (doc.exists) { var amigo = doc.data(); amigo.id = doc.id;
                    html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' + (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao || '') + '</small></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;margin-right:5px;">💬</button></div>'; }
                if (processados >= conexoes.length) c.innerHTML = html;
            });
        }
    }
};

App.prototype.adicionarNaRede = function(profissionalId) {
    var s = this; if (!s.usuarioLogado || s.usuarioLogado.id === profissionalId) return;
    s.mostrarToast('📩 Enviando convite...', 'info');
    if (typeof db !== 'undefined') {
        db.collection('conexoes').where('participantes', 'array-contains', s.usuarioLogado.id).get().then(function(snap) {
            var existe = false; snap.forEach(function(doc) { if (doc.data().participantes.indexOf(profissionalId) >= 0) existe = true; });
            if (existe) { s.mostrarToast('Convite já enviado!', 'erro'); return; }
            db.collection('conexoes').add({ participantes: [s.usuarioLogado.id, profissionalId], status: 'pendente', solicitanteId: s.usuarioLogado.id, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() {
                db.collection('notificacoes').add({ usuarioId: profissionalId, titulo: '🔗 Convite de Rede', mensagem: s.usuarioLogado.nome + ' quer se conectar com você!', tipo: 'convite', de: s.usuarioLogado.id, lida: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() });
                s.mostrarToast('✅ Convite enviado!', 'sucesso');
            });
        });
    }
};

App.prototype.aceitarConvite = function(nid, deId) {
    var s = this;
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if (d.participantes && d.participantes.indexOf(s.usuarioLogado.id) >= 0 && d.participantes.indexOf(deId) >= 0 && d.status === 'pendente') { db.collection('conexoes').doc(doc.id).update({ status: 'ativo' }); } }); });
        db.collection('notificacoes').doc(nid).update({ lida: true, aceita: true });
        db.collection('notificacoes').add({ usuarioId: deId, titulo: '✅ Convite Aceito!', mensagem: s.usuarioLogado.nome + ' aceitou seu convite!', tipo: 'info', lida: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() });
        s.mostrarToast('✅ Conectados!', 'sucesso');
    }
};

App.prototype.recusarConvite = function(nid, deId) {
    var s = this;
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if (d.participantes && d.participantes.indexOf(s.usuarioLogado.id) >= 0 && d.participantes.indexOf(deId) >= 0 && d.status === 'pendente') { db.collection('conexoes').doc(doc.id).delete(); } }); });
        db.collection('notificacoes').doc(nid).update({ lida: true, recusada: true });
        s.mostrarToast('Convite recusado', 'info');
    }
};

// ===== CORREÇÃO DO CHAT (FUNCIONANDO) =====

// Substitua estas funções no seu app.js:

// 1. LISTA DE CONVERSAS
App.prototype.carregarListaConversas = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    s.usuarioSelecionado = null;
    
    // Mostrar tela imediatamente
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;"><h3>💬 Mensagens</h3></div><div id="listaConversas" style="padding:10px;"><div style="text-align:center;padding:30px;">🔍 Buscando conversas...</div></div>';
    s.mostrarTela('chatScreen');
    
    // Buscar conexões ativas
    if (typeof db !== 'undefined') {
        db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .where('status', '==', 'ativo')
            .get()
            .then(function(snap) {
                var container = document.getElementById('listaConversas');
                if (!container) return;
                
                var ids = [];
                snap.forEach(function(doc) {
                    var p = doc.data().participantes;
                    var amigoId = p.find(function(x) { return x !== s.usuarioLogado.id; });
                    if (amigoId) ids.push(amigoId);
                });
                
                console.log('📊 Conversas encontradas:', ids.length);
                
                if (ids.length === 0) {
                    container.innerHTML = '<div style="text-align:center;padding:40px;">' +
                        '<div style="font-size:50px;">💬</div>' +
                        '<h3>Nenhuma conversa</h3>' +
                        '<p style="color:#666;">Conecte-se com profissionais na rede</p>' +
                        '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:10px;">🔍 Buscar Profissionais</button>' +
                        '</div>';
                    return;
                }
                
                // Buscar dados dos usuários
                var html = '';
                var processados = 0;
                
                ids.forEach(function(uid) {
                    db.collection('usuarios').doc(uid).get().then(function(doc) {
                        processados++;
                        if (doc.exists) {
                            var u = doc.data();
                            u.id = doc.id;
                            html += '<div onclick="window.app.iniciarChat(\'' + u.id + '\')" style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;">' +
                                '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;flex-shrink:0;">' +
                                (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:22px;">👷</div>') +
                                '</div>' +
                                '<div style="flex:1;"><strong>' + u.nome + '</strong><br><small style="color:#666;">' + (u.profissao || 'Profissional') + '</small></div>' +
                                '<i class="fas fa-chevron-right" style="color:#ccc;"></i>' +
                                '</div>';
                        }
                        if (processados >= ids.length) {
                            container.innerHTML = html;
                        }
                    }).catch(function() {
                        processados++;
                        if (processados >= ids.length) {
                            container.innerHTML = html || '<div style="text-align:center;padding:30px;">Nenhuma conversa</div>';
                        }
                    });
                });
            })
            .catch(function(err) {
                console.error('Erro ao buscar conexões:', err);
                var container = document.getElementById('listaConversas');
                if (container) {
                    container.innerHTML = '<div style="text-align:center;padding:40px;">' +
                        '<div style="font-size:50px;">💬</div>' +
                        '<h3>Erro ao carregar</h3>' +
                        '<button onclick="window.app.carregarListaConversas()" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">Tentar novamente</button>' +
                        '</div>';
                }
            });
    } else {
        // Sem Firebase - mostrar mensagem
        var container = document.getElementById('listaConversas');
        if (container) {
            container.innerHTML = '<div style="text-align:center;padding:40px;">' +
                '<div style="font-size:50px;">💬</div>' +
                '<h3>Firebase não conectado</h3>' +
                '<p style="color:#666;">Verifique sua conexão</p>' +
                '</div>';
        }
    }
};

// 2. INICIAR CHAT (ABRIR CONVERSA)
App.prototype.iniciarChat = function(uid) {
    var s = this;
    console.log('💬 Abrindo chat com:', uid);
    
    // Buscar dados do usuário
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                var u = doc.data();
                u.id = doc.id;
                s.usuarioSelecionado = u;
                s.abrirChat(u);
                s.escutarMensagens();
            } else {
                s.mostrarToast('Usuário não encontrado', 'erro');
            }
        }).catch(function(err) {
            console.error('Erro ao buscar usuário:', err);
            s.mostrarToast('Erro ao abrir chat', 'erro');
        });
    } else {
        // Buscar no localStorage
        var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
        var user = usuarios.find(function(u) { return u.id === uid; });
        if (user) {
            s.usuarioSelecionado = user;
            s.abrirChat(user);
        } else {
            s.mostrarToast('Usuário não encontrado', 'erro');
        }
    }
};

// 3. ABRIR TELA DE CHAT
App.prototype.abrirChat = function(user) {
    var s = this;
    var tela = document.getElementById('chatScreen');
    if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); }
    
    tela.innerHTML = 
        '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
        '<button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
        '<div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">👷</div>') +
        '</div>' +
        '<strong>💬 ' + user.nome + '</strong></div>' +
        
        '<div id="chatMensagens" style="padding:15px;height:calc(100vh - 140px);overflow-y:auto;background:#f5f5f5;">' +
        '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>' +
        '</div>' +
        
        '<div style="padding:10px;background:white;display:flex;gap:10px;border-top:1px solid #e5e7eb;">' +
        '<input id="chatInput" type="text" placeholder="Digite sua mensagem..." style="flex:1;padding:12px 16px;border:2px solid #e5e7eb;border-radius:25px;font-size:14px;outline:none;" onkeypress="if(event.key===\'Enter\')window.app.enviarMensagem()">' +
        '<button id="btnEnviarMsg" onclick="window.app.enviarMensagem()" style="background:#1A3A5C;color:white;border:none;width:48px;height:48px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;">➤</button>' +
        '</div>';
    
    s.mostrarTela('chatScreen');
    
    // Focar no input
    setTimeout(function() {
        var input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 300);
};

// 4. ESCUTAR MENSAGENS EM TEMPO REAL
App.prototype.escutarMensagens = function() {
    var s = this;
    if (s._listenerChat) s._listenerChat();
    
    if (typeof db !== 'undefined' && s.usuarioSelecionado) {
        console.log('👂 Escutando mensagens...');
        
        s._listenerChat = db.collection('mensagens')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .orderBy('dataEnvio', 'asc')
            .onSnapshot(function(snap) {
                var msgs = [];
                snap.forEach(function(doc) {
                    var m = doc.data();
                    m.id = doc.id;
                    // Filtrar apenas mensagens entre os dois usuários
                    if (m.participantes && 
                        m.participantes.indexOf(s.usuarioLogado.id) >= 0 && 
                        m.participantes.indexOf(s.usuarioSelecionado.id) >= 0) {
                        msgs.push(m);
                    }
                });
                
                console.log('📨 Mensagens carregadas:', msgs.length);
                
                var c = document.getElementById('chatMensagens');
                if (!c) return;
                
                if (msgs.length === 0) {
                    c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>';
                    return;
                }
                
                var html = '';
                for (var i = 0; i < msgs.length; i++) {
                    var m = msgs[i];
                    var meu = m.remetenteId === s.usuarioLogado.id;
                    var data = '';
                    if (m.dataEnvio) {
                        try {
                            var d = m.dataEnvio.toDate ? m.dataEnvio.toDate() : new Date(m.dataEnvio);
                            data = d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
                        } catch(e) {}
                    }
                    
                    html += '<div style="display:flex;justify-content:' + (meu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;padding:0 5px;">';
                    html += '<div style="max-width:80%;padding:10px 14px;border-radius:18px;' + 
                        (meu ? 'background:#1A3A5C;color:white;border-bottom-right-radius:4px;' : 
                               'background:white;color:#333;border-bottom-left-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.1);') + '">';
                    html += '<div style="font-size:14px;line-height:1.4;">' + (m.conteudo || '') + '</div>';
                    html += '<div style="font-size:10px;opacity:0.7;text-align:right;margin-top:3px;">' + data + '</div>';
                    html += '</div></div>';
                }
                
                c.innerHTML = html;
                c.scrollTop = c.scrollHeight;
                
                // Marcar como lidas
                snap.forEach(function(doc) {
                    var m = doc.data();
                    if (m.destinatarioId === s.usuarioLogado.id && !m.lida) {
                        db.collection('mensagens').doc(doc.id).update({ lida: true }).catch(function(){});
                    }
                });
            }, function(err) {
                console.error('❌ Erro no listener:', err);
            });
    }
};

// 5. ENVIAR MENSAGEM
App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    
    if (!input) {
        console.error('❌ Input não encontrado');
        return;
    }
    
    if (!s.usuarioSelecionado) {
        s.mostrarToast('Selecione um contato', 'erro');
        return;
    }
    
    var texto = input.value.trim();
    if (!texto) return;
    
    // Evitar envio duplicado
    if (s._enviandoMensagem) return;
    s._enviandoMensagem = true;
    
    var btn = document.getElementById('btnEnviarMsg');
    if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
    
    console.log('📤 Enviando mensagem:', texto.substring(0, 30));
    
    if (typeof db !== 'undefined') {
        db.collection('mensagens').add({
            remetenteId: s.usuarioLogado.id,
            destinatarioId: s.usuarioSelecionado.id,
            participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
            conteudo: texto,
            lida: false,
            dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            console.log('✅ Mensagem enviada');
            input.value = '';
            input.focus();
            s._enviandoMensagem = false;
            if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
        }).catch(function(err) {
            console.error('❌ Erro ao enviar:', err);
            s.mostrarToast('Erro ao enviar mensagem', 'erro');
            s._enviandoMensagem = false;
            if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
        });
    } else {
        // Salvar no localStorage
        var mensagens = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        mensagens.push({
            id: 'msg_' + Date.now(),
            remetenteId: s.usuarioLogado.id,
            destinatarioId: s.usuarioSelecionado.id,
            conteudo: texto,
            lida: false,
            dataEnvio: new Date().toISOString()
        });
        localStorage.setItem('mensagensLPX', JSON.stringify(mensagens));
        
        input.value = '';
        input.focus();
        s._enviandoMensagem = false;
        if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
        
        // Recarregar mensagens
        s.carregarMensagensLocal();
    }
};

// 6. CARREGAR MENSAGENS LOCAL (FALLBACK)
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
        var meu = msg.remetenteId === s.usuarioLogado.id;
        var data = '';
        try { data = new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}); } catch(e) {}
        
        html += '<div style="display:flex;justify-content:' + (meu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;">';
        html += '<div style="max-width:80%;padding:10px 14px;border-radius:18px;' + 
            (meu ? 'background:#1A3A5C;color:white;' : 'background:white;color:#333;box-shadow:0 1px 2px rgba(0,0,0,0.1);') + '">';
        html += '<div style="font-size:14px;">' + msg.conteudo + '</div>';
        html += '<div style="font-size:10px;opacity:0.7;text-align:right;margin-top:3px;">' + data + '</div>';
        html += '</div></div>';
    }
    
    c.innerHTML = html;
    c.scrollTop = c.scrollHeight;
};

App.prototype.renderizarListaConversas = function(container, ids) { var s = this, html = '', processados = 0; for (var i = 0; i < ids.length; i++) { if (typeof db !== 'undefined') { db.collection('usuarios').doc(ids[i]).get().then(function(doc) { processados++; if (doc.exists) { var u = doc.data(); u.id = doc.id; html += '<div onclick="window.app.iniciarChat(\'' + u.id + '\')" style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer;"><div style="width:45px;height:45px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:20px;">👷</div>') + '</div><div style="flex:1;"><strong>' + u.nome + '</strong><br><small>' + (u.profissao || '') + '</small></div></div>'; } if (processados >= ids.length) container.innerHTML = html; }); } } };

App.prototype.iniciarChat = function(uid) { var s = this; if (typeof db !== 'undefined') { db.collection('usuarios').doc(uid).get().then(function(doc) { if (doc.exists) { var u = doc.data(); u.id = doc.id; s.usuarioSelecionado = u; s.abrirChat(u); s.escutarMensagens(); } }); } };

App.prototype.abrirChat = function(user) { var s = this, tela = document.getElementById('chatScreen'); if (!tela) { tela = document.createElement('div'); tela.id = 'chatScreen'; tela.className = 'screen'; document.body.appendChild(tela); } tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;"><button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button><strong>💬 ' + user.nome + '</strong></div><div id="chatMensagens" style="padding:15px;height:calc(100vh - 130px);overflow-y:auto;background:#f5f5f5;"></div><div style="padding:10px;background:white;display:flex;gap:10px;"><input id="chatInput" placeholder="Mensagem..." style="flex:1;padding:12px;border:1px solid #ddd;border-radius:25px;"><button onclick="window.app.enviarMensagem()" style="background:#1A3A5C;color:white;border:none;padding:12px 20px;border-radius:25px;cursor:pointer;">Enviar</button></div>'; s.mostrarTela('chatScreen'); };

App.prototype.escutarMensagens = function() { var s = this; if (s._listenerChat) s._listenerChat(); if (typeof db !== 'undefined') { s._listenerChat = db.collection('mensagens').where('participantes', 'array-contains', s.usuarioLogado.id).orderBy('dataEnvio', 'asc').onSnapshot(function(snap) { var msgs = []; snap.forEach(function(doc) { var m = doc.data(); m.id = doc.id; if (m.participantes.indexOf(s.usuarioSelecionado.id) >= 0) msgs.push(m); }); var c = document.getElementById('chatMensagens'); if (!c) return; if (msgs.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;color:#666;">Diga olá! 👋</div>'; return; } var html = ''; for (var i = 0; i < msgs.length; i++) { var meu = msgs[i].remetenteId === s.usuarioLogado.id; html += '<div style="display:flex;justify-content:' + (meu ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;"><div style="max-width:75%;padding:10px 14px;border-radius:18px;' + (meu ? 'background:#1A3A5C;color:white;' : 'background:white;color:#333;') + '">' + msgs[i].conteudo + '</div></div>'; } c.innerHTML = html; c.scrollTop = c.scrollHeight; }); } };

App.prototype.enviarMensagem = function() { var s = this, inp = document.getElementById('chatInput'); if (!inp || !s.usuarioSelecionado) return; var txt = inp.value.trim(); if (!txt) return; if (s._enviandoMensagem) return; s._enviandoMensagem = true; if (typeof db !== 'undefined') { db.collection('mensagens').add({ remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id, participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id], conteudo: txt, lida: false, dataEnvio: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { inp.value = ''; s._enviandoMensagem = false; }); } };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() { var s = this, c = document.getElementById('buscaResultados'); if (!c) return; c.innerHTML = '<div style="text-align:center;padding:30px;">🔍 Buscando...</div>'; if (typeof db !== 'undefined') { db.collection('usuarios').get().then(function(snap) { var todos = []; snap.forEach(function(doc) { var u = doc.data(); u.id = doc.id; if (u.id !== s.usuarioLogado?.id) todos.push(u); }); if (todos.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhum profissional</h3></div>'; return; } var html = '<div style="text-align:center;padding:10px;">👷 ' + todos.length + ' profissional(is)</div>'; for (var i = 0; i < todos.length; i++) { var p = todos[i]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">' + (p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>') + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')"><div style="font-weight:bold;">' + p.nome + '</div><div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || '') + '</div></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">💬</button><button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;">+</button></div>'; } c.innerHTML = html; }); } };

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) { var s = this; if (typeof db !== 'undefined') { db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); u.id = doc.id; var t = document.getElementById('perfilPublicoScreen'); if (!t) { t = document.createElement('div'); t.id = 'perfilPublicoScreen'; t.className = 'screen'; document.body.appendChild(t); } t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:30px;text-align:center;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') + '</div><h2>' + u.nome + '</h2><p>🔧 ' + (u.profissao || '') + '</p></div><div style="padding:20px;"><div style="background:white;border-radius:10px;padding:15px;"><p>📧 ' + (u.email || '') + '</p><p>📱 ' + (u.celular || '') + '</p></div><button onclick="window.app.iniciarChat(\'' + u.id + '\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-top:10px;">💬 Chat</button><button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;margin-top:10px;">🔗 Convidar para Rede</button><button onclick="window.app.voltarTela()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Voltar</button></div>'; s.mostrarTela('perfilPublicoScreen'); }); } };

// ===== PERFIL DO USUÁRIO (COM CONTAGEM) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this; if (!s.usuarioLogado) return;
    var user = s.usuarioLogado, tela = document.getElementById('meuPerfilScreen'); if (!tela) return;
    if (typeof db !== 'undefined') {
        db.collection('vagas').where('autorId', '==', user.id).where('ativa', '==', true).get().then(function(snapVagas) {
            var totalObras = snapVagas.size;
            db.collection('conexoes').where('participantes', 'array-contains', user.id).where('status', '==', 'ativo').get().then(function(snapCon) {
                var conectadosIds = [user.id]; snapCon.forEach(function(doc) { conectadosIds = conectadosIds.concat(doc.data().participantes); });
                db.collection('usuarios').where('tipo', '==', 'profissional').get().then(function(snapUser) {
                    var totalProfissionais = snapUser.size, disponiveis = 0;
                    snapUser.forEach(function(doc) { if (conectadosIds.indexOf(doc.id) < 0) disponiveis++; });
                    s.renderizarPerfil(tela, user, totalObras, totalProfissionais, disponiveis);
                });
            });
        });
    }
};

App.prototype.renderizarPerfil = function(tela, user, totalObras, totalProfissionais, disponiveis) {
    tela.innerHTML = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') + '</div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;"><p style="font-size:10px;color:#ccc;">📷 Alterar foto</p><h2>' + user.nome + '</h2><p style="color:#f0c27f;">' + (user.profissao || user.tipo || '') + ' • ⭐ ' + (user.score || 0).toFixed(1) + '</p></div>' +
        (user.tipo === 'profissional' ? '<div style="display:flex;gap:8px;padding:15px;background:white;"><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#1A3A5C;">' + (user.experiencia||'0') + '</div><div style="font-size:11px;color:#666;">Anos</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#f59e0b;">' + (user.score||0).toFixed(1) + '</div><div style="font-size:11px;color:#666;">Score</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#10B981;">' + disponiveis + '</div><div style="font-size:11px;color:#666;">Vagas</div></div></div>' : '<div style="display:flex;gap:8px;padding:15px;background:white;"><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#1A3A5C;">' + totalObras + '</div><div style="font-size:11px;color:#666;">Obras</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#f59e0b;">' + totalProfissionais + '</div><div style="font-size:11px;color:#666;">Prof.</div></div><div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:22px;font-weight:bold;color:#10B981;">' + disponiveis + '</div><div style="font-size:11px;color:#666;">Livres</div></div></div>') +
        '<div style="padding:15px;background:white;margin-top:10px;"><h3>👤 Dados</h3><p>📧 ' + (user.email||'') + '</p><p>📱 ' + (user.celular||'') + '</p><p>🔧 ' + (user.profissao||'') + '</p><p style="cursor:pointer;" onclick="window.app.abrirMapaLocalizacao()">📍 ' + (user.localizacao ? (user.localizacao.cidade||'') + ', ' + (user.localizacao.estado||'') : 'Adicionar localização') + '</p></div>' +
        '<div style="padding:15px;">' + (user.tipo === 'empreiteiro' ? '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">🏗️ Minhas Obras (' + totalObras + ')</button>' : '') +
        '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">✏️ Editar Perfil</button>' +
        '<button onclick="window.app.gerarQRCodeCompartilhar()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;">📱 Compartilhar</button>' +
        '<button onclick="window.app.mostrarTela(\'configScreen\')" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;">⚙️ Configurações</button></div>';
};

// ===== MINHAS OBRAS / DETALHE / LOCALIZAÇÃO / OUTROS =====
App.prototype.carregarMinhasObras = function() { var s = this, c = document.getElementById('listaObrasContainer') || document.getElementById('minhasObrasContainer'); if (!c || !s.usuarioLogado) return; c.innerHTML = '<div style="text-align:center;padding:30px;">Carregando...</div>'; if (typeof db !== 'undefined') { db.collection('vagas').where('autorId', '==', s.usuarioLogado.id).where('ativa', '==', true).get().then(function(snap) { var minhas = []; snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; minhas.push(v); }); if (minhas.length === 0) { c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>Nenhuma obra</h3></div>'; return; } var html = '<div style="text-align:center;padding:10px;">🏗️ <b>' + minhas.length + '</b> obra(s)</div>'; for (var i = 0; i < minhas.length; i++) { var v = minhas[i]; html += '<div style="background:white;border-radius:10px;padding:12px;margin-bottom:8px;">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' : '') + '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><b>' + (v.titulo||'Sem título') + '</b><br><small>📍 ' + (v.endereco||'') + '</small><br><span style="background:#10B981;color:white;padding:3px 8px;border-radius:12px;font-size:11px;">💰 R$' + (v.valorHora||'0') + '/h</span></div></div>'; } c.innerHTML = html; }); } };
App.prototype.verDetalheObra = function(oid) { if (typeof db !== 'undefined') { db.collection('vagas').doc(oid).get().then(function(doc) { if (!doc.exists) return; var v = doc.data(); v.id = doc.id; var h = '<div id="modalObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()"><div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">' : '') + '<div style="padding:20px;"><h2>' + v.titulo + '</h2><p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p><p>💰 R$' + v.valorHora + '/h</p>'; if (v.endereco) h += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(v.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Google Maps</a>'; h += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">⬅ Fechar</button></div></div></div>'; var a = document.getElementById('modalObra'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h); }); } };
App.prototype.mostrarNotificacoes = function() { var s = this; if (!s.usuarioLogado) return; if (typeof db !== 'undefined') { db.collection('notificacoes').where('usuarioId', '==', s.usuarioLogado.id).orderBy('dataCriacao', 'desc').limit(50).get().then(function(snap) { var ns = []; snap.forEach(function(doc) { var n = doc.data(); n.id = doc.id; ns.push(n); }); var h = '<div id="modalNotif" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()"><div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;"><div style="background:#1A3A5C;color:white;padding:15px;display:flex;justify-content:space-between;"><h3>🔔 Notificações</h3><button onclick="document.getElementById(\'modalNotif\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button></div><div style="padding:15px;">'; if (ns.length === 0) { h += '<div style="text-align:center;padding:40px;"><h3>Nenhuma</h3></div>'; } else { for (var i = 0; i < ns.length; i++) { var n = ns[i]; h += '<div style="background:' + (n.lida ? '#f9fafb' : '#f0f9ff') + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;"><div style="font-weight:bold;">' + n.titulo + '</div><div style="font-size:13px;color:#666;">' + n.mensagem + '</div>'; if (n.tipo === 'convite' && !n.lida) { h += '<div style="display:flex;gap:10px;margin-top:10px;"><button onclick="window.app.aceitarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#10B981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">✅ Aceitar</button><button onclick="window.app.recusarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#EF4444;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">❌ Recusar</button></div>'; } h += '<div style="font-size:10px;color:#999;margin-top:5px;">' + (n.dataCriacao ? new Date(n.dataCriacao.toDate()).toLocaleString('pt-BR') : '') + '</div></div>'; } } h += '</div></div></div>'; var a = document.getElementById('modalNotif'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h); snap.forEach(function(doc) { if (!doc.data().lida && doc.data().tipo !== 'convite') { db.collection('notificacoes').doc(doc.id).update({ lida: true }); } }); }); } };
App.prototype.abrirMapaLocalizacao = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado; var h = '<div id="modalLoc" style="position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;"><div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="document.getElementById(\'modalLoc\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>📍 Minha Localização</h2></div><div style="padding:20px;"><label>🗺️ Estado</label><select id="locEstado" onchange="window.app.atualizarCidades()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><option value="">Selecione...</option>' + s.getEstadosHTML(u.localizacao ? u.localizacao.estado : '') + '</select><label>🏙️ Cidade</label><select id="locCidade" onchange="window.app.atualizarBairros()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><option value="">Selecione...</option></select><label>📍 Bairro</label><select id="locBairro" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;"><option value="">Selecione...</option></select><button onclick="window.app.salvarLocalizacao()" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;cursor:pointer;">💾 SALVAR</button></div></div>'; var a = document.getElementById('modalLoc'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h); if (u.localizacao?.estado) { setTimeout(function() { window.app.atualizarCidades(u.localizacao.cidade); }, 300); if (u.localizacao.bairro) setTimeout(function() { window.app.atualizarBairros(u.localizacao.bairro); }, 600); } };
App.prototype.getEstadosHTML = function(sel) { var e = {'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará','DF':'DF','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins'}; var h = ''; for (var s in e) h += '<option value="' + s + '"' + (sel === s ? ' selected' : '') + '>' + e[s] + '</option>'; return h; };
App.prototype.getTodasCidades = function() { return {'SP':['São Paulo','Campinas','Santos','Guarulhos','São Bernardo do Campo','Ribeirão Preto','Sorocaba','São José dos Campos'],'RJ':['Rio de Janeiro','Niterói','Duque de Caxias','Nova Iguaçu'],'MG':['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Montes Claros'],'BA':['Salvador','Feira de Santana','Vitória da Conquista'],'PR':['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel'],'RS':['Porto Alegre','Caxias do Sul','Pelotas','Canoas'],'PE':['Recife','Jaboatão','Olinda','Caruaru'],'CE':['Fortaleza','Caucaia','Juazeiro do Norte'],'SC':['Florianópolis','Joinville','Blumenau','São José','Chapecó'],'GO':['Goiânia','Aparecida','Anápolis'],'DF':['Brasília','Taguatinga']}; };
App.prototype.getBairrosPorCidade = function(c) { var b = {'São Paulo':['Centro','Pinheiros','Vila Mariana','Moema','Itaim Bibi','Tatuapé','Santana'],'Rio de Janeiro':['Copacabana','Ipanema','Leblon','Barra','Botafogo'],'Belo Horizonte':['Savassi','Lourdes','Pampulha'],'Florianópolis':['Centro','Lagoa','Ingleses'],'Joinville':['Centro','América','Glória'],'Curitiba':['Centro','Batel','Água Verde'],'Porto Alegre':['Moinhos','Bela Vista'],'Salvador':['Barra','Ondina','Pituba'],'Recife':['Boa Viagem','Pina'],'Fortaleza':['Meireles','Aldeota'],'Brasília':['Asa Sul','Asa Norte']}; return b[c] || ['Centro']; };
App.prototype.atualizarCidades = function(sel) { var ee = document.getElementById('locEstado'), ce = document.getElementById('locCidade'); if (!ee || !ce) return; var e = ee.value, cs = this.getTodasCidades(); ce.innerHTML = '<option value="">Selecione...</option>'; if (e && cs[e]) for (var i = 0; i < cs[e].length; i++) ce.innerHTML += '<option value="' + cs[e][i] + '"' + (sel === cs[e][i] ? ' selected' : '') + '>' + cs[e][i] + '</option>'; var be = document.getElementById('locBairro'); if (be) be.innerHTML = '<option value="">Selecione...</option>'; };
App.prototype.atualizarBairros = function(sel) { var ce = document.getElementById('locCidade'), be = document.getElementById('locBairro'); if (!ce || !be) return; var c = ce.value, bs = this.getBairrosPorCidade(c); be.innerHTML = '<option value="">Selecione...</option>'; if (bs) for (var i = 0; i < bs.length; i++) be.innerHTML += '<option value="' + bs[i] + '"' + (sel === bs[i] ? ' selected' : '') + '>' + bs[i] + '</option>'; };
App.prototype.salvarLocalizacao = function() { var s = this; var es = document.getElementById('locEstado')?.value || '', ci = document.getElementById('locCidade')?.value || '', ba = document.getElementById('locBairro')?.value || ''; if (!es || !ci) { s.mostrarToast('Selecione estado e cidade!', 'erro'); return; } var loc = { estado: es, cidade: ci, bairro: ba }; s.usuarioLogado.localizacao = loc; if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update({ localizacao: loc }); document.getElementById('modalLoc')?.remove(); s.mostrarToast('Localização salva!', 'sucesso'); s.carregarMeuPerfil(); };
App.prototype.uploadFoto = function(e) { var s = this, f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { var foto = ev.target.result; s.usuarioLogado.fotoPerfil = foto; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: foto }); var p = document.getElementById('fotoPerfilPreview'); if (p) p.src = foto; s.mostrarToast('Foto atualizada!', 'sucesso'); }; r.readAsDataURL(f); };
App.prototype.abrirEditarPerfil = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado; var h = '<div id="modalEditar" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;"><div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:400px;"><h3>✏️ Editar</h3><input id="editNome" value="' + (u.nome || '') + '" placeholder="Nome" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editCelular" value="' + (u.celular || '') + '" placeholder="Celular" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editProfissao" value="' + (u.profissao || '') + '" placeholder="Profissão" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;"><input id="editExperiencia" type="number" value="' + (u.experiencia || '0') + '" placeholder="Experiência" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;"><button onclick="window.app.salvarPerfil()" style="width:100%;background:#10B981;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">💾 SALVAR</button><button onclick="document.getElementById(\'modalEditar\').remove()" style="width:100%;background:#EF4444;color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;">CANCELAR</button></div></div>'; document.body.insertAdjacentHTML('beforeend', h); };
App.prototype.salvarPerfil = function() { var s = this; var d = { nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome, celular: document.getElementById('editCelular')?.value?.trim() || '', profissao: document.getElementById('editProfissao')?.value?.trim() || '', experiencia: document.getElementById('editExperiencia')?.value?.trim() || '0' }; if (!d.nome) { s.mostrarToast('Nome obrigatório!', 'erro'); return; } s.usuarioLogado.nome = d.nome; s.usuarioLogado.celular = d.celular; s.usuarioLogado.profissao = d.profissao; s.usuarioLogado.experiencia = d.experiencia; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); if (typeof db !== 'undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update(d); document.getElementById('modalEditar')?.remove(); s.mostrarToast('Perfil atualizado!', 'sucesso'); s.carregarMeuPerfil(); };
App.prototype.gerarQRCodeCompartilhar = function() { var s = this; if (!s.usuarioLogado) return; var u = s.usuarioLogado, url = window.location.origin + window.location.pathname + '?perfil=' + u.id; var h = '<div id="modalQR" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;"><div style="background:white;border-radius:20px;padding:30px;text-align:center;max-width:350px;"><h3>📱 Compartilhar</h3><div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:10px auto;border:3px solid #F47920;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:35px;">👷</div>') + '</div><p>' + u.nome + '</p><div id="qrcodeContainer" style="display:flex;justify-content:center;margin:15px 0;"></div><button onclick="document.getElementById(\'modalQR\').remove()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:10px;cursor:pointer;">FECHAR</button></div></div>'; var a = document.getElementById('modalQR'); if (a) a.remove(); document.body.insertAdjacentHTML('beforeend', h); setTimeout(function() { var c = document.getElementById('qrcodeContainer'); if (c && typeof QRCode !== 'undefined') { c.innerHTML = ''; new QRCode(c, { text: url, width: 180, height: 180, colorDark: '#1A3A5C', colorLight: '#ffffff' }); } }, 300); };
App.prototype.carregarConfigScreen = function() { var s = this, t = document.getElementById('configScreen'); if (!t) { t = document.createElement('div'); t.id = 'configScreen'; t.className = 'screen'; document.body.appendChild(t); } t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>⚙️ Configurações</h2></div><div style="padding:15px;"><div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;"><h3>🎨 Tema</h3><button onclick="window.app.selecionarTema(\'claro\')" style="padding:10px 20px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';cursor:pointer;margin-right:5px;">☀️ Claro</button><button onclick="window.app.selecionarTema(\'escuro\')" style="padding:10px 20px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';cursor:pointer;">🌙 Escuro</button></div><div style="background:white;border-radius:12px;padding:15px;"><h3>📄 Documentos</h3><button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos</button><button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">🔒 Privacidade</button></div></div>'; s.mostrarTela('configScreen'); };
App.prototype.mostrarDocumento = function(tipo) { var t = document.getElementById('documentoScreen'); if (!t) { t = document.createElement('div'); t.id = 'documentoScreen'; t.className = 'screen'; document.body.appendChild(t); } var tt = { termos: '📄 Termos', privacidade: '🔒 Privacidade' }; var cc = { termos: '<h3>Termos</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos.</p>', privacidade: '<h3>Privacidade</h3><p>Seus dados são protegidos.</p>' }; t.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>' + (tt[tipo] || '') + '</h2></div><div style="padding:20px;">' + (cc[tipo] || '') + '</div>'; this.mostrarTela('documentoScreen'); };
App.prototype.selecionarTema = function(tema) { this.temaAtual = tema; localStorage.setItem('tema', tema); if (tema === 'escuro') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme'); this.mostrarToast('Tema alterado!', 'sucesso'); };
App.prototype.mostrarToast = function(m, t) { var toast = document.getElementById('toast'); if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:14px 24px;border-radius:12px;z-index:99999;font-weight:bold;display:none;text-align:center;max-width:90%;'; document.body.appendChild(toast); } toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1A3A5C'; toast.style.color = 'white'; toast.style.display = 'block'; clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000); };

document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR COMPLETO!');
    console.log('✅ Layout original restaurado');
    console.log('✅ Convites com aceitar/recusar');
    console.log('✅ Notificações em tempo real');
    console.log('✅ Perfil com contagem de profissionais');
});
