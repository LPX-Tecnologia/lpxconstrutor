// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO COM VÍDEOS DO SAFETYWISST =====
// ==========================================================

if (!window.app || !window.app._app) { window.app = window.app || {}; window.app._app = window.app._app || null; }

var traducoes = {
    pt: { saudacao: 'Bem-vindo!', carregando: 'Carregando...', nenhumaVaga: 'Nenhuma vaga publicada', publicarVaga: 'PUBLICAR VAGA', buscar: 'Buscar Profissionais', feed: 'Feed', rede: 'Minha Rede', inicio: 'Início', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar', editarPerfil: 'Editar Perfil', faq: 'FAQ', termos: 'Termos de Uso', privacidade: 'Privacidade', versao: 'Versão do App', idioma: 'Idioma', aparencia: 'Aparência', notificacoes: 'Notificações', seguranca: 'Segurança', alterarSenha: 'Alterar Senha', excluirConta: 'Excluir Conta', avaliacoes: 'Avaliações', sair: 'SAIR', informacoes: 'Informações', configuracoes: 'Configurações', temaClaro: 'Claro', temaEscuro: 'Escuro', nome: 'Nome', whatsapp: 'WhatsApp', profissao: 'Profissão', experiencia: 'Experiência', habilidades: 'Habilidades', salvar: 'SALVAR', email: 'Email', senha: 'Senha', entrar: 'ENTRAR', criarConta: 'Criar Conta', esqueciSenha: 'Esqueci a Senha', bemVindo: 'Bem-vindo!', ateLogo: 'Até logo!', preenchaTodos: 'Preencha todos os campos!', nomeObrigatorio: 'Nome obrigatório!', perfilAtualizado: 'Perfil atualizado!', fotoAtualizada: 'Foto atualizada!', empreiteiro: 'Empreiteiro', profissional: 'Profissional', contratar: 'CONTRATAR', whatsappBtn: 'WhatsApp', chatBtn: 'Chat', cancelar: 'CANCELAR', publicadoSucesso: 'Vaga publicada!', candidaturaEnviada: 'Candidatura enviada!', contratadoSucesso: 'Contratado!', avaliacaoEnviada: 'Avaliação enviada!', codigoGerado: 'Código gerado!', senhaRedefinida: 'Senha redefinida!', adicionadoRede: 'Adicionado na rede!', removidoRede: 'Removido da rede!', desejaSair: 'Deseja sair do LPXConstrutor?', descricaoSair: 'Você será direcionado para a tela de login.', simSair: 'SIM, SAIR', naoSair: 'NÃO' },
    es: { saudacao: '¡Bienvenido!', carregando: 'Cargando...', nenhumaVaga: 'Sin vacantes', publicarVaga: 'PUBLICAR VACANTE', buscar: 'Buscar', feed: 'Feed', rede: 'Mi Red', inicio: 'Inicio', perfil: 'Perfil', chat: 'Chat', obras: 'Obras', publicar: 'Publicar', editarPerfil: 'Editar Perfil', faq: 'FAQ', termos: 'Términos', privacidade: 'Privacidad', versao: 'Versión', idioma: 'Idioma', aparencia: 'Apariencia', notificacoes: 'Notificaciones', seguranca: 'Seguridad', alterarSenha: 'Cambiar Contraseña', excluirConta: 'Eliminar Cuenta', avaliacoes: 'Evaluaciones', sair: 'CERRAR SESIÓN', informacoes: 'Información', configuracoes: 'Configuración', temaClaro: 'Claro', temaEscuro: 'Oscuro', nome: 'Nombre', whatsapp: 'WhatsApp', profissao: 'Profesión', experiencia: 'Experiencia', habilidades: 'Habilidades', salvar: 'GUARDAR', email: 'Email', senha: 'Contraseña', entrar: 'ENTRAR', criarConta: 'Crear Cuenta', esqueciSenha: 'Olvidé Contraseña', bemVindo: '¡Bienvenido!', ateLogo: '¡Hasta luego!', preenchaTodos: '¡Rellena todos los campos!', empreiteiro: 'Contratista', profissional: 'Profesional', contratar: 'CONTRATAR', whatsappBtn: 'WhatsApp', chatBtn: 'Chat', cancelar: 'CANCELAR', desejaSair: '¿Quieres salir de LPXConstrutor?', simSair: 'SÍ, SALIR', naoSair: 'NO' },
    en: { saudacao: 'Welcome!', carregando: 'Loading...', nenhumaVaga: 'No jobs available', publicarVaga: 'POST JOB', buscar: 'Search', feed: 'Feed', rede: 'My Network', inicio: 'Home', perfil: 'Profile', chat: 'Chat', obras: 'Projects', publicar: 'Post', editarPerfil: 'Edit Profile', faq: 'FAQ', termos: 'Terms', privacidade: 'Privacy', versao: 'Version', idioma: 'Language', aparencia: 'Appearance', notificacoes: 'Notifications', seguranca: 'Security', alterarSenha: 'Change Password', excluirConta: 'Delete Account', avaliacoes: 'Reviews', sair: 'SIGN OUT', informacoes: 'Information', configuracoes: 'Settings', temaClaro: 'Light', temaEscuro: 'Dark', nome: 'Name', whatsapp: 'WhatsApp', profissao: 'Profession', experiencia: 'Experience', habilidades: 'Skills', salvar: 'SAVE', email: 'Email', senha: 'Password', entrar: 'SIGN IN', criarConta: 'Create Account', esqueciSenha: 'Forgot Password', bemVindo: 'Welcome!', ateLogo: 'Goodbye!', preenchaTodos: 'Fill in all fields!', empreiteiro: 'Contractor', profissional: 'Professional', contratar: 'HIRE', whatsappBtn: 'WhatsApp', chatBtn: 'Chat', cancelar: 'CANCEL', desejaSair: 'Do you want to leave LPXConstrutor?', simSair: 'YES, EXIT', naoSair: 'NO' }
};

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

var App = function() {
    this.usuarioLogado = null; this.usuarioSelecionado = null; this.telaAtual = 'loginScreen';
    this.historicoTelas = []; this.recuperacaoUid = null; this.avaliacoesUid = null; this.avaliarUid = null;
    this.avaliarNota = 0; this.vagaFotoBase64 = null; this.contratarProfId = null; this.obraSelecionada = null;
    this.qrcodeLink = null; this.idiomaAtual = 'pt'; this.videoIndex = 0; this.init();
};

App.prototype.t = function(c) { var t = traducoes[this.idiomaAtual] || traducoes.pt; return t[c] || traducoes.pt[c] || c; };

App.prototype.init = function() {
    var s = this; console.log('🚀 Iniciando...'); window.app._app = this;
    var idioma = localStorage.getItem('idioma'); if (idioma && traducoes[idioma]) this.idiomaAtual = idioma;
    var tema = localStorage.getItem('tema'); if (tema === 'escuro') { document.body.classList.add('dark-theme'); var ta = document.getElementById('temaAtual'); if (ta) ta.textContent = 'Escuro'; }
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() { if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') { s.mostrarModalSair(); } else { s.voltarTela(); } });
    authService.onAuthStateChange(function(u) { if (u) { s.usuarioLogado = u; s.atualizarBotaoPublicar(); s.atualizarBotaoObras(); if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') s.mostrarTela('homeScreen'); } else { s.usuarioLogado = null; s.mostrarTela('loginScreen'); } });
};

App.prototype.atualizarBotaoPublicar = function() { var b = document.getElementById('btnPublicar'); if (!b) return; b.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; };
App.prototype.atualizarBotaoObras = function() { var b = document.getElementById('btnObras'); if (!b) return; b.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; };

App.prototype.mostrarTela = function(id) {
    var s = this; if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); });
    var t = document.getElementById(id); if (!t) return; t.classList.add('active'); s.telaAtual = id;
    var n = document.getElementById('bottomNav'); if (n) { var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen','minhasObrasScreen']; n.style.display = tn.indexOf(id) >= 0 ? 'flex' : 'none'; }
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') { document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; }
};
App.prototype.voltarTela = function() { if (this.historicoTelas.length > 0) { var a = this.historicoTelas.pop(); document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); }); var t = document.getElementById(a); if (t) { t.classList.add('active'); this.telaAtual = a; } if (a === 'meuPerfilScreen') this.carregarMeuPerfil(); if (a === 'homeScreen') this.carregarHome(); } else { this.mostrarTela('homeScreen'); } };
App.prototype.mostrarModalSair = function() { document.getElementById('modalSair').style.display = 'flex'; };
App.prototype.fecharModalSair = function() { document.getElementById('modalSair').style.display = 'none'; history.pushState(null, '', window.location.href); };
App.prototype.confirmarSair = function() { document.getElementById('modalSair').style.display = 'none'; this.usuarioLogado = null; this.historicoTelas = []; this.mostrarTela('loginScreen'); };
App.prototype.selecionarTema = function(t) { var b = document.body; if (t === 'escuro') { b.classList.add('dark-theme'); localStorage.setItem('tema', 'escuro'); } else { b.classList.remove('dark-theme'); localStorage.setItem('tema', 'claro'); } this.mostrarToast('🎨 Tema: ' + (t === 'claro' ? 'Claro' : 'Escuro'), 'sucesso'); };
App.prototype.selecionarIdioma = function(i) { this.idiomaAtual = i; localStorage.setItem('idioma', i); this.mostrarToast('🌐 Idioma: ' + i.toUpperCase(), 'sucesso'); this.voltarTela(); };
App.prototype.fazerLogin = function() { var s = this; var e = (document.getElementById('loginEmail')||{}).value||'', p = (document.getElementById('loginSenha')||{}).value||''; if (!e || !p) { s.mostrarToast('❌ Preencha todos!', 'erro'); return; } authService.login(e, p).then(function(r) { if (r.sucesso) { s.usuarioLogado = r.usuario; s.mostrarToast('✅ Bem-vindo!', 'sucesso'); s.atualizarBotaoPublicar(); s.atualizarBotaoObras(); s.mostrarTela('homeScreen'); } else s.mostrarToast('❌ ' + r.erro, 'erro'); }); };
App.prototype.cadastrar = function() { var s = this; var d = { nome: (document.getElementById('cadNome')||{}).value||'', email: (document.getElementById('cadEmail')||{}).value||'', senha: (document.getElementById('cadSenha')||{}).value||'', tipo: (document.getElementById('cadTipo')||{}).value||'profissional', celular: (document.getElementById('cadCelular')||{}).value||'', cpf: ((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''), profissao: (document.getElementById('cadProfissao')||{}).value||'', experiencia: (document.getElementById('cadExperiencia')||{}).value||'0', habilidades: (document.getElementById('cadHabilidades')||{}).value||'' }; if (!d.nome || !d.email || !d.senha) { s.mostrarToast('❌ Preencha todos!', 'erro'); return; } authService.cadastrar(d).then(function(r) { if (r.sucesso) { s.usuarioLogado = r.usuario; s.mostrarToast('✅ OK!', 'sucesso'); s.atualizarBotaoPublicar(); s.atualizarBotaoObras(); s.mostrarTela('homeScreen'); } else s.mostrarToast('❌ ' + r.erro, 'erro'); }); };
App.prototype.proximaEtapa = function(e) { var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); if(!e1||!e2)return; e1.style.display=e===1?'block':'none'; e2.style.display=e===2?'block':'none'; };
App.prototype.toggleProfissao = function() { var g=document.getElementById('grupoProfissao'); if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; };
App.prototype.sair = function() { var s=this; authService.logout().then(function(){s.usuarioLogado=null;s.mostrarTela('loginScreen');s.mostrarToast('👋 Até logo!','sucesso');}); };
App.prototype.solicitarCodigo = function() { var s=this; var e=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():''; if(!e||!e.includes('@')){s.mostrarToast('❌ Email inválido!','erro');return;} authService.solicitarCodigoRecuperacao(e).then(function(r){ if(r.sucesso){s.recuperacaoUid=r.uid;s.mostrarToast('✅ Código: '+r.codigo,'sucesso');document.getElementById('recPasso1').style.display='none';document.getElementById('recPasso2').style.display='block';} else s.mostrarToast('❌ '+r.erro,'erro'); }); };
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){var s=this;s.mostrarToast('✅ Senha redefinida!','sucesso');setTimeout(function(){s.mostrarTela('loginScreen');},1500);};
App.prototype.carregarHome = function() { if(!this.usuarioLogado)return; var h=new Date().getHours(),sd='Bom dia';if(h>=12&&h<18)sd='Boa tarde';if(h>=18)sd='Boa noite'; document.getElementById('saudacao').textContent='👋 '+sd+', '+this.usuarioLogado.nome+'!'; document.getElementById('resumoTexto').textContent=(this.usuarioLogado.tipo==='empreiteiro'?'🏢 Empreiteiro':'👷 Profissional')+' • '+(this.usuarioLogado.profissao||this.usuarioLogado.tipo); setTimeout(function(){try{if(typeof mapaService!=='undefined')mapaService.initMap()}catch(e){}},500); this.carregarFeed(); };

// ===== FEED COM VÍDEOS DO SAFETYWISST =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div class="loading">Carregando feed...</div>';
    
    var videosEducativos = [
        { titulo: '🦺 Segurança no Trabalho #1', descricao: 'Dicas essenciais de segurança para o dia a dia do trabalhador da construção civil.', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes #2', descricao: 'Como evitar os acidentes mais comuns em obras e canteiros de trabalho.', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs #3', descricao: 'Equipamentos de Proteção Individual: quando e como usar cada um deles.', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' },
        { titulo: '🏗️ Segurança em Altura #4', descricao: 'Cuidados essenciais para trabalhos acima de 2 metros de altura.', url: 'https://www.youtube.com/embed/bh2pzYBs_go', categoria: 'Segurança' },
        { titulo: '🔌 Segurança com Eletricidade #5', descricao: 'Riscos elétricos e como se proteger em instalações e obras.', url: 'https://www.youtube.com/embed/awR7lJO3jUU', categoria: 'Eletricista' },
        { titulo: '🧯 Prevenção de Incêndios #6', descricao: 'Como agir em caso de incêndio e uso correto de extintores.', url: 'https://www.youtube.com/embed/RReflO7kR3Y', categoria: 'Segurança' },
        { titulo: '📋 Normas Regulamentadoras #7', descricao: 'Entenda as principais NRs que todo trabalhador deve conhecer.', url: 'https://www.youtube.com/embed/O_ZnZb7YN4M', categoria: 'Normas' },
        { titulo: '⚠️ Riscos no Canteiro de Obras #8', descricao: 'Identifique os perigos mais comuns no dia a dia da construção civil.', url: 'https://www.youtube.com/embed/jsa31UlsC5g', categoria: 'Segurança' },
        { titulo: '🦺 Dicas de Segurança #9', descricao: 'Pequenas atitudes que fazem grande diferença na prevenção de acidentes.', url: 'https://www.youtube.com/embed/HBOMP-khorA', categoria: 'Segurança' },
        { titulo: '👷 Proteção do Trabalhador #10', descricao: 'Direitos e deveres do trabalhador em relação à segurança no trabalho.', url: 'https://www.youtube.com/embed/7qljv7zCJZg', categoria: 'Segurança' },
        { titulo: '🏗️ Obras Seguras #11', descricao: 'Como manter o ambiente de trabalho organizado e seguro para todos.', url: 'https://www.youtube.com/embed/fkZNyLCeVhY', categoria: 'Segurança' },
        { titulo: '⚠️ Atenção aos Perigos #12', descricao: 'Fique atento aos riscos que podem passar despercebidos no trabalho.', url: 'https://www.youtube.com/embed/UG57VgP_IEs', categoria: 'Segurança' },
        { titulo: '🦺 Segurança em Primeiro Lugar #13', descricao: 'A importância de priorizar a segurança antes de qualquer tarefa.', url: 'https://www.youtube.com/embed/CloAlUsyKTo', categoria: 'Segurança' },
        { titulo: '📏 Condutas Seguras #14', descricao: 'Boas práticas e comportamentos que previnem acidentes de trabalho.', url: 'https://www.youtube.com/embed/xZKBm-tGvrc', categoria: 'Segurança' },
        { titulo: '👷 Trabalho com Segurança #15', descricao: 'Dicas práticas para o dia a dia do profissional da construção civil.', url: 'https://www.youtube.com/embed/XtS99srL4K4', categoria: 'Segurança' }
    ];
    
    var hoje = new Date();
    var diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    var videoDoDia = videosEducativos[diaDoAno % videosEducativos.length];
    
    db.collection('vagas').get().then(function(snap) {
        var vagas = []; snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        var html = '';
        
        html += '<div class="card video-educativo" style="padding:0;overflow:hidden;border:2px solid #10B981;">' +
            '<div style="background:linear-gradient(135deg,#059669,#10B981);padding:14px 16px;color:white;">' +
                '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">' +
                    '<div style="background:white;color:#059669;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">🎓</div>' +
                    '<div><strong style="font-size:15px;">📚 Estudo Diário - ' + videoDoDia.categoria + '</strong>' +
                    '<div style="font-size:11px;opacity:0.9;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) + '</div></div>' +
                '</div>' +
                '<p style="font-size:13px;opacity:0.95;margin-top:4px;">' + videoDoDia.descricao + '</p>' +
            '</div>' +
            '<div class="video-embed-container"><iframe src="' + videoDoDia.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:250px;border:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>' +
            '<div style="padding:10px 16px;background:#f0fdf4;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #d1fae5;">' +
                '<span style="font-size:11px;color:#059669;"><i class="fas fa-lightbulb"></i> <strong>SafetyWiSST:</strong> ' + videoDoDia.titulo + '</span>' +
                '<div style="display:flex;gap:6px;">' +
                    '<button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:4px 10px;" onclick="event.stopPropagation();window.app._app.videoAnterior()"><i class="fas fa-backward"></i></button>' +
                    '<button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:4px 10px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()"><i class="fas fa-forward"></i></button>' +
                '</div>' +
            '</div></div>';
        
        if (vagas.length === 0) {
            html += '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:50px;color:#ccc;"></i><h3 style="margin-top:12px;">Nenhuma vaga publicada</h3><p style="color:#999;font-size:13px;">Enquanto isso, aproveite o estudo diário acima! 📚</p>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="margin-top:12px;">📢 PUBLICAR VAGA</button>' : '') + '</div>';
        } else {
            vagas.forEach(function(v) {
                html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + (v.data.fotoObra ? '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-top:8px;">' : '') + '</div>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="window.app.candidatarVaga(\'' + v.id + '\')" style="flex:1;">✋ QUERO!</button></div>' : '') + '</div>';
            });
        }
        c.innerHTML = html;
    }).catch(function() { c.innerHTML = '<div class="card" style="text-align:center;">Erro ao carregar feed</div>'; });
};

App.prototype.videoAnterior = function() { if (!this.videoIndex) this.videoIndex = 0; this.videoIndex--; if (this.videoIndex < 0) this.videoIndex = 14; this.carregarFeed(); };
App.prototype.videoSeguinte = function() { if (!this.videoIndex) this.videoIndex = 0; this.videoIndex++; this.carregarFeed(); };

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s=this,c=document.getElementById('redeContainer');if(!c)return;c.innerHTML='<div class="loading">Carregando rede...</div>';
    db.collection('conexoes').get().then(function(snap){var conexoes=[];snap.forEach(function(doc){var d=doc.data();if(d.usuarioId===s.usuarioLogado.id||d.amigoId===s.usuarioLogado.id)conexoes.push({id:doc.id,data:d});});
        if(conexoes.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>';return;}
        var proms=[];conexoes.forEach(function(con){var aid=con.data.usuarioId===s.usuarioLogado.id?con.data.amigoId:con.data.usuarioId;proms.push(db.collection('usuarios').doc(aid).get().then(function(ud){if(ud.exists)return{usuario:{id:ud.id,...ud.data()},conexao:con.data};return null;}));});
        Promise.all(proms).then(function(r){var html='';r.forEach(function(x){if(!x)return;var u=x.usuario,w=u.celular?u.celular.replace(/\D/g,''):'',sc=u.score||0,st=x.conexao.status==='contratado'?'🤝 Contratado':x.conexao.status==='finalizado'?'✅ Finalizado':x.conexao.status==='demitido'?'🔴 Encerrado':'🔗 Conectado';
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+(u.fotoPerfil?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-user"></i>')+'</div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div><div class="vaga-data"><i class="fas fa-tools"></i> '+(u.profissao||'Profissional')+' • <i class="fas fa-calendar"></i> '+(u.experiencia||0)+' anos</div><div class="vaga-data"><span style="color:#F47920;">'+'⭐'.repeat(Math.round(sc))+' '+(sc>0?sc.toFixed(1):'Novo')+'</span> • <span style="color:#10B981;">'+st+'</span></div></div></div><div class="vaga-footer"><div style="display:flex;gap:6px;flex:1;">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div><button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.removerDaRede(\''+u.id+'\')"><i class="fas fa-times"></i></button></div></div>';});c.innerHTML=html||'<div class="card">Nenhum amigo</div>';});});
};
App.prototype.adicionarNaRede = function(aid) { var s=this; if(!s.usuarioLogado||s.usuarioLogado.id===aid)return; db.collection('conexoes').get().then(function(snap){var ex=false;snap.forEach(function(doc){var d=doc.data();if((d.usuarioId===s.usuarioLogado.id&&d.amigoId===aid)||(d.usuarioId===aid&&d.amigoId===s.usuarioLogado.id))ex=true;});if(ex){s.mostrarToast('Já está na rede!','erro');return;}db.collection('conexoes').add({usuarioId:s.usuarioLogado.id,amigoId:aid,status:'ativo',dataCriacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){s.mostrarToast('✅ Adicionado!','sucesso');});}); };
App.prototype.removerDaRede = function(aid) { var s=this; if(!confirm('Remover?'))return; db.collection('conexoes').get().then(function(snap){snap.forEach(function(doc){var d=doc.data();if((d.usuarioId===s.usuarioLogado.id&&d.amigoId===aid)||(d.usuarioId===aid&&d.amigoId===s.usuarioLogado.id)){db.collection('conexoes').doc(doc.id).delete().then(function(){s.mostrarToast('Removido','sucesso');});}});}); };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s=this,c=document.getElementById('buscaResultados');if(!c)return;c.innerHTML='<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap){var todos=[];snap.forEach(function(doc){todos.push({id:doc.id,data:doc.data()});});
        var profs=todos.filter(function(u){return u.data.tipo==='profissional'&&u.data.ativo!==false&&u.id!==s.usuarioLogado.id;});
        var termo=(document.getElementById('buscaInput')||{}).value||'';
        var filtrados=termo?profs.filter(function(u){return(u.data.nome||'').toLowerCase().indexOf(termo.toLowerCase())>=0||(u.data.profissao||'').toLowerCase().indexOf(termo.toLowerCase())>=0;}):profs;
        if(filtrados.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhum profissional</h3></div>';return;}
        var html='<div style="text-align:center;padding:8px;color:#666;font-size:12px;">'+filtrados.length+' profissional(is)</div>';
        filtrados.forEach(function(u){var w=u.data.celular?u.data.celular.replace(/\D/g,''):'',sc=u.data.score||0;
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+(u.data.fotoPerfil?'<img src="'+u.data.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-hard-hat"></i>')+'</div><div class="vaga-info"><div class="vaga-nome">'+u.data.nome+'</div><div class="vaga-data"><i class="fas fa-tools"></i> '+(u.data.profissao||'Profissional')+' • <i class="fas fa-calendar"></i> '+(u.data.experiencia||0)+' anos</div><div class="vaga-data"><span style="color:#F47920;">'+'⭐'.repeat(Math.round(sc))+' '+(sc>0?sc.toFixed(1):'Novo')+'</span></div></div></div><div class="vaga-footer"><div style="display:flex;gap:6px;flex:1;">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div>'+(s.usuarioLogado&&s.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\''+u.id+'\')" style="background:#1A3A5C;color:white;font-size:11px;"><i class="fas fa-handshake"></i> Contratar</button>':'')+'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.adicionarNaRede(\''+u.id+'\')" style="background:#10B981;color:white;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center;"><i class="fas fa-plus"></i></button></div></div>';});
        c.innerHTML=html;
    });
};

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) { var s=this; db.collection('usuarios').doc(uid).get().then(function(doc){ if(!doc.exists)return; var u=doc.data(),w=u.celular?u.celular.replace(/\D/g,''):'',c=document.getElementById('perfilPublicoConteudo');if(!c)return; var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>'+u.nome+'</h2><p>'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+'</div></div><div class="card"><h3>Habilidades</h3><p>'+(u.habilidades||'Não informado')+'</p></div><div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p><p>📧 '+u.email+'</p></div>'; if(s.usuarioLogado&&s.usuarioLogado.id!==uid){ html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">'; if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success">WhatsApp</a>'; html+='<button class="btn btn-primary" onclick="window.app.iniciarChat(\''+uid+'\')">💬 Chat</button>'; if(s.usuarioLogado.tipo==='empreiteiro')html+='<button class="btn btn-outline" onclick="window.app.abrirContratacao(\''+uid+'\')" style="background:#1A3A5C;color:white;">🤝 CONTRATAR</button>'; html+='<button class="btn btn-outline" onclick="window.app.verAvaliacoes(\''+uid+'\')">📊 Avaliações</button>'; html+='<button class="btn btn-outline" onclick="window.app.gerarQRCode(\''+uid+'\')">📱 QR Code</button></div>'; } c.innerHTML=html;s.mostrarTela('perfilPublicoScreen'); }); };

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) { var s=this; db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;s.usuarioSelecionado={id:doc.id,data:doc.data()};var h=document.getElementById('chatHeaderInfo');if(h)h.innerHTML='<div style="display:flex;align-items:center;gap:10px;"><div style="width:40px;height:40px;border-radius:50%;background:#F47920;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-user"></i></div><div><strong>'+doc.data().nome+'</strong><div style="font-size:12px;color:#10B981;">Online</div></div></div>';s.carregarMensagens();s.mostrarTela('chatScreen');}); };
App.prototype.carregarMensagens = function() { var s=this,c=document.getElementById('chatMessages');if(!c||!s.usuarioSelecionado)return;c.innerHTML='<div class="loading">Carregando...</div>';db.collection('mensagens').get().then(function(snap){var msgs=[];snap.forEach(function(doc){var d=doc.data();if(d.participantes&&d.participantes.indexOf(s.usuarioLogado.id)>=0&&d.participantes.indexOf(s.usuarioSelecionado.id)>=0)msgs.push({id:doc.id,data:d});});msgs.sort(function(a,b){return(a.data.dataEnvio?a.data.dataEnvio.toDate():new Date(0))-(b.data.dataEnvio?b.data.dataEnvio.toDate():new Date(0));});if(msgs.length===0){c.innerHTML='<div style="text-align:center;padding:60px;color:#999;"><i class="fas fa-comments" style="font-size:60px;"></i><p>Nenhuma mensagem</p></div>';return;}var html='';msgs.forEach(function(m){var isMine=m.data.remetenteId===s.usuarioLogado.id;var hora=m.data.dataEnvio?new Date(m.data.dataEnvio.toDate()).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'';html+='<div class="message '+(isMine?'message-sent':'message-received')+'"><div class="message-content">'+m.data.conteudo+'</div><div class="message-footer"><span class="message-time">'+hora+'</span>'+(isMine?'<span class="message-status">'+(m.data.lida?'✓✓':'✓')+'</span>':'')+'</div></div>';});c.innerHTML=html;setTimeout(function(){c.scrollTop=c.scrollHeight;},100);}); };
App.prototype.enviarMensagem = function() { var s=this,i=document.getElementById('chatInput'),ct=i?i.value.trim():'';if(!ct){s.mostrarToast('Digite uma mensagem!','erro');return;}if(!s.usuarioSelecionado){s.mostrarToast('Selecione um contato!','erro');return;}if(!s.usuarioLogado){s.mostrarToast('Faça login!','erro');return;}var msg={remetenteId:s.usuarioLogado.id,destinatarioId:s.usuarioSelecionado.id,participantes:[s.usuarioLogado.id,s.usuarioSelecionado.id],conteudo:ct,dataEnvio:firebase.firestore.FieldValue.serverTimestamp(),lida:false};db.collection('mensagens').add(msg).then(function(docRef){if(i)i.value='';s.carregarMensagens();s.mostrarToast('✅ Enviada!','sucesso');}).catch(function(error){s.mostrarToast('❌ Erro ao enviar.','erro');}); };
document.addEventListener('keypress',function(e){if(e.key==='Enter'&&document.getElementById('chatInput')===document.activeElement){if(window.app._app)window.app._app.enviarMensagem();}});

// ===== PUBLICAÇÃO =====
App.prototype.abrirTelaPublicacao = function() { if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro')return;['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});document.getElementById('vagaFotoPreview').src='imagem/logo-sem-fundo-lpxconstrutor.png';this.vagaFotoBase64=null;document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb){cb.checked=false;});this.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(e) { var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){document.getElementById('vagaFotoPreview').src=ev.target.result;};r.readAsDataURL(f);var s=this;var r2=new FileReader();r2.onload=function(ev){s.vagaFotoBase64=ev.target.result;};r2.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var s=this;var t=(document.getElementById('vagaTitulo')||{}).value||'',e=(document.getElementById('vagaEndereco')||{}).value||'';if(!t||!e)return;var ps=[];document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb){ps.push(cb.value);});db.collection('vagas').add({titulo:t,descricao:(document.getElementById('vagaDescricao')||{}).value||'',endereco:e,profissoes:ps.join(', '),valorHora:parseFloat((document.getElementById('vagaValorHora')||{}).value)||0,fotoObra:s.vagaFotoBase64||'',usuarioId:s.usuarioLogado.id,interessados:[],dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativa:true}).then(function(){s.mostrarToast('✅ Vaga publicada!','sucesso');setTimeout(function(){s.mostrarTela('homeScreen');},1000);}); };
App.prototype.candidatarVaga = function(vid) { var s=this;if(!s.usuarioLogado||s.usuarioLogado.tipo!=='profissional')return;db.collection('vagas').doc(vid).get().then(function(doc){if(!doc.exists)return;var v=doc.data();if(!v.interessados)v.interessados=[];if(v.interessados.indexOf(s.usuarioLogado.id)>=0)return;v.interessados.push(s.usuarioLogado.id);db.collection('vagas').doc(vid).update({interessados:v.interessados}).then(function(){s.mostrarToast('✅ Candidatura enviada!','sucesso');});}); };

// ===== CONTRATAÇÃO =====
App.prototype.abrirContratacao = function(profId) { var s=this;s.contratarProfId=profId;db.collection('usuarios').doc(profId).get().then(function(doc){if(!doc.exists)return;document.getElementById('contratarInfo').innerHTML='<div style="font-size:40px;">👷</div><h3>'+doc.data().nome+'</h3>';});db.collection('obras').where('usuarioId','==',s.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var sel=document.getElementById('contratarObra');sel.innerHTML='<option value="">Selecione...</option>';snap.forEach(function(doc){sel.innerHTML+='<option value="'+doc.id+'">🏗️ '+doc.data().nome+'</option>';});});s.mostrarTela('contratarScreen'); };
App.prototype.confirmarContratacao = function() { var s=this;var oid=document.getElementById('contratarObra').value,func=document.getElementById('contratarFuncao').value||'',val=document.getElementById('contratarValor').value||'0';if(!oid||!func)return;db.collection('conexoes').add({usuarioId:s.usuarioLogado.id,amigoId:s.contratarProfId,obraId:oid,funcao:func,valorHora:parseFloat(val),tipoContrato:document.getElementById('contratarTipo').value,status:'contratado',dataContratacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){s.mostrarToast('✅ Contratado!','sucesso');setTimeout(function(){s.voltarTela();},1500);}); };

// ===== OBRAS =====
App.prototype.novaObra = function() { var n=prompt('Nome da obra:'),e=prompt('Endereço:');if(!n||!e)return;var s=this;db.collection('obras').add({nome:n,endereco:e,usuarioId:s.usuarioLogado.id,ativa:true,dataCriacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){s.carregarMinhasObras();}); };
App.prototype.carregarMinhasObras = function() { var s=this,c=document.getElementById('listaObrasContainer');if(!c)return;db.collection('obras').where('usuarioId','==',s.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var obras=[];snap.forEach(function(doc){obras.push({id:doc.id,data:doc.data()});});document.getElementById('totalObras').textContent=obras.length;if(obras.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma obra</h3></div>';return;}var html='';obras.forEach(function(o){html+='<div class="card" style="cursor:pointer;border-left:4px solid #10B981;" onclick="window.app.verDetalheObra(\''+o.id+'\')"><h3>🏗️ '+o.data.nome+'</h3><p>📍 '+o.data.endereco+'</p></div>';});c.innerHTML=html;}); };
App.prototype.verDetalheObra = function(oid) { var s=this;s.obraSelecionada=oid;var c=document.getElementById('detalheObraConteudo');if(!c)return;db.collection('obras').doc(oid).get().then(function(doc){var o=doc.data();var html='<div class="card" style="background:linear-gradient(135deg,#1A3A5C,#2C5F8A);color:white;"><h2>🏗️ '+o.nome+'</h2><p>📍 '+o.endereco+'</p></div>';db.collection('conexoes').where('obraId','==',oid).get().then(function(snap){if(snap.empty){html+='<div class="card"><p>Nenhum funcionário</p></div>';c.innerHTML=html;return;}html+='<h3>👷 Funcionários</h3>';var proms=[];snap.forEach(function(doc){var con=doc.data();con.id=doc.id;proms.push(db.collection('usuarios').doc(con.amigoId).get().then(function(ud){if(ud.exists){var u=ud.data();return'<div class="card"><strong>'+u.nome+'</strong><br>'+(con.funcao||'')+' • R$ '+(con.valorHora||'0')+'/h<br>'+(con.status==='contratado'?'<button class="btn btn-danger btn-small" onclick="window.app.demitirFuncionario(\''+con.id+'\')">Demitir</button> <button class="btn btn-outline btn-small" onclick="window.app.finalizarContrato(\''+con.id+'\')">Finalizar</button>':'<span>'+con.status+'</span>')+'</div>';}return'';}));});Promise.all(proms).then(function(r){html+=r.join('');c.innerHTML=html;});});});s.mostrarTela('detalheObraScreen'); };
App.prototype.demitirFuncionario = function(cid) { if(!confirm('Demitir?'))return;var s=this;db.collection('conexoes').doc(cid).update({status:'demitido'}).then(function(){s.verDetalheObra(s.obraSelecionada);}); };
App.prototype.finalizarContrato = function(cid) { if(!confirm('Finalizar?'))return;var s=this;db.collection('conexoes').doc(cid).update({status:'finalizado'}).then(function(){s.verDetalheObra(s.obraSelecionada);}); };

// ===== AVALIAÇÕES =====
App.prototype.verAvaliacoes = function(uid) { var s=this;s.avaliacoesUid=uid;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();document.getElementById('avaliacaoScoreGeral').textContent=(u.score||0).toFixed(1);document.getElementById('avaliacaoEstrelas').innerHTML='⭐'.repeat(Math.round(u.score||0));s.filtrarAvaliacoes('todas');s.mostrarTela('avaliacoesScreen');}); };
App.prototype.filtrarAvaliacoes = function(f,btn) { this.avaliacaoFiltro=f;if(btn){document.querySelectorAll('#avaliacoesScreen .tab').forEach(function(t){t.classList.remove('active');});btn.classList.add('active');}var s=this,c=document.getElementById('avaliacoesLista');if(!c)return;db.collection('avaliacoes').get().then(function(snap){var avs=[];snap.forEach(function(doc){var d=doc.data();if(d.avaliadoId===s.avaliacoesUid)avs.push({id:doc.id,data:d});});if(f==='positivas')avs=avs.filter(function(a){return a.data.nota>=4;});if(f==='melhorar')avs=avs.filter(function(a){return a.data.nota<=3;});if(avs.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma avaliação</h3></div>';return;}var html='';avs.forEach(function(a){html+='<div class="avaliacao-card"><div>'+'⭐'.repeat(a.data.nota)+'</div><p>'+(a.data.positivos||'')+'</p></div>';});c.innerHTML=html;}); };
App.prototype.abrirDarAvaliacao = function(uid) { var s=this;s.avaliarUid=uid;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;document.getElementById('avaliarNome').textContent=doc.data().nome;s.mostrarTela('darAvaliacaoScreen');}); };
App.prototype.setNota = function(n) { this.avaliarNota=n;document.querySelectorAll('#estrelasAvaliar i').forEach(function(s,i){s.className=i<n?'fas fa-star':'far fa-star';}); };
App.prototype.enviarAvaliacao = function() { if(!this.avaliarNota)return;var s=this;var d={avaliadorId:s.usuarioLogado.id,avaliadoId:s.avaliarUid,nota:s.avaliarNota,positivos:document.getElementById('avalPositivos').value||'',melhorar:document.getElementById('avalMelhorar').value||'',servico:document.getElementById('avalServico').value||'',periodo:document.getElementById('avalPeriodo').value||'',dataCriacao:firebase.firestore.FieldValue.serverTimestamp()};databaseService.avaliarUsuarioCompleto(d).then(function(){s.mostrarToast('✅ Avaliação enviada!','sucesso');setTimeout(function(){s.voltarTela();},1500);}); };

// ===== QR CODE =====
App.prototype.gerarQRCode = function(uid) { var s=this;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();var link=window.location.origin+window.location.pathname+'?perfil='+uid;document.getElementById('modalQRCode').style.display='flex';document.getElementById('qrcodeNome').textContent=u.nome;document.getElementById('qrcodeContainer').innerHTML='';new QRCode(document.getElementById('qrcodeContainer'),{text:link,width:200,height:200,colorDark:'#1A3A5C',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});s.qrcodeLink=link;}); };
App.prototype.fecharQRCode = function() { document.getElementById('modalQRCode').style.display='none'; };
App.prototype.baixarQRCode = function() { var img=document.querySelector('#qrcodeContainer img');if(!img)return;var a=document.createElement('a');a.download='lpxconstrutor-qrcode.png';a.href=img.src;a.click();this.mostrarToast('✅ QR baixado!','sucesso'); };

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() { if(!this.usuarioLogado)return;var u=this.usuarioLogado;var n=document.getElementById('meuPerfilNome');if(n)n.textContent=u.nome||'Usuário';var p=document.getElementById('meuPerfilProfissao');if(p)p.textContent=(u.tipo==='profissional'?'👷 ':'🏢 ')+(u.profissao||u.tipo);var s=document.getElementById('meuPerfilScore');if(s)s.textContent='⭐ '+((u.score||0).toFixed(1));var q=document.getElementById('menuQtdAvaliacoes');if(q)q.textContent=u.avaliacoesRecebidas||0;if(u.fotoPerfil){var f=document.getElementById('fotoPerfilPreview');if(f)f.src=u.fotoPerfil;} };
App.prototype.abrirEditarPerfil = function() { if(!this.usuarioLogado)return;var u=this.usuarioLogado;document.getElementById('editNome').value=u.nome||'';document.getElementById('editCelular').value=u.celular||'';document.getElementById('editProfissao').value=u.profissao||'';document.getElementById('editExperiencia').value=u.experiencia||0;document.getElementById('editHabilidades').value=u.habilidades||'';this.mostrarTela('editarPerfilScreen'); };
App.prototype.salvarPerfil = function() { var s=this;var d={nome:document.getElementById('editNome').value.trim(),celular:document.getElementById('editCelular').value.trim(),experiencia:parseInt(document.getElementById('editExperiencia').value)||0,habilidades:document.getElementById('editHabilidades').value.trim()};if(!d.nome){s.mostrarToast('❌ Nome obrigatório!','erro');return;}databaseService.atualizarUsuario(s.usuarioLogado.id,d).then(function(){s.usuarioLogado.nome=d.nome;s.mostrarToast('✅ Perfil atualizado!','sucesso');s.carregarMeuPerfil();s.voltarTela();}); };
App.prototype.uploadFoto = function(e){var s=this,f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(s.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){s.usuarioLogado.fotoPerfil=ev.target.result;document.getElementById('fotoPerfilPreview').src=ev.target.result;s.mostrarToast('✅ Foto atualizada!','sucesso');});};r.readAsDataURL(f);};

// ===== OUTROS =====
App.prototype.mostrarInfoVersao = function(){this.mostrarToast('🏗️ LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){var m=document.getElementById('motivoExclusao').value;if(!m){this.mostrarToast('❌ Selecione um motivo!','erro');return;}if(!confirm('⚠️ Tem certeza?'))return;this.mostrarToast('📧 Solicitação enviada!','sucesso');setTimeout(function(){window.app.mostrarTela('loginScreen');},2000);};
App.prototype.mudarTab = function(tab) { document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});event.target.closest('.tab').classList.add('active');document.getElementById('feedContainer').style.display=tab==='feed'?'block':'none';document.getElementById('redeContainer').style.display=tab==='rede'?'block':'none';if(tab==='feed')this.carregarFeed();if(tab==='rede')this.carregarRede(); };
App.prototype.mostrarNotificacoes = function(){this.mostrarTela('notificacoesScreen');};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
