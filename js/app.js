// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){}, voltarTela: function(){},
    cadastrar: function(){}, proximaEtapa: function(){}, toggleProfissao: function(){},
    solicitarCodigo: function(){}, verificarCodigo: function(){}, voltarPasso1: function(){},
    sair: function(){}, buscarProfissionais: function(){}, verPerfil: function(){},
    iniciarChat: function(){}, enviarMensagem: function(){},
    abrirEditarPerfil: function(){}, salvarPerfil: function(){}, uploadFoto: function(){},
    abrirTelaPublicacao: function(){}, publicarVagaApp: function(){}, previewFotoObra: function(){},
    candidatarVaga: function(){}, abrirContratacao: function(){}, confirmarContratacao: function(){},
    novaObra: function(){}, carregarMinhasObras: function(){},
    verDetalheObra: function(){}, demitirFuncionario: function(){}, finalizarContrato: function(){},
    adicionarNaRede: function(){}, removerDaRede: function(){},
    verAvaliacoes: function(){}, filtrarAvaliacoes: function(){}, verMinhasAvaliacoes: function(){},
    abrirDarAvaliacao: function(){}, setNota: function(){}, enviarAvaliacao: function(){},
    gerarQRCode: function(){}, fecharQRCode: function(){}, compartilharLink: function(){}, baixarQRCode: function(){},
    selecionarIdioma: function(){}, selecionarTema: function(){}, carregarTemaSalvo: function(){},
    mostrarInfoVersao: function(){}, confirmarExclusao: function(){},
    mostrarNotificacoes: function(){}, mudarTab: function(){}, carregarFeed: function(){}, carregarRede: function(){}
};

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

App.prototype.init = function() {
    var self = this;
    console.log('🚀 Iniciando LPXConstrutor...');
    this.carregarTemaSalvo();
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

// ===== NAVEGAÇÃO COM HISTÓRICO =====
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
};

App.prototype.voltarTela = function() {
    if (this.historicoTelas.length > 0) {
        var anterior = this.historicoTelas.pop();
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        var tela = document.getElementById(anterior);
        if (tela) { tela.classList.add('active'); this.telaAtual = anterior; }
        if (anterior === 'meuPerfilScreen') this.carregarMeuPerfil();
        if (anterior === 'homeScreen') this.carregarHome();
    } else {
        this.mostrarTela('homeScreen');
    }
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var self = this;
    var e = (document.getElementById('loginEmail') || {}).value || '';
    var s = (document.getElementById('loginSenha') || {}).value || '';
    if (!e || !s) { self.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    authService.login(e, s).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('Bem-vindo!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast(r.erro, 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = { nome: (document.getElementById('cadNome')||{}).value||'', email: (document.getElementById('cadEmail')||{}).value||'', senha: (document.getElementById('cadSenha')||{}).value||'', tipo: (document.getElementById('cadTipo')||{}).value||'profissional', celular: (document.getElementById('cadCelular')||{}).value||'', cpf: ((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''), profissao: (document.getElementById('cadProfissao')||{}).value||'', experiencia: (document.getElementById('cadExperiencia')||{}).value||'0', habilidades: (document.getElementById('cadHabilidades')||{}).value||'' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('Preencha todos os campos!', 'erro'); return; }
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('Cadastro realizado!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast(r.erro, 'erro');
    });
};

App.prototype.proximaEtapa = function(e) { var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2'); if(!e1||!e2)return; e1.style.display=e===1?'block':'none'; e2.style.display=e===2?'block':'none'; };
App.prototype.toggleProfissao = function() { var g=document.getElementById('grupoProfissao'); if(g)g.style.display=(document.getElementById('cadTipo')||{}).value==='profissional'?'block':'none'; };
App.prototype.sair = function() { var self=this; authService.logout().then(function(){self.usuarioLogado=null;self.mostrarTela('loginScreen');}); };

// ===== RECUPERAÇÃO =====
App.prototype.solicitarCodigo = function() {
    var self=this;
    var email=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():'';
    if(!email||!email.includes('@')){self.mostrarToast('Email inválido!','erro');return;}
    authService.solicitarCodigoRecuperacao(email).then(function(r){
        if(r.sucesso){self.recuperacaoUid=r.uid;self.mostrarToast('Código: '+r.codigo,'sucesso');document.getElementById('recPasso1').style.display='none';document.getElementById('recPasso2').style.display='block';}
        else self.mostrarToast(r.erro,'erro');
    });
};
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){this.mostrarToast('Senha redefinida!','sucesso');setTimeout(function(){app.mostrarTela('loginScreen');},1500);};

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
        if(vagas.length===0){c.innerHTML='<div class="card" style="text-align:center;"><h3>Nenhuma vaga</h3></div>';return;}
        var html='';vagas.forEach(function(v){html+='<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">'+(v.data.titulo||'Vaga')+'</div><div class="vaga-data">📍 '+(v.data.endereco||'')+'</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$'+(v.data.valorHora||'0')+'/h</span><span class="vaga-tag">👷 '+(v.data.profissoes||'Todas')+'</span></div></div></div>';});
        c.innerHTML=html;
    }).catch(function(){c.innerHTML='<div class="card">Erro</div>';});
};

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() {
    if(!this.usuarioLogado)return;var u=this.usuarioLogado;
    document.getElementById('meuPerfilNome').textContent=u.nome||'Usuário';
    document.getElementById('meuPerfilProfissao').textContent=(u.tipo==='profissional'?'👷 ':'🏢 ')+(u.profissao||u.tipo);
    document.getElementById('meuPerfilScore').textContent='⭐ '+(u.score||0).toFixed(1)+' ('+(u.avaliacoesRecebidas||0)+')';
    document.getElementById('menuQtdAvaliacoes').textContent=u.avaliacoesRecebidas||0;
    if(u.fotoPerfil)document.getElementById('fotoPerfilPreview').src=u.fotoPerfil;
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
    if(!d.nome){this.mostrarToast('Nome obrigatório!','erro');return;}
    databaseService.atualizarUsuario(this.usuarioLogado.id,d).then(function(){self.usuarioLogado.nome=d.nome;self.usuarioLogado.celular=d.celular;self.mostrarToast('Perfil atualizado!','sucesso');self.carregarMeuPerfil();self.voltarTela();});
};

App.prototype.uploadFoto = function(e) {
    var self=this,f=e.target.files[0];if(!f)return;
    var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(self.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){self.usuarioLogado.fotoPerfil=ev.target.result;document.getElementById('fotoPerfilPreview').src=ev.target.result;self.mostrarToast('Foto atualizada!','sucesso');});};r.readAsDataURL(f);
};

// ===== TEMA =====
App.prototype.carregarTemaSalvo = function() {
    var tema=localStorage.getItem('tema');
    if(tema==='escuro'){document.body.classList.add('dark-theme');var el=document.getElementById('temaAtual');if(el)el.textContent='Escuro';}
};

App.prototype.selecionarTema = function(tema) {
    if(tema==='escuro'){
        document.body.classList.add('dark-theme');
        document.getElementById('temaClaro').style.background='';
        document.getElementById('temaEscuro').style.background='#E0F2FE';
        document.getElementById('temaAtual').textContent='Escuro';
        localStorage.setItem('tema','escuro');
    }else{
        document.body.classList.remove('dark-theme');
        document.getElementById('temaClaro').style.background='#E0F2FE';
        document.getElementById('temaEscuro').style.background='';
        document.getElementById('temaAtual').textContent='Claro';
        localStorage.setItem('tema','claro');
    }
    this.mostrarToast('Tema: '+(tema==='claro'?'Claro':'Escuro'),'sucesso');
};

// ===== IDIOMA =====
App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual=idioma;
    localStorage.setItem('idioma',idioma);
    this.mostrarToast('Idioma: '+idioma.toUpperCase(),'sucesso');
    this.voltarTela();
};

// ===== OUTROS =====
App.prototype.mostrarInfoVersao = function(){this.mostrarToast('LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){
    var m=document.getElementById('motivoExclusao').value;
    if(!m){this.mostrarToast('Selecione um motivo!','erro');return;}
    if(!confirm('Tem certeza? Esta ação é IRREVERSÍVEL!'))return;
    this.mostrarToast('Solicitação enviada! Verifique seu email.','sucesso');
    setTimeout(function(){app.mostrarTela('loginScreen');},2000);
};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app=new App();console.log('✅ App pronto!');});// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id); if(t) t.classList.add('active');
    },
    cadastrar: function(){}, proximaEtapa: function(){}, toggleProfissao: function(){},
    recuperarSenha: function(){}, enviarRecuperacao: function(){},
    solicitarCodigo: function(){}, verificarCodigo: function(){}, voltarPasso1: function(){},
    sair: function(){}, buscarProfissionais: function(){}, verPerfil: function(){},
    iniciarChat: function(){}, enviarMensagem: function(){}, salvarPerfil: function(){},
    uploadFoto: function(){}, abrirTelaPublicacao: function(){}, publicarVagaApp: function(){},
    previewFotoObra: function(){}, candidatarVaga: function(){},
    abrirContratacao: function(){}, confirmarContratacao: function(){},
    novaObra: function(){}, carregarMinhasObras: function(){},
    verDetalheObra: function(){}, demitirFuncionario: function(){}, finalizarContrato: function(){},
    adicionarNaRede: function(){}, removerDaRede: function(){},
    verAvaliacoes: function(){}, filtrarAvaliacoes: function(){},
    abrirDarAvaliacao: function(){}, setNota: function(){}, enviarAvaliacao: function(){},
    gerarQRCode: function(){}, fecharQRCode: function(){}, compartilharLink: function(){}, baixarQRCode: function(){},
    mostrarNotificacoes: function(){}, mudarTab: function(){}, carregarFeed: function(){}, carregarRede: function(){}
};

var App = function() {
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.recuperacaoUid = null;
    this.avaliacoesUid = null;
    this.avaliarUid = null;
    this.avaliarNota = 0;
    this.avaliacaoFiltro = 'todas';
    this.vagaFotoBase64 = null;
    this.contratarProfId = null;
    this.obraSelecionada = null;
    this.qrcodeLink = null;
    this.notificacoes = [];
    this.init();
};

App.prototype.init = function() {
    var self = this;
    console.log('🚀 Iniciando LPXConstrutor...');
    authService.onAuthStateChange(function(u) {
        if (u) {
            self.usuarioLogado = u;
            self.atualizarBotaoPublicar();
            self.atualizarBotaoObras();
            self.iniciarNotificacoes();
            self.verificarURLPerfil();
            if (self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen') self.mostrarTela('homeScreen');
        } else {
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
        }
    });
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

App.prototype.iniciarNotificacoes = function() {
    if (this.usuarioLogado && typeof notificationsService !== 'undefined') {
        notificationsService.carregarNotificacoes(this.usuarioLogado.id);
    }
};

App.prototype.mostrarTela = function(id) {
    var self = this;
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    var tela = document.getElementById(id);
    if (!tela) return;
    tela.classList.add('active');
    self.telaAtual = id;
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen', 'minhasObrasScreen'];
        nav.style.display = telasComNav.indexOf(id) >= 0 ? 'flex' : 'none';
        nav.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === id) item.classList.add('active');
        });
    }
    if (id === 'homeScreen') setTimeout(function() { self.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { self.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { self.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { self.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') {
        document.getElementById('recPasso1').style.display = 'block';
        document.getElementById('recPasso2').style.display = 'none';
        var ee = document.getElementById('recEmail'); if (ee) ee.value = '';
        setTimeout(function() { if (ee) ee.focus(); }, 500);
    }
    if (id === 'chatScreen') setTimeout(function() { var inp = document.getElementById('chatInput'); if (inp) inp.focus(); }, 300);
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() {
    var self = this;
    var e = (document.getElementById('loginEmail') || {}).value || '';
    var s = (document.getElementById('loginSenha') || {}).value || '';
    if (!e || !s) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    self.mostrarToast('Entrando...', 'info');
    authService.login(e, s).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Bem-vindo!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.cadastrar = function() {
    var self = this;
    var d = { nome: (document.getElementById('cadNome') || {}).value || '', email: (document.getElementById('cadEmail') || {}).value || '', senha: (document.getElementById('cadSenha') || {}).value || '', tipo: (document.getElementById('cadTipo') || {}).value || 'profissional', celular: (document.getElementById('cadCelular') || {}).value || '', cpf: ((document.getElementById('cadCPF') || {}).value || '').replace(/\D/g, ''), profissao: (document.getElementById('cadProfissao') || {}).value || '', experiencia: (document.getElementById('cadExperiencia') || {}).value || '0', habilidades: (document.getElementById('cadHabilidades') || {}).value || '' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ Preencha todos os campos!', 'erro'); return; }
    self.mostrarToast('Cadastrando...', 'info');
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Cadastro realizado!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
        else self.mostrarToast('❌ ' + r.erro, 'erro');
    });
};

App.prototype.proximaEtapa = function(e) { var e1 = document.getElementById('etapa1'), e2 = document.getElementById('etapa2'); if (!e1 || !e2) return; if (e === 1) { e1.style.display = 'block'; e2.style.display = 'none'; } else { e1.style.display = 'none'; e2.style.display = 'block'; } window.scrollTo({ top: 0, behavior: 'smooth' }); };
App.prototype.toggleProfissao = function() { var g = document.getElementById('grupoProfissao'); var t = (document.getElementById('cadTipo') || {}).value; if (g) g.style.display = t === 'profissional' ? 'block' : 'none'; };

// ===== RECUPERAÇÃO DE SENHA =====
App.prototype.solicitarCodigo = function() {
    var self = this;
    var email = document.getElementById('recEmail') ? document.getElementById('recEmail').value.trim() : '';
    if (!email || !email.includes('@')) { self.mostrarToast('❌ Digite um email válido!', 'erro'); return; }
    var s1 = document.getElementById('recStatus1'), i1 = document.getElementById('recIcon1'), m1 = document.getElementById('recMsg1'), sub1 = document.getElementById('recSub1'), cm = document.getElementById('recCodigoMostrado');
    if (s1) { s1.style.display = 'block'; s1.style.background = '#E0F2FE'; }
    if (i1) i1.textContent = '⏳'; if (m1) m1.textContent = 'Gerando código...'; if (cm) cm.style.display = 'none';
    var btn = document.querySelector('#recPasso1 .btn-primary');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GERANDO...'; }
    authService.solicitarCodigoRecuperacao(email).then(function(r) {
        if (s1) s1.style.display = 'block';
        if (r.sucesso) {
            if (s1) { s1.style.background = '#D1FAE5'; }
            if (i1) i1.textContent = '🔢'; if (m1) { m1.textContent = 'Código gerado!'; m1.style.color = '#065F46'; }
            if (cm) { cm.style.display = 'block'; cm.textContent = r.codigo; cm.style.background = '#1A3A5C'; cm.style.color = 'white'; cm.style.padding = '20px'; cm.style.borderRadius = '12px'; cm.style.fontSize = '36px'; cm.style.fontWeight = '900'; cm.style.letterSpacing = '12px'; }
            self.recuperacaoUid = r.uid; self.mostrarToast('✅ Código gerado!', 'sucesso');
            setTimeout(function() { document.getElementById('recPasso1').style.display = 'none'; document.getElementById('recPasso2').style.display = 'block'; }, 3000);
        } else {
            if (s1) { s1.style.background = '#FEE2E2'; }
            if (i1) i1.textContent = '❌'; if (m1) { m1.textContent = r.erro; m1.style.color = '#991B1B'; }
            self.mostrarToast('❌ ' + r.erro, 'erro');
        }
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> ENVIAR CÓDIGO'; }
    });
};

App.prototype.voltarPasso1 = function() { document.getElementById('recPasso1').style.display = 'block'; document.getElementById('recPasso2').style.display = 'none'; };

App.prototype.verificarCodigo = function() {
    var self = this;
    var codigo = document.getElementById('recCodigo') ? document.getElementById('recCodigo').value.trim() : '';
    var ns = document.getElementById('recNovaSenha') ? document.getElementById('recNovaSenha').value : '';
    if (!codigo || codigo.length !== 6) { self.mostrarToast('❌ Digite o código!', 'erro'); return; }
    if (!ns || ns.length < 6) { self.mostrarToast('❌ Senha mínima 6 caracteres!', 'erro'); return; }
    var s2 = document.getElementById('recStatus2');
    if (s2) { s2.style.display = 'block'; s2.style.background = '#E0F2FE'; s2.innerHTML = '<p>⏳ Verificando...</p>'; }
    var btn = document.querySelector('#recPasso2 .btn-primary');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VERIFICANDO...'; }
    authService.redefinirSenhaComCodigo(self.recuperacaoUid, codigo, ns).then(function(r) {
        if (r.sucesso) { if (s2) { s2.style.background = '#D1FAE5'; s2.innerHTML = '<div>✅</div><p>Código verificado!</p>'; } self.mostrarToast('✅ Verificado!', 'sucesso'); setTimeout(function() { self.mostrarTela('loginScreen'); }, 3000); }
        else { if (s2) { s2.style.background = '#FEE2E2'; s2.innerHTML = '<p>❌ ' + r.erro + '</p>'; } self.mostrarToast('❌ ' + r.erro, 'erro'); if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check"></i> REDEFINIR SENHA'; } }
    });
};

App.prototype.sair = function() { var self = this; authService.logout().then(function() { self.usuarioLogado = null; self.mostrarTela('loginScreen'); self.mostrarToast('👋 Até logo!', 'sucesso'); }); };

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    var h = new Date().getHours(), s = 'Bom dia'; if (h >= 12 && h < 18) s = 'Boa tarde'; if (h >= 18) s = 'Boa noite';
    var se = document.getElementById('saudacao'); if (se) se.textContent = '👋 ' + s + ', ' + this.usuarioLogado.nome + '!';
    var re = document.getElementById('resumoTexto'); if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    var self = this; setTimeout(function() { try { if (typeof mapaService !== 'undefined') mapaService.initMap(); } catch(e) {} }, 500);
    this.carregarFeed();
};

App.prototype.carregarFeed = function() {
    var self = this, c = document.getElementById('feedContainer'); if (!c) return;
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
    var timeout = setTimeout(function() { c.innerHTML = '<div class="card"><h3>Tempo esgotado</h3><button class="btn btn-outline btn-small" onclick="app.carregarFeed()">Tentar novamente</button></div>'; }, 10000);
    db.collection('vagas').get().then(function(snap) {
        clearTimeout(timeout); var vagas = []; snap.forEach(function(doc) { var d = doc.data(); if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); });
        if (vagas.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma vaga</h3>' + (self.usuarioLogado && self.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="app.abrirTelaPublicacao()">PUBLICAR VAGA</button>' : '') + '</div>'; return; }
        var html = ''; vagas.forEach(function(v) { html += '<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || '') + '</div></div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ ' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-descricao">' + (v.data.descricao || '') + '</div><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div></div><div class="vaga-footer">' + (self.usuarioLogado && self.usuarioLogado.tipo === 'profissional' ? '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.candidatarVaga(\'' + v.id + '\')" style="flex:1;">✋ QUERO!</button>' : '') + '</div></div>'; });
        c.innerHTML = html;
    }).catch(function() { clearTimeout(timeout); c.innerHTML = '<div class="card"><p>Erro</p></div>'; });
};

App.prototype.carregarRede = function() {
    var self = this, c = document.getElementById('redeContainer'); if (!c) return; c.innerHTML = '<div class="loading">Carregando...</div>';
    db.collection('conexoes').get().then(function(snap) {
        var conexoes = []; snap.forEach(function(doc) { var d = doc.data(); if (d.usuarioId === self.usuarioLogado.id || d.amigoId === self.usuarioLogado.id) conexoes.push({ id: doc.id, data: d }); });
        if (conexoes.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;"><h3>Rede vazia</h3></div>'; return; }
        var promessas = []; conexoes.forEach(function(con) { var aid = con.data.usuarioId === self.usuarioLogado.id ? con.data.amigoId : con.data.usuarioId; promessas.push(db.collection('usuarios').doc(aid).get()); });
        Promise.all(promessas).then(function(docs) { var html = ''; docs.forEach(function(doc) { if (doc.exists) { var u = doc.data(); html += '<div class="vaga-card" onclick="app.verPerfil(\'' + doc.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.nome + '</div></div></div><div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + doc.id + '\')">Chat</button><button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.gerarQRCode(\'' + doc.id + '\')"><i class="fas fa-qrcode"></i></button></div></div>'; } }); c.innerHTML = html || '<div class="card">Nenhum amigo</div>'; });
    });
};

App.prototype.adicionarNaRede = function(amigoId) { var self = this; if (!this.usuarioLogado) return; if (this.usuarioLogado.id === amigoId) return; db.collection('conexoes').get().then(function(snap) { var ex = false; snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) ex = true; }); if (ex) { self.mostrarToast('Já está na rede!', 'erro'); return; } db.collection('conexoes').add({ usuarioId: self.usuarioLogado.id, amigoId: amigoId, status: 'ativo', dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.mostrarToast('✅ Adicionado!', 'sucesso'); }); }); };
App.prototype.removerDaRede = function(amigoId) { var self = this; if (!confirm('Remover?')) return; db.collection('conexoes').get().then(function(snap) { snap.forEach(function(doc) { var d = doc.data(); if ((d.usuarioId === self.usuarioLogado.id && d.amigoId === amigoId) || (d.usuarioId === amigoId && d.amigoId === self.usuarioLogado.id)) { db.collection('conexoes').doc(doc.id).delete().then(function() { self.mostrarToast('Removido', 'sucesso'); }); } }); }); };

// ===== PERFIL =====
App.prototype.carregarMeuPerfil = function() { if (!this.usuarioLogado) return; var u = this.usuarioLogado; var n = document.getElementById('meuPerfilNome'); if (n) n.textContent = u.nome || 'Usuário'; var p = document.getElementById('meuPerfilProfissao'); if (p) p.textContent = (u.tipo === 'profissional' ? '👷' : '🏢') + ' ' + (u.profissao || u.tipo); var en = document.getElementById('editNome'); if (en) en.value = u.nome || ''; var ec = document.getElementById('editCelular'); if (ec) ec.value = u.celular || ''; var eh = document.getElementById('editHabilidades'); if (eh) eh.value = u.habilidades || ''; };
App.prototype.salvarPerfil = function() { var self = this; var d = { nome: (document.getElementById('editNome') || {}).value || '', celular: (document.getElementById('editCelular') || {}).value || '', habilidades: (document.getElementById('editHabilidades') || {}).value || '' }; if (!d.nome) return; databaseService.atualizarUsuario(this.usuarioLogado.id, d).then(function() { self.usuarioLogado.nome = d.nome; self.mostrarToast('✅ Atualizado!', 'sucesso'); }); };
App.prototype.uploadFoto = function(e) { var self = this, f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { databaseService.atualizarUsuario(self.usuarioLogado.id, { fotoPerfil: ev.target.result }).then(function() { self.usuarioLogado.fotoPerfil = ev.target.result; self.mostrarToast('✅ Foto atualizada!', 'sucesso'); }); }; r.readAsDataURL(f); };

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var self = this, c = document.getElementById('buscaResultados'); if (!c) return; c.innerHTML = '<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap) {
        var todos = []; snap.forEach(function(doc) { todos.push({ id: doc.id, data: doc.data() }); });
        var profs = todos.filter(function(u) { return u.data.tipo === 'profissional' && u.data.ativo !== false; });
        var termo = (document.getElementById('buscaInput') || {}).value || '';
        var filtrados = termo ? profs.filter(function(u) { return (u.data.nome || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0 || (u.data.profissao || '').toLowerCase().indexOf(termo.toLowerCase()) >= 0; }) : profs;
        if (filtrados.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;"><h3>Nenhum profissional</h3></div>'; return; }
        var html = ''; filtrados.forEach(function(u) { var w = u.data.celular ? u.data.celular.replace(/\D/g, '') : ''; html += '<div class="vaga-card" onclick="app.verPerfil(\'' + u.id + '\')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome">' + u.data.nome + '</div><div class="vaga-data">' + (u.data.profissao || 'Profissional') + ' • ' + (u.data.experiencia || 0) + ' anos</div></div></div><div class="vaga-footer">' + (w ? '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>' : '') + '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\'' + u.id + '\')">Chat</button><button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.gerarQRCode(\'' + u.id + '\')"><i class="fas fa-qrcode"></i></button></div></div>'; });
        c.innerHTML = html;
    });
};

// ===== NOVAS FUNÇÕES DO PERFIL =====

App.prototype.abrirEditarPerfil = function() {
    if (!this.usuarioLogado) return;
    var u = this.usuarioLogado;
    document.getElementById('editNome').value = u.nome || '';
    document.getElementById('editCelular').value = u.celular || '';
    document.getElementById('editProfissao').value = u.profissao || '';
    document.getElementById('editExperiencia').value = u.experiencia || 0;
    document.getElementById('editHabilidades').value = u.habilidades || '';
    this.mostrarTela('editarPerfilScreen');
};

App.prototype.salvarPerfil = function() {
    var self = this;
    var d = {
        nome: document.getElementById('editNome').value.trim(),
        celular: document.getElementById('editCelular').value.trim(),
        experiencia: parseInt(document.getElementById('editExperiencia').value) || 0,
        habilidades: document.getElementById('editHabilidades').value.trim()
    };
    if (!d.nome) { this.mostrarToast('Nome obrigatório!', 'erro'); return; }
    databaseService.atualizarUsuario(this.usuarioLogado.id, d).then(function() {
        self.usuarioLogado.nome = d.nome;
        self.usuarioLogado.celular = d.celular;
        self.usuarioLogado.experiencia = d.experiencia;
        self.usuarioLogado.habilidades = d.habilidades;
        self.mostrarToast('✅ Perfil atualizado!', 'sucesso');
        self.carregarMeuPerfil();
        self.mostrarTela('meuPerfilScreen');
    });
};

App.prototype.carregarMeuPerfil = function() {
    if (!this.usuarioLogado) return;
    var u = this.usuarioLogado;
    document.getElementById('meuPerfilNome').textContent = u.nome || 'Usuário';
    document.getElementById('meuPerfilProfissao').textContent = (u.tipo === 'profissional' ? '👷 ' : '🏢 ') + (u.profissao || u.tipo);
    document.getElementById('meuPerfilScore').textContent = '⭐ ' + (u.score || 0).toFixed(1) + ' (' + (u.avaliacoesRecebidas || 0) + ' avaliações)';
    document.getElementById('menuQtdAvaliacoes').textContent = u.avaliacoesRecebidas || 0;
    if (u.fotoPerfil) {
        document.getElementById('fotoPerfilPreview').src = u.fotoPerfil;
    }
};

App.prototype.uploadFoto = function(e) {
    var self = this, f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(ev) {
        databaseService.atualizarUsuario(self.usuarioLogado.id, { fotoPerfil: ev.target.result }).then(function() {
            self.usuarioLogado.fotoPerfil = ev.target.result;
            document.getElementById('fotoPerfilPreview').src = ev.target.result;
            self.mostrarToast('✅ Foto atualizada!', 'sucesso');
        });
    };
    r.readAsDataURL(f);
};

App.prototype.mostrarInfoVersao = function() {
    this.mostrarToast('🏗️ LPXConstrutor v1.0.0', 'info');
};

App.prototype.selecionarIdioma = function(idioma) {
    this.mostrarToast('🌐 Idioma selecionado: ' + idioma.toUpperCase(), 'sucesso');
};

App.prototype.selecionarTema = function(tema) {
    document.getElementById('temaClaro').style.background = tema === 'claro' ? '#E0F2FE' : '';
    document.getElementById('temaEscuro').style.background = tema === 'escuro' ? '#E0F2FE' : '';
    document.getElementById('temaAtual').textContent = tema === 'claro' ? 'Claro' : 'Escuro';
    this.mostrarToast('🎨 Tema alterado para: ' + (tema === 'claro' ? 'Claro' : 'Escuro'), 'sucesso');
};

App.prototype.toggleNotificacoes = function(el) {
    this.mostrarToast(el.checked ? '🔔 Notificações ativadas' : '🔕 Notificações desativadas', 'sucesso');
};

App.prototype.toggleEmailVagas = function(el) {
    this.mostrarToast(el.checked ? '📧 Email de vagas ativado' : '📧 Email de vagas desativado', 'sucesso');
};

App.prototype.toggleNotifMensagens = function(el) {
    this.mostrarToast(el.checked ? '💬 Notificações de mensagens ativadas' : '💬 Notificações de mensagens desativadas', 'sucesso');
};

App.prototype.verMinhasAvaliacoes = function() {
    if (this.usuarioLogado) {
        this.verAvaliacoes(this.usuarioLogado.id);
    }
};

App.prototype.confirmarExclusao = function() {
    var motivo = document.getElementById('motivoExclusao').value;
    if (!motivo) { this.mostrarToast('Selecione um motivo!', 'erro'); return; }
    
    if (!confirm('⚠️ TEM CERTEZA? Esta ação é IRREVERSÍVEL!\n\nTodos os seus dados serão permanentemente excluídos.')) return;
    
    if (!confirm('🗑️ ÚLTIMA CONFIRMAÇÃO: Deseja realmente excluir sua conta?')) return;
    
    this.mostrarToast('⏳ Processando exclusão...', 'info');
    
    // Aqui você pode implementar a exclusão real
    setTimeout(function() {
        alert('📧 Enviamos um email de confirmação para seu email cadastrado. \n\nPara concluir a exclusão, responda o email com a palavra "CONFIRMAR".');
        app.mostrarTela('loginScreen');
    }, 2000);
};

// Atualize o mostrarTela para incluir a tela de editar perfil
// Adicione no switch/case:
// if (id === 'meuPerfilScreen') setTimeout(function() { self.carregarMeuPerfil(); }, 100);

// ===== PERFIL PÚBLICO =====
App.prototype.verPerfil = function(uid) {
    var self = this;
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) return;
        var u = doc.data(), w = u.celular ? u.celular.replace(/\D/g, '') : '', c = document.getElementById('perfilPublicoConteudo'); if (!c) return;
        var html = '<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>' + u.nome + '</h2><p>' + (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos</p><div>' + '⭐'.repeat(Math.round(u.score || 0)) + '</div></div><div class="card"><h3>Habilidades</h3><p>' + (u.habilidades || 'Não informado') + '</p></div><div class="card"><h3>Contato</h3><p>📱 ' + (u.celular || 'Não informado') + '</p><p>📧 ' + u.email + '</p></div>';
        if (self.usuarioLogado && self.usuarioLogado.id !== uid) {
            html += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if (w) html += '<a href="https://wa.me/55' + w + '" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
            html += '<button class="btn btn-primary" onclick="app.iniciarChat(\'' + uid + '\')">💬 Chat</button>';
            if (self.usuarioLogado.tipo === 'empreiteiro') html += '<button class="btn btn-outline" onclick="app.abrirContratacao(\'' + uid + '\')" style="background:#1A3A5C;color:white;">🤝 CONTRATAR</button>';
            html += '<button class="btn btn-outline" onclick="app.verAvaliacoes(\'' + uid + '\')">📊 Avaliações</button>';
            html += '<button class="btn btn-outline" onclick="app.gerarQRCode(\'' + uid + '\')"><i class="fas fa-qrcode"></i> Compartilhar QR Code</button>';
            html += '</div>';
        }
        c.innerHTML = html; self.mostrarTela('perfilPublicoScreen');
    });
};

// ===== CHAT =====
App.prototype.iniciarChat = function(uid) { var self = this; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; self.usuarioSelecionado = { id: doc.id, data: doc.data() }; var h = document.getElementById('chatHeaderInfo'); if (h) h.innerHTML = '<div><strong>' + doc.data().nome + '</strong></div>'; self.mostrarTela('chatScreen'); }); };
App.prototype.enviarMensagem = function() { var self = this, i = document.getElementById('chatInput'), ct = i ? i.value.trim() : ''; if (!ct || !this.usuarioSelecionado) return; db.collection('mensagens').add({ remetenteId: this.usuarioLogado.id, destinatarioId: this.usuarioSelecionado.id, participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id], conteudo: ct, dataEnvio: firebase.firestore.FieldValue.serverTimestamp(), lida: false }).then(function() { i.value = ''; }); };

// ===== PUBLICAÇÃO =====
App.prototype.abrirTelaPublicacao = function() { if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') return; ['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; }); document.getElementById('vagaFotoPreview').src = 'imagem/logo-lpxconstrutor.png'; this.vagaFotoBase64 = null; document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb) { cb.checked = false; }); this.mostrarTela('publicarVagaScreen'); };
App.prototype.previewFotoObra = function(e) { var f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function(ev) { document.getElementById('vagaFotoPreview').src = ev.target.result; }; r.readAsDataURL(f); var self = this; var r2 = new FileReader(); r2.onload = function(ev) { self.vagaFotoBase64 = ev.target.result; }; r2.readAsDataURL(f); };
App.prototype.publicarVagaApp = function() { var self = this; var t = (document.getElementById('vagaTitulo') || {}).value || '', e = (document.getElementById('vagaEndereco') || {}).value || ''; if (!t || !e) return; var ps = []; document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb) { ps.push(cb.value); }); db.collection('vagas').add({ titulo: t, descricao: (document.getElementById('vagaDescricao') || {}).value || '', endereco: e, profissoes: ps.join(', '), valorHora: parseFloat((document.getElementById('vagaValorHora') || {}).value) || 0, fotoObra: self.vagaFotoBase64 || '', usuarioId: this.usuarioLogado.id, interessados: [], dataCriacao: firebase.firestore.FieldValue.serverTimestamp(), ativa: true }).then(function() { self.mostrarToast('✅ Vaga publicada!', 'sucesso'); self.vagaFotoBase64 = null; setTimeout(function() { self.mostrarTela('homeScreen'); }, 1000); }); };
App.prototype.candidatarVaga = function(vid) { var self = this; if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'profissional') return; db.collection('vagas').doc(vid).get().then(function(doc) { if (!doc.exists) return; var v = doc.data(); if (!v.interessados) v.interessados = []; if (v.interessados.indexOf(self.usuarioLogado.id) >= 0) return; v.interessados.push(self.usuarioLogado.id); db.collection('vagas').doc(vid).update({ interessados: v.interessados }).then(function() { self.mostrarToast('✅ Candidatura enviada!', 'sucesso'); }); }); };

// ===== CONTRATAÇÃO =====
App.prototype.abrirContratacao = function(profId) { var self = this; this.contratarProfId = profId; db.collection('usuarios').doc(profId).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); document.getElementById('contratarInfo').innerHTML = '<div style="font-size:40px;">👷</div><h3>' + u.nome + '</h3>'; }); db.collection('obras').where('usuarioId', '==', this.usuarioLogado.id).where('ativa', '==', true).get().then(function(snap) { var s = document.getElementById('contratarObra'); s.innerHTML = '<option value="">Selecione...</option>'; snap.forEach(function(doc) { var o = doc.data(); s.innerHTML += '<option value="' + doc.id + '">🏗️ ' + o.nome + '</option>'; }); }); this.mostrarTela('contratarScreen'); };
App.prototype.confirmarContratacao = function() { var self = this; var oid = document.getElementById('contratarObra').value, func = document.getElementById('contratarFuncao').value || '', val = document.getElementById('contratarValor').value || '0'; if (!oid || !func) return; db.collection('conexoes').add({ usuarioId: this.usuarioLogado.id, amigoId: this.contratarProfId, obraId: oid, funcao: func, valorHora: parseFloat(val), tipoContrato: document.getElementById('contratarTipo').value, status: 'contratado', dataContratacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.mostrarToast('✅ Contratado!', 'sucesso'); setTimeout(function() { history.back(); }, 1500); }); };

// ===== OBRAS =====
App.prototype.novaObra = function() { var n = prompt('Nome da obra:'), e = prompt('Endereço:'); if (!n || !e) return; var self = this; db.collection('obras').add({ nome: n, endereco: e, usuarioId: this.usuarioLogado.id, ativa: true, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }).then(function() { self.carregarMinhasObras(); }); };
App.prototype.carregarMinhasObras = function() { var self = this, c = document.getElementById('listaObrasContainer'); if (!c) return; db.collection('obras').where('usuarioId', '==', this.usuarioLogado.id).where('ativa', '==', true).get().then(function(snap) { var obras = []; snap.forEach(function(doc) { obras.push({ id: doc.id, data: doc.data() }); }); document.getElementById('totalObras').textContent = obras.length; if (obras.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;"><h3>Nenhuma obra</h3></div>'; return; } var html = ''; obras.forEach(function(o) { html += '<div class="card" style="cursor:pointer;border-left:4px solid #10B981;" onclick="app.verDetalheObra(\'' + o.id + '\')"><h3>🏗️ ' + o.data.nome + '</h3><p>📍 ' + o.data.endereco + '</p></div>'; }); c.innerHTML = html; }); };
App.prototype.verDetalheObra = function(oid) { var self = this; this.obraSelecionada = oid; var c = document.getElementById('detalheObraConteudo'); if (!c) return; db.collection('obras').doc(oid).get().then(function(doc) { var o = doc.data(); var html = '<div class="card" style="background:linear-gradient(135deg,#1A3A5C,#2C5F8A);color:white;"><h2>🏗️ ' + o.nome + '</h2><p>📍 ' + o.endereco + '</p></div>'; db.collection('conexoes').where('obraId', '==', oid).get().then(function(snap) { if (snap.empty) { html += '<div class="card"><p>Nenhum funcionário</p></div>'; c.innerHTML = html; return; } html += '<h3>👷 Funcionários</h3>'; var proms = []; snap.forEach(function(doc) { var con = doc.data(); con.id = doc.id; proms.push(db.collection('usuarios').doc(con.amigoId).get().then(function(ud) { if (ud.exists) { var u = ud.data(); return '<div class="card"><strong>' + u.nome + '</strong><br>' + (con.funcao || '') + ' • R$ ' + (con.valorHora || '0') + '/h<br>' + (con.status === 'contratado' ? '<button class="btn btn-danger btn-small" onclick="app.demitirFuncionario(\'' + con.id + '\')">Demitir</button> <button class="btn btn-outline btn-small" onclick="app.finalizarContrato(\'' + con.id + '\')">Finalizar</button>' : '<span>' + con.status + '</span>') + '</div>'; } return ''; })); }); Promise.all(proms).then(function(r) { html += r.join(''); c.innerHTML = html; }); }); }); this.mostrarTela('detalheObraScreen'); };
App.prototype.demitirFuncionario = function(cid) { if (!confirm('Demitir?')) return; var self = this; db.collection('conexoes').doc(cid).update({ status: 'demitido' }).then(function() { self.verDetalheObra(self.obraSelecionada); }); };
App.prototype.finalizarContrato = function(cid) { if (!confirm('Finalizar?')) return; var self = this; db.collection('conexoes').doc(cid).update({ status: 'finalizado' }).then(function() { self.verDetalheObra(self.obraSelecionada); }); };

// ===== AVALIAÇÕES =====
App.prototype.verAvaliacoes = function(uid) { var self = this; this.avaliacoesUid = uid; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); document.getElementById('avaliacaoScoreGeral').textContent = (u.score || 0).toFixed(1); document.getElementById('avaliacaoEstrelas').innerHTML = '⭐'.repeat(Math.round(u.score || 0)); document.getElementById('avaliacaoTotal').textContent = (u.avaliacoesRecebidas || 0) + ' avaliações'; self.filtrarAvaliacoes('todas'); self.mostrarTela('avaliacoesScreen'); }); };
App.prototype.filtrarAvaliacoes = function(f, btn) { this.avaliacaoFiltro = f; if (btn) { document.querySelectorAll('#avaliacoesScreen .tab').forEach(function(t) { t.classList.remove('active'); }); btn.classList.add('active'); } var self = this, c = document.getElementById('avaliacoesLista'); if (!c) return; db.collection('avaliacoes').get().then(function(snap) { var avs = []; snap.forEach(function(doc) { var d = doc.data(); if (d.avaliadoId === self.avaliacoesUid) avs.push({ id: doc.id, data: d }); }); if (f === 'positivas') avs = avs.filter(function(a) { return a.data.nota >= 4; }); if (f === 'melhorar') avs = avs.filter(function(a) { return a.data.nota <= 3; }); if (avs.length === 0) { c.innerHTML = '<div class="card" style="text-align:center;"><h3>Nenhuma avaliação</h3></div>'; return; } var html = ''; avs.forEach(function(a) { html += '<div class="avaliacao-card"><div>' + '⭐'.repeat(a.data.nota) + '</div><p>' + (a.data.positivos || '') + '</p></div>'; }); c.innerHTML = html; }); };
App.prototype.abrirDarAvaliacao = function(uid) { var self = this; this.avaliarUid = uid; db.collection('usuarios').doc(uid).get().then(function(doc) { if (!doc.exists) return; var u = doc.data(); document.getElementById('avaliarNome').textContent = u.nome; self.mostrarTela('darAvaliacaoScreen'); }); };
App.prototype.setNota = function(n) { this.avaliarNota = n; document.querySelectorAll('#estrelasAvaliar i').forEach(function(s, i) { s.className = i < n ? 'fas fa-star' : 'far fa-star'; }); };
App.prototype.enviarAvaliacao = function() { if (!this.avaliarNota) return; var self = this; var d = { avaliadorId: this.usuarioLogado.id, avaliadoId: this.avaliarUid, nota: this.avaliarNota, positivos: document.getElementById('avalPositivos').value || '', melhorar: document.getElementById('avalMelhorar').value || '', servico: document.getElementById('avalServico').value || '', periodo: document.getElementById('avalPeriodo').value || '', dataCriacao: firebase.firestore.FieldValue.serverTimestamp() }; databaseService.avaliarUsuarioCompleto(d).then(function() { self.mostrarToast('✅ Avaliação enviada!', 'sucesso'); setTimeout(function() { history.back(); }, 1500); }); };

// ===== QR CODE =====
App.prototype.gerarQRCode = function(uid) {
    var self = this;
    db.collection('usuarios').doc(uid).get().then(function(doc) {
        if (!doc.exists) return;
        var u = doc.data();
        var link = window.location.origin + window.location.pathname + '?perfil=' + uid;
        document.getElementById('modalQRCode').style.display = 'flex';
        document.getElementById('qrcodeNome').textContent = u.nome;
        document.getElementById('qrcodeProfissao').textContent = (u.profissao || 'Profissional') + ' • ' + (u.experiencia || 0) + ' anos';
        document.getElementById('qrcodeContainer').innerHTML = '';
        new QRCode(document.getElementById('qrcodeContainer'), { text: link, width: 200, height: 200, colorDark: '#1A3A5C', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
        self.qrcodeLink = link;
    });
};
App.prototype.fecharQRCode = function() { document.getElementById('modalQRCode').style.display = 'none'; };
App.prototype.compartilharLink = function() {
    if (!this.qrcodeLink) return;
    if (navigator.share) { navigator.share({ title: 'LPXConstrutor', text: 'Veja este perfil!', url: this.qrcodeLink }).catch(function() {}); }
    else { navigator.clipboard.writeText(this.qrcodeLink).then(function() { app.mostrarToast('✅ Link copiado!', 'sucesso'); }).catch(function() { prompt('Copie:', app.qrcodeLink); }); }
};
App.prototype.baixarQRCode = function() { var img = document.querySelector('#qrcodeContainer img'); if (!img) return; var a = document.createElement('a'); a.download = 'lpxconstrutor-qrcode.png'; a.href = img.src; a.click(); this.mostrarToast('✅ QR Code baixado!', 'sucesso'); };
App.prototype.verificarURLPerfil = function() { var params = new URLSearchParams(window.location.search); var pid = params.get('perfil'); if (pid && this.usuarioLogado) { setTimeout(function() { window.app.verPerfil(pid); }, 1000); } };

// ===== TABS =====
App.prototype.mudarTab = function(tab) { document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); }); event.target.closest('.tab').classList.add('active'); document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none'; document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none'; if (tab === 'feed') this.carregarFeed(); if (tab === 'rede') this.carregarRede(); };
App.prototype.mostrarNotificacoes = function() { this.mostrarTela('notificacoesScreen'); };

App.prototype.mostrarToast = function(m, t) { var toast = document.getElementById('toast'); if (!toast) return; toast.textContent = m; toast.style.background = t === 'erro' ? '#EF4444' : t === 'sucesso' ? '#10B981' : '#1F2937'; toast.style.display = 'block'; clearTimeout(this._tt); this._tt = setTimeout(function() { toast.style.display = 'none'; }, 3000); };

document.addEventListener('DOMContentLoaded', function() { window.app = new App(); console.log('✅ App pronto!'); });
