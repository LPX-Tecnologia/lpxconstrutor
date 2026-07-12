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
    
    // Verificar authService ou criar demo
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
        // Modo demonstração
        console.warn('authService não encontrado, usando modo demo');
        setTimeout(function() { 
            self.esconderSplash();
            self.usuarioLogado = {
                id: 'demo123',
                nome: 'Carlos Silva',
                email: 'carlos@email.com',
                tipo: 'empreiteiro',
                profissao: 'Engenheiro Civil',
                experiencia: '8',
                celular: '(11) 99999-9999',
                fotoPerfil: null,
                score: 4.7
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
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%23f0c27f%22/%3E%3Ctext x=%2260%22 y=%2260%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22%3E🏗️%3C/text%3E%3C/svg%3E"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>'; 
        document.body.appendChild(splash);
    }
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
            nome: 'Carlos Silva',
            email: email,
            tipo: 'empreiteiro',
            profissao: 'Engenheiro Civil',
            experiencia: '8',
            celular: '(11) 99999-9999',
            fotoPerfil: null,
            score: 4.7
        };
        self.mostrarToast('✅ Bem-vindo! (Modo Demo)', 'sucesso');
        self.atualizarBotoes();
        self.mostrarTela('homeScreen');
    }
};

App.prototype.sair = function() { 
    var self = this; 
    self.usuarioLogado = null;
    self.mostrarTela('loginScreen');
    self.mostrarToast('👋 Até logo!', 'sucesso');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var self = this;
    
    if (!self.usuarioLogado) {
        self.mostrarTela('loginScreen');
        return;
    }
    
    console.log('🏠 Carregando home para:', self.usuarioLogado.nome);
    
    var hora = new Date().getHours(); 
    var saudacao = 'Bom dia'; 
    if (hora >= 12 && hora < 18) saudacao = 'Boa tarde'; 
    if (hora >= 18) saudacao = 'Boa noite';
    
    var elSaudacao = document.getElementById('saudacao'); 
    if (elSaudacao) {
        elSaudacao.textContent = '👋 ' + saudacao + ', ' + (self.usuarioLogado.nome || 'Usuário') + '!';
        console.log('✅ Saudação atualizada');
    } else {
        console.warn('⚠️ Elemento saudacao não encontrado');
    }
    
    var elResumo = document.getElementById('resumoTexto'); 
    if (elResumo) {
        var tipo = self.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional';
        elResumo.textContent = tipo + ' • ' + (self.usuarioLogado.profissao || '');
        console.log('✅ Resumo atualizado');
    }
    
    self.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var self = this;
    var container = document.getElementById('feedContainer'); 
    if (!container) {
        console.error('❌ Container do feed não encontrado');
        return;
    }
    
    container.innerHTML = '<div style="text-align:center;padding:20px;"><i class="fas fa-spinner fa-spin"></i> Carregando vagas...</div>';
    
    // Dados de demonstração
    setTimeout(function() {
        var vagas = [
            {
                id: 'v1',
                titulo: 'Pedreiro para Reforma Residencial',
                endereco: 'Rua das Flores, 123 - Centro, São Paulo',
                profissoes: 'Pedreiro, Servente',
                valorHora: '25',
                fotoObra: null,
                localizacao: { lat: -23.5505, lng: -46.6333 },
                autorNome: 'Carlos Silva'
            },
            {
                id: 'v2',
                titulo: 'Eletricista Urgente - Instalação',
                endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
                profissoes: 'Eletricista',
                valorHora: '40',
                fotoObra: null,
                localizacao: { lat: -23.5612, lng: -46.6560 },
                autorNome: 'Maria Santos'
            },
            {
                id: 'v3',
                titulo: 'Pintor para Apartamento',
                endereco: 'Rua Augusta, 500 - Consolação, São Paulo',
                profissoes: 'Pintor',
                valorHora: '30',
                fotoObra: null,
                localizacao: { lat: -23.5550, lng: -46.6450 },
                autorNome: 'João Oliveira'
            }
        ];
        
        var html = '';
        vagas.forEach(function(vaga) {
            var fotoHtml = '';
            if (vaga.fotoObra) {
                fotoHtml = '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
            }
            
            html += '<div class="vaga-card" style="background:white;border-radius:12px;padding:16px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">';
            html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">';
            html += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">🏗️</div>';
            html += '<div style="flex:1;">';
            html += '<div style="font-weight:bold;color:#1A3A5C;font-size:16px;">' + vaga.titulo + '</div>';
            html += '<div style="font-size:12px;color:#6b7280;">📍 ' + vaga.endereco + '</div>';
            html += '</div></div>';
            html += '<div style="display:flex;gap:8px;margin-bottom:8px;">';
            html += '<span style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">💰 R$' + vaga.valorHora + '/h</span>';
            html += '<span style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">👷 ' + vaga.profissoes + '</span>';
            html += '</div>';
            html += fotoHtml;
            html += '<div style="margin-top:8px;padding:8px;background:#f0f9ff;border-radius:8px;display:flex;align-items:center;gap:8px;">';
            html += '<i class="fas fa-map-marker-alt" style="color:#1A3A5C;"></i>';
            html += '<span style="font-size:12px;">📍 ' + vaga.endereco + '</span>';
            html += '</div>';
            html += '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Publicado por: ' + vaga.autorNome + '</div>';
            html += '</div>';
        });
        
        container.innerHTML = html;
        console.log('✅ Feed carregado com ' + vagas.length + ' vagas');
    }, 500);
};

// ===== PUBLICAÇÃO DE VAGA (CORRIGIDO - FOTO PREVIEW) =====
App.prototype.abrirTelaPublicacao = function(vagaData) {
    var self = this;
    self.vagaEmEdicao = vagaData || null;
    self.vagaFotoBase64 = null;
    self.vagaLocalizacaoAtual = null;
    self.mostrarTela('publicarVagaScreen');
    
    console.log('📝 Abrindo tela de publicação');
    
    setTimeout(function() {
        var tituloEl = document.getElementById('vagaTitulo');
        var enderecoEl = document.getElementById('vagaEndereco');
        var profissoesEl = document.getElementById('vagaProfissoes');
        var valorEl = document.getElementById('vagaValor');
        var fotoPreview = document.getElementById('fotoObraPreview');
        var inputFile = document.getElementById('fotoObraInput');
        
        // Configurar preview da foto
        if (inputFile) {
            console.log('✅ Input de foto encontrado');
            inputFile.addEventListener('change', function(e) {
                console.log('📸 Foto selecionada');
                self.previewFotoObra(e);
            });
        } else {
            console.warn('⚠️ Input de foto não encontrado');
        }
        
        // Preencher campos se estiver editando
        if (self.vagaEmEdicao) {
            console.log('📝 Editando vaga existente');
            if (tituloEl) tituloEl.value = self.vagaEmEdicao.titulo || '';
            if (enderecoEl) enderecoEl.value = self.vagaEmEdicao.endereco || '';
            if (profissoesEl) profissoesEl.value = self.vagaEmEdicao.profissoes || '';
            if (valorEl) valorEl.value = self.vagaEmEdicao.valorHora || '';
            
            if (fotoPreview && self.vagaEmEdicao.fotoObra) {
                fotoPreview.src = self.vagaEmEdicao.fotoObra;
                fotoPreview.style.display = 'block';
                self.vagaFotoBase64 = self.vagaEmEdicao.fotoObra;
            }
        } else {
            // Limpar campos
            if (tituloEl) tituloEl.value = '';
            if (enderecoEl) enderecoEl.value = '';
            if (profissoesEl) profissoesEl.value = '';
            if (valorEl) valorEl.value = '';
            if (fotoPreview) {
                fotoPreview.src = '';
                fotoPreview.style.display = 'none';
            }
        }
    }, 300);
};

// CORRIGIDO: Função de preview da foto
App.prototype.previewFotoObra = function(event) {
    var self = this;
    console.log('📸 Processando foto...');
    
    var input = event.target;
    var arquivo = input.files[0];
    
    if (!arquivo) {
        console.log('❌ Nenhum arquivo selecionado');
        return;
    }
    
    console.log('📁 Arquivo:', arquivo.name, 'Tipo:', arquivo.type, 'Tamanho:', (arquivo.size / 1024).toFixed(2) + 'KB');
    
    // Verificar se é imagem
    if (!arquivo.type.match('image.*')) {
        self.mostrarToast('❌ Selecione uma imagem (JPG, PNG, GIF)!', 'erro');
        input.value = '';
        return;
    }
    
    // Verificar tamanho (máximo 5MB)
    if (arquivo.size > 5 * 1024 * 1024) {
        self.mostrarToast('❌ Imagem muito grande! Máximo 5MB', 'erro');
        input.value = '';
        return;
    }
    
    var leitor = new FileReader();
    
    leitor.onloadstart = function() {
        console.log('⏳ Iniciando leitura do arquivo...');
    };
    
    leitor.onload = function(e) {
        console.log('✅ Foto carregada com sucesso!');
        var imagemBase64 = e.target.result;
        self.vagaFotoBase64 = imagemBase64;
        
        // Mostrar preview
        var preview = document.getElementById('fotoObraPreview');
        if (preview) {
            preview.src = imagemBase64;
            preview.style.display = 'block';
            preview.style.maxWidth = '100%';
            preview.style.maxHeight = '200px';
            preview.style.objectFit = 'cover';
            preview.style.borderRadius = '8px';
            preview.style.marginTop = '8px';
            console.log('✅ Preview atualizado');
        } else {
            console.warn('⚠️ Elemento fotoObraPreview não encontrado');
            // Criar preview se não existir
            var container = input.parentElement;
            if (container) {
                var img = document.createElement('img');
                img.id = 'fotoObraPreview';
                img.src = imagemBase64;
                img.style.cssText = 'display:block;max-width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-top:8px;';
                container.appendChild(img);
                console.log('✅ Preview criado dinamicamente');
            }
        }
        
        self.mostrarToast('📸 Foto carregada!', 'sucesso');
    };
    
    leitor.onerror = function() {
        console.error('❌ Erro ao ler arquivo');
        self.mostrarToast('❌ Erro ao carregar imagem!', 'erro');
        input.value = '';
    };
    
    leitor.onprogress = function(e) {
        if (e.lengthComputable) {
            var porcentagem = Math.round((e.loaded / e.total) * 100);
            console.log('⏳ Carregando: ' + porcentagem + '%');
        }
    };
    
    // Iniciar leitura
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
    
    console.log('📤 Publicando vaga:', { titulo, endereco, profissoes, valorHora, temFoto: !!self.vagaFotoBase64 });
    
    if (!titulo || !endereco || !profissoes || !valorHora) {
        self.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    var dadosVaga = {
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: self.vagaFotoBase64 || null,
        localizacao: self.vagaLocalizacaoAtual || null,
        autorId: self.usuarioLogado ? self.usuarioLogado.id : 'anonimo',
        autorNome: self.usuarioLogado ? self.usuarioLogado.nome : 'Anônimo',
        ativa: true,
        dataCriacao: new Date().toISOString()
    };
    
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
            console.error('Erro ao publicar:', error);
            self.mostrarToast('❌ Erro ao publicar vaga', 'erro');
        });
    } else {
        // Modo demo
        console.log('✅ Vaga publicada (demo):', dadosVaga);
        self.mostrarToast('✅ Vaga publicada! (Modo Demo)', 'sucesso');
        self.vagaEmEdicao = null;
        self.vagaLocalizacaoAtual = null;
        self.vagaFotoBase64 = null;
        self.mostrarTela('homeScreen');
        setTimeout(function() { self.carregarFeed(); }, 300);
    }
};

// ===== PERFIL (CORRIGIDO - CARREGAMENTO DOS DADOS) =====
App.prototype.carregarMeuPerfil = function() {
    var self = this;
    console.log('👤 Carregando perfil do usuário...');
    
    if (!self.usuarioLogado) {
        console.log('❌ Usuário não logado');
        self.mostrarTela('loginScreen');
        return;
    }
    
    console.log('📊 Dados do usuário:', self.usuarioLogado);
    
    // Buscar elementos do perfil
    var nomeEl = document.getElementById('perfilNome');
    var profissaoEl = document.getElementById('perfilProfissao');
    var emailEl = document.getElementById('perfilEmail');
    var celularEl = document.getElementById('perfilCelular');
    var fotoEl = document.getElementById('perfilFoto');
    var iconeEl = document.getElementById('perfilIcon');
    var loadingEl = document.getElementById('perfilLoading');
    
    // Esconder loading
    if (loadingEl) {
        loadingEl.style.display = 'none';
        console.log('✅ Loading escondido');
    }
    
    // Preencher nome
    if (nomeEl) {
        nomeEl.textContent = self.usuarioLogado.nome || 'Usuário';
        console.log('✅ Nome:', self.usuarioLogado.nome);
    } else {
        console.warn('⚠️ Elemento perfilNome não encontrado');
    }
    
    // Preencher profissão
    if (profissaoEl) {
        var profissao = self.usuarioLogado.profissao || 'Profissional';
        var experiencia = self.usuarioLogado.experiencia || '0';
        profissaoEl.textContent = profissao + ' • ' + experiencia + ' anos de experiência';
        console.log('✅ Profissão:', profissao);
    } else {
        console.warn('⚠️ Elemento perfilProfissao não encontrado');
    }
    
    // Preencher email
    if (emailEl) {
        emailEl.textContent = '📧 ' + (self.usuarioLogado.email || 'Email não informado');
        console.log('✅ Email:', self.usuarioLogado.email);
    }
    
    // Preencher celular
    if (celularEl) {
        celularEl.textContent = '📱 ' + (self.usuarioLogado.celular || 'Celular não informado');
        console.log('✅ Celular:', self.usuarioLogado.celular);
    }
    
    // Carregar foto
    if (fotoEl) {
        if (self.usuarioLogado.fotoPerfil) {
            fotoEl.src = self.usuarioLogado.fotoPerfil;
            fotoEl.style.display = 'block';
            if (iconeEl) iconeEl.style.display = 'none';
            console.log('✅ Foto do perfil carregada');
        } else {
            fotoEl.style.display = 'none';
            if (iconeEl) iconeEl.style.display = 'block';
            console.log('ℹ️ Usuário sem foto');
        }
    }
    
    console.log('✅ Perfil carregado com sucesso!');
};

// ===== BUSCA DE PROFISSIONAIS =====
App.prototype.buscarProfissionais = function() {
    var self = this;
    var container = document.getElementById('buscaResultados');
    if (!container) {
        console.error('❌ Container de busca não encontrado');
        return;
    }
    
    console.log('🔍 Buscando profissionais...');
    container.innerHTML = '<div style="text-align:center;padding:20px;"><i class="fas fa-spinner fa-spin"></i> Buscando profissionais...</div>';
    
    // Dados de demonstração
    setTimeout(function() {
        var profissionais = [
            { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5, fotoPerfil: null },
            { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8, fotoPerfil: null },
            { id: 'p3', nome: 'Carlos Oliveira', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2, fotoPerfil: null },
            { id: 'p4', nome: 'Ana Costa', profissao: 'Arquiteta', experiencia: '12', celular: '11955554444', score: 4.9, fotoPerfil: null }
        ];
        
        var html = '';
        profissionais.forEach(function(prof) {
            var whatsapp = prof.celular.replace(/\D/g, '');
            var estrelas = '⭐'.repeat(Math.round(prof.score));
            var fotoHtml = prof.fotoPerfil ? 
                '<img src="' + prof.fotoPerfil + '" style="width:50px;height:50px;border-radius:50%;object-fit:cover;">' : 
                '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">👷</div>';
            
            html += '<div class="card" style="background:white;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">';
            html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">';
            html += fotoHtml;
            html += '<div style="flex:1;">';
            html += '<div style="font-weight:bold;font-size:16px;">' + prof.nome + '</div>';
            html += '<div style="font-size:14px;color:#6b7280;">' + prof.profissao + ' • ' + prof.experiencia + ' anos</div>';
            html += '<div style="color:#f59e0b;">' + estrelas + ' ' + prof.score + '</div>';
            html += '</div></div>';
            html += '<div style="display:flex;gap:8px;">';
            html += '<a href="https://wa.me/55' + whatsapp + '" target="_blank" style="flex:1;text-align:center;text-decoration:none;background:#25D366;color:white;padding:10px;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:4px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
            html += '<button onclick="window.app.iniciarChat(\'' + prof.id + '\')" style="flex:1;background:#1A3A5C;color:white;padding:10px;border-radius:8px;border:none;display:flex;align-items:center;justify-content:center;gap:4px;"><i class="fas fa-comments"></i> Chat</button>';
            html += '</div></div>';
        });
        
        container.innerHTML = html;
        console.log('✅ Encontrados ' + profissionais.length + ' profissionais');
    }, 800);
};

// ===== FUNÇÕES AUXILIARES =====
App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Abrindo chat...', 'info');
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.carregarMinhasObras = function() {
    var container = document.getElementById('minhasObrasContainer');
    if (container) {
        container.innerHTML = '<div style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:48px;color:#1A3A5C;"></i><h3>🏗️ Minhas Obras</h3><p>Nenhuma obra cadastrada ainda.</p></div>';
    }
};

App.prototype.uploadFoto = function(e) {
    console.log('📸 Upload de foto do perfil');
    this.mostrarToast('📸 Foto atualizada!', 'sucesso');
};

App.prototype.abrirEditarPerfil = function() {
    console.log('✏️ Abrindo edição de perfil');
    this.mostrarToast('✏️ Editando perfil...', 'info');
};

App.prototype.salvarPerfil = function() {
    this.mostrarToast('✅ Perfil salvo!', 'sucesso');
};

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:none;max-width:90%;text-align:center;color:white;font-weight:bold;';
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
    console.log('📄 DOM carregado, iniciando aplicação...');
    if (!window.app._app) {
        new App();
    } else {
        console.log('⚠️ Aplicação já está rodando');
    }
});

// Adicionar estilos CSS para os elementos
(function() {
    var style = document.createElement('style');
    style.textContent = `
        .vaga-card {
            transition: transform 0.2s;
        }
        .vaga-card:hover {
            transform: translateY(-2px);
        }
        .btn {
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #6b7280;
        }
    `;
    document.head.appendChild(style);
})();

console.log('✅ Script LPXCONSTRUTOR carregado com sucesso!');
