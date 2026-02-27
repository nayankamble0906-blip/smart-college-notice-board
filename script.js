let notices = JSON.parse(localStorage.getItem("notices")) || [
    { title: "Mid-Sem Exams", content: "Exams start from 5 Feb", category: "Exam", date: new Date() },
    { title: "Republic Day Holiday", content: "College closed on 26 Jan", category: "Holiday", date: new Date() },
    { title: "AI Workshop", content: "Register before 30 Jan", category: "Event", date: new Date() }
];

const board = document.getElementById("board");

function renderNotices() {
    board.innerHTML = "";

    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    notices
        .filter(n =>
            (filter === "All" || n.category === filter) &&
            (n.title.toLowerCase().includes(search) ||
             n.content.toLowerCase().includes(search))
        )
        .forEach(n => {
            board.innerHTML += `
                <div class="notice">
                    <h3>${n.title}</h3>
                    <small>${n.category} | ${new Date(n.date).toDateString()}</small>
                    <p>${n.content}</p>
                </div>
            `;
        });
}

document.getElementById("search").oninput = renderNotices;
document.getElementById("filter").onchange = renderNotices;

function showLogin() {
    document.getElementById("loginPanel").style.display = "block";
}

function login() {
    if (
        document.getElementById("username").value === "admin" &&
        document.getElementById("password").value === "admin123"
    ) {
        document.getElementById("loginPanel").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
}

function addNotice() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let category = document.getElementById("category").value;

    if (!title || !content) {
        alert("Please fill all fields");
        return;
    }

    notices.unshift({
        title,
        content,
        category,
        date: new Date()
    });

    localStorage.setItem("notices", JSON.stringify(notices));
    renderNotices();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

// Auto-scroll (TV mode)
setInterval(() => {
    board.scrollTop += 1;
    if (board.scrollTop + board.clientHeight >= board.scrollHeight) {
        board.scrollTop = 0;
    }
}, 50);

renderNotices();