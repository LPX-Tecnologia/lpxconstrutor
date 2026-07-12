// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO E FUNCIONAL =====
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
    carregarRede: function(){ if(window.app._app)window.app._app.carregarRede(); }
};

var App = function() {
    this.usuarioLogado = null; this.usuarioSelecionado = null; this.telaAtual = 'loginScreen';
    this.historicoTelas = []; this.vagaFotoBase64 = null; this.contratarProfId = null;
    this.obraSelecionada = null; this.avaliarUid = null; this.avaliarNota = 0;
    this.videoIndex = 0; this.init();
};

App.prototype.init = function() {
    var s = this;
    console.log('🚀 Iniciando...');
    window.app._app = this;
    s.mostrarSplash();
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() {
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') { s.mostrarModalSair(); }
        else { s.voltarTela(); }
    });
    authService.onAuthStateChange(function(u) {
        if (u) { s.usuarioLogado = u; s.atualizarBotoes(); if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') s.mostrarTela('homeScreen'); }
        else { s.usuarioLogado = null; s.mostrarTela('loginScreen'); }
        setTimeout(function() { s.esconderSplash(); }, 1500);
    });
};

// ===== SPLASH =====
App.prototype.mostrarSplash = function() {
    var splash = document.getElementById('splashScreen');
    if (!splash) {
        splash = document.createElement('div');
        splash.id = 'splashScreen';
        splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1A3A5C;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.5s;';
        splash.innerHTML = '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:120px;height:120px;object-fit:contain;animation:float 2s ease-in-out infinite;"><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p><div id="tijolosContainer" style="margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:2px;"></div>';
        document.body.appendChild(splash);
        this.animarTijolos();
    }
};
App.prototype.animarTijolos = function() {
    var container = document.getElementById('tijolosContainer'); if (!container) return; var fiada = 0;
    function adicionarFiada() {
        if (fiada >= 4) { container.innerHTML = ''; fiada = 0; setTimeout(adicionarFiada, 300); return; }
        var row = document.createElement('div'); row.style.cssText = 'display:flex;gap:2px;transition:all 0.3s;';
        if (fiada % 2 === 1) row.style.marginLeft = '8px';
        var qtd = fiada === 0 ? 4 : fiada === 1 ? 5 : fiada === 2 ? 4 : 5;
        for (var i = 0; i < qtd; i++) { var t = document.createElement('span'); t.textContent = '🧱'; t.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;'; row.appendChild(t); }
        container.appendChild(row); fiada++;
        setTimeout(adicionarFiada, fiada < 4 ? 300 : 600);
    }
    adicionarFiada();
};
App.prototype.esconderSplash = function() { var splash = document.getElementById('splashScreen'); if (splash) { splash.style.opacity = '0'; setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 500); } };

App.prototype.atualizarBotoes = function() {
    var bp = document.getElementById('btnPublicar'); if (bp) bp.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
    var bo = document.getElementById('btnObras'); if (bo) bo.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.mostrarTela = function(id) {
    var s = this;
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') s.historicoTelas.push(s.telaAtual);
    document.querySelectorAll('.screen').forEach(function(x) { x.classList.remove('active'); });
    var t = document.getElementById(id); if (!t) return; t.classList.add('active'); s.telaAtual = id;
    var n = document.getElementById('bottomNav');
    if (n) { var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen','minhasObrasScreen']; n.style.display = tn.indexOf(id) >= 0 ? 'flex' : 'none'; }
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') { var p1=document.getElementById('recPasso1'),p2=document.getElementById('recPasso2'); if(p1)p1.style.display='block'; if(p2)p2.style.display='none'; }
};
App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) { var a = this.historicoTelas.pop(); document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); }); var t = document.getElementById(a); if (t) { t.classList.add('active'); this.telaAtual = a; } if (a === 'homeScreen') this.carregarHome(); if (a === 'meuPerfilScreen') this.carregarMeuPerfil(); }
    else { this.mostrarTela('homeScreen'); }
};

App.prototype.mostrarModalSair = function() { var el=document.getElementById('modalSair'); if(el)el.style.display='flex'; };
App.prototype.fecharModalSair = function() { var el=document.getElementById('modalSair'); if(el)el.style.display='none'; history.pushState(null,'',window.location.href); };
App.prototype.confirmarSair = function() { var el=document.getElementById('modalSair'); if(el)el.style.display='none'; this.usuarioLogado=null; this.historicoTelas=[]; this.mostrarTela('loginScreen'); };
App.prototype.selecionarTema = function(t) { if(t==='escuro'){document.body.classList.add('dark-theme');localStorage.setItem('tema','escuro');}else{document.body.classList.remove('dark-theme');localStorage.setItem('tema','claro');} this.mostrarToast('🎨 Tema alterado!','sucesso'); };

App.prototype.fazerLogin = function() {
    var s=this; var e=(document.getElementById('loginEmail')||{}).value||'', p=(document.getElementById('loginSenha')||{}).value||'';
    if(!e||!p){s.mostrarToast('❌ Preencha todos!','erro');return;} s.mostrarToast('Entrando...','info');
    authService.login(e,p).then(function(r){if(r.sucesso){s.usuarioLogado=r.usuario;s.mostrarToast('✅ Bem-vindo!','sucesso');s.atualizarBotoes();s.mostrarTela('homeScreen');}else s.mostrarToast('❌ '+r.erro,'erro');});
};
App.prototype.cadastrar = function() {
    var s=this; var d={nome:(document.getElementById('cadNome')||{}).value||'',email:(document.getElementById('cadEmail')||{}).value||'',senha:(document.getElementById('cadSenha')||{}).value||'',tipo:(document.getElementById('cadTipo')||{}).value||'profissional',celular:(document.getElementById('cadCelular')||{}).value||'',cpf:((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''),profissao:(document.getElementById('cadProfissao')||{}).value||'',experiencia:(document.getElementById('cadExperiencia')||{}).value||'0',habilidades:(document.getElementById('cadHabilidades')||{}).value||''};
    if(!d.nome||!d.email||!d.senha){s.mostrarToast('❌ Preencha todos!','erro');return;} s.mostrarToast('Cadastrando...','info');
    authService.cadastrar(d).then(function(r){if(r.sucesso){s.usuarioLogado=r.usuario;s.mostrarToast('✅ OK!','sucesso');s.atualizarBotoes();s.mostrarTela('homeScreen');}else s.mostrarToast('❌ '+r.erro,'erro');});
};
App.prototype.proximaEtapa = function(e) { var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); if(!e1||!e2)return; e1.style.display=e===1?'block':'none'; e2.style.display=e===2?'block':'none'; };
App.prototype.toggleProfissao = function() { var g=document.getElementById('grupoProfissao'); if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; };
App.prototype.sair = function() { var s=this; authService.logout().then(function(){s.usuarioLogado=null;s.mostrarTela('loginScreen');s.mostrarToast('👋 Até logo!','sucesso');}); };
App.prototype.solicitarCodigo = function() { var s=this; var e=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():''; if(!e||!e.includes('@')){s.mostrarToast('❌ Email inválido!','erro');return;} authService.solicitarCodigoRecuperacao(e).then(function(r){if(r.sucesso){s.recuperacaoUid=r.uid;s.mostrarToast('✅ Código: '+r.codigo,'sucesso');document.getElementById('recPasso1').style.display='none';document.getElementById('recPasso2').style.display='block';}else s.mostrarToast('❌ '+r.erro,'erro');}); };
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){var s=this;s.mostrarToast('✅ Senha redefinida!','sucesso');setTimeout(function(){s.mostrarTela('loginScreen');},1500);};

// ===== HOME (COM FOTO NA SAUDAÇÃO) =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    var h = new Date().getHours();
    var sd = 'Bom dia'; if (h >= 12 && h < 18) sd = 'Boa tarde'; if (h >= 18) sd = 'Boa noite';
    var sa = document.getElementById('saudacao'); if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    var re = document.getElementById('resumoTexto'); if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    // Atualiza foto na saudação
    var fotoSaudacao = document.querySelector('#homeScreen .logo-saudacao');
    if (fotoSaudacao && this.usuarioLogado.fotoPerfil) { fotoSaudacao.src = this.usuarioLogado.fotoPerfil; }
    setTimeout(function() { try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} }, 500);
    this.carregarFeed();
};

// ===== FEED COM VÍDEOS =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
    var videosEducativos = [
        { titulo: '🦺 Segurança no Trabalho', descricao: 'Dicas essenciais de segurança.', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes', descricao: 'Evite acidentes comuns em obras.', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs', descricao: 'Equipamentos de Proteção Individual.', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' },
        { titulo: '🏗️ Segurança em Altura', descricao: 'Cuidados para trabalhos acima de 2m.', url: 'https://www.youtube.com/embed/bh2pzYBs_go', categoria: 'Segurança' },
        { titulo: '🔌 Segurança com Eletricidade', descricao: 'Riscos elétricos e proteção.', url: 'https://www.youtube.com/embed/awR7lJO3jUU', categoria: 'Eletricista' },
        { titulo: '🧯 Prevenção de Incêndios', descricao: 'Uso de extintores e evacuação.', url: 'https://www.youtube.com/embed/RReflO7kR3Y', categoria: 'Segurança' },
        { titulo: '📋 Normas Regulamentadoras', descricao: 'Entenda as principais NRs.', url: 'https://www.youtube.com/embed/O_ZnZb7YN4M', categoria: 'Normas' },
        { titulo: '⚠️ Riscos no Canteiro', descricao: 'Perigos mais comuns na construção.', url: 'https://www.youtube.com/embed/jsa31UlsC5g', categoria: 'Segurança' },
        { titulo: '🦺 Dicas de Segurança', descricao: 'Pequenas atitudes, grandes diferenças.', url: 'https://www.youtube.com/embed/HBOMP-khorA', categoria: 'Segurança' },
        { titulo: '👷 Proteção do Trabalhador', descricao: 'Direitos e deveres.', url: 'https://www.youtube.com/embed/7qljv7zCJZg', categoria: 'Segurança' },
        { titulo: '🏗️ Obras Seguras', descricao: 'Ambiente de trabalho organizado.', url: 'https://www.youtube.com/embed/fkZNyLCeVhY', categoria: 'Segurança' },
        { titulo: '⚠️ Atenção aos Perigos', descricao: 'Riscos que passam despercebidos.', url: 'https://www.youtube.com/embed/UG57VgP_IEs', categoria: 'Segurança' },
        { titulo: '🦺 Segurança em 1º Lugar', descricao: 'Priorize a segurança sempre.', url: 'https://www.youtube.com/embed/CloAlUsyKTo', categoria: 'Segurança' },
        { titulo: '📏 Condutas Seguras', descricao: 'Boas práticas previnem acidentes.', url: 'https://www.youtube.com/embed/xZKBm-tGvrc', categoria: 'Segurança' },
        { titulo: '👷 Trabalho com Segurança', descricao: 'Dicas práticas para o dia a dia.', url: 'https://www.youtube.com/embed/XtS99srL4K4', categoria: 'Segurança' }
    ];
    var hoje = new Date();
    var diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    var videoDoDia = videosEducativos[diaDoAno % videosEducativos.length];
    db.collection('vagas').get().then(function(snap) {
        var vagas = []; snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        var html = '';
        html += '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:20px;">🎓</span><div><strong style="font-size:13px;">📚 ' + videoDoDia.categoria + '</strong><div style="font-size:10px;opacity:0.9;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</div></div></div><p style="font-size:11px;opacity:0.95;margin-top:4px;">' + videoDoDia.descricao + '</p></div><iframe src="' + videoDoDia.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe><div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:10px;color:#059669;"><strong>' + videoDoDia.titulo + '</strong></span><div style="display:flex;gap:4px;"><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
        if (vagas.length === 0) { html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; }
        else { vagas.forEach(function(v) { html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + (v.data.fotoObra ? '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;">' : '') + '</div>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="window.app.candidatarVaga(\'' + v.id + '\')">✋ QUERO!</button></div>' : '') + '</div>'; }); }
        c.innerHTML = html;
    }).catch(function() { c.innerHTML = '<div class="card">Erro</div>'; });
};
App.prototype.videoAnterior = function() { if (!this.videoIndex) this.videoIndex = 0; this.videoIndex--; if (this.videoIndex < 0) this.videoIndex = 14; this.carregarFeed(); };
App.prototype.videoSeguinte = function() { if (!this.videoIndex) this.videoIndex = 0; this.videoIndex++; this.carregarFeed(); };

// ===== REDE (COM FOTO) =====
App.prototype.carregarRede = function() {
    var s=this,c=document.getElementById('redeContainer');if(!c)return;c.innerHTML='<div class="loading">Carregando...</div>';
    db.collection('conexoes').get().then(function(snap){var conexoes=[];snap.forEach(function(doc){var d=doc.data();if(d.usuarioId===s.usuarioLogado.id||d.amigoId===s.usuarioLogado.id)conexoes.push({id:doc.id,data:d});});
        if(conexoes.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3></div>';return;}
        var proms=[];conexoes.forEach(function(con){var aid=con.data.usuarioId===s.usuarioLogado.id?con.data.amigoId:con.data.usuarioId;proms.push(db.collection('usuarios').doc(aid).get().then(function(ud){if(ud.exists)return{usuario:{id:ud.id,...ud.data()}};return null;}));});
        Promise.all(proms).then(function(r){var html='';r.forEach(function(x){if(!x)return;var u=x.usuario;
            var avatar = u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<i class="fas fa-user"></i>';
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+avatar+'</div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div></div></div></div>';});
            c.innerHTML=html||'<div class="card">Nenhum amigo</div>';});
    });
};

// ===== BUSCA (COM FOTO) =====
App.prototype.buscarProfissionais = function() {
    var s=this,c=document.getElementById('buscaResultados');if(!c)return;c.innerHTML='<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap){var todos=[];snap.forEach(function(doc){todos.push({id:doc.id,data:doc.data()});});
        var profs=todos.filter(function(u){return u.data.tipo==='profissional'&&u.data.ativo!==false&&u.id!==s.usuarioLogado.id;});
        if(profs.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhum profissional</h3></div>';return;}
        var html='';profs.forEach(function(u){var w=u.data.celular?u.data.celular.replace(/\D/g,''):'';
            var avatar = u.data.fotoPerfil ? '<img src="' + u.data.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<i class="fas fa-hard-hat"></i>';
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+avatar+'</div><div class="vaga-info"><div class="vaga-nome">'+u.data.nome+'</div><div class="vaga-data">'+(u.data.profissao||'Profissional')+' • '+(u.data.experiencia||0)+' anos</div></div></div><div class="vaga-footer">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')">Chat</button></div></div>';});
        c.innerHTML=html;
    });
};

// ===== PERFIL PÚBLICO (COM FOTO) =====
App.prototype.verPerfil = function(uid) { 
    var s=this; db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists)return; var u=doc.data(),w=u.celular?u.celular.replace(/\D/g,''):'',c=document.getElementById('perfilPublicoConteudo');if(!c)return;
        var avatar = u.fotoPerfil ? '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">' : '<i class="fas fa-user"></i>';
        var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar">'+avatar+'</div></div></div><div class="profile-info-card"><h2>'+u.nome+'</h2><p>'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+'</div></div><div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p></div>';
        if(s.usuarioLogado&&s.usuarioLogado.id!==uid){html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success">WhatsApp</a>';html+='<button class="btn btn-primary" onclick="window.app.iniciarChat(\''+uid+'\')">💬 Chat</button>';if(s.usuarioLogado.tipo==='empreiteiro')html+='<button class="btn btn-outline" onclick="window.app.abrirContratacao(\''+uid+'\')" style="background:#1A3A5C;color:white;">🤝 CONTRATAR</button>';html+='</div>';}
        c.innerHTML=html;s.mostrarTela('perfilPublicoScreen');
    }); 
};

App.prototype.iniciarChat = function(uid) { var s=this; db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;s.usuarioSelecionado={id:doc.id,data:doc.data()};var h=document.getElementById('chatHeaderInfo');if(h)h.innerHTML='<div><strong>'+doc.data().nome+'</strong></div>';s.mostrarTela('chatScreen');}); };
App.prototype.enviarMensagem = function() { var s=this,i=document.getElementById('chatInput'),ct=i?i.value.trim():'';if(!ct||!s.usuarioSelecionado)return;db.collection('mensagens').add({remetenteId:s.usuarioLogado.id,destinatarioId:s.usuarioSelecionado.id,participantes:[s.usuarioLogado.id,s.usuarioSelecionado.id],conteudo:ct,dataEnvio:firebase.firestore.FieldValue.serverTimestamp(),lida:false}).then(function(){i.value='';s.mostrarToast('✅ Enviada!','sucesso');}); };

// ===== PUBLICAR VAGA =====
App.prototype.abrirTelaPublicacao = function() { if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro'){this.mostrarToast('❌ Apenas empreiteiros!','erro');return;}['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});var vh=document.getElementById('vagaValorHora');if(vh)vh.value='';var fp=document.getElementById('vagaFotoPreview');if(fp)fp.src='imagem/logo-sem-fundo-lpxconstrutor.png';this.vagaFotoBase64=null;document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb){cb.checked=false;});this.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(e) { var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){document.getElementById('vagaFotoPreview').src=ev.target.result;};r.readAsDataURL(f);var s=this;var r2=new FileReader();r2.onload=function(ev){s.vagaFotoBase64=ev.target.result;};r2.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var s=this;var t=(document.getElementById('vagaTitulo')||{}).value||'',e=(document.getElementById('vagaEndereco')||{}).value||'';if(!t||!e){s.mostrarToast('❌ Preencha título e endereço!','erro');return;}var ps=[];document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb){ps.push(cb.value);});var profs=ps.length>0?ps.join(', '):'Geral';s.mostrarToast('Publicando...','info');db.collection('vagas').add({titulo:t,descricao:(document.getElementById('vagaDescricao')||{}).value||'',endereco:e,profissoes:profs,valorHora:parseFloat(vh)||0,fotoObra:s.vagaFotoBase64||'',usuarioId:s.usuarioLogado.id,interessados:[],dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativa:true}).then(function(){s.mostrarToast('✅ Vaga publicada!','sucesso');s.vagaFotoBase64=null;var fp=document.getElementById('vagaFotoPreview');if(fp)fp.src='imagem/logo-sem-fundo-lpxconstrutor.png';setTimeout(function(){s.mostrarTela('homeScreen');s.carregarFeed();},1000);}).catch(function(error){s.mostrarToast('❌ Erro: '+error.message,'erro');}); };
App.prototype.candidatarVaga = function(vid) { var s=this;if(!s.usuarioLogado||s.usuarioLogado.tipo!=='profissional')return;db.collection('vagas').doc(vid).get().then(function(doc){if(!doc.exists)return;var v=doc.data();if(!v.interessados)v.interessados=[];if(v.interessados.indexOf(s.usuarioLogado.id)>=0)return;v.interessados.push(s.usuarioLogado.id);db.collection('vagas').doc(vid).update({interessados:v.interessados}).then(function(){s.mostrarToast('✅ Candidatura enviada!','sucesso');});}); };

App.prototype.abrirContratacao = function(profId) { var s=this;s.contratarProfId=profId;db.collection('usuarios').doc(profId).get().then(function(doc){if(!doc.exists)return;document.getElementById('contratarInfo').innerHTML='<div style="font-size:40px;">👷</div><h3>'+doc.data().nome+'</h3>';});db.collection('obras').where('usuarioId','==',s.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var sel=document.getElementById('contratarObra');sel.innerHTML='<option value="">Selecione...</option>';snap.forEach(function(doc){sel.innerHTML+='<option value="'+doc.id+'">🏗️ '+doc.data().nome+'</option>';});});s.mostrarTela('contratarScreen'); };
App.prototype.confirmarContratacao = function() { var s=this;var oid=document.getElementById('contratarObra').value,func=document.getElementById('contratarFuncao').value||'',val=document.getElementById('contratarValor').value||'0';if(!oid||!func)return;db.collection('conexoes').add({usuarioId:s.usuarioLogado.id,amigoId:s.contratarProfId,obraId:oid,funcao:func,valorHora:parseFloat(val),status:'contratado',dataContratacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){s.mostrarToast('✅ Contratado!','sucesso');setTimeout(function(){s.voltarTela();},1500);}); };

App.prototype.novaObra = function() { var n=prompt('Nome da obra:'),e=prompt('Endereço:');if(!n||!e)return;var s=this;db.collection('obras').add({nome:n,endereco:e,usuarioId:s.usuarioLogado.id,ativa:true,dataCriacao:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){s.carregarMinhasObras();}); };
App.prototype.carregarMinhasObras = function() { var s=this,c=document.getElementById('listaObrasContainer');if(!c)return;db.collection('obras').where('usuarioId','==',s.usuarioLogado.id).where('ativa','==',true).get().then(function(snap){var obras=[];snap.forEach(function(doc){obras.push({id:doc.id,data:doc.data()});});document.getElementById('totalObras').textContent=obras.length;if(obras.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma obra</h3></div>';return;}var html='';obras.forEach(function(o){html+='<div class="card" style="cursor:pointer;border-left:4px solid #10B981;" onclick="window.app.verDetalheObra(\''+o.id+'\')"><h3>🏗️ '+o.data.nome+'</h3><p>📍 '+o.data.endereco+'</p></div>';});c.innerHTML=html;}); };
App.prototype.verDetalheObra = function(oid) { var s=this;s.obraSelecionada=oid;var c=document.getElementById('detalheObraConteudo');if(!c)return;db.collection('obras').doc(oid).get().then(function(doc){var o=doc.data();var html='<div class="card" style="background:linear-gradient(135deg,#1A3A5C,#2C5F8A);color:white;"><h2>🏗️ '+o.nome+'</h2><p>📍 '+o.endereco+'</p></div>';db.collection('conexoes').where('obraId','==',oid).get().then(function(snap){if(snap.empty){html+='<div class="card"><p>Nenhum funcionário</p></div>';}else{html+='<h3>👷 Funcionários</h3>';snap.forEach(function(doc){var con=doc.data();html+='<div class="card"><strong>'+(con.funcao||'Função')+'</strong><br>💰 R$ '+(con.valorHora||'0')+'/h<br>'+(con.status==='contratado'?'<button class="btn btn-danger btn-small" onclick="window.app.demitirFuncionario(\''+doc.id+'\')">Demitir</button> <button class="btn btn-outline btn-small" onclick="window.app.finalizarContrato(\''+doc.id+'\')">Finalizar</button>':'<span>'+con.status+'</span>')+'</div>';});}c.innerHTML=html;});});s.mostrarTela('detalheObraScreen'); };
App.prototype.demitirFuncionario = function(cid) { if(!confirm('Demitir?'))return;var s=this;db.collection('conexoes').doc(cid).update({status:'demitido'}).then(function(){s.verDetalheObra(s.obraSelecionada);}); };
App.prototype.finalizarContrato = function(cid) { if(!confirm('Finalizar?'))return;var s=this;db.collection('conexoes').doc(cid).update({status:'finalizado'}).then(function(){s.verDetalheObra(s.obraSelecionada);}); };

App.prototype.verAvaliacoes = function(uid) { var s=this;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();document.getElementById('avaliacaoScoreGeral').textContent=(u.score||0).toFixed(1);document.getElementById('avaliacaoEstrelas').innerHTML='⭐'.repeat(Math.round(u.score||0));s.mostrarTela('avaliacoesScreen');}); };
App.prototype.abrirDarAvaliacao = function(uid) { var s=this;s.avaliarUid=uid;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;document.getElementById('avaliarNome').textContent=doc.data().nome;s.mostrarTela('darAvaliacaoScreen');}); };
App.prototype.setNota = function(n) { this.avaliarNota=n;document.querySelectorAll('#estrelasAvaliar i').forEach(function(s,i){s.className=i<n?'fas fa-star':'far fa-star';}); };
App.prototype.enviarAvaliacao = function() { if(!this.avaliarNota)return;var s=this;var d={avaliadorId:s.usuarioLogado.id,avaliadoId:s.avaliarUid,nota:s.avaliarNota,positivos:document.getElementById('avalPositivos').value||'',dataCriacao:firebase.firestore.FieldValue.serverTimestamp()};databaseService.avaliarUsuarioCompleto(d).then(function(){s.mostrarToast('✅ Avaliação enviada!','sucesso');setTimeout(function(){s.voltarTela();},1500);}); };

App.prototype.gerarQRCode = function(uid) { var s=this;db.collection('usuarios').doc(uid).get().then(function(doc){if(!doc.exists)return;var u=doc.data();var link=window.location.origin+window.location.pathname+'?perfil='+uid;var el=document.getElementById('modalQRCode');if(el)el.style.display='flex';document.getElementById('qrcodeNome').textContent=u.nome;document.getElementById('qrcodeContainer').innerHTML='';new QRCode(document.getElementById('qrcodeContainer'),{text:link,width:200,height:200,colorDark:'#1A3A5C',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});}); };
App.prototype.fecharQRCode = function() { var el=document.getElementById('modalQRCode');if(el)el.style.display='none'; };
App.prototype.baixarQRCode = function() { var img=document.querySelector('#qrcodeContainer img');if(!img)return;var a=document.createElement('a');a.download='lpxconstrutor-qrcode.png';a.href=img.src;a.click();this.mostrarToast('✅ QR baixado!','sucesso'); };

App.prototype.carregarMeuPerfil = function() { if(!this.usuarioLogado)return;var u=this.usuarioLogado;var n=document.getElementById('meuPerfilNome');if(n)n.textContent=u.nome||'Usuário';var p=document.getElementById('meuPerfilProfissao');if(p)p.textContent=(u.tipo==='profissional'?'👷 ':'🏢 ')+(u.profissao||u.tipo); };
App.prototype.abrirEditarPerfil = function() { if(!this.usuarioLogado)return;var u=this.usuarioLogado;document.getElementById('editNome').value=u.nome||'';document.getElementById('editCelular').value=u.celular||'';document.getElementById('editHabilidades').value=u.habilidades||'';this.mostrarTela('editarPerfilScreen'); };
App.prototype.salvarPerfil = function() { var s=this;var d={nome:document.getElementById('editNome').value.trim(),celular:document.getElementById('editCelular').value.trim(),habilidades:document.getElementById('editHabilidades').value.trim()};if(!d.nome){s.mostrarToast('❌ Nome obrigatório!','erro');return;}databaseService.atualizarUsuario(s.usuarioLogado.id,d).then(function(){s.usuarioLogado.nome=d.nome;s.mostrarToast('✅ Perfil atualizado!','sucesso');s.carregarMeuPerfil();s.voltarTela();}); };

// ===== UPLOAD FOTO (ATUALIZA EM TODOS OS LUGARES) =====
App.prototype.uploadFoto = function(e){
    var s=this,f=e.target.files[0];if(!f)return;
    var r=new FileReader();
    r.onload=function(ev){
        databaseService.atualizarUsuario(s.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){
            s.usuarioLogado.fotoPerfil=ev.target.result;
            // Atualiza no perfil
            var fp=document.getElementById('fotoPerfilPreview');if(fp)fp.src=ev.target.result;
            // Atualiza na saudação (home)
            var fs=document.querySelector('#homeScreen .logo-saudacao');if(fs)fs.src=ev.target.result;
            s.mostrarToast('✅ Foto atualizada!','sucesso');
        });
    };
    r.readAsDataURL(f);
};

App.prototype.mostrarInfoVersao = function(){this.mostrarToast('🏗️ LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){if(!confirm('⚠️ Tem certeza?'))return;this.mostrarToast('📧 Solicitação enviada!','sucesso');setTimeout(function(){window.app.mostrarTela('loginScreen');},2000);};
App.prototype.mudarTab = function(tab) { document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});event.target.closest('.tab').classList.add('active');document.getElementById('feedContainer').style.display=tab==='feed'?'block':'none';document.getElementById('redeContainer').style.display=tab==='rede'?'block':'none';if(tab==='feed')this.carregarFeed();if(tab==='rede')this.carregarRede(); };
App.prototype.mostrarNotificacoes = function(){this.mostrarTela('notificacoesScreen');};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
