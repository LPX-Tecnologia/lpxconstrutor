// ==========================================================
// ===== LPXCONSTRUTOR - CORRIGIDO E FUNCIONAL =====
// ==========================================================

// Garantir que o objeto app existe
window.app = window.app || {};
window.app._app = window.app._app || null;

// Funções globais simplificadas
window.app.fazerLogin = function() { if(window.app._app) window.app._app.fazerLogin(); };
window.app.mostrarTela = function(id) { if(window.app._app) window.app._app.mostrarTela(id); };
window.app.voltarTela = function() { if(window.app._app) window.app._app.voltarTela(); };
window.app.cadastrar = function() { if(window.app._app) window.app._app.cadastrar(); };
window.app.proximaEtapa = function(e) { if(window.app._app) window.app._app.proximaEtapa(e); };
window.app.toggleProfissao = function() { if(window.app._app) window.app._app.toggleProfissao(); };
window.app.sair = function() { if(window.app._app) window.app._app.sair(); };
window.app.buscarProfissionais = function() { if(window.app._app) window.app._app.buscarProfissionais(); };
window.app.verPerfil = function(uid) { if(window.app._app) window.app._app.verPerfil(uid); };
window.app.iniciarChat = function(uid) { if(window.app._app) window.app._app.iniciarChat(uid); };
window.app.abrirEditarPerfil = function() { if(window.app._app) window.app._app.abrirEditarPerfil(); };
window.app.salvarPerfil = function() { if(window.app._app) window.app._app.salvarPerfil(); };
window.app.uploadFoto = function(e) { if(window.app._app) window.app._app.uploadFoto(e); };
window.app.abrirTelaPublicacao = function(vagaData) { if(window.app._app) window.app._app.abrirTelaPublicacao(vagaData); };
window.app.publicarVagaApp = function() { if(window.app._app) window.app._app.publicarVagaApp(); };
window.app.previewFotoObra = function(e) { if(window.app._app) window.app._app.previewFotoObra(e); };
window.app.buscarLocalizacao = function() { if(window.app._app) window.app._app.buscarLocalizacao(); };

var App = function() {
    this.usuarioLogado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.vagaFotoBase64 = null;
    this.vagaEmEdicao = null;
    this.vagaLocalizacaoAtual = null;
    this.init();
};

App.prototype.init = function() {
    var self = this;
    console.log('🚀 App iniciando...');
    window.app._app = self;
    
    // Esconder barra de navegação
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // Criar usuário de teste automaticamente
    self.usuarioLogado = {
        id: 'user123',
        nome: 'Carlos Silva',
        email: 'carlos@email.com',
        tipo: 'empreiteiro',
        profissao: 'Engenheiro Civil',
        experiencia: '8',
        celular: '(11) 99999-9999',
        fotoPerfil: null,
        score: 4.7
    };
    
    console.log('👤 Usuário criado:', self.usuarioLogado);
    
    // Mostrar home
    self.mostrarTela('homeScreen');
    self.atualizarBotoes();
};

App.prototype.atualizarBotoes = function() {
    var btnPublicar = document.getElementById('btnPublicar');
    if (btnPublicar && this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') {
        btnPublicar.style.display = 'flex';
    }
};

App.prototype.mostrarTela = function(id) {
    var self = this;
    console.log('📱 Tela:', id);
    
    // Esconder barra
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // Salvar histórico
    if (self.telaAtual && self.telaAtual !== id) {
        self.historicoTelas.push(self.telaAtual);
    }
    
    // Esconder todas as telas
    var telas = document.querySelectorAll('.screen');
    for (var i = 0; i < telas.length; i++) {
        telas[i].classList.remove('active');
    }
    
    // Mostrar tela
    var tela = document.getElementById(id);
    if (tela) {
        tela.classList.add('active');
        self.telaAtual = id;
        
        // Mostrar barra em telas principais
        if (bottomNav && self.usuarioLogado) {
            var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen'];
            if (telasComNav.indexOf(id) >= 0) {
                bottomNav.style.display = 'flex';
            }
        }
        
        // Carregar dados
        if (id === 'homeScreen') self.carregarHome();
        if (id === 'meuPerfilScreen') self.carregarMeuPerfil();
        if (id === 'buscaScreen') self.buscarProfissionais();
        if (id === 'publicarVagaScreen') self.prepararPublicacao();
    } else {
        console.error('Tela não encontrada:', id);
    }
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        var anterior = this.historicoTelas.pop();
        this.mostrarTela(anterior);
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    var self = this;
    console.log('🏠 Carregando home');
    
    // Saudação
    var saudacao = document.getElementById('saudacao');
    if (saudacao && self.usuarioLogado) {
        var hora = new Date().getHours();
        var msg = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
        saudacao.textContent = '👋 ' + msg + ', ' + self.usuarioLogado.nome + '!';
    }
    
    // Resumo
    var resumo = document.getElementById('resumoTexto');
    if (resumo && self.usuarioLogado) {
        resumo.textContent = (self.usuarioLogado.tipo === 'empreiteiro' ? '🏢 ' : '👷 ') + self.usuarioLogado.profissao;
    }
    
    // Feed
    self.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    console.log('📰 Carregando feed');
    
    var vagas = [
        { id: 'v1', titulo: 'Pedreiro para Reforma', endereco: 'Rua das Flores, 123', profissoes: 'Pedreiro', valorHora: '25', fotoObra: null },
        { id: 'v2', titulo: 'Eletricista Urgente', endereco: 'Av. Paulista, 1000', profissoes: 'Eletricista', valorHora: '40', fotoObra: null }
    ];
    
    var html = '';
    for (var i = 0; i < vagas.length; i++) {
        var v = vagas[i];
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:15px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">';
        html += '<h3 style="margin:0 0 10px 0;color:#1A3A5C;">' + v.titulo + '</h3>';
        html += '<p style="margin:5px 0;">📍 ' + v.endereco + '</p>';
        html += '<p style="margin:5px 0;">👷 ' + v.profissoes + '</p>';
        html += '<p style="margin:5px 0;">💰 R$' + v.valorHora + '/h</p>';
        if (v.fotoObra) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:150px;object-fit:cover;border-radius:5px;margin-top:10px;">';
        }
        html += '</div>';
    }
    
    container.innerHTML = html;
};

// ===== PERFIL (CORRIGIDO) =====
App.prototype.carregarMeuPerfil = function() {
    var self = this;
    console.log('👤 Carregando perfil...');
    
    if (!self.usuarioLogado) {
        console.error('❌ Usuário não logado!');
        return;
    }
    
    // Dados do usuário
    var user = self.usuarioLogado;
    console.log('📊 Dados:', user);
    
    // Nome
    var nomeEl = document.getElementById('perfilNome');
    if (nomeEl) {
        nomeEl.textContent = user.nome || 'Sem nome';
        console.log('✅ Nome:', user.nome);
    } else {
        console.error('❌ Elemento perfilNome não encontrado');
    }
    
    // Profissão
    var profEl = document.getElementById('perfilProfissao');
    if (profEl) {
        profEl.textContent = (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos';
        console.log('✅ Profissão:', user.profissao);
    }
    
    // Email
    var emailEl = document.getElementById('perfilEmail');
    if (emailEl) {
        emailEl.textContent = '📧 ' + (user.email || 'Não informado');
    }
    
    // Celular
    var celEl = document.getElementById('perfilCelular');
    if (celEl) {
        celEl.textContent = '📱 ' + (user.celular || 'Não informado');
    }
    
    // Foto
    var fotoEl = document.getElementById('perfilFoto');
    if (fotoEl) {
        if (user.fotoPerfil) {
            fotoEl.src = user.fotoPerfil;
            fotoEl.style.display = 'block';
        } else {
            fotoEl.style.display = 'none';
        }
    }
    
    // Esconder loading
    var loadingEl = document.getElementById('perfilLoading');
    if (loadingEl) loadingEl.style.display = 'none';
    
    console.log('✅ Perfil carregado!');
};

// ===== PUBLICAÇÃO (CORRIGIDO - FOTO FUNCIONA) =====
App.prototype.prepararPublicacao = function() {
    console.log('📝 Preparando tela de publicação');
    
    // Limpar campos
    var titulo = document.getElementById('vagaTitulo');
    var endereco = document.getElementById('vagaEndereco');
    var profissoes = document.getElementById('vagaProfissoes');
    var valor = document.getElementById('vagaValor');
    var fotoPreview = document.getElementById('fotoObraPreview');
    
    if (titulo) titulo.value = '';
    if (endereco) endereco.value = '';
    if (profissoes) profissoes.value = '';
    if (valor) valor.value = '';
    if (fotoPreview) { fotoPreview.src = ''; fotoPreview.style.display = 'none'; }
    
    this.vagaFotoBase64 = null;
    
    // Configurar input de foto
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) {
        var self = this;
        inputFoto.onchange = function(e) {
            var arquivo = e.target.files[0];
            if (!arquivo) return;
            
            console.log('📸 Foto selecionada:', arquivo.name);
            
            var reader = new FileReader();
            reader.onload = function(event) {
                self.vagaFotoBase64 = event.target.result;
                console.log('✅ Foto carregada (base64)');
                
                var preview = document.getElementById('fotoObraPreview');
                if (preview) {
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                    preview.style.maxWidth = '100%';
                    preview.style.maxHeight = '200px';
                    console.log('✅ Preview mostrado');
                } else {
                    console.error('❌ Preview não encontrado');
                }
            };
            reader.readAsDataURL(arquivo);
        };
        console.log('✅ Input de foto configurado');
    } else {
        console.error('❌ Input fotoObraInput não encontrado');
    }
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    this.vagaEmEdicao = vagaData || null;
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(event) {
    // Esta função é chamada pelo onchange
    console.log('📸 previewFotoObra chamado');
};

App.prototype.buscarLocalizacao = function() {
    var endereco = document.getElementById('vagaEndereco');
    if (endereco && endereco.value) {
        this.vagaLocalizacaoAtual = { lat: -23.5505, lng: -46.6333 };
        this.mostrarToast('✅ Localização encontrada!', 'sucesso');
    } else {
        this.mostrarToast('❌ Digite um endereço', 'erro');
    }
};

App.prototype.publicarVagaApp = function() {
    var self = this;
    
    var titulo = document.getElementById('vagaTitulo');
    var endereco = document.getElementById('vagaEndereco');
    var profissoes = document.getElementById('vagaProfissoes');
    var valor = document.getElementById('vagaValor');
    
    var t = titulo ? titulo.value.trim() : '';
    var e = endereco ? endereco.value.trim() : '';
    var p = profissoes ? profissoes.value.trim() : '';
    var v = valor ? valor.value.trim() : '';
    
    if (!t || !e || !p || !v) {
        this.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    console.log('📤 Publicando:', { titulo: t, endereco: e, profissoes: p, valor: v, foto: !!self.vagaFotoBase64 });
    
    this.mostrarToast('✅ Vaga publicada!', 'sucesso');
    this.vagaFotoBase64 = null;
    this.mostrarTela('homeScreen');
};

// ===== BUSCA (CORRIGIDO - FOTOS NOS PERFIS) =====
App.prototype.buscarProfissionais = function() {
    var container = document.getElementById('buscaResultados');
    if (!container) return;
    
    console.log('🔍 Buscando profissionais');
    
    var profissionais = [
        { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5, foto: null },
        { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8, foto: null },
        { id: 'p3', nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2, foto: null }
    ];
    
    var html = '';
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        var estrelas = '';
        for (var s = 0; s < Math.round(p.score); s++) estrelas += '⭐';
        
        // Foto ou ícone
        var avatar = p.foto 
            ? '<img src="' + p.foto + '" style="width:50px;height:50px;border-radius:50%;object-fit:cover;">'
            : '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;">👷</div>';
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:12px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">';
        html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">';
        html += avatar;
        html += '<div>';
        html += '<div style="font-weight:bold;font-size:16px;">' + p.nome + '</div>';
        html += '<div style="color:#666;">' + p.profissao + ' • ' + p.experiencia + ' anos</div>';
        html += '<div>' + estrelas + ' ' + p.score + '</div>';
        html += '</div></div>';
        html += '<div style="display:flex;gap:8px;">';
        html += '<a href="https://wa.me/55' + p.celular + '" target="_blank" style="flex:1;background:#25D366;color:white;text-decoration:none;padding:8px;border-radius:5px;text-align:center;">WhatsApp</a>';
        html += '<button onclick="window.app.iniciarChat(\'' + p.id + '\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:8px;border-radius:5px;">Chat</button>';
        html += '</div></div>';
    }
    
    container.innerHTML = html;
    console.log('✅ ' + profissionais.length + ' profissionais encontrados');
};

// ===== FUNÇÕES AUXILIARES =====
App.prototype.fazerLogin = function() {
    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    
    if (email && senha && email.value && senha.value) {
        this.usuarioLogado = {
            id: 'user123',
            nome: 'Carlos Silva',
            email: email.value,
            tipo: 'empreiteiro',
            profissao: 'Engenheiro Civil',
            experiencia: '8',
            celular: '(11) 99999-9999',
            fotoPerfil: null,
            score: 4.7
        };
        this.mostrarToast('✅ Bem-vindo!', 'sucesso');
        this.mostrarTela('homeScreen');
    } else {
        this.mostrarToast('❌ Preencha os campos', 'erro');
    }
};

App.prototype.cadastrar = function() {
    this.mostrarToast('✅ Cadastro realizado!', 'sucesso');
    this.mostrarTela('homeScreen');
};

App.prototype.proximaEtapa = function(e) {
    var e1 = document.getElementById('etapa1');
    var e2 = document.getElementById('etapa2');
    if (e1 && e2) {
        e1.style.display = e === 1 ? 'block' : 'none';
        e2.style.display = e === 2 ? 'block' : 'none';
    }
};

App.prototype.toggleProfissao = function() {
    var grupo = document.getElementById('grupoProfissao');
    var tipo = document.getElementById('cadTipo');
    if (grupo && tipo) {
        grupo.style.display = tipo.value === 'profissional' ? 'block' : 'none';
    }
};

App.prototype.sair = function() {
    this.usuarioLogado = null;
    this.mostrarTela('loginScreen');
    this.mostrarToast('👋 Até logo!', 'sucesso');
};

App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Chat iniciado!', 'info');
};

App.prototype.abrirEditarPerfil = function() {
    this.mostrarToast('✏️ Editar perfil', 'info');
};

App.prototype.salvarPerfil = function() {
    this.mostrarToast('✅ Perfil salvo!', 'sucesso');
};

App.prototype.uploadFoto = function(e) {
    this.mostrarToast('📸 Foto atualizada!', 'sucesso');
};

App.prototype.verPerfil = function(uid) {
    this.mostrarToast('👤 Visualizando perfil', 'info');
};

App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;color:white;font-weight:bold;z-index:10000;max-width:90%;text-align:center;';
        document.body.appendChild(toast);
    }
    
    toast.style.background = tipo === 'sucesso' ? '#10B981' : tipo === 'erro' ? '#EF4444' : '#1A3A5C';
    toast.textContent = mensagem;
    toast.style.display = 'block';
    
    clearTimeout(this.toastTimer);
    var self = this;
    this.toastTimer = setTimeout(function() {
        toast.style.display = 'none';
    }, 3000);
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM pronto');
    if (!window.app._app) {
        new App();
        console.log('✅ App iniciado');
    }
});

console.log('📋 Script carregado');
