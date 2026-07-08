// ==========================================================
// ===== SISTEMA DE AUTENTICAÇÃO =====
// ==========================================================

class AuthService {
    
    async login(email, senha) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, senha);
            
            // Busca dados completos do Firestore
            const doc = await db.collection('usuarios').doc(userCredential.user.uid).get();
            
            if (!doc.exists) {
                await auth.signOut();
                return { sucesso: false, erro: 'Usuário não encontrado no banco de dados' };
            }

            const usuario = { id: doc.id, ...doc.data() };
            
            // Atualiza último login
            await db.collection('usuarios').doc(doc.id).update({
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { sucesso: true, usuario };

        } catch (error) {
            console.error('Erro no login:', error);
            return { 
                sucesso: false, 
                erro: this.traduzirErro(error.code) 
            };
        }
    }

    async cadastrar(dados) {
        try {
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

            // Verifica se email já existe
            const snapshot = await db.collection('usuarios')
                .where('email', '==', dados.email)
                .limit(1)
                .get();

            if (!snapshot.empty) {
                return { sucesso: false, erro: 'Este email já está cadastrado' };
            }

            // Cria usuário no Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(
                dados.email, 
                dados.senha
            );

            // Prepara dados para Firestore (sem senha!)
            const usuario = {
                uid: userCredential.user.uid,
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

            // Salva no Firestore
            await db.collection('usuarios')
                .doc(userCredential.user.uid)
                .set(usuario);

            // Envia email de verificação
            await userCredential.user.sendEmailVerification();

            return { 
                sucesso: true, 
                usuario: { id: userCredential.user.uid, ...usuario } 
            };

        } catch (error) {
            console.error('Erro no cadastro:', error);
            
            // Se criou auth mas falhou Firestore, remove auth
            if (error.code === 'permission-denied') {
                const user = auth.currentUser;
                if (user) await user.delete();
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
                    const doc = await db.collection('usuarios').doc(user.uid).get();
                    if (doc.exists) {
                        callback({ id: doc.id, ...doc.data() });
                    } else {
                        callback(null);
                    }
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                    callback(null);
                }
            } else {
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
            'auth/network-request-failed': 'Erro de conexão. Verifique sua internet'
        };
        return erros[codigo] || `Erro: ${codigo}`;
    }
}

// Instância global
const authService = new AuthService();
