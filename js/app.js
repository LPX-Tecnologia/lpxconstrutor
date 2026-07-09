// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id); if(t) t.classList.add('active');
    },
    cadastrar: function(){}, proximaEtapa: function(){}, toggleProfissao: function(){},
    recuperarSenha: function(){}, enviarRecuperacao: function(){}, sair: function(){},
    buscarProfissionais: function(){}, verPerfil: function(){}, iniciarChat: function(){},
    enviarMensagem: function(){}, salvarPerfil: function(){}, uploadFoto: function(){},
    abrirTelaPublicacao: function(){}, publicarVagaApp: function(){}, candidatarVaga: function(){},
    contratarProfissional: function(){}, adicionarNaRede: function(){}, removerDaRede: function(){},
    avaliarUsuario: function(){}, mostrarNotificacoes: function(){}, mudarTab: function(){}
};

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.notificacoes = [];
    this.init();
};

App.prototype.init = function() {
    var self = this;
    console.log('🚀 Iniciando LPXConstrutor...');
    
    authService.onAuthStateChange(function(usuario) {
        if (usuario) {
            self.usuarioLogado = usuario;
            self.atualizarBotaoPublicar();
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

App.prototype.mostrarTela = function(id) {
    var self = this;
    
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    
    var tela = document.getElementById(id);
    if (!tela) return;
    
    tela.classList.add('active');
    self.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
        
        nav.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === id) item.classList.add('active');
        });
    }
    
    if (id === 'homeScreen') setTimeout(function() { self.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { self.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { self.buscarProfissionais(); }, 100);
    if (id === 'recuperarSenhaScreen') self.abrirRecuperarSenha();
    if (id === 'chatScreen') setTimeout(function() {
        var input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 300);
};

App.prototype.fazerLogin = function() {
    var self = this;
    var email = (document.getElementById('loginEmail') || {}).value || '';
    var senha = (document.getElementById('loginSenha') || {}).value || '';
    
    if (!email || !senha) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    
    self.mostrarToast('Entrando...', 'info');
    
    authService.login(email, senha).then(function(r) {
        if (r.sucesso) {
            self.usuarioLogado = r.usuario;
            self.mostrarToast('✅ Bem-vindo, ' + r.usuario.nome + '!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast('❌ ' + r.erro, 'erro');
        }
    }).catch(function(e) {
        self.mostrarToast('❌ Erro ao fazer login', 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = {
        nome: (document.getElementById('cadNome') || {}).value || '',
        email: (document.getElementById('cadEmail') || {}).value || '',
        senha: (document.getElementById('cadSenha') || {}).value || '',
        tipo: (document.getElementById('cadTipo') || {}).value || 'profissional',
        celular: (document.getElementById('cadCelular') || {}).value || '',
        cpf: ((document.getElementById('cadCPF') || {}).value || '').replace(/\D/g, ''),
        profissao: (document.getElementById('cadProfissao') || {}).value || '',
        experiencia: (document.getElementById('cadExperiencia') || {}).value || '0',
        habilidades: (document.getElementById('cadHabilidades') || {}).value || ''
    };
    
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    if (d.tipo === 'profissional' && !d.profissao) { self.mostrarToast('❌ Selecione sua profissão!', 'erro'); return; }
    
    self.mostrarToast('Cadastrando...', 'info');
    
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) {
            self.usuarioLogado = r.usuario;
            self.mostrarToast('✅ Cadastro realizado!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast('❌ ' + r.erro, 'erro');
        }
    }).catch(function(e) {
        self.mostrarToast('❌ Erro ao cadastrar', 'erro');
    });
};

App.prototype.proximaEtapa = function(e) {
    var e1 = document.getElementById('etapa1'), e2 = document.getElementById('etapa2');
    if (!e1 || !e2) return;
    
    if (e === 1) { e1.style.display = 'block'; e2.style.display = 'none'; }
    else {
        var nome = (document.getElementById('cadNome') || {}).value || '';
        var email = (document.getElementById('cadEmail') || {}).value || '';
        var senha = (document.getElementById('cadSenha') || {}).value || '';
        
        if (!nome || nome.length < 3) { this.mostrarToast('❌ Nome deve ter pelo menos 3 caracteres', 'erro'); return; }
        if (!email || !email.includes('@')) { this.mostrarToast('❌ Email inválido', 'erro'); return; }
        if (!senha || senha.length < 6) { this.mostrarToast('❌ Senha mínima de 6 caracteres', 'erro'); return; }
        
        e1.style.display = 'none'; e2.style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

App.prototype.toggleProfissao = function() {
    var g = document.getElementById('grupoProfissao');
    var t = (document.getElementById('cadTipo') || {}).value;
    if (g) g.style.display = t === 'profissional' ? 'block' : 'none';
};

// ===== RECUPERAR SENHA (CORRIGIDO) =====
App.prototype.abrirRecuperarSenha = function() {
    var emailEl = document.getElementById('recEmail');
    if (emailEl) emailEl.value = '';
    var statusEl = document.getElementById('recuperacaoStatus');
    if (statusEl) statusEl.style.display = 'none';
    this.mostrarTela('recuperarSenhaScreen');
    setTimeout(function() { if (emailEl) emailEl.focus(); }, 500);
};

App.prototype.recuperarSenha = function() {
    this.abrirRecuperarSenha();
};

App.prototype.enviarRecuperacao = function() {
    var self = this;
    var email = document.getElementById('recEmail') ? document.getElementById('recEmail').value.trim() : '';
    var statusEl = document.getElementById('recuperacaoStatus');
    var iconEl = document.getElementById('recuperacaoIcon');
    var msgEl = document.getElementById('recuperacaoMensagem');
    var subEl = document.getElementById('recuperacaoSubtexto');
    
    if (!email) { self.mostrarToast('❌ Digite seu email!', 'erro'); return; }
    if (!email.includes('@') || !email.includes('.')) { self.mostrarToast('❌ Email inválido!', 'erro'); return; }
    
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.background = '#E0F2FE';
        statusEl.style.border = '2px solid #7DD3FC';
    }
    if (iconEl) iconEl.textContent = '⏳';
    if (msgEl) msgEl.textContent = 'Enviando email...';
    if (subEl) subEl.textContent = 'Aguarde um momento';
    
    var btn = document.querySelector('#recuperarSenhaScreen .btn-primary');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
    }
    
    authService.recuperarSenha(email).then(function(r) {
        if (statusEl) statusEl.style.display = 'block';
        
        if (r.sucesso) {
            if (statusEl) { statusEl.style.background = '#D1FAE5'; statusEl.style.border = '2px solid #6EE7B7'; }
            if (iconEl) iconEl.textContent = '✅';
            if (msgEl) { msgEl.textContent = 'Email enviado com sucesso!'; msgEl.style.color = '#065F46'; }
            if (subEl) {
                subEl.innerHTML = '📧 Enviamos para: <strong>' + email + '</strong><br>📋 Verifique sua caixa de entrada<br>📁 Se não encontrar, olhe a pasta SPAM';
                subEl.style.color = '#065F46';
            }
            self.mostrarToast('✅ Email enviado! Verifique também o SPAM', 'sucesso');
            
            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.innerHTML = '<i class="fas fa-check"></i> EMAIL ENVIADO!';
            }
        } else {
            if (statusEl) { statusEl.style.background = '#FEE2E2'; statusEl.style.border = '2px solid #FCA5A5'; }
            if (iconEl) iconEl.textContent = '❌';
            if (msgEl) { msgEl.textContent = r.erro || 'Erro ao enviar email'; msgEl.style.color = '#991B1B'; }
            if (subEl) {
                subEl.innerHTML = '🔍 Verifique se o email está correto<br>📝 ' + email + '<br>🔄 Tente novamente em alguns minutos';
                subEl.style.color = '#991B1B';
            }
            self.mostrarToast('❌ ' + (r.erro || 'Email não encontrado'), 'erro');
            
            if (btn) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> TENTAR NOVAMENTE';
            }
        }
    }).catch(function(error) {
        if (statusEl) { statusEl.style.display = 'block'; statusEl.style.background = '#FEE2E2'; statusEl.style.border = '2px solid #FCA5A5'; }
        if (iconEl) iconEl.textContent = '❌';
        if (msgEl) { msgEl.textContent = 'Erro de conexão'; msgEl.style.color = '#991B1B'; }
        if (subEl) { subEl.textContent = 'Verifique sua internet e tente novamente.'; subEl.style.color = '#991B1B'; }
        
        if (btn) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> TENTAR NOVAMENTE';
        }
    });
};

App.prototype.sair = function() {
    var self = this;
    authService.logout().then(function() {
        self.usuarioLogado = null;
        self.mostrarTela('loginScreen');
        self.mostrarToast('👋 Até logo!', 'sucesso');
    });
};

App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    
    var h = new Date().getHours(), s = 'Bom dia';
    if (h >= 12 && h < 18) s = 'Boa tarde';
    if (h >= 18) s = 'Boa noite';
    
    var saudacaoEl = document.getElementById('saudacao');
    if (saudacaoEl) saudacaoEl.textContent = '👋 ' + s + ', ' + this.usuarioLogado.nome + '!';
    
    var resumoEl = document.getElementById('resumoTexto');
    if (resumoEl) resumoEl.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    
    var self = this;
    setTimeout(function() { try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} }, 500);
    
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self = this, c = document.getElementById('feedContainer');
    if (!c) return;
    
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando vagas...</div>';
    
    var timeout = setTimeout(function() {
        c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Tempo esgotado</h3><button class="btn btn-outline btn-small" onclick="app.carregarFeed()">Tentar novamente</button></div>';
    }, 10000);
    
    db.collection('vagas').get().then(function(snap) {
        clearTimeout(timeout);
        var vagas = [];
        snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        
        if (vagas.length === 0) {
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma vaga</h3>' + (self.usuarioLogado && self.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="app.abrirTelaPublicacao()">PUBLICAR VAGA</button>' : '') + '</div>';
            return;
        }
        
        var html = '';
        vagas.forEach(function(v) {
            html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ ' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-descricao">' + (v.data.descricao || '') + '</div><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div></div><div class="vaga-footer">' + (self.usuarioLogado && self.usuarioLogado.tipo === 'profissional' ? '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.candidatarVaga(\'' + v.id + '\')" style="flex:1;">✋ QUERO!</button>' : '') + '</div></div>';
        });
        c.innerHTML = html;
    }).catch(function(error) {
        clearTimeout(timeout);
        c.innerHTML = '<div class="card" style="text-align:center;"><p>Erro ao carregar</p><button class="btn btn-outline btn-small" onclick="app.carregarFeed()">Tentar novamente</button></div>';
    });
};

App.prototype.carregarRede = function() {
    var self = this, c = document.getElementById('redeContainer');
    if (!c) return;
    c.innerHTML = '<div class="loading">Carregando rede...</div>';
    
    db.collection('conexoes').get().then(function(snap) {
        var conexoes = [];
        snap.forEach(function(doc) { var d = doc.data(); if (d.usuarioId === self.usuarioLogado.id || d.amigoId === self.usuarioLogado.id) conexoes.push({ id: doc.id, data: d }); });
        
        if (conexoes.length === 0) {
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-users" style="font-size:60px;color:#ccc;"></i><h3>Rede vazia</h3><button class="btn btn-primary" onclick="app.mostrarTela(\'buscaScreen\')">Buscar Profissionais</button></div>';
            return;
        }
        
        var promessas = [];
        conexoes.forEach(function(con) { var amigoId = con.data.usuarioId === self.usuarioLogado.id ? con.data.amigoId : con.data.usuarioId; promessas.push(db.collection('usuarios').doc(amigoId).get()); });
        
        Promise.all(promessas).then(function(docs) {
            var html = '';
            docs.forEach(function(doc) {
                if (doc.exists) {
                    var u = doc.data(), w = u.celular ? u.celular.replace(/\D/g, '') : '';
                    html += '<div class="vaga-card" onclick="app.verPerfil(\'' + doc.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.nome + '</div><div class="vaga-data">' + (u.profissao || 'Profissional') + '</div></div></div><div class="vaga-footer">' + (w ? '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>' : '') + '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + doc.id + '\')">Chat</button><button class="btn btn-danger btn-small" onclick="event.stopPropagation();app.removerDaRede(\'' + doc.id + '\')">✕</button></div></div>';
                }
            });
            c.innerHTML = html || '<div class="card">Nenhum amigo</div>';
        });
    });
};

App.prototype.adicionarNaRede = function(amigoId) {
    var self = this;
    if (!this.usuarioLogado) { this.mostrarToast('Faça login!', 'erro'); return; }
    if (this.usuarioLogado.id === amigoId) { this.mostrarToast('Não pode se adicionar!', 'erro'); return; }
    
    db.collection('conexoes').get().then(function(snap) {
        var existe = false;
        snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) existe = true; });
        if (existe) { self.mostrarToast('Já está na rede!', 'erro'); return; }
        
        db.collection('conexoes').add({ usuarioId: self.usuarioLogado.id, amigoId: amigoId, status: 'ativo', dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.mostrarToast('✅ Adicionado!', 'sucesso'); });
    });
};

App.prototype.removerDaRede = function(amigoId) {
    var self = this;
    if (!confirm('Remover da rede?')) return;
    db.collection('conexoes').get().then(function(snap) {
        snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) { db.collection('conexoes').doc(doc.id).delete().then(function() { self.mostrarToast('Removido', 'sucesso'); self.carregarRede(); }); } });
    });
};

App.prototype.contratarProfissional = function(profId) {
    var self = this;
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') { this.mostrarToast('Apenas empreiteiros!', 'erro'); return; }
    var obra = prompt('Nome da obra:'); if (!obra) return;
    var valor = prompt('Valor/hora (R$):', '25'); if (!valor) return;
    db.collection('conexoes').add({ usuarioId: this.usuarioLogado.id, amigoId: profId, status: 'contratado', obra: obra, valorHora: parseFloat(valor), dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.mostrarToast('🤝 Contratado!', 'sucesso'); self.adicionarNaRede(profId); });
};

App.prototype.carregarMeuPerfil = function() {
    if (!this.usuarioLogado) return; var u = this.usuarioLogado;
    var n = document.getElementById('meuPerfilNome'); if (n) n.textContent = u.nome || 'Usuário';
    var p = document.getElementById('meuPerfilProfissao'); if (p) p.textContent = (u.tipo === 'profissional' ? '👷' : '🏢') + ' ' + (u.profissao || u.tipo);
    var a = document.getElementById('meuPerfilAvaliacao'); if (a) a.innerHTML = '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações');
    var en = document.getElementById('editNome'); if (en) en.value = u.nome || '';
    var ec = document.getElementById('editCelular'); if (ec) ec.value = u.celular || '';
    var eh = document.getElementById('editHabilidades'); if (eh) eh.value = u.habilidades || '';
    var sa = document.getElementById('statsAvaliacoes'); if (sa) sa.textContent = u.avaliacoesRecebidas || 0;
};

App.prototype.salvarPerfil = function() {
    var self = this;
    var d = { nome: (document.getElementById('editNome') || {}).value || '', celular: (document.getElementById('editCelular') || {}).value || '', habilidades: (document.getElementById('editHabilidades') || {}).value || '' };
    if (!d.nome) { this.mostrarToast('Nome obrigatório!', 'erro'); return; }
    databaseService.atualizarUsuario(this.usuarioLogado.id, d).then(function() { self.usuarioLogado.nome = d.nome; self.usuarioLogado.celular = d.celular; self.usuarioLogado.habilidades = d.habilidades; self.mostrarToast('✅ Atualizado!', 'sucesso'); self.carregarMeuPerfil(); });
};

App.prototype.uploadFoto = function(e) {
    var self = this, f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(ev) { databaseService.atualizarUsuario(self.usuarioLogado.id, { fotoPerfil: ev.target.result }).then(function() { self.usuarioLogado.fotoPerfil = ev.target.result; self.mostrarToast('✅ Foto atualizada!', 'sucesso'); }); };
    r.readAsDataURL(f);
};

App.prototype.buscarProfissionais = function() {
    var self = this, c = document.getElementById('buscaResultados'); if (!c) return;
    c.innerHTML = '<div class="loading">Buscando...</div>';
    
    db.collection('usuarios').get().then(function(snap) {
        var todos = []; snap.forEach(function(doc) { todos.push({ id: doc.id, data: doc.data() }); });
        var profs = todos.filter(function(u) { return u.data.tipo === 'profissional' && u.data.ativo !== false; });
        var termo = (document.getElementById('buscaInput') || {}).value || '';
        var filtrados = termo ? profs.filter(function(u) { return (u.data.nome || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0 || (u.data.profissao || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0; }) : profs;
        
        if (filtrados.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3></div>'; return; }
        
        var html = '';
        filtrados.forEach(function(u) {
            var w = u.data.celular ? u.data.celular.replace(/\D/g, '') : '', sc = u.data.score || 0;
            html += '<div class="vaga-card" onclick="app.verPerfil(\'' + u.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.data.nome + '</div><div class="vaga-data">' + (u.data.profissao || 'Profissional') + ' • ' + (u.data.experiencia || 0) + ' anos</div></div><div>' + '⭐'.repeat(Math.round(sc)) + '</div></div><div class="vaga-footer">' + (w ? '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>' : '') + '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.id + '\')">Chat</button><button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;">➕</button></div></div>';
        });
        c.innerHTML = html;
    });
};

App.prototype.verPerfil = function(uid) {
    var self = this;
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) { self.mostrarToast('Não encontrado', 'erro'); return; }
        var u = doc.data(), w = u.celular ? u.celular.replace(/\D/g, '') : '', c = document.getElementById('perfilPublicoConteudo');
        if (!c) return;
        
        var html = '<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>' + u.nome + '</h2><p>' + (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos</p><div>' + '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações') + '</div></div><div class="card"><h3>Habilidades</h3><p>' + (u.habilidades || 'Não informado') + '</p></div><div class="card"><h3>Contato</h3><p>📱 ' + (u.celular || 'Não informado') + '</p><p>📧 ' + u.email + '</p></div>';
        
        if (self.usuarioLogado && self.usuarioLogado.id !== uid) {
            html += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if (w) html += '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success">WhatsApp</a>';
            html += '<button class="btn btn-primary" onclick="app.iniciarChat(\'' + uid + '\')">Chat</button>';
            html += '<button class="btn btn-outline" onclick="app.adicionarNaRede(\'' + uid + '\')" style="background:#10B981;color:white;">Adicionar na Rede</button>';
            if (self.usuarioLogado.tipo === 'empreiteiro') html += '<button class="btn btn-outline" onclick="app.contratarProfissional(\'' + uid + '\')" style="background:#1A3A5C;color:white;">CONTRATAR</button>';
            html += '<button class="btn btn-outline" onclick="app.avaliarUsuario(\'' + uid + '\')">Avaliar</button></div>';
        }
        c.innerHTML = html; self.mostrarTela('perfilPublicoScreen');
    });
};

App.prototype.iniciarChat = function(uid) {
    var self = this;
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) return;
        self.usuarioSelecionado = { id: doc.id, data: doc.data() };
        var h = document.getElementById('chatHeaderInfo');
        if (h) h.innerHTML = '<div><strong>' + doc.data().nome + '</strong></div>';
        self.carregarMensagens(); self.mostrarTela('chatScreen');
    });
};

App.prototype.carregarMensagens = function() {
    var self = this, c = document.getElementById('chatMessages');
    if (!c || !this.usuarioSelecionado) return;
    db.collection('mensagens').get().then(function(snap) {
        var msgs = [];
        snap.forEach(function(doc) { var d = doc.data(); if (d.participantes && d.participantes.indexOf(self.usuarioLogado.id) >= 0 && d.participantes.indexOf(self.usuarioSelecionado.id) >= 0) msgs.push({ data: d }); });
        msgs.sort(function(a, b) { return (a.data.dataEnvio ? a.data.dataEnvio.toDate() : new Date(0)) - (b.data.dataEnvio ? b.data.dataEnvio.toDate() : new Date(0)); });
        if (msgs.length === 0) { c.innerHTML = '<div style="text-align:center;padding:60px;">Nenhuma mensagem</div>'; return; }
        c.innerHTML = msgs.map(function(m) { var isMine = m.data.remetenteId === self.usuarioLogado.id; return '<div class="message ' + (isMine ? 'message-sent' : 'message-received') + '"><div class="message-content">' + m.data.conteudo + '</div></div>'; }).join('');
        c.scrollTop = c.scrollHeight;
    });
};

App.prototype.enviarMensagem = function() {
    var self = this, i = document.getElementById('chatInput'), ct = i ? i.value.trim() : '';
    if (!ct || !this.usuarioSelecionado) return;
    db.collection('mensagens').add({ remetenteId: this.usuarioLogado.id, destinatarioId: this.usuarioSelecionado.id, participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id], conteudo: ct, dataEnvio: firebase.firestore.FieldValue.serverTimestamp(), lida: false }).then(function() { i.value = ''; self.carregarMensagens(); });
};

App.prototype.abrirTelaPublicacao = function() {
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') { this.mostrarToast('Apenas empreiteiros!', 'erro'); return; }
    ['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('vagaValorHora').value = ''; document.getElementById('vagaQuantidade').value = '1';
    document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb) { cb.checked = false; });
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVagaApp = function() {
    var self = this, t = (document.getElementById('vagaTitulo') || {}).value || '', e = (document.getElementById('vagaEndereco') || {}).value || '';
    if (!t || !e) { this.mostrarToast('Preencha título e endereço!', 'erro'); return; }
    var ps = []; document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { ps.push(cb.value); });
    this.mostrarToast('Publicando...', 'info');
    db.collection('vagas').add({ titulo: t, descricao: (document.getElementById('vagaDescricao') || {}).value || '', endereco: e, profissoes: ps.join(', ') || 'Geral', valorHora: parseFloat((document.getElementById('vagaValorHora') || {}).value) || 0, quantidade: parseInt((document.getElementById('vagaQuantidade') || {}).value) || 1, usuarioId: this.usuarioLogado.id, interessados: [], dataCriacao: firebase.firestore.FieldValue.serverTimestamp(), ativa: true }).then(function() { self.mostrarToast('✅ Vaga publicada!', 'sucesso'); setTimeout(function() { self.mostrarTela('homeScreen'); self.carregarFeed(); }, 1000); });
};

App.prototype.candidatarVaga = function(vid) {
    var self = this;
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'profissional') { this.mostrarToast('Apenas profissionais!', 'erro'); return; }
    db.collection('vagas').doc(vid).get().then(function(doc) { if (!doc.exists) return; var v = doc.data(); if (!v.interessados) v.interessados = []; if (v.interessados.indexOf(self.usuarioLogado.id) >= 0) { self.mostrarToast('Já se candidatou!', 'erro'); return; } v.interessados.push(self.usuarioLogado.id); db.collection('vagas').doc(vid).update({ interessados: v.interessados }).then(function() { self.mostrarToast('✅ Candidatura enviada!', 'sucesso'); }); });
};

App.prototype.avaliarUsuario = function(uid) {
    var n = prompt('Nota (1-5):'); if (!n || isNaN(n) || n < 1 || n > 5) return;
    var c = prompt('Comentário:') || ''; var self = this;
    databaseService.avaliarUsuario(this.usuarioLogado.id, uid, parseInt(n), c).then(function() { self.mostrarToast('✅ Avaliação enviada!', 'sucesso'); });
};

App.prototype.mudarTab = function(tab) {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    event.target.closest('.tab').classList.add('active');
    document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'feed') this.carregarFeed();
    if (tab === 'rede') this.carregarRede();
};

App.prototype.mostrarNotificacoes = function() { this.mostrarTela('notificacoesScreen'); };

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast'); if (!toast) return;
    toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block'; clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

document.addEventListener('DOMContentLoaded', function() { window.app = new App(); console.log('✅ App pronto!'); });
