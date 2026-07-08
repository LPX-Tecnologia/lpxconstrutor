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
                    (position) =>
