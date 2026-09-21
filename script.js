document.addEventListener("DOMContentLoaded", function () {

    console.log("MicroBlog started");


    /* ==========================================
       USER DATA
    ========================================== */

    const users = {

        Deepa: {
            username: "@deepa_07",
            avatar: "D",
            color: "orange",
            bio: "Exploring life one day at a time 🌸",
            posts: 34,
            following: 18,
            followers: 120
        },

        Arun: {
            username: "@arun_talks",
            avatar: "A",
            color: "blue",
            bio: "Technology • Ideas • Conversations 🚀",
            posts: 52,
            following: 41,
            followers: 210
        },

        Sanjay: {
            username: "@sanjay.dev",
            avatar: "S",
            color: "green",
            bio: "Developer | Builder | Learner 💻",
            posts: 76,
            following: 35,
            followers: 310
        },

        Priya: {
            username: "@priya_19",
            avatar: "P",
            color: "pink",
            bio: "Dream big. Work hard. Stay kind 🌷",
            posts: 43,
            following: 28,
            followers: 145
        },

        Kavi: {
            username: "@kavi_quotes",
            avatar: "K",
            color: "purple",
            bio: "Books • Words • Thoughts 📚",
            posts: 88,
            following: 22,
            followers: 560
        }

    };


    /* ==========================================
       PAGE ELEMENTS
    ========================================== */

    const homePage =
        document.getElementById("homePage");

    const explorePage =
        document.getElementById("explorePage");

    const messagesPage =
        document.getElementById("messagesPage");

    const savedPage =
        document.getElementById("savedPage");

    const myProfilePage =
        document.getElementById("myProfilePage");

    const userProfilePage =
        document.getElementById("userProfilePage");


    const allPages = [
        homePage,
        explorePage,
        messagesPage,
        savedPage,
        myProfilePage,
        userProfilePage
    ];


    /* ==========================================
       PAGE NAVIGATION
    ========================================== */

    function showPage(page) {

        allPages.forEach(function (item) {

            item.classList.add("hidden");

        });

        page.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* ==========================================
       SIDEBAR NAVIGATION
    ========================================== */

    document
        .querySelectorAll(".menu")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                document
                    .querySelectorAll(".menu")
                    .forEach(function (item) {

                        item.classList.remove("active");

                    });


                button.classList.add("active");


                const page =
                    button.dataset.page;


                if (page === "home") {

                    showPage(homePage);

                }

                else if (page === "explore") {

                    showPage(explorePage);

                }

                else if (page === "messages") {

                    showPage(messagesPage);

                }

                else if (page === "saved") {

                    showPage(savedPage);

                }

                else if (page === "profile") {

                    showPage(myProfilePage);

                }

            });

        });


    /* ==========================================
       CLICK ANY USER PROFILE
       ========================================== */

    document
        .querySelectorAll(".profile-link")
        .forEach(function (element) {

            element.addEventListener("click", function () {

                const username =
                    element.dataset.user;

                openProfile(username);

            });

        });


    /* ==========================================
       OPEN PROFILE
    ========================================== */

    function openProfile(username) {

        const user =
            users[username];


        if (!user) {

            console.log(
                "User not found:",
                username
            );

            return;

        }


        /*
         * Set profile information
         */

        const avatar =
            document.getElementById(
                "userAvatar"
            );


        avatar.textContent =
            user.avatar;


        avatar.className =
            "large-avatar " +
            user.color;


        document
            .getElementById("userName")
            .textContent = username;


        document
            .getElementById("userUsername")
            .textContent = user.username;


        document
            .getElementById("userBio")
            .textContent = user.bio;


        document
            .getElementById("userPosts")
            .textContent = user.posts;


        document
            .getElementById("userFollowing")
            .textContent =
            user.following;


        document
            .getElementById("userFollowers")
            .textContent =
            user.followers;


        /*
         * Create posts for this profile
         */

        createUserPosts(username);


        /*
         * Show profile page
         */

        showPage(userProfilePage);

    }


    /* ==========================================
       CREATE PROFILE POSTS
    ========================================== */

    function createUserPosts(username) {

        const container =
            document.getElementById(
                "userPostsContainer"
            );


        container.innerHTML = "";


        const user =
            users[username];


        for (let i = 1; i <= 3; i++) {

            const article =
                document.createElement("article");


            article.className = "post";


            article.innerHTML = `

                <div
                    class="avatar ${user.color}"
                >
                    ${user.avatar}
                </div>

                <div class="post-content">

                    <div class="post-header">

                        <div>

                            <strong>
                                ${username}
                            </strong>

                            <span>
                                ${user.username} · ${i}h
                            </span>

                        </div>

                        <button class="more">
                            •••
                        </button>

                    </div>

                    <p class="post-text">
                        ${getPostText(username, i)}
                    </p>

                    <div class="post-actions">

                        <button class="comment">
                            💬 ${i * 4}
                        </button>

                        <button class="share">
                            🔁 ${i * 2}
                        </button>

                        <button class="like">
                            ♡ ${i * 15}
                        </button>

                        <button class="save">
                            🔖
                        </button>

                    </div>

                </div>

            `;


            container.appendChild(article);


            /*
             * Add like/save functionality
             */

            addPostActions(article);

        }

    }


    /* ==========================================
       PROFILE POST TEXT
    ========================================== */

    function getPostText(username, number) {

        const posts = {

            Deepa: [
                "Today was a beautiful day. 🌸",
                "Enjoying every little moment of life.",
                "Good things take time. Keep going! ✨"
            ],

            Arun: [
                "Learning something new every day. 💻",
                "Working on a new web development project.",
                "Technology can solve amazing problems. 🚀"
            ],

            Sanjay: [
                "Just finished building my JavaScript project!",
                "Debugging is part of learning. 🔥",
                "Another step forward in my developer journey."
            ],

            Priya: [
                "Don't compare your beginning with someone else's middle. 🌷",
                "Keep believing in yourself.",
                "Small progress is still progress. ✨"
            ],

            Kavi: [
                "Books can take us to places we have never been. 📚",
                "A quiet evening with a good book.",
                "Every story teaches us something."
            ]

        };


        return posts[username][number - 1];

    }


    /* ==========================================
       BACK BUTTON
    ========================================== */

    document
        .getElementById("backButton")
        .addEventListener("click", function () {

            showPage(homePage);

        });


    /* ==========================================
       MY PROFILE
    ========================================== */

    document
        .getElementById("myProfileBtn")
        .addEventListener("click", function () {

            showPage(myProfilePage);

        });


    /* ==========================================
       CREATE POST
    ========================================== */

    const postInput =
        document.getElementById(
            "postInput"
        );


    const postButton =
        document.getElementById(
            "postButton"
        );


    const characterCount =
        document.getElementById(
            "characterCount"
        );


    postInput.addEventListener(
        "input",
        function () {

            characterCount.textContent =
                280 - postInput.value.length;

        }
    );


    postButton.addEventListener(
        "click",
        function () {

            const text =
                postInput.value.trim();


            if (text === "") {

                showToast(
                    "Write something first!"
                );

                return;

            }


            const post =
                document.createElement("article");


            post.className = "post";


            post.innerHTML = `

                <div class="avatar purple">
                    M
                </div>

                <div class="post-content">

                    <div class="post-header">

                        <div>

                            <strong>
                                Monika
                            </strong>

                            <span>
                                @monika_d · just now
                            </span>

                        </div>

                        <button class="more">
                            •••
                        </button>

                    </div>

                    <p class="post-text"></p>

                    <div class="post-actions">

                        <button class="comment">
                            💬 0
                        </button>

                        <button class="share">
                            🔁 0
                        </button>

                        <button class="like">
                            ♡ 0
                        </button>

                        <button class="save">
                            🔖
                        </button>

                    </div>

                </div>

            `;


            /*
             * textContent prevents HTML
             * entered by the user from executing.
             */

            post
                .querySelector(".post-text")
                .textContent = text;


            document
                .getElementById(
                    "postsContainer"
                )
                .prepend(post);


            addPostActions(post);


            postInput.value = "";

            characterCount.textContent =
                "280";


            const counter =
                document.getElementById(
                    "myPosts"
                );


            if (counter) {

                counter.textContent =
                    Number(counter.textContent) + 1;

            }


            document
                .getElementById(
                    "overviewPosts"
                )
                .textContent =
                Number(
                    document.getElementById(
                        "overviewPosts"
                    ).textContent
                ) + 1;


            showToast(
                "Post published successfully!"
            );

        }
    );


    /* ==========================================
       POST ACTIONS
    ========================================== */

    function addPostActions(post) {

        const like =
            post.querySelector(".like");


        const save =
            post.querySelector(".save");


        if (like) {

            like.addEventListener(
                "click",
                function () {

                    let text =
                        like.textContent;


                    let number =
                        parseInt(
                            text.match(/\d+/)
                        ) || 0;


                    if (
                        like.classList.contains(
                            "liked"
                        )
                    ) {

                        number--;

                        like.classList.remove(
                            "liked"
                        );

                        like.textContent =
                            "♡ " + number;

                    } else {

                        number++;

                        like.classList.add(
                            "liked"
                        );

                        like.textContent =
                            "♥ " + number;

                    }

                }
            );

        }


        if (save) {

            save.addEventListener(
                "click",
                function () {

                    save.classList.toggle(
                        "saved"
                    );


                    if (
                        save.classList.contains(
                            "saved"
                        )
                    ) {

                        showToast(
                            "Post saved 🔖"
                        );

                    } else {

                        showToast(
                            "Post removed"
                        );

                    }

                }
            );

        }

    }


    /*
     * Activate actions for existing posts
     */

    document
        .querySelectorAll(".post")
        .forEach(function (post) {

            addPostActions(post);

        });


    /* ==========================================
       FOLLOW BUTTON
    ========================================== */

    document
        .getElementById(
            "followUserButton"
        )
        .addEventListener(
            "click",
            function () {

                const button =
                    document.getElementById(
                        "followUserButton"
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

                } else {

                    button.textContent =
                        "Following";

                    button.classList.add(
                        "following"
                    );

                }

            }
        );


    /* ==========================================
       SEARCH
    ========================================== */

    document
        .getElementById("searchInput")
        .addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(".post")
                    .forEach(function (post) {

                        const text =
                            post.textContent
                                .toLowerCase();


                        if (
                            search === "" ||
                            text.includes(search)
                        ) {

                            post.style.display =
                                "flex";

                        } else {

                            post.style.display =
                                "none";

                        }

                    });

            }
        );


    /* ==========================================
       SIDE POST BUTTON
    ========================================== */

    document
        .getElementById(
            "createPostSide"
        )
        .addEventListener(
            "click",
            function () {

                showPage(homePage);

                setTimeout(
                    function () {

                        postInput.focus();

                        postInput.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    },
                    100
                );

            }
        );


    /* ==========================================
       NOTIFICATION
    ========================================== */

    document
        .getElementById(
            "notificationBtn"
        )
        .addEventListener(
            "click",
            function () {

                showToast(
                    "You have new notifications 🔔"
                );

            }
        );


    /* ==========================================
       TOAST
    ========================================== */

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


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            1800
        );

    }


});
