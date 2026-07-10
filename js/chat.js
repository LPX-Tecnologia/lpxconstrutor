// ==========================================================
// ===== SISTEMA DE CHAT EM TEMPO REAL =====
// ==========================================================

var ChatService = function() {
    this.mensagens = [];
    this.unsubscribe = null;
};

// Escutar mensagens em tempo real
ChatService.prototype.escutarMensagens = function(usuarioId1, usuarioId2, callback) {
    var self = this;
    
    // Para de escutar anterior
    if (this.unsubscribe) {
        this.unsubscribe();
    }
    
    // Escuta em tempo real
    this.unsubscribe = db.collection('mensagens')
        .where('participantes', 'array-contains', usuarioId1)
        .onSnapshot(function(snapshot) {
            self.mensagens = [];
            snapshot.forEach(function(doc) {
                var d = doc.data();
                // Filtra mensagens entre os dois usuários
                if (d.participantes && d.participantes.indexOf(usuarioId2) >= 0) {
                    self.mensagens.push({ id: doc.id, data: d });
                }
            });
            
            // Ordena por data
            self.mensagens.sort(function(a, b) {
                var da = a.data.dataEnvio ? a.data.dataEnvio.toDate() : new Date(0);
                var db = b.data.dataEnvio ? b.data.dataEnvio.toDate() : new Date(0);
                return da - db;
            });
            
            // Marca como lidas as mensagens recebidas
            self.mensagens.forEach(function(m) {
                if (m.data.destinatarioId === usuarioId1 && !m.data.lida) {
                    db.collection('mensagens').doc(m.id).update({ lida: true });
                }
            });
            
            if (callback) callback(self.mensagens);
        });
};

// Enviar mensagem
ChatService.prototype.enviarMensagem = function(remetenteId, destinatarioId, conteudo) {
    return db.collection('mensagens').add({
        remetenteId: remetenteId,
        destinatarioId: destinatarioId,
        participantes: [remetenteId, destinatarioId],
        conteudo: conteudo,
        lida: false,
        dataEnvio: firebase.firestore.FieldValue.serverTimestamp()
    });
};

// Buscar conversas do usuário
ChatService.prototype.buscarConversas = function(usuarioId, callback) {
    db.collection('mensagens')
        .where('participantes', 'array-contains', usuarioId)
        .onSnapshot(function(snapshot) {
            var conversas = {};
            snapshot.forEach(function(doc) {
                var d = doc.data();
                var outroId = d.remetenteId === usuarioId ? d.destinatarioId : d.remetenteId;
                if (!conversas[outroId] || d.dataEnvio?.toDate() > conversas[outroId].dataEnvio?.toDate()) {
                    conversas[outroId] = { id: doc.id, outroId: outroId, ...d };
                }
            });
            if (callback) callback(Object.values(conversas));
        });
};

// Parar de escutar
ChatService.prototype.pararEscutar = function() {
    if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
    }
};

var chatService = new ChatService();

console.log('✅ ChatService carregado');
