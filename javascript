// ============================================
// BANCO DE DADOS
// ============================================
function salvarDados(c,d){localStorage.setItem(c,JSON.stringify(d))}
function carregarDados(c){var d=localStorage.getItem(c);return d?JSON.parse(d):null}

var usuarioLogado=carregarDados('usuarioLogado');
var obraSelecionada=null;
var perfilSelecionado=null;
var codigoRecuperacao=null;
var usuarioRecuperando=null;

// DADOS INICIAIS
if(!carregarDados('usuarios')){
salvarDados('usuarios',[
{id:1001,tipo:'profissional',nome:'João Silva',email:'joao@email.com',celular:'(11)99999-0001',cpf:'111.111.111-11',profissao:'pedreiro',experiencia:8,habilidades:'Alvenaria, Revestimento, Concreto',senha:'123456',fotoPerfil:'',avaliacoes:[]},
{id:1002,tipo:'profissional',nome:'Maria Santos',email:'maria@email.com',celular:'(11)99999-0002',cpf:'222.222.222-22',profissao:'pintor',experiencia:5,habilidades:'Pintura, Textura, Grafiato',senha:'123456',fotoPerfil:'',avaliacoes:[]},
{id:2001,tipo:'empreiteiro',nome:'Carlos Obras',email:'carlos@email.com',celular:'(11)99999-0003',cpf:'333.333.333-33',profissao:'',experiencia:15,habilidades:'',senha:'123456',fotoPerfil:''}
])}
if(!carregarDados('obras')){
salvarDados('obras',[
{id:1,usuarioId:2001,nome:'Residencial Parque Verde',endereco:'Rua das Flores, 123 - Jardim América',descricao:'Construção de sobrado com 3 quartos, 2 banheiros e garagem para 2 carros.',profissoes:'Pedreiro, Eletricista, Pintor',valorHora:25,foto:'',data:new Date(Date.now()-2*86400000).toISOString(),interessados:[]},
{id:2,usuarioId:2001,nome:'Reforma Edifício Central',endereco:'Av. Principal, 500 - Centro',descricao:'Reforma completa do hall de entrada e fachada.',profissoes:'Pedreiro, Gesseiro',valorHora:30,foto:'',data:new Date(Date.now()-1*86400000).toISOString(),interessados:[]}
])}
if(!carregarDados('conexoes'))salvarDados('conexoes',[])
if(!carregarDados('mensagens'))salvarDados('mensagens',[])

// ============================================
// NAVEGAÇÃO
// ============================================
function mostrarTela(id){
document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
document.getElementById(id).classList.add('active');
var nav=document.getElementById('bottomNav');
if(nav)nav.style.display=['homeScreen','buscaScreen','publicarObraScreen','perfilScreen'].includes(id)?'flex':'none';
if(id==='homeScreen')carregarFeed();
if(id==='perfilScreen')carregarMeuPerfil();
if(id==='buscaScreen')buscarProfissionais();
}

function mostrarToast(m,t){
var toast=document.getElementById('toast');
if(!toast)return;
toast.textContent=m;
toast.style.background=t==='erro'?'#EF4444':t==='sucesso'?'#10B981':'#1F2937';
toast.style.display='block';
setTimeout(function(){toast.style.display='none'},3000);
}

function fecharModal(id){var m=document.getElementById(id);if(m)m.classList.remove('active');}
function mudarTab(tab,btn){
document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});
btn.classList.add('active');
document.getElementById('feedTab').style.display=tab==='feed'?'block':'none';
document.getElementById('redeTab').style.display=tab==='rede'?'block':'none';
if(tab==='rede')carregarRede();
}
function toggleProfissao(){
var g=document.getElementById('grupoProfissao');
var t=document.getElementById('cadTipo');
if(g&&t)g.style.display=t.value==='profissional'?'block':'none';
}

// ============================================
// LOGIN
// ============================================
function fazerLogin(){
var e=document.getElementById('loginEmail').value.trim();
var s=document.getElementById('loginSenha').value;
if(!e||!s){mostrarToast('Preencha todos os campos!','erro');return;}
var u=(carregarDados('usuarios')||[]).find(function(u){return(u.email===e||u.cpf===e)&&u.senha===s});
if(u){usuarioLogado=u;salvarDados('usuarioLogado',u);mostrarToast('Bem-vindo, '+u.nome+'!','sucesso');setTimeout(function(){mostrarTela('homeScreen')},500)}
else{mostrarToast('E-mail/CPF ou senha inválidos!','erro')}
}

// ============================================
// CADASTRO
// ============================================
function cadastrar(){
var t=document.getElementById('cadTipo').value;
var n=document.getElementById('cadNome').value.trim();
var e=document.getElementById('cadEmail').value.trim();
var c=document.getElementById('cadCelular').value.trim();
var p=document.getElementById('cadCPF').value.trim();
var pr=t==='profissional'?document.getElementById('cadProfissao').value:'';
var ex=document.getElementById('cadExperiencia').value;
var s=document.getElementById('cadSenha').value;
if(!n||!e||!c||!p||!s){mostrarToast('Preencha todos os campos!','erro');return;}
if(s.length<6){mostrarToast('Senha mínima de 6 caracteres!','erro');return;}
var usuarios=carregarDados('usuarios')||[];
if(usuarios.find(function(u){return u.email===e||u.cpf===p})){mostrarToast('E-mail/CPF já cadastrado!','erro');return;}
var novo={id:Date.now(),tipo:t,nome:n,email:e,celular:c,cpf:p,profissao:pr,experiencia:parseInt(ex)||0,habilidades:'',senha:s,fotoPerfil:'',avaliacoes:[]};
usuarios.push(novo);salvarDados('usuarios',usuarios);
usuarioLogado=novo;salvarDados('usuarioLogado',novo);
mostrarToast('Cadastro realizado!','sucesso');setTimeout(function(){mostrarTela('homeScreen')},500);
}

// ============================================
// RECUPERAÇÃO DE SENHA
// ============================================
function recuperarSenha(){
document.getElementById('recuperarPasso1').style.display='block';
document.getElementById('recuperarPasso2').style.display='none';
document.getElementById('recuperarPasso3').style.display='none';
mostrarTela('recuperarSenhaScreen');
}
function enviarCodigoRecuperacao(){
var e=document.getElementById('recEmail').value.trim();
if(!e)return;
var u=(carregarDados('usuarios')||[]).find(function(u){return u.email===e||u.cpf.replace(/\D/g,'')===e.replace(/\D/g,'')});
if(!u){mostrarToast('E-mail/CPF não encontrado!','erro');return;}
codigoRecuperacao=Math.floor(100000+Math.random()*900000).toString();
usuarioRecuperando=u;
alert('Seu código é: '+codigoRecuperacao);
document.getElementById('recuperarPasso1').style.display='none';
document.getElementById('recuperarPasso2').style.display='block';
}
function verificarCodigo(){
if(document.getElementById('recCodigo').value.trim()!==codigoRecuperacao){mostrarToast('Código inválido!','erro');return;}
document.getElementById('recuperarPasso2').style.display='none';
document.getElementById('recuperarPasso3').style.display='block';
}
function criarNovaSenha(){
var n=document.getElementById('recNovaSenha').value;
var c=document.getElementById('recConfirmarSenha').value;
if(!n||n.length<6)return;
if(n!==c){mostrarToast('Senhas não coincidem!','erro');return;}
var usuarios=carregarDados('usuarios')||[];
var i=usuarios.findIndex(function(u){return u.id===usuarioRecuperando.id});
if(i!==-1){usuarios[i].senha=n;salvarDados('usuarios',usuarios);}
mostrarToast('Senha alterada!','sucesso');setTimeout(function(){mostrarTela('loginScreen')},1000);
}

// ============================================
// PERFIL
// ============================================
function carregarMeuPerfil(){
if(!usuarioLogado)return;
document.getElementById('perfilNome').textContent=usuarioLogado.nome;
document.getElementById('perfilProfissao').textContent=usuarioLogado.tipo==='profissional'?(usuarioLogado.profissao||'')+' • '+usuarioLogado.experiencia+' anos':'EMPREITEIRO • '+usuarioLogado.experiencia+' anos';
document.getElementById('editNome').value=usuarioLogado.nome||'';
document.getElementById('editCelular').value=usuarioLogado.celular||'';
document.getElementById('editEmail').value=usuarioLogado.email||'';
document.getElementById('editProfissao').value=usuarioLogado.profissao||'';
document.getElementById('editExperiencia').value=usuarioLogado.experiencia||'';
document.getElementById('editHabilidades').value=usuarioLogado.habilidades||'';
if(usuarioLogado.fotoPerfil){document.getElementById('perfilAvatarImg').src=usuarioLogado.fotoPerfil;document.getElementById('perfilAvatarImg').style.display='block';document.getElementById('perfilAvatarDefault').style.display='none';}
var m=calcularMedia(usuarioLogado.avaliacoes);
document.getElementById('perfilEstrelas').innerHTML=gerarEstrelas(m);
document.getElementById('perfilAvaliacoes').textContent=(usuarioLogado.avaliacoes||[]).length+' avaliações';
}
function calcularMedia(a){if(!a||a.length===0)return 5;return Math.round(a.reduce(function(s,i){return s+i.estrelas},0)/a.length);}
function gerarEstrelas(m){var e='';for(var i=1;i<=5;i++)e+=i<=m?'⭐':'☆';return e;}
function salvarPerfil(){
if(!usuarioLogado)return;
usuarioLogado.nome=document.getElementById('editNome').value.trim();
usuarioLogado.celular=document.getElementById('editCelular').value.trim();
usuarioLogado.email=document.getElementById('editEmail').value.trim();
usuarioLogado.profissao=document.getElementById('editProfissao').value;
usuarioLogado.experiencia=parseInt(document.getElementById('editExperiencia').value)||0;
usuarioLogado.habilidades=document.getElementById('editHabilidades').value.trim();
var usuarios=carregarDados('usuarios')||[];
var i=usuarios.findIndex(function(u){return u.id===usuarioLogado.id});
if(i!==-1){usuarios[i]=usuarioLogado;salvarDados('usuarios',usuarios);}
salvarDados('usuarioLogado',usuarioLogado);
carregarMeuPerfil();
mostrarToast('Perfil atualizado!','sucesso');
}
function mudarFotoPerfil(e){
var f=e.target.files[0];if(!f)return;
var r=new FileReader();
r.onload=function(ev){
document.getElementById('perfilAvatarImg').src=ev.target.result;
document.getElementById('perfilAvatarImg').style.display='block';
document.getElementById('perfilAvatarDefault').style.display='none';
usuarioLogado.fotoPerfil=ev.target.result;salvarDados('usuarioLogado',usuarioLogado);
};r.readAsDataURL(f);
}

// ============================================
// FEED DE OBRAS (CLICÁVEL)
// ============================================
function carregarFeed(){
var obras=carregarDados('obras')||[];
var container=document.getElementById('feedContainer');
if(!container)return;
if(obras.length===0){
container.innerHTML='<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🏗️</div><h3>Nenhuma obra publicada!</h3></div>';
return;
}
var usuarios=carregarDados('usuarios')||[];
container.innerHTML=obras.map(function(obra){
var autor=usuarios.find(function(u){return u.id===obra.usuarioId});
var jaCandidatou=obra.interessados&&obra.interessados.some(function(i){return i.profissionalId===usuarioLogado?.id});
var totalCandidatos=obra.interessados?obra.interessados.length:0;
return '<div class="feed-card" style="cursor:pointer;" onclick="verDetalheObra('+obra.id+')">'+
'<div class="feed-card-header">'+
'<div class="feed-avatar">🏢</div>'+
'<div class="feed-user-info">'+
'<div class="feed-user-name">'+(autor?autor.nome:'Empreiteiro')+'</div>'+
'<div class="feed-time">'+new Date(obra.data).toLocaleDateString('pt-BR')+'</div>'+
'</div></div>'+
'<div class="feed-card-image">🏗️</div>'+
'<div class="feed-card-body">'+
'<div class="feed-card-title">'+obra.nome+'</div>'+
'<p>📍 '+obra.endereco+'</p>'+
'<p>💰 R$ '+obra.valorHora+'/hora</p>'+
'<p>👷 '+(obra.profissoes||'')+'</p>'+
(jaCandidatou?'<span class="badge badge-success">✅ Candidatado</span>':'<span class="badge badge-info">'+totalCandidatos+' candidatos</span>')+
'<p style="font-size:11px;color:#999;margin-top:5px;">👆 Clique para ver detalhes</p>'+
'</div></div>';
}).join('');
}

// ============================================
// DETALHE DA OBRA (NOVA TELA)
// ============================================
function verDetalheObra(obraId){
var obras=carregarDados('obras')||[];
var obra=obras.find(function(o){return o.id===obraId});
if(!obra)return;
obraSelecionada=obra;
var usuarios=carregarDados('usuarios')||[];
var autor=usuarios.find(function(u){return u.id===obra.usuarioId});
var jaCandidatou=obra.interessados&&obra.interessados.some(function(i){return i.profissionalId===usuarioLogado?.id});

var html='<div style="text-align:center;margin-bottom:20px;">'+
'<div style="font-size:60px;">🏗️</div>'+
'<h2 style="color:#1A3A5C;">'+obra.nome+'</h2></div>'+

'<div class="card">'+
'<p><strong>📍 Endereço:</strong> '+obra.endereco+'</p>'+
'<p><strong>📝 Descrição:</strong> '+(obra.descricao||'Não informado')+'</p>'+
'<p><strong>💰 Valor:</strong> R$ '+obra.valorHora+'/hora</p>'+
'<p><strong>👷 Profissões:</strong> '+(obra.profissoes||'Não informado')+'</p>'+
'<p><strong>🏢 Empreiteiro:</strong> '+(autor?autor.nome:'Não informado')+'</p>'+
'<p><strong>📅 Publicado:</strong> '+new Date(obra.data).toLocaleDateString('pt-BR')+'</p>'+
'<p><strong>👥 Candidatos:</strong> '+(obra.interessados?obra.interessados.length:0)+'</p>'+
'</div>';

// Botões de ação
if(usuarioLogado&&usuarioLogado.tipo==='profissional'){
if(jaCandidatou){
html+='<div class="alert-card" style="text-align:center;">✅ Você já se candidatou a esta vaga!</div>';
}else{
html+='<button class="btn btn-primary" onclick="candidatarObra('+obra.id+')">✋ TENHO INTERESSE NESTA VAGA</button>';
}
}

if(usuarioLogado&&usuarioLogado.tipo==='empreiteiro'&&autor&&usuarioLogado.id===autor.id){
html+='<button class="btn btn-outline" onclick="verCandidatosObra('+obra.id+')">👥 Ver Candidatos ('+(obra.interessados?obra.interessados.length:0)+')</button>';
}

html+='<button class="btn btn-outline" onclick="mostrarTela(\'homeScreen\')">← Voltar</button>';

document.getElementById('detalheObraConteudo').innerHTML=html;
mostrarTela('detalheObraScreen');
}

// ============================================
// CANDIDATAR-SE
// ============================================
function candidatarObra(obraId){
if(!usuarioLogado||usuarioLogado.tipo!=='profissional'){mostrarToast('Apenas profissionais podem se candidatar!','erro');return;}
var obras=carregarDados('obras')||[];
var idx=obras.findIndex(function(o){return o.id===obraId});
if(idx===-1)return;
if(!obras[idx].interessados)obras[idx].interessados=[];
if(obras[idx].interessados.find(function(i){return i.profissionalId===usuarioLogado.id})){mostrarToast('Você já se candidatou!','erro');return;}
obras[idx].interessados.push({profissionalId:usuarioLogado.id,data:new Date().toISOString(),status:'pendente'});
salvarDados('obras',obras);
mostrarToast('✅ Candidatura enviada com sucesso!','sucesso');
verDetalheObra(obraId);
}

function verCandidatosObra(obraId){
var obra=(carregarDados('obras')||[]).find(function(o){return o.id===obraId});
if(!obra||!obra.interessados||obra.interessados.length===0){mostrarToast('Nenhum candidato ainda!');return;}
var usuarios=carregarDados('usuarios')||[];
var html='<h3>👥 Candidatos</h3>';
obra.interessados.forEach(function(i){
var p=usuarios.find(function(u){return u.id===i.profissionalId});
if(p){
html+='<div class="card" style="cursor:pointer;" onclick="verPerfilPublico('+p.id+')">'+
'<div style="display:flex;align-items:center;">'+
'<div class="lista-avatar">👷</div>'+
'<div style="margin-left:10px;flex:1;"><strong>'+p.nome+'</strong><br>'+p.profissao+' • '+p.experiencia+' anos</div>'+
'<span class="badge '+(i.status==='pendente'?'badge-info':i.status==='aceito'?'badge-success':'badge-danger')+'">'+(i.status==='pendente'?'⏳ Pendente':i.status==='aceito'?'✅ Aceito':'❌ Recusado')+'</span>'+
'</div>'+
(i.status==='pendente'?'<div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-small btn-success" onclick="event.stopPropagation();aceitarCandidato('+obraId+','+p.id+')">✅ Aceitar</button><button class="btn btn-small btn-outline" onclick="event.stopPropagation();abrirChat('+p.id+')">💬 Conversar</button></div>':'')+
'</div>';
}
});
var modal=document.createElement('div');modal.className='modal active';modal.id='modalCandidatos';
modal.innerHTML='<div class="modal-content">'+html+'<button class="btn btn-outline" onclick="document.getElementById(\'modalCandidatos\').remove()">Fechar</button></div>';
document.body.appendChild(modal);
}

function aceitarCandidato(obraId,profId){
var obras=carregarDados('obras')||[];
var obra=obras.find(function(o){return o.id===obraId});
if(!obra)return;
var interessado=obra.interessados.find(function(i){return i.profissionalId===profId});
if(interessado)interessado.status='aceito';
salvarDados('obras',obras);
var modal=document.getElementById('modalCandidatos');if(modal)modal.remove();
mostrarToast('✅ Candidato aceito!','sucesso');
}

// ============================================
// PERFIL PÚBLICO (CLICÁVEL)
// ============================================
function verPerfilPublico(userId){
var usuarios=carregarDados('usuarios')||[];
var user=usuarios.find(function(u){return u.id===userId});
if(!user)return;
perfilSelecionado=user;
var m=calcularMedia(user.avaliacoes);
var html='<div class="profile-header">'+
'<div class="profile-avatar">'+(user.fotoPerfil?'<img src="'+user.fotoPerfil+'">':'<span>👷</span>')+'</div>'+
'<h2 style="color:#1A3A5C;margin-top:15px;">'+user.nome+'</h2>'+
'<p style="color:#F47920;">'+user.profissao+' • '+user.experiencia+' anos</p>'+
'<div class="stars">'+gerarEstrelas(m)+'</div>'+
'<p>'+((user.avaliacoes||[]).length)+' avaliações</p>'+
'</div>'+
'<div class="card"><h3>📞 Contato</h3><p>📱 '+user.celular+'</p><p>📧 '+user.email+'</p></div>'+
'<div class="card"><h3>🛠️ Habilidades</h3><p>'+(user.habilidades||'Não informado')+'</p></div>';

if(usuarioLogado&&usuarioLogado.id!==user.id){
html+='<button class="btn btn-primary" onclick="abrirChat('+user.id+')">💬 CONVERSAR</button>';
if(usuarioLogado.tipo==='empreiteiro'){
html+='<button class="btn btn-success" onclick="contratarProfissional('+user.id+')">🤝 CONTRATAR</button>';
}
}

html+='<button class="btn btn-outline" onclick="mostrarTela(\'homeScreen\')">← Voltar</button>';
document.getElementById('perfilPublicoConteudo').innerHTML=html;
mostrarTela('perfilPublicoScreen');
}

// ============================================
// CHAT / CONVERSA
// ============================================
function abrirChat(userId){
var usuarios=carregarDados('usuarios')||[];
var user=usuarios.find(function(u){return u.id===userId});
if(!user)return;
perfilSelecionado=user;
document.getElementById('modalChatInfo').innerHTML='<div style="display:flex;align-items:center;margin-bottom:15px;"><div class="lista-avatar">👷</div><div style="margin-left:10px;"><strong>'+user.nome+'</strong><br>'+user.profissao+' • '+user.experiencia+' anos<br>📱 '+user.celular+'</div></div>';
document.getElementById('chatMensagem').value='Olá '+user.nome.split(' ')[0]+'! Tenho interesse no seu trabalho.';
document.getElementById('modalChat').classList.add('active');
}

function enviarMensagem(){
if(!perfilSelecionado||!usuarioLogado)return;
var msg=document.getElementById('chatMensagem').value.trim();
if(!msg){mostrarToast('Digite uma mensagem!','erro');return;}
var mensagens=carregarDados('mensagens')||[];
mensagens.push({de:usuarioLogado.id,para:perfilSelecionado.id,mensagem:msg,data:new Date().toISOString()});
salvarDados('mensagens',mensagens);
mostrarToast('✅ Mensagem enviada para '+perfilSelecionado.nome+'!','sucesso');
fecharModal('modalChat');
}

function contratarPeloChat(){
if(!perfilSelecionado||!usuarioLogado||usuarioLogado.tipo!=='empreiteiro')return;
fecharModal('modalChat');
contratarProfissional(perfilSelecionado.id);
}

function contratarProfissional(profId){
if(!usuarioLogado||usuarioLogado.tipo!=='empreiteiro')return;
var usuarios=carregarDados('usuarios')||[];
var prof=usuarios.find(function(u){return u.id===profId});
if(!prof)return;
var obra=prompt('Nome da obra:','Obra');
var valor=prompt('Valor por hora (R$):','25');
if(!obra||!valor)return;
var conexoes=carregarDados('conexoes')||[];
conexoes.push({id:Date.now(),profissionalId:prof.id,empreiteiroId:usuarioLogado.id,obra:obra,valorHora:parseFloat(valor),dataInicio:new Date().toISOString(),ativa:true});
salvarDados('conexoes',conexoes);
mostrarToast('🤝 '+prof.nome+' contratado com sucesso!','sucesso');
}

// ============================================
// BUSCA (COM PERFIL CLICÁVEL)
// ============================================
function buscarProfissionais(){
var termo=(document.getElementById('buscaInput')?.value||'').toLowerCase();
var profissionais=(carregarDados('usuarios')||[]).filter(function(u){return u.tipo==='profissional'&&(!termo||u.nome.toLowerCase().includes(termo)||u.profissao.toLowerCase().includes(termo))});
var c=document.getElementById('buscaResultados');
if(!c)return;
if(profissionais.length===0){c.innerHTML='<p style="text-align:center;color:#999;padding:30px;">Nenhum profissional encontrado.</p>';return;}
c.innerHTML=profissionais.map(function(p){
return'<div class="card" style="cursor:pointer;" onclick="verPerfilPublico('+p.id+')">'+
'<div style="display:flex;align-items:center;">'+
'<div class="lista-avatar">👷</div>'+
'<div style="margin-left:14px;flex:1;">'+
'<div class="lista-nome">'+p.nome+'</div>'+
'<div class="lista-detalhe">'+p.profissao+' • '+p.experiencia+' anos</div>'+
'<div style="color:#FBBF24;">'+gerarEstrelas(calcularMedia(p.avaliacoes))+'</div>'+
'</div></div>'+
'<p style="font-size:11px;color:#999;margin-top:8px;">👆 Clique para ver perfil completo</p>'+
'</div>';
}).join('');
}

// ============================================
// OUTRAS FUNÇÕES
// ============================================
function carregarRede(){
var c=document.getElementById('redeContainer');
if(!c)return;
var conexoes=carregarDados('conexoes')||[];
var usuarios=carregarDados('usuarios')||[];
var minhas=conexoes.filter(function(con){return con.profissionalId===usuarioLogado?.id||con.empreiteiroId===usuarioLogado?.id});
if(minhas.length===0){c.innerHTML='<div class="card" style="text-align:center;padding:40px;"><h3>🔗 Nenhuma conexão</h3></div>';return;}
c.innerHTML=minhas.map(function(con){
var outroId=usuarioLogado.id===con.profissionalId?con.empreiteiroId:con.profissionalId;
var outro=usuarios.find(function(u){return u.id===outroId});
return'<div class="card conexao-card '+(con.ativa?'':'desconectado')+'" style="cursor:pointer;" onclick="verPerfilPublico('+outroId+')"><strong>'+(outro?outro.nome:'Usuário')+'</strong> <span class="badge '+(con.ativa?'badge-success':'badge-danger')+'">'+(con.ativa?'🟢 Ativo':'🔴 Encerrado')+'</span><br>🏗️ '+con.obra+' • 💰 R$'+con.valorHora+'/h</div>';
}).join('');
}

function publicarObra(){
if(!usuarioLogado||usuarioLogado.tipo!=='empreiteiro'){mostrarToast('Apenas empreiteiros!','erro');return;}
var n=document.getElementById('obraNome').value.trim();
var e=document.getElementById('obraEndereco').value.trim();
if(!n||!e){mostrarToast('Nome e endereço obrigatórios!','erro');return;}
var obras=carregarDados('obras')||[];
obras.unshift({id:Date.now(),usuarioId:usuarioLogado.id,nome:n,endereco:e,descricao:document.getElementById('obraDescricao').value,profissoes:document.getElementById('obraProfissoes').value,valorHora:parseFloat(document.getElementById('obraValorHora').value)||25,foto:'',data:new Date().toISOString(),interessados:[]});
salvarDados('obras',obras);
mostrarToast('✅ Obra publicada!','sucesso');mostrarTela('homeScreen');
}

function sair(){usuarioLogado=null;salvarDados('usuarioLogado',null);mostrarTela('loginScreen');mostrarToast('👋 Até logo!');}

// INICIAR
if(usuarioLogado)mostrarTela('homeScreen');
console.log('✅ LPXCONSTRUTOR ATUALIZADO!');
console.log('👆 Clique nas obras para se candidatar!');
console.log('👆 Clique nos profissionais para ver perfil!');
