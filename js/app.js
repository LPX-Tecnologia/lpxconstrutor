// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO E CORRIGIDO =====
// ==========================================================

if (!window.app || !window.app._app) { window.app = window.app || {}; window.app._app = window.app._app || null; }

window.app = {
    _app: null,
    fazerLogin: function(){ if(window.app._app)window.app._app.fazerLogin(); },
    mostrarTela: function(id){ if(window.app._app)window.app._app.mostrarTela(id); },
    voltarTela: function(){ if(window.app._app)window.app._app.voltarTela(); },
    cadastrar: function(){ if(window.app._app)window.app._app.cadastrar(); },
    proximaEtapa: function(e){ if(window.app._app)window.app._app.proximaEtapa(e); },
    toggleProfissao: function(){ if(window.app._app)window.app._app.toggleProfissao(); },
    solicitarCodigo: function(){ if(window.app._app)window.app._app.solicitarCodigo(); },
    verificarCodigo: function(){ if(window.app._app)window.app._app.verificarCodigo(); },
    voltarPasso1: function(){ if(window.app._app)window.app._app.voltarPasso1(); },
    sair: function(){ if(window.app._app)window.app._app.sair(); },
    buscarProfissionais: function(){ if(window.app._app)window.app._app.buscarProfissionais(); },
    verPerfil: function(uid){ if(window.app._app)window.app._app.verPerfil(uid); },
    iniciarChat: function(uid){ if(window.app._app)window.app._app.iniciarChat(uid); },
    enviarMensagem: function(){ if(window.app._app)window.app._app.enviarMensagem(); },
    abrirEditarPerfil: function(){ if(window.app._app)window.app._app.abrirEditarPerfil(); },
    salvarPerfil: function(){ if(window.app._app)window.app._app.salvarPerfil(); },
    uploadFoto: function(e){ if(window.app._app)window.app._app.uploadFoto(e); },
    abrirTelaPublicacao: function(vagaData){ if(window.app._app)window.app._app.abrirTelaPublicacao(vagaData); },
    publicarVagaApp: function(){ if(window.app._app)window.app._app.publicarVagaApp(); },
    previewFotoObra: function(e){ if(window.app._app)window.app._app.previewFotoObra(e); },
    candidatarVaga: function(vid){ if(window.app._app)window.app._app.candidatarVaga(vid); },
    abrirContratacao: function(uid){ if(window.app._app)window.app._app.abrirContratacao(uid); },
    confirmarContratacao: function(){ if(window.app._app)window.app._app.confirmarContratacao(); },
    novaObra: function(){ if(window.app._app)window.app._app.novaObra(); },
    carregarMinhasObras: function(){ if(window.app._app)window.app._app.carregarMinhasObras(); },
    verDetalheObra: function(oid){ if(window.app._app)window.app._app.verDetalheObra(oid); },
    demitirFuncionario: function(cid){ if(window.app._app)window.app._app.demitirFuncionario(cid); },
    finalizarContrato: function(cid){ if(window.app._app)window.app._app.finalizarContrato(cid); },
    adicionarNaRede: function(aid){ if(window.app._app)window.app._app.adicionarNaRede(aid); },
    removerDaRede: function(aid){ if(window.app._app)window.app._app.removerDaRede(aid); },
    verAvaliacoes: function(uid){ if(window.app._app)window.app._app.verAvaliacoes(uid); },
    abrirDarAvaliacao: function(uid){ if(window.app._app)window.app._app.abrirDarAvaliacao(uid); },
    setNota: function(n){ if(window.app._app)window.app._app.setNota(n); },
    enviarAvaliacao: function(){ if(window.app._app)window.app._app.enviarAvaliacao(); },
    gerarQRCode: function(uid){ if(window.app._app)window.app._app.gerarQRCode(uid); },
    fecharQRCode: function(){ if(window.app._app)window.app._app.fecharQRCode(); },
    baixarQRCode: function(){ if(window.app._app)window.app._app.baixarQRCode(); },
    selecionarIdioma: function(i){ if(window.app._app)window.app._app.selecionarIdioma(i); },
    selecionarTema: function(t){ if(window.app._app)window.app._app.selecionarTema(t); },
    mostrarInfoVersao: function(){ if(window.app._app)window.app._app.mostrarInfoVersao(); },
    confirmarExclusao: function(){ if(window.app._app)window.app._app.confirmarExclusao(); },
    mostrarModalSair: function(){ if(window.app._app)window.app._app.mostrarModalSair(); },
    fecharModalSair: function(){ if(window.app._app)window.app._app.fecharModalSair(); },
    confirmarSair: function(){ if(window.app._app)window.app._app.confirmarSair(); },
    mostrarNotificacoes: function(){ if(window.app._app)window.app._app.mostrarNotificacoes(); },
    mudarTab: function(t){ if(window.app._app)window.app._app.mudarTab(t); },
    carregarFeed: function(){ if(window.app._app)window.app._app.carregarFeed(); },
    carregarRede: function(){ if(window.app._app)window.app._app.carregarRede(); },
    buscarLocalizacao: function(){ if(window.app._app)window.app._app.buscarLocalizacao(); }
};

var App = function() {
    this.usuarioLogado = null; 
    this.usuarioSelecionado = null; 
    this.telaAtual = 'loginScreen';
    this.historicoTelas = []; 
    this.vagaFotoBase64 = null; 
    this.contratarProfId = null;
    this.obraSelecionada = null; 
    this.avaliarUid = null; 
    this.avaliarNota = 0;
    this.videoIndex = 0;
    this.vagaEmEdicao = null;
    this.vagaLocalizacaoAtual = null;
    this.init();
};

App.prototype.init = function() {
    var self = this; 
    console.log('🚀 Iniciando LPXCONSTRUTOR...'); 
    window.app._app = self;
    
    // Garantir que a barra de navegação comece oculta
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
    }
    
    self.mostrarSplash();
    
    // Verificar se authService existe
    if (typeof authService !== 'undefined' && authService.onAuthStateChange) {
        authService.onAuthStateChange(function(usuario) { 
            console.log('Auth state changed:', usuario ? 'Logado' : 'Deslogado');
            if (usuario) { 
                self.usuarioLogado = usuario; 
                self.atualizarBotoes(); 
                if (self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') {
                    self.mostrarTela('homeScreen');
                }
            } else { 
                self.usuarioLogado = null; 
                self.mostrarTela('loginScreen'); 
            } 
            setTimeout(function() { self.esconderSplash(); }, 1500); 
        });
    } else {
        console.warn('authService não encontrado, usando modo de demonstração');
        setTimeout(function() { 
            self.esconderSplash(); 
            // Criar usuário de demonstração
            self.usuarioLogado = {
                id: 'demo123',
                nome: 'Usuário Demo',
                email: 'demo@email.com',
                tipo: 'empreiteiro',
                profissao: 'Construtor',
                experiencia: '5',
                celular: '11999999999',
                fotoPerfil: null,
                score: 4.5
            };
            self.atualizarBotoes();
            self.mostrarTela('homeScreen');
        }, 2000);
    }
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) { 
        splash = document.createElement('div'); 
        splash.id = 'splashScreen'; 
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;'; 
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%23f0c27f%22/%3E%3Ctext x=%2260%22 y=%2260%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22%3E🏗️%3C/text%3E%3C/svg%3E"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p><div id="tijolosContainer" style="margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:2px;"></div>'; 
        document.body.appendChild(splash); 
        this.animarTijolos(); 
    }
};

App.prototype.animarTijolos = function() { 
    var container = document.getElementById('tijolosContainer'); 
    if (!container) return; 
    var fase = 0; 
    function animar() { 
        if (fase >= 4) { 
            container.innerHTML = ''; 
            fase = 0; 
            setTimeout(animar, 300); 
            return; 
        } 
        var linha = document.createElement('div'); 
        linha.style.cssText = 'display:flex;gap:2px;'; 
        if (fase % 2 === 1) linha.style.marginLeft = '8px'; 
        var qtdTijolos = fase === 0 ? 4 : fase === 1 ? 5 : fase === 2 ? 4 : 5; 
        for (var i = 0; i < qtdTijolos; i++) { 
            var tijolo = document.createElement('span'); 
            tijolo.textContent = '🧱'; 
            tijolo.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;'; 
            linha.appendChild(tijolo); 
        } 
        container.appendChild(linha); 
        fase++; 
        setTimeout(animar, fase < 4 ? 300 : 600); 
    } 
    animar(); 
};

App.prototype.esconderSplash = function() { 
    var splash = document.getElementById('splashScreen'); 
    if (splash) { 
        splash.style.opacity = '0'; 
        setTimeout(function() { 
            if (splash.parentNode) splash.parentNode.removeChild(splash); 
        }, 500); 
    } 
};

App.prototype.atualizarBotoes = function() { 
    var btnPublicar = document.getElementById('btnPublicar'); 
    if (btnPublicar) btnPublicar.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
    var btnObras = document.getElementById('btnObras'); 
    if (btnObras) btnObras.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
};

App.prototype.mostrarTela = function(id) {
    var self = this;
    console.log('📱 Mostrando tela:', id);
    
    // Ocultar barra de navegação
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // Adicionar ao histórico
    if (self.telaAtual && self.telaAtual !== id && self.telaAtual !== 'loginScreen') {
        self.historicoTelas.push(self.telaAtual);
    }
    
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(function(tela) { 
        tela.classList.remove('active'); 
    }); 
    
    // Mostrar tela desejada
    var tela = document.getElementById(id); 
    if (!tela) {
        console.error('❌ Tela não encontrada:', id);
        return;
    }
    
    tela.classList.add('active'); 
    self.telaAtual = id;
    
    // Mostrar barra de navegação apenas em telas específicas quando logado
    if (bottomNav && self.usuarioLogado) { 
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'minhasObrasScreen']; 
        if (telasComNav.indexOf(id) >= 0) {
            bottomNav.style.display = 'flex'; 
        }
    }
    
    // Carregar dados específicos de cada tela
    setTimeout(function() {
        if (id === 'homeScreen') self.carregarHome();
        if (id === 'meuPerfilScreen') self.carregarMeuPerfil();
        if (id === 'buscaScreen') self.buscarProfissionais();
        if (id === 'minhasObrasScreen') self.carregarMinhasObras();
    }, 100);
    
    // Tela de recuperação de senha
    if (id === 'recuperarSenhaScreen') { 
        var passo1 = document.getElementById('recPasso1');
        var passo2 = document.getElementById('recPasso2'); 
        if(passo1) passo1.style.display='block'; 
        if(passo2) passo2.style.display='none'; 
    }
};

App.prototype.voltarTela = function() { 
    if (this.historicoTelas.length > 0) { 
        var telaAnterior = this.historicoTelas.pop(); 
        this.mostrarTela(telaAnterior);
    } else { 
        this.mostrarTela('homeScreen'); 
    } 
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() { 
    var self = this; 
    var email = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value.trim() : ''; 
    var senha = document.getElementById('loginSenha') ? document.getElementById('loginSenha').value : ''; 
    
    if(!email || !senha){
        self.mostrarToast('❌ Preencha email e senha!', 'erro');
        return;
    } 
    
    self.mostrarToast('Entrando...', 'info');
    
    if (typeof authService !== 'undefined' && authService.login) {
        authService.login(email, senha).then(function(resposta){
            if(resposta.sucesso){
                self.usuarioLogado = resposta.usuario;
                self.mostrarToast('✅ Bem-vindo!', 'sucesso');
                self.atualizarBotoes();
                self.mostrarTela('homeScreen');
            } else {
                self.mostrarToast('❌ ' + resposta.erro, 'erro');
            }
        });
    } else {
        // Modo demonstração
        self.usuarioLogado = {
            id: 'demo123',
            nome: 'Usuário Demo',
            email: email,
            tipo: 'empreiteiro',
            profissao: 'Construtor',
            experiencia: '5',
            celular: '11999999999',
            fotoPerfil: null,
            score: 4.5
        };
        self.mostrarToast('✅ Bem-vindo! (Modo Demo)', 'sucesso');
        self.atualizarBotoes();
        self.mostrarTela('homeScreen');
    }
};

App.prototype.cadastrar = function() { 
    var self = this; 
    var dados = {
        nome: document.getElementById('cadNome') ? document.getElementById('cadNome').value : '',
        email: document.getElementById('cadEmail') ? document.getElementById('cadEmail').value : '',
        senha: document.getElementById('cadSenha') ? document.getElementById('cadSenha').value : '',
        tipo: document.getElementById('cadTipo') ? document.getElementById('cadTipo').value : 'profissional',
        celular: document.getElementById('cadCelular') ? document.getElementById('cadCelular').value : '',
        profissao: document.getElementById('cadProfissao') ? document.getElementById('cadProfissao').value : '',
        experiencia: document.getElementById('cadExperiencia') ? document.getElementById('cadExperiencia').value : '0'
    }; 
    
    if(!dados.nome || !dados.email || !dados.senha){
        self.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    } 
    
    self.mostrarToast('Cadastrando...', 'info');
    
    if (typeof authService !== 'undefined' && authService.cadastrar) {
        authService.cadastrar(dados).then(function(resposta){
            if(resposta.sucesso){
                self.usuarioLogado = resposta.usuario;
                self.mostrarToast('✅ Cadastro realizado!', 'sucesso');
                self.atualizarBotoes();
                self.mostrarTela('homeScreen');
            } else {
                self.mostrarToast('❌ ' + resposta.erro, 'erro');
            }
        });
    } else {
        // Modo demonstração
        self.usuarioLogado = {
            id: 'new' + Date.now(),
            nome: dados.nome,
            email: dados.email,
            tipo: dados.tipo,
            profissao: dados.profissao,
            experiencia: dados.experiencia,
            celular: dados.celular,
            fotoPerfil: null,
            score: 0
        };
        self.mostrarToast('✅ Cadastro realizado! (Modo Demo)', 'sucesso');
        self.atualizarBotoes();
        self.mostrarTela('homeScreen');
    }
};

App.prototype.proximaEtapa = function(e) { 
    var etapa1 = document.getElementById('etapa1');
    var etapa2 = document.getElementById('etapa2'); 
    if(!etapa1 || !etapa2) return; 
    etapa1.style.display = e === 1 ? 'block' : 'none'; 
    etapa2.style.display = e === 2 ? 'block' : 'none'; 
};

App.prototype.toggleProfissao = function() { 
    var grupo = document.getElementById('grupoProfissao'); 
    if(grupo) {
        var tipo = document.getElementById('cadTipo');
        grupo.style.display = tipo && tipo.value === 'profissional' ? 'block' : 'none'; 
    }
};

App.prototype.sair = function() { 
    var self = this; 
    if (typeof authService !== 'undefined' && authService.logout) {
        authService.logout().then(function(){
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
            self.mostrarToast('👋 Até logo!', 'sucesso');
        });
    } else {
        self.usuarioLogado = null;
        self.mostrarTela('loginScreen');
        self.mostrarToast('👋 Até logo!', 'sucesso');
    }
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var self = this;
    
    if (!self.usuarioLogado) {
        self.mostrarTela('loginScreen');
        return;
    }
    
    var hora = new Date().getHours(); 
    var saudacao = 'Bom dia'; 
    if (hora >= 12 && hora < 18) saudacao = 'Boa tarde'; 
    if (hora >= 18) saudacao = 'Boa noite';
    
    var elemento = document.getElementById('saudacao'); 
    if (elemento) elemento.textContent = '👋 ' + saudacao + ', ' + (self.usuarioLogado.nome || 'Usuário') + '!';
    
    var resumo = document.getElementById('resumoTexto'); 
    if (resumo) {
        var tipo = self.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional';
        resumo.textContent = tipo + ' • ' + (self.usuarioLogado.profissao || '');
    }
    
    // Carregar foto na home
    var fotoHome = document.querySelector('#homeScreen .logo-saudacao');
    if (fotoHome) { 
        if (self.usuarioLogado.fotoPerfil) { 
            fotoHome.src = self.usuarioLogado.fotoPerfil; 
            fotoHome.style.borderRadius = '50%'; 
            fotoHome.style.objectFit = 'cover'; 
        } else { 
            fotoHome.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; 
            fotoHome.style.borderRadius = '8px'; 
            fotoHome.style.objectFit = 'contain'; 
        }
    }
    
    self.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var self = this;
    var container = document.getElementById('feedContainer'); 
    if (!container) {
        console.error('Container do feed não encontrado');
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
    
    // Verificar se Firestore está disponível
    if (typeof db === 'undefined' || typeof firebase === 'undefined') {
        console.warn('Firebase não disponível, carregando dados de demonstração');
        self._carregarFeedDemo(container);
        return;
    }
    
    // Tentar carregar do Firestore
    db.collection('vagas').where('ativa', '==', true).get()
        .then(function(snapshot) {
            self._renderizarFeed(container, snapshot);
        })
        .catch(function(error) {
            console.error('Erro ao carregar feed:', error);
            self._carregarFeedDemo(container);
        });
};

App.prototype._carregarFeedDemo = function(container) {
    // Dados de demonstração
    var vagasDemo = [
        {
            id: 'demo1',
            titulo: 'Pedreiro para Reforma',
            endereco: 'Rua das Construções, 123 - Centro',
            profissoes: 'Pedreiro',
            valorHora: '25',
            fotoObra: null,
            localizacao: { lat: -23.5505, lng: -46.6333 },
            autorNome: 'Construtora ABC'
        },
        {
            id: 'demo2',
            titulo: 'Eletricista Urgente',
            endereco: 'Av. Principal, 456 - Jardim',
            profissoes: 'Eletricista',
            valorHora: '35',
            fotoObra: null,
            localizacao: { lat: -23.5612, lng: -46.6560 },
            autorNome: 'Empresa XYZ'
        }
    ];
    
    this._renderizarVagas(container, vagasDemo);
};

App.prototype._renderizarFeed = function(container, snapshot) {
    var vagas = [];
    if (snapshot && !snapshot.empty) {
        snapshot.forEach(function(doc) {
            var dados = doc.data();
            vagas.push({
                id: doc.id,
                titulo: dados.titulo || 'Vaga sem título',
                endereco: dados.endereco || 'Endereço não informado',
                profissoes: dados.profissoes || 'Todas',
                valorHora: dados.valorHora || '0',
                fotoObra: dados.fotoObra || null,
                localizacao: dados.localizacao || null,
                autorNome: dados.autorNome || 'Anônimo'
            });
        });
    }
    
    if (vagas.length === 0) {
        vagas = [
            {
                id: 'vazio',
                titulo: 'Nenhuma vaga disponível',
                endereco: 'Publique a primeira vaga!',
                profissoes: 'Todas',
                valorHora: '0',
                fotoObra: null,
                localizacao: null,
                autorNome: 'Sistema'
            }
        ];
    }
    
    this._renderizarVagas(container, vagas);
};

App.prototype._renderizarVagas = function(container, vagas) {
    var self = this;
    var html = '';
    
    vagas.forEach(function(vaga) {
        // Foto da obra
        var fotoHtml = '';
        if (vaga.fotoObra && typeof vaga.fotoObra === 'string' && vaga.fotoObra.length > 100) {
            fotoHtml = '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'" alt="Foto da obra">';
        }
        
        // Localização
        var localHtml = '';
        if (vaga.localizacao && vaga.localizacao.lat && vaga.localizacao.lng) {
            localHtml = '<div style="margin-top:8px;padding:8px;background:#f0f9ff;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-marker-alt" style="color:#1A3A5C;"></i><span style="font-size:12px;">📍 ' + (vaga.endereco || 'Ver no mapa') + '</span></div>';
        } else if (vaga.endereco) {
            localHtml = '<div style="margin-top:8px;padding:8px;background:#fef3c7;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-pin" style="color:#d97706;"></i><span style="font-size:12px;">📌 ' + vaga.endereco + '</span></div>';
        }
        
        html += '<div class="vaga-card" style="cursor:pointer;margin-bottom:16px;background:white;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">';
        html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">';
        html += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-hard-hat"></i></div>';
        html += '<div>';
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + vaga.titulo + '</div>';
        html += '<div style="font-size:12px;color:#6b7280;">📍 ' + (vaga.endereco || 'Local não informado') + '</div>';
        html += '</div></div>';
        html += '<div style="display:flex;gap:8px;margin-bottom:8px;">';
        html += '<span style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">💰 R$' + vaga.valorHora + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">👷 ' + vaga.profissoes + '</span>';
        html += '</div>';
        html += fotoHtml;
        html += localHtml;
        html += '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Publicado por: ' + vaga.autorNome + '</div>';
        html += '</div>';
    });
    
    container.innerHTML = html || '<div style="text-align:center;padding:20px;">Nenhuma vaga encontrada</div>';
};

// ===== PUBLICAÇÃO DE VAGA =====
App.prototype.abrirTelaPublicacao = function(vagaData) {
    var self = this;
    self.vagaEmEdicao = vagaData || null;
    self.vagaFotoBase64 = null;
    self.vagaLocalizacaoAtual = null;
    self.mostrarTela('publicarVagaScreen');
    
    setTimeout(function() {
        var titulo = document.getElementById('vagaTitulo');
        var endereco = document.getElementById('vagaEndereco');
        var profissoes = document.getElementById('vagaProfissoes');
        var valor = document.getElementById('vagaValor');
        var fotoPreview = document.getElementById('fotoObraPreview');
        
        if (self.vagaEmEdicao) {
            if (titulo) titulo.value = self.vagaEmEdicao.titulo || '';
            if (endereco) endereco.value = self.vagaEmEdicao.endereco || '';
            if (profissoes) profissoes.value = self.vagaEmEdicao.profissoes || '';
            if (valor) valor.value = self.vagaEmEdicao.valorHora || '';
            
            if (fotoPreview && self.vagaEmEdicao.fotoObra) {
                fotoPreview.src = self.vagaEmEdicao.fotoObra;
                fotoPreview.style.display = 'block';
                self.vagaFotoBase64 = self.vagaEmEdicao.fotoObra;
            }
            
            if (self.vagaEmEdicao.localizacao) {
                self.vagaLocalizacaoAtual = self.vagaEmEdicao.localizacao;
            }
        }
    }, 300);
};

App.prototype.previewFotoObra = function(event) {
    var self = this;
    var arquivo = event.target.files[0];
    
    if (!arquivo) return;
    
    if (!arquivo.type.match('image.*')) {
        self.mostrarToast('❌ Selecione uma imagem!', 'erro');
        event.target.value = '';
        return;
    }
    
    if (arquivo.size > 5 * 1024 * 1024) {
        self.mostrarToast('❌ Imagem muito grande! Máx: 5MB', 'erro');
        event.target.value = '';
        return;
    }
    
    var leitor = new FileReader();
    leitor.onload = function(e) {
        self.vagaFotoBase64 = e.target.result;
        var preview = document.getElementById('fotoObraPreview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
    };
    leitor.readAsDataURL(arquivo);
};

App.prototype.buscarLocalizacao = function() {
    var self = this;
    var enderecoInput = document.getElementById('vagaEndereco');
    var endereco = enderecoInput ? enderecoInput.value.trim() : '';
    
    if (!endereco) {
        self.mostrarToast('❌ Digite um endereço!', 'erro');
        return;
    }
    
    self.mostrarToast('🔍 Buscando localização...', 'info');
    
    // Simular geocodificação
    setTimeout(function() {
        var coordenadas = {
            lat: -23.5505 + (Math.random() - 0.5) * 0.1,
            lng: -46.6333 + (Math.random() - 0.5) * 0.1
        };
        self.vagaLocalizacaoAtual = coordenadas;
        self.mostrarToast('✅ Localização encontrada!', 'sucesso');
        
        if (typeof mapaService !== 'undefined') {
            mapaService.initMap(coordenadas.lat, coordenadas.lng);
            mapaService.adicionarMarcador(coordenadas.lat, coordenadas.lng, endereco);
        }
    }, 1000);
};

App.prototype.publicarVagaApp = function() {
    var self = this;
    
    var titulo = document.getElementById('vagaTitulo') ? document.getElementById('vagaTitulo').value.trim() : '';
    var endereco = document.getElementById('vagaEndereco') ? document.getElementById('vagaEndereco').value.trim() : '';
    var profissoes = document.getElementById('vagaProfissoes') ? document.getElementById('vagaProfissoes').value.trim() : '';
    var valorHora = document.getElementById('vagaValor') ? document.getElementById('vagaValor').value.trim() : '';
    var fotoBase64 = self.vagaFotoBase64;
    
    if (!titulo || !endereco || !profissoes || !valorHora) {
        self.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    var dadosVaga = {
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: fotoBase64 || null,
        localizacao: self.vagaLocalizacaoAtual || null,
        autorId: self.usuarioLogado ? self.usuarioLogado.id : 'anonimo',
        autorNome: self.usuarioLogado ? self.usuarioLogado.nome : 'Anônimo',
        ativa: true,
        dataCriacao: new Date().toISOString()
    };
    
    console.log('📤 Publicando vaga:', dadosVaga);
    
    // Tentar salvar no Firestore
    if (typeof db !== 'undefined') {
        var promise;
        if (self.vagaEmEdicao && self.vagaEmEdicao.id) {
            promise = db.collection('vagas').doc(self.vagaEmEdicao.id).update(dadosVaga);
        } else {
            promise = db.collection('vagas').add(dadosVaga);
        }
        
        promise.then(function() {
            self.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
            self.vagaEmEdicao = null;
            self.vagaLocalizacaoAtual = null;
            self.vagaFotoBase64 = null;
            self.mostrarTela('homeScreen');
            setTimeout(function() { self.carregarFeed(); }, 300);
        }).catch(function(error) {
            console.error('Erro:', error);
            self.mostrarToast('❌ Erro ao publicar vaga', 'erro');
        });
    } else {
        // Modo demo
        self.mostrarToast('✅ Vaga publicada! (Modo Demo)', 'sucesso');
        self.vagaEmEdicao = null;
        self.vagaLocalizacaoAtual = null;
        self.vagaFotoBase64 = null;
        self.mostrarTela('homeScreen');
        setTimeout(function() { self.carregarFeed(); }, 300);
    }
};

// ===== BUSCA DE PROFISSIONAIS =====
App.prototype.buscarProfissionais = function() {
    var self = this;
    var container = document.getElementById('buscaResultados');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando profissionais...</div>';
    
    // Tentar carregar do Firestore
    if (typeof db !== 'undefined') {
        db.collection('usuarios').where('tipo', '==', 'profissional').where('ativo', '==', true).get()
            .then(function(snapshot) {
                var profissionais = [];
                if (!snapshot.empty) {
                    snapshot.forEach(function(doc) {
                        var dados = doc.data();
                        profissionais.push({
                            id: doc.id,
                            nome: dados.nome || 'Profissional',
                            profissao: dados.profissao || 'Não especificada',
                            experiencia: dados.experiencia || '0',
                            celular: dados.celular || '',
                            fotoPerfil: dados.fotoPerfil || null,
                            score: dados.score || 0
                        });
                    });
                }
                self._renderizarProfissionais(container, profissionais);
            })
            .catch(function(error) {
                console.error('Erro ao buscar:', error);
                self._carregarProfissionaisDemo(container);
            });
    } else {
        self._carregarProfissionaisDemo(container);
    }
};

App.prototype._carregarProfissionaisDemo = function(container) {
    var profissionais = [
        { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5 },
        { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8 },
        { id: 'p3', nome: 'Carlos Oliveira', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2 }
    ];
    this._renderizarProfissionais(container, profissionais);
};

App.prototype._renderizarProfissionais = function(container, profissionais) {
    if (profissionais.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><i class="fas fa-user-slash" style="font-size:48px;color:#9ca3af;"></i><h3>Nenhum profissional encontrado</h3></div>';
        return;
    }
    
    var html = '';
    profissionais.forEach(function(prof) {
        var whatsapp = prof.celular ? prof.celular.replace(/\D/g, '') : '';
        var foto = prof.fotoPerfil ? 
            '<img src="' + prof.fotoPerfil + '" style="width:50px;height:50px;border-radius:50%;object-fit:cover;">' : 
            '<i class="fas fa-user" style="font-size:24px;color:#1A3A5C;"></i>';
        var estrelas = '⭐'.repeat(Math.round(prof.score || 0));
        
        html += '<div class="card" style="margin-bottom:12px;padding:16px;">';
        html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">';
        html += '<div style="width:50px;height:50px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;">' + foto + '</div>';
        html += '<div>';
        html += '<div style="font-weight:bold;">' + prof.nome + '</div>';
        html += '<div style="font-size:12px;color:#6b7280;">' + prof.profissao + ' • ' + prof.experiencia + ' anos</div>';
        html += '<div style="color:#f59e0b;">' + estrelas + '</div>';
        html += '</div></div>';
        html += '<div style="display:flex;gap:8px;">';
        if (whatsapp) {
            html += '<a href="https://wa.me/55' + whatsapp + '" target="_blank" class="btn btn-success btn-small" style="flex:1;text-align:center;text-decoration:none;background:#25D366;color:white;padding:8px;border-radius:8px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
        }
        html += '<button class="btn btn-primary btn-small" onclick="window.app.iniciarChat(\'' + prof.id + '\')" style="flex:1;background:#1A3A5C;color:white;padding:8px;border-radius:8px;border:none;"><i class="fas fa-comments"></i> Chat</button>';
        html += '</div></div>';
    });
    
    container.innerHTML = html;
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    var self = this;
    console.log('👤 Carregando perfil...');
    
    if (!self.usuarioLogado) {
        console.log('Usuário não logado');
        return;
    }
    
    // Remover loading
    var loading = document.getElementById('perfilLoading');
    if (loading) loading.style.display = 'none';
    
    // Preencher dados
    var elementos = {
        nome: document.getElementById('perfilNome'),
        profissao: document.getElementById('perfilProfissao'),
        email: document.getElementById('perfilEmail'),
        celular: document.getElementById('perfilCelular'),
        foto: document.getElementById('perfilFoto'),
        icone: document.getElementById('perfilIcon')
    };
    
    if (elementos.nome) elementos.nome.textContent = self.usuarioLogado.nome || 'Usuário';
    if (elementos.profissao) elementos.profissao.textContent = (self.usuarioLogado.profissao || 'Profissional') + ' • ' + (self.usuarioLogado.experiencia || '0') + ' anos';
    if (elementos.email) elementos.email.textContent = '📧 ' + (self.usuarioLogado.email || 'Não informado');
    if (elementos.celular) elementos.celular.textContent = '📱 ' + (self.usuarioLogado.celular || 'Não informado');
    
    // Foto do perfil
    if (elementos.foto) {
        if (self.usuarioLogado.fotoPerfil) {
            elementos.foto.src = self.usuarioLogado.fotoPerfil;
            elementos.foto.style.display = 'block';
            if (elementos.icone) elementos.icone.style.display = 'none';
        } else {
            elementos.foto.style.display = 'none';
            if (elementos.icone) elementos.icone.style.display = 'block';
        }
    }
    
    console.log('✅ Perfil carregado');
};

App.prototype.verPerfil = function(uid) {
    var self = this;
    var container = document.getElementById('perfilPublicoConteudo');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Carregando...</div>';
    self.mostrarTela('perfilPublicoScreen');
    
    // Dados de demonstração
    var perfil = {
        nome: 'Profissional',
        profissao: 'Construtor',
        experiencia: '5',
        celular: '11999999999',
        fotoPerfil: null,
        score: 4.5
    };
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get()
            .then(function(doc) {
                if (doc.exists) {
                    var dados = doc.data();
                    perfil = {
                        nome: dados.nome || 'Profissional',
                        profissao: dados.profissao || 'Não especificada',
                        experiencia: dados.experiencia || '0',
                        celular: dados.celular || '',
                        fotoPerfil: dados.fotoPerfil || null,
                        score: dados.score || 0
                    };
                }
                self._renderizarPerfil(container, perfil, uid);
            })
            .catch(function() {
                self._renderizarPerfil(container, perfil, uid);
            });
    } else {
        self._renderizarPerfil(container, perfil, uid);
    }
};

App.prototype._renderizarPerfil = function(container, perfil, uid) {
    var foto = perfil.fotoPerfil ? 
        '<img src="' + perfil.fotoPerfil + '" style="width:100px;height:100px;border-radius:50%;object-fit:cover;">' : 
        '<i class="fas fa-user" style="font-size:48px;color:#1A3A5C;"></i>';
    var whatsapp = perfil.celular ? perfil.celular.replace(/\D/g, '') : '';
    
    var html = '<div style="text-align:center;padding:20px;">';
    html += '<div style="width:100px;height:100px;background:#f0f0f0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">' + foto + '</div>';
    html += '<h2>' + perfil.nome + '</h2>';
    html += '<p>' + perfil.profissao + ' • ' + perfil.experiencia + ' anos</p>';
    html += '<p style="color:#f59e0b;">' + '⭐'.repeat(Math.round(perfil.score)) + '</p>';
    if (whatsapp) {
        html += '<a href="https://wa.me/55' + whatsapp + '" target="_blank" class="btn btn-success" style="margin:8px;display:inline-block;text-decoration:none;background:#25D366;color:white;padding:10px 20px;border-radius:8px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
    }
    html += '<button class="btn btn-primary" onclick="window.app.iniciarChat(\'' + uid + '\')" style="margin:8px;background:#1A3A5C;color:white;padding:10px 20px;border-radius:8px;border:none;">💬 Chat</button>';
    html += '</div>';
    
    container.innerHTML = html;
};

// ===== FUNÇÕES AUXILIARES =====
App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Abrindo chat...', 'info');
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.abrirContratacao = function(uid) {
    this.mostrarToast('🤝 Abrindo contratação...', 'info');
};

App.prototype.carregarMinhasObras = function() {
    var container = document.getElementById('minhasObrasContainer');
    if (container) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><h3>🏗️ Minhas Obras</h3><p>Nenhuma obra cadastrada ainda.</p></div>';
    }
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:none;max-width:90%;text-align:center;color:white;';
        document.body.appendChild(toast);
    }
    
    if (tipo === 'sucesso') toast.style.background = '#10B981';
    else if (tipo === 'erro') toast.style.background = '#EF4444';
    else if (tipo === 'info') toast.style.background = '#3B82F6';
    else toast.style.background = '#1A3A5C';
    
    toast.textContent = mensagem;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(function() { toast.style.display = 'none'; }, 300);
    }, 3000);
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado');
    if (!window.app._app) {
        console.log('🚀 Iniciando aplicação');
        new App();
    } else {
        console.log('⚠️ Aplicação já iniciada');
    }
});
