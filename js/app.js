// ==========================================================
// ===== APLICAÇÃO PRINCIPAL - COMPLETA E CORRIGIDA =====
// ==========================================================

class App {
    constructor() {
        this.usuarioLogado = null;
        this.usuarioSelecionado = null;
        this.chatAtivo = null;
        this.notificacoes = [];
        this.telaAtual = 'loginScreen';
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando LPXConstrutor...');
        
        // Monitora autenticação
        authService.onAuthStateChange((usuario) => {
            if (usuario) {
                this.usuarioLogado = usuario;
                console.log('✅ Logado:', usuario.nome);
                
                // Atualiza botão publicar
                this.atualizarBotaoPublicar();
                
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

    // ===== ATUALIZA BOTÃO PUBLICAR =====
    atualizarBotaoPublicar() {
        const btnPublicar = document.getElementById('btnPublicar');
        if (!btnPublicar) return;

        if (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') {
            btnPublicar.style.display = 'flex';
        } else {
            btnPublicar.style.display = 'none';
        }
    }

    // ===== NAVEGAÇÃO =====
    mostrarTela(id) {
        console.log('📱 Mostrando tela:', id);
        
        // Esconde todas as telas
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        // Mostra tela selecionada
        const tela = document.getElementById(id);
        if (tela) {
            tela.classList.add('active');
            this.telaAtual = id;
            
            // Atualiza bottom nav
            const nav = document.getElementById('bottomNav');
            if (nav) {
                const telasComNav = ['homeScreen', 'buscaScreen', 'meuPerfilScreen', 'chatScreen'];
                nav.style.display = telasComNav.includes(id) ? 'flex' : 'none';
                
                // Destaca item ativo
                nav.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-screen') === id) {
                        item.classList.add('active');
                    }
                });
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
        }
    }

    mudarTab(tab) {
        // Atualiza botões
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        event.target.closest('.tab').classList.add('active');
        
        // Mostra/esconde containers
        document.getElementById('feedContainer').style.display = tab === 'feed' ? 'block' : 'none';
        document.getElementById('redeContainer').style.display = tab === 'rede' ? 'block' : 'none';
        
        // Carrega conteúdo
        if (tab === 'feed') this.carregarFeed();
        if (tab === 'rede') this.carregarRede();
    }

    // ===== AUTENTICAÇÃO =====
    async fazerLogin() {
        const email = document.getElementById('loginEmail')?.value?.trim();
        const senha = document.getElementById('loginSenha')?.value;

        if (!email || !senha) {
            this.mostrarToast('❌ Preencha todos os campos!', 'erro');
            return;
        }

        this.mostrarToast('Entrando...', 'info');
        
        try {
            const resultado = await authService.login(email, senha);
            
            if (resultado.sucesso) {
                this.usuarioLogado = resultado.usuario;
                this.mostrarToast(`✅ Bem-vindo, ${resultado.usuario.nome}!`, 'sucesso');
                this.atualizarBotaoPublicar();
                this.mostrarTela('homeScreen');
            } else {
                this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.mostrarToast('❌ Erro ao fazer login. Tente novamente.', 'erro');
        }
    }

    // ===== NAVEGAÇÃO DAS ETAPAS DO CADASTRO =====
    proximaEtapa(etapa) {
        console.log('🔄 Indo para etapa:', etapa);
        
        const etapa1 = document.getElementById('etapa1');
        const etapa2 = document.getElementById('etapa2');
        
        if (!etapa1 || !etapa2) {
            console.error('❌ Elementos das etapas não encontrados');
            return;
        }
        
        if (etapa === 1) {
            // Voltar para etapa 1
            etapa1.style.display = 'block';
            etapa2.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } else if (etapa === 2) {
            // Validar campos antes de avançar
            const nome = document.getElementById('cadNome')?.value?.trim();
            const email = document.getElementById('cadEmail')?.value?.trim();
            const celular = document.getElementById('cadCelular')?.value?.trim();
            const cpf = document.getElementById('cadCPF')?.value?.trim();
            const senha = document.getElementById('cadSenha')?.value;
            
            // Validações
            if (!nome || nome.length < 3) {
                this.mostrarToast('❌ Nome deve ter pelo menos 3 caracteres', 'erro');
                return;
            }
            
            if (!email || !email.includes('@') || !email.includes('.')) {
                this.mostrarToast('❌ Email inválido', 'erro');
                return;
            }
            
            if (!celular || celular.length < 10) {
                this.mostrarToast('❌ Celular inválido', 'erro');
                return;
            }
            
            if (!senha || senha.length < 6) {
                this.mostrarToast('❌ Senha deve ter pelo menos 6 caracteres', 'erro');
                return;
            }
            
            // Avançar para etapa 2
            etapa1.style.display = 'none';
            etapa2.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('✅ Etapa 2 exibida');
        }
    }

    toggleProfissao() {
        const tipo = document.getElementById('cadTipo')?.value;
        const grupo = document.getElementById('grupoProfissao');
        if (grupo) {
            grupo.style.display = tipo === 'profissional' ? 'block' : 'none';
        }
    }

    async cadastrar() {
        console.log('📝 Iniciando cadastro...');
        
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

        // Validações finais
        if (!dados.nome || !dados.email || !dados.senha) {
            this.mostrarToast('❌ Preencha todos os campos obrigatórios!', 'erro');
            return;
        }

        if (dados.tipo === 'profissional' && !dados.profissao) {
            this.mostrarToast('❌ Selecione sua profissão!', 'erro');
            return;
        }

        this.mostrarToast('Cadastrando...', 'info');
        
        try {
            const resultado = await authService.cadastrar(dados);
            
            if (resultado.sucesso) {
                this.usuarioLogado = resultado.usuario;
                this.mostrarToast('✅ Cadastro realizado com sucesso!', 'sucesso');
                this.atualizarBotaoPublicar();
                this.mostrarTela('homeScreen');
            } else {
                this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            this.mostrarToast('❌ Erro ao cadastrar. Tente novamente.', 'erro');
        }
    }

    async recuperarSenha() {
        const email = prompt('Digite seu email para recuperar a senha:');
        if (!email) return;

        try {
            const resultado = await authService.recuperarSenha(email);
            if (resultado.sucesso) {
                this.mostrarToast('✅ Email de recuperação enviado!', 'sucesso');
            } else {
                this.mostrarToast(`❌ ${resultado.erro}`, 'erro');
            }
        } catch (error) {
            this.mostrarToast('❌ Erro ao enviar email de recuperação', 'erro');
        }
    }

    async sair() {
        try {
            await authService.logout();
            this.usuarioLogado = null;
            this.mostrarTela('loginScreen');
            this.mostrarToast('👋 Até logo!', 'sucesso');
        } catch (error) {
            console.error('Erro ao sair:', error);
        }
    }

    // ===== HOME =====
    async carregarHome() {
        if (!this.usuarioLogado) return;

        // Atualiza saudação
        const hora = new Date().getHours();
        let saudacao = 'Bom dia';
        if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
        if (hora >= 18) saudacao = 'Boa noite';
        
        document.getElementById('saudacao').textContent = `👋 ${saudacao}, ${this.usuarioLogado.nome}!`;
        document.getElementById('resumoTexto').textContent = 
            `${this.usuarioLogado.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional'} • ${this.usuarioLogado.profissao || this.usuarioLogado.tipo}`;

        // Inicializa mapa
        if (typeof mapaService !== 'undefined') {
            try {
                await mapaService.initMap();
            } catch (e) {
                console.warn('Mapa não inicializado:', e);
            }
        }

        // Carrega feed
        await this.carregarFeed();
    }

    async carregarFeed() {
        const container = document.getElementById('feedContainer');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <i class="fas fa-spinner fa-spin" style="font-size:40px; color:#F47920;"></i>
                <p style="margin-top:16px; color:#666;">Carregando vagas...</p>
            </div>
        `;

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
                        <h3 style="margin-top:16px; color:#1A3A5C;">Nenhuma vaga publicada</h3>
                        <p style="color:#999;">Seja o primeiro a publicar!</p>
                        ${this.usuarioLogado?.tipo === 'empreiteiro' ? `
                            <button class="btn btn-primary" onclick="app.publicarVaga()" style="margin-top:16px;">
                                <i class="fas fa-plus-circle"></i> PUBLICAR VAGA
                            </button>
                        ` : ''}
                    </div>
                `;
                return;
            }

            const vagas = [];
            for (const doc of snapshot.docs) {
                const vaga = { id: doc.id, ...doc.data() };
                try {
                    const autorDoc = await db.collection('usuarios').doc(vaga.usuarioId).get();
                    vaga.autor = autorDoc.exists ? autorDoc.data() : null;
                } catch (e) {
                    vaga.autor = null;
                }
                vagas.push(vaga);
            }

            container.innerHTML = vagas.map(vaga => this.criarVagaCard(vaga)).join('');

        } catch (error) {
            console.error('Erro ao carregar feed:', error);
            container.innerHTML = `
                <div class="card" style="text-align:center;">
                    <i class="fas fa-exclamation-triangle" style="font-size:40px; color:#EF4444;"></i>
                    <p style="margin-top:16px;">Erro ao carregar vagas</p>
                    <button class="btn btn-outline btn-small" onclick="app.carregarFeed()" style="margin-top:8px;">
                        <i class="fas fa-redo"></i> Tentar novamente
                    </button>
                </div>
            `;
        }
    }

    criarVagaCard(vaga) {
        const autor = vaga.autor || {};
        const whatsapp = autor.celular ? autor.celular.replace(/\D/g, '') : '';
        const data = vaga.dataCriacao ? new Date(vaga.dataCriacao.toDate()).toLocaleDateString('pt-BR') : '';
        
        return `
            <div class="vaga-card">
                <div class="vaga-header" onclick="app.verPerfil('${vaga.usuarioId}')" style="cursor:pointer;">
                    <div class="vaga-avatar">
                        ${autor.fotoPerfil ? 
                            `<img src="${autor.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : 
                            '<i class="fas fa-user-tie"></i>'
                        }
                    </div>
                    <div class="vaga-info">
                        <div class="vaga-nome">${autor.nome || 'Empreiteiro'}</div>
                        <div class="vaga-data">
                            <i class="fas fa-map-marker-alt"></i> ${vaga.endereco || 'Local não informado'} • ${data}
                        </div>
                    </div>
                    <div class="vaga-stars">
                        ${'⭐'.repeat(Math.round(autor.score || 0))}
                    </div>
                </div>
                <div class="vaga-body">
                    <div class="vaga-titulo">🏗️ ${vaga.titulo || 'Vaga disponível'}</div>
                    <div class="vaga-descricao">${vaga.descricao || 'Sem descrição'}</div>
                    <div class="vaga-tags">
                        <span class="vaga-tag">💰 R$ ${vaga.valorHora || '0'}/h</span>
                        <span class="vaga-tag">👷 ${vaga.profissoes || 'Todas'}</span>
                        ${vaga.interessados ? 
                            `<span class="vaga-tag">👥 ${vaga.interessados.length} interessados</span>` : ''}
                    </div>
                </div>
                <div class="vaga-footer">
                    ${this.usuarioLogado && this.usuarioLogado.tipo === 'profissional' ? `
                        <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); app.candidatarVaga('${vaga.id}')" style="flex:1;">
                            <i class="fas fa-hand-paper"></i> QUERO TRABALHAR
                        </button>
                    ` : ''}
                    
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}?text=${encodeURIComponent('Olá! Vi sua vaga: ' + vaga.titulo)}" 
                           target="_blank" class="btn btn-success btn-small" 
                           style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;"
                           onclick="event.stopPropagation();">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                    
                    <button class="btn btn-outline btn-small" onclick="event.stopPropagation(); app.verPerfil('${vaga.usuarioId}')">
                        <i class="fas fa-user"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // ===== PERFIL =====
    async verPerfil(usuarioId) {
        try {
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
                        <div class="profile-avatar" style="background: ${usuario.fotoPerfil ? 'white' : 'linear-gradient(135deg, #F47920, #E06B1A)'};">
                            ${usuario.fotoPerfil ? 
                                `<img src="${usuario.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` :
                                '<i class="fas fa-user" style="font-size:40px;"></i>'
                            }
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
                
                ${this.usuarioLogado && this.usuarioLogado.id !== usuario.id ? `
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                        ${whatsapp ? `
                            <a href="https://wa.me/55${whatsapp}?text=${encodeURIComponent('Olá ' + usuario.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.')}" 
                               target="_blank" class="btn btn-success">
                                <i class="fab fa-whatsapp"></i> Chamar no WhatsApp
                            </a>
                        ` : ''}
                        
                        <button class="btn btn-primary" onclick="app.iniciarChat('${usuario.id}')">
                            <i class="fas fa-comments"></i> Conversar no Chat
                        </button>
                        
                        <button class="btn btn-outline" onclick="app.avaliarUsuario('${usuario.id}')">
                            <i class="fas fa-star"></i> Avaliar Profissional
                        </button>
                    </div>
                ` : ''}
            `;

            this.mostrarTela('perfilPublicoScreen');

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            this.mostrarToast('Erro ao carregar perfil', 'erro');
        }
    }

    carregarMeuPerfil() {
        if (!this.usuarioLogado) return;

        const u = this.usuarioLogado;
        document.getElementById('meuPerfilNome').textContent = u.nome || 'Usuário';
        document.getElementById('meuPerfilProfissao').textContent = 
            `${u.tipo === 'profissional' ? '👷 Profissional' : '🏢 Empreiteiro'} • ${u.profissao || u.tipo}`;
        
        document.getElementById('meuPerfilAvaliacao').innerHTML = 
            '⭐'.repeat(Math.round(u.score || 0)) + 
            ` ${u.score ? u.score.toFixed(1) : 'Sem avaliações'}`;
        
        document.getElementById('editNome').value = u.nome || '';
        document.getElementById('editCelular').value = u.celular || '';
        document.getElementById('editHabilidades').value = u.habilidades || '';
        
        // Estatísticas
        document.getElementById('statsAvaliacoes').textContent = u.avaliacoesRecebidas || 0;
        this.carregarStatsConexoes();
    }

    async carregarStatsConexoes() {
        try {
            const conexoes = await databaseService.buscarConexoes(this.usuarioLogado.id);
            document.getElementById('statsConexoes').textContent = conexoes.length;
        } catch (e) {
            document.getElementById('statsConexoes').textContent = '0';
        }
    }

    async salvarPerfil() {
        const dados = {
            nome: document.getElementById('editNome').value.trim(),
            celular: document.getElementById('editCelular').value.trim(),
            habilidades: document.getElementById('editHabilidades').value.trim()
        };

        if (!dados.nome) {
            this.mostrarToast('Nome é obrigatório!', 'erro');
            return;
        }

        try {
            await databaseService.atualizarUsuario(this.usuarioLogado.id, dados);
            this.usuarioLogado = { ...this.usuarioLogado, ...dados };
            this.mostrarToast('✅ Perfil atualizado com sucesso!', 'sucesso');
            this.carregarMeuPerfil();
        } catch (error) {
            this.mostrarToast('Erro ao salvar perfil', 'erro');
        }
    }

    async uploadFoto(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.mostrarToast('Enviando foto...', 'info');

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const fotoBase64 = e.target.result;
                await databaseService.atualizarUsuario(this.usuarioLogado.id, { fotoPerfil: fotoBase64 });
                this.usuarioLogado.fotoPerfil = fotoBase64;
                this.mostrarToast('✅ Foto atualizada!', 'sucesso');
                this.carregarMeuPerfil();
            } catch (error) {
                this.mostrarToast('Erro ao enviar foto', 'erro');
            }
        };
        reader.readAsDataURL(file);
    }

    // ===== VAGAS =====
    async publicarVaga() {
        if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'empreiteiro') {
            this.mostrarToast('🚫 Apenas EMPREITEIROS podem publicar vagas!', 'erro');
            return;
        }

        const titulo = prompt('📝 Título da vaga:');
        if (!titulo) return;
        
        const descricao = prompt('📋 Descrição do serviço:');
        const endereco = prompt('📍 Endereço da obra:');
        if (!endereco) {
            this.mostrarToast('Endereço é obrigatório!', 'erro');
            return;
        }

        const valorHora = prompt('💰 Valor por hora (R$):', '25');
        const profissoes = prompt('👷 Profissões necessárias (separadas por vírgula):');

        this.mostrarToast('Publicando vaga...', 'info');

        try {
            const vaga = {
                titulo,
                descricao: descricao || '',
                endereco,
                valorHora: parseFloat(valorHora) || 25,
                profissoes: profissoes || 'Geral',
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
            this.mostrarToast('❌ Erro ao publicar vaga', 'erro');
        }
    }

    async candidatarVaga(vagaId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        if (this.usuarioLogado.tipo !== 'profissional') {
            this.mostrarToast('Apenas profissionais podem se candidatar!', 'erro');
            return;
        }

        try {
            const vagaDoc = await db.collection('vagas').doc(vagaId).get();
            if (!vagaDoc.exists) {
                this.mostrarToast('Vaga não encontrada', 'erro');
                return;
            }

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

            this.mostrarToast('✅ Candidatura enviada!', 'sucesso');
            this.carregarFeed();

        } catch (error) {
            console.error('Erro ao candidatar:', error);
            this.mostrarToast('Erro ao se candidatar', 'erro');
        }
    }

    // ===== CHAT =====
    async iniciarChat(usuarioId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        try {
            const doc = await db.collection('usuarios').doc(usuarioId).get();
            if (!doc.exists) {
                this.mostrarToast('Usuário não encontrado', 'erro');
                return;
            }

            this.usuarioSelecionado = { id: doc.id, ...doc.data() };
            const usuario = this.usuarioSelecionado;

            document.getElementById('chatHeaderInfo').innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:#F47920; display:flex; align-items:center; justify-content:center; color:white;">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <strong>${usuario.nome}</strong>
                        <div style="font-size:12px; color:#10B981;">Online</div>
                    </div>
                </div>
            `;

            this.carregarMensagens();
            this.mostrarTela('chatScreen');

        } catch (error) {
            console.error('Erro ao iniciar chat:', error);
            this.mostrarToast('Erro ao abrir chat', 'erro');
        }
    }

    async carregarMensagens() {
        const container = document.getElementById('chatMessages');
        if (!container || !this.usuarioSelecionado) return;

        try {
            const snapshot = await db.collection('mensagens')
                .where('participantes', 'array-contains', this.usuarioLogado.id)
                .orderBy('dataEnvio', 'asc')
                .get();

            const mensagens = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(m => m.participantes.includes(this.usuarioSelecionado.id));

            if (mensagens.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding:60px 20px;">
                        <i class="fas fa-comments" style="font-size:60px; color:#ccc;"></i>
                        <p style="margin-top:16px; color:#999;">Nenhuma mensagem ainda</p>
                        <p style="color:#999; font-size:13px;">Envie uma mensagem para começar a conversa</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = mensagens.map(m => {
                const isMine = m.remetenteId === this.usuarioLogado.id;
                const hora = m.dataEnvio ? new Date(m.dataEnvio.toDate()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
                
                return `
                    <div class="message ${isMine ? 'message-sent' : 'message-received'}">
                        <div class="message-content">${m.conteudo}</div>
                        <div class="message-footer">
                            <span class="message-time">${hora}</span>
                            ${isMine ? '<span class="message-status">✓</span>' : ''}
                        </div>
                    </div>
                `;
            }).join('');

            container.scrollTop = container.scrollHeight;

        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            container.innerHTML = '<div style="text-align:center; padding:40px;">Erro ao carregar mensagens</div>';
        }
    }

    async enviarMensagem() {
        const input = document.getElementById('chatInput');
        const conteudo = input?.value?.trim();
        
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
        const nota = prompt('Dê uma nota de 1 a 5 estrelas:');
        if (!nota || isNaN(nota) || nota < 1 || nota > 5) {
            this.mostrarToast('Nota inválida! Deve ser entre 1 e 5.', 'erro');
            return;
        }

        const comentario = prompt('Deixe um comentário (opcional):') || '';

        try {
            await databaseService.avaliarUsuario(
                this.usuarioLogado.id,
                usuarioId,
                parseInt(nota),
                comentario
            );
            this.mostrarToast('✅ Avaliação enviada!', 'sucesso');
        } catch (error) {
            this.mostrarToast('Erro ao avaliar', 'erro');
        }
    }

    // ===== BUSCA =====
    async buscarProfissionais() {
        const termo = document.getElementById('buscaInput')?.value?.toLowerCase() || '';
        const container = document.getElementById('buscaResultados');
        if (!container) return;

        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>';

        try {
            const usuarios = await databaseService.buscarTodosUsuarios();
            const filtrados = usuarios.filter(u => 
                u.tipo === 'profissional' && 
                (!termo || 
                 u.nome?.toLowerCase().includes(termo) || 
                 u.profissao?.toLowerCase().includes(termo))
            );

            if (filtrados.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align:center;">
                        <i class="fas fa-search" style="font-size:40px; color:#ccc;"></i>
                        <p style="margin-top:12px;">Nenhum profissional encontrado</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtrados.map(u => {
                const whatsapp = u.celular?.replace(/\D/g, '');
                return `
                    <div class="vaga-card" style="cursor:pointer;">
                        <div class="vaga-header" onclick="app.verPerfil('${u.id}')">
                            <div class="vaga-avatar">
                                <i class="fas fa-hard-hat"></i>
                            </div>
                            <div class="vaga-info">
                                <div class="vaga-nome">${u.nome}</div>
                                <div class="vaga-data">${u.profissao || 'Profissional'} • ${u.experiencia || 0} anos</div>
                            </div>
                            <div class="stars-container" style="font-size:14px;">
                                ${'⭐'.repeat(Math.round(u.score || 0))}
                            </div>
                        </div>
                        <div class="vaga-footer">
                            ${whatsapp ? `
                                <a href="https://wa.me/55${whatsapp}" target="_blank" 
                                   class="btn btn-success btn-small" style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;"
                                   onclick="event.stopPropagation();">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </a>
                            ` : ''}
                            <button class="btn btn-primary btn-small" 
                                    onclick="event.stopPropagation(); app.iniciarChat('${u.id}')" style="flex:1;">
                                <i class="fas fa-comments"></i> Chat
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            container.innerHTML = '<div class="card">Erro ao buscar profissionais</div>';
        }
    }

    // ===== REDE =====
    async carregarRede() {
        const container = document.getElementById('redeContainer');
        if (!container) return;

        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';

        try {
            const conexoes = await databaseService.buscarConexoes(this.usuarioLogado.id);
            
            if (conexoes.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align:center; padding:40px;">
                        <i class="fas fa-users" style="font-size:60px; color:#ccc;"></i>
                        <h3>Sua rede está vazia</h3>
                        <p style="color:#999;">Conecte-se com profissionais</p>
                    </div>
                `;
                return;
            }

            const usuariosConectados = [];
            for (const conexao of conexoes) {
                const amigoId = conexao.usuarioId === this.usuarioLogado.id ? 
                               conexao.amigoId : conexao.usuarioId;
                const doc = await db.collection('usuarios').doc(amigoId).get();
                if (doc.exists) {
                    usuariosConectados.push({ id: doc.id, ...doc.data() });
                }
            }

            container.innerHTML = usuariosConectados.map(u => {
                const whatsapp = u.celular?.replace(/\D/g, '');
                return `
                    <div class="vaga-card" style="cursor:pointer;">
                        <div class="vaga-header" onclick="app.verPerfil('${u.id}')">
                            <div class="vaga-avatar"><i class="fas fa-user"></i></div>
                            <div class="vaga-info">
                                <div class="vaga-nome">${u.nome}</div>
                                <div class="vaga-data">${u.profissao || 'Usuário'}</div>
                            </div>
                        </div>
                        <div class="vaga-footer">
                            ${whatsapp ? `
                                <a href="https://wa.me/55${whatsapp}" target="_blank" 
                                   class="btn btn-success btn-small" style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;"
                                   onclick="event.stopPropagation();">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </a>
                            ` : ''}
                            <button class="btn btn-primary btn-small" 
                                    onclick="event.stopPropagation(); app.iniciarChat('${u.id}')" style="flex:1;">
                                <i class="fas fa-comments"></i> Chat
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            container.innerHTML = '<div class="card">Erro ao carregar rede</div>';
        }
    }

    // ===== NOTIFICAÇÕES =====
    mostrarNotificacoes() {
        this.mostrarTela('notificacoesScreen');
        this.carregarNotificacoes();
    }

    async carregarNotificacoes() {
        const container = document.getElementById('notificacoesContainer');
        if (!container) return;

        if (!this.notificacoes || this.notificacoes.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center; padding:40px;">
                    <i class="fas fa-bell-slash" style="font-size:60px; color:#ccc;"></i>
                    <p>Nenhuma notificação</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.notificacoes.map(n => `
            <div class="card">
                <strong>${n.titulo}</strong>
                <p style="color:#666; font-size:13px; margin-top:4px;">${n.mensagem}</p>
            </div>
        `).join('');
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
}

// Inicializa o app quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    console.log('✅ App carregado e pronto!');
});
