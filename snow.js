const snowflakes = [];
const snowCount = 80;

let windX = 0;

document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    windX = (e.clientX - centerX) * 0.002;
});

function createSnowflake() {
    const snow = document.createElement("div");
    snow.className = "snowflake";

    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.width = snow.style.height = Math.random() * 4 + 4 + "px";
    snow.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(snow);

    const flake = {
        el: snow,
        x: parseFloat(snow.style.left),
        y: -10,
        speedY: Math.random() * 5 + 3,
        sway: Math.random() * 0.6 - 0.3
    };

    snowflakes.push(flake);
}

function updateSnow() {
    snowflakes.forEach((flake, i) => {
        flake.y += flake.speedY;
        flake.x += flake.sway + windX;

        flake.el.style.transform = `translate(${flake.x}px, ${flake.y}px)`;

        if (flake.y > window.innerHeight + 20) {
            flake.el.remove();
            snowflakes.splice(i, 1);
        }
    });

    requestAnimationFrame(updateSnow);
}

// Kar üret
setInterval(() => {
    if (snowflakes.length < snowCount) {
        createSnowflake();
    }
}, 0);

updateSnow();

const profileBtn = document.getElementById("profileBtn");
const dropdown = document.getElementById("profileDropdown");

profileBtn.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
    }
});

const avatarInput = document.getElementById("avatarInput");
const profileAvatar = document.getElementById("profileAvatar");

// Sayfa açılınca kayıtlı avatarı yükle
const savedAvatar = localStorage.getItem("profileAvatar");
if (savedAvatar) {
    profileAvatar.src = savedAvatar;
}

// Yeni fotoğraf seçildiğinde
avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        profileAvatar.src = reader.result;
        localStorage.setItem("profileAvatar", reader.result);
    };
    reader.readAsDataURL(file);
});
