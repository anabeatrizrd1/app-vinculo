import { auth, db } from '../firebase.config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function mostrarMensagem(mensagem){
    var mensagemCadastro=document.querySelector(".mensagemCadastro");
    mensagemCadastro.style.display="block";
    mensagemCadastro.innerHTML=mensagem;
}

const singUp=document.querySelector(".confirmar-cadastro");
console.log(singUp)
singUp.addEventListener('click', (event)=>{ //evento para o clique do botão de confirmar cadastro 
    console.log("cliquei")
    event.preventDefault(); //cancela o comportamento padrão do comando
    const email=document.querySelector(".email-ong").value;
    const password=document.querySelector('.senha-ong').value;
    console.log("cliquei", email, password)

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredencial)=>{ //dados salvos do usuário
        const user=userCredencial.user;
        const userData={
            email: email,
        };
        mostrarMensagem('Cadastro concluído!');
        const docRef=doc(db, "users", user.uid); //cria uma referência no banco de dados (firestore)
        setDoc(docRef, userData)
        .then (()=>{
            window.location.href='perfil.html';
        })
        .catch((error)=>{
            console.error("ERRO FIREBASE:", error)
            console.error('Algo deu errado.', error);
        });
    })
      .catch((error)=>{
        console.error("ERRO FIREBASE:", error)
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            mostrarMensagem('ONG já cadastrada!', 'cadastrar-ong');
        }
        else{
            mostrarMensagem('Não foi possível cadastrar a ONG!', 'cadastrar-ong');
        }
    })
})


