// ==========================================================
// ===== SISTEMA DE VÍDEOS (OPCIONAL) =====
// ==========================================================

class VideoService {
    constructor() {
        this.videos = [];
        this.currentIndex = 0;
    }

    initGallery() {
        const items = document.querySelectorAll('.thumbnail-item');
        this.videos = Array.from(items);
        this.currentIndex = 0;
        this.updateUI();
    }

    trocarVideo(videoId, element) {
        const player = document.getElementById('mainVideoPlayer');
        if (player) {
            player.src = `https://www.youtube.com/embed/${videoId}`;
        }

        document.querySelectorAll('.thumbnail-item').forEach(el => 
            el.classList.remove('active')
        );
        
        if (element) {
            element.classList.add('active');
            this.currentIndex = this.videos.indexOf(element);
            this.updateUI();
        }
    }

    navegar(direcao) {
        const total = this.videos.length;
        if (total === 0) return;
        
        this.currentIndex = (this.currentIndex + direcao + total) % total;
        const item = this.videos[this.currentIndex];
        
        if (item) {
            const videoId = item.dataset.videoId;
            this.trocarVideo(videoId, item);
        }
    }

    updateUI() {
        this.updateDots();
        this.updateNavButtons();
    }

    updateDots() {
        const container = document.getElementById('videoDots');
        if (!container) return;
        
        const total = this.videos.length;
        let html = '';
        for (let i = 0; i < total; i++) {
            html += `<span class="${i === this.currentIndex ? 'active' : ''}"></span>`;
        }
        container.innerHTML = html;
    }

    updateNavButtons() {
        const prev = document.getElementById('btnPrevVideo');
        const next = document.getElementById('btnNextVideo');
        const total = this.videos.length;
        
        if (prev) prev.disabled = total <= 1;
        if (next) next.disabled = total <= 1;
    }
}

// Instância global
const videoService = new VideoService();
