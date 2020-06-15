// Select DOM elements to work with
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const webChat = document.getElementById("webchat")

function showWelcomeMessage() {

    webChat.classList.remove('d-none')

    // reconfigure DOM elements
    webChat.style.display = 'block'
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}
