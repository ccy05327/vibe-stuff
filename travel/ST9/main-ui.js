const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;
    navLinks.forEach((nav) => {
      nav.classList.remove(
        "active",
        "text-teal-600",
        "border-b-2",
        "border-teal-500"
      );
      nav.classList.add("text-stone-600");
      nav.style.borderBottomWidth = "0px";
    });
    link.classList.add(
      "active",
      "text-teal-600",
      "border-b-2",
      "border-teal-500"
    );
    link.classList.remove("text-stone-600");
    link.style.borderBottomWidth = "2px";
    link.style.borderColor = "#14b8a6";
    sections.forEach((section) => {
      section.id === target
        ? (section.style.display = "block")
        : (section.style.display = "none");
    });
  });
});
document.getElementById("dashboard").style.display = "block";

// Chart.js: Salary Comparison Chart
if (document.getElementById("salaryChart")) {
  const ctx = document.getElementById("salaryChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["台灣", "胡志明市"],
      datasets: [
        {
          label: "基本月薪 (NT$)",
          data: [26400, 5280],
          backgroundColor: ["#14b8a6", "#f59e42"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "台灣 vs 胡志明市 基本月薪比較",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 5000 },
        },
      },
    },
  });
}

// Chart.js: Budget Donut Chart
if (document.getElementById("budgetDonutChart")) {
  const ctx2 = document.getElementById("budgetDonutChart").getContext("2d");
  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["餐飲", "按摩", "景點/活動", "交通 (Grab)", "預備金"],
      datasets: [
        {
          label: "預算分配 (VND)",
          data: [2016000, 980000, 1180000, 520000, 824000],
          backgroundColor: [
            "#14b8a6",
            "#f59e42",
            "#fbbf24",
            "#3b82f6",
            "#fb7185",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "預算分配圓餅圖 (兩人)",
        },
      },
    },
  });
}

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
  const details = card.querySelector(".day-details");
  const icon = button.querySelector("span.transform");
  const isOpen = card.classList.contains("open");
  card.classList.toggle("open");
  if (details) {
    details.style.display = isOpen ? "none" : "block";
  }
  if (icon) {
    icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
  }
}

function initializeCards() {
  document.querySelectorAll(".day-card").forEach((card) => {
    card.classList.remove("open");
    const details = card.querySelector(".day-details");
    if (details) {
      details.style.display = "none";
    }
    const icon = card.querySelector("span.transform");
    if (icon) {
      icon.style.transform = "rotate(0deg)";
    }
  });
}

initializeCards();
addCardListeners();

export { initializeCards, addCardListeners };
