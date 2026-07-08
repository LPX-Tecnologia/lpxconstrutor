// ==========================================================
// ===== SISTEMA DE MAPA CORRIGIDO =====
// ==========================================================

var MapaService = function() {
    this.map = null;
    this.userPosition = null;
};

MapaService.prototype.initMap = function() {
    var self = this;
    var mapElement = document.getElementById('map');
    
    if (!mapElement) {
        console.log('❌ Elemento do mapa não encontrado');
        return;
    }
    
    // Garante altura mínima
    mapElement.style.height = '300px';
    mapElement.style.width = '100%';
    mapElement.style.backgroundColor = '#e5e7eb';
    
    console.log('📍 Inicializando mapa...');
    
    // Verifica se Google Maps está disponível
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('⚠️ Google Maps não carregou');
        mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;font-size:14px;">📍 Carregando mapa...</div>';
        
        // Tenta novamente em 1 segundo
        setTimeout(function() {
            self.initMap();
        }, 1000);
        return;
    }
    
    // Posição padrão (São Paulo)
    var defaultPosition = { lat: -23.5505, lng: -46.6333 };
    
    // Tenta obter localização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                self.userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                self.criarMapa(mapElement, self.userPosition);
            },
            function(error) {
                console.log('⚠️ Geolocalização indisponível, usando posição padrão');
                self.userPosition = defaultPosition;
                self.criarMapa(mapElement, self.userPosition);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        self.userPosition = defaultPosition;
        self.criarMapa(mapElement, self.userPosition);
    }
};

MapaService.prototype.criarMapa = function(element, position) {
    var self = this;
    
    console.log('🗺️ Criando mapa em:', position);
    
    try {
        this.map = new google.maps.Map(element, {
            center: position,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        
        // Marcador do usuário
        new google.maps.Marker({
            position: position,
            map: this.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#F47920',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
            },
            title: 'Você está aqui',
            animation: google.maps.Animation.DROP
        });
        
        console.log('✅ Mapa criado com sucesso!');
        
        // Força redimensionamento
        setTimeout(function() {
            google.maps.event.trigger(self.map, 'resize');
            self.map.setCenter(position);
        }, 500);
        
    } catch (error) {
        console.error('❌ Erro ao criar mapa:', error);
        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">📍 Erro ao carregar mapa</div>';
    }
};

// Instância global
var mapaService = new MapaService();

console.log('✅ MapaService carregado');
