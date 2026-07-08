// ==========================================================
// ===== app.js CORRIGIDO =====
// ==========================================================

class App {
    constructor() {
        this.usuarioLogado = null;
        this.telaAtual = 'loginScreen';
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando LPXConstrutor...');
        
        // Verifica sessão existente
        authService.onAuthStateChange((usuario) => {
            console.log('🔄 Auth state changed:', usuario ? usuario.nome : 'null');
            
            if (usuario) {
                this.usuarioLogado = usuario;
                if (this.telaAtual === 'loginScreen' || this.telaAtual === 'cadastroScreen') {
                    this.mostrarTela('homeScreen');
                }
            } else {
                this.usuarioLogado = null;
                this.mostrarTela('loginScreen');
            }
        });
        
        console.log('✅ App inicializado');
    }

    // ===== NAVEGAÇÃO =====
    mostrarTela(id) {
        console.log('📱 Mudando para tela:', id);
        
        // Esconde todas as telas
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
        });
        
        // Mostra tela selecionada
        const tela = document.getElementById(id);
        if (tela) {
            tela.classList.add('active');
            this.telaAtual = id;
            
            // Atualiza navegação inferior
            const nav = document.getElementById('bottomNav');
            if (nav) {
                const telasComNav = ['homeScreen', 'perfilScreen'];
                if (telasComNav.includes(id)) {
                    nav.classList.add('active');
                } else {
                    nav.classList.remove('active');
                }
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
            case 'perfilScreen':
                this.carregarPerfil();
                break;
        }
    }

    // ===== AUTENTICAÇÃO =====
    async fazerLogin() {
        const email = document.getElementById('loginEmail')?.value?.trim();
        const senha = document.getElementById('loginSenha')?.value;

        if (!email || !senha) {
            this.mostrarToast('❌ Preencha todos os campos!', 'erro');
            return;
        }

        console.log('🔑 Tentando login...');
        this.mostrarToast('Entrando...', 'info');
        
        const resultado = await authService.login(email, senha);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast(`✅ Bem-vindo, ${resultado.usuario.nome}!`, 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
        }
    }

    async cadastrar() {
        const dados = {
            nome: document.getElementById('cadNome')?.value?.trim(),
            email: document.getElementById('cadEmail')?.value?.trim(),
            senha: document.getElementById('cadSenha')?.value,
            tipo: document.getElementById('cadTipo')?.value,
            celular: document.getElementById('cadCelular')?.value?.trim(),
            cpf: document.getElementById('cadCPF')?.value?.replace(/\D/g, ''),
            profissao: document.getElementById('cadProfissao')?.value,
            experiencia: document.getElementById('cadExperiencia')?.value
        };

        console.log('📝 Iniciando cadastro...');
        this.mostrarToast('Cadastrando...', 'info');
        
        const resultado = await authService.cadastrar(dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast('✅ Cadastro realizado!', 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
        }
    }

    async recuperarSenha() {
        const email = prompt('Digite seu email para recuperar a senha:');
        if (!email) return;

        const resultado = await authService.recuperarSenha(email);
        
        if (resultado.sucesso) {
            this.mostrarToast('✅ Email enviado!', 'sucesso');
        } else {
            this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
        }
    }

    async sair() {
        await authService.logout();
        this.usuarioLogado = null;
        this.mostrarTela('loginScreen');
        this.mostrarToast('👋 Até logo!', 'sucesso');
    }

    // ===== HOME =====
    async carregarHome() {
        console.log('🏠 Carregando home...');
        
        if (!this.usuarioLogado) {
            console.warn('⚠️ Nenhum usuário logado');
            return;
        }

        // Saudação
        const hora = new Date().getHours();
        let saudacao = 'Bom dia';
        if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
        if (hora >= 18) saudacao = 'Boa noite';
        
        document.getElementById('saudacao').textContent = 
            `👋 ${saudacao}, ${this.usuarioLogado.nome}!`;
        
        // Inicializa mapa
        if (typeof mapaService !== 'undefined') {
            await mapaService.initMap();
        }
        
        // Carrega obras
        await this.carregarObras();
        
        // Atualiza resumo
        const obras = await databaseService.buscarObras();
        document.getElementById('resumoTexto').textContent = 
            `📊 ${obras.length} obras ativas na sua região`;
    }

    async carregarObras() {
        const container = document.getElementById('listaObras');
        if (!container) return;

        container.innerHTML = '<div class="loading">Carregando obras</div>';

        const obras = await databaseService.buscarObras();

        if (obras.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center;">
                    <div style="font-size:40px;">🏗️</div>
                    <p>Nenhuma obra encontrada</p>
                </div>
            `;
            return;
        }

        container.innerHTML = obras.map(obra => `
            <div class="obra-card">
                <h3>🏗️ ${obra.nome || 'Obra sem nome'}</h3>
                <p>📍 ${obra.endereco || 'Endereço não informado'}</p>
                <p>💰 R$ ${obra.valorHora || '0'}/h</p>
            </div>
        `).join('');
    }

    // ===== PERFIL =====
    carregarPerfil() {
        if (!this.usuarioLogado) return;

        document.getElementById('perfilNome').textContent = this.usuarioLogado.nome;
        document.getElementById('perfilInfo').textContent = 
            `${this.usuarioLogado.tipo === 'profissional' ? '👷 Profissional' : '🏢 Empreiteiro'} • ${this.usuarioLogado.email}`;
        
        const score = this.usuarioLogado.score || 0;
        document.getElementById('perfilScore').innerHTML = 
            `⭐ ${score > 0 ? score.toFixed(1) : 'Sem avaliações'}`;
    }

    // ===== UTILITÁRIOS =====
    mostrarToast(mensagem, tipo = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = mensagem;
        
        switch(tipo) {
            case 'erro':
                toast.style.background = '#EF4444';
                break;
            case 'sucesso':
                toast.style.background = '#10B981';
                break;
            default:
                toast.style.background = '#1F2937';
        }
        
        toast.style.display = 'block';

        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    toggleProfissao() {
        const tipo = document.getElementById('cadTipo')?.value;
        const grupo = document.getElementById('grupoProfissao');
        if (grupo) {
            grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
        }
    }
}

// Inicializa quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Página carregada, iniciando app...');
    window.app = new App();
});
