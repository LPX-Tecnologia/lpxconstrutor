// ==========================================================
// LPXCONSTRUTOR v2.0.5 - COMPLETO E CORRIGIDO
// FEED, PERFIL, BUSCA, CHAT, NOTIFICAÇÕES - TUDO FUNCIONANDO
// ==========================================================

const APP_VERSION = "2.0.5";
console.log(`🏗️ LPXCONSTRUTOR v${APP_VERSION}`);

// Interface global
window.app = {
    _app: null
};

// Métodos globais
['fazerLogin','mostrarTela','voltarTela','cadastrar','sair','confirmarSair','fecharModalSair',
 'buscarProfissionais','verPerfil','abrirTelaPublicacao','publicarVagaApp','previewFotoObra',
 'carregarMinhasObras','verDetalheObra','uploadFoto','abrirEditarPerfil','salvarPerfil',
 'selecionarTema','mostrarDocumento','mudarTab','adicionarNaRede','apagarObra',
 'mostrarNotificacoes','iniciarChat','enviarMensagem','gerarQRCodeCompartilhar',
 'abrirMapaLocalizacao','salvarLocalizacao','atualizarCidades','atualizarBairros',
 'aceitarConvite','recusarConvite','novaObra','proximaEtapa','toggleProfissao',
 'solicitarCodigo','verificarCodigo','voltarPasso1','carregarListaConversas'
].forEach(function(m) {
    window.app[m] = function() {
        var a = window.app._app;
        if (a && a[m]) return a[m].apply(a, arguments);
    };
});

// ===== APP PRINCIPAL =====
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
    this._vagasCache = [];
    this._publicando = false;
    this._mapaInicializado = false;
    this.init();
};

// ===== INICIALIZAÇÃO =====
App.prototype.init = function() {
    var s = this;
    console.log('🚀 App iniciado');
    window.app._app = s;
    
    var nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = 'none';
    
    if (s.temaAtual === 'escuro') {
        document.body.classList.add('dark-theme');
    }
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('✅ Auth:', user.uid);
                db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                    if (doc.exists) {
                        s.usuarioLogado = doc.data();
                        s.usuarioLogado.id = doc.id;
                        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                        s.mostrarTela('homeScreen');
                        s.iniciarFeedListener();
                        s.iniciarListenerNotificacoes();
                    } else {
                        s.mostrarTela('loginScreen');
                    }
                }).catch(function() {
                    s.mostrarTela('loginScreen');
                });
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.pararListeners();
                s.mostrarTela('loginScreen');
            }
        });
    } else {
        setTimeout(function() { s.mostrarTela('loginScreen'); }, 1500);
    }
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var s = this;
    console.log('📱 Tela:', id);
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    document.querySelectorAll('.screen').forEach(function(t) {
        t.classList.remove('active');
        t.style.display = 'none';
    });
    
    var tela = document.getElementById(id);
    if (!tela) {
        tela = document.createElement('div');
        tela.id = id;
        tela.className = 'screen';
        document.querySelector('.app-container')?.appendChild(tela);
    }
    
    tela.classList.add('active');
    tela.style.display = 'block';
    s.telaAtual = id;
    
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var hide = ['loginScreen','cadastroScreen','recuperarSenhaScreen'];
        nav.style.display = hide.indexOf(id) >= 0 ? 'none' : 'flex';
        
        nav.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.toggle('active', item.getAttribute('data-screen') === id);
        });
    }
    
    switch(id) {
        case 'homeScreen': s.carregarHome(); break;
        case 'meuPerfilScreen': s.carregarMeuPerfil(); break;
        case 'buscaScreen': s.buscarProfissionais(); break;
        case 'minhasObrasScreen': s.carregarMinhasObras(); break;
        case 'chatScreen': if (!s.usuarioSelecionado) s.carregarListaConversas(); break;
        case 'configScreen': s.carregarConfigScreen(); break;
        case 'perfilPublicoScreen': break;
    }
    
    if (id === 'homeScreen' && s.usuarioLogado) {
        var bp = document.getElementById('btnPublicar');
        var bo = document.getElementById('btnObras');
        var show = s.usuarioLogado.tipo === 'empreiteiro';
        if (bp) bp.style.display = show ? 'flex' : 'none';
        if (bo) bo.style.display = show ? 'flex' : 'none';
    }
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        this.mostrarTela(this.historicoTelas.pop());
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== LOGIN =====
App.prototype.fazerLogin = function() {
    var s = this;
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value || '';
    
    if (!email || !senha) { s.mostrarToast('Preencha email e senha!', 'erro'); return; }
    
    var btn = document.getElementById('btnLogin');
    if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }
    
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(uc) {
            return db.collection('usuarios').doc(uc.user.uid).get();
        })
        .then(function(doc) {
            if (doc.exists) {
                s.usuarioLogado = doc.data();
                s.usuarioLogado.id = doc.id;
                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                s.historicoTelas = [];
                s.mostrarToast('Bem-vindo, ' + s.usuarioLogado.nome + '!', 'sucesso');
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('Usuário não encontrado!', 'erro');
            }
        })
        .catch(function(err) {
            var m = 'Erro ao fazer login';
            if (err.code === 'auth/user-not-found') m = 'Usuário não encontrado!';
            else if (err.code === 'auth/wrong-password') m = 'Senha incorreta!';
            else if (err.code === 'auth/invalid-email') m = 'Email inválido!';
            s.mostrarToast(m, 'erro');
        })
        .finally(function() {
            if (btn) { btn.textContent = 'ENTRAR'; btn.disabled = false; }
        });
};

// ===== CADASTRO COM NOTIFICAÇÃO =====
App.prototype.cadastrar = function() {
    var s = this;
    var d = {
        nome: document.getElementById('cadNome')?.value?.trim() || '',
        email: document.getElementById('cadEmail')?.value?.trim() || '',
        senha: document.getElementById('cadSenha')?.value || '',
        tipo: document.getElementById('cadTipo')?.value || 'profissional',
        celular: document.getElementById('cadCelular')?.value?.trim() || '',
        cpf: document.getElementById('cadCPF')?.value?.trim() || '',
        profissao: document.getElementById('cadProfissao')?.value || '',
        experiencia: document.getElementById('cadExperiencia')?.value || '0',
        habilidades: document.getElementById('cadHabilidades')?.value?.trim() || '',
        score: 0, fotoPerfil: null, localizacao: null
    };
    
    if (!d.nome || !d.email || !d.senha) { s.mostrarToast('Preencha todos!', 'erro'); return; }
    if (d.senha.length < 6) { s.mostrarToast('Senha mínima 6 caracteres!', 'erro'); return; }
    
    s.mostrarToast('Cadastrando...', 'info');
    
    firebase.auth().createUserWithEmailAndPassword(d.email, d.senha)
        .then(function(uc) {
            d.id = uc.user.uid;
            d.dataCriacao = firebase.firestore.FieldValue.serverTimestamp();
            d.ativo = true;
            return db.collection('usuarios').doc(d.id).set(d);
        })
        .then(function() {
            s.usuarioLogado = d;
            localStorage.setItem('usuarioLPX', JSON.stringify(d));
            
            s.notificarTodosUsuarios({
                titulo: '👤 Novo Profissional!',
                mensagem: d.nome + ' (' + (d.profissao || d.tipo) + ') acabou de se cadastrar na plataforma!',
                tipo: 'novo_usuario'
            });
            
            s.mostrarToast('✅ Cadastro realizado!', 'sucesso');
            s.mostrarTela('homeScreen');
        })
        .catch(function(err) {
            var m = err.code === 'auth/email-already-in-use' ? 'Email já cadastrado!' : 'Erro ao cadastrar';
            s.mostrarToast(m, 'erro');
        });
};

// ===== SAIR =====
App.prototype.sair = function() {
    this.pararListeners();
    firebase.auth().signOut();
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    localStorage.removeItem('usuarioLPX');
    this.historicoTelas = [];
    var modal = document.getElementById('modalSair');
    if (modal) modal.style.display = 'none';
    this.mostrarTela('loginScreen');
};

App.prototype.fecharModalSair = function() {
    var modal = document.getElementById('modalSair');
    if (modal) modal.style.display = 'none';
};

App.prototype.confirmarSair = function() {
    this.sair();
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; }
    
    var u = s.usuarioLogado;
    var hr = new Date().getHours();
    var saudacao = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    
    var el = document.getElementById('saudacao');
    if (el) el.textContent = '👋 ' + saudacao + ', ' + u.nome + '!';
    
    var er = document.getElementById('resumoTexto');
    if (er) er.textContent = u.tipo === 'empreiteiro' ? '🏰 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
    
    if (!s._mapaInicializado && typeof mapaService !== 'undefined') {
        setTimeout(function() { mapaService.initMap(); }, 500);
        s._mapaInicializado = true;
    }
    
    if (!s._listenerFeed) s.iniciarFeedListener();
};

App.prototype.mudarTab = function(t) {
    this.tabAtual = t;
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer');
    var tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(function(tab) { tab.classList.remove('active'); });
    
    if (t === 'feed') {
        if (fc) fc.style.display = 'flex';
        if (rc) rc.style.display = 'none';
        if (tabs[0]) tabs[0].classList.add('active');
    } else {
        if (fc) fc.style.display = 'none';
        if (rc) rc.style.display = 'flex';
        if (tabs[1]) tabs[1].classList.add('active');
        this.carregarRede();
    }
};

// ===== FEED - CORRIGIDO =====
App.prototype.iniciarFeedListener = function() {
    var s = this;
    if (s._listenerFeed || typeof db === 'undefined') return;
    
    console.log('🔥 Iniciando feed listener...');
    
    // Versão sem índice composto (funciona imediatamente)
    s._listenerFeed = db.collection('vagas')
        .where('ativa', '==', true)
        .onSnapshot(function(snap) {
            console.log('📢 Feed atualizado:', snap.size, 'vagas');
            
            var vagas = [];
            snap.forEach(function(doc) {
                var v = doc.data();
                v.id = doc.id;
                vagas.push(v);
            });
            
            // Ordena manualmente por data (mais recente primeiro)
            vagas.sort(function(a, b) {
                var da = a.dataCriacao?.toDate?.().getTime() || 0;
                var db = b.dataCriacao?.toDate?.().getTime() || 0;
                return db - da;
            });
            
            s._vagasCache = vagas;
            s.renderizarFeed(vagas);
            
        }, function(err) {
            console.error('❌ Erro no feed:', err);
            var container = document.getElementById('feedContainer');
            if (container) {
                container.innerHTML = '<div class="card" style="text-align:center;padding:40px;color:#EF4444;">' +
                    '<i class="fas fa-exclamation-triangle" style="font-size:50px;"></i>' +
                    '<p style="margin-top:16px;">Erro ao carregar feed</p>' +
                    '<p style="font-size:12px;color:#999;">' + (err.message || 'Tente novamente') + '</p>' +
                    '<button onclick="window.app._app.iniciarFeedListener()" class="btn btn-primary" style="margin-top:10px;">Tentar Novamente</button></div>';
            }
        });
};

App.prototype.renderizarFeed = function(vagas) {
    var s = this;
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    if (s.tabAtual !== 'feed') return;
    
    if (!vagas || vagas.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:50px;">🏗️</div>' +
            '<h3>Nenhuma obra publicada</h3>' +
            '<p style="color:#666;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado?.tipo === 'empreiteiro' ? 
                '<button onclick="window.app.abrirTelaPublicacao()" class="btn btn-primary" style="margin-top:15px;">📢 PUBLICAR OBRA</button>' : '') + 
            '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        var dono = s.usuarioLogado && v.autorId === s.usuarioLogado.id;
        var data = '';
        try { data = v.dataCriacao?.toDate?.().toLocaleDateString('pt-BR') || ''; } catch(e) {}
        
        html += '<div class="vaga-card">' +
            '<div class="vaga-header">' +
            '<div class="vaga-avatar">' + (v.autorFoto && v.autorFoto.length > 10 ? '<img src="' + v.autorFoto + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '👷') + '</div>' +
            '<div class="vaga-info"><div class="vaga-nome">' + (v.autorNome || 'Anônimo') + '</div><div class="vaga-data">' + data + '</div></div>' +
            (dono ? '<span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:12px;font-size:11px;">⭐ SUA</span>' : '') +
            '</div>' +
            '<div class="vaga-body">' +
            (v.fotoObra && v.fotoObra.length > 100 ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;">' : '') +
            '<div class="vaga-titulo">' + (v.titulo || 'Sem título') + '</div>' +
            '<div style="color:#666;font-size:13px;margin-bottom:8px;">📍 ' + (v.endereco || '') + '</div>' +
            '<div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.profissoes || 'Geral') + '</span></div>' +
            '</div>' +
            '<div class="vaga-footer">' +
            '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver Detalhes</button>' +
            (dono ? '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">🗑️ Apagar</button>' : '') +
            '</div></div>';
    }
    container.innerHTML = html;
};

App.prototype.apagarObra = function(oid, ev) {
    if (ev) ev.stopPropagation();
    if (!confirm('Apagar esta obra?')) return;
    db.collection('vagas').doc(oid).update({ ativa: false });
    this.mostrarToast('Obra apagada!', 'sucesso');
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var u = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    tela.innerHTML = 
        '<div class="screen-header"><button class="btn-voltar" onclick="window.app.voltarTela()"><i class="fas fa-arrow-left"></i></button><h2>Meu Perfil</h2></div>' +
        '<div class="profile-header-container">' +
            '<div class="profile-cover"></div>' +
            '<div class="profile-avatar-container">' +
                '<div class="profile-avatar" onclick="document.getElementById(\'inputFoto\').click()">' +
                    '<img id="perfilAvatar" src="' + (u.fotoPerfil || 'imagem/logo-sem-fundo-lpxconstrutor.png') + '" style="width:100%;height:100%;object-fit:' + (u.fotoPerfil ? 'cover' : 'contain') + ';">' +
                '</div>' +
            '</div>' +
            '<input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;">' +
        '</div>' +
        '<div class="profile-info-card">' +
            '<h2>' + (u.nome || 'Nome') + '</h2>' +
            '<p>👷 ' + (u.profissao || u.tipo || 'Profissional') + '</p>' +
            '<p>📧 ' + (u.email || '') + '</p>' +
            '<p>📱 ' + (u.celular || '') + '</p>' +
            '<p>⭐ Score: ' + (u.score || '0') + ' | 📅 Experiência: ' + (u.experiencia || '0') + ' anos</p>' +
            '<div class="stars-container">' + '⭐'.repeat(Math.min(Math.round(u.score || 0), 5)) + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:10px;padding:0 16px;">' +
            '<button onclick="window.app.abrirEditarPerfil()" class="btn btn-primary"><i class="fas fa-edit"></i> Editar Perfil</button>' +
            '<button onclick="window.app.gerarQRCodeCompartilhar()" class="btn btn-outline"><i class="fas fa-qrcode"></i> Compartilhar Perfil</button>' +
            '<button onclick="window.app.abrirMapaLocalizacao()" class="btn btn-outline"><i class="fas fa-map-marker-alt"></i> Definir Localização</button>' +
            '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\')" class="btn btn-outline"><i class="fas fa-building"></i> Minhas Obras</button>' +
            '<button onclick="window.app.mostrarTela(\'configScreen\')" class="btn btn-outline"><i class="fas fa-cog"></i> Configurações</button>' +
            '<button onclick="document.getElementById(\'modalSair\').style.display=\'flex\'" class="btn btn-danger"><i class="fas fa-sign-out-alt"></i> Sair</button>' +
        '</div>';
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s = this;
    var container = document.getElementById('buscaResultados');
    if (!container) return;
    
    var termo = (document.getElementById('buscaInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>';
    
    db.collection('usuarios').where('ativo', '==', true).get().then(function(snap) {
        var usuarios = [];
        snap.forEach(function(doc) {
            var u = doc.data();
            u.id = doc.id;
            if (u.id !== s.usuarioLogado?.id) usuarios.push(u);
        });
        
        if (termo) {
            usuarios = usuarios.filter(function(u) {
                return (u.nome || '').toLowerCase().includes(termo) ||
                       (u.profissao || '').toLowerCase().includes(termo) ||
                       (u.tipo || '').toLowerCase().includes(termo) ||
                       (u.habilidades || '').toLowerCase().includes(termo);
            });
        }
        
        if (usuarios.length === 0) {
            container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-search" style="font-size:50px;color:#ccc;"></i><p style="margin-top:16px;">Nenhum profissional encontrado</p></div>';
            return;
        }
        
        var html = '';
        for (var i = 0; i < usuarios.length; i++) {
            var u = usuarios[i];
            var foto = u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<i class="fas fa-user" style="font-size:24px;color:#1A3A5C;"></i>';
            
            html += '<div class="vaga-card" style="padding:12px;cursor:pointer;" onclick="window.app.verPerfil(\'' + u.id + '\')">' +
                '<div style="display:flex;align-items:center;gap:12px;">' +
                    '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;display:flex;align-items:center;justify-content:center;background:#f0f0f0;flex-shrink:0;">' + foto + '</div>' +
                    '<div style="flex:1;">' +
                        '<strong>' + (u.nome || 'Sem nome') + '</strong><br>' +
                        '<small style="color:#666;">' + (u.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional')) + '</small><br>' +
                        '<small style="color:#F59E0B;">⭐ ' + (u.score || '0') + ' | 📅 ' + (u.experiencia || '0') + ' anos</small>' +
                    '</div>' +
                    '<div style="display:flex;gap:4px;flex-shrink:0;">' +
                        '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + u.id + '\')" style="background:#1A3A5C;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;" title="Chat">💬</button>' +
                        '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + u.id + '\')" style="background:#10B981;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;" title="Conectar">🔗</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }
        container.innerHTML = html;
    }).catch(function(err) {
        console.error('Erro na busca:', err);
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;color:#EF4444;">Erro ao buscar. Tente novamente.</div>';
    });
};

// ===== VER PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var s = this;
    
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) { s.mostrarToast('Usuário não encontrado!', 'erro'); return; }
        
        var u = doc.data();
        u.id = doc.id;
        
        var conteudo = document.getElementById('perfilPublicoConteudo');
        if (!conteudo) return;
        
        var foto = u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<i class="fas fa-user" style="font-size:60px;color:#1A3A5C;"></i>';
        var tipo = u.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
        
        conteudo.innerHTML = 
            '<div style="text-align:center;padding:20px;">' +
                '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #F47920;display:flex;align-items:center;justify-content:center;background:#f0f0f0;">' + foto + '</div>' +
                '<h2>' + (u.nome || 'Usuário') + '</h2>' +
                '<p style="color:#666;">' + tipo + ' • ⭐ ' + (u.score || '0').toFixed(1) + '</p>' +
                '<p style="color:#666;">📅 Experiência: ' + (u.experiencia || '0') + ' anos</p>' +
                '<div style="color:#F59E0B;font-size:20px;">' + '⭐'.repeat(Math.min(Math.round(u.score || 0), 5)) + '</div>' +
            '</div>' +
            '<div class="card">' +
                '<p><i class="fas fa-envelope"></i> ' + (u.email || 'Não informado') + '</p>' +
                '<p><i class="fas fa-phone"></i> ' + (u.celular || 'Não informado') + '</p>' +
                '<p><i class="fas fa-tools"></i> Habilidades: ' + (u.habilidades || 'Não informado') + '</p>' +
                (u.localizacao ? '<p><i class="fas fa-map-marker-alt"></i> ' + u.localizacao.cidade + '/' + u.localizacao.estado + '</p>' : '') +
            '</div>' +
            '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;">' +
                '<button onclick="window.app.iniciarChat(\'' + u.id + '\')" class="btn btn-primary" style="flex:1;"><i class="fas fa-comments"></i> Chat</button>' +
                '<button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" class="btn btn-success" style="flex:1;"><i class="fas fa-link"></i> Conectar</button>' +
            '</div>';
        
        s.mostrarTela('perfilPublicoScreen');
    }).catch(function(err) {
        console.error('Erro ao carregar perfil:', err);
        s.mostrarToast('Erro ao carregar perfil', 'erro');
    });
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s = this;
    var container = document.getElementById('redeContainer');
    if (!container || !s.usuarioLogado) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando rede...</div>';
    
    db.collection('conexoes')
        .where('participantes', 'array-contains', s.usuarioLogado.id)
        .where('status', '==', 'ativo')
        .get()
        .then(function(snap) {
            var conexoes = [];
            snap.forEach(function(doc) {
                conexoes.push({ id: doc.id, data: doc.data() });
            });
            
            if (conexoes.length === 0) {
                container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:50px;">🔗</div><h3>Sua rede está vazia</h3><p>Busque profissionais e conecte-se!</p><button onclick="window.app.mostrarTela(\'buscaScreen\')" class="btn btn-primary"><i class="fas fa-search"></i> Buscar Profissionais</button></div>';
                return;
            }
            
            var html = '<div style="text-align:center;padding:10px;color:#666;">🔗 ' + conexoes.length + ' conexão(ões)</div>';
            var carregados = 0;
            
            conexoes.forEach(function(conn) {
                var amigoId = conn.data.participantes.find(function(p) { return p !== s.usuarioLogado.id; });
                if (!amigoId) return;
                
                db.collection('usuarios').doc(amigoId).get().then(function(doc) {
                    carregados++;
                    if (doc.exists) {
                        var amigo = doc.data();
                        amigo.id = doc.id;
                        var foto = amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<i class="fas fa-user"></i>';
                        
                        html += '<div class="card" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' +
                            '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;display:flex;align-items:center;justify-content:center;background:#f0f0f0;flex-shrink:0;">' + foto + '</div>' +
                            '<div style="flex:1;"><strong>' + (amigo.nome || 'Usuário') + '</strong><br><small>' + (amigo.profissao || amigo.tipo || '') + '</small></div>' +
                            '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:18px;" title="Chat">💬</button>' +
                            '</div>';
                    }
                    if (carregados >= conexoes.length) container.innerHTML = html;
                });
            });
            
            setTimeout(function() {
                if (carregados < conexoes.length) container.innerHTML = html;
            }, 3000);
        });
};

App.prototype.adicionarNaRede = function(pid) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.id === pid) return;
    
    s.mostrarToast('📩 Enviando convite...', 'info');
    
    db.collection('conexoes')
        .where('participantes', 'array-contains', s.usuarioLogado.id)
        .get()
        .then(function(snap) {
            var existe = false;
            snap.forEach(function(doc) {
                if (doc.data().participantes.indexOf(pid) >= 0) existe = true;
            });
            
            if (existe) {
                s.mostrarToast('Convite já enviado ou já são amigos!', 'erro');
                return;
            }
            
            db.collection('conexoes').add({
                participantes: [s.usuarioLogado.id, pid],
                status: 'pendente',
                solicitanteId: s.usuarioLogado.id,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function() {
                db.collection('notificacoes').add({
                    usuarioId: pid,
                    titulo: '🔗 Convite de Rede',
                    mensagem: s.usuarioLogado.nome + ' quer se conectar com você!',
                    tipo: 'convite',
                    de: s.usuarioLogado.id,
                    deNome: s.usuarioLogado.nome,
                    lida: false,
                    dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                s.mostrarToast('✅ Convite enviado!', 'sucesso');
            });
        });
};

App.prototype.aceitarConvite = function(nid, deId) {
    var s = this;
    db.collection('conexoes')
        .where('participantes', 'array-contains', s.usuarioLogado.id)
        .get()
        .then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if (d.participantes.indexOf(s.usuarioLogado.id) >= 0 && 
                    d.participantes.indexOf(deId) >= 0 && 
                    d.status === 'pendente') {
                    db.collection('conexoes').doc(doc.id).update({ status: 'ativo' });
                }
            });
        });
    db.collection('notificacoes').doc(nid).update({ lida: true });
    s.mostrarToast('✅ Conectados!', 'sucesso');
};

App.prototype.recusarConvite = function(nid) {
    db.collection('notificacoes').doc(nid).update({ lida: true });
    this.mostrarToast('Convite recusado', 'info');
};

// ===== CHAT =====
App.prototype.carregarListaConversas = function() {
    var s = this;
    s.usuarioSelecionado = null;
    
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    var chatHeader = document.getElementById('chatHeaderInfo');
    if (chatHeader) {
        chatHeader.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
            '<button onclick="window.app.voltarTela()" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
            '<h2 style="font-size:18px;">💬 Mensagens</h2></div>';
    }
    
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;color:#999;">⏳ Carregando conversas...</div>';
    
    var inputContainer = document.querySelector('#chatInputContainer') || document.querySelector('.chat-input-container');
    if (inputContainer) inputContainer.style.display = 'none';
    
    db.collection('mensagens')
        .where('participantes', 'array-contains', s.usuarioLogado.id)
        .get()
        .then(function(snap) {
            var conversas = {};
            snap.forEach(function(doc) {
                var msg = doc.data();
                var outroId = msg.participantes.find(function(p) { return p !== s.usuarioLogado.id; });
                if (!outroId) return;
                
                if (!conversas[outroId] || 
                    (msg.dataEnvio?.toDate?.() || new Date(0)) > (conversas[outroId].dataEnvio?.toDate?.() || new Date(0))) {
                    conversas[outroId] = { id: doc.id, outroId: outroId, data: msg };
                }
            });
            
            var lista = Object.values(conversas);
            lista.sort(function(a, b) {
                return (b.data.dataEnvio?.toDate?.() || 0) - (a.data.dataEnvio?.toDate?.() || 0);
            });
            
            if (lista.length === 0) {
                if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;color:#999;">Nenhuma conversa ainda.<br>Conecte-se com alguém e comece a conversar!</div>';
                return;
            }
            
            var html = '';
            var carregados = 0;
            
            lista.forEach(function(conv) {
                db.collection('usuarios').doc(conv.outroId).get().then(function(userDoc) {
                    carregados++;
                    if (userDoc.exists) {
                        var user = userDoc.data();
                        user.id = userDoc.id;
                        var foto = user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷';
                        var hora = '';
                        try { hora = conv.data.dataEnvio?.toDate?.().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) || ''; } catch(e) {}
                        
                        html += '<div class="card" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="window.app.iniciarChat(\'' + user.id + '\')">' +
                            '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #F47920;display:flex;align-items:center;justify-content:center;background:#f0f0f0;flex-shrink:0;">' + foto + '</div>' +
                            '<div style="flex:1;min-width:0;">' +
                                '<strong>' + (user.nome || 'Usuário') + '</strong><br>' +
                                '<small style="color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">' + (conv.data.conteudo || '') + '</small>' +
                            '</div>' +
                            '<small style="color:#999;flex-shrink:0;">' + hora + '</small>' +
                            '</div>';
                    }
                    if (carregados >= lista.length && chatMessages) {
                        chatMessages.innerHTML = html || '<div style="text-align:center;padding:40px;">Nenhuma conversa</div>';
                    }
                });
            });
            
            setTimeout(function() {
                if (carregados < lista.length && chatMessages) {
                    chatMessages.innerHTML = html || '<div style="text-align:center;padding:40px;">Nenhuma conversa</div>';
                }
            }, 3000);
        })
        .catch(function(err) {
            console.error('Erro ao carregar conversas:', err);
            if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:40px;color:#EF4444;">Erro ao carregar conversas</div>';
        });
};

App.prototype.iniciarChat = function(uid) {
    var s = this;
    console.log('💬 Chat com:', uid);
    
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:40px;">⏳ Carregando...</div>';
    
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (doc.exists) {
            s.usuarioSelecionado = doc.data();
            s.usuarioSelecionado.id = doc.id;
        } else {
            s.usuarioSelecionado = { id: uid, nome: 'Usuário', fotoPerfil: null };
        }
        
        var user = s.usuarioSelecionado;
        var chatHeader = document.getElementById('chatHeaderInfo');
        if (chatHeader) {
            chatHeader.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
                '<button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
                '<div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #F47920;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2);">' +
                (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷') + '</div>' +
                '<strong>' + (user.nome || 'Usuário') + '</strong></div>';
        }
        
        var inputContainer = document.querySelector('#chatInputContainer') || document.querySelector('.chat-input-container');
        if (inputContainer) inputContainer.style.display = 'flex';
        
        var user1 = s.usuarioLogado.id;
        var user2 = uid;
        
        s._listenerChat = db.collection('mensagens')
            .where('participantes', 'array-contains', user1)
            .onSnapshot(function(snap) {
                var mensagens = [];
                snap.forEach(function(doc) {
                    var msg = doc.data();
                    if (msg.participantes && msg.participantes.indexOf(user1) >= 0 && msg.participantes.indexOf(user2) >= 0) {
                        mensagens.push(msg);
                    }
                });
                
                mensagens.sort(function(a, b) {
                    return (a.dataEnvio?.toDate?.() || 0) - (b.dataEnvio?.toDate?.() || 0);
                });
                
                if (mensagens.length === 0) {
                    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Diga olá! 👋</div>';
                } else {
                    var html = '';
                    mensagens.forEach(function(msg) {
                        var meu = msg.remetenteId === user1;
                        var hora = '';
                        try { hora = msg.dataEnvio?.toDate?.().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) || ''; } catch(e) {}
                        
                        html += '<div class="message ' + (meu ? 'message-sent' : 'message-received') + '">' +
                            '<div class="message-content">' + (msg.conteudo || '') + '</div>' +
                            '<div class="message-footer"><span class="message-time">' + hora + '</span></div></div>';
                    });
                    if (chatMessages) {
                        chatMessages.innerHTML = html;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                }
            });
        
        s.mostrarTela('chatScreen');
        setTimeout(function() {
            var input = document.getElementById('chatInput');
            if (input) input.focus();
        }, 300);
    });
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioLogado || !s.usuarioSelecionado || s._enviandoMensagem) return;
    
    var texto = input.value.trim();
    if (!texto) return;
    
    s._enviandoMensagem = true;
    var btn = document.querySelector('.btn-send') || document.getElementById('btnEnviarMsg');
    if (btn) btn.disabled = true;
    input.value = '';
    
    var msg = {
        remetenteId: s.usuarioLogado.id,
        destinatarioId: s.usuarioSelecionado.id,
        participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
        conteudo: texto,
        lida: false,
        dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('mensagens').add(msg).then(function() {
        db.collection('notificacoes').add({
            usuarioId: s.usuarioSelecionado.id,
            titulo: '💬 Nova mensagem',
            mensagem: s.usuarioLogado.nome + ': ' + texto.substring(0, 80) + (texto.length > 80 ? '...' : ''),
            tipo: 'mensagem',
            de: s.usuarioLogado.id,
            deNome: s.usuarioLogado.nome,
            lida: false,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function() {});
        
        setTimeout(function() { if (input) input.focus(); }, 100);
    }).catch(function(err) {
        console.error('Erro ao enviar:', err);
        s.mostrarToast('Erro ao enviar', 'erro');
        input.value = texto;
    }).finally(function() {
        s._enviandoMensagem = false;
        if (btn) btn.disabled = false;
    });
};

// ===== NOTIFICAÇÕES =====
App.prototype.notificarTodosUsuarios = function(dados) {
    var s = this;
    
    db.collection('usuarios').where('ativo', '==', true).get()
        .then(function(snap) {
            var batch = db.batch();
            var count = 0;
            
            snap.forEach(function(doc) {
                if (doc.id !== s.usuarioLogado.id) {
                    var notifRef = db.collection('notificacoes').doc();
                    batch.set(notifRef, {
                        usuarioId: doc.id,
                        titulo: dados.titulo,
                        mensagem: dados.mensagem,
                        tipo: dados.tipo || 'info',
                        vagaId: dados.vagaId || null,
                        de: s.usuarioLogado.id,
                        deNome: s.usuarioLogado.nome,
                        lida: false,
                        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    count++;
                }
            });
            
            if (count > 0) {
                batch.commit().then(function() {
                    console.log('📢 Notificações enviadas para ' + count + ' usuários');
                });
            }
        });
};

App.prototype.iniciarListenerNotificacoes = function() {
    var s = this;
    if (s._listenerNotificacoes || !s.usuarioLogado) return;
    
    s._listenerNotificacoes = db.collection('notificacoes')
        .where('usuarioId', '==', s.usuarioLogado.id)
        .where('lida', '==', false)
        .onSnapshot(function(snap) {
            var badge = document.getElementById('badgeNotificacoes');
            if (badge) {
                var count = snap.size;
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
            
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added') {
                    var n = change.doc.data();
                    var msg = '';
                    if (n.tipo === 'mensagem') msg = '💬 ' + n.titulo;
                    else if (n.tipo === 'nova_vaga') msg = '🏗️ ' + n.titulo;
                    else if (n.tipo === 'novo_usuario') msg = '👤 ' + n.titulo;
                    else if (n.tipo === 'convite') msg = '🔗 ' + n.titulo;
                    if (msg) s.mostrarToast(msg, 'info');
                }
            });
        });
};

App.prototype.mostrarNotificacoes = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    db.collection('notificacoes')
        .where('usuarioId', '==', s.usuarioLogado.id)
        .where('lida', '==', false)
        .get()
        .then(function(snap) {
            var batch = db.batch();
            snap.forEach(function(doc) { batch.update(doc.ref, { lida: true }); });
            return batch.commit();
        })
        .then(function() {
            var badge = document.getElementById('badgeNotificacoes');
            if (badge) badge.style.display = 'none';
        });
    
    db.collection('notificacoes')
        .where('usuarioId', '==', s.usuarioLogado.id)
        .orderBy('dataCriacao', 'desc')
        .limit(100)
        .get()
        .then(function(snap) {
            var ns = [];
            snap.forEach(function(doc) { var n = doc.data(); n.id = doc.id; ns.push(n); });
            
            var modalAntigo = document.getElementById('modalNotif');
            if (modalAntigo) modalAntigo.remove();
            
            var modal = document.createElement('div');
            modal.id = 'modalNotif';
            modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
            modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
            
            var html = '<div class="modal-content" style="max-width:500px;width:95%;max-height:80vh;" onclick="event.stopPropagation()">' +
                '<div class="modal-header"><h3>🔔 Notificações</h3><button class="modal-close" onclick="document.getElementById(\'modalNotif\').remove()">✕</button></div>' +
                '<div style="max-height:60vh;overflow-y:auto;padding:10px;">';
            
            if (ns.length === 0) {
                html += '<div style="text-align:center;padding:40px;"><i class="fas fa-bell-slash" style="font-size:50px;color:#ccc;"></i><p style="margin-top:16px;">Nenhuma notificação</p></div>';
            } else {
                ns.forEach(function(n) {
                    var icone = '📢', cor = '#f0f9ff', borda = '#1A3A5C';
                    switch(n.tipo) {
                        case 'nova_vaga': icone = '🏗️'; cor = '#fef3c7'; borda = '#F59E0B'; break;
                        case 'novo_usuario': icone = '👤'; cor = '#d1fae5'; borda = '#10B981'; break;
                        case 'mensagem': icone = '💬'; cor = '#e0f2fe'; borda = '#3B82F6'; break;
                        case 'convite': icone = '🔗'; cor = '#ede9fe'; borda = '#8B5CF6'; break;
                    }
                    
                    var data = '';
                    try { if (n.dataCriacao?.toDate) data = n.dataCriacao.toDate().toLocaleString('pt-BR'); } catch(e) {}
                    
                    html += '<div style="background:' + cor + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid ' + borda + ';">' +
                        '<div style="display:flex;align-items:start;gap:8px;">' +
                        '<div style="font-size:24px;">' + icone + '</div>' +
                        '<div style="flex:1;"><strong>' + (n.titulo || '') + '</strong><br><small>' + (n.mensagem || '') + '</small><br><small style="color:#999;">' + data + '</small>';
                    
                    if (n.tipo === 'convite' && !n.lida) {
                        html += '<div style="display:flex;gap:8px;margin-top:8px;">' +
                            '<button onclick="window.app.aceitarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#10B981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;">✅ Aceitar</button>' +
                            '<button onclick="window.app.recusarConvite(\'' + n.id + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#EF4444;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;">❌ Recusar</button></div>';
                    }
                    
                    if (n.tipo === 'nova_vaga' && n.vagaId) {
                        html += '<button onclick="window.app.verDetalheObra(\'' + n.vagaId + '\');document.getElementById(\'modalNotif\').remove();" style="width:100%;margin-top:8px;background:#1A3A5C;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;">👀 Ver Obra</button>';
                    }
                    
                    if (n.tipo === 'mensagem' && n.de) {
                        html += '<button onclick="window.app.iniciarChat(\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="width:100%;margin-top:8px;background:#3B82F6;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;">💬 Responder</button>';
                    }
                    
                    html += '</div></div></div>';
                });
            }
            
            html += '</div></div>';
            modal.innerHTML = html;
            document.body.appendChild(modal);
        });
};

// ===== OBRAS / PUBLICAÇÃO =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var container = document.getElementById('listaObrasContainer');
    if (!container || !s.usuarioLogado) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
    
    db.collection('vagas')
        .where('autorId', '==', s.usuarioLogado.id)
        .where('ativa', '==', true)
        .get()
        .then(function(snap) {
            var obras = [];
            snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; obras.push(v); });
            
            var total = document.getElementById('totalObras');
            if (total) total.textContent = obras.length;
            
            if (obras.length === 0) {
                container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-building" style="font-size:50px;color:#ccc;"></i><h3>Nenhuma obra</h3><button onclick="window.app.novaObra()" class="btn btn-primary"><i class="fas fa-plus"></i> Publicar Obra</button></div>';
                return;
            }
            
            var html = '';
            obras.forEach(function(v) {
                html += '<div class="vaga-card">' +
                    (v.fotoObra ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:150px;object-fit:cover;">' : '') +
                    '<div style="padding:15px;"><strong>' + (v.titulo || 'Sem título') + '</strong><br>' +
                    '<small>📍 ' + (v.endereco || '') + '</small><br>' +
                    '<span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span> ' +
                    '<span class="vaga-tag">👷 ' + (v.profissoes || 'Geral') + '</span>' +
                    '<div style="margin-top:10px;display:flex;gap:8px;">' +
                    '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver</button>' +
                    '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">Apagar</button></div></div></div>';
            });
            container.innerHTML = html;
        });
};

App.prototype.abrirTelaPublicacao = function() {
    var s = this;
    s.mostrarTela('publicarVagaScreen');
    s.vagaFotoBase64 = null;
    setTimeout(function() {
        var foto = document.getElementById('vagaFotoPreview');
        if (foto) foto.src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
        ['vagaTitulo','vagaDescricao','vagaEndereco','vagaValorHora'].forEach(function(id) {
            var el = document.getElementById(id); if (el) el.value = '';
        });
    }, 100);
};

App.prototype.previewFotoObra = function(e) {
    var f = e.target.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
        var preview = document.getElementById('vagaFotoPreview');
        if (preview) { preview.src = ev.target.result; preview.style.objectFit = 'cover'; }
        window.app._app.vagaFotoBase64 = ev.target.result;
    };
    reader.readAsDataURL(f);
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    if (s._publicando) return;
    
    var titulo = document.getElementById('vagaTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('vagaEndereco')?.value?.trim() || '';
    var valor = document.getElementById('vagaValorHora')?.value || '';
    var descricao = document.getElementById('vagaDescricao')?.value?.trim() || '';
    
    var profissoes = [];
    document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { profissoes.push(cb.value); });
    var profStr = profissoes.length > 0 ? profissoes.join(', ') : 'Geral';
    
    if (!titulo || !endereco || !valor) {
        s.mostrarToast('Preencha título, endereço e valor!', 'erro');
        return;
    }
    
    s._publicando = true;
    var btn = document.querySelector('#publicarVagaScreen .btn-primary');
    if (btn) { btn.textContent = '⏳...'; btn.disabled = true; }
    
    var vaga = {
        titulo: titulo,
        endereco: endereco,
        profissoes: profStr,
        valorHora: parseFloat(valor) || 0,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || '',
        status: 'disponivel',
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome,
        autorFoto: s.usuarioLogado.fotoPerfil || null,
        interessados: [],
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('vagas').add(vaga).then(function(docRef) {
        console.log('✅ Vaga publicada:', docRef.id);
        
        s.notificarTodosUsuarios({
            titulo: '📢 Nova Obra Publicada!',
            mensagem: s.usuarioLogado.nome + ' publicou: ' + titulo + ' - R$' + valor + '/h',
            tipo: 'nova_vaga',
            vagaId: docRef.id
        });
        
        s.mostrarToast('✅ Obra publicada!', 'sucesso');
        s.vagaFotoBase64 = null;
        s._publicando = false;
        if (btn) { btn.textContent = 'PUBLICAR'; btn.disabled = false; }
        s.mostrarTela('homeScreen');
    }).catch(function(err) {
        console.error('Erro:', err);
        s.mostrarToast('Erro ao publicar', 'erro');
        s._publicando = false;
        if (btn) { btn.textContent = 'PUBLICAR'; btn.disabled = false; }
    });
};

App.prototype.verDetalheObra = function(oid) {
    db.collection('vagas').doc(oid).get().then(function(doc) {
        if (!doc.exists) return;
        var v = doc.data();
        
        var modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
        
        modal.innerHTML = '<div class="modal-content" style="max-width:500px;width:95%;" onclick="event.stopPropagation()">' +
            (v.fotoObra ? '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;border-radius:8px;margin-bottom:12px;">' : '') +
            '<h2>' + (v.titulo || '') + '</h2>' +
            '<p><i class="fas fa-map-marker-alt"></i> ' + (v.endereco || '') + '</p>' +
            '<p><i class="fas fa-users"></i> ' + (v.profissoes || '') + '</p>' +
            '<p><i class="fas fa-money-bill-wave"></i> R$' + (v.valorHora || '0') + '/h</p>' +
            '<p>' + (v.descricao || '') + '</p>' +
            '<button onclick="this.closest(\'.modal-content\').parentElement.remove()" class="btn btn-outline" style="width:100%;">Fechar</button></div>';
        
        document.body.appendChild(modal);
    });
};

// ===== UPLOAD / EDITAR PERFIL =====
App.prototype.uploadFoto = function(e) {
    var s = this;
    var f = e.target.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
        s.usuarioLogado.fotoPerfil = ev.target.result;
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: ev.target.result });
        s.mostrarToast('📷 Foto atualizada!', 'sucesso');
        s.carregarMeuPerfil();
    };
    reader.readAsDataURL(f);
};

App.prototype.abrirEditarPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var u = s.usuarioLogado;
    
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    
    modal.innerHTML = '<div class="modal-content" onclick="event.stopPropagation()">' +
        '<div class="modal-header"><h3>✏️ Editar Perfil</h3><button class="modal-close" onclick="this.closest(\'.modal-content\').parentElement.remove()">✕</button></div>' +
        '<div class="modal-body">' +
        '<div class="input-group"><label>Nome</label><input id="editNome" value="' + (u.nome || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Celular</label><input id="editCelular" value="' + (u.celular || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Profissão</label><input id="editProfissao" value="' + (u.profissao || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Experiência (anos)</label><input id="editExperiencia" type="number" value="' + (u.experiencia || '0') + '" class="input-field"></div>' +
        '<button onclick="window.app.salvarPerfil()" class="btn btn-success" style="width:100%;">💾 SALVAR</button>' +
        '<button onclick="this.closest(\'.modal-content\').parentElement.remove()" class="btn btn-danger" style="width:100%;margin-top:8px;">CANCELAR</button></div></div>';
    
    document.body.appendChild(modal);
};

App.prototype.salvarPerfil = function() {
    var s = this;
    var d = {
        nome: document.getElementById('editNome')?.value?.trim() || s.usuarioLogado.nome,
        celular: document.getElementById('editCelular')?.value?.trim() || '',
        profissao: document.getElementById('editProfissao')?.value?.trim() || '',
        experiencia: document.getElementById('editExperiencia')?.value?.trim() || '0'
    };
    
    if (!d.nome) { s.mostrarToast('Nome obrigatório!', 'erro'); return; }
    
    Object.assign(s.usuarioLogado, d);
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    db.collection('usuarios').doc(s.usuarioLogado.id).update(d);
    
    var modal = document.querySelector('.modal-content')?.parentElement;
    if (modal) modal.remove();
    
    s.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== CONFIGURAÇÕES =====
App.prototype.carregarConfigScreen = function() {
    var s = this;
    var tela = document.getElementById('configScreen');
    if (!tela) return;
    
    var temaClaro = s.temaAtual === 'claro';
    
    tela.innerHTML = 
        '<div class="screen-header"><button class="btn-voltar" onclick="window.app.voltarTela()"><i class="fas fa-arrow-left"></i></button><h2>⚙️ Configurações</h2></div>' +
        '<div style="padding:16px;">' +
            '<div class="card"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;margin-top:10px;">' +
                '<button id="temaClaroBtn" onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid ' + (temaClaro ? '#1A3A5C' : '#e5e7eb') + ';background:' + (temaClaro ? '#1A3A5C' : 'white') + ';color:' + (temaClaro ? 'white' : '#1A3A5C') + ';cursor:pointer;">☀️ Claro</button>' +
                '<button id="temaEscuroBtn" onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid ' + (temaClaro ? '#e5e7eb' : '#1A3A5C') + ';background:' + (temaClaro ? 'white' : '#1A3A5C') + ';color:' + (temaClaro ? '#1A3A5C' : 'white') + ';cursor:pointer;">🌙 Escuro</button>' +
            '</div></div>' +
            '<div class="card"><h3>📄 Documentos</h3>' +
                '<a href="termos.html" target="_blank" style="display:block;padding:12px;background:#f9fafb;border-radius:8px;margin-bottom:5px;text-decoration:none;color:inherit;">📄 Termos de Uso</a>' +
                '<a href="privacidade.html" target="_blank" style="display:block;padding:12px;background:#f9fafb;border-radius:8px;margin-bottom:5px;text-decoration:none;color:inherit;">🔒 Política de Privacidade</a>' +
                '<a href="excluir-conta.html" target="_blank" style="display:block;padding:12px;background:#f9fafb;border-radius:8px;text-decoration:none;color:inherit;">🗑️ Excluir Conta</a>' +
            '</div>' +
            '<div class="card"><p style="text-align:center;color:#6b7280;font-size:12px;">LPXCONSTRUTOR v' + APP_VERSION + '<br>© 2024 Todos os direitos reservados</p></div>' +
        '</div>';
};

App.prototype.selecionarTema = function(tema) {
    this.temaAtual = tema;
    localStorage.setItem('tema', tema);
    if (tema === 'escuro') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    this.mostrarToast('🎨 Tema alterado!', 'sucesso');
    this.carregarConfigScreen();
};

// ===== OUTROS MÉTODOS =====
App.prototype.proximaEtapa = function(e) {
    document.getElementById('etapa1').style.display = e === 1 ? 'block' : 'none';
    document.getElementById('etapa2').style.display = e === 2 ? 'block' : 'none';
};

App.prototype.toggleProfissao = function() {
    var tipo = document.getElementById('cadTipo')?.value;
    var grupo = document.getElementById('grupoProfissao');
    if (grupo) grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
};

App.prototype.solicitarCodigo = function() {
    var email = document.getElementById('recEmail')?.value?.trim() || '';
    if (!email) { this.mostrarToast('Digite seu email!', 'erro'); return; }
    firebase.auth().sendPasswordResetEmail(email)
        .then(function() { window.app._app.mostrarToast('📧 Email enviado!', 'sucesso'); })
        .catch(function() { window.app._app.mostrarToast('Email não encontrado!', 'erro'); });
};

App.prototype.verificarCodigo = function() {
    this.mostrarToast('Use o link enviado por email!', 'info');
};

App.prototype.voltarPasso1 = function() {
    document.getElementById('recPasso1').style.display = 'block';
    document.getElementById('recPasso2').style.display = 'none';
};

App.prototype.gerarQRCodeCompartilhar = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var u = s.usuarioLogado;
    var url = window.location.origin + window.location.pathname + '?perfil=' + u.id;
    
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    
    modal.innerHTML = '<div class="modal-content" style="text-align:center;padding:30px;" onclick="event.stopPropagation()">' +
        '<h3>📱 Compartilhar Perfil</h3>' +
        '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:10px auto;border:3px solid #F47920;">' + (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '👷') + '</div>' +
        '<p><strong>' + u.nome + '</strong></p>' +
        '<div id="qrcodeContainer" style="display:flex;justify-content:center;margin:15px 0;"></div>' +
        '<p style="font-size:11px;color:#666;word-break:break-all;">' + url + '</p>' +
        '<button onclick="this.closest(\'.modal-content\').parentElement.remove()" class="btn btn-primary" style="width:100%;">FECHAR</button></div>';
    
    document.body.appendChild(modal);
    
    setTimeout(function() {
        var c = document.getElementById('qrcodeContainer');
        if (c && typeof QRCode !== 'undefined') {
            c.innerHTML = '';
            new QRCode(c, { text: url, width: 180, height: 180, colorDark: '#1A3A5C', colorLight: '#ffffff' });
        }
    }, 300);
};

App.prototype.abrirMapaLocalizacao = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var u = s.usuarioLogado;
    var estados = {'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará','DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins'};
    
    var optEstados = '';
    for (var sigla in estados) {
        optEstados += '<option value="' + sigla + '"' + (u.localizacao?.estado === sigla ? ' selected' : '') + '>' + estados[sigla] + '</option>';
    }
    
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    
    modal.innerHTML = '<div class="modal-content" onclick="event.stopPropagation()">' +
        '<div class="modal-header"><h2>📍 Localização</h2><button class="modal-close" onclick="this.closest(\'.modal-content\').parentElement.remove()">✕</button></div>' +
        '<div class="input-group"><label>Estado</label><select id="locEstado" onchange="window.app.atualizarCidades()" class="input-field"><option value="">Selecione...</option>' + optEstados + '</select></div>' +
        '<div class="input-group"><label>Cidade</label><select id="locCidade" onchange="window.app.atualizarBairros()" class="input-field"><option value="">Selecione...</option></select></div>' +
        '<div class="input-group"><label>Bairro</label><select id="locBairro" class="input-field"><option value="">Selecione...</option></select></div>' +
        '<button onclick="window.app.salvarLocalizacao()" class="btn btn-success" style="width:100%;margin-top:10px;">💾 SALVAR</button></div>';
    
    document.body.appendChild(modal);
    
    if (u.localizacao?.estado) {
        setTimeout(function() { window.app.atualizarCidades(u.localizacao.cidade); }, 300);
        if (u.localizacao.bairro) {
            setTimeout(function() { window.app.atualizarBairros(u.localizacao.bairro); }, 600);
        }
    }
};

App.prototype.getTodasCidades = function() {
    return {
        'SP':['São Paulo','Campinas','Santos'],'RJ':['Rio de Janeiro','Niterói'],'MG':['Belo Horizonte','Uberlândia'],
        'BA':['Salvador','Feira de Santana'],'PR':['Curitiba','Londrina'],'RS':['Porto Alegre','Caxias do Sul'],
        'PE':['Recife','Jaboatão'],'CE':['Fortaleza','Caucaia'],'SC':['Florianópolis','Joinville'],
        'GO':['Goiânia','Aparecida'],'DF':['Brasília','Taguatinga']
    };
};

App.prototype.getBairrosPorCidade = function(c) {
    var b = {
        'São Paulo':['Centro','Pinheiros','Vila Mariana'],'Rio de Janeiro':['Copacabana','Ipanema','Leblon'],
        'Belo Horizonte':['Savassi','Lourdes'],'Florianópolis':['Centro','Lagoa'],'Curitiba':['Centro','Batel'],
        'Porto Alegre':['Moinhos','Bela Vista'],'Salvador':['Barra','Ondina'],'Recife':['Boa Viagem'],
        'Fortaleza':['Meireles','Aldeota'],'Brasília':['Asa Sul','Asa Norte']
    };
    return b[c] || ['Centro'];
};

App.prototype.atualizarCidades = function(sel) {
    var ee = document.getElementById('locEstado'), ce = document.getElementById('locCidade');
    if (!ee || !ce) return;
    var e = ee.value, cs = this.getTodasCidades();
    ce.innerHTML = '<option value="">Selecione...</option>';
    if (e && cs[e]) cs[e].forEach(function(c) {
        ce.innerHTML += '<option value="' + c + '"' + (sel === c ? ' selected' : '') + '>' + c + '</option>';
    });
    var be = document.getElementById('locBairro');
    if (be) be.innerHTML = '<option value="">Selecione...</option>';
};

App.prototype.atualizarBairros = function(sel) {
    var ce = document.getElementById('locCidade'), be = document.getElementById('locBairro');
    if (!ce || !be) return;
    var c = ce.value, bs = this.getBairrosPorCidade(c);
    be.innerHTML = '<option value="">Selecione...</option>';
    if (bs) bs.forEach(function(b) {
        be.innerHTML += '<option value="' + b + '"' + (sel === b ? ' selected' : '') + '>' + b + '</option>';
    });
};

App.prototype.salvarLocalizacao = function() {
    var s = this;
    var es = document.getElementById('locEstado')?.value || '';
    var ci = document.getElementById('locCidade')?.value || '';
    var ba = document.getElementById('locBairro')?.value || '';
    
    if (!es || !ci) { s.mostrarToast('Selecione estado e cidade!', 'erro'); return; }
    
    s.usuarioLogado.localizacao = { estado: es, cidade: ci, bairro: ba };
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    db.collection('usuarios').doc(s.usuarioLogado.id).update({ localizacao: s.usuarioLogado.localizacao });
    
    var modal = document.querySelector('.modal-content')?.parentElement;
    if (modal) modal.remove();
    
    s.mostrarToast('📍 Localização salva!', 'sucesso');
};

// ===== LIMPEZA =====
App.prototype.pararListeners = function() {
    if (this._listenerFeed) { this._listenerFeed(); this._listenerFeed = null; }
    if (this._listenerChat) { this._listenerChat(); this._listenerChat = null; }
    if (this._listenerNotificacoes) { this._listenerNotificacoes(); this._listenerNotificacoes = null; }
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = mensagem;
    toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1A3A5C';
    toast.style.color = 'white';
    toast.style.display = 'block';
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== INICIALIZAÇÃO FINAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ LPXCONSTRUTOR v' + APP_VERSION + ' - COMPLETO');
    window.app._app = new App();
});
