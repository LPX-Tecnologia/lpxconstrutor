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
        console.log('🚀 Inicializando aplicação...');
        
        // Verifica sessão
        const usuario = await authSystem.verificarSessao();
        
        if (usuario) {
            this.usuarioLogado = usuario;
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarVideos();
            this.mostrarTela('loginScreen');
        }
        
        // Configura listeners
        this.configurarEventListeners();
        
        console.log('✅ Aplicação inicializada');
    }

    // ===== NAVEGAÇÃO =====
    mostrarTela(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const tela = document.getElementById(id);
        if (tela) {
            tela.classList.add('active');
            this.telaAtual = id;
            
            // Configura navegação inferior
            const nav = document.getElementById('bottomNav');
            if (nav) {
                const telasComNav = ['homeScreen', 'buscaScreen', 'publicarObraScreen', 'perfilScreen'];
                nav.style.display = telasComNav.includes(id) ? 'flex' : 'none';
            }
            
            // Ações específicas por tela
            this.onTelaCarregada(id);
        }
    }

    onTelaCarregada(id) {
        switch(id) {
            case 'homeScreen':
                this.carregarFeed();
                if (this.usuarioLogado) {
                    this.mostrarMapa();
                }
                break;
            case 'perfilScreen':
                this.carregarMeuPerfil();
                break;
            case 'buscaScreen':
                this.buscarProfissionais();
                break;
        }
    }

    mostrarVideos() {
        document.getElementById('blocoVideos').style.display = 'block';
        const blocoMapa = document.getElementById('blocoMapa');
        if (blocoMapa) blocoMapa.style.display = 'none';
    }

    async mostrarMapa() {
        document.getElementById('blocoVideos').style.display = 'none';
        const blocoMapa = document.getElementById('blocoMapa');
        if (blocoMapa) {
            blocoMapa.style.display = 'block';
            await mapaSystem.initMap();
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

        const resultado = await authSystem.login(email, senha);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast(`Bem-vindo, ${resultado.usuario.nome}!`, 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    async fazerCadastro() {
        const dados = {
            nome: document.getElementById('cadNome')?.value?.trim(),
            email: document.getElementById('cadEmail')?.value?.trim(),
            senha: document.getElementById('cadSenha')?.value,
            tipo: document.getElementById('cadTipo')?.value,
            celular: document.getElementById('cadCelular')?.value?.trim(),
            cpf: document.getElementById('cadCPF')?.value?.replace(/\D/g, ''),
            profissao: document.getElementById('cadProfissao')?.value || '',
            experiencia: document.getElementById('cadExperiencia')?.value || '0'
        };

        const resultado = await authSystem.cadastrar(dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast('Cadastro realizado com sucesso!', 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    async recuperarSenha() {
        const email = document.getElementById('recEmail')?.value?.trim();
        
        if (!email) {
            this.mostrarToast('Digite seu email!', 'erro');
            return;
        }

        const resultado = await authSystem.recuperarSenha(email);
        
        if (resultado.sucesso) {
            this.mostrarToast('Email de recuperação enviado!', 'sucesso');
            this.mostrarTela('loginScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    async sair() {
        await authSystem.logout();
        this.usuarioLogado = null;
        this.mostrarVideos();
        this.mostrarTela('loginScreen');
        this.mostrarToast('Até logo! 👋', 'sucesso');
    }

    // ===== FEED =====
    async carregarFeed() {
        const container = document.getElementById('feedContainer');
        if (!container) return;

        container.innerHTML = '<div class="loading">Carregando...</div>';

        const obras = await database.buscarTodasObras();

        if (obras.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center;padding:40px;">
                    <div style="font-size:60px;">🏗️</div>
                    <h3>Nenhuma obra publicada</h3>
                    <p style="color:#666;">Seja o primeiro a publicar!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = obras.map(obra => this.criarFeedCard(obra)).join('');
    }

    criarFeedCard(obra) {
        const data = obra.dataCriacao ? new Date(obra.dataCriacao.toDate()).toLocaleDateString('pt-BR') : '';
        
        return `
            <div class="feed-card" onclick="app.verDetalheObra('${obra.id}')">
                <div class="feed-card-header">
                    <div class="feed-avatar">🏢</div>
                    <div class="feed-user-info">
                        <div class="feed-user-name">${obra.nome || 'Obra'}</div>
                        <div class="feed-time">📍 ${obra.endereco || ''} • ${data}</div>
                    </div>
                </div>
                <div class="feed-card-image">🏗️</div>
                <div class="feed-card-body">
                    <div class="feed-card-title">${obra.nome}</div>
                    <p>📍 ${obra.endereco}</p>
                    <p>💰 R$ ${obra.valorHora}/h</p>
                    <p style="font-size:11px;color:#F47920;">👆 Clique para ver detalhes</p>
                </div>
            </div>
        `;
    }

    // ===== OBRAS =====
    async publicarObra() {
        if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') {
            this.mostrarToast('Apenas empreiteiros podem publicar!', 'erro');
            return;
        }

        const dados = {
            nome: document.getElementById('obraNome')?.value?.trim(),
            endereco: document.getElementById('obraEndereco')?.value?.trim(),
            descricao: document.getElementById('obraDescricao')?.value?.trim(),
            profissoes: document.getElementById('obraProfissoes')?.value?.trim(),
            valorHora: document.getElementById('obraValorHora')?.value,
            usuarioId: this.usuarioLogado.id
        };

        if (!dados.nome || !dados.endereco) {
            this.mostrarToast('Nome e endereço são obrigatórios!', 'erro');
            return;
        }

        // Obtém localização
        try {
            const position = await this.getCurrentPosition();
            dados.lat = position.lat;
            dados.lng = position.lng;
        } catch (error) {
            this.mostrarToast('Ative a localização para publicar!', 'erro');
            return;
        }

        const resultado = await database.criarObra(dados);
        
        if (resultado.sucesso) {
            this.mostrarToast('Obra publicada com sucesso!', 'sucesso');
            this.limparFormularioObra();
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalização não suportada'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }),
                error => reject(error),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    }

    limparFormularioObra() {
        ['obraNome', 'obraEndereco', 'obraDescricao', 'obraProfissoes', 'obraValorHora']
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
    }

    async verDetalheObra(obraId) {
        const obra = await database.buscarObraPorId(obraId);
        if (!obra) {
            this.mostrarToast('Obra não encontrada!', 'erro');
            return;
        }

        const container = document.getElementById('detalheObraConteudo');
        if (!container) return;

        let html = `
            <div style="text-align:center;margin-bottom:20px;">
                <div style="font-size:60px;">🏗️</div>
                <h2 style="color:#1A3A5C;">${obra.nome}</h2>
            </div>
            <div class="card">
                <p><strong>📍 Endereço:</strong> ${obra.endereco}</p>
                <p><strong>📝 Descrição:</strong> ${obra.descricao || 'Não informado'}</p>
                <p><strong>💰 Valor:</strong> R$ ${obra.valorHora}/h</p>
                <p><strong>👷 Profissões:</strong> ${obra.profissoes || 'Não informado'}</p>
                <p><strong>👥 Interessados:</strong> ${obra.interessados?.length || 0}</p>
            </div>
        `;

        // Botões de ação
        if (this.usuarioLogado) {
            if (this.usuarioLogado.tipo === 'profissional') {
                const jaCandidatou = obra.interessados?.some(i => i === this.usuarioLogado.id);
                if (jaCandidatou) {
                    html += '<div class="alert-card">✅ Você já demonstrou interesse!</div>';
                } else {
                    html += `<button class="btn btn-primary" onclick="app.candidatarObra('${obra.id}')">
                        ✋ TENHO INTERESSE
                    </button>`;
                }
            }
        }

        html += '<button class="btn btn-outline" onclick="app.mostrarTela(\'homeScreen\')">← Voltar</button>';
        
        container.innerHTML = html;
        this.mostrarTela('detalheObraScreen');
    }

    async candidatarObra(obraId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        const obra = await database.buscarObraPorId(obraId);
        if (!obra) return;

        if (!obra.interessados) obra.interessados = [];
        
        if (obra.interessados.includes(this.usuarioLogado.id)) {
            this.mostrarToast('Você já demonstrou interesse!', 'erro');
            return;
        }

        obra.interessados.push(this.usuarioLogado.id);
        
        const resultado = await database.atualizarObra(obraId, {
            interessados: obra.interessados
        });

        if (resultado.sucesso) {
            this.mostrarToast('Interesse registrado!', 'sucesso');
            this.verDetalheObra(obraId);
        } else {
            this.mostrarToast('Erro ao registrar interesse!', 'erro');
        }
    }

    // ===== PERFIL =====
    carregarMeuPerfil() {
        if (!this.usuarioLogado) return;

        document.getElementById('perfilNome').textContent = this.usuarioLogado.nome;
        document.getElementById('perfilProfissao').textContent = 
            this.usuarioLogado.tipo === 'profissional' 
                ? `${this.usuarioLogado.profissao} • ${this.usuarioLogado.experiencia} anos`
                : 'EMPREITEIRO';
        
        document.getElementById('editNome').value = this.usuarioLogado.nome || '';
        document.getElementById('editCelular').value = this.usuarioLogado.celular || '';
        document.getElementById('editEmail').value = this.usuarioLogado.email || '';
    }

    async salvarPerfil() {
        if (!this.usuarioLogado) return;

        const dados = {
            nome: document.getElementById('editNome').value.trim(),
            celular: document.getElementById('editCelular').value.trim()
        };

        const resultado = await database.atualizarUsuario(this.usuarioLogado.id, dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado.nome = dados.nome;
            this.usuarioLogado.celular = dados.celular;
            this.mostrarToast('Perfil atualizado!', 'sucesso');
            this.carregarMeuPerfil();
        } else {
            this.mostrarToast('Erro ao atualizar perfil!', 'erro');
        }
    }

    // ===== BUSCA =====
    async buscarProfissionais() {
        const termo = document.getElementById('buscaInput')?.value?.toLowerCase() || '';
        const container = document.getElementById('buscaResultados');
        if (!container) return;

        container.innerHTML = '<div class="loading">Buscando...</div>';

        const usuarios = await database.buscarTodosUsuarios();
        const profissionais = usuarios.filter(u => 
            u.tipo === 'profissional' && 
            (!termo || u.nome.toLowerCase().includes(termo) || u.profissao?.toLowerCase().includes(termo))
        );

        if (profissionais.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:#999;">Nenhum profissional encontrado</p>';
            return;
        }

        container.innerHTML = profissionais.map(p => this.criarCardProfissional(p)).join('');
    }

    criarCardProfissional(profissional) {
        const whatsapp = profissional.celular?.replace(/\D/g, '');
        
        return `
            <div class="card">
                <div style="display:flex;align-items:center;margin-bottom:10px;">
                    <div class="lista-avatar">👷</div>
                    <div style="margin-left:14px;">
                        <div class="lista-nome">${profissional.nome}</div>
                        <div class="lista-detalhe">
                            ${profissional.profissao || 'Profissional'} • 
                            ${profissional.experiencia || 0} anos
                        </div>
                        <div style="color:#F47920;">
                            ${'⭐'.repeat(Math.round(profissional.score || 0))}
                            ${profissional.score || 'Sem avaliações'}
                        </div>
                    </div>
                </div>
                <div style="display:flex;gap:8px;">
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}" target="_blank" 
                           style="flex:1;text-decoration:none;">
                            <button class="btn btn-small" style="background:#25D366;color:white;width:100%;">
                                💬 WhatsApp
                            </button>
                        </a>
                    ` : ''}
                    <button class="btn btn-small btn-outline" 
                            onclick="app.adicionarAmigo('${profissional.id}')" 
                            style="flex:1;">
                        ➕ Amigo
                    </button>
                </div>
            </div>
        `;
    }

    // ===== CONEXÕES =====
    async adicionarAmigo(amigoId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        if (this.usuarioLogado.id === amigoId) {
            this.mostrarToast('Você não pode se adicionar!', 'erro');
            return;
        }

        const resultado = await database.criarConexao({
            usuarioId: this.usuarioLogado.id,
            amigoId: amigoId
        });

        if (resultado.sucesso) {
            this.mostrarToast('Solicitação enviada!', 'sucesso');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    // ===== UTILITÁRIOS =====
    mostrarToast(mensagem, tipo = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = mensagem;
        toast.style.background = tipo === 'erro' ? '#EF4444' : 
                                 tipo === 'sucesso' ? '#10B981' : '#1F2937';
        toast.style.display = 'block';

        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    configurarEventListeners() {
        // Exemplo: tecla Enter no login
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.telaAtual === 'loginScreen') {
                    this.fazerLogin();
                }
            }
        });
    }
}

// Inicializa aplicação
const app = new App();

// Exporta para uso global
window.app = app;