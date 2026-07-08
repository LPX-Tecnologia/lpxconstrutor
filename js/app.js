// ==========================================================
// ===== APLICAÇÃO PRINCIPAL - COMPLETA =====
// ==========================================================

class App {
    constructor() {
        this.usuarioLogado = null;
        this.usuarioSelecionado = null;
        this.chatAtivo = null;
        this.notificacoes = [];
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando LPXConstrutor...');
        
        // Monitora autenticação
        authService.onAuthStateChange((usuario) => {
            if (usuario) {
                this.usuarioLogado = usuario;
                console.log('✅ Logado:', usuario.nome);
                
                if (this.telaAtual === 'loginScreen' || this.telaAtual === 'cadastroScreen') {
                    this.mostrarTela('homeScreen');
                }
                
                // Carrega notificações
                if (typeof notificationsService !== 'undefined') {
                    notificationsService.carregarNotificacoes();
                }
            } else {
                this.usuarioLogado = null;
                this.mostrarTela('loginScreen');
            }
        });
        
        // Mostra tela de login inicialmente
        this.mostrarTela('loginScreen');
        
        console.log('✅ App inicializado');
    }

    // ===== NAVEGAÇÃO =====
    mostrarTela(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const tela = document.getElementById(id);
        if (tela) {
            tela.classList.add('active');
            this.telaAtual = id;
            
            // Mostrar/esconder bottom nav
            const nav = document.getElementById('bottomNav');
            if (nav) {
                const telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen'];
                nav.style.display = telasComNav.includes(id) ? 'flex' : 'none';
            }
            
            // Ações específicas
            this.onTelaCarregada(id);
        }
    }

    onTelaCarregada(id) {
        switch(id) {
            case 'homeScreen':
                this.carregarHome();
                break;
            case 'meuPerfilScreen':
                this.carregarMeuPerfil();
                break;
            case 'buscaScreen':
                this.buscarProfissionais();
                break;
            case 'notificacoesScreen':
                this.carregarNotificacoes();
                break;
        }
    }

    mudarTab(tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        event.target.closest('.tab').classList.add('active');
        
        document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none';
        document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none';
        
        if (tab === 'feed') this.carregarFeed();
        if (tab === 'rede') this.carregarRede();
    }

    // ===== AUTENTICAÇÃO =====
    async fazerLogin() {
        const email = document.getElementById('loginEmail')?.value?.trim();
        const senha = document.getElementById('loginSenha')?.value;

        if (!email || !senha) {
            this.mostrarToast('Preencha todos os campos!', 'erro');
            return;
        }

        this.mostrarToast('Entrando...', 'info');
        const resultado =
