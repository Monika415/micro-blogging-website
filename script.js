const followers = [
    ["Deepa", "@deepa_07"],
    ["Arun", "@arun_talks"],
    ["Sanjay", "@sanjay_dev"],
    ["Priya", "@priya_19"],
    ["Kavi", "@kavi_quotes"]
];

const following = [
    ["TechVibes", "@techvibes"],
    ["NatureClicks", "@natureclicks"],
    ["BookLover", "@booklover"],
    ["CodeWithMe", "@codewithme"],
    ["MusicSoul", "@musicsoul"]
];

let posts = [

    [
        "Small steps every day lead to big dreams. 🌱",
        "#motivation #life",
        3,
        5,
        16,
        "2h"
    ],

    [
        "The sky looks so beautiful today... ☁️",
        "#nature #goodvibes",
        2,
        1,
        12,
        "5h"
    ],

    [
        "Coding is not just about writing code, it's about solving real world problems. 💻",
        "#developer #learning",
        4,
        7,
        25,
        "1d"
    ],

    [
        "Grateful for the little things. ♡",
        "#life #happiness",
        1,
        3,
        18,
        "2d"
    ]

];


function people(list, id) {

    document.getElementById(id).innerHTML =
        list.map((p, i) => `

        <div class="person">

            <div class="avatar">
                ${p[0][0]}
            </div>

            <div class="person-info">
                <b>${p[0]}</b>
                <small>${p[1]}</small>
            </div>

            <button
                class="follow"
                onclick="toggleFollow(this)"
            >
                ${id === "followers" && i === 0
                    ? "Following"
                    : "Follow"}
            </button>

        </div>

    `).join("");
}


function toggleFollow(button) {

    button.classList.toggle("following");

    button.textContent =
        button.classList.contains("following")
            ? "Following"
            : "Follow";
}


function render() {

    document.getElementById("feed").innerHTML =
        posts.map((p, i) => `

        <article class="tweet">

            <div class="avatar">
                M
            </div>

            <div>

                <h4>
                    Monika
                    <span>
                        @monika_d · ${p[5]}
                    </span>
                </h4>

                <p>
                    ${p[0]}
                    <br>
                    <span class="muted">
                        ${p[1]}
                    </span>
                </p>

                <div class="actions">

                    <span class="action">
                        ♡ ${p[2]}
                    </span>

                    <span class="action">
                        ⇄ ${p[3]}
                    </span>

                    <span
                        class="action"
                        onclick="this.textContent='♥ '+(${p[4]}+1)"
                    >
                        ♡ ${p[4]}
                    </span>

                </div>

            </div>

            <span>⋯</span>

        </article>

    `).join("");
}


document.getElementById("postNow").onclick = function () {

    const value =
        document.getElementById("postInput").value.trim();

    if (!value) {
        return;
    }

    posts.unshift([
        value,
        "#newpost",
        0,
        0,
        0,
        "now"
    ]);

    document.getElementById("postInput").value = "";

    render();
};


document.getElementById("openPost").onclick = function () {

    document.getElementById("postInput").focus();

};


document.getElementById("editProfile").onclick = function () {

    alert("Profile editing is ready for your custom fields.");

};


people(followers, "followers");

people(following, "following");

render();
