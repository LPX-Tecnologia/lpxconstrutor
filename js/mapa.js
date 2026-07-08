// ==========================================================
// ===== SISTEMA DE MAPA COM GOOGLE MAPS =====
// ==========================================================

class MapaSystem {
    constructor() {
        this.map = null;
        this.markers = [];
        this.userPosition = null;
        this.infoWindows = [];
    }

    async initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Elemento do mapa não encontrado');
            return false;
        }

        try {
            // Obtém localização do usuário
            this.userPosition = await this.getUserLocation();
            
            // Cria o mapa
            this.map = new google.maps.Map(mapElement, {
                center: this.userPosition,
                zoom: 13,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ],
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            });

            // Adiciona marcador do usuário
            this.addUserMarker();
            
            // Carrega obras próximas
            await this.carregarObrasProximas();
            
            return true;
        } catch (error) {
            console.error('Erro ao inicializar mapa:', error);
            return false;
        }
    }

    getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.warn('Geolocalização indisponível:', error);
                        // Posição padrão (São Paulo)
                        resolve({ lat: -23.5505, lng: -46.6333 });
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                resolve({ lat: -23.5505, lng: -46.6333 });
            }
        });
    }

    addUserMarker() {
        if (!this.map || !this.userPosition) return;

        const userMarker = new google.maps.Marker({
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

        this.markers.push(userMarker);
    }

    async carregarObrasProximas() {
        if (!this.userPosition) return;

        // Limpa marcadores anteriores
        this.limparMarcadores();

        // Busca obras no banco
        const obras = await database.buscarObrasProximas(
            this.userPosition.lat,
            this.userPosition.lng,
            50
        );

        // Adiciona marcadores
        obras.forEach(obra => {
            this.addObraMarker(obra);
        });

        // Atualiza lista de obras próximas
        this.atualizarListaObras(obras);
    }

    addObraMarker(obra) {
        if (!this.map) return;

        const marker = new google.maps.Marker({
            position: { lat: obra.lat, lng: obra.lng },
            map: this.map,
            title: obra.nome,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="#1A3A5C" stroke="#F47920" stroke-width="2"/>
                        <text x="20" y="26" text-anchor="middle" fill="white" font-size="18">🏗️</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        // Cria info window
        const infoWindow = new google.maps.InfoWindow({
            content: this.criarInfoWindowContent(obra)
        });

        marker.addListener('click', () => {
            this.fecharInfoWindows();
            infoWindow.open(this.map, marker);
        });

        this.markers.push(marker);
        this.infoWindows.push(infoWindow);
    }

    criarInfoWindowContent(obra) {
        const distancia = database.formatarDistancia(obra.distancia || 0);
        
        return `
            <div style="padding:10px; max-width:250px;">
                <strong style="color:#1A3A5C; font-size:16px;">${obra.nome}</strong><br>
                <div style="margin-top:5px;">
                    📍 ${obra.endereco || 'Endereço não informado'}<br>
                    📏 ${distancia} de você<br>
                    💰 R$ ${obra.valorHora}/h<br>
                    <span style="color: #10B981;">🟢 Vaga disponível</span>
                </div>
                <button onclick="app.verDetalheObra('${obra.id}')" 
                        style="background:#F47920; color:white; border:none; padding:8px 16px; 
                               border-radius:8px; cursor:pointer; margin-top:10px; width:100%;">
                    Ver Detalhes
                </button>
            </div>
        `;
    }

    atualizarListaObras(obras) {
        const container = document.getElementById('obrasProximas');
        if (!container) return;

        if (obras.length === 0) {
            container.innerHTML = `
                <div style="flex:1; text-align:center; padding:20px; color:#6B7280; min-width:250px;">
                    <div style="font-size:40px;">🏗️</div>
                    <p style="margin-top:8px; font-weight:600;">Nenhuma obra próxima</p>
                    <p style="font-size:12px;">Publique uma obra para aparecer aqui!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = obras.map(obra => {
            const distancia = database.formatarDistancia(obra.distancia || 0);
            return `
                <div class="thumbnail-item-map" onclick="app.verDetalheObra('${obra.id}')">
                    <div class="thumb-icon">🏗️</div>
                    <div class="thumb-title">${obra.nome}</div>
                    <div class="thumb-detail">📍 ${distancia}</div>
                    <div class="thumb-status disponivel">🟢 Disponível</div>
                    <div class="thumb-price">R$ ${obra.valorHora}/h</div>
                </div>
            `;
        }).join('');
    }

    fecharInfoWindows() {
        this.infoWindows.forEach(iw => iw.close());
    }

    limparMarcadores() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
        this.infoWindows = [];
    }

    centralizarUsuario() {
        if (this.map && this.userPosition) {
            this.map.setCenter(this.userPosition);
            this.map.setZoom(15);
        }
    }
}

// Instância global
const mapaSystem = new MapaSystem();