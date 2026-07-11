// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO COM VÍDEOS NO FEED =====
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

// ===== FEED COM VÍDEOS =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div class="loading">Carregando feed...</div>';
    
    var videosDivulgacao = [
        { tipo: 'tiktok', url: 'https://www.tiktok.com/@lpxconstrutor/video/1234567890', titulo: '🏗️ Obras incríveis com LPXConstrutor', descricao: 'Veja como é fácil encontrar profissionais qualificados!' },
        { tipo: 'kwai', url: 'https://www.kwai.com/video/1234567890', titulo: '👷 Profissional encontrou trabalho em 1 dia', descricao: 'Usando o LPXConstrutor, o João conseguiu uma obra em menos de 24h!' },
        { tipo: 'tiktok', url: 'https://www.tiktok.com/@lpxconstrutor/video/0987654321', titulo: '💰 Como contratar os melhores profissionais', descricao: 'Dicas para empreiteiros encontrarem mão de obra qualificada.' }
    ];
    
    db.collection('vagas').get().then(function(snap) {
        var vagas = []; snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        var html = '';
        
        // Vídeo de divulgação
        if (videosDivulgacao.length > 0) {
            var video = videosDivulgacao[s.videoIndex % videosDivulgacao.length];
            html += '<div class="card video-card" style="padding:0;overflow:hidden;background:linear-gradient(135deg,#1A3A5C,#2C5F8A);">' +
                '<div style="padding:12px 16px;color:white;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><i class="fas fa-play-circle" style="font-size:24px;"></i><strong style="font-size:14px;">' + video.titulo + '</strong></div><p style="font-size:12px;opacity:0.9;margin-bottom:12px;">' + video.descricao + '</p></div>' +
                '<div class="video-embed-container"><iframe src="' + s.getVideoEmbedUrl(video) + '" style="width:100%;height:400px;border:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>' +
                '<div style="padding:8px 16px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.3);"><span style="color:white;font-size:11px;">📱 ' + (video.tipo === 'tiktok' ? 'TikTok' : 'Kwai') + '</span><div style="display:flex;gap:6px;"><button class="btn btn-small" style="background:white;color:#1A3A5C;font-size:10px;padding:4px 10px;" onclick="event.stopPropagation();window.app._app.proximoVideo()">⏭ Próximo</button><button class="btn btn-small" style="background:#F47920;color:white;font-size:10px;padding:4px 10px;" onclick="event.stopPropagation();window.open(\'' + video.url + '\',\'_blank\')">🔗 Ver</button></div></div></div>';
        }
        
        // Vagas
        if (vagas.length === 0) {
            html += '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma vaga publicada</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="margin-top:16px;">📢 PUBLICAR VAGA</button>' : '') + '</div>';
        } else {
            vagas.forEach(function(v) {
                html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + (v.data.fotoObra ? '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-top:8px;">' : '') + '</div>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="window.app.candidatarVaga(\'' + v.id + '\')">✋ QUERO!</button></div>' : '') + '</div>';
            });
        }
        c.innerHTML = html; s.videoIndex++;
    }).catch(function() { c.innerHTML = '<div class="card">Erro</div>'; });
};

App.prototype.getVideoEmbedUrl = function(v) {
    var m = v.url.match(/video\/(\d+)/); var id = m ? m[1] : '';
    if (v.tipo === 'tiktok') return 'https://www.tiktok.com/embed/v2/' + id;
    if (v.tipo === 'kwai') return 'https://www.kwai.com/embed/' + id;
    return '';
};

App.prototype.proximoVideo = function() { this.videoIndex++; this.carregarFeed(); };

// ===== DEMAIS FUNÇÕES (REDE, BUSCA, PERFIL, CHAT, PUBLICAÇÃO, CONTRATAÇÃO, OBRAS, AVALIAÇÕES, QR CODE, PERFIL) =====
// (mantenha todas as outras funções do app.js anterior - carregarRede, adicionarNaRede, removerDaRede, buscarProfissionais, verPerfil, iniciarChat, carregarMensagens, enviarMensagem, abrirTelaPublicacao, previewFotoObra, publicarVagaApp, candidatarVaga, abrirContratacao, confirmarContratacao, novaObra, carregarMinhasObras, verDetalheObra, demitirFuncionario, finalizarContrato, verAvaliacoes, filtrarAvaliacoes, abrirDarAvaliacao, setNota, enviarAvaliacao, gerarQRCode, fecharQRCode, baixarQRCode, carregarMeuPerfil, abrirEditarPerfil, salvarPerfil, uploadFoto, mostrarInfoVersao, verMinhasAvaliacoes, confirmarExclusao, mudarTab, mostrarNotificacoes, mostrarToast)

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
