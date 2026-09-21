/* =========================================
   GLOBAL DATA
========================================= */

let currentProfile = null;

let postsCreated = 0;

let currentPostCount = 12;

let currentFollowerCount = 45;

let currentFollowingCount = 28;


/* =========================================
   SHOW TOAST
========================================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

function showSection(section, clickedButton) {

    const sections = [
        "homeSection",
        "exploreSection",
        "messagesSection",
        "savedSection",
        "profileSection",
        "userProfileSection"
    ];

    sections.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden-section");
        }

    });


    if (section === "home") {

        document
            .getElementById("homeSection")
            .classList.remove("hidden-section");

    }

    else if (section === "explore") {

        document
            .getElementById("exploreSection")
            .classList.remove("hidden-section");

    }

    else if (section === "messages") {

        document
            .getElementById("messagesSection")
            .classList.remove("hidden-section");

    }

    else if (section === "saved") {

        document
            .getElementById("savedSection")
            .classList.remove("hidden-section");

    }

    else if (section === "profile") {

        document
            .getElementById("profileSection")
            .classList.remove("hidden-section");

    }


    document
        .querySelectorAll(".menu-item")
        .forEach(button => {
            button.classList.remove("active");
        });


    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   GO TO PROFILE
========================================= */

function goToProfile() {

    const profileButton =
        document.querySelectorAll(".menu-item")[4];

    showSection("profile", profileButton);
}


/* =========================================
   FOCUS POST BOX
========================================= */

function focusPostBox() {

    showSection(
        "home",
        document.querySelectorAll(".menu-item")[0]
    );

    setTimeout(() => {

        document
            .getElementById("postText")
            .focus();

        document
            .getElementById("createPostCard")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

    }, 100);
}


/* =========================================
   CHARACTER COUNTER
========================================= */

function updateCharacterCount() {

    const textarea =
        document.getElementById("postText");

    const counter =
        document.getElementById("characterCount");

    const remaining =
        280 - textarea.value.length;

    counter.textContent = remaining;

    if (remaining < 20) {

        counter.style.color = "#e34b72";

    } else {

        counter.style.color = "#738096";

    }
}


/* =========================================
   CREATE POST
========================================= */

function createPost() {

    const textarea =
        document.getElementById("postText");

    const text =
        textarea.value.trim();


    if (text === "") {

        showToast("Please write something first.");

        textarea.focus();

        return;
    }


    const postsContainer =
        document.getElementById("postsContainer");


    const article =
        document.createElement("article");

    article.className = "post-card";


    article.innerHTML = `

        <div class="post-avatar">
            M
        </div>

        <div class="post-content">

            <div class="post-header">

                <div>

                    <strong>
                        Monika
                    </strong>

                    <span class="post-username">
                        @monika_d · just now
                    </span>

                </div>

                <button class="more-btn">
                    •••
                </button>

            </div>


            <p>
                ${escapeHTML(text)}
            </p>


            <div class="post-actions">

                <button onclick="postAction(this)">
                    💬 <span>0</span>
                </button>

                <button onclick="postAction(this)">
                    🔁 <span>0</span>
                </button>

                <button onclick="postAction(this)">
                    ♡ <span>0</span>
                </button>

                <button onclick="savePost(this)">
                    🔖
                </button>

            </div>

        </div>
    `;


    postsContainer.prepend(article);


    textarea.value = "";

    updateCharacterCount();


    currentPostCount++;

    postsCreated++;


    updateCounters();


    showToast("Your post was published!");
}


/* =========================================
   SECURITY
========================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================
   UPDATE COUNTERS
========================================= */

function updateCounters() {

    document.getElementById("postCount")
        .textContent = currentPostCount;

    document.getElementById("rightPostCount")
        .textContent = currentPostCount;

    document.getElementById("followingCount")
        .textContent = currentFollowingCount;

    document.getElementById("rightFollowingCount")
        .textContent = currentFollowingCount;

    document.getElementById("followerCount")
        .textContent = currentFollowerCount;

    document.getElementById("rightFollowerCount")
        .textContent = currentFollowerCount;

    document.getElementById("followersHeading")
        .textContent = currentFollowerCount;
}


/* =========================================
   FOLLOW / UNFOLLOW
========================================= */

function toggleFollow(button) {

    if (button.classList.contains("following")) {

        button.classList.remove("following");

        button.textContent = "Follow";

        currentFollowingCount--;

        showToast("Unfollowed");

    }

    else {

        button.classList.add("following");

        button.textContent = "Following";

        currentFollowingCount++;

        showToast("Following");

    }


    updateCounters();
}


/* =========================================
   OPEN USER PROFILE
========================================= */

function openUserProfile(name) {

    const users = {

        Deepa: {
            username: "@deepa_07",
            avatar: "D",
            posts: 34,
            following: 18,
            followers: 120,
            bio: "Exploring life one day at a time ✨"
        },

        Arun: {
            username: "@arun_talks",
            avatar: "A",
            posts: 52,
            following: 41,
            followers: 210,
            bio: "Technology • Ideas • Conversations 🚀"
        },

        Sanjay: {
            username: "@sanjay.dev",
            avatar: "S",
            posts: 76,
            following: 35,
            followers: 310,
            bio: "Developer | Builder | Learner 💻"
        },

        Priya: {
            username: "@priya_19",
            avatar: "P",
            posts: 43,
            following: 28,
            followers: 145,
            bio: "Dream big. Work hard. Stay kind 🌸"
        },

        Kavi: {
            username: "@kavi_quotes",
            avatar: "K",
            posts: 88,
            following: 22,
            followers: 560,
            bio: "Words that make you think 📖"
        },

        TechVibes: {
            username: "@techvibes",
            avatar: "T",
            posts: 120,
            following: 52,
            followers: 890,
            bio: "Technology and innovation ⚡"
        },

        NatureClicks: {
            username: "@natureclicks",
            avatar: "N",
            posts: 63,
            following: 31,
            followers: 420,
            bio: "Capturing beautiful moments from nature 🌿"
        },

        BookLover: {
            username: "@booklover",
            avatar: "B",
            posts: 96,
            following: 44,
            followers: 730,
            bio: "Books • Coffee • Quiet places ☕"
        }

    };


    const user = users[name];

    if (!user) return;


    currentProfile = name;


    document.getElementById("otherAvatar")
        .textContent = user.avatar;

    document.getElementById("otherName")
        .textContent = name;

    document.getElementById("otherUsername")
        .textContent = user.username;

    document.getElementById("otherBio")
        .textContent = user.bio;

    document.getElementById("otherPosts")
        .textContent = user.posts;

    document.getElementById("otherFollowing")
        .textContent = user.following;

    document.getElementById("otherFollowers")
        .textContent = user.followers;


    document
        .getElementById("homeSection")
        .classList.add("hidden-section");

    document
        .getElementById("exploreSection")
        .classList.add("hidden-section");

    document
        .getElementById("messagesSection")
        .classList.add("hidden-section");

    document
        .getElementById("savedSection")
        .classList.add("hidden-section");

    document
        .getElementById("profileSection")
        .classList.add("hidden-section");

    document
        .getElementById("userProfileSection")
        .classList.remove("hidden-section");


    const button =
        document.getElementById("profileFollowBtn");

    if (name === "Deepa" || name === "TechVibes") {

        button.textContent = "Following";

        button.classList.add("following");

    } else {

        button.textContent = "Follow";

        button.classList.remove("following");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BACK TO HOME
========================================= */

function backToHome() {

    showSection(
        "home",
        document.querySelectorAll(".menu-item")[0]
    );
}


/* =========================================
   FOLLOW FROM PROFILE
========================================= */

function toggleCurrentProfileFollow() {

    const button =
        document.getElementById("profileFollowBtn");


    if (button.classList.contains("following")) {

        button.classList.remove("following");

        button.textContent = "Follow";

        currentFollowingCount--;

        showToast("Unfollowed");

    } else {

        button.classList.add("following");

        button.textContent = "Following";

        currentFollowingCount++;

        showToast("Following");

    }


    updateCounters();
}


/* =========================================
   PROFILE EDIT
========================================= */

function editProfile() {

    const newName =
        prompt(
            "Enter your profile name:",
            "Monika"
        );


    if (!newName) {
        return;
    }


    document.getElementById("profileName")
        .textContent = newName;

    showToast("Profile updated!");
}


/* =========================================
   PROFILE TABS
========================================= */

function changeTab(button, tabName) {

    document
        .querySelectorAll(".profile-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    button.classList.add("active");


    if (tabName === "posts") {

        showToast("Showing posts");

    }

    else if (tabName === "replies") {

        showToast("Showing replies");

    }

    else if (tabName === "media") {

        showToast("Showing media");

    }

    else if (tabName === "likes") {

        showToast("Showing liked posts");

    }
}


/* =========================================
   POST ACTIONS
========================================= */

function postAction(button) {

    const span = button.querySelector("span");

    if (span) {

        let number =
            parseInt(span.textContent);

        number++;

        span.textContent = number;

    }

    showToast("Action completed");
}


/* =========================================
   SAVE POST
========================================= */

function savePost(button) {

    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {

        button.style.color = "#1686f0";

        showToast("Post saved");

    } else {

        button.style.color = "";

        showToast("Removed from saved");

    }
}


/* =========================================
   NOTIFICATIONS
========================================= */

function showNotifications() {

    showToast("You have 3 new notifications 🔔");
}


/* =========================================
   VIEW ALL
========================================= */

function showAllFollowers() {

    showToast("Showing all followers");
}

function showAllFollowing() {

    showToast("Showing all following");
}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const search =
            this.value.toLowerCase().trim();


        const posts =
            document.querySelectorAll(".post-card");


        posts.forEach(post => {

            const text =
                post.textContent.toLowerCase();


            if (
                search === "" ||
                text.includes(search)
            ) {

                post.style.display = "flex";

            } else {

                post.style.display = "none";

            }

        });

    });


/* =========================================
   ENTER KEY TO POST
========================================= */

document
    .getElementById("postText")
    .addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            createPost();

        }

    });


/* =========================================
   INITIAL SETUP
========================================= */

updateCharacterCount();

updateCounters();
