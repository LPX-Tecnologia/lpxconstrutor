// ============================================
// LPXCONSTRUTOR - JAVASCRIPT COMPLETO
// ============================================

function salvarDados(chave, dados) { localStorage.setItem(chave, JSON.stringify(dados)); }
function carregarDados(chave) { const d = localStorage.getItem(chave); return d ? JSON.parse(d) : null; }

let usuarioLogado = carregarDados('usuarioLogado');
let profissionalSelecionado = null;
let codigoRecuperacao = null;
let usuarioRecuperando = null;

// INICIALIZAÇÃO
if (!carregarDados('usuarios')) {
    salvarDados('usuarios', [
        { id: 1001, tipo: 'profissional', nome: 'João Silva', email: 'joao@email.com', celular: '(11) 99999-0001', cpf: '111.111.111-11', profissao: 'pedreiro', experiencia: 8, senha: '123456', fotoPerfil: '', avaliacoes: [], conexoes: [] },
        { id: 2001, tipo: 'empreiteiro', nome: 'Carlos Obras', email: 'carlos@email.com', celular: '(11) 99999-0003', cpf: '333.333.333-33', profissao: '', experiencia: 15, senha: '123456', fotoPerfil: '', avaliacoes: [], conexoes: [] }
    ]);
}
if (!carregarDados('conexoes')) salvarDados('conexoes', []);
if (!carregarDados('obras')) {
    salvarDados('obras', [
        { id: 1, usuarioId: 2001, nome: 'Residencial Parque Verde', endereco: 'Rua das Flores, 123', profissoes: 'Pedreiro, Eletricista', valorHora: 25, data: new Date().toISOString(), interessados: [] }
    ]);
}

// NAVEGAÇÃO
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = ['homeScreen','buscaScreen','publicarObraScreen','perfilScreen'].includes(id) ? 'flex' : 'none';
    if (id === 'homeScreen') carregarFeed();
    if (id === 'perfilScreen') carregarMeuPerfil();
    if (id === 'buscaScreen') buscarProfissionais();
}

function mostrarToast(msg, tipo) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.style.background = tipo === 'erro' ? '#EF4444' : tipo === 'sucesso' ? '#10B981' : '#1F2937';
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function fecharModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('active'); }

function toggleProfissao() {
    const g = document.getElementById('grupoProfissao');
    const t = document.getElementById('cadTipo');
    if (g && t) g.style.display = t.value === 'profissional' ? 'block' : 'none';
}

function mudarTab(tab, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('feedTab').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeTab').style.display = tab === 'rede' ? 'block' : 'none';
}

// LOGIN
function fazerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    if (!email || !senha) { mostrarToast('Preencha todos os campos!', 'erro'); return; }
    const usuario = (carregarDados('usuarios')||[]).find(u => (u.email === email || u.cpf === email) && u.senha === senha);
    if (usuario) { 
        usuarioLogado = usuario; salvarDados('usuarioLogado', usuario); 
        mostrarToast('Bem-vindo, ' + usuario.nome + '!', 'sucesso'); 
        setTimeout(() => mostrarTela('homeScreen'), 500); 
    } else { mostrarToast('E-mail/CPF ou senha inválidos!', 'erro'); }
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
    if (senha.length < 6) { mostrarToast('Senha mínima de 6 caracteres!', 'erro'); return; }
    const usuarios = carregarDados('usuarios') || [];
    if (usuarios.find(u => u.email === email || u.cpf === cpf)) { mostrarToast('E-mail ou CPF já cadastrado!', 'erro'); return; }
    const novo = { id: Date.now(), tipo, nome, email, celular, cpf, profissao, experiencia: parseInt(experiencia)||0, senha, fotoPerfil: '', avaliacoes: [], conexoes: [] };
    usuarios.push(novo); salvarDados('usuarios', usuarios);
    usuarioLogado = novo; salvarDados('usuarioLogado', novo);
    mostrarToast('Cadastro realizado!', 'sucesso'); 
    setTimeout(() => mostrarTela('homeScreen'), 500);
}

// RECUPERAÇÃO DE SENHA
function recuperarSenha() {
    document.getElementById('recuperarPasso1').style.display = 'block';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'none';
    mostrarTela('recuperarSenhaScreen');
}

function enviarCodigoRecuperacao() {
    const emailOuCPF = document.getElementById('recEmail').value.trim();
    if (!emailOuCPF) return;
    const usuario = (carregarDados('usuarios')||[]).find(u => u.email === emailOuCPF || u.cpf.replace(/\D/g,'') === emailOuCPF.replace(/\D/g,''));
    if (!usuario) { mostrarToast('E-mail/CPF não encontrado!', 'erro'); return; }
    codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    usuarioRecuperando = usuario;
    alert('Seu código é: ' + codigoRecuperacao);
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'block';
}

function verificarCodigo() {
    if (document.getElementById('recCodigo').value.trim() !== codigoRecuperacao) { mostrarToast('Código inválido!', 'erro'); return; }
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'block';
}

function criarNovaSenha() {
    const nova = document.getElementById('recNovaSenha').value;
    if (!nova || nova.length < 6) return;
    const usuarios = carregarDados('usuarios') || [];
    const idx = usuarios.findIndex(u => u.id === usuarioRecuperando.id);
    if (idx !== -1) { usuarios[idx].senha = nova; salvarDados('usuarios', usuarios); }
    mostrarToast('Senha alterada!', 'sucesso');
    setTimeout(() => mostrarTela('loginScreen'), 1000);
}

// PERFIL
function carregarMeuPerfil() {
    if (!usuarioLogado) return;
    document.getElementById('perfilNome').textContent = usuarioLogado.nome;
    document.getElementById('perfilProfissao').textContent = usuarioLogado.tipo === 'profissional' ? (usuarioLogado.profissao||'') + ' • ' + usuarioLogado.experiencia + ' anos' : 'EMPREITEIRO';
    document.getElementById('editNome').value = usuarioLogado.nome || '';
    document.getElementById('editCelular').value = usuarioLogado.celular || '';
    document.getElementById('editEmail').value = usuarioLogado.email || '';
}

function salvarPerfil() {
    if (!usuarioLogado) return;
    usuarioLogado.nome = document.getElementById('editNome').value.trim();
    usuarioLogado.celular = document.getElementById('editCelular').value.trim();
    usuarioLogado.email = document.getElementById('editEmail').value.trim();
    const usuarios = carregarDados('usuarios') || [];
    const idx = usuarios.findIndex(u => u.id === usuarioLogado.id);
    if (idx !== -1) { usuarios[idx] = usuarioLogado; salvarDados('usuarios', usuarios); }
    salvarDados('usuarioLogado', usuarioLogado);
    carregarMeuPerfil();
    mostrarToast('Perfil atualizado!', 'sucesso');
}

// FEED
function carregarFeed() {
    const obras = carregarDados('obras') || [];
    const container = document.getElementById('feedContainer');
    if (!container) return;
    if (obras.length === 0) {
        container.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>Nenhuma obra!</h3></div>';
        return;
    }
    container.innerHTML = obras.map(o => `<div class="feed-card"><div class="feed-card-header"><div class="feed-avatar">🏢</div><div class="feed-user-name">Empreiteiro</div></div><div class="feed-card-image">🏗️</div><div class="feed-card-body"><div class="feed-card-title">${o.nome}</div><p>📍 ${o.endereco}</p><p>💰 R$${o.valorHora}/h</p></div></div>`).join('');
}

function publicarObra() {
    const nome = document.getElementById('obraNome').value.trim();
    const endereco = document.getElementById('obraEndereco').value.trim();
    if (!nome || !endereco) return;
    const obras = carregarDados('obras') || [];
    obras.unshift({ id: Date.now(), nome, endereco, valorHora: 25, data: new Date().toISOString() });
    salvarDados('obras', obras);
    mostrarToast('Obra publicada!', 'sucesso');
    mostrarTela('homeScreen');
}

// BUSCA
function buscarProfissionais() {
    const profissionais = (carregarDados('usuarios')||[]).filter(u => u.tipo === 'profissional');
    const c = document.getElementById('buscaResultados');
    if (!c) return;
    c.innerHTML = profissionais.map(p => `<div class="card"><strong>${p.nome}</strong><br>${p.profissao} • ${p.experiencia} anos</div>`).join('');
}

// REDE
function carregarRede() {
    const c = document.getElementById('redeContainer');
    if (c) c.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><h3>🔗 Nenhuma conexão</h3></div>';
}

function sair() { 
    usuarioLogado = null; 
    salvarDados('usuarioLogado', null); 
    mostrarTela('loginScreen'); 
}

if (usuarioLogado) mostrarTela('homeScreen');
console.log('✅ LPXCONSTRUTOR PRONTO!');
