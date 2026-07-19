// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO FINAL =====
// ===== FEED INSTANTÂNEO + CHAT + MAPA COM MARCADORES =====
// ==========================================================

window.app = window.app || {};
window.app._app = null;

// Interface global
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
window.app.apagarObra = function(oid, event) { if(window.app._app) window.app._app.apagarObra(oid, event); };
window.app.mostrarNotificacoes = function() { if(window.app._app) window.app._app.mostrarNotificacoes(); };
window.app.iniciarChat = function(uid) { if(window.app._app) window.app._app.iniciarChat(uid); };
window.app.enviarMensagem = function() { if(window.app._app) window.app._app.enviarMensagem(); };
window.app.gerarQRCodeCompartilhar = function() { if(window.app._app) window.app._app.gerarQRCodeCompartilhar(); };
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
window.app.solicitarCodigo = function() { if(window.app._app) window.app._app.solicitarCodigo(); };
window.app.verificarCodigo = function() { if(window.app._app) window.app._app.verificarCodigo(); };
window.app.voltarPasso1 = function() { if(window.app._app) window.app._app.voltarPasso1(); };

// ==========================================================
// ===== CONSTRUTOR PRINCIPAL =====
// ==========================================================
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
    this._vagasCache = [];
    this._publicando = false;
    this.mapa = null;
    this._mapaInicializado = false;
    this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 LPXCONSTRUTOR INICIADO');
    console.log('📡 Firebase:', typeof firebase !== 'undefined' ? '✅' : '❌');
    console.log('🗺️ Google Maps:', typeof google !== 'undefined' ? '✅' : '⏳');
    
    window.app._app = s;
    
    var nav = document.getElementById('bottomNav'); 
    if (nav) nav.style.display = 'none';
    
    if (s.temaAtual === 'escuro') document.body.classList.add('dark-theme');
    
    // Splash screen
    var splashAntigo = document.getElementById('splashScreen'); 
    if (splashAntigo?.parentNode) splashAntigo.parentNode.removeChild(splashAntigo);
    
    var splash = document.createElement('div'); 
    splash.id = 'splashScreen';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s;';
    splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;">Rede Profissional da Construção</p>';
    document.body.appendChild(splash);
    
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('✅ Usuário autenticado:', user.uid);
                if (typeof db !== 'undefined') {
                    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            s.usuarioLogado = doc.data();
                            s.usuarioLogado.id = doc.id;
                            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                            s.mostrarTela('homeScreen');
                            s.iniciarListenerNotificacoes();
                            s.iniciarFeedListener();
                            // Inicializa mapa após carregar home
                            setTimeout(function() { s.inicializarMapa(); }, 1000);
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
            setTimeout(function() {
                splash.style.opacity = '0';
                setTimeout(function() {
                    if (splash.parentNode) splash.parentNode.removeChild(splash);
                }, 500);
            }, 1500);
        });
    } else {
        setTimeout(function() {
            splash.style.opacity = '0';
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
                s.mostrarTela('loginScreen');
            }, 500);
        }, 1500);
    }
};

// ==========================================================
// ===== MAPA COM MARCADORES EMOJI =====
// ==========================================================

App.prototype.inicializarMapa = function() {
    var s = this;
    
    if (s._mapaInicializado) {
        console.log('🗺️ Mapa já inicializado');
        return;
    }
    
    var mapElement = document.getElementById('map');
    if (!mapElement) {
        console.log('⚠️ Elemento do mapa não encontrado');
        return;
    }
    
    if (typeof google === 'undefined' || !google.maps) {
        console.log('⏳ Aguardando Google Maps carregar...');
        var checkGoogleMaps = setInterval(function() {
            if (typeof google !== 'undefined' && google.maps) {
                clearInterval(checkGoogleMaps);
                s.inicializarMapa();
            }
        }, 300);
        setTimeout(function() { clearInterval(checkGoogleMaps); }, 10000);
        return;
    }
    
    console.log('🗺️ Criando mapa...');
    
    // Posição padrão (Brasil)
    var defaultPosition = { lat: -14.2350, lng: -51.9253 };
    
    try {
        s.mapa = new google.maps.Map(mapElement, {
            center: defaultPosition,
            zoom: 4,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                }
            ]
        });
        
        s._mapaInicializado = true;
        console.log('✅ Mapa criado com sucesso');
        
        // Tenta obter localização do usuário
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    s.mapa.setCenter(userPos);
                    s.mapa.setZoom(13);
                    
                    // Adiciona marcador da localização atual
                    s.adicionarMarcadorEmoji(userPos, '📍', 'Você está aqui', '#EF4444');
                    
                    console.log('📍 Localização do usuário obtida');
                },
                function(error) {
                    console.log('⚠️ Geolocalização não disponível:', error.message);
                    s.carregarMarcadoresMapa();
                },
                { 
                    enableHighAccuracy: true,
                    timeout: 8000,
                    maximumAge: 0
                }
            );
        } else {
            s.carregarMarcadoresMapa();
        }
        
    } catch(e) {
        console.error('❌ Erro ao criar mapa:', e);
        mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:300px;background:#f0f0f0;border-radius:12px;">' +
            '<div style="text-align:center;"><div style="font-size:50px;">🗺️</div><p style="color:#666;">Mapa indisponível</p></div></div>';
    }
};

App.prototype.carregarMarcadoresMapa = function() {
    var s = this;
    if (!s.mapa) {
        console.log('⚠️ Mapa não disponível para marcadores');
        return;
    }
    
    console.log('📍 Carregando marcadores...');
    
    // Marcador do próprio usuário logado
    if (s.usuarioLogado && s.usuarioLogado.localizacao && s.usuarioLogado.localizacao.cidade) {
        var enderecoUsuario = s.usuarioLogado.localizacao.cidade + ', ' + 
                             s.usuarioLogado.localizacao.estado + ', Brasil';
        
        s.geocodificarEndereco(enderecoUsuario, function(posicao) {
            if (posicao) {
                var emoji = s.usuarioLogado.tipo === 'empreiteiro' ? '🏰' : '👷‍♂️';
                s.adicionarMarcadorEmoji(posicao, emoji, s.usuarioLogado.nome + ' (Você)', '#FFD700');
            }
        });
    }
    
    // Marcadores de outros usuários
    if (typeof db !== 'undefined') {
        db.collection('usuarios')
            .where('localizacao', '!=', null)
            .limit(100)
            .get()
            .then(function(snap) {
                console.log('📍 Encontrados ' + snap.size + ' usuários com localização');
                
                snap.forEach(function(doc) {
                    var user = doc.data();
                    user.id = doc.id;
                    
                    // Pula o próprio usuário
                    if (s.usuarioLogado && user.id === s.usuarioLogado.id) return;
                    
                    if (user.localizacao && user.localizacao.cidade) {
                        var endereco = user.localizacao.cidade + ', ' + 
                                      (user.localizacao.estado || '') + ', Brasil';
                        
                        s.geocodificarEndereco(endereco, function(posicao) {
                            if (posicao) {
                                var emoji = user.tipo === 'empreiteiro' ? '🏰' : '👷';
                                var cor = user.tipo === 'empreiteiro' ? '#F59E0B' : '#10B981';
                                var info = '<div style="padding:10px;text-align:center;">' +
                                    '<div style="font-size:30px;">' + emoji + '</div>' +
                                    '<strong>' + user.nome + '</strong><br>' +
                                    '<small>' + (user.profissao || user.tipo || '') + '</small><br>' +
                                    '<small>📍 ' + user.localizacao.cidade + '/' + user.localizacao.estado + '</small><br>' +
                                    '<button onclick="window.app.verPerfil(\'' + user.id + '\')" style="margin-top:8px;padding:6px 12px;background:#1A3A5C;color:white;border:none;border-radius:15px;cursor:pointer;font-size:11px;">Ver Perfil</button>' +
                                    '</div>';
                                s.adicionarMarcadorEmoji(posicao, emoji, user.nome, cor, info);
                            }
                        });
                    }
                });
            })
            .catch(function(err) {
                console.error('❌ Erro ao buscar usuários:', err);
            });
    }
};

App.prototype.geocodificarEndereco = function(endereco, callback) {
    if (typeof google === 'undefined' || !google.maps) {
        console.log('⚠️ Google Maps não disponível para geocodificação');
        callback(null);
        return;
    }
    
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: endereco, region: 'BR' }, function(results, status) {
        if (status === 'OK' && results[0]) {
            var posicao = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            callback(posicao);
        } else {
            console.log('⚠️ Geocodificação falhou para:', endereco, 'Status:', status);
            callback(null);
        }
    });
};

App.prototype.adicionarMarcadorEmoji = function(posicao, emoji, nome, cor, infoPersonalizada) {
    var s = this;
    if (!s.mapa || !posicao) return;
    
    try {
        // Conteúdo do marcador
        var markerDiv = document.createElement('div');
        markerDiv.style.cssText = 'font-size:36px;cursor:pointer;filter:drop-shadow(2px 3px 4px rgba(0,0,0,0.5));transition:transform 0.2s;text-align:center;';
        markerDiv.innerHTML = emoji;
        markerDiv.title = nome;
        
        markerDiv.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
        });
        
        markerDiv.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // InfoWindow
        var infoContent = infoPersonalizada || 
            '<div style="padding:10px;text-align:center;">' +
            '<div style="font-size:30px;">' + emoji + '</div>' +
            '<strong>' + nome + '</strong>' +
            '</div>';
        
        var infoWindow = new google.maps.InfoWindow({
            content: infoContent,
            maxWidth: 250
        });
        
        // Verifica se AdvancedMarkerElement está disponível
        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
            var marker = new google.maps.marker.AdvancedMarkerElement({
                map: s.mapa,
                position: posicao,
                content: markerDiv,
                title: nome
            });
            
            markerDiv.addEventListener('click', function() {
                infoWindow.open(s.mapa, marker);
            });
        } else {
            // Fallback para marcador tradicional
            var marker = new google.maps.Marker({
                position: posicao,
                map: s.mapa,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 0,
                    fillOpacity: 0,
                    strokeOpacity: 0
                },
                label: {
                    text: emoji,
                    fontSize: '28px',
                    className: 'custom-marker-label'
                },
                title: nome,
                animation: google.maps.Animation.DROP
            });
            
            marker.addListener('click', function() {
                infoWindow.open(s.mapa, marker);
            });
        }
        
        console.log('✅ Marcador:', emoji, nome);
        
    } catch(e) {
        console.error('❌ Erro ao adicionar marcador:', e, nome);
    }
};

// ==========================================================
// ===== FEED INSTANTÂNEO =====
// ==========================================================

App.prototype.iniciarFeedListener = function() {
    var s = this;
    
    if (s._listenerFeed) {
        console.log('📡 Feed listener já ativo');
        var container = document.getElementById('feedContainer');
        if (container && s._vagasCache.length > 0) {
            s.renderizarFeed(container, s._vagasCache);
        }
        return;
    }
    
    if (typeof db === 'undefined') {
        console.error('❌ Firestore não disponível');
        return;
    }
    
    console.log('🔥 INICIANDO LISTENER DO FEED');
    
    s._listenerFeed = db.collection('vagas')
        .where('ativa', '==', true)
        .onSnapshot(function(snap) {
            console.log('📢 Feed atualizado:', snap.size, 'vagas');
            
            var vagas = [];
            snap.forEach(function(doc) {
                var vaga = doc.data();
                vaga.id = doc.id;
                vagas.push(vaga);
            });
            
            // Ordena por data (mais recente primeiro)
            vagas.sort(function(a, b) {
                var da = 0, db2 = 0;
                try {
                    da = a.dataCriacao?.toDate?.().getTime() || new Date(a.dataCriacao).getTime() || 0;
                    db2 = b.dataCriacao?.toDate?.().getTime() || new Date(b.dataCriacao).getTime() || 0;
                } catch(e) {}
                return db2 - da;
            });
            
            s._vagasCache = vagas;
            
            var container = document.getElementById('feedContainer');
            if (container && s.tabAtual === 'feed') {
                s.renderizarFeed(container, vagas);
            }
            
            // Notifica novas vagas
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added' && s._feedIniciado) {
                    var vaga = change.doc.data();
                    if (vaga.autorId !== s.usuarioLogado?.id) {
                        s.mostrarToast('🆕 ' + (vaga.titulo || 'Nova obra publicada!'), 'info');
                    }
                }
            });
        }, function(error) {
            console.error('❌ Erro no feed:', error);
        });
    
    s._feedIniciado = true;
};

App.prototype.pararFeedListener = function() {
    if (this._listenerFeed) {
        this._listenerFeed();
        this._listenerFeed = null;
    }
    this._feedIniciado = false;
    this._vagasCache = [];
};

App.prototype.iniciarListenerNotificacoes = function() { 
    var s = this; 
    if (typeof db === 'undefined' || !s.usuarioLogado) return; 
    if (s._listenerNotificacoes) return;
    
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
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added') {
                    var notif = change.doc.data();
                    if (notif.tipo === 'mensagem') {
                        s.mostrarToast('💬 Nova mensagem!', 'info');
                    }
                }
            });
        });
};

// ==========================================================
// ===== NAVEGAÇÃO =====
// ==========================================================

App.prototype.mostrarTela = function(id) { 
    var s = this; 
    
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
        tela.style.display = 'none'; 
        document.body.appendChild(tela); 
    } 
    
    tela.classList.add('active'); 
    tela.style.display = 'block'; 
    s.telaAtual = id; 
    
    var nav = document.getElementById('bottomNav'); 
    if (nav) { 
        var telasSemNav = ['loginScreen', 'cadastroScreen', 'recuperarSenhaScreen']; 
        nav.style.display = telasSemNav.indexOf(id) >= 0 ? 'none' : 'flex'; 
        
        var navItems = nav.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            var screenAttr = item.getAttribute('data-screen');
            item.classList.toggle('active', screenAttr === id);
        });
    }
    
    // Carrega conteúdo específico
    switch(id) {
        case 'homeScreen':
            s.carregarHome();
            if (!s._mapaInicializado) setTimeout(function() { s.inicializarMapa(); }, 500);
            break;
        case 'meuPerfilScreen': s.carregarMeuPerfil(); break;
        case 'buscaScreen': s.buscarProfissionais(); break;
        case 'minhasObrasScreen': s.carregarMinhasObras(); break;
        case 'chatScreen': if (!s.usuarioSelecionado) s.carregarListaConversas(); break;
        case 'configScreen': s.carregarConfigScreen(); break;
    }
};

App.prototype.voltarTela = function() { 
    if (this.historicoTelas.length > 0) {
        this.mostrarTela(this.historicoTelas.pop()); 
    } else {
        this.mostrarTela('homeScreen'); 
    }
};

// ==========================================================
// ===== LOGIN / CADASTRO / SAIR =====
// ==========================================================

App.prototype.fazerLogin = function() { 
    var s = this; 
    var email = document.getElementById('loginEmail')?.value?.trim() || '';
    var senha = document.getElementById('loginSenha')?.value || ''; 
    
    if (!email || !senha) { s.mostrarToast('Preencha email e senha!', 'erro'); return; } 
    
    s.mostrarToast('Entrando...', 'info'); 
    
    if (typeof firebase !== 'undefined' && firebase.auth) { 
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function(userCredential) { 
                if (typeof db !== 'undefined') { 
                    db.collection('usuarios').doc(userCredential.user.uid).get()
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
                                setTimeout(function() { s.inicializarMapa(); }, 1000);
                            } 
                        }); 
                } 
            })
            .catch(function(err) {
                var msg = 'Email ou senha incorretos!';
                if (err.code === 'auth/user-not-found') msg = 'Usuário não encontrado!';
                if (err.code === 'auth/wrong-password') msg = 'Senha incorreta!';
                s.mostrarToast(msg, 'erro'); 
            }); 
    }
};

App.prototype.cadastrar = function() { 
    var s = this; 
    var dados = { 
        nome: document.getElementById('cadNome')?.value?.trim() || '', 
        email: document.getElementById('cadEmail')?.value?.trim() || '', 
        senha: document.getElementById('cadSenha')?.value || '', 
        tipo: document.getElementById('cadTipo')?.value || 'profissional', 
        celular: document.getElementById('cadCelular')?.value?.trim() || '', 
        profissao: document.getElementById('cadProfissao')?.value || '', 
        experiencia: document.getElementById('cadExperiencia')?.value || '0', 
        score: 0, fotoPerfil: null, localizacao: null
    }; 
    
    if (!dados.nome || !dados.email || !dados.senha) { 
        s.mostrarToast('Preencha todos os campos!', 'erro'); return; 
    }
    if (dados.senha.length < 6) {
        s.mostrarToast('Senha deve ter no mínimo 6 caracteres!', 'erro'); return;
    }
    
    s.mostrarToast('Cadastrando...', 'info'); 
    
    if (typeof firebase !== 'undefined' && firebase.auth) { 
        firebase.auth().createUserWithEmailAndPassword(dados.email, dados.senha)
            .then(function(userCredential) { 
                dados.id = userCredential.user.uid;
                dados.dataCadastro = firebase.firestore.FieldValue.serverTimestamp();
                
                if (typeof db !== 'undefined') { 
                    db.collection('usuarios').doc(dados.id).set(dados)
                        .then(function() { 
                            s.usuarioLogado = dados; 
                            localStorage.setItem('usuarioLPX', JSON.stringify(dados)); 
                            s.historicoTelas = []; 
                            s.mostrarToast('✅ Cadastro realizado!', 'sucesso'); 
                            s.mostrarTela('homeScreen');
                            s.iniciarListenerNotificacoes();
                            s.iniciarFeedListener();
                            setTimeout(function() { s.inicializarMapa(); }, 1000);
                        }); 
                } 
            })
            .catch(function(err) { 
                var msg = err.code === 'auth/email-already-in-use' ? 'Email já cadastrado!' : 'Erro ao cadastrar';
                s.mostrarToast(msg, 'erro'); 
            }); 
    }
};

App.prototype.sair = function() { 
    if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut(); 
    this.pararFeedListener();
    if (this._listenerChat) { this._listenerChat(); this._listenerChat = null; }
    if (this._listenerNotificacoes) { this._listenerNotificacoes(); this._listenerNotificacoes = null; }
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.mapa = null;
    this._mapaInicializado = false;
    localStorage.removeItem('usuarioLPX'); 
    this.historicoTelas = []; 
    this.mostrarTela('loginScreen'); 
    var modal = document.getElementById('modalSair');
    if (modal) modal.style.display = 'none';
};

// ==========================================================
// ===== HOME =====
// ==========================================================

App.prototype.carregarHome = function() { 
    var s = this; 
    if (!s.usuarioLogado) { s.mostrarTela('loginScreen'); return; } 
    
    var u = s.usuarioLogado; 
    var hr = new Date().getHours();
    var saudacao = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite'; 
    
    var elSaudacao = document.getElementById('saudacao');
    if (elSaudacao) elSaudacao.textContent = '👋 ' + saudacao + ', ' + u.nome + '!';
    
    var elResumo = document.getElementById('resumoTexto');
    if (elResumo) elResumo.textContent = u.tipo === 'empreiteiro' ? '🏰 Empreiteiro' : '👷 ' + (u.profissao || 'Profissional');
    
    var btnPublicar = document.getElementById('btnPublicar');
    var btnObras = document.getElementById('btnObras');
    if (btnPublicar && btnObras) {
        var mostrar = u.tipo === 'empreiteiro';
        btnPublicar.style.display = mostrar ? 'flex' : 'none';
        btnObras.style.display = mostrar ? 'flex' : 'none';
    }
    
    // Garante que o feed listener está ativo
    if (!s._listenerFeed) s.iniciarFeedListener();
    
    // Renderiza o feed
    if (s.tabAtual === 'feed') {
        var container = document.getElementById('feedContainer');
        if (container) {
            if (s._vagasCache.length > 0) {
                s.renderizarFeed(container, s._vagasCache);
            } else {
                container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
            }
        }
    }
};

App.prototype.mudarTab = function(t) { 
    this.tabAtual = t; 
    
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
        if ((t === 'feed' && tab.textContent.includes('Feed')) || 
            (t === 'rede' && tab.textContent.includes('Rede'))) {
            tab.classList.add('active');
        }
    });
    
    var fc = document.getElementById('feedContainer');
    var rc = document.getElementById('redeContainer'); 
    if (fc) fc.style.display = t === 'feed' ? 'flex' : 'none'; 
    if (rc) rc.style.display = t === 'rede' ? 'flex' : 'none'; 
    
    if (t === 'feed') {
        var container = document.getElementById('feedContainer');
        if (container && this._vagasCache.length > 0) {
            this.renderizarFeed(container, this._vagasCache);
        }
    }
    if (t === 'rede') this.carregarRede(); 
};

// ==========================================================
// ===== RENDERIZAR FEED =====
// ==========================================================

App.prototype.renderizarFeed = function(container, vagas) { 
    var s = this; 
    
    if (!vagas || vagas.length === 0) { 
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;">' +
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
        
        html += '<div class="vaga-card">';
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
        var data = '';
        try {
            if (v.dataCriacao?.toDate) data = v.dataCriacao.toDate().toLocaleDateString('pt-BR');
            else if (v.dataCriacao) data = new Date(v.dataCriacao).toLocaleDateString('pt-BR');
        } catch(e) {}
        html += '<div class="vaga-data">' + data + '</div>';
        html += '</div>';
        if (dono) html += '<span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:bold;">⭐ SUA</span>';
        html += '</div>';
        
        html += '<div class="vaga-body">';
        if (v.fotoObra && v.fotoObra.length > 100) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;">';
        }
        html += '<div onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">';
        html += '<div class="vaga-titulo">' + (v.titulo || 'Sem título') + '</div>';
        html += '<div style="color:#666;font-size:13px;margin-bottom:8px;">📍 ' + (v.endereco || '') + '</div>';
        html += '<div class="vaga-tags">';
        html += '<span class="vaga-tag">💰 R$' + (v.valorHora || '0') + '/h</span>';
        html += '<span class="vaga-tag">👷 ' + (v.profissoes || 'Geral') + '</span>';
        html += '</div></div></div>';
        
        html += '<div class="vaga-footer">';
        html += '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver Detalhes</button>';
        if (dono) html += '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">🗑️ Apagar</button>';
        html += '</div></div>';
    } 
    container.innerHTML = html; 
};

App.prototype.apagarObra = function(oid, ev) { 
    if (ev) ev.stopPropagation(); 
    if (!confirm('Apagar esta obra?')) return; 
    if (typeof db !== 'undefined') db.collection('vagas').doc(oid).update({ ativa: false }); 
    this.mostrarToast('Obra apagada!', 'sucesso'); 
};

// ==========================================================
// ===== PUBLICAR VAGA =====
// ==========================================================

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
        document.querySelectorAll('#profissoesCheckboxes input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
    }, 100);
};

App.prototype.previewFotoObra = function(e) { 
    var f = e.target.files[0]; if (!f) return; 
    var reader = new FileReader(); 
    reader.onload = function(ev) { 
        var preview = document.getElementById('vagaFotoPreview'); 
        if (preview) { preview.src = ev.target.result; preview.style.objectFit = 'cover'; } 
        if (window.app._app) window.app._app.vagaFotoBase64 = ev.target.result; 
    }; 
    reader.readAsDataURL(f); 
};

App.prototype.publicarVagaApp = function() { 
    var s = this; 
    
    if (s._publicando) { console.log('⚠️ Publicação em andamento'); return; }
    
    var titulo = document.getElementById('vagaTitulo')?.value?.trim() || '';
    var endereco = document.getElementById('vagaEndereco')?.value?.trim() || '';
    var valor = document.getElementById('vagaValorHora')?.value || '';
    var descricao = document.getElementById('vagaDescricao')?.value?.trim() || ''; 
    
    var profissoes = []; 
    document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { profissoes.push(cb.value); });
    var profissoesStr = profissoes.length > 0 ? profissoes.join(', ') : 'Geral'; 
    
    if (!titulo || !endereco || !valor) { 
        s.mostrarToast('Preencha título, endereço e valor!', 'erro'); return; 
    } 
    if (!s.usuarioLogado) { s.mostrarToast('Faça login!', 'erro'); return; }
    
    s._publicando = true;
    s.mostrarToast('Publicando...', 'info'); 
    
    var vaga = { 
        titulo: titulo, endereco: endereco, profissoes: profissoesStr, 
        valorHora: parseFloat(valor) || 0, descricao: descricao, 
        fotoObra: s.vagaFotoBase64 || '', status: 'disponivel', ativa: true, 
        autorId: s.usuarioLogado.id, autorNome: s.usuarioLogado.nome, 
        autorFoto: s.usuarioLogado.fotoPerfil || null, interessados: [], 
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
    }; 
    
    if (typeof db !== 'undefined') { 
        db.collection('vagas').add(vaga)
            .then(function(docRef) { 
                console.log('✅ Vaga publicada:', docRef.id);
                s.mostrarToast('✅ Obra publicada!', 'sucesso'); 
                s.vagaFotoBase64 = null;
                s._publicando = false;
                s.historicoTelas = []; 
                s.mostrarTela('homeScreen');
                if (s.tabAtual !== 'feed') s.mudarTab('feed');
            })
            .catch(function(err) {
                console.error('❌ Erro:', err);
                s.mostrarToast('Erro ao publicar', 'erro');
                s._publicando = false;
            }); 
    } else {
        s._publicando = false;
    }
};

// ==========================================================
// ===== REDE =====
// ==========================================================

App.prototype.carregarRede = function() { 
    var s = this;
    var container = document.getElementById('redeContainer'); 
    if (!container || !s.usuarioLogado) return; 
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando rede...</div>'; 
    
    if (typeof db !== 'undefined') { 
        if (s._listenerRede) s._listenerRede(); 
        s._listenerRede = db.collection('conexoes')
            .where('participantes', 'array-contains', s.usuarioLogado.id)
            .where('status', '==', 'ativo')
            .onSnapshot(function(snap) { 
                var conexoes = []; 
                snap.forEach(function(doc) { conexoes.push({ id: doc.id, data: doc.data() }); }); 
                
                if (conexoes.length === 0) { 
                    container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
                        '<div style="font-size:50px;">🔗</div><h3>Sua rede está vazia</h3>' +
                        '<button onclick="window.app.mostrarTela(\'buscaScreen\')" class="btn btn-primary">🔍 Buscar Profissionais</button></div>'; 
                    return; 
                } 
                s.renderizarRede(container, conexoes); 
            });
    }
};

App.prototype.renderizarRede = function(container, conexoes) { 
    var s = this; 
    var html = '<div style="text-align:center;padding:10px;color:#666;">🔗 ' + conexoes.length + ' conexão(ões)</div>'; 
    var processados = 0; 
    
    for (var i = 0; i < conexoes.length; i++) { 
        (function(index) {
            var amigoId = conexoes[index].data.participantes.find(function(p) { return p !== s.usuarioLogado.id; }); 
            if (amigoId && typeof db !== 'undefined') { 
                db.collection('usuarios').doc(amigoId).get().then(function(doc) { 
                    processados++; 
                    if (doc.exists) { 
                        var amigo = doc.data(); amigo.id = doc.id; 
                        html += '<div class="card" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;">' +
                            '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;" onclick="window.app.verPerfil(\'' + amigo.id + '\')">' + 
                            (amigo.fotoPerfil ? '<img src="' + amigo.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '👷') + '</div>' +
                            '<div style="flex:1;" onclick="window.app.verPerfil(\'' + amigo.id + '\')"><strong>' + amigo.nome + '</strong><br><small>' + (amigo.profissao||'') + '</small></div>' +
                            '<button onclick="event.stopPropagation();window.app.iniciarChat(\'' + amigo.id + '\')" style="background:#1A3A5C;color:white;border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;">💬</button></div>'; 
                    } 
                    if (processados >= conexoes.length) container.innerHTML = html; 
                });
            }
        })(i);
    }
    setTimeout(function() { if (processados < conexoes.length) container.innerHTML = html; }, 3000);
};

App.prototype.adicionarNaRede = function(pid) { 
    var s = this; 
    if (!s.usuarioLogado || s.usuarioLogado.id === pid) return; 
    s.mostrarToast('📩 Enviando convite...', 'info'); 
    
    if (typeof db !== 'undefined') { 
        db.collection('conexoes').where('participantes', 'array-contains', s.usuarioLogado.id).get()
            .then(function(snap) { 
                var existe = false; 
                snap.forEach(function(doc) { if (doc.data().participantes.indexOf(pid) >= 0) existe = true; }); 
                if (existe) { s.mostrarToast('Convite já enviado!', 'erro'); return; } 
                
                db.collection('conexoes').add({ 
                    participantes: [s.usuarioLogado.id, pid], status: 'pendente', 
                    solicitanteId: s.usuarioLogado.id, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
                }).then(function() { 
                    db.collection('notificacoes').add({ 
                        usuarioId: pid, titulo: '🔗 Convite de Rede', 
                        mensagem: s.usuarioLogado.nome + ' quer se conectar!', tipo: 'convite', 
                        de: s.usuarioLogado.id, lida: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() 
                    }); 
                    s.mostrarToast('✅ Convite enviado!', 'sucesso'); 
                }); 
            }); 
    }
};

App.prototype.aceitarConvite = function(nid, deId) { 
    var s = this; 
    if (typeof db !== 'undefined') { 
        db.collection('conexoes').where('participantes', 'array-contains', s.usuarioLogado.id).get()
            .then(function(snap) { 
                snap.forEach(function(doc) { 
                    var d = doc.data(); 
                    if (d.participantes?.indexOf(s.usuarioLogado.id) >= 0 && d.participantes?.indexOf(deId) >= 0 && d.status === 'pendente') 
                        db.collection('conexoes').doc(doc.id).update({ status: 'ativo' }); 
                }); 
            }); 
        db.collection('notificacoes').doc(nid).update({ lida: true }); 
        s.mostrarToast('✅ Conectados!', 'sucesso'); 
    } 
};

App.prototype.recusarConvite = function(nid, deId) { 
    if (typeof db !== 'undefined') { 
        db.collection('conexoes').where('participantes', 'array-contains', this.usuarioLogado.id).get()
            .then(function(snap) { 
                snap.forEach(function(doc) { 
                    var d = doc.data(); 
                    if (d.participantes?.indexOf(this.usuarioLogado.id) >= 0 && d.participantes?.indexOf(deId) >= 0 && d.status === 'pendente') 
                        db.collection('conexoes').doc(doc.id).delete(); 
                }); 
            }); 
        db.collection('notificacoes').doc(nid).update({ lida: true }); 
    } 
    this.mostrarToast('Convite recusado', 'info'); 
};

// ==========================================================
// ===== CHAT =====
// ==========================================================

App.prototype.carregarListaConversas = function() {
    var s = this;
    s.usuarioSelecionado = null;
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    var chatHeader = document.getElementById('chatHeaderInfo');
    var chatMessages = document.getElementById('chatMessages');
    if (chatHeader) chatHeader.innerHTML = '<h2>💬 Mensagens</h2>';
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:60px;color:#999;">Selecione um contato</div>';
    
    var inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer) inputContainer.style.display = 'none';
};

App.prototype.iniciarChat = function(uid) {
    var s = this;
    console.log('💬 Chat com:', uid);
    
    if (s._listenerChat) { s._listenerChat(); s._listenerChat = null; }
    
    if (typeof db !== 'undefined' && s.usuarioLogado) {
        db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                s.usuarioSelecionado = doc.data();
                s.usuarioSelecionado.id = doc.id;
            } else {
                s.usuarioSelecionado = { id: uid, nome: 'Usuário', profissao: '', fotoPerfil: null };
            }
            s.abrirInterfaceChat();
            s.iniciarListenerMensagens();
        }).catch(function() {
            s.usuarioSelecionado = { id: uid, nome: 'Usuário', profissao: '', fotoPerfil: null };
            s.abrirInterfaceChat();
        });
    }
    s.mostrarTela('chatScreen');
};

App.prototype.abrirInterfaceChat = function() {
    var s = this;
    var user = s.usuarioSelecionado;
    if (!user || !s.usuarioLogado) return;
    
    var chatHeader = document.getElementById('chatHeaderInfo');
    if (chatHeader) {
        chatHeader.innerHTML = '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;align-items:center;gap:10px;">' +
            '<button onclick="window.app.carregarListaConversas();" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">⬅</button>' +
            '<div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #f0c27f;">' +
            (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '👷') + '</div>' +
            '<strong>💬 ' + (user.nome || 'Usuário') + '</strong></div>';
    }
    
    var inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer) inputContainer.style.display = 'flex';
    
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.innerHTML = '<div style="text-align:center;padding:20px;">Carregando...</div>';
    
    setTimeout(function() {
        var input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 300);
};

App.prototype.iniciarListenerMensagens = function() {
    var s = this;
    var container = document.getElementById('chatMessages');
    if (!container || !s.usuarioLogado || !s.usuarioSelecionado) return;
    
    if (s._listenerChat) s._listenerChat();
    
    s._listenerChat = db.collection('mensagens')
        .where('participantes', 'array-contains', s.usuarioLogado.id)
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
            
            mensagens.sort(function(a, b) {
                var da = 0, db2 = 0;
                try {
                    da = a.dataEnvio?.toDate?.().getTime() || new Date(a.dataEnvio).getTime() || 0;
                    db2 = b.dataEnvio?.toDate?.().getTime() || new Date(b.dataEnvio).getTime() || 0;
                } catch(e) {}
                return da - db2;
            });
            
            if (mensagens.length === 0) {
                container.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Diga olá! 👋</div>';
            } else {
                var html = '';
                for (var i = 0; i < mensagens.length; i++) {
                    var msg = mensagens[i];
                    var meu = msg.remetenteId === s.usuarioLogado.id;
                    var hora = '';
                    try {
                        if (msg.dataEnvio?.toDate) hora = msg.dataEnvio.toDate().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
                        else if (msg.dataEnvio) hora = new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
                    } catch(e) {}
                    
                    html += '<div class="message ' + (meu ? 'message-sent' : 'message-received') + '">' +
                        '<div class="message-content">' + (msg.conteudo || '') + '</div>' +
                        '<div class="message-footer"><span class="message-time">' + hora + '</span></div></div>';
                }
                container.innerHTML = html;
                container.scrollTop = container.scrollHeight;
            }
        }, function(error) {
            console.error('❌ Erro chat:', error);
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#EF4444;">Erro ao carregar</div>';
        });
};

App.prototype.enviarMensagem = function() {
    var s = this;
    var input = document.getElementById('chatInput');
    if (!input || !s.usuarioLogado || !s.usuarioSelecionado) return;
    
    var texto = input.value.trim();
    if (!texto || s._enviandoMensagem) return;
    
    s._enviandoMensagem = true;
    input.value = '';
    
    var mensagem = {
        remetenteId: s.usuarioLogado.id,
        destinatarioId: s.usuarioSelecionado.id,
        participantes: [s.usuarioLogado.id, s.usuarioSelecionado.id],
        conteudo: texto,
        lida: false,
        dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('mensagens').add(mensagem).then(function() {
        db.collection('notificacoes').add({
            usuarioId: s.usuarioSelecionado.id,
            titulo: '💬 ' + s.usuarioLogado.nome,
            mensagem: texto.substring(0, 50),
            tipo: 'mensagem', de: s.usuarioLogado.id,
            lida: false, dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(){});
    }).catch(function(err) {
        console.error('Erro:', err);
    }).finally(function() {
        s._enviandoMensagem = false;
        setTimeout(function() { if (input) input.focus(); }, 100);
    });
};

// ==========================================================
// ===== BUSCA / PERFIL / OBRAS / NOTIFICAÇÕES =====
// ==========================================================

App.prototype.buscarProfissionais = function() { 
    var s = this;
    var container = document.getElementById('buscaResultados'); 
    if (!container) return; 
    container.innerHTML = '<div class="loading">Buscando...</div>'; 
    
    if (typeof db !== 'undefined') { 
        db.collection('usuarios').get().then(function(snap) { 
            var todos = []; 
            snap.forEach(function(doc) { 
                var u = doc.data(); u.id = doc.id; 
                if (u.id !== s.usuarioLogado?.id) todos.push(u); 
            }); 
            
            if (todos.length === 0) { 
                container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3></div>'; 
                return; 
            } 
            
            var html = ''; 
            for (var i = 0; i < todos.length; i++) { 
                var p = todos[i]; 
                html += '<div class="vaga-card" style="padding:12px;display:flex;align-items:center;gap:12px;">' +
                    '<div style="width:50px;height:50px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;">' + 
                    (p.fotoPerfil ? '<img src="' + p.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '👷') + '</div>' +
                    '<div style="flex:1;"><strong>' + p.nome + '</strong><br><small>🔧 ' + (p.profissao||'') + '</small></div>' +
                    '<button onclick="window.app.iniciarChat(\'' + p.id + '\')" style="background:#1A3A5C;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;">💬</button>' +
                    '<button onclick="window.app.adicionarNaRede(\'' + p.id + '\')" style="background:#10B981;color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;">+</button></div>'; 
            } 
            container.innerHTML = html; 
        }); 
    } 
};

App.prototype.verPerfil = function(uid) { 
    var s = this; 
    if (typeof db !== 'undefined') { 
        db.collection('usuarios').doc(uid).get().then(function(doc) { 
            if (!doc.exists) return; 
            var u = doc.data(); u.id = doc.id; 
            var conteudo = document.getElementById('perfilPublicoConteudo');
            if (conteudo) {
                conteudo.innerHTML = '<div style="text-align:center;padding:20px;">' +
                    '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:4px solid #f0c27f;">' + 
                    (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '👷') + '</div>' +
                    '<h2>' + u.nome + '</h2><p>' + (u.profissao||u.tipo||'') + ' • ⭐ ' + (u.score||0).toFixed(1) + '</p>' +
                    '<p>📅 Experiência: ' + (u.experiencia||'0') + ' anos</p></div>' +
                    '<div class="card"><p>📧 ' + (u.email||'') + '</p><p>📱 ' + (u.celular||'') + '</p></div>' +
                    '<button onclick="window.app.iniciarChat(\'' + u.id + '\')" class="btn btn-primary">💬 Chat</button>' +
                    '<button onclick="window.app.adicionarNaRede(\'' + u.id + '\')" class="btn btn-success">🔗 Conectar</button>';
            }
            s.mostrarTela('perfilPublicoScreen'); 
        }); 
    } 
};

App.prototype.carregarMeuPerfil = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    var u = s.usuarioLogado; 
    var tela = document.getElementById('meuPerfilScreen'); 
    if (!tela) return; 
    
    tela.innerHTML = '<div class="profile-header-container"><div class="profile-cover"></div>' +
        '<div class="profile-avatar-container"><div class="profile-avatar" onclick="document.getElementById(\'inputFoto\').click()">' +
        (u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : 
        '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;">') +
        '</div></div><input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;"></div>' +
        '<div class="profile-info-card"><h2>' + u.nome + '</h2><p>' + (u.profissao||u.tipo||'') + ' • ⭐ ' + (u.score||0).toFixed(1) + '</p>' +
        '<p>📧 ' + (u.email||'') + '</p><p>📱 ' + (u.celular||'') + '</p></div>' +
        '<div style="padding:16px;">' +
        '<button onclick="window.app.abrirEditarPerfil()" class="btn btn-primary">✏️ Editar</button>' +
        '<button onclick="window.app.gerarQRCodeCompartilhar()" class="btn btn-outline">📱 Compartilhar</button>' +
        '<button onclick="window.app.abrirMapaLocalizacao()" class="btn btn-outline">📍 Localização</button>' +
        '<button onclick="window.app.mostrarTela(\'configScreen\')" class="btn btn-outline">⚙️ Configurações</button>' +
        '<button onclick="document.getElementById(\'modalSair\').style.display=\'flex\'" class="btn btn-danger">🚪 Sair</button></div>';
};

App.prototype.carregarMinhasObras = function() { 
    var s = this;
    var container = document.getElementById('listaObrasContainer'); 
    if (!container || !s.usuarioLogado) return; 
    container.innerHTML = '<div class="loading">Carregando...</div>'; 
    
    if (typeof db !== 'undefined') { 
        db.collection('vagas').where('autorId', '==', s.usuarioLogado.id).where('ativa', '==', true).get()
            .then(function(snap) { 
                var minhas = []; 
                snap.forEach(function(doc) { var v = doc.data(); v.id = doc.id; minhas.push(v); }); 
                
                var total = document.getElementById('totalObras');
                if (total) total.textContent = minhas.length;
                
                if (minhas.length === 0) { 
                    container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma obra</h3>' +
                        '<button onclick="window.app.novaObra()" class="btn btn-primary">📢 Publicar</button></div>'; 
                    return; 
                } 
                
                var html = ''; 
                for (var i = 0; i < minhas.length; i++) { 
                    var v = minhas[i]; 
                    html += '<div class="vaga-card">';
                    if (v.fotoObra?.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:150px;object-fit:cover;">';
                    html += '<div style="padding:15px;"><strong>' + v.titulo + '</strong><br><small>📍 ' + v.endereco + '</small><br>' +
                        '<span class="vaga-tag">💰 R$' + v.valorHora + '/h</span> <span class="vaga-tag">👷 ' + v.profissoes + '</span>' +
                        '<div style="margin-top:10px;display:flex;gap:8px;">' +
                        '<button onclick="window.app.verDetalheObra(\'' + v.id + '\')" class="btn btn-small btn-outline" style="flex:1;">Ver</button>' +
                        '<button onclick="window.app.apagarObra(\'' + v.id + '\', event)" class="btn btn-small btn-danger" style="flex:1;">Apagar</button></div></div></div>'; 
                } 
                container.innerHTML = html; 
            }); 
    } 
};

App.prototype.verDetalheObra = function(oid) { 
    if (typeof db !== 'undefined') { 
        db.collection('vagas').doc(oid).get().then(function(doc) { 
            if (!doc.exists) return; 
            var v = doc.data(); v.id = doc.id; 
            var modalAntigo = document.getElementById('modalObra'); if (modalAntigo) modalAntigo.remove();
            
            var modal = document.createElement('div'); modal.id = 'modalObra';
            modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;';
            modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
            
            var html = '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">';
            if (v.fotoObra?.length > 100) html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:300px;object-fit:cover;">';
            html += '<div style="padding:20px;"><h2>' + v.titulo + '</h2><p>📍 ' + v.endereco + '</p><p>👷 ' + v.profissoes + '</p>' +
                '<p>💰 R$' + v.valorHora + '/h</p><p>' + (v.descricao||'') + '</p>' +
                '<button onclick="document.getElementById(\'modalObra\').remove()" style="width:100%;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;">Fechar</button></div></div>';
            modal.innerHTML = html;
            document.body.appendChild(modal);
        }); 
    } 
};

App.prototype.mostrarNotificacoes = function() { 
    var s = this; 
    if (!s.usuarioLogado) return; 
    
    if (typeof db !== 'undefined') { 
        db.collection('notificacoes').where('usuarioId', '==', s.usuarioLogado.id).get()
            .then(function(snap) { 
                var ns = []; 
                snap.forEach(function(doc) { var n = doc.data(); n.id = doc.id; ns.push(n); }); 
                
                ns.sort(function(a, b) {
                    var da = 0, db2 = 0;
                    try {
                        da = a.dataCriacao?.toDate?.().getTime() || 0;
                        db2 = b.dataCriacao?.toDate?.().getTime() || 0;
                    } catch(e) {}
                    return db2 - da;
                });
                
                var modalAntigo = document.getElementById('modalNotif'); if (modalAntigo) modalAntigo.remove();
                var modal = document.createElement('div'); modal.id = 'modalNotif';
                modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;';
                modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
                
                var html = '<div style="background:white;min-height:100vh;max-width:500px;margin:0 auto;">' +
                    '<div style="background:#1A3A5C;color:white;padding:15px;display:flex;justify-content:space-between;">' +
                    '<h3>🔔 Notificações</h3><button onclick="document.getElementById(\'modalNotif\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">✕</button></div>' +
                    '<div style="padding:15px;">';
                
                if (ns.length === 0) html += '<div style="text-align:center;padding:40px;"><h3>Nenhuma</h3></div>';
                else for (var i = 0; i < ns.length; i++) {
                    var n = ns[i];
                    html += '<div style="background:' + (n.lida?'#f9fafb':'#f0f9ff') + ';border-radius:10px;padding:12px;margin-bottom:8px;border-left:4px solid #1A3A5C;">' +
                        '<strong>' + n.titulo + '</strong><br><small>' + n.mensagem + '</small>';
                    if (n.tipo === 'convite' && !n.lida) {
                        html += '<div style="display:flex;gap:10px;margin-top:10px;">' +
                            '<button onclick="window.app.aceitarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#10B981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">✅ Aceitar</button>' +
                            '<button onclick="window.app.recusarConvite(\'' + n.id + '\',\'' + n.de + '\');document.getElementById(\'modalNotif\').remove();" style="flex:1;background:#EF4444;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;">❌ Recusar</button></div>';
                    }
                    html += '</div>';
                }
                html += '</div></div>';
                modal.innerHTML = html;
                document.body.appendChild(modal);
            }); 
    } 
};

// ==========================================================
// ===== LOCALIZAÇÃO / UPLOAD / EDITAR / QR / CONFIG =====
// ==========================================================

App.prototype.abrirMapaLocalizacao = function() { 
    var s = this; if (!s.usuarioLogado) return; 
    var u = s.usuarioLogado; 
    var modalAntigo = document.getElementById('modalLoc'); if (modalAntigo) modalAntigo.remove();
    var modal = document.createElement('div'); modal.id = 'modalLoc';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;';
    modal.innerHTML = '<div style="background:#1A3A5C;color:white;padding:20px;">' +
        '<button onclick="document.getElementById(\'modalLoc\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅ Voltar</button>' +
        '<h2>📍 Sua Localização</h2></div>' +
        '<div style="padding:20px;">' +
        '<div class="input-group"><label>Estado</label><select id="locEstado" onchange="window.app.atualizarCidades()" class="input-field"><option value="">Selecione...</option>' + s.getEstadosHTML(u.localizacao?.estado) + '</select></div>' +
        '<div class="input-group"><label>Cidade</label><select id="locCidade" onchange="window.app.atualizarBairros()" class="input-field"><option value="">Selecione...</option></select></div>' +
        '<div class="input-group"><label>Bairro</label><select id="locBairro" class="input-field"><option value="">Selecione...</option></select></div>' +
        '<button onclick="window.app.salvarLocalizacao()" class="btn btn-success" style="margin-top:10px;">💾 SALVAR LOCALIZAÇÃO</button>' +
        '<p style="text-align:center;color:#666;font-size:11px;margin-top:15px;">Sua localização aparecerá no mapa para outros profissionais</p></div>';
    document.body.appendChild(modal);
    if (u.localizacao?.estado) { 
        setTimeout(function() { window.app.atualizarCidades(u.localizacao.cidade); }, 300);
        if (u.localizacao.bairro) setTimeout(function() { window.app.atualizarBairros(u.localizacao.bairro); }, 600);
    }
};

App.prototype.getEstadosHTML = function(sel) { 
    var e = {'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia','CE':'Ceará','DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás','MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais','PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí','RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul','RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo','SE':'Sergipe','TO':'Tocantins'}; 
    var h = ''; for(var s in e) h += '<option value="'+s+'"'+(sel===s?' selected':'')+'>'+e[s]+'</option>'; return h; 
};

App.prototype.getTodasCidades = function() { 
    return {'SP':['São Paulo','Campinas','Santos','Guarulhos','Ribeirão Preto'],'RJ':['Rio de Janeiro','Niterói','Duque de Caxias'],'MG':['Belo Horizonte','Uberlândia','Contagem'],'BA':['Salvador','Feira de Santana','Vitória da Conquista'],'PR':['Curitiba','Londrina','Maringá'],'RS':['Porto Alegre','Caxias do Sul','Canoas'],'PE':['Recife','Jaboatão','Olinda'],'CE':['Fortaleza','Caucaia','Juazeiro do Norte'],'SC':['Florianópolis','Joinville','Blumenau'],'GO':['Goiânia','Aparecida de Goiânia','Anápolis'],'DF':['Brasília','Taguatinga']}; 
};

App.prototype.getBairrosPorCidade = function(c) { 
    var b = {'São Paulo':['Centro','Pinheiros','Vila Mariana','Moema'],'Rio de Janeiro':['Copacabana','Ipanema','Leblon','Barra da Tijuca'],'Belo Horizonte':['Savassi','Lourdes','Pampulha'],'Florianópolis':['Centro','Lagoa da Conceição','Ingleses'],'Curitiba':['Centro','Batel','Água Verde'],'Porto Alegre':['Moinhos de Vento','Bela Vista'],'Salvador':['Barra','Ondina','Pituba'],'Recife':['Boa Viagem','Pina'],'Fortaleza':['Meireles','Aldeota'],'Brasília':['Asa Sul','Asa Norte']}; 
    return b[c]||['Centro']; 
};

App.prototype.atualizarCidades = function(sel) { 
    var ee=document.getElementById('locEstado'), ce=document.getElementById('locCidade'); 
    if(!ee||!ce) return; var e=ee.value, cs=this.getTodasCidades(); 
    ce.innerHTML='<option value="">Selecione...</option>'; 
    if(e&&cs[e]) for(var i=0;i<cs[e].length;i++) ce.innerHTML+='<option value="'+cs[e][i]+'"'+(sel===cs[e][i]?' selected':'')+'>'+cs[e][i]+'</option>'; 
    var be=document.getElementById('locBairro'); if(be) be.innerHTML='<option value="">Selecione...</option>'; 
};

App.prototype.atualizarBairros = function(sel) { 
    var ce=document.getElementById('locCidade'), be=document.getElementById('locBairro'); 
    if(!ce||!be) return; var c=ce.value, bs=this.getBairrosPorCidade(c); 
    be.innerHTML='<option value="">Selecione...</option>'; 
    if(bs) for(var i=0;i<bs.length;i++) be.innerHTML+='<option value="'+bs[i]+'"'+(sel===bs[i]?' selected':'')+'>'+bs[i]+'</option>'; 
};

App.prototype.salvarLocalizacao = function() { 
    var s=this; 
    var es=document.getElementById('locEstado')?.value||'', ci=document.getElementById('locCidade')?.value||'', ba=document.getElementById('locBairro')?.value||''; 
    if(!es||!ci){s.mostrarToast('Selecione estado e cidade!','erro');return;} 
    s.usuarioLogado.localizacao={estado:es,cidade:ci,bairro:ba}; 
    localStorage.setItem('usuarioLPX',JSON.stringify(s.usuarioLogado)); 
    if(typeof db!=='undefined') {
        db.collection('usuarios').doc(s.usuarioLogado.id).update({localizacao:s.usuarioLogado.localizacao})
            .then(function() {
                console.log('✅ Localização salva');
                // Recarrega marcadores do mapa
                s.carregarMarcadoresMapa();
            });
    }
    document.getElementById('modalLoc')?.remove(); 
    s.mostrarToast('📍 Localização salva!', 'sucesso'); 
    s.carregarMeuPerfil(); 
};

App.prototype.uploadFoto = function(e) { 
    var s=this, f=e.target.files[0]; if(!f) return; 
    var r=new FileReader(); 
    r.onload=function(ev){ 
        s.usuarioLogado.fotoPerfil=ev.target.result; 
        localStorage.setItem('usuarioLPX',JSON.stringify(s.usuarioLogado)); 
        if(typeof db!=='undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update({fotoPerfil:ev.target.result}); 
        s.mostrarToast('📷 Foto atualizada!','sucesso'); s.carregarMeuPerfil(); 
    }; 
    r.readAsDataURL(f); 
};

App.prototype.abrirEditarPerfil = function() { 
    var s=this; if(!s.usuarioLogado) return; var u=s.usuarioLogado;
    var modalAntigo=document.getElementById('modalEditar'); if(modalAntigo) modalAntigo.remove();
    var modal=document.createElement('div'); modal.id='modalEditar';
    modal.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML='<div class="modal-content"><div class="modal-header"><h3>✏️ Editar Perfil</h3><button class="modal-close" onclick="document.getElementById(\'modalEditar\').remove()">✕</button></div>'+
        '<div class="modal-body"><div class="input-group"><label>Nome</label><input id="editNome" value="'+(u.nome||'')+'" class="input-field"></div>'+
        '<div class="input-group"><label>Celular</label><input id="editCelular" value="'+(u.celular||'')+'" class="input-field"></div>'+
        '<div class="input-group"><label>Profissão</label><input id="editProfissao" value="'+(u.profissao||'')+'" class="input-field"></div>'+
        '<div class="input-group"><label>Experiência (anos)</label><input id="editExperiencia" type="number" value="'+(u.experiencia||'0')+'" class="input-field"></div>'+
        '<button onclick="window.app.salvarPerfil()" class="btn btn-success">💾 SALVAR</button>'+
        '<button onclick="document.getElementById(\'modalEditar\').remove()" class="btn btn-danger">CANCELAR</button></div></div>';
    document.body.appendChild(modal);
};

App.prototype.salvarPerfil = function() { 
    var s=this; 
    var d={nome:document.getElementById('editNome')?.value?.trim()||s.usuarioLogado.nome,celular:document.getElementById('editCelular')?.value?.trim()||'',profissao:document.getElementById('editProfissao')?.value?.trim()||'',experiencia:document.getElementById('editExperiencia')?.value?.trim()||'0'}; 
    if(!d.nome){s.mostrarToast('Nome obrigatório!','erro');return;} 
    Object.assign(s.usuarioLogado,d); 
    localStorage.setItem('usuarioLPX',JSON.stringify(s.usuarioLogado)); 
    if(typeof db!=='undefined') db.collection('usuarios').doc(s.usuarioLogado.id).update(d); 
    document.getElementById('modalEditar')?.remove(); 
    s.mostrarToast('✅ Perfil atualizado!','sucesso'); s.carregarMeuPerfil(); 
};

App.prototype.gerarQRCodeCompartilhar = function() { 
    var s=this; if(!s.usuarioLogado) return; 
    var u=s.usuarioLogado, url=window.location.origin+window.location.pathname+'?perfil='+u.id;
    var modalAntigo=document.getElementById('modalQR'); if(modalAntigo) modalAntigo.remove();
    var modal=document.createElement('div'); modal.id='modalQR';
    modal.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML='<div class="modal-content" style="text-align:center;padding:30px;"><h3>📱 Compartilhar Perfil</h3>'+
        '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:10px auto;border:3px solid #F47920;">'+(u.fotoPerfil?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;object-fit:cover;">':'👷')+'</div>'+
        '<p><strong>'+u.nome+'</strong></p><div id="qrcodeContainer" style="display:flex;justify-content:center;margin:15px 0;"></div>'+
        '<p style="font-size:11px;color:#666;word-break:break-all;">'+url+'</p>'+
        '<button onclick="document.getElementById(\'modalQR\').remove()" class="btn btn-primary">FECHAR</button></div>';
    document.body.appendChild(modal);
    setTimeout(function(){var c=document.getElementById('qrcodeContainer');if(c&&typeof QRCode!=='undefined'){c.innerHTML='';new QRCode(c,{text:url,width:180,height:180,colorDark:'#1A3A5C',colorLight:'#ffffff'});}},300);
};

App.prototype.carregarConfigScreen = function() { 
    var s=this, tela=document.getElementById('configScreen'); if(!tela) return;
    tela.innerHTML='<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>⚙️ Configurações</h2></div>'+
        '<div style="padding:15px;"><div class="card"><h3>🎨 Tema</h3><div style="display:flex;gap:10px;margin-top:10px;">'+
        '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid '+(s.temaAtual==='claro'?'#1A3A5C':'#e5e7eb')+';background:'+(s.temaAtual==='claro'?'#1A3A5C':'white')+';color:'+(s.temaAtual==='claro'?'white':'#1A3A5C')+';cursor:pointer;">☀️ Claro</button>'+
        '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:10px;border:2px solid '+(s.temaAtual==='escuro'?'#1A3A5C':'#e5e7eb')+';background:'+(s.temaAtual==='escuro'?'#1A3A5C':'white')+';color:'+(s.temaAtual==='escuro'?'white':'#1A3A5C')+';cursor:pointer;">🌙 Escuro</button></div></div>'+
        '<div class="card"><h3>📄 Documentos</h3>'+
        '<button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso</button>'+
        '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">🔒 Privacidade</button></div>'+
        '<div class="card"><p style="text-align:center;color:#666;">LPXCONSTRUTOR v1.0<br>© 2024 Todos os direitos reservados</p></div></div>';
    s.mostrarTela('configScreen');
};

App.prototype.mostrarDocumento = function(tipo) { 
    var s=this, tt={termos:'📄 Termos de Uso',privacidade:'🔒 Privacidade'}, cc={termos:'<h3>Termos de Uso</h3><p>Ao utilizar o LPXCONSTRUTOR, você concorda com os termos de uso da plataforma.</p>',privacidade:'<h3>Política de Privacidade</h3><p>Seus dados são protegidos e não são compartilhados com terceiros.</p>'};
    var t=document.getElementById('documentoScreen'); if(!t){t=document.createElement('div');t.id='documentoScreen';t.className='screen';document.body.appendChild(t);}
    t.innerHTML='<div style="background:#1A3A5C;color:white;padding:20px;"><button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button><h2>'+(tt[tipo]||'')+'</h2></div><div style="padding:20px;">'+(cc[tipo]||'')+'</div>';
    s.mostrarTela('documentoScreen');
};

App.prototype.selecionarTema = function(tema) { 
    this.temaAtual=tema; localStorage.setItem('tema',tema); 
    if(tema==='escuro') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme'); 
    this.mostrarToast('🎨 Tema alterado!','sucesso'); this.carregarConfigScreen(); 
};

App.prototype.proximaEtapa = function(e) {
    if(e===1){document.getElementById('etapa1').style.display='block';document.getElementById('etapa2').style.display='none';}
    else if(e===2){document.getElementById('etapa1').style.display='none';document.getElementById('etapa2').style.display='block';}
};

App.prototype.toggleProfissao = function() {
    var tipo=document.getElementById('cadTipo').value, grupo=document.getElementById('grupoProfissao');
    if(grupo) grupo.style.display=tipo==='profissional'?'block':'none';
};

App.prototype.solicitarCodigo = function() {
    var s=this, email=document.getElementById('recEmail')?.value?.trim()||'';
    if(!email){s.mostrarToast('Digite seu email!','erro');return;}
    if(typeof firebase!=='undefined'&&firebase.auth) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function(){s.mostrarToast('📧 Email enviado!','sucesso');})
            .catch(function(){s.mostrarToast('Email não encontrado!','erro');});
    }
};

App.prototype.verificarCodigo = function() { this.mostrarToast('Use o link enviado por email!','info'); };
App.prototype.voltarPasso1 = function() { document.getElementById('recPasso1').style.display='block'; document.getElementById('recPasso2').style.display='none'; };

// ==========================================================
// ===== TOAST =====
// ==========================================================

App.prototype.mostrarToast = function(mensagem, tipo) { 
    var toast = document.getElementById('toast'); 
    if (!toast) { 
        toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast';
        document.body.appendChild(toast);
    } 
    if (!toast) return;
    toast.textContent = mensagem; 
    toast.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1A3A5C'; 
    toast.style.color = 'white'; toast.style.display = 'block'; 
    clearTimeout(this._toastTimeout); 
    this._toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 3000); 
};

// ==========================================================
// ===== INICIALIZAÇÃO =====
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ LPXCONSTRUTOR - SISTEMA COMPLETO');
    console.log('📡 Firebase:', typeof firebase !== 'undefined' ? '✅' : '❌');
    console.log('🗺️ Google Maps:', typeof google !== 'undefined' ? '✅' : '⏳ Aguardando...');
    console.log('💬 Chat em tempo real');
    console.log('🔥 Feed instantâneo');
    console.log('🏰👷 Mapa com marcadores emoji');
    
    var nav = document.getElementById('bottomNav'); 
    if (nav) nav.style.display = 'none';
    
    window.app._app = new App();
});
