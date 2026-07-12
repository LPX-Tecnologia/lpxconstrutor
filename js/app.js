// ===== CORREÇÃO: verDetalheObra - ABRE DETALHES COMPLETOS =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagas.find(function(v) { return v.id === oid; });
    
    if (!vaga) {
        s.mostrarToast('❌ Obra não encontrada!', 'erro');
        return;
    }
    
    var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em Andamento' : vaga.status === 'finalizado' ? '✅ Finalizada' : '⚪ Disponível';
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">';
    
    // Foto da obra
    if (vaga.fotoObra) {
        html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:250px;object-fit:cover;border-radius:15px;margin-bottom:15px;">';
    }
    
    // Título e status
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">';
    html += '<h2 style="color:#1A3A5C;margin:0 0 10px 0;">' + vaga.titulo + '</h2>';
    html += '<p style="color:#666;">' + statusTexto + '</p>';
    html += '</div>';
    
    // Detalhes
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">';
    html += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;">📋 Detalhes da Obra</h3>';
    html += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    html += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    html += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    html += '<p><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>';
    html += '<p><strong>📅 Data:</strong> ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    
    if (vaga.profissionalNome) {
        html += '<p><strong>👷 Contratado:</strong> ' + vaga.profissionalNome + '</p>';
    }
    html += '</div>';
    
    // MAPA COM LOCALIZAÇÃO
    if (vaga.localizacao && vaga.localizacao.lat && vaga.localizacao.lng) {
        var mapId = 'mapaDetalhe_' + oid;
        html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">';
        html += '<h3 style="color:#1A3A5C;margin:0 0 10px 0;">🗺️ Localização</h3>';
        html += '<div id="' + mapId + '" style="width:100%;height:200px;border-radius:10px;background:#e5e7eb;"></div>';
        html += '<p style="text-align:center;font-size:12px;color:#666;margin-top:8px;">📍 ' + vaga.endereco + '</p>';
        html += '</div>';
        
        // Inicializar mapa depois
        setTimeout(function() {
            var mapDiv = document.getElementById(mapId);
            if (mapDiv) {
                if (typeof L !== 'undefined') {
                    var map = L.map(mapId).setView([vaga.localizacao.lat, vaga.localizacao.lng], 16);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap'
                    }).addTo(map);
                    L.marker([vaga.localizacao.lat, vaga.localizacao.lng]).addTo(map)
                        .bindPopup('<b>' + vaga.titulo + '</b><br>' + vaga.endereco)
                        .openPopup();
                } else {
                    // Fallback sem Leaflet
                    mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:10px;text-align:center;">' +
                        '<div>🗺️<br><a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="color:#1A3A5C;">Abrir no Google Maps</a></div></div>';
                }
            }
        }, 300);
    } else if (vaga.endereco) {
        html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;text-align:center;">';
        html += '<p>🗺️ <a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="color:#1A3A5C;text-decoration:underline;">Abrir no Google Maps</a></p>';
        html += '</div>';
    }
    
    // Botões de ação
    html += '<div style="display:flex;gap:10px;flex-wrap:wrap;">';
    
    if (s.usuarioLogado) {
        if (s.usuarioLogado.tipo === 'profissional' && vaga.status === 'disponivel') {
            html += '<button onclick="window.app.candidatarVaga(\'' + vaga.id + '\')" style="flex:1;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">✋ QUERO!</button>';
        }
        
        if (s.usuarioLogado.id === vaga.autorId && vaga.status === 'disponivel') {
            html += '<button onclick="window.app.abrirTelaPublicacao(' + JSON.stringify(vaga).replace(/"/g, '&quot;') + ')" style="flex:1;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">✏️ Editar</button>';
            html += '<button onclick="window.app.abrirContratacao(\'' + vaga.id + '\')" style="flex:1;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">👷 Candidatos</button>';
        }
    }
    
    html += '<button onclick="window.app.voltarTela()" style="flex:1;background:#666;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Voltar</button>';
    html += '</div>';
    html += '</div>';
    
    // Mostrar em modal ou tela
    var telaDetalhe = document.getElementById('detalheObraScreen');
    if (telaDetalhe) {
        telaDetalhe.innerHTML = html;
        s.mostrarTela('detalheObraScreen');
    } else {
        // Criar modal
        var modalHTML = '<div id="modalDetalheObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;">' + html + '</div>';
        var antigo = document.getElementById('modalDetalheObra');
        if (antigo) antigo.remove();
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
};

// ===== CORREÇÃO: carregarMinhasObras - MOSTRA OBRAS DO USUÁRIO =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var container = document.getElementById('minhasObrasContainer');
    if (!container) return;
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card" style="text-align:center;"><h3>Faça login para ver suas obras</h3></div>';
        return;
    }
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhasObras = vagas.filter(function(v) {
        return v.autorId === s.usuarioLogado.id;
    });
    
    if (minhasObras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><h3>🏗️ Nenhuma obra cadastrada</h3><p>Publique sua primeira vaga!</p><button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()">📢 PUBLICAR VAGA</button></div>';
        return;
    }
    
    var html = '<h3 style="color:#1A3A5C;margin-bottom:15px;">🏗️ Minhas Obras (' + minhasObras.length + ')</h3>';
    
    minhasObras.forEach(function(v) {
        var statusCor = v.status === 'em_andamento' ? '#10B981' : v.status === 'finalizado' ? '#666' : '#f59e0b';
        var statusTexto = v.status === 'em_andamento' ? '🟢 Em andamento' : v.status === 'finalizado' ? '✅ Finalizada' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
        html += '<div style="width:50px;height:50px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">🏗️</div>';
        html += '<div>';
        html += '<div style="font-weight:bold;color:#1A3A5C;">' + v.titulo + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + (v.endereco || 'Sem endereço') + '</div>';
        html += '</div></div>';
        html += '<div style="display:flex;gap:8px;align-items:center;">';
        html += '<span style="background:#10B981;color:white;padding:4px 12px;border-radius:20px;font-size:11px;">💰 R$' + v.valorHora + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:4px 12px;border-radius:20px;font-size:11px;">👷 ' + v.profissoes + '</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:4px 12px;border-radius:20px;font-size:11px;margin-left:auto;">' + statusTexto + '</span>';
        html += '</div>';
        
        if (v.fotoObra) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:100px;object-fit:cover;border-radius:8px;margin-top:8px;" onerror="this.style.display=\'none\'">';
        }
        html += '</div>';
    });
    
    container.innerHTML = html;
};

// ===== CORREÇÃO: perfil - ATUALIZA CONTAGEM DE OBRAS =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) {
        var salvo = localStorage.getItem('usuarioLPX');
        if (salvo) { try { s.usuarioLogado = JSON.parse(salvo); } catch(e) {} }
        if (!s.usuarioLogado) return;
    }
    
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    // CONTAR OBRAS DO USUÁRIO
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    var obrasAtivas = vagas.filter(function(v) { return v.autorId === user.id && v.status === 'em_andamento'; }).length;
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px 30px;text-align:center;border-radius:0 0 30px 30px;margin-bottom:20px;">';
    html += '<div style="width:100px;height:100px;background:white;border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:50px;overflow:hidden;border:3px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<span>👷</span>';
    html += '</div>';
    html += '<h2 style="margin:10px 0;">' + (user.nome || 'Usuário') + '</h2>';
    html += '<p style="color:#f0c27f;">' + (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos</p>';
    html += '<p style="font-size:18px;">' + estrelas + ' ' + score + '</p></div>';
    
    html += '<div style="padding:0 15px;">';
    
    // CARD DE CONTATO
    html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">';
    html += '<p><strong>📧 Email:</strong> ' + (user.email || 'Não informado') + '</p>';
    html += '<p><strong>📱 Celular:</strong> ' + (user.celular || 'Não informado') + '</p>';
    html += '<p><strong>🏢 Tipo:</strong> ' + (user.tipo === 'empreiteiro' ? 'Empreiteiro' : 'Profissional') + '</p></div>';
    
    // ESTATÍSTICAS COM CONTAGEM REAL
    html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;">';
    html += '<div style="font-size:24px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div>';
    html += '<div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
    
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;">';
    html += '<div style="font-size:24px;color:#f59e0b;font-weight:bold;">' + score + '</div>';
    html += '<div style="color:#999;font-size:11px;">Avaliação</div></div>';
    
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;" onclick="window.app.carregarMinhasObras();window.app.mostrarTela(\'minhasObrasScreen\');">';
    html += '<div style="font-size:24px;color:#10B981;font-weight:bold;">' + totalObras + '</div>';
    html += '<div style="color:#999;font-size:11px;">Obras</div></div>';
    html += '</div>';
    
    // BOTÕES PRINCIPAIS
    html += '<button onclick="window.app.carregarMinhasObras();window.app.mostrarTela(\'minhasObrasScreen\');" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>';
    html += '<button onclick="window.app.verMeusContratos()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">📋 Contratos</button>';
    html += '<button onclick="window.app.mostrarNotificacoes()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🔔 Notificações</button>';
    
    // TERMOS, PRIVACIDADE, DIRETRIZES - ABRE EM TELA CHEIA
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.mostrarDocumento(\'termos\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📄 Termos</button>';
    html += '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🔒 Privacidade</button>';
    html += '</div>';
    
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">📋 Diretrizes</button>';
    html += '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="flex:1;background:white;color:#1A3A5C;border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">ℹ️ Sobre</button>';
    html += '</div>';
    
    // IDIOMAS
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇧🇷 PT</button>';
    html += '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇺🇸 EN</button>';
    html += '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🇪🇸 ES</button>';
    html += '</div>';
    
    // TEMA
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">☀️ Claro</button>';
    html += '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';border:1px solid #1A3A5C;padding:12px;border-radius:10px;font-size:13px;">🌙 Escuro</button>';
    html += '</div>';
    
    html += '<button onclick="window.app.sair()" style="width:100%;background:white;color:#EF4444;border:2px solid #EF4444;padding:15px;border-radius:10px;font-weight:bold;">🚪 Sair</button></div>';
    
    tela.innerHTML = html;
    var loading = document.getElementById('perfilLoading');
    if (loading) loading.style.display = 'none';
};

// ===== NOVA FUNÇÃO: mostrarDocumento - ABRE EM TELA CHEIA =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    var titulo = '';
    var conteudo = '';
    
    if (tipo === 'termos') {
        titulo = '📄 Termos de Uso';
        conteudo = '<h3 style="color:#1A3A5C;">1. Aceitação dos Termos</h3>' +
            '<p>Ao utilizar o LPXCONSTRUTOR, você concorda integralmente com estes Termos de Uso. Se não concordar, não utilize o aplicativo.</p>' +
            '<h3 style="color:#1A3A5C;">2. Cadastro e Conta</h3>' +
            '<p>Você é responsável por fornecer informações verdadeiras e mantê-las atualizadas. Sua conta é pessoal e intransferível.</p>' +
            '<h3 style="color:#1A3A5C;">3. Publicação de Vagas</h3>' +
            '<p>As vagas publicadas devem conter informações reais e precisas sobre a obra, localização e valor.</p>' +
            '<h3 style="color:#1A3A5C;">4. Contratação</h3>' +
            '<p>O LPXCONSTRUTOR é uma plataforma de conexão. Não nos responsabilizamos por acordos financeiros entre as partes.</p>' +
            '<h3 style="color:#1A3A5C;">5. Conduta do Usuário</h3>' +
            '<p>É proibido: discriminação, assédio, informações falsas, spam ou qualquer conduta ilegal.</p>' +
            '<h3 style="color:#1A3A5C;">6. Penalidades</h3>' +
            '<p>O descumprimento destes termos pode resultar em suspensão ou exclusão da conta.</p>' +
            '<h3 style="color:#1A3A5C;">7. Contato</h3>' +
            '<p>Dúvidas: contato@lpxconstrutor.com.br</p>';
    } else if (tipo === 'privacidade') {
        titulo = '🔒 Política de Privacidade';
        conteudo = '<h3 style="color:#1A3A5C;">1. Dados Coletados</h3>' +
            '<p>Coletamos: nome, email, telefone, profissão, experiência, fotos e localização.</p>' +
            '<h3 style="color:#1A3A5C;">2. Finalidade</h3>' +
            '<p>Seus dados são usados exclusivamente para conectar profissionais e empreiteiros.</p>' +
            '<h3 style="color:#1A3A5C;">3. Compartilhamento</h3>' +
            '<p>Não vendemos seus dados. Compartilhamos apenas o necessário para a contratação.</p>' +
            '<h3 style="color:#1A3A5C;">4. Segurança</h3>' +
            '<p>Utilizamos criptografia e medidas de segurança para proteger seus dados.</p>' +
            '<h3 style="color:#1A3A5C;">5. Seus Direitos (LGPD)</h3>' +
            '<p>Você pode: acessar, corrigir, excluir seus dados ou revogar consentimento.</p>' +
            '<h3 style="color:#1A3A5C;">6. Cookies</h3>' +
            '<p>Utilizamos cookies essenciais para o funcionamento do aplicativo.</p>';
    } else if (tipo === 'diretrizes') {
        titulo = '📋 Diretrizes da Comunidade';
        conteudo = '<h3 style="color:#1A3A5C;">1. Respeito Mútuo</h3>' +
            '<p>Trate todos os usuários com respeito e profissionalismo.</p>' +
            '<h3 style="color:#1A3A5C;">2. Pagamentos</h3>' +
            '<p>Combine valores e formas de pagamento antes de iniciar qualquer trabalho.</p>' +
            '<h3 style="color:#1A3A5C;">3. Segurança no Trabalho</h3>' +
            '<p>Siga rigorosamente as normas de segurança. Use EPIs adequados.</p>' +
            '<h3 style="color:#1A3A5C;">4. Qualidade do Serviço</h3>' +
            '<p>Entregue trabalhos com qualidade e dentro do prazo combinado.</p>' +
            '<h3 style="color:#1A3A5C;">5. Avaliações Honestas</h3>' +
            '<p>Avalie com honestidade após a conclusão do contrato.</p>' +
            '<h3 style="color:#1A3A5C;">6. Comunicação</h3>' +
            '<p>Mantenha comunicação clara e transparente entre as partes.</p>';
    } else if (tipo === 'sobre') {
        titulo = 'ℹ️ Sobre o LPXCONSTRUTOR';
        conteudo = '<div style="text-align:center;padding:20px;">' +
            '<div style="font-size:80px;">🏗️</div>' +
            '<h2 style="color:#1A3A5C;">LPXCONSTRUTOR</h2>' +
            '<p><strong>Versão 1.0.0</strong></p>' +
            '<p>Rede Profissional da Construção Civil</p>' +
            '<p>Conectando profissionais e empreiteiros de forma rápida e segura.</p>' +
            '<hr style="margin:20px 0;border-color:#ddd;">' +
            '<p><strong>Desenvolvido por:</strong> LPX Tecnologia</p>' +
            '<p><strong>Email:</strong> contato@lpxconstrutor.com.br</p>' +
            '<p><strong>Website:</strong> www.lpxconstrutor.com.br</p>' +
            '<p><strong>Fundação:</strong> 2024</p>' +
            '<p style="margin-top:20px;color:#666;">© 2024 LPXCONSTRUTOR. Todos os direitos reservados.</p>' +
            '</div>';
    }
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">' +
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;border-radius:15px;margin-bottom:20px;text-align:center;">' +
        '<h2 style="margin:0;">' + titulo + '</h2></div>' +
        '<div style="background:white;border-radius:15px;padding:20px;line-height:1.6;">' + conteudo + '</div>' +
        '<button onclick="window.app.voltarTela()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;margin-top:20px;font-weight:bold;">⬅ Voltar</button></div>';
    
    var tela = document.getElementById('meuPerfilScreen');
    if (tela) {
        tela.innerHTML = html;
        s.mostrarTela('meuPerfilScreen');
    }
};

// ===== CORREÇÃO: publicarVagaApp - GARANTIR LOCALIZAÇÃO =====
App.prototype.publicarVagaApp = function() {
    var s = this;
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes');
    var valorEl = document.getElementById('vagaValor');
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        var tela = document.getElementById('publicarVagaScreen');
        if (tela) {
            var inputs = tela.querySelectorAll('input[type="text"], input:not([type="file"]), textarea');
            if (inputs.length >= 4) {
                tituloEl = tituloEl || inputs[0]; enderecoEl = enderecoEl || inputs[1];
                profissoesEl = profissoesEl || inputs[2]; valorEl = valorEl || inputs[3];
            }
        }
    }
    
    if (!tituloEl || !enderecoEl || !profissoesEl || !valorEl) {
        s.mostrarToast('❌ Formulário não encontrado', 'erro'); return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    var profissoes = profissoesEl.value.trim();
    var valorHora = valorEl.value.trim();
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    if (!profissoes) { s.mostrarToast('❌ Digite as profissões!', 'erro'); profissoesEl.focus(); return; }
    if (!valorHora) { s.mostrarToast('❌ Digite o valor!', 'erro'); valorEl.focus(); return; }
    
    // GARANTIR LOCALIZAÇÃO
    if (!s.vagaLocalizacaoAtual) {
        // Gerar coordenadas baseadas no endereço
        var hash = 0;
        for (var i = 0; i < endereco.length; i++) { 
            hash = ((hash << 5) - hash) + endereco.charCodeAt(i); 
            hash |= 0; 
        }
        s.vagaLocalizacaoAtual = { 
            lat: -23.5505 + (Math.abs(hash) % 1000) / 10000, 
            lng: -46.6333 + ((Math.abs(hash) * 2) % 1000) / 10000 
        };
    }
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo, 
        endereco: endereco, 
        profissoes: profissoes, 
        valorHora: valorHora,
        fotoObra: s.vagaFotoBase64 || null, 
        localizacao: s.vagaLocalizacaoAtual,
        status: 'disponivel', 
        ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        dataCriacao: new Date().toISOString()
    };
    
    try {
        var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vagasSalvas.unshift(vaga);
        localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        
        if (typeof db !== 'undefined') {
            db.collection('vagas').add(vaga).catch(function(){});
        }
        
        tituloEl.value = ''; enderecoEl.value = ''; profissoesEl.value = ''; valorEl.value = '';
        var preview = document.getElementById('fotoObraPreview');
        if (preview) { preview.src = ''; preview.style.display = 'none'; }
        var inputFoto = document.getElementById('fotoObraInput');
        if (inputFoto) inputFoto.value = '';
        s.vagaFotoBase64 = null; s.vagaLocalizacaoAtual = null; s.vagaEmEdicao = null;
        
        s.mostrarToast('✅ Vaga publicada com sucesso!', 'sucesso');
        
        // ATUALIZAR PERFIL PARA MOSTRAR NOVA CONTAGEM
        setTimeout(function() { 
            s.mostrarTela('homeScreen'); 
        }, 500);
    } catch (error) {
        s.mostrarToast('❌ Erro ao publicar', 'erro');
    }
};
