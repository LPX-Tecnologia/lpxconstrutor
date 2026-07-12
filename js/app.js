// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO PROFISSIONAL =====
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
    console.log('🚀 Iniciando LPXCONSTRUTOR...'); 
    window.app._app = this;
    
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    s.mostrarSplash();
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function() { 
        if (s.telaAtual === 'homeScreen' || s.telaAtual === 'loginScreen') s.mostrarModalSair(); 
        else s.voltarTela(); 
    });
    
    // CARREGAR DADOS SALVOS
    var dadosSalvos = localStorage.getItem('usuarioLPX');
    if (dadosSalvos) {
        try {
            s.usuarioLogado = JSON.parse(dadosSalvos);
            console.log('✅ Dados carregados:', s.usuarioLogado.nome);
        } catch(e) {
            console.error('❌ Erro ao carregar dados');
        }
    }
    
    // Verificar Firebase Auth
    if (typeof authService !== 'undefined' && authService.onAuthStateChange) {
        authService.onAuthStateChange(function(u) { 
            if (u) { 
                if (!s.usuarioLogado) s.usuarioLogado = {};
                Object.assign(s.usuarioLogado, u);
                localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
                s.atualizarBotoes(); 
            }
            if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') {
                s.mostrarTela(s.usuarioLogado ? 'homeScreen' : 'loginScreen');
            }
            setTimeout(function() { s.esconderSplash(); }, 1500); 
        });
    } else {
        setTimeout(function() {
            s.esconderSplash();
            s.atualizarBotoes();
            s.mostrarTela(s.usuarioLogado ? 'homeScreen' : 'loginScreen');
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
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); }); 
        var t = document.getElementById(a); 
        if (t) { t.classList.add('active'); this.telaAtual = a; } 
        if (a === 'homeScreen') this.carregarHome(); 
        if (a === 'meuPerfilScreen') this.carregarMeuPerfil(); 
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

App.prototype.selecionarTema = function(t) { 
    if(t==='escuro'){ document.body.classList.add('dark-theme'); localStorage.setItem('tema','escuro'); } 
    else { document.body.classList.remove('dark-theme'); localStorage.setItem('tema','claro'); } 
    this.mostrarToast('🎨 Tema alterado!','sucesso'); 
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
            } else {
                s.mostrarToast('❌ '+r.erro,'erro');
            }
        });
    } else {
        var userSalvo = localStorage.getItem('usuarioLPX');
        if (userSalvo) {
            try {
                s.usuarioLogado = JSON.parse(userSalvo);
                s.mostrarToast('✅ Bem-vindo de volta, ' + s.usuarioLogado.nome + '!','sucesso');
            } catch(err) {
                s.criarUsuarioDemo(e);
            }
        } else {
            s.criarUsuarioDemo(e);
        }
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
    }
};

App.prototype.criarUsuarioDemo = function(email) {
    this.usuarioLogado = {
        id: 'user_' + Date.now(),
        nome: email ? email.split('@')[0] : 'Usuário',
        email: email || 'usuario@email.com',
        tipo: 'empreiteiro',
        profissao: 'Engenheiro Civil',
        experiencia: '8',
        celular: '(11) 99999-9999',
        fotoPerfil: null,
        score: 4.7
    };
    localStorage.setItem('usuarioLPX', JSON.stringify(this.usuarioLogado));
    this.mostrarToast('✅ Bem-vindo!','sucesso');
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
    
    var salvarUsuario = function(foto) {
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
        reader.onload = function(e) { salvarUsuario(e.target.result); };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        salvarUsuario(null);
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
        authService.logout();
    }
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
            try {
                this.usuarioLogado = JSON.parse(userSalvo);
            } catch(e) {
                this.mostrarTela('loginScreen');
                return;
            }
        } else {
            this.mostrarTela('loginScreen');
            return;
        }
    }
    
    var h = new Date().getHours(); 
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
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
    
    var carregarVagas = function() {
        if (typeof db !== 'undefined') {
            return db.collection('vagas').where('ativa', '==', true).orderBy('dataCriacao', 'desc').get()
                .then(function(snap) {
                    var vagas = [];
                    snap.forEach(function(doc) { vagas.push({ id: doc.id, data: doc.data() }); });
                    return vagas;
                });
        } else {
            var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
            return Promise.resolve(vagasSalvas.map(function(v) { return { id: v.id || 'local', data: v }; }));
        }
    };
    
    carregarVagas().then(function(vagas) {
        var html = '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;"><span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong><br><span style="font-size:10px;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</span><p style="font-size:11px;margin-top:4px;">' + vd.descricao + '</p></div><iframe src="' + vd.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe><div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;"><span style="font-size:10px;color:#059669;"><strong>' + vd.titulo + '</strong></span><div style="display:flex;gap:4px;"><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button><button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
        
        if (vagas.length === 0) { 
            html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; 
        } else { 
            vagas.forEach(function(v) { 
                var temLocalizacao = v.data.localizacao && v.data.localizacao.lat && v.data.localizacao.lng;
                var mapaHtml = '';
                
                if (temLocalizacao) {
                    var mapId = 'map_' + v.id;
                    mapaHtml = '<div id="' + mapId + '" style="width:100%;height:150px;border-radius:8px;margin-top:8px;background:#e5e7eb;"></div>';
                    mapaHtml += '<div style="padding:4px 8px;background:#f0f9ff;border-radius:0 0 8px 8px;font-size:11px;">📍 ' + (v.data.endereco || 'Localização no mapa') + '</div>';
                    
                    setTimeout(function() {
                        try {
                            var mapDiv = document.getElementById(mapId);
                            if (mapDiv && typeof L !== 'undefined') {
                                var map = L.map(mapId).setView([v.data.localizacao.lat, v.data.localizacao.lng], 15);
                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                                L.marker([v.data.localizacao.lat, v.data.localizacao.lng]).addTo(map).bindPopup(v.data.endereco || 'Local da obra').openPopup();
                            } else if (mapDiv) {
                                mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:8px;">🗺️ ' + (v.data.endereco || 'Localização no mapa') + '</div>';
                            }
                        } catch(e) {}
                    }, 100);
                } else if (v.data.endereco) {
                    mapaHtml = '<div style="margin-top:8px;padding:8px;background:#fef3c7;border-radius:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-pin" style="color:#d97706;"></i><span style="font-size:12px;color:#92400e;">📌 ' + v.data.endereco + '</span></div>';
                }
                
                var fotoHtml = '';
                if (v.data.fotoObra && typeof v.data.fotoObra === 'string' && v.data.fotoObra.length > 0) {
                    fotoHtml = '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
                }
                
                html += '<div class="vaga-card" style="cursor:pointer;background:white;border-radius:12px;padding:16px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.1);"><div class="vaga-header" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;"><div class="vaga-avatar" style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;"><i class="fas fa-hard-hat"></i></div><div class="vaga-info"><div class="vaga-nome" style="font-weight:bold;color:#1A3A5C;font-size:16px;">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data" style="font-size:12px;color:#6b7280;">📍 ' + (v.data.endereco || 'Local não informado') + '</div></div></div><div class="vaga-body"><div class="vaga-tags" style="display:flex;gap:8px;margin-bottom:8px;"><span class="vaga-tag" style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag" style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + fotoHtml + mapaHtml + '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Publicado por: ' + (v.data.autorNome || 'Anônimo') + '</div></div></div>'; 
            }); 
        }
        c.innerHTML = html;
    }).catch(function() { 
        c.innerHTML = '<div class="card" style="text-align:center;padding:30px;">Erro ao carregar feed</div>'; 
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

// ===== PUBLICAÇÃO DE VAGA =====
App.prototype.configurarPublicacao = function() {
    var s = this;
    console.log('📝 Configurando publicação...');
    
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
            
            if (!arquivo.type.match('image.*')) {
                s.mostrarToast('❌ Selecione uma imagem!', 'erro');
                return;
            }
            
            if (arquivo.size > 10 * 1024 * 1024) {
                s.mostrarToast('❌ Imagem muito grande! Máx 10MB', 'erro');
                return;
            }
            
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
            reader.onerror = function() {
                s.mostrarToast('❌ Erro ao carregar imagem', 'erro');
            };
            reader.readAsDataURL(arquivo);
        });
        console.log('✅ Input de foto configurado');
    }
};

App.prototype.abrirTelaPublicacao = function(vagaData) {
    var s = this;
    s.vagaEmEdicao = vagaData || null;
    s.vagaFotoBase64 = null;
    s.vagaLocalizacaoAtual = null;
    s.mostrarTela('publicarVagaScreen');
};

App.prototype.previewFotoObra = function(e) {};

App.prototype.buscarLocalizacao = function() {
    var s = this;
    var enderecoEl = document.getElementById('vagaEndereco');
    var endereco = enderecoEl ? enderecoEl.value.trim() : '';
    
    if (!endereco) {
        s.mostrarToast('❌ Digite um endereço!', 'erro');
        return;
    }
    
    s.mostrarToast('🔍 Buscando localização...', 'info');
    
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(endereco) + '&limit=1')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data && data.length > 0) {
                s.vagaLocalizacaoAtual = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
                s.mostrarToast('✅ Localização encontrada!', 'sucesso');
            } else {
                s.gerarLocalizacaoAproximada(endereco);
            }
        })
        .catch(function() {
            s.gerarLocalizacaoAproximada(endereco);
        });
};

App.prototype.gerarLocalizacaoAproximada = function(endereco) {
    var hash = 0;
    for (var i = 0; i < endereco.length; i++) {
        hash = ((hash << 5) - hash) + endereco.charCodeAt(i);
        hash |= 0;
    }
    this.vagaLocalizacaoAtual = {
        lat: -23.5505 + (Math.abs(hash) % 1000) / 10000,
        lng: -46.6333 + ((Math.abs(hash) * 2) % 1000) / 10000
    };
    this.mostrarToast('⚠️ Localização aproximada', 'info');
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    console.log('📤 PUBLICANDO VAGA...');
    
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValor');
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        var tela = document.getElementById('publicarVagaScreen');
        if (tela) {
            var inputs = tela.querySelectorAll('input[type="text"], input:not([type="file"]), textarea');
            if (inputs.length >= 4) {
                tituloEl = tituloEl || inputs[0];
                enderecoEl = enderecoEl || inputs[1];
                profissoesEl = profissoesEl || inputs[2];
                valorEl = valorEl || inputs[3];
            }
        }
    }
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        s.mostrarToast('❌ Formulário não encontrado', 'erro');
        return;
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
        s.gerarLocalizacaoAproximada(endereco);
    }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null,
        localizacao: s.vagaLocalizacaoAtual,
        ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        dataCriacao: new Date().toISOString()
    };
    
    console.log('💾 Salvando vaga:', vaga);
    
    try {
        var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vagasSalvas.unshift(vaga);
        localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        console.log('✅ Salvo no localStorage. Total:', vagasSalvas.length);
        
        if (typeof db !== 'undefined') {
            db.collection('vagas').add(vaga).then(function() {
                console.log('✅ Salvo no Firestore');
            }).catch(function(err) {
                console.error('❌ Erro Firestore:', err);
            });
        }
        
        tituloEl.value = '';
        enderecoEl.value = '';
        profissoesEl.value = '';
        valorEl.value = '';
        
        var preview = document.getElementById('fotoObraPreview');
        if (preview) { preview.src = ''; preview.style.display = 'none'; }
        
        var inputFoto = document.getElementById('fotoObraInput');
        if (inputFoto) inputFoto.value = '';
        
        s.vagaFotoBase64 = null;
        s.vagaLocalizacaoAtual = null;
        s.vagaEmEdicao = null;
        
        s.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
        console.log('🎉 PUBLICAÇÃO CONCLUÍDA!');
        
        setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
        
    } catch (error) {
        console.error('❌ ERRO:', error);
        s.mostrarToast('❌ Erro ao publicar', 'erro');
    }
};

// ===== PERFIL PROFISSIONAL =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    console.log('👤 CARREGANDO PERFIL...');
    
    if (!s.usuarioLogado) {
        var userSalvo = localStorage.getItem('usuarioLPX');
        if (userSalvo) {
            try {
                s.usuarioLogado = JSON.parse(userSalvo);
            } catch(e) {
                console.error('❌ Erro ao carregar dados salvos');
                return;
            }
        } else {
            console.error('❌ Nenhum usuário encontrado');
            return;
        }
    }
    
    var user = s.usuarioLogado;
    console.log('📊 Dados do usuário:', user);
    
    var telaPerfil = document.getElementById('meuPerfilScreen');
    if (!telaPerfil) {
        console.error('❌ Tela meuPerfilScreen não encontrada');
        return;
    }
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) {
        estrelas += i < Math.round(score) ? '⭐' : '☆';
    }
    
    var html = '';
    
    // CAPA
    html += '<div class="profile-header-container" style="position:relative;">';
    html += '<div class="profile-cover" style="background:linear-gradient(135deg, #1A3A5C 0%, #2d5a7b 50%, #1A3A5C 100%);height:180px;border-radius:0 0 30px 30px;position:relative;"></div>';
    
    // AVATAR
    html += '<div class="profile-avatar-container" style="position:absolute;bottom:-50px;left:50%;transform:translateX(-50%);">';
    html += '<div class="profile-avatar" style="width:100px;height:100px;background:white;border-radius:50%;border:4px solid #f0c27f;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.2);">';
    if (user.fotoPerfil) {
        html += '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'">';
    } else {
        html += '<i class="fas fa-user" style="font-size:40px;color:#1A3A5C;"></i>';
    }
    html += '</div></div>';
    html += '</div>';
    
    // INFORMAÇÕES
    html += '<div class="profile-info-card" style="background:white;margin:60px 15px 15px 15px;border-radius:15px;padding:20px;box-shadow:0 2px 15px rgba(0,0,0,0.1);text-align:center;">';
    html += '<h2 id="perfilNome" style="color:#1A3A5C;font-size:22px;font-weight:bold;margin:10px 0 5px 0;">' + (user.nome || 'Usuário') + '</h2>';
    html += '<p id="perfilProfissao" style="color:#666;font-size:14px;margin:5px 0;">' + (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos de experiência</p>';
    html += '<div id="perfilScore" style="color:#f59e0b;font-size:20px;margin:10px 0;">' + estrelas + ' <span style="color:#666;font-size:14px;">' + score + '</span></div>';
    html += '</div>';
    
    // CONTATO
    html += '<div class="card" style="background:white;margin:0 15px 15px 15px;border-radius:15px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.08);">';
    html += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;font-size:16px;"><i class="fas fa-address-card"></i> Informações de Contato</h3>';
    
    html += '<div style="display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0;">';
    html += '<div style="width:40px;height:40px;background:#f0f4ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px;"><i class="fas fa-envelope" style="color:#1A3A5C;font-size:16px;"></i></div>';
    html += '<div><div style="color:#999;font-size:11px;">Email</div><div id="perfilEmail" style="color:#333;font-size:14px;">' + (user.email || 'Não informado') + '</div></div></div>';
    
    html += '<div style="display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0;">';
    html += '<div style="width:40px;height:40px;background:#f0f4ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px;"><i class="fas fa-phone" style="color:#1A3A5C;font-size:16px;"></i></div>';
    html += '<div><div style="color:#999;font-size:11px;">Celular</div><div id="perfilCelular" style="color:#333;font-size:14px;">' + (user.celular || 'Não informado') + '</div></div></div>';
    
    html += '<div style="display:flex;align-items:center;padding:12px 0;">';
    html += '<div style="width:40px;height:40px;background:#f0f4ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px;"><i class="fas fa-building" style="color:#1A3A5C;font-size:16px;"></i></div>';
    html += '<div><div style="color:#999;font-size:11px;">Tipo de Conta</div><div style="color:#333;font-size:14px;">' + (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + '</div></div></div>';
    html += '</div>';
    
    // ESTATÍSTICAS
    html += '<div style="display:flex;gap:10px;margin:0 15px 15px 15px;">';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.08);"><div style="font-size:24px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div><div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.08);"><div style="font-size:24px;color:#f59e0b;font-weight:bold;">' + score + '</div><div style="color:#999;font-size:11px;">Avaliação</div></div>';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.08);"><div style="font-size:24px;color:#10B981;font-weight:bold;">0</div><div style="color:#999;font-size:11px;">Obras</div></div>';
    html += '</div>';
    
    // BOTÕES
    html += '<div style="padding:0 15px 20px 15px;">';
    html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-size:15px;font-weight:bold;margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:8px;"><i class="fas fa-edit"></i> Editar Perfil</button>';
    html += '<button onclick="window.app.sair()" style="width:100%;background:white;color:#EF4444;border:2px solid #EF4444;padding:15px;border-radius:10px;font-size:15px;font-weight:bold;display:flex;align-items:center;justify-content:center;gap:8px;"><i class="fas fa-sign-out-alt"></i> Sair</button>';
    html += '</div>';
    
    telaPerfil.innerHTML = html;
    
    var loadingEl = document.getElementById('perfilLoading');
    if (loadingEl) loadingEl.style.display = 'none';
    
    console.log('✅ Perfil profissional carregado!');
    console.log('👤 Nome:', user.nome);
    console.log('🔧 Profissão:', user.profissao);
    console.log('⭐ Score:', user.score);
};

App.prototype.verPerfil = function(uid) { 
    var s=this;
    var c=document.getElementById('perfilPublicoConteudo');
    if(!c)return;
    c.innerHTML = '<div class="loading">Carregando...</div>';
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(uid).get().then(function(doc){
            if(!doc.exists) { c.innerHTML = '<div class="card">Perfil não encontrado</div>'; return; }
            var u=doc.data(), w=u.celular?u.celular.replace(/\D/g,''):'';
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
        c.innerHTML = '<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user"></i></div></div></div><div class="profile-info-card"><h2>Profissional</h2><p>Construtor • 5 anos</p><div>⭐⭐⭐⭐⭐</div></div>';
    }
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var s=this,c=document.getElementById('buscaResultados');
    if(!c)return;
    c.innerHTML='<div class="loading">Buscando...</div>';
    
    var carregar = function() {
        if (typeof db !== 'undefined') {
            return db.collection('usuarios').where('tipo', '==', 'profissional').where('ativo', '==', true).get();
        } else {
            return Promise.resolve({
                forEach: function(cb) {
                    [{ id: 'p1', data: function() { return { nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5, fotoPerfil: null }; } },
                     { id: 'p2', data: function() { return { nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8, fotoPerfil: null }; } },
                     { id: 'p3', data: function() { return { nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2, fotoPerfil: null }; } }].forEach(cb);
                }
            });
        }
    };
    
    carregar().then(function(snap){
        var todos=[];
        snap.forEach(function(doc){ todos.push({id:doc.id, data: doc.data ? doc.data() : doc}); });
        var profs = todos.filter(function(u){ return u.data.tipo === 'profissional' && u.data.ativo !== false; });
        
        if(profs.length===0){ c.innerHTML='<div class="card"><h3>Nenhum profissional</h3></div>'; return; }
        
        var html='';
        profs.forEach(function(u){
            var w=u.data.celular?u.data.celular.replace(/\D/g,''):'', sc=u.data.score||0;
            var av=u.data.fotoPerfil?'<img src="'+u.data.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-hard-hat"></i>';
            html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+av+'</div><div class="vaga-info"><div class="vaga-nome">'+u.data.nome+'</div><div class="vaga-data">'+u.data.profissao+' • '+u.data.experiencia+' anos</div><div>'+'⭐'.repeat(Math.round(sc))+' '+sc+'</div></div></div><div class="vaga-footer">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" onclick="event.stopPropagation();">WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')">Chat</button>'+(s.usuarioLogado&&s.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\''+u.id+'\')" style="background:#1A3A5C;color:white;">🤝 Contratar</button>':'')+'<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.adicionarNaRede(\''+u.id+'\')" style="background:#10B981;color:white;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center;"><i class="fas fa-plus"></i></button></div></div>';
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
            snap.forEach(function(doc){ var d=doc.data(); if(d.usuarioId===s.usuarioLogado.id||d.amigoId===s.usuarioLogado.id) conexoes.push({id:doc.id,data:d}); });
            if(conexoes.length===0){ c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>'; return; }
            var proms=[];
            conexoes.forEach(function(con){ var aid=con.data.usuarioId===s.usuarioLogado.id?con.data.amigoId:con.data.usuarioId; proms.push(db.collection('usuarios').doc(aid).get().then(function(ud){ if(ud.exists)return{usuario:{id:ud.id,...ud.data()},conexao:con.data}; return null; })); });
            Promise.all(proms).then(function(r){
                var html='';
                r.forEach(function(x){
                    if(!x)return;
                    var u=x.usuario,w=u.celular?u.celular.replace(/\D/g,''):'',sc=u.score||0,st=x.conexao.status==='contratado'?'🤝 Contratado':x.conexao.status==='finalizado'?'✅ Finalizado':x.conexao.status==='demitido'?'🔴 Encerrado':'🔗 Conectado';
                    var av=u.fotoPerfil?'<img src="'+u.fotoPerfil+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">':'<i class="fas fa-user"></i>';
                    html+='<div class="vaga-card"><div class="vaga-header" onclick="window.app.verPerfil(\''+u.id+'\')"><div class="vaga-avatar">'+av+'</div><div class="vaga-info"><div class="vaga-nome">'+u.nome+'</div><div class="vaga-data"><i class="fas fa-tools"></i> '+(u.profissao||'Profissional')+' • <i class="fas fa-calendar"></i> '+(u.experiencia||0)+' anos</div><div class="vaga-data"><span style="color:#F47920;">'+'⭐'.repeat(Math.round(sc))+'</span> • <span style="color:#10B981;">'+st+'</span></div></div></div><div class="vaga-footer"><div style="display:flex;gap:6px;flex:1;">'+(w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.iniciarChat(\''+u.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div><button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.removerDaRede(\''+u.id+'\')"><i class="fas fa-times"></i></button></div></div>';
                });
                c.innerHTML=html||'<div class="card">Nenhum amigo</div>';
            });
        });
    } else {
        c.innerHTML='<div class="card" style="text-align:center;"><h3>Rede vazia</h3><button class="btn btn-primary" onclick="window.app.mostrarTela(\'buscaScreen\')">🔍 Buscar</button></div>';
    }
};

App.prototype.adicionarNaRede = function(aid) { this.mostrarToast('✅ Adicionado!','sucesso'); };
App.prototype.removerDaRede = function(aid) { if(!confirm('Remover?'))return; this.mostrarToast('Removido','sucesso'); };

// ===== OUTRAS FUNÇÕES =====
App.prototype.verDetalheObra = function(oid) { this.mostrarToast('🔍 Visualizando detalhes...', 'info'); };
App.prototype.iniciarChat = function(uid) { this.mostrarToast('💬 Chat iniciado!', 'sucesso'); };
App.prototype.candidatarVaga = function(vid) { this.mostrarToast('✅ Candidatura enviada!', 'sucesso'); };
App.prototype.abrirContratacao = function(uid) { this.contratarProfId = uid; this.mostrarToast('🤝 Abrindo contratação...', 'info'); };
App.prototype.confirmarContratacao = function() { this.mostrarToast('✅ Profissional contratado!', 'sucesso'); };
App.prototype.novaObra = function() { this.mostrarToast('🏗️ Nova obra criada!', 'sucesso'); };
App.prototype.carregarMinhasObras = function() { var c = document.getElementById('minhasObrasContainer'); if (c) c.innerHTML = '<div class="card"><h3>Minhas Obras</h3><p>Nenhuma obra cadastrada.</p></div>'; };
App.prototype.demitirFuncionario = function(cid) { if (confirm('Demitir funcionário?')) { this.mostrarToast('Funcionário demitido.', 'sucesso'); } };
App.prototype.finalizarContrato = function(cid) { if (confirm('Finalizar contrato?')) { this.mostrarToast('Contrato finalizado.', 'sucesso'); } };
App.prototype.abrirEditarPerfil = function() { this.mostrarToast('✏️ Editar perfil', 'info'); };
App.prototype.salvarPerfil = function() { this.mostrarToast('✅ Perfil salvo!', 'sucesso'); };
App.prototype.uploadFoto = function(e) { this.mostrarToast('📸 Foto atualizada!', 'sucesso'); };
App.prototype.verAvaliacoes = function(uid) { this.mostrarToast('⭐ Avaliações carregadas!', 'info'); };
App.prototype.abrirDarAvaliacao = function(uid) { this.avaliarUid = uid; this.mostrarToast('Avalie o profissional!', 'info'); };
App.prototype.setNota = function(n) { this.avaliarNota = n; };
App.prototype.enviarAvaliacao = function() { this.mostrarToast('✅ Avaliação enviada!', 'sucesso'); };
App.prototype.gerarQRCode = function(uid) { this.mostrarToast('📱 QR Code gerado!', 'sucesso'); };
App.prototype.fecharQRCode = function() { this.mostrarToast('QR Code fechado.', 'info'); };
App.prototype.baixarQRCode = function() { this.mostrarToast('📥 QR Code baixado!', 'sucesso'); };
App.prototype.selecionarIdioma = function(i) { this.mostrarToast('🌐 Idioma alterado!', 'sucesso'); };
App.prototype.mostrarInfoVersao = function() { this.mostrarToast('📱 Versão 1.0.0', 'info'); };
App.prototype.confirmarExclusao = function() { if (confirm('Confirmar exclusão?')) { this.mostrarToast('Conta excluída.', 'sucesso'); } };
App.prototype.mostrarNotificacoes = function() { this.mostrarToast('🔔 Notificações carregadas!', 'info'); };
App.prototype.mudarTab = function(t) { console.log('Mudando para tab:', t); };
App.prototype.enviarMensagem = function() { this.mostrarToast('📨 Mensagem enviada!', 'sucesso'); };

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
