// ==========================================================
// ===== LPXCONSTRUTOR - CORRIGIDO (REDE + FEED + DOCUMENTOS) =====
// ==========================================================

// ... (todo o código anterior igual até a parte da REDE) ...

// ===== REDE (CORRIGIDO - AGORA MOSTRA OS PROFISSIONAIS) =====
App.prototype.carregarRede = function() {
    var s = this;
    var container = document.getElementById('redeContainer');
    if (!container) {
        console.error('❌ Container da rede não encontrado');
        return;
    }
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔐 Faça login para ver sua rede</h3></div>';
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando sua rede...</div>';
    
    // BUSCAR CONEXÕES DO LOCALSTORAGE
    var conexoesLocal = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    console.log('📊 Conexões encontradas:', conexoesLocal.length);
    
    // Filtrar conexões do usuário logado
    var minhasConexoes = conexoesLocal.filter(function(c) {
        return c.usuarioId === s.usuarioLogado.id || c.amigoId === s.usuarioLogado.id;
    });
    
    console.log('👤 Minhas conexões:', minhasConexoes.length);
    
    if (minhasConexoes.length === 0) {
        // Verificar Firebase também
        if (typeof db !== 'undefined') {
            db.collection('conexoes').get().then(function(snap) {
                var conexoesFirebase = [];
                snap.forEach(function(doc) {
                    var d = doc.data();
                    if (d.usuarioId === s.usuarioLogado.id || d.amigoId === s.usuarioLogado.id) {
                        conexoesFirebase.push({ id: doc.id, data: d });
                        // Salvar no localStorage
                        var jaExiste = conexoesLocal.find(function(c) {
                            return (c.usuarioId === d.usuarioId && c.amigoId === d.amigoId) ||
                                   (c.usuarioId === d.amigoId && c.amigoId === d.usuarioId);
                        });
                        if (!jaExiste) {
                            conexoesLocal.push({
                                id: doc.id,
                                usuarioId: d.usuarioId,
                                amigoId: d.amigoId,
                                status: d.status || 'ativo',
                                dataCriacao: d.dataCriacao || new Date().toISOString()
                            });
                        }
                    }
                });
                localStorage.setItem('conexoesLPX', JSON.stringify(conexoesLocal));
                
                if (conexoesFirebase.length === 0) {
                    container.innerHTML = s.renderizarRedeVazia();
                    return;
                }
                
                s.buscarDadosAmigos(container, conexoesFirebase);
            }).catch(function() {
                container.innerHTML = s.renderizarRedeVazia();
            });
        } else {
            container.innerHTML = s.renderizarRedeVazia();
        }
        return;
    }
    
    // Buscar dados dos amigos conectados
    s.buscarDadosAmigos(container, minhasConexoes);
};

App.prototype.buscarDadosAmigos = function(container, conexoes) {
    var s = this;
    var amigosEncontrados = [];
    var processados = 0;
    
    conexoes.forEach(function(con) {
        var conData = con.data || con;
        var amigoId = conData.usuarioId === s.usuarioLogado.id ? conData.amigoId : conData.usuarioId;
        
        console.log('🔍 Buscando amigo:', amigoId);
        
        // Buscar no Firebase
        if (typeof db !== 'undefined') {
            db.collection('usuarios').doc(amigoId).get().then(function(doc) {
                processados++;
                if (doc.exists) {
                    amigosEncontrados.push({
                        usuario: { id: doc.id, ...doc.data() },
                        conexao: conData
                    });
                }
                
                if (processados >= conexoes.length) {
                    if (amigosEncontrados.length === 0) {
                        container.innerHTML = s.renderizarRedeVazia();
                    } else {
                        s.renderizarRede(container, amigosEncontrados);
                    }
                }
            }).catch(function() {
                processados++;
                if (processados >= conexoes.length) {
                    if (amigosEncontrados.length === 0) {
                        container.innerHTML = s.renderizarRedeVazia();
                    } else {
                        s.renderizarRede(container, amigosEncontrados);
                    }
                }
            });
        } else {
            // Sem Firebase, usar dados do localStorage
            var usuariosLocal = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
            var amigo = usuariosLocal.find(function(u) { return u.id === amigoId; });
            
            processados++;
            if (amigo) {
                amigosEncontrados.push({
                    usuario: amigo,
                    conexao: conData
                });
            }
            
            if (processados >= conexoes.length) {
                if (amigosEncontrados.length === 0) {
                    container.innerHTML = s.renderizarRedeVazia();
                } else {
                    s.renderizarRede(container, amigosEncontrados);
                }
            }
        }
    });
};

App.prototype.renderizarRedeVazia = function() {
    return '<div class="card" style="text-align:center;padding:40px;">' +
        '<div style="font-size:60px;">🔗</div>' +
        '<h3 style="color:#1A3A5C;">Sua rede está vazia</h3>' +
        '<p style="color:#666;">Conecte-se com profissionais e empreiteiros</p>' +
        '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:25px;font-weight:bold;margin-top:15px;">🔍 Buscar Profissionais</button>' +
        '</div>';
};

App.prototype.renderizarRede = function(container, amigos) {
    var s = this;
    console.log('👥 Renderizando rede com', amigos.length, 'amigos');
    
    var html = '<div style="text-align:center;padding:10px;color:#1A3A5C;font-weight:bold;font-size:14px;">🔗 ' + amigos.length + ' conexão(ões) na sua rede</div>';
    
    amigos.forEach(function(a) {
        var u = a.usuario;
        var con = a.conexao;
        var statusTexto = con.status === 'contratado' ? '🤝 Contratado' : 
                          con.status === 'finalizado' ? '✅ Finalizado' : '🔗 Conectado';
        var score = u.score || 0;
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:10px;border-left:4px solid #10B981;" onclick="window.app.verPerfil(\'' + u.id + '\')">';
        html += '<div style="display:flex;align-items:center;gap:12px;">';
        
        // Foto do amigo
        html += '<div style="width:55px;height:55px;border-radius:50%;overflow:hidden;border:2px solid #1A3A5C;flex-shrink:0;">';
        if (u.fotoPerfil) {
            html += '<img src="' + u.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<div style=width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;>👷</div>\'">';
        } else {
            html += '<div style="width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;">👷</div>';
        }
        html += '</div>';
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;font-size:15px;">' + (u.nome || 'Usuário') + '</div>';
        html += '<div style="font-size:12px;color:#666;">🔧 ' + (u.profissao || 'Profissional') + ' • 📅 ' + (u.experiencia || '0') + ' anos</div>';
        html += '<div style="font-size:12px;color:#f59e0b;">⭐ ' + (score > 0 ? score.toFixed(1) : 'Novo') + '</div>';
        html += '<div style="font-size:11px;color:#10B981;">' + statusTexto + '</div>';
        html += '</div>';
        
        // Botões de ação
        html += '<div style="display:flex;flex-direction:column;gap:5px;">';
        if (u.celular) {
            var whatsapp = u.celular.replace(/\D/g, '');
            html += '<a href="https://wa.me/55' + whatsapp + '" target="_blank" onclick="event.stopPropagation();" style="background:#25D366;color:white;border:none;padding:6px 10px;border-radius:15px;text-decoration:none;font-size:11px;text-align:center;">💬</a>';
        }
        html += '<button onclick="event.stopPropagation();window.app.removerDaRede(\'' + u.id + '\')" style="background:#EF4444;color:white;border:none;padding:6px 10px;border-radius:15px;font-size:11px;cursor:pointer;">✕</button>';
        html += '</div>';
        
        html += '</div></div>';
    });
    
    // Botão para buscar mais
    html += '<button onclick="window.app.mostrarTela(\'buscaScreen\')" style="width:100%;background:#1A3A5C;color:white;border:none;padding:12px;border-radius:25px;font-weight:bold;margin-top:10px;">🔍 Buscar Mais Profissionais</button>';
    
    container.innerHTML = html;
};

// ===== ADICIONAR NA REDE (CORRIGIDO) =====
App.prototype.adicionarNaRede = function(amigoId) {
    var s = this;
    
    if (!s.usuarioLogado) {
        s.mostrarToast('❌ Faça login primeiro!', 'erro');
        return;
    }
    
    if (s.usuarioLogado.id === amigoId) {
        s.mostrarToast('❌ Você não pode adicionar a si mesmo!', 'erro');
        return;
    }
    
    // Verificar se já existe
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    var existe = conexoes.find(function(c) {
        return (c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
               (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id);
    });
    
    if (existe) {
        s.mostrarToast('❌ Este profissional já está na sua rede!', 'erro');
        return;
    }
    
    // Buscar dados do amigo para salvar no localStorage
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(amigoId).get().then(function(doc) {
            if (doc.exists) {
                var amigoData = doc.data();
                amigoData.id = doc.id;
                
                // Salvar no localStorage de usuários
                var usuariosLocal = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
                var jaExiste = usuariosLocal.find(function(u) { return u.id === amigoId; });
                if (!jaExiste) {
                    usuariosLocal.push(amigoData);
                    localStorage.setItem('usuariosLPX', JSON.stringify(usuariosLocal));
                }
            }
            
            // Criar conexão
            s.criarConexao(amigoId, conexoes);
        }).catch(function() {
            s.criarConexao(amigoId, conexoes);
        });
    } else {
        s.criarConexao(amigoId, conexoes);
    }
};

App.prototype.criarConexao = function(amigoId, conexoes) {
    var s = this;
    
    var novaConexao = {
        id: 'con_' + Date.now(),
        usuarioId: s.usuarioLogado.id,
        amigoId: amigoId,
        status: 'ativo',
        dataCriacao: new Date().toISOString()
    };
    
    conexoes.push(novaConexao);
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    // Salvar no Firebase
    if (typeof db !== 'undefined') {
        db.collection('conexoes').add({
            usuarioId: s.usuarioLogado.id,
            amigoId: amigoId,
            status: 'ativo',
            dataCriacao: firebase.firestore?.FieldValue?.serverTimestamp() || new Date().toISOString()
        }).catch(function(err) {
            console.log('Firebase offline, salvo localmente');
        });
    }
    
    s.mostrarToast('✅ Adicionado à sua rede!', 'sucesso');
    
    // Atualizar a rede se estiver visível
    setTimeout(function() {
        if (s.tabAtual === 'rede') {
            s.carregarRede();
        }
    }, 500);
};

// ===== REMOVER DA REDE (CORRIGIDO) =====
App.prototype.removerDaRede = function(amigoId) {
    var s = this;
    
    if (!confirm('Tem certeza que deseja remover esta conexão?')) return;
    
    var conexoes = JSON.parse(localStorage.getItem('conexoesLPX') || '[]');
    conexoes = conexoes.filter(function(c) {
        return !((c.usuarioId === s.usuarioLogado.id && c.amigoId === amigoId) ||
                 (c.usuarioId === amigoId && c.amigoId === s.usuarioLogado.id));
    });
    localStorage.setItem('conexoesLPX', JSON.stringify(conexoes));
    
    // Remover do Firebase
    if (typeof db !== 'undefined') {
        db.collection('conexoes').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if ((d.usuarioId === s.usuarioLogado.id && d.amigoId === amigoId) ||
                    (d.usuarioId === amigoId && d.amigoId === s.usuarioLogado.id)) {
                    db.collection('conexoes').doc(doc.id).delete();
                }
            });
        }).catch(function() {});
    }
    
    s.mostrarToast('✅ Removido da rede', 'sucesso');
    
    // Atualizar a rede
    setTimeout(function() {
        s.carregarRede();
    }, 300);
};

// ===== FEED (CORRIGIDO - MOSTRA FOTOS VISÍVEIS) =====
App.prototype.carregarFeed = function() {
    var s = this;
    var container = document.getElementById('feedContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando obras...</div>';
    
    // Buscar vagas
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    console.log('📊 Vagas no localStorage:', vagasLocal.length);
    
    if (typeof db !== 'undefined') {
        db.collection('vagas').orderBy('dataCriacao', 'desc').get().then(function(snap) {
            var vagas = [];
            snap.forEach(function(doc) {
                var v = doc.data();
                v.id = doc.id;
                if (v.ativa !== false) vagas.push(v);
            });
            
            // Mesclar com localStorage
            vagasLocal.forEach(function(v) {
                if (!vagas.find(function(x) { return x.id === v.id; })) {
                    vagas.push(v);
                }
            });
            
            console.log('📊 Total de vagas:', vagas.length);
            s.renderizarFeed(container, vagas);
        }).catch(function() {
            s.renderizarFeed(container, vagasLocal);
        });
    } else {
        s.renderizarFeed(container, vagasLocal);
    }
};

App.prototype.renderizarFeed = function(container, vagas) {
    var s = this;
    
    if (vagas.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3 style="color:#1A3A5C;">Nenhuma obra publicada</h3>' +
            '<p style="color:#666;">Seja o primeiro a publicar!</p>' +
            (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                '<button onclick="window.app.abrirTelaPublicacao()" style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;border:none;padding:15px 30px;border-radius:25px;font-weight:bold;font-size:16px;margin-top:15px;">📢 PUBLICAR OBRA</button>' : '') +
            '</div>';
        return;
    }
    
    // Ordenar: obras do usuário primeiro
    var obrasOrdenadas = [];
    vagas.forEach(function(v) {
        if (s.usuarioLogado && v.autorId === s.usuarioLogado.id) {
            v._destaque = true;
            obrasOrdenadas.unshift(v);
        } else {
            obrasOrdenadas.push(v);
        }
    });
    
    var html = '';
    
    obrasOrdenadas.forEach(function(vaga) {
        var isDestaque = vaga._destaque;
        var statusCor = vaga.status === 'em_andamento' ? '#10B981' : '#f59e0b';
        var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:15px;' + 
            (isDestaque ? 'border:3px solid #f59e0b;box-shadow:0 4px 20px rgba(245,158,11,0.4);' : 'border-left:4px solid ' + statusCor + ';') + 
            '" onclick="window.app.verDetalheObra(\'' + vaga.id + '\')">';
        
        // Selo de destaque
        if (isDestaque) {
            html += '<div style="background:linear-gradient(135deg,#f59e0b,#e67e22);color:white;padding:6px 15px;border-radius:0 0 15px 15px;display:inline-block;font-size:12px;font-weight:bold;margin-bottom:10px;">⭐ SUA OBRA</div>';
        }
        
        // FOTO DA OBRA EM DESTAQUE (GRANDE E VISÍVEL)
        if (vaga.fotoObra && vaga.fotoObra.length > 100) {
            html += '<div style="position:relative;overflow:hidden;border-radius:12px;margin-bottom:12px;">';
            html += '<img src="' + vaga.fotoObra + '" style="width:100%;height:' + (isDestaque ? '250px' : '200px') + ';object-fit:cover;display:block;" onerror="this.parentElement.style.display=\'none\'">';
            // Overlay com título
            html += '<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.7));padding:20px 15px 15px;">';
            html += '<div style="color:white;font-weight:bold;font-size:18px;">' + (vaga.titulo || 'Sem título') + '</div>';
            html += '</div>';
            html += '</div>';
        } else {
            // Sem foto, mostrar título normal
            html += '<div style="font-weight:bold;color:#1A3A5C;font-size:16px;margin-bottom:8px;">' + (vaga.titulo || 'Sem título') + '</div>';
        }
        
        // Informações
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
        
        // Foto do autor
        if (vaga.autorFoto) {
            html += '<img src="' + vaga.autorFoto + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #1A3A5C;">';
        } else {
            html += '<div style="width:40px;height:40px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">🏗️</div>';
        }
        
        html += '<div style="flex:1;">';
        if (vaga.fotoObra && vaga.fotoObra.length > 100) {
            html += '<div style="font-size:12px;color:#666;">📍 ' + (vaga.endereco || 'Local não informado') + '</div>';
        }
        html += '<div style="font-size:11px;color:#999;">👤 ' + (vaga.autorNome || 'Anônimo') + ' • ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</div>';
        html += '</div></div>';
        
        // Tags
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        html += '<span style="background:#10B981;color:white;padding:5px 12px;border-radius:20px;font-size:12px;">💰 R$' + (vaga.valorHora || '0') + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:5px 12px;border-radius:20px;font-size:12px;">👷 ' + (vaga.profissoes || 'Todas') + '</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:5px 12px;border-radius:20px;font-size:12px;margin-left:auto;">' + statusTexto + '</span>';
        html += '</div>';
        
        // Botão candidatar para profissionais
        if (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' && vaga.status === 'disponivel') {
            html += '<button onclick="event.stopPropagation();window.app.candidatarVaga(\'' + vaga.id + '\')" style="width:100%;background:#10B981;color:white;border:none;padding:10px;border-radius:10px;font-weight:bold;margin-top:10px;">✋ QUERO!</button>';
        }
        
        html += '</div>';
    });
    
    container.innerHTML = html;
};

// ===== VER DETALHE DA OBRA (CORRIGIDO) =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    
    // Buscar em todas as fontes
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagasLocal.find(function(v) { return v.id === oid; });
    
    if (!vaga && typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).get().then(function(doc) {
            if (doc.exists) {
                var v = doc.data();
                v.id = doc.id;
                s.mostrarDetalheObraModal(v);
            } else {
                s.mostrarToast('❌ Obra não encontrada', 'erro');
            }
        }).catch(function() {
            s.mostrarToast('❌ Erro ao carregar obra', 'erro');
        });
        return;
    }
    
    if (!vaga) {
        s.mostrarToast('❌ Obra não encontrada', 'erro');
        return;
    }
    
    s.mostrarDetalheObraModal(vaga);
};

App.prototype.mostrarDetalheObraModal = function(vaga) {
    var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em andamento' : '⚪ Disponível';
    
    var html = '<div id="modalDetalheObra" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;overflow-y:auto;" onclick="if(event.target===this)this.remove()">';
    html += '<div style="background:white;min-height:100vh;max-width:600px;margin:0 auto;">';
    
    // Foto da obra (GRANDE)
    if (vaga.fotoObra && vaga.fotoObra.length > 100) {
        html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:350px;object-fit:cover;" onerror="this.style.display=\'none\'">';
    }
    
    html += '<div style="padding:20px;">';
    
    // Título e status
    html += '<h2 style="color:#1A3A5C;margin:0 0 5px 0;">' + (vaga.titulo || 'Sem título') + '</h2>';
    html += '<p style="color:#666;margin:0 0 15px 0;">' + statusTexto + '</p>';
    
    // Detalhes
    html += '<div style="background:#f9fafb;border-radius:12px;padding:15px;margin-bottom:15px;">';
    html += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    html += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    html += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    
    // Autor com foto
    html += '<div style="display:flex;align-items:center;gap:10px;margin-top:10px;">';
    if (vaga.autorFoto) {
        html += '<img src="' + vaga.autorFoto + '" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">';
    } else {
        html += '<div style="width:35px;height:35px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">🏗️</div>';
    }
    html += '<div><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '<br><small style="color:#999;">📅 ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</small></div>';
    html += '</div>';
    
    if (vaga.descricao) {
        html += '<p style="margin-top:10px;"><strong>📝 Descrição:</strong><br>' + vaga.descricao + '</p>';
    }
    html += '</div>';
    
    // Google Maps
    if (vaga.endereco) {
        html += '<a href="https://www.google.com/maps?q=' + encodeURIComponent(vaga.endereco) + '" target="_blank" style="display:block;text-align:center;background:#1A3A5C;color:white;padding:15px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:15px;">🗺️ Ver no Google Maps</a>';
    }
    
    // Botões
    html += '<div style="display:flex;gap:10px;">';
    if (this.usuarioLogado && this.usuarioLogado.tipo === 'profissional' && vaga.status === 'disponivel') {
        html += '<button onclick="window.app.candidatarVaga(\'' + vaga.id + '\');document.getElementById(\'modalDetalheObra\').remove();" style="flex:1;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">✋ QUERO!</button>';
    }
    html += '<button onclick="document.getElementById(\'modalDetalheObra\').remove()" style="flex:1;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;">⬅ Voltar</button>';
    html += '</div>';
    
    html += '</div></div></div>';
    
    var anterior = document.getElementById('modalDetalheObra');
    if (anterior) anterior.remove();
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== DOCUMENTOS (CORRIGIDO - NÃO FECHA AO VOLTAR) =====
App.prototype.mostrarDocumento = function(tipo) {
    var s = this;
    
    // Criar uma tela para o documento em vez de modal
    var telaDoc = document.getElementById('documentoScreen');
    if (!telaDoc) {
        telaDoc = document.createElement('div');
        telaDoc.id = 'documentoScreen';
        telaDoc.className = 'screen';
        document.body.appendChild(telaDoc);
    }
    
    var titulos = {
        termos: '📄 Termos de Uso',
        privacidade: '🔒 Política de Privacidade',
        diretrizes: '📋 Diretrizes da Comunidade',
        sobre: 'ℹ️ Sobre o LPXCONSTRUTOR'
    };
    
    // Tentar carregar arquivo da raiz
    if (tipo === 'termos' || tipo === 'privacidade') {
        var arquivo = tipo === 'termos' ? 'termos-de-uso.html' : 'politica-de-privacidade.html';
        
        telaDoc.innerHTML = '<div style="text-align:center;padding:50px;"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
        s.mostrarTela('documentoScreen');
        
        fetch(arquivo)
            .then(function(response) {
                if (response.ok) return response.text();
                throw new Error('Arquivo não encontrado');
            })
            .then(function(html) {
                telaDoc.innerHTML = s.criarTelaDocumento(titulos[tipo], html);
            })
            .catch(function() {
                telaDoc.innerHTML = s.criarTelaDocumento(titulos[tipo], s.getConteudoPadrao(tipo));
            });
    } else {
        telaDoc.innerHTML = s.criarTelaDocumento(titulos[tipo], s.getConteudoPadrao(tipo));
        s.mostrarTela('documentoScreen');
    }
};

App.prototype.criarTelaDocumento = function(titulo, conteudo) {
    var html = '<div style="min-height:100vh;background:#f5f5f5;">';
    
    // Cabeçalho
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;">';
    html += '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:16px;">⬅ Voltar</button>';
    html += '<h2 style="margin:0;font-size:18px;">' + titulo + '</h2>';
    html += '</div>';
    
    // Conteúdo
    html += '<div style="padding:20px;background:white;margin:10px;border-radius:12px;line-height:1.8;">';
    html += conteudo;
    html += '</div>';
    
    html += '</div>';
    
    return html;
};

App.prototype.getConteudoPadrao = function(tipo) {
    if (tipo === 'termos') {
        return '<div style="line-height:1.8;">' +
            '<h3 style="color:#1A3A5C;">1. Aceitação dos Termos</h3>' +
            '<p>Ao acessar e utilizar o LPXCONSTRUTOR, você concorda integralmente com estes Termos de Uso.</p>' +
            '<h3 style="color:#1A3A5C;">2. Cadastro</h3>' +
            '<p>O cadastro é gratuito e requer informações verídicas. Cada usuário é responsável por suas credenciais.</p>' +
            '<h3 style="color:#1A3A5C;">3. Conduta</h3>' +
            '<p>É proibido: discriminação, assédio, informações falsas, spam ou qualquer conduta ilegal.</p>' +
            '<h3 style="color:#1A3A5C;">4. Responsabilidades</h3>' +
            '<p>O LPXCONSTRUTOR atua como plataforma de conexão. Não nos responsabilizamos por acordos entre as partes.</p>' +
            '<h3 style="color:#1A3A5C;">5. Contato</h3>' +
            '<p>Email: contato@lpxconstrutor.com.br</p>' +
            '<p style="text-align:center;color:#999;margin-top:30px;">Última atualização: 2024</p></div>';
    } else if (tipo === 'privacidade') {
        return '<div style="line-height:1.8;">' +
            '<h3 style="color:#1A3A5C;">1. Introdução</h3>' +
            '<p>O LPXCONSTRUTOR está comprometido com a proteção dos seus dados pessoais (LGPD).</p>' +
            '<h3 style="color:#1A3A5C;">2. Dados Coletados</h3>' +
            '<p>Nome, email, telefone, profissão, experiência, fotos e localização.</p>' +
            '<h3 style="color:#1A3A5C;">3. Finalidade</h3>' +
            '<p>Conexão entre profissionais e empreiteiros na construção civil.</p>' +
            '<h3 style="color:#1A3A5C;">4. Direitos (LGPD)</h3>' +
            '<p>✅ Acessar, corrigir, excluir dados e revogar consentimento.</p>' +
            '<h3 style="color:#1A3A5C;">5. Contato DPO</h3>' +
            '<p>Email: privacidade@lpxconstrutor.com.br</p>' +
            '<p style="text-align:center;color:#999;margin-top:30px;">Última atualização: 2024</p></div>';
    } else if (tipo === 'diretrizes') {
        return '<div style="line-height:1.8;">' +
            '<h3 style="color:#1A3A5C;">1. Respeito Mútuo</h3>' +
            '<p>Trate todos com respeito e profissionalismo.</p>' +
            '<h3 style="color:#1A3A5C;">2. Segurança</h3>' +
            '<p>Siga rigorosamente as normas de segurança. Use EPIs adequados.</p>' +
            '<h3 style="color:#1A3A5C;">3. Qualidade</h3>' +
            '<p>Entregue trabalhos com qualidade e dentro do prazo combinado.</p>' +
            '<h3 style="color:#1A3A5C;">4. Avaliações</h3>' +
            '<p>Avalie com honestidade após a conclusão do contrato.</p></div>';
    } else {
        return '<div style="text-align:center;line-height:1.8;">' +
            '<div style="font-size:80px;">🏗️</div>' +
            '<h2 style="color:#1A3A5C;">LPXCONSTRUTOR</h2>' +
            '<p><strong>Versão 1.0.0</strong></p>' +
            '<p>Rede Profissional da Construção Civil</p>' +
            '<hr>' +
            '<p><strong>Missão:</strong> Conectar profissionais e empreiteiros.</p>' +
            '<p><strong>Email:</strong> contato@lpxconstrutor.com.br</p>' +
            '<p style="color:#999;">© 2024 LPXCONSTRUTOR</p></div>';
    }
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', function() {
    window.app._app = new App();
    console.log('✅ LPXCONSTRUTOR CORRIGIDO!');
    console.log('✅ Rede funcionando');
    console.log('✅ Feed com fotos visíveis');
    console.log('✅ Documentos não fecham ao voltar');
});
