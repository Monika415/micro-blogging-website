const posts = [
    {
        text: "Small steps every day lead to big dreams. 🌱",
        tag: "#motivation #life",
        likes: 16,
        comments: 3,
        time: "2h"
    },
    {
        text: "The sky looks so beautiful today... ☁️",
        tag: "#nature #goodvibes",
        likes: 12,
        comments: 2,
        time: "5h"
    },
    {
        text: "Coding is not just about writing code, it's about solving real world problems. 💻",
        tag: "#developer #learning",
        likes: 25,
        comments: 4,
        time: "1d"
    },
    {
        text: "Grateful for the little things. ❤️",
        tag: "#life #happiness",
        likes: 18,
        comments: 1,
        time: "2d"
    }
];


function displayPosts() {

    const container =
        document.getElementById("postContainer");

    container.innerHTML = posts.map(
        (post, index) => `

        <div class="post">

            <div class="mini-avatar">
                M
            </div>

            <div class="post-content">

                <h4>
                    Monika
                    <span>
                        @monika_d · ${post.time}
                    </span>
                </h4>

                <p>
                    ${post.text}
                    <br>
                    <span style="color:#6657e8">
                        ${post.tag}
                    </span>
                </p>

                <div class="post-actions">

                    <span onclick="commentPost()">
                        💬 ${post.comments}
                    </span>

                    <span onclick="sharePost()">
                        🔄 Share
                    </span>

                    <span onclick="likePost(${index}, this)">
                        ❤️ ${post.likes}
                    </span>

                    <span onclick="savePost()">
                        🔖
                    </span>

                </div>

            </div>

        </div>

    `
    ).join("");
}


function likePost(index, element) {

    posts[index].likes++;

    element.innerHTML =
        `❤️ ${posts[index].likes}`;
}


function commentPost() {

    alert("Comment section opened!");

}


function sharePost() {

    alert("Post link copied!");

}


function savePost() {

    alert("Post saved successfully!");

}


/* NAVIGATION */

const navButtons =
    document.querySelectorAll(".nav-btn");

const pages =
    document.querySelectorAll(".page");


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageName =
            button.dataset.page;

        navButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        pages.forEach(page =>
            page.classList.remove("active-page")
        );

        document
            .getElementById(pageName)
            .classList.add("active-page");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* POST */

document
    .getElementById("postBtn")
    .addEventListener("click", createPost);


document
    .getElementById("postSideBtn")
    .addEventListener("click", () => {

        document
            .getElementById("postInput")
            .focus();

    });


function createPost() {

    const input =
        document.getElementById("postInput");

    const value =
        input.value.trim();

    if (value === "") {

        alert("Please write something first.");

        return;
    }

    posts.unshift({
        text: value,
        tag: "#newpost",
        likes: 0,
        comments: 0,
        time: "now"
    });

    input.value = "";

    displayPosts();

}


/* EDIT PROFILE */

document
    .getElementById("editProfile")
    .addEventListener("click", editProfile);

document
    .getElementById("profileEditButton")
    .addEventListener("click", editProfile);


function editProfile() {

    const name =
        prompt("Enter your name:", "Monika");

    if (name) {

        document.querySelectorAll(
            ".profile-content h2"
        )[0].textContent = name;

        alert("Profile updated!");

    }

}


/* FOLLOWERS */

const followers = [
    ["Deepa", "D"],
    ["Arun", "A"],
    ["Sanjay", "S"],
    ["Priya", "P"],
    ["Kavi", "K"]
];


const following = [
    ["TechVibes", "T"],
    ["NatureClicks", "N"],
    ["BookLover", "B"],
    ["CodeWithMe", "C"],
    ["MusicSoul", "M"]
];


function displayPeople(data, elementId) {

    document.getElementById(elementId).innerHTML =
        data.map(person => `

        <div class="person">

            <div class="mini-avatar">
                ${person[1]}
            </div>

            <div class="person-info">

                <b>${person[0]}</b>

                <small>
                    @${person[0].toLowerCase()}
                </small>

            </div>

            <button
                class="follow"
                onclick="followUser(this)"
            >
                Follow
            </button>

        </div>

    `).join("");

}


function followUser(button) {

    if (button.textContent === "Follow") {

        button.textContent = "Following";

        button.classList.add("following");

    } else {

        button.textContent = "Follow";

        button.classList.remove("following");

    }

}


displayPeople(followers, "followers");

displayPeople(following, "following");

displayPosts();
