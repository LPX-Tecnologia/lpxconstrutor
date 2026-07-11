// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL COMPLETA =====
// ==========================================================

// ===== SISTEMA DE TRADUÇÃO =====
var traducoes = {
    pt: {
        saudacao: 'Bem-vindo!', carregando: 'Carregando...', nenhumaVaga: 'Nenhuma vaga publicada',
        publicarVaga: 'PUBLICAR VAGA', buscar: 'Buscar Profissionais', feed: 'Feed', rede: 'Minha Rede',
        inicio: 'Início', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar',
        editarPerfil: 'Editar Perfil', faq: 'FAQ - Perguntas Frequentes', termos: 'Termos de Uso',
        privacidade: 'Política de Privacidade', versao: 'Versão do App', idioma: 'Idioma', aparencia: 'Aparência',
        notificacoes: 'Central de Notificações', seguranca: 'Segurança', alterarSenha: 'Alterar Senha',
        excluirConta: 'Solicitar Exclusão de Conta', avaliacoes: 'Minhas Avaliações', sair: 'SAIR DA CONTA',
        informacoes: 'Informações', configuracoes: 'Configurações', temaClaro: 'Claro', temaEscuro: 'Escuro',
        portugues: 'Português', espanhol: 'Espanhol', ingles: 'Inglês', nome: 'Nome Completo',
        whatsapp: 'WhatsApp', profissao: 'Profissão', experiencia: 'Experiência (anos)', habilidades: 'Habilidades',
        salvar: 'SALVAR ALTERAÇÕES', email: 'Email', senha: 'Senha', entrar: 'ENTRAR', criarConta: 'Criar Conta',
        esqueciSenha: 'Esqueci a Senha', bemVindo: 'Bem-vindo!', ateLogo: 'Até logo!',
        preenchaTodos: 'Preencha todos os campos!', nomeObrigatorio: 'Nome obrigatório!',
        perfilAtualizado: 'Perfil atualizado!', fotoAtualizada: 'Foto atualizada!',
        temaAlterado: 'Tema alterado para:', idiomaAlterado: 'Idioma alterado para:',
        empreiteiro: 'Empreiteiro', profissional: 'Profissional', contratar: 'CONTRATAR',
        whatsappBtn: 'WhatsApp', chatBtn: 'Chat', verAvaliacoes: 'Ver Avaliações', cancelar: 'CANCELAR',
        publicadoSucesso: 'Vaga publicada!', candidaturaEnviada: 'Candidatura enviada!',
        contratadoSucesso: 'Contratado!', avaliacaoEnviada: 'Avaliação enviada!',
        codigoGerado: 'Código gerado!', senhaRedefinida: 'Senha redefinida!', linkCopiado: 'Link copiado!',
        adicionadoRede: 'Adicionado na rede!', removidoRede: 'Removido da rede!',
        desejaSair: 'Deseja sair do LPXConstrutor?'
    },
    es: {
        saudacao: '¡Bienvenido!', carregando: 'Cargando...', nenhumaVaga: 'Sin vacantes',
        publicarVaga: 'PUBLICAR VACANTE', buscar: 'Buscar', feed: 'Feed', rede: 'Mi Red',
        inicio: 'Inicio', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar',
        editarPerfil: 'Editar Perfil', faq: 'FAQ', termos: 'Términos', privacidade: 'Privacidad',
        versao: 'Versión', idioma: 'Idioma', aparencia: 'Apariencia', notificacoes: 'Notificaciones',
        seguranca: 'Seguridad', alterarSenha: 'Cambiar Contraseña', excluirConta: 'Eliminar Cuenta',
        avaliacoes: 'Evaluaciones', sair: 'CERRAR SESIÓN', informacoes: 'Información', configuracoes: 'Configuración',
        temaClaro: 'Claro', temaEscuro: 'Oscuro', portugues: 'Portugués', espanhol: 'Español', ingles: 'Inglés',
        nome: 'Nombre', whatsapp: 'WhatsApp', profissao: 'Profesión', experiencia: 'Experiencia',
        habilidades: 'Habilidades', salvar: 'GUARDAR', email: 'Email', senha: 'Contraseña',
        entrar: 'ENTRAR', criarConta: 'Crear Cuenta', esqueciSenha: 'Olvidé Contraseña',
        bemVindo: '¡Bienvenido!', ateLogo: '¡Hasta luego!', preenchaTodos: '¡Rellena todos los campos!',
        nomeObrigatorio: '¡Nombre obligatorio!', perfilAtualizado: '¡Perfil actualizado!',
        fotoAtualizada: '¡Foto actualizada!', temaAlterado: 'Tema cambiado a:',
        idiomaAlterado: 'Idioma cambiado a:', empreiteiro: 'Contratista', profissional: 'Profesional',
        contratar: 'CONTRATAR', whatsappBtn: 'WhatsApp', chatBtn: 'Chat', verAvaliacoes: 'Ver Evaluaciones',
        cancelar: 'CANCELAR', publicadoSucesso: '¡Vacante publicada!', candidaturaEnviada: '¡Solicitud enviada!',
        contratadoSucesso: '¡Contratado!', avaliacaoEnviada: '¡Evaluación enviada!',
        codigoGerado: '¡Código generado!', senhaRedefinida: '¡Contraseña cambiada!', linkCopiado: '¡Enlace copiado!',
        adicionadoRede: '¡Agregado a la red!', removidoRede: '¡Eliminado de la red!',
        desejaSair: '¿Quieres salir de LPXConstrutor?'
    },
    en: {
        saudacao: 'Welcome!', carregando: 'Loading...', nenhumaVaga: 'No jobs available',
        publicarVaga: 'POST JOB', buscar: 'Search', feed: 'Feed', rede: 'My Network',
        inicio: 'Home', perfil: 'Profile', chat: 'Chat', obras: 'Projects', publicar: 'Post',
        editarPerfil: 'Edit Profile', faq: 'FAQ', termos: 'Terms', privacidade: 'Privacy',
        versao: 'Version', idioma: 'Language', aparencia: 'Appearance', notificacoes: 'Notifications',
        seguranca: 'Security', alterarSenha: 'Change Password', excluirConta: 'Delete Account',
        avaliacoes: 'My Reviews', sair: 'SIGN OUT', informacoes: 'Information', configuracoes: 'Settings',
        temaClaro: 'Light', temaEscuro: 'Dark', portugues: 'Portuguese', espanhol: 'Spanish', ingles: 'English',
        nome: 'Full Name', whatsapp: 'WhatsApp', profissao: 'Profession', experiencia: 'Experience',
        habilidades: 'Skills', salvar: 'SAVE', email: 'Email', senha: 'Password',
        entrar: 'SIGN IN', criarConta: 'Create Account', esqueciSenha: 'Forgot Password',
        bemVindo: 'Welcome!', ateLogo: 'Goodbye!', preenchaTodos: 'Fill in all fields!',
        nomeObrigatorio: 'Name required!', perfilAtualizado: 'Profile updated!',
        fotoAtualizada: 'Photo updated!', temaAlterado: 'Theme changed to:',
        idiomaAlterado: 'Language changed to:', empreiteiro: 'Contractor', profissional: 'Professional',
        contratar: 'HIRE', whatsappBtn: 'WhatsApp', chatBtn: 'Chat', verAvaliacoes: 'View Reviews',
        cancelar: 'CANCEL', publicadoSucesso: 'Job posted!', candidaturaEnviada: 'Application sent!',
        contratadoSucesso: 'Hired!', avaliacaoEnviada: 'Review sent!',
        codigoGerado: 'Code generated!', senhaRedefinida: 'Password reset!', linkCopiado: 'Link copied!',
        adicionadoRede: 'Added to network!', removidoRede: 'Removed from network!',
        desejaSair: 'Do you want to leave LPXConstrutor?'
    }
};

// ===== PLACEHOLDER GLOBAL =====
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
    abrirTelaPublicacao: function(){ if(window.app._app)window.app._app.abrirTelaPublicacao(); },
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
    filtrarAvaliacoes: function(f,b){ if(window.app._app)window.app._app.filtrarAvaliacoes(f,b); },
    verMinhasAvaliacoes: function(){ if(window.app._app)window.app._app.verMinhasAvaliacoes(); },
    abrirDarAvaliacao: function(uid){ if(window.app._app)window.app._app.abrirDarAvaliacao(uid); },
    setNota: function(n){ if(window.app._app)window.app._app.setNota(n); },
    enviarAvaliacao: function(){ if(window.app._app)window.app._app.enviarAvaliacao(); },
    gerarQRCode: function(uid){ if(window.app._app)window.app._app.gerarQRCode(uid); },
    fecharQRCode: function(){ if(window.app._app)window.app._app.fecharQRCode(); },
    compartilharLink: function(){ if(window.app._app)window.app._app.compartilharLink(); },
    baixarQRCode: function(){ if(window.app._app)window.app._app.baixarQRCode(); },
    selecionarIdioma: function(i){ if(window.app._app)window.app._app.selecionarIdioma(i); },
    selecionarTema: function(t){ if(window.app._app)window.app._app.selecionarTema(t); },
    mostrarInfoVersao: function(){ if(window.app._app)window.app._app.mostrarInfoVersao(); },
    confirmarExclusao: function(){ if(window.app._app)window.app._app.confirmarExclusao(); },
    mostrarNotificacoes: function(){ if(window.app._app)window.app._app.mostrarNotificacoes(); },
    mudarTab: function(t){ if(window.app._app)window.app._app.mudarTab(t); },
    carregarFeed: function(){ if(window.app._app)window.app._app.carregarFeed(); },
    carregarRede: function(){ if(window.app._app)window.app._app.carregarRede(); }
};

// ===== CLASSE PRINCIPAL =====
var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.historicoTelas = [];
    this.recuperacaoUid = null;
    this.avaliacoesUid = null;
    this.avaliarUid = null;
    this.avaliarNota = 0;
    this.vagaFotoBase64 = null;
    this.contratarProfId = null;
    this.obraSelecionada = null;
    this.qrcodeLink = null;
    this.idiomaAtual = 'pt';
    this.init();
};

App.prototype.t = function(chave) {
    var trad = traducoes[this.idiomaAtual] || traducoes.pt;
    return trad[chave] || traducoes.pt[chave] || chave;
};

App.prototype.init = function() {
    var self = this;
    console.log('🚀 Iniciando LPXConstrutor...');
    window.app._app = this;
    
    // Carrega idioma salvo
    var idiomaSalvo = localStorage.getItem('idioma');
    if (idiomaSalvo && traducoes[idiomaSalvo]) {
        this.idiomaAtual = idiomaSalvo;
    }
    
    // Carrega tema salvo
    var temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-theme');
        var ta = document.getElementById('temaAtual');
        if (ta) ta.textContent = this.t('temaEscuro');
    }
    
    // ===== INTERCEPTAR BOTÃO VOLTAR DO CELULAR =====
    history.pushState(null, '', window.location.href);
    
    window.addEventListener('popstate', function(event) {
        console.log('🔙 Botão voltar pressionado. Tela:', self.telaAtual);
        
        if (self.telaAtual === 'homeScreen' || self.telaAtual === 'loginScreen') {
            if (confirm(self.t('desejaSair'))) {
                // Deixa fechar
            } else {
                history.pushState(null, '', window.location.href);
            }
        } else {
            self.voltarTela();
            history.pushState(null, '', window.location.href);
        }
    });
    
    authService.onAuthStateChange(function(u) {
        if (u) {
            self.usuarioLogado = u;
            self.atualizarBotaoPublicar();
            self.atualizarBotaoObras();
            if (self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') {
                self.mostrarTela('homeScreen');
            }
        } else {
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
        }
    });
    console.log('✅ App iniciado. Idioma:', this.idiomaAtual);
};

App.prototype.atualizarBotaoPublicar = function() {
    var btn = document.getElementById('btnPublicar');
    if (!btn) return;
    btn.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.atualizarBotaoObras = function() {
    var btn = document.getElementById('btnObras');
    if (!btn) return;
    btn.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

// ===== NAVEGAÇÃO =====
App.prototype.mostrarTela = function(id) {
    var self = this;
    if (self.telaAtual && self.telaAtual !== id && self.telaAtual !== 'loginScreen') {
        self.historicoTelas.push(self.telaAtual);
    }
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    var tela = document.getElementById(id);
    if (!tela) return;
    tela.classList.add('active');
    self.telaAtual = id;
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var tn = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen', 'minhasObrasScreen'];
        nav.style.display = tn.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    if (id === 'homeScreen') setTimeout(function() { self.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { self.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { self.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { self.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') {
        document.getElementById('recPasso1').style.display = 'block';
        document.getElementById('recPasso2').style.display = 'none';
    }
};

App.prototype.voltarTela = function() {
    console.log('🔙 Voltando... Histórico:', this.historicoTelas.length);
    if (this.historicoTelas.length > 0) {
        var anterior = this.historicoTelas.pop();
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        var tela = document.getElementById(anterior);
        if (tela) { tela.classList.add('active'); this.telaAtual = anterior; }
        if (anterior === 'meuPerfilScreen') this.carregarMeuPerfil();
        if (anterior === 'homeScreen') this.carregarHome();
        if (anterior === 'buscaScreen') this.buscarProfissionais();
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== TEMA =====
App.prototype.selecionarTema = function(tema) {
    var body = document.body;
    var temaClaro = document.getElementById('temaClaro');
    var temaEscuro = document.getElementById('temaEscuro');
    var temaAtual = document.getElementById('temaAtual');
    if (tema === 'escuro') {
        body.classList.add('dark-theme');
        if (temaClaro) temaClaro.style.background = '';
        if (temaEscuro) temaEscuro.style.background = '#E0F2FE';
        if (temaAtual) temaAtual.textContent = this.t('temaEscuro');
        localStorage.setItem('tema', 'escuro');
    } else {
        body.classList.remove('dark-theme');
        if (temaClaro) temaClaro.style.background = '#E0F2FE';
        if (temaEscuro) temaEscuro.style.background = '';
        if (temaAtual) temaAtual.textContent = this.t('temaClaro');
        localStorage.setItem('tema', 'claro');
    }
    this.mostrarToast('🎨 ' + this.t('temaAlterado') + ' ' + this.t(tema === 'claro' ? 'temaClaro' : 'temaEscuro'), 'sucesso');
};

// ===== IDIOMA =====
App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    this.mostrarToast('🌐 ' + this.t('idiomaAlterado') + ' ' + idioma.toUpperCase(), 'sucesso');
    this.voltarTela();
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var self = this;
    var e = (document.getElementById('loginEmail') || {}).value || '';
    var s = (document.getElementById('loginSenha') || {}).value || '';
    if (!e || !s) { self.mostrarToast('❌ ' + self.t('preenchaTodos'), 'erro'); return; }
    self.mostrarToast(self.t('entrar') + '...', 'info');
    authService.login(e, s).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ ' + self.t('bemVindo'), 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = { nome: (document.getElementById('cadNome')||{}).value||'', email: (document.getElementById('cadEmail')||{}).value||'', senha: (document.getElementById('cadSenha')||{}).value||'', tipo: (document.getElementById('cadTipo')||{}).value||'profissional', celular: (document.getElementById('cadCelular')||{}).value||'', cpf: ((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''), profissao: (document.getElementById('cadProfissao')||{}).value||'', experiencia: (document.getElementById('cadExperiencia')||{}).value||'0', habilidades: (document.getElementById('cadHabilidades')||{}).value||'' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ ' + self.t('preenchaTodos'), 'erro'); return; }
    self.mostrarToast(self.t('criarConta') + '...', 'info');
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ ' + self.t('criarConta') + ' OK!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.proximaEtapa = function(e) { var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); if(!e1||!e2)return; e1.style.display=e===1?'block':'none'; e2.style.display=e===2?'block':'none'; };
App.prototype.toggleProfissao = function() { var g=document.getElementById('grupoProfissao'); if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; };
App.prototype.sair = function() { var self=this; authService.logout().then(function(){self.usuarioLogado=null;self.mostrarTela('loginScreen');self.mostrarToast('👋 ' + self.t('ateLogo'),'sucesso');}); };

// ===== RECUPERAÇÃO =====
App.prototype.solicitarCodigo = function() {
    var self=this;
    var email=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():'';
    if(!email||!email.includes('@')){self.mostrarToast('❌ Email inválido!','erro');return;}
    self.mostrarToast('Gerando...','info');
    authService.solicitarCodigoRecuperacao(email).then(function(r){
        if(r.sucesso){self.recuperacaoUid=r.uid;self.mostrarToast('✅ '+self.t('codigoGerado')+': '+r.codigo,'sucesso');document.getElementById('recPasso1').style.display='none';document.getElementById('recPasso2').style.display='block';}
        else self.mostrarToast('❌ '+r.erro,'erro');
    });
};
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){var self=this;self.mostrarToast('✅ '+self.t('senhaRedefinida'),'sucesso');setTimeout(function(){window.app._app.mostrarTela('loginScreen');},1500);};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if(!this.usuarioLogado)return;
    var h=new Date().getHours(),s='Bom dia';if(h>=12&&h<18)s='Boa tarde';if(h>=18)s='Boa noite';
    document.getElementById('saudacao').textContent='👋 '+s+', '+this.usuarioLogado.nome+'!';
    document.getElementById('resumoTexto').textContent=(this.usuarioLogado.tipo==='empreiteiro'?this.t('empreiteiro'):this.t('profissional'))+' • '+(this.usuarioLogado.profissao||this.usuarioLogado.tipo);
    setTimeout(function(){try{if(typeof mapaService!=='undefined')mapaService.initMap()}catch(e){}},500);
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self=this,c=document.getElementById('feedContainer');if(!c)return;
    c.innerHTML='<div class="loading">'+self.t('carregando')+'</div>';
    var timeout=setTimeout(function(){c.innerHTML='<div class="card" style="text-align:center;"><h3>Tempo esgotado</h3></div>';},10000);
    db.collection('vagas').get().then(function(snap){
        clearTimeout(timeout);var vagas=[];snap.forEach(function(doc){var d=doc.data();if(d.ativa!==false)vagas.push({id:doc.id,data:d});});
        if(vagas.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><h3>'+self.t('nenhumaVaga')+'</h3>'+(self.usuarioLogado&&self.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">'+self.t('publicarVaga')+'</button>':'')+'</div>';return;}
        var html='';vagas.forEach(function(v){html+='<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">'+(v.data.titulo||'Vaga')+'</div><div class="vaga-data">📍 '+(v.data.endereco||'')+'</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$'+(v.data.valorHora||'0')+'/h</span><span class="vaga-tag">👷 '+(v.data.profissoes||'Todas')+'</span></div></div>'+(self.usuarioLogado&&self.usuarioLogado.tipo==='profissional'?'<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="window.app.candidatarVaga(\''+v.id+'\')">✋ QUERO!</button></div>':'')+'</div>';});
        c.innerHTML=html;
    }).catch(function(){clearTimeout(timeout);c.innerHTML='<div class="card">Erro</div>';});
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    if (!this.usuarioLogado) return;
    var u = this.usuarioLogado;
    
    var nomeEl = document.getElementById('meuPerfilNome');
    if (nomeEl) nomeEl.textContent = u.nome || 'Usuário';
    
    var profEl = document.getElementById('meuPerfilProfissao');
    if (profEl) profEl.textContent = (u.tipo === 'profissional' ? '👷 ' : '🏢 ') + (u.profissao || u.tipo || this.t('profissional'));
    
    var scoreEl = document.getElementById('meuPerfilScore');
    if (scoreEl) scoreEl.textContent = '⭐ ' + ((u.score || 0).toFixed(1)) + ' (' + (u.avaliacoesRecebidas || 0) + ' ' + this.t('avaliacoes') + ')';
    
    var qtdEl = document.getElementById('menuQtdAvaliacoes');
    if (qtdEl) qtdEl.textContent = u.avaliacoesRecebidas || 0;
    
    if (u.fotoPerfil) {
        var fotoEl = document.getElementById('fotoPerfilPreview');
        if (fotoEl) fotoEl.src = u.fotoPerfil;
    }
};

App.prototype.abrirEditarPerfil = function() {
    if(!this.usuarioLogado)return;var u=this.usuarioLogado;
    document.getElementById('editNome').value=u.nome||'';
    document.getElementById('editCelular').value=u.celular||'';
    document.getElementById('editProfissao').value=u.profissao||'';
    document.getElementById('editExperiencia').value=u.experiencia||0;
    document.getElementById('editHabilidades').value=u.habilidades||'';
    this.mostrarTela('editarPerfilScreen');
};

App.prototype.salvarPerfil = function() {
    var self=this;
    var d={nome:document.getElementById('editNome').value.trim(),celular:document.getElementById('editCelular').value.trim(),experiencia:parseInt(document.getElementById('editExperiencia').value)||0,habilidades:document.getElementById('editHabilidades').value.trim()};
    if(!d.nome){self.mostrarToast('❌ '+self.t('nomeObrigatorio'),'erro');return;}
    databaseService.atualizarUsuario(self.usuarioLogado.id,d).then(function(){self.usuarioLogado.nome=d.nome;self.usuarioLogado.celular=d.celular;self.mostrarToast('✅ '+self.t('perfilAtualizado'),'sucesso');self.carregarMeuPerfil();self.voltarTela();});
};

App.prototype.uploadFoto = function(e){var self=this,f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(self.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){self.usuarioLogado.fotoPerfil=ev.target.result;document.getElementById('fotoPerfilPreview').src=ev.target.result;self.mostrarToast('✅ '+self.t('fotoAtualizada'),'sucesso');});};r.readAsDataURL(f);};

// ===== OUTROS =====
App.prototype.mostrarInfoVersao = function(){this.mostrarToast('🏗️ LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){var m=document.getElementById('motivoExclusao').value;if(!m){this.mostrarToast('❌ Selecione um motivo!','erro');return;}if(!confirm('⚠️ Tem certeza? Esta ação é IRREVERSÍVEL!'))return;this.mostrarToast('📧 Solicitação enviada!','sucesso');setTimeout(function(){window.app._app.mostrarTela('loginScreen');},2000);};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
