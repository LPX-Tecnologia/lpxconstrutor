// ==========================================================
// ===== LPXCONSTRUTOR - CORRIGIDO COM FEED INSTANTÂNEO =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

// Interface global de funções
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
window.app.novaObra = function() { if(window.app._app) window.app._app.abrirTelaPublicacao(); };
window.app.fecharModalSair = function() { var m = document.getElementById('modalSair'); if(m) m.style.display = 'none'; };
window.app.confirmarSair = function() { if(window.app._app) window.app._app.sair(); };
window.app.proximaEtapa = function(e) { if(window.app._app) window.app._app.proximaEtapa(e); };
window.app.toggleProfissao = function() { if(window.app._app) window.app._app.toggleProfissao(); };

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
    this._feedIniciado = false;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR - FEED INSTANTÂNEO ATIVADO');
    window.app._app = s;
    
    var nav = document.getElementById('bottomNav'); 
    if (nav) nav.style.display = 'none';
    
    if (s.temaAtual === 'escuro') {
        document.body.classList.add('dark-theme');
    }
    
    // Remove splash antigo
    var splashAntigo = document.getElementById('splashScreen'); 
    if (splashAntigo && splashAntigo.parentNode) {
        splashAntigo.parentNode.removeChild(splashAntigo);
    }
    
    // Cria splash screen
    var splash = document.createElement('div'); 
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    // Verifica autenticação Firebase
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (typeof db !== 'undefined') {
                    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            s.usuarioLogado = doc.data();
                            s.usuarioLogado.id = doc.id;
                            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                            s.mostrarTela('homeScreen');
                            s.iniciarListenerNotificacoes();
                            // Inicia o listener do feed automaticamente
                            s.iniciarFeedListener();
                        }
                    }).catch(function(err) {
                        console.error('Erro ao carregar usuário:', err);
                    });
                }
            } else {
                s.usuarioLogado = null;
                localStorage.removeItem('usuarioLPX');
                s.pararFeedListener();
                s.mostrarTela('loginScreen');
            }
            // Remove splash
            setTimeout(function() {
                splash.style.opacity = '0';
                setTimeout(function() {
                    if (splash.parentNode) splash.parentNode.removeChild(splash);
                }, 500);
            }, 2000);
        });
    } else {
        // Fallback localStorage
        var salvo = localStorage.getItem('usuarioLPX'); 
        if (salvo) { 
            try { 
                s.usuarioLogado = JSON.parse(salvo); 
            } catch(e) {
                console.error('Erro ao parse usuário:', e);
            }
        }
        setTimeout(function() {
            splash.style.opacity = '0';
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
                if (s.usuarioLogado) {
                    s.mostrarTela('homeScreen');
                    s.iniciarFeedListener();
                } else {
                    s.mostrarTela('loginScreen');
                }
            }, 500);
        }, 2000);
    }
};

// ===== LISTENER DO FEED (INSTANTÂNEO) =====
App.prototype.iniciarFeedListener = function() {
    var s = this;
    
    // Não inicia se já estiver ativo
    if (s._feedIniciado) return;
    
    if (typeof db === 'undefined') {
        console.warn('Firebase não disponível');
        return;
    }
    
    console.log('🔥 INICIANDO LISTENER DO FEED EM TEMPO REAL');
    
    // Para listener anterior se existir
    if (s._listenerFeed) {
        s._listenerFeed();
    }
    
    s._listenerFeed = db.collection('vagas')
        .where('ativa', '==', true)
        .orderBy('dataCriacao', 'desc')
        .onSnapshot(function(snap) {
            console.log('📢 FEED ATUALIZADO - Documentos:', snap.size);
            
            var vagas = [];
            snap.forEach(function(doc) {
                var vaga = doc.data();
                vaga.id = doc.id;
                vagas.push(vaga);
            });
            
            // Renderiza o feed com os dados atualizados
            var container = document.getElementById('feedContainer');
            if (container && s.tabAtual === 'feed') {
                s.renderizarFeed(container, vagas);
                console.log('✅ Feed renderizado com', vagas.length, 'vagas');
            }
            
            // Notifica nova vaga adicionada
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added' && s._feedIniciado) {
                    var vaga = change.doc.data();
                    console.log('🆕 NOVA VAGA:', vaga.titulo);
                    s.mostrarToast('🆕 Nova obra publicada!', 'info');
                }
            });
        }, function(error) {
            console.error('❌ Erro no listener do feed:', error);
            s.mostrarToast('Erro ao carregar feed', 'erro');
        });
    
    s._feedIniciado = true;
};

App.prototype.pararFeedListener = function() {
    if (this._listenerFeed) {
        console.log('🛑 Parando listener do feed');
        this._listenerFeed();
        this._listenerFeed = null;
    }
    this._feedIniciado = false;
};

// ===== NOTIFICAÇÕES =====
App.prototype.iniciarListenerNotificacoes = function() { 
    var s = this; 
    if (typeof db === 'undefined' || !s.usuarioLogado) return; 
    
    if (s._listenerNotificacoes) s._listenerNotificacoes(); 
    
    s._listenerNotificacoes = db.collection('notificacoes')
        .where('usuarioId', '==', s.usuarioLogado.id)
        .where('lida', '==', false)
        .onSnapshot(function(snap) { 
            var c = snap.size; 
            var b = document.getElementById('badgeNotificacoes'); 
            if (b) { 
                b.textContent = c > 99 ? '99+' : c; 
                b.style.display = c > 0 ? 'flex' : 'none'; 
            } 
            if (c > 0) { 
                snap.docChanges().forEach(function(ch) { 
                    if (ch.type === 'added') { 
                        s.mostrarToast('🔔 ' + ch.doc.data().titulo, 'info'); 
                    } 
                }); 
            } 
        }, function(error) {
            console.error('Erro no listener de notificações:', error);
        });
};

// ===== NAVEGAÇÃO DE TELAS =====
App.prototype.mostrarTela = function(id) { 
    var s = this; 
    
    // Salva histórico
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') {
        s.historicoTelas.push(s.telaAtual);
    }
    
    // Esconde todas as telas
    var telas = document.querySelectorAll('.screen'); 
    for (var i = 0; i < telas.length; i++) { 
        telas[i].classList.remove('active'); 
        telas[i].style.display = 'none'; 
    } 
    
    // Mostra tela desejada
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
    
    // Controle da navegação inferior
    var nav = document.getElementById('bottomNav'); 
    if (nav) { 
        var telasSemNav = ['loginScreen', 'cadastroScreen', 'recuperarSenhaScreen']; 
        nav.style.display = telasSemNav.indexOf(id) >= 0 ? 'none' : 'flex'; 
        
        // Atualiza item ativo na navegação
        var navItems = nav.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            var screenAttr = item.getAttribute('data-screen');
            if (screenAttr === id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Carrega conteúdo específico
    if (id === 'homeScreen') {
        s.carregarHome();
        // Garante que o listener do feed está ativo
        if (!s._feedIniciado) {
            s.iniciarFeedListener();
        }
    }
    if (id === 'meuPerfilScreen') s.carregarMeuPerfil(); 
    if (id === 'buscaScreen') s.buscarProfissionais(); 
    if (id === 'minhasObrasScreen') s.carregarMinhasObras(); 
    if (id === 'chatScreen') s.carregarListaConversas(); 
    if (id === 'configScreen') s.carregarConfigScreen(); 
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
    var e = (document.getElementById('loginEmail') || {}).value || '';
    var p = (document.getElementById('loginSenha') || {}).value || ''; 
    
    if (!e || !p) { 
        s.mostrarToast('Preencha todos os campos!', 'erro'); 
        return; 
    } 
    
    s.mostrarToast('Entrando...', 'info'); 
    
    if (typeof firebase !== 'undefined' && firebase.auth) { 
        firebase.auth().signInWithEmailAndPassword(e, p)
            .then(function(u) { 
                if (typeof db !== 'undefined') { 
                    db.collection('usuarios').doc(u.user.uid).get()
                        .then(function(doc) { 
                            if (doc.exists) { 
                                s.usuarioLogado = doc.data(); 
                                s.usuarioLogado.id = doc.id; 
                                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); 
                                s.historicoTelas = []; 
                                s.mostrarToast('Bem-vindo, ' + s.usuarioLogado.nome + '!', 'sucesso'); 
                                s.mostrarTela('homeScreen'); 
                                s.iniciarListenerNotificacoes(); 
                                s.iniciarFeedListener();
                            } 
                        })
                        .catch(function(err) {
                            console.error('Erro ao carregar usuário:', err);
                            s.mostrarToast('Erro ao carregar perfil', 'erro');
                        });
                } 
            })
            .catch(function(err) {
                console.error('Erro de login:', err);
                var mensagem = 'Email ou senha incorretos!';
                if (err.code === 'auth/user-not-found') mensagem = 'Usuário não encontrado!';
                if (err.code === 'auth/wrong-password') mensagem = 'Senha incorreta!';
                if (err.code === 'auth/invalid-email') mensagem = 'Email inválido!';
                s.mostrarToast(mensagem, 'erro'); 
            }); 
    }
};

// ===== CADASTRO =====
App.prototype.cadastrar = function() { 
    var s = this; 
    var d = { 
        nome: (document.getElementById('cadNome') || {}).value || '', 
        email: (document.getElementById('cadEmail') || {}).value || '', 
        senha: (document.getElementById('cadSenha') || {}).value || '', 
        tipo: (document.getElementById('cadTipo') || {}).value || 'profissional', 
        celular: (document.getElementById('cadCelular') || {}).value || '', 
        cpf: (document.getElementById('cadCPF') || {}).value || '',
        profissao: (document.getElementById('cadProfissao') || {}).value || '', 
        experiencia: (document.getElementById('cadExperiencia') || {}).value || '0', 
        habilidades: (document.getElementById('cadHabilidades') || {}).value || '',
        score: 0, 
        fotoPerfil: null, 
        localizacao: null, 
        dataCadastro: firebase.firestore?.FieldValue?.serverTimestamp() || new Date().toISOString() 
    }; 
    
    if (!d.nome || !d.email || !d.senha) { 
        s.mostrarToast('Preencha todos os campos obrigatórios!', 'erro'); 
        return; 
    } 
    
    s.mostrarToast('Cadastrando...', 'info'); 
    
    if (typeof firebase !== 'undefined' && firebase.auth) { 
        firebase.auth().createUserWithEmailAndPassword(d.email, d.senha)
            .then(function(u) { 
                d.id = u.user.uid; 
                if (typeof db !== 'undefined') { 
                    db.collection('usuarios').doc(d.id).set(d)
                        .then(function() { 
                            s.usuarioLogado = d; 
                            localStorage.setItem('usuarioLPX', JSON.stringify(d)); 
                            s.historicoTelas = []; 
                            s.mostrarToast('Cadastro realizado!', 'sucesso'); 
                            s.mostrarTela('homeScreen'); 
                            s.iniciarFeedListener();
                        })
                        .catch(function(err) {
                            console.error('Erro ao salvar usuário:', err);
                            s.mostrarToast('Erro ao salvar dados', 'erro');
                        }); 
                } 
            })
            .catch(function(err) { 
                console.error('Erro de cadastro:', err);
                s.mostrarToast(
                    err.code === 'auth/email-already-in-use' ? 'Email já cadastrado!' : 'Erro ao cadastrar', 
                    'erro'
                ); 
            }); 
    }
};

// ===== LOGOUT =====
App.prototype.sair = function() { 
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut(); 
    }
    this.pararFeedListener();
    this.usuarioLogado = null; 
    localStorage.removeItem('usuarioLPX'); 
    this.historicoTelas = []; 
    this.mostrarTela('loginScreen'); 
    var modal = document.getElementById('modalSair');
    if (modal) modal.style.display = 'none';
};

// ===== HOME =====
App.prototype.carregarHome = function() { 
    var s = this; 
    if (!s.usuarioLogado) { 
        s.mostrarTela('loginScreen'); 
        return; 
    } 
    
    var u = s.usuarioLogado; 
    var h = document.getElementById('homeScreen'); 
    if (!h) return; 
    
    var hr = new Date().getHours();
    var sd = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite'; 
    
    // Atualiza saudação
    var saudacao = document.getElementById('saudacao');
    if (saudacao) saudacao.textContent = '👋 ' + sd + ', ' + u.nome + '!';
    
    var resumo = document.getElementById('resumoTexto');
    if (resumo) {
        resumo.textContent = u.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
    }
    
    // Garante que o feed será carregado
    if (s.tabAtual === 'feed') {
        s.carregarFeed();
    }
    
    // Configura botão publicar para empreiteiros
    var btnPublicar = document.getElementById('btnPublicar');
    var btnObras = document.getElementById('btnObras');
    
    if (btnPublicar && btnObras) {
        if (u.tipo === 'empreiteiro') {
            btnPublicar.style.display = 'flex';
            btnObras.style.display = 'flex';
        } else {
            btnPublicar.style.display = 'none';
            btnObras.style.display = 'none';
        }
    }
};

// ===== MUDAR TAB (FEED / REDE) =====
App.prototype.mudarTab = function(t) { 
    this.tabAtual = t; 
    
    // Atualiza botões
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        if ((t === 'feed' && tab.textContent.includes('Feed')) || 
            (t === 'rede' && tab.textContent.includes('Rede'))) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Mostra/esconde containers
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer'); 
    
    if (fc) fc.style.display = t === 'feed' ? 'flex' : 'none'; 
    if (rc) rc.style.display = t === 'rede' ? 'flex' : 'none'; 
    
    // Carrega conteúdo
    if (t === 'feed') this.carregarFeed(); 
    if (t === 'rede') this.carregarRede(); 
};

// ===== FEED =====
App.prototype.carregarFeed = function() { 
    var s = this;
    var c = document.getElementById('feedContainer'); 
    if (!c) return; 
    
    // Se o listener já está ativo, apenas aguarda a próxima atualização
    if (s._feedIniciado) {
        c.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Atualizando feed...</div>';
        return;
    }
    
    c.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>'; 
    
    if (typeof db !== 'undefined') { 
        // Inicia o listener se ainda não foi iniciado
        s.iniciarFeedListener();
    } else {
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;"><div style="font-size:50px;">⚠️</div><h3>Firebase não conectado</h3></div>';
    }
};

App.prototype.renderizarFeed = function(c, vv) { 
    var s = this; 
    
    if (vv.length === 0) { 
        c.innerHTML = '<div style="text-align:center;padding:30px;background:white;border-radius:10px;">' +
            '<div style="font-size:50px;">🏗️</div>' +
            '<h3>Nenhuma obra publicada</h3>' +
            '<p style="color:#666;font-size:14px;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                '<button onclick="window.app.abrirTelaPublicacao()" style="background:#f59e0b;color:white;border:none;padding:12px 24px;border-radius:20px;cursor:pointer;margin-top:15px;font-weight:bold;">📢 PUBLICAR OBRA</button>' : 
                '') + 
            '</div>'; 
        return; 
    } 
    
    var html = ''; 
    for (var i = 0; i < vv.length; i++) { 
        var v = vv[i];
        var dq = s.usuarioLogado && v.autorId === s.usuarioLogado.id; 
        
        html += '<div class="vaga-card">'; 
        
        // Cabeçalho da vaga
        html += '<div class="vaga-header">';
        html += '<div class="vaga-avatar">';
        if (v.autorFoto && v.autorFoto.length > 10) {
            html += '<img src="' + v.autorFoto + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
        } else {
            html += '👷';
        }
        html += '</div>';
        html += '<div class="vaga-info">';
        html += '<div class="vaga-nome">' + (v.autorNome || 'Anônimo') + '</div>';
        
        // Formata data
        var data = '';
        try {
            if (v.dataCriacao && v.dataCriacao.toDate) {
                data = v.dataCriacao.toDate().toLocaleDateString('pt-BR');
            } else if (v.dataCriacao) {
                data = new Date(v.dataCriacao).toLocaleDateString('pt-BR');
            }
        } catch(e) {
            data = '';
        }
        html += '<div class="vaga-data">' + data + '</div>';
        html += '</div>';
        
        if (dq) {
            html += '<span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:bold;">⭐ SUA</span>';
        }
        html += '</div>'; // Fim vaga-header
        
        // Corpo da vaga
        html += '<div class="vaga-body">';
        
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;">';
        }
        
        html += '<div style="cursor:pointer;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        html += '<div class="vaga-titulo">' + (v.titulo || 'Sem título') + '</div>';
        html += '<div style="color:#666;font-size:13px;margin-bottom:8px;">📍 ' + (v.endereco || 'Endereço não informado') + '</div>';
        html += '<div class="vaga-tags">';
        html += '<span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span>';
        html += '<span class="vaga-tag">👷 ' + (v.profissoes || 'Geral') + '</span>';
        html += '</div>';
        html += '</div>';
        
        html += '</div>'; // Fim vaga-body
        
        // Rodapé da vaga
        html += '<div class="vaga-footer">';
        html += '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver Detalhes</button>';
        if (dq) {
            html += '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">🗑️ Apagar</button>';
        }
        html += '</div>';
        
        html += '</div>'; // Fim vaga-card
    } 
    
    c.innerHTML = html; 
};

App.prototype.apagarObra = function(oid, ev) { 
    if (ev) ev.stopPropagation(); 
    if (!confirm('Tem certeza que deseja apagar esta obra?')) return; 
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).update({ ativa: false })
            .then(function() {
                console.log('Obra apagada:', oid);
            })
            .catch(function(err) {
                console.error('Erro ao apagar obra:', err);
            });
    }
    this.mostrarToast('Obra apagada!', 'sucesso'); 
};

// ===== PUBLICAR VAGA =====
App.prototype.abrirTelaPublicacao = function() { 
    this.mostrarTela('publicarVagaScreen');
    this.vagaFotoBase64 = null;
    
    // Limpa formulário
    setTimeout(function() {
        var foto = document.getElementById('vagaFotoPreview');
        if (foto) foto.src = 'imagem/logo-sem-fundo-lpxconstrutor.png';
        
        var campos = ['vagaTitulo', 'vagaDescricao', 'vagaEndereco', 'vagaValorHora'];
        campos.forEach(function(id) {
            var campo = document.getElementById(id);
            if (campo) campo.value = '';
        });
        
        var checkboxes = document.querySelectorAll('#profissoesCheckboxes input[type="checkbox"]');
        checkboxes.forEach(function(cb) { cb.checked = false; });
    }, 100);
};

App.prototype.previewFotoObra = function(e) { 
    var f = e.target.files[0]; 
    if (!f) return; 
    
    var r = new FileReader(); 
    var app = window.app._app || this;
    
    r.onload = function(ev) { 
        var p = document.getElementById('vagaFotoPreview'); 
        if (p) { 
            p.src = ev.target.result; 
            p.style.objectFit = 'cover'; 
        } 
        app.vagaFotoBase64 = ev.target.result; 
    }; 
    r.readAsDataURL(f); 
};

App.prototype.publicarVagaApp = function() { 
    var s = this; 
    
    var titulo = (document.getElementById('vagaTitulo') || {}).value || '';
    var endereco = (document.getElementById('vagaEndereco') || {}).value || '';
    var valor = (document.getElementById('vagaValorHora') || {}).value || '';
    var descricao = (document.getElementById('vagaDescricao') || {}).value || ''; 
    
    // Profissões selecionadas
    var pf = []; 
    var ck = document.querySelectorAll('#profissoesCheckboxes input:checked'); 
    for (var i = 0; i < ck.length; i++) {
        pf.push(ck[i].value); 
    }
    var pfStr = pf.length > 0 ? pf.join(', ') : 'Geral'; 
    
    if (!titulo || !endereco || !valor) { 
        s.mostrarToast('Preencha título, endereço e valor!', 'erro'); 
        return; 
    } 
    
    if (!s.usuarioLogado) {
        s.mostrarToast('Faça login primeiro!', 'erro');
        return;
    }
    
    s.mostrarToast('Publicando...', 'info'); 
    
    var vg = { 
        titulo: titulo, 
        endereco: endereco, 
        profissoes: pfStr, 
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
    
    if (typeof db !== 'undefined') { 
        db.collection('vagas').add(vg)
            .then(function(docRef) { 
                console.log('✅ Vaga publicada com ID:', docRef.id);
                s.mostrarToast('✅ Obra publicada com sucesso!', 'sucesso'); 
                s.vagaFotoBase64 = null;
                s.historicoTelas = []; 
                s.mostrarTela('homeScreen');
                s.mudarTab('feed');
            })
            .catch(function(err) {
                console.error('Erro ao publicar:', err);
                s.mostrarToast('Erro ao publicar. Tente novamente.', 'erro');
            }); 
    } else {
        // Fallback localStorage
        var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vg.id = 'vaga_' + Date.now();
        vg.dataCriacao = new Date().toISOString();
        vagas.unshift(vg);
        localStorage.setItem('vagasLPX', JSON.stringify(vagas));
        
        s.mostrarToast('✅ Obra publicada (local)!', 'sucesso');
        s.vagaFotoBase64 = null;
        s.historicoTelas = [];
        s.mostrarTela('homeScreen');
        s.mudarTab('feed');
        
        // Recarrega feed
        var container = document.getElementById('feedContainer');
        if (container) {
            s.renderizarFeed(container, vagas);
        }
    }
};

// ===== REDE =====
App.prototype.carregarRede = function() { 
    var s = this;
    var c = document.getElementById('redeContainer'); 
    if (!c || !s.usuarioLogado) return; 
    
    c.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Carregando rede...</div>'; 
    
    if (typeof db !== 'undefined') { 
        if (s._listenerRede) s._listenerRede(); 
        
        s._listenerRede = db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .where('status', '==', 'ativo')
            .onSnapshot(function(snap) { 
                var conexoes = []; 
                snap.forEach(function(doc) { 
                    conexoes.push({ id: doc.id, data: doc.data() }); 
                }); 
                
                if (conexoes.length === 0) { 
                    c.innerHTML = '<div style="text-align:center;padding:40px;background:white;border-radius:10px;">' +
                        '<div style="font-size:50px;">🔗</div>' +
                        '<h3>Sua rede está vazia</h3>' +
                        '<p style="color:#666;">Conecte-se com profissionais</p>' +
                        '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:20px;cursor:pointer;margin-top:10px;font-weight:bold;">🔍 Buscar Profissionais</button>' +
                        '</div>'; 
                    return; 
                } 
                
                s.renderizarRede(c, conexoes); 
            }, function(error) {
                console.error('Erro no listener da rede:', error);
                c.innerHTML = '<div style="text-align:center;padding:30px;">Erro ao carregar rede</div>';
            });
    }
};

App.prototype.renderizarRede = function(c, conexoes) { 
    var s = this; 
    var html = '<div style="text-align:center;padding:10px;color:#666;">🔗 ' + conexoes.length + ' conexão(ões)</div>'; 
    var processados = 0; 
    
    for (var i = 0; i < conexoes.length; i++) { 
        var amigoId = conexoes[i].data.participantes.find(function(p) { 
            return p !== s.usuarioLogado.id; 
        }); 
        
        if (typeof db !== 'undefined' && amigoId) { 
            db.collection('usuarios').doc(amigoId).get()
                .then(function(doc) { 
                    processados++; 
                    if (doc.exists) { 
                        var amigo = doc.data(); 
                        amigo.id = doc.id; 
                        html += '<div style="background:white;border-radius:12px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;">' +
                            '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' + 
                            (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>') + 
                            '</div>' +
                            '<div style="flex:1;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' +
                            '<strong>' + amigo.nome + '</strong><br>' +
                            '<small style="color:#666;">' + (amigo.profissao || 'Profissional') + '</small>' +
                            '</div>' +
                            '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;">💬</button>' +
                            '</div>'; 
                    } 
                    if (processados >= conexoes.length) c.innerHTML = html; 
                })
                .catch(function(err) {
                    processados++;
                    console.error('Erro ao carregar amigo:', err);
                    if (processados >= conexoes.length) c.innerHTML = html;
                }); 
        }
    }
    
    // Timeout de segurança
    setTimeout(function() {
        if (processados < conexoes.length) {
            c.innerHTML = html;
        }
    }, 3000);
};

App.prototype.adicionarNaRede = function(pid) { 
    var s = this; 
    if (!s.usuarioLogado || s.usuarioLogado.id === pid) return; 
    
    s.mostrarToast('📩 Enviando convite...', 'info'); 
    
    if (typeof db !== 'undefined') { 
        // Verifica se já existe conexão
        db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .get()
            .then(function(snap) { 
                var existe = false; 
                snap.forEach(function(doc) { 
                    if (doc.data().participantes.indexOf(pid) >= 0) existe = true; 
                }); 
                
                if (existe) { 
                    s.mostrarToast('Convite já enviado!', 'erro'); 
                    return; 
                } 
                
                // Cria conexão
                db.collection('conexoes').add({ 
                    participantes: [s.usuarioLogado.id, pid], 
                    status: 'pendente', 
                    solicitanteId: s.usuarioLogado.id, 
                    dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
                }).then(function() { 
                    // Envia notificação
                    db.collection('notificacoes').add({ 
                        usuarioId: pid, 
                        titulo: '🔗 Convite de Rede', 
                        mensagem: s.usuarioLogado.nome + ' quer se conectar com você!', 
                        tipo: 'convite', 
                        de: s.usuarioLogado.id, 
                        lida: false, 
                        dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
                    }); 
                    s.mostrarToast('✅ Convite enviado!', 'sucesso'); 
                }); 
            })
            .catch(function(err) {
                console.error('Erro ao adicionar na rede:', err);
                s.mostrarToast('Erro ao enviar convite', 'erro');
            }); 
    }
};

App.prototype.aceitarConvite = function(nid, deId) { 
    var s = this; 
    if (typeof db !== 'undefined') { 
        db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .get()
            .then(function(snap) { 
                snap.forEach(function(doc) { 
                    var d = doc.data(); 
                    if (d.participantes && 
                        d.participantes.indexOf(s.usuarioLogado.id) >= 0 && 
                        d.participantes.indexOf(deId) >= 0 && 
                        d.status === 'pendente') { 
                        db.collection('conexoes').doc(doc.id).update({ status: 'ativo' }); 
                    } 
                }); 
            }); 
        
        db.collection('notificacoes').doc(nid).update({ lida: true }); 
        
        db.collection('notificacoes').add({ 
            usuarioId: deId, 
            titulo: '✅ Convite Aceito!', 
            mensagem: s.usuarioLogado.nome + ' aceitou seu convite!', 
            tipo: 'info', 
            lida: false, 
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
        }); 
        
        s.mostrarToast('✅ Conectados!', 'sucesso'); 
    } 
};

App.prototype.recusarConvite = function(nid, deId) { 
    var s = this; 
    if (typeof db !== 'undefined') { 
        db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .get()
            .then(function(snap) { 
                snap.forEach(function(doc) { 
                    var d = doc.data(); 
                    if (d.participantes && 
                        d.participantes.indexOf(s.usuarioLogado.id) >= 0 && 
                        d.participantes.indexOf(deId) >= 0 && 
                        d.status === 'pendente') { 
                        db.collection('conexoes').doc(doc.id).delete(); 
                    } 
                }); 
            }); 
        
        db.collection('notificacoes').doc(nid).update({ lida: true }); 
        s.mostrarToast('Convite recusado', 'info'); 
    } 
};

// ===== CHAT =====
App.prototype.carregarListaConversas = function() {
    var s = this;
    var tela = document.getElementById('chatScreen');
    if (!tela) return;
    
    var chatHeader = document.getElementById('chatHeaderInfo');
    var chatMessages = document.getElementById('chatMessages');
    
    if (chatHeader) chatHeader.innerHTML = '<h2>💬 Mensagens</h2>';
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;color:#999;">Selecione um contato para conversar</div>';
};

App.prototype.iniciarChat = function(uid) {
    var s = this;
    console.log('💬 Iniciando chat com:', uid);
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get()
            .then(function(doc) {
                if (doc.exists) {
                    s.usuarioSelecionado = doc.data();
                    s.usuarioSelecionado.id = doc.id;
                } else {
                    s.usuarioSelecionado = { id: uid, nome: 'Usuário', profissao: 'Profissional', fotoPerfil: null };
                }
                s.abrirChatInterface();
                s.carregarMensagens();
            })
            .catch(function(err) {
                console.error('Erro ao carregar usuário:', err);
                s.usuarioSelecionado = { id: uid, nome: 'Usuário', profissao: 'Profissional', fotoPerfil: null };
                s.abrirChatInterface();
            });
    } else {
        s.usuarioSelecionado = { id: uid, nome: 'Usuário', profissao: 'Profissional', fotoPerfil: null };
        s.abrirChatInterface();
        s.carregarMensagens();
    }
    
    s.mostrarTela('chatScreen');
};

App.prototype.abrirChatInterface = function() {
    var s = this;
    var user = s.usuarioSelecionado;
    if (!user) return;
    
    var chatHeader = document.getElementById('chatHeaderInfo');
    if (chatHeader) {
        chatHeader.innerHTML = '<div style="display:flex;align-items:center;gap:10px;">' +
            '<div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;">' +
            (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
            '<div style="width:100%;height:100%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">👷</div>') +
            '</div>' +
            '<strong>💬 ' + (user.nome || 'Usuário') + '</strong>' +
            '</div>';
    }
    
    var input = document.getElementById('chatInput');
    if (input) input.focus();
};

App.prototype.carregarMensagens = function() {
    var s = this;
    var container = document.getElementById('chatMessages');
    if (!container || !s.usuarioLogado || !s.usuarioSelecionado) return;
    
    if (typeof db !== 'undefined') {
        if (s._listenerChat) s._listenerChat();
        
        s._listenerChat = db.collection('mensagens')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .orderBy('dataEnvio', 'asc')
            .onSnapshot(function(snap) {
                var mensagens = [];
                snap.forEach(function(doc) {
                    var msg = doc.data();
                    msg.id = doc.id;
                    if (msg.participantes && 
                        msg.participantes.indexOf(s.usuarioLogado.id) >= 0 && 
                        msg.participantes.indexOf(s.usuarioSelecionado.id) >= 0) {
                        mensagens.push(msg);
                    }
                });
                
                if (mensagens.length === 0) {
                    container.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Diga olá! 👋</div>';
                } else {
                    var html = '';
                    for (var i = 0; i < mensagens.length; i++) {
                        var msg = mensagens[i];
                        var meu = msg.remetenteId === s.usuarioLogado.id;
                        var data = '';
                        try {
                            if (msg.dataEnvio && msg.dataEnvio.toDate) {
                                data = msg.dataEnvio.toDate().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
                            } else if (msg.dataEnvio) {
                                data = new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
                            }
                        } catch(e) {}
                        
                        html += '<div class="message ' + (meu ? 'message-sent' : 'message-received') + '">' +
                            '<div class="message-content">' + (msg.conteudo || '') + '</div>' +
                            '<div class="message-footer">' +
                            '<span class="message-time">' + data + '</span>' +
                            '</div>' +
                            '</div>';
                    }
                    container.innerHTML = html;
                    container.scrollTop = container.scrollHeight;
                }
            }, function(error) {
                console.error('Erro no listener de mensagens:', error);
            });
    } else {
        // Fallback localStorage
        var msgs = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        var relevantes = [];
        for (var j = 0; j < msgs.length; j++) {
            var m = msgs[j];
            if ((m.remetenteId === s.usuarioLogado.id && m.destinatarioId === s.usuarioSelecionado.id) ||
                (m.remetenteId === s.usuarioSelecionado.id && m.destinatarioId === s.usuarioLogado.id)) {
                relevantes.push(m);
            }
        }
        
        if (relevantes.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Diga olá! 👋</div>';
        } else {
            var html2 = '';
            for (var k = 0; k < relevantes.length; k++) {
                var msg2 = relevantes[k];
                var meu2 = msg2.remetenteId === s.usuarioLogado.id;
                html2 += '<div class="message ' + (meu2 ? 'message-sent' : 'message-received') + '">' +
                    '<div class="message-content">' + (msg2.conteudo || '') + '</div>' +
                    '<div class="message-footer"><span class="message-time">' + new Date(msg2.dataEnvio).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) + '</span></div>' +
                    '</div>';
            }
            container.innerHTML = html2;
            container.scrollTop = container.scrollHeight;
        }
    }
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioLogado || !s.usuarioSelecionado) return;
    
    var texto = input.value.trim();
    if (!texto) return;
    if (s._enviandoMensagem) return;
    
    s._enviandoMensagem = true;
    input.value = '';
    input.focus();
    
    var mensagem = {
        remetenteId: s.usuarioLogado.id,
        destinatarioId: s.usuarioSelecionado.id,
        participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
        conteudo: texto,
        lida: false,
        dataEnvio: firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
    };
    
    if (typeof db !== 'undefined') {
        db.collection('mensagens').add(mensagem)
            .then(function() {
                console.log('Mensagem enviada');
            })
            .catch(function(err) {
                console.error('Erro ao enviar mensagem:', err);
                s.mostrarToast('Erro ao enviar', 'erro');
            })
            .finally(function() {
                s._enviandoMensagem = false;
            });
    } else {
        // Fallback localStorage
        var msgs = JSON.parse(localStorage.getItem('mensagensLPX') || '[]');
        mensagem.id = 'msg_' + Date.now();
        mensagem.dataEnvio = new Date().toISOString();
        msgs.push(mensagem);
        localStorage.setItem('mensagensLPX', JSON.stringify(msgs));
        s._enviandoMensagem = false;
        s.carregarMensagens();
    }
    
    s.mostrarToast('Mensagem enviada', 'sucesso');
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() { 
    var s = this;
    var container = document.getElementById('buscaResultados'); 
    if (!container) return; 
    
    container.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>'; 
    
    var buscaInput = document.getElementById('buscaInput');
    var filtro = buscaInput ? buscaInput.value.toLowerCase() : '';
    
    if (typeof db !== 'undefined') { 
        db.collection('usuarios').get()
            .then(function(snap) { 
                var todos = []; 
                snap.forEach(function(doc) { 
                    var u = doc.data(); 
                    u.id = doc.id; 
                    if (u.id !== s.usuarioLogado?.id) {
                        // Aplica filtro
                        if (!filtro || 
                            (u.nome && u.nome.toLowerCase().indexOf(filtro) >= 0) ||
                            (u.profissao && u.profissao.toLowerCase().indexOf(filtro) >= 0)) {
                            todos.push(u);
                        }
                    }
                }); 
                
                if (todos.length === 0) { 
                    container.innerHTML = '<div style="text-align:center;padding:40px;">' +
                        '<div style="font-size:50px;">🔍</div>' +
                        '<h3>Nenhum profissional encontrado</h3>' +
                        '</div>'; 
                    return; 
                } 
                
                var html = '<div style="text-align:center;padding:10px;color:#666;">👷 ' + todos.length + ' profissional(is) encontrado(s)</div>'; 
                for (var i = 0; i < todos.length; i++) { 
                    var p = todos[i]; 
                    html += '<div class="vaga-card" style="padding:12px;display:flex;align-items:center;gap:12px;">' +
                        '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">' + 
                        (p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
                        '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>') + 
                        '</div>' +
                        '<div style="flex:1;cursor:pointer;" onclick="window.app.verPerfil(\'' + p.id + '\')">' +
                        '<div style="font-weight:bold;">' + p.nome + '</div>' +
                        '<div style="font-size:13px;color:#666;">🔧 ' + (p.profissao || 'Profissional') + '</div>' +
                        '<div style="font-size:11px;color:#999;">⭐ ' + (p.score || 0).toFixed(1) + '</div>' +
                        '</div>' +
                        '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;">💬</button>' +
                        '<button onclick="event.stopPropagation();window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:20px;">+</button>' +
                        '</div>'; 
                } 
                container.innerHTML = html; 
            })
            .catch(function(err) {
                console.error('Erro na busca:', err);
                container.innerHTML = '<div style="text-align:center;padding:30px;">Erro ao buscar profissionais</div>';
            });
    } 
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) { 
    var s = this; 
    if (typeof db !== 'undefined') { 
        db.collection('usuarios').doc(uid).get()
            .then(function(doc) { 
                if (!doc.exists) return; 
                
                var u = doc.data(); 
                u.id = doc.id; 
                
                var conteudo = document.getElementById('perfilPublicoConteudo');
                if (conteudo) {
                    conteudo.innerHTML = '<div style="text-align:center;padding:20px;">' +
                        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' + 
                        (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
                        '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:50px;">👷</div>') + 
                        '</div>' +
                        '<h2>' + u.nome + '</h2>' +
                        '<p style="color:#666;">🔧 ' + (u.profissao || u.tipo || '') + '</p>' +
                        '<p style="color:#F59E0B;">⭐ ' + (u.score || 0).toFixed(1) + '</p>' +
                        '</div>' +
                        '<div class="card">' +
                        '<p>📧 ' + (u.email || 'Não informado') + '</p>' +
                        '<p>📱 ' + (u.celular || 'Não informado') + '</p>' +
                        '<p>📅 Experiência: ' + (u.experiencia || '0') + ' anos</p>' +
                        '</div>' +
                        '<button onclick="window.app.iniciarChat(\'' + u.id + '\')" class="btn btn-primary">💬 Iniciar Chat</button>' +
                        '<button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" class="btn btn-success">🔗 Conectar</button>';
                }
                
                s.mostrarTela('perfilPublicoScreen'); 
            })
            .catch(function(err) {
                console.error('Erro ao carregar perfil:', err);
            }); 
    } 
};

// ===== MEU PERFIL =====
App.prototype.carregarMeuPerfil = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    var u = s.usuarioLogado; 
    var tela = document.getElementById('meuPerfilScreen'); 
    if (!tela) return; 
    
    tela.innerHTML = '<div class="profile-header-container">' +
        '<div class="profile-cover"></div>' +
        '<div class="profile-avatar-container">' +
        '<div class="profile-avatar" onclick="document.getElementById(\'inputFoto\').click()">' +
        (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
        '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') +
        '</div>' +
        '</div>' +
        '<input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;">' +
        '</div>' +
        '<div class="profile-info-card">' +
        '<h2>' + u.nome + '</h2>' +
        '<p style="color:#666;">' + (u.profissao || u.tipo || '') + '</p>' +
        '<div class="stars-container">⭐ ' + (u.score || 0).toFixed(1) + '</div>' +
        '<p>📧 ' + (u.email || '') + '</p>' +
        '<p>📱 ' + (u.celular || '') + '</p>' +
        '<p>📅 Experiência: ' + (u.experiencia || '0') + ' anos</p>' +
        '</div>' +
        '<div style="padding:16px;">' +
        '<button onclick="window.app.abrirEditarPerfil()" class="btn btn-primary">✏️ Editar Perfil</button>' +
        '<button onclick="window.app.gerarQRCodeCompartilhar()" class="btn btn-outline">📱 Compartilhar Perfil</button>' +
        '<button onclick="window.app.mostrarTela(\'configScreen\')" class="btn btn-outline">⚙️ Configurações</button>' +
        '<button onclick="document.getElementById(\'modalSair\').style.display=\'flex\'" class="btn btn-danger">🚪 Sair</button>' +
        '</div>';
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() { 
    var s = this;
    var container = document.getElementById('listaObrasContainer'); 
    if (!container || !s.usuarioLogado) return; 
    
    container.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>'; 
    
    if (typeof db !== 'undefined') { 
        db.collection('vagas')
            .where('autorId', '==', s.usuarioLogado.id)
            .where('ativa', '==', true)
            .get()
            .then(function(snap) { 
                var minhas = []; 
                snap.forEach(function(doc) { 
                    var v = doc.data(); 
                    v.id = doc.id; 
                    minhas.push(v); 
                }); 
                
                // Atualiza total
                var totalObras = document.getElementById('totalObras');
                if (totalObras) totalObras.textContent = minhas.length;
                
                if (minhas.length === 0) { 
                    container.innerHTML = '<div style="text-align:center;padding:40px;">' +
                        '<div style="font-size:50px;">🏗️</div>' +
                        '<h3>Nenhuma obra</h3>' +
                        '<button onclick="window.app.novaObra()" class="btn btn-primary">📢 Publicar Obra</button>' +
                        '</div>'; 
                    return; 
                } 
                
                var html = ''; 
                for (var i = 0; i < minhas.length; i++) { 
                    var v = minhas[i]; 
                    html += '<div class="vaga-card">';
                    
                    if (v.fotoObra && v.fotoObra.length > 100) {
                        html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:150px;object-fit:cover;">';
                    }
                    
                    html += '<div style="padding:15px;">' +
                        '<div style="font-weight:bold;font-size:16px;">' + (v.titulo || 'Sem título') + '</div>' +
                        '<div style="font-size:13px;color:#666;">📍 ' + (v.endereco || '') + '</div>' +
                        '<div style="margin-top:8px;">' +
                        '<span style="background:#10B981;color:white;padding:4px 10px;border-radius:12px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span>' +
                        '<span style="background:#1A3A5C;color:white;padding:4px 10px;border-radius:12px;font-size:11px;margin-left:5px;">👷 ' + (v.profissoes || 'Geral') + '</span>' +
                        '</div>' +
                        '<div style="margin-top:10px;display:flex;gap:8px;">' +
                        '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver</button>' +
                        '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">Apagar</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'; 
                } 
                container.innerHTML = html; 
            })
            .catch(function(err) {
                console.error('Erro ao carregar obras:', err);
            }); 
    } 
};

// ===== DETALHE DA OBRA =====
App.prototype.verDetalheObra = function(oid) { 
    if (typeof db !== 'undefined') { 
        db.collection('vagas').doc(oid).get()
            .then(function(doc) { 
                if (!doc.exists) return; 
                
                var v = doc.data(); 
                v.id = doc.id; 
                
                var modal = document.createElement('div');
                modal.id = 'modalObra';
                modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;';
                modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
                
                var html = '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
                
                if (v.fotoObra && v.fotoObra.length > 100) {
                    html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
                }
                
                html += '<div style="padding:20px;">' +
                    '<h2>' + (v.titulo || 'Sem título') + '</h2>' +
                    '<p>📍 ' + (v.endereco || 'Não informado') + '</p>' +
                    '<p>👷 Profissões: ' + (v.profissoes || 'Geral') + '</p>' +
                    '<p>💰 Valor: R$' + (v.valorHora || '0') + '/hora</p>' +
                    '<p>📝 ' + (v.descricao || 'Sem descrição') + '</p>';
                
                if (v.endereco) {
                    html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(v.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:12px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Abrir no Google Maps</a>';
                }
                
                html += '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;font-weight:bold;">⬅ Fechar</button>' +
                    '</div>' +
                    '</div>';
                
                modal.innerHTML = html;
                
                // Remove modal anterior se existir
                var modalAntigo = document.getElementById('modalObra');
                if (modalAntigo) modalAntigo.remove();
                
                document.body.appendChild(modal);
            })
            .catch(function(err) {
                console.error('Erro ao carregar obra:', err);
            }); 
    } 
};

// ===== NOTIFICAÇÕES =====
App.prototype.mostrarNotificacoes = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    if (typeof db !== 'undefined') { 
        db.collection('notificacoes')
            .where('usuarioId', '==', s.usuarioLogado.id)
            .orderBy('dataCriacao', 'desc')
            .limit(50)
            .get()
            .then(function(snap) { 
                var notificacoes = []; 
                snap.forEach(function(doc) { 
                    var n = doc.data(); 
                    n.id = doc.id; 
                    notificacoes.push(n); 
                }); 
                
                var modal = document.createElement('div');
                modal.id = 'modalNotif';
                modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;';
                modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
                
                var html = '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">' +
                    '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;justify-content:space-between;align-items:center;">' +
                    '<h3>🔔 Notificações</h3>' +
                    '<button onclick="document.getElementById(\'modalNotif\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button>' +
                    '</div>' +
                    '<div style="padding:15px;">';
                
                if (notificacoes.length === 0) { 
                    html += '<div style="text-align:center;padding:40px;"><h3>Nenhuma notificação</h3></div>'; 
                } else { 
                    for (var i = 0; i < notificacoes.length; i++) { 
                        var n = notificacoes[i]; 
                        html += '<div style="background:' + (n.lida ? '#f9fafb' : '#f0f9ff') + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;">' +
                            '<div style="font-weight:bold;">' + n.titulo + '</div>' +
                            '<div style="font-size:13px;color:#666;">' + n.mensagem + '</div>'; 
                        
                        if (n.tipo === 'convite' && !n.lida) { 
                            html += '<div style="display:flex;gap:10px;margin-top:10px;">' +
                                '<button onclick="window.app.aceitarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#10B981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">✅ Aceitar</button>' +
                                '<button onclick="window.app.recusarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#EF4444;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">❌ Recusar</button>' +
                                '</div>'; 
                        } 
                        
                        var dataNotif = '';
                        try {
                            if (n.dataCriacao && n.dataCriacao.toDate) {
                                dataNotif = n.dataCriacao.toDate().toLocaleString('pt-BR');
                            }
                        } catch(e) {}
                        
                        html += '<div style="font-size:10px;color:#999;margin-top:5px;">' + dataNotif + '</div>' +
                            '</div>'; 
                    } 
                } 
                
                html += '</div></div>';
                modal.innerHTML = html;
                
                var modalAntigo = document.getElementById('modalNotif');
                if (modalAntigo) modalAntigo.remove();
                
                document.body.appendChild(modal);
            })
            .catch(function(err) {
                console.error('Erro ao carregar notificações:', err);
            }); 
    } 
};

// ===== LOCALIZAÇÃO =====
App.prototype.abrirMapaLocalizacao = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    var u = s.usuarioLogado; 
    
    var modal = document.createElement('div');
    modal.id = 'modalLoc';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;';
    
    var html = '<div style="background:#1A3A5C;color:white;padding:20px;">' +
        '<button onclick="document.getElementById(\'modalLoc\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2>📍 Sua Localização</h2>' +
        '</div>' +
        '<div style="padding:20px;">' +
        '<div class="input-group"><label>Estado</label>' +
        '<select id="locEstado" onchange="window.app.atualizarCidades()" class="input-field">' +
        '<option value="">Selecione...</option>' + s.getEstadosHTML(u.localizacao ? u.localizacao.estado : '') + '</select></div>' +
        '<div class="input-group"><label>Cidade</label>' +
        '<select id="locCidade" onchange="window.app.atualizarBairros()" class="input-field">' +
        '<option value="">Selecione...</option></select></div>' +
        '<div class="input-group"><label>Bairro</label>' +
        '<select id="locBairro" class="input-field">' +
        '<option value="">Selecione...</option></select></div>' +
        '<button onclick="window.app.salvarLocalizacao()" class="btn btn-success">💾 SALVAR LOCALIZAÇÃO</button>' +
        '</div>';
    
    modal.innerHTML = html;
    
    var modalAntigo = document.getElementById('modalLoc');
    if (modalAntigo) modalAntigo.remove();
    
    document.body.appendChild(modal);
    
    // Carrega cidades se já tiver estado
    if (u.localizacao && u.localizacao.estado) {
        setTimeout(function() { 
            window.app.atualizarCidades(u.localizacao.cidade); 
        }, 300);
        if (u.localizacao.bairro) {
            setTimeout(function() { 
                window.app.atualizarBairros(u.localizacao.bairro); 
            }, 600);
        }
    }
};

App.prototype.getEstadosHTML = function(selecionado) { 
    var estados = {
        'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará',
        'DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão',
        'MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará',
        'PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro',
        'RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima',
        'SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins'
    }; 
    var html = ''; 
    for (var sigla in estados) {
        html += '<option value="' + sigla + '"' + (selecionado === sigla ? ' selected' : '') + '>' + estados[sigla] + '</option>'; 
    }
    return html; 
};

App.prototype.getTodasCidades = function() { 
    return {
        'SP':['São Paulo','Campinas','Santos','Guarulhos','São Bernardo do Campo','Ribeirão Preto','Sorocaba','São José dos Campos'],
        'RJ':['Rio de Janeiro','Niterói','Duque de Caxias','Nova Iguaçu'],
        'MG':['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Montes Claros'],
        'BA':['Salvador','Feira de Santana','Vitória da Conquista'],
        'PR':['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel'],
        'RS':['Porto Alegre','Caxias do Sul','Pelotas','Canoas'],
        'PE':['Recife','Jaboatão','Olinda','Caruaru'],
        'CE':['Fortaleza','Caucaia','Juazeiro do Norte'],
        'SC':['Florianópolis','Joinville','Blumenau','São José','Chapecó'],
        'GO':['Goiânia','Aparecida de Goiânia','Anápolis'],
        'DF':['Brasília','Taguatinga']
    }; 
};

App.prototype.getBairrosPorCidade = function(cidade) { 
    var bairros = {
        'São Paulo':['Centro','Pinheiros','Vila Mariana','Moema','Itaim Bibi','Tatuapé','Santana'],
        'Rio de Janeiro':['Copacabana','Ipanema','Leblon','Barra da Tijuca','Botafogo'],
        'Belo Horizonte':['Savassi','Lourdes','Pampulha'],
        'Florianópolis':['Centro','Lagoa da Conceição','Ingleses'],
        'Joinville':['Centro','América','Glória'],
        'Curitiba':['Centro','Batel','Água Verde'],
        'Porto Alegre':['Moinhos de Vento','Bela Vista'],
        'Salvador':['Barra','Ondina','Pituba'],
        'Recife':['Boa Viagem','Pina'],
        'Fortaleza':['Meireles','Aldeota'],
        'Brasília':['Asa Sul','Asa Norte']
    }; 
    return bairros[cidade] || ['Centro']; 
};

App.prototype.atualizarCidades = function(selecionada) { 
    var estadoSelect = document.getElementById('locEstado');
    var cidadeSelect = document.getElementById('locCidade'); 
    if (!estadoSelect || !cidadeSelect) return; 
    
    var estado = estadoSelect.value;
    var cidades = this.getTodasCidades(); 
    
    cidadeSelect.innerHTML = '<option value="">Selecione...</option>'; 
    if (estado && cidades[estado]) {
        for (var i = 0; i < cidades[estado].length; i++) {
            cidadeSelect.innerHTML += '<option value="' + cidades[estado][i] + '"' + 
                (selecionada === cidades[estado][i] ? ' selected' : '') + '>' + cidades[estado][i] + '</option>'; 
        }
    }
    
    var bairroSelect = document.getElementById('locBairro'); 
    if (bairroSelect) bairroSelect.innerHTML = '<option value="">Selecione...</option>'; 
};

App.prototype.atualizarBairros = function(selecionado) { 
    var cidadeSelect = document.getElementById('locCidade');
    var bairroSelect = document.getElementById('locBairro'); 
    if (!cidadeSelect || !bairroSelect) return; 
    
    var cidade = cidadeSelect.value;
    var bairros = this.getBairrosPorCidade(cidade); 
    
    bairroSelect.innerHTML = '<option value="">Selecione...</option>'; 
    if (bairros) {
        for (var i = 0; i < bairros.length; i++) {
            bairroSelect.innerHTML += '<option value="' + bairros[i] + '"' + 
                (selecionado === bairros[i] ? ' selected' : '') + '>' + bairros[i] + '</option>'; 
        }
    }
};

App.prototype.salvarLocalizacao = function() { 
    var s = this; 
    var estado = (document.getElementById('locEstado') || {}).value || '';
    var cidade = (document.getElementById('locCidade') || {}).value || '';
    var bairro = (document.getElementById('locBairro') || {}).value || ''; 
    
    if (!estado || !cidade) { 
        s.mostrarToast('Selecione estado e cidade!', 'erro'); 
        return; 
    } 
    
    var localizacao = { estado: estado, cidade: cidade, bairro: bairro }; 
    s.usuarioLogado.localizacao = localizacao; 
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(s.usuarioLogado.id).update({ localizacao: localizacao })
            .then(function() {
                console.log('Localização atualizada');
            })
            .catch(function(err) {
                console.error('Erro ao salvar localização:', err);
            });
    }
    
    var modal = document.getElementById('modalLoc');
    if (modal) modal.remove();
    
    s.mostrarToast('Localização salva!', 'sucesso'); 
    s.carregarMeuPerfil(); 
};

// ===== UPLOAD DE FOTO =====
App.prototype.uploadFoto = function(e) { 
    var s = this;
    var f = e.target.files[0]; 
    if (!f) return; 
    
    var r = new FileReader(); 
    r.onload = function(ev) { 
        var foto = ev.target.result; 
        s.usuarioLogado.fotoPerfil = foto; 
        localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); 
        
        if (typeof db !== 'undefined') {
            db.collection('usuarios').doc(s.usuarioLogado.id).update({ fotoPerfil: foto })
                .catch(function(err) {
                    console.error('Erro ao atualizar foto:', err);
                });
        }
        
        s.mostrarToast('Foto atualizada!', 'sucesso'); 
        s.carregarMeuPerfil();
    }; 
    r.readAsDataURL(f); 
};

// ===== EDITAR PERFIL =====
App.prototype.abrirEditarPerfil = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    var u = s.usuarioLogado; 
    
    var modal = document.createElement('div');
    modal.id = 'modalEditar';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    
    var html = '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h3>✏️ Editar Perfil</h3>' +
        '<button class="modal-close" onclick="document.getElementById(\'modalEditar\').remove()">✕</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="input-group"><label>Nome</label>' +
        '<input id="editNome" value="' + (u.nome || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Celular</label>' +
        '<input id="editCelular" value="' + (u.celular || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Profissão</label>' +
        '<input id="editProfissao" value="' + (u.profissao || '') + '" class="input-field"></div>' +
        '<div class="input-group"><label>Experiência (anos)</label>' +
        '<input id="editExperiencia" type="number" value="' + (u.experiencia || '0') + '" class="input-field"></div>' +
        '<button onclick="window.app.salvarPerfil()" class="btn btn-success">💾 SALVAR</button>' +
        '<button onclick="document.getElementById(\'modalEditar\').remove()" class="btn btn-danger">CANCELAR</button>' +
        '</div>' +
        '</div>';
    
    modal.innerHTML = html;
    
    var modalAntigo = document.getElementById('modalEditar');
    if (modalAntigo) modalAntigo.remove();
    
    document.body.appendChild(modal);
};

App.prototype.salvarPerfil = function() { 
    var s = this; 
    
    var dados = { 
        nome: (document.getElementById('editNome') || {}).value?.trim() || s.usuarioLogado.nome, 
        celular: (document.getElementById('editCelular') || {}).value?.trim() || '', 
        profissao: (document.getElementById('editProfissao') || {}).value?.trim() || '', 
        experiencia: (document.getElementById('editExperiencia') || {}).value?.trim() || '0' 
    }; 
    
    if (!dados.nome) { 
        s.mostrarToast('Nome é obrigatório!', 'erro'); 
        return; 
    } 
    
    // Atualiza objeto local
    s.usuarioLogado.nome = dados.nome; 
    s.usuarioLogado.celular = dados.celular; 
    s.usuarioLogado.profissao = dados.profissao; 
    s.usuarioLogado.experiencia = dados.experiencia; 
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado)); 
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(s.usuarioLogado.id).update(dados)
            .then(function() {
                console.log('Perfil atualizado');
            })
            .catch(function(err) {
                console.error('Erro ao atualizar perfil:', err);
            });
    }
    
    var modal = document.getElementById('modalEditar');
    if (modal) modal.remove();
    
    s.mostrarToast('Perfil atualizado!', 'sucesso'); 
    s.carregarMeuPerfil(); 
};

// ===== QR CODE =====
App.prototype.gerarQRCodeCompartilhar = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    var u = s.usuarioLogado; 
    var url = window.location.origin + window.location.pathname + '?perfil=' + u.id; 
    
    var modal = document.createElement('div');
    modal.id = 'modalQR';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    
    var html = '<div class="modal-content" style="text-align:center;padding:30px;">' +
        '<h3>📱 Compartilhar Perfil</h3>' +
        '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:10px auto;border:3px solid #F47920;">' +
        (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
        '<div style="width:100%;height:100%;background:#1A3A5C;display:flex;align-items:center;justify-content:center;color:white;font-size:35px;">👷</div>') +
        '</div>' +
        '<p><strong>' + u.nome + '</strong></p>' +
        '<div id="qrcodeContainer" style="display:flex;justify-content:center;margin:15px 0;"></div>' +
        '<p style="font-size:11px;color:#666;word-break:break-all;">' + url + '</p>' +
        '<button onclick="document.getElementById(\'modalQR\').remove()" class="btn btn-primary">FECHAR</button>' +
        '</div>';
    
    modal.innerHTML = html;
    
    var modalAntigo = document.getElementById('modalQR');
    if (modalAntigo) modalAntigo.remove();
    
    document.body.appendChild(modal);
    
    setTimeout(function() { 
        var container = document.getElementById('qrcodeContainer'); 
        if (container && typeof QRCode !== 'undefined') { 
            container.innerHTML = ''; 
            new QRCode(container, { 
                text: url, 
                width: 180, 
                height: 180, 
                colorDark: '#1A3A5C', 
                colorLight: '#ffffff' 
            }); 
        } 
    }, 300); 
};

// ===== CONFIGURAÇÕES =====
App.prototype.carregarConfigScreen = function() { 
    var s = this;
    var tela = document.getElementById('configScreen');
    if (!tela) return;
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2>⚙️ Configurações</h2>' +
        '</div>' +
        '<div style="padding:15px;">' +
        '<div class="card">' +
        '<h3>🎨 Tema</h3>' +
        '<div style="display:flex;gap:10px;margin-top:10px;">' +
        '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid ' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">☀️ Claro</button>' +
        '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid ' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🌙 Escuro</button>' +
        '</div>' +
        '</div>' +
        '<div class="card">' +
        '<h3>📄 Documentos</h3>' +
        '<button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso</button>' +
        '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">🔒 Política de Privacidade</button>' +
        '</div>' +
        '<div class="card">' +
        '<h3>📱 Sobre</h3>' +
        '<p style="color:#666;">LPXCONSTRUTOR v1.0</p>' +
        '<p style="color:#666;">Rede Profissional da Construção Civil</p>' +
        '<p style="color:#666;font-size:12px;">© 2024 Todos os direitos reservados</p>' +
        '</div>' +
        '</div>';
    
    s.mostrarTela('configScreen');
};

App.prototype.mostrarDocumento = function(tipo) { 
    var s = this;
    
    var titulos = { 
        termos: '📄 Termos de Uso', 
        privacidade: '🔒 Política de Privacidade' 
    }; 
    
    var conteudos = { 
        termos: '<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os seguintes termos:</p>' +
            '<ul><li>Respeitar todos os usuários da plataforma</li><li>Não publicar conteúdo ofensivo ou ilegal</li>' +
            '<li>Manter suas informações atualizadas</li><li>Não compartilhar sua conta com terceiros</li></ul>', 
        privacidade: '<h3>Política de Privacidade</h3><p>Seus dados são protegidos e utilizados apenas para:</p>' +
            '<ul><li>Conectar você com profissionais da construção</li><li>Melhorar sua experiência na plataforma</li>' +
            '<li>Enviar notificações relevantes</li><li>Nunca vendemos seus dados pessoais</li></ul>' 
    }; 
    
    var tela = document.getElementById('documentoScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'documentoScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2>' + (titulos[tipo] || '') + '</h2>' +
        '</div>' +
        '<div style="padding:20px;">' + (conteudos[tipo] || '') + '</div>';
    
    s.mostrarTela('documentoScreen');
};

App.prototype.selecionarTema = function(tema) { 
    this.temaAtual = tema; 
    localStorage.setItem('tema', tema); 
    
    if (tema === 'escuro') {
        document.body.classList.add('dark-theme'); 
    } else {
        document.body.classList.remove('dark-theme'); 
    }
    
    this.mostrarToast('Tema alterado!', 'sucesso');
    this.carregarConfigScreen();
};

// ===== CADASTRO - ETAPAS =====
App.prototype.proximaEtapa = function(etapa) {
    if (etapa === 1) {
        document.getElementById('etapa1').style.display = 'block';
        document.getElementById('etapa2').style.display = 'none';
    } else if (etapa === 2) {
        document.getElementById('etapa1').style.display = 'none';
        document.getElementById('etapa2').style.display = 'block';
    }
};

App.prototype.toggleProfissao = function() {
    var tipo = document.getElementById('cadTipo').value;
    var grupo = document.getElementById('grupoProfissao');
    if (grupo) {
        grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
    }
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) { 
    var toast = document.getElementById('toast'); 
    if (!toast) { 
        toast = document.createElement('div'); 
        toast.id = 'toast'; 
        toast.className = 'toast';
        document.querySelector('.app-container').appendChild(toast);
    } 
    
    toast.textContent = mensagem; 
    toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1A3A5C'; 
    toast.style.color = 'white'; 
    toast.style.display = 'block'; 
    
    clearTimeout(this._toastTimeout); 
    this._toastTimeout = setTimeout(function() { 
        toast.style.display = 'none'; 
    }, 3000); 
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ LPXCONSTRUTOR - Inicializando...');
    console.log('📡 Firebase:', typeof firebase !== 'undefined' ? 'Conectado' : 'Não conectado');
    console.log('💾 Firestore:', typeof db !== 'undefined' ? 'Disponível' : 'Indisponível');
    
    var nav = document.getElementById('bottomNav'); 
    if (nav) nav.style.display = 'none';
    
    window.app._app = new App();
    
    console.log('✅ LPXCONSTRUTOR INICIALIZADO COM SUCESSO!');
    console.log('🔥 Feed em tempo real ATIVADO');
    console.log('💬 Chat funcionando');
    console.log('🔗 Sistema de conexões ativo');
});
