// ==========================================================
// ===== LPXCONSTRUTOR - DIAGNÓSTICO VISUAL NA TELA =====
// ==========================================================

// Criar elemento de diagnóstico na tela
var divDiagnostico = document.createElement('div');
divDiagnostico.id = 'diagnosticoTela';
divDiagnostico.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:black;color:lime;padding:10px;z-index:99999;max-height:200px;overflow-y:auto;font-size:11px;font-family:monospace;display:block;';
document.body.appendChild(divDiagnostico);

function logTela(msg) {
    console.log(msg);
    var diag = document.getElementById('diagnosticoTela');
    if (diag) {
        diag.innerHTML += msg + '<br>';
        diag.scrollTop = diag.scrollHeight;
    }
}

// Limpar diagnóstico anterior
logTela('🔍 INICIANDO DIAGNÓSTICO...');
logTela('===================');

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
    buscarLocalizacao: function(){ if(window.app._app)window.app._app.buscarLocalizacao(); },
    fecharDiagnostico: function(){ 
        var d = document.getElementById('diagnosticoTela');
        if(d) d.style.display = 'none';
    }
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
    var s = this; 
    logTela('🚀 App iniciando...');
    window.app._app = this;
    
    // Esconder barra de navegação
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // CRIAR USUÁRIO
    s.usuarioLogado = {
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
    
    logTela('👤 Usuário: ' + s.usuarioLogado.nome);
    
    s.mostrarSplash();
    
    setTimeout(function() {
        s.esconderSplash();
        s.mostrarTela('homeScreen');
        s.atualizarBotoes();
        
        // Fazer diagnóstico visual
        setTimeout(function() {
            s.diagnosticoVisual();
        }, 2000);
    }, 1500);
};

// ===== DIAGNÓSTICO VISUAL =====
App.prototype.diagnosticoVisual = function() {
    logTela('🔍 DIAGNÓSTICO:');
    
    // Verificar usuário
    logTela('Usuário: ' + (this.usuarioLogado ? this.usuarioLogado.nome : 'NÃO LOGADO'));
    
    // Verificar telas
    var telasIds = ['loginScreen', 'homeScreen', 'meuPerfilScreen', 'buscaScreen', 'publicarVagaScreen'];
    logTela('--- TELAS: ---');
    for (var i = 0; i < telasIds.length; i++) {
        var tela = document.getElementById(telasIds[i]);
        logTela(telasIds[i] + ': ' + (tela ? '✅' : '❌'));
    }
    
    // Verificar elementos do perfil
    var perfilIds = ['perfilNome', 'perfilProfissao', 'perfilEmail', 'perfilCelular', 'perfilFoto', 'perfilLoading'];
    logTela('--- PERFIL: ---');
    for (var i = 0; i < perfilIds.length; i++) {
        var el = document.getElementById(perfilIds[i]);
        logTela(perfilIds[i] + ': ' + (el ? '✅' : '❌'));
    }
    
    // Verificar elementos da publicação
    var pubIds = ['vagaTitulo', 'vagaEndereco', 'vagaProfissoes', 'vagaValor', 'fotoObraInput', 'fotoObraPreview'];
    logTela('--- PUBLICAÇÃO: ---');
    for (var i = 0; i < pubIds.length; i++) {
        var el = document.getElementById(pubIds[i]);
        logTela(pubIds[i] + ': ' + (el ? '✅' : '❌'));
    }
    
    // Verificar feed
    var feed = document.getElementById('feedContainer');
    logTela('feedContainer: ' + (feed ? '✅' : '❌'));
    
    // Verificar busca
    var busca = document.getElementById('buscaResultados');
    logTela('buscaResultados: ' + (busca ? '✅' : '❌'));
    
    logTela('===================');
    logTela('Toque no X para fechar');
    
    // Adicionar botão de fechar
    var diag = document.getElementById('diagnosticoTela');
    if (diag) {
        var btn = document.createElement('button');
        btn.textContent = '❌ Fechar';
        btn.style.cssText = 'position:absolute;top:5px;right:5px;background:red;color:white;border:none;padding:5px 10px;border-radius:3px;font-size:12px;';
        btn.onclick = function() {
            diag.style.display = 'none';
        };
        diag.appendChild(btn);
    }
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) { 
        splash = document.createElement('div'); 
        splash.id = 'splashScreen'; 
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;'; 
        splash.innerHTML = '<div style="font-size:60px;">🏗️</div><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>'; 
        document.body.appendChild(splash);
    }
};

App.prototype.esconderSplash = function() { 
    var s = document.getElementById('splashScreen'); 
    if (s) { 
        s.style.opacity = '0'; 
        setTimeout(function() { 
            if (s.parentNode) s.parentNode.removeChild(s); 
        }, 500); 
    } 
};

App.prototype.atualizarBotoes = function() { 
    var bp = document.getElementById('btnPublicar'); 
    if (bp) bp.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
};

App.prototype.mostrarTela = function(id) {
    var s = this;
    logTela('📱 Tela: ' + id);
    
    // Esconder barra
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    if (s.telaAtual && s.telaAtual !== id) {
        s.historicoTelas.push(s.telaAtual);
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
        s.telaAtual = id;
        
        // Mostrar barra
        if (bottomNav && s.usuarioLogado) {
            var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen'];
            if (telasComNav.indexOf(id) >= 0) {
                bottomNav.style.display = 'flex';
            }
        }
        
        // Carregar dados
        if (id === 'homeScreen') s.carregarHome();
        if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
        if (id === 'buscaScreen') s.buscarProfissionais();
        if (id === 'publicarVagaScreen') s.configurarPublicacao();
    } else {
        logTela('❌ Tela não encontrada: ' + id);
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

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() { 
    var s = this;
    s.usuarioLogado = {
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
    s.mostrarToast('✅ Bem-vindo!', 'sucesso');
    s.atualizarBotoes();
    s.mostrarTela('homeScreen');
};

App.prototype.cadastrar = function() { 
    this.fazerLogin();
};

App.prototype.sair = function() { 
    this.usuarioLogado = null;
    this.mostrarTela('loginScreen');
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    
    var h = new Date().getHours(); 
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var sa = document.getElementById('saudacao'); 
    if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    
    this.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var c = document.getElementById('feedContainer'); 
    if (!c) return;
    
    logTela('📰 Carregando feed...');
    
    // Carregar vagas do localStorage
    var vagas = JSON.parse(localStorage.getItem('vagasDemo') || '[]');
    
    // Adicionar vagas de exemplo se estiver vazio
    if (vagas.length === 0) {
        vagas = [
            { id: 'v1', titulo: 'Pedreiro para Reforma', endereco: 'Rua das Flores, 123', profissoes: 'Pedreiro', valorHora: '25', autorNome: 'Carlos Silva' },
            { id: 'v2', titulo: 'Eletricista Urgente', endereco: 'Av. Paulista, 1000', profissoes: 'Eletricista', valorHora: '40', autorNome: 'Maria Santos' }
        ];
    }
    
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
        
        html += '<p style="font-size:11px;color:#999;margin-top:8px;">Publicado por: ' + (v.autorNome || 'Anônimo') + '</p>';
        html += '</div>';
    }
    
    c.innerHTML = html;
    logTela('✅ Feed carregado: ' + vagas.length + ' vagas');
};

// ===== PERFIL (CORRIGIDO - FORÇA INJEÇÃO) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    logTela('👤 Carregando perfil...');
    
    if (!s.usuarioLogado) {
        logTela('❌ Sem usuário!');
        return;
    }
    
    var user = s.usuarioLogado;
    logTela('👤 ' + user.nome);
    
    // FORÇAR INJEÇÃO DE HTML NA TELA DE PERFIL
    var telaPerfil = document.getElementById('meuPerfilScreen');
    
    if (telaPerfil) {
        logTela('✅ Tela encontrada, injetando HTML...');
        
        telaPerfil.innerHTML = `
            <div style="padding:20px;text-align:center;background:#f5f5f5;min-height:100vh;">
                <div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);padding:30px 20px;border-radius:0 0 20px 20px;margin-bottom:20px;">
                    <div style="width:100px;height:100px;background:white;border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:50px;">
                        👷
                    </div>
                    <h2 style="color:white;margin:10px 0;font-size:22px;" id="perfilNome">${user.nome}</h2>
                    <p style="color:#f0c27f;font-size:16px;margin:5px 0;" id="perfilProfissao">${user.profissao || 'Profissional'} • ${user.experiencia || '0'} anos</p>
                    <div style="color:#FFD700;font-size:20px;margin:5px 0;">${'⭐'.repeat(Math.round(user.score || 0))}</div>
                </div>
                
                <div style="background:white;border-radius:15px;padding:20px;margin:0 15px 15px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                    <div style="display:flex;align-items:center;padding:15px 0;border-bottom:1px solid #eee;">
                        <span style="font-size:24px;margin-right:15px;">📧</span>
                        <div>
                            <div style="color:#999;font-size:12px;">Email</div>
                            <div style="color:#333;font-size:16px;" id="perfilEmail">${user.email || 'Não informado'}</div>
                        </div>
                    </div>
                    
                    <div style="display:flex;align-items:center;padding:15px 0;border-bottom:1px solid #eee;">
                        <span style="font-size:24px;margin-right:15px;">📱</span>
                        <div>
                            <div style="color:#999;font-size:12px;">Celular</div>
                            <div style="color:#333;font-size:16px;" id="perfilCelular">${user.celular || 'Não informado'}</div>
                        </div>
                    </div>
                    
                    <div style="display:flex;align-items:center;padding:15px 0;">
                        <span style="font-size:24px;margin-right:15px;">🏢</span>
                        <div>
                            <div style="color:#999;font-size:12px;">Tipo de Conta</div>
                            <div style="color:#333;font-size:16px;">${user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional'}</div>
                        </div>
                    </div>
                </div>
                
                <div style="padding:0 15px;">
                    <button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-size:16px;margin-bottom:10px;">
                        ✏️ Editar Perfil
                    </button>
                    <button onclick="window.app.sair()" style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;font-size:16px;">
                        🚪 Sair
                    </button>
                </div>
            </div>
        `;
        
        logTela('✅ Perfil injetado com sucesso!');
    } else {
        logTela('❌ Tela meuPerfilScreen NÃO ENCONTRADA!');
        logTela('Criando tela de perfil...');
        
        // Criar tela se não existir
        var novaTela = document.createElement('div');
        novaTela.id = 'meuPerfilScreen';
        novaTela.className = 'screen';
        novaTela.innerHTML = `
            <div style="padding:20px;text-align:center;background:#f5f5f5;min-height:100vh;">
                <div style="background:#1A3A5C;padding:30px;border-radius:0 0 20px 20px;color:white;">
                    <div style="font-size:50px;">👷</div>
                    <h2>${user.nome}</h2>
                    <p>${user.profissao || 'Profissional'} • ${user.experiencia || '0'} anos</p>
                </div>
                <div style="background:white;margin:15px;padding:20px;border-radius:10px;">
                    <p>📧 ${user.email}</p>
                    <p>📱 ${user.celular}</p>
                    <p>⭐ ${user.score || '0'}</p>
                </div>
                <button onclick="window.app.abrirEditarPerfil()" style="background:#1A3A5C;color:white;border:none;padding:15px 30px;border-radius:10px;font-size:16px;">✏️ Editar Perfil</button>
            </div>
        `;
        document.body.appendChild(novaTela);
        logTela('✅ Tela de perfil criada!');
    }
    
    // Esconder loading
    var loading = document.getElementById('perfilLoading');
    if (loading) loading.style.display = 'none';
};

// ===== PUBLICAÇÃO =====
App.prototype.configurarPublicacao = function() {
    logTela('📝 Configurando publicação...');
    
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) {
        var novoInput = inputFoto.cloneNode(true);
        inputFoto.parentNode.replaceChild(novoInput, inputFoto);
        
        var s = this;
        novoInput.addEventListener('change', function(e) {
            var arquivo = e.target.files[0];
            if (!arquivo) return;
            
            var reader = new FileReader();
            reader.onload = function(event) {
                s.vagaFotoBase64 = event.target.result;
                var preview = document.getElementById('fotoObraPreview');
                if (preview) {
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                    preview.style.maxWidth = '100%';
                    preview.style.maxHeight = '200px';
                    preview.style.objectFit = 'cover';
                    preview.style.borderRadius = '8px';
                }
            };
            reader.readAsDataURL(arquivo);
        });
        
        logTela('✅ Input de foto configurado');
    } else {
        logTela('⚠️ Input fotoObraInput não encontrado');
    }
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    this.vagaEmEdicao = vagaData || null;
    this.vagaFotoBase64 = null;
    this.vagaLocalizacaoAtual = null;
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    logTela('📤 Publicando vaga...');
    
    // Pegar valores - tentar vários seletores
    var tituloEl = document.getElementById('vagaTitulo') || 
                   document.querySelector('#publicarVagaScreen input:nth-of-type(1)');
    var enderecoEl = document.getElementById('vagaEndereco') || 
                     document.querySelector('#publicarVagaScreen input:nth-of-type(2)');
    var profissoesEl = document.getElementById('vagaProfissoes') || 
                       document.querySelector('#publicarVagaScreen input:nth-of-type(3)');
    var valorEl = document.getElementById('vagaValor') || 
                  document.querySelector('#publicarVagaScreen input:nth-of-type(4)');
    
    // Se ainda não encontrou, pegar todos os inputs
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        var tela = document.getElementById('publicarVagaScreen');
        if (tela) {
            var inputs = tela.querySelectorAll('input[type="text"], input:not([type="file"])');
            if (inputs.length >= 4) {
                tituloEl = inputs[0];
                enderecoEl = inputs[1];
                profissoesEl = inputs[2];
                valorEl = inputs[3];
            }
        }
    }
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        logTela('❌ Campos não encontrados!');
        s.mostrarToast('❌ Formulário não encontrado', 'erro');
        return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl.value.trim();
    var valorHora = valorEl.value.trim();
    
    logTela('📝 Dados: ' + titulo + ' | ' + endereco + ' | ' + profissoes + ' | ' + valorHora);
    
    if (!titulo || !endereco || !profissoes || !valorHora) {
        s.mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    // Criar vaga
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null,
        localizacao: s.vagaLocalizacaoAtual || null,
        ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        dataCriacao: new Date().toISOString()
    };
    
    // Salvar no localStorage
    try {
        var vagas = JSON.parse(localStorage.getItem('vagasDemo') || '[]');
        vagas.unshift(vaga);
        localStorage.setItem('vagasDemo', JSON.stringify(vagas));
        logTela('✅ Vaga salva! Total: ' + vagas.length);
        
        // Limpar campos
        if (tituloEl) tituloEl.value = '';
        if (enderecoEl) enderecoEl.value = '';
        if (profissoesEl) profissoesEl.value = '';
        if (valorEl) valorEl.value = '';
        
        var preview = document.getElementById('fotoObraPreview');
        if (preview) { preview.src = ''; preview.style.display = 'none'; }
        
        s.vagaFotoBase64 = null;
        s.vagaLocalizacaoAtual = null;
        
        s.mostrarToast('✅ Vaga publicada!', 'sucesso');
        
        setTimeout(function() {
            s.mostrarTela('homeScreen');
        }, 500);
        
    } catch (error) {
        logTela('❌ Erro: ' + error.message);
        s.mostrarToast('❌ Erro ao publicar', 'erro');
    }
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    
    logTela('🔍 Buscando...');
    
    var profissionais = [
        { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5 },
        { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8 },
        { id: 'p3', nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2 }
    ];
    
    var html = '';
    for (var i = 0; i < profissionais.length; i++) {
        var p = profissionais[i];
        var estrelas = '';
        for (var s = 0; s < Math.round(p.score); s++) estrelas += '⭐';
        
        html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:12px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">';
        html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">';
        html += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;">👷</div>';
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
    
    c.innerHTML = html;
    logTela('✅ ' + profissionais.length + ' profissionais');
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Chat iniciado!', 'sucesso');
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

App.prototype.carregarMinhasObras = function() {
    var c = document.getElementById('minhasObrasContainer');
    if (c) c.innerHTML = '<div style="text-align:center;padding:30px;"><h3>🏗️ Minhas Obras</h3><p>Nenhuma obra cadastrada.</p></div>';
};

App.prototype.buscarLocalizacao = function() {
    this.vagaLocalizacaoAtual = { lat: -23.5505, lng: -46.6333 };
    this.mostrarToast('✅ Localização encontrada!', 'sucesso');
};

App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:25px;color:white;font-weight:bold;z-index:10000;max-width:90%;text-align:center;';
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

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    logTela('📄 DOM carregado');
    if (!window.app._app) {
        new App();
    }
});

logTela('📋 Script carregado');
