// ============================================
// LPXCONSTRUTOR - JAVASCRIPT COMPLETO
// ============================================

// BANCO DE DADOS LOCAL
function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDados(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
}

let usuarioLogado = carregarDados('usuarioLogado');
let profissionalSelecionado = null;
let tabAtual = 'feed';
let codigoRecuperacao = null;
let usuarioRecuperando = null;
let timerReenvio = null;

// INICIALIZAÇÃO
function inicializarDados() {
    if (!carregarDados('usuarios')) {
        const usuariosExemplo = [
            {
                id: 1001, tipo: 'profissional', nome: 'João Silva',
                email: 'joao@email.com', celular: '(11) 99999-0001',
                cpf: '111.111.111-11', profissao: 'pedreiro', experiencia: 8,
                habilidades: 'Alvenaria, Revestimento, Concreto',
                senha: '123456', fotoPerfil: '', avaliacoes: [],
                conexoes: [], historicoTrabalhos: [],
                dataCadastro: new Date(Date.now() - 30*24*60*60*1000).toISOString()
            },
            {
                id: 1002, tipo: 'profissional', nome: 'Maria Santos',
                email: 'maria@email.com', celular: '(11) 99999-0002',
                cpf: '222.222.222-22', profissao: 'pintor', experiencia: 5,
                habilidades: 'Pintura residencial, Textura, Grafiato',
                senha: '123456', fotoPerfil: '', avaliacoes: [],
                conexoes: [], historicoTrabalhos: [],
                dataCadastro: new Date(Date.now() - 20*24*60*60*1000).toISOString()
            },
            {
                id: 2001, tipo: 'empreiteiro', nome: 'Carlos Obras',
                email: 'carlos@email.com', celular: '(11) 99999-0003',
                cpf: '333.333.333-33', profissao: '', experiencia: 15,
                habilidades: '', senha: '123456', fotoPerfil: '',
                avaliacoes: [], conexoes: [], historicoTrabalhos: [],
                dataCadastro: new Date(Date.now() - 40*24*60*60*1000).toISOString()
            }
        ];
        salvarDados('usuarios', usuariosExemplo);
    }
    if (!carregarDados('conexoes')) salvarDados('conexoes', []);
    if (!carregarDados('obras')) {
        const obrasExemplo = [
            {
                id: 1, usuarioId: 2001, nome: 'Residencial Parque Verde',
                endereco: 'Rua das Flores, 123 - Jardim América',
                descricao: 'Construção de sobrado com 3 quartos, 2 banheiros e garagem.',
                profissoes: 'Pedreiro, Eletricista, Pintor',
                valorHora: 25, foto: '',
                data: new Date(Date.now() - 2*24*60*60*1000).toISOString(),
                interessados: []
            }
        ];
        salvarDados('obras', obrasExemplo);
    }
}

inicializarDados();

// NAVEGAÇÃO
function mostrarTela(telaId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(telaId).classList.add('active');
    
    const telasComNav = ['homeScreen', 'buscaScreen', 'publicarObraScreen', 'perfilScreen'];
    document.getElementById('bottomNav').style.display = 
        telasComNav.includes(telaId) ? 'flex' : 'none';
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const navItems = document.querySelectorAll('.nav-item');
    if (telaId === 'homeScreen') navItems[0]?.classList.add('active');
    if (telaId === 'buscaScreen') navItems[1]?.classList.add('active');
    if (telaId === 'publicarObraScreen') navItems[2]?.classList.add('active');
    if (telaId === 'perfilScreen') navItems[3]?.classList.add('active');
    
    if (telaId === 'homeScreen') { carregarFeed(); carregarRede(); }
    if (telaId === 'perfilScreen') carregarMeuPerfil();
    if (telaId === 'buscaScreen') buscarProfissionais();
}

function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.style.background = tipo === 'erro' ? '#EF4444' : 
                             tipo === 'sucesso' ? '#10B981' : '#1F2937';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function fecharModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function mudarTab(tab, btn) {
    tabAtual = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('feedTab').style.display = tab === 'feed' ? 'block' : 'none';
    document.getElementById('redeTab').style.display = tab === 'rede' ? 'block' : 'none';
    if (tab === 'rede') carregarRede();
}

function toggleProfissao() {
    const tipo = document.getElementById('cadTipo').value;
    document.getElementById('grupoProfissao').style.display = 
        tipo === 'profissional' ? 'block' : 'none';
}

// LOGIN
function fazerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    
    if (!email || !senha) {
        mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    const usuario = usuarios.find(u => 
        (u.email.toLowerCase() === email.toLowerCase() || u.cpf.replace(/\D/g,'') === email.replace(/\D/g,'')) 
        && u.senha === senha
    );
    
    if (usuario) {
        usuarioLogado = usuario;
        salvarDados('usuarioLogado', usuarioLogado);
        mostrarToast('✅ Bem-vindo, ' + usuario.nome + '!', 'sucesso');
        setTimeout(() => mostrarTela('homeScreen'), 500);
    } else {
        mostrarToast('❌ E-mail/CPF ou senha inválidos!', 'erro');
    }
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
    
    if (!nome || !email || !celular || !cpf || !senha) {
        mostrarToast('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    if (tipo === 'profissional' && !profissao) {
        mostrarToast('❌ Selecione sua profissão!', 'erro');
        return;
    }
    
    if (senha.length < 6) {
        mostrarToast('❌ Senha deve ter no mínimo 6 caracteres!', 'erro');
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    if (usuarios.find(u => u.email === email || u.cpf === cpf)) {
        mostrarToast('❌ E-mail ou CPF já cadastrado!', 'erro');
        return;
    }
    
    const novoUsuario = {
        id: Date.now(),
        tipo, nome, email, celular, cpf, profissao,
        experiencia: parseInt(experiencia) || 0,
        habilidades: '', senha, fotoPerfil: '',
        avaliacoes: [], conexoes: [], historicoTrabalhos: [],
        dataCadastro: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    salvarDados('usuarios', usuarios);
    
    usuarioLogado = novoUsuario;
    salvarDados('usuarioLogado', usuarioLogado);
    
    mostrarToast('✅ Cadastro realizado! Bem-vindo!', 'sucesso');
    setTimeout(() => mostrarTela('homeScreen'), 500);
}

// RECUPERAÇÃO DE SENHA
function recuperarSenha() {
    codigoRecuperacao = null;
    usuarioRecuperando = null;
    document.getElementById('recEmail').value = '';
    document.getElementById('recCodigo').value = '';
    document.getElementById('recNovaSenha').value = '';
    document.getElementById('recConfirmarSenha').value = '';
    document.getElementById('recuperarPasso1').style.display = 'block';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'none';
    if (timerReenvio) clearInterval(timerReenvio);
    const btnReenviar = document.getElementById('btnReenviar');
    if (btnReenviar) {
        btnReenviar.disabled = false;
        btnReenviar.style.opacity = '1';
        btnReenviar.textContent = '🔄 Reenviar';
    }
    mostrarTela('recuperarSenhaScreen');
}

function enviarCodigoRecuperacao() {
    const emailOuCPF = document.getElementById('recEmail').value.trim();
    const metodo = document.getElementById('recMetodo').value;
    
    if (!emailOuCPF) {
        mostrarToast('❌ Digite seu e-mail ou CPF!', 'erro');
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    const usuario = usuarios.find(u => 
        u.email.toLowerCase() === emailOuCPF.toLowerCase() || 
        u.cpf.replace(/\D/g, '') === emailOuCPF.replace(/\D/g, '')
    );
    
    if (!usuario) {
        mostrarToast('❌ E-mail/CPF não encontrado!', 'erro');
        return;
    }
    
    codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    usuarioRecuperando = usuario;
    
    const recuperacoes = carregarDados('recuperacoes') || [];
    recuperacoes.push({
        usuarioId: usuario.id,
        codigo: codigoRecuperacao,
        dataExpiracao: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        usado: false
    });
    salvarDados('recuperacoes', recuperacoes);
    
    const destino = metodo === 'email' ? 
        '<strong>📧 ' + mascararEmail(usuario.email) + '</strong>' : 
        '<strong>📱 ' + mascararCelular(usuario.celular) + '</strong>';
    
    document.getElementById('recMensagemEnvio').innerHTML = 
        'Enviamos um código de 6 dígitos para:<br>' + destino;
    
    console.log('🔐 CÓDIGO DE RECUPERAÇÃO: ' + codigoRecuperacao);
    console.log('Usuário: ' + usuario.nome);
    console.log('Válido por 10 minutos');
    
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'block';
    document.getElementById('recuperarPasso3').style.display = 'none';
    
    mostrarToast('📤 Código enviado! Verifique seu ' + (metodo === 'email' ? 'e-mail' : 'celular'), 'sucesso');
    
    iniciarTimerReenvio();
}

function verificarCodigo() {
    const codigoDigitado = document.getElementById('recCodigo').value.trim();
    
    if (!codigoDigitado || codigoDigitado.length !== 6) {
        mostrarToast('❌ Digite o código de 6 dígitos!', 'erro');
        return;
    }
    
    if (codigoDigitado !== codigoRecuperacao) {
        mostrarToast('❌ Código inválido!', 'erro');
        document.getElementById('recCodigo').value = '';
        return;
    }
    
    const recuperacoes = carregarDados('recuperacoes') || [];
    const recuperacao = recuperacoes.find(r => 
        r.usuarioId === usuarioRecuperando.id && r.codigo === codigoRecuperacao && !r.usado
    );
    
    if (!recuperacao || new Date(recuperacao.dataExpiracao) < new Date()) {
        mostrarToast('❌ Código expirado! Solicite um novo.', 'erro');
        return;
    }
    
    recuperacao.usado = true;
    salvarDados('recuperacoes', recuperacoes);
    
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'block';
    
    mostrarToast('✅ Código verificado! Crie sua nova senha.', 'sucesso');
}

function criarNovaSenha() {
    const novaSenha = document.getElementById('recNovaSenha').value;
    const confirmarSenha = document.getElementById('recConfirmarSenha').value;
    
    if (!novaSenha || novaSenha.length < 6) {
        mostrarToast('❌ Senha deve ter no mínimo 6 caracteres!', 'erro');
        return;
    }
    
    if (novaSenha !== confirmarSenha) {
        mostrarToast('❌ As senhas não coincidem!', 'erro');
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    const index = usuarios.findIndex(u => u.id === usuarioRecuperando.id);
    
    if (index !== -1) {
        usuarios[index].senha = novaSenha;
        salvarDados('usuarios', usuarios);
        codigoRecuperacao = null;
        usuarioRecuperando = null;
        document.getElementById('modalSucesso').classList.add('active');
    } else {
        mostrarToast('❌ Erro ao salvar!', 'erro');
    }
}

function mascararEmail(email) {
    const [nome, dominio] = email.split('@');
    if (nome.length <= 2) return '***@' + dominio;
    return nome.substring(0, 2) + '***' + nome.substring(nome.length - 1) + '@' + dominio;
}

function mascararCelular(celular) {
    const numeros = celular.replace(/\D/g, '');
    if (numeros.length < 8) return celular;
    return '(' + numeros.substring(0, 2) + ') ' + numeros.substring(2, 7) + '-****';
}

function iniciarTimerReenvio() {
    let segundos = 30;
    const btnReenviar = document.getElementById('btnReenviar');
    if (!btnReenviar) return;
    if (timerReenvio) clearInterval(timerReenvio);
    
    btnReenviar.disabled = true;
    btnReenviar.style.opacity = '0.6';
    btnReenviar.textContent = '⏳ ' + segundos + 's';
    
    timerReenvio = setInterval(() => {
        segundos--;
        btnReenviar.textContent = '⏳ ' + segundos + 's';
        if (segundos <= 0) {
            clearInterval(timerReenvio);
            btnReenviar.disabled = false;
            btnReenviar.style.opacity = '1';
            btnReenviar.textContent = '🔄 Reenviar';
        }
    }, 1000);
}

// PERFIL
function carregarMeuPerfil() {
    if (!usuarioLogado) return;
    
    const usuarios = carregarDados('usuarios') || [];
    const userAtualizado = usuarios.find(u => u.id === usuarioLogado.id);
    if (userAtualizado) {
        usuarioLogado = userAtualizado;
        salvarDados('usuarioLogado', usuarioLogado);
    }
    
    document.getElementById('perfilNome').textContent = usuarioLogado.nome;
    
    if (usuarioLogado.tipo === 'profissional') {
        const prof = usuarioLogado.profissao || '';
        document.getElementById('perfilProfissao').textContent = 
            prof.charAt(0).toUpperCase() + prof.slice(1) + ' • ' + usuarioLogado.experiencia + ' anos';
    } else {
        document.getElementById('perfilProfissao').textContent = 'EMPREITEIRO • ' + usuarioLogado.experiencia + ' anos';
    }
    
    document.getElementById('editNome').value = usuarioLogado.nome || '';
    document.getElementById('editCelular').value = usuarioLogado.celular || '';
    document.getElementById('editEmail').value = usuarioLogado.email || '';
    document.getElementById('editProfissao').value = usuarioLogado.profissao || '';
    document.getElementById('editExperiencia').value = usuarioLogado.experiencia || '';
    document.getElementById('editHabilidades').value = usuarioLogado.habilidades || '';
    
    if (usuarioLogado.fotoPerfil) {
        document.getElementById('perfilAvatarImg').src = usuarioLogado.fotoPerfil;
        document.getElementById('perfilAvatarImg').style.display = 'block';
        document.getElementById('perfilAvatarDefault').style.display = 'none';
    } else {
        document.getElementById('perfilAvatarImg').style.display = 'none';
        document.getElementById('perfilAvatarDefault').style.display = 'block';
    }
    
    const media = calcularMediaEstrelas(usuarioLogado.avaliacoes);
    document.getElementById('perfilEstrelas').innerHTML = gerarEstrelas(media);
    document.getElementById('perfilAvaliacoes').textContent = 
        (usuarioLogado.avaliacoes?.length || 0) + ' avaliações';
    
    document.getElementById('perfilTags').innerHTML = 
        usuarioLogado.tipo === 'profissional' 
            ? '<span class="badge badge-info">👷 Profissional</span>'
            : '<span class="badge badge-success">🏢 Empreiteiro</span>';
    
    carregarHistoricoTrabalhos();
    carregarFeedbacks();
}

function calcularMediaEstrelas(avaliacoes) {
    if (!avaliacoes || avaliacoes.length === 0) return 5;
    const soma = avaliacoes.reduce((acc, a) => acc + a.estrelas, 0);
    return Math.round(soma / avaliacoes.length);
}

function gerarEstrelas(media) {
    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        estrelas += i <= media ? '⭐' : '☆';
    }
    return estrelas;
}

function salvarPerfil() {
    if (!usuarioLogado) return;
    
    usuarioLogado.nome = document.getElementById('editNome').value.trim();
    usuarioLogado.celular = document.getElementById('editCelular').value.trim();
    usuarioLogado.email = document.getElementById('editEmail').value.trim();
    usuarioLogado.profissao = document.getElementById('editProfissao').value;
    usuarioLogado.experiencia = parseInt(document.getElementById('editExperiencia').value) || 0;
    usuarioLogado.habilidades = document.getElementById('editHabilidades').value.trim();
    
    const usuarios = carregarDados('usuarios') || [];
    const index = usuarios.findIndex(u => u.id === usuarioLogado.id);
    if (index !== -1) {
        usuarios[index] = usuarioLogado;
        salvarDados('usuarios', usuarios);
    }
    
    salvarDados('usuarioLogado', usuarioLogado);
    carregarMeuPerfil();
    mostrarToast('✅ Perfil atualizado!', 'sucesso');
}

function mudarFotoPerfil(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('perfilAvatarImg').src = e.target.result;
        document.getElementById('perfilAvatarImg').style.display = 'block';
        document.getElementById('perfilAvatarDefault').style.display = 'none';
        
        if (usuarioLogado) {
            usuarioLogado.fotoPerfil = e.target.result;
            salvarDados('usuarioLogado', usuarioLogado);
            
            const usuarios = carregarDados('usuarios') || [];
            const index = usuarios.findIndex(u => u.id === usuarioLogado.id);
            if (index !== -1) {
                usuarios[index] = usuarioLogado;
                salvarDados('usuarios', usuarios);
            }
        }
    };
    reader.readAsDataURL(file);
}

function carregarHistoricoTrabalhos() {
    const container = document.getElementById('historicoTrabalhos');
    const conexoes = carregarDados('conexoes') || [];
    const minhasConexoes = conexoes.filter(c => 
        c.profissionalId === usuarioLogado.id || c.empreiteiroId === usuarioLogado.id
    );
    
    if (minhasConexoes.length === 0) {
        container.innerHTML = '<p style="color:var(--gray-500); text-align:center;">Nenhum histórico ainda.</p>';
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    
    container.innerHTML = minhasConexoes.map(conexao => {
        const outroId = usuarioLogado.id === conexao.profissionalId ? conexao.empreiteiroId : conexao.profissionalId;
        const outro = usuarios.find(u => u.id === outroId);
        
        return `
            <div class="historico-item">
                <strong>${outro?.nome || 'Usuário'}</strong>
                <span class="badge ${conexao.ativa ? 'badge-success' : 'badge-danger'}">
                    ${conexao.ativa ? '🟢 Ativo' : '🔴 Encerrado'}
                </span>
                <div style="font-size:13px; color:var(--gray-600); margin-top:5px;">
                    🏗️ ${conexao.obra || '-'} • 💰 R$${conexao.valorHora || '0'}/h
                </div>
                ${conexao.pontosFracos ? `<div style="margin-top:8px; padding:8px; background:var(--danger-light); border-radius:8px; font-size:12px;"><strong>⚠️ Melhorar:</strong> ${conexao.pontosFracos}</div>` : ''}
                ${conexao.pontosFortes ? `<div style="margin-top:5px; padding:8px; background:var(--success-light); border-radius:8px; font-size:12px;"><strong>👍 Forte:</strong> ${conexao.pontosFortes}</div>` : ''}
            </div>
        `;
    }).join('');
}

function carregarFeedbacks() {
    const container = document.getElementById('feedbacksContainer');
    const conexoes = carregarDados('conexoes') || [];
    const minhasConexoes = conexoes.filter(c => 
        (c.profissionalId === usuarioLogado.id || c.empreiteiroId === usuarioLogado.id) &&
        (c.pontosFracos || c.pontosFortes)
    );
    
    if (minhasConexoes.length === 0) {
        container.innerHTML = '<p style="color:var(--gray-500); text-align:center;">Nenhum feedback ainda.</p>';
        return;
    }
    
    container.innerHTML = minhasConexoes.map(c => `
        <div style="margin-bottom:12px; padding:12px; background:var(--gray-50); border-radius:12px;">
            ${c.pontosFracos ? `<div><span class="tag tag-vermelha">⚠️ MELHORAR</span><p style="font-size:13px; margin-top:5px;">${c.pontosFracos}</p></div>` : ''}
            ${c.pontosFortes ? `<div style="margin-top:8px;"><span class="tag tag-verde">👍 FORTE</span><p style="font-size:13px; margin-top:5px;">${c.pontosFortes}</p></div>` : ''}
            <div style="font-size:11px; color:var(--gray-500); margin-top:8px;">⭐ ${c.estrelas || '-'} estrelas</div>
        </div>
    `).join('');
}

// REDE DE CONEXÕES
function carregarRede() {
    const container = document.getElementById('redeContainer');
    if (!usuarioLogado) return;
    
    const conexoes = carregarDados('conexoes') || [];
    const usuarios = carregarDados('usuarios') || [];
    const minhasConexoes = conexoes.filter(c => 
        c.profissionalId === usuarioLogado.id || c.empreiteiroId === usuarioLogado.id
    );
    
    if (minhasConexoes.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align:center; padding:40px;">
                <div style="font-size:60px;">🔗</div>
                <h3 style="color:var(--primary);">Nenhuma conexão!</h3>
                <p style="color:var(--gray-500);">Sua rede aparece quando contratar ou for contratado.</p>
                ${usuarioLogado.tipo === 'empreiteiro' ? '<button class="btn btn-primary" onclick="mostrarTela(\'buscaScreen\')">🔍 Buscar Profissionais</button>' : ''}
            </div>
        `;
        return;
    }
    
    container.innerHTML = minhasConexoes.map(conexao => {
        const outroId = usuarioLogado.id === conexao.profissionalId ? conexao.empreiteiroId : conexao.profissionalId;
        const outro = usuarios.find(u => u.id === outroId);
        
        return `
            <div class="card conexao-card ${conexao.ativa ? '' : 'desconectado'}" style="margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>${outro?.nome || 'Usuário'}</strong>
                        <span class="badge ${conexao.ativa ? 'badge-success' : 'badge-danger'}">
                            ${conexao.ativa ? '🟢 Ativo' : '🔴 Encerrado'}
                        </span>
                    </div>
                </div>
                <div style="font-size:13px; color:var(--gray-600); margin-top:5px;">
                    🏗️ ${conexao.obra} • 💰 R$${conexao.valorHora}/h
                </div>
                ${conexao.ativa && usuarioLogado.tipo === 'empreiteiro' ? 
                    `<button class="btn btn-small btn-danger" onclick="abrirDemissao(${conexao.id})" style="margin-top:8px;">⚠️ Encerrar</button>` : ''}
            </div>
        `;
    }).join('');
}

// CONTRATAÇÃO
function contratarProfissional(profissionalId) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') {
        mostrarToast('Apenas empreiteiros!', 'erro');
        return;
    }
    
    const usuarios = carregarDados('usuarios') || [];
    profissionalSelecionado = usuarios.find(u => u.id === profissionalId);
    if (!profissionalSelecionado) return;
    
    document.getElementById('modalContratarInfo').innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:15px;">
            <div class="lista-avatar">👷</div>
            <div style="margin-left:10px;">
                <strong>${profissionalSelecionado.nome}</strong>
                <div style="color:var(--secondary);">${profissionalSelecionado.profissao}</div>
                <div>⭐ ${gerarEstrelas(calcularMediaEstrelas(profissionalSelecionado.avaliacoes))}</div>
            </div>
        </div>
    `;
    
    document.getElementById('modalContratar').classList.add('active');
}

function confirmarContratacao() {
    if (!profissionalSelecionado || !usuarioLogado) return;
    
    const obra = document.getElementById('contratarObra').value.trim();
    const valorHora = document.getElementById('contratarValor').value;
    const dataPagamento = document.getElementById('contratarDataPagamento').value;
    
    if (!obra || !valorHora) {
        mostrarToast('Preencha obra e valor!', 'erro');
        return;
    }
    
    const conexoes = carregarDados('conexoes') || [];
    const existe = conexoes.find(c => 
        c.profissionalId === profissionalSelecionado.id && 
        c.empreiteiroId === usuarioLogado.id && c.ativa
    );
    
    if (existe) {
        mostrarToast('Já está na sua rede!', 'erro');
        return;
    }
    
    const novaConexao = {
        id: Date.now(),
        profissionalId: profissionalSelecionado.id,
        empreiteiroId: usuarioLogado.id,
        obra, valorHora: parseFloat(valorHora), dataPagamento,
        dataInicio: new Date().toISOString(),
        dataFim: null, ativa: true,
        motivoEncerramento: '', estrelas: 0,
        pontosFortes: '', pontosFracos: ''
    };
    
    conexoes.push(novaConexao);
    salvarDados('conexoes', conexoes);
    
    fecharModal('modalContratar');
    mostrarToast('🤝 Contratado! Adicionado à sua rede!', 'sucesso');
    carregarRede();
}

function abrirDemissao(conexaoId) {
    const conexoes = carregarDados('conexoes') || [];
    const conexao = conexoes.find(c => c.id === conexaoId);
    if (!conexao) return;
    
    const usuarios = carregarDados('usuarios') || [];
    const profissional = usuarios.find(u => u.id === conexao.profissionalId);
    
    document.getElementById('modalDemitirInfo').innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:15px;">
            <div class="lista-avatar">👷</div>
            <div style="margin-left:10px;">
                <strong>${profissional?.nome || 'Profissional'}</strong>
                <div>🏗️ ${conexao.obra}</div>
            </div>
        </div>
    `;
    
    document.getElementById('demitirMotivo').value = '';
    document.getElementById('demitirEstrelas').value = '3';
    document.getElementById('demitirMelhorar').value = '';
    document.getElementById('demitirPontosFortes').value = '';
    
    document.getElementById('modalDemitir').setAttribute('data-conexao-id', conexaoId);
    document.getElementById('modalDemitir').classList.add('active');
}

function confirmarDemissao() {
    const conexaoId = parseInt(document.getElementById('modalDemitir').getAttribute('data-conexao-id'));
    const conexoes = carregarDados('conexoes') || [];
    const index = conexoes.findIndex(c => c.id === conexaoId);
    if (index === -1) return;
    
    conexoes[index].ativa = false;
    conexoes[index].dataFim = new Date().toISOString();
    conexoes[index].motivoEncerramento = document.getElementById('demitirMotivo').value;
    conexoes[index].estrelas = parseInt(document.getElementById('demitirEstrelas').value);
    conexoes[index].pontosFracos = document.getElementById('demitirMelhorar').value;
    conexoes[index].pontosFortes = document.getElementById('demitirPontosFortes').value;
    
    salvarDados('conexoes', conexoes);
    
    fecharModal('modalDemitir');
    mostrarToast('Contrato encerrado. Feedback registrado!', 'sucesso');
    carregarRede();
}

// BUSCA
function buscarProfissionais() {
    const termo = document.getElementById('buscaInput')?.value?.toLowerCase() || '';
    const usuarios = carregarDados('usuarios') || [];
    const container = document.getElementById('buscaResultados');
    
    const profissionais = usuarios.filter(u => 
        u.tipo === 'profissional' &&
        (termo === '' || u.nome.toLowerCase().includes(termo) || 
         u.profissao.toLowerCase().includes(termo) ||
         (u.habilidades && u.habilidades.toLowerCase().includes(termo)))
    );
    
    if (profissionais.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--gray-500); padding:30px;">Nenhum profissional encontrado.</p>';
        return;
    }
    
    container.innerHTML = profissionais.map(p => `
        <div class="card" style="cursor:pointer;">
            <div style="display:flex; align-items:center;">
                <div class="lista-avatar">👷</div>
                <div style="margin-left:14px; flex:1;">
                    <div class="lista-nome">${p.nome}</div>
                    <div class="lista-detalhe">${p.profissao} • ${p.experiencia} anos</div>
                    <div style="color:#FBBF24;">${gerarEstrelas(calcularMediaEstrelas(p.avaliacoes))}</div>
                    ${p.habilidades ? `<div style="margin-top:5px;">${p.habilidades.split(',').map(h => `<span class="tag">${h.trim()}</span>`).join(' ')}</div>` : ''}
                </div>
            </div>
            ${usuarioLogado?.tipo === 'empreiteiro' ? 
                `<button class="btn btn-small btn-success" onclick="contratarProfissional(${p.id})" style="margin-top:10px;">🤝 Contratar</button>` : ''}
        </div>
    `).join('');
}

// FEED DE OBRAS (COM CANDIDATURA)
function carregarFeed() {
    const obras = carregarDados('obras') || [];
    const container = document.getElementById('feedContainer');
    const usuarios = carregarDados('usuarios') || [];
    
    if (obras.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align:center; padding:40px;">
                <div style="font-size:60px;">🏗️</div>
                <h3 style="color:var(--primary);">Nenhuma obra publicada!</h3>
                <p style="color:var(--gray-500);">Seja o primeiro a publicar uma obra!</p>
                ${usuarioLogado?.tipo === 'empreiteiro' ? 
                    '<button class="btn btn-primary" onclick="mostrarTela(\'publicarObraScreen\')" style="margin-top:15px;">📸 Publicar Obra</button>' : 
                    '<p style="color:var(--gray-400); font-size:13px;">Volte mais tarde para ver novas oportunidades!</p>'}
            </div>
        `;
        carregarAlertas();
        return;
    }
    
    container.innerHTML = obras.map(obra => {
        const autor = usuarios.find(u => u.id === obra.usuarioId);
        const jaCandidatou = obra.interessados?.some(i => i.profissionalId === usuarioLogado?.id);
        const totalCandidatos = obra.interessados?.length || 0;
        const souDono = usuarioLogado?.id === obra.usuarioId;
        
        return `
            <div class="feed-card" style="margin-bottom:20px;">
                <div class="feed-card-header">
                    <div class="feed-avatar">🏢</div>
                    <div class="feed-user-info">
                        <div class="feed-user-name">${autor?.nome || 'Empreiteiro'}</div>
                        <div class="feed-time">📅 ${formatarData(obra.data)}</div>
                    </div>
                    ${souDono ? '<span class="badge badge-info">Minha Obra</span>' : ''}
                </div>
                
                ${obra.foto ? 
                    `<div class="feed-card-image"><img src="${obra.foto}" alt="Obra"></div>` : 
                    `<div class="feed-card-image">🏗️</div>`
                }
                
                <div class="feed-card-body">
                    <div class="feed-card-title">${obra.nome}</div>
                    <p style="color:var(--gray-600); margin:5px 0;">📍 ${obra.endereco}</p>
                    ${obra.descricao ? `<p style="color:var(--gray-600); margin:5px 0;">📝 ${obra.descricao}</p>` : ''}
                    
                    <div style="margin:10px 0;">
                        <span style="color:var(--secondary); font-weight:700; font-size:18px;">💰 R$ ${obra.valorHora || '0'}/hora</span>
                    </div>
                    
                    <div style="margin:10px 0;">
                        ${(obra.profissoes || '').split(',').map(p => 
                            `<span class="tag">👷 ${p.trim()}</span>`
                        ).join(' ')}
                    </div>
                    
                    <div style="margin-top:15px; padding-top:15px; border-top:1px solid var(--gray-200);">
                        
                        ${souDono ? `
                            <div style="background:var(--gray-50); padding:15px; border-radius:12px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <strong style="font-size:16px;">👥 ${totalCandidatos} candidato(s)</strong>
                                        <p style="font-size:12px; color:var(--gray-500);">Profissionais interessados nesta obra</p>
                                    </div>
                                    <button class="btn btn-small btn-primary" onclick="verCandidatos(${obra.id})">
                                        👁️ Ver Candidatos
                                    </button>
                                </div>
                                ${totalCandidatos > 0 ? `
                                    <div style="margin-top:10px;">
                                        ${obra.interessados.slice(0, 3).map(c => {
                                            const prof = usuarios.find(u => u.id === c.profissionalId);
                                            return `<span class="badge badge-info" style="margin:2px;">👷 ${prof?.nome?.split(' ')[0] || 'Profissional'}</span>`;
                                        }).join(' ')}
                                        ${totalCandidatos > 3 ? `<span class="badge">+${totalCandidatos - 3} mais</span>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                        
                        ${!souDono && usuarioLogado?.tipo === 'profissional' ? `
                            ${jaCandidatou ? `
                                <div style="background:var(--success-light); padding:15px; border-radius:12px; text-align:center;">
                                    <div style="font-size:24px;">✅</div>
                                    <strong style="color:var(--success);">Candidatura Enviada!</strong>
                                    <p style="font-size:13px; color:var(--gray-600); margin-top:5px;">
                                        Aguarde o empreiteiro avaliar seu perfil
                                    </p>
                                    <button class="btn btn-small btn-danger" onclick="cancelarCandidatura(${obra.id})" style="margin-top:8px;">
                                        ❌ Cancelar Candidatura
                                    </button>
                                </div>
                            ` : `
                                <button class="btn btn-primary" onclick="candidatarObra(${obra.id})" style="width:100%;">
                                    ✋ TENHO INTERESSE NESTA VAGA
                                </button>
                                <p style="text-align:center; font-size:11px; color:var(--gray-400); margin-top:8px;">
                                    O empreiteiro poderá ver seu perfil completo
                                </p>
                            `}
                        ` : ''}
                        
                        ${!souDono && usuarioLogado?.tipo === 'empreiteiro' ? `
                            <p style="text-align:center; font-size:13px; color:var(--gray-400);">
                                Apenas profissionais podem se candidatar
                            </p>
                        ` : ''}
                        
                        ${!usuarioLogado ? `
                            <button class="btn btn-outline" onclick="mostrarTela('loginScreen')" style="width:100%;">
                                🔑 Faça login para se candidatar
                            </button>
                        ` : ''}
                        
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    carregarAlertas();
}

// CANDIDATURA
function candidatarObra(obraId) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'profissional') {
        mostrarToast('❌ Apenas profissionais podem se candidatar!', 'erro');
        return;
    }
    
    const obras = carregarDados('obras') || [];
    const index = obras.findIndex(o => o.id === obraId);
    
    if (index === -1) {
        mostrarToast('❌ Obra não encontrada!', 'erro');
        return;
    }
    
    if (!obras[index].interessados) obras[index].interessados = [];
    
    if (obras[index].interessados.find(i => i.profissionalId === usuarioLogado.id)) {
        mostrarToast('⚠️ Você já se candidatou!', 'erro');
        return;
    }
    
    obras[index].interessados.push({
        profissionalId: usuarioLogado.id,
        data: new Date().toISOString(),
        status: 'pendente'
    });
    
    salvarDados('obras', obras);
    carregarFeed();
    
    mostrarToast('✅ Candidatura enviada! Empreiteiro será notificado.', 'sucesso');
}

function cancelarCandidatura(obraId) {
    if (!usuarioLogado) return;
    
    const obras = carregarDados('obras') || [];
    const index = obras.findIndex(o => o.id === obraId);
    
    if (index === -1) return;
    
    obras[index].interessados = obras[index].interessados.filter(
        i => i.profissionalId !== usuarioLogado.id
    );
    
    salvarDados('obras', obras);
    carregarFeed();
    
    mostrarToast('❌ Candidatura cancelada!');
}

function verCandidatos(obraId) {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') {
        mostrarToast('❌ Apenas empreiteiros!', 'erro');
        return;
    }
    
    const obras = carregarDados('obras') || [];
    const obra = obras.find(o => o.id === obraId);
    
    if (!obra) return;
    
    const interessados = obra.interessados || [];
    const usuarios = carregarDados('usuarios') || [];
    
    if (interessados.length === 0) {
        const modalHtml = `
            <div style="text-align:center; padding:30px;">
                <div style="font-size:60px;">😔</div>
                <h3>Nenhum candidato ainda</h3>
                <p style="color:var(--gray-500);">Aguarde profissionais se candidatarem!</p>
                <button class="btn btn-outline" onclick="document.getElementById('modalCandidatos').remove()">Fechar</button>
            </div>
        `;
        abrirModalGenerico('modalCandidatos', '👥 Candidatos - ' + obra.nome, modalHtml);
        return;
    }
    
    let html = '';
    
    interessados.forEach(interessado => {
        const profissional = usuarios.find(u => u.id === interessado.profissionalId);
        if (!profissional) return;
        
        const mediaEstrelas = calcularMediaEstrelas(profissional.avaliacoes);
        const statusBadge = interessado.status === 'aceito' ? 'badge-success' :
                           interessado.status === 'recusado' ? 'badge-danger' : 'badge-info';
        const statusTexto = interessado.status === 'aceito' ? '✅ Aceito' :
                           interessado.status === 'recusado' ? '❌ Recusado' : '⏳ Pendente';
        
        html += `
            <div class="card" style="margin-bottom:12px; ${interessado.status === 'aceito' ? 'border:2px solid var(--success);' : ''}">
                <div style="display:flex; align-items:center; margin-bottom:10px;">
                    <div class="lista-avatar" style="width:50px; height:50px; font-size:22px;">
                        👷
                    </div>
                    <div style="margin-left:12px; flex:1;">
                        <strong style="font-size:16px;">${profissional.nome}</strong>
                        <div style="color:var(--secondary);">${profissional.profissao} • ${profissional.experiencia} anos</div>
                        <div style="color:#FBBF24;">${gerarEstrelas(mediaEstrelas)} (${profissional.avaliacoes?.length || 0})</div>
                    </div>
                    <span class="badge ${statusBadge}">${statusTexto}</span>
                </div>
                
                ${profissional.habilidades ? `
                    <div style="margin:8px 0;">
                        ${profissional.habilidades.split(',').map(h => `<span class="tag">${h.trim()}</span>`).join(' ')}
                    </div>
                ` : ''}
                
                <div style="display:flex; gap:8px; margin-top:10px;">
                    ${interessado.status === 'pendente' ? `
                        <button class="btn btn-small btn-success" onclick="aceitarCandidato(${obraId}, ${profissional.id})" style="flex:1;">
                            ✅ Aceitar
                        </button>
                        <button class="btn btn-small btn-danger" onclick="recusarCandidato(${obraId}, ${profissional.id})" style="flex:1;">
                            ❌ Recusar
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    abrirModalGenerico('modalCandidatos', '👥 Candidatos - ' + obra.nome, html);
}

function abrirModalGenerico(modalId, titulo, conteudo) {
    const modalAntigo = document.getElementById(modalId);
    if (modalAntigo) modalAntigo.remove();
    
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="color:var(--primary);">${titulo}</h3>
                <button onclick="document.getElementById('${modalId}').remove()" style="background:none; border:none; font-size:24px; cursor:pointer;">✕</button>
            </div>
            ${conteudo}
            <button class="btn btn-outline" onclick="document.getElementById('${modalId}').remove()" style="margin-top:15px;">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
}

function aceitarCandidato(obraId, profissionalId) {
    const obras = carregarDados('obras') || [];
    const obra = obras.find(o => o.id === obraId);
    if (!obra) return;
    
    const interessado = obra.interessados.find(i => i.profissionalId === profissionalId);
    if (interessado) {
        interessado.status = 'aceito';
        salvarDados('obras', obras);
        
        const modal = document.getElementById('modalCandidatos');
        if (modal) modal.remove();
        
        const usuarios = carregarDados('usuarios') || [];
        profissionalSelecionado = usuarios.find(u => u.id === profissionalId);
        
        if (profissionalSelecionado) {
            document.getElementById('modalContratarInfo').innerHTML = `
                <div class="alert-card" style="margin-bottom:15px;">
                    <strong>✅ Candidato Aceito!</strong>
                    <p style="font-size:13px;">Agora é só preencher os dados para contratar.</p>
                </div>
                <div style="display:flex; align-items:center; margin-bottom:15px;">
                    <div class="lista-avatar">👷</div>
                    <div style="margin-left:10px;">
                        <strong>${profissionalSelecionado.nome}</strong>
                        <div style="color:var(--secondary);">${profissionalSelecionado.profissao}</div>
                    </div>
                </div>
            `;
            
            document.getElementById('contratarObra').value = obra.nome;
            document.getElementById('contratarValor').value = obra.valorHora || '';
            
            document.getElementById('modalContratar').classList.add('active');
        }
        
        mostrarToast('✅ Candidato aceito! Agora é só contratar!', 'sucesso');
    }
}

function recusarCandidato(obraId, profissionalId) {
    if (!confirm('Tem certeza que deseja recusar este candidato?')) return;
    
    const obras = carregarDados('obras') || [];
    const obra = obras.find(o => o.id === obraId);
    if (!obra) return;
    
    const interessado = obra.interessados.find(i => i.profissionalId === profissionalId);
    if (interessado) {
        interessado.status = 'recusado';
        salvarDados('obras', obras);
        verCandidatos(obraId);
        mostrarToast('❌ Candidato recusado.');
    }
}

function previewFotoObra(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('obraPreview').src = e.target.result;
        document.getElementById('obraPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function publicarObra() {
    if (!usuarioLogado || usuarioLogado.tipo !== 'empreiteiro') {
        mostrarToast('Apenas empreiteiros!', 'erro');
        return;
    }
    
    const nome = document.getElementById('obraNome').value.trim();
    const endereco = document.getElementById('obraEndereco').value.trim();
    
    if (!nome || !endereco) {
        mostrarToast('Nome e endereço obrigatórios!', 'erro');
        return;
    }
    
    const obras = carregarDados('obras') || [];
    obras.unshift({
        id: Date.now(),
        usuarioId: usuarioLogado.id,
        nome, endereco,
        descricao: document.getElementById('obraDescricao').value,
        profissoes: document.getElementById('obraProfissoes').value,
        valorHora: parseFloat(document.getElementById('obraValorHora').value) || 0,
        foto: document.getElementById('obraPreview').src || '',
        data: new Date().toISOString(),
        interessados: []
    });
    
    salvarDados('obras', obras);
    
    ['obraNome','obraEndereco','obraDescricao','obraProfissoes','obraValorHora'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('obraPreview').style.display = 'none';
    document.getElementById('obraFoto').value = '';
    
    mostrarToast('✅ Obra publicada!', 'sucesso');
    mostrarTela('homeScreen');
}

// ALERTAS
function carregarAlertas() {
    const container = document.getElementById('alertasContainer');
    if (!usuarioLogado) { container.innerHTML = ''; return; }
    
    const conexoes = carregarDados('conexoes') || [];
    const usuarios = carregarDados('usuarios') || [];
    const hoje = new Date();
    let html = '';
    
    if (usuarioLogado.tipo === 'profissional') {
        const minhasConexoes = conexoes.filter(c => c.profissionalId === usuarioLogado.id && c.ativa);
        
        if (minhasConexoes.length === 0) {
            html += `
                <div class="alert-card" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">
                    <div style="font-size:24px;">📋</div>
                    <div style="font-weight:bold;">Nenhum contrato ativo</div>
                </div>
            `;
        } else {
            minhasConexoes.forEach(conexao => {
                if (conexao.dataPagamento) {
                    const dataPgto = new Date(conexao.dataPagamento + 'T00:00:00');
                    const diff = Math.ceil((dataPgto - hoje) / (1000*60*60*24));
                    const empreiteiro = usuarios.find(u => u.id === conexao.empreiteiroId);
                    
                    if (diff < 0) {
                        html += `<div class="alert-card alert-danger">🚨 PAGAMENTO ATRASADO HÁ ${Math.abs(diff)} DIAS!<br>🏢 ${empreiteiro?.nome}<br>💰 R$ ${(conexao.valorHora*160).toFixed(2)}</div>`;
                    } else if (diff === 0) {
                        html += `<div class="alert-card">💰 HOJE É DIA DE PAGAMENTO!<br>🏢 ${empreiteiro?.nome}<br>💰 R$ ${(conexao.valorHora*160).toFixed(2)}</div>`;
                    } else if (diff <= 3) {
                        html += `<div class="alert-card alert-warning">📅 Faltam ${diff} dias!<br>🏢 ${empreiteiro?.nome}<br>💰 R$ ${(conexao.valorHora*160).toFixed(2)}</div>`;
                    }
                }
            });
        }
    }
    
    if (usuarioLogado.tipo === 'empreiteiro') {
        const minhasConexoes = conexoes.filter(c => c.empreiteiroId === usuarioLogado.id && c.ativa);
        
        if (minhasConexoes.length === 0) {
            html += `<div class="alert-card" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">📋 Nenhum profissional contratado</div>`;
        } else {
            minhasConexoes.forEach(conexao => {
                if (conexao.dataPagamento) {
                    const dataPgto = new Date(conexao.dataPagamento + 'T00:00:00');
                    const diff = Math.ceil((dataPgto - hoje) / (1000*60*60*24));
                    const profissional = usuarios.find(u => u.id === conexao.profissionalId);
                    
                    if (diff <= 3 && diff >= 0) {
                        html += `<div class="alert-card ${diff === 0 ? '' : 'alert-warning'}">${diff === 0 ? '💰 HOJE é dia de pagar!' : '📅 Faltam ' + diff + ' dias!'}<br>👷 ${profissional?.nome}<br>💰 R$ ${(conexao.valorHora*160).toFixed(2)}</div>`;
                    }
                }
            });
        }
    }
    
    container.innerHTML = html || '';
}

// UTILITÁRIOS
function formatarData(dataISO) {
    return new Date(dataISO).toLocaleDateString('pt-BR');
}

function sair() {
    if (confirm('Deseja sair?')) {
        usuarioLogado = null;
        salvarDados('usuarioLogado', null);
        mostrarTela('loginScreen');
        mostrarToast('👋 Até logo!');
    }
}

// VERIFICAR LOGIN
if (usuarioLogado) {
    mostrarTela('homeScreen');
}

console.log('✅ LPXCONSTRUTOR INICIALIZADO!');
console.log('👷 Profissional: joao@email.com / 123456');
console.log('🏢 Empreiteiro: carlos@email.com / 123456');
