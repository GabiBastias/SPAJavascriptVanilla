const infoSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path></svg>`;

const data = fetch('https://randomuser.me/api?results=20')
    .then(res => res.json())
    .then(res => res.results)
    .catch(e => console.error(e));

const table = document.getElementById("users-table");
const mainTable = document.getElementById("main-table");
const userInfoContainer = document.getElementById("user-info-article");
const aboutArticle = document.getElementById("about-article");
const h1Title = document.getElementById("h1-title");
const users = await data;

users.map((user, index) => {
    const row = table.insertRow();
    row.setAttribute("data-user-id", index);

    const photoCell = row.insertCell();
    const img = document.createElement("img");
    img.src = `${user.picture.medium}`;
    img.alt = `Profile picture of ${user.name.first}`;
    photoCell.appendChild(img);

    const nameCell = row.insertCell();
    nameCell.textContent = `${user.name.first} ${user.name.last}`

    const emailCell = row.insertCell();
    emailCell.textContent = `${user.email}`

    const countryCell = row.insertCell();
    countryCell.textContent = `${user.location.country}`

    const profileCell = row.insertCell();
    const button = document.createElement("button");
    button.innerHTML = infoSVG;
    button.className = "profile-button";
    profileCell.appendChild(button)
    button.addEventListener("click", () => {
        window.history.pushState({index}, "");
        mostrarInfoUsuario(index);
    });

    window.addEventListener("popstate", () => {
        mostrarInfoUsuario(index);
    });

})

const mostrarInfoUsuario = (userId) => {
    const user = users[userId];
    mainTable.style.display = "none";
    aboutArticle.style.display = "none"
    h1Title.innerHTML = `${user.login.username}`;
    userInfoContainer.innerHTML = `
        <section class="section-profile">
            <div class="div-profile">
                <h2 class="h2-profile">${user.name.first} ${user.name.last}</h2>
                <img class="img-profile" src=${user.picture.large} alt="${user.name.first} photo" />
            </div>
            <ul class="unordered-list">
                <li>Email: ${user.email}</li>
                <li>Gender: ${user.gender}</li>
                <li>Username: ${user.login.username}</li>
                <li>Age: ${user.dob.age}</li>          
                <li>Phone: ${user.phone}</li>          
                <li>Country: ${user.location.country}</li>
                <li>State: ${user.location.state}</li>
                <li>City: ${user.location.city}</li>
                <li>Post Code: ${user.location.postcode}</li>
            </ul>
        </section>
    `;
    userInfoContainer.style.display = "block";
}

const btnUserList = document.getElementById("btn-user-list");
btnUserList.addEventListener("click", () => {
    aboutArticle.style.display = "none"
    userInfoContainer.style.display = "none";
    h1Title.innerHTML = "Users List";
    mainTable.style.display = "block";
});

const btnAbout = document.getElementById("btn-about");
btnAbout.addEventListener("click", () => {
    mainTable.style.display = "none";
    userInfoContainer.style.display = "none";
    h1Title.innerHTML = "About";
    aboutArticle.innerHTML = `
        <section class="section-about">
            <div class="div-about-info">
                <p>Welcome to my Single Page Application.</p>

                <p>This application, built using vanilla JavaScript, HTML and CSS Vanilla, offers a smooth browsing experience.</p>
                
                <p>Discover user profiles seamlessly with just a click. Enjoy instant access to user information without page reloads, thanks to the power of single-page architecture. Explore user details effortlessly, all within this sleek and efficient application.<p>

                <p>If you reload the page, it the entire list of users will be updated. I am fetching from a random people API and with each upload it fetchs again.<p>
            </div>

            <div class="div-myself">
                <h3> A picture of myself </h3>
                <img src="https://github.com/GabiBastias.png" alt="Federico Bastias"/>
            </div>
        </section>
    `
    aboutArticle.style.display = "block"
})



  