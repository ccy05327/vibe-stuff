const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
    sections.forEach((section) => {
      section.id === target
        ? (section.style.display = "block")
        : (section.style.display = "none");
    });
  });
});
document.getElementById("dashboard").style.display = "block";

// 河粉指數計算
const vndInput = document.getElementById("vndInput");
const feelPrice = document.getElementById("feelPrice");
vndInput.addEventListener("keyup", () => {
  const vndValue = parseFloat(vndInput.value) || 0;
  const twdValue = vndValue / 880;
  const feelValue = twdValue * 5;
  feelPrice.textContent = `NT$ ${Math.round(feelValue).toLocaleString()}`;
});

// 音頻播放速度控制
const audio = document.getElementById("st9Audio");
const speedSelect = document.getElementById("speedSelect");
speedSelect.addEventListener("change", () => {
  const selectedSpeed = parseFloat(speedSelect.value);
  audio.playbackRate = selectedSpeed;
});

// 行程卡片展開/收合功能
function addCardListeners() {
  document.querySelectorAll(".day-card button").forEach((button) => {
    button.removeEventListener("click", handleCardClick);
    button.addEventListener("click", handleCardClick);
  });
}

function handleCardClick(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const card = button.parentElement;
  const isOpen = card.classList.contains("open");
  card.classList.toggle("open");
  const icon = button.querySelector("span.transform");
  if (icon) {
    icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
  }
}

function initializeCards() {
  document.querySelectorAll(".day-card").forEach((card) => {
    card.classList.remove("open");
    const icon = card.querySelector("span.transform");
    if (icon) {
      icon.style.transform = "rotate(0deg)";
    }
  });
}

initializeCards();
addCardListeners();


export { initializeCards, addCardListeners };