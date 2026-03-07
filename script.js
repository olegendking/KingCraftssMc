// PROFİL SAYFASI
if (window.location.href.includes("profile.html")) {

    const userStr = localStorage.getItem("user");
    console.log("LocalStorage user:", userStr); // TEST

    if (!userStr) {
        alert("Kullanıcı bulunamadı");
        window.location.href = "register.html";
    } else {
        const user = JSON.parse(userStr);

        document.getElementById("pIngame").innerText = user.ingame;
        document.getElementById("pEmail").innerText = user.email;
    }
}

// KAYIT
function register() {
    const ingame = document.getElementById("ingame").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (!ingame || !email || !password || !password2) {
        alert("Tüm alanları doldur");
        return;
    }

    if (password !== password2) {
        alert("Şifreler uyuşmuyor");
        return;
    }

    const user = {
        ingame: ingame,
        email: email
    };

    localStorage.setItem("user", JSON.stringify(user));
    console.log("Kayıt edildi:", user); // TEST

    window.location.href = "profil.html";
}

// ÇIKIŞ
function logout() {
    localStorage.removeItem("user");
    window.location.href = "register.html";
}
