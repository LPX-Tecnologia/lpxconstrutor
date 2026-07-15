// ==========================================================
// ===== PERFIL ORGANIZADO + EXCLUIR CONTA + MAPA =====
// ==========================================================

// ===== 1. PERFIL ORGANIZADO =====
App.prototype.carregarMeuPerfil = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    var user = s.usuarioLogado;
    var tela = document.getElementById('meuPerfilScreen');
    if (!tela) return;
    
    var vagas = JSON.parse(localStorage.getItem('vagasLPX') || '[]');
    var totalObras = vagas.filter(function(v) { return v.autorId === user.id || v.usuarioId === user.id; }).length;
    
    tela.innerHTML = 
        // CABEÇALHO COM FOTO
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:30px 20px;text-align:center;">' +
        '<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;margin:0 auto 15px;border:3px solid #f0c27f;cursor:pointer;" onclick="document.getElementById(\'inputFoto\').click()">' +
        (user.fotoPerfil ? '<img src="' + user.fotoPerfil + '" style="width:100%;height:100%;object-fit:cover;" id="fotoPerfilPreview">' : 
        '<img src="imagem/logo-sem-fundo-lpxconstrutor.png" style="width:100%;height:100%;object-fit:contain;" id="fotoPerfilPreview">') +
        '</div>' +
        '<input type="file" id="inputFoto" accept="image/*" onchange="window.app.uploadFoto(event)" style="display:none;">' +
        '<p style="font-size:10px;color:#ccc;margin-top:5px;">📷 Toque para alterar foto</p>' +
        '<h2 style="margin:10px 0 5px;font-size:22px;">' + (user.nome || 'Usuário') + '</h2>' +
        '<p style="color:#f0c27f;font-size:14px;margin:0;">' + (user.profissao || user.tipo || 'Profissional') + '</p>' +
        '<div style="margin-top:8px;">⭐ ' + (user.score || 0).toFixed(1) + '</div>' +
        '</div>' +
        
        // ESTATÍSTICAS
        '<div style="display:flex;gap:8px;padding:15px;background:white;">' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;">' +
        '<div style="font-size:22px;font-weight:bold;color:#1A3A5C;">' + (user.experiencia || '0') + '</div>' +
        '<div style="font-size:11px;color:#666;">Anos Exp.</div></div>' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;">' +
        '<div style="font-size:22px;font-weight:bold;color:#f59e0b;">' + (user.score || 0).toFixed(1) + '</div>' +
        '<div style="font-size:11px;color:#666;">Avaliação</div></div>' +
        '<div style="flex:1;background:#f9fafb;border-radius:12px;padding:12px;text-align:center;cursor:pointer;" onclick="window.app.mostrarTela(\'minhasObrasScreen\');window.app.carregarMinhasObras();">' +
        '<div style="font-size:22px;font-weight:bold;color:#10B981;">' + totalObras + '</div>' +
        '<div style="font-size:11px;color:#666;">Obras</div></div>' +
        '</div>' +
        
        // INFORMAÇÕES PESSOAIS (ORGANIZADO)
        '<div style="background:white;margin:0 15px 10px;border-radius:12px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#1A3A5C;font-size:15px;margin-bottom:15px;display:flex;align-items:center;gap:8px;">' +
        '<i class="fas fa-id-card" style="color:#F47920;"></i> Dados Pessoais</h3>' +
        
        '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">' +
        '<i class="fas fa-user" style="width:30px;color:#666;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Nome</div><div style="font-weight:500;">' + (user.nome || 'Não informado') + '</div></div>' +
        '</div>' +
        
        '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">' +
        '<i class="fas fa-envelope" style="width:30px;color:#666;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Email</div><div style="font-weight:500;">' + (user.email || 'Não informado') + '</div></div>' +
        '</div>' +
        
        '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">' +
        '<i class="fas fa-phone" style="width:30px;color:#666;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Telefone</div><div style="font-weight:500;">' + (user.celular || 'Não informado') + '</div></div>' +
        '</div>' +
        
        '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">' +
        '<i class="fas fa-briefcase" style="width:30px;color:#666;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Profissão</div><div style="font-weight:500;">' + (user.profissao || 'Não informada') + '</div></div>' +
        '</div>' +
        
        '<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">' +
        '<i class="fas fa-building" style="width:30px;color:#666;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Tipo de Conta</div><div style="font-weight:500;">' + (user.tipo === 'empreiteiro' ? '🏢 Empreiteiro' : '👷 Profissional') + '</div></div>' +
        '</div>' +
        
        // LOCALIZAÇÃO
        '<div style="display:flex;align-items:center;padding:10px 0;cursor:pointer;" onclick="window.app.abrirMapaLocalizacao()">' +
        '<i class="fas fa-map-marker-alt" style="width:30px;color:#F47920;"></i>' +
        '<div style="flex:1;"><div style="font-size:11px;color:#999;">Localização</div><div style="font-weight:500;">' + 
        (user.localizacao ? (user.localizacao.cidade || '') + ', ' + (user.localizacao.estado || '') : 'Toque para adicionar 📍') + 
        '</div></div>' +
        '<i class="fas fa-chevron-right" style="color:#ccc;"></i>' +
        '</div>' +
        '</div>' +
        
        // BOTÕES DE AÇÃO
        '<div style="padding:0 15px;">' +
        '<button onclick="window.app.abrirEditarPerfil()" style="width:100%;background:#f59e0b;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px;">' +
        '<i class="fas fa-edit"></i> Editar Perfil</button>' +
        
        '<button onclick="window.app.gerarQRCodeCompartilhar()" style="width:100%;background:#1A3A5C;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px;">' +
        '<i class="fas fa-qrcode"></i> Compartilhar Perfil (QR Code)</button>' +
        
        '<button onclick="window.app.mostrarTela(\'configScreen\')" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px;">' +
        '<i class="fas fa-cog"></i> Configurações</button>' +
        '</div>';
};

// ===== 2. MAPA DE LOCALIZAÇÃO =====
App.prototype.abrirMapaLocalizacao = function() {
    var s = this;
    if (!s.usuarioLogado) return;
    
    var user = s.usuarioLogado;
    
    var html = '<div id="modalLocalizacao" style="position:fixed;top:0;left:0;right:0;bottom:0;background:white;z-index:9999;overflow-y:auto;">';
    
    // Cabeçalho
    html += '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;">';
    html += '<button onclick="document.getElementById(\'modalLocalizacao\').remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;font-size:16px;">⬅ Voltar</button>';
    html += '<h2 style="margin:0;font-size:18px;">📍 Minha Localização</h2>';
    html += '</div>';
    
    html += '<div style="padding:20px;">';
    
    // ESTADO
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">🗺️ Estado</label>';
    html += '<select id="locEstado" onchange="window.app.atualizarCidades()" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;font-size:14px;">';
    html += '<option value="">Selecione o estado...</option>';
    html += s.getEstadosHTML(user.localizacao ? user.localizacao.estado : '');
    html += '</select>';
    html += '</div>';
    
    // CIDADE
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">🏙️ Cidade</label>';
    html += '<select id="locCidade" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;font-size:14px;">';
    html += '<option value="">Selecione a cidade...</option>';
    html += '</select>';
    html += '</div>';
    
    // BAIRRO
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">📍 Bairro</label>';
    html += '<input id="locBairro" type="text" placeholder="Digite seu bairro" value="' + (user.localizacao ? user.localizacao.bairro || '' : '') + '" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;font-size:14px;">';
    html += '</div>';
    
    // MAPA
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">🗺️ Confirmar no Mapa</label>';
    html += '<div id="mapaLocalizacao" style="width:100%;height:250px;border-radius:12px;background:#e5e7eb;"></div>';
    html += '<p style="text-align:center;font-size:11px;color:#999;margin-top:5px;">Arraste o marcador para ajustar a localização</p>';
    html += '</div>';
    
    // BOTÃO SALVAR
    html += '<button onclick="window.app.salvarLocalizacao()" style="width:100%;background:#10B981;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">💾 SALVAR LOCALIZAÇÃO</button>';
    
    html += '</div></div>';
    
    var antigo = document.getElementById('modalLocalizacao');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Inicializar mapa
    setTimeout(function() {
        s.inicializarMapaLocalizacao();
        
        // Se já tem estado salvo, carregar cidades
        if (user.localizacao && user.localizacao.estado) {
            window.app.atualizarCidades(user.localizacao.cidade);
        }
    }, 500);
};

// ===== GET ESTADOS HTML =====
App.prototype.getEstadosHTML = function(estadoSelecionado) {
    var estados = [
        'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
        'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
    ];
    
    var nomesEstados = {
        'AC':'Acre','AL':'Alagoas','AP':'Amapá','AM':'Amazonas','BA':'Bahia',
        'CE':'Ceará','DF':'Distrito Federal','ES':'Espírito Santo','GO':'Goiás',
        'MA':'Maranhão','MT':'Mato Grosso','MS':'Mato Grosso do Sul','MG':'Minas Gerais',
        'PA':'Pará','PB':'Paraíba','PR':'Paraná','PE':'Pernambuco','PI':'Piauí',
        'RJ':'Rio de Janeiro','RN':'Rio Grande do Norte','RS':'Rio Grande do Sul',
        'RO':'Rondônia','RR':'Roraima','SC':'Santa Catarina','SP':'São Paulo',
        'SE':'Sergipe','TO':'Tocantins'
    };
    
    var html = '';
    for (var i = 0; i < estados.length; i++) {
        var sigla = estados[i];
        var nome = nomesEstados[sigla];
        var selected = estadoSelecionado === sigla ? ' selected' : '';
        html += '<option value="' + sigla + '"' + selected + '>' + nome + ' (' + sigla + ')</option>';
    }
    return html;
};

// ===== ATUALIZAR CIDADES =====
window.app.atualizarCidades = function(cidadeSelecionada) {
    var estadoEl = document.getElementById('locEstado');
    var cidadeEl = document.getElementById('locCidade');
    if (!estadoEl || !cidadeEl) return;
    
    var estado = estadoEl.value;
    
    // Principais cidades por estado
    var cidades = {
        'SP': ['São Paulo','Campinas','Santos','São Bernardo do Campo','Guarulhos','Ribeirão Preto','Sorocaba','São José dos Campos'],
        'RJ': ['Rio de Janeiro','Niterói','Duque de Caxias','Nova Iguaçu','Campos dos Goytacazes','Petrópolis'],
        'MG': ['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Betim','Montes Claros'],
        'BA': ['Salvador','Feira de Santana','Vitória da Conquista','Camaçari','Itabuna'],
        'PR': ['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel','Foz do Iguaçu'],
        'RS': ['Porto Alegre','Caxias do Sul','Pelotas','Canoas','Santa Maria','Gravataí'],
        'PE': ['Recife','Jaboatão dos Guararapes','Olinda','Caruaru','Paulista'],
        'CE': ['Fortaleza','Caucaia','Juazeiro do Norte','Maracanaú','Sobral'],
        'SC': ['Florianópolis','Joinville','Blumenau','São José','Chapecó'],
        'GO': ['Goiânia','Aparecida de Goiânia','Anápolis','Rio Verde','Luziânia'],
        'DF': ['Brasília'],
        'ES': ['Vitória','Vila Velha','Serra','Cariacica'],
        'PA': ['Belém','Ananindeua','Santarém','Marabá'],
        'MA': ['São Luís','Imperatriz','São José de Ribamar','Timon'],
        'MT': ['Cuiabá','Várzea Grande','Rondonópolis','Sinop'],
        'MS': ['Campo Grande','Dourados','Três Lagoas','Corumbá'],
        'PB': ['João Pessoa','Campina Grande','Santa Rita','Patos'],
        'RN': ['Natal','Mossoró','Parnamirim','São Gonçalo do Amarante'],
        'AL': ['Maceió','Arapiraca','Rio Largo','Palmeira dos Índios'],
        'PI': ['Teresina','Parnaíba','Picos','Piripiri'],
        'SE': ['Aracaju','Nossa Senhora do Socorro','Lagarto','Itabaiana'],
        'AM': ['Manaus','Parintins','Itacoatiara','Manacapuru'],
        'RO': ['Porto Velho','Ji-Paraná','Ariquemes','Cacoal'],
        'TO': ['Palmas','Araguaína','Gurupi','Porto Nacional'],
        'AC': ['Rio Branco','Cruzeiro do Sul','Sena Madureira','Tarauacá'],
        'AP': ['Macapá','Santana','Laranjal do Jari','Oiapoque'],
        'RR': ['Boa Vista','Rorainópolis','Caracaraí','Pacaraima']
    };
    
    cidadeEl.innerHTML = '<option value="">Selecione a cidade...</option>';
    
    if (estado && cidades[estado]) {
        for (var i = 0; i < cidades[estado].length; i++) {
            var selected = cidadeSelecionada === cidades[estado][i] ? ' selected' : '';
            cidadeEl.innerHTML += '<option value="' + cidades[estado][i] + '"' + selected + '>' + cidades[estado][i] + '</option>';
        }
    }
};

// ===== INICIALIZAR MAPA =====
App.prototype.inicializarMapaLocalizacao = function() {
    var s = this;
    var mapDiv = document.getElementById('mapaLocalizacao');
    if (!mapDiv) return;
    
    var user = s.usuarioLogado;
    var lat = -23.5505; // São Paulo como padrão
    var lng = -46.6333;
    
    // Usar localização salva ou geolocalização do navegador
    if (user.localizacao && user.localizacao.lat) {
        lat = user.localizacao.lat;
        lng = user.localizacao.lng;
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var map = new google.maps.Map(mapDiv, {
                center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                zoom: 15,
                mapTypeControl: false
            });
            new google.maps.Marker({
                position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                map: map,
                draggable: true,
                title: 'Sua localização'
            });
            window.app._mapaMarcador = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        }, function() {
            s.mostrarMapaPadrao(mapDiv, lat, lng);
        });
        return;
    }
    
    s.mostrarMapaPadrao(mapDiv, lat, lng);
};

App.prototype.mostrarMapaPadrao = function(mapDiv, lat, lng) {
    if (typeof google === 'undefined') {
        mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f9ff;border-radius:12px;text-align:center;color:#666;">🗺️ Mapa não disponível</div>';
        return;
    }
    
    var map = new google.maps.Map(mapDiv, {
        center: { lat: lat, lng: lng },
        zoom: 15,
        mapTypeControl: false
    });
    
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        draggable: true,
        title: 'Arraste para ajustar'
    });
    
    google.maps.event.addListener(marker, 'dragend', function() {
        var pos = marker.getPosition();
        window.app._mapaMarcador = { lat: pos.lat(), lng: pos.lng() };
    });
    
    window.app._mapaMarcador = { lat: lat, lng: lng };
};

// ===== SALVAR LOCALIZAÇÃO =====
window.app.salvarLocalizacao = function() {
    var s = window.app._app;
    if (!s || !s.usuarioLogado) return;
    
    var estado = document.getElementById('locEstado')?.value || '';
    var cidade = document.getElementById('locCidade')?.value || '';
    var bairro = document.getElementById('locBairro')?.value?.trim() || '';
    
    if (!estado) { s.mostrarToast('❌ Selecione o estado!', 'erro'); return; }
    if (!cidade) { s.mostrarToast('❌ Selecione a cidade!', 'erro'); return; }
    
    var localizacao = {
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        lat: window.app._mapaMarcador ? window.app._mapaMarcador.lat : -23.5505,
        lng: window.app._mapaMarcador ? window.app._mapaMarcador.lng : -46.6333,
        dataAtualizacao: new Date().toISOString()
    };
    
    s.usuarioLogado.localizacao = localizacao;
    localStorage.setItem('usuarioLPX', JSON.stringify(s.usuarioLogado));
    
    // Atualizar no banco
    if (typeof databaseService !== 'undefined') {
        databaseService.atualizarUsuario(s.usuarioLogado.id, { localizacao: localizacao }).then(function() {
            console.log('✅ Localização salva no banco');
        });
    }
    
    // Atualizar lista de usuários no localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === s.usuarioLogado.id) {
            usuarios[i].localizacao = localizacao;
            localStorage.setItem('usuariosLPX', JSON.stringify(usuarios));
            break;
        }
    }
    
    document.getElementById('modalLocalizacao')?.remove();
    s.mostrarToast('✅ Localização salva!', 'sucesso');
    s.carregarMeuPerfil();
};

// ===== 3. TELA DE CONFIGURAÇÕES =====
App.prototype.carregarConfigScreen = function() {
    var s = this;
    var tela = document.getElementById('configScreen');
    if (!tela) {
        tela = document.createElement('div');
        tela.id = 'configScreen';
        tela.className = 'screen';
        document.body.appendChild(tela);
    }
    
    tela.innerHTML = 
        '<div style="background:linear-gradient(135deg,#1A3A5C,#2d5a7b);color:white;padding:20px;display:flex;align-items:center;gap:15px;">' +
        '<button onclick="window.app.voltarTela()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:8px 15px;border-radius:8px;cursor:pointer;">⬅</button>' +
        '<h2 style="margin:0;font-size:18px;">⚙️ Configurações</h2></div>' +
        
        '<div style="padding:15px;">' +
        
        // TEMA
        '<div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#1A3A5C;margin-bottom:12px;">🎨 Tema</h3>' +
        '<div style="display:flex;gap:10px;">' +
        '<button onclick="window.app.selecionarTema(\'claro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'claro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'claro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'claro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">☀️ Claro</button>' +
        '<button onclick="window.app.selecionarTema(\'escuro\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.temaAtual === 'escuro' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.temaAtual === 'escuro' ? '#1A3A5C' : 'white') + ';color:' + (s.temaAtual === 'escuro' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🌙 Escuro</button>' +
        '</div></div>' +
        
        // IDIOMA
        '<div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#1A3A5C;margin-bottom:12px;">🌐 Idioma</h3>' +
        '<div style="display:flex;gap:10px;">' +
        '<button onclick="window.app.selecionarIdioma(\'pt\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'pt' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'pt' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇧🇷 PT</button>' +
        '<button onclick="window.app.selecionarIdioma(\'en\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'en' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'en' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'en' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇺🇸 EN</button>' +
        '<button onclick="window.app.selecionarIdioma(\'es\')" style="flex:1;padding:12px;border-radius:8px;border:2px solid ' + (s.idiomaAtual === 'es' ? '#1A3A5C' : '#e5e7eb') + ';background:' + (s.idiomaAtual === 'es' ? '#1A3A5C' : 'white') + ';color:' + (s.idiomaAtual === 'es' ? 'white' : '#1A3A5C') + ';cursor:pointer;font-weight:bold;">🇪🇸 ES</button>' +
        '</div></div>' +
        
        // DOCUMENTOS
        '<div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#1A3A5C;margin-bottom:12px;">📄 Documentos</h3>' +
        '<button onclick="window.app.mostrarDocumento(\'termos\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📄 Termos de Uso <span style="float:right;color:#ccc;">›</span></button>' +
        '<button onclick="window.app.mostrarDocumento(\'privacidade\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">🔒 Política de Privacidade <span style="float:right;color:#ccc;">›</span></button>' +
        '<button onclick="window.app.mostrarDocumento(\'diretrizes\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;margin-bottom:5px;cursor:pointer;">📋 Diretrizes <span style="float:right;color:#ccc;">›</span></button>' +
        '<button onclick="window.app.mostrarDocumento(\'sobre\')" style="display:block;width:100%;text-align:left;padding:12px;background:#f9fafb;border:none;border-radius:8px;cursor:pointer;">ℹ️ Sobre <span style="float:right;color:#ccc;">›</span></button>' +
        '</div>' +
        
        // VERSÃO
        '<div style="background:white;border-radius:12px;padding:15px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#1A3A5C;margin-bottom:12px;">📱 Versão</h3>' +
        '<div style="text-align:center;padding:10px;">🏗️ LPXConstrutor v1.0.0</div>' +
        '</div>' +
        
        // EXCLUIR CONTA (COM SEGURANÇA)
        '<div style="background:white;border-radius:12px;padding:15px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
        '<h3 style="color:#EF4444;margin-bottom:12px;">⚠️ Zona de Perigo</h3>' +
        '<p style="color:#666;font-size:13px;margin-bottom:10px;">Ao excluir sua conta, todos os seus dados serão permanentemente removidos.</p>' +
        '<button onclick="window.app.confirmarExcluirConta()" style="width:100%;background:#EF4444;color:white;border:none;padding:14px;border-radius:10px;font-weight:bold;cursor:pointer;">🗑️ EXCLUIR MINHA CONTA</button>' +
        '</div>' +
        
        '</div>';
    
    s.mostrarTela('configScreen');
};

// ===== 4. EXCLUIR CONTA COM SEGURANÇA =====
window.app.confirmarExcluirConta = function() {
    var s = window.app._app;
    if (!s || !s.usuarioLogado) return;
    
    // Modal de confirmação com dupla verificação
    var html = '<div id="modalExcluir" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)document.getElementById(\'modalExcluir\').remove()">';
    html += '<div style="background:white;border-radius:20px;padding:30px;max-width:400px;width:100%;text-align:center;" onclick="event.stopPropagation()">';
    
    // Ícone de aviso
    html += '<div style="font-size:60px;margin-bottom:15px;">⚠️</div>';
    html += '<h3 style="color:#EF4444;margin-bottom:10px;">Excluir Conta</h3>';
    html += '<p style="color:#666;font-size:14px;margin-bottom:5px;">Esta ação é <b>IRREVERSÍVEL</b>!</p>';
    html += '<p style="color:#666;font-size:13px;margin-bottom:20px;">Todos os seus dados, obras, conexões e mensagens serão permanentemente excluídos.</p>';
    
    // ETAPA 1: Digitar "EXCLUIR"
    html += '<div style="margin-bottom:15px;text-align:left;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">Digite <span style="color:#EF4444;">EXCLUIR</span> para confirmar:</label>';
    html += '<input id="confirmExcluir" type="text" placeholder="Digite EXCLUIR" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;text-align:center;font-weight:bold;letter-spacing:2px;box-sizing:border-box;">';
    html += '</div>';
    
    // ETAPA 2: Digitar a senha
    html += '<div style="margin-bottom:15px;text-align:left;">';
    html += '<label style="font-weight:bold;color:#1A3A5C;display:block;margin-bottom:5px;">Digite sua <span style="color:#EF4444;">senha</span>:</label>';
    html += '<input id="confirmSenha" type="password" placeholder="Sua senha atual" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">';
    html += '</div>';
    
    html += '<button id="btnExcluirConta" onclick="window.app.executarExcluirConta()" disabled style="width:100%;background:#EF4444;color:white;border:none;padding:15px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;opacity:0.5;">🗑️ EXCLUIR PERMANENTEMENTE</button>';
    
    html += '<button onclick="document.getElementById(\'modalExcluir\').remove()" style="width:100%;background:#e5e7eb;color:#1A3A5C;border:none;padding:12px;border-radius:10px;margin-top:10px;cursor:pointer;font-weight:bold;">CANCELAR</button>';
    
    html += '</div></div>';
    
    var antigo = document.getElementById('modalExcluir');
    if (antigo) antigo.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Habilitar botão apenas quando as duas condições forem atendidas
    setTimeout(function() {
        var inputTexto = document.getElementById('confirmExcluir');
        var inputSenha = document.getElementById('confirmSenha');
        var btnExcluir = document.getElementById('btnExcluirConta');
        
        function verificar() {
            if (inputTexto.value === 'EXCLUIR' && inputSenha.value.length >= 3) {
                btnExcluir.disabled = false;
                btnExcluir.style.opacity = '1';
                btnExcluir.style.background = '#EF4444';
            } else {
                btnExcluir.disabled = true;
                btnExcluir.style.opacity = '0.5';
            }
        }
        
        inputTexto.addEventListener('input', verificar);
        inputSenha.addEventListener('input', verificar);
    }, 300);
};

// ===== EXECUTAR EXCLUSÃO =====
window.app.executarExcluirConta = function() {
    var s = window.app._app;
    if (!s || !s.usuarioLogado) return;
    
    var senhaDigitada = document.getElementById('confirmSenha')?.value || '';
    
    // Verificar senha
    if (senhaDigitada !== s.usuarioLogado.senha) {
        s.mostrarToast('❌ Senha incorreta!', 'erro');
        return;
    }
    
    s.mostrarToast('🗑️ Excluindo conta...', 'info');
    
    // Remover do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuariosLPX') || '[]');
    var novas = [];
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id !== s.usuarioLogado.id) {
            novas.push(usuarios[i]);
        }
    }
    localStorage.setItem('usuariosLPX', JSON.stringify(novas));
    
    // Excluir do Firebase
    if (typeof db !== 'undefined') {
        db.collection('usuarios').doc(s.usuarioLogado.id).delete().catch(function(){});
    }
    
    // Limpar dados do usuário
    localStorage.removeItem('usuarioLPX');
    s.usuarioLogado = null;
    s.historicoTelas = [];
    
    document.getElementById('modalExcluir')?.remove();
    
    s.mostrarToast('✅ Conta excluída com sucesso', 'sucesso');
    
    setTimeout(function() {
        s.mostrarTela('loginScreen');
    }, 1500);
};

// ===== ADICIONAR ROTA PARA TELA DE CONFIGURAÇÕES =====
// No método mostrarTela, adicione:
// if (id === 'configScreen') s.carregarConfigScreen();
