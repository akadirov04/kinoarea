import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase.config"

let form = document.forms[0]

form.onsubmit = (e) => {
    e.preventDefault()

    let name = form.elements["name"].value
    let email = form.elements["email"].value
    let password = form.elements["password"].value

    if (validateName(name) && validateEmail(email) && validatePassword(password)) {
        signUp(email, password, name)
        form.reset()
    } else {
        alert("Пожалуйста, убедитесь, что все поля заполнены правильно.")
    }
}

let signUp = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user

        if (user) {
            window.location.replace("/")
            alert("Вы успешно зарегистрированы")
        }

        updateProfile(user, {
            displayName: name
        })

        console.log(user);
    })
    .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
            alert("Такой email уже существует.")
        } else {
            console.error(error)
        }
    })
}


function validateName(name) {
    return /^[^\d]+$/.test(name)
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password) {
    return password.length >= 8
}
