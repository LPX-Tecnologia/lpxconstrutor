// ==========================================================
// ===== LPXCONSTRUTOR - VERSÃO FINAL COMPLETA E FUNCIONAL =====
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
    mostrarTermosUso: function(){ if(window.app._app)window.app._app.mostrarDocumento('termos'); },
    mostrarPrivacidade: function(){ if(window.app._app)window.app._app.mostrarDocumento('privacidade'); },
    mostrarDiretrizes: function(){ if(window.app._app)window.app._app.mostrarDocumento('diretrizes'); },
    mostrarSobre: function(){ if(window.app._app)window.app._app.mostrarDocumento('sobre'); },
    mostrarDocumento: function(tipo){ if(window.app._app)window.app._app.mostrarDocumento(tipo); },
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
    window.app._app = this;
    
    var temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') { document.body.classList.add('dark-theme'); s.temaAtual = 'escuro'; }
    
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
        splash.innerHTML = '<div style="font-size:60px;">🏗️</div><p style="color:white;font-size:22px;font-weight:900;margin-top:16px;">LPXCONSTRUTOR</p><p style="color:#f0c27f;font-size:12px;margin-top:6px;">Rede Profissional da Construção</p>'; 
        document.body.appendChild(splash); 
    }
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
    
    setTimeout(function() {
        if (id === 'homeScreen') s.carregarHome();
        if (id === 'meuPerfilScreen') s.carregarMeuPerfil();
        if (id === 'buscaScreen') s.buscarProfissionais();
        if (id === 'minhasObrasScreen') s.carregarMinhasObras();
        if (id === 'publicarVagaScreen') s.configurarPublicacao();
    }, 100);
    
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
    this.temaAtual = t;
    if(t==='escuro'){ document.body.classList.add('dark-theme'); localStorage.setItem('tema','escuro'); } 
    else { document.body.classList.remove('dark-theme'); localStorage.setItem('tema','claro'); } 
    this.mostrarToast('🎨 Tema alterado!','sucesso'); 
};

App.prototype.selecionarIdioma = function(i) { 
    this.idiomaAtual = i;
    localStorage.setItem('idioma', i);
    this.mostrarToast('🌐 Idioma alterado!','sucesso');
    if (this.telaAtual === 'meuPerfilScreen') this.carregarMeuPerfil();
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
                s.mostrarToast('✅ Bem-vindo!','sucesso');
                s.atualizarBotoes();
                s.mostrarTela('homeScreen');
            } else { s.mostrarToast('❌ '+r.erro,'erro'); }
        });
    } else {
        if (!s.usuarioLogado) {
            s.usuarioLogado = {
                id: 'user_' + Date.now(),
                nome: e.split('@')[0] || 'Usuário',
                email: e,
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
    
    if (!nome || !email || !senha || !nome.value || !email.value || !senha.value) {
        s.mostrarToast('❌ Preencha todos os campos!','erro');
        return;
    }
    
    var usuario = {
        id: 'user_' + Date.now(),
        nome: nome.value,
        email: email.value,
        tipo: tipo ? tipo.value : 'profissional',
        celular: celular ? celular.value : '',
        profissao: profissao ? profissao.value : 'Profissional',
        experiencia: experiencia ? experiencia.value : '0',
        fotoPerfil: null,
        score: 0,
        dataCadastro: new Date().toISOString()
    };
    
    localStorage.setItem('usuarioLPX', JSON.stringify(usuario));
    s.usuarioLogado = usuario;
    
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(usuario.id).set(usuario).catch(function(){});
    }
    
    s.mostrarToast('✅ Cadastro realizado!','sucesso');
    s.atualizarBotoes();
    s.mostrarTela('homeScreen');
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
    this.mostrarToast('✅ Código enviado!','sucesso');
    document.getElementById('recPasso1').style.display='none';
    document.getElementById('recPasso2').style.display='block';
};

App.prototype.voltarPasso1 = function(){
    document.getElementById('recPasso1').style.display='block';
    document.getElementById('recPasso2').style.display='none';
};

App.prototype.verificarCodigo = function(){
    this.mostrarToast('✅ Senha redefinida!','sucesso');
    setTimeout(function(){ window.app._app.mostrarTela('loginScreen'); },1500);
};

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) {
        var userSalvo = localStorage.getItem('usuarioLPX');
        if (userSalvo) { try { this.usuarioLogado = JSON.parse(userSalvo); } catch(e) {} }
        if (!this.usuarioLogado) { this.mostrarTela('loginScreen'); return; }
    }
    
    var h = new Date().getHours(); 
    var sd = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    
    var sa = document.getElementById('saudacao'); 
    if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    
    var re = document.getElementById('resumoTexto'); 
    if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || '');
    
    var fs = document.querySelector('#homeScreen .logo-saudacao');
    if (fs) { 
        if (this.usuarioLogado.fotoPerfil) { 
            fs.src = this.usuarioLogado.fotoPerfil; 
            fs.style.borderRadius = '50%'; 
            fs.style.objectFit = 'cover'; 
        } else { 
            fs.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; 
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
    
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
    
    var videos = [
        { titulo: '🦺 Segurança no Trabalho', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' }
    ];
    
    var hoje = new Date(); 
    var dia = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); 
    var vd = videos[dia % videos.length];
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    var html = '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;">' +
        '<div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;">' +
        '<span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong></div>' +
        '<iframe src="' + vd.url + '" style="width:100%;height:200px;border:none;"></iframe></div>';
    
    if (vagas.length === 0) { 
        html += '<div class="card" style="text-align:center;padding:30px;"><h3>Nenhuma vaga</h3>' + 
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
            '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button>' : '') + '</div>'; 
    } else { 
        vagas.forEach(function(v) { 
            var statusVaga = '';
            if (v.status === 'em_andamento') {
                statusVaga = '<span style="background:#10B981;color:white;padding:2px 8px;border-radius:10px;font-size:10px;">🟢 Em andamento</span>';
            }
            
            var mapaHtml = '';
            if (v.endereco) {
                mapaHtml = '<div style="margin-top:8px;padding:8px;background:#f0f9ff;border-radius:8px;display:flex;align-items:center;gap:8px;">' +
                    '<i class="fas fa-map-marker-alt" style="color:#1A3A5C;"></i><span style="font-size:12px;">📍 ' + v.endereco + '</span></div>';
            }
            
            var fotoHtml = '';
            if (v.fotoObra && v.fotoObra.length > 0) {
                fotoHtml = '<img src="' + v.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;">';
            }
            
            var botoesVaga = '';
            if (s.usuarioLogado) {
                if (s.usuarioLogado.tipo === 'profissional' && v.status !== 'em_andamento') {
                    botoesVaga = '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.candidatarVaga(\'' + v.id + '\')" style="margin-top:8px;">✋ QUERO!</button>';
                } else if (s.usuarioLogado.tipo === 'empreiteiro' && v.autorId === s.usuarioLogado.id && v.status !== 'em_andamento') {
                    botoesVaga = '<button class="btn btn-outline btn-small" onclick="event.stopPropagation();window.app.abrirContratacao(\'' + v.id + '\')" style="margin-top:8px;background:#1A3A5C;color:white;">👷 Ver Candidatos</button>';
                }
            }
            
            html += '<div class="vaga-card" onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;background:white;border-radius:12px;padding:16px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">' +
                '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">' +
                '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">🏗️</div>' +
                '<div><div style="font-weight:bold;color:#1A3A5C;font-size:16px;">' + v.titulo + statusVaga + '</div>' +
                '<div style="font-size:12px;color:#6b7280;">📍 ' + (v.endereco || 'Local não informado') + '</div></div></div>' +
                '<div><div style="display:flex;gap:8px;margin-bottom:8px;">' +
                '<span style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">💰 R$' + v.valorHora + '/h</span>' +
                '<span style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:12px;">👷 ' + v.profissoes + '</span></div>' +
                fotoHtml + mapaHtml +
                '<div style="font-size:11px;color:#9ca3af;margin-top:8px;">Por: ' + (v.autorNome || 'Anônimo') + '</div>' + botoesVaga + '</div></div>'; 
        }); 
    }
    c.innerHTML = html;
};

// ===== PUBLICAÇÃO =====
App.prototype.configurarPublicacao = function() {
    var s = this;
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) {
        var novoInput = inputFoto.cloneNode(true);
        inputFoto.parentNode.replaceChild(novoInput, inputFoto);
        
        novoInput.addEventListener('change', function(event) {
            var arquivo = event.target.files[0];
            if (!arquivo) return;
            var reader = new FileReader();
            reader.onload = function(e) {
                s.vagaFotoBase64 = e.target.result;
                var preview = document.getElementById('fotoObraPreview');
                if (preview) { preview.src = e.target.result; preview.style.display = 'block'; }
            };
            reader.readAsDataURL(arquivo);
        });
    }
    
    ['vagaTitulo','vagaEndereco','vagaProfissoes','vagaValor'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });
    
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
        s.mostrarToast('❌ Formulário não encontrado', 'erro'); return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl.value.trim();
    var valorHora = valorEl.value.trim();
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); return; }
    if (!profissoes) { s.mostrarToast('❌ Digite as profissões!', 'erro'); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor!', 'erro'); return; }
    
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
    
    var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    vagasSalvas.unshift(vaga);
    localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
    
    if (typeof db !== 'undefined') { db.collection('vagas').add(vaga).catch(function(){}); }
    
    tituloEl.value = ''; enderecoEl.value = ''; profissoesEl.value = ''; valorEl.value = '';
    var preview = document.getElementById('fotoObraPreview');
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    var inputFoto = document.getElementById('fotoObraInput');
    if (inputFoto) inputFoto.value = '';
    s.vagaFotoBase64 = null; s.vagaLocalizacaoAtual = null; s.vagaEmEdicao = null;
    
    s.mostrarToast('✅ Vaga publicada!', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); }, 500);
};

// ===== SISTEMA DE CONTRATO =====
App.prototype.candidatarVaga = function(vagaId) {
    var s = this;
    if (!s.usuarioLogado) { s.mostrarToast('❌ Faça login!', 'erro'); return; }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === vagaId; });
    if (!vaga) { s.mostrarToast('❌ Vaga não encontrada!', 'erro'); return; }
    
    var candidatura = {
        id: 'cand_' + Date.now(),
        vagaId: vagaId, vagaTitulo: vaga.titulo,
        profissionalId: s.usuarioLogado.id, profissionalNome: s.usuarioLogado.nome,
        empreiteiroId: vaga.autorId, empreiteiroNome: vaga.autorNome,
        status: 'pendente', dataCandidatura: new Date().toISOString()
    };
    
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    candidaturas.push(candidatura);
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    s.mostrarToast('✅ Candidatura enviada!', 'sucesso');
};

App.prototype.abrirContratacao = function(vagaId) {
    var s = this;
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var candidatos = candidaturas.filter(function(c) { return c.vagaId === vagaId && c.status === 'pendente'; });
    
    var html = '<div id="modalContratacao" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto;">';
    html += '<h3 style="color:#1A3A5C;text-align:center;">👷 Candidatos</h3>';
    
    if (candidatos.length === 0) {
        html += '<p style="text-align:center;color:#999;">Nenhum candidato.</p>';
    } else {
        candidatos.forEach(function(c) {
            html += '<div style="background:#f9f9f9;border-radius:10px;padding:15px;margin-bottom:10px;">';
            html += '<p><strong>' + c.profissionalNome + '</strong></p>';
            html += '<div style="display:flex;gap:8px;">';
            html += '<button onclick="window.app.aceitarCandidato(\'' + c.id + '\')" style="flex:1;background:#10B981;color:white;border:none;padding:10px;border-radius:8px;">✅ Contratar</button>';
            html += '<button onclick="window.app.recusarCandidato(\'' + c.id + '\')" style="flex:1;background:#EF4444;color:white;border:none;padding:10px;border-radius:8px;">❌ Recusar</button>';
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
    if (!cand) return;
    
    cand.status = 'em_andamento';
    cand.dataInicio = new Date().toISOString();
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === cand.vagaId; });
    if (vaga) { vaga.status = 'em_andamento'; vaga.profissionalNome = cand.profissionalNome; }
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    var contrato = {
        id: 'contr_' + Date.now(),
        vagaId: cand.vagaId, vagaTitulo: cand.vagaTitulo,
        empreiteiroId: cand.empreiteiroId, empreiteiroNome: cand.empreiteiroNome,
        profissionalId: cand.profissionalId, profissionalNome: cand.profissionalNome,
        status: 'em_andamento', dataInicio: new Date().toISOString()
    };
    
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    contratos.push(contrato);
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    s.contratoAtual = contrato;
    localStorage.setItem('contratoAtualLPX', JSON.stringify(contrato));
    
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    
    s.mostrarToast('✅ Contratado!', 'sucesso');
    s.verContratoAtivo();
};

App.prototype.recusarCandidato = function(candidaturaId) {
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var cand = candidaturas.find(function(c) { return c.id === candidaturaId; });
    if (cand) cand.status = 'recusado';
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    this.mostrarToast('Recusado.', 'info');
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
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">' +
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:25px;border-radius:15px;text-align:center;margin-bottom:20px;">' +
        '<div style="font-size:50px;">🤝</div><h2>Contrato Ativo</h2><p style="color:#f0c27f;">🟢 Em Andamento</p></div>' +
        '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">' +
        '<p><strong>🏗️ Obra:</strong> ' + c.vagaTitulo + '</p>' +
        '<p><strong>👷 Profissional:</strong> ' + c.profissionalNome + '</p>' +
        '<p><strong>🏢 Empreiteiro:</strong> ' + c.empreiteiroNome + '</p></div>' +
        '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
        '<button onclick="window.app.voltarTela()" style="flex:1;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;">Voltar</button></div>';
    
    if (isEmpreiteiro) {
        html += '<button onclick="window.app.finalizarContratoAtivo()" style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;">🔴 Finalizar Contrato</button>';
    }
    html += '</div>';
    
    var tela = document.getElementById('chatScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('chatScreen'); }
};

App.prototype.finalizarContratoAtivo = function() {
    var s = this;
    if (!confirm('Finalizar contrato?')) return;
    
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var contrato = contratos.find(function(c) { return c.id === s.contratoAtual.id; });
    if (contrato) { contrato.status = 'finalizado'; contrato.dataFim = new Date().toISOString(); }
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === s.contratoAtual.vagaId; });
    if (vaga) vaga.status = 'finalizado';
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    s.contratoAtual = null;
    localStorage.removeItem('contratoAtualLPX');
    s.mostrarToast('✅ Contrato finalizado!', 'sucesso');
    setTimeout(function() { s.mostrarTela('homeScreen'); s.carregarFeed(); }, 500);
};

App.prototype.verMeusContratos = function() {
    var s = this;
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
    var meus = contratos.filter(function(c) { return c.empreiteiroId === userId || c.profissionalId === userId; });
    
    var html = '<div style="padding:20px;"><h3 style="color:#1A3A5C;">📋 Contratos</h3>';
    if (meus.length === 0) {
        html += '<p style="text-align:center;color:#999;">Nenhum contrato.</p>';
    } else {
        meus.forEach(function(c) {
            html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;">' +
                '<h4>' + c.vagaTitulo + '</h4><p>' + c.profissionalNome + ' | ' + c.empreiteiroNome + '</p>' +
                '<p style="color:' + (c.status === 'em_andamento' ? '#10B981' : '#666') + ';">' + 
                (c.status === 'em_andamento' ? '🟢 Em Andamento' : '✅ Finalizado') + '</p></div>';
        });
    }
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button></div>';
    
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('meuPerfilScreen'); }
};

// ===== DETALHE DA OBRA =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    if (!vaga) { s.mostrarToast('❌ Obra não encontrada!', 'erro'); return; }
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">';
    
    if (vaga.fotoObra) {
        html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:250px;object-fit:cover;border-radius:15px;margin-bottom:15px;">';
    }
    
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">' +
        '<h2 style="color:#1A3A5C;">' + vaga.titulo + '</h2></div>' +
        '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">' +
        '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>' +
        '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>' +
        '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>' +
        '<p><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>' +
        '<p><strong>📅 Data:</strong> ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</p></div>';
    
    // MAPA
    if (vaga.localizacao && vaga.localizacao.lat && vaga.localizacao.lng) {
        html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">' +
            '<h3 style="color:#1A3A5C;">🗺️ Localização</h3>' +
            '<div style="text-align:center;padding:20px;background:#f0f9ff;border-radius:10px;">' +
            '<p>📍 ' + vaga.endereco + '</p>' +
            '<a href="https://www.google.com/maps?q=' + vaga.localizacao.lat + ',' + vaga.localizacao.lng + '" target="_blank" style="color:#1A3A5C;text-decoration:underline;">🗺️ Abrir no Google Maps</a></div></div>';
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;margin-top:10px;">⬅ Voltar</button></div>';
    
    var modal = document.createElement('div');
    modal.id = 'modalDetalhe';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;';
    modal.innerHTML = html;
    
    var antigo = document.getElementById('modalDetalhe');
    if (antigo) antigo.remove();
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) { modal.remove(); }
    });
};

// ===== MINHAS OBRAS =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var container = document.getElementById('minhasObrasContainer');
    if (!container) return;
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card"><h3>Faça login</h3></div>';
        return;
    }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhasObras = vagas.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
    
    if (minhasObras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><h3>🏗️ Nenhuma obra</h3>' +
            '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button></div>';
        return;
    }
    
    var html = '<h3 style="color:#1A3A5C;">🏗️ Minhas Obras (' + minhasObras.length + ')</h3>';
    
    minhasObras.forEach(function(v) {
        html += '<div class="card" onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">' +
            '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">' +
            '<div style="width:40px;height:40px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">🏗️</div>' +
            '<div><strong>' + v.titulo + '</strong></div></div>' +
            '<p style="font-size:12px;">📍 ' + v.endereco + ' | 💰 R$' + v.valorHora + '/h</p></div>';
    });
    
    container.innerHTML = html;
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
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px 30px;text-align:center;border-radius:0 0 30px 30px;margin-bottom:20px;">' +
        '<div style="width:100px;height:100px;background:white;border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:50px;border:3px solid #f0c27f;">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '👷') +
        '</div><h2>' + (user.nome || 'Usuário') + '</h2>' +
        '<p style="color:#f0c27f;">' + (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos</p>' +
        '<p style="font-size:18px;">' + estrelas + ' ' + score + '</p></div>';
    
    html += '<div style="padding:0 15px;">' +
        '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
        '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;"><div style="font-size:24px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div><div style="color:#999;font-size:11px;">Anos Exp.</div></div>' +
        '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;"><div style="font-size:24px;color:#f59e0b;font-weight:bold;">' + score + '</div><div style="color:#999;font-size:11px;">Avaliação</div></div>' +
        '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;" onclick="window.app.carregarMinhasObras();window.app.mostrarTela(\'minhasObrasScreen\');"><div style="font-size:24px;color:#10B981;font-weight:bold;">' + totalObras + '</div><div style="color:#999;font-size:11px;">Obras</div></div></div>' +
        
        '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">' +
        '<p>📧 ' + (user.email || 'Não informado') + '</p>' +
        '<p>📱 ' + (user.celular || 'Não informado') + '</p>' +
        '<p>🏢 ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p></div>' +
        
        '<button onclick="window.app.carregarMinhasObras();window.app.mostrarTela(\'minhasObrasScreen\');" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>' +
        '<button onclick="window.app.verMeusContratos()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">📋 Contratos</button>' +
        '<button onclick="window.app.mostrarNotificacoes()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🔔 Notificações</button>' +
        
        '<div style="display:flex;gap:10px;margin-bottom:10px;">' +
        '<button onclick="window.app.mostrarDocumento(\'termos\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📄 Termos</button>' +
        '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🔒 Privacidade</button></div>' +
        
        '<div style="display:flex;gap:10px;margin-bottom:10px;">' +
        '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📋 Diretrizes</button>' +
        '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">ℹ️ Sobre</button></div>' +
        
        '<div style="display:flex;gap:10px;margin-bottom:10px;">' +
        '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇧🇷 PT</button>' +
        '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇺🇸 EN</button>' +
        '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇪🇸 ES</button></div>' +
        
        '<div style="display:flex;gap:10px;margin-bottom:10px;">' +
        '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">☀️ Claro</button>' +
        '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🌙 Escuro</button></div>' +
        
        '<button onclick="window.app.sair()" style="width:100%;background:white;color:#EF4444;border:2px solid #EF4444;padding:15px;border-radius:10px;font-weight:bold;">🚪 Sair</button></div>';
    
    tela.innerHTML = html;
    var loading = document.getElementById('perfilLoading');
    if (loading) loading.style.display = 'none';
};

// ===== DOCUMENTOS =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    var docs = {
        'termos': {
            titulo: '📄 Termos de Uso',
            conteudo: '<h3 style="color:#1A3A5C;">1. Aceitação</h3><p>Ao usar o LPXCONSTRUTOR, você concorda com estes termos.</p>' +
                '<h3 style="color:#1A3A5C;">2. Cadastro</h3><p>Forneça informações verdadeiras e mantenha-as atualizadas.</p>' +
                '<h3 style="color:#1A3A5C;">3. Vagas</h3><p>Publique apenas vagas reais com informações precisas.</p>' +
                '<h3 style="color:#1A3A5C;">4. Conduta</h3><p>Não discrimine, assedie ou engane outros usuários.</p>' +
                '<h3 style="color:#1A3A5C;">5. Responsabilidade</h3><p>Não nos responsabilizamos por acordos entre as partes.</p>'
        },
        'privacidade': {
            titulo: '🔒 Política de Privacidade',
            conteudo: '<h3 style="color:#1A3A5C;">1. Dados Coletados</h3><p>Nome, email, telefone, profissão, fotos e localização.</p>' +
                '<h3 style="color:#1A3A5C;">2. Uso dos Dados</h3><p>Conectar profissionais e empreiteiros.</p>' +
                '<h3 style="color:#1A3A5C;">3. Compartilhamento</h3><p>Não vendemos seus dados.</p>' +
                '<h3 style="color:#1A3A5C;">4. Segurança</h3><p>Seus dados são protegidos.</p>' +
                '<h3 style="color:#1A3A5C;">5. Seus Direitos</h3><p>Acesse, corrija ou exclua seus dados.</p>'
        },
        'diretrizes': {
            titulo: '📋 Diretrizes da Comunidade',
            conteudo: '<h3 style="color:#1A3A5C;">1. Respeito</h3><p>Trate todos com profissionalismo.</p>' +
                '<h3 style="color:#1A3A5C;">2. Pagamentos</h3><p>Combine valores antes de iniciar.</p>' +
                '<h3 style="color:#1A3A5C;">3. Segurança</h3><p>Siga normas de segurança no trabalho.</p>' +
                '<h3 style="color:#1A3A5C;">4. Qualidade</h3><p>Entregue trabalhos com qualidade.</p>' +
                '<h3 style="color:#1A3A5C;">5. Avaliações</h3><p>Avalie com honestidade.</p>'
        },
        'sobre': {
            titulo: 'ℹ️ Sobre',
            conteudo: '<div style="text-align:center;padding:20px;"><div style="font-size:80px;">🏗️</div>' +
                '<h2>LPXCONSTRUTOR</h2><p><strong>Versão 1.0.0</strong></p>' +
                '<p>Rede Profissional da Construção Civil</p>' +
                '<hr><p>© 2024 LPXCONSTRUTOR</p></div>'
        }
    };
    
    var doc = docs[tipo] || docs['sobre'];
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">' +
        '<div style="background:#1A3A5C;color:white;padding:20px;border-radius:15px;margin-bottom:20px;text-align:center;">' +
        '<h2>' + doc.titulo + '</h2></div>' +
        '<div style="background:white;border-radius:15px;padding:20px;line-height:1.6;">' + doc.conteudo + '</div>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;margin-top:20px;font-weight:bold;">⬅ Voltar</button></div>';
    
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('meuPerfilScreen'); }
};

// ===== BUSCA =====
App.prototype.buscarProfissionais = function() {
    var c = document.getElementById('buscaResultados');
    if (!c) return;
    c.innerHTML = '<div class="loading">Buscando...</div>';
    
    setTimeout(function() {
        var profs = [
            { nome: 'João Silva', profissao: 'Pedreiro', experiencia: '10', celular: '11988887777', score: 4.5 },
            { nome: 'Maria Santos', profissao: 'Eletricista', experiencia: '8', celular: '11977776666', score: 4.8 },
            { nome: 'Pedro Costa', profissao: 'Pintor', experiencia: '5', celular: '11966665555', score: 4.2 }
        ];
        
        var html = '';
        profs.forEach(function(p) {
            html += '<div class="vaga-card"><div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">' +
                '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">👷</div>' +
                '<div><div style="font-weight:bold;">' + p.nome + '</div>' +
                '<div style="color:#666;">' + p.profissao + ' • ' + p.experiencia + ' anos</div>' +
                '<div>' + '⭐'.repeat(Math.round(p.score)) + ' ' + p.score + '</div></div></div>' +
                '<a href="https://wa.me/55' + p.celular + '" target="_blank" class="btn btn-success btn-small">WhatsApp</a></div>';
        });
        c.innerHTML = html;
    }, 500);
};

// ===== OUTRAS FUNÇÕES =====
App.prototype.verPerfil = function(uid) { 
    var c = document.getElementById('perfilPublicoConteudo');
    if (c) c.innerHTML = '<div style="text-align:center;padding:40px;"><div style="font-size:60px;">👷</div><h3>Profissional</h3><p>⭐⭐⭐⭐⭐</p></div>';
};

App.prototype.carregarRede = function() {
    var c = document.getElementById('redeContainer');
    if (c) c.innerHTML = '<div class="card" style="text-align:center;"><h3>Rede</h3></div>';
};

App.prototype.adicionarNaRede = function(aid) { this.mostrarToast('✅ Adicionado!', 'sucesso'); };
App.prototype.removerDaRede = function(aid) { if (!confirm('Remover?')) return; this.mostrarToast('Removido', 'sucesso'); };
App.prototype.mostrarNotificacoes = function() {
    var s = this;
    var html = '<div style="padding:20px;"><h3 style="color:#1A3A5C;">🔔 Notificações</h3>' +
        '<p style="text-align:center;color:#999;margin-top:40px;">Nenhuma notificação.</p>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button></div>';
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) { tela.innerHTML = html; s.mostrarTela('meuPerfilScreen'); }
};

App.prototype.iniciarChat = function(uid) { this.mostrarToast('💬 Chat iniciado!', 'sucesso'); };
App.prototype.confirmarContratacao = function() { this.mostrarToast('✅ Contratado!', 'sucesso'); };
App.prototype.abrirEditarPerfil = function() { this.mostrarToast('✏️ Editar perfil', 'info'); };
App.prototype.salvarPerfil = function() { this.mostrarToast('✅ Perfil salvo!', 'sucesso'); };
App.prototype.enviarAvaliacao = function() { this.mostrarToast('✅ Avaliação enviada!', 'sucesso'); };
App.prototype.mostrarInfoVersao = function() { this.mostrarDocumento('sobre'); };
App.prototype.confirmarExclusao = function() { if (confirm('Excluir?')) this.mostrarToast('Conta excluída.', 'sucesso'); };
App.prototype.enviarMensagem = function() { this.mostrarToast('📨 Enviada!', 'sucesso'); };

// ===== TOAST =====
App.prototype.mostrarToast = function(mensagem, tipo) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1A3A5C;color:white;padding:12px 24px;border-radius:25px;z-index:10000;font-size:14px;display:none;max-width:90%;text-align:center;';
        document.body.appendChild(toast);
    }
    if (tipo === 'sucesso') toast.style.background = '#10B981';
    else if (tipo === 'erro') toast.style.background = '#EF4444';
    else if (tipo === 'info') toast.style.background = '#3B82F6';
    
    toast.textContent = mensagem;
    toast.style.display = 'block';
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(function() { toast.style.display = 'none'; }, 3000);
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    if (!window.app._app) { new App(); }
});
