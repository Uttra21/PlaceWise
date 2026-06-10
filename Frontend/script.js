/* ========== LOGIN ========== */
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (!user || !pass) {
        alert("Please enter username and password!");
        return;
    }

    try {
        let res = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });
        let data = await res.json();
        if (data.success) {
            localStorage.setItem("loggedInUser", user);
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong username or password!");
        }
    } catch (error) {
        alert("Backend not running! Go to backend folder and run: node server.js");
    }
}

/* ========== SIGNUP ========== */
async function signup() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if (!user || !pass) {
        alert("Please fill all fields!");
        return;
    }

    try {
        let res = await fetch("http://127.0.0.1:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });
        let data = await res.json();
        if (data.success) {
            alert("Account created! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Signup failed. Username may already exist!");
        }
    } catch (error) {
        alert("Backend not running! Go to backend folder and run: node server.js");
    }
}

/* ========== CHATBOT ========== */
function toggleChat() {
    let box = document.getElementById("chatbox");
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

async function sendMessage() {
    let input = document.getElementById("userInput").value;
    if (!input) return;

    let chat = document.getElementById("chat");
    chat.innerHTML += `<p><b style="color:#0b3d91">You:</b> ${input}</p>`;
    document.getElementById("userInput").value = "";

    try {
        let res = await fetch("http://127.0.0.1:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });
        let data = await res.json();
        chat.innerHTML += `<p><b style="color:green">PlaceBot:</b> ${data.response}</p>`;
    } catch (error) {
        chat.innerHTML += `<p><b style="color:red">PlaceBot:</b> Server not connected!</p>`;
    }
    chat.scrollTop = chat.scrollHeight;
}

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        if (document.getElementById("userInput")) sendMessage();
    }
});

/* ========== LOGOUT ========== */
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}