// ==========================================================
// ===== OPERAÇÕES DE BANCO DE DADOS =====
// ==========================================================

class Database {
    
    // ===== USUÁRIOS =====
    async criarUsuario(uid, dados) {
        try {
            const usuario = {
                uid: uid,
                nome: dados.nome,
                email: dados.email,
                tipo: dados.tipo,
                celular: dados.celular,
                cpf: dados.cpf,
                profissao: dados.profissao || '',
                experiencia: parseInt(dados.experiencia) || 0,
                habilidades: dados.habilidades || '',
                fotoPerfil: '',
                score: 0,
                avaliacoes: [],
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp(),
                ativo: true
            };

            await db.collection('usuarios').doc(uid).set(usuario);
            return { sucesso: true, data: { id: uid, ...usuario } };
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarUsuarioPorId(uid) {
        try {
            const doc = await db.collection('usuarios').doc(uid).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return null;
        }
    }

    async buscarUsuarioPorEmail(email) {
        try {
            const snapshot = await db.collection('usuarios')
                .where('email', '==', email.toLowerCase().trim())
                .limit(1)
                .get();
            
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar por email:', error);
            return null;
        }
    }

    async buscarUsuarioPorCPF(cpf) {
        try {
            const cpfLimpo = cpf.replace(/\D/g, '');
            const snapshot = await db.collection('usuarios')
                .where('cpf', '==', cpfLimpo)
                .limit(1)
                .get();
            
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar por CPF:', error);
            return null;
        }
    }

    async verificarNomeUnico(nome) {
        try {
            const snapshot = await db.collection('usuarios')
                .where('nome', '==', nome.trim())
                .limit(1)
                .get();
            return snapshot.empty;
        } catch (error) {
            if (error.code === 'failed-precondition') {
                console.warn('⚠️ Índice necessário para busca por nome');
                return true; // Assume único se não puder verificar
            }
            console.error('Erro ao verificar nome:', error);
            return false;
        }
    }

    async atualizarUsuario(uid, dados) {
        try {
            // Não permite atualizar campos sensíveis
            const camposProibidos = ['cpf', 'email', 'score', 'dataCriacao'];
            const dadosAtualizados = {};
            
            for (const [key, value] of Object.entries(dados)) {
                if (!camposProibidos.includes(key)) {
                    dadosAtualizados[key] = value;
                }
            }
            
            dadosAtualizados.ultimaAtualizacao = firebase.firestore.FieldValue.serverTimestamp();
            
            await db.collection('usuarios').doc(uid).update(dadosAtualizados);
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarTodosUsuarios() {
        try {
            const snapshot = await db.collection('usuarios')
                .where('ativo', '==', true)
                .orderBy('nome')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    }

    // ===== OBRAS =====
    async criarObra(dados) {
        try {
            const obra = {
                nome: dados.nome,
                endereco: dados.endereco,
                descricao: dados.descricao || '',
                profissoes: dados.profissoes || '',
                valorHora: parseFloat(dados.valorHora) || 0,
                lat: parseFloat(dados.lat),
                lng: parseFloat(dados.lng),
                usuarioId: dados.usuarioId,
                interessados: [],
                status: 'aberta',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativa: true
            };

            const docRef = await db.collection('obras').add(obra);
            return { sucesso: true, id: docRef.id, ...obra };
        } catch (error) {
            console.error('Erro ao criar obra:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarObraPorId(id) {
        try {
            const doc = await db.collection('obras').doc(id).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar obra:', error);
            return null;
        }
    }

    async buscarObrasProximas(lat, lng, raioKm = 50) {
        try {
            const snapshot = await db.collection('obras')
                .where('ativa', '==', true)
                .where('status', '==', 'aberta')
                .orderBy('dataCriacao', 'desc')
                .limit(50)
                .get();
            
            const obras = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Filtra por distância
            return obras.filter(obra => {
                if (!obra.lat || !obra.lng) return false;
                const distancia = this.calcularDistancia(lat, lng, obra.lat, obra.lng);
                obra.distancia = distancia;
                return distancia <= raioKm * 1000;
            });
        } catch (error) {
            console.error('Erro ao buscar obras:', error);
            return [];
        }
    }

    async buscarTodasObras() {
        try {
            const snapshot = await db.collection('obras')
                .where('ativa', '==', true)
                .orderBy('dataCriacao', 'desc')
                .limit(100)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar obras:', error);
            return [];
        }
    }

    async atualizarObra(id, dados) {
        try {
            await db.collection('obras').doc(id).update({
                ...dados,
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao atualizar obra:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    // ===== CONEXÕES =====
    async criarConexao(dados) {
        try {
            const conexao = {
                usuarioId: dados.usuarioId,
                amigoId: dados.amigoId,
                status: 'pendente',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection('conexoes').add(conexao);
            return { sucesso: true, id: docRef.id, ...conexao };
        } catch (error) {
            console.error('Erro ao criar conexão:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarConexoesDoUsuario(usuarioId) {
        try {
            const snapshot1 = await db.collection('conexoes')
                .where('usuarioId', '==', usuarioId)
                .get();
            
            const snapshot2 = await db.collection('conexoes')
                .where('amigoId', '==', usuarioId)
                .get();
            
            const conexoes = [
                ...snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() })),
                ...snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            ];

            // Remove duplicatas
            const ids = new Set();
            return conexoes.filter(c => {
                if (ids.has(c.id)) return false;
                ids.add(c.id);
                return true;
            });
        } catch (error) {
            console.error('Erro ao buscar conexões:', error);
            return [];
        }
    }

    async atualizarConexao(id, dados) {
        try {
            await db.collection('conexoes').doc(id).update(dados);
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao atualizar conexão:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async removerConexao(id) {
        try {
            await db.collection('conexoes').doc(id).delete();
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao remover conexão:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    // ===== MENSAGENS =====
    async enviarMensagem(dados) {
        try {
            const mensagem = {
                remetenteId: dados.remetenteId,
                destinatarioId: dados.destinatarioId,
                conteudo: dados.conteudo,
                lida: false,
                dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection('mensagens').add(mensagem);
            return { sucesso: true, id: docRef.id, ...mensagem };
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarMensagens(usuario1Id, usuario2Id) {
        try {
            const snapshot = await db.collection('mensagens')
                .where('remetenteId', 'in', [usuario1Id, usuario2Id])
                .where('destinatarioId', 'in', [usuario1Id, usuario2Id])
                .orderBy('dataEnvio', 'asc')
                .limit(100)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            return [];
        }
    }

    // ===== AVALIAÇÕES =====
    async criarAvaliacao(dados) {
        try {
            // Verifica se já avaliou
            const existente = await db.collection('avaliacoes')
                .where('avaliadorId', '==', dados.avaliadorId)
                .where('avaliadoId', '==', dados.avaliadoId)
                .get();

            if (!existente.empty) {
                return { sucesso: false, erro: 'Você já avaliou este usuário' };
            }

            const avaliacao = {
                avaliadorId: dados.avaliadorId,
                avaliadoId: dados.avaliadoId,
                nota: dados.nota,
                comentario: dados.comentario || '',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('avaliacoes').add(avaliacao);

            // Atualiza score do avaliado
            await this.atualizarScore(dados.avaliadoId);

            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao criar avaliação:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async atualizarScore(usuarioId) {
        try {
            const snapshot = await db.collection('avaliacoes')
                .where('avaliadoId', '==', usuarioId)
                .get();

            if (snapshot.empty) return;

            const avaliacoes = snapshot.docs.map(doc => doc.data());
            const total = avaliacoes.length;
            const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
            const score = Math.round((soma / total) * 10) / 10;

            await db.collection('usuarios').doc(usuarioId).update({
                score: score,
                avaliacoesRecebidas: total
            });
        } catch (error) {
            console.error('Erro ao atualizar score:', error);
        }
    }

    // ===== UTILITÁRIOS =====
    calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Raio da Terra em metros
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distância em metros
    }

    formatarDistancia(metros) {
        if (metros < 1000) {
            return `${Math.round(metros)}m`;
        }
        return `${(metros / 1000).toFixed(1)}km`;
    }
}

// Instância global
const database = new Database();