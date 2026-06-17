// ============================================
// SISTEMA DE RECUPERAÇÃO DE SENHA
// ============================================

let codigoRecuperacao = null;
let usuarioRecuperando = null;
let timerReenvio = null;

// Função chamada quando clica em "Esqueceu a senha?"
function abrirRecuperarSenha() {
    // Resetar tudo
    codigoRecuperacao = null;
    usuarioRecuperando = null;
    document.getElementById('recEmail').value = '';
    document.getElementById('recCodigo').value = '';
    document.getElementById('recNovaSenha').value = '';
    document.getElementById('recConfirmarSenha').value = '';
    
    document.getElementById('recuperarPasso1').style.display = 'block';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'none';
    
    mostrarTela('recuperarSenhaScreen');
}

// Passo 1: Enviar código
function enviarCodigoRecuperacao() {
    const emailOuCPF = document.getElementById('recEmail').value.trim();
    const metodo = document.getElementById('recMetodo').value;
    
    if (!emailOuCPF) {
        mostrarToast('❌ Digite seu e-mail ou CPF!', 'erro');
        return;
    }
    
    // Buscar usuário
    const usuarios = carregarDados('usuarios') || [];
    const usuario = usuarios.find(u => 
        u.email.toLowerCase() === emailOuCPF.toLowerCase() || 
        u.cpf === emailOuCPF.replace(/\D/g, '')
    );
    
    if (!usuario) {
        mostrarToast('❌ E-mail/CPF não encontrado!', 'erro');
        return;
    }
    
    // Gerar código aleatório de 6 dígitos
    codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    usuarioRecuperando = usuario;
    
    // Salvar código temporário (expira em 10 minutos)
    const recuperacoes = carregarDados('recuperacoes') || [];
    recuperacoes.push({
        usuarioId: usuario.id,
        codigo: codigoRecuperacao,
        dataExpiracao: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutos
        usado: false
    });
    salvarDados('recuperacoes', recuperacoes);
    
    // Simular envio
    if (metodo === 'email') {
        // Na prática, aqui você usaria um serviço de e-mail real (SendGrid, Mailchimp, etc.)
        console.log(`📧 CÓDIGO ENVIADO PARA: ${usuario.email}`);
        console.log(`🔢 CÓDIGO: ${codigoRecuperacao}`);
        
        document.getElementById('recMensagemEnvio').textContent = 
            `Enviamos um código de 6 dígitos para:\n📧 ${mascararEmail(usuario.email)}`;
        
        // Simular envio de e-mail (no app real, isso seria feito pelo backend)
        simularEnvioEmail(usuario.email, usuario.nome, codigoRecuperacao);
        
    } else if (metodo === 'sms') {
        console.log(`📱 SMS ENVIADO PARA: ${usuario.celular}`);
        console.log(`🔢 CÓDIGO: ${codigoRecuperacao}`);
        
        document.getElementById('recMensagemEnvio').textContent = 
            `Enviamos um código de 6 dígitos para:\n📱 ${mascararCelular(usuario.celular)}`;
        
        // Simular envio de SMS
        simularEnvioSMS(usuario.celular, codigoRecuperacao);
    }
    
    // Mostrar passo 2
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'block';
    document.getElementById('recuperarPasso3').style.display = 'none';
    
    mostrarToast('📤 Código enviado! Verifique seu ' + (metodo === 'email' ? 'e-mail' : 'SMS') + '!', 'sucesso');
    
    // Timer para reenvio (30 segundos)
    iniciarTimerReenvio();
}

// Passo 2: Verificar código
function verificarCodigo() {
    const codigoDigitado = document.getElementById('recCodigo').value.trim();
    
    if (!codigoDigitado || codigoDigitado.length !== 6) {
        mostrarToast('❌ Digite o código de 6 dígitos!', 'erro');
        return;
    }
    
    if (codigoDigitado !== codigoRecuperacao) {
        mostrarToast('❌ Código inválido! Tente novamente.', 'erro');
        document.getElementById('recCodigo').value = '';
        return;
    }
    
    // Verificar expiração
    const recuperacoes = carregarDados('recuperacoes') || [];
    const recuperacao = recuperacoes.find(r => 
        r.usuarioId === usuarioRecuperando.id && 
        r.codigo === codigoRecuperacao &&
        !r.usado
    );
    
    if (!recuperacao) {
        mostrarToast('❌ Código expirado ou já usado!', 'erro');
        return;
    }
    
    if (new Date(recuperacao.dataExpiracao) < new Date()) {
        mostrarToast('❌ Código expirado! Solicite um novo.', 'erro');
        return;
    }
    
    // Marcar como usado
    recuperacao.usado = true;
    salvarDados('recuperacoes', recuperacoes);
    
    // Mostrar passo 3
    document.getElementById('recuperarPasso1').style.display = 'none';
    document.getElementById('recuperarPasso2').style.display = 'none';
    document.getElementById('recuperarPasso3').style.display = 'block';
    
    mostrarToast('✅ Código verificado! Crie sua nova senha.', 'sucesso');
}

// Passo 3: Criar nova senha
function criarNovaSenha() {
    const novaSenha = document.getElementById('recNovaSenha').value;
    const confirmarSenha = document.getElementById('recConfirmarSenha').value;
    
    if (!novaSenha || novaSenha.length < 6) {
        mostrarToast('❌ A senha deve ter no mínimo 6 caracteres!', 'erro');
        return;
    }
    
    if (novaSenha !== confirmarSenha) {
        mostrarToast('❌ As senhas não coincidem!', 'erro');
        return;
    }
    
    if (!usuarioRecuperando) {
        mostrarToast('❌ Erro! Recomece o processo.', 'erro');
        return;
    }
    
    // Atualizar senha do usuário
    const usuarios = carregarDados('usuarios') || [];
    const index = usuarios.findIndex(u => u.id === usuarioRecuperando.id);
    
    if (index !== -1) {
        usuarios[index].senha = novaSenha;
        salvarDados('usuarios', usuarios);
        
        // Limpar dados de recuperação
        codigoRecuperacao = null;
        usuarioRecuperando = null;
        
        // Mostrar modal de sucesso
        document.getElementById('modalSucesso').classList.add('active');
        
        console.log(`✅ SENHA ALTERADA PARA: ${usuarios[index].email}`);
        console.log(`🔑 NOVA SENHA: ${novaSenha}`);
    } else {
        mostrarToast('❌ Erro ao salvar! Tente novamente.', 'erro');
    }
}

// Funções auxiliares
function mascararEmail(email) {
    const [nome, dominio] = email.split('@');
    const nomeMascarado = nome.substring(0, 2) + '***' + nome.substring(nome.length - 1);
    return nomeMascarado + '@' + dominio;
}

function mascararCelular(celular) {
    const numeros = celular.replace(/\D/g, '');
    return '(' + numeros.substring(0, 2) + ') ' + numeros.substring(2, 7) + '-****';
}

function iniciarTimerReenvio() {
    let segundos = 30;
    const btnReenviar = document.querySelector('#recuperarPasso2 .btn-outline');
    
    if (timerReenvio) clearInterval(timerReenvio);
    
    btnReenviar.disabled = true;
    btnReenviar.textContent = '⏳ Aguarde ' + segundos + 's';
    
    timerReenvio = setInterval(() => {
        segundos--;
        btnReenviar.textContent = '⏳ Aguarde ' + segundos + 's';
        
        if (segundos <= 0) {
            clearInterval(timerReenvio);
            btnReenviar.disabled = false;
            btnReenviar.textContent = '🔄 Reenviar';
        }
    }, 1000);
}

// Simular envio de e-mail (no app real, isso vai para o backend)
function simularEnvioEmail(email, nome, codigo) {
    console.log('========================================');
    console.log('📧 SIMULANDO ENVIO DE E-MAIL');
    console.log('========================================');
    console.log('De: no-reply@lpxconstrutor.com.br');
    console.log('Para: ' + email);
    console.log('Assunto: Código de Recuperação - LPXConstrutor');
    console.log('---');
    console.log('Olá ' + nome + '!');
    console.log('');
    console.log('Você solicitou a recuperação de senha.');
    console.log('Seu código de verificação é: ' + codigo);
    console.log('');
    console.log('Este código expira em 10 minutos.');
    console.log('');
    console.log('Se não foi você, ignore este e-mail.');
    console.log('---');
    console.log('Equipe LPXConstrutor');
    console.log('========================================');
    
    // Para um app real, use um serviço como:
    // EmailJS, SendGrid, Mailchimp, AWS SES, etc.
}

// Simular envio de SMS
function simularEnvioSMS(celular, codigo) {
    console.log('========================================');
    console.log('📱 SIMULANDO ENVIO DE SMS');
    console.log('========================================');
    console.log('Para: ' + celular);
    console.log('Mensagem: Seu código LPXConstrutor: ' + codigo);
    console.log('========================================');
    
    // Para um app real, use um serviço como:
    // Twilio, TotalVoice, Zenvia, etc.
}

// Modificar a função recuperarSenha() existente
function recuperarSenha() {
    abrirRecuperarSenha();
}
