// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL COMPLETA =====
// ==========================================================

// Garantir que o placeholder não seja sobrescrito
if (!window.app || !window.app._app) {
    window.app = window.app || {};
    window.app._app = window.app._app || null;
}

// ===== SISTEMA DE TRADUÇÃO =====
var traducoes = {
    pt: {
        saudacao: 'Bem-vindo!', carregando: 'Carregando...', nenhumaVaga: 'Nenhuma vaga publicada',
        publicarVaga: 'PUBLICAR VAGA', buscar: 'Buscar Profissionais', feed: 'Feed', rede: 'Minha Rede',
        inicio: 'Início', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar',
        editarPerfil: 'Editar Perfil', faq: 'FAQ', termos: 'Termos de Uso', privacidade: 'Privacidade',
        versao: 'Versão do App', idioma: 'Idioma', aparencia: 'Aparência', notificacoes: 'Central de Notificações',
        seguranca: 'Segurança', alterarSenha: 'Alterar Senha', excluirConta: 'Excluir Conta',
        avaliacoes: 'Minhas Avaliações', sair: 'SAIR DA CONTA', informacoes: 'Informações',
        configuracoes: 'Configurações', temaClaro: 'Claro', temaEscuro: 'Escuro',
        portugues: 'Português', espanhol: 'Espanhol', ingles: 'Inglês', nome: 'Nome Completo',
        whatsapp: 'WhatsApp', profissao: 'Profissão', experiencia: 'Experiência (anos)',
        habilidades: 'Habilidades', salvar: 'SALVAR', email: 'Email', senha: 'Senha',
        entrar: 'ENTRAR', criarConta: 'Criar Conta', esqueciSenha: 'Esqueci a Senha',
        bemVindo: 'Bem-vindo!', ateLogo: 'Até logo!', preenchaTodos: 'Preencha todos os campos!',
        nomeObrigatorio: 'Nome obrigatório!', perfilAtualizado: 'Perfil atualizado!',
        fotoAtualizada: 'Foto atualizada!', temaAlterado: 'Tema alterado para:',
        idiomaAlterado: 'Idioma alterado para:', empreiteiro: 'Empreiteiro', profissional: 'Profissional',
        contratar: 'CONTRATAR', whatsappBtn: 'WhatsApp', chatBtn: 'Chat',
        verAvaliacoes: 'Ver Avaliações', cancelar: 'CANCELAR', publicadoSucesso: 'Vaga publicada!',
        candidaturaEnviada: 'Candidatura enviada!', contratadoSucesso: 'Contratado!',
        avaliacaoEnviada: 'Avaliação enviada!', codigoGerado: 'Código gerado!',
        senhaRedefinida: 'Senha redefinida!', linkCopiado: 'Link copiado!',
        adicionadoRede: 'Adicionado na rede!', removidoRede: 'Removido da rede!',
        desejaSair: 'Deseja sair do LPXConstrutor?', descricaoSair: 'Você será direcionado para a tela de login.',
        simSair: 'SIM, SAIR', naoSair: 'NÃO'
    },
    es: {
        saudacao: '¡Bienvenido!', carregando: 'Cargando...', nenhumaVaga: 'Sin vacantes',
        publicarVaga: 'PUBLICAR VACANTE', buscar: 'Buscar', feed: 'Feed', rede: 'Mi Red',
        inicio: 'Inicio', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar',
        editarPerfil: 'Editar Perfil', faq: 'FAQ', termos: 'Términos', privacidade: 'Privacidad',
        versao: 'Versión', idioma: 'Idioma', aparencia: 'Apariencia', notificacoes: 'Notificaciones',
        seguranca: 'Seguridad', alterarSenha: 'Cambiar Contraseña', excluirConta: 'Eliminar Cuenta',
        avaliacoes: 'Evaluaciones', sair: 'CERRAR SESIÓN', informacoes: 'Información',
        configuracoes: 'Configuración', temaClaro: 'Claro', temaEscuro: 'Oscuro',
        portugues: 'Portugués', espanhol: 'Español', ingles: 'Inglés', nome: 'Nombre',
        whatsapp: 'WhatsApp', profissao: 'Profesión', experiencia: 'Experiencia',
        habilidades: 'Habilidades', salvar: 'GUARDAR', email: 'Email', senha: 'Contraseña',
        entrar: 'ENTRAR', criarConta: 'Crear Cuenta', esqueciSenha: 'Olvidé Contraseña',
        bemVindo: '¡Bienvenido!', ateLogo: '¡Hasta luego!', preenchaTodos: '¡Rellena todos los campos!',
        nomeObrigatorio: '¡Nombre obligatorio!', perfilAtualizado: '¡Perfil actualizado!',
        fotoAtualizada: '¡Foto actualizada!', temaAlterado: 'Tema cambiado a:',
        idiomaAlterado: 'Idioma cambiado a:', empreiteiro: 'Contratista', profissional: 'Profesional',
        contratar: 'CONTRATAR', whatsappBtn: 'WhatsApp', chatBtn: 'Chat',
        verAvaliacoes: 'Ver Evaluaciones', cancelar: 'CANCELAR', publicadoSucesso: '¡Vacante publicada!',
        candidaturaEnviada: '¡Solicitud enviada!', contratadoSucesso: '¡Contratado!',
        avaliacaoEnviada: '¡Evaluación enviada!', codigoGerado: '¡Código generado!',
        senhaRedefinida: '¡Contraseña cambiada!', linkCopiado: '¡Enlace copiado!',
        adicionadoRede: '¡Agregado a la red!', removidoRede: '¡Eliminado de la red!',
        desejaSair: '¿Quieres salir de LPXConstrutor?', descricaoSair: 'Serás dirigido a la pantalla de inicio de sesión.',
        simSair: 'SÍ, SALIR', naoSair: 'NO'
    },
    en: {
        saudacao: 'Welcome!', carregando: 'Loading...', nenhumaVaga: 'No jobs available',
        publicarVaga: 'POST JOB', buscar: 'Search', feed: 'Feed', rede: 'My Network',
        inicio: 'Home', perfil: 'Profile', chat: 'Chat', obras: 'Projects', publicar: 'Post',
        editarPerfil: 'Edit Profile', faq: 'FAQ', termos: 'Terms', privacidade: 'Privacy',
        versao: 'Version', idioma: 'Language', aparencia: 'Appearance', notificacoes: 'Notifications',
        seguranca: 'Security', alterarSenha: 'Change Password', excluirConta: 'Delete Account',
        avaliacoes: 'My Reviews', sair: 'SIGN OUT', informacoes: 'Information',
        configuracoes: 'Settings', temaClaro: 'Light', temaEscuro: 'Dark',
        portugues: 'Portuguese', espanhol: 'Spanish', ingles: 'English', nome: 'Full Name',
        whatsapp: 'WhatsApp', profissao: 'Profession', experiencia: 'Experience',
        habilidades: 'Skills', salvar: 'SAVE', email: 'Email', senha: 'Password',
        entrar: 'SIGN IN', criarConta: 'Create Account', esqueciSenha: 'Forgot Password',
        bemVindo: 'Welcome!', ateLogo: 'Goodbye!', preenchaTodos: 'Fill in all fields!',
        nomeObrigatorio: 'Name required!', perfilAtualizado: 'Profile updated!',
        fotoAtualizada: 'Photo updated!', temaAlterado: 'Theme changed to:',
        idiomaAlterado: 'Language changed to:', empreiteiro: 'Contractor', profissional: 'Professional',
        contratar: 'HIRE', whatsappBtn: 'WhatsApp', chatBtn: 'Chat',
        verAvaliacoes: 'View Reviews', cancelar: 'CANCEL', publicadoSucesso: 'Job posted!',
        candidaturaEnviada: 'Application sent!', contratadoSucesso: 'Hired!',
        avaliacaoEnviada: 'Review sent!', codigoGerado: 'Code generated!',
        senhaRedefinida: 'Password reset!', linkCopiado: 'Link copied!',
        adicionadoRede: 'Added to network!', removidoRede: 'Removed from network!',
        desejaSair: 'Do you want to leave LPXConstrutor?', descricaoSair: 'You will be directed to the login screen.',
        simSair: 'YES, EXIT', naoSair: 'NO'
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
    mostrarModalSair: function(){ if(window.app._app)window.app._app.mostrarModalSair(); },
    fecharModalSair: function(){ if(window.app._app)window.app._app.fecharModalSair(); },
    confirmarSair: function(){ if(window.app._app)window.app._app.confirmarSair(); },
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
    
    var idiomaSalvo = localStorage.getItem('idioma');
    if (idiomaSalvo && traducoes[idiomaSalvo]) this.idiomaAtual = idiomaSalvo;
    
    var temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-theme');
        var ta = document.getElementById('temaAtual');
        if (ta) ta.textContent = this.t('temaEscuro');
    }
    
    // Interceptar botão voltar
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() {
        if (self.telaAtual === 'homeScreen' || self.telaAtual === 'loginScreen') {
            self.mostrarModalSair();
        } else {
            self.voltarTela();
        }
    });
    
    authService.onAuthStateChange(function(u) {
        if (u) {
            self.usuarioLogado = u;
            self.atualizarBotaoPublicar();
            self.atualizarBotaoObras();
            if (self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') self.mostrarTela('homeScreen');
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
        var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen','minhasObrasScreen'];
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

// ===== MODAL SAIR =====
App.prototype.mostrarModalSair = function() { document.getElementById('modalSair').style.display = 'flex'; };
App.prototype.fecharModalSair = function() { document.getElementById('modalSair').style.display = 'none'; history.pushState(null, '', window.location.href); };
App.prototype.confirmarSair = function() { document.getElementById('modalSair').style.display = 'none'; this.usuarioLogado = null; this.historicoTelas = []; this.mostrarTela('loginScreen'); };

// ===== TEMA =====
App.prototype.selecionarTema = function(tema) {
    var body = document.body;
    var tc = document.getElementById('temaClaro'), te = document.getElementById('temaEscuro'), ta = document.getElementById('temaAtual');
    if (tema === 'escuro') {
        body.classList.add('dark-theme');
        if (tc) tc.style.background = '';
        if (te) te.style.background = '#E0F2FE';
        if (ta) ta.textContent = this.t('temaEscuro');
        localStorage.setItem('tema', 'escuro');
    } else {
        body.classList.remove('dark-theme');
        if (tc) tc.style.background = '#E0F2FE';
        if (te) te.style.background = '';
        if (ta) ta.textContent = this.t('temaClaro');
        localStorage.setItem('tema', 'claro');
    }
    this.mostrarToast('🎨 Tema: ' + this.t(tema === 'claro' ? 'temaClaro' : 'temaEscuro'), 'sucesso');
};

// ===== IDIOMA =====
App.prototype.selecionarIdioma = function(idioma) { this.idiomaAtual = idioma; localStorage.setItem('idioma', idioma); this.mostrarToast('🌐 Idioma: ' + idioma.toUpperCase(), 'sucesso'); this.voltarTela(); };

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var self = this;
    var e = (document.getElementById('loginEmail')||{}).value||'', s = (document.getElementById('loginSenha')||{}).value||'';
    if (!e || !s) { self.mostrarToast('❌ Preencha todos!', 'erro'); return; }
    authService.login(e, s).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Bem-vindo!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = { nome: (document.getElementById('cadNome')||{}).value||'', email: (document.getElementById('cadEmail')||{}).value||'', senha: (document.getElementById('cadSenha')||{}).value||'', tipo: (document.getElementById('cadTipo')||{}).value||'profissional', celular: (document.getElementById('cadCelular')||{}).value||'', cpf: ((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''), profissao: (document.getElementById('cadProfissao')||{}).value||'', experiencia: (document.getElementById('cadExperiencia')||{}).value||'0', habilidades: (document.getElementById('cadHabilidades')||{}).value||'' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ Preencha todos!', 'erro'); return; }
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ OK!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.proximaEtapa = function(e) { var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); if(!e1||!e2)return; e1.style.display=e===1?'block':'none'; e2.style.display=e===2?'block':'none'; };
App.prototype.toggleProfissao = function() { var g=document.getElementById('grupoProfissao'); if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; };
App.prototype.sair = function() { var self=this; authService.logout().then(function(){self.usuarioLogado=null;self.mostrarTela('loginScreen');self.mostrarToast('👋 Até logo!','sucesso');}); };

// ===== RECUPERAÇÃO =====
App.prototype.solicitarCodigo = function() {
    var self=this;
    var email=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():'';
    if(!email||!email.includes('@')){self.mostrarToast('❌ Email inválido!','erro');return;}
    authService.solicitarCodigoRecuperacao(email).then(function(r){
        if(r.sucesso){self.recuperacaoUid=r.uid;self.mostrarToast('✅ Código: '+r.codigo,'sucesso');document.getElementById('recPasso1').style.display='none';document.getElementById('recPasso2').style.display='block';}
        else self.mostrarToast('❌ '+r.erro,'erro');
    });
};
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){var self=this;self.mostrarToast('✅ Senha redefinida!','sucesso');setTimeout(function(){self.mostrarTela('loginScreen');},1500);};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if(!this.usuarioLogado)return;
    var h=new Date().getHours(),s='Bom dia';if(h>=12&&h<18)s='Boa tarde';if(h>=18)s='Boa noite';
    document.getElementById('saudacao').textContent='👋 '+s+', '+this.usuarioLogado.nome+'!';
    document.getElementById('resumoTexto').textContent=(this.usuarioLogado.tipo==='empreiteiro'?'🏢 Empreiteiro':'👷 Profissional')+' • '+(this.usuarioLogado.profissao||this.usuarioLogado.tipo);
    setTimeout(function(){try{if(typeof mapaService!=='undefined')mapaService.initMap()}catch(e){}},500);
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self=this,c=document.getElementById('feedContainer');if(!c)return;
    c.innerHTML='<div class="loading">Carregando...</div>';
    db.collection('vagas').get().then(function(snap){
        var vagas=[];snap.forEach(function(doc){var d=doc.data();if(d.ativa!==false)vagas.push({id:doc.id,data:d});});
        if(vagas.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma vaga</h3>'+(self.usuarioLogado&&self.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">PUBLICAR VAGA</button>':'')+'</div>';return;}
        var html='';vagas.forEach(function(v){html+='<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">'+(v.data.titulo||'Vaga')+'</div><div class="vaga-data">📍 '+(v.data.endereco||'')+'</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$'+(v.data.valorHora||'0')+'/h</span><span class="vaga-tag">👷 '+(v.data.profissoes||'Todas')+'</span></div></div>'+(self.usuarioLogado&&self.usuarioLogado.tipo==='profissional'?'<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="window.app.candidatarVaga(\''+v.id+'\')">✋ QUERO!</button></div>':'')+'</div>';});
        c.innerHTML=html;
    }).catch(function(){c.innerHTML='<div class="card">Erro</div>';});
};

App.prototype.carregarRede = function() {
    var self=this,c=document.getElementById('redeContainer');if(!c)return;c.innerHTML='<div class="loading">Carregando...</div>';
    db.collection('conexoes').get().then(function(snap){
        var conexoes=[];snap.forEach(function(doc){var d=doc.data();if(d.usuarioId===self.usuarioLogado.id||d.amigoId===self.usuarioLogado.id)conexoes.push({id:doc.id,data:d});});
        if(conexoes.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3></div>';return;}
        var proms=[];conexoes.forEach(function(con){var aid=con.data.usuarioId===self.usuarioLogado.id?con.data.amigoId:con.data.usuarioId;proms.push(db.collection('usuarios').doc(aid).get());});
        Promise.all(proms).then(function(docs){var html='';docs.forEach(function(doc){if(doc.exists){var u=doc.data();html+='<div class="vaga-card" onclick="window.app.verPerfil(\''+doc.id+'\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div></div></div></div>';}});c.innerHTML=html||'<div class="card">Nenhum amigo</div>';});
    });
};

App.prototype.adicionarNaRede = function(aid) { var self=this; if(!this.usuarioLogado||this.usuarioLogado.id===aid)return; db.collection('conexoes').get().then(function(snap){var ex=false;snap.forEach(function(doc){var d=doc.data();if((d.usuarioId===self.usuarioLogado.id&&d.amigoId===aid)||(d.usuarioId===aid&&d.amigoId===self.usuarioLogado.id))ex=true;});if(ex){self.mostrarToast('Já está na rede!','erro');return;}db.collection('conexoes').add({usuarioId:self.usuarioLogado.id,amigoId:aid,status:'ativo',dataCriacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){self.mostrarToast('✅ Adicionado!','sucesso');});}); };
App.prototype.removerDaRede = function(aid) { var self=this; if(!confirm('Remover?'))return; db.collection('conexoes').get().then(function(snap){snap.forEach(function(doc){var d=doc.data();if((d.usuarioId===self.usuarioLogado.id&&d.amigoId===aid)||(d.usuarioId===aid&&d.amigoId===self.usuarioLogado.id)){db.collection('conexoes').doc(doc.id).delete().then(function(){self.mostrarToast('Removido','sucesso');});}});}); };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var self=this,c=document.getElementById('buscaResultados');if(!c)return;c.innerHTML='<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap){
        var todos=[];snap.forEach(function(doc){todos.push({id:doc.id,data:doc.data()});});
        var profs=todos.filter(function(u){return u.data.tipo==='profissional'&&u.data.ativo!==false;});
        var termo=(document.getElementById('buscaInput')||{}).value||'';
        var filtrados=termo?profs.filter(function(u){return(u.data.nome||'').toLowerCase().indexOf(termo.toLowerCase())>=0||(u.data.profissao||'').toLowerCase().indexOf(termo.toLowerCase())>=0;}):profs;
        if(filtrados.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhum profissional</h3></div>';return;}
        var html='';filtrados.forEach(function(u){var w=u.data.celular?u.data.celular.replace(/\D/g,''):'';html+='<div class="vaga-card" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">'+u.data.nome+'</div><div class="vaga-data">'+(u.data.profissao||'Profissional')+' • '+(u.data.experiencia||0)+' anos</div></div></div><div class="vaga-footer">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')">Chat</button></div></div>';});
        c.innerHTML=html;
    });
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var self=this;
    db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists)return;
        var u=doc.data(),w=u.celular?u.celular.replace(/\D/g,''):'',c=document.getElementById('perfilPublicoConteudo');if(!c)return;
        var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>'+u.nome+'</h2><p>'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+'</div></div><div class="card"><h3>Habilidades</h3><p>'+(u.habilidades||'Não informado')+'</p></div><div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p><p>📧 '+u.email+'</p></div>';
        if(self.usuarioLogado&&self.usuarioLogado.id!==uid){
            html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success">WhatsApp</a>';
            html+='<button class="btn btn-primary" onclick="window.app.iniciarChat(\''+uid+'\')">💬 Chat</button>';
            if(self.usuarioLogado.tipo==='empreiteiro')html+='<button class="btn btn-outline" onclick="window.app.abrirContratacao(\''+uid+'\')" style="background:#1A3A5C;color:white;">🤝 CONTRATAR</button>';
            html+='<button class="btn btn-outline" onclick="window.app.verAvaliacoes(\''+uid+'\')">📊 Avaliações</button>';
            html+='<button class="btn btn-outline" onclick="window.app.gerarQRCode(\''+uid+'\')">📱 QR Code</button></div>';
        }
        c.innerHTML=html;self.mostrarTela('perfilPublicoScreen');
    });
};

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) { var self=this; db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;self.usuarioSelecionado={id:doc.id,data:doc.data()};var h=document.getElementById('chatHeaderInfo');if(h)h.innerHTML='<div><strong>'+doc.data().nome+'</strong></div>';self.mostrarTela('chatScreen');}); };
App.prototype.enviarMensagem = function() { var self=this,i=document.getElementById('chatInput'),ct=i?i.value.trim():'';if(!ct||!this.usuarioSelecionado)return;db.collection('mensagens').add({remetenteId:this.usuarioLogado.id,destinatarioId:this.usuarioSelecionado.id,participantes:[this.usuarioLogado.id,this.usuarioSelecionado.id],conteudo:ct,dataEnvio:firebase.firestore.FieldValue.serverTimestamp(),lida:false}).then(function(){i.value='';}); };

// ===== PUBLICAÇÃO =====
App.prototype.abrirTelaPublicacao = function() { if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro')return;['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});document.getElementById('vagaFotoPreview').src='imagem/logo-sem-fundo-lpxconstrutor.png';this.vagaFotoBase64=null;document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb){cb.checked=false;});this.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(e) { var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){document.getElementById('vagaFotoPreview').src=ev.target.result;};r.readAsDataURL(f);var self=this;var r2=new FileReader();r2.onload=function(ev){self.vagaFotoBase64=ev.target.result;};r2.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var self=this;var t=(document.getElementById('vagaTitulo')||{}).value||'',e=(document.getElementById('vagaEndereco')||{}).value||'';if(!t||!e)return;var ps=[];document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb){ps.push(cb.value);});db.collection('vagas').add({titulo:t,descricao:(document.getElementById('vagaDescricao')||{}).value||'',endereco:e,profissoes:ps.join(', '),valorHora:parseFloat((document.getElementById('vagaValorHora')||{}).value)||0,fotoObra:self.vagaFotoBase64||'',usuarioId:this.usuarioLogado.id,interessados:[],dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativa:true}).then(function(){self.mostrarToast('✅ Vaga publicada!','sucesso');self.vagaFotoBase64=null;setTimeout(function(){self.mostrarTela('homeScreen');},1000);}); };
App.prototype.candidatarVaga = function(vid) { var self=this;if(!this.usuarioLogado||this.usuarioLogado.tipo!=='profissional')return;db.collection('vagas').doc(vid).get().then(function(doc){if(!doc.exists)return;var v=doc.data();if(!v.interessados)v.interessados=[];if(v.interessados.indexOf(self.usuarioLogado.id)>=0)return;v.interessados.push(self.usuarioLogado.id);db.collection('vagas').doc(vid).update({interessados:v.interessados}).then(function(){self.mostrarToast('✅ Candidatura enviada!','sucesso');});}); };

// ===== CONTRATAÇÃO =====
App.prototype.abrirContratacao = function(profId) { var self=this;this.contratarProfId=profId;db.collection('usuarios').doc(profId).get().then(function(doc){if(!doc.exists)return;var u=doc.data();document.getElementById('contratarInfo').innerHTML='<div style="font-size:40px;">👷</div><h3>'+u.nome+'</h3>';});db.collection('obras').where('usuarioId','==',this.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var s=document.getElementById('contratarObra');s.innerHTML='<option value="">Selecione...</option>';snap.forEach(function(doc){var o=doc.data();s.innerHTML+='<option value="'+doc.id+'">🏗️ '+o.nome+'</option>';});});this.mostrarTela('contratarScreen'); };
App.prototype.confirmarContratacao = function() { var self=this;var oid=document.getElementById('contratarObra').value,func=document.getElementById('contratarFuncao').value||'',val=document.getElementById('contratarValor').value||'0';if(!oid||!func)return;db.collection('conexoes').add({usuarioId:this.usuarioLogado.id,amigoId:this.contratarProfId,obraId:oid,funcao:func,valorHora:parseFloat(val),tipoContrato:document.getElementById('contratarTipo').value,status:'contratado',dataContratacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){self.mostrarToast('✅ Contratado!','sucesso');setTimeout(function(){self.voltarTela();},1500);}); };

// ===== OBRAS =====
App.prototype.novaObra = function() { var n=prompt('Nome da obra:'),e=prompt('Endereço:');if(!n||!e)return;var self=this;db.collection('obras').add({nome:n,endereco:e,usuarioId:this.usuarioLogado.id,ativa:true,dataCriacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){self.carregarMinhasObras();}); };
App.prototype.carregarMinhasObras = function() { var self=this,c=document.getElementById('listaObrasContainer');if(!c)return;db.collection('obras').where('usuarioId','==',this.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var obras=[];snap.forEach(function(doc){obras.push({id:doc.id,data:doc.data()});});document.getElementById('totalObras').textContent=obras.length;if(obras.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma obra</h3></div>';return;}var html='';obras.forEach(function(o){html+='<div class="card" style="cursor:pointer;border-left:4px solid #10B981;" onclick="window.app.verDetalheObra(\''+o.id+'\')"><h3>🏗️ '+o.data.nome+'</h3><p>📍 '+o.data.endereco+'</p></div>';});c.innerHTML=html;}); };
App.prototype.verDetalheObra = function(oid) { var self=this;this.obraSelecionada=oid;var c=document.getElementById('detalheObraConteudo');if(!c)return;db.collection('obras').doc(oid).get().then(function(doc){var o=doc.data();var html='<div class="card" style="background:linear-gradient(135deg,#1A3A5C,#2C5F8A);color:white;"><h2>🏗️ '+o.nome+'</h2><p>📍 '+o.endereco+'</p></div>';db.collection('conexoes').where('obraId','==',oid).get().then(function(snap){if(snap.empty){html+='<div class="card"><p>Nenhum funcionário</p></div>';c.innerHTML=html;return;}html+='<h3>👷 Funcionários</h3>';var proms=[];snap.forEach(function(doc){var con=doc.data();con.id=doc.id;proms.push(db.collection('usuarios').doc(con.amigoId).get().then(function(ud){if(ud.exists){var u=ud.data();return'<div class="card"><strong>'+u.nome+'</strong><br>'+(con.funcao||'')+' • R$ '+(con.valorHora||'0')+'/h<br>'+(con.status==='contratado'?'<button class="btn btn-danger btn-small" onclick="window.app.demitirFuncionario(\''+con.id+'\')">Demitir</button> <button class="btn btn-outline btn-small" onclick="window.app.finalizarContrato(\''+con.id+'\')">Finalizar</button>':'<span>'+con.status+'</span>')+'</div>';}return'';}));});Promise.all(proms).then(function(r){html+=r.join('');c.innerHTML=html;});});});this.mostrarTela('detalheObraScreen'); };
App.prototype.demitirFuncionario = function(cid) { if(!confirm('Demitir?'))return;var self=this;db.collection('conexoes').doc(cid).update({status:'demitido'}).then(function(){self.verDetalheObra(self.obraSelecionada);}); };
App.prototype.finalizarContrato = function(cid) { if(!confirm('Finalizar?'))return;var self=this;db.collection('conexoes').doc(cid).update({status:'finalizado'}).then(function(){self.verDetalheObra(self.obraSelecionada);}); };

// ===== AVALIAÇÕES =====
App.prototype.verAvaliacoes = function(uid) { var self=this;this.avaliacoesUid=uid;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();document.getElementById('avaliacaoScoreGeral').textContent=(u.score||0).toFixed(1);document.getElementById('avaliacaoEstrelas').innerHTML='⭐'.repeat(Math.round(u.score||0));self.filtrarAvaliacoes('todas');self.mostrarTela('avaliacoesScreen');}); };
App.prototype.filtrarAvaliacoes = function(f,btn) { this.avaliacaoFiltro=f;if(btn){document.querySelectorAll('#avaliacoesScreen .tab').forEach(function(t){t.classList.remove('active');});btn.classList.add('active');}var self=this,c=document.getElementById('avaliacoesLista');if(!c)return;db.collection('avaliacoes').get().then(function(snap){var avs=[];snap.forEach(function(doc){var d=doc.data();if(d.avaliadoId===self.avaliacoesUid)avs.push({id:doc.id,data:d});});if(f==='positivas')avs=avs.filter(function(a){return a.data.nota>=4;});if(f==='melhorar')avs=avs.filter(function(a){return a.data.nota<=3;});if(avs.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma avaliação</h3></div>';return;}var html='';avs.forEach(function(a){html+='<div class="avaliacao-card"><div>'+'⭐'.repeat(a.data.nota)+'</div><p>'+(a.data.positivos||'')+'</p></div>';});c.innerHTML=html;}); };
App.prototype.abrirDarAvaliacao = function(uid) { var self=this;this.avaliarUid=uid;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;document.getElementById('avaliarNome').textContent=doc.data().nome;self.mostrarTela('darAvaliacaoScreen');}); };
App.prototype.setNota = function(n) { this.avaliarNota=n;document.querySelectorAll('#estrelasAvaliar i').forEach(function(s,i){s.className=i<n?'fas fa-star':'far fa-star';}); };
App.prototype.enviarAvaliacao = function() { if(!this.avaliarNota)return;var self=this;var d={avaliadorId:this.usuarioLogado.id,avaliadoId:this.avaliarUid,nota:this.avaliarNota,positivos:document.getElementById('avalPositivos').value||'',melhorar:document.getElementById('avalMelhorar').value||'',servico:document.getElementById('avalServico').value||'',periodo:document.getElementById('avalPeriodo').value||'',dataCriacao:firebase.firestore.FieldValue.serverTimestamp()};databaseService.avaliarUsuarioCompleto(d).then(function(){self.mostrarToast('✅ Avaliação enviada!','sucesso');setTimeout(function(){self.voltarTela();},1500);}); };

// ===== QR CODE =====
App.prototype.gerarQRCode = function(uid) { var self=this;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();var link=window.location.origin+window.location.pathname+'?perfil='+uid;document.getElementById('modalQRCode').style.display='flex';document.getElementById('qrcodeNome').textContent=u.nome;document.getElementById('qrcodeContainer').innerHTML='';new QRCode(document.getElementById('qrcodeContainer'),{text:link,width:200,height:200,colorDark:'#1A3A5C',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});self.qrcodeLink=link;}); };
App.prototype.fecharQRCode = function() { document.getElementById('modalQRCode').style.display='none'; };
App.prototype.baixarQRCode = function() { var img=document.querySelector('#qrcodeContainer img');if(!img)return;var a=document.createElement('a');a.download='lpxconstrutor-qrcode.png';a.href=img.src;a.click();this.mostrarToast('✅ QR baixado!','sucesso'); };

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    if(!this.usuarioLogado)return;var u=this.usuarioLogado;
    var n=document.getElementById('meuPerfilNome');if(n)n.textContent=u.nome||'Usuário';
    var p=document.getElementById('meuPerfilProfissao');if(p)p.textContent=(u.tipo==='profissional'?'👷 ':'🏢 ')+(u.profissao||u.tipo);
    var s=document.getElementById('meuPerfilScore');if(s)s.textContent='⭐ '+((u.score||0).toFixed(1));
    var q=document.getElementById('menuQtdAvaliacoes');if(q)q.textContent=u.avaliacoesRecebidas||0;
    if(u.fotoPerfil){var f=document.getElementById('fotoPerfilPreview');if(f)f.src=u.fotoPerfil;}
};
App.prototype.abrirEditarPerfil = function() { if(!this.usuarioLogado)return;var u=this.usuarioLogado;document.getElementById('editNome').value=u.nome||'';document.getElementById('editCelular').value=u.celular||'';document.getElementById('editProfissao').value=u.profissao||'';document.getElementById('editExperiencia').value=u.experiencia||0;document.getElementById('editHabilidades').value=u.habilidades||'';this.mostrarTela('editarPerfilScreen'); };
App.prototype.salvarPerfil = function() { var self=this;var d={nome:document.getElementById('editNome').value.trim(),celular:document.getElementById('editCelular').value.trim(),experiencia:parseInt(document.getElementById('editExperiencia').value)||0,habilidades:document.getElementById('editHabilidades').value.trim()};if(!d.nome){this.mostrarToast('❌ Nome obrigatório!','erro');return;}databaseService.atualizarUsuario(this.usuarioLogado.id,d).then(function(){self.usuarioLogado.nome=d.nome;self.mostrarToast('✅ Perfil atualizado!','sucesso');self.carregarMeuPerfil();self.voltarTela();}); };
App.prototype.uploadFoto = function(e){var self=this,f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(self.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){self.usuarioLogado.fotoPerfil=ev.target.result;document.getElementById('fotoPerfilPreview').src=ev.target.result;self.mostrarToast('✅ Foto atualizada!','sucesso');});};r.readAsDataURL(f);};

// ===== OUTROS =====
App.prototype.mostrarInfoVersao = function(){this.mostrarToast('🏗️ LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){var m=document.getElementById('motivoExclusao').value;if(!m){this.mostrarToast('❌ Selecione um motivo!','erro');return;}if(!confirm('⚠️ Tem certeza?'))return;this.mostrarToast('📧 Solicitação enviada!','sucesso');setTimeout(function(){window.app.mostrarTela('loginScreen');},2000);};
App.prototype.mudarTab = function(tab) { document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});event.target.closest('.tab').classList.add('active');document.getElementById('feedContainer').style.display=tab==='feed'?'block':'none';document.getElementById('redeContainer').style.display=tab==='rede'?'block':'none';if(tab==='feed')this.carregarFeed();if(tab==='rede')this.carregarRede(); };
App.prototype.mostrarNotificacoes = function(){this.mostrarTela('notificacoesScreen');};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
