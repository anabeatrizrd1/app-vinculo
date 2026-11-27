import { auth, db } from '../firebase.config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let modoCadastro = true; //torna verdade a tela para cadastro

const tituloTela = document.querySelector(".titulo"); //constantes para conseguir editar texto 
const botaoConfirmar = document.querySelector(".confirmar-cadastro");
const linkLogin = document.querySelector(".alterar-login");
const mensagemCadastro = document.querySelector(".mensagemCadastro");
const linkSenha = document.querySelector("#esqueci-senha");

linkSenha.addEventListener("click", (event) => {
    event.preventDefault();
    const email=document.querySelector(".email-ong").value;

    if (!email) {
        mostrarMensagem("Digite seu e-mail para redefinir sua senha!");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            mostrarMensagem("E-mail para redefinir sua senha foi enviado!")
        })
        .catch(() => {
            mostrarMensagem("Não foi possível enviar o e-mail! Verifique seu e-mail digitado.")
        });
});

linkSenha.style.display = "none";

linkLogin.addEventListener("click", (event) => { //evento ao clicar no link para logar
    event.preventDefault(); //cancela o comportamento padrão do comando

    modoCadastro = !modoCadastro; // a exclamação inverte o valor da variável
    mensagemCadastro.style.display = "none"; // tira as mensagens

    if (modoCadastro) {
        tituloTela.textContent = "Quero cadastrar minha ONG";
        botaoConfirmar.textContent = "Confirmar";
        linkLogin.textContent = "Já tenho minha ONG cadastrada";
        linkSenha.style.display = "none";
    } else {
        tituloTela.textContent = "Entrar na minha ONG";
        botaoConfirmar.textContent = "Entrar";
        linkLogin.textContent = "Quero cadastrar minha ONG";
        linkSenha.style.display = "block";
    }
});

function mostrarMensagem(mensagem){ //função para mostrar mensagem após clicar no botão
    mensagemCadastro.style.display="block";
    mensagemCadastro.innerHTML=mensagem;
}

botaoConfirmar.addEventListener('click', (event)=>{ //evento para o clique do botão de confirmar cadastro 
    event.preventDefault(); 
    const email=document.querySelector(".email-ong").value; //retorna o primeiro elemento da página de acordo com a classe
    const password=document.querySelector('.senha-ong').value;

    if (modoCadastro) { // if = cadastro
        createUserWithEmailAndPassword(auth, email, password) //cria um usuário com email e senha
            .then((userCredencial)=>{ //dados salvos do usuário
                const user=userCredencial.user;
                const userData={
                    email: email,
                };
                mostrarMensagem('Cadastro concluído!');
                const docRef=doc(db, "users", user.uid); //cria uma referência no banco de dados (firestore)
                setDoc(docRef, userData)
                    .then (()=>{
                        window.location.href='perfil.html'; //envia para cá após o clique
                    })
                    .catch((error)=>{ //identifica um erro do banco de dados
                        console.error('Algo deu errado.', error);
                    });
            })
            .catch((error)=>{ //identifica um erro no createUserWithEmailAndPassword
                const errorCode=error.code;
                if(errorCode=='auth/email-already-in-use') {
                    mostrarMensagem('ONG já cadastrada!');
                } else{
                    mostrarMensagem('Não foi possível cadastrar a ONG!');
                }
         });
    } else { // else = login
        signInWithEmailAndPassword(auth, email, password) //loga um usuário de acordo com o email e senha
          .then((userCredencial)=>{
              window.location.href='perfil.html';  // envia o usurio para o perfil
          })
          .catch((error)=>{
            mostrarMensagem("E-mail ou senha incorretos!");
          });
    }
});

