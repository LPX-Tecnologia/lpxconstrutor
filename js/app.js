// ===== CORREÇÃO COMPLETA: verDetalheObra =====
App.prototype.verDetalheObra = function(oid) {
    var s = this;
    
    // Buscar vaga no localStorage E no Firebase
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var vaga = vagasLocal.find(function(v) { return v.id === oid; });
    
    // Se não encontrou no localStorage, tenta Firebase
    if (!vaga && typeof db !== 'undefined') {
        db.collection('vagas').doc(oid).get().then(function(doc) {
            if (doc.exists) {
                var v = { id: doc.id, data: doc.data() };
                s.mostrarDetalheObraTela(v);
            } else {
                s.mostrarToast('❌ Obra não encontrada!', 'erro');
            }
        }).catch(function() {
            s.mostrarToast('❌ Erro ao carregar obra', 'erro');
        });
        return;
    }
    
    if (!vaga) {
        s.mostrarToast('❌ Obra não encontrada!', 'erro');
        return;
    }
    
    s.mostrarDetalheObraTela({ id: vaga.id, data: vaga });
};

// ===== NOVA FUNÇÃO: mostrarDetalheObraTela =====
App.prototype.mostrarDetalheObraTela = function(vagaObj) {
    var s = this;
    var vaga = vagaObj.data;
    var oid = vagaObj.id;
    
    var statusTexto = vaga.status === 'em_andamento' ? '🟢 Em Andamento' : 
                      vaga.status === 'finalizado' ? '✅ Finalizada' : '⚪ Disponível';
    
    var html = '<div style="padding:20px;background:#f5f5f5;min-height:100vh;">';
    
    // ========== FOTO DA OBRA ==========
    if (vaga.fotoObra) {
        html += '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:250px;object-fit:cover;border-radius:15px;margin-bottom:15px;" onerror="this.style.display=\'none\'">';
    }
    
    // ========== CABEÇALHO ==========
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">';
    html += '<h2 style="color:#1A3A5C;margin:0 0 10px 0;">' + (vaga.titulo || 'Sem título') + '</h2>';
    html += '<p style="color:#666;font-size:14px;">' + statusTexto + '</p>';
    html += '</div>';
    
    // ========== DETALHES ==========
    html += '<div style="background:white;border-radius:15px;padding:20px;margin-bottom:15px;">';
    html += '<h3 style="color:#1A3A5C;margin:0 0 15px 0;">📋 Detalhes da Obra</h3>';
    html += '<p><strong>📍 Endereço:</strong> ' + (vaga.endereco || 'Não informado') + '</p>';
    html += '<p><strong>👷 Profissões:</strong> ' + (vaga.profissoes || 'Todas') + '</p>';
    html += '<p><strong>💰 Valor/hora:</strong> R$ ' + (vaga.valorHora || '0') + '</p>';
    
    // ========== FOTO DO AUTOR (EMPREITEIRO) ==========
    if (vaga.autorFoto) {
        html += '<div style="display:flex;align-items:center;gap:10px;margin-top:10px;">';
        html += '<img src="' + vaga.autorFoto + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #1A3A5C;">';
        html += '<span><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</span>';
        html += '</div>';
    } else {
        html += '<p><strong>👤 Publicado por:</strong> ' + (vaga.autorNome || 'Anônimo') + '</p>';
    }
    
    html += '<p><strong>📅 Data:</strong> ' + new Date(vaga.dataCriacao).toLocaleDateString('pt-BR') + '</p>';
    
    if (vaga.profissionalNome) {
        html += '<p><strong>👷 Contratado:</strong> ' + vaga.profissionalNome + '</p>';
    }
    html += '</div>';
    
    // ========== MAPA COM LOCALIZAÇÃO ==========
    if (vaga.localizacao && vaga.localizacao.lat && vaga.localizacao.lng) {
        var mapId = 'mapaDetalhe_' + Date.now();
        html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;">';
        html += '<h3 style="color:#1A3A5C;margin:0 0 10px 0;">🗺️ Localização</h3>';
        html += '<div id="' + mapId + '" style="width:100%;height:200px;border-radius:10px;background:#e5e7eb;"></div>';
        html += '<p style="text-align:center;font-size:12px;color:#666;margin-top:8px;">📍 ' + (vaga.endereco || '') + '</p>';
        html += '</div>';
        
        // Inicializar mapa depois que o HTML for renderizado
        setTimeout(function() {
            var mapDiv = document.getElementById(mapId);
            if (mapDiv && typeof L !== 'undefined') {
                var map = L.map(mapId).setView([vaga.localizacao.lat, vaga.localizacao.lng], 16);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(map);
                
                // ÍCONE DE OBRA (CONSTRUÇÃO)
                var obraIcon = L.divIcon({
                    html: '<div style="font-size:30px;">🏗️</div>',
                    className: 'obra-marker',
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                });
                
                L.marker([vaga.localizacao.lat, vaga.localizacao.lng], { icon: obraIcon }).addTo(map)
                    .bindPopup('<b>' + (vaga.titulo || 'Obra') + '</b><br>' + (vaga.endereco || ''))
                    .openPopup();
            } else if (mapDiv) {
                // Fallback: link para Google Maps
                mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:10px;text-align:center;">' +
                    '<div><div style="font-size:40px;">🏗️</div><a href="https://www.google.com/maps?q=' + 
                    encodeURIComponent(vaga.endereco || '') + '" target="_blank" style="color:#1A3A5C;font-weight:bold;text-decoration:underline;">Abrir no Google Maps</a></div></div>';
            }
        }, 500);
    } else if (vaga.endereco) {
        // Sem coordenadas, mas tem endereço
        html += '<div style="background:white;border-radius:15px;padding:15px;margin-bottom:15px;text-align:center;">';
        html += '<div style="font-size:40px;">🏗️</div>';
        html += '<p style="margin-top:10px;"><a href="https://www.google.com/maps?q=' + 
                encodeURIComponent(vaga.endereco) + '" target="_blank" style="color:#1A3A5C;font-weight:bold;text-decoration:underline;">📍 Ver no Google Maps</a></p>';
        html += '</div>';
    }
    
    // ========== BOTÕES DE AÇÃO ==========
    html += '<div style="display:flex;gap:10px;flex-wrap:wrap;">';
    
    if (s.usuarioLogado) {
        if (s.usuarioLogado.tipo === 'profissional' && vaga.status === 'disponivel') {
            html += '<button onclick="window.app.candidatarVaga(\'' + oid + '\')" style="flex:1;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:14px;">✋ QUERO!</button>';
        }
        
        if (s.usuarioLogado.id === vaga.autorId && vaga.status === 'disponivel') {
            html += '<button onclick="window.app.editarVaga(\'' + oid + '\')" style="flex:1;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:14px;">✏️ Editar</button>';
        }
    }
    
    html += '<button onclick="window.app.voltarTela()" style="flex:1;background:#6b7280;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:14px;">⬅ Voltar</button>';
    html += '</div>';
    html += '</div>';
    
    // Mostrar na tela de detalhe
    var telaDetalhe = document.getElementById('detalheObraScreen');
    if (!telaDetalhe) {
        // Criar tela se não existir
        telaDetalhe = document.createElement('div');
        telaDetalhe.id = 'detalheObraScreen';
        telaDetalhe.className = 'screen';
        document.body.appendChild(telaDetalhe);
    }
    
    telaDetalhe.innerHTML = html;
    s.mostrarTela('detalheObraScreen');
};

// ===== CORREÇÃO: carregarMinhasObras - NUNCA SOME =====
App.prototype.carregarMinhasObras = function() {
    var s = this;
    var container = document.getElementById('minhasObrasContainer') || document.getElementById('listaObrasContainer');
    
    if (!container) {
        // Tentar encontrar em outras telas
        var telas = document.querySelectorAll('.screen');
        telas.forEach(function(tela) {
            var c = tela.querySelector('#minhasObrasContainer, #listaObrasContainer, [id*="obra"]');
            if (c) container = c;
        });
    }
    
    if (!container) return;
    
    if (!s.usuarioLogado) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:30px;"><h3>🔐 Faça login</h3><p>Faça login para ver suas obras</p></div>';
        return;
    }
    
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando obras...</div>';
    
    // BUSCAR OBRAS DO LOCALSTORAGE E FIREBASE
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var minhasObras = vagasLocal.filter(function(v) {
        return v.autorId === s.usuarioLogado.id;
    });
    
    // Também buscar do Firebase se disponível
    if (typeof db !== 'undefined') {
        db.collection('vagas').where('autorId', '==', s.usuarioLogado.id).get().then(function(snap) {
            snap.forEach(function(doc) {
                var v = doc.data();
                v.id = doc.id;
                // Verificar se já existe no array
                var existe = minhasObras.find(function(o) { return o.id === doc.id; });
                if (!existe) {
                    minhasObras.push(v);
                }
            });
            s.renderizarMinhasObras(container, minhasObras);
        }).catch(function() {
            s.renderizarMinhasObras(container, minhasObras);
        });
    } else {
        s.renderizarMinhasObras(container, minhasObras);
    }
};

// ===== NOVA FUNÇÃO: renderizarMinhasObras =====
App.prototype.renderizarMinhasObras = function(container, obras) {
    var s = this;
    
    // Atualizar contador
    var totalEl = document.getElementById('totalObras');
    if (totalEl) totalEl.textContent = obras.length;
    
    if (obras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;">' +
            '<div style="font-size:60px;">🏗️</div>' +
            '<h3 style="color:#1A3A5C;">Nenhuma obra cadastrada</h3>' +
            '<p style="color:#666;">Publique sua primeira vaga!</p>' +
            '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="background:#1A3A5C;color:white;border:none;padding:15px 30px;border-radius:10px;font-weight:bold;margin-top:10px;">📢 PUBLICAR VAGA</button>' +
            '</div>';
        return;
    }
    
    var html = '<div style="padding:15px;">';
    html += '<div style="text-align:center;margin-bottom:15px;color:#666;">🏗️ <strong>' + obras.length + '</strong> obra(s) cadastrada(s)</div>';
    
    obras.forEach(function(v) {
        var statusCor = v.status === 'em_andamento' ? '#10B981' : v.status === 'finalizado' ? '#6b7280' : '#f59e0b';
        var statusTexto = v.status === 'em_andamento' ? '🟢 Em andamento' : 
                          v.status === 'finalizado' ? '✅ Finalizada' : '⚪ Disponível';
        
        html += '<div class="card" style="cursor:pointer;margin-bottom:12px;border-left:4px solid ' + statusCor + ';" onclick="window.app.verDetalheObra(\'' + v.id + '\')">';
        
        // Foto da obra (se tiver)
        if (v.fotoObra) {
            html += '<img src="' + v.fotoObra + '" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px;" onerror="this.style.display=\'none\'">';
        }
        
        html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
        
        // Foto do autor (EMPREITEIRO)
        if (v.autorFoto) {
            html += '<img src="' + v.autorFoto + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #1A3A5C;">';
        } else {
            html += '<div style="width:40px;height:40px;background:#1A3A5C;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">🏗️</div>';
        }
        
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#1A3A5C;font-size:15px;">' + (v.titulo || 'Sem título') + '</div>';
        html += '<div style="font-size:12px;color:#666;">📍 ' + (v.endereco || 'Sem endereço') + '</div>';
        html += '</div></div>';
        
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        html += '<span style="background:#10B981;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">💰 R$' + (v.valorHora || '0') + '/h</span>';
        html += '<span style="background:#1A3A5C;color:white;padding:3px 10px;border-radius:15px;font-size:11px;">👷 ' + (v.profissoes || 'Todas') + '</span>';
        html += '<span style="background:' + statusCor + ';color:white;padding:3px 10px;border-radius:15px;font-size:11px;margin-left:auto;">' + statusTexto + '</span>';
        html += '</div>';
        html += '</div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
};

// ===== CORREÇÃO: publicarVagaApp - COM FOTO DO PERFIL E GEOLOCALIZAÇÃO =====
App.prototype.publicarVagaApp = function() {
    var s = this;
    
    // Pegar elementos do formulário
    var tituloEl = document.getElementById('vagaTitulo');
    var enderecoEl = document.getElementById('vagaEndereco');
    var profissoesEl = document.getElementById('vagaProfissoes') || document.getElementById('profissoesCheckboxes');
    var valorEl = document.getElementById('vagaValor') || document.getElementById('vagaValorHora');
    var descricaoEl = document.getElementById('vagaDescricao');
    
    // Se não encontrou por ID, procurar na tela ativa
    if (!tituloEl || !enderecoEl) {
        var tela = document.getElementById('publicarVagaScreen');
        if (tela) {
            var inputs = tela.querySelectorAll('input[type="text"], input:not([type="file"]), textarea');
            if (inputs.length >= 4) {
                tituloEl = tituloEl || inputs[0];
                enderecoEl = enderecoEl || inputs[1];
                profissoesEl = profissoesEl || inputs[2];
                valorEl = valorEl || inputs[3];
                descricaoEl = descricaoEl || inputs[4];
            }
        }
    }
    
    if (!tituloEl || !enderecoEl) {
        s.mostrarToast('❌ Formulário não encontrado', 'erro');
        return;
    }
    
    var titulo = tituloEl.value.trim();
    var endereco = enderecoEl.value.trim();
    
    // Pegar profissões (checkbox ou input)
    var profissoes = '';
    if (profissoesEl && profissoesEl.tagName === 'DIV') {
        // É um container de checkboxes
        var checks = profissoesEl.querySelectorAll('input:checked');
        var profsArray = [];
        checks.forEach(function(cb) { profsArray.push(cb.value); });
        profissoes = profsArray.join(', ') || 'Geral';
    } else if (profissoesEl) {
        profissoes = profissoesEl.value.trim() || 'Geral';
    } else {
        profissoes = 'Geral';
    }
    
    var valorHora = valorEl ? valorEl.value.trim() : '0';
    var descricao = descricaoEl ? descricaoEl.value.trim() : '';
    
    if (!titulo) { s.mostrarToast('❌ Digite o título!', 'erro'); tituloEl.focus(); return; }
    if (!endereco) { s.mostrarToast('❌ Digite o endereço!', 'erro'); enderecoEl.focus(); return; }
    
    s.mostrarToast('📡 Geocodificando endereço...', 'info');
    
    // GEOLOCALIZAR ENDEREÇO
    s.geocodificarEnderecoApp(endereco).then(function(coords) {
        s.salvarVagaCompleta(titulo, endereco, profissoes, valorHora, descricao, coords, tituloEl, enderecoEl, profissoesEl, valorEl, descricaoEl);
    }).catch(function() {
        // Sem coordenadas, gerar baseado no endereço
        var hash = 0;
        for (var i = 0; i < endereco.length; i++) { 
            hash = ((hash << 5) - hash) + endereco.charCodeAt(i); 
            hash |= 0; 
        }
        var coords = { 
            lat: -23.5505 + (Math.abs(hash) % 1000) / 10000, 
            lng: -46.6333 + ((Math.abs(hash) * 2) % 1000) / 10000 
        };
        s.salvarVagaCompleta(titulo, endereco, profissoes, valorHora, descricao, coords, tituloEl, enderecoEl, profissoesEl, valorEl, descricaoEl);
    });
};

// ===== NOVA FUNÇÃO: geocodificarEnderecoApp =====
App.prototype.geocodificarEnderecoApp = function(endereco) {
    return new Promise(function(resolve, reject) {
        // Tentar Google Maps Geocoding
        if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: endereco }, function(results, status) {
                if (status === 'OK' && results[0]) {
                    resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    reject('Google Geocoding falhou');
                }
            });
        }
        // Tentar Nominatim (OpenStreetMap)
        else {
            var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(endereco);
            fetch(url).then(function(response) {
                return response.json();
            }).then(function(data) {
                if (data && data.length > 0) {
                    resolve({
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    });
                } else {
                    reject('Endereço não encontrado');
                }
            }).catch(function() {
                reject('Erro na geolocalização');
            });
        }
    });
};

// ===== NOVA FUNÇÃO: salvarVagaCompleta =====
App.prototype.salvarVagaCompleta = function(titulo, endereco, profissoes, valorHora, descricao, coords, tituloEl, enderecoEl, profissoesEl, valorEl, descricaoEl) {
    var s = this;
    
    var vaga = {
        id: 'vaga_' + Date.now(),
        titulo: titulo,
        endereco: endereco,
        profissoes: profissoes,
        valorHora: valorHora,
        descricao: descricao,
        fotoObra: s.vagaFotoBase64 || null,
        localizacao: coords,
        status: 'disponivel',
        ativa: true,
        autorId: s.usuarioLogado ? s.usuarioLogado.id : 'anonimo',
        autorNome: s.usuarioLogado ? s.usuarioLogado.nome : 'Anônimo',
        autorFoto: s.usuarioLogado ? s.usuarioLogado.fotoPerfil || null : null,
        dataCriacao: new Date().toISOString(),
        interessados: []
    };
    
    try {
        // SALVAR NO LOCALSTORAGE (NUNCA SOME)
        var vagasSalvas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
        vagasSalvas.unshift(vaga);
        localStorage.setItem('vagasLPX', JSON.stringify(vagasSalvas));
        
        // SALVAR NO FIREBASE (se disponível)
        if (typeof db !== 'undefined') {
            db.collection('vagas').add(vaga).then(function(docRef) {
                console.log('✅ Vaga salva no Firebase:', docRef.id);
                // Atualizar ID no localStorage
                vaga.id = docRef.id;
                var vagasAtualizadas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
                var idx = vagasAtualizadas.findIndex(function(v) { return v.id === 'vaga_' + Date.now(); });
                if (idx === -1) {
                    vagasAtualizadas[0].id = docRef.id;
                    localStorage.setItem('vagasLPX', JSON.stringify(vagasAtualizadas));
                }
            }).catch(function(err) {
                console.log('⚠️ Erro Firebase (salvo apenas local):', err);
            });
        }
        
        // LIMPAR FORMULÁRIO
        if (tituloEl) tituloEl.value = '';
        if (enderecoEl) enderecoEl.value = '';
        if (profissoesEl) {
            if (profissoesEl.tagName === 'DIV') {
                profissoesEl.querySelectorAll('input').forEach(function(cb) { cb.checked = false; });
            } else {
                profissoesEl.value = '';
            }
        }
        if (valorEl) valorEl.value = '';
        if (descricaoEl) descricaoEl.value = '';
        
        var preview = document.getElementById('vagaFotoPreview') || document.getElementById('fotoObraPreview');
        if (preview) { 
            preview.src = 'imagem/logo-sem-fundo-lpxconstrutor.png'; 
        }
        
        var inputFoto = document.getElementById('vagaFotoInput') || document.getElementById('fotoObraInput');
        if (inputFoto) inputFoto.value = '';
        
        s.vagaFotoBase64 = null;
        s.vagaLocalizacaoAtual = null;
        
        s.mostrarToast('✅ Obra publicada com sucesso! 🏗️', 'sucesso');
        
        // ATUALIZAR FEED E PERFIL
        setTimeout(function() { 
            s.mostrarTela('homeScreen');
            s.carregarFeed();
            
            // Atualizar contagem no perfil
            var totalEl = document.getElementById('totalObras');
            if (totalEl) {
                var vagasTotal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
                var minhasObras = vagasTotal.filter(function(v) { return v.autorId === s.usuarioLogado.id; });
                totalEl.textContent = minhasObras.length;
            }
        }, 800);
        
    } catch (error) {
        console.error('Erro ao salvar vaga:', error);
        s.mostrarToast('❌ Erro ao publicar obra', 'erro');
    }
};

// ===== CORREÇÃO: carregarFeed - MOSTRA FOTO DO AUTOR =====
App.prototype.carregarFeed = function() {
    var s = this, c = document.getElementById('feedContainer'); 
    if (!c) return; 
    
    c.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando feed...</div>';
    
    var videos = [
        { titulo: '🦺 Segurança no Trabalho', descricao: 'Dicas essenciais de segurança.', url: 'https://www.youtube.com/embed/e6xfabB9ovg', categoria: 'Segurança' },
        { titulo: '⚠️ Prevenção de Acidentes', descricao: 'Evite acidentes comuns.', url: 'https://www.youtube.com/embed/AIXEnxNejEo', categoria: 'Segurança' },
        { titulo: '👷 Uso Correto de EPIs', descricao: 'Equipamentos de Proteção.', url: 'https://www.youtube.com/embed/4uEdMmJUwOQ', categoria: 'Segurança' },
        { titulo: '🏗️ Segurança em Altura', descricao: 'Trabalhos acima de 2m.', url: 'https://www.youtube.com/embed/bh2pzYBs_go', categoria: 'Segurança' },
        { titulo: '🔌 Segurança com Eletricidade', descricao: 'Riscos elétricos.', url: 'https://www.youtube.com/embed/awR7lJO3jUU', categoria: 'Eletricista' },
        { titulo: '🧯 Prevenção de Incêndios', descricao: 'Uso de extintores.', url: 'https://www.youtube.com/embed/RReflO7kR3Y', categoria: 'Segurança' }
    ];
    
    var hoje = new Date(); 
    var dia = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); 
    var vd = videos[dia % videos.length];
    
    // BUSCAR VAGAS (LOCAL + FIREBASE)
    var vagasLocal = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    
    var promessaVagas = new Promise(function(resolve) {
        if (typeof db !== 'undefined') {
            db.collection('vagas').get().then(function(snap) {
                var vagas = [];
                snap.forEach(function(doc) { 
                    var d = doc.data(); 
                    if (d.ativa !== false) {
                        vagas.push({ id: doc.id, data: d }); 
                    }
                });
                resolve(vagas);
            }).catch(function() {
                resolve(vagasLocal.map(function(v) { return { id: v.id, data: v }; }));
            });
        } else {
            resolve(vagasLocal.map(function(v) { return { id: v.id, data: v }; }));
        }
    });
    
    promessaVagas.then(function(vagas) {
        var html = '';
        
        // VÍDEO DO DIA
        html += '<div class="card" style="padding:0;overflow:hidden;border:2px solid #10B981;margin-bottom:14px;">' +
            '<div style="background:linear-gradient(135deg,#059669,#10B981);padding:10px 14px;color:white;">' +
            '<span style="font-size:20px;">🎓</span> <strong>📚 ' + vd.categoria + '</strong><br>' +
            '<span style="font-size:10px;">' + hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' }) + ' • SafetyWiSST</span>' +
            '<p style="font-size:11px;margin-top:4px;">' + vd.descricao + '</p></div>' +
            '<iframe src="' + vd.url + '?autoplay=0&rel=0&controls=1" style="width:100%;height:200px;border:none;" allowfullscreen></iframe>' +
            '<div style="padding:6px 14px;background:#f0fdf4;display:flex;justify-content:space-between;">' +
            '<span style="font-size:10px;color:#059669;"><strong>' + vd.titulo + '</strong></span>' +
            '<div style="display:flex;gap:4px;">' +
            '<button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoAnterior()">◀</button>' +
            '<button class="btn btn-small" style="background:#10B981;color:white;font-size:10px;padding:3px 8px;" onclick="event.stopPropagation();window.app._app.videoSeguinte()">▶</button></div></div></div>';
        
        if (vagas.length === 0) { 
            html += '<div class="card" style="text-align:center;padding:30px;">' +
                '<h3>Nenhuma vaga publicada</h3>' + 
                (s.usuarioLogado && s.usuarioLogado.tipo === 'empreiteiro' ? 
                    '<button class="btn btn-primary" onclick="window.app.abrirTelaPublicacao()" style="background:#1A3A5C;color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:bold;margin-top:10px;">📢 PUBLICAR VAGA</button>' : '') + 
                '</div>'; 
        } else { 
            vagas.forEach(function(v) { 
                var vaga = v.data;
                
                html += '<div class="vaga-card" onclick="window.app.verDetalheObra(\'' + v.id + '\')" style="cursor:pointer;">' +
                    '<div class="vaga-header">' +
                    '<div class="vaga-avatar">';
                
                // FOTO DO AUTOR (EMPREITEIRO)
                if (vaga.autorFoto) {
                    html += '<img src="' + vaga.autorFoto + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
                } else {
                    html += '<i class="fas fa-user-tie"></i>';
                }
                
                html += '</div>' +
                    '<div class="vaga-info">' +
                    '<div class="vaga-nome">' + (vaga.titulo || 'Vaga') + '</div>' +
                    '<div class="vaga-data">📍 ' + (vaga.endereco || '') + '</div>' +
                    '</div></div>' +
                    '<div class="vaga-body">' +
                    '<div class="vaga-tags">' +
                    '<span class="vaga-tag">💰 R$' + (vaga.valorHora || '0') + '/h</span>' +
                    '<span class="vaga-tag">👷 ' + (vaga.profissoes || 'Todas') + '</span>' +
                    '</div>' + 
                    (vaga.fotoObra ? '<img src="' + vaga.fotoObra + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px;">' : '') + 
                    '</div>' + 
                    (s.usuarioLogado && s.usuarioLogado.tipo === 'profissional' ? 
                        '<div class="vaga-footer"><button class="btn btn-primary btn-small" onclick="event.stopPropagation();window.app.candidatarVaga(\'' + v.id + '\')">✋ QUERO!</button></div>' : '') + 
                    '</div>'; 
            }); 
        }
        
        c.innerHTML = html;
    }).catch(function() { 
        c.innerHTML = '<div class="card" style="text-align:center;padding:30px;">Erro ao carregar feed</div>'; 
    });
};

// ===== CORREÇÃO: carregarMeuPerfil - ATUALIZA CONTAGEM =====
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
    
    // CONTAR OBRAS DO USUÁRIO (LOCAL + FIREBASE)
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id; }).length;
    
    // Atualizar Firebase também
    if (typeof db !== 'undefined') {
        db.collection('vagas').where('autorId', '==', user.id).get().then(function(snap) {
            totalObras = Math.max(totalObras, snap.size);
            var totalEl = document.getElementById('totalObras');
            if (totalEl) totalEl.textContent = totalObras;
        }).catch(function() {});
    }
    
    var score = user.score || 0;
    var estrelas = '';
    for (var i = 0; i < 5; i++) estrelas += i < Math.round(score) ? '⭐' : '☆';
    
    var html = '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:40px 20px 30px;text-align:center;border-radius:0 0 30px 30px;margin-bottom:20px;">';
    
    // FOTO DO PERFIL
    html += '<div style="width:100px;height:100px;background:white;border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:50px;overflow:hidden;border:3px solid #f0c27f;">';
    html += user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;">' : '<span>👷</span>';
    html += '</div>';
    
    html += '<h2 style="margin:10px 0;">' + (user.nome || 'Usuário') + '</h2>';
    html += '<p style="color:#f0c27f;">' + (user.profissao || 'Profissional') + ' • ' + (user.experiencia || '0') + ' anos</p>';
    html += '<p style="font-size:18px;">' + estrelas + ' ' + score.toFixed(1) + '</p></div>';
    
    html += '<div style="padding:0 15px;">';
    
    // ESTATÍSTICAS
    html += '<div style="display:flex;gap:10px;margin-bottom:15px;">';
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;">';
    html += '<div style="font-size:24px;color:#1A3A5C;font-weight:bold;">' + (user.experiencia || '0') + '</div>';
    html += '<div style="color:#999;font-size:11px;">Anos Exp.</div></div>';
    
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;">';
    html += '<div style="font-size:24px;color:#f59e0b;font-weight:bold;">' + score.toFixed(1) + '</div>';
    html += '<div style="color:#999;font-size:11px;">Avaliação</div></div>';
    
    html += '<div style="flex:1;background:white;border-radius:15px;padding:15px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();">';
    html += '<div style="font-size:24px;color:#10B981;font-weight:bold;">' + totalObras + '</div>';
    html += '<div style="color:#999;font-size:11px;">Obras</div></div>';
    html += '</div>';
    
    // BOTÃO MINHAS OBRAS
    html += '<button onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();" style="width:100%;background:#1A3A5C;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">🏗️ Minhas Obras (' + totalObras + ')</button>';
    
    // BOTÃO EDITAR PERFIL
    html += '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;margin-bottom:10px;">✏️ Editar Perfil</button>';
    
    // BOTÃO SAIR
    html += '<button onclick="window.app.sair()" style="width:100%;background:white;color:#EF4444;border:2px solid #EF4444;padding:15px;border-radius:10px;font-weight:bold;">🚪 Sair</button></div>';
    
    tela.innerHTML = html;
};
