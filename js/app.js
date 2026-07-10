// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL COMPLETA =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id); if(t) t.classList.add('active');
    },
    cadastrar: function(){}, proximaEtapa: function(){}, toggleProfissao: function(){},
    recuperarSenha: function(){}, enviarRecuperacao: function(){},
    solicitarCodigo: function(){}, verificarCodigo: function(){}, voltarPasso1: function(){},
    sair: function(){}, buscarProfissionais: function(){}, verPerfil: function(){},
    iniciarChat: function(){}, enviarMensagem: function(){}, salvarPerfil: function(){},
    uploadFoto: function(){}, abrirTelaPublicacao: function(){}, publicarVagaApp: function(){},
    previewFotoObra: function(){}, candidatarVaga: function(){},
    abrirContratacao: function(){}, confirmarContratacao: function(){},
    novaObra: function(){}, carregarMinhasObras: function(){},
    verDetalheObra: function(){}, demitirFuncionario: function(){}, finalizarContrato: function(){},
    adicionarNaRede: function(){}, removerDaRede: function(){},
    verAvaliacoes: function(){}, filtrarAvaliacoes: function(){},
    abrirDarAvaliacao: function(){}, setNota: function(){}, enviarAvaliacao: function(){},
    mostrarNotificacoes: function(){}, mudarTab: function(){}, carregarFeed: function(){}, carregarRede: function(){}
};

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.recuperacaoUid = null;
    this.avaliacoesUid = null;
    this.avaliarUid = null;
    this.avaliarNota = 0;
    this.avaliacaoFiltro = 'todas';
    this.vagaFotoBase64 = null;
    this.contratarProfId = null;
    this.obraSelecionada = null;
    this.notificacoes = [];
    this.init();
};

App.prototype.init = function() {
    var self = this;
    console.log('🚀 Iniciando LPXConstrutor...');
    authService.onAuthStateChange(function(u) {
        if (u) {
            self.usuarioLogado = u;
            self.atualizarBotaoPublicar();
            self.atualizarBotaoObras();
            self.iniciarNotificacoes();
            if (self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') {
                self.mostrarTela('homeScreen');
            }
        } else {
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
        }
    });
    console.log('✅ App inicializado');
};

App.prototype.atualizarBotaoPublicar = function() {
    var btn = document.getElementById('btnPublicar');
    if (!btn) return;
    btn.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.atualizarBotaoObras = function() {
    var btn = document.getElementById('btnObras');
    if (!btn) return;
    btn.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.iniciarNotificacoes = function() {
    if (this.usuarioLogado && typeof notificationsService !== 'undefined') {
        notificationsService.carregarNotificacoes(this.usuarioLogado.id);
    }
};

App.prototype.mostrarTela = function(id) {
    var self = this;
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    var tela = document.getElementById(id);
    if (!tela) return;
    tela.classList.add('active');
    self.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen', 'minhasObrasScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
        nav.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === id) item.classList.add('active');
        });
    }
    
    if (id === 'homeScreen') setTimeout(function() { self.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { self.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { self.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { self.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') {
        document.getElementById('recPasso1').style.display = 'block';
        document.getElementById('recPasso2').style.display = 'none';
        var ee = document.getElementById('recEmail'); if (ee) ee.value = '';
        setTimeout(function() { if (ee) ee.focus(); }, 500);
    }
    if (id === 'chatScreen') setTimeout(function() {
        var inp = document.getElementById('chatInput'); if (inp) inp.focus();
    }, 300);
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var self = this;
    var e = (document.getElementById('loginEmail') || {}).value || '';
    var s = (document.getElementById('loginSenha') || {}).value || '';
    if (!e || !s) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    self.mostrarToast('Entrando...', 'info');
    authService.login(e, s).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Bem-vindo!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = { nome: (document.getElementById('cadNome') || {}).value || '', email: (document.getElementById('cadEmail') || {}).value || '', senha: (document.getElementById('cadSenha') || {}).value || '', tipo: (document.getElementById('cadTipo') || {}).value || 'profissional', celular: (document.getElementById('cadCelular') || {}).value || '', cpf: ((document.getElementById('cadCPF') || {}).value || '').replace(/\D/g, ''), profissao: (document.getElementById('cadProfissao') || {}).value || '', experiencia: (document.getElementById('cadExperiencia') || {}).value || '0', habilidades: (document.getElementById('cadHabilidades') || {}).value || '' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    self.mostrarToast('Cadastrando...', 'info');
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Cadastro realizado!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.proximaEtapa = function(e) { var e1 = document.getElementById('etapa1'), e2 = document.getElementById('etapa2'); if (!e1 || !e2) return; if (e === 1) { e1.style.display = 'block'; e2.style.display = 'none'; } else { e1.style.display = 'none'; e2.style.display = 'block'; } window.scrollTo({ top: 0, behavior: 'smooth' }); };
App.prototype.toggleProfissao = function() { var g = document.getElementById('grupoProfissao'); var t = (document.getElementById('cadTipo') || {}).value; if (g) g.style.display = t === 'profissional' ? 'block' : 'none'; };

// ===== RECUPERAÇÃO DE SENHA =====
App.prototype.solicitarCodigo = function() {
    var self = this;
    var email = document.getElementById('recEmail') ? document.getElementById('recEmail').value.trim() : '';
    if (!email || !email.includes('@')) { self.mostrarToast('❌ Digite um email válido!', 'erro'); return; }
    var s1 = document.getElementById('recStatus1'), i1 = document.getElementById('recIcon1'), m1 = document.getElementById('recMsg1'), sub1 = document.getElementById('recSub1'), cm = document.getElementById('recCodigoMostrado');
    if (s1) { s1.style.display = 'block'; s1.style.background = '#E0F2FE'; s1.style.border = '2px solid #7DD3FC'; }
    if (i1) i1.textContent = '⏳'; if (m1) m1.textContent = 'Gerando código...'; if (sub1) sub1.textContent = 'Aguarde'; if (cm) cm.style.display = 'none';
    var btn = document.querySelector('#recPasso1 .btn-primary');
    if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GERANDO...'; }
    authService.solicitarCodigoRecuperacao(email).then(function(r) {
        if (s1) s1.style.display = 'block';
        if (r.sucesso) {
            if (s1) { s1.style.background = '#D1FAE5'; s1.style.border = '2px solid #6EE7B7'; }
            if (i1) i1.textContent = '🔢'; if (m1) { m1.textContent = 'Código gerado!'; m1.style.color = '#065F46'; }
            if (sub1) { sub1.textContent = 'Use o código abaixo:'; sub1.style.color = '#065F46'; }
            if (cm) { cm.style.display = 'block'; cm.textContent = r.codigo; cm.style.background = '#1A3A5C'; cm.style.color = 'white'; cm.style.padding = '20px'; cm.style.borderRadius = '12px'; cm.style.fontSize = '36px'; cm.style.fontWeight = '900'; cm.style.letterSpacing = '12px'; }
            self.recuperacaoUid = r.uid; self.mostrarToast('✅ Código gerado!', 'sucesso');
            if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> CÓDIGO GERADO!'; btn.style.background = '#10B981'; }
            setTimeout(function() { document.getElementById('recPasso1').style.display = 'none'; document.getElementById('recPasso2').style.display = 'block'; if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.innerHTML = '<i class="fas fa-paper-plane"></i> ENVIAR CÓDIGO'; btn.style.background = ''; } }, 3000);
        } else {
            if (s1) { s1.style.background = '#FEE2E2'; s1.style.border = '2px solid #FCA5A5'; }
            if (i1) i1.textContent = '❌'; if (m1) { m1.textContent = r.erro; m1.style.color = '#991B1B'; }
            self.mostrarToast('❌ ' + r.erro, 'erro');
            if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.innerHTML = '<i class="fas fa-paper-plane"></i> TENTAR NOVAMENTE'; }
        }
    });
};

App.prototype.voltarPasso1 = function() { document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; };

App.prototype.verificarCodigo = function() {
    var self = this;
    var codigo = document.getElementById('recCodigo') ? document.getElementById('recCodigo').value.trim() : '';
    var ns = document.getElementById('recNovaSenha') ? document.getElementById('recNovaSenha').value : '';
    if (!codigo || codigo.length !== 6) { self.mostrarToast('❌ Digite o código de 6 dígitos!', 'erro'); return; }
    if (!ns || ns.length < 6) { self.mostrarToast('❌ Senha mínima 6 caracteres!', 'erro'); return; }
    var s2 = document.getElementById('recStatus2');
    if (s2) { s2.style.display = 'block'; s2.style.background = '#E0F2FE'; s2.style.border = '2px solid #7DD3FC'; s2.style.padding = '16px'; s2.style.borderRadius = '12px'; s2.innerHTML = '<p>⏳ Verificando...</p>'; }
    var btn = document.querySelector('#recPasso2 .btn-primary');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VERIFICANDO...'; }
    authService.redefinirSenhaComCodigo(self.recuperacaoUid, codigo, ns).then(function(r) {
        if (s2) s2.style.display = 'block';
        if (r.sucesso) {
            if (s2) { s2.style.background = '#D1FAE5'; s2.style.border = '2px solid #6EE7B7'; s2.innerHTML = '<div style="font-size:40px;">✅</div><p style="color:#065F46;">Código verificado!</p>'; }
            self.mostrarToast('✅ Verificado!', 'sucesso');
            if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> VERIFICADO!'; btn.style.background = '#10B981'; }
            setTimeout(function() { self.mostrarTela('loginScreen'); document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; }, 3000);
        } else {
            if (s2) { s2.style.background = '#FEE2E2'; s2.style.border = '2px solid #FCA5A5'; s2.innerHTML = '<p style="color:#991B1B;">❌ ' + r.erro + '</p>'; }
            self.mostrarToast('❌ ' + r.erro, 'erro');
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check"></i> REDEFINIR SENHA'; }
        }
    });
};

App.prototype.sair = function() { var self = this; authService.logout().then(function() { self.usuarioLogado = null; self.mostrarTela('loginScreen'); self.mostrarToast('👋 Até logo!', 'sucesso'); }); };

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    var h = new Date().getHours(), s = 'Bom dia'; if (h >= 12 && h < 18) s = 'Boa tarde'; if (h >= 18) s = 'Boa noite';
    var se = document.getElementById('saudacao'); if (se) se.textContent = '👋 ' + s + ', ' + this.usuarioLogado.nome + '!';
    var re = document.getElementById('resumoTexto'); if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    var self = this; setTimeout(function() { try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} }, 500);
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando vagas...</div>';
    var timeout = setTimeout(function() { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Tempo esgotado</h3><button class="btn btn-outline btn-small" onclick="app.carregarFeed()">Tentar novamente</button></div>'; }, 10000);
    db.collection('vagas').get().then(function(snap) {
        clearTimeout(timeout); var vagas = []; snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        if (vagas.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma vaga</h3>' + (self.usuarioLogado && self.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="app.abrirTelaPublicacao()">PUBLICAR VAGA</button>' : '') + '</div>'; return; }
        var html = ''; vagas.forEach(function(v) { html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ ' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-descricao">' + (v.data.descricao || '') + '</div><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div></div><div class="vaga-footer">' + (self.usuarioLogado && self.usuarioLogado.tipo === 'profissional' ? '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.candidatarVaga(\'' + v.id + '\')" style="flex:1;">✋ QUERO!</button>' : '') + '</div></div>'; });
        c.innerHTML = html;
    }).catch(function(error) { clearTimeout(timeout); c.innerHTML = '<div class="card"><p>Erro ao carregar</p><button class="btn btn-outline btn-small" onclick="app.carregarFeed()">Tentar novamente</button></div>'; });
};

App.prototype.carregarRede = function() {
    var self = this, c = document.getElementById('redeContainer'); if (!c) return; c.innerHTML = '<div class="loading">Carregando rede...</div>';
    db.collection('conexoes').get().then(function(snap) {
        var conexoes = []; snap.forEach(function(doc) { var d = doc.data(); if (d.usuarioId === self.usuarioLogado.id || d.amigoId === self.usuarioLogado.id) conexoes.push({ id: doc.id, data: d }); });
        if (conexoes.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-users" style="font-size:60px;color:#ccc;"></i><h3>Rede vazia</h3><button class="btn btn-primary" onclick="app.mostrarTela(\'buscaScreen\')">Buscar Profissionais</button></div>'; return; }
        var promessas = []; conexoes.forEach(function(con) { var amigoId = con.data.usuarioId === self.usuarioLogado.id ? con.data.amigoId : con.data.usuarioId; promessas.push(db.collection('usuarios').doc(amigoId).get()); });
        Promise.all(promessas).then(function(docs) { var html = ''; docs.forEach(function(doc) { if (doc.exists) { var u = doc.data(), w = u.celular ? u.celular.replace(/\D/g, '') : ''; html += '<div class="vaga-card" onclick="app.verPerfil(\'' + doc.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.nome + '</div><div class="vaga-data">' + (u.profissao || 'Profissional') + '</div></div></div><div class="vaga-footer">' + (w ? '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>' : '') + '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + doc.id + '\')">Chat</button><button class="btn btn-danger btn-small" onclick="event.stopPropagation();app.removerDaRede(\'' + doc.id + '\')">✕</button></div></div>'; } }); c.innerHTML = html || '<div class="card">Nenhum amigo</div>'; });
    });
};

App.prototype.adicionarNaRede = function(amigoId) { var self = this; if (!this.usuarioLogado) { this.mostrarToast('Faça login!', 'erro'); return; } if (this.usuarioLogado.id === amigoId) { this.mostrarToast('Não pode se adicionar!', 'erro'); return; } db.collection('conexoes').get().then(function(snap) { var existe = false; snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) existe = true; }); if (existe) { self.mostrarToast('Já está na rede!', 'erro'); return; } db.collection('conexoes').add({ usuarioId: self.usuarioLogado.id, amigoId: amigoId, status: 'ativo', dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.mostrarToast('✅ Adicionado!', 'sucesso'); }); }); };
App.prototype.removerDaRede = function(amigoId) { var self = this; if (!confirm('Remover da rede?')) return; db.collection('conexoes').get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) { db.collection('conexoes').doc(doc.id).delete().then(function() { self.mostrarToast('Removido', 'sucesso'); self.carregarRede(); }); } }); }); };

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() { if (!this.usuarioLogado) return; var u = this.usuarioLogado; var n = document.getElementById('meuPerfilNome'); if (n) n.textContent = u.nome || 'Usuário'; var p = document.getElementById('meuPerfilProfissao'); if (p) p.textContent = (u.tipo === 'profissional' ? '👷' : '🏢') + ' ' + (u.profissao || u.tipo); var a = document.getElementById('meuPerfilAvaliacao'); if (a) a.innerHTML = '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações'); var en = document.getElementById('editNome'); if (en) en.value = u.nome || ''; var ec = document.getElementById('editCelular'); if (ec) ec.value = u.celular || ''; var eh = document.getElementById('editHabilidades'); if (eh) eh.value = u.habilidades || ''; };
App.prototype.salvarPerfil = function() { var self = this; var d = { nome: (document.getElementById('editNome') || {}).value || '', celular: (document.getElementById('editCelular') || {}).value || '', habilidades: (document.getElementById('editHabilidades') || {}).value || '' }; if (!d.nome) { this.mostrarToast('Nome obrigatório!', 'erro'); return; } databaseService.atualizarUsuario(this.usuarioLogado.id, d).then(function() { self.usuarioLogado.nome = d.nome; self.usuarioLogado.celular = d.celular; self.usuarioLogado.habilidades = d.habilidades; self.mostrarToast('✅ Atualizado!', 'sucesso'); self.carregarMeuPerfil(); }); };
App.prototype.uploadFoto = function(e) { var self = this, f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { databaseService.atualizarUsuario(self.usuarioLogado.id, { fotoPerfil: ev.target.result }).then(function() { self.usuarioLogado.fotoPerfil = ev.target.result; self.mostrarToast('✅ Foto atualizada!', 'sucesso'); }); }; r.readAsDataURL(f); };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var self = this, c = document.getElementById('buscaResultados'); if (!c) return; c.innerHTML = '<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap) {
        var todos = []; snap.forEach(function(doc) { todos.push({ id: doc.id, data: doc.data() }); });
        var profs = todos.filter(function(u) { return u.data.tipo === 'profissional' && u.data.ativo !== false; });
        var termo = (document.getElementById('buscaInput') || {}).value || '';
        var filtrados = termo ? profs.filter(function(u) { return (u.data.nome || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0 || (u.data.profissao || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0; }) : profs;
        if (filtrados.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3></div>'; return; }
        var html = ''; filtrados.forEach(function(u) { var w = u.data.celular ? u.data.celular.replace(/\D/g, '') : '', sc = u.data.score || 0; var msg = self.usuarioLogado && self.usuarioLogado.tipo === 'empreiteiro' ? 'Olá ' + u.data.nome.split(' ')[0] + '! Me chamo ' + self.usuarioLogado.nome + ', sou empreiteiro. Vi seu perfil no LPXConstrutor e tenho interesse no seu trabalho como ' + (u.data.profissao || 'profissional') + '. Podemos conversar?' : 'Olá ' + u.data.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.'; html += '<div class="vaga-card" onclick="app.verPerfil(\'' + u.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.data.nome + '</div><div class="vaga-data">' + (u.data.profissao || 'Profissional') + ' • ' + (u.data.experiencia || 0) + ' anos</div></div><div>' + '⭐'.repeat(Math.round(sc)) + '</div></div><div class="vaga-footer">' + (w ? '<a href="https://wa.me/55' + w + '?text=' + encodeURIComponent(msg) + '" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>' : '') + '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.id + '\')">Chat</button><button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;">➕</button></div></div>'; });
        c.innerHTML = html;
    });
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var self = this;
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) { self.mostrarToast('Não encontrado', 'erro'); return; }
        var u = doc.data(), w = u.celular ? u.celular.replace(/\D/g, '') : '', c = document.getElementById('perfilPublicoConteudo'); if (!c) return;
        var html = '<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>' + u.nome + '</h2><p>' + (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos</p><div>' + '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações') + '</div></div><div class="card"><h3>Habilidades</h3><p>' + (u.habilidades || 'Não informado') + '</p></div><div class="card"><h3>Contato</h3><p>📱 ' + (u.celular || 'Não informado') + '</p><p>📧 ' + u.email + '</p></div>';
        if (self.usuarioLogado && self.usuarioLogado.id !== uid) {
            html += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if (w) { var msg = self.usuarioLogado.tipo === 'empreiteiro' ? 'Olá ' + u.nome.split(' ')[0] + '! Me chamo ' + self.usuarioLogado.nome + ', sou empreiteiro. Vi seu perfil no LPXConstrutor. Tenho interesse no seu trabalho como ' + (u.profissao || 'profissional') + '. Podemos conversar?' : 'Olá ' + u.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.'; html += '<a href="https://wa.me/55' + w + '?text=' + encodeURIComponent(msg) + '" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>'; }
            html += '<button class="btn btn-primary" onclick="app.iniciarChat(\'' + uid + '\')">💬 Conversar no Chat</button>';
            html += '<button class="btn btn-outline" onclick="app.adicionarNaRede(\'' + uid + '\')" style="background:#10B981;color:white;">➕ Adicionar na Rede</button>';
            if (self.usuarioLogado.tipo === 'empreiteiro') html += '<button class="btn btn-outline" onclick="app.abrirContratacao(\'' + uid + '\')" style="background:#1A3A5C;color:white;">🤝 CONTRATAR PARA OBRA</button>';
            html += '<button class="btn btn-outline" onclick="app.verAvaliacoes(\'' + uid + '\')">📊 Ver Avaliações</button>';
            html += '<button class="btn btn-outline" onclick="app.abrirDarAvaliacao(\'' + uid + '\')">⭐ Fazer Avaliação</button></div>';
        }
        c.innerHTML = html; self.mostrarTela('perfilPublicoScreen');
    });
};

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) { var self = this; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; self.usuarioSelecionado = { id: doc.id, data: doc.data() }; var h = document.getElementById('chatHeaderInfo'); if (h) h.innerHTML = '<div><strong>' + doc.data().nome + '</strong></div>'; self.carregarMensagens(); self.mostrarTela('chatScreen'); }); };
App.prototype.carregarMensagens = function() { var self = this, c = document.getElementById('chatMessages'); if (!c || !this.usuarioSelecionado) return; db.collection('mensagens').get().then(function(snap) { var msgs = []; snap.forEach(function(doc) { var d = doc.data(); if (d.participantes && d.participantes.indexOf(self.usuarioLogado.id) >= 0 && d.participantes.indexOf(self.usuarioSelecionado.id) >= 0) msgs.push({ data: d }); }); msgs.sort(function(a, b) { return (a.data.dataEnvio ? a.data.dataEnvio.toDate() : new Date(0)) - (b.data.dataEnvio ? b.data.dataEnvio.toDate() : new Date(0)); }); if (msgs.length === 0) { c.innerHTML = '<div style="text-align:center;padding:60px;">Nenhuma mensagem</div>'; return; } c.innerHTML = msgs.map(function(m) { var isMine = m.data.remetenteId === self.usuarioLogado.id; return '<div class="message ' + (isMine ? 'message-sent' : 'message-received') + '"><div class="message-content">' + m.data.conteudo + '</div></div>'; }).join(''); c.scrollTop = c.scrollHeight; }); };
App.prototype.enviarMensagem = function() { var self = this, i = document.getElementById('chatInput'), ct = i ? i.value.trim() : ''; if (!ct || !this.usuarioSelecionado) return; db.collection('mensagens').add({ remetenteId: this.usuarioLogado.id, destinatarioId: this.usuarioSelecionado.id, participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id], conteudo: ct, dataEnvio: firebase.firestore.FieldValue.serverTimestamp(), lida: false }).then(function() { i.value = ''; self.carregarMensagens(); }); };

// ===== PUBLICAÇÃO COM FOTO =====
App.prototype.abrirTelaPublicacao = function() { if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') { this.mostrarToast('Apenas empreiteiros!', 'erro'); return; } ['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; }); document.getElementById('vagaValorHora').value = ''; document.getElementById('vagaQuantidade').value = '1'; document.getElementById('vagaDuracao').value = ''; document.getElementById('vagaFotoPreview').src = 'imagem/logo-lpxconstrutor.png'; this.vagaFotoBase64 = null; document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb) { cb.checked = false; }); this.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(event) { var file = event.target.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function(e) { document.getElementById('vagaFotoPreview').src = e.target.result; }; reader.readAsDataURL(file); var self = this; var r = new FileReader(); r.onload = function(e) { self.vagaFotoBase64 = e.target.result; }; r.readAsDataURL(file); };
App.prototype.publicarVagaApp = function() { var self = this; var t = (document.getElementById('vagaTitulo') || {}).value || ''; var e = (document.getElementById('vagaEndereco') || {}).value || ''; var vh = (document.getElementById('vagaValorHora') || {}).value || '0'; var dur = (document.getElementById('vagaDuracao') || {}).value || ''; if (!t || !e) { this.mostrarToast('Preencha título e endereço!', 'erro'); return; } var ps = []; document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { ps.push(cb.value); }); if (ps.length === 0) { this.mostrarToast('Selecione pelo menos uma profissão!', 'erro'); return; } this.mostrarToast('Publicando...', 'info'); db.collection('vagas').add({ titulo: t, descricao: (document.getElementById('vagaDescricao') || {}).value || '', endereco: e, profissoes: ps.join(', '), valorHora: parseFloat(vh) || 0, quantidade: parseInt((document.getElementById('vagaQuantidade') || {}).value) || 1, duracao: dur, fotoObra: self.vagaFotoBase64 || '', usuarioId: this.usuarioLogado.id, interessados: [], dataCriacao: firebase.firestore.FieldValue.serverTimestamp(), ativa: true }).then(function() { self.mostrarToast('✅ Vaga publicada!', 'sucesso'); self.vagaFotoBase64 = null; document.getElementById('vagaFotoPreview').src = 'imagem/logo-lpxconstrutor.png'; setTimeout(function() { self.mostrarTela('homeScreen'); self.carregarFeed(); }, 1000); }).catch(function() { self.mostrarToast('Erro ao publicar', 'erro'); }); };
App.prototype.candidatarVaga = function(vid) { var self = this; if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'profissional') { this.mostrarToast('Apenas profissionais!', 'erro'); return; } db.collection('vagas').doc(vid).get().then(function(doc) { if (!doc.exists) return; var v = doc.data(); if (!v.interessados) v.interessados = []; if (v.interessados.indexOf(self.usuarioLogado.id) >= 0) { self.mostrarToast('Já se candidatou!', 'erro'); return; } v.interessados.push(self.usuarioLogado.id); db.collection('vagas').doc(vid).update({ interessados: v.interessados }).then(function() { self.mostrarToast('✅ Candidatura enviada!', 'sucesso'); }); }); };

// ===== CONTRATAÇÃO =====
App.prototype.abrirContratacao = function(profId) {
    var self = this;
    this.contratarProfId = profId;
    db.collection('usuarios').doc(profId).get().then(function(doc) {
        if (!doc.exists) return;
        var u = doc.data();
        document.getElementById('contratarInfo').innerHTML = '<div style="font-size:40px;">👷</div><h3>' + u.nome + '</h3><p style="color:#666;">' + (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos</p>';
    });
    db.collection('obras').where('usuarioId', '==', this.usuarioLogado.id).where('ativa', '==', true).get().then(function(snap) {
        var select = document.getElementById('contratarObra');
        select.innerHTML = '<option value="">Selecione uma obra...</option>';
        snap.forEach(function(doc) { var o = doc.data(); select.innerHTML += '<option value="' + doc.id + '">🏗️ ' + o.nome + ' - ' + o.endereco + '</option>'; });
    });
    this.mostrarTela('contratarScreen');
};

App.prototype.confirmarContratacao = function() {
    var self = this;
    var obraId = document.getElementById('contratarObra').value;
    var funcao = document.getElementById('contratarFuncao').value || '';
    var valor = document.getElementById('contratarValor').value || '0';
    var tipo = document.getElementById('contratarTipo').value;
    if (!obraId) { this.mostrarToast('Selecione uma obra!', 'erro'); return; }
    if (!funcao) { this.mostrarToast('Informe a função!', 'erro'); return; }
    if (!valor || parseFloat(valor) <= 0) { this.mostrarToast('Informe o valor!', 'erro'); return; }
    var status = document.getElementById('contratarStatus');
    if (status) { status.style.display = 'block'; status.style.background = '#E0F2FE'; status.innerHTML = '<p>⏳ Contratando...</p>'; }
    var btn = document.querySelector('#contratarScreen .btn-primary');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONTRATANDO...'; }
    db.collection('conexoes').add({ usuarioId: this.usuarioLogado.id, amigoId: this.contratarProfId, obraId: obraId, funcao: funcao, valorHora: parseFloat(valor), tipoContrato: tipo, status: 'contratado', dataContratacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() {
        if (typeof notificationsService !== 'undefined') { notificationsService.criarNotificacao({ usuarioId: self.contratarProfId, titulo: '🤝 Você foi contratado!', mensagem: 'Você foi contratado para: ' + funcao + ' - R$ ' + valor + '/h', tipo: 'contrato' }); }
        if (status) { status.style.background = '#D1FAE5'; status.innerHTML = '<div style="font-size:40px;">✅</div><p style="color:#065F46;">Contratado com sucesso!</p>'; }
        self.mostrarToast('✅ Profissional contratado!', 'sucesso');
        setTimeout(function() { history.back(); }, 1500);
    }).catch(function() { if (status) { status.style.background = '#FEE2E2'; status.innerHTML = '<p style="color:#991B1B;">Erro ao contratar</p>'; } if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-handshake"></i> CONTRATAR PROFISSIONAL'; } });
};

// ===== GESTÃO DE OBRAS =====
App.prototype.novaObra = function() {
    var nome = prompt('🏗️ Nome da obra:'); if (!nome) return;
    var endereco = prompt('📍 Endereço da obra:'); if (!endereco) return;
    var descricao = prompt('📝 Descrição (opcional):') || '';
    var self = this; this.mostrarToast('Criando obra...', 'info');
    db.collection('obras').add({ nome: nome, endereco: endereco, descricao: descricao, usuarioId: this.usuarioLogado.id, dataCriacao: firebase.firestore.FieldValue.serverTimestamp(), ativa: true }).then(function() { self.mostrarToast('✅ Obra criada!', 'sucesso'); self.carregarMinhasObras(); });
};

App.prototype.carregarMinhasObras = function() {
    var self = this;
    var container = document.getElementById('listaObrasContainer'); if (!container) return;
    container.innerHTML = '<div class="loading">Carregando obras...</div>';
    db.collection('obras').where('usuarioId', '==', this.usuarioLogado.id).where('ativa', '==', true).get().then(function(snap) {
        var obras = []; snap.forEach(function(doc) { obras.push({ id: doc.id, data: doc.data() }); });
        document.getElementById('totalObras').textContent = obras.length;
        if (obras.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-building" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma obra</h3><button class="btn btn-primary" onclick="app.novaObra()" style="margin-top:16px;">➕ Nova Obra</button></div>'; return; }
        var html = ''; var totalFunc = 0;
        var promessas = obras.map(function(obra) {
            return db.collection('conexoes').where('obraId', '==', obra.id).where('status', '==', 'contratado').get().then(function(snap2) { obra.funcionarios = snap2.size; totalFunc += snap2.size; return obra; });
        });
        Promise.all(promessas).then(function(obrasCompletas) {
            document.getElementById('totalFuncionarios').textContent = totalFunc;
            obrasCompletas.forEach(function(obra) {
                html += '<div class="card" style="cursor:pointer;border-left:4px solid #10B981;" onclick="app.verDetalheObra(\'' + obra.id + '\')"><div style="display:flex;justify-content:space-between;align-items:center;"><div><h3>🏗️ ' + obra.data.nome + '</h3><p style="color:#666;font-size:13px;">📍 ' + obra.data.endereco + '</p><p style="color:#666;font-size:12px;">👷 ' + obra.funcionarios + ' funcionários</p></div><i class="fas fa-chevron-right" style="color:#999;"></i></div></div>';
            });
            container.innerHTML = html;
        });
    });
};

App.prototype.verDetalheObra = function(obraId) {
    var self = this; this.obraSelecionada = obraId;
    var container = document.getElementById('detalheObraConteudo'); if (!container) return;
    container.innerHTML = '<div class="loading">Carregando...</div>';
    db.collection('obras').doc(obraId).get().then(function(doc) {
        if (!doc.exists) return; var obra = doc.data();
        var html = '<div class="card" style="background:linear-gradient(135deg,#1A3A5C,#2C5F8A);color:white;"><h2>🏗️ ' + obra.nome + '</h2><p>📍 ' + obra.endereco + '</p><p style="font-size:13px;opacity:0.9;">' + (obra.descricao || '') + '</p></div>';
        db.collection('conexoes').where('obraId', '==', obraId).get().then(function(snap) {
            if (snap.empty) { html += '<div class="card" style="text-align:center;"><p>Nenhum funcionário</p></div>'; container.innerHTML = html + '<button class="btn btn-outline" onclick="app.mostrarTela(\'minhasObrasScreen\')" style="margin-top:16px;">← Voltar</button>'; return; }
            html += '<h3 style="margin:16px 0;">👷 Funcionários</h3>';
            var promessas = []; snap.forEach(function(doc) { var c = doc.data(); c.id = doc.id; promessas.push(db.collection('usuarios').doc(c.amigoId).get().then(function(userDoc) { if (userDoc.exists) { var u = userDoc.data(); var sc = c.status === 'contratado' ? 'status-ativo' : c.status === 'finalizado' ? 'status-finalizado' : 'status-demitido'; var st = c.status === 'contratado' ? '🟢 Ativo' : c.status === 'finalizado' ? '✅ Finalizado' : '🔴 Demitido'; return '<div class="card" style="border-left:4px solid ' + (c.status === 'contratado' ? '#10B981' : c.status === 'finalizado' ? '#6B7280' : '#EF4444') + ';"><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div style="flex:1;"><strong>' + u.nome + '</strong><div style="font-size:12px;color:#666;">' + (c.funcao || u.profissao) + ' • R$ ' + (c.valorHora || '0') + '/h</div><span class="' + sc + '">' + st + '</span></div></div><div style="display:flex;gap:8px;">' + (c.status === 'contratado' ? '<button class="btn btn-danger btn-small" onclick="event.stopPropagation();app.demitirFuncionario(\'' + c.id + '\')" style="flex:1;">🔴 Demitir</button><button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.finalizarContrato(\'' + c.id + '\')" style="flex:1;">✅ Finalizar</button>' : '') + '<button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.uid + '\')" style="flex:1;">💬 Chat</button><a href="https://wa.me/55' + (u.celular || '').replace(/\D/g, '') + '" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i></a></div></div>'; } return ''; })); });
            Promise.all(promessas).then(function(results) { html += results.join(''); container.innerHTML = html + '<button class="btn btn-outline" onclick="app.mostrarTela(\'minhasObrasScreen\')" style="margin-top:16px;">← Voltar</button>'; });
        });
    });
    this.mostrarTela('detalheObraScreen');
};

App.prototype.demitirFuncionario = function(conexaoId) { if (!confirm('Tem certeza que deseja demitir? O registro permanecerá no histórico.')) return; var self = this; db.collection('conexoes').doc(conexaoId).update({ status: 'demitido' }).then(function() { self.mostrarToast('Funcionário demitido. Registro mantido.', 'sucesso'); self.verDetalheObra(self.obraSelecionada); }); };
App.prototype.finalizarContrato = function(conexaoId) { if (!confirm('Finalizar contrato?')) return; var self = this; db.collection('conexoes').doc(conexaoId).update({ status: 'finalizado' }).then(function() { self.mostrarToast('Contrato finalizado!', 'sucesso'); self.verDetalheObra(self.obraSelecionada); }); };

// ===== AVALIAÇÕES =====
App.prototype.verAvaliacoes = function(uid) { var self = this; this.avaliacoesUid = uid; this.avaliacaoFiltro = 'todas'; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); document.getElementById('avaliacaoScoreGeral').textContent = (u.score || 0).toFixed(1); document.getElementById('avaliacaoEstrelas').innerHTML = '⭐'.repeat(Math.round(u.score || 0)); document.getElementById('avaliacaoTotal').textContent = (u.avaliacoesRecebidas || 0) + ' avaliações'; self.carregarHistoricoTrabalhos(uid); self.filtrarAvaliacoes('todas'); self.mostrarTela('avaliacoesScreen'); }); };
App.prototype.carregarHistoricoTrabalhos = function(uid) { var self = this; var c = document.getElementById('historicoTrabalhos'); if (!c) return; db.collection('conexoes').get().then(function(snap) { var trabalhos = []; snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === uid || d.amigoId === uid) && (d.status === 'contratado' || d.status === 'finalizado' || d.status === 'demitido')) trabalhos.push({ id: doc.id, data: d }); }); if (trabalhos.length === 0) { c.innerHTML = '<p style="color:#999;text-align:center;">Nenhum trabalho registrado</p>'; return; } var html = ''; trabalhos.forEach(function(t) { var sc = t.data.status === 'contratado' ? 'status-ativo' : t.data.status === 'finalizado' ? 'status-finalizado' : 'status-demitido'; var st = t.data.status === 'contratado' ? '🟢 Em andamento' : t.data.status === 'finalizado' ? '✅ Finalizado' : '🔴 Encerrado'; html += '<div class="trabalho-card"><strong>' + (t.data.obra || 'Obra') + '</strong><br><span style="font-size:12px;">💰 R$ ' + (t.data.valorHora || '0') + '/h</span><br><span class="' + sc + '">' + st + '</span></div>'; }); c.innerHTML = html; }); };
App.prototype.filtrarAvaliacoes = function(filtro, btn) { this.avaliacaoFiltro = filtro; if (btn) { document.querySelectorAll('#avaliacoesScreen .tab').forEach(function(t) { t.classList.remove('active'); }); btn.classList.add('active'); } var self = this; var c = document.getElementById('avaliacoesLista'); if (!c) return; c.innerHTML = '<div class="loading">Carregando...</div>'; db.collection('avaliacoes').get().then(function(snap) { var avs = []; snap.forEach(function(doc) { var d = doc.data(); if (d.avaliadoId === self.avaliacoesUid) avs.push({ id: doc.id, data: d }); }); if (filtro === 'positivas') avs = avs.filter(function(a) { return a.data.nota >= 4; }); if (filtro === 'melhorar') avs = avs.filter(function(a) { return a.data.nota <= 3; }); if (avs.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-star" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma avaliação</h3></div>'; return; } var html = ''; var proms = []; avs.forEach(function(a) { proms.push(db.collection('usuarios').doc(a.data.avaliadorId).get()); }); Promise.all(proms).then(function(docs) { avs.forEach(function(a, i) { var av = docs[i].exists ? docs[i].data() : { nome: 'Usuário' }; var cl = a.data.nota >= 4 ? 'positiva' : 'melhorar'; html += '<div class="avaliacao-card ' + cl + '"><div class="avaliacao-header"><div class="avaliacao-avatar"><i class="fas fa-user"></i></div><div><strong>' + av.nome + '</strong><div class="avaliacao-estrelas">' + '⭐'.repeat(a.data.nota) + ' ' + a.data.nota + '/5</div></div></div><div class="avaliacao-texto"><strong>👍 Positivo:</strong> ' + (a.data.positivos || 'Não informado') + '</div><div class="avaliacao-texto"><strong>📝 A melhorar:</strong> ' + (a.data.melhorar || 'Não informado') + '</div><div style="margin-top:8px;"><span class="avaliacao-servico">🛠️ ' + (a.data.servico || 'Serviço') + '</span><span class="avaliacao-servico">⏱️ ' + (a.data.periodo || 'Período') + '</span>' + (a.data.recomenda ? '<span class="avaliacao-servico" style="background:#D1FAE5;color:#065F46;">👍 Recomenda</span>' : '') + '</div></div>'; }); c.innerHTML = html; }); }); };
App.prototype.abrirDarAvaliacao = function(uid) { var self = this; this.avaliarUid = uid; this.avaliarNota = 0; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); document.getElementById('avaliarNome').textContent = u.nome; document.getElementById('avaliarProfissao').textContent = (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos'; document.querySelectorAll('#estrelasAvaliar i').forEach(function(s) { s.className = 'far fa-star'; }); document.getElementById('avalPositivos').value = ''; document.getElementById('avalMelhorar').value = ''; document.getElementById('avalServico').value = ''; document.getElementById('avalPeriodo').value = ''; self.mostrarTela('darAvaliacaoScreen'); }); };
App.prototype.setNota = function(nota) { this.avaliarNota = nota; document.querySelectorAll('#estrelasAvaliar i').forEach(function(s, i) { s.className = i < nota ? 'fas fa-star' : 'far fa-star'; }); };
App.prototype.enviarAvaliacao = function() { var self = this; if (!this.avaliarNota) { this.mostrarToast('Selecione uma nota!', 'erro'); return; } var d = { avaliadorId: this.usuarioLogado.id, avaliadoId: this.avaliarUid, nota: this.avaliarNota, positivos: document.getElementById('avalPositivos').value || '', melhorar: document.getElementById('avalMelhorar').value || '', servico: document.getElementById('avalServico').value || '', periodo: document.getElementById('avalPeriodo').value || '', recomenda: this.avaliarNota >= 4, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }; this.mostrarToast('Enviando...', 'info'); databaseService.avaliarUsuarioCompleto(d).then(function() { self.mostrarToast('✅ Avaliação enviada!', 'sucesso'); setTimeout(function() { history.back(); }, 1500); }).catch(function() { self.mostrarToast('Erro ao enviar', 'erro'); }); };

// ===== TABS =====
App.prototype.mudarTab = function(tab) { document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); }); event.target.closest('.tab').classList.add('active'); document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none'; document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none'; if (tab === 'feed') this.carregarFeed(); if (tab === 'rede') this.carregarRede(); };
App.prototype.mostrarNotificacoes = function() { this.mostrarTela('notificacoesScreen'); };

App.prototype.mostrarToast = function(m, t) { var toast = document.getElementById('toast'); if (!toast) return; toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937'; toast.style.display = 'block'; clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000); };

document.addEventListener('DOMContentLoaded', function() { window.app = new App(); console.log('✅ App pronto!'); });
