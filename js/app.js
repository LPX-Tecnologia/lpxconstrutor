// ==========================================================
// ===== APLICAÇÃO PRINCIPAL =====
// ==========================================================

class App {
    constructor() {
        this.usuarioLogado = null;
        this.telaAtual = 'loginScreen';
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando LPXConstrutor...');
        
        // Verifica sessão
        authService.onAuthStateChange((usuario) => {
            if (usuario) {
                this.usuarioLogado = usuario;
                console.log('✅ Usuário logado:', usuario.nome);
                if (this.telaAtual === 'loginScreen') {
                    this.mostrarTela('homeScreen');
                }
            } else {
                this.usuarioLogado = null;
                console.log('👤 Nenhum usuário logado');
            }
        });
        
        console.log('✅ App inicializado');
    }

    // ===== NAVEGAÇÃO =====
    mostrarTela(id) {
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
                nav.classList.toggle('active', telasComNav.includes(id));
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
            this.mostrarToast('Preencha todos os campos!', 'erro');
            return;
        }

        this.mostrarToast('Entrando...', 'info');
        
        const resultado = await authService.login(email, senha);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast(`Bem-vindo, ${resultado.usuario.nome}!`, 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
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

        this.mostrarToast('Cadastrando...', 'info');
        
        const resultado = await authService.cadastrar(dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast('Cadastro realizado! Verifique seu email.', 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    async recuperarSenha() {
        const email = prompt('Digite seu email para recuperar a senha:');
        if (!email) return;

        const resultado = await authService.recuperarSenha(email);
        
        if (resultado.sucesso) {
            this.mostrarToast('Email de recuperação enviado!', 'sucesso');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    async sair() {
        const resultado = await authService.logout();
        
        if (resultado.sucesso) {
            this.usuarioLogado = null;
            this.mostrarTela('loginScreen');
            this.mostrarToast('Até logo! 👋', 'sucesso');
        }
    }

    // ===== HOME =====
    async carregarHome() {
        // Saudação
        const hora = new Date().getHours();
        let saudacao = 'Bom dia';
        if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
        if (hora >= 18) saudacao = 'Boa noite';
        
        const nome = this.usuarioLogado?.nome || 'Usuário';
        document.getElementById('saudacao').textContent = `👋 ${saudacao}, ${nome}!`;
        
        // Inicializa mapa
        await mapaService.initMap();
        
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
                <p style="font-size:12px;color:#6B7280;">
                    👥 ${obra.interessados?.length || 0} interessados
                </p>
            </div>
        `).join('');
    }

    // ===== PERFIL =====
    carregarPerfil() {
        if (!this.usuarioLogado) return;

        document.getElementById('perfilNome').textContent = this.usuarioLogado.nome;
        
        const tipo = this.usuarioLogado.tipo === 'profissional' ? '👷 Profissional' : '🏢 Empreiteiro';
        document.getElementById('perfilInfo').textContent = 
            `${tipo} • ${this.usuarioLogado.email}`;
        
        const score = this.usuarioLogado.score || 0;
        const estrelas = '⭐'.repeat(Math.round(score));
        document.getElementById('perfilScore').innerHTML = 
            `${estrelas} ${score > 0 ? score.toFixed(1) : 'Sem avaliações'}`;
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

// Inicializa a aplicação quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
