class AuthService{
    async login(email,senha){
        try{
            const uc=await auth.signInWithEmailAndPassword(email,senha);
            const doc=await db.collection('usuarios').doc(uc.user.uid).get();
            if(!doc.exists){await auth.signOut();return{sucesso:false,erro:'Usuário não encontrado'}}
            const usuario={id:doc.id,...doc.data()};
            await db.collection('usuarios').doc(uc.user.uid).update({ultimoLogin:firebase.firestore.FieldValue.serverTimestamp()});
            return{sucesso:true,usuario}
        }catch(error){return{sucesso:false,erro:this.traduzirErro(error.code)}}
    }
    async cadastrar(dados){
        try{
            if(!dados.nome||dados.nome.length<3)return{sucesso:false,erro:'Nome deve ter pelo menos 3 caracteres'};
            if(!dados.email||!dados.email.includes('@'))return{sucesso:false,erro:'Email inválido'};
            if(!dados.senha||dados.senha.length<6)return{sucesso:false,erro:'Senha deve ter pelo menos 6 caracteres'};
            const uc=await auth.createUserWithEmailAndPassword(dados.email.trim().toLowerCase(),dados.senha);
            const usuario={uid:uc.user.uid,nome:dados.nome.trim(),email:dados.email.trim().toLowerCase(),tipo:dados.tipo||'profissional',celular:dados.celular||'',cpf:dados.cpf||'',profissao:dados.profissao||'',experiencia:parseInt(dados.experiencia)||0,habilidades:dados.habilidades||'',fotoPerfil:'',score:0,avaliacoes:[],avaliacoesRecebidas:0,dataCriacao:firebase.firestore.FieldValue.serverTimestamp(),ativo:true};
            await db.collection('usuarios').doc(uc.user.uid).set(usuario);
            uc.user.sendEmailVerification().catch(()=>{});
            return{sucesso:true,usuario:{id:uc.user.uid,...usuario}}
        }catch(error){
            const user=auth.currentUser;if(user)try{await user.delete()}catch(e){}
            return{sucesso:false,erro:this.traduzirErro(error.code)}
        }
    }
    async recuperarSenha(email){
        try{await auth.sendPasswordResetEmail(email.trim().toLowerCase());return{sucesso:true,mensagem:'Email enviado!'}}
        catch(error){return{sucesso:false,erro:this.traduzirErro(error.code)}}
    }
    async logout(){try{await auth.signOut();return{sucesso:true}}catch(error){return{sucesso:false,erro:error.message}}}
    onAuthStateChange(callback){
        return auth.onAuthStateChanged(async(user)=>{
            if(user){
                try{const doc=await db.collection('usuarios').doc(user.uid).get();
                if(doc.exists)callback({id:doc.id,...doc.data()});else callback(null)}
                catch(e){callback(null)}
            }else{callback(null)}
        })
    }
    traduzirErro(codigo){
        const erros={'auth/email-already-in-use':'Email já cadastrado','auth/invalid-email':'Email inválido','auth/weak-password':'Senha muito fraca (mínimo 6)','auth/user-not-found':'Email não cadastrado','auth/wrong-password':'Senha incorreta','auth/invalid-credential':'Credenciais inválidas','auth/too-many-requests':'Muitas tentativas. Aguarde.'};
        return erros[codigo]||'Erro ao processar'
    }
}
const authService=new AuthService();
console.log('✅ AuthService carregado');
