import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase.config"

let btn = document.querySelector(".sig")

btn.onclick =() => {
    window.location = "../signup/index.html"
}

document.getElementById("resetLink").addEventListener("click", function(event) {
    event.preventDefault();
    
    let modalReset = document.getElementById("modalReset");
    let signInForm = document.querySelector(".signIn");

    if (modalReset.classList.contains("hidden")) {
        modalReset.classList.remove("hidden");
        modalReset.classList.add("visible");
        signInForm.classList.remove("visible");
        signInForm.classList.add("hidden");
    } else {
        modalReset.classList.remove("visible");
        modalReset.classList.add("hidden");
        signInForm.classList.remove("hidden");
        signInForm.classList.add("visible");
    }
});

let form = document.forms[0]
let resetForm = document.forms[1]

form.onsubmit = (e) => {
    e.preventDefault()

    let user = {}

    let fn = new FormData(form)

    let email = fn.get("email")
    let password = fn.get("password")
    
    signIn(email, password)
    form.reset()
}

resetForm.onsubmit =(e) => {
    e.preventDefault()
    let email = document.querySelector("#emailReset").value
    sendPasswordResetEmail(auth, email).then(() => {
        console.log("Passwrod reset email sent!");
        alert("Password reset email sent! Check your inbox.")
    })
    .catch((error) => {
        const errorCode = error.code;
        console.error(
            "Error sending password reset email:", 
            errorCode,
        )
    })

}

function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
        const user = userCredential
        if(user) {
            window.location.replace("/")
            alert("Вы вошли в аккаунт")
        }
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        alert("Пользователь с таким email не зарегистрирован.")
            const errorMessage = error.message;
            console.error("Error signing in:", errorMessage);
    })
}
