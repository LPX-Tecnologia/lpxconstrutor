// ==========================================================
// ===== APLICAÇÃO PRINCIPAL - CORRIGIDA =====
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
                
                // ATUALIZA BOTÃO PUBLICAR BASEADO NO TIPO
                this.atualizarBotaoPublicar();
                
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

    // NOVA FUNÇÃO: Atualiza botão publicar
    atualizarBotaoPublicar() {
        const btnPublicar = document.getElementById('btnPublicar');
        if (!btnPublicar) return;

        if (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') {
            btnPublicar.style.display = 'flex';
            btnPublicar.onclick = () => this.publicarVaga();
        } else {
            btnPublicar.style.display = 'none';
        }
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
                
                // Atualiza estado do botão publicar
                this.atualizarBotaoPublicar();
                
                // Destaca item ativo
                nav.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                const activeItem = nav.querySelector(`[data-screen="${id}"]`);
                if (activeItem) activeItem.classList.add('active');
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
            this.atualizarBotaoPublicar(); // ATUALIZA BOTÃO
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
            experiencia: document.getElementById('cadExperiencia')?.value,
            habilidades: document.getElementById('cadHabilidades')?.value
        };

        this.mostrarToast('Cadastrando...', 'info');
        const resultado = await authService.cadastrar(dados);
        
        if (resultado.sucesso) {
            this.usuarioLogado = resultado.usuario;
            this.mostrarToast('Cadastro realizado!', 'sucesso');
            this.atualizarBotaoPublicar(); // ATUALIZA BOTÃO
            this.mostrarTela('homeScreen');
        } else {
            this.mostrarToast(resultado.erro, 'erro');
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
                        <p style="color:#999; margin-top:8px;">Seja o primeiro a publicar!</p>
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
                const autorDoc = await db.collection('usuarios').doc(vaga.usuarioId).get();
                vaga.autor = autorDoc.exists ? autorDoc.data() : null;
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
                        Tentar novamente
                    </button>
                </div>
            `;
        }
    }

    criarVagaCard(vaga) {
        const autor = vaga.autor || {};
        const whatsapp = autor.celular ? autor.celular.replace(/\D/g, '') : '';
        const data = vaga.dataCriacao ? new Date(vaga.dataCriacao.toDate()).toLocaleDateString('pt-BR') : '';
        const hora = vaga.dataCriacao ? new Date(vaga.dataCriacao.toDate()).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : '';
        
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
                            <i class="fas fa-map-marker-alt"></i> ${vaga.endereco || 'Local não informado'} • ${data} ${hora}
                        </div>
                    </div>
                    <div class="vaga-stars">
                        ${'⭐'.repeat(Math.round(autor.score || 0))}
                        <span style="font-size:11px; color:#999;">${autor.score || 'Novo'}</span>
                    </div>
                </div>
                <div class="vaga-body" onclick="app.verDetalheVaga('${vaga.id}')" style="cursor:pointer;">
                    <div class="vaga-titulo">🏗️ ${vaga.titulo || 'Vaga disponível'}</div>
                    <div class="vaga-descricao">${vaga.descricao || 'Sem descrição'}</div>
                    <div class="vaga-tags">
                        <span class="vaga-tag">💰 R$ ${vaga.valorHora || '0'}/h</span>
                        <span class="vaga-tag">👷 ${vaga.profissoes || 'Todas'}</span>
                        ${vaga.interessados ? 
                            `<span class="vaga-tag">👥 ${vaga.interessados.length} interessados</span>` : 
                            ''
                        }
                    </div>
                </div>
                <div class="vaga-footer">
                    ${this.usuarioLogado && this.usuarioLogado.tipo === 'profissional' ? `
                        <button class="btn btn-primary btn-small" onclick="app.candidatarVaga('${vaga.id}')" style="flex:1;">
                            <i class="fas fa-hand-paper"></i> QUERO TRABALHAR
                        </button>
                    ` : ''}
                    
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}?text=${encodeURIComponent('Olá! Vi sua vaga: ' + vaga.titulo)}" 
                           target="_blank" class="btn btn-success btn-small" style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                    
                    <button class="btn btn-outline btn-small" onclick="app.verPerfil('${vaga.usuarioId}')">
                        <i class="fas fa-user"></i>
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
                    <span style="font-size:12px; color:#999;">
                        (${usuario.avaliacoesRecebidas || 0} avaliações)
                    </span>
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
                    
                    ${this.usuarioLogado.tipo === 'empreiteiro' ? `
                        <button class="btn btn-outline" onclick="app.convidarParaObra('${usuario.id}')">
                            <i class="fas fa-handshake"></i> Convidar para Obra
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        `;

        this.mostrarTela('perfilPublicoScreen');
    }

    carregarMeuPerfil() {
        if (!this.usuarioLogado) return;

        const u = this.usuarioLogado;
        document.getElementById('meuPerfilNome').textContent = u.nome;
        document.getElementById('meuPerfilProfissao').textContent = 
            `${u.tipo === 'profissional' ? '👷 Profissional' : '🏢 Empreiteiro'} • ${u.profissao || u.tipo}`;
        
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
        this.mostrarToast('✅ Perfil atualizado!', 'sucesso');
    }

    async uploadFoto(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.mostrarToast('Enviando foto...', 'info');

        const reader = new FileReader();
        reader.onload = async (e) => {
            const fotoBase64 = e.target.result;
            await databaseService.atualizarUsuario(this.usuarioLogado.id, { fotoPerfil: fotoBase64 });
            this.usuarioLogado.fotoPerfil = fotoBase64;
            this.mostrarToast('✅ Foto atualizada!', 'sucesso');
            this.carregarMeuPerfil();
        };
        reader.readAsDataURL(file);
    }

    // ===== CHAT ESTILO WHATSAPP =====
    async iniciarChat(usuarioId) {
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        const doc = await db.collection('usuarios').doc(usuarioId).get();
        if (!doc.exists) {
            this.mostrarToast('Usuário não encontrado', 'erro');
            return;
        }

        this.usuarioSelecionado = { id: doc.id, ...doc.data() };
        const usuario = this.usuarioSelecionado;

        // Atualiza header do chat
        document.getElementById('chatHeaderInfo').innerHTML = `
            <div class="chat-header-profile" onclick="app.verPerfil('${usuario.id}')" style="cursor:pointer;">
                <div class="chat-header-avatar">
                    ${usuario.fotoPerfil ? 
                        `<img src="${usuario.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` :
                        '<i class="fas fa-user"></i>'
                    }
                </div>
                <div class="chat-header-text">
                    <div class="chat-header-name">${usuario.nome}</div>
                    <div class="chat-header-status">Online</div>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                ${usuario.celular ? `
                    <a href="https://wa.me/55${usuario.celular.replace(/\D/g, '')}" 
                       target="_blank" class="icon-btn" style="color:#25D366;">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                ` : ''}
                <button class="icon-btn" onclick="app.verPerfil('${usuario.id}')">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        `;

        // Configura listener de mensagens em tempo real
        this.setupChatListener();
        
        this.mostrarTela('chatScreen');
    }

    setupChatListener() {
        // Remove listener anterior se existir
        if (this.chatUnsubscribe) {
            this.chatUnsubscribe();
        }

        // Listener em tempo real para novas mensagens
        this.chatUnsubscribe = db.collection('mensagens')
            .where('participantes', 'array-contains', this.usuarioLogado.id)
            .orderBy('dataEnvio', 'asc')
            .onSnapshot((snapshot) => {
                const mensagens = [];
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const msg = { id: change.doc.id, ...change.doc.data() };
                        if (msg.participantes.includes(this.usuarioSelecionado?.id)) {
                            mensagens.push(msg);
                        }
                    }
                });
                
                if (mensagens.length > 0) {
                    this.renderizarMensagens(mensagens);
                }
            });
    }

    renderizarMensagens(mensagens) {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        const hoje = new Date().toDateString();

        container.innerHTML = mensagens.map((m, index) => {
            const isMine = m.remetenteId === this.usuarioLogado.id;
            const data = m.dataEnvio ? new Date(m.dataEnvio.toDate()) : new Date();
            const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            
            // Verifica se é uma nova data
            let dataSeparador = '';
            const dataMsg = data.toDateString();
            const dataAnterior = index > 0 ? 
                new Date(mensagens[index - 1].dataEnvio?.toDate()).toDateString() : null;
            
            if (dataMsg !== dataAnterior) {
                const dataFormatada = dataMsg === hoje ? 'Hoje' : 
                    data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
                dataSeparador = `<div class="chat-date-separator">${dataFormatada}</div>`;
            }

            return `
                ${dataSeparador}
                <div class="message ${isMine ? 'message-sent' : 'message-received'}">
                    <div class="message-content">${m.conteudo}</div>
                    <div class="message-footer">
                        <span class="message-time">${hora}</span>
                        ${isMine ? `<span class="message-status">${m.lida ? '✓✓' : '✓'}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Scroll para o final
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
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
            input.focus();

        } catch (error) {
            console.error('Erro ao enviar:', error);
            this.mostrarToast('Erro ao enviar mensagem', 'erro');
        }
    }

    // ===== VAGAS (SOMENTE EMPREITEIRO) =====
    async publicarVaga() {
        // VERIFICAÇÃO DE SEGURANÇA
        if (!this.usuarioLogado) {
            this.mostrarToast('Faça login primeiro!', 'erro');
            return;
        }

        if (this.usuarioLogado.tipo !== 'empreiteiro') {
            this.mostrarToast('🚫 Apenas EMPREITEIROS podem publicar vagas!', 'erro');
            return;
        }

        // Criar modal de publicação
        const modalHTML = `
            <div class="modal-overlay" id="modalPublicar" onclick="if(event.target === this) this.remove()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus-circle"></i> Publicar Vaga</h3>
                        <button class="modal-close" onclick="document.getElementById('modalPublicar').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="input-group">
                            <label><i class="fas fa-heading"></i> Título da Vaga</label>
                            <input type="text" class="input-field" id="vagaTitulo" 
                                   placeholder="Ex: Preciso de Pedreiro para obra em SP">
                        </div>
                        
                        <div class="input-group">
                            <label><i class="fas fa-align-left"></i> Descrição</label>
                            <textarea class="input-field" id="vagaDescricao" rows="4" 
                                      placeholder="Descreva o serviço, horários, benefícios..."></textarea>
                        </div>
                        
                        <div class="input-group">
                            <label><i class="fas fa-map-marker-alt"></i> Endereço da Obra</label>
                            <input type="text" class="input-field" id="vagaEndereco" 
                                   placeholder="Rua, número, bairro, cidade">
                        </div>
                        
                        <div class="input-group">
                            <label><i class="fas fa-tools"></i> Profissões Necessárias</label>
                            <input type="text" class="input-field" id="vagaProfissoes" 
                                   placeholder="Ex: Pedreiro, Servente, Eletricista">
                        </div>
                        
                        <div class="input-group">
                            <label><i class="fas fa-money-bill-wave"></i> Valor por Hora (R$)</label>
                            <input type="number" class="input-field" id="vagaValorHora" 
                                   placeholder="25" min="1" step="0.01">
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="document.getElementById('modalPublicar').remove()">
                            Cancelar
                        </button>
                        <button class="btn btn-primary" onclick="app.confirmarPublicacao()">
                            <i class="fas fa-check"></i> PUBLICAR VAGA
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona modal ao body
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHTML;
        document.body.appendChild(tempDiv.firstElementChild);
    }

    async confirmarPublicacao() {
        const titulo = document.getElementById('vagaTitulo')?.value?.trim();
        const descricao = document.getElementById('vagaDescricao')?.value?.trim();
        const endereco = document.getElementById('vagaEndereco')?.value?.trim();
        const profissoes = document.getElementById('vagaProfissoes')?.value?.trim();
        const valorHora = document.getElementById('vagaValorHora')?.value;

        if (!titulo || !endereco) {
            this.mostrarToast('Título e endereço são obrigatórios!', 'erro');
            return;
        }

        this.mostrarToast('Publicando vaga...', 'info');

        try {
            // Tenta obter localização
            let lat = null, lng = null;
            try {
                const position = await this.getCurrentPosition();
                lat = position.lat;
                lng = position.lng;
            } catch (e) {
                console.warn('Localização não disponível');
            }

            const vaga = {
                titulo,
                descricao,
                endereco,
                profissoes,
                valorHora: parseFloat(valorHora) || 25,
                lat,
                lng,
                usuarioId: this.usuarioLogado.id,
                interessados: [],
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativa: true
            };

            await db.collection('vagas').add(vaga);
            
            // Remove modal
            document.getElementById('modalPublicar')?.remove();
            
            this.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
            
            // Recarrega feed
            setTimeout(() => this.carregarFeed(), 500);

        } catch (error) {
            console.error('Erro ao publicar:', error);
            this.mostrarToast('Erro ao publicar vaga. Tente novamente.', 'erro');
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
                { timeout: 5000, enableHighAccuracy: true }
            );
        });
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
                this.mostrarToast('Você já se candidatou a esta vaga!', 'erro');
                return;
            }

            vaga.interessados.push(this.usuarioLogado.id);
            await db.collection('vagas').doc(vagaId).update({
                interessados: vaga.interessados
            });

            this.mostrarToast('✅ Candidatura enviada com sucesso!', 'sucesso');
            
            // Notifica o empreiteiro
            if (typeof notificationsService !== 'undefined') {
                await notificationsService.criarNotificacao({
                    usuarioId: vaga.usuarioId,
                    titulo: 'Novo interessado!',
                    mensagem: `${this.usuarioLogado.nome} quer trabalhar na sua vaga: ${vaga.titulo}`,
                    tipo: 'candidatura'
                });
            }

        } catch (error) {
            console.error('Erro ao candidatar:', error);
            this.mostrarToast('Erro ao se candidatar', 'erro');
        }
    }

    // ===== OUTRAS FUNCIONALIDADES =====
    async avaliarUsuario(usuarioId) {
        const nota = prompt('Dê uma nota de 1 a 5 estrelas:');
        if (!nota || isNaN(nota) || nota < 1 || nota > 5) {
            this.mostrarToast('Nota inválida! Deve ser entre 1 e 5.', 'erro');
            return;
        }

        const comentario = prompt('Deixe um comentário (opcional):') || '';

        await databaseService.avaliarUsuario(
            this.usuarioLogado.id,
            usuarioId,
            parseInt(nota),
            comentario
        );

        this.mostrarToast('✅ Avaliação enviada com sucesso!', 'sucesso');
    }

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

            container.innerHTML = filtrados.map(u => this.criarCardProfissional(u)).join('');

        } catch (error) {
            container.innerHTML = '<div class="card">Erro ao buscar profissionais</div>';
        }
    }

    criarCardProfissional(usuario) {
        const whatsapp = usuario.celular?.replace(/\D/g, '');
        
        return `
            <div class="vaga-card" style="cursor:pointer;">
                <div class="vaga-header" onclick="app.verPerfil('${usuario.id}')">
                    <div class="vaga-avatar">
                        ${usuario.fotoPerfil ? 
                            `<img src="${usuario.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` :
                            '<i class="fas fa-hard-hat"></i>'
                        }
                    </div>
                    <div class="vaga-info">
                        <div class="vaga-nome">${usuario.nome}</div>
                        <div class="vaga-data">
                            ${usuario.profissao || 'Profissional'} • ${usuario.experiencia || 0} anos
                        </div>
                    </div>
                    <div class="stars-container" style="font-size:14px;">
                        ${'⭐'.repeat(Math.round(usuario.score || 0))}
                        <span style="font-size:11px; color:#999;">${usuario.score || '0'}</span>
                    </div>
                </div>
                <div class="vaga-footer">
                    ${whatsapp ? `
                        <a href="https://wa.me/55${whatsapp}?text=${encodeURIComponent('Olá ' + usuario.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.')}" 
                           target="_blank" class="btn btn-success btn-small" style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); app.iniciarChat('${usuario.id}')" style="flex:1;">
                        <i class="fas fa-comments"></i> Chat
                    </button>
                </div>
            </div>
        `;
    }

    async carregarRede() {
        const container = document.getElementById('redeContainer');
        if (!container) return;

        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando sua rede...</div>';

        try {
            const conexoes = await databaseService.buscarConexoes(this.usuarioLogado.id);
            
            if (conexoes.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align:center; padding:40px;">
                        <i class="fas fa-users" style="font-size:60px; color:#ccc;"></i>
                        <h3 style="margin-top:16px;">Sua rede está vazia</h3>
                        <p style="color:#999;">Conecte-se com profissionais e empreiteiros</p>
                        <button class="btn btn-primary" onclick="app.mostrarTela('buscaScreen')" style="margin-top:16px;">
                            <i class="fas fa-search"></i> Buscar Profissionais
                        </button>
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

            container.innerHTML = usuariosConectados.map(u => this.criarCardProfissional(u)).join('');

        } catch (error) {
            console.error('Erro ao carregar rede:', error);
            container.innerHTML = '<div class="card">Erro ao carregar rede</div>';
        }
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

// Inicializa o app
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
