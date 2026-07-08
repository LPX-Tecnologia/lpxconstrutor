// ==========================================================
// ===== APLICAÇÃO PRINCIPAL =====
// ==========================================================

// Cria um placeholder para evitar erros de "app is not defined"
window.app = {
    fazerLogin: function() { console.log('⏳ Carregando...'); },
    mostrarTela: function(id) { 
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        var tela = document.getElementById(id);
        if(tela) tela.classList.add('active');
    },
    cadastrar: function() { console.log('⏳ Carregando...'); },
    proximaEtapa: function() { console.log('⏳ Carregando...'); },
    toggleProfissao: function() { console.log('⏳ Carregando...'); },
    recuperarSenha: function() { console.log('⏳ Carregando...'); },
    mudarTab: function() { console.log('⏳ Carregando...'); },
    buscarProfissionais: function() { console.log('⏳ Carregando...'); },
    verPerfil: function() { console.log('⏳ Carregando...'); },
    iniciarChat: function() { console.log('⏳ Carregando...'); },
    enviarMensagem: function() { console.log('⏳ Carregando...'); },
    salvarPerfil: function() { console.log('⏳ Carregando...'); },
    uploadFoto: function() { console.log('⏳ Carregando...'); },
    abrirTelaPublicacao: function() { console.log('⏳ Carregando...'); },
    publicarVagaApp: function() { console.log('⏳ Carregando...'); },
    candidatarVaga: function() { console.log('⏳ Carregando...'); },
    avaliarUsuario: function() { console.log('⏳ Carregando...'); },
    mostrarNotificacoes: function() { console.log('⏳ Carregando...'); },
    sair: function() { console.log('⏳ Carregando...'); }
};

// Classe principal
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
        if(usuario) {
            self.usuarioLogado = usuario;
            self.atualizarBotaoPublicar();
            if(self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') {
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
    if(!btn) return;
    
    if(this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') {
        btn.style.display = 'flex';
        btn.onclick = this.abrirTelaPublicacao.bind(this);
    } else {
        btn.style.display = 'none';
    }
};

App.prototype.mostrarTela = function(id) {
    var self = this;
    var telas = document.querySelectorAll('.screen');
    telas.forEach(function(s) { s.classList.remove('active'); });
    
    var tela = document.getElementById(id);
    if(tela) {
        tela.classList.add('active');
        this.telaAtual = id;
        
        var nav = document.getElementById('bottomNav');
        if(nav) {
            var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen'];
            nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
        }
        
        if(id === 'homeScreen') this.carregarHome();
        if(id === 'meuPerfilScreen') this.carregarMeuPerfil();
        if(id === 'buscaScreen') this.buscarProfissionais();
    }
};

App.prototype.fazerLogin = function() {
    var self = this;
    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    var emailVal = email ? email.value.trim() : '';
    var senhaVal = senha ? senha.value : '';
    
    if(!emailVal || !senhaVal) {
        this.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    
    this.mostrarToast('Entrando...', 'info');
    
    authService.login(emailVal, senhaVal).then(function(r) {
        if(r.sucesso) {
            self.usuarioLogado = r.usuario;
            self.mostrarToast('Bem-vindo!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast(r.erro, 'erro');
        }
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var dados = {
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
    
    if(!dados.nome || !dados.email || !dados.senha) {
        this.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    
    this.mostrarToast('Cadastrando...', 'info');
    
    authService.cadastrar(dados).then(function(r) {
        if(r.sucesso) {
            self.usuarioLogado = r.usuario;
            self.mostrarToast('Cadastro realizado!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast(r.erro, 'erro');
        }
    });
};

App.prototype.proximaEtapa = function(etapa) {
    var e1 = document.getElementById('etapa1');
    var e2 = document.getElementById('etapa2');
    if(!e1 || !e2) return;
    
    if(etapa === 1) {
        e1.style.display = 'block';
        e2.style.display = 'none';
    } else {
        e1.style.display = 'none';
        e2.style.display = 'block';
    }
};

App.prototype.toggleProfissao = function() {
    var tipo = (document.getElementById('cadTipo') || {}).value;
    var grupo = document.getElementById('grupoProfissao');
    if(grupo) {
        grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
    }
};

App.prototype.recuperarSenha = function() {
    var email = prompt('Digite seu email:');
    if(!email) return;
    
    var self = this;
    authService.recuperarSenha(email).then(function(r) {
        if(r.sucesso) self.mostrarToast('Email enviado!', 'sucesso');
        else self.mostrarToast(r.erro, 'erro');
    });
};

App.prototype.sair = function() {
    var self = this;
    authService.logout().then(function() {
        self.usuarioLogado = null;
        self.mostrarTela('loginScreen');
        self.mostrarToast('Até logo!', 'sucesso');
    });
};

App.prototype.carregarHome = function() {
    if(!this.usuarioLogado) return;
    
    var h = new Date().getHours();
    var s = 'Bom dia';
    if(h >= 12 && h < 18) s = 'Boa tarde';
    if(h >= 18) s = 'Boa noite';
    
    var saudacao = document.getElementById('saudacao');
    if(saudacao) saudacao.textContent = '👋 ' + s + ', ' + this.usuarioLogado.nome + '!';
    
    var resumo = document.getElementById('resumoTexto');
    if(resumo) resumo.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢' : '👷') + ' ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self = this;
    var c = document.getElementById('feedContainer');
    if(!c) return;
    
    c.innerHTML = '<div class="loading">Carregando...</div>';
    
    db.collection('vagas').get().then(function(snap) {
        var vagas = [];
        snap.forEach(function(doc) {
            var d = doc.data();
            if(d.ativa !== false) vagas.push({id: doc.id, data: d});
        });
        
        if(vagas.length === 0) {
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma vaga</h3></div>';
            return;
        }
        
        var html = '';
        vagas.forEach(function(v) {
            html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ ' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-descricao">' + (v.data.descricao || '') + '</div><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div></div></div>';
        });
        
        c.innerHTML = html;
    }).catch(function(e) {
        c.innerHTML = '<div class="card">Erro ao carregar vagas</div>';
    });
};

App.prototype.carregarMeuPerfil = function() {
    if(!this.usuarioLogado) return;
    var u = this.usuarioLogado;
    
    var nome = document.getElementById('meuPerfilNome');
    if(nome) nome.textContent = u.nome || 'Usuário';
    
    var prof = document.getElementById('meuPerfilProfissao');
    if(prof) prof.textContent = (u.tipo === 'profissional' ? '👷' : '🏢') + ' ' + (u.profissao || u.tipo);
    
    var editNome = document.getElementById('editNome');
    if(editNome) editNome.value = u.nome || '';
    
    var editCel = document.getElementById('editCelular');
    if(editCel) editCel.value = u.celular || '';
    
    var editHab = document.getElementById('editHabilidades');
    if(editHab) editHab.value = u.habilidades || '';
};

App.prototype.salvarPerfil = function() {
    var self = this;
    var dados = {
        nome: (document.getElementById('editNome') || {}).value || '',
        celular: (document.getElementById('editCelular') || {}).value || '',
        habilidades: (document.getElementById('editHabilidades') || {}).value || ''
    };
    
    if(!dados.nome) {
        this.mostrarToast('Nome obrigatório!', 'erro');
        return;
    }
    
    databaseService.atualizarUsuario(this.usuarioLogado.id, dados).then(function() {
        self.usuarioLogado.nome = dados.nome;
        self.usuarioLogado.celular = dados.celular;
        self.usuarioLogado.habilidades = dados.habilidades;
        self.mostrarToast('Perfil atualizado!', 'sucesso');
        self.carregarMeuPerfil();
    });
};

App.prototype.buscarProfissionais = function() {
    var self = this;
    var c = document.getElementById('buscaResultados');
    if(!c) return;
    
    c.innerHTML = '<div class="loading">Buscando...</div>';
    
    db.collection('usuarios').get().then(function(snap) {
        var todos = [];
        snap.forEach(function(doc) {
            todos.push({id: doc.id, data: doc.data()});
        });
        
        var profs = todos.filter(function(u) {
            return u.data.tipo === 'profissional';
        });
        
        if(profs.length === 0) {
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3></div>';
            return;
        }
        
        var html = '';
        profs.forEach(function(u) {
            html += '<div class="vaga-card" onclick="app.verPerfil(\'' + u.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.data.nome + '</div><div class="vaga-data">' + (u.data.profissao || 'Profissional') + ' • ' + (u.data.experiencia || 0) + ' anos</div></div></div><div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.id + '\')" style="flex:1;">💬 Chat</button></div></div>';
        });
        
        c.innerHTML = html;
    }).catch(function(e) {
        c.innerHTML = '<div class="card">Erro: ' + e.message + '</div>';
    });
};

App.prototype.verPerfil = function(uid) {
    var self = this;
    
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if(!doc.exists) {
            self.mostrarToast('Usuário não encontrado', 'erro');
            return;
        }
        
        var u = doc.data();
        var c = document.getElementById('perfilPublicoConteudo');
        if(!c) return;
        
        c.innerHTML = '<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>' + u.nome + '</h2><p>' + (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos</p></div><div class="card"><h3>Habilidades</h3><p>' + (u.habilidades || 'Não informado') + '</p></div><div class="card"><h3>Contato</h3><p>📱 ' + (u.celular || 'Não informado') + '</p><p>📧 ' + u.email + '</p></div>';
        
        if(self.usuarioLogado && self.usuarioLogado.id !== uid) {
            var w = u.celular ? u.celular.replace(/\D/g, '') : '';
            c.innerHTML += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if(w) c.innerHTML += '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
            c.innerHTML += '<button class="btn btn-primary" onclick="app.iniciarChat(\'' + uid + '\')">💬 Chat</button>';
            c.innerHTML += '</div>';
        }
        
        self.mostrarTela('perfilPublicoScreen');
    });
};

App.prototype.iniciarChat = function(uid) {
    var self = this;
    
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if(!doc.exists) return;
        
        self.usuarioSelecionado = {id: doc.id, data: doc.data()};
        var u = self.usuarioSelecionado.data;
        
        var header = document.getElementById('chatHeaderInfo');
        if(header) {
            header.innerHTML = '<div style="display:flex;align-items:center;gap:10px;"><div style="width:40px;height:40px;border-radius:50%;background:#F47920;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-user"></i></div><div><strong>' + u.nome + '</strong><div style="font-size:12px;color:#10B981;">Online</div></div></div>';
        }
        
        self.mostrarTela('chatScreen');
    });
};

App.prototype.enviarMensagem = function() {
    var input = document.getElementById('chatInput');
    var conteudo = input ? input.value.trim() : '';
    
    if(!conteudo || !this.usuarioSelecionado) return;
    
    var self = this;
    db.collection('mensagens').add({
        remetenteId: this.usuarioLogado.id,
        destinatarioId: this.usuarioSelecionado.id,
        participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id],
        conteudo: conteudo,
        dataEnvio: firebase.firestore.FieldValue.serverTimestamp(),
        lida: false
    }).then(function() {
        if(input) input.value = '';
        self.mostrarToast('Mensagem enviada!', 'sucesso');
    });
};

App.prototype.abrirTelaPublicacao = function() {
    if(!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') {
        this.mostrarToast('Apenas empreiteiros!', 'erro');
        return;
    }
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVagaApp = function() {
    var self = this;
    var titulo = (document.getElementById('vagaTitulo') || {}).value || '';
    var endereco = (document.getElementById('vagaEndereco') || {}).value || '';
    var valor = (document.getElementById('vagaValorHora') || {}).value || '0';
    
    if(!titulo || !endereco) {
        this.mostrarToast('Preencha título e endereço!', 'erro');
        return;
    }
    
    this.mostrarToast('Publicando...', 'info');
    
    db.collection('vagas').add({
        titulo: titulo,
        descricao: (document.getElementById('vagaDescricao') || {}).value || '',
        endereco: endereco,
        valorHora: parseFloat(valor),
        profissoes: 'Geral',
        usuarioId: this.usuarioLogado.id,
        interessados: [],
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
        ativa: true
    }).then(function() {
        self.mostrarToast('Vaga publicada!', 'sucesso');
        setTimeout(function() {
            self.mostrarTela('homeScreen');
            self.carregarFeed();
        }, 1000);
    }).catch(function() {
        self.mostrarToast('Erro ao publicar', 'erro');
    });
};

App.prototype.candidatarVaga = function(vid) {
    if(!this.usuarioLogado || this.usuarioLogado.tipo !== 'profissional') {
        this.mostrarToast('Apenas profissionais!', 'erro');
        return;
    }
    
    var self = this;
    db.collection('vagas').doc(vid).get().then(function(doc) {
        if(!doc.exists) return;
        var v = doc.data();
        if(!v.interessados) v.interessados = [];
        v.interessados.push(self.usuarioLogado.id);
        
        db.collection('vagas').doc(vid).update({interessados: v.interessados}).then(function() {
            self.mostrarToast('Candidatura enviada!', 'sucesso');
        });
    });
};

App.prototype.avaliarUsuario = function(uid) {
    var nota = prompt('Nota (1-5):');
    if(!nota || isNaN(nota) || nota < 1 || nota > 5) return;
    
    var com = prompt('Comentário:') || '';
    var self = this;
    
    databaseService.avaliarUsuario(this.usuarioLogado.id, uid, parseInt(nota), com).then(function() {
        self.mostrarToast('Avaliação enviada!', 'sucesso');
    });
};

App.prototype.mostrarNotificacoes = function() {
    this.mostrarTela('notificacoesScreen');
};

App.prototype.mostrarToast = function(m, t) {
    var toast = document.getElementById('toast');
    if(!toast) return;
    
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    
    var self = this;
    clearTimeout(this._tt);
    this._tt = setTimeout(function() {
        toast.style.display = 'none';
    }, 3000);
};

// Inicializa o app quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
    console.log('✅ App pronto!');
});
