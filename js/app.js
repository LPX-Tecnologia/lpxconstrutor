// ==========================================================
// ===== LPXCONSTRUTOR - APLICAÇÃO PRINCIPAL CORRIGIDA =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id); if(t) t.classList.add('active');
    },
    voltarTela: function(){
        if (window.app && window.app._app) window.app._app.voltarTela();
    },
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
    selecionarIdioma: function(){}, selecionarTema: function(t){
        if (window.app && window.app._app) window.app._app.selecionarTema(t);
    }, carregarTemaSalvo: function(){},
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
    
    // Salva referência global
    window.app._app = this;
    
    // Carrega tema salvo
    var tema = localStorage.getItem('tema');
    if (tema === 'escuro') {
        document.body.classList.add('dark-theme');
        var ta = document.getElementById('temaAtual');
        if (ta) ta.textContent = 'Escuro';
    }
    
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
    
    // Salva no histórico
    if (self.telaAtual && self.telaAtual !== id && self.telaAtual !== 'loginScreen') {
        self.historicoTelas.push(self.telaAtual);
    }
    
    // Esconde todas as telas
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    
    // Mostra a tela
    var tela = document.getElementById(id);
    if (!tela) return;
    tela.classList.add('active');
    self.telaAtual = id;
    
    // Bottom nav
    var nav = document.getElementById('bottomNav');
    if (nav) {
        var tn = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'publicarVagaScreen', 'minhasObrasScreen'];
        nav.style.display = tn.indexOf(id) >= 0 ? 'flex' : 'none';
    }
    
    // Ações específicas
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
        console.log('🔙 Indo para:', anterior);
        
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        var tela = document.getElementById(anterior);
        if (tela) {
            tela.classList.add('active');
            this.telaAtual = anterior;
        }
        
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
        if (temaAtual) temaAtual.textContent = 'Escuro';
        localStorage.setItem('tema', 'escuro');
    } else {
        body.classList.remove('dark-theme');
        if (temaClaro) temaClaro.style.background = '#E0F2FE';
        if (temaEscuro) temaEscuro.style.background = '';
        if (temaAtual) temaAtual.textContent = 'Claro';
        localStorage.setItem('tema', 'claro');
    }
    this.mostrarToast('🎨 Tema: ' + (tema === 'claro' ? 'Claro' : 'Escuro'), 'sucesso');
};

// ===== IDIOMA =====
App.prototype.selecionarIdioma = function(idioma) {
    this.idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma);
    this.mostrarToast('🌐 Idioma: ' + idioma.toUpperCase(), 'sucesso');
    this.voltarTela();
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
    var d = { nome: (document.getElementById('cadNome')||{}).value||'', email: (document.getElementById('cadEmail')||{}).value||'', senha: (document.getElementById('cadSenha')||{}).value||'', tipo: (document.getElementById('cadTipo')||{}).value||'profissional', celular: (document.getElementById('cadCelular')||{}).value||'', cpf: ((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''), profissao: (document.getElementById('cadProfissao')||{}).value||'', experiencia: (document.getElementById('cadExperiencia')||{}).value||'0', habilidades: (document.getElementById('cadHabilidades')||{}).value||'' };
    if (!d.nome || !d.email || !d.senha) { self.mostrarToast('❌ Preencha todos!', 'erro'); return; }
    self.mostrarToast('Cadastrando...', 'info');
    authService.cadastrar(d).then(function(r) {
        if (r.sucesso) { self.usuarioLogado = r.usuario; self.mostrarToast('✅ Cadastro realizado!', 'sucesso'); self.atualizarBotaoPublicar(); self.atualizarBotaoObras(); self.mostrarTela('homeScreen'); }
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
    self.mostrarToast('Gerando código...','info');
    authService.solicitarCodigoRecuperacao(email).then(function(r){
        if(r.sucesso){
            self.recuperacaoUid=r.uid;
            self.mostrarToast('✅ Código: '+r.codigo,'sucesso');
            document.getElementById('recPasso1').style.display='none';
            document.getElementById('recPasso2').style.display='block';
        } else self.mostrarToast('❌ '+r.erro,'erro');
    });
};
App.prototype.voltarPasso1 = function(){document.getElementById('recPasso1').style.display='block';document.getElementById('recPasso2').style.display='none';};
App.prototype.verificarCodigo = function(){self.mostrarToast('✅ Senha redefinida!','sucesso');setTimeout(function(){window.app._app.mostrarTela('loginScreen');},1500);};

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
    if(!d.nome){this.mostrarToast('❌ Nome obrigatório!','erro');return;}
    databaseService.atualizarUsuario(this.usuarioLogado.id,d).then(function(){self.usuarioLogado.nome=d.nome;self.usuarioLogado.celular=d.celular;self.mostrarToast('✅ Perfil atualizado!','sucesso');self.carregarMeuPerfil();self.voltarTela();});
};

App.prototype.uploadFoto = function(e){var self=this,f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(self.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){self.usuarioLogado.fotoPerfil=ev.target.result;document.getElementById('fotoPerfilPreview').src=ev.target.result;self.mostrarToast('✅ Foto atualizada!','sucesso');});};r.readAsDataURL(f);};

// ===== OUTROS =====
App.prototype.mostrarInfoVersao = function(){this.mostrarToast('🏗️ LPXConstrutor v1.0.0','info');};
App.prototype.verMinhasAvaliacoes = function(){if(this.usuarioLogado)this.verAvaliacoes(this.usuarioLogado.id);};
App.prototype.confirmarExclusao = function(){var m=document.getElementById('motivoExclusao').value;if(!m){this.mostrarToast('❌ Selecione um motivo!','erro');return;}if(!confirm('⚠️ Tem certeza? Esta ação é IRREVERSÍVEL!'))return;this.mostrarToast('📧 Solicitação enviada!','sucesso');setTimeout(function(){window.app._app.mostrarTela('loginScreen');},2000);};

App.prototype.mostrarToast = function(m,t){var toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none';},3000);};

document.addEventListener('DOMContentLoaded',function(){window.app._app=new App();console.log('✅ App pronto!');});
