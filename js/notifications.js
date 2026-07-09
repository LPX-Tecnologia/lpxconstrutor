// ==========================================================
// ===== SISTEMA DE NOTIFICAÇÕES =====
// ==========================================================

var NotificationsService = function() {
    this.notificacoes = [];
};

// Carregar notificações do usuário
NotificationsService.prototype.carregarNotificacoes = function(usuarioId) {
    var self = this;
    
    db.collection('notificacoes')
        .where('usuarioId', '==', usuarioId)
        .orderBy('dataCriacao', 'desc')
        .limit(20)
        .onSnapshot(function(snapshot) {
            self.notificacoes = [];
            snapshot.forEach(function(doc) {
                self.notificacoes.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Atualiza badge
            self.atualizarBadge();
            
            // Atualiza tela se estiver aberta
            self.atualizarTela();
        });
};

// Criar notificação
NotificationsService.prototype.criarNotificacao = function(dados) {
    return db.collection('notificacoes').add({
        usuarioId: dados.usuarioId,
        titulo: dados.titulo,
        mensagem: dados.mensagem,
        tipo: dados.tipo || 'info',
        lida: false,
        link: dados.link || '',
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
    });
};

// Marcar como lida
NotificationsService.prototype.marcarLida = function(notificacaoId) {
    return db.collection('notificacoes').doc(notificacaoId).update({
        lida: true
    });
};

// Marcar todas como lidas
NotificationsService.prototype.marcarTodasLidas = function(usuarioId) {
    var self = this;
    this.notificacoes.forEach(function(n) {
        if (!n.lida) {
            self.marcarLida(n.id);
        }
    });
};

// Contar não lidas
NotificationsService.prototype.contarNaoLidas = function() {
    return this.notificacoes.filter(function(n) {
        return !n.lida;
    }).length;
};

// Atualizar badge
NotificationsService.prototype.atualizarBadge = function() {
    var badge = document.getElementById('badgeNotificacoes');
    if (!badge) return;
    
    var naoLidas = this.contarNaoLidas();
    
    if (naoLidas > 0) {
        badge.textContent = naoLidas > 99 ? '99+' : naoLidas;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
};

// Atualizar tela de notificações
NotificationsService.prototype.atualizarTela = function() {
    var container = document.getElementById('notificacoesContainer');
    if (!container) return;
    
    if (this.notificacoes.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-bell-slash" style="font-size:60px;color:#ccc;"></i><p style="margin-top:16px;">Nenhuma notificação</p></div>';
        return;
    }
    
    var html = '';
    var self = this;
    
    this.notificacoes.forEach(function(n) {
        var icone = '📢';
        var cor = '#E0F2FE';
        
        switch(n.tipo) {
            case 'candidatura': icone = '👷'; cor = '#FEF3C7'; break;
            case 'mensagem': icone = '💬'; cor = '#D1FAE5'; break;
            case 'avaliacao': icone = '⭐'; cor = '#FEE2E2'; break;
            case 'conexao': icone = '🔗'; cor = '#EDE9FE'; break;
            case 'contrato': icone = '🤝'; cor = '#D1FAE5'; break;
        }
        
        var data = n.dataCriacao ? new Date(n.dataCriacao.toDate()).toLocaleString('pt-BR') : '';
        
        html += '<div class="card" style="cursor:pointer;background:' + cor + ';' + (n.lida ? 'opacity:0.7;' : 'border-left:4px solid #F47920;') + '" onclick="notificationsService.marcarLida(\'' + n.id + '\')">' +
            '<div style="display:flex;align-items:start;gap:12px;">' +
                '<div style="font-size:30px;">' + icone + '</div>' +
                '<div style="flex:1;">' +
                    '<strong>' + n.titulo + '</strong>' +
                    '<p style="color:#666;font-size:13px;margin-top:4px;">' + n.mensagem + '</p>' +
                    '<small style="color:#999;">' + data + '</small>' +
                '</div>' +
                (!n.lida ? '<div style="width:10px;height:10px;background:#F47920;border-radius:50%;margin-top:8px;"></div>' : '') +
            '</div>' +
        '</div>';
    });
    
    container.innerHTML = html;
};

// Instância global
var notificationsService = new NotificationsService();

console.log('✅ NotificationsService carregado');
