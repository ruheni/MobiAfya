// Select DOM elements to work with
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const webChat = document.getElementById("webchat")


function checkAuth() {
    if (signInButton.innerHTML === `Sign Out`) {
        webChat.style.display = 'block'
    }
}

checkAuth()

function showWelcomeMessage(account) {

    // Reconfiguring DOM elements
    // cardDiv.classList.remove('d-none');

    // Reconfiguring DOM elements
    // cardDiv.style.display = 'initial';
    // welcomeDiv.innerHTML = `Welcome ${account.name}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphMailEndpoint) {
    }
}
