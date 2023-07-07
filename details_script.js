const userDetailsContainer = document.getElementById('userDetailsContainer');
const reposContainer = document.getElementById('repos');

function repo(name) {
    const url = window.location.search.substr(1);
    const repolink = url.split('&');

    for (let i = 0; i < repolink.length; i++) {
        const repository = repolink[i].split('=');
        if (repository[0] === name) {
            return repository[1];
        }
    }
    return null;
}

async function fetchUserDetails() {
    const username = repo('username');

    try {
        const userDetailsResponse = await fetch(`https://api.github.com/users/${username}`);
        const userDetails = await userDetailsResponse.json();
        console.log(userDetails);

        const userDetailsHTML = createUserDetailsHTML(userDetails);
        userDetailsContainer.innerHTML = userDetailsHTML;

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stargazers_count&direction=desc`);
        const repos = await reposResponse.json();
        console.log(repos);

        const topRepos = repos.slice(0, 5);
        const reposHTML = topRepos.map(repo => createRepoHTML(repo));
        reposContainer.innerHTML = reposHTML.join('');
    } catch (error) {
        console.log(error);
    }
}

function createUserDetailsHTML(user) {
const userDetailsHTML = `
<div class="card">
    <div class="imgdiv">
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar"/>
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
            <li>${user.followers}<b>Follower</b></li>
            <li>${user.following}<b>Following</b></li>
            <li>${user.public_repos}<b>Repos</b></li>
        </ul>
        <button id="view"><a href="${`https://github.com/${user.login}`}">View Profile</a></button>
    </div>
</div>
`;
const headingText = user.login === "malayadaniGIT" ? "My GitHub Profile" : "";
const headingHTML = headingText ? `<h2>${headingText}</h2>` : "";

return headingHTML + userDetailsHTML;
}
function createRepoHTML(repo) {
    const repoHTML = `
        <div class="repo">
            <a href="${repo.html_url}" class="repo-link">${repo.name}</a>
          
        </div>
    `;

    return repoHTML;
}
fetchUserDetails();