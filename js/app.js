// ==========================================================
// ===== APLICAÇÃO PRINCIPAL - COMPLETA =====
// ==========================================================

window.app = {
    fazerLogin: function(){}, mostrarTela: function(id){
        document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
        var t = document.getElementById(id); if(t) t.classList.add('active');
    },
    cadastrar: function(){}, proximaEtapa: function(){}, toggleProfissao: function(){},
    recuperarSenha: function(){}, sair: function(){}, buscarProfissionais: function(){},
    verPerfil: function(){}, iniciarChat: function(){}, enviarMensagem: function(){},
    salvarPerfil: function(){}, uploadFoto: function(){}, abrirTelaPublicacao: function(){},
    publicarVagaApp: function(){}, candidatarVaga: function(){}, contratarProfissional: function(){},
    adicionarNaRede: function(){}, avaliarUsuario: function(){}, mostrarNotificacoes: function(){},
    mudarTab: function(){}
};

var App = function(){
    this.usuarioLogado = null;
    this.usuarioSelecionado = null;
    this.telaAtual = 'loginScreen';
    this.notificacoes = [];
    this.init();
};

App.prototype.init = function(){
    var self = this;
    console.log('🚀 Iniciando...');
    authService.onAuthStateChange(function(usuario){
        if(usuario){
            self.usuarioLogado = usuario;
            self.atualizarBotaoPublicar();
            if(self.telaAtual === 'loginScreen' || self.telaAtual === 'cadastroScreen'){
                self.mostrarTela('homeScreen');
            }
        } else {
            self.usuarioLogado = null;
            self.mostrarTela('loginScreen');
        }
    });
};

App.prototype.atualizarBotaoPublicar = function(){
    var btn = document.getElementById('btnPublicar');
    if(!btn) return;
    btn.style.display = (this.usuarioLogado && this.usuarioLogado.tipo === 'empreiteiro') ? 'flex' : 'none';
};

App.prototype.mostrarTela = function(id){
    var self = this;
    document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
    var tela = document.getElementById(id);
    if(tela){
        tela.classList.add('active');
        self.telaAtual = id;
        var nav = document.getElementById('bottomNav');
        if(nav){
            var tn = ['homeScreen','buscaScreen','meuPerfilScreen','chatScreen','publicarVagaScreen'];
            nav.style.display = tn.indexOf(id) >= 0 ? 'flex' : 'none';
        }
        if(id === 'homeScreen') self.carregarHome();
        if(id === 'meuPerfilScreen') self.carregarMeuPerfil();
        if(id === 'buscaScreen') self.buscarProfissionais();
    }
};

App.prototype.fazerLogin = function(){
    var self = this;
    var email = (document.getElementById('loginEmail')||{}).value||'';
    var senha = (document.getElementById('loginSenha')||{}).value||'';
    if(!email||!senha){self.mostrarToast('Preencha todos os campos!','erro');return}
    self.mostrarToast('Entrando...','info');
    authService.login(email,senha).then(function(r){
        if(r.sucesso){self.usuarioLogado=r.usuario;self.mostrarToast('Bem-vindo!','sucesso');self.atualizarBotaoPublicar();self.mostrarTela('homeScreen')}
        else self.mostrarToast(r.erro,'erro')
    });
};

App.prototype.cadastrar = function(){
    var self = this;
    var d = {
        nome:(document.getElementById('cadNome')||{}).value||'',
        email:(document.getElementById('cadEmail')||{}).value||'',
        senha:(document.getElementById('cadSenha')||{}).value||'',
        tipo:(document.getElementById('cadTipo')||{}).value||'profissional',
        celular:(document.getElementById('cadCelular')||{}).value||'',
        cpf:((document.getElementById('cadCPF')||{}).value||'').replace(/\D/g,''),
        profissao:(document.getElementById('cadProfissao')||{}).value||'',
        experiencia:(document.getElementById('cadExperiencia')||{}).value||'0',
        habilidades:(document.getElementById('cadHabilidades')||{}).value||''
    };
    if(!d.nome||!d.email||!d.senha){self.mostrarToast('Preencha todos os campos!','erro');return}
    self.mostrarToast('Cadastrando...','info');
    authService.cadastrar(d).then(function(r){
        if(r.sucesso){self.usuarioLogado=r.usuario;self.mostrarToast('Cadastro realizado!','sucesso');self.atualizarBotaoPublicar();self.mostrarTela('homeScreen')}
        else self.mostrarToast(r.erro,'erro')
    });
};

App.prototype.proximaEtapa = function(e){
    var e1=document.getElementById('etapa1'),e2=document.getElementById('etapa2');
    if(!e1||!e2)return;
    if(e===1){e1.style.display='block';e2.style.display='none'}
    else{e1.style.display='none';e2.style.display='block'}
};

App.prototype.toggleProfissao = function(){
    var g=document.getElementById('grupoProfissao');
    var t=(document.getElementById('cadTipo')||{}).value;
    if(g)g.style.display=t==='profissional'?'block':'none';
};

App.prototype.recuperarSenha = function(){
    var e=prompt('Digite seu email:');if(!e)return;
    var self=this;
    authService.recuperarSenha(e).then(function(r){
        if(r.sucesso)self.mostrarToast('Email enviado!','sucesso');
        else self.mostrarToast(r.erro,'erro')
    });
};

App.prototype.sair = function(){
    var self=this;
    authService.logout().then(function(){self.usuarioLogado=null;self.mostrarTela('loginScreen');self.mostrarToast('Até logo!','sucesso')});
};

App.prototype.carregarHome = function(){
    if(!this.usuarioLogado)return;
    var h=new Date().getHours(),s='Bom dia';
    if(h>=12&&h<18)s='Boa tarde';if(h>=18)s='Boa noite';
    var sa=document.getElementById('saudacao');if(sa)sa.textContent='👋 '+s+', '+this.usuarioLogado.nome+'!';
    var re=document.getElementById('resumoTexto');if(re)re.textContent=(this.usuarioLogado.tipo==='empreiteiro'?'🏢 Empreiteiro':'👷 Profissional')+' • '+(this.usuarioLogado.profissao||this.usuarioLogado.tipo);
    var self=this;
    setTimeout(function(){try{if(typeof mapaService!=='undefined')mapaService.initMap()}catch(e){}},500);
    this.carregarFeed();
};

App.prototype.carregarFeed = function(){
    var self=this,c=document.getElementById('feedContainer');if(!c)return;
    c.innerHTML='<div class="loading">Carregando vagas...</div>';
    db.collection('vagas').get().then(function(snap){
        var vagas=[];snap.forEach(function(doc){var d=doc.data();if(d.ativa!==false)vagas.push({id:doc.id,data:d})});
        if(vagas.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma vaga</h3>'+(self.usuarioLogado&&self.usuarioLogado.tipo==='empreiteiro'?'<button class="btn btn-primary" onclick="app.abrirTelaPublicacao()">PUBLICAR VAGA</button>':'')+'</div>';return}
        var html='';vagas.forEach(function(v){html+='<div class="vaga-card"><div class="vaga-header"><div class="vaga-avatar"><i class="fas fa-user-tie"></i></div><div class="vaga-info"><div class="vaga-nome">'+(v.data.titulo||'Vaga')+'</div><div class="vaga-data">📍 '+(v.data.endereco||'')+'</div></div></div><div class="vaga-body"><div class="vaga-titulo">🏗️ '+(v.data.titulo||'Vaga')+'</div><div class="vaga-descricao">'+(v.data.descricao||'')+'</div><div class="vaga-tags"><span class="vaga-tag">💰 R$'+(v.data.valorHora||'0')+'/h</span><span class="vaga-tag">👷 '+(v.data.profissoes||'Todas')+'</span></div></div><div class="vaga-footer">'+(self.usuarioLogado&&self.usuarioLogado.tipo==='profissional'?'<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.candidatarVaga(\''+v.id+'\')" style="flex:1;">✋ QUERO!</button>':'')+'</div></div>'});
        c.innerHTML=html;
    }).catch(function(){c.innerHTML='<div class="card">Erro</div>'});
};

// ===== SISTEMA DE REDE =====
App.prototype.carregarRede = function(){
    var self=this,c=document.getElementById('redeContainer');if(!c)return;
    c.innerHTML='<div class="loading">Carregando sua rede...</div>';
    
    db.collection('conexoes').get().then(function(snap){
        var conexoes=[];
        snap.forEach(function(doc){
            var d=doc.data();
            // Verifica se o usuário logado está na conexão
            if(d.usuarioId===self.usuarioLogado.id || d.amigoId===self.usuarioLogado.id){
                conexoes.push({id:doc.id,data:d});
            }
        });
        
        if(conexoes.length===0){
            c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><i class="fas fa-users" style="font-size:60px;color:#ccc;"></i><h3>Sua rede está vazia</h3><p style="color:#999;">Busque profissionais e adicione na sua rede!</p><button class="btn btn-primary" onclick="app.mostrarTela(\'buscaScreen\')" style="margin-top:16px;">🔍 Buscar Profissionais</button></div>';
            return;
        }
        
        // Busca dados dos amigos
        var promessas=[];
        conexoes.forEach(function(con){
            var amigoId=con.data.usuarioId===self.usuarioLogado.id?con.data.amigoId:con.data.usuarioId;
            promessas.push(db.collection('usuarios').doc(amigoId).get());
        });
        
        Promise.all(promessas).then(function(docs){
            var html='';
            docs.forEach(function(doc){
                if(doc.exists){
                    var u=doc.data();
                    var w=u.celular?u.celular.replace(/\D/g,''):'';
                    html+='<div class="vaga-card" onclick="app.verPerfil(\''+doc.id+'\')" style="cursor:pointer;">'+
                        '<div class="vaga-header">'+
                            '<div class="vaga-avatar"><i class="fas fa-user"></i></div>'+
                            '<div class="vaga-info">'+
                                '<div class="vaga-nome">'+u.nome+'</div>'+
                                '<div class="vaga-data">'+(u.profissao||'Profissional')+' • '+(u.experiencia||0)+' anos</div>'+
                            '</div>'+
                            '<div>'+'⭐'.repeat(Math.round(u.score||0))+'</div>'+
                        '</div>'+
                        '<div class="vaga-footer">'+
                            (w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+
                            '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\''+doc.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button>'+
                            '<button class="btn btn-danger btn-small" onclick="event.stopPropagation();app.removerDaRede(\''+doc.id+'\')" title="Remover da rede">✕</button>'+
                        '</div>'+
                    '</div>';
                }
            });
            c.innerHTML=html||'<div class="card" style="text-align:center;">Nenhum amigo encontrado</div>';
        });
    }).catch(function(e){
        c.innerHTML='<div class="card">Erro ao carregar rede</div>';
    });
};

// ===== ADICIONAR NA REDE =====
App.prototype.adicionarNaRede = function(amigoId){
    var self=this;
    if(!this.usuarioLogado){this.mostrarToast('Faça login!','erro');return}
    if(this.usuarioLogado.id===amigoId){this.mostrarToast('Você não pode se adicionar!','erro');return}
    
    // Verifica se já existe
    db.collection('conexoes').get().then(function(snap){
        var existe=false;
        snap.forEach(function(doc){
            var d=doc.data();
            if((d.usuarioId===self.usuarioLogado.id&&d.amigoId===amigoId)||(d.usuarioId===amigoId&&d.amigoId===self.usuarioLogado.id)){
                existe=true;
            }
        });
        
        if(existe){
            self.mostrarToast('Este profissional já está na sua rede!','erro');
            return;
        }
        
        // Cria conexão
        db.collection('conexoes').add({
            usuarioId: self.usuarioLogado.id,
            amigoId: amigoId,
            status: 'ativo',
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(){
            self.mostrarToast('✅ Adicionado na sua rede!','sucesso');
        }).catch(function(){
            self.mostrarToast('Erro ao adicionar','erro');
        });
    });
};

// ===== REMOVER DA REDE =====
App.prototype.removerDaRede = function(amigoId){
    var self=this;
    if(!confirm('Remover este profissional da sua rede?'))return;
    
    db.collection('conexoes').get().then(function(snap){
        snap.forEach(function(doc){
            var d=doc.data();
            if((d.usuarioId===self.usuarioLogado.id&&d.amigoId===amigoId)||(d.usuarioId===amigoId&&d.amigoId===self.usuarioLogado.id)){
                db.collection('conexoes').doc(doc.id).delete().then(function(){
                    self.mostrarToast('Removido da rede','sucesso');
                    self.carregarRede();
                });
            }
        });
    });
};

// ===== CONTRATAR PROFISSIONAL =====
App.prototype.contratarProfissional = function(profId){
    var self=this;
    if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro'){
        this.mostrarToast('Apenas empreiteiros podem contratar!','erro');
        return;
    }
    
    var obra=prompt('Nome da obra:');
    if(!obra)return;
    var valor=prompt('Valor por hora (R$):','25');
    if(!valor)return;
    
    // Cria conexão de trabalho
    db.collection('conexoes').add({
        usuarioId: this.usuarioLogado.id,
        amigoId: profId,
        status: 'contratado',
        obra: obra,
        valorHora: parseFloat(valor),
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){
        self.mostrarToast('🤝 Profissional contratado!','sucesso');
        // Também adiciona na rede
        self.adicionarNaRede(profId);
    }).catch(function(){
        self.mostrarToast('Erro ao contratar','erro');
    });
};

App.prototype.carregarMeuPerfil = function(){
    if(!this.usuarioLogado)return;var u=this.usuarioLogado;
    var n=document.getElementById('meuPerfilNome');if(n)n.textContent=u.nome||'Usuário';
    var p=document.getElementById('meuPerfilProfissao');if(p)p.textContent=(u.tipo==='profissional'?'👷':'🏢')+' '+(u.profissao||u.tipo);
    var a=document.getElementById('meuPerfilAvaliacao');if(a)a.innerHTML='⭐'.repeat(Math.round(u.score||0))+' '+(u.score?u.score.toFixed(1):'Sem avaliações');
    var en=document.getElementById('editNome');if(en)en.value=u.nome||'';
    var ec=document.getElementById('editCelular');if(ec)ec.value=u.celular||'';
    var eh=document.getElementById('editHabilidades');if(eh)eh.value=u.habilidades||'';
};

App.prototype.salvarPerfil = function(){
    var self=this;
    var d={nome:(document.getElementById('editNome')||{}).value||'',celular:(document.getElementById('editCelular')||{}).value||'',habilidades:(document.getElementById('editHabilidades')||{}).value||''};
    if(!d.nome){this.mostrarToast('Nome obrigatório!','erro');return}
    databaseService.atualizarUsuario(this.usuarioLogado.id,d).then(function(){self.usuarioLogado.nome=d.nome;self.usuarioLogado.celular=d.celular;self.usuarioLogado.habilidades=d.habilidades;self.mostrarToast('Perfil atualizado!','sucesso');self.carregarMeuPerfil()});
};

App.prototype.uploadFoto = function(e){var self=this,f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){databaseService.atualizarUsuario(self.usuarioLogado.id,{fotoPerfil:ev.target.result}).then(function(){self.usuarioLogado.fotoPerfil=ev.target.result;self.mostrarToast('Foto atualizada!','sucesso')})};r.readAsDataURL(f)};

App.prototype.buscarProfissionais = function(){
    var self=this,c=document.getElementById('buscaResultados');if(!c)return;
    c.innerHTML='<div class="loading">Buscando...</div>';
    db.collection('usuarios').get().then(function(snap){
        var todos=[];snap.forEach(function(doc){todos.push({id:doc.id,data:doc.data()})});
        var profs=todos.filter(function(u){return u.data.tipo==='profissional'&&u.data.ativo!==false});
        var termo=(document.getElementById('buscaInput')||{}).value||'';
        var filtrados=termo?profs.filter(function(u){return(u.data.nome||'').toLowerCase().indexOf(termo.toLowerCase())>=0||(u.data.profissao||'').toLowerCase().indexOf(termo.toLowerCase())>=0}):profs;
        
        if(filtrados.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><h3>Nenhum profissional</h3><p style="color:#999;">Total: '+profs.length+' profissionais</p></div>';return}
        
        var html='';
        filtrados.forEach(function(u){
            var w=u.data.celular?u.data.celular.replace(/\D/g,''):'';
            var sc=u.data.score||0;
            html+='<div class="vaga-card" onclick="app.verPerfil(\''+u.id+'\')" style="cursor:pointer;">'+
                '<div class="vaga-header">'+
                    '<div class="vaga-avatar"><i class="fas fa-hard-hat"></i></div>'+
                    '<div class="vaga-info">'+
                        '<div class="vaga-nome">'+u.data.nome+'</div>'+
                        '<div class="vaga-data">'+(u.data.profissao||'Profissional')+' • '+(u.data.experiencia||0)+' anos</div>'+
                    '</div>'+
                    '<div>'+'⭐'.repeat(Math.round(sc))+'</div>'+
                '</div>'+
                '<div class="vaga-footer">'+
                    (w?'<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success btn-small" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a>':'')+
                    '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();app.iniciarChat(\''+u.id+'\')" style="flex:1;"><i class="fas fa-comments"></i> Chat</button>'+
                    '<button class="btn btn-outline btn-small" onclick="event.stopPropagation();app.adicionarNaRede(\''+u.id+'\')" title="Adicionar na rede" style="background:#10B981;color:white;">➕</button>'+
                '</div>'+
            '</div>';
        });
        c.innerHTML=html;
    });
};

App.prototype.verPerfil = function(uid){
    var self=this;
    db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists){self.mostrarToast('Não encontrado','erro');return}
        var u=doc.data(),w=u.celular?u.celular.replace(/\D/g,''):'';
        var c=document.getElementById('perfilPublicoConteudo');if(!c)return;
        
        var html='<div class="profile-header-container"><div class="profile-cover"></div><div class="profile-avatar-container"><div class="profile-avatar"><i class="fas fa-user" style="font-size:40px;"></i></div></div></div>'+
            '<div class="profile-info-card"><h2>'+u.nome+'</h2><p><i class="fas fa-tools"></i> '+(u.profissao||'Profissional')+'</p><p><i class="fas fa-calendar"></i> '+(u.experiencia||0)+' anos</p><div>'+'⭐'.repeat(Math.round(u.score||0))+' '+(u.score?u.score.toFixed(1):'Sem avaliações')+'</div></div>'+
            '<div class="card"><h3>Habilidades</h3><p>'+(u.habilidades||'Não informado')+'</p></div>'+
            '<div class="card"><h3>Contato</h3><p>📱 '+(u.celular||'Não informado')+'</p><p>📧 '+u.email+'</p></div>';
        
        if(self.usuarioLogado&&self.usuarioLogado.id!==uid){
            html+='<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">';
            if(w)html+='<a href="https://wa.me/55'+w+'" target="_blank" class="btn btn-success"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
            html+='<button class="btn btn-primary" onclick="app.iniciarChat(\''+uid+'\')"><i class="fas fa-comments"></i> Conversar no Chat</button>';
            html+='<button class="btn btn-outline" onclick="app.adicionarNaRede(\''+uid+'\')" style="background:#10B981;color:white;"><i class="fas fa-user-plus"></i> Adicionar na Minha Rede</button>';
            if(self.usuarioLogado.tipo==='empreiteiro'){
                html+='<button class="btn btn-outline" onclick="app.contratarProfissional(\''+uid+'\')" style="background:#1A3A5C;color:white;"><i class="fas fa-handshake"></i> CONTRATAR</button>';
            }
            html+='<button class="btn btn-outline" onclick="app.avaliarUsuario(\''+uid+'\')"><i class="fas fa-star"></i> Avaliar</button>';
            html+='</div>';
        }
        c.innerHTML=html;
        self.mostrarTela('perfilPublicoScreen');
    });
};

App.prototype.iniciarChat = function(uid){
    var self=this;
    db.collection('usuarios').doc(uid).get().then(function(doc){
        if(!doc.exists)return;
        self.usuarioSelecionado={id:doc.id,data:doc.data()};
        var h=document.getElementById('chatHeaderInfo');
        if(h)h.innerHTML='<div style="display:flex;align-items:center;gap:10px;"><div style="width:40px;height:40px;border-radius:50%;background:#F47920;display:flex;align-items:center;justify-content:center;color:white;"><i class="fas fa-user"></i></div><div><strong>'+doc.data().nome+'</strong><div style="font-size:12px;color:#10B981;">Online</div></div></div>';
        self.mostrarTela('chatScreen');
    });
};

App.prototype.enviarMensagem = function(){
    var self=this,i=document.getElementById('chatInput'),ct=i?i.value.trim():'';
    if(!ct||!this.usuarioSelecionado)return;
    db.collection('mensagens').add({remetenteId:this.usuarioLogado.id,destinatarioId:this.usuarioSelecionado.id,participantes:[this.usuarioLogado.id,this.usuarioSelecionado.id],conteudo:ct,dataEnvio:firebase.firestore.FieldValue.serverTimestamp(),lida:false}).then(function(){i.value='';self.mostrarToast('Enviado!','sucesso')});
};

App.prototype.abrirTelaPublicacao = function(){
    if(!this.usuarioLogado||this.usuarioLogado.tipo!=='empreiteiro'){this.mostrarToast('Apenas empreiteiros!','erro');return}
    ['vagaTitulo','vagaDescricao','vagaEndereco'].forEach(function(id){var el=document.getElementById(id);if(el)el.value=''});
    document.getElementById('vagaValorHora').value='';document.getElementById('vagaQuantidade').value='1';
    document.querySelectorAll('#profissoesCheckboxes input').forEach(function(cb){cb.checked=false});
    this.mostrarTela('publicarVagaScreen');
};

App.prototype.publicarVagaApp = function(){
    var self=this,t=(document.getElementById('vagaTitulo')||{}).value||'',e=(document.getElementById('vagaEndereco')||{}).value||'';
    if(!t||!e){this.mostrarToast('Preencha título e endereço!','erro');return}
    var ps=[];document.querySelectorAll('#profissoesCheckboxes input:checked').forEach(function(cb){ps.push(cb.value)});
    this.mostrarToast('Publicando...','info');
    db.collection('vagas').add({titulo:t,descricao:(document.getElementById('vagaDescricao')||{}).value||'',endereco:e,profissoes:ps.join(', ')||'Geral',valorHora:parseFloat((document.getElementById('vagaValorHora')||{}).value)||0,quantidade:parseInt((document.getElementById('vagaQuantidade')||{}).value)||1,usuarioId:this.usuarioLogado.id,interessados:[],dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativa:true}).then(function(){self.mostrarToast('✅ Vaga publicada!','sucesso');setTimeout(function(){self.mostrarTela('homeScreen');self.carregarFeed()},1000)});
};

App.prototype.candidatarVaga = function(vid){
    var self=this;
    if(!this.usuarioLogado||this.usuarioLogado.tipo!=='profissional'){this.mostrarToast('Apenas profissionais!','erro');return}
    db.collection('vagas').doc(vid).get().then(function(doc){if(!doc.exists)return;var v=doc.data();if(!v.interessados)v.interessados=[];if(v.interessados.indexOf(self.usuarioLogado.id)>=0){self.mostrarToast('Já se candidatou!','erro');return}v.interessados.push(self.usuarioLogado.id);db.collection('vagas').doc(vid).update({interessados:v.interessados}).then(function(){self.mostrarToast('Candidatura enviada!','sucesso')})});
};

App.prototype.avaliarUsuario = function(uid){
    var n=prompt('Nota (1-5):');if(!n||isNaN(n)||n<1||n>5)return;
    var c=prompt('Comentário:')||'';var self=this;
    databaseService.avaliarUsuario(this.usuarioLogado.id,uid,parseInt(n),c).then(function(){self.mostrarToast('Avaliação enviada!','sucesso')});
};

App.prototype.mudarTab = function(tab){
    document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});
    event.target.closest('.tab').classList.add('active');
    document.getElementById('feedContainer').style.display=tab==='feed'?'block':'none';
    document.getElementById('redeContainer').style.display=tab==='rede'?'block':'none';
    if(tab==='feed')this.carregarFeed();
    if(tab==='rede')this.carregarRede();
};

App.prototype.mostrarNotificacoes = function(){this.mostrarTela('notificacoesScreen')};

App.prototype.mostrarToast = function(m,t){
    var toast=document.getElementById('toast');if(!toast)return;
    toast.textContent=m;toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';toast.style.display='block';
    clearTimeout(this._tt);this._tt=setTimeout(function(){toast.style.display='none'},3000);
};

document.addEventListener('DOMContentLoaded',function(){window.app=new App();console.log('✅ App pronto!')});
