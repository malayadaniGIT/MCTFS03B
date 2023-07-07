var userData = localStorage.getItem("userData");
if (userData) {
    var user = JSON.parse(userData);
    var name = user.githubData.name;
    var userNameElement = document.getElementById("user-name");
    userNameElement.textContent = "Hello, " + name;
}

const tilesContainer = document.getElementById('TilesContainer');

async function fetchData() {
    try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        console.log(data);
        const cards = data.map(repo => createCard(repo));
        tilesContainer.innerHTML = cards.join('');

        const cardElements = document.getElementsByClassName('card');
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].addEventListener('click', handleCardClick);
        }
    } catch (error) {
        console.log(error);
    }
}

function createCard(repo) {
    const card = `
        <div class="card" data-username="${repo.login}">
            <div class="avatardiv">
                <img src="${repo.avatar_url}" alt="Avatar" class="avatar">
            </div>
            <div class="user-info">
                <h2>${repo.login}</h2>
                <ul>
                    <li><b>Followers:</b> <span id="followers-${repo.login}"></span></li>
                    <li><b>Following:</b> <span id="following-${repo.login}"></span></li>
                    <li><b>Repositories:</b> <span id="repos-${repo.login}"></span></li>
                </ul>
            </div>
        </div>
    `;

    getUserDetails(repo.login);

    return card;
}

async function getUserDetails(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        const followersElement = document.getElementById(`followers-${username}`);
        followersElement.textContent = data.followers;
        const followingElement = document.getElementById(`following-${username}`);
        followingElement.textContent = data.following;
        const reposElement = document.getElementById(`repos-${username}`);
        reposElement.textContent = data.public_repos;
    } catch (error) {
        console.log(error);
    }
}

fetchData();

function searchUserDetails() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    if (username === '') {
        return;
    }
    window.location.href = `details.html?username=${username}`;
}