// ==========================================================
// LPXCONSTRUTOR v2.1.1 - NOTIFICAÇÕES + CHAT WHATSAPP + MAPA
// ==========================================================
const APP_VERSION = "2.1.1";
console.log(`🏗️ LPXCONSTRUTOR v${APP_VERSION}`);

// Sons
function tocarSomNotificacao() { try { var ctx = new (window.AudioContext || window.webkitAudioContext)(); var osc = ctx.createOscillator(); var gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = 800; osc.type = 'sine'; gain.gain.value = 0.1; osc.start(0); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); osc.stop(ctx.currentTime + 0.3); } catch(e) {} }
function tocarSomMensagem() { try { var ctx = new (window.AudioContext || window.webkitAudioContext)(); var osc = ctx.createOscillator(); var gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = 600; osc.type = 'sine'; gain.gain.value = 0.1; osc.start(0); osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); osc.stop(ctx.currentTime + 0.3); } catch(e) {} }

// Força atualização
if (localStorage.getItem('appVersion') !== APP_VERSION) {
    localStorage.setItem('appVersion', APP_VERSION);
    if (window.caches) { caches.keys().then(function(names) { names.forEach(function(name) { caches.delete(name); }); }); }
    setTimeout(function() { window.location.reload(true); }, 500);
}

window.app = { _app: null };
['fazerLogin','mostrarTela','voltarTela','cadastrar','sair','confirmarSair','fecharModalSair',
 'buscarProfissionais','verPerfil','abrirTelaPublicacao','publicarVagaApp','previewFotoObra',
 'carregarMinhasObras','verDetalheObra','uploadFoto','abrirEditarPerfil','salvarPerfil',
 'selecionarTema','mostrarDocumento','mudarTab','adicionarNaRede','apagarObra',
 'mostrarNotificacoes','iniciarChat','enviarMensagem','gerarQRCodeCompartilhar',
 'abrirMapaLocalizacao','salvarLocalizacao','atualizarCidades','atualizarBairros',
 'aceitarConvite','recusarConvite','novaObra','proximaEtapa','toggleProfissao',
 'solicitarCodigo','verificarCodigo','voltarPasso1','carregarListaConversas'
].forEach(function(m) { window.app[m] = function() { var a = window.app._app; if (a && a[m]) return a[m].apply(a, arguments); }; });

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
    this._listenerChat = null;
    this._listenerNotificacoes = null;
    this._listenerMsgBadge = null;
    this._listenerConversas = null;
    this._vagasCache = [];
    this._publicando = false;
    this._feedJaCarregado = false;
    this._conversasCache = {};
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 App v' + APP_VERSION);
    window.app._app = s;
    var nav = document.getElementById('bottomNav'); if (nav) nav.style.display = 'none';
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    var savedUser = localStorage.getItem('usuarioLPX');
    if (savedUser) { try { s.usuarioLogado = JSON.parse(savedUser); } catch(e) {} }
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(){});
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                    if (doc.exists) { s.usuarioLogado = doc.data(); s.usuarioLogado.id = doc.id; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); s.mostrarTela('homeScreen'); s.iniciarFeedListener(); s.iniciarListenerNotificacoes(); s.iniciarBadgeMensagens(); }
                    else { s.mostrarTela('loginScreen'); }
                }).catch(function() { s.mostrarTela('loginScreen'); });
            } else {
                if (s.usuarioLogado && s.usuarioLogado.id) { s.mostrarTela('homeScreen'); s.iniciarFeedListener(); s.iniciarListenerNotificacoes(); s.iniciarBadgeMensagens(); }
                else { s.usuarioLogado = null; localStorage.removeItem('usuarioLPX'); s.pararListeners(); s.mostrarTela('loginScreen'); }
            }
        });
    } else { setTimeout(function() { s.mostrarTela('loginScreen'); }, 1500); }
    
    // Limpa notificações antigas (mais de 24h)
    s.limparNotificacoesAntigas();
};

// ===== LIMPAR NOTIFICAÇÕES ANTIGAS =====
App.prototype.limparNotificacoesAntigas = function() {
    if (!this.usuarioLogado || typeof db === 'undefined') return;
    var limite = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 horas atrás
    db.collection('notificacoes')
        .where('usuarioId', '==', this.usuarioLogado.id)
        .where('dataCriacao', '<', limite)
        .get().then(function(snap) {
            var batch = db.batch();
            snap.forEach(function(doc) { batch.delete(doc.ref); });
            batch.commit().catch(function(){});
        }).catch(function(){});
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen' && id !== 'chatScreen') s.historicoTelas.push(s.telaAtual);
    document.querySelectorAll('.screen').forEach(function(t) { t.classList.remove('active'); t.style.display = 'none'; });
    var tela = document.getElementById(id);
    if (!tela) { tela = document.createElement('div'); tela.id = id; tela.className = 'screen'; document.querySelector('.app-container')?.appendChild(tela); }
    tela.classList.add('active'); tela.style.display = 'block'; s.telaAtual = id;
    var nav = document.getElementById('bottomNav');
    if (nav) { var hide = ['loginScreen','cadastroScreen','recuperarSenhaScreen']; nav.style.display = hide.indexOf(id) >= 0 ? 'none' : 'flex'; nav.querySelectorAll('.nav-item').forEach(function(item) { item.classList.toggle('active', item.getAttribute('data-screen') === id); }); }
    switch(id) { case 'homeScreen': s.carregarHome(); break; case 'meuPerfilScreen': s.carregarMeuPerfil(); break; case 'buscaScreen': s.buscarProfissionais(); break; case 'minhasObrasScreen': s.carregarMinhasObras(); break; case 'chatScreen': if (!s.usuarioSelecionado) s.carregarListaConversas(); break; case 'configScreen': s.carregarConfigScreen(); break; }
    if (id === 'homeScreen' && s.usuarioLogado) { var bp = document.getElementById('btnPublicar'), bo = document.getElementById('btnObras'); var show = s.usuarioLogado.tipo === 'empreiteiro'; if (bp) bp.style.display = show ? 'flex' : 'none'; if (bo) bo.style.display = show ? 'flex' : 'none'; }
};

App.prototype.voltarTela = function() { this.mostrarTela(this.historicoTelas.length > 0 ? this.historicoTelas.pop() : 'homeScreen'); };

// ===== MODAL PERSONALIZADO =====
App.prototype.mostrarModalConfirmacao = function(titulo, mensagem, onConfirmar, onCancelar) {
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
    modal.innerHTML = '<div style="background:white;border-radius:20px;padding:30px;max-width:350px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);border-top:5px solid #F47920;"><div style="font-size:50px;margin-bottom:15px;">⚠️</div><h3 style="color:#1A3A5C;margin-bottom:10px;">' + (titulo||'Confirmar') + '</h3><p style="color:#666;margin-bottom:20px;">' + (mensagem||'Tem certeza?') + '</p><div style="display:flex;gap:10px;"><button id="btnCancelarModal" style="flex:1;padding:14px;border:2px solid #e5e7eb;border-radius:12px;background:white;color:#666;font-weight:600;cursor:pointer;">Cancelar</button><button id="btnConfirmarModal" style="flex:1;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#F47920,#E06B1A);color:white;font-weight:600;cursor:pointer;">Confirmar</button></div></div>';
    document.body.appendChild(modal);
    document.getElementById('btnConfirmarModal').onclick = function() { modal.remove(); if (onConfirmar) onConfirmar(); };
    document.getElementById('btnCancelarModal').onclick = function() { modal.remove(); if (onCancelar) onCancelar(); };
    modal.onclick = function(e) { if (e.target === modal) { modal.remove(); if (onCancelar) onCancelar(); } };
};

// ===== LOGIN / CADASTRO / SAIR =====
App.prototype.fazerLogin = function() {
    var s = this, email = document.getElementById('loginEmail')?.value?.trim() || '', senha = document.getElementById('loginSenha')?.value || '';
    if (!email || !senha) { s.mostrarToast('Preencha email e senha!', 'erro'); return; }
    var btn = document.getElementById('btnLogin'); if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }
    firebase.auth().signInWithEmailAndPassword(email, senha).then(function(uc) { return db.collection('usuarios').doc(uc.user.uid).get(); }).then(function(doc) {
        if (doc.exists) { s.usuarioLogado = doc.data(); s.usuarioLogado.id = doc.id; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); s.historicoTelas = []; s.mostrarToast('Bem-vindo, ' + s.usuarioLogado.nome + '!', 'sucesso'); s.mostrarTela('homeScreen'); }
        else { s.mostrarToast('Usuário não encontrado!', 'erro'); }
    }).catch(function(err) { var m = 'Erro'; if (err.code === 'auth/user-not-found') m = 'Usuário não encontrado!'; else if (err.code === 'auth/wrong-password') m = 'Senha incorreta!'; s.mostrarToast(m, 'erro'); }).finally(function() { if (btn) { btn.textContent = 'ENTRAR'; btn.disabled = false; } });
};

App.prototype.cadastrar = function() {
    var s = this, d = { nome: document.getElementById('cadNome')?.value?.trim() || '', email: document.getElementById('cadEmail')?.value?.trim() || '', senha: document.getElementById('cadSenha')?.value || '', tipo: document.getElementById('cadTipo')?.value || 'profissional', celular: document.getElementById('cadCelular')?.value?.trim() || '', cpf: document.getElementById('cadCPF')?.value?.trim() || '', profissao: document.getElementById('cadProfissao')?.value || '', experiencia: document.getElementById('cadExperiencia')?.value || '0', habilidades: document.getElementById('cadHabilidades')?.value?.trim() || '', score: 0, fotoPerfil: null, localizacao: null };
    if (!d.nome || !d.email || !d.senha) { s.mostrarToast('Preencha todos!', 'erro'); return; }
    if (d.senha.length < 6) { s.mostrarToast('Senha mínima 6 caracteres!', 'erro'); return; }
    s.mostrarToast('Cadastrando...', 'info');
    firebase.auth().createUserWithEmailAndPassword(d.email, d.senha).then(function(uc) { d.id = uc.user.uid; d.dataCriacao = firebase.firestore.FieldValue.serverTimestamp(); d.ativo = true; return db.collection('usuarios').doc(d.id).set(d); }).then(function() { s.usuarioLogado = d; localStorage.setItem('usuarioLPX', JSON.stringify(d)); s.notificarTodosUsuarios({ titulo: '👤 Novo Profissional!', mensagem: d.nome + ' acabou de se cadastrar!', tipo: 'novo_usuario' }); s.mostrarToast('✅ Cadastro realizado!', 'sucesso'); s.mostrarTela('homeScreen'); }).catch(function(err) { s.mostrarToast(err.code === 'auth/email-already-in-use' ? 'Email já cadastrado!' : 'Erro ao cadastrar', 'erro'); });
};

App.prototype.sair = function() { this.pararListeners(); firebase.auth().signOut(); this.usuarioLogado = null; this.usuarioSelecionado = null; localStorage.removeItem('usuarioLPX'); this.historicoTelas = []; var modal = document.getElementById('modalSair'); if (modal) modal.style.display = 'none'; this.mostrarTela('loginScreen'); };
App.prototype.fecharModalSair = function() { var m = document.getElementById('modalSair'); if (m) m.style.display = 'none'; };
App.prototype.confirmarSair = function() { this.sair(); };

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { var saved = localStorage.getItem('usuarioLPX'); if (saved) { try { s.usuarioLogado = JSON.parse(saved); } catch(e) { s.mostrarTela('loginScreen'); return; } } else { s.mostrarTela('loginScreen'); return; } }
    var u = s.usuarioLogado, hr = new Date().getHours(), saudacao = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    var el = document.getElementById('saudacao'); if (el) el.textContent = '👋 ' + saudacao + ', ' + u.nome + '!';
    var er = document.getElementById('resumoTexto'); if (er) er.textContent = u.tipo === 'empreiteiro' ? '🏰 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
    if (!s._listenerFeed) s.iniciarFeedListener();
    if (!s._listenerMsgBadge) s.iniciarBadgeMensagens();
    // Inicia mapa
    setTimeout(function() { s.iniciarMapa(); }, 300);
};

App.prototype.mudarTab = function(t) {
    this.tabAtual = t; var fc = document.getElementById('feedContainer'), rc = document.getElementById('redeContainer');
    var tabs = document.querySelectorAll('.tab'); tabs.forEach(function(tb) { tb.classList.remove('active'); });
    if (t === 'feed') { if (fc) fc.style.display = 'flex'; if (rc) rc.style.display = 'none'; if (tabs[0]) tabs[0].classList.add('active'); if (this._vagasCache.length > 0) this.renderizarFeed(this._vagasCache); }
    else { if (fc) fc.style.display = 'none'; if (rc) rc.style.display = 'flex'; if (tabs[1]) tabs[1].classList.add('active'); this.carregarRede(); }
};

// ===== MAPA (OpenStreetMap) =====
App.prototype.iniciarMapa = function() {
    var el = document.getElementById('map');
    if (!el || this._mapaIniciado) return;
    this._mapaIniciado = true;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            var lat = p.coords.latitude, lng = p.coords.longitude;
            el.innerHTML = '<iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=' + (lng - 0.01) + '%2C' + (lat - 0.01) + '%2C' + (lng + 0.01) + '%2C' + (lat + 0.01) + '&amp;layer=mapnik&marker=' + lat + '%2C' + lng + '" style="border-radius:12px;border:1px solid #ccc;"></iframe><small style="display:block;text-align:center;padding:4px;"><a href="https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lng + '#map=15/' + lat + '/' + lng + '" target="_blank" style="color:#1A3A5C;">📍 Ver mapa maior</a></small>';
        }, function() {
            el.innerHTML = '<div style="text-align:center;padding:40px;background:#e5e7eb;border-radius:12px;">📍 Ative a localização para ver o mapa</div>';
        });
    } else {
        el.innerHTML = '<div style="text-align:center;padding:40px;background:#e5e7eb;border-radius:12px;">📍 Localização não disponível</div>';
    }
};

// ===== FEED =====
App.prototype.iniciarFeedListener = function() { var s = this; if (s._listenerFeed) { s._listenerFeed(); s._listenerFeed = null; } if (typeof db === 'undefined') return; s._listenerFeed = db.collection('vagas').where('ativa', '==', true).onSnapshot(function(snap) { var vagas = []; snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; vagas.push(v); }); vagas.sort(function(a, b) { return (b.dataCriacao?.toDate?.()||0) - (a.dataCriacao?.toDate?.()||0); }); s._vagasCache = vagas; var container = document.getElementById('feedContainer'); if (container && s.tabAtual === 'feed') s.renderizarFeed(vagas); snap.docChanges().forEach(function(change) { if (change.type === 'added' && s._feedJaCarregado && s.usuarioLogado) { var vaga = change.doc.data(); if (vaga.autorId !== s.usuarioLogado.id) { tocarSomNotificacao(); s.mostrarToast('🆕 ' + (vaga.autorNome||'Alguém') + ' publicou: ' + (vaga.titulo||'Nova obra'), 'info'); } } }); s._feedJaCarregado = true; }); };

App.prototype.renderizarFeed = function(vagas) { var s = this, container = document.getElementById('feedContainer'); if (!container || s.tabAtual !== 'feed') return; if (!vagas || vagas.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:50px;">🏗️</div><h3>Nenhuma obra</h3>' + (s.usuarioLogado?.tipo === 'empreiteiro' ? '<button onclick="window.app.abrirTelaPublicacao()" class="btn btn-primary">📢 PUBLICAR</button>' : '') + '</div>'; return; } var html = ''; for (var i = 0; i < vagas.length; i++) { var v = vagas[i], dono = s.usuarioLogado && v.autorId === s.usuarioLogado.id, data = ''; try { data = v.dataCriacao?.toDate?.().toLocaleDateString('pt-BR') || ''; } catch(e) {} html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar">' + (v.autorFoto && v.autorFoto.length > 10 ? '<img src="' + v.autorFoto + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '👷') + '</div><div class="vaga-info"><div class="vaga-nome" style="cursor:pointer;color:#1A3A5C;" onclick="event.stopPropagation();window.app.verPerfil(\'' + v.autorId + '\')">' + (v.autorNome||'Anônimo') + '</div><div class="vaga-data">' + data + '</div></div>' + (dono ? '<span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:12px;font-size:11px;">⭐ SUA</span>' : '') + '</div><div class="vaga-body">' + (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;">' : '') + '<div class="vaga-titulo">' + (v.titulo||'Sem título') + '</div><div style="color:#666;font-size:13px;">📍 ' + (v.endereco||'') + '</div><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.valorHora||'0') + '/h</span><span class="vaga-tag">👷 ' + (v.profissoes||'Geral') + '</span></div></div><div class="vaga-footer"><button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver</button>' + (dono ? '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">🗑️</button>' : '') + '</div></div>'; } container.innerHTML = html; };

App.prototype.apagarObra = function(oid, ev) { if (ev) ev.stopPropagation(); var s = this; s.mostrarModalConfirmacao('Apagar Obra', 'Tem certeza que deseja apagar esta obra?', function() { db.collection('vagas').doc(oid).update({ ativa: false }); s.mostrarToast('Obra apagada!', 'sucesso'); }); };

// ===== PERFIL / BUSCA =====
App.prototype.carregarMeuPerfil = function() { var s = this, u = s.usuarioLogado, tela = document.getElementById('meuPerfilScreen'); if (!tela || !u) return; tela.innerHTML = '<div class="screen-header"><button class="btn-voltar" onclick="window.app.voltarTela()"><i class="fas fa-arrow-left"></i></button><h2>Meu Perfil</h2></div><div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar" onclick="document.getElementById(\'inputFoto\').click()"><img id="perfilAvatar" src="' + (u.fotoPerfil || 'imagem/logo-sem-fundo-lpxconstrutor.png') + '" style="width:100%;height:100%;object-fit:' + (u.fotoPerfil ? 'cover' : 'contain') + ';"></div></div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;"></div><div class="profile-info-card"><h2>' + (u.nome||'') + '</h2><p>👷 ' + (u.profissao||u.tipo||'') + '</p><p>📧 ' + (u.email||'') + '</p><p>📱 ' + (u.celular||'') + '</p></div><div style="display:flex;flex-direction:column;gap:10px;padding:0 16px;"><button onclick="window.app.abrirEditarPerfil()" class="btn btn-primary">✏️ Editar</button><button onclick="window.app.gerarQRCodeCompartilhar()" class="btn btn-outline">📱 QR Code</button><button onclick="window.app.mostrarTela(\'minhasObrasScreen\')" class="btn btn-outline">🏗️ Obras</button><button onclick="window.app.mostrarTela(\'configScreen\')" class="btn btn-outline">⚙️ Config</button><button onclick="document.getElementById(\'modalSair\').style.display=\'flex\'" class="btn btn-danger">🚪 Sair</button></div>'; };
App.prototype.buscarProfissionais = function() { var s = this, container = document.getElementById('buscaResultados'); if (!container) return; var termo = (document.getElementById('buscaInput')?.value||'').toLowerCase().trim(); container.innerHTML = '<div class="loading">Buscando...</div>'; db.collection('usuarios').where('ativo','==',true).get().then(function(snap) { var usuarios = []; snap.forEach(function(doc) { var u = doc.data(); u.id = doc.id; if (u.id !== s.usuarioLogado?.id) usuarios.push(u); }); if (termo) usuarios = usuarios.filter(function(u) { return (u.nome||'').toLowerCase().includes(termo) || (u.profissao||'').toLowerCase().includes(termo); }); if (usuarios.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">Nenhum profissional</div>'; return; } var html = ''; for (var i = 0; i < usuarios.length; i++) { var u = usuarios[i], foto = u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<i class="fas fa-user" style="font-size:24px;color:#1A3A5C;"></i>'; html += '<div class="vaga-card" style="padding:12px;"><div style="display:flex;align-items:center;gap:12px;"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;display:flex;align-items:center;justify-content:center;background:#f0f0f0;flex-shrink:0;cursor:pointer;" onclick="window.app.verPerfil(\'' + u.id + '\')">' + foto + '</div><div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + u.id + '\')"><strong style="color:#1A3A5C;">' + (u.nome||'') + '</strong><br><small>' + (u.tipo==='empreiteiro'?'🏢 Empreiteiro':'👷 '+(u.profissao||'')) + '</small></div><button onclick="event.stopPropagation();window.app.iniciarChat(\'' + u.id + '\')" style="background:#1A3A5C;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;">💬</button></div></div>'; } container.innerHTML = html; }); };
App.prototype.verPerfil = function(uid) { var s = this; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); u.id = doc.id; var conteudo = document.getElementById('perfilPublicoConteudo'); if (!conteudo) return; conteudo.innerHTML = '<div style="text-align:center;padding:20px;"><div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #F47920;display:flex;align-items:center;justify-content:center;background:#f0f0f0;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<i class="fas fa-user" style="font-size:60px;color:#1A3A5C;"></i>') + '</div><h2>' + (u.nome||'') + '</h2><p>' + (u.tipo==='empreiteiro'?'🏢 Empreiteiro':'👷 '+(u.profissao||'')) + '</p><div class="card"><p>📧 ' + (u.email||'') + '</p><p>📱 ' + (u.celular||'') + '</p></div><div style="display:flex;gap:10px;margin-top:10px;"><button onclick="window.app.iniciarChat(\'' + u.id + '\')" class="btn btn-primary" style="flex:1;">💬 Chat</button><button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" class="btn btn-success" style="flex:1;">🔗 Conectar</button></div>'; s.mostrarTela('perfilPublicoScreen'); }); };

// ===== REDE =====
App.prototype.carregarRede = function() { var s = this, container = document.getElementById('redeContainer'); if (!container || !s.usuarioLogado) return; container.innerHTML = '<div class="loading">Carregando...</div>'; db.collection('conexoes').where('participantes','array-contains',s.usuarioLogado.id).where('status','==','ativo').get().then(function(snap) { var conexoes = []; snap.forEach(function(doc) { conexoes.push({id:doc.id,data:doc.data()}); }); if (conexoes.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Rede vazia</h3></div>'; return; } var html = '', carregados = 0; conexoes.forEach(function(conn) { var amigoId = conn.data.participantes.find(function(p) { return p !== s.usuarioLogado.id; }); if (!amigoId) return; db.collection('usuarios').doc(amigoId).get().then(function(doc) { carregados++; if (doc.exists) { var amigo = doc.data(); amigo.id = doc.id; html += '<div class="card" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#f0f0f0;">' + (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷') + '</div><div style="flex:1;"><strong>' + (amigo.nome||'') + '</strong></div></div>'; } if (carregados >= conexoes.length) container.innerHTML = html; }); }); setTimeout(function() { if (carregados < conexoes.length) container.innerHTML = html; }, 3000); }); };
App.prototype.adicionarNaRede = function(pid) { var s = this; if (!s.usuarioLogado || s.usuarioLogado.id === pid) return; db.collection('conexoes').where('participantes','array-contains',s.usuarioLogado.id).get().then(function(snap) { var existe = false; snap.forEach(function(doc) { if (doc.data().participantes.indexOf(pid) >= 0) existe = true; }); if (existe) { s.mostrarToast('Já conectado!', 'erro'); return; } db.collection('conexoes').add({ participantes: [s.usuarioLogado.id, pid], status: 'pendente', solicitanteId: s.usuarioLogado.id, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { db.collection('notificacoes').add({ usuarioId: pid, titulo: '🔗 Convite de ' + s.usuarioLogado.nome, mensagem: s.usuarioLogado.nome + ' quer se conectar!', tipo: 'convite', de: s.usuarioLogado.id, deNome: s.usuarioLogado.nome, lida: false, visto: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }); s.mostrarToast('✅ Convite enviado!', 'sucesso'); }); }); };
App.prototype.aceitarConvite = function(nid, deId) { var s = this; db.collection('conexoes').where('participantes','array-contains',s.usuarioLogado.id).get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if (d.participantes.indexOf(s.usuarioLogado.id) >= 0 && d.participantes.indexOf(deId) >= 0 && d.status === 'pendente') db.collection('conexoes').doc(doc.id).update({ status: 'ativo' }); }); }); db.collection('notificacoes').doc(nid).update({ lida: true, visto: true }); s.mostrarToast('✅ Conectados!', 'sucesso'); };
App.prototype.recusarConvite = function(nid) { db.collection('notificacoes').doc(nid).update({ lida: true, visto: true }); this.mostrarToast('Convite recusado', 'info'); };

// ===== CHAT ESTILO WHATSAPP =====
App.prototype.iniciarBadgeMensagens = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    if (s._listenerMsgBadge) s._listenerMsgBadge();
    s._listenerMsgBadge = db.collection('mensagens').where('destinatarioId','==',s.usuarioLogado.id).where('lida','==',false).onSnapshot(function(snap) {
        var count = snap.size;
        var chatNav = document.querySelector('.nav-item[data-screen="chatScreen"]');
        if (chatNav) {
            var badge = chatNav.querySelector('.badge-msg');
            if (!badge) { badge = document.createElement('span'); badge.className = 'badge-msg'; badge.style.cssText = 'position:absolute;top:-2px;right:2px;background:#EF4444;color:white;border-radius:50%;min-width:18px;height:18px;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:bold;padding:0 4px;'; chatNav.style.position = 'relative'; chatNav.appendChild(badge); }
            if (count > 0) { badge.textContent = count > 99 ? '99+' : count; badge.style.display = 'flex'; }
            else { badge.style.display = 'none'; }
        }
    });
};

App.prototype.carregarListaConversas = function() {
    var s = this;
    s.usuarioSelecionado = null;
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;">⏳ Carregando conversas...</div>';
    var inputContainer = document.querySelector('#chatInputContainer') || document.querySelector('.chat-input-container');
    if (inputContainer) inputContainer.style.display = 'none';
    
    if (!s.usuarioLogado || !s.usuarioLogado.id) return;
    
    // Listener para atualizar conversas em tempo real
    if (s._listenerConversas) s._listenerConversas();
    s._listenerConversas = db.collection('mensagens').where('participantes','array-contains',s.usuarioLogado.id).onSnapshot(function() { s._renderizarConversas(); });
    s._renderizarConversas();
};

App.prototype._renderizarConversas = function() {
    var s = this;
    var chatMessages = document.getElementById('chatMessages');
    if (s.usuarioSelecionado) return; // Não renderiza se estiver em uma conversa
    
    // Usa cache para conversas já carregadas
    db.collection('mensagens').where('participantes','array-contains',s.usuarioLogado.id).get().then(function(snap) {
        var conversas = {};
        snap.forEach(function(doc) {
            var msg = doc.data();
            var outroId = msg.participantes.find(function(p) { return p !== s.usuarioLogado.id; });
            if (!outroId) return;
            if (!conversas[outroId] || (msg.dataEnvio?.toDate?.()||0) > (conversas[outroId].dataEnvio?.toDate?.()||0)) {
                conversas[outroId] = { outroId: outroId, data: msg };
            }
        });
        
        var lista = Object.values(conversas);
        lista.sort(function(a, b) { return (b.data.dataEnvio?.toDate?.()||0) - (a.data.dataEnvio?.toDate?.()||0); });
        s._conversasCache = lista;
        
        if (lista.length === 0) { if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;">Nenhuma conversa ainda</div>'; return; }
        
        var html = '', carregados = 0;
        lista.forEach(function(conv) {
            // Usa cache de usuários
            var userCache = s._userCache || {};
            if (userCache[conv.outroId]) {
                carregados++;
                var user = userCache[conv.outroId];
                html += s._htmlConversa(user, conv);
                if (carregados >= lista.length && chatMessages) chatMessages.innerHTML = html;
            } else {
                db.collection('usuarios').doc(conv.outroId).get().then(function(userDoc) {
                    carregados++;
                    if (userDoc.exists) {
                        var user = userDoc.data(); user.id = userDoc.id;
                        if (!s._userCache) s._userCache = {};
                        s._userCache[conv.outroId] = user;
                        html += s._htmlConversa(user, conv);
                    }
                    if (carregados >= lista.length && chatMessages) chatMessages.innerHTML = html || '<div style="text-align:center;padding:40px;">Nenhuma conversa</div>';
                });
            }
        });
        setTimeout(function() { if (carregados < lista.length && chatMessages) chatMessages.innerHTML = html || '<div style="text-align:center;padding:40px;">Nenhuma conversa</div>'; }, 2000);
    });
};

App.prototype._htmlConversa = function(user, conv) {
    var hora = ''; try { hora = conv.data.dataEnvio?.toDate?.().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) || ''; } catch(e) {}
    var naoLidas = conv.data.destinatarioId === this.usuarioLogado.id && !conv.data.lida;
    return '<div class="card" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;' + (naoLidas ? 'background:#f0f9ff;' : '') + '" onclick="window.app.iniciarChat(\'' + user.id + '\')"><div style="width:50px;height:50px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#f0f0f0;flex-shrink:0;">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷') + '</div><div style="flex:1;min-width:0;"><strong>' + (user.nome||'Usuário') + '</strong><br><small style="color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">' + (conv.data.conteudo||'') + '</small></div><div style="text-align:right;flex-shrink:0;"><small style="color:#999;">' + hora + '</small>' + (naoLidas ? '<br><span style="background:#EF4444;color:white;border-radius:50%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;margin-top:4px;">●</span>' : '') + '</div></div>';
};

// ===== ABRIR CHAT (estilo WhatsApp - não sai da conversa ao enviar) =====
App.prototype.iniciarChat = function(uid) {
    var s = this;
    if (!s.usuarioLogado || !s.usuarioLogado.id) return;
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:40px;">⏳ Carregando...</div>';
    
    // Marca mensagens como lidas (badge some)
    db.collection('mensagens').where('destinatarioId','==',s.usuarioLogado.id).where('remetenteId','==',uid).where('lida','==',false).get().then(function(snap) {
        var batch = db.batch();
        snap.forEach(function(doc) { batch.update(doc.ref, { lida: true }); });
        batch.commit().catch(function(){});
    });
    
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        s.usuarioSelecionado = doc.exists ? doc.data() : { id: uid, nome: 'Usuário', fotoPerfil: null };
        s.usuarioSelecionado.id = uid;
        var user = s.usuarioSelecionado;
        
        var chatHeader = document.getElementById('chatHeaderInfo');
        if (chatHeader) chatHeader.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;"><button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;">⬅</button><div style="width:40px;height:40px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2);">' + (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷') + '</div><strong>' + (user.nome||'Usuário') + '</strong></div>';
        
        var inputContainer = document.querySelector('#chatInputContainer') || document.querySelector('.chat-input-container');
        if (inputContainer) inputContainer.style.display = 'flex';
        
        var user1 = s.usuarioLogado.id, user2 = uid;
        
        s._listenerChat = db.collection('mensagens').where('participantes','array-contains',user1).onSnapshot(function(snap) {
            var mensagens = [];
            snap.forEach(function(doc) {
                var msg = doc.data();
                if (msg.participantes && msg.participantes.indexOf(user1) >= 0 && msg.participantes.indexOf(user2) >= 0) {
                    msg.id = doc.id; mensagens.push(msg);
                    if (msg.destinatarioId === user1 && !msg.lida) { db.collection('mensagens').doc(doc.id).update({ lida: true }).catch(function(){}); }
                }
            });
            mensagens.sort(function(a, b) { return (a.dataEnvio?.toDate?.()||0) - (b.dataEnvio?.toDate?.()||0); });
            
            if (!chatMessages) return;
            if (mensagens.length === 0) { chatMessages.innerHTML = '<div style="text-align:center;padding:40px;">Diga olá! 👋</div>'; }
            else {
                var html = '';
                mensagens.forEach(function(msg) {
                    var meu = msg.remetenteId === user1;
                    var hora = ''; try { hora = msg.dataEnvio?.toDate?.().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) || ''; } catch(e) {}
                    html += '<div class="message ' + (meu ? 'message-sent' : 'message-received') + '"><div class="message-content">' + (msg.conteudo||'') + '</div><div class="message-footer"><span class="message-time">' + hora + '</span></div></div>';
                });
                chatMessages.innerHTML = html;
                setTimeout(function() { chatMessages.scrollTop = chatMessages.scrollHeight; }, 100);
            }
        });
        
        s.mostrarTela('chatScreen');
        setTimeout(function() { var input = document.getElementById('chatInput'); if (input) input.focus(); }, 500);
    });
};

// Enviar mensagem - NÃO sai da conversa
App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioLogado || !s.usuarioSelecionado || s._enviandoMensagem) return;
    var texto = input.value.trim(); if (!texto) return;
    s._enviandoMensagem = true;
    input.value = '';
    input.focus(); // Mantém o foco no input
    
    db.collection('mensagens').add({
        remetenteId: s.usuarioLogado.id, destinatarioId: s.usuarioSelecionado.id,
        participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
        conteudo: texto, lida: false, dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        db.collection('notificacoes').add({
            usuarioId: s.usuarioSelecionado.id, titulo: '💬 ' + s.usuarioLogado.nome,
            mensagem: texto.substring(0, 80) + (texto.length > 80 ? '...' : ''),
            tipo: 'mensagem', de: s.usuarioLogado.id, deNome: s.usuarioLogado.nome,
            lida: false, visto: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(){});
    }).catch(function(err) { s.mostrarToast('Erro ao enviar', 'erro'); }).finally(function() { s._enviandoMensagem = false; });
};

// ===== NOTIFICAÇÕES COM "VISTO" =====
App.prototype.notificarTodosUsuarios = function(dados) {
    var s = this; if (!s.usuarioLogado) return;
    db.collection('usuarios').where('ativo','==',true).get().then(function(snap) {
        var batch = db.batch();
        snap.forEach(function(doc) { if (doc.id !== s.usuarioLogado.id) { batch.set(db.collection('notificacoes').doc(), { usuarioId: doc.id, titulo: dados.titulo, mensagem: dados.mensagem, tipo: dados.tipo, vagaId: dados.vagaId||null, de: s.usuarioLogado.id, deNome: s.usuarioLogado.nome, lida: false, visto: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }); } });
        batch.commit().catch(function(){});
    });
};

App.prototype.iniciarListenerNotificacoes = function() {
    var s = this;
    if (s._listenerNotificacoes) { s._listenerNotificacoes(); s._listenerNotificacoes = null; }
    if (!s.usuarioLogado) return;
    
    s._listenerNotificacoes = db.collection('notificacoes').where('usuarioId','==',s.usuarioLogado.id).where('lida','==',false).onSnapshot(function(snap) {
        var badge = document.getElementById('badgeNotificacoes');
        if (badge) { var c = snap.size; if (c > 0) { badge.textContent = c > 99 ? '99+' : c; badge.style.display = 'flex'; } else badge.style.display = 'none'; }
        
        snap.docChanges().forEach(function(change) {
            if (change.type === 'added') {
                var n = change.doc.data(), msg = '';
                if (n.tipo === 'mensagem') { msg = '💬 ' + (n.deNome||'Alguém') + ' enviou mensagem'; tocarSomMensagem(); }
                else if (n.tipo === 'nova_vaga') { msg = '🏗️ ' + (n.deNome||'Alguém') + ' publicou obra'; tocarSomNotificacao(); }
                else if (n.tipo === 'novo_usuario') { msg = '👤 ' + (n.titulo||'Novo cadastro'); tocarSomNotificacao(); }
                else if (n.tipo === 'convite') { msg = '🔗 ' + (n.deNome||'Alguém') + ' quer se conectar'; tocarSomNotificacao(); }
                if (msg) s.mostrarToast(msg, 'info');
                if ('Notification' in window && Notification.permission === 'granted') { new Notification('LPXConstrutor', { body: msg, icon: 'imagem/logo-sem-fundo-lpxconstrutor.png' }); }
            }
        });
    });
};

if ('Notification' in window && Notification.permission === 'default') { Notification.requestPermission(); }

App.prototype.mostrarNotificacoes = function() {
    var s = this; if (!s.usuarioLogado) return;
    
    // Marca como vistas (não lidas) ao abrir
    db.collection('notificacoes').where('usuarioId','==',s.usuarioLogado.id).where('visto','==',false).get().then(function(snap) {
        var batch = db.batch(); snap.forEach(function(doc) { batch.update(doc.ref, { visto: true }); }); batch.commit();
    });
    
    db.collection('notificacoes').where('usuarioId','==',s.usuarioLogado.id).orderBy('dataCriacao','desc').limit(50).get().then(function(snap) {
        var ns = []; snap.forEach(function(doc) { var n = doc.data(); n.id = doc.id; ns.push(n); });
        var modal = document.createElement('div'); modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
        var html = '<div class="modal-content" style="max-width:500px;width:95%;max-height:80vh;" onclick="event.stopPropagation()"><div class="modal-header"><h3>🔔 Notificações</h3><button class="modal-close" onclick="this.closest(\'.modal-content\').parentElement.remove()">✕</button></div><div style="max-height:60vh;overflow-y:auto;padding:10px;">';
        
        if (ns.length === 0) html += '<div style="text-align:center;padding:40px;">Nenhuma notificação</div>';
        else ns.forEach(function(n) {
            var icone = '📢', cor = '#f0f9ff', opacidade = n.visto ? '0.6' : '1';
            if (n.tipo === 'nova_vaga') { icone = '🏗️'; cor = '#fef3c7'; }
            else if (n.tipo === 'mensagem') { icone = '💬'; cor = '#e0f2fe'; }
            else if (n.tipo === 'convite') { icone = '🔗'; cor = '#ede9fe'; }
            else if (n.tipo === 'novo_usuario') { icone = '👤'; cor = '#d1fae5'; }
            
            var data = ''; try { if (n.dataCriacao?.toDate) data = n.dataCriacao.toDate().toLocaleString('pt-BR'); } catch(e) {}
            
            html += '<div style="background:' + cor + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;opacity:' + opacidade + ';cursor:pointer;" onclick="window.app.marcarNotificacaoVista(\'' + n.id + '\')"><div style="display:flex;align-items:start;gap:8px;"><div style="font-size:24px;">' + icone + '</div><div style="flex:1;"><strong>' + (n.titulo||'') + '</strong>' + (n.visto ? ' <small style="color:#10B981;">✓ Visto</small>' : ' <small style="color:#F47920;">● Novo</small>') + '<br><small>' + (n.mensagem||'') + '</small><br><small style="color:#999;">' + data + '</small>';
            
            if (n.tipo === 'convite') html += '<div style="display:flex;gap:8px;margin-top:8px;"><button onclick="event.stopPropagation();window.app.aceitarConvite(\'' + n.id + '\',\'' + n.de + '\');this.closest(\'.modal-content\').parentElement.remove();" style="flex:1;background:#10B981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">✅ Aceitar</button><button onclick="event.stopPropagation();window.app.recusarConvite(\'' + n.id + '\');this.closest(\'.modal-content\').parentElement.remove();" style="flex:1;background:#EF4444;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">❌ Recusar</button></div>';
            if (n.tipo === 'nova_vaga' && n.vagaId) html += '<button onclick="event.stopPropagation();window.app.verDetalheObra(\'' + n.vagaId + '\');this.closest(\'.modal-content\').parentElement.remove();" style="width:100%;margin-top:8px;background:#F47920;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">👀 IR PARA OBRA</button>';
            if (n.tipo === 'mensagem' && n.de) html += '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + n.de + '\');this.closest(\'.modal-content\').parentElement.remove();" style="width:100%;margin-top:8px;background:#3B82F6;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;">💬 IR PARA CONVERSA</button>';
            
            html += '</div></div></div>';
        });
        html += '</div></div>'; modal.innerHTML = html; document.body.appendChild(modal);
    });
};

// Marca notificação como vista ao clicar
App.prototype.marcarNotificacaoVista = function(nid) {
    db.collection('notificacoes').doc(nid).update({ visto: true, lida: true }).catch(function(){});
    this.mostrarToast('✅ Marcado como visto', 'sucesso');
};

// ===== PUBLICAÇÃO =====
App.prototype.abrirTelaPublicacao = function() { this.mostrarTela('publicarVagaScreen'); this.vagaFotoBase64 = null; };
App.prototype.previewFotoObra = function(e) { var f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { var p = document.getElementById('vagaFotoPreview'); if (p) { p.src = ev.target.result; p.style.objectFit = 'cover'; } window.app._app.vagaFotoBase64 = ev.target.result; }; r.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var s = this; if (s._publicando) return; var titulo = document.getElementById('vagaTitulo')?.value?.trim() || '', endereco = document.getElementById('vagaEndereco')?.value?.trim() || '', valor = document.getElementById('vagaValorHora')?.value || '', descricao = document.getElementById('vagaDescricao')?.value?.trim() || '', profs = []; document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { profs.push(cb.value); }); if (!titulo || !endereco || !valor) { s.mostrarToast('Preencha todos!', 'erro'); return; } s._publicando = true; var btn = document.querySelector('#publicarVagaScreen .btn-primary'); if (btn) { btn.textContent = '⏳...'; btn.disabled = true; } db.collection('vagas').add({ titulo, endereco, profissoes: profs.length > 0 ? profs.join(', ') : 'Geral', valorHora: parseFloat(valor)||0, descricao, fotoObra: s.vagaFotoBase64||'', status: 'disponivel', ativa: true, autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome, autorFoto: s.usuarioLogado.fotoPerfil||null, interessados: [], dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function(docRef) { s.notificarTodosUsuarios({ titulo: '📢 Nova Obra!', mensagem: s.usuarioLogado.nome + ' publicou: ' + titulo, tipo: 'nova_vaga', vagaId: docRef.id }); s.mostrarToast('✅ Publicado!', 'sucesso'); s._publicando = false; if (btn) { btn.textContent = 'PUBLICAR'; btn.disabled = false; } s.mostrarTela('homeScreen'); }).catch(function(err) { s.mostrarToast('Erro: ' + (err.message||'Tente novamente'), 'erro'); s._publicando = false; if (btn) { btn.textContent = 'PUBLICAR'; btn.disabled = false; } }); };
App.prototype.verDetalheObra = function(oid) { db.collection('vagas').doc(oid).get().then(function(doc) { if (!doc.exists) return; var v = doc.data(); var modal = document.createElement('div'); modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;'; modal.onclick = function(e) { if (e.target === modal) modal.remove(); }; modal.innerHTML = '<div class="modal-content" style="max-width:500px;width:95%;" onclick="event.stopPropagation()">' + (v.fotoObra ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;border-radius:8px;">' : '') + '<h2>' + (v.titulo||'') + '</h2><p>📍 ' + (v.endereco||'') + '</p><p>💰 R$' + (v.valorHora||0) + '/h</p><button onclick="this.closest(\'.modal-content\').parentElement.remove()" class="btn btn-outline" style="width:100%;">Fechar</button></div>'; document.body.appendChild(modal); }); };
App.prototype.carregarMinhasObras = function() { var s = this, container = document.getElementById('listaObrasContainer'); if (!container || !s.usuarioLogado) return; db.collection('vagas').where('autorId','==',s.usuarioLogado.id).where('ativa','==',true).get().then(function(snap) { var obras = []; snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; obras.push(v); }); var total = document.getElementById('totalObras'); if (total) total.textContent = obras.length; if (obras.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma obra</h3></div>'; return; } var html = ''; obras.forEach(function(v) { html += '<div class="vaga-card"><div style="padding:15px;"><strong>' + (v.titulo||'') + '</strong></div></div>'; }); container.innerHTML = html; }); };

// ===== UPLOAD / CONFIG =====
App.prototype.uploadFoto = function(e) { var s = this, f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { s.usuarioLogado.fotoPerfil = ev.target.result; localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: ev.target.result }); s.mostrarToast('📷 Foto atualizada!', 'sucesso'); s.carregarMeuPerfil(); }; r.readAsDataURL(f); };
App.prototype.abrirEditarPerfil = function() { var s = this, u = s.usuarioLogado; var m = document.createElement('div'); m.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;'; m.onclick = function(e) { if (e.target === m) m.remove(); }; m.innerHTML = '<div class="modal-content" onclick="event.stopPropagation()"><h3>Editar Perfil</h3><input id="editNome" value="' + (u.nome||'') + '" class="input-field"><input id="editCelular" value="' + (u.celular||'') + '" class="input-field"><input id="editProfissao" value="' + (u.profissao||'') + '" class="input-field"><button onclick="window.app.salvarPerfil()" class="btn btn-success">SALVAR</button></div>'; document.body.appendChild(m); };
App.prototype.salvarPerfil = function() { var s = this; var d = { nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome, celular: document.getElementById('editCelular')?.value?.trim() || '', profissao: document.getElementById('editProfissao')?.value?.trim() || '' }; Object.assign(s.usuarioLogado, d); localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); db.collection('usuarios').doc(s.usuarioLogado.id).update(d); document.querySelector('.modal-content')?.parentElement?.remove(); s.mostrarToast('✅ Atualizado!', 'sucesso'); s.carregarMeuPerfil(); };
App.prototype.selecionarTema = function(t) { this.temaAtual = t; localStorage.setItem('tema', t); document.body.classList.toggle('dark-theme', t === 'escuro'); };
App.prototype.carregarConfigScreen = function() { var tela = document.getElementById('configScreen'); if (!tela) return; tela.innerHTML = '<div class="screen-header"><button class="btn-voltar" onclick="window.app.voltarTela()"><i class="fas fa-arrow-left"></i></button><h2>Configurações</h2></div><div style="padding:16px;"><div class="card"><button onclick="window.app.selecionarTema(\'claro\')" class="btn btn-outline">☀️ Claro</button><button onclick="window.app.selecionarTema(\'escuro\')" class="btn btn-outline">🌙 Escuro</button></div><p style="text-align:center;">v' + APP_VERSION + '</p></div>'; };
App.prototype.proximaEtapa = function(e) { document.getElementById('etapa1').style.display = e === 1 ? 'block' : 'none'; document.getElementById('etapa2').style.display = e === 2 ? 'block' : 'none'; };
App.prototype.toggleProfissao = function() { var g = document.getElementById('grupoProfissao'); if (g) g.style.display = document.getElementById('cadTipo')?.value === 'profissional' ? 'block' : 'none'; };
App.prototype.solicitarCodigo = function() { var email = document.getElementById('recEmail')?.value?.trim() || ''; if (!email) { this.mostrarToast('Digite seu email!', 'erro'); return; } firebase.auth().sendPasswordResetEmail(email).then(function() { window.app._app.mostrarToast('📧 Email enviado!', 'sucesso'); }).catch(function() { window.app._app.mostrarToast('Email não encontrado!', 'erro'); }); };
App.prototype.verificarCodigo = function() { this.mostrarToast('Use o link do email!', 'info'); };
App.prototype.voltarPasso1 = function() { document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; };
App.prototype.gerarQRCodeCompartilhar = function() { var s = this; if (!s.usuarioLogado) return; var url = window.location.origin + '?perfil=' + s.usuarioLogado.id; var m = document.createElement('div'); m.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;'; m.onclick = function(e) { if (e.target === m) m.remove(); }; m.innerHTML = '<div class="modal-content" style="text-align:center;padding:30px;" onclick="event.stopPropagation()"><h3>QR Code</h3><div id="qrcodeContainer"></div><button onclick="this.closest(\'.modal-content\').parentElement.remove()" class="btn btn-primary">FECHAR</button></div>'; document.body.appendChild(m); setTimeout(function() { var c = document.getElementById('qrcodeContainer'); if (c && typeof QRCode !== 'undefined') { new QRCode(c, { text: url, width: 180, height: 180, colorDark: '#1A3A5C', colorLight: '#ffffff' }); } }, 300); };

// ===== LIMPEZA =====
App.prototype.pararListeners = function() {
    if (this._listenerFeed) { this._listenerFeed(); this._listenerFeed = null; }
    if (this._listenerChat) { this._listenerChat(); this._listenerChat = null; }
    if (this._listenerNotificacoes) { this._listenerNotificacoes(); this._listenerNotificacoes = null; }
    if (this._listenerMsgBadge) { this._listenerMsgBadge(); this._listenerMsgBadge = null; }
    if (this._listenerConversas) { this._listenerConversas(); this._listenerConversas = null; }
};

App.prototype.mostrarToast = function(msg, tipo) {
    var toast = document.getElementById('toast'); if (!toast) return;
    toast.textContent = msg; toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1A3A5C';
    toast.style.color = 'white'; toast.style.display = 'block';
    clearTimeout(this._toastTimeout); this._toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 4000);
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ LPXCONSTRUTOR v' + APP_VERSION + ' - COMPLETO');
    window.app._app = new App();
});
