/* ============ MicroBlog — interactions ============ */
document.addEventListener("DOMContentLoaded", function () {

  const LIMIT = 280;
  const textarea = document.getElementById("composeText");
  const postBtn  = document.getElementById("postBtn");
  const counter  = document.getElementById("counter");
  const postList = document.getElementById("postList");
  const toastBox = document.getElementById("toast");

  /* ---------- toast ---------- */
  function toast(msg) {
    toastBox.textContent = msg;
    toastBox.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastBox.classList.remove("show"), 2000);
  }

  /* ---------- composer ---------- */
  function autoGrow() {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  textarea.addEventListener("input", function () {
    const left = LIMIT - textarea.value.length;
    counter.textContent = left;
    counter.classList.toggle("warn", left < 20);
    postBtn.disabled = textarea.value.trim() === "" || left < 0;
    autoGrow();
  });

  textarea.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !postBtn.disabled) {
      publish();
    }
  });

  postBtn.addEventListener("click", publish);

  document.getElementById("jumpCompose").addEventListener("click", function () {
    textarea.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- create a new post ---------- */
  function publish() {
    const raw = textarea.value.trim();
    if (!raw) return;

    // turn #words into coloured tags (escaped first)
    const safe = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/#([\w]+)/g, '<span class="tag">#$1</span>');

    const article = document.createElement("article");
    article.className = "post";
    article.innerHTML =
      '<div class="avatar avatar-md grad-1">M</div>' +
      '<div class="post-main">' +
        '<div class="post-head"><b>Monika</b>' +
        '<span class="muted">@monika_d · now</span>' +
        '<button class="more">···</button></div>' +
        '<p class="post-text">' + safe + "</p>" +
        '<div class="actions">' +
          '<button class="act reply">💬 <span>0</span></button>' +
          '<button class="act repost">🔁 <span>0</span></button>' +
          '<button class="act like">🤍 <span>0</span></button>' +
          '<button class="act save">🔖</button>' +
        "</div>" +
      "</div>";

    postList.prepend(article);

    textarea.value = "";
    textarea.style.height = "auto";
    counter.textContent = LIMIT;
    counter.classList.remove("warn");
    postBtn.disabled = true;
    updateCount(+1);
    toast("Posted");
  }

  /* ---------- keep the post counters in sync ---------- */
  function updateCount(delta) {
    document.querySelectorAll(".p-stats b")[0].textContent =
      parseInt(document.querySelectorAll(".p-stats b")[0].textContent, 10) + delta;
    const ov = document.querySelector(".ov-box b");
    ov.textContent = parseInt(ov.textContent, 10) + delta;
  }

  /* ---------- like / repost / save (event delegation) ---------- */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".act");
    if (!btn) return;

    const num = btn.querySelector("span");

    if (btn.classList.contains("like")) {
      const on = btn.classList.toggle("on");
      btn.firstChild.textContent = on ? "❤️ " : "🤍 ";
      num.textContent = parseInt(num.textContent, 10) + (on ? 1 : -1);
    } else if (btn.classList.contains("repost")) {
      const on = btn.classList.toggle("on");
      num.textContent = parseInt(num.textContent, 10) + (on ? 1 : -1);
      toast(on ? "Reposted" : "Repost removed");
    } else if (btn.classList.contains("save")) {
      const on = btn.classList.toggle("on");
      toast(on ? "Saved to your bookmarks" : "Removed from bookmarks");
    } else if (btn.classList.contains("reply")) {
      textarea.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  /* ---------- tabs ---------- */
  const tabs = document.querySelectorAll(".tab");
  const empty = document.getElementById("emptyState");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const isPosts = tab.dataset.tab === "posts";
      postList.hidden = !isPosts;
      empty.hidden = isPosts;
      empty.textContent = "No " + tab.textContent.toLowerCase() + " to show yet.";
    });
  });

  /* ---------- follow buttons ---------- */
  document.querySelectorAll(".btn-follow").forEach(function (btn) {
    const name = btn.parentElement.querySelector("b").textContent;

    btn.addEventListener("click", function () {
      const nowFollowing = !btn.classList.contains("following");
      btn.classList.toggle("following", nowFollowing);
      btn.textContent = nowFollowing ? "Following" : "Follow";
      toast(nowFollowing ? "Following " + name : "Unfollowed " + name);
    });

    btn.addEventListener("mouseenter", function () {
      if (btn.classList.contains("following")) btn.textContent = "Unfollow";
    });
    btn.addEventListener("mouseleave", function () {
      if (btn.classList.contains("following")) btn.textContent = "Following";
    });
  });

  /* ---------- nav highlight ---------- */
  document.querySelectorAll(".nav-item").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  /* ---------- search filter ---------- */
  document.getElementById("searchBox").addEventListener("input", function (e) {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll(".post").forEach(function (p) {
      p.style.display = p.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  /* ---------- edit profile ---------- */
  document.getElementById("editProfile").addEventListener("click", function () {
    const name = prompt("Display name", document.querySelector(".p-name").textContent);
    if (name && name.trim()) {
      document.querySelector(".p-name").textContent = name.trim();
      toast("Profile updated");
    }
  });

});
