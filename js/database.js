// ===== FUNÇÃO DE BUSCA CORRIGIDA =====
async buscarProfissionais() {
    const termo = document.getElementById('buscaInput')?.value?.toLowerCase().trim() || '';
    const container = document.getElementById('buscaResultados');
    if (!container) return;

    console.log('🔍 Buscando por:', termo || 'todos');
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando profissionais...</div>';

    try {
        // Busca TODOS os profissionais do banco
        const todos = await databaseService.buscarProfissionais();
        
        console.log(`📊 Total de profissionais no banco: ${todos.length}`);
        
        // Se não tem termo de busca, mostra todos
        let filtrados = todos;
        
        if (termo) {
            filtrados = todos.filter(u => {
                const nome = (u.nome || '').toLowerCase();
                const profissao = (u.profissao || '').toLowerCase();
                const habilidades = (u.habilidades || '').toLowerCase();
                
                return nome.includes(termo) || 
                       profissao.includes(termo) || 
                       habilidades.includes(termo);
            });
        }
        
        console.log(`✅ Encontrados: ${filtrados.length} profissionais`);

        if (filtrados.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center; padding:40px;">
                    <i class="fas fa-search" style="font-size:60px; color:#ccc;"></i>
                    <h3 style="margin-top:16px; color:#1A3A5C;">Nenhum profissional encontrado</h3>
                    <p style="color:#999; margin-top:8px;">
                        ${termo ? `Ninguém encontrado para "${termo}"` : 'Nenhum profissional cadastrado ainda'}
                    </p>
                    <button class="btn btn-outline btn-small" onclick="document.getElementById('buscaInput').value=''; app.buscarProfissionais();" style="margin-top:16px;">
                        <i class="fas fa-redo"></i> Mostrar todos
                    </button>
                </div>
            `;
            return;
        }

        // Exibe os resultados
        container.innerHTML = filtrados.map(u => {
            const whatsapp = u.celular?.replace(/\D/g, '');
            const score = u.score || 0;
            const estrelas = '⭐'.repeat(Math.round(score));
            
            return `
                <div class="vaga-card" style="cursor:pointer;" onclick="app.verPerfil('${u.id}')">
                    <div class="vaga-header">
                        <div class="vaga-avatar" style="background: ${u.fotoPerfil ? 'white' : 'linear-gradient(135deg, #F47920, #E06B1A)'};">
                            ${u.fotoPerfil ? 
                                `<img src="${u.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` :
                                '<i class="fas fa-hard-hat"></i>'
                            }
                        </div>
                        <div class="vaga-info">
                            <div class="vaga-nome">${u.nome}</div>
                            <div class="vaga-data">
                                <i class="fas fa-tools"></i> ${u.profissao || 'Profissional'} • 
                                <i class="fas fa-calendar"></i> ${u.experiencia || 0} anos
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div class="stars-container" style="font-size:14px;">
                                ${estrelas || '☆'}
                            </div>
                            <div style="font-size:11px; color:#999;">
                                ${score > 0 ? score.toFixed(1) : 'Novo'}
                            </div>
                        </div>
                    </div>
                    
                    ${u.habilidades ? `
                        <div class="vaga-body">
                            <div class="vaga-tags">
                                ${u.habilidades.split(',').slice(0, 3).map(h => 
                                    `<span class="vaga-tag">${h.trim()}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="vaga-footer">
                        ${whatsapp ? `
                            <a href="https://wa.me/55${whatsapp}?text=${encodeURIComponent('Olá ' + u.nome.split(' ')[0] + '! Vi seu perfil no LPXConstrutor.')}" 
                               target="_blank" 
                               class="btn btn-success btn-small" 
                               style="flex:1; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;"
                               onclick="event.stopPropagation();">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        ` : ''}
                        <button class="btn btn-primary btn-small" 
                                onclick="event.stopPropagation(); app.iniciarChat('${u.id}')" 
                                style="flex:1;">
                            <i class="fas fa-comments"></i> Chat
                        </button>
                        <button class="btn btn-outline btn-small" 
                                onclick="event.stopPropagation(); app.verPerfil('${u.id}')">
                            <i class="fas fa-user"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Mostra contador
        const countDiv = document.createElement('div');
        countDiv.style.cssText = 'text-align:center; padding:8px; color:#666; font-size:12px; margin-bottom:8px;';
        countDiv.textContent = `Mostrando ${filtrados.length} profissional(is)`;
        container.insertBefore(countDiv, container.firstChild);

    } catch (error) {
        console.error('❌ Erro na busca:', error);
        container.innerHTML = `
            <div class="card" style="text-align:center;">
                <i class="fas fa-exclamation-triangle" style="font-size:40px; color:#EF4444;"></i>
                <p style="margin-top:12px;">Erro ao buscar profissionais</p>
                <p style="font-size:12px; color:#999;">${error.message}</p>
                <button class="btn btn-outline btn-small" onclick="app.buscarProfissionais()" style="margin-top:8px;">
                    <i class="fas fa-redo"></i> Tentar novamente
                </button>
            </div>
        `;
    }
}
