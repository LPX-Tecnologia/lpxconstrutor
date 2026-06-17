// ============================================
// LPXCONSTRUTOR - JAVASCRIPT COMPLETO
// ============================================

function salvarDados(chave, dados) { localStorage.setItem(chave, JSON.stringify(dados)); }
function carregarDados(chave) { const d = localStorage.getItem(chave); return d ? JSON.parse(d) : null; }

let usuarioLogado = carregarDados('usuarioLogado');
let profissionalSelecionado = null;
let tabAtual = 'feed';
let codigoRecuperacao = null;
let usuarioRecuperando = null;
let timerReenvio = null;

// INICIALIZAÇÃO
function inicializarDados() {
    if (!carregarDados('usuarios')) {
        salvarDados('usuarios', [
            { id: 1001, tipo: 'profissional', nome: 'João Silva', email: 'joao@email.com', celular: '(11) 99999-0001', cpf: '111.111.111-11', profissao: 'pedreiro', experiencia: 8, habilidades: 'Alvenaria, Revestimento', senha: '123456', fotoPerfil: '', avaliacoes: [], conexoes: [], historicoTrabalhos: [] },
            { id: 1002, tipo: 'profissional', nome: 'Maria Santos', email: 'maria@email.com', celular: '(11) 99999-0002', cpf: '222.222.222-22', profissao: 'pintor', experiencia: 5, habilidades: 'Pintura, Textura', senha: '123456', fotoPerfil: '', avaliacoes: [], conexoes: [], historicoTrabalhos: [] },
            { id: 2001, tipo: 'empreiteiro', nome: 'Carlos Obras', email: 'carlos@email.com', celular: '(11) 99999-0003', cpf: '333.333.333-33', profissao: '', experiencia: 15, habilidades: '', senha: '123456', fotoPerfil: '', avaliacoes: [], conexoes: [], historicoTrabalhos: [] }
        ]);
    }
    if (!carregarDados('conexoes')) salvarDados('conexoes', []);
    if (!carregarDados('obras')) {
        salvarDados('obras', [
            { id: 1, usuarioId: 2001, nome: 'Residencial Parque Verde', endereco: 'Rua das Flores, 123', descricao: 'Construção de sobrado com 3 quartos.', profissoes: 'Pedreiro, Eletricista', valorHora: 25, foto: '', data: new Date().toISOString(), interessados: [] }
        ]);
    }
}
inicializarDados();

// NAVEGAÇÃO
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = ['homeScreen','buscaScreen','publicarObraScreen','perfilScreen'].includes(id) ? 'flex' : 'none';
    document.querySelectorAll('.nav-item').forEach((item, i) => {
        item.classList.remove('active');
        if (id === 'homeScreen' && i === 0) item.classList.add('active');
        if (id === 'buscaScreen' && i === 1) item.classList.add('active');
        if (id === 'publicarObraScreen' && i === 2) item.classList.add('active');
        if (id === 'perfilScreen' && i === 3) item.classList.add('active');
    });
    if (id === 'homeScreen') { carregarFeed(); carregarRede(); }
    if (id === 'perfilScreen') carregarMeuPerfil();
    if (id === 'buscaScreen') buscarProfissionais();
}

function mostrarToast(msg, tipo) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1F2937';
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 3000);
}

function fecharModal(id) { document.getElementById(id).classList.remove('active'); }

function mudarTab(tab, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('feedTab').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeTab').style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'rede') carregarRede();
}

function toggleProfissao() {
    document.getElementById('grupoProfissao').style.display = document.getElementById('cadTipo').value === 'profissional' ? 'block' : 'none';
}

// LOGIN
function fazerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    if (!email || !senha) { mostrarToast('Preencha todos os campos!', 'erro'); return; }
    const usuario = (carregarDados('usuarios')||[]).find(u => (u.email === email || u.cpf === email) && u.senha === senha);
    if (usuario) { usuarioLogado = usuario; salvarDados('usuarioLogado', usuario); mostrarToast('Bem-vindo, ' + usuario.nome + '!', 'sucesso'); setTimeout(() => mostrarTela('homeScreen'), 500); }
    else { mostrarToast('E-mail/CPF ou senha inválidos!', 'erro'); }
}

// CADASTRO
function cadastrar() {
    const tipo = document.getElementById('cadTipo').value;
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim();
    const celular = document.getElementById('cadCelular').value.trim();
    const cpf = document.getElementById('cadCPF').value.trim();
    const profissao = tipo === 'profissional' ? document.getElementById('cadProfissao').value : '';
    const experiencia = document.getElementById('cadExperiencia').value;
    const senha = document.getElementById('cadSenha').value;
    if (!nome || !email || !celular || !cpf || !senha) { mostrarToast('Preencha todos os campos!', 'erro'); return; }
    if (tipo === 'profissional' && !profissao) { mostrarToast('Selecione sua profissão!', 'erro'); return; }
    if (senha.length < 6) { mostrarToast('Senha mínima de 6 caracteres!', 'erro'); return; }
    const usuarios = carregarDados('usuarios') || [];
    if (usuarios.find(u => u.email === email || u.cpf === cpf)) { mostrarToast('E-mail ou CPF já cadastrado!', 'erro'); return; }
    const novo = { id: Date.now(), tipo, nome, email, celular, cpf, profissao, experiencia: parseInt(experiencia)||0, habilidades: '', senha, fotoPerfil: '', avaliacoes: [], conexoes: [], historicoTrabalhos: [] };
    usuarios.push(novo); salvarDados('usuarios', usuarios);
    usuarioLogado = novo; salvarDados('usuarioLogado', novo);
    mostrarToast('Cadastro realizado!', 'sucesso'); setTimeout(() => mostrarTela('homeScreen'), 500);
}

// RECUPERAÇÃO DE SENHA
function recuperarSenha() {
    codigoRecuperacao = null; usuarioRecuperando = null;
    ['recEmail','recCodigo','recNovaSenha','recConfirmarSenha'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('recuperarPasso1').style.display = 'block';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'none';
    if (timerReenvio) clearInterval(timerReenvio);
    mostrarTela('recuperarSenhaScreen');
}

function enviarCodigoRecuperacao() {
    const emailOuCPF = document.getElementById('recEmail').value.trim();
    if (!emailOuCPF) { mostrarToast('Digite seu e-mail ou CPF!', 'erro'); return; }
    const usuario = (carregarDados('usuarios')||[]).find(u => u.email === emailOuCPF || u.cpf.replace(/\D/g,'') === emailOuCPF.replace(/\D/g,''));
    if (!usuario) { mostrarToast('E-mail/CPF não encontrado!', 'erro'); return; }
    codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    usuarioRecuperando = usuario;
    const recuperacoes = carregarDados('recuperacoes') || [];
    recuperacoes.push({ usuarioId: usuario.id, codigo: codigoRecuperacao, dataExpiracao: new Date(Date.now()+10*60*1000).toISOString(), usado: false });
    salvarDados('recuperacoes', recuperacoes);
    document.getElementById('recMensagemEnvio').innerHTML = 'Código enviado para:<br><strong>' + (document.getElementById('recMetodo').value === 'email' ? '📧 '+usuario.email : '📱 '+usuario.celular) + '</strong>';
    console.log('CÓDIGO: ' + codigoRecuperacao);
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'block';
    mostrarToast('Código enviado!', 'sucesso');
}

function verificarCodigo() {
    const digitado = document.getElementById('recCodigo').value.trim();
    if (!digitado || digitado.length !== 6) { mostrarToast('Digite o código de 6 dígitos!', 'erro'); return; }
    if (digitado !== codigoRecuperacao) { mostrarToast('Código inválido!', 'erro'); return; }
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'block';
    mostrarToast('Código verificado!', 'sucesso');
}

function criarNovaSenha() {
    const nova = document.getElementById('recNovaSenha').value;
    const conf = document.getElementById('recConfirmarSenha').value;
    if (!nova || nova.length < 6) { mostrarToast('Senha mínima de 6 caracteres!', 'erro'); return; }
    if (nova !== conf) { mostrarToast('Senhas não coincidem!', 'erro'); return; }
    const usuarios = carregarDados('usuarios') || [];
    const idx = usuarios.findIndex(u => u.id === usuarioRecuperando.id);
    if (idx !== -1) { usuarios[idx].senha = nova; salvarDados('usuarios', usuarios); document.getElementById('modalSucesso').classList.add('active'); }
}

// PERFIL
function carregarMeuPerfil() {
    if (!usuarioLogado) return;
    const users = carregarDados('usuarios') || [];
    const u = users.find(x => x.id === usuarioLogado.id);
    if (u) { usuarioLogado = u; salvarDados('usuarioLogado', u); }
    document.getElementById('perfilNome').textContent = usuarioLogado.nome;
    document.getElementById('perfilProfissao').textContent = usuarioLogado.tipo === 'profissional' ? (usuarioLogado.profissao||'') + ' • ' + usuarioLogado.experiencia + ' anos' : 'EMPREITEIRO • ' + usuarioLogado.experiencia + ' anos';
    document.getElementById('editNome').value = usuarioLogado.nome || '';
    document.getElementById('editCelular').value = usuarioLogado.celular || '';
    document.getElementById('editEmail').value = usuarioLogado.email || '';
    document.getElementById('editProfissao').value = usuarioLogado.profissao || '';
    document.getElementById('editExperiencia').value = usuarioLogado.experiencia || '';
    document.getElementById('editHabilidades').value = usuarioLogado.habilidades || '';
    if (usuarioLogado.fotoPerfil) { document.getElementById('perfilAvatarImg').src = usuarioLogado.fotoPerfil; document.getElementById('perfilAvatarImg').style.display = 'block'; document.getElementById('perfilAvatarDefault').style.display = 'none'; }
    document.getElementById('perfilEstrelas').innerHTML = gerarEstrelas(calcularMedia(usuarioLogado.avaliacoes));
    document.getElementById('perfilAvaliacoes').textContent = (usuarioLogado.avaliacoes||[]).length + ' avaliações';
}

function calcularMedia(av) { if (!av || av.length === 0) return 5; return Math.round(av.reduce((a,b) => a + b.estrelas, 0) / av.length); }
function gerarEstrelas(m) { let e = ''; for (let i=1; i<=5; i++) e += i <= m ? '⭐' : '☆'; return e; }

function salvarPerfil() {
    if (!usuarioLogado) return;
    usuarioLogado.nome = document.getElementById('editNome').value.trim();
    usuarioLogado.celular = document.getElementById('editCelular').value.trim();
    usuarioLogado.email = document.getElementById('editEmail').value.trim();
    usuarioLogado.profissao = document.getElementById('editProfissao').value;
    usuarioLogado.experiencia = parseInt(document.getElementById('editExperiencia').value) || 0;
    usuarioLogado.habilidades = document.getElementById('editHabilidades').value.trim();
    const usuarios = carregarDados('usuarios') || [];
    const idx = usuarios.findIndex(u => u.id === usuarioLogado.id);
    if (idx !== -1) { usuarios[idx] = usuarioLogado; salvarDados('usuarios', usuarios); }
    salvarDados('usuarioLogado', usuarioLogado);
    carregarMeuPerfil();
    mostrarToast('Perfil atualizado!', 'sucesso');
}

function mudarFotoPerfil(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        document.getElementById('perfilAvatarImg').src = ev.target.result;
        document.getElementById('perfilAvatarImg').style.display = 'block';
        document.getElementById('perfilAvatarDefault').style.display = 'none';
        usuarioLogado.fotoPerfil = ev.target.result;
        salvarDados('usuarioLogado', usuarioLogado);
        const usuarios = carregarDados('usuarios') || [];
        const idx = usuarios.findIndex(u => u.id === usuarioLogado.id);
        if (idx !== -1) { usuarios[idx] = usuarioLogado; salvarDados('usuarios', usuarios); }
    };
    reader.readAsDataURL(file);
}

// REDE
function carregarRede() {
    const container = document.getElementById('redeContainer');
    if (!usuarioLogado) return;
    const conexoes = carregarDados('conexoes') || [];
    const usuarios = carregarDados('usuarios') || [];
    const minhas = conexoes.filter(c => c.profissionalId === usuarioLogado.id || c.empreiteiroId === usuarioLogado.id);
    if (minhas.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🔗</div><h3>Nenhuma conexão!</h3></div>';
        return;
    }
    container.innerHTML = minhas.map(c => {
        const outro = usuarios.find(u => u.id === (usuarioLogado.id === c.profissionalId ? c.empreiteiroId : c.profissionalId));
        return `<div class="card conexao-card ${c.ativa?'':'desconectado'}"><strong>${outro?.nome||'Usuário'}</strong> <span class="badge ${c.ativa?'badge-success':'badge-danger'}">${c.ativa?'🟢 Ativo':'🔴 Encerrado'}</span><div>🏗️ ${c.obra} • 💰 R$${c.valorHora}/h</div>${c.ativa && usuarioLogado.tipo==='empreiteiro'?`<button class="btn btn-small btn-danger" onclick="abrirDemissao(${c.id})">⚠️ Encerrar</button>`:''}</div>`;
    }).join('');
}

// CONTRATAÇÃO
function contratarProfissional(pid) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') return;
    profissionalSelecionado = (carregarDados('usuarios')||[]).find(u => u.id === pid);
    if (!profissionalSelecionado) return;
    document.getElementById('modalContratarInfo').innerHTML = `<strong>${profissionalSelecionado.nome}</strong><div>${profissionalSelecionado.profissao}</div>`;
    document.getElementById('modalContratar').classList.add('active');
}

function confirmarContratacao() {
    if (!profissionalSelecionado) return;
    const obra = document.getElementById('contratarObra').value.trim();
    const valor = document.getElementById('contratarValor').value;
    if (!obra || !valor) { mostrarToast('Preencha obra e valor!', 'erro'); return; }
    const conexoes = carregarDados('conexoes') || [];
    conexoes.push({ id: Date.now(), profissionalId: profissionalSelecionado.id, empreiteiroId: usuarioLogado.id, obra, valorHora: parseFloat(valor), dataPagamento: document.getElementById('contratarDataPagamento').value, dataInicio: new Date().toISOString(), dataFim: null, ativa: true, motivoEncerramento: '', estrelas: 0, pontosFortes: '', pontosFracos: '' });
    salvarDados('conexoes', conexoes);
    fecharModal('modalContratar');
    mostrarToast('Contratado!', 'sucesso');
    carregarRede();
}

function abrirDemissao(cid) {
    const conexao = (carregarDados('conexoes')||[]).find(c => c.id === cid);
    if (!conexao) return;
    document.getElementById('modalDemitir').setAttribute('data-conexao-id', cid);
    document.getElementById('modalDemitir').classList.add('active');
}

function confirmarDemissao() {
    const cid = parseInt(document.getElementById('modalDemitir').getAttribute('data-conexao-id'));
    const conexoes = carregarDados('conexoes') || [];
    const idx = conexoes.findIndex(c => c.id === cid);
    if (idx === -1) return;
    conexoes[idx].ativa = false;
    conexoes[idx].dataFim = new Date().toISOString();
    conexoes[idx].estrelas = parseInt(document.getElementById('demitirEstrelas').value);
    conexoes[idx].pontosFracos = document.getElementById('demitirMelhorar').value;
    conexoes[idx].pontosFortes = document.getElementById('demitirPontosFortes').value;
    salvarDados('conexoes', conexoes);
    fecharModal('modalDemitir');
    mostrarToast('Contrato encerrado!', 'sucesso');
    carregarRede();
}

// BUSCA
function buscarProfissionais() {
    const termo = (document.getElementById('buscaInput')?.value || '').toLowerCase();
    const profissionais = (carregarDados('usuarios')||[]).filter(u => u.tipo === 'profissional' && (!termo || u.nome.toLowerCase().includes(termo) || u.profissao.toLowerCase().includes(termo)));
    document.getElementById('buscaResultados').innerHTML = profissionais.length === 0 ? '<p style="text-align:center;color:#999;">Nenhum encontrado.</p>' : profissionais.map(p => `<div class="card"><div class="lista-nome">${p.nome}</div><div class="lista-detalhe">${p.profissao} • ${p.experiencia} anos</div>${usuarioLogado?.tipo==='empreiteiro'?`<button class="btn btn-small btn-success" onclick="contratarProfissional(${p.id})">🤝 Contratar</button>`:''}</div>`).join('');
}

// FEED
function carregarFeed() {
    const obras = carregarDados('obras') || [];
    const usuarios = carregarDados('usuarios') || [];
    const container = document.getElementById('feedContainer');
    if (obras.length === 0) { container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div style="font-size:60px;">🏗️</div><h3>Nenhuma obra!</h3></div>'; carregarAlertas(); return; }
    container.innerHTML = obras.map(obra => {
        const autor = usuarios.find(u => u.id === obra.usuarioId);
        const jaCandidatou = obra.interessados?.some(i => i.profissionalId === usuarioLogado?.id);
        const souDono = usuarioLogado?.id === obra.usuarioId;
        return `<div class="feed-card"><div class="feed-card-header"><div class="feed-avatar">🏢</div><div class="feed-user-info"><div class="feed-user-name">${autor?.nome||'Empreiteiro'}</div><div class="feed-time">${new Date(obra.data).toLocaleDateString('pt-BR')}</div></div></div><div class="feed-card-image">🏗️</div><div class="feed-card-body"><div class="feed-card-title">${obra.nome}</div><p>📍 ${obra.endereco}</p><p>💰 R$${obra.valorHora}/h</p>${!souDono && usuarioLogado?.tipo==='profissional' ? (jaCandidatou ? '<p style="color:#10B981;">✅ Candidatura Enviada!</p>' : `<button class="btn btn-primary" onclick="candidatarObra(${obra.id})">✋ TENHO INTERESSE</button>`) : ''}${souDono ? `<button class="btn btn-small btn-primary" onclick="verCandidatos(${obra.id})">👥 ${(obra.interessados||[]).length} candidatos</button>` : ''}</div></div>`;
    }).join('');
    carregarAlertas();
}

function candidatarObra(oid) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'profissional') return;
    const obras = carregarDados('obras') || [];
    const obra = obras.find(o => o.id === oid);
    if (!obra) return;
    if (!obra.interessados) obra.interessados = [];
    if (obra.interessados.find(i => i.profissionalId === usuarioLogado.id)) { mostrarToast('Já se candidatou!', 'erro'); return; }
    obra.interessados.push({ profissionalId: usuarioLogado.id, data: new Date().toISOString(), status: 'pendente' });
    salvarDados('obras', obras);
    carregarFeed();
    mostrarToast('Candidatura enviada!', 'sucesso');
}

function verCandidatos(oid) {
    const obra = (carregarDados('obras')||[]).find(o => o.id === oid);
    if (!obra) return;
    const usuarios = carregarDados('usuarios') || [];
    const interessados = obra.interessados || [];
    if (interessados.length === 0) { mostrarToast('Nenhum candidato ainda!'); return; }
    let html = interessados.map(i => {
        const p = usuarios.find(u => u.id === i.profissionalId);
        return `<div class="card"><strong>${p?.nome||'Profissional'}</strong> - ${p?.profissao||''} ${i.status==='pendente'?`<button class="btn btn-small btn-success" onclick="aceitarCandidato(${oid},${p.id})">✅ Aceitar</button>`:''}</div>`;
    }).join('');
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `<div class="modal-content"><h3>Candidatos</h3>${html}<button class="btn btn-outline" onclick="this.parentElement.parentElement.remove()">Fechar</button></div>`;
    document.body.appendChild(modal);
}

function aceitarCandidato(oid, pid) {
    const obras = carregarDados('obras') || [];
    const obra = obras.find(o => o.id === oid);
    if (!obra) return;
    const interessado = obra.interessados.find(i => i.profissionalId === pid);
    if (interessado) interessado.status = 'aceito';
    salvarDados('obras', obras);
    document.querySelectorAll('.modal').forEach(m => m.remove());
    contratarProfissional(pid);
    document.getElementById('contratarObra').value = obra.nome;
    document.getElementById('contratarValor').value = obra.valorHora || '';
    mostrarToast('Candidato aceito!', 'sucesso');
}

function previewFotoObra(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) { document.getElementById('obraPreview').src = ev.target.result; document.getElementById('obraPreview').style.display = 'block'; };
    reader.readAsDataURL(file);
}

function publicarObra() {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') return;
    const nome = document.getElementById('obraNome').value.trim();
    const endereco = document.getElementById('obraEndereco').value.trim();
    if (!nome || !endereco) { mostrarToast('Nome e endereço obrigatórios!', 'erro'); return; }
    const obras = carregarDados('obras') || [];
    obras.unshift({ id: Date.now(), usuarioId: usuarioLogado.id, nome, endereco, descricao: document.getElementById('obraDescricao').value, profissoes: document.getElementById('obraProfissoes').value, valorHora: parseFloat(document.getElementById('obraValorHora').value)||0, foto: document.getElementById('obraPreview').src||'', data: new Date().toISOString(), interessados: [] });
    salvarDados('obras', obras);
    ['obraNome','obraEndereco','obraDescricao','obraProfissoes','obraValorHora'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('obraPreview').style.display = 'none';
    mostrarToast('Obra publicada!', 'sucesso');
    mostrarTela('homeScreen');
}

// ALERTAS
function carregarAlertas() {
    const container = document.getElementById('alertasContainer');
    if (!usuarioLogado) { container.innerHTML = ''; return; }
    const conexoes = carregarDados('conexoes') || [];
    const usuarios = carregarDados('usuarios') || [];
    let html = '';
    const minhas = conexoes.filter(c => (usuarioLogado.tipo==='profissional'?c.profissionalId:c.empreiteiroId) === usuarioLogado.id && c.ativa);
    if (minhas.length === 0) {
        html = '<div class="alert-card" style="background:#3B82F6;">📋 Nenhum contrato ativo</div>';
    } else {
        minhas.forEach(c => {
            if (c.dataPagamento) {
                const diff = Math.ceil((new Date(c.dataPagamento+'T00:00:00') - new Date())/(1000*60*60*24));
                const outro = usuarios.find(u => u.id === (usuarioLogado.tipo==='profissional'?c.empreiteiroId:c.profissionalId));
                if (diff < 0) html += `<div class="alert-card alert-danger">🚨 ATRASADO ${Math.abs(diff)} dias!<br>${outro?.nome}<br>💰 R$ ${(c.valorHora*160).toFixed(2)}</div>`;
                else if (diff === 0) html += `<div class="alert-card">💰 HOJE É DIA!<br>${outro?.nome}<br>💰 R$ ${(c.valorHora*160).toFixed(2)}</div>`;
                else if (diff <= 3) html += `<div class="alert-card alert-warning">📅 Faltam ${diff} dias!<br>${outro?.nome}<br>💰 R$ ${(c.valorHora*160).toFixed(2)}</div>`;
            }
        });
    }
    container.innerHTML = html || '';
}

function sair() { if (confirm('Sair?')) { usuarioLogado = null; salvarDados('usuarioLogado', null); mostrarTela('loginScreen'); } }

if (usuarioLogado) mostrarTela('homeScreen');
console.log('✅ LPXCONSTRUTOR PRONTO!');
console.log('👷 joao@email.com / 123456');
console.log('🏢 carlos@email.com / 123456');
