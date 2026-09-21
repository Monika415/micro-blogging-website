console.log("MicroBlog JavaScript loaded successfully");


/* =====================================================
   USER DATA
===================================================== */

const users = {

    Deepa: {
        username: "@deepa_07",
        avatar: "D",
        color: "orange",
        bio: "Exploring life one day at a time 🌸",
        posts: 34,
        following: 18,
        followers: 120,

        postTexts: [
            "Today was a beautiful day! 🌸",
            "Enjoying every little moment of life.",
            "Good things take time. Keep going! ✨"
        ]
    },


    Arun: {
        username: "@arun_talks",
        avatar: "A",
        color: "blue",
        bio: "Technology • Ideas • Conversations 🚀",
        posts: 52,
        following: 41,
        followers: 210,

        postTexts: [
            "Learning something new every day. 💻",
            "Working on a new web development project.",
            "Technology can solve amazing problems. 🚀"
        ]
    },


    Sanjay: {
        username: "@sanjay.dev",
        avatar: "S",
        color: "green",
        bio: "Developer | Builder | Learner 💻",
        posts: 76,
        following: 35,
        followers: 310,

        postTexts: [
            "Just finished building my JavaScript project!",
            "Debugging is part of learning. 🔥",
            "Another step forward in my developer journey."
        ]
    },


    Priya: {
        username: "@priya_19",
        avatar: "P",
        color: "pink",
        bio: "Dream big. Work hard. Stay kind 🌷",
        posts: 43,
        following: 28,
        followers: 145,

        postTexts: [
            "Don't compare your beginning with someone else's middle. 🌷",
            "Keep believing in yourself.",
            "Small progress is still progress. ✨"
        ]
    },


    Kavi: {
        username: "@kavi_quotes",
        avatar: "K",
        color: "purple",
        bio: "Books • Words • Thoughts 📚",
        posts: 88,
        following: 22,
        followers: 560,

        postTexts: [
            "Books can take us to places we have never been. 📚",
            "A quiet evening with a good book.",
            "Every story teaches us something."
        ]
    }

};


/* =====================================================
   GET ELEMENTS
===================================================== */

const pages = {

    home: document.getElementById("homePage"),

    explore: document.getElementById("explorePage"),

    messages: document.getElementById("messagesPage"),

    saved: document.getElementById("savedPage"),

    profile: document.getElementById("myProfilePage"),

    userProfile: document.getElementById("userProfilePage")

};


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(pageName) {

    Object.values(pages).forEach(function(page) {

        page.classList.add("hidden");

    });


    pages[pageName].classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SIDEBAR NAVIGATION
===================================================== */

document.querySelectorAll(".nav-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const pageName =
            button.getAttribute("data-page");


        document
            .querySelectorAll(".nav-btn")
            .forEach(function(btn) {

                btn.classList.remove("active");

            });


        button.classList.add("active");


        showPage(pageName);

    });

});


/* =====================================================
   PROFILE NAVIGATION
===================================================== */

/*
    EVENT DELEGATION

    This means even dynamically created
    profile buttons will work.
*/

document.addEventListener("click", function(event) {

    const profileElement =
        event.target.closest(".profile-click");


    if (!profileElement) {
        return;
    }


    /*
       Don't open profile when clicking
       a Follow button inside the person card.
    */

    if (
        event.target.tagName === "BUTTON"
    ) {
        return;
    }


    const userName =
        profileElement.getAttribute("data-user");


    if (!userName) {
        return;
    }


    openUserProfile(userName);

});


/* =====================================================
   OPEN USER PROFILE
===================================================== */

function openUserProfile(userName) {

    const user = users[userName];


    if (!user) {

        console.error(
            "User does not exist:",
            userName
        );

        return;

    }


    /* Avatar */

    const avatar =
        document.getElementById("userAvatar");


    avatar.textContent =
        user.avatar;


    avatar.className =
        "large-avatar " + user.color;


    /* Name */

    document.getElementById(
        "userName"
    ).textContent =
        userName;


    /* Username */

    document.getElementById(
        "userUsername"
    ).textContent =
        user.username;


    /* Bio */

    document.getElementById(
        "userBio"
    ).textContent =
        user.bio;


    /* Statistics */

    document.getElementById(
        "userPosts"
    ).textContent =
        user.posts;


    document.getElementById(
        "userFollowing"
    ).textContent =
        user.following;


    document.getElementById(
        "userFollowers"
    ).textContent =
        user.followers;


    /* Follow button */

    const followButton =
        document.getElementById(
            "followButton"
        );


    followButton.textContent =
        "Follow";


    followButton.classList.remove(
        "following"
    );


    /* User posts */

    createUserPosts(userName);


    /* Open page */

    showPage("userProfile");

}


/* =====================================================
   CREATE USER POSTS
===================================================== */

function createUserPosts(userName) {

    const user =
        users[userName];


    const container =
        document.getElementById(
            "userPostsContainer"
        );


    container.innerHTML = "";


    user.postTexts.forEach(function(text, index) {

        const post =
            document.createElement("article");


        post.className =
            "post-card";


        post.innerHTML = `

            <div class="avatar ${user.color}">
                ${user.avatar}
            </div>


            <div class="post-main">

                <div class="post-top">

                    <div>

                        <strong>
                            ${userName}
                        </strong>

                        <span>
                            ${user.username}
                            · ${index + 1}h
                        </span>

                    </div>

                </div>


                <p class="post-text">
                    ${text}
                </p>


                <div class="post-actions">

                    <button
                        class="comment-button"
                    >
                        💬 ${index + 3}
                    </button>


                    <button
                        class="share-button"
                    >
                        🔁 ${index + 2}
                    </button>


                    <button
                        class="like-button"
                    >
                        ♡ ${index + 10}
                    </button>


                    <button
                        class="save-button"
                    >
                        🔖
                    </button>

                </div>

            </div>

        `;


        container.appendChild(post);


        activatePostButtons(post);

    });

}


/* =====================================================
   BACK BUTTON
===================================================== */

document
    .getElementById("backButton")
    .addEventListener("click", function() {

        showPage("home");

    });


/* =====================================================
   MY PROFILE BUTTON
===================================================== */

document
    .getElementById("myProfileBtn")
    .addEventListener("click", function() {

        document
            .querySelectorAll(".nav-btn")
            .forEach(function(btn) {

                btn.classList.remove("active");

            });


        showPage("profile");

    });


/* =====================================================
   CREATE POST
===================================================== */

const postInput =
    document.getElementById("postInput");


const postButton =
    document.getElementById("postButton");


const characterCount =
    document.getElementById(
        "characterCount"
    );


/* Character counter */

postInput.addEventListener(
    "input",
    function() {

        const remaining =
            280 - postInput.value.length;


        characterCount.textContent =
            remaining;

    }
);


/* Post button */

postButton.addEventListener(
    "click",
    function() {

        const text =
            postInput.value.trim();


        /* Empty post */

        if (text === "") {

            showToast(
                "Please write something first."
            );

            postInput.focus();

            return;

        }


        /* Create post */

        const post =
            document.createElement("article");


        post.className =
            "post-card";


        post.innerHTML = `

            <div class="avatar purple">
                M
            </div>


            <div class="post-main">

                <div class="post-top">

                    <div>

                        <strong>
                            Monika
                        </strong>

                        <span>
                            @monika_d · just now
                        </span>

                    </div>


                    <button class="more-button">
                        •••
                    </button>

                </div>


                <p class="post-text"></p>


                <div class="post-actions">

                    <button class="comment-button">
                        💬 0
                    </button>


                    <button class="share-button">
                        🔁 0
                    </button>


                    <button class="like-button">
                        ♡ 0
                    </button>


                    <button class="save-button">
                        🔖
                    </button>

                </div>

            </div>

        `;


        /*
            Use textContent instead of innerHTML
            for the user's post.
        */

        post.querySelector(
            ".post-text"
        ).textContent = text;


        /*
            Add post to top of feed
        */

        document
            .getElementById(
                "postsContainer"
            )
            .prepend(post);


        /*
            Activate Like / Save
        */

        activatePostButtons(post);


        /*
            Clear input
        */

        postInput.value = "";


        characterCount.textContent =
            "280";


        /*
            Update profile count
        */

        const myPostCount =
            document.getElementById(
                "myPostCount"
            );


        myPostCount.textContent =
            Number(
                myPostCount.textContent
            ) + 1;


        /*
            Update overview count
        */

        const overview =
            document.getElementById(
                "overviewPostCount"
            );


        overview.textContent =
            Number(
                overview.textContent
            ) + 1;


        showToast(
            "Post published successfully!"
        );

    }
);


/* =====================================================
   POST BUTTON FROM LEFT SIDEBAR
===================================================== */

document
    .getElementById("sidePostButton")
    .addEventListener("click", function() {

        showPage("home");


        setTimeout(function() {

            postInput.focus();


            postInput.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    });


/* =====================================================
   LIKE / SAVE BUTTONS
===================================================== */

function activatePostButtons(post) {

    const likeButton =
        post.querySelector(
            ".like-button"
        );


    const saveButton =
        post.querySelector(
            ".save-button"
        );


    /* LIKE */

    if (likeButton) {

        likeButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                const span =
                    likeButton.querySelector(
                        "span"
                    );


                if (
                    likeButton.classList.contains(
                        "liked"
                    )
                ) {

                    likeButton.classList.remove(
                        "liked"
                    );


                    let number =
                        getButtonNumber(
                            likeButton
                        );


                    number--;


                    likeButton.innerHTML =
                        "♡ " + number;

                }

                else {

                    likeButton.classList.add(
                        "liked"
                    );


                    let number =
                        getButtonNumber(
                            likeButton
                        );


                    number++;


                    likeButton.innerHTML =
                        "♥ " + number;

                }

            }
        );

    }


    /* SAVE */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                saveButton.classList.toggle(
                    "saved"
                );


                if (
                    saveButton.classList.contains(
                        "saved"
                    )
                ) {

                    showToast(
                        "Post saved 🔖"
                    );

                }

                else {

                    showToast(
                        "Post removed from saved"
                    );

                }

            }
        );

    }

}


/* =====================================================
   GET NUMBER FROM LIKE BUTTON
===================================================== */

function getButtonNumber(button) {

    const number =
        button.textContent.match(
            /\d+/
        );


    if (number) {

        return Number(
            number[0]
        );

    }


    return 0;

}


/* =====================================================
   ACTIVATE EXISTING POSTS
===================================================== */

document
    .querySelectorAll(".post-card")
    .forEach(function(post) {

        activatePostButtons(post);

    });


/* =====================================================
   FOLLOW BUTTON
===================================================== */

document
    .getElementById("followButton")
    .addEventListener(
        "click",
        function() {

            const button =
                document.getElementById(
                    "followButton"
                );


            if (
                button.classList.contains(
                    "following"
                )
            ) {

                button.textContent =
                    "Follow";


                button.classList.remove(
                    "following"
                );

            }

            else {

                button.textContent =
                    "Following";


                button.classList.add(
                    "following"
                );

            }

        }
    );


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function() {

            const search =
                this.value
                    .toLowerCase()
                    .trim();


            const posts =
                document.querySelectorAll(
                    "#postsContainer .post-card"
                );


            posts.forEach(function(post) {

                const text =
                    post.textContent
                        .toLowerCase();


                if (
                    search === "" ||
                    text.includes(search)
                ) {

                    post.style.display =
                        "flex";

                }

                else {

                    post.style.display =
                        "none";

                }

            });

        }
    );


/* =====================================================
   NOTIFICATION
===================================================== */

document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        function() {

            showToast(
                "You have new notifications 🔔"
            );

        }
    );


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(function() {

        toast.classList.remove(
            "show"
        );

    }, 1800);

}


/* =====================================================
   START HOME PAGE
===================================================== */

showPage("home");

console.log(
    "All MicroBlog functions are ready."
);
