// ==========================================================
// ===== LPXCONSTRUTOR - COMPLETO COM SISTEMA DE CONTRATO =====
// ==========================================================

// [MANTENHA TODO O CÓDIGO ANTERIOR ATÉ A FUNÇÃO candidatarVaga E SUBSTITUA AS FUNÇÕES ABAIXO]

// ===== ADICIONE ESTAS NOVAS PROPRIEDADES NO CONSTRUTOR App =====
// Adicione dentro de: var App = function() {
// this.contratosAtivos = []; // NOVO
// this.contratoAtual = null; // NOVO

// ===== SUBSTITUA ESTAS FUNÇÕES =====

// CANDIDATAR-SE A UMA VAGA (profissional)
App.prototype.candidatarVaga = function(vagaId) {
    var s = this;
    console.log('✋ Candidatando à vaga:', vagaId);
    
    if (!s.usuarioLogado) {
        s.mostrarToast('❌ Faça login para se candidatar!', 'erro');
        return;
    }
    
    if (s.usuarioLogado.tipo !== 'profissional') {
        s.mostrarToast('❌ Apenas profissionais podem se candidatar!', 'erro');
        return;
    }
    
    // Verificar se já tem contrato ativo
    if (s.contratoAtual) {
        s.mostrarToast('❌ Você já está em um contrato ativo!', 'erro');
        return;
    }
    
    // Buscar a vaga
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = null;
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id === vagaId) {
            vaga = vagas[i];
            break;
        }
    }
    
    if (!vaga) {
        s.mostrarToast('❌ Vaga não encontrada!', 'erro');
        return;
    }
    
    if (vaga.status === 'em_andamento') {
        s.mostrarToast('❌ Esta vaga já está em andamento!', 'erro');
        return;
    }
    
    // Criar candidatura
    var candidatura = {
        id: 'cand_' + Date.now(),
        vagaId: vagaId,
        vagaTitulo: vaga.titulo,
        profissionalId: s.usuarioLogado.id,
        profissionalNome: s.usuarioLogado.nome,
        profissionalProfissao: s.usuarioLogado.profissao,
        empreiteiroId: vaga.autorId,
        empreiteiroNome: vaga.autorNome,
        status: 'pendente', // pendente, aceito, recusado, em_andamento, finalizado
        dataCandidatura: new Date().toISOString()
    };
    
    // Salvar candidatura
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    candidaturas.push(candidatura);
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    // Notificar empreiteiro
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: vaga.autorId,
        de: s.usuarioLogado.id,
        deNome: s.usuarioLogado.nome,
        tipo: 'candidatura',
        titulo: '🔔 Nova candidatura!',
        mensagem: s.usuarioLogado.nome + ' se candidatou para: ' + vaga.titulo,
        vagaId: vagaId,
        candidaturaId: candidatura.id,
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    s.mostrarToast('✅ Candidatura enviada com sucesso! Aguarde o empreiteiro aceitar.', 'sucesso');
    console.log('✅ Candidatura:', candidatura);
    
    // Atualizar feed
    setTimeout(function() {
        s.carregarFeed();
    }, 300);
};

// ABRIR TELA DE CONTRATAÇÃO (empreiteiro vê candidatos)
App.prototype.abrirContratacao = function(vagaId) {
    var s = this;
    console.log('🤝 Abrindo contratação para vaga:', vagaId);
    
    if (!s.usuarioLogado || s.usuarioLogado.tipo !== 'empreiteiro') {
        s.mostrarToast('❌ Apenas empreiteiros podem contratar!', 'erro');
        return;
    }
    
    // Buscar todas as candidaturas para esta vaga
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var candidatosVaga = [];
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].vagaId === vagaId && candidaturas[i].status === 'pendente') {
            candidatosVaga.push(candidaturas[i]);
        }
    }
    
    // Criar modal de contratação
    var modalHTML = '<div id="modalContratacao" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">';
    modalHTML += '<div style="background:white;border-radius:15px;padding:20px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto;">';
    modalHTML += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;text-align:center;">👷 Candidatos para Contratação</h3>';
    
    if (candidatosVaga.length === 0) {
        modalHTML += '<p style="text-align:center;color:#999;">Nenhum candidato ainda.</p>';
    } else {
        for (var i = 0; i < candidatosVaga.length; i++) {
            var c = candidatosVaga[i];
            modalHTML += '<div style="background:#f9f9f9;border-radius:10px;padding:15px;margin-bottom:10px;">';
            modalHTML += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
            modalHTML += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">👷</div>';
            modalHTML += '<div>';
            modalHTML += '<div style="font-weight:bold;color:#1A3A5C;">' + c.profissionalNome + '</div>';
            modalHTML += '<div style="font-size:12px;color:#666;">' + (c.profissionalProfissao || 'Profissional') + '</div>';
            modalHTML += '</div></div>';
            modalHTML += '<div style="display:flex;gap:8px;">';
            modalHTML += '<button onclick="window.app._app.aceitarCandidato(\'' + c.id + '\')" style="flex:1;background:#10B981;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;">✅ Contratar</button>';
            modalHTML += '<button onclick="window.app._app.recusarCandidato(\'' + c.id + '\')" style="flex:1;background:#EF4444;color:white;border:none;padding:10px;border-radius:8px;font-weight:bold;">❌ Recusar</button>';
            modalHTML += '</div></div>';
        }
    }
    
    modalHTML += '<button onclick="document.getElementById(\'modalContratacao\').remove()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:8px;margin-top:10px;">Fechar</button>';
    modalHTML += '</div></div>';
    
    // Remover modal anterior se existir
    var modalAntigo = document.getElementById('modalContratacao');
    if (modalAntigo) modalAntigo.remove();
    
    // Adicionar modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// ACEITAR CANDIDATO (empreiteiro)
App.prototype.aceitarCandidato = function(candidaturaId) {
    var s = this;
    console.log('✅ Aceitando candidatura:', candidaturaId);
    
    // Buscar candidatura
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    var candidatura = null;
    var index = -1;
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].id === candidaturaId) {
            candidatura = candidaturas[i];
            index = i;
            break;
        }
    }
    
    if (!candidatura) {
        s.mostrarToast('❌ Candidatura não encontrada!', 'erro');
        return;
    }
    
    // Atualizar status da candidatura
    candidatura.status = 'em_andamento';
    candidatura.dataInicio = new Date().toISOString();
    candidaturas[index] = candidatura;
    
    // Recusar outras candidaturas para a mesma vaga
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].vagaId === candidatura.vagaId && candidaturas[i].id !== candidaturaId) {
            candidaturas[i].status = 'recusado';
        }
    }
    
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    // Atualizar status da vaga
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id === candidatura.vagaId) {
            vagas[i].status = 'em_andamento';
            vagas[i].profissionalContratado = candidatura.profissionalId;
            vagas[i].profissionalNome = candidatura.profissionalNome;
            vagas[i].candidaturaId = candidaturaId;
            break;
        }
    }
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    // Criar contrato ativo para o profissional
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var contrato = {
        id: 'contr_' + Date.now(),
        candidaturaId: candidaturaId,
        vagaId: candidatura.vagaId,
        vagaTitulo: candidatura.vagaTitulo,
        empreiteiroId: candidatura.empreiteiroId,
        empreiteiroNome: candidatura.empreiteiroNome,
        profissionalId: candidatura.profissionalId,
        profissionalNome: candidatura.profissionalNome,
        status: 'em_andamento',
        dataInicio: new Date().toISOString(),
        dataFim: null
    };
    contratos.push(contrato);
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    // Atualizar contrato atual
    s.contratoAtual = contrato;
    localStorage.setItem('contratoAtualLPX', JSON.stringify(contrato));
    
    // Notificar profissional
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: candidatura.profissionalId,
        de: s.usuarioLogado.id,
        deNome: s.usuarioLogado.nome,
        tipo: 'contratado',
        titulo: '🎉 Você foi contratado!',
        mensagem: 'Parabéns! Você foi contratado para: ' + candidatura.vagaTitulo + '. Entre em contato com o empreiteiro.',
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    // Fechar modal
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    
    s.mostrarToast('✅ Profissional contratado com sucesso!', 'sucesso');
    console.log('✅ Contrato criado:', contrato);
    
    // Redirecionar para tela de contrato
    setTimeout(function() {
        s.verContratoAtivo();
    }, 500);
};

// RECUSAR CANDIDATO
App.prototype.recusarCandidato = function(candidaturaId) {
    var s = this;
    console.log('❌ Recusando candidatura:', candidaturaId);
    
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].id === candidaturaId) {
            candidaturas[i].status = 'recusado';
            break;
        }
    }
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    s.mostrarToast('Candidatura recusada.', 'info');
    
    // Atualizar modal
    var modal = document.getElementById('modalContratacao');
    if (modal) modal.remove();
    
    // Reabrir com lista atualizada
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].id === candidaturaId) {
            s.abrirContratacao(candidaturas[i].vagaId);
            break;
        }
    }
};

// VER CONTRATO ATIVO
App.prototype.verContratoAtivo = function() {
    var s = this;
    console.log('📋 Verificando contrato ativo...');
    
    // Buscar contrato ativo do localStorage
    var contratoSalvo = localStorage.getItem('contratoAtualLPX');
    if (contratoSalvo) {
        try {
            s.contratoAtual = JSON.parse(contratoSalvo);
        } catch(e) {}
    }
    
    if (!s.contratoAtual) {
        // Verificar se tem contrato nos contratos gerais
        var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
        var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
        
        for (var i = contratos.length - 1; i >= 0; i--) {
            var c = contratos[i];
            if (c.status === 'em_andamento' && (c.empreiteiroId === userId || c.profissionalId === userId)) {
                s.contratoAtual = c;
                localStorage.setItem('contratoAtualLPX', JSON.stringify(c));
                break;
            }
        }
    }
    
    if (!s.contratoAtual) {
        s.mostrarToast('📋 Nenhum contrato ativo no momento.', 'info');
        return;
    }
    
    // Criar tela de contrato
    s.mostrarTela('chatScreen');
    var chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) {
        // Se não tiver tela de chat, criar
        var telaChat = document.getElementById('chatScreen');
        if (telaChat) {
            telaChat.innerHTML = s.criarTelaContrato(s.contratoAtual);
        }
    } else {
        // Mostrar contrato no chat
        chatContainer.innerHTML = s.criarTelaContrato(s.contratoAtual);
    }
    
    console.log('✅ Contrato ativo:', s.contratoAtual);
};

// CRIAR TELA DE CONTRATO
App.prototype.criarTelaContrato = function(contrato) {
    var s = this;
    var isEmpreiteiro = s.usuarioLogado && s.usuarioLogado.id === contrato.empreiteiroId;
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">';
    
    // CABEÇALHO
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:25px;border-radius:15px;text-align:center;margin-bottom:20px;">';
    html += '<div style="font-size:50px;margin-bottom:10px;">🤝</div>';
    html += '<h2 style="margin:10px 0;">Contrato Ativo</h2>';
    html += '<p style="color:#f0c27f;font-size:14px;">Status: Em Andamento</p>';
    html += '</div>';
    
    // DETALHES DO CONTRATO
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">';
    html += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;">📋 Detalhes da Obra</h3>';
    html += '<p><strong>🏗️ Obra:</strong> ' + contrato.vagaTitulo + '</p>';
    html += '<p><strong>👷 Profissional:</strong> ' + contrato.profissionalNome + '</p>';
    html += '<p><strong>🏢 Empreiteiro:</strong> ' + contrato.empreiteiroNome + '</p>';
    html += '<p><strong>📅 Início:</strong> ' + new Date(contrato.dataInicio).toLocaleDateString('pt-BR') + '</p>';
    html += '</div>';
    
    // AÇÕES
    html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
    html += '<button onclick="window.app._app.iniciarChatContrato()" style="flex:1;background:#25D366;color:white;border:none;padding:15px;border-radius:10px;font-size:14px;font-weight:bold;">💬 Conversar</button>';
    html += '<button onclick="window.app._app.verDetalhesObra(\'' + contrato.vagaId + '\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-size:14px;font-weight:bold;">📋 Ver Obra</button>';
    html += '</div>';
    
    // BOTÃO FINALIZAR (apenas empreiteiro)
    if (isEmpreiteiro) {
        html += '<button onclick="window.app._app.finalizarContratoAtivo()" style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;font-size:15px;font-weight:bold;margin-bottom:10px;">🔴 Finalizar Contrato</button>';
    } else {
        html += '<div style="background:#fef3c7;border-radius:10px;padding:15px;text-align:center;color:#92400e;margin-bottom:10px;">';
        html += '⚠️ Apenas o empreiteiro pode finalizar o contrato.';
        html += '</div>';
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;font-size:14px;">⬅ Voltar</button>';
    html += '</div>';
    
    return html;
};

// FINALIZAR CONTRATO ATIVO
App.prototype.finalizarContratoAtivo = function() {
    var s = this;
    
    if (!confirm('Tem certeza que deseja finalizar este contrato? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    if (!s.contratoAtual) {
        s.mostrarToast('❌ Nenhum contrato ativo!', 'erro');
        return;
    }
    
    console.log('🔴 Finalizando contrato:', s.contratoAtual.id);
    
    // Atualizar contrato
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    for (var i = 0; i < contratos.length; i++) {
        if (contratos[i].id === s.contratoAtual.id) {
            contratos[i].status = 'finalizado';
            contratos[i].dataFim = new Date().toISOString();
            break;
        }
    }
    localStorage.setItem('contratosLPX', JSON.stringify(contratos));
    
    // Atualizar vaga
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id === s.contratoAtual.vagaId) {
            vagas[i].status = 'finalizado';
            break;
        }
    }
    localStorage.setItem('vagasLPX', JSON.stringify(vagas));
    
    // Atualizar candidatura
    var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
    for (var i = 0; i < candidaturas.length; i++) {
        if (candidaturas[i].id === s.contratoAtual.candidaturaId) {
            candidaturas[i].status = 'finalizado';
            break;
        }
    }
    localStorage.setItem('candidaturasLPX', JSON.stringify(candidaturas));
    
    // Notificar profissional
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    notificacoes.unshift({
        id: 'notif_' + Date.now(),
        para: s.contratoAtual.profissionalId,
        de: s.usuarioLogado.id,
        deNome: s.usuarioLogado.nome,
        tipo: 'finalizado',
        titulo: '🔴 Contrato Finalizado',
        mensagem: 'O contrato da obra "' + s.contratoAtual.vagaTitulo + '" foi finalizado pelo empreiteiro.',
        lida: false,
        data: new Date().toISOString()
    });
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    
    // Limpar contrato atual
    s.contratoAtual = null;
    localStorage.removeItem('contratoAtualLPX');
    
    s.mostrarToast('✅ Contrato finalizado com sucesso!', 'sucesso');
    
    // Voltar para home
    setTimeout(function() {
        s.mostrarTela('homeScreen');
        s.carregarFeed();
    }, 500);
};

// INICIAR CHAT DO CONTRATO
App.prototype.iniciarChatContrato = function() {
    var s = this;
    if (!s.contratoAtual) {
        s.mostrarToast('❌ Nenhum contrato ativo!', 'erro');
        return;
    }
    
    var outroNome = s.usuarioLogado.id === s.contratoAtual.empreiteiroId ? 
        s.contratoAtual.profissionalNome : s.contratoAtual.empreiteiroNome;
    
    s.mostrarToast('💬 Chat com ' + outroNome + ' iniciado!', 'sucesso');
    
    // Aqui você pode implementar um chat real
    // Por enquanto, vamos simular
    var chatHTML = '<div style="padding:20px;">';
    chatHTML += '<h3>💬 Chat do Contrato</h3>';
    chatHTML += '<p>Conversando com: <strong>' + outroNome + '</strong></p>';
    chatHTML += '<div style="background:#f0f0f0;border-radius:10px;padding:20px;min-height:200px;margin:15px 0;">';
    chatHTML += '<p style="text-align:center;color:#999;">Inicie uma conversa...</p>';
    chatHTML += '</div>';
    chatHTML += '<input type="text" placeholder="Digite sua mensagem..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:25px;">';
    chatHTML += '<button onclick="window.app.voltarTela()" style="width:100%;margin-top:10px;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:10px;">Voltar</button>';
    chatHTML += '</div>';
    
    var telaChat = document.getElementById('chatScreen');
    if (telaChat) {
        telaChat.innerHTML = chatHTML;
        s.mostrarTela('chatScreen');
    }
};

// VER DETALHES DA OBRA DO CONTRATO
App.prototype.verDetalhesObra = function(vagaId) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = null;
    for (var i = 0; i < vagas.length; i++) {
        if (vagas[i].id === vagaId) {
            vaga = vagas[i];
            break;
        }
    }
    
    if (vaga) {
        s.obraSelecionada = vagaId;
        s.mostrarTela('detalheObraScreen');
        var container = document.getElementById('detalheObraConteudo');
        if (container) {
            container.innerHTML = '<div style="padding:20px;">' +
                '<h3>' + vaga.titulo + '</h3>' +
                '<p>📍 ' + vaga.endereco + '</p>' +
                '<p>👷 ' + vaga.profissoes + '</p>' +
                '<p>💰 R$' + vaga.valorHora + '/h</p>' +
                '<p>Status: ' + (vaga.status === 'em_andamento' ? '🟢 Em Andamento' : '⚪ Disponível') + '</p>' +
                (vaga.profissionalContratado ? '<p>👷 Contratado: ' + vaga.profissionalNome + '</p>' : '') +
                '<button onclick="window.app.voltarTela()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button>' +
                '</div>';
        }
    }
};

// VER CONTRATOS (histórico)
App.prototype.verMeusContratos = function() {
    var s = this;
    var contratos = JSON.parse(localStorage.getItem('contratosLPX') || '[]');
    var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    var meusContratos = [];
    for (var i = 0; i < contratos.length; i++) {
        if (contratos[i].empreiteiroId === userId || contratos[i].profissionalId === userId) {
            meusContratos.push(contratos[i]);
        }
    }
    
    var html = '<div style="padding:20px;">';
    html += '<h3 style="color:#1A3A5C;">📋 Meus Contratos</h3>';
    
    if (meusContratos.length === 0) {
        html += '<p style="text-align:center;color:#999;margin-top:40px;">Nenhum contrato encontrado.</p>';
    } else {
        for (var i = 0; i < meusContratos.length; i++) {
            var c = meusContratos[i];
            var statusCor = c.status === 'em_andamento' ? '#10B981' : c.status === 'finalizado' ? '#666' : '#f59e0b';
            var statusTexto = c.status === 'em_andamento' ? '🟢 Em Andamento' : c.status === 'finalizado' ? '✅ Finalizado' : '⏳ Pendente';
            
            html += '<div style="background:white;border-radius:10px;padding:15px;margin-bottom:10px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">';
            html += '<h4>' + c.vagaTitulo + '</h4>';
            html += '<p>👷 Profissional: ' + c.profissionalNome + '</p>';
            html += '<p>🏢 Empreiteiro: ' + c.empreiteiroNome + '</p>';
            html += '<p style="color:' + statusCor + ';">' + statusTexto + '</p>';
            html += '<p style="font-size:11px;color:#999;">Início: ' + new Date(c.dataInicio).toLocaleDateString('pt-BR') + '</p>';
            if (c.dataFim) {
                html += '<p style="font-size:11px;color:#999;">Fim: ' + new Date(c.dataFim).toLocaleDateString('pt-BR') + '</p>';
            }
            if (c.status === 'em_andamento') {
                html += '<button onclick="window.app._app.contratoAtual = ' + JSON.stringify(c) + '; localStorage.setItem(\'contratoAtualLPX\', JSON.stringify(' + JSON.stringify(c) + ')); window.app._app.verContratoAtivo();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:10px;border-radius:8px;margin-top:10px;">Ver Contrato</button>';
            }
            html += '</div>';
        }
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button>';
    html += '</div>';
    
    var container = document.getElementById('meuPerfilScreen');
    if (container) {
        container.innerHTML = html;
        s.mostrarTela('meuPerfilScreen');
    }
};

// NOTIFICAÇÕES
App.prototype.mostrarNotificacoes = function() {
    var s = this;
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    var userId = s.usuarioLogado ? s.usuarioLogado.id : '';
    
    var minhasNotif = [];
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].para === userId) {
            minhasNotif.push(notificacoes[i]);
        }
    }
    
    var html = '<div style="padding:20px;">';
    html += '<h3 style="color:#1A3A5C;">🔔 Notificações</h3>';
    
    if (minhasNotif.length === 0) {
        html += '<p style="text-align:center;color:#999;margin-top:40px;">Nenhuma notificação.</p>';
    } else {
        for (var i = 0; i < minhasNotif.length; i++) {
            var n = minhasNotif[i];
            var bg = n.lida ? '#f9f9f9' : '#f0f9ff';
            
            html += '<div style="background:' + bg + ';border-radius:10px;padding:15px;margin-bottom:10px;' + (n.lida ? '' : 'border-left:3px solid #1A3A5C;') + '">';
            html += '<h4 style="margin:0 0 5px 0;">' + n.titulo + '</h4>';
            html += '<p style="margin:0;color:#666;">' + n.mensagem + '</p>';
            html += '<p style="font-size:11px;color:#999;margin:5px 0 0 0;">' + new Date(n.data).toLocaleDateString('pt-BR') + '</p>';
            
            // Marcar como lida
            if (!n.lida) {
                html += '<button onclick="window.app._app.marcarNotificacaoLida(\'' + n.id + '\')" style="font-size:11px;color:#1A3A5C;border:none;background:none;padding:5px;margin-top:5px;text-decoration:underline;">Marcar como lida</button>';
            }
            html += '</div>';
        }
    }
    
    html += '<button onclick="window.app.voltarTela()" style="width:100%;background:#666;color:white;border:none;padding:12px;border-radius:10px;margin-top:20px;">Voltar</button>';
    html += '</div>';
    
    var container = document.getElementById('meuPerfilScreen');
    if (container) {
        container.innerHTML = html;
        s.mostrarTela('meuPerfilScreen');
    }
};

App.prototype.marcarNotificacaoLida = function(notifId) {
    var notificacoes = JSON.parse(localStorage.getItem('notificacoesLPX') || '[]');
    for (var i = 0; i < notificacoes.length; i++) {
        if (notificacoes[i].id === notifId) {
            notificacoes[i].lida = true;
            break;
        }
    }
    localStorage.setItem('notificacoesLPX', JSON.stringify(notificacoes));
    this.mostrarNotificacoes();
};

// ATUALIZAR A FUNÇÃO confirmarContratacao PARA USAR O NOVO SISTEMA
App.prototype.confirmarContratacao = function() {
    var s = this;
    if (s.contratarProfId) {
        // Buscar candidaturas pendentes deste profissional
        var candidaturas = JSON.parse(localStorage.getItem('candidaturasLPX') || '[]');
        for (var i = 0; i < candidaturas.length; i++) {
            if (candidaturas[i].profissionalId === s.contratarProfId && candidaturas[i].status === 'pendente') {
                s.aceitarCandidato(candidaturas[i].id);
                return;
            }
        }
        s.mostrarToast('❌ Nenhuma candidatura pendente encontrada!', 'erro');
    }
};
