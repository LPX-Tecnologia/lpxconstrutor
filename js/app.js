// ==========================================================
// ===== APLICAÇÃO PRINCIPAL - CORRIGIDO =====
// ==========================================================

// Placeholder para evitar "app is not defined"
window.app = {
    fazerLogin: function(){},
    mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id);
        if(t) t.classList.add('active');
    },
    cadastrar: function(){},
    proximaEtapa: function(){},
    toggleProfissao: function(){},
    recuperarSenha: function(){},
    sair: function(){},
    buscarProfissionais: function(){},
    verPerfil: function(){},
    iniciarChat: function(){},
    enviarMensagem: function(){},
    salvarPerfil: function(){},
    uploadFoto: function(){},
    abrirTelaPublicacao: function(){},
    publicarVagaApp: function(){},
    candidatarVaga: function(){},
    avaliarUsuario: function(){},
    mostrarNotificacoes: function(){},
    mudarTab: function(){}
};

// Classe App
var App = function(){
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.notificacoes = [];
    this.init();
};

App.prototype.init = function(){
    var self = this;
    console.log('🚀 Iniciando...');
    
    authService.onAuthStateChange(function(usuario){
        if(usuario){
            self.usuarioLogado = usuario;
            self.atualizarBotaoPublicar();
            if(self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen'){
                self.mostrarTela('homeScreen');
            }
        } else {
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
        }
    });
};

App.prototype.atualizarBotaoPublicar = function(){
    var btn = document.getElementById('btnPublicar');
    if(!btn) return;
    if(this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro'){
        btn.style.display = 'flex';
    } else {
        btn.style.display = 'none';
    }
};

App.prototype.mostrarTela = function(id){
    var self = this;
    document.querySelectorAll('.screen').forEach(function(s){
        s.classList.remove('active');
    });
    
    var tela = document.getElementById(id);
    if(tela){
        tela.classList.add('active');
        self.telaAtual = id;
        
        var nav = document.getElementById('bottomNav');
        if(nav){
            var telasComNav = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen'];
            if(telasComNav.indexOf(id) >= 0){
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        }
        
        if(id === 'homeScreen') self.carregarHome();
        if(id === 'meuPerfilScreen') self.carregarMeuPerfil();
        if(id === 'buscaScreen') self.buscarProfissionais();
    }
};

App.prototype.fazerLogin = function(){
    var self = this;
    var emailEl = document.getElementById('loginEmail');
    var senhaEl = document.getElementById('loginSenha');
    var email = emailEl ? emailEl.value.trim() : '';
    var senha = senhaEl ? senhaEl.value : '';
    
    if(!email || !senha){
        self.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    
    self.mostrarToast('Entrando...', 'info');
    
    authService.login(email, senha).then(function(r){
        if(r.sucesso){
            self.usuarioLogado = r.usuario;
            self.mostrarToast('Bem-vindo, ' + r.usuario.nome + '!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast(r.erro, 'erro');
        }
    }).catch(function(e){
        self.mostrarToast('Erro ao fazer login', 'erro');
    });
};

App.prototype.cadastrar = function(){
    var self = this;
    var dados = {
        nome: document.getElementById('cadNome') ? document.getElementById('cadNome').value.trim() : '',
        email: document.getElementById('cadEmail') ? document.getElementById('cadEmail').value.trim() : '',
        senha: document.getElementById('cadSenha') ? document.getElementById('cadSenha').value : '',
        tipo: document.getElementById('cadTipo') ? document.getElementById('cadTipo').value : 'profissional',
        celular: document.getElementById('cadCelular') ? document.getElementById('cadCelular').value.trim() : '',
        cpf: document.getElementById('cadCPF') ? document.getElementById('cadCPF').value.replace(/\D/g,'') : '',
        profissao: document.getElementById('cadProfissao') ? document.getElementById('cadProfissao').value : '',
        experiencia: document.getElementById('cadExperiencia') ? document.getElementById('cadExperiencia').value : '0',
        habilidades: document.getElementById('cadHabilidades') ? document.getElementById('cadHabilidades').value : ''
    };
    
    if(!dados.nome || !dados.email || !dados.senha){
        self.mostrarToast('Preencha todos os campos!', 'erro');
        return;
    }
    
    self.mostrarToast('Cadastrando...', 'info');
    
    authService.cadastrar(dados).then(function(r){
        if(r.sucesso){
            self.usuarioLogado = r.usuario;
            self.mostrarToast('Cadastro realizado!', 'sucesso');
            self.atualizarBotaoPublicar();
            self.mostrarTela('homeScreen');
        } else {
            self.mostrarToast(r.erro, 'erro');
        }
    }).catch(function(e){
        self.mostrarToast('Erro ao cadastrar', 'erro');
    });
};

App.prototype.proximaEtapa = function(etapa){
    var e1 = document.getElementById('etapa1');
    var e2 = document.getElementById('etapa2');
    if(!e1 || !e2) return;
    
    if(etapa === 1){
        e1.style.display = 'block';
        e2.style.display = 'none';
    } else {
        e1.style.display = 'none';
        e2.style.display = 'block';
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
};

App.prototype.toggleProfissao = function(){
    var tipo = document.getElementById('cadTipo') ? document.getElementById('cadTipo').value : '';
    var grupo = document.getElementById('grupoProfissao');
    if(grupo){
        grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
    }
};

App.prototype.recuperarSenha = function(){
    var email = prompt('Digite seu email:');
    if(!email) return;
    var self = this;
    
    authService.recuperarSenha(email).then(function(r){
        if(r.sucesso){
            self.mostrarToast('Email enviado!', 'sucesso');
        } else {
            self.mostrarToast(r.erro, 'erro');
        }
    });
};

App.prototype.sair = function(){
    var self = this;
    authService.logout().then(function(){
        self.usuarioLogado = null;
        self.mostrarTela('loginScreen');
        self.mostrarToast('Até logo!', 'sucesso');
    });
};

App.prototype.carregarHome = function(){
    if(!this.usuarioLogado) return;
    
    var h = new Date().getHours();
    var s = 'Bom dia';
    if(h >= 12 && h < 18) s = 'Boa tarde';
    if(h >= 18) s = 'Boa noite';
    
    var saudacaoEl = document.getElementById('saudacao');
    if(saudacaoEl) saudacaoEl.textContent = '👋 ' + s + ', ' + this.usuarioLogado.nome + '!';
    
    var resumoEl = document.getElementById('resumoTexto');
    if(resumoEl) resumoEl.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional');
    
    try {
        if(typeof mapaService !== 'undefined') mapaService.initMap();
    } catch(e) {}
    
    this.carregarFeed();
};

App.prototype.carregarFeed = function(){
    var self = this;
    var c = document.getElementById('feedContainer');
    if(!c) return;
    
    c.innerHTML = '<div class="loading">Carregando vagas...</div>';
    
    db.collection('vagas').get().then(function(snap){
        var vagas = [];
        snap.forEach(function(doc){
            var d = doc.data();
            if(d.ativa !== false){
                vagas.push({id: doc.id, titulo: d.titulo, endereco: d.endereco, descricao: d.descricao, valorHora: d.valorHora, profissoes: d.profissoes});
            }
        });
        
        if(vagas.length === 0){
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma vaga publicada</h3></div>';
            return;
        }
        
        var html = '';
        vagas.forEach(function(v){
            html += '<div class="vaga-card">' +
                '<div class="vaga-header">' +
                    '<div class="vaga-avatar"><i class="fas fa-user-tie"></i></div>' +
                    '<div class="vaga-info">' +
                        '<div class="vaga-nome">' + (v.titulo || 'Vaga') + '</div>' +
                        '<div class="vaga-data">📍 ' + (v.endereco || 'Local não informado') + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="vaga-body">' +
                    '<div class="vaga-titulo">🏗️ ' + (v.titulo || 'Vaga') + '</div>' +
                    '<div class="vaga-descricao">' + (v.descricao || '') + '</div>' +
                    '<div class="vaga-tags">' +
                        '<span class="vaga-tag">💰 R$ ' + (v.valorHora || '0') + '/h</span>' +
                        '<span class="vaga-tag">👷 ' + (v.profissoes || 'Todas') + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        c.innerHTML = html;
    }).catch(function(e){
        c.innerHTML = '<div class="card">Erro ao carregar vagas</div>';
    });
};

App.prototype.carregarMeuPerfil = function(){
    if(!this.usuarioLogado) return;
    var u = this.usuarioLogado;
    
    var nomeEl = document.getElementById('meuPerfilNome');
    if(nomeEl) nomeEl.textContent = u.nome || 'Usuário';
    
    var profEl = document.getElementById('meuPerfilProfissao');
    if(profEl) profEl.textContent = (u.tipo === 'profissional' ? '👷 ' : '🏢 ') + (u.profissao || u.tipo);
    
    var avalEl = document.getElementById('meuPerfilAvaliacao');
    if(avalEl) avalEl.innerHTML = '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações');
    
    var editNome = document.getElementById('editNome');
    if(editNome) editNome.value = u.nome || '';
    
    var editCel = document.getElementById('editCelular');
    if(editCel) editCel.value = u.celular || '';
    
    var editHab = document.getElementById('editHabilidades');
    if(editHab) editHab.value = u.habilidades || '';
    
    var statsAv = document.getElementById('statsAvaliacoes');
    if(statsAv) statsAv.textContent = u.avaliacoesRecebidas || 0;
};

App.prototype.salvarPerfil = function(){
    var self = this;
    var dados = {
        nome: document.getElementById('editNome') ? document.getElementById('editNome').value.trim() : '',
        celular: document.getElementById('editCelular') ? document.getElementById('editCelular').value.trim() : '',
        habilidades: document.getElementById('editHabilidades') ? document.getElementById('editHabilidades').value.trim() : ''
    };
    
    if(!dados.nome){
        this.mostrarToast('Nome é obrigatório!', 'erro');
        return;
    }
    
    databaseService.atualizarUsuario(this.usuarioLogado.id, dados).then(function(){
        self.usuarioLogado.nome = dados.nome;
        self.usuarioLogado.celular = dados.celular;
        self.usuarioLogado.habilidades = dados.habilidades;
        self.mostrarToast('Perfil atualizado!', 'sucesso');
        self.carregarMeuPerfil();
    }).catch(function(){
        self.mostrarToast('Erro ao salvar', 'erro');
    });
};

App.prototype.uploadFoto = function(event){
    var self = this;
    var file = event.target.files[0];
    if(!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e){
        databaseService.atualizarUsuario(self.usuarioLogado.id, {fotoPerfil: e.target.result}).then(function(){
            self.usuarioLogado.fotoPerfil = e.target.result;
            self.mostrarToast('Foto atualizada!', 'sucesso');
        });
    };
    reader.readAsDataURL(file);
};

App.prototype.buscarProfissionais = function(){
    var self = this;
    var c = document.getElementById('buscaResultados');
    if(!c) return;
    
    c.innerHTML = '<div class="loading">Buscando profissionais...</div>';
    
    db.collection('usuarios').get().then(function(snap){
        var todos = [];
        snap.forEach(function(doc){
            todos.push({id: doc.id, data: doc.data()});
        });
        
        var profs = todos.filter(function(u){
            return u.data.tipo === 'profissional' && u.data.ativo !== false;
        });
        
        console.log('👷 Profissionais encontrados:', profs.length);
        
        if(profs.length === 0){
            c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional encontrado</h3><p style="color:#999;">Total de usuários: ' + todos.length + '</p></div>';
            return;
        }
        
        var html = '';
        profs.forEach(function(u){
            var w = u.data.celular ? u.data.celular.replace(/\D/g, '') : '';
            var sc = u.data.score || 0;
            var est = '⭐'.repeat(Math.round(sc)) || '☆';
            
            html += '<div class="vaga-card" onclick="app.verPerfil(\'' + u.id + '\')" style="cursor:pointer;">' +
                '<div class="vaga-header">' +
                    '<div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div>' +
                    '<div class="vaga-info">' +
                        '<div class="vaga-nome">' + u.data.nome + '</div>' +
                        '<div class="vaga-data">' + (u.data.profissao || 'Profissional') + ' • ' + (u.data.experiencia || 0) + ' anos</div>' +
                    '</div>' +
                    '<div style="text-align:right;">' +
                        '<div>' + est + '</div>' +
                        '<div style="font-size:11px;color:#999;">' + (sc > 0 ? sc.toFixed(1) : 'Novo') + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="vaga-footer">' +
                    (w ? '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>' : '') +
                    '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.id + '\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button>' +
                '</div>' +
            '</div>';
        });
        c.innerHTML = html;
    }).catch(function(e){
        c.innerHTML = '<div class="card">Erro ao buscar: ' + e.message + '</div>';
    });
};

App.prototype.verPerfil = function(uid){
    var self = this;
    
    db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists){
            self.mostrarToast('Usuário não encontrado', 'erro');
            return;
        }
        
        var u = doc.data();
        var c = document.getElementById('perfilPublicoConteudo');
        if(!c) return;
        
        var w = u.celular ? u.celular.replace(/\D/g, '') : '';
        
        var html = '<div class="profile-header-container"><div class="profile-cover"></div>' +
            '<div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user" style="font-size:40px;"></i></div></div></div>' +
            '<div class="profile-info-card"><h2>' + u.nome + '</h2>' +
            '<p><i class="fas fa-tools"></i> ' + (u.profissao || 'Profissional') + '</p>' +
            '<p><i class="fas fa-calendar"></i> ' + (u.experiencia || 0) + ' anos de experiência</p>' +
            '<div class="stars-container">' + '⭐'.repeat(Math.round(u.score || 0)) + ' ' + (u.score ? u.score.toFixed(1) : 'Sem avaliações') + '</div></div>' +
            '<div class="card"><h3>Habilidades</h3><p>' + (u.habilidades || 'Não informado') + '</p></div>' +
            '<div class="card"><h3>Contato</h3><p>📱 ' + (u.celular || 'Não informado') + '</p><p>📧 ' + u.email + '</p></div>';
        
        if(self.usuarioLogado && self.usuarioLogado.id !== uid){
            html += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if(w) html += '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
            html += '<button class="btn btn-primary" onclick="app.iniciarChat(\'' + uid + '\')"><i class="fas fa-comments"></i> Conversar no Chat</button>';
            html += '<button class="btn btn-outline" onclick="app.avaliarUsuario(\'' + uid + '\')"><i class="fas fa-star"></i> Avaliar</button>';
            html += '</div>';
        }
        
        c.innerHTML = html;
        self.mostrarTela('perfilPublicoScreen');
    });
};

App.prototype.iniciarChat = function(uid){
    var self = this;
    
    db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists) return;
        
        self.usuarioSelecionado = {id: doc.id, data: doc.data()};
        var u = self.usuarioSelecionado.data;
        
        var header = document.getElementById('chatHeaderInfo');
        if(header){
            header.innerHTML = '<div style="display:flex;align-items:center;gap:10px;">' +
                '<div style="width:40px;height:40px;border-radius:50%;background:#F47920;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-user"></i></div>' +
                '<div><strong>' + u.nome + '</strong><div style="font-size:12px;color:#10B981;">Online</div></div></div>';
        }
        
        self.mostrarTela('chatScreen');
    });
};

App.prototype.enviarMensagem = function(){
    var self = this;
    var input = document.getElementById('chatInput');
    var conteudo = input ? input.value.trim() : '';
    
    if(!conteudo || !this.usuarioSelecionado) return;
    
    db.collection('mensagens').add({
        remetenteId: this.usuarioLogado.id,
        destinatarioId: this.usuarioSelecionado.id,
        participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id],
        conteudo: conteudo,
        dataEnvio: firebase.firestore.FieldValue.serverTimestamp(),
        lida: false
    }).then(function(){
        if(input) input.value = '';
        self.mostrarToast('Mensagem enviada!', 'sucesso');
    });
};

App.prototype.abrirTelaPublicacao = function(){
    if(!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro'){
        this.mostrarToast('Apenas empreiteiros podem publicar!', 'erro');
        return;
    }
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVagaApp = function(){
    var self = this;
    var titulo = document.getElementById('vagaTitulo') ? document.getElementById('vagaTitulo').value.trim() : '';
    var endereco = document.getElementById('vagaEndereco') ? document.getElementById('vagaEndereco').value.trim() : '';
    var valor = document.getElementById('vagaValorHora') ? document.getElementById('vagaValorHora').value : '0';
    
    if(!titulo || !endereco){
        this.mostrarToast('Preencha título e endereço!', 'erro');
        return;
    }
    
    this.mostrarToast('Publicando...', 'info');
    
    db.collection('vagas').add({
        titulo: titulo,
        descricao: document.getElementById('vagaDescricao') ? document.getElementById('vagaDescricao').value : '',
        endereco: endereco,
        valorHora: parseFloat(valor) || 0,
        profissoes: 'Geral',
        usuarioId: this.usuarioLogado.id,
        interessados: [],
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
        ativa: true
    }).then(function(){
        self.mostrarToast('✅ Vaga publicada!', 'sucesso');
        setTimeout(function(){
            self.mostrarTela('homeScreen');
            self.carregarFeed();
        }, 1000);
    }).catch(function(){
        self.mostrarToast('Erro ao publicar', 'erro');
    });
};

App.prototype.candidatarVaga = function(vid){
    if(!this.usuarioLogado || this.usuarioLogado.tipo !== 'profissional'){
        this.mostrarToast('Apenas profissionais!', 'erro');
        return;
    }
    
    var self = this;
    db.collection('vagas').doc(vid).get().then(function(doc){
        if(!doc.exists) return;
        var v = doc.data();
        if(!v.interessados) v.interessados = [];
        
        if(v.interessados.indexOf(self.usuarioLogado.id) >= 0){
            self.mostrarToast('Você já se candidatou!', 'erro');
            return;
        }
        
        v.interessados.push(self.usuarioLogado.id);
        db.collection('vagas').doc(vid).update({interessados: v.interessados}).then(function(){
            self.mostrarToast('Candidatura enviada!', 'sucesso');
        });
    });
};

App.prototype.avaliarUsuario = function(uid){
    var nota = prompt('Dê uma nota de 1 a 5:');
    if(!nota || isNaN(nota) || nota < 1 || nota > 5){
        this.mostrarToast('Nota inválida!', 'erro');
        return;
    }
    
    var comentario = prompt('Comentário (opcional):') || '';
    var self = this;
    
    databaseService.avaliarUsuario(this.usuarioLogado.id, uid, parseInt(nota), comentario).then(function(){
        self.mostrarToast('Avaliação enviada!', 'sucesso');
    }).catch(function(){
        self.mostrarToast('Erro ao avaliar', 'erro');
    });
};

App.prototype.mudarTab = function(tab){
    document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
    event.target.closest('.tab').classList.add('active');
    
    document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none';
    
    if(tab === 'feed') this.carregarFeed();
};

App.prototype.mostrarNotificacoes = function(){
    this.mostrarTela('notificacoesScreen');
};

App.prototype.mostrarToast = function(m, t){
    var toast = document.getElementById('toast');
    if(!toast) return;
    
    toast.textContent = m;
    toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    
    var self = this;
    clearTimeout(this._tt);
    this._tt = setTimeout(function(){
        toast.style.display = 'none';
    }, 3000);
};

// Inicializa
document.addEventListener('DOMContentLoaded', function(){
    window.app = new App();
    console.log('✅ App pronto!');
});
