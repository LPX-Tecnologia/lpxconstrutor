// ==========================================================
// ===== auth.js CORRIGIDO =====
// ==========================================================

class AuthService {
    
    async login(email, senha) {
        try {
            console.log('🔑 Tentando login:', email);
            
            const userCredential = await auth.signInWithEmailAndPassword(email, senha);
            console.log('✅ Login auth OK:', userCredential.user.uid);
            
            // Busca dados no Firestore usando o UID do Auth
            const doc = await db.collection('usuarios').doc(userCredential.user.uid).get();
            
            if (!doc.exists) {
                console.error('❌ Documento não encontrado no Firestore');
                await auth.signOut();
                return { sucesso: false, erro: 'Usuário não encontrado. Faça cadastro novamente.' };
            }

            const usuario = { id: doc.id, ...doc.data() };
            console.log('✅ Dados carregados:', usuario.nome);
            
            // Atualiza último login
            await db.collection('usuarios').doc(userCredential.user.uid).update({
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

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
            
            // Validações
            if (!dados.nome || dados.nome.length < 3) {
                return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
            }
            if (!dados.email || !dados.email.includes('@')) {
                return { sucesso: false, erro: 'Email inválido' };
            }
            if (!dados.senha || dados.senha.length < 6) {
                return { sucesso: false, erro: 'Senha deve ter pelo menos 6 caracteres' };
            }

            // Cria usuário no Authentication
            console.log('🔐 Criando no Authentication...');
            const userCredential = await auth.createUserWithEmailAndPassword(
                dados.email, 
                dados.senha
            );
            console.log('✅ Auth criado:', userCredential.user.uid);

            // Prepara dados para Firestore (IMPORTANTE: usa UID do Auth como ID)
            const usuario = {
                uid: userCredential.user.uid, // UID do Firebase Auth
                nome: dados.nome,
                email: dados.email,
                tipo: dados.tipo,
                celular: dados.celular || '',
                cpf: dados.cpf || '',
                profissao: dados.profissao || '',
                experiencia: parseInt(dados.experiencia) || 0,
                score: 0,
                avaliacoes: [],
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativo: true
            };

            // Salva no Firestore usando UID como ID do documento
            console.log('💾 Salvando no Firestore...');
            await db.collection('usuarios')
                .doc(userCredential.user.uid) // USA O UID DO AUTH COMO ID
                .set(usuario);
            
            console.log('✅ Cadastro completo!');

            return { 
                sucesso: true, 
                usuario: { id: userCredential.user.uid, ...usuario } 
            };

        } catch (error) {
            console.error('❌ Erro no cadastro:', error.code, error.message);
            
            // Se criou auth mas falhou Firestore, limpa
            const user = auth.currentUser;
            if (user) {
                try {
                    await user.delete();
                    console.log('🗑️ Usuário auth removido');
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

    async recuperarSenha(email) {
        try {
            await auth.sendPasswordResetEmail(email, {
                url: window.location.origin,
                handleCodeInApp: false
            });
            return { sucesso: true, mensagem: 'Email de recuperação enviado!' };
        } catch (error) {
            return { 
                sucesso: false, 
                erro: this.traduzirErro(error.code) 
            };
        }
    }

    async logout() {
        try {
            await auth.signOut();
            return { sucesso: true };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    onAuthStateChange(callback) {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    console.log('🔄 Verificando sessão:', user.uid);
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
            'auth/email-already-in-use': 'Este email já está cadastrado',
            'auth/invalid-email': 'Email inválido',
            'auth/operation-not-allowed': 'Operação não permitida',
            'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
            'auth/user-disabled': 'Usuário desativado',
            'auth/user-not-found': 'Email não cadastrado',
            'auth/wrong-password': 'Senha incorreta',
            'auth/invalid-credential': 'Credenciais inválidas',
            'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde',
            'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
            'permission-denied': 'Sem permissão. Verifique as regras de segurança'
        };
        return erros[codigo] || `Erro: ${codigo}`;
    }
}

// Instância global
const authService = new AuthService();

console.log('✅ AuthService carregado');
