// ==========================================================
// ===== MAPA COM BONECO DE CAPACETE COLORIDO =====
// ==========================================================

var MapaService = function() {
    this.map = null;
    this.userPosition = null;
    this.markers = [];
};

MapaService.prototype.initMap = function() {
    var self = this;
    var el = document.getElementById('map');
    if (!el) return;
    el.style.height = '300px';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            self.userPosition = { lat: p.coords.latitude, lng: p.coords.longitude };
            self.criarMapa(el);
        }, function() {
            self.userPosition = { lat: -23.5505, lng: -46.6333 };
            self.criarMapa(el);
        });
    } else {
        self.userPosition = { lat: -23.5505, lng: -46.6333 };
        self.criarMapa(el);
    }
};

// COR DO CAPACETE POR PROFISSÃO
MapaService.prototype.getCorProfissao = function(profissao) {
    var cores = {
        'empreiteiro': '#FFFFFF',   // Branco
        'servente': '#EF4444',      // Vermelho
        'pedreiro': '#3B82F6',      // Azul
        'carpinteiro': '#3B82F6',   // Azul
        'armador': '#3B82F6',       // Azul
        'encanador': '#3B82F6',     // Azul
        'eletricista': '#3B82F6',   // Azul
        'pintor': '#3B82F6',        // Azul
        'gesseiro': '#3B82F6',      // Azul
        'azulejista': '#3B82F6',    // Azul
        'soldador': '#3B82F6'       // Azul
    };
    return cores[profissao] || '#3B82F6';
};

// COR DA BORDA DO CAPACETE
MapaService.prototype.getCorBorda = function(profissao) {
    if (profissao === 'empreiteiro') return '#1A3A5C';
    if (profissao === 'servente') return '#991B1B';
    return '#1E40AF';
};

// NOME DA PROFISSÃO FORMATADO
MapaService.prototype.getNomeProfissao = function(profissao) {
    var nomes = {
        'pedreiro': '👷 Pedreiro',
        'servente': '🧹 Servente',
        'carpinteiro': '🪚 Carpinteiro',
        'armador': '🔩 Armador',
        'encanador': '🔧 Encanador',
        'eletricista': '⚡ Eletricista',
        'pintor': '🎨 Pintor',
        'gesseiro': '🏗️ Gesseiro',
        'azulejista': '🧱 Azulejista',
        'soldador': '🔥 Soldador',
        'empreiteiro': '🏢 Empreiteiro'
    };
    return nomes[profissao] || '👷 Profissional';
};

// CRIA ÍCONE SVG DO BONECO COM CAPACETE
MapaService.prototype.criarIconeUsuario = function(profissao) {
    var cor = this.getCorProfissao(profissao);
    var borda = this.getCorBorda(profissao);
    
    // Se for empreiteiro (branco), usar cor escura no corpo
    var corCorpo = profissao === 'empreiteiro' ? '#1A3A5C' : cor;
    
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">' +
        // Sombra
        '<ellipse cx="20" cy="39" rx="9" ry="1.5" fill="rgba(0,0,0,0.2)"/>' +
        // Corpo
        '<circle cx="20" cy="22" r="8" fill="' + corCorpo + '" stroke="white" stroke-width="1.5"/>' +
        // Cabeça
        '<circle cx="20" cy="13" r="6" fill="#FFDAB9" stroke="white" stroke-width="1"/>' +
        // Capacete
        '<ellipse cx="20" cy="8" rx="9" ry="6" fill="' + cor + '" stroke="' + borda + '" stroke-width="2"/>' +
        '<rect x="11" y="6" width="18" height="3" rx="1" fill="' + cor + '" stroke="' + borda + '" stroke-width="1"/>' +
        // Olhos
        '<circle cx="18" cy="13" r="1.5" fill="#333"/>' +
        '<circle cx="22" cy="13" r="1.5" fill="#333"/>' +
        // Sorriso
        '<path d="M17 16 Q20 19 23 16" fill="none" stroke="#333" stroke-width="1"/>' +
        // Braços
        '<line x1="12" y1="22" x2="5" y2="18" stroke="' + corCorpo + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '<line x1="28" y1="22" x2="35" y2="18" stroke="' + corCorpo + '" stroke-width="2.5" stroke-linecap="round"/>' +
        // Pernas
        '<line x1="17" y1="30" x2="14" y2="38" stroke="' + corCorpo + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '<line x1="23" y1="30" x2="26" y2="38" stroke="' + corCorpo + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '</svg>';
    
    return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(25, 40)
    };
};

// ÍCONE DE OBRA (PRÉDIO)
MapaService.prototype.criarIconeObra = function() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">' +
        '<rect x="5" y="5" width="30" height="33" fill="#1A3A5C" stroke="#F47920" stroke-width="2" rx="2"/>' +
        '<rect x="10" y="12" width="7" height="7" fill="#F47920" rx="1"/>' +
        '<rect x="23" y="12" width="7" height="7" fill="#F47920" rx="1"/>' +
        '<rect x="10" y="24" width="7" height="7" fill="#F47920" rx="1"/>' +
        '<rect x="23" y="24" width="7" height="7" fill="#F47920" rx="1"/>' +
        '<rect x="17" y="31" width="6" height="7" fill="#2C5F8A" rx="1"/>' +
        '</svg>';
    
    return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(45, 45),
        anchor: new google.maps.Point(22, 40)
    };
};

MapaService.prototype.criarMapa = function(el) {
    var self = this;
    this.map = new google.maps.Map(el, { 
        center: self.userPosition, 
        zoom: 14, 
        mapTypeControl: false, 
        streetViewControl: false,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
    });
    
    var app = window.app._app;
    var profissaoUsuario = app && app.usuarioLogado ? (app.usuarioLogado.profissao || 'profissional') : 'profissional';
    var tipoUsuario = app && app.usuarioLogado ? app.usuarioLogado.tipo : 'profissional';
    var nomeUsuario = app && app.usuarioLogado ? app.usuarioLogado.nome : 'Você';
    
    // Se for empreiteiro, usa 'empreiteiro' como profissão para cor branca
    var profMapa = tipoUsuario === 'empreiteiro' ? 'empreiteiro' : profissaoUsuario;
    
    // Marcador do usuário (boneco com capacete colorido)
    new google.maps.Marker({
        position: self.userPosition,
        map: self.map,
        icon: self.criarIconeUsuario(profMapa),
        title: nomeUsuario + ' - ' + self.getNomeProfissao(profMapa),
        zIndex: 1000,
        animation: google.maps.Animation.DROP
    });
    
    // Carrega obras
    self.carregarObras();
    
    // Contador de obras
    var contadorDiv = document.createElement('div');
    contadorDiv.style.cssText = 'background:white;padding:6px 10px;border-radius:20px;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:11px;font-weight:600;position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:1;white-space:nowrap;';
    contadorDiv.id = 'contadorObras';
    el.style.position = 'relative';
    el.appendChild(contadorDiv);
};

MapaService.prototype.carregarObras = function() {
    var self = this;
    this.markers.forEach(function(m) { m.setMap(null); });
    this.markers = [];
    
    db.collection('vagas').where('ativa', '==', true).get().then(function(snap) {
        var obras = [];
        snap.forEach(function(doc) { var d = doc.data(); if (d.lat && d.lng) obras.push({ id: doc.id, data: d }); });
        
        // Atualiza contador
        var contador = document.getElementById('contadorObras');
        if (contador) contador.textContent = '🏗️ ' + obras.length + ' obra(s) no mapa';
        
        obras.forEach(function(obra) {
            db.collection('usuarios').doc(obra.data.usuarioId).get().then(function(userDoc) {
                var autor = userDoc.exists ? userDoc.data() : { nome: 'Empreiteiro', fotoPerfil: null };
                
                var infoContent = '<div style="width:220px;padding:8px;font-family:Inter,sans-serif;">' +
                    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
                        (autor.fotoPerfil ? '<img src="' + autor.fotoPerfil + '" style="width:30px;height:30px;border-radius:50%;object-fit:cover;">' : '<div style="width:30px;height:30px;border-radius:50%;background:#1A3A5C;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;">🏢</div>') +
                        '<div><strong style="font-size:12px;">' + autor.nome + '</strong><br><span style="font-size:10px;color:#666;">Empreiteiro</span></div>' +
                    '</div>' +
                    (obra.data.fotoObra ? '<img src="' + obra.data.fotoObra + '" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' : '') +
                    '<strong style="font-size:13px;">' + obra.data.titulo + '</strong><br>' +
                    '<span style="font-size:11px;">📍 ' + obra.data.endereco + '</span><br>' +
                    '<span style="font-size:11px;">💰 R$' + obra.data.valorHora + '/h | 👷 ' + (obra.data.profissoes || 'Todas') + '</span><br>' +
                    '<button onclick="window.app._app.verDetalheObra(\'' + obra.id + '\')" style="background:#F47920;color:white;border:none;padding:8px 12px;border-radius:8px;margin-top:8px;cursor:pointer;width:100%;font-weight:600;font-size:12px;">📋 VER DETALHES</button>' +
                    '</div>';
                
                var infoWindow = new google.maps.InfoWindow({ content: infoContent });
                
                var marker = new google.maps.Marker({
                    position: { lat: obra.data.lat, lng: obra.data.lng },
                    map: self.map,
                    icon: self.criarIconeObra(),
                    title: obra.data.titulo
                });
                
                marker.addListener('click', function() { infoWindow.open(self.map, marker); });
                self.markers.push(marker);
            });
        });
    });
};

var mapaService = new MapaService();
console.log('✅ MapaService carregado');
