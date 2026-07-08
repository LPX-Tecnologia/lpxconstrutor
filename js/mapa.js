// ==========================================================
// ===== SISTEMA DE MAPA =====
// ==========================================================

class MapaService {
    constructor() {
        this.map = null;
        this.markers = [];
        this.userPosition = null;
    }

    async initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        try {
            // Obtém localização
            this.userPosition = await this.getUserLocation();
            
            // Cria mapa
            this.map = new google.maps.Map(mapElement, {
                center: this.userPosition,
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            // Marcador do usuário
            this.addUserMarker();
            
            // Carrega obras
            await this.carregarObras();

        } catch (error) {
            console.error('Erro ao iniciar mapa:', error);
            mapElement.innerHTML = `
                <div style="padding:20px;text-align:center;color:#666;">
                    📍 Ative sua localização para ver obras próximas
                </div>
            `;
        }
    }

    getUserLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    () => {
                        // São Paulo como fallback
                        resolve({ lat: -23.5505, lng: -46.6333 });
                    },
                    { timeout: 5000 }
                );
            } else {
                resolve({ lat: -23.5505, lng: -46.6333 });
            }
        });
    }

    addUserMarker() {
        if (!this.map || !this.userPosition) return;

        new google.maps.Marker({
            position: this.userPosition,
            map: this.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#F47920',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
            },
            title: 'Você está aqui',
            zIndex: 1000
        });
    }

    async carregarObras() {
        if (!this.map) return;

        // Limpa marcadores antigos
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];

        const obras = await databaseService.buscarObras();

        obras.forEach(obra => {
            if (obra.lat && obra.lng) {
                const marker = new google.maps.Marker({
                    position: { lat: obra.lat, lng: obra.lng },
                    map: this.map,
                    title: obra.nome,
                    label: {
                        text: '🏗️',
                        fontSize: '20px'
                    }
                });

                this.markers.push(marker);
            }
        });
    }
}

// Instância global
const mapaService = new MapaService();
