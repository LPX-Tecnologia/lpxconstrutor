// ==========================================================
// ===== SISTEMA DE AUTENTICAÇÃO (SEM SENHAS NO BANCO) =====
// ==========================================================

class AuthSystem {
    constructor() {
        this.usuarioLogado = null;
        this.authStateChanged = false;
    }

    // Cadastro seguro
    async cadastrar(dados) {
        try {
            // Validações
            this.validarDadosCadastro(dados);

            // Cria usuário no Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(
                dados.email,
                dados.senha
            );

            // Salva dados no Firestore (SEM senha)
            const usuario = {
                uid: userCredential.user.uid,
                nome: dados.nome,
                email: dados.email,
                tipo: dados.tipo,
                celular: dados.celular,
                cpf: dados.cpf,
                profissao: dados.profissao || '',
                experiencia: dados.experiencia || 0,
                habilidades: dados.habilidades || '',
                fotoPerfil: '',
                score: 0,
                avaliacoes: [],
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ativo: true
            };

            await db.collection('usuarios')
                .doc(userCredential.user.uid)
                .set(usuario);

            this.usuarioLogado = { ...usuario, id: userCredential.user.uid };
            
            // Envia email de verificação
            await userCredential.user.sendEmailVerification();
            
            return { sucesso: true, usuario: this.usuarioLogado };

        } catch (error) {
            console.error('Erro cadastro:', error);
            return { 
                sucesso: false, 
                erro: this.traduzirErroAuth(error.code) 
            };
        }
    }

    // Login seguro
    async login(email, senha) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, senha);
            
            // Busca dados completos do Firestore
            const doc = await db.collection('usuarios')
                .doc(userCredential.user.uid)
                .get();

            if (!doc.exists) {
                await auth.signOut();
                return { sucesso: false, erro: 'Usuário não encontrado' };
            }

            this.usuarioLogado = {
                id: doc.id,
                ...doc.data()
            };

            // Atualiza último login
            await db.collection('usuarios').doc(doc.id).update({
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { sucesso: true, usuario: this.usuarioLogado };

        } catch (error) {
            console.error('Erro login:', error);
            return { 
                sucesso: false, 
                erro: this.traduzirErroAuth(error.code) 
            };
        }
    }

    // Recuperação de senha
    async recuperarSenha(email) {
        try {
            await auth.sendPasswordResetEmail(email, {
                url: window.location.origin + '/login',
                handleCodeInApp: false
            });
            return { sucesso: true };
        } catch (error) {
            return { 
                sucesso: false, 
                erro: this.traduzirErroAuth(error.code) 
            };
        }
    }

    // Logout
    async logout() {
        try {
            await auth.signOut();
            this.usuarioLogado = null;
            return { sucesso: true };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Verifica se usuário está logado
    async verificarSessao() {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user && !this.authStateChanged) {
                    const doc = await db.collection('usuarios').doc(user.uid).get();
                    if (doc.exists) {
                        this.usuarioLogado = {
                            id: doc.id,
                            ...doc.data()
                        };
                    }
                }
                this.authStateChanged = true;
                unsubscribe();
                resolve(this.usuarioLogado);
            });
        });
    }

    // Validações
    validarDadosCadastro(dados) {
        if (!dados.nome || dados.nome.length < 3) {
            throw new Error('Nome deve ter pelo menos 3 caracteres');
        }
        if (!dados.email || !dados.email.includes('@')) {
            throw new Error('Email inválido');
        }
        if (!dados.senha || dados.senha.length < 6) {
            throw new Error('Senha deve ter pelo menos 6 caracteres');
        }
        if (!dados.cpf || dados.cpf.replace(/\D/g, '').length !== 11) {
            throw new Error('CPF inválido');
        }
        if (!dados.celular || dados.celular.replace(/\D/g, '').length < 10) {
            throw new Error('Celular inválido');
        }
    }

    // Tradução de erros
    traduzirErroAuth(codigo) {
        const erros = {
            'auth/email-already-in-use': 'Este email já está cadastrado',
            'auth/invalid-email': 'Email inválido',
            'auth/operation-not-allowed': 'Operação não permitida',
            'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
            'auth/user-disabled': 'Usuário desativado',
            'auth/user-not-found': 'Usuário não encontrado',
            'auth/wrong-password': 'Senha incorreta',
            'auth/invalid-credential': 'Credenciais inválidas',
            'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde'
        };
        return erros[codigo] || 'Erro ao processar solicitação';
    }
}

// Instância global
const authSystem = new AuthSystem();