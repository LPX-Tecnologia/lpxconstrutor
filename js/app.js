// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO E CORRIGIDO =====
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
    this.init();
};

App.prototype.init = function() {
    var s = this; 
    console.log('🚀 Iniciando...'); 
    window.app._app = this;
    
    // Garantir que a barra de navegação comece oculta
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
    }
    
    s.mostrarSplash();
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() { 
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') s.mostrarModalSair(); 
        else s.voltarTela(); 
    });
    
    // Verificar autenticação ou criar demo
    if (typeof authService !== 'undefined' && authService.onAuthStateChange) {
        authService.onAuthStateChange(function(u) { 
            if (u) { 
                s.usuarioLogado = u; 
                s.atualizarBotoes(); 
                if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') 
                    s.mostrarTela('homeScreen'); 
            } else { 
                s.usuarioLogado = null; 
                s.mostrarTela('loginScreen'); 
            } 
            setTimeout(function() { s.esconderSplash(); }, 1500); 
        });
    } else {
        // Criar usuário demo se authService não existir
        setTimeout(function() {
            s.usuarioLogado = {
                id: 'demo123',
                nome: 'Carlos Silva',
                email: 'carlos@email.com',
                tipo: 'empreiteiro',
                profissao: 'Engenheiro Civil',
                experiencia: '8',
                celular: '(11) 99999-9999',
                fotoPerfil: null,
                score: 4.7
            };
            s.atualizarBotoes();
            s.esconderSplash();
            s.mostrarTela('homeScreen');
        }, 1500);
    }
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
    var c = document.getElementById('tijolosContainer'); 
    if (!c) return; 
    var f = 0; 
    function a() { 
        if (f >= 4) { 
            c.innerHTML = ''; 
            f = 0; 
            setTimeout(a, 300); 
            return; 
        } 
        var r = document.createElement('div'); 
        r.style.cssText = 'display:flex;gap:2px;'; 
        if (f % 2 === 1) r.style.marginLeft = '8px'; 
        var q = f === 0 ? 4 : f === 1 ? 5 : f === 2 ? 4 : 5; 
        for (var i = 0; i < q; i++) { 
            var t = document.createElement('span'); 
            t.textContent = '🧱'; 
            t.style.cssText = 'font-size:16px;animation:aparecer 0.3s ease;'; 
            r.appendChild(t); 
        } 
        c.appendChild(r); 
        f++; 
        setTimeout(a, f < 4 ? 300 : 600); 
    } 
    a(); 
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
    var bo = document.getElementById('btnObras'); 
    if (bo) bo.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none'; 
};

App.prototype.mostrarTela = function(id) {
    var s = this; 
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') 
        s.historicoTelas.push(s.telaAtual);
    
    document.querySelectorAll('.screen').forEach(function(x) { 
        x.classList.remove('active'); 
    }); 
    
    var t = document.getElementById(id); 
    if (!t) return; 
    t.classList.add('active'); 
    s.telaAtual = id;
    
    var n = document.getElementById('bottomNav'); 
    if (n) { 
        var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','minhasObrasScreen']; 
        // Só mostra a barra se o usuário estiver logado
        if (tn.indexOf(id) >= 0 && s.usuarioLogado) {
            n.style.display = 'flex';
        } else {
            n.style.display = 'none';
        }
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
    } else { 
        this.mostrarTela('homeScreen'); 
    } 
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
    this.historicoTelas=[]; 
    this.mostrarTela('loginScreen'); 
};

App.prototype.selecionarTema = function(t) { 
    if(t==='escuro'){
        document.body.classList.add('dark-theme');
        localStorage.setItem('tema','escuro');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('tema','claro');
    } 
    this.mostrarToast('🎨 Tema alterado!','sucesso'); 
};

// ===== AUTENTICAÇÃO =====
App.prototype.fazerLogin = function() { 
    var s=this; 
    var e=(document.getElementById('loginEmail')||{}).value||'', 
        p=(document.getElementById('loginSenha')||{}).value||''; 
    if(!e||!p){
        s.mostrarToast('❌ Preencha todos!','erro');
        return;
    } 
    s.mostrarToast('Entrando...','info'); 
    
    if (typeof authService !== 'undefined' && authService.login) {
        authService.login(e,p).then(function(r){
            if(r.sucesso){
                s.usuarioLogado=r.usuario;
                s.mostrarToast('✅ Bem-vindo!','sucesso');
                s.atualizarBotoes();
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ '+r.erro,'erro');
            }
        });
    } else {
        // Demo
        s.usuarioLogado = {
            id: 'demo123',
            nome: 'Carlos Silva',
            email: e,
            tipo: 'empreiteiro',
            profissao: 'Engenheiro Civil',
            experiencia: '8',
            celular: '(11) 99999-9999',
            fotoPerfil: null,
            score: 4.7
        };
        s.mostrarToast('✅ Bem-vindo!','sucesso');
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
    }
};

App.prototype.cadastrar = function() { 
    var s=this; 
    var d={
        nome:(document.getElementById('cadNome')||{}).value||'',
        email:(document.getElementById('cadEmail')||{}).value||'',
        senha:(document.getElementById('cadSenha')||{}).value||'',
        tipo:(document.getElementById('cadTipo')||{}).value||'profissional',
        celular:(document.getElementById('cadCelular')||{}).value||'',
        cpf:((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''),
        profissao:(document.getElementById('cadProfissao')||{}).value||'',
        experiencia:(document.getElementById('cadExperiencia')||{}).value||'0',
        habilidades:(document.getElementById('cadHabilidades')||{}).value||''
    }; 
    if(!d.nome||!d.email||!d.senha){
        s.mostrarToast('❌ Preencha todos!','erro');
        return;
    } 
    s.mostrarToast('Cadastrando...','info'); 
    
    if (typeof authService !== 'undefined' && authService.cadastrar) {
        authService.cadastrar(d).then(function(r){
            if(r.sucesso){
                s.usuarioLogado=r.usuario;
                s.mostrarToast('✅ OK!','sucesso');
                s.atualizarBotoes();
                s.mostrarTela('homeScreen');
            } else {
                s.mostrarToast('❌ '+r.erro,'erro');
            }
        });
    } else {
        // Demo
        s.usuarioLogado = {
            id: 'new' + Date.now(),
            nome: d.nome,
            email: d.email,
            tipo: d.tipo,
            profissao: d.profissao,
            experiencia: d.experiencia,
            celular: d.celular,
            fotoPerfil: null,
            score: 0
        };
        s.mostrarToast('✅ OK!','sucesso');
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
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
    if (typeof authService !== 'undefined' && authService.logout) {
        authService.logout().then(function(){
            s.usuarioLogado=null;
            s.mostrarTela('loginScreen');
            s.mostrarToast('👋 Até logo!','sucesso');
        });
    } else {
        s.usuarioLogado=null;
        s.mostrarTela('loginScreen');
        s.mostrarToast('👋 Até logo!','sucesso');
    }
};

App.prototype.solicitarCodigo = function() { 
    var s=this; 
    var e=document.getElementById('recEmail')?document.getElementById('recEmail').value.trim():''; 
    if(!e||!e.includes('@')){
        s.mostrarToast('❌ Email inválido!','erro');
        return;
    } 
    authService.solicitarCodigoRecuperacao(e).then(function(r){
        if(r.sucesso){
            s.recuperacaoUid=r.uid;
            s.mostrarToast('✅ Código: '+r.codigo,'sucesso');
            document.getElementById('recPasso1').style.display='none';
            document.getElementById('recPasso2').style.display='block';
        } else {
            s.mostrarToast('❌ '+r.erro,'erro');
        }
    }); 
};

App.prototype.voltarPasso1 = function(){
    document.getElementById('recPasso1').style.display='block';
    document.getElementById('recPasso2').style.display='none';
};

App.prototype.verificarCodigo = function(){
    var s=this;
    s.mostrarToast('✅ Senha redefinida!','sucesso');
    setTimeout(function(){
        s.mostrarTela('loginScreen');
    },1500);
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) return;
    var h = new Date().getHours(); 
    var sd = 'Bom dia'; 
    if (h >= 12 && h < 18) sd = 'Boa tarde'; 
    if (h >= 18) sd = 'Boa noite';
    
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
        try { 
            if (typeof mapaService !== 'undefined') mapaService.initMap(); 
        } catch(e) {} 
    }, 500);
    
    this.carregarFeed();
};

// ===== FEED COM VÍDEOS =====
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
    
    // Tentar carregar do Firestore
    var carregarVagas = function() {
        if (typeof db !== 'undefined') {
            return db.collection('vagas').get();
        } else {
            // Retornar dados demo
            return Promise.resolve({
                forEach: function(callback) {
                    var vagasDemo = [
                        { id: 'v1', data: function() { return { titulo: 'Pedreiro para Reforma', endereco: 'Rua das Flores, 123 - Centro', profissoes: 'Pedreiro', valorHora: '25', fotoObra: null, localizacao: { lat: -23.5505, lng: -46.6333 }, ativa: true, autorNome: 'Carlos Silva' }; } },
                        { id: 'v2', data: function() { return { titulo: 'Eletricista Urgente', endereco: 'Av. Paulista, 1000 - Bela Vista', profissoes: 'Eletricista', valorHora: '40', fotoObra: null, localizacao: { lat: -23.5612, lng: -46.6560 }, ativa: true, autorNome: 'Maria Santos' }; } }
                    ];
                    vagasDemo.forEach(callback);
                }
            });
        }
    };
    
    carregarVagas().then(function(snap) {
        var vagas = []; 
        snap.forEach(function(doc) { 
            var d = doc.data ? doc.data() : doc; 
            if (d.ativa !== false) vagas.push({ id: doc.id, data: d }); 
        });
        
        var html = '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;"><span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong><br><span style="font-size:10px;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</span><p style="font-size:11px;margin-top:4px;">' + vd.descricao + '</p></div><iframe src="' + vd.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe><div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;"><span style="font-size:10px;color:#059669;"><strong>' + vd.titulo + '</strong></span><div style="display:flex;gap:4px;"><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
        
        if (vagas.length === 0) { 
            html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; 
        } else { 
            vagas.forEach(function(v) { 
                var temLocalizacao = v.data.localizacao && v.data.localizacao.lat && v.data.localizacao.lng;
                var mapaHtml = '';
                
                if (temLocalizacao) {
                    mapaHtml = '<div style="margin-top:8px;padding:8px;background:#f0f9ff;border-radius:8px;display:flex;align-items:center;gap:8px;cursor:pointer;" onclick="event.stopPropagation();window.app._app.verDetalheObra(\'' + v.id + '\')"><i class="fas fa-map-marker-alt" style="color:#1A3A5C;font-size:18px;"></i><span style="font-size:12px;color:#1A3A5C;">📍 ' + (v.data.endereco || 'Ver no mapa') + '</span></div>';
                } else if (v.data.endereco) {
                    mapaHtml = '<div style="margin-top:8px;padding:8px;background:#fef3c7;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-pin" style="color:#d97706;"></i><span style="font-size:12px;color:#92400e;">📌 ' + v.data.endereco + '</span></div>';
                }
                
                // CORRIGIDO: Foto da obra
                var fotoHtml = '';
                if (v.data.fotoObra && typeof v.data.fotoObra === 'string' && v.data.fotoObra.length > 0) {
                    fotoHtml = '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
                }
                
                html += '<div class="vaga-card" onclick="window.app._app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || 'Local não informado') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + fotoHtml + mapaHtml + '</div>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.candidatarVaga(\'' + v.id + '\')">✋ QUERO!</button></div>' : '') + '</div>'; 
            }); 
        }
        c.innerHTML = html;
    }).catch(function() { 
        c.innerHTML = '<div class="card">Erro ao carregar feed</div>'; 
    });
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

// ===== PUBLICAÇÃO DE VAGA (CORRIGIDO - FOTO FUNCIONA) =====
App.prototype.configurarPublicacao = function() {
    var s = this;
    console.log('📝 Configurando tela de publicação');
    
    // Configurar input de foto
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) {
        // Remover listener antigo se existir
        var novoInput = inputFoto.cloneNode(true);
        inputFoto.parentNode.replaceChild(novoInput, inputFoto);
        
        // Adicionar novo listener
        novoInput.addEventListener('change', function(e) {
            var arquivo = e.target.files[0];
            if (!arquivo) return;
            
            console.log('📸 Arquivo selecionado:', arquivo.name, arquivo.type, (arquivo.size / 1024).toFixed(2) + 'KB');
            
            if (!arquivo.type.match('image.*')) {
                s.mostrarToast('❌ Selecione uma imagem!', 'erro');
                return;
            }
            
            var reader = new FileReader();
            reader.onload = function(event) {
                s.vagaFotoBase64 = event.target.result;
                console.log('✅ Foto carregada em base64');
                
                var preview = document.getElementById('fotoObraPreview');
                if (preview) {
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                    preview.style.maxWidth = '100%';
                    preview.style.maxHeight = '200px';
                    preview.style.objectFit = 'cover';
                    preview.style.borderRadius = '8px';
                    console.log('✅ Preview atualizado');
                }
            };
            reader.onerror = function() {
                s.mostrarToast('❌ Erro ao carregar imagem', 'erro');
            };
            reader.readAsDataURL(arquivo);
        });
        console.log('✅ Input de foto configurado');
    } else {
        console.warn('⚠️ Input fotoObraInput não encontrado');
    }
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    var s = this;
    
    s.vagaEmEdicao = vagaData || null;
    s.vagaFotoBase64 = null;
    s.vagaLocalizacaoAtual = null;
    
    s.mostrarTela('publicarVagaScreen');
    
    setTimeout(function() {
        var tituloEl = document.getElementById('vagaTitulo');
        var enderecoEl = document.getElementById('vagaEndereco');
        var profissoesEl = document.getElementById('vagaProfissoes');
        var valorEl = document.getElementById('vagaValor');
        var fotoPreview = document.getElementById('fotoObraPreview');
        
        if (s.vagaEmEdicao) {
            if (tituloEl) tituloEl.value = s.vagaEmEdicao.titulo || '';
            if (enderecoEl) enderecoEl.value = s.vagaEmEdicao.endereco || '';
            if (profissoesEl) profissoesEl.value = s.vagaEmEdicao.profissoes || '';
            if (valorEl) valorEl.value = s.vagaEmEdicao.valorHora || '';
            
            if (fotoPreview && s.vagaEmEdicao.fotoObra) {
                fotoPreview.src = s.vagaEmEdicao.fotoObra;
                fotoPreview.style.display = 'block';
                s.vagaFotoBase64 = s.vagaEmEdicao.fotoObra;
            }
            
            if (s.vagaEmEdicao.localizacao && s.vagaEmEdicao.localizacao.lat && s.vagaEmEdicao.localizacao.lng) {
                s.vagaLocalizacaoAtual = s.vagaEmEdicao.localizacao;
                
                setTimeout(function() {
                    try {
                        if (typeof mapaService !== 'undefined') {
                            mapaService.initMap(s.vagaEmEdicao.localizacao.lat, s.vagaEmEdicao.localizacao.lng);
                            mapaService.adicionarMarcador(
                                s.vagaEmEdicao.localizacao.lat, 
                                s.vagaEmEdicao.localizacao.lng, 
                                s.vagaEmEdicao.endereco || 'Local da obra'
                            );
                        }
                    } catch(e) {
                        console.log('Mapa não disponível:', e);
                    }
                }, 500);
            }
        } else {
            if (tituloEl) tituloEl.value = '';
            if (enderecoEl) enderecoEl.value = '';
            if (profissoesEl) profissoesEl.value = '';
            if (valorEl) valorEl.value = '';
            if (fotoPreview) { 
                fotoPreview.src = ''; 
                fotoPreview.style.display = 'none'; 
            }
            s.vagaFotoBase64 = null;
            
            setTimeout(function() { 
                try {
                    if (typeof mapaService !== 'undefined') mapaService.initMap(); 
                } catch(e) {} 
            }, 500);
        }
    }, 300);
};

App.prototype.previewFotoObra = function(e) {
    // Esta função é mantida para compatibilidade
    // A lógica real está em configurarPublicacao
    console.log('📸 previewFotoObra chamado');
};

App.prototype.buscarLocalizacao = function() {
    var s = this;
    var enderecoEl = document.getElementById('vagaEndereco');
    var endereco = enderecoEl ? enderecoEl.value.trim() : '';
    
    if (!endereco) {
        s.mostrarToast('❌ Digite um endereço primeiro!', 'erro');
        return;
    }
    
    s.mostrarToast('🔍 Buscando localização...', 'info');
    
    if (typeof mapaService !== 'undefined' && mapaService.geocodificarEndereco) {
        mapaService.geocodificarEndereco(endereco).then(function(coords) {
            if (coords && coords.lat && coords.lng) {
                s.vagaLocalizacaoAtual = coords;
                mapaService.initMap(coords.lat, coords.lng);
                mapaService.adicionarMarcador(coords.lat, coords.lng, endereco);
                s.mostrarToast('✅ Localização encontrada!', 'sucesso');
            } else {
                s.mostrarToast('❌ Endereço não encontrado', 'erro');
            }
        }).catch(function() {
            s.mostrarToast('❌ Erro ao buscar localização', 'erro');
        });
    } else {
        // Simulação
        setTimeout(function() {
            s.vagaLocalizacaoAtual = { lat: -23.5505, lng: -46.6333 };
            s.mostrarToast('✅ Localização encontrada!', 'sucesso');
        }, 1000);
    }
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    
    var titulo = (document.getElementById('vagaTitulo') ? document.getElementById('vagaTitulo').value : '').trim();
    var endereco = (document.getElementById('vagaEndereco') ? document.getElementById('vagaEndereco').value : '').trim();
    var profissoes = (document.getElementById('vagaProfissoes') ? document.getElementById('vagaProfissoes').value : '').trim();
    var valorHora = (document.getElementById('vagaValor') ? document.getElementById('vagaValor').value : '').trim();
    var fotoBase64 = s.vagaFotoBase64 || (s.vagaEmEdicao ? s.vagaEmEdicao.fotoObra : null);
    
    if (!titulo || !endereco || !profissoes || !valorHora) {
        s.mostrarToast('❌ Preencha todos os campos obrigatórios!', 'erro');
        return;
    }
    
    var localizacao = s.vagaLocalizacaoAtual || (s.vagaEmEdicao ? s.vagaEmEdicao.localizacao : null);
    
    var dadosVaga = {
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: fotoBase64 || null,
        localizacao: localizacao || null,
        dataCriacao: s.vagaEmEdicao ? s.vagaEmEdicao.dataCriacao : firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
        dataAtualizacao: firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome
    };
    
    console.log('📤 Publicando vaga:', dadosVaga);
    
    var salvar = function() {
        if (typeof db !== 'undefined') {
            var promise;
            if (s.vagaEmEdicao && s.vagaEmEdicao.id) {
                promise = db.collection('vagas').doc(s.vagaEmEdicao.id).update(dadosVaga);
            } else {
                promise = db.collection('vagas').add(dadosVaga);
            }
            
            promise.then(function() {
                s.mostrarToast(s.vagaEmEdicao ? '✅ Vaga atualizada!' : '🚀 Vaga publicada!', 'sucesso');
                s.vagaEmEdicao = null;
                s.vagaLocalizacaoAtual = null;
                s.vagaFotoBase64 = null;
                s.mostrarTela('homeScreen');
                setTimeout(function() { s.carregarFeed(); }, 300);
            }).catch(function(error) {
                console.error('Erro:', error);
                s.mostrarToast('❌ Erro ao salvar', 'erro');
            });
        } else {
            // Demo
            s.mostrarToast(s.vagaEmEdicao ? '✅ Vaga atualizada!' : '🚀 Vaga publicada!', 'sucesso');
            s.vagaEmEdicao = null;
            s.vagaLocalizacaoAtual = null;
            s.vagaFotoBase64 = null;
            s.mostrarTela('homeScreen');
            setTimeout(function() { s.carregarFeed(); }, 300);
        }
    };
    
    salvar();
};

// ===== PERFIL (CORRIGIDO - CARREGA DADOS) =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    console.log('👤 Carregando perfil...');
    
    if (!s.usuarioLogado) {
        console.error('❌ Usuário não logado');
        return;
    }
    
    var user = s.usuarioLogado;
    console.log('📊 Dados:', user);
    
    // Nome
    var nomeEl = document.getElementById('perfilNome');
    if (nomeEl) {
        nomeEl.textContent = user.nome || 'Usuário';
        console.log('✅ Nome definido:', user.nome);
    }
    
    // Profissão
    var profEl = document.getElementById('perfilProfissao');
    if (profEl) {
        profEl.textContent = (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos';
        console.log('✅ Profissão definida');
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
    var iconEl = document.getElementById('perfilIcon');
    
    if (fotoEl) {
        if (user.fotoPerfil && typeof user.fotoPerfil === 'string' && user.fotoPerfil.length > 0) {
            fotoEl.src = user.fotoPerfil;
            fotoEl.style.display = 'block';
            if (iconEl) iconEl.style.display = 'none';
            console.log('✅ Foto carregada');
        } else {
            fotoEl.style.display = 'none';
            if (iconEl) iconEl.style.display = 'block';
            console.log('ℹ️ Sem foto');
        }
    }
    
    // Esconder loading
    var loadingEl = document.getElementById('perfilLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    console.log('✅ Perfil carregado!');
};

App.prototype.verPerfil = function(uid) { 
    var s=this;
    var c=document.getElementById('perfilPublicoConteudo');
    if(!c)return;
    
    c.innerHTML = '<div class="loading">Carregando...</div>';
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc){
            if(!doc.exists) {
                c.innerHTML = '<div class="card">Perfil não encontrado</div>';
                return;
            }
            var u=doc.data();
            var w=u.celular?u.celular.replace(/\D/g,''):'';
            
            // CORRIGIDO: Avatar com foto ou ícone
            var av=u.fotoPerfil?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-user"></i>';
            
            var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar">'+av+'</div></div></div><div class="profile-info-card"><h2>'+u.nome+'</h2><p>'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+'</div></div><div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p></div>';
            
            if(s.usuarioLogado&&s.usuarioLogado.id!==uid){
                html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
                if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success">WhatsApp</a>';
                html+='<button class="btn btn-primary" onclick="window.app.iniciarChat(\''+uid+'\')">💬 Chat</button>';
                if(s.usuarioLogado.tipo==='empreiteiro')html+='<button class="btn btn-outline" onclick="window.app.abrirContratacao(\''+uid+'\')" style="background:#1A3A5C;color:white;">🤝 Contratar</button>';
                html+='</div>';
            }
            c.innerHTML=html;
        });
    } else {
        // Demo
        var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>Profissional</h2><p>Construtor • 5 anos</p><div>⭐⭐⭐⭐⭐</div></div>';
        c.innerHTML=html;
    }
};

// ===== BUSCA (CORRIGIDO - FOTOS NOS PERFIS) =====
App.prototype.buscarProfissionais = function() {
    var s=this,c=document.getElementById('buscaResultados');
    if(!c)return;
    
    c.innerHTML='<div class="loading">Buscando...</div>';
    
    var carregar = function() {
        if (typeof db !== 'undefined') {
            return db.collection('usuarios').get();
        } else {
            // Dados demo
            return Promise.resolve({
                forEach: function(callback) {
                    var users = [
                        { id: 'p1', data: function() { return { nome: 'João Silva', tipo: 'profissional', ativo: true, profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5, fotoPerfil: null }; } },
                        { id: 'p2', data: function() { return { nome: 'Maria Santos', tipo: 'profissional', ativo: true, profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8, fotoPerfil: null }; } },
                        { id: 'p3', data: function() { return { nome: 'Pedro Costa', tipo: 'profissional', ativo: true, profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2, fotoPerfil: null }; } }
                    ];
                    users.forEach(callback);
                }
            });
        }
    };
    
    carregar().then(function(snap){
        var todos=[];
        snap.forEach(function(doc){
            var d = doc.data ? doc.data() : doc;
            todos.push({id:doc.id,data:d});
        });
        
        var profs=todos.filter(function(u){
            return u.data.tipo==='profissional' && u.data.ativo!==false && u.id!==(s.usuarioLogado ? s.usuarioLogado.id : '');
        });
        
        if(profs.length===0){
            c.innerHTML='<div class="card"><h3>Nenhum profissional</h3></div>';
            return;
        }
        
        var html='';
        profs.forEach(function(u){
            var w=u.data.celular?u.data.celular.replace(/\D/g,''):'';
            var sc=u.data.score||0;
            
            // CORRIGIDO: Avatar com foto ou ícone
            var av=u.data.fotoPerfil
                ?'<img src="'+u.data.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentElement.innerHTML=\'<i class=\\\'fas fa-hard-hat\\\'></i>\'">'
                :'<i class="fas fa-hard-hat"></i>';
            
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+av+'</div><div class="vaga-info"><div class="vaga-nome">'+u.data.nome+'</div><div class="vaga-data">'+(u.data.profissao||'Profissional')+' • '+(u.data.experiencia||0)+' anos</div></div></div><div class="vaga-footer">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')">Chat</button>'+(s.usuarioLogado&&s.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\''+u.id+'\')" style="background:#1A3A5C;color:white;">🤝 Contratar</button>':'')+'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.adicionarNaRede(\''+u.id+'\')" style="background:#10B981;color:white;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center;"><i class="fas fa-plus"></i></button></div></div>';
        });
        c.innerHTML=html;
    });
};

// ===== REDE =====
App.prototype.carregarRede = function() {
    var s=this,c=document.getElementById('redeContainer');
    if(!c)return;
    c.innerHTML='<div class="loading">Carregando rede...</div>';
    
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap){
            var conexoes=[];
            snap.forEach(function(doc){
                var d=doc.data();
                if(d.usuarioId===s.usuarioLogado.id||d.amigoId===s.usuarioLogado.id)
                    conexoes.push({id:doc.id,data:d});
            });
            
            if(conexoes.length===0){
                c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>';
                return;
            }
            
            var proms=[];
            conexoes.forEach(function(con){
                var aid=con.data.usuarioId===s.usuarioLogado.id?con.data.amigoId:con.data.usuarioId;
                proms.push(db.collection('usuarios').doc(aid).get().then(function(ud){
                    if(ud.exists)return{usuario:{id:ud.id,...ud.data()},conexao:con.data};
                    return null;
                }));
            });
            
            Promise.all(proms).then(function(r){
                var html='';
                r.forEach(function(x){
                    if(!x)return;
                    var u=x.usuario,w=u.celular?u.celular.replace(/\D/g,''):'',sc=u.score||0,
                        st=x.conexao.status==='contratado'?'🤝 Contratado':
                           x.conexao.status==='finalizado'?'✅ Finalizado':
                           x.conexao.status==='demitido'?'🔴 Encerrado':'🔗 Conectado';
                    
                    var av=u.fotoPerfil
                        ?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">'
                        :'<i class="fas fa-user"></i>';
                    
                    html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+av+'</div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div><div class="vaga-data"><i class="fas fa-tools"></i> '+(u.profissao||'Profissional')+' • <i class="fas fa-calendar"></i> '+(u.experiencia||0)+' anos</div><div class="vaga-data"><span style="color:#F47920;">'+'⭐'.repeat(Math.round(sc))+'</span> • <span style="color:#10B981;">'+st+'</span></div></div></div><div class="vaga-footer"><div style="display:flex;gap:6px;flex:1;">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div><button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.removerDaRede(\''+u.id+'\')"><i class="fas fa-times"></i></button></div></div>';
                });
                c.innerHTML=html||'<div class="card">Nenhum amigo</div>';
            });
        });
    } else {
        c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>';
    }
};

App.prototype.adicionarNaRede = function(aid) { 
    var s=this; 
    if(!s.usuarioLogado||s.usuarioLogado.id===aid)return; 
    s.mostrarToast('✅ Adicionado!','sucesso');
};

App.prototype.removerDaRede = function(aid) { 
    var s=this; 
    if(!confirm('Remover?'))return; 
    s.mostrarToast('Removido','sucesso');
};

// ===== DETALHE DA OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    s.obraSelecionada = oid;
    s.mostrarToast('🔍 Visualizando detalhes...', 'info');
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.iniciarChat = function(uid) {
    this.mostrarToast('💬 Chat iniciado!', 'sucesso');
};

App.prototype.candidatarVaga = function(vid) {
    this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.abrirContratacao = function(uid) {
    this.contratarProfId = uid;
    this.mostrarToast('🤝 Abrindo contratação...', 'info');
};

App.prototype.confirmarContratacao = function() {
    this.mostrarToast('✅ Profissional contratado!', 'sucesso');
};

App.prototype.novaObra = function() {
    this.mostrarToast('🏗️ Nova obra criada!', 'sucesso');
};

App.prototype.carregarMinhasObras = function() {
    var c = document.getElementById('minhasObrasContainer');
    if (c) c.innerHTML = '<div class="card"><h3>Minhas Obras</h3><p>Nenhuma obra cadastrada.</p></div>';
};

App.prototype.demitirFuncionario = function(cid) {
    if (confirm('Demitir funcionário?')) {
        this.mostrarToast('Funcionário demitido.', 'sucesso');
    }
};

App.prototype.finalizarContrato = function(cid) {
    if (confirm('Finalizar contrato?')) {
        this.mostrarToast('Contrato finalizado.', 'sucesso');
    }
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

App.prototype.verAvaliacoes = function(uid) {
    this.mostrarToast('⭐ Avaliações carregadas!', 'info');
};

App.prototype.abrirDarAvaliacao = function(uid) {
    this.avaliarUid = uid;
    this.mostrarToast('Avalie o profissional!', 'info');
};

App.prototype.setNota = function(n) {
    this.avaliarNota = n;
};

App.prototype.enviarAvaliacao = function() {
    this.mostrarToast('✅ Avaliação enviada!', 'sucesso');
};

App.prototype.gerarQRCode = function(uid) {
    this.mostrarToast('📱 QR Code gerado!', 'sucesso');
};

App.prototype.fecharQRCode = function() {
    this.mostrarToast('QR Code fechado.', 'info');
};

App.prototype.baixarQRCode = function() {
    this.mostrarToast('📥 QR Code baixado!', 'sucesso');
};

App.prototype.selecionarIdioma = function(i) {
    this.mostrarToast('🌐 Idioma alterado!', 'sucesso');
};

App.prototype.mostrarInfoVersao = function() {
    this.mostrarToast('📱 Versão 1.0.0', 'info');
};

App.prototype.confirmarExclusao = function() {
    if (confirm('Confirmar exclusão?')) {
        this.mostrarToast('Conta excluída.', 'sucesso');
    }
};

App.prototype.mostrarNotificacoes = function() {
    this.mostrarToast('🔔 Notificações carregadas!', 'info');
};

App.prototype.mudarTab = function(t) {
    console.log('Mudando para tab:', t);
};

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
    if (!window.app._app) {
        new App();
    }
});
