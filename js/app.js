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
    
    // CORRIGIDO: Verificar estado da autenticação
    if (typeof authService !== 'undefined' && authService.onAuthStateChange) {
        authService.onAuthStateChange(function(u) { 
            console.log('Estado da autenticação:', u ? 'Logado' : 'Deslogado');
            if (u) { 
                s.usuarioLogado = u; 
                s.atualizarBotoes(); 
                if (s.telaAtual === 'loginScreen' || s.telaAtual === 'cadastroScreen') {
                    s.mostrarTela('homeScreen');
                }
            } else { 
                s.usuarioLogado = null; 
                s.mostrarTela('loginScreen'); 
            } 
            setTimeout(function() { s.esconderSplash(); }, 1500); 
        });
    } else {
        // Fallback se authService não estiver disponível
        console.log('AuthService não encontrado, mostrando splash...');
        setTimeout(function() { s.esconderSplash(); }, 2000);
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
    console.log('Mostrando tela:', id);
    
    // Ocultar barra de navegação imediatamente
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
    }
    
    if (s.telaAtual && s.telaAtual !== id && s.telaAtual !== 'loginScreen') 
        s.historicoTelas.push(s.telaAtual);
    
    document.querySelectorAll('.screen').forEach(function(x) { 
        x.classList.remove('active'); 
    }); 
    
    var t = document.getElementById(id); 
    if (!t) {
        console.error('Tela não encontrada:', id);
        return;
    }
    
    t.classList.add('active'); 
    s.telaAtual = id;
    
    // CORRIGIDO: Barra de navegação só aparece nas telas principais quando logado
    if (bottomNav && s.usuarioLogado) { 
        var telasComNav = [
            'homeScreen',
            'buscaScreen', 
            'meuPerfilScreen',
            'chatScreen', 
            'minhasObrasScreen'
        ]; 
        
        if (telasComNav.indexOf(id) >= 0) {
            bottomNav.style.display = 'flex'; 
        }
    }
    
    // Carregar dados específicos de cada tela
    if (id === 'homeScreen') setTimeout(function() { s.carregarHome(); }, 100);
    if (id === 'meuPerfilScreen') setTimeout(function() { s.carregarMeuPerfil(); }, 100);
    if (id === 'buscaScreen') setTimeout(function() { s.buscarProfissionais(); }, 100);
    if (id === 'minhasObrasScreen') setTimeout(function() { s.carregarMinhasObras(); }, 100);
    if (id === 'recuperarSenhaScreen') { 
        var p1=document.getElementById('recPasso1'),p2=document.getElementById('recPasso2'); 
        if(p1)p1.style.display='block'; 
        if(p2)p2.style.display='none'; 
    }
};

App.prototype.voltarTela = function() { 
    if (this.historicoTelas.length > 0) { 
        var a = this.historicoTelas.pop(); 
        document.querySelectorAll('.screen').forEach(function(s) { 
            s.classList.remove('active'); 
        }); 
        var t = document.getElementById(a); 
        if (t) { 
            t.classList.add('active'); 
            this.telaAtual = a; 
        } 
        if (a === 'homeScreen') this.carregarHome(); 
        if (a === 'meuPerfilScreen') this.carregarMeuPerfil(); 
        
        // Verificar se deve mostrar barra de navegação
        var bottomNav = document.getElementById('bottomNav');
        if (bottomNav && this.usuarioLogado) {
            var telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen', 'minhasObrasScreen'];
            if (telasComNav.indexOf(a) >= 0) {
                bottomNav.style.display = 'flex';
            } else {
                bottomNav.style.display = 'none';
            }
        }
    } else { 
        this.mostrarTela('homeScreen'); 
    } 
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
        // Simulação para teste
        s.usuarioLogado = {id: '1', nome: 'Usuário Teste', tipo: 'empreiteiro', profissao: 'Construtor', experiencia: 5};
        s.mostrarToast('✅ Bem-vindo!','sucesso');
        s.atualizarBotoes();
        s.mostrarTela('homeScreen');
    }
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

// ===== HOME =====
App.prototype.carregarHome = function() {
    if (!this.usuarioLogado) {
        console.log('Usuário não logado, redirecionando...');
        this.mostrarTela('loginScreen');
        return;
    }
    
    var h = new Date().getHours(); 
    var sd = 'Bom dia'; 
    if (h >= 12 && h < 18) sd = 'Boa tarde'; 
    if (h >= 18) sd = 'Boa noite';
    
    var sa = document.getElementById('saudacao'); 
    if (sa) sa.textContent = '👋 ' + sd + ', ' + this.usuarioLogado.nome + '!';
    
    var re = document.getElementById('resumoTexto'); 
    if (re) re.textContent = (this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + ' • ' + (this.usuarioLogado.profissao || this.usuarioLogado.tipo);
    
    // CORRIGIDO: Carregar foto do perfil na home
    var fs = document.querySelector('#homeScreen .logo-saudacao');
    if (fs) { 
        if (this.usuarioLogado.fotoPerfil) { 
            fs.src = this.usuarioLogado.fotoPerfil; 
            fs.style.borderRadius = '50%'; 
            fs.style.objectFit = 'cover'; 
            fs.style.width = '60px';
            fs.style.height = '60px';
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

// ===== FEED COM VÍDEOS E FOTOS CORRIGIDAS =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); 
    if (!c) {
        console.error('Container do feed não encontrado');
        return;
    }
    
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
    
    // Verificar se db está disponível
    if (typeof db === 'undefined') {
        console.error('Firestore (db) não está definido');
        c.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><h3>Erro de conexão</h3><p>Não foi possível conectar ao banco de dados.</p></div>';
        return;
    }
    
    db.collection('vagas').get().then(function(snap) {
        var vagas = []; 
        snap.forEach(function(doc) { 
            var d = doc.data(); 
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
                
                // CORRIGIDO: Verificar se fotoObra existe e é uma string válida
                var fotoHtml = '';
                if (v.data.fotoObra && typeof v.data.fotoObra === 'string' && v.data.fotoObra.length > 0) {
                    fotoHtml = '<img src="' + v.data.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
                }
                
                html += '<div class="vaga-card" onclick="window.app._app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">' + (v.data.titulo || 'Vaga') + '</div><div class="vaga-data">📍 ' + (v.data.endereco || 'Local não informado') + '</div></div></div><div class="vaga-body"><div class="vaga-tags"><span class="vaga-tag">💰 R$' + (v.data.valorHora || '0') + '/h</span><span class="vaga-tag">👷 ' + (v.data.profissoes || 'Todas') + '</span></div>' + fotoHtml + mapaHtml + '</div>' + (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.candidatarVaga(\'' + v.id + '\')">✋ QUERO!</button></div>' : '') + '</div>'; 
            }); 
        }
        c.innerHTML = html;
    }).catch(function(error) { 
        console.error('Erro ao carregar feed:', error);
        c.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><i class="fas fa-exclamation-triangle" style="font-size:48px;color:#f59e0b;"></i><h3>Erro ao carregar feed</h3><p>Tente novamente mais tarde.</p></div>'; 
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
            console.log('Editando vaga existente:', s.vagaEmEdicao);
            if (tituloEl) tituloEl.value = s.vagaEmEdicao.titulo || '';
            if (enderecoEl) enderecoEl.value = s.vagaEmEdicao.endereco || '';
            if (profissoesEl) profissoesEl.value = s.vagaEmEdicao.profissoes || '';
            if (valorEl) valorEl.value = s.vagaEmEdicao.valorHora || '';
            
            // CORRIGIDO: Restaurar foto com verificação
            if (fotoPreview && s.vagaEmEdicao.fotoObra && typeof s.vagaEmEdicao.fotoObra === 'string' && s.vagaEmEdicao.fotoObra.length > 0) {
                fotoPreview.src = s.vagaEmEdicao.fotoObra;
                fotoPreview.style.display = 'block';
                s.vagaFotoBase64 = s.vagaEmEdicao.fotoObra;
            } else if (fotoPreview) {
                fotoPreview.src = '';
                fotoPreview.style.display = 'none';
            }
            
            // Restaurar localização no mapa
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
            // Limpar campos para nova vaga
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

// CORRIGIDO: Função de preview da foto
App.prototype.previewFotoObra = function(e) {
    var input = e.target;
    var file = input.files[0];
    
    if (!file) {
        console.log('Nenhum arquivo selecionado');
        return;
    }
    
    console.log('Arquivo selecionado:', file.name, file.type, file.size);
    
    // Verificar se é uma imagem
    if (!file.type.match('image.*')) {
        this.mostrarToast('❌ Por favor, selecione uma imagem!', 'erro');
        input.value = '';
        return;
    }
    
    // Verificar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        this.mostrarToast('❌ Imagem muito grande! Máximo 5MB.', 'erro');
        input.value = '';
        return;
    }
    
    var reader = new FileReader();
    var s = this;
    
    reader.onload = function(event) {
        console.log('Imagem carregada com sucesso');
        s.vagaFotoBase64 = event.target.result;
        
        var preview = document.getElementById('fotoObraPreview');
        if (preview) {
            preview.src = event.target.result;
            preview.style.display = 'block';
            preview.style.maxWidth = '100%';
            preview.style.maxHeight = '200px';
            preview.style.objectFit = 'cover';
            preview.style.borderRadius = '8px';
        }
    };
    
    reader.onerror = function() {
        console.error('Erro ao ler arquivo');
        s.mostrarToast('❌ Erro ao carregar imagem!', 'erro');
        input.value = '';
    };
    
    reader.readAsDataURL(file);
};

App.prototype.publicarVagaApp = function() {
    var s = this;
    
    var titulo = (document.getElementById('vagaTitulo') ? document.getElementById('vagaTitulo').value : '').trim();
    var endereco = (document.getElementById('vagaEndereco') ? document.getElementById('vagaEndereco').value : '').trim();
    var profissoes = (document.getElementById('vagaProfissoes') ? document.getElementById('vagaProfissoes').value : '').trim();
    var valorHora = (document.getElementById('vagaValor') ? document.getElementById('vagaValor').value : '').trim();
    var fotoBase64 = s.vagaFotoBase64 || (s.vagaEmEdicao ? s.vagaEmEdicao.fotoObra : null);
    
    console.log('Dados da vaga:', { titulo, endereco, profissoes, valorHora, temFoto: !!fotoBase64 });
    
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
        dataCriacao: s.vagaEmEdicao ? s.vagaEmEdicao.dataCriacao : firebase.firestore.FieldValue.serverTimestamp(),
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp(),
        ativa: true,
        autorId: s.usuarioLogado.id,
        autorNome: s.usuarioLogado.nome
    };
    
    console.log('Salvando vaga:', dadosVaga);
    
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
        console.error('Erro ao salvar vaga:', error);
        s.mostrarToast('❌ Erro ao salvar vaga.', 'erro');
    });
};

// ===== PERFIL CORRIGIDO =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    console.log('Carregando perfil...');
    
    if (!s.usuarioLogado) {
        console.log('Usuário não logado');
        return;
    }
    
    var nomeEl = document.getElementById('perfilNome');
    var profissaoEl = document.getElementById('perfilProfissao');
    var emailEl = document.getElementById('perfilEmail');
    var celularEl = document.getElementById('perfilCelular');
    var fotoEl = document.getElementById('perfilFoto');
    var loadingEl = document.getElementById('perfilLoading');
    
    // Remover loading se existir
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    // Preencher dados do perfil
    if (nomeEl) nomeEl.textContent = s.usuarioLogado.nome || 'Usuário';
    if (profissaoEl) profissaoEl.textContent = (s.usuarioLogado.profissao || 'Profissional') + ' • ' + (s.usuarioLogado.experiencia || 0) + ' anos de experiência';
    if (emailEl) emailEl.textContent = s.usuarioLogado.email || 'Email não informado';
    if (celularEl) celularEl.textContent = s.usuarioLogado.celular || 'Celular não informado';
    
    // CORRIGIDO: Carregar foto do perfil
    if (fotoEl) {
        if (s.usuarioLogado.fotoPerfil && typeof s.usuarioLogado.fotoPerfil === 'string' && s.usuarioLogado.fotoPerfil.length > 0) {
            fotoEl.src = s.usuarioLogado.fotoPerfil;
            fotoEl.style.display = 'block';
            fotoEl.onerror = function() {
                this.style.display = 'none';
                // Mostrar ícone padrão
                var iconEl = document.getElementById('perfilIcon');
                if (iconEl) iconEl.style.display = 'block';
            };
        } else {
            fotoEl.style.display = 'none';
            var iconEl = document.getElementById('perfilIcon');
            if (iconEl) iconEl.style.display = 'block';
        }
    }
    
    console.log('Perfil carregado com sucesso');
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
    console.log('DOM carregado, iniciando app...');
    if (!window.app._app) {
        new App();
    }
});
