// ==========================================================
// ===== MAPA COM ÍCONES COLORIDOS POR PROFISSÃO =====
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

MapaService.prototype.getCorProfissao = function(profissao) {
    var cores = {
        'pedreiro': '#F47920',
        'servente': '#8B4513',
        'carpinteiro': '#D2691E',
        'armador': '#696969',
        'encanador': '#1E90FF',
        'eletricista': '#FFD700',
        'pintor': '#FF69B4',
        'gesseiro': '#00CED1',
        'azulejista': '#9370DB',
        'soldador': '#DC143C',
        'empreiteiro': '#1A3A5C'
    };
    return cores[profissao] || '#666666';
};

MapaService.prototype.criarIconeUsuario = function(profissao) {
    var cor = this.getCorProfissao(profissao);
    return {
        path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
        fillColor: cor,
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 1.5,
        anchor: new google.maps.Point(12, 12)
    };
};

MapaService.prototype.criarIconeObra = function() {
    return {
        path: 'M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z',
        fillColor: '#1A3A5C',
        fillOpacity: 1,
        strokeColor: '#F47920',
        strokeWeight: 2,
        scale: 1.2,
        anchor: new google.maps.Point(12, 12)
    };
};

MapaService.prototype.criarMapa = function(el) {
    var self = this;
    this.map = new google.maps.Map(el, { center: self.userPosition, zoom: 14, mapTypeControl: false, streetViewControl: false });
    
    // Busca usuário logado
    var app = window.app._app;
    var profissaoUsuario = app && app.usuarioLogado ? (app.usuarioLogado.profissao || 'profissional') : 'profissional';
    
    // Marcador do usuário (boneco colorido)
    new google.maps.Marker({
        position: self.userPosition,
        map: self.map,
        icon: self.criarIconeUsuario(profissaoUsuario),
        title: 'Você está aqui',
        zIndex: 1000
    });
    
    // Carrega obras
    self.carregarObras();
    
    // Contador de obras
    var contadorDiv = document.createElement('div');
    contadorDiv.style.cssText = 'background:white;padding:8px 12px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:12px;font-weight:600;margin:10px;position:absolute;top:0;right:0;z-index:1;';
    contadorDiv.id = 'contadorObras';
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
        if (contador) contador.textContent = '🏗️ ' + obras.length + ' obras no mapa';
        
        obras.forEach(function(obra) {
            var infoContent = '<div style="width:200px;padding:8px;">' +
                (obra.data.fotoObra ? '<img src="' + obra.data.fotoObra + '" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;">' : '') +
                '<strong>' + obra.data.titulo + '</strong><br>' +
                '📍 ' + obra.data.endereco + '<br>' +
                '💰 R$' + obra.data.valorHora + '/h<br>' +
                '<button onclick="window.app._app.verDetalheObra(\'' + obra.id + '\')" style="background:#F47920;color:white;border:none;padding:6px 12px;border-radius:6px;margin-top:6px;cursor:pointer;width:100%;">Ver Detalhes</button>' +
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
};

var mapaService = new MapaService();
console.log('✅ MapaService carregado');
