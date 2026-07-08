// ==========================================================
// ===== OPERAÇÕES DE BANCO DE DADOS =====
// ==========================================================

class DatabaseService {
    
    // ===== USUÁRIOS =====
    async buscarUsuario(uid) {
        try {
            const doc = await db.collection('usuarios').doc(uid).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return null;
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

    async atualizarUsuario(uid, dados) {
        try {
            await db.collection('usuarios').doc(uid).update({
                ...dados,
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    // ===== OBRAS =====
    async criarObra(dados) {
        try {
            const obra = {
                ...dados,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativa: true
            };
            
            const docRef = await db.collection('obras').add(obra);
            return { sucesso: true, id: docRef.id };
        } catch (error) {
            console.error('Erro ao criar obra:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    async buscarObras() {
        try {
            const snapshot = await db.collection('obras')
                .where('ativa', '==', true)
                .orderBy('dataCriacao', 'desc')
                .limit(20)
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

    async buscarObra(id) {
        try {
            const doc = await db.collection('obras').doc(id).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Erro ao buscar obra:', error);
            return null;
        }
    }

    // ===== CONEXÕES =====
    async criarConexao(usuarioId, amigoId) {
        try {
            const conexao = {
                usuarioId,
                amigoId,
                status: 'pendente',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('conexoes').add(conexao);
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao criar conexão:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    // ===== MENSAGENS =====
    async enviarMensagem(remetenteId, destinatarioId, conteudo) {
        try {
            const mensagem = {
                remetenteId,
                destinatarioId,
                conteudo,
                lida: false,
                dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('mensagens').add(mensagem);
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    // ===== AVALIAÇÕES =====
    async avaliarUsuario(avaliadorId, avaliadoId, nota, comentario) {
        try {
            const avaliacao = {
                avaliadorId,
                avaliadoId,
                nota,
                comentario: comentario || '',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('avaliacoes').add(avaliacao);
            
            // Atualiza score
            await this.atualizarScore(avaliadoId);
            
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao avaliar:', error);
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
                score,
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
        return R * c;
    }

    formatarDistancia(metros) {
        if (metros < 1000) return `${Math.round(metros)}m`;
        return `${(metros / 1000).toFixed(1)}km`;
    }
}

// Instância global
const databaseService = new DatabaseService();
