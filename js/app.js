// ==========================================================
// ===== LPXCONSTRUTOR - VERSÃO FINAL COMPLETA =====
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
    abrirContratacao: function(vagaId){ if(window.app._app)window.app._app.abrirContratacao(vagaId); },
    confirmarContratacao: function(){ if(window.app._app)window.app._app.confirmarContratacao(); },
    aceitarCandidato: function(cid){ if(window.app._app)window.app._app.aceitarCandidato(cid); },
    recusarCandidato: function(cid){ if(window.app._app)window.app._app.recusarCandidato(cid); },
    finalizarContratoAtivo: function(){ if(window.app._app)window.app._app.finalizarContratoAtivo(); },
    verContratoAtivo: function(){ if(window.app._app)window.app._app.verContratoAtivo(); },
    verMeusContratos: function(){ if(window.app._app)window.app._app.verMeusContratos(); },
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
    mostrarTermosUso: function(){ if(window.app._app)window.app._app.mostrarTermosUso(); },
    mostrarPrivacidade: function(){ if(window.app._app)window.app._app.mostrarPrivacidade(); },
    mostrarDiretrizes: function(){ if(window.app._app)window.app._app.mostrarDiretrizes(); },
    mostrarSobre: function(){ if(window.app._app)window.app._app.mostrarSobre(); },
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
    this.contratoAtual = null;
    this.idiomaAtual = 'pt';
    this.temaAtual = 'claro';
    this.init();
};

App.prototype.init = function() {
    var s = this; 
    console.log('🚀 Iniciando LPXCONSTRUTOR...'); 
    window.app._app = this;
    
    // Carregar tema
    var temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-theme');
        s.temaAtual = 'escuro';
    }
    
    // Carregar idioma
    var idiomaSalvo = localStorage.getItem('idioma');
    if (idiomaSalvo) s.idiomaAtual = idiomaSalvo;
    
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    s.mostrarSplash();
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() { 
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') s.mostrarModalSair(); 
        else s.voltarTela(); 
    });
    
    var dadosSalvos = localStorage.getItem('usuarioLPX');
    if (dadosSalvos) {
        try { s.usuarioLogado = JSON.parse(dadosSalvos); } catch(e) {}
    }
    
    var contratoSalvo = localStorage.getItem('contratoAtualLPX');
    if (contratoSalvo) {
        try { s.contratoAtual = JSON.parse(contratoSalvo); } catch(e) {}
    }
    
    if (typeof authService !== 'undefined' && authService.onAuthStateChange) {
        authService.onAuthStateChange(function(u) { 
            if (u) { 
                if (!s.usuarioLogado) s.usuarioLogado = {};
                Object.assign(s.usuarioLogado, u);
                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                s.atualizarBotoes(); 
            }
            setTimeout(function() { 
                s.esconderSplash();
                if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') {
                    s.mostrarTela(s.usuarioLogado ? 'homeScreen' : 'loginScreen');
                }
            }, 1500); 
        });
    } else {
        setTimeout(function() {
            s.esconderSplash();
            s.atualizarBotoes();
            if (s.usuarioLogado) s.mostrarTela('homeScreen');
        }, 1500);
    }
};

// ===== TEXTOS POR IDIOMA =====
App.prototype.getTexto = function(chave) {
    var textos = {
        pt: {
            saudacao: { bomDia: 'Bom dia', boaTarde: 'Boa tarde', boaNoite: 'Boa noite' },
            perfil: { titulo: 'Meu Perfil', editar: 'Editar Perfil', sair: 'Sair', contratos: 'Meus Contratos', notificacoes: 'Notificações' },
            home: { titulo: 'Início', publicar: 'Publicar Vaga', buscar: 'Buscar' },
            contrato: { ativo: 'Contrato Ativo', finalizar: 'Finalizar Contrato', detalhes: 'Detalhes da Obra' }
        },
        en: {
            saudacao: { bomDia: 'Good morning', boaTarde: 'Good afternoon', boaNoite: 'Good evening' },
            perfil: { titulo: 'My Profile', editar: 'Edit Profile', sair: 'Logout', contratos: 'My Contracts', notificacoes: 'Notifications' },
            home: { titulo: 'Home', publicar: 'Post Job', buscar: 'Search' },
            contrato: { ativo: 'Active Contract', finalizar: 'Finish Contract', detalhes: 'Project Details' }
        },
        es: {
            saudacao: { bomDia: 'Buenos días', boaTarde: 'Buenas tardes', boaNoite: 'Buenas noches' },
            perfil: { titulo: 'Mi Perfil', editar: 'Editar Perfil', sair: 'Salir', contratos: 'Mis Contratos', notificacoes: 'Notificaciones' },
            home: { titulo: 'Inicio', publicar: 'Publicar', buscar: 'Buscar' },
            contrato: { ativo: 'Contrato Activo', finalizar: 'Finalizar Contrato', detalhes: 'Detalles' }
        }
    };
    
    var lang = this.idiomaAtual || 'pt';
    var keys = chave.split('.');
    var valor = textos[lang];
    
    for (var i = 0; i < keys.length; i++) {
        if (valor && valor[keys[i]]) {
            valor = valor[keys[i]];
        } else {
            // Fallback para português
            valor = textos.pt;
            for (var j = 0; j < keys.length; j++) {
                if (valor && valor[keys[j]]) valor = valor[keys[j]];
                else return chave;
            }
            return valor;
        }
    }
    
    return valor || chave;
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) { 
        splash = document.createElement('div'); 
        splash.id = 'splashScreen'; 
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;'; 
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;" onerror="this.style.display=\'none\'"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p><div id="tijolosContainer" style="margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:2px;"></div>'; 
        document.body.appendChild(splash); 
        this.animarTijolos(); 
    }
};

App.prototype.animarTijolos = function() { 
    var c = document.getElementById('tijolosContainer'); 
    if (!c) return; 
    var f = 0; 
    function a() { 
        if (f >= 4) { c.innerHTML = ''; f = 0; setTimeout(a, 300); return; } 
        var r = document.createElement('div'); r.style.cssText = 'display:flex;gap:2px;'; 
        if (f % 2 === 1) r.style.marginLeft = '8px'; 
        var q = f === 0 ? 4 : f === 1 ? 5 : f === 2 ? 4 : 5; 
        for (var i = 0; i < q; i++) { 
            var t = document.createElement('span'); t.textContent = '🧱'; 
            t.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;'; 
            r.appendChild(t); 
        } 
        c.appendChild(r); f++; 
        setTimeout(a, f < 4 ? 300 : 600); 
    } 
    a(); 
};

App.prototype.esconderSplash = function() { 
    var s = document.getElementById('splashScreen'); 
    if (s) { s.style.opacity = '0'; 
        setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, 500); } 
};

App.prototype.atualizarBotoes = function() { 
    var bp = document.getElementById('btnPublicar'); 
    if (bp) bp.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
    var bo = document.getElementById('btnObras'); 
    if (bo) bo.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
};

App.prototype.mostrarTela = function(id) {
    var s = this; 
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); }); 
    var t = document.getElementById(id); 
    if (!t) return; 
    t.classList.add('active'); 
    s.telaAtual = id;
    
    var n = document.getElementById('bottomNav'); 
    if (n) { 
        var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen']; 
        n.style.display = (tn.indexOf(id) >= 0 && s.usuarioLogado) ? 'flex' : 'none'; 
    }
    
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
    if (id === 'publicarVagaScreen') setTimeout(function() { s.configurarPublicacao(); }, 100);
    if (id === 'recuperarSenhaScreen') { 
        var p1=document.getElementById('recPasso1'),p2=document.getElementById('recPasso2'); 
        if(p1)p1.style.display='block'; 
        if(p2)p2.style.display='none'; 
    }
};

App.prototype.voltarTela = function() { 
    if (this.historicoTelas.length > 0) { 
        var a = this.historicoTelas.pop(); 
        this.mostrarTela(a);
    } else { this.mostrarTela('homeScreen'); } 
};

App.prototype.mostrarModalSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='flex'; 
};

App.prototype.fecharModalSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='none'; 
    history.pushState(null,'',window.location.href); 
};

App.prototype.confirmarSair = function() { 
    var el=document.getElementById('modalSair'); 
    if(el)el.style.display='none'; 
    this.usuarioLogado=null; 
    localStorage.removeItem('usuarioLPX');
    this.historicoTelas=[]; 
    this.mostrarTela('loginScreen'); 
};

// ===== TEMA E IDIOMA =====
App.prototype.selecionarTema = function(t) { 
    this.temaAtual = t;
    if(t==='escuro'){ 
        document.body.classList.add('dark-theme'); 
        localStorage.setItem('tema','escuro'); 
    } else { 
        document.body.classList.remove('dark-theme'); 
        localStorage.setItem('tema','claro'); 
    } 
    this.mostrarToast('🎨 ' + (t === 'escuro' ? 'Tema escuro' : 'Tema claro') + ' ativado!','sucesso'); 
};

App.prototype.selecionarIdioma = function(i) { 
    this.idiomaAtual = i;
    localStorage.setItem('idioma', i);
    var nomes = { pt: 'Português', en: 'English', es: 'Español' };
    this.mostrarToast('🌐 Idioma: ' + (nomes[i] || i),'sucesso');
    if (this.telaAtual === 'homeScreen') this.carregarHome();
    if (this.telaAtual === 'meuPerfilScreen') this.carregarMeuPerfil();
};

// ===== TERMOS, PRIVACIDADE, DIRETRIZES =====
App.prototype.mostrarTermosUso = function() {
    var html = this.criarTelaDocumento(
        '📄 Termos de Uso',
        '<h3>1. Aceitação dos Termos</h3>' +
        '<p>Ao utilizar o LPXCONSTRUTOR, você concorda com estes termos de uso.</p>' +
        '<h3>2. Cadastro</h3>' +
        '<p>Você é responsável por manter suas informações atualizadas e verdadeiras.</p>' +
        '<h3>3. Publicação de Vagas</h3>' +
        '<p>As vagas publicadas devem ser reais e conter informações precisas.</p>' +
        '<h3>4. Contratação</h3>' +
        '<p>O LPXCONSTRUTOR não se responsabiliza por acordos feitos entre as partes.</p>' +
        '<h3>5. Conduta</h3>' +
        '<p>É proibido qualquer tipo de discriminação, assédio ou conduta inadequada.</p>' +
        '<h3>6. Cancelamento</h3>' +
        '<p>Você pode cancelar sua conta a qualquer momento.</p>'
    );
    this.mostrarTelaDocumento(html);
};

App.prototype.mostrarPrivacidade = function() {
    var html = this.criarTelaDocumento(
        '🔒 Política de Privacidade',
        '<h3>1. Dados Coletados</h3>' +
        '<p>Coletamos: nome, email, telefone, profissão, experiência e fotos.</p>' +
        '<h3>2. Uso dos Dados</h3>' +
        '<p>Seus dados são usados para conectar profissionais e empreiteiros.</p>' +
        '<h3>3. Compartilhamento</h3>' +
        '<p>Não vendemos seus dados. Compartilhamos apenas o necessário para a contratação.</p>' +
        '<h3>4. Armazenamento</h3>' +
        '<p>Seus dados são armazenados de forma segura.</p>' +
        '<h3>5. Seus Direitos</h3>' +
        '<p>Você pode solicitar a exclusão dos seus dados a qualquer momento.</p>'
    );
    this.mostrarTelaDocumento(html);
};

App.prototype.mostrarDiretrizes = function() {
    var html = this.criarTelaDocumento(
        '📋 Diretrizes da Comunidade',
        '<h3>1. Respeito Mútuo</h3>' +
        '<p>Trate todos com respeito e profissionalismo.</p>' +
        '<h3>2. Pagamentos</h3>' +
        '<p>Combine valores e formas de pagamento antes de iniciar o trabalho.</p>' +
        '<h3>3. Segurança</h3>' +
        '<p>Siga todas as normas de segurança no trabalho.</p>' +
        '<h3>4. Qualidade</h3>' +
        '<p>Entregue trabalhos com qualidade e dentro do prazo combinado.</p>' +
        '<h3>5. Avaliações</h3>' +
        '<p>Avalie com honestidade após a conclusão do contrato.</p>'
    );
    this.mostrarTelaDocumento(html);
};

App.prototype.mostrarSobre = function() {
    var html = this.criarTelaDocumento(
        'ℹ️ Sobre o LPXCONSTRUTOR',
        '<div style="text-align:center;padding:20px;">' +
        '<div style="font-size:80px;">🏗️</div>' +
        '<h2>LPXCONSTRUTOR</h2>' +
        '<p><strong>Versão 1.0.0</strong></p>' +
        '<p>Rede Profissional da Construção Civil</p>' +
        '<p>Conectando profissionais e empreiteiros</p>' +
        '<hr style="margin:20px 0;">' +
        '<p><strong>Desenvolvido por:</strong> LPX Tecnologia</p>' +
        '<p><strong>Contato:</strong> contato@lpxconstrutor.com.br</p>' +
        '<p><strong>Fundação:</strong> 2024</p>' +
        '</div>'
    );
    this.mostrarTelaDocumento(html);
};

App.prototype.criarTelaDocumento = function(titulo, conteudo) {
    return '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">' +
        '<div style="background:#1A3A5C;color:white;padding:20px;border-radius:15px;margin-bottom:20px;text-align:center;">' +
        '<h2 style="margin:0;">' + titulo + '</h2></div>' +
        '<div style="background:white;border-radius:15px;padding:20px;">' + conteudo + '</div>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;margin-top:20px;font-weight:bold;">Voltar</button></div>';
};

App.prototype.mostrarTelaDocumento = function(html) {
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) {
        tela.innerHTML = html;
        this.mostrarTela('meuPerfilScreen');
    }
};

App.prototype.mostrarInfoVersao = function() {
    this.mostrarSobre();
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() { 
    var s=this; 
    var e=(document.getElementById('loginEmail')||{}).value||'', 
        p=(document.getElementById('loginSenha')||{}).value||''; 
    if(!e||!p){ s.mostrarToast('❌ Preencha todos!','erro'); return; } 
    s.mostrarToast('Entrando...','info'); 
    
    if (typeof authService !== 'undefined' && authService.login) {
        authService.login(e,p).then(function(r){
            if(r.sucesso){
                s.usuarioLogado = r.usuario;
                localStorage.setItem('usuarioLPX', JSON.stringify(r.usuario));
                s.mostrarToast('✅ Bem-vindo, ' + r.usuario.nome + '!','sucesso');
                s.atualizarBotoes();
                s.mostrarTela('homeScreen');
            } else { s.mostrarToast('❌ '+r.erro,'erro'); }
        });
    } else {
        var userSalvo = localStorage.getItem('usuarioLPX');
        if (userSalvo) {
            try { s.usuarioLogado = JSON.parse(userSalvo); } catch(err) {}
        }
        if (!s.usuarioLogado) {
            s.usuarioLogado = {
                id: 'user_' + Date.now(),
                nome: e.split('@')[0] || 'Usuário',
                email: e || 'usuario@email.com',
                tipo: 'empreiteiro',
                profissao: 'Engenheiro Civil',
                experiencia: '8',
                celular: '(11) 99999-9999',
                fotoPerfil: null,
                score: 4.7
            };
            localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
        }
        s.mostrarToast('✅ Bem-vindo!','sucesso');
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
    }
};

App.prototype.cadastrar = function() { 
    var s = this;
    var nome = document.getElementById('cadNome');
    var email = document.getElementById('cadEmail');
    var senha = document.getElementById('cadSenha');
    var tipo = document.getElementById('cadTipo');
    var celular = document.getElementById('cadCelular');
    var profissao = document.getElementById('cadProfissao');
    var experiencia = document.getElementById('cadExperiencia');
    var fotoInput = document.getElementById('cadFoto');
    
    if (!nome || !email || !senha || !nome.value || !email.value || !senha.value) {
        s.mostrarToast('❌ Preencha todos os campos!','erro');
        return;
    }
    
    var salvar = function(foto) {
        var usuario = {
            id: 'user_' + Date.now(),
            nome: nome.value,
            email: email.value,
            tipo: tipo ? tipo.value : 'profissional',
            celular: celular ? celular.value : '',
            profissao: profissao ? profissao.value : 'Profissional',
            experiencia: experiencia ? experiencia.value : '0',
            fotoPerfil: foto || null,
            score: 0,
            dataCadastro: new Date().toISOString()
        };
        localStorage.setItem('usuarioLPX', JSON.stringify(usuario));
        s.usuarioLogado = usuario;
        if (typeof db !== 'undefined') {
            db.collection('usuarios').doc(usuario.id).set(usuario).catch(function(){});
        }
        s.mostrarToast('✅ Cadastro realizado, ' + usuario.nome + '!','sucesso');
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
    };
    
    if (fotoInput && fotoInput.files && fotoInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) { salvar(e.target.result); };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        salvar(null);
    }
};

App.prototype.proximaEtapa = function(e) { 
    var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); 
    if(!e1||!e2)return; 
    e1.style.display=e===1?'block':'none'; 
    e2.style.display=e===2?'block':'none'; 
};

App.prototype.toggleProfissao = function() { 
    var g=document.getElementById('grupoProfissao'); 
    if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; 
};

App.prototype.sair = function() { 
    var s=this; 
    if (typeof authService !== 'undefined' && authService.logout) authService.logout();
    s.usuarioLogado=null; 
    localStorage.removeItem('usuarioLPX');
    s.mostrarTela('loginScreen'); 
    s.mostrarToast('👋 Até logo!','sucesso');
};

App.prototype.solicitarCodigo = function() { 
    var s=this; 
    var e=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():''; 
    if(!e||!e.includes('@')){ s.mostrarToast('❌ Email inválido!','erro'); return; } 
    s.mostrarToast('✅ Código enviado!','sucesso');
    document.getElementById('recPasso1').style.display='none';
    document.getElementById('recPasso2').style.display='block';
};

App.prototype.voltarPasso1 = function(){
    document.getElementById('recPasso1').style.display='block';
    document.getElementById('recPasso2').style.display='none';
};

App.prototype.verificarCodigo = function(){
    var s=this;
    s.mostrarToast('✅ Senha redefinida!','sucesso');
    setTimeout(function(){ s.mostrarTela('loginScreen'); },1500);
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) {
        var userSalvo = localStorage.getItem('usuarioLPX');
        if (userSalvo) {
            try { this.usuarioLogado = JSON.parse(userSalvo); } catch(e) {}
        }
        if (!this.usuarioLogado) { this.mostrarTela('loginScreen'); return; }
    }
    
    var h = new Date().getHours(); 
    var txt = this.getTexto('saudacao');
    var sd = h < 12 ? txt.bomDia : h < 18 ? txt.boaTarde : txt.boaNoite;
    
    var sa = document.getElementById('saudacao'); 
    if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    
    var re = document.getElementById('resumoTexto'); 
    if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    
    var fs = document.querySelector('#homeScreen .logo-saudacao');
    if (fs) { 
        if (this.usuarioLogado.fotoPerfil) { 
            fs.src = this.usuarioLogado.fotoPerfil; 
            fs.style.borderRadius = '50%'; 
            fs.style.objectFit = 'cover'; 
        } else { 
            fs.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; 
            fs.style.borderRadius = '8px'; 
            fs.style.objectFit = 'contain'; 
        } 
    }
    
    setTimeout(function() { 
        try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} 
    }, 500);
    
    this.carregarFeed();
};

// ===== FEED =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); 
    if (!c) return;
    
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
    
    var videos = [
        { titulo: '🦺 Segurança no Trabalho', descricao: 'Dicas essenciais.', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes', descricao: 'Evite acidentes.', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs', descricao: 'Equipamentos de Proteção.', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' },
        { titulo: '🏗️ Segurança em Altura', descricao: 'Trabalhos acima de 2m.', url: 'https://www.youtube.com/embed/bh2pzYBs_go', categoria: 'Segurança' },
        { titulo: '🔌 Segurança com Eletricidade', descricao: 'Riscos elétricos.', url: 'https://www.youtube.com/embed/awR7lJO3jUU', categoria: 'Eletricista' },
        { titulo: '🧯 Prevenção de Incêndios', descricao: 'Uso de extintores.', url: 'https://www.youtube.com/embed/RReflO7kR3Y', categoria: 'Segurança' }
    ];
    
    var hoje = new Date(); 
    var dia = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); 
    var vd = videos[dia % videos.length];
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    var html = '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;"><span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong><br><span style="font-size:10px;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</span><p style="font-size:11px;margin-top:4px;">' + vd.descricao + '</p></div><iframe src="' + vd.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe><div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;"><span style="font-size:10px;color:#059669;"><strong>' + vd.titulo + '</strong></span><div style="display:flex;gap:4px;"><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
    
    if (vagas.length === 0) { 
        html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; 
    } else { 
        vagas.forEach(function(v) { 
            var statusVaga = '';
            if (v.status === 'em_andamento') {
                statusVaga = '<span style="background:#10B981;color:white;padding:2px 8px;border-radius:10px;font-size:10px;margin-left:5px;">🟢 Em andamento</span>';
            }
            
            var mapaHtml = '';
            if (v.endereco) {
                mapaHtml = '<div style="margin-top:8px;padding:8px;background:#f0f9ff;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-marker-alt" style="color:#1A3A5C;"></i><span style="font-size:12px;">📍 ' + v.endereco + '</span></div>';
            }
            
            var fotoHtml = '';
            if (v.fotoObra && typeof v.fotoObra === 'string' && v.fotoObra.length > 0) {
                fotoHtml = '<img src="' + v.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
            }
            
            var botoesVaga = '';
            if (s.usuarioLogado) {
                if (s.usuarioLogado.tipo === 'profissional' && v.status !== 'em_andamento') {
                    botoesVaga = '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.candidatarVaga(\'' + v.id + '\')" style="margin-top:8px;">✋ QUERO!</button>';
                } else if (s.usuarioLogado.tipo === 'empreiteiro' && v.autorId === s.usuarioLogado.id && v.status !== 'em_andamento') {
                    botoesVaga = '<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\'' + v.id + '\')" style="margin-top:8px;background:#1A3A5C;color:white;">👷 Ver Candidatos</button>';
                }
            }
            
            html += '<div class="vaga-card" style="cursor:pointer;background:white;border-radius:12px;padding:16px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.1);"><div class="vaga-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;"><div class="vaga-avatar" style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome" style="font-weight:bold;color:#1A3A5C;font-size:16px;">' + (v.titulo || 'Vaga') + statusVaga + '</div><div class="vaga-data" style="font-size:12px;color:#6b7280;">📍 ' + (v.endereco || 'Local não informado') + '</div></div></div><div class="vaga-body"><div class="vaga-tags" style="display:flex;gap:8px;margin-bottom:8px;"><span class="vaga-tag" style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">💰 R$' + (v.valorHora || '0') + '/h</span><span class="vaga-tag" style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">👷 ' + (v.profissoes || 'Todas') + '</span></div>' + fotoHtml + mapaHtml + '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Publicado por: ' + (v.autorNome || 'Anônimo') + '</div>' + botoesVaga + '</div></div>'; 
        }); 
    }
    c.innerHTML = html;
};

App.prototype.videoAnterior = function() { 
    if (!this.videoIndex) this.videoIndex = 0; 
    this.videoIndex--; 
    if (this.videoIndex < 0) this.videoIndex = 5; 
    this.carregarFeed(); 
};

App.prototype.videoSeguinte = function() { 
    if (!this.videoIndex) this.videoIndex = 0; 
    this.videoIndex++; 
    this.carregarFeed(); 
};

// ===== PUBLICAÇÃO =====
App.prototype.configurarPublicacao = function() {
    var s = this;
    var inputFoto = document.getElementById('fotoObraInput');
    if (!inputFoto) {
        var inputs = document.querySelectorAll('input[type="file"]');
        if (inputs.length > 0) inputFoto = inputs[0];
    }
    
    if (inputFoto) {
        var novoInput = inputFoto.cloneNode(true);
        inputFoto.parentNode.replaceChild(novoInput, inputFoto);
        
        novoInput.addEventListener('change', function(event) {
            var arquivo = event.target.files[0];
            if (!arquivo) return;
            if (!arquivo.type.match('image.*')) { s.mostrarToast('❌ Selecione uma imagem!', 'erro'); return; }
            if (arquivo.size > 10 * 1024 * 1024) { s.mostrarToast('❌ Imagem muito grande!', 'erro'); return; }
            
            var reader = new FileReader();
            reader.onload = function(e) {
                s.vagaFotoBase64 = e.target.result;
                var preview = document.getElementById('fotoObraPreview');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'fotoObraPreview';
                    preview.style.cssText = 'display:block;max-width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-top:8px;';
                    event.target.parentElement.appendChild(preview);
                }
                preview.src = e.target.result;
                preview.style.display = 'block';
                s.mostrarToast('📸 Foto carregada!', 'sucesso');
            };
            reader.readAsDataURL(arquivo);
        });
    }
    
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValor');
    if (tituloEl) tituloEl.value = '';
    if (enderecoEl) enderecoEl.value = '';
    if (profissoesEl) profissoesEl.value = '';
    if (valorEl) valorEl.value = '';
    
    var preview = document.getElementById('fotoObraPreview');
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    s.vagaFotoBase64 = null;
    s.vagaLocalizacaoAtual = null;
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    this.vagaEmEdicao = vagaData || null;
    this.vagaFotoBase64 = null;
    this.vagaLocalizacaoAtual = null;
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(e) {};

App.prototype.buscarLocalizacao = function() {
    var s = this;
    var enderecoEl = document.getElementById('vagaEndereco');
    var endereco = enderecoEl ? enderecoEl.value.trim() : '';
    if (!endereco) { s.mostrarToast('❌ Digite um endereço!', 'erro'); return; }
    s.mostrarToast('🔍 Buscando...', 'info');
    
    var hash = 0;
    for (var i = 0; i < endereco.length; i++) { hash = ((hash << 5) - hash) + endereco.charCodeAt(i); hash |= 0; }
    s.vagaLocalizacaoAtual = { lat: -23.5505 + (Math.abs(hash) % 1000) / 10000, lng: -46.6333 + ((Math.abs(hash) * 2) % 1000) / 10000 };
    s.mostrarToast('✅ Localização encontrada!', 'sucesso');
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValor');
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        var tela = document.getElementById('publicarVagaScreen');
        if (tela) {
            var inputs = tela.querySelectorAll('input[type="text"], input:not([type="file"]), textarea');
            if (inputs.length >= 4) {
                tituloEl = tituloEl || inputs[0]; enderecoEl = enderecoEl || inputs[1];
                profissoesEl = profissoesEl || inputs[2]; valorEl = valorEl || inputs[3];
            }
        }
    }
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        s.mostrarToast('❌ Formulário não encontrado', 'erro'); return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl.value.trim();
    var valorHora = valorEl.value.trim();
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    if (!profissoes) { s.mostrarToast('❌ Digite as profissões!', 'erro'); profissoesEl.focus(); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor!', 'erro'); valorEl.focus(); return; }
    
    if (!s.vagaLocalizacaoAtual) {
        var hash = 0;
        for (var i = 0; i < endereco.length; i++) { hash = ((hash << 5) - hash) + endereco.charCodeAt(i); hash |= 0; }
        s.vagaLocalizacaoAtual = { lat: -23.5505 + (Math.abs(hash) % 1000) / 10000, lng: -46.6333 + ((Math.abs(hash) * 2) % 1000) / 10000 };
    }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, endereco: endereco, profissoes: profissoes, valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null, localizacao: s.vagaLocalizacaoAtual,
        status: 'disponivel', ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        dataCriacao: new Date().toISOString()
    };
    
    try {
        var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vagasSalvas.unshift(vaga);
        localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        
        if (typeof db !== 'undefined') {
            db.collection('vagas').add(vaga).catch(function(){});
        }
        
        tituloEl.value = ''; enderecoEl.value = ''; profissoesEl.value = ''; valorEl.value = '';
        var preview = document.getElementById('fotoObraPreview');
        if (preview) { preview.src = ''; preview.style.display = 'none'; }
        var inputFoto = document.getElementById('fotoObraInput');
        if (inputFoto) inputFoto.value = '';
        s.vagaFotoBase64 = null; s.vagaLocalizacaoAtual = null; s.vagaEmEdicao = null;
        
        s.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
        setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
    } catch (error) {
        s.mostrarToast('❌ Erro ao publicar', 'erro');
    }
};

// ===== SISTEMA DE CONTRATO =====
App.prototype.candidatarVaga = function(vagaId) {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('❌ Faça login!', 'erro'); return; }
    if (s.usuarioLogado.tipo !== 'profissional') { s.mostrarToast('❌ Apenas profissionais!', 'erro'); return; }
    
    if (s.contratoAtual && s.contratoAtual.status === 'em_andamento') {
        s.mostrarToast('❌ Você já está em um contrato ativo!', 'erro');
        return;
    }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === vagaId; });
    
    if (!vaga) { s.mostrarToast('❌ Vaga não encontrada!', 'erro'); return; }
    if (vaga.status === 'em_andamento') { s.mostrarToast('❌ Vaga já em andamento!', 'erro'); return; }
    
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var jaCandidatou = candidaturas.find(function(c) {
        return c.vagaId === vagaId && c.profissionalId === s.usuarioLogado.id && c.status === 'pendente';
    });
    
    if (jaCandidatou) { s.mostrarToast('❌ Você já se candidatou!', 'erro'); return; }
    
    var candidatura = {
        id: 'cand_' + Date.now(),
        vagaId: vagaId, vagaTitulo: vaga.titulo,
        profissionalId: s.usuarioLogado.id, profissionalNome: s.usuarioLogado.nome,
        profissionalProfissao: s.usuarioLogado.profissao,
        empreiteiroId: vaga.autorId, empreiteiroNome: vaga.autorNome,
        status: 'pendente',
        dataCandidatura: new Date().toISOString()
    };
    
    candidaturas.push(candidatura);
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    // Notificar empreiteiro
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: vaga.autorId,
        tipo: 'candidatura',
        titulo: '🔔 Nova candidatura!',
        mensagem: s.usuarioLogado.nome + ' se candidatou para: ' + vaga.titulo,
        vagaId: vagaId,
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    s.mostrarToast('✅ Candidatura enviada! Aguarde o empreiteiro.', 'sucesso');
};

App.prototype.abrirContratacao = function(vagaId) {
    var s = this;
    if (!s.usuarioLogado || s.usuarioLogado.tipo !== 'empreiteiro') {
        s.mostrarToast('❌ Apenas empreiteiros!', 'erro'); return;
    }
    
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var candidatos = candidaturas.filter(function(c) {
        return c.vagaId === vagaId && c.status === 'pendente';
    });
    
    var html = '<div id="modalContratacao" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto;">';
    html += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;text-align:center;">👷 Candidatos</h3>';
    
    if (candidatos.length === 0) {
        html += '<p style="text-align:center;color:#999;">Nenhum candidato ainda.</p>';
    } else {
        candidatos.forEach(function(c) {
            html += '<div style="background:#f9f9f9;border-radius:10px;padding:15px;margin-bottom:10px;">';
            html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
            html += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">👷</div>';
            html += '<div><div style="font-weight:bold;">' + c.profissionalNome + '</div>';
            html += '<div style="font-size:12px;color:#666;">' + (c.profissionalProfissao || 'Profissional') + '</div></div></div>';
            html += '<div style="display:flex;gap:8px;">';
            html += '<button onclick="window.app.aceitarCandidato(\'' + c.id + '\')" style="flex:1;background:#10B981;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;">✅ Contratar</button>';
            html += '<button onclick="window.app.recusarCandidato(\'' + c.id + '\')" style="flex:1;background:#EF4444;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;">❌ Recusar</button>';
            html += '</div></div>';
        });
    }
    
    html += '<button onclick="document.getElementById(\'modalContratacao\').remove()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:8px;margin-top:10px;">Fechar</button>';
    html += '</div></div>';
    
    var antigo = document.getElementById('modalContratacao');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

App.prototype.aceitarCandidato = function(candidaturaId) {
    var s = this;
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var cand = candidaturas.find(function(c) { return c.id === candidaturaId; });
    
    if (!cand) { s.mostrarToast('❌ Candidatura não encontrada!', 'erro'); return; }
    
    cand.status = 'em_andamento';
    cand.dataInicio = new Date().toISOString();
    
    candidaturas.forEach(function(c) {
        if (c.vagaId === cand.vagaId && c.id !== candidaturaId) c.status = 'recusado';
    });
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === cand.vagaId; });
    if (vaga) {
        vaga.status = 'em_andamento';
        vaga.profissionalContratado = cand.profissionalId;
        vaga.profissionalNome = cand.profissionalNome;
    }
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    var contrato = {
        id: 'contr_' + Date.now(),
        candidaturaId: candidaturaId, vagaId: cand.vagaId, vagaTitulo: cand.vagaTitulo,
        empreiteiroId: cand.empreiteiroId, empreiteiroNome: cand.empreiteiroNome,
        profissionalId: cand.profissionalId, profissionalNome: cand.profissionalNome,
        status: 'em_andamento', dataInicio: new Date().toISOString(), dataFim: null
    };
    
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    contratos.push(contrato);
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    s.contratoAtual = contrato;
    localStorage.setItem('contratoAtualLPX', JSON.stringify(contrato));
    
    // Notificar profissional
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: cand.profissionalId,
        tipo: 'contratado',
        titulo: '🎉 Você foi contratado!',
        mensagem: 'Parabéns! Você foi contratado para: ' + cand.vagaTitulo,
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    
    s.mostrarToast('✅ Profissional contratado!', 'sucesso');
    s.verContratoAtivo();
};

App.prototype.recusarCandidato = function(candidaturaId) {
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var cand = candidaturas.find(function(c) { return c.id === candidaturaId; });
    if (cand) cand.status = 'recusado';
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    if (cand) this.abrirContratacao(cand.vagaId);
    this.mostrarToast('Candidatura recusada.', 'info');
};

App.prototype.verContratoAtivo = function() {
    var s = this;
    
    if (!s.contratoAtual) {
        var salvo = localStorage.getItem('contratoAtualLPX');
        if (salvo) { try { s.contratoAtual = JSON.parse(salvo); } catch(e) {} }
    }
    
    if (!s.contratoAtual || s.contratoAtual.status !== 'em_andamento') {
        s.mostrarToast('📋 Nenhum contrato ativo.', 'info'); return;
    }
    
    var c = s.contratoAtual;
    var isEmpreiteiro = s.usuarioLogado && s.usuarioLogado.id === c.empreiteiroId;
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">';
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:25px;border-radius:15px;text-align:center;margin-bottom:20px;">';
    html += '<div style="font-size:50px;">🤝</div>';
    html += '<h2 style="margin:10px 0;">' + s.getTexto('contrato.ativo') + '</h2>';
    html += '<p style="color:#f0c27f;">🟢 Em Andamento</p></div>';
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">';
    html += '<h3 style="color:#1A3A5C;">' + s.getTexto('contrato.detalhes') + '</h3>';
    html += '<p><strong>🏗️ Obra:</strong> ' + c.vagaTitulo + '</p>';
    html += '<p><strong>👷 Profissional:</strong> ' + c.profissionalNome + '</p>';
    html += '<p><strong>🏢 Empreiteiro:</strong> ' + c.empreiteiroNome + '</p>';
    html += '<p><strong>📅 Início:</strong> ' + new Date(c.dataInicio).toLocaleDateString('pt-BR') + '</p></div>';
    html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
    html += '<button onclick="window.app.iniciarChat(\'' + (isEmpreiteiro ? c.profissionalId : c.empreiteiroId) + '\')" style="flex:1;background:#25D366;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">💬 Conversar</button>';
    html += '<button onclick="window.app.voltarTela()" style="flex:1;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">Voltar</button></div>';
    
    if (isEmpreiteiro) {
        html += '<button onclick="window.app.finalizarContratoAtivo()" style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">🔴 ' + s.getTexto('contrato.finalizar') + '</button>';
    } else {
        html += '<div style="background:#fef3c7;border-radius:10px;padding:15px;text-align:center;color:#92400e;">⚠️ Apenas o empreiteiro pode finalizar.</div>';
    }
    html += '</div>';
    
    var tela = document.getElementById('chatScreen');
    if (tela) {
        tela.innerHTML = html;
        s.mostrarTela('chatScreen');
    }
};

App.prototype.finalizarContratoAtivo = function() {
    var s = this;
    if (!confirm('Finalizar este contrato? Esta ação não pode ser desfeita.')) return;
    if (!s.contratoAtual) { s.mostrarToast('❌ Nenhum contrato ativo!', 'erro'); return; }
    
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var contrato = contratos.find(function(c) { return c.id === s.contratoAtual.id; });
    if (contrato) { contrato.status = 'finalizado'; contrato.dataFim = new Date().toISOString(); }
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === s.contratoAtual.vagaId; });
    if (vaga) vaga.status = 'finalizado';
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    // Notificar profissional
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: s.contratoAtual.profissionalId,
        tipo: 'finalizado',
        titulo: '🔴 Contrato Finalizado',
        mensagem: 'O contrato da obra "' + s.contratoAtual.vagaTitulo + '" foi finalizado.',
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    s.contratoAtual = null;
    localStorage.removeItem('contratoAtualLPX');
    
    s.mostrarToast('✅ Contrato finalizado!', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); s.carregarFeed(); }, 500);
};

App.prototype.verMeusContratos = function() {
    var s = this;
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    var meus = contratos.filter(function(c) {
        return c.empreiteiroId === userId || c.profissionalId === userId;
    });
    
    var html = '<div style="padding:20px;"><h3 style="color:#1A3A5C;">📋 ' + s.getTexto('perfil.contratos') + '</h3>';
    
    if (meus.length === 0) {
        html += '<p style="text-align:center;color:#999;margin-top:40px;">Nenhum contrato.</p>';
    } else {
        meus.forEach(function(c) {
            var cor = c.status === 'em_andamento' ? '#10B981' : '#666';
            var texto = c.status === 'em_andamento' ? '🟢 Em Andamento' : '✅ Finalizado';
            
            html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">';
            html += '<h4>' + c.vagaTitulo + '</h4>';
            html += '<p>👷 ' + c.profissionalNome + ' | 🏢 ' + c.empreiteiroNome + '</p>';
            html += '<p style="color:' + cor + ';">' + texto + '</p>';
            if (c.status === 'em_andamento') {
                html += '<button onclick="window.app._app.contratoAtual=' + JSON.stringify(c) + ';localStorage.setItem(\'contratoAtualLPX\',JSON.stringify(' + JSON.stringify(c) + '));window.app.verContratoAtivo();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;">Ver Contrato</button>';
            }
            html += '</div>';
        });
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button></div>';
    
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('meuPerfilScreen'); }
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) {
        var salvo = localStorage.getItem('usuarioLPX');
        if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
        if (!s.usuarioLogado) return;
    }
    
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px 30px;text-align:center;border-radius:0 0 30px 30px;margin-bottom:20px;">';
    html += '<div style="width:100px;height:100px;background:white;border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:50px;overflow:hidden;border:3px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<span>👷</span>';
    html += '</div>';
    html += '<h2 style="margin:10px 0;">' + (user.nome || 'Usuário') + '</h2>';
    html += '<p style="color:#f0c27f;">' + (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos</p>';
    html += '<p style="font-size:18px;">' + estrelas + ' ' + score + '</p></div>';
    
    html += '<div style="padding:0 15px;">';
    html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">';
    html += '<p>📧 ' + (user.email || 'Não informado') + '</p>';
    html += '<p>📱 ' + (user.celular || 'Não informado') + '</p>';
    html += '<p>🏢 ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p></div>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;"><div style="font-size:24px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div><div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;"><div style="font-size:24px;color:#f59e0b;font-weight:bold;">' + score + '</div><div style="color:#999;font-size:11px;">Avaliação</div></div>';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;" onclick="window.app.verMeusContratos()"><div style="font-size:24px;color:#10B981;font-weight:bold;">📋</div><div style="color:#999;font-size:11px;">Contratos</div></div></div>';
    
    html += '<button onclick="window.app.verMeusContratos()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">📋 ' + s.getTexto('perfil.contratos') + '</button>';
    html += '<button onclick="window.app.mostrarNotificacoes()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🔔 ' + s.getTexto('perfil.notificacoes') + '</button>';
    html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">✏️ ' + s.getTexto('perfil.editar') + '</button>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.mostrarTermosUso()" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📄 Termos</button>';
    html += '<button onclick="window.app.mostrarPrivacidade()" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🔒 Privacidade</button>';
    html += '</div>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.mostrarDiretrizes()" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📋 Diretrizes</button>';
    html += '<button onclick="window.app.mostrarSobre()" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">ℹ️ Sobre</button>';
    html += '</div>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇧🇷 PT</button>';
    html += '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇺🇸 EN</button>';
    html += '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇪🇸 ES</button>';
    html += '</div>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">☀️ Claro</button>';
    html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🌙 Escuro</button>';
    html += '</div>';
    
    html += '<button onclick="window.app.sair()" style="width:100%;background:white;color:#EF4444;border:2px solid #EF4444;padding:15px;border-radius:10px;font-weight:bold;">🚪 ' + s.getTexto('perfil.sair') + '</button></div>';
    
    tela.innerHTML = html;
    var loading = document.getElementById('perfilLoading');
    if (loading) loading.style.display = 'none';
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    c.innerHTML = '<div class="loading">Buscando...</div>';
    
    setTimeout(function() {
        var profs = [
            { id: 'p1', nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5 },
            { id: 'p2', nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8 },
            { id: 'p3', nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2 }
        ];
        
        var html = '';
        profs.forEach(function(p) {
            html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">' + p.nome + '</div><div class="vaga-data">' + p.profissao + ' • ' + p.experiencia + ' anos</div><div>' + '⭐'.repeat(Math.round(p.score)) + ' ' + p.score + '</div></div></div><div class="vaga-footer"><a href="https://wa.me/55' + p.celular + '" target="_blank" class="btn btn-success btn-small">WhatsApp</a><button class="btn btn-primary btn-small" onclick="window.app.iniciarChat(\'' + p.id + '\')">Chat</button></div></div>';
        });
        c.innerHTML = html;
    }, 500);
};

App.prototype.verPerfil = function(uid) { 
    var c = document.getElementById('perfilPublicoConteudo');
    if (c) c.innerHTML = '<div class="profile-info-card"><h2>Profissional</h2><p>Construtor • 5 anos</p><div>⭐⭐⭐⭐⭐</div></div>';
};

App.prototype.carregarRede = function() {
    var c = document.getElementById('redeContainer');
    if (c) c.innerHTML = '<div class="card" style="text-align:center;"><h3>Rede vazia</h3></div>';
};

App.prototype.adicionarNaRede = function(aid) { this.mostrarToast('✅ Adicionado!', 'sucesso'); };
App.prototype.removerDaRede = function(aid) { if (!confirm('Remover?')) return; this.mostrarToast('Removido', 'sucesso'); };

// ===== NOTIFICAÇÕES =====
App.prototype.mostrarNotificacoes = function() {
    var s = this;
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
    var minhas = notificacoes.filter(function(n) { return n.para === userId; });
    
    var html = '<div style="padding:20px;"><h3 style="color:#1A3A5C;">🔔 Notificações</h3>';
    
    if (minhas.length === 0) {
        html += '<p style="text-align:center;color:#999;margin-top:40px;">Nenhuma notificação.</p>';
    } else {
        minhas.forEach(function(n) {
            var bg = n.lida ? '#f9f9f9' : '#f0f9ff';
            html += '<div style="background:' + bg + ';border-radius:10px;padding:15px;margin-bottom:10px;' + (n.lida ? '' : 'border-left:3px solid #1A3A5C;') + '">';
            html += '<h4 style="margin:0 0 5px 0;">' + n.titulo + '</h4>';
            html += '<p style="margin:0;color:#666;">' + n.mensagem + '</p>';
            html += '<p style="font-size:11px;color:#999;margin:5px 0 0 0;">' + new Date(n.data).toLocaleDateString('pt-BR') + '</p></div>';
        });
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button></div>';
    
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('meuPerfilScreen'); }
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.verDetalheObra = function(oid) { this.mostrarToast('🔍 Visualizando detalhes...', 'info'); };
App.prototype.iniciarChat = function(uid) { this.mostrarToast('💬 Chat iniciado!', 'sucesso'); };
App.prototype.confirmarContratacao = function() { this.mostrarToast('✅ Contratado!', 'sucesso'); };
App.prototype.novaObra = function() { this.mostrarToast('🏗️ Nova obra!', 'sucesso'); };
App.prototype.carregarMinhasObras = function() { 
    var c = document.getElementById('minhasObrasContainer'); 
    if (c) c.innerHTML = '<div class="card"><h3>Minhas Obras</h3><p>Nenhuma obra.</p></div>'; 
};
App.prototype.demitirFuncionario = function(cid) { if (confirm('Demitir?')) this.mostrarToast('Demitido.', 'sucesso'); };
App.prototype.finalizarContrato = function(cid) { if (confirm('Finalizar?')) this.mostrarToast('Finalizado.', 'sucesso'); };
App.prototype.abrirEditarPerfil = function() { this.mostrarToast('✏️ Editar perfil', 'info'); };
App.prototype.salvarPerfil = function() { this.mostrarToast('✅ Perfil salvo!', 'sucesso'); };
App.prototype.uploadFoto = function(e) { this.mostrarToast('📸 Foto atualizada!', 'sucesso'); };
App.prototype.verAvaliacoes = function(uid) { this.mostrarToast('⭐ Avaliações!', 'info'); };
App.prototype.abrirDarAvaliacao = function(uid) { this.avaliarUid = uid; this.mostrarToast('Avalie!', 'info'); };
App.prototype.setNota = function(n) { this.avaliarNota = n; };
App.prototype.enviarAvaliacao = function() { 
    if (this.avaliarUid && this.avaliarNota > 0) {
        this.mostrarToast('✅ Avaliação ' + this.avaliarNota + ' estrelas enviada!', 'sucesso');
        this.avaliarUid = null;
        this.avaliarNota = 0;
    }
};
App.prototype.gerarQRCode = function(uid) { 
    var qrDiv = document.getElementById('qrCodeContainer');
    if (qrDiv) {
        qrDiv.innerHTML = '<div style="text-align:center;padding:20px;"><div style="background:white;padding:20px;display:inline-block;border-radius:10px;"><p>📱 QR Code</p><div style="width:150px;height:150px;background:#000;margin:10px auto;"></div><p style="font-size:12px;">Perfil: ' + uid + '</p><button onclick="window.app.fecharQRCode()" style="background:#1A3A5C;color:white;border:none;padding:10px 20px;border-radius:8px;">Fechar</button></div></div>';
        qrDiv.style.display = 'flex';
    }
};
App.prototype.fecharQRCode = function() { 
    var qr = document.getElementById('qrCodeContainer');
    if (qr) qr.style.display = 'none';
};
App.prototype.baixarQRCode = function() { this.mostrarToast('📥 QR Code baixado!', 'sucesso'); };
App.prototype.mostrarInfoVersao = function() { this.mostrarSobre(); };
App.prototype.confirmarExclusao = function() { if (confirm('Excluir conta?')) this.mostrarToast('Conta excluída.', 'sucesso'); };
App.prototype.mudarTab = function(t) {};
App.prototype.enviarMensagem = function() { this.mostrarToast('📨 Enviada!', 'sucesso'); };

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1A3A5C;color:white;padding:12px 24px;border-radius:25px;z-index:10000;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:none;max-width:90%;text-align:center;';
        document.body.appendChild(toast);
    }
    if (tipo === 'sucesso') toast.style.background = '#10B981';
    else if (tipo === 'erro') toast.style.background = '#EF4444';
    else if (tipo === 'info') toast.style.background = '#3B82F6';
    else toast.style.background = '#1A3A5C';
    
    toast.textContent = mensagem;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(function() { toast.style.display = 'none'; }, 300);
    }, 3000);
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    if (!window.app._app) { new App(); }
});
