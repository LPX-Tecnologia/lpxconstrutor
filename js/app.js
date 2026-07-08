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
        const resultado = await authService.login(email, senha);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast(`Bem-vindo, ${resultado.usuario.nome}!`, 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    proximaEtapa(etapa) {
        document.getElementById('etapa1').style.display = etapa === 1 ? 'block' : 'none';
        document.getElementById('etapa2').style.display = etapa === 2 ? 'block' : 'none';
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
            experiencia: document.getElementById('cadExperiencia')?.value,
            habilidades: document.getElementById('cadHabilidades')?.value
        };

        this.mostrarToast('Cadastrando...', 'info');
        const resultado = await authService.cadastrar(dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast('Cadastro realizado!', 'sucesso');
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
        }
    }

    toggleProfissao() {
        const tipo = document.getElementById('cadTipo')?.value;
        const grupo = document.getElementById('grupoProfissao');
        if (grupo) {
            grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
        }
    }

    async sair() {
        await authService.logout();
        this.usuarioLogado = null;
        this.mostrarTela('loginScreen');
        this.mostrarToast('Até logo! 👋', 'sucesso');
    }

    // ===== HOME =====
    async carregarHome() {
        if (!this.usuarioLogado) return;

        // Inicializa mapa
        if (typeof mapaService !== 'undefined') {
            await mapaService.initMap();
        }

        // Carrega feed
        await this.carregarFeed();
    }

    async carregarFeed() {
        const container = document.getElementById('feedContainer');
        if (!container) return;

        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando vagas...</div>';

        try {
            const snapshot = await db.collection('vagas')
                .where('ativa', '==', true)
                .orderBy('dataCriacao', 'desc')
                .limit(20)
                .get();

            if (snapshot.empty) {
                container.innerHTML = `
                    <div class="card" style="text-align:center; padding:40px;">
                        <i class="fas fa-hard-hat" style="font-size:60px; color:#ccc;"></i>
                        <h3 style="margin-top:16px;">Nenhuma vaga publicada</h3>
                        <p style="color:#999;">Seja o primeiro a publicar!</p>
                    </div>
                `;
                return;
            }

            const vagas = [];
            for (const doc of snapshot.docs) {
                const vaga = { id: doc.id, ...doc.data() };
                // Busca dados do autor
                const autorDoc = await db.collection('usuarios').doc(vaga.usuarioId).get();
                vaga.autor = autorDoc.exists ? autorDoc.data() : null;
                vagas.push(vaga);
            }

            container.innerHTML = vagas.map(vaga => this.criarVagaCard(vaga)).join('');

        } catch (error) {
            console.error('Erro ao carregar feed:', error);
            container.innerHTML = '<div class="card">Erro ao carregar vagas</div>';
        }
    }

    criarVagaCard(vaga) {
        const autor = vaga.autor || {};
        const whatsapp = autor.celular ? autor.celular.replace(/\D/g, '') : '';
        
        return `
            <div class="vaga-card" onclick="app.verVaga('${vaga.id}')">
                <div class="vaga-header">
                    <div class="vaga-avatar">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="vaga-info">
                        <div class="vaga-nome">${autor.nome || 'Empreiteiro'}</div>
                        <div class="vaga-data">
                            <i class="fas fa-map-marker-alt"></i> ${vaga.endereco || 'Local não informado'}
                        </div>
                    </div>
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}" target="_blank" 
                           onclick="event.stopPropagation()" class="btn-whatsapp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    ` : ''}
                </div>
                <div class="vaga-body">
                    <div class="vaga-titulo">${vaga.titulo || 'Vaga disponível'}</div>
                    <div class="vaga-descricao">${vaga.descricao || ''}</div>
                    <div class="vaga-tags">
                        <span class="vaga-tag">💰 R$ ${vaga.valorHora}/h</span>
                        <span class="vaga-tag">👷 ${vaga.profissoes || 'Geral'}</span>
                    </div>
                </div>
                <div class="vaga-footer">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); app.candidatarVaga('${vaga.id}')">
                        <i class="fas fa-hand-paper"></i> Quero!
                    </button>
                    <button class="btn btn-outline btn-small" onclick="event.stopPropagation(); app.verPerfil('${vaga.usuarioId}')">
                        <i class="fas fa-user"></i> Perfil
                    </button>
                </div>
            </div>
        `;
    }

    // ===== PERFIL =====
    async verPerfil(usuarioId) {
        const doc = await db.collection('usuarios').doc(usuarioId).get();
        if (!doc.exists) {
            this.mostrarToast('Usuário não encontrado', 'erro');
            return;
        }

        this.usuarioSelecionado = { id: doc.id, ...doc.data() };
        const usuario = this.usuarioSelecionado;
        const whatsapp = usuario.celular ? usuario.celular.replace(/\D/g, '') : '';

        const container = document.getElementById('perfilPublicoConteudo');
        container.innerHTML = `
            <div class="profile-header-container">
                <div class="profile-cover"></div>
                <div class="profile-avatar-container">
                    <div class="profile-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
            
            <div class="profile-info-card">
                <h2>${usuario.nome}</h2>
                <p><i class="fas fa-tools"></i> ${usuario.profissao || 'Profissional'}</p>
                <p><i class="fas fa-calendar"></i> ${usuario.experiencia || 0} anos de experiência</p>
                <div class="stars-container">
                    ${'⭐'.repeat(Math.round(usuario.score || 0))} 
                    ${usuario.score ? usuario.score.toFixed(1) : 'Sem avaliações'}
                </div>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Habilidades</h3>
                <p>${usuario.habilidades || 'Não informado'}</p>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-phone"></i> Contato</h3>
                <p><i class="fab fa-whatsapp"></i> ${usuario.celular || 'Não informado'}</p>
                <p><i class="fas fa-envelope"></i> ${usuario.email}</p>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                ${whatsapp ? `
                    <a href="https://wa.me/55${whatsapp}?text=Olá ${usuario.nome}! Vi seu perfil no LPXConstrutor." 
                       target="_blank" class="btn btn-success">
                        <i class="fab fa-whatsapp"></i> Chamar no WhatsApp
                    </a>
                ` : ''}
                
                <button class="btn btn-primary" onclick="app.iniciarChat('${usuario.id}')">
                    <i class="fas fa-comments"></i> Conversar no App
                </button>
                
                <button class="btn btn-outline" onclick="app.avaliarUsuario('${usuario.id}')">
                    <i class="fas fa-star"></i> Avaliar
                </button>
            </div>
        `;

        this.mostrarTela('perfilPublicoScreen');
    }

    carregarMeuPerfil() {
        if (!this.usuarioLogado) return;

        const u = this.usuarioLogado;
        document.getElementById('meuPerfilNome').textContent = u.nome;
        document.getElementById('meuPerfilProfissao').textContent = 
            `${u.profissao || 'Profissional'} • ${u.experiencia || 0} anos`;
        
        document.getElementById('meuPerfilAvaliacao').innerHTML = 
            '⭐'.repeat(Math.round(u.score || 0)) + 
            ` ${u.score ? u.score.toFixed(1) : 'Sem avaliações'}`;
        
        document.getElementById('editNome').value = u.nome || '';
        document.getElementById('editCelular').value = u.celular || '';
        document.getElementById('editHabilidades').value = u.habilidades || '';
    }

    async salvarPerfil() {
        const dados = {
            nome: document.getElementById('editNome').value,
            celular: document.getElementById('editCelular').value,
            habilidades: document.getElementById('editHabilidades').value
        };

        await databaseService.atualizarUsuario(this.usuarioLogado.id, dados);
        this.usuarioLogado = { ...this.usuarioLogado, ...dados };
        this.mostrarToast('Perfil atualizado!', 'sucesso');
    }

    // ===== VAGAS =====
    async publicarVaga() {
        if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') {
            this.mostrarToast('Apenas empreiteiros podem publicar vagas', 'erro');
            return;
        }

        const titulo = prompt('Título da vaga:');
        if (!titulo) return;
        
        const descricao = prompt('Descrição:');
        const endereco = prompt('Endereço da obra:');
        const valorHora = prompt('Valor por hora (R$):', '25');
        const profissoes = prompt('Profissões necessárias (separadas por vírgula):');

        if (!endereco) {
            this.mostrarToast('Endereço é obrigatório', 'erro');
            return;
        }

        this.mostrarToast('Publicando vaga...', 'info');

        try {
            // Pega localização
            const position = await this.getCurrentPosition();

            const vaga = {
                titulo,
                descricao,
                endereco,
                valorHora: parseFloat(valorHora) || 25,
                profissoes,
                lat: position.lat,
                lng: position.lng,
                usuarioId: this.usuarioLogado.id,
                interessados: [],
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativa: true
            };

            await db.collection('vagas').add(vaga);
            this.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
            this.carregarFeed();

        } catch (error) {
            console.error('Erro ao publicar:', error);
            this.mostrarToast('Erro ao publicar vaga', 'erro');
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
                { timeout: 5000 }
            );
        });
    }

    async candidatarVaga(vagaId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        const vagaDoc = await db.collection('vagas').doc(vagaId).get();
        if (!vagaDoc.exists) return;

        const vaga = vagaDoc.data();
        if (!vaga.interessados) vaga.interessados = [];

        if (vaga.interessados.includes(this.usuarioLogado.id)) {
            this.mostrarToast('Você já se candidatou!', 'erro');
            return;
        }

        vaga.interessados.push(this.usuarioLogado.id);
        await db.collection('vagas').doc(vagaId).update({
            interessados: vaga.interessados
        });

        this.mostrarToast('✅ Interesse registrado!', 'sucesso');
    }

    // ===== CHAT =====
    async iniciarChat(usuarioId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        const doc = await db.collection('usuarios').doc(usuarioId).get();
        if (!doc.exists) return;

        this.usuarioSelecionado = { id: doc.id, ...doc.data() };
        
        document.getElementById('chatHeaderInfo').innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fas fa-user-circle" style="font-size:32px;"></i>
                <div>
                    <strong>${this.usuarioSelecionado.nome}</strong>
                    <div style="font-size:12px; color:#999;">${this.usuarioSelecionado.profissao || 'Profissional'}</div>
                </div>
            </div>
        `;

        this.carregarMensagens();
        this.mostrarTela('chatScreen');
    }

    async carregarMensagens() {
        if (!this.usuarioSelecionado) return;

        const container = document.getElementById('chatMessages');
        container.innerHTML = '<div class="loading">Carregando mensagens...</div>';

        try {
            const snapshot = await db.collection('mensagens')
                .where('participantes', 'array-contains', this.usuarioLogado.id)
                .orderBy('dataEnvio', 'asc')
                .get();

            const mensagens = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(m => 
                    m.participantes.includes(this.usuarioSelecionado.id)
                );

            container.innerHTML = mensagens.map(m => `
                <div class="message ${m.remetenteId === this.usuarioLogado.id ? 'message-sent' : 'message-received'}">
                    ${m.conteudo}
                    <div class="message-time">
                        ${m.dataEnvio ? new Date(m.dataEnvio.toDate()).toLocaleTimeString() : ''}
                    </div>
                </div>
            `).join('');

            container.scrollTop = container.scrollHeight;

        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            container.innerHTML = '<div class="card">Erro ao carregar mensagens</div>';
        }
    }

    async enviarMensagem() {
        const input = document.getElementById('chatInput');
        const conteudo = input.value.trim();
        
        if (!conteudo || !this.usuarioSelecionado) return;

        try {
            await db.collection('mensagens').add({
                remetenteId: this.usuarioLogado.id,
                destinatarioId: this.usuarioSelecionado.id,
                participantes: [this.usuarioLogado.id, this.usuarioSelecionado.id],
                conteudo,
                dataEnvio: firebase.firestore.FieldValue.serverTimestamp(),
                lida: false
            });

            input.value = '';
            await this.carregarMensagens();

        } catch (error) {
            console.error('Erro ao enviar:', error);
            this.mostrarToast('Erro ao enviar mensagem', 'erro');
        }
    }

    // ===== AVALIAÇÃO =====
    async avaliarUsuario(usuarioId) {
        const nota = prompt('Dê uma nota de 1 a 5:');
        if (!nota || isNaN(nota) || nota < 1 || nota > 5) {
            this.mostrarToast('Nota inválida!', 'erro');
            return;
        }

        const comentario = prompt('Comentário (opcional):') || '';

        await databaseService.avaliarUsuario(
            this.usuarioLogado.id,
            usuarioId,
            parseInt(nota),
            comentario
        );

        this.mostrarToast('✅ Avaliação enviada!', 'sucesso');
    }

    // ===== BUSCA =====
    async buscarProfissionais() {
        const termo = document.getElementById('buscaInput')?.value?.toLowerCase() || '';
        const container = document.getElementById('buscaResultados');
        if (!container) return;

        container.innerHTML = '<div class="loading">Buscando...</div>';

        try {
            const usuarios = await databaseService.buscarTodosUsuarios();
            const filtrados = usuarios.filter(u => 
                u.tipo === 'profissional' && 
                (!termo || 
                 u.nome.toLowerCase().includes(termo) || 
                 u.profissao?.toLowerCase().includes(termo))
            );

            if (filtrados.length === 0) {
                container.innerHTML = '<div class="card" style="text-align:center;">Nenhum profissional encontrado</div>';
                return;
            }

            container.innerHTML = filtrados.map(u => this.criarCardProfissional(u)).join('');

        } catch (error) {
            container.innerHTML = '<div class="card">Erro ao buscar</div>';
        }
    }

    criarCardProfissional(usuario) {
        const whatsapp = usuario.celular?.replace(/\D/g, '');
        
        return `
            <div class="vaga-card" style="cursor:pointer;" onclick="app.verPerfil('${usuario.id}')">
                <div class="vaga-header">
                    <div class="vaga-avatar">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                    <div class="vaga-info">
                        <div class="vaga-nome">${usuario.nome}</div>
                        <div class="vaga-data">${usuario.profissao || 'Profissional'} • ${usuario.experiencia || 0} anos</div>
                    </div>
                    <div class="stars-container" style="font-size:14px;">
                        ${'⭐'.repeat(Math.round(usuario.score || 0))}
                    </div>
                </div>
                <div class="vaga-footer">
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}" target="_blank" 
                           class="btn btn-success btn-small" onclick="event.stopPropagation()">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); app.iniciarChat('${usuario.id}')">
                        <i class="fas fa-comments"></i> Chat
                    </button>
                </div>
            </div>
        `;
    }

    // ===== REDE =====
    async carregarRede() {
        const container = document.getElementById('redeContainer');
        if (!container) return;

        container.innerHTML = '<div class="loading">Carregando rede...</div>';

        try {
            const conexoes = await databaseService.buscarConexoes(this.usuarioLogado.id);
            
            if (conexoes.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align:center; padding:40px;">
                        <i class="fas fa-users" style="font-size:60px; color:#ccc;"></i>
                        <h3>Sua rede está vazia</h3>
                        <p>Conecte-se com profissionais e empreiteiros</p>
                    </div>
                `;
                return;
            }

            // Busca dados dos usuários conectados
            const usuariosConectados = [];
            for (const conexao of conexoes) {
                const amigoId = conexao.usuarioId === this.usuarioLogado.id ? 
                               conexao.amigoId : conexao.usuarioId;
                const doc = await db.collection('usuarios').doc(amigoId).get();
                if (doc.exists) {
                    usuariosConectados.push({ id: doc.id, ...doc.data() });
                }
            }

            container.innerHTML = usuariosConectados.map(u => this.criarCardProfissional(u)).join('');

        } catch (error) {
            container.innerHTML = '<div class="card">Erro ao carregar rede</div>';
        }
    }

    // ===== NOTIFICAÇÕES =====
    mostrarNotificacoes() {
        this.mostrarTela('notificacoesScreen');
    }

    carregarNotificacoes() {
        const container = document.getElementById('notificacoesContainer');
        if (!container) return;

        if (this.notificacoes.length === 0) {
            container.innerHTML = '<div class="card" style="text-align:center;">Nenhuma notificação</div>';
            return;
        }

        container.innerHTML = this.notificacoes.map(n => `
            <div class="card">
                <p><strong>${n.titulo}</strong></p>
                <p style="color:#999; font-size:13px;">${n.mensagem}</p>
            </div>
        `).join('');
    }

    // ===== UTILITÁRIOS =====
    mostrarToast(mensagem, tipo = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = mensagem;
        toast.style.background = tipo === 'erro' ? '#EF4444' : 
                                 tipo === 'sucesso' ? '#10B981' : '#1F2937';
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// Inicializa o app
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
