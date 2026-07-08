class App{
    constructor(){this.usuarioLogado=null;this.usuarioSelecionado=null;this.telaAtual='loginScreen';this.notificacoes=[];this.init()}
    async init(){
        console.log('🚀 Iniciando LPXConstrutor...');
        authService.onAuthStateChange((usuario)=>{
            if(usuario){this.usuarioLogado=usuario;this.atualizarBotaoPublicar();if(this.telaAtual==='loginScreen'||this.telaAtual==='cadastroScreen')this.mostrarTela('homeScreen')}
            else{this.usuarioLogado=null;this.mostrarTela('loginScreen')}
        });
        console.log('✅ App inicializado')
    }
    atualizarBotaoPublicar(){const btn=document.getElementById('btnPublicar');if(!btn)return;if(this.usuarioLogado&&this.usuarioLogado.tipo==='empreiteiro'){btn.style.display='flex';btn.onclick=()=>this.abrirTelaPublicacao()}else{btn.style.display='none'}}
    mostrarTela(id){
        document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
        const tela=document.getElementById(id);
        if(tela){tela.classList.add('active');this.telaAtual=id;
            const nav=document.getElementById('bottomNav');
            if(nav){const tn=['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen'];nav.style.display=tn.includes(id)?'flex':'none';
                nav.querySelectorAll('.nav-item').forEach(i=>{i.classList.remove('active');if(i.getAttribute('data-screen')===id)i.classList.add('active')})}
            this.onTelaCarregada(id)}
    }
    onTelaCarregada(id){if(id==='homeScreen')this.carregarHome();if(id==='meuPerfilScreen')this.carregarMeuPerfil();if(id==='buscaScreen')this.buscarProfissionais();if(id==='publicarVagaScreen')setTimeout(()=>document.getElementById('vagaTitulo')?.focus(),300)}
    mudarTab(tab){
        document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        event.target.closest('.tab').classList.add('active');
        document.getElementById('feedContainer').style.display=tab==='feed'?'block':'none';
        document.getElementById('redeContainer').style.display=tab==='rede'?'block':'none';
        if(tab==='feed')this.carregarFeed();if(tab==='rede')this.carregarRede()
    }
    async fazerLogin(){
        const e=document.getElementById('loginEmail')?.value?.trim();
        const s=document.getElementById('loginSenha')?.value;
        if(!e||!s){this.mostrarToast('Preencha todos os campos!','erro');return}
        this.mostrarToast('Entrando...','info');
        const r=await authService.login(e,s);
        if(r.sucesso){this.usuarioLogado=r.usuario;this.mostrarToast('Bem-vindo!','sucesso');this.atualizarBotaoPublicar();this.mostrarTela('homeScreen')}
        else this.mostrarToast(r.erro,'erro')
    }
    proximaEtapa(etapa){
        const e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2');
        if(!e1||!e2)return;
        if(etapa===1){e1.style.display='block';e2.style.display='none'}
        else{
            const n=document.getElementById('cadNome')?.value?.trim();
            const em=document.getElementById('cadEmail')?.value?.trim();
            const se=document.getElementById('cadSenha')?.value;
            if(!n||n.length<3){this.mostrarToast('Nome inválido','erro');return}
            if(!em||!em.includes('@')){this.mostrarToast('Email inválido','erro');return}
            if(!se||se.length<6){this.mostrarToast('Senha mínima 6 caracteres','erro');return}
            e1.style.display='none';e2.style.display='block'
        }
        window.scrollTo({top:0,behavior:'smooth'})
    }
    toggleProfissao(){const g=document.getElementById('grupoProfissao');if(g)g.style.display=document.getElementById('cadTipo')?.value==='profissional'?'block':'none'}
    async cadastrar(){
        const d={nome:document.getElementById('cadNome')?.value?.trim(),email:document.getElementById('cadEmail')?.value?.trim(),senha:document.getElementById('cadSenha')?.value,tipo:document.getElementById('cadTipo')?.value,celular:document.getElementById('cadCelular')?.value?.trim(),cpf:document.getElementById('cadCPF')?.value?.replace(/\D/g,''),profissao:document.getElementById('cadProfissao')?.value,experiencia:document.getElementById('cadExperiencia')?.value,habilidades:document.getElementById('cadHabilidades')?.value};
        if(!d.nome||!d.email||!d.senha){this.mostrarToast('Preencha todos os campos!','erro');return}
        if(d.tipo==='profissional'&&!d.profissao){this.mostrarToast('Selecione sua profissão!','erro');return}
        this.mostrarToast('Cadastrando...','info');
        const r=await authService.cadastrar(d);
        if(r.sucesso){this.usuarioLogado=r.usuario;this.mostrarToast('Cadastro realizado!','sucesso');this.atualizarBotaoPublicar();this.mostrarTela('homeScreen')}
        else this.mostrarToast(r.erro,'erro')
    }
    async recuperarSenha(){const e=prompt('Digite seu email:');if(!e)return;const r=await authService.recuperarSenha(e);if(r.sucesso)this.mostrarToast('Email enviado!','sucesso');else this.mostrarToast(r.erro,'erro')}
    async sair(){await authService.logout();this.usuarioLogado=null;this.mostrarTela('loginScreen');this.mostrarToast('Até logo!','sucesso')}
    async carregarHome(){
        if(!this.usuarioLogado)return;
        const h=new Date().getHours();let s='Bom dia';if(h>=12&&h<18)s='Boa tarde';if(h>=18)s='Boa noite';
        document.getElementById('saudacao').textContent=`👋 ${s}, ${this.usuarioLogado.nome}!`;
        document.getElementById('resumoTexto').textContent=`${this.usuarioLogado.tipo==='empreiteiro'?'🏢':'👷'} ${this.usuarioLogado.profissao||this.usuarioLogado.tipo}`;
        try{await mapaService.initMap()}catch(e){}
        await this.carregarFeed()
    }
    async carregarFeed(){
        const c=document.getElementById('feedContainer');if(!c)return;
        c.innerHTML='<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
        try{
            const snap=await db.collection('vagas').get();const vagas=[];
            snap.forEach(doc=>{const d=doc.data();if(d.ativa!==false)vagas.push({id:doc.id,...d})});
            vagas.sort((a,b)=>{const da=a.dataCriacao?.toDate?.()||new Date(0);const db2=b.dataCriacao?.toDate?.()||new Date(0);return db2-da});
            if(vagas.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-hard-hat" style="font-size:60px;color:#ccc;"></i><h3>Nenhuma vaga</h3>'+(this.usuarioLogado?.tipo==='empreiteiro'?'<button class="btn btn-primary" onclick="app.abrirTelaPublicacao()" style="margin-top:16px;">PUBLICAR VAGA</button>':'')+'</div>';return}
            for(const v of vagas){try{const ad=await db.collection('usuarios').doc(v.usuarioId).get();v.autor=ad.exists?ad.data():null}catch(e){v.autor=null}}
            c.innerHTML=vagas.map(v=>this.criarVagaCard(v)).join('')
        }catch(e){c.innerHTML='<div class="card">Erro ao carregar</div>'}
    }
    criarVagaCard(v){
        const a=v.autor||{};const w=a.celular?a.celular.replace(/\D/g,''):'';
        const d=v.dataCriacao?new Date(v.dataCriacao.toDate()).toLocaleDateString('pt-BR'):'';
        return `<div class="vaga-card"><div class="vaga-header" onclick="app.verPerfil('${v.usuarioId}')" style="cursor:pointer;"><div class="vaga-avatar">${a.fotoPerfil?`<img src="${a.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`:'<i class="fas fa-user-tie"></i>'}</div><div class="vaga-info"><div class="vaga-nome">${a.nome||'Empreiteiro'}</div><div class="vaga-data">📍 ${v.endereco||''} • ${d}</div></div><div>${'⭐'.repeat(Math.round(a.score||0))}</div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ ${v.titulo||'Vaga'}</div><div class="vaga-descricao">${v.descricao||''}</div><div class="vaga-tags"><span class="vaga-tag">💰 R$${v.valorHora}/h</span><span class="vaga-tag">👷 ${v.profissoes||'Todas'}</span></div></div><div class="vaga-footer">${this.usuarioLogado&&this.usuarioLogado.tipo==='profissional'?`<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.candidatarVaga('${v.id}')" style="flex:1;">QUERO!</button>`:''}${w?`<a href="https://wa.me/55${w}" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>`:''}<button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.verPerfil('${v.usuarioId}')"><i class="fas fa-user"></i></button></div></div>`
    }
    async verPerfil(uid){
        try{
            const doc=await db.collection('usuarios').doc(uid).get();if(!doc.exists){this.mostrarToast('Não encontrado','erro');return}
            this.usuarioSelecionado={id:doc.id,...doc.data()};const u=this.usuarioSelecionado;const w=u.celular?u.celular.replace(/\D/g,'':'');
            const c=document.getElementById('perfilPublicoConteudo');
            c.innerHTML=`<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar" style="background:${u.fotoPerfil?'white':'linear-gradient(135deg,#F47920,#E06B1A)'};">${u.fotoPerfil?`<img src="${u.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`:'<i class="fas fa-user" style="font-size:40px;"></i>'}</div></div></div><div class="profile-info-card"><h2>${u.nome}</h2><p><i class="fas fa-tools"></i> ${u.profissao||'Profissional'}</p><p><i class="fas fa-calendar"></i> ${u.experiencia||0} anos</p><div class="stars-container">${'⭐'.repeat(Math.round(u.score||0))} ${u.score?u.score.toFixed(1):'Sem avaliações'}</div></div><div class="card"><h3>Habilidades</h3><p>${u.habilidades||'Não informado'}</p></div><div class="card"><h3>Contato</h3><p>📱 ${u.celular||'Não informado'}</p><p>📧 ${u.email}</p></div>${this.usuarioLogado&&this.usuarioLogado.id!==u.id?`<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">${w?`<a href="https://wa.me/55${w}" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> WhatsApp</a>`:''}<button class="btn btn-primary" onclick="app.iniciarChat('${u.id}')"><i class="fas fa-comments"></i> Chat</button><button class="btn btn-outline" onclick="app.avaliarUsuario('${u.id}')"><i class="fas fa-star"></i> Avaliar</button></div>`:''}`;
            this.mostrarTela('perfilPublicoScreen')
        }catch(e){this.mostrarToast('Erro','erro')}
    }
    carregarMeuPerfil(){
        if(!this.usuarioLogado)return;const u=this.usuarioLogado;
        document.getElementById('meuPerfilNome').textContent=u.nome||'Usuário';
        document.getElementById('meuPerfilProfissao').textContent=`${u.tipo==='profissional'?'👷':'🏢'} ${u.profissao||u.tipo}`;
        document.getElementById('meuPerfilAvaliacao').innerHTML='⭐'.repeat(Math.round(u.score||0))+' '+(u.score?u.score.toFixed(1):'Sem avaliações');
        document.getElementById('editNome').value=u.nome||'';document.getElementById('editCelular').value=u.celular||'';
        document.getElementById('editHabilidades').value=u.habilidades||'';document.getElementById('statsAvaliacoes').textContent=u.avaliacoesRecebidas||0;
        this.carregarStatsConexoes()
    }
    async carregarStatsConexoes(){try{const cx=await databaseService.buscarConexoes(this.usuarioLogado.id);document.getElementById('statsConexoes').textContent=cx.length}catch(e){document.getElementById('statsConexoes').textContent='0'}}
    async salvarPerfil(){
        const d={nome:document.getElementById('editNome').value.trim(),celular:document.getElementById('editCelular').value.trim(),habilidades:document.getElementById('editHabilidades').value.trim()};
        if(!d.nome){this.mostrarToast('Nome obrigatório!','erro');return}
        await databaseService.atualizarUsuario(this.usuarioLogado.id,d);this.usuarioLogado={...this.usuarioLogado,...d};this.mostrarToast('Perfil atualizado!','sucesso');this.carregarMeuPerfil()
    }
    async uploadFoto(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(ev)=>{await databaseService.atualizarUsuario(this.usuarioLogado.id,{fotoPerfil:ev.target.result});this.usuarioLogado.fotoPerfil=ev.target.result;this.mostrarToast('Foto atualizada!','sucesso');this.carregarMeuPerfil()};r.readAsDataURL(f)}
    abrirTelaPublicacao(){if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro'){this.mostrarToast('Apenas empreiteiros!','erro');return};['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});document.getElementById('vagaValorHora').value='';document.getElementById('vagaQuantidade').value='1';document.querySelectorAll('#profissoesCheckboxes input').forEach(cb=>cb.checked=false);this.mostrarTela('publicarVagaScreen')}
    async publicarVagaApp(){
        const t=document.getElementById('vagaTitulo')?.value?.trim();const e=document.getElementById('vagaEndereco')?.value?.trim();const vh=document.getElementById('vagaValorHora')?.value;
        const ps=[];document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(cb=>ps.push(cb.value));
        if(!t){this.mostrarToast('Digite um título!','erro');return}if(!e){this.mostrarToast('Informe o endereço!','erro');return}if(ps.length===0){this.mostrarToast('Selecione profissões!','erro');return}if(!vh||parseFloat(vh)<=0){this.mostrarToast('Valor inválido!','erro');return}
        this.mostrarToast('Publicando...','info');
        try{
            let lat=null,lng=null;try{const pos=await this.getPosition();lat=pos.lat;lng=pos.lng}catch(ex){}
            await db.collection('vagas').add({titulo:t,descricao:document.getElementById('vagaDescricao')?.value||'',endereco:e,profissoes:ps.join(', '),valorHora:parseFloat(vh),quantidade:parseInt(document.getElementById('vagaQuantidade')?.value||'1'),lat,lng,usuarioId:this.usuarioLogado.id,interessados:[],visualizacoes:0,dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativa:true});
            this.mostrarToast('Vaga publicada!','sucesso');setTimeout(()=>{this.mostrarTela('homeScreen');this.carregarFeed()},1000)
        }catch(ex){this.mostrarToast('Erro ao publicar','erro')}
    }
    getPosition(){return new Promise((resolve,reject)=>{if(!navigator.geolocation){reject(new Error('Sem GPS'));return}navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lng:p.coords.longitude}),e=>reject(e),{timeout:5000})})}
    async candidatarVaga(vid){if(!this.usuarioLogado||this.usuarioLogado.tipo!=='profissional'){this.mostrarToast('Apenas profissionais!','erro');return}const doc=await db.collection('vagas').doc(vid).get();if(!doc.exists)return;const v=doc.data();if(!v.interessados)v.interessados=[];if(v.interessados.includes(this.usuarioLogado.id)){this.mostrarToast('Já se candidatou!','erro');return}v.interessados.push(this.usuarioLogado.id);await db.collection('vagas').doc(vid).update({interessados:v.interessados});this.mostrarToast('Candidatura enviada!','sucesso');this.carregarFeed()}
    async buscarProfissionais(){
        const c=document.getElementById('buscaResultados');if(!c)return;
        c.innerHTML='<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>';
        try{
            const snap=await db.collection('usuarios').get();const todos=[];
            snap.forEach(doc=>{const d=doc.data();console.log('📄',d.nome,'|',d.tipo,'|',d.profissao,'|',d.ativo);todos.push({id:doc.id,...d})});
            const profs=todos.filter(u=>(u.tipo==='profissional'||u.tipo==='Profissional')&&u.ativo!==false);
            console.log('👷 Profissionais:',profs.length);profs.forEach(p=>console.log('  -',p.nome,p.profissao));
            const termo=document.getElementById('buscaInput')?.value?.toLowerCase().trim()||'';
            let filtrados=termo?profs.filter(u=>(u.nome||'').toLowerCase().includes(termo)||(u.profissao||'').toLowerCase().includes(termo)||(u.habilidades||'').toLowerCase().includes(termo)):profs;
            if(filtrados.length===0){c.innerHTML=`<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-search" style="font-size:60px;color:#ccc;"></i><h3>Nenhum profissional</h3><p style="color:#999;">Total no banco: ${todos.length} | Profissionais: ${profs.length}</p>${termo?`<button class="btn btn-outline btn-small" onclick="document.getElementById('buscaInput').value='';app.buscarProfissionais();">Mostrar todos</button>`:''}</div>`;return}
            c.innerHTML=filtrados.map(u=>{const w=u.celular?.replace(/\D/g,'');const sc=u.score||0;return`<div class="vaga-card" style="cursor:pointer;" onclick="app.verPerfil('${u.id}')"><div class="vaga-header"><div class="vaga-avatar" style="background:${u.fotoPerfil?'white':'linear-gradient(135deg,#F47920,#E06B1A)'};">${u.fotoPerfil?`<img src="${u.fotoPerfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`:'<i class="fas fa-hard-hat"></i>'}</div><div class="vaga-info"><div class="vaga-nome">${u.nome}</div><div class="vaga-data">${u.profissao||'Profissional'} • ${u.experiencia||0} anos</div></div><div><div>${'⭐'.repeat(Math.round(sc))||'☆'}</div><div style="font-size:11px;color:#999;">${sc>0?sc.toFixed(1):'Novo'}</div></div></div><div class="vaga-footer">${w?`<a href="https://wa.me/55${w}" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>`:''}<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat('${u.id}')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div></div>`}).join('')
        }catch(e){c.innerHTML='<div class="card">Erro: '+e.message+'</div>'}
    }
    async carregarRede(){
        const c=document.getElementById('redeContainer');if(!c)return;
        c.innerHTML='<div class="loading">Carregando...</div>';
        try{
            const cx=await databaseService.buscarConexoes(this.usuarioLogado.id);
            if(cx.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-users" style="font-size:60px;color:#ccc;"></i><h3>Rede vazia</h3></div>';return}
            const users=[];for(const x of cx){const aid=x.usuarioId===this.usuarioLogado.id?x.amigoId:x.usuarioId;const doc=await db.collection('usuarios').doc(aid).get();if(doc.exists)users.push({id:doc.id,...doc.data()})}
            c.innerHTML=users.map(u=>{const w=u.celular?.replace(/\D/g,'');return`<div class="vaga-card" onclick="app.verPerfil('${u.id}')"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user"></i></div><div class="vaga-info"><div class="vaga-nome">${u.nome}</div><div class="vaga-data">${u.profissao||'Usuário'}</div></div></div><div class="vaga-footer">${w?`<a href="https://wa.me/55${w}" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>`:''}<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat('${u.id}')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button></div></div>`}).join('')
        }catch(e){c.innerHTML='<div class="card">Erro</div>'}
    }
    async iniciarChat(uid){
        if(!this.usuarioLogado)return;
        const doc=await db.collection('usuarios').doc(uid).get();if(!doc.exists)return;
        this.usuarioSelecionado={id:doc.id,...doc.data()};const u=this.usuarioSelecionado;
        document.getElementById('chatHeaderInfo').innerHTML=`<div style="display:flex;align-items:center;gap:10px;"><div style="width:40px;height:40px;border-radius:50%;background:#F47920;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-user"></i></div><div><strong>${u.nome}</strong><div style="font-size:12px;color:#10B981;">Online</div></div></div>`;
        this.carregarMensagens();this.mostrarTela('chatScreen')
    }
    async carregarMensagens(){
        const c=document.getElementById('chatMessages');if(!c||!this.usuarioSelecionado)return;
        try{
            const snap=await db.collection('mensagens').get();const msgs=[];
            snap.forEach(doc=>{const d=doc.data();if(d.participantes&&d.participantes.includes(this.usuarioLogado.id)&&d.participantes.includes(this.usuarioSelecionado.id))msgs.push({id:doc.id,...d})});
            msgs.sort((a,b)=>{const da=a.dataEnvio?.toDate?.()||new Date(0);const db2=b.dataEnvio?.toDate?.()||new Date(0);return da-db2});
            if(msgs.length===0){c.innerHTML='<div style="text-align:center;padding:60px;color:#999;">Nenhuma mensagem</div>';return}
            c.innerHTML=msgs.map(m=>{const me=m.remetenteId===this.usuarioLogado.id;const h=m.dataEnvio?new Date(m.dataEnvio.toDate()).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'';return`<div class="message ${me?'message-sent':'message-received'}"><div class="message-content">${m.conteudo}</div><div class="message-footer"><span class="message-time">${h}</span>${me?'<span class="message-status">✓</span>':''}</div></div>`}).join('');
            c.scrollTop=c.scrollHeight
        }catch(e){}
    }
    async enviarMensagem(){
        const i=document.getElementById('chatInput');const ct=i?.value?.trim();if(!ct||!this.usuarioSelecionado)return;
        await db.collection('mensagens').add({remetenteId:this.usuarioLogado.id,destinatarioId:this.usuarioSelecionado.id,participantes:[this.usuarioLogado.id,this.usuarioSelecionado.id],conteudo:ct,dataEnvio:firebase.firestore.FieldValue.serverTimestamp(),lida:false});
        i.value='';await this.carregarMensagens()
    }
    async avaliarUsuario(uid){const n=prompt('Nota (1-5):');if(!n||isNaN(n)||n<1||n>5)return;const c=prompt('Comentário:')||'';await databaseService.avaliarUsuario(this.usuarioLogado.id,uid,parseInt(n),c);this.mostrarToast('Avaliação enviada!','sucesso')}
    mostrarNotificacoes(){this.mostrarTela('notificacoesScreen')}
    mostrarToast(m,t='info'){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';clearTimeout(this._tt);this._tt=setTimeout(()=>toast.style.display='none',3000)}
}
window.addEventListener('DOMContentLoaded',()=>{window.app=new App();console.log('✅ App pronto!')});
