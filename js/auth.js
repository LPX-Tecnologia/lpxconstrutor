// ==========================================================
// ===== SISTEMA DE AUTENTICAÇÃO =====
// ==========================================================

class AuthService {
    
    async login(email, senha) {
        try {
            console.log('🔑 Tentando login:', email);
            
            const userCredential = await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), senha);
            console.log('✅ Login auth OK:', userCredential.user.uid);
            
            const doc = await db.collection('usuarios').doc(userCredential.user.uid).get();
            
            if (!doc.exists) {
                console.error('❌ Documento não encontrado no Firestore');
                await auth.signOut();
                return { sucesso: false, erro: 'Usuário não encontrado. Faça cadastro novamente.' };
            }

            const usuario = { id: doc.id, ...doc.data() };
            console.log('✅ Dados carregados:', usuario.nome);
            
            await db.collection('usuarios').doc(userCredential.user.uid).update({
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(err => console.log('Erro ao atualizar último login (não crítico)', err));

            return { sucesso: true, usuario };

        } catch (error) {
            console.error('❌ Erro no login:', error.code, error.message);
            return { 
                sucesso: false, 
                erro: this.traduzirErro(error.code) 
            };
        }
    }

    async cadastrar(dados) {
        try {
            console.log('📝 Iniciando cadastro:', dados.email);
            
            if (!dados.nome || dados.nome.length < 3) {
                return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
            }
            if (!dados.email || !dados.email.includes('@')) {
                return { sucesso: false, erro: 'Email inválido' };
            }
            if (!dados.senha || dados.senha.length < 6) {
                return { sucesso: false, erro: 'Senha deve ter pelo menos 6 caracteres' };
            }

            console.log('🔐 Criando no Firebase Auth...');
            const userCredential = await auth.createUserWithEmailAndPassword(
                dados.email.trim().toLowerCase(),
                dados.senha
            );
            console.log('✅ Auth criado:', userCredential.user.uid);

            const usuario = {
                uid: userCredential.user.uid,
                nome: dados.nome.trim(),
                email: dados.email.trim().toLowerCase(),
                tipo: dados.tipo || 'profissional',
                celular: dados.celular || '',
                cpf: dados.cpf || '',
                profissao: dados.profissao || '',
                experiencia: parseInt(dados.experiencia) || 0,
                habilidades: dados.habilidades || '',
                fotoPerfil: '',
                score: 0,
                avaliacoes: [],
                avaliacoesRecebidas: 0,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativo: true
            };

            console.log('💾 Salvando no Firestore...');
            await db.collection('usuarios')
                .doc(userCredential.user.uid)
                .set(usuario);
            
            console.log('✅ Cadastro completo!');

            userCredential.user.sendEmailVerification()
                .then(() => console.log('📧 Email de verificação enviado'))
                .catch(err => console.warn('⚠️ Erro ao enviar email de verificação:', err));

            return { 
                sucesso: true, 
                usuario: { id: userCredential.user.uid, ...usuario } 
            };

        } catch (error) {
            console.error('❌ Erro no cadastro:', error.code, error.message);
            
            const user = auth.currentUser;
            if (user) {
                try {
                    await user.delete();
                    console.log('🗑️ Auth removido após falha');
                } catch (e) {
                    console.error('Erro ao limpar auth:', e);
                }
            }
            
            return { 
                sucesso: false, 
                erro: this.traduzirErro(error.code) 
            };
        }
    }

    // ===== RECUPERAÇÃO DE SENHA PELO FIREBASE =====
    async recuperarSenha(email) {
        try {
            console.log('📧 Enviando recuperação Firebase para:', email);
            
            const emailLimpo = email.trim().toLowerCase();
            
            if (!emailLimpo || !emailLimpo.includes('@')) {
                return { 
                    sucesso: false, 
                    erro: 'Email inválido. Verifique e tente novamente.' 
                };
            }
            
            const actionCodeSettings = {
                url: window.location.origin + '/?recuperacao=true',
                handleCodeInApp: false
            };
            
            await auth.sendPasswordResetEmail(emailLimpo, actionCodeSettings);
            
            console.log('✅ Email de recuperação Firebase enviado para:', emailLimpo);
            
            return { 
                sucesso: true, 
                mensagem: 'Email de recuperação enviado! Verifique sua caixa de entrada e spam.',
                metodo: 'firebase'
            };
            
        } catch (error) {
            console.error('❌ Firebase falhou:', error.code);
            // Se falhar, tenta o método manual
            return await this.recuperarSenhaManual(email);
        }
    }

    // ===== RECUPERAÇÃO MANUAL (FALLBACK) =====
    async recuperarSenhaManual(email) {
        try {
            console.log('📧 Tentando recuperação manual para:', email);
            
            const emailLimpo = email.trim().toLowerCase();
            
            if (!emailLimpo || !emailLimpo.includes('@')) {
                return { sucesso: false, erro: 'Email inválido.' };
            }
            
            // Busca usuário pelo email
            const snapshot = await db.collection('usuarios')
                .where('email', '==', emailLimpo)
                .get();
            
            if (snapshot.empty) {
                return { sucesso: false, erro: 'Email não cadastrado.' };
            }
            
            const doc = snapshot.docs[0];
            
            // Gera código de 6 dígitos
            const codigo = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Salva código no Firestore (expira em 30 minutos)
            await db.collection('usuarios').doc(doc.id).update({
                codigoRecuperacao: codigo,
                codigoExpiracao: firebase.firestore.Timestamp.fromDate(
                    new Date(Date.now() + 30 * 60 * 1000)
                )
            });
            
            console.log('✅ Código manual gerado:', codigo);
            
            return { 
                sucesso: true, 
                mensagem: 'Use o código abaixo para redefinir sua senha.',
                codigo: codigo,
                uid: doc.id,
                metodo: 'manual'
            };
            
        } catch (error) {
            console.error('❌ Erro na recuperação manual:', error);
            return { sucesso: false, erro: 'Erro ao gerar código. Tente novamente.' };
        }
    }

    // ===== SOLICITAR CÓDIGO (MÉTODO UNIFICADO) =====
    async solicitarCodigoRecuperacao(email) {
        try {
            console.log('📧 Solicitando código para:', email);
            
            const emailLimpo = email.trim().toLowerCase();
            
            if (!emailLimpo || !emailLimpo.includes('@')) {
                return { sucesso: false, erro: 'Email inválido.' };
            }
            
            // Busca usuário
            const snapshot = await db.collection('usuarios')
                .where('email', '==', emailLimpo)
                .get();
            
            if (snapshot.empty) {
                return { sucesso: false, erro: 'Email não cadastrado.' };
            }
            
            const doc = snapshot.docs[0];
            
            // Gera código de 6 dígitos
            const codigo = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Salva código no Firestore
            await db.collection('usuarios').doc(doc.id).update({
                codigoRecuperacao: codigo,
                codigoExpiracao: firebase.firestore.Timestamp.fromDate(
                    new Date(Date.now() + 30 * 60 * 1000)
                )
            });
            
            console.log('✅ Código gerado:', codigo);
            
            // Tenta enviar por email
            try {
                await auth.sendPasswordResetEmail(emailLimpo, {
                    url: window.location.origin + '/?recuperacao=true',
                    handleCodeInApp: false
                });
                console.log('✅ Email Firebase enviado');
                return { 
                    sucesso: true, 
                    mensagem: 'Email enviado! Verifique sua caixa de entrada e SPAM.',
                    codigo: null,
                    uid: doc.id,
                    metodo: 'firebase'
                };
            } catch (emailError) {
                console.warn('⚠️ Email Firebase falhou, usando código manual');
                return { 
                    sucesso: true, 
                    mensagem: 'Use o código abaixo para redefinir sua senha.',
                    codigo: codigo,
                    uid: doc.id,
                    metodo: 'manual'
                };
            }
            
        } catch (error) {
            console.error('❌ Erro:', error);
            return { sucesso: false, erro: 'Erro ao gerar código.' };
        }
    }

    // ===== VERIFICAR CÓDIGO =====
    async verificarCodigoRecuperacao(uid, codigo) {
        try {
            const doc = await db.collection('usuarios').doc(uid).get();
            
            if (!doc.exists) {
                return { sucesso: false, erro: 'Usuário não encontrado.' };
            }
            
            const data = doc.data();
            
            if (!data.codigoRecuperacao) {
                return { sucesso: false, erro: 'Nenhum código solicitado.' };
            }
            
            if (data.codigoExpiracao && data.codigoExpiracao.toDate() < new Date()) {
                await db.collection('usuarios').doc(uid).update({
                    codigoRecuperacao: firebase.firestore.FieldValue.delete(),
                    codigoExpiracao: firebase.firestore.FieldValue.delete()
                });
                return { sucesso: false, erro: 'Código expirado. Solicite novamente.' };
            }
            
            if (data.codigoRecuperacao !== codigo) {
                return { sucesso: false, erro: 'Código inválido.' };
            }
            
            return { sucesso: true, email: data.email };
            
        } catch (error) {
            return { sucesso: false, erro: 'Erro ao verificar código.' };
        }
    }

    // ===== REDEFINIR SENHA COM CÓDIGO =====
    async redefinirSenhaComCodigo(uid, codigo, novaSenha) {
        try {
            // Verifica código primeiro
            const verificacao = await this.verificarCodigoRecuperacao(uid, codigo);
            if (!verificacao.sucesso) return verificacao;
            
            if (!novaSenha || novaSenha.length < 6) {
                return { sucesso: false, erro: 'Senha deve ter no mínimo 6 caracteres.' };
            }
            
            // Remove o código
            await db.collection('usuarios').doc(uid).update({
                codigoRecuperacao: firebase.firestore.FieldValue.delete(),
                codigoExpiracao: firebase.firestore.FieldValue.delete()
            });
            
            console.log('✅ Código verificado. Email:', verificacao.email);
            console.log('ℹ️ Para redefinir a senha, use o link enviado por email ou entre em contato com o suporte.');
            
            return { 
                sucesso: true, 
                mensagem: 'Email verificado! Verifique seu email para o link de redefinição de senha.',
                email: verificacao.email
            };
            
        } catch (error) {
            return { sucesso: false, erro: 'Erro ao redefinir senha.' };
        }
    }

    async logout() {
        try {
            await auth.signOut();
            console.log('👋 Logout realizado');
            return { sucesso: true };
        } catch (error) {
            console.error('Erro ao sair:', error);
            return { sucesso: false, erro: error.message };
        }
    }

    onAuthStateChange(callback) {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log('🔄 Verificando sessão:', user.uid);
                try {
                    const doc = await db.collection('usuarios').doc(user.uid).get();
                    
                    if (doc.exists) {
                        console.log('✅ Sessão válida');
                        callback({ id: doc.id, ...doc.data() });
                    } else {
                        console.warn('⚠️ Documento não encontrado');
                        callback(null);
                    }
                } catch (error) {
                    console.error('❌ Erro ao verificar sessão:', error);
                    callback(null);
                }
            } else {
                console.log('👤 Nenhum usuário logado');
                callback(null);
            }
        });
    }

    traduzirErro(codigo) {
        const erros = {
            'auth/email-already-in-use': 'Este email já está cadastrado. Use outro email.',
            'auth/invalid-email': 'Email inválido. Verifique o formato.',
            'auth/operation-not-allowed': 'Login por email/senha não está habilitado.',
            'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
            'auth/user-disabled': 'Esta conta foi desativada.',
            'auth/user-not-found': 'Email não cadastrado. Crie uma conta primeiro.',
            'auth/wrong-password': 'Senha incorreta. Tente novamente.',
            'auth/invalid-credential': 'Credenciais inválidas. Email ou senha incorretos.',
            'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
            'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
            'permission-denied': 'Permissão negada. Verifique as regras do Firestore.'
        };
        return erros[codigo] || 'Erro ao processar solicitação. Tente novamente.';
    }
}

const authService = new AuthService();

console.log('✅ AuthService carregado');
