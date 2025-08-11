const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const navButtons = document.querySelector(".nav-buttons");
const mobileNav = document.getElementById("mobile-nav");
const loadingSpinner = document.getElementById("loading-spinner");
const contentContainer = document.getElementById("content-container");

// Cache for loaded content
const contentCache = {};

async function loadSectionContent(sectionName) {
  // Return cached content if available
  if (contentCache[sectionName]) {
    return contentCache[sectionName];
  }

  try {
    const response = await fetch(`${sectionName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load ${sectionName}.html`);
    }
    const content = await response.text();
    contentCache[sectionName] = content;
    return content;
  } catch (error) {
    console.error(`Error loading ${sectionName}:`, error);
    return `<div class="bg-red-50 p-4 rounded-lg">
      <p class="text-red-600">Error loading content. Please try again.</p>
    </div>`;
  }
}

async function showSection(target) {
  // Update navigation styling
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

  const activeBtn = Array.from(navLinks).find(
    (nav) => nav.dataset.target === target
  );
  if (activeBtn) {
    activeBtn.classList.add(
      "active",
      "text-teal-600",
      "border-b-2",
      "border-teal-500"
    );
    activeBtn.classList.remove("text-stone-600");
    activeBtn.style.borderBottomWidth = "2px";
    activeBtn.style.borderColor = "#14b8a6";
  }

  // Hide all sections
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Check if content is already loaded
  const targetSection = document.getElementById(target);
  if (
    !contentCache[target] ||
    targetSection.innerHTML.trim() === "" ||
    targetSection.innerHTML.includes("Content will be loaded here")
  ) {
    // Show loading spinner
    loadingSpinner.style.display = "flex";
    contentContainer.style.opacity = "0.3";

    // Load content
    const content = await loadSectionContent(target);

    // Parse and insert content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const sectionContent = doc.querySelector(`#${target}`);

    if (sectionContent) {
      targetSection.innerHTML = sectionContent.innerHTML;
    } else {
      targetSection.innerHTML = content;
    }

    // Hide spinner and restore opacity
    loadingSpinner.style.display = "none";
    contentContainer.style.opacity = "1";

    // Add fade in animation
    targetSection.classList.add("content-fade-in");
    setTimeout(() => {
      targetSection.classList.remove("content-fade-in");
    }, 300);

    // Reinitialize functionality for the loaded content
    initializeDynamicContent(target);
  }

  // Show the target section
  targetSection.style.display = "block";
}

function loadItineraryContent() {
  const dayFiles = [
    { file: "day1.js", key: "day1Itinerary", label: "第一天" },
    { file: "day2.js", key: "day2Itinerary", label: "第二天" },
    { file: "day3.js", key: "day3Itinerary", label: "第三天" },
    { file: "day4.js", key: "day4Itinerary", label: "第四天" },
    { file: "day5.js", key: "day5Itinerary", label: "第五天" },
    { file: "day6.js", key: "day6Itinerary", label: "第六天" },
  ];

  const itineraryContainer = document.getElementById("itinerary-container");
  if (!itineraryContainer) return;

  function renderItinerary(dayData) {
    const card = document.createElement("div");
    card.className =
      "day-card bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden";
    let itemsHtml = "";
    dayData.items.forEach((item) => {
      const budgetText =
        item.budget && item.budget.includes("刷卡")
          ? `<span class='text-blue-500'>${item.budget}</span>`
          : `<span class='text-orange-500'>${item.budget}</span>`;
      itemsHtml += `
        <div class='py-4 px-4 border-b border-stone-100 last:border-b-0' style='line-height:1.8;'>
          <p class='font-semibold text-stone-800 text-base mb-1' style='letter-spacing:0.5px;'>${
            item.time
          }: ${item.activity}</p>
          <div class='text-sm text-stone-500 flex flex-wrap gap-x-4 mb-1' style='gap:8px;'>
            <span><strong>交通:</strong> ${item.transport}</span>
            <span><strong>預算:</strong> ${
              item.budget === "無" || item.budget === "免費"
                ? item.budget
                : budgetText
            }</span>
          </div>
          ${
            item.story && item.story.trim()
              ? `<div class='text-sm text-teal-700 mt-2 bg-teal-50 p-3 rounded-md' style='line-height:1.7;word-break:break-word;'>💡 ${item.story}</div>`
              : ""
          }
        </div>
      `;
    });
    card.innerHTML = `
      <button class='w-full flex justify-between items-center p-4 text-left'>
          <div class='flex items-center gap-4'>
              <span class='text-2xl'>${dayData.icon}</span>
              <div>
                  <p class='font-bold text-lg text-teal-700'>${dayData.day} <span class='text-sm font-normal text-stone-500'>${dayData.date}</span></p>
                  <p class='text-stone-600'>${dayData.title}</p>
              </div>
          </div>
          <span class='transform transition-transform duration-300 text-2xl text-stone-400'>▼</span>
      </button>
      <div class='day-details bg-stone-50' style='display:none;'>
          ${itemsHtml}
      </div>
    `;
    itineraryContainer.appendChild(card);
  }

  // Clear existing content
  itineraryContainer.innerHTML = "";

  // Load all day files
  let loaded = 0;
  const dayDataArr = new Array(dayFiles.length);

  dayFiles.forEach((day, idx) => {
    const script = document.createElement("script");
    script.src = day.file;
    script.onload = function () {
      const data = window[day.key];
      if (data) {
        dayDataArr[idx] = data;
      }
      loaded++;
      if (loaded === dayFiles.length) {
        // Render all days in order
        dayDataArr.forEach((d) => {
          if (d) renderItinerary(d);
        });

        // Initialize card interactions
        initializeCards();
        addCardListeners();

        // Bind colonial popup
        setTimeout(() => {
          bindColonialPopup();
        }, 100);
      }
    };
    script.onerror = function () {
      console.error(`Failed to load ${day.file}`);
      loaded++;
      if (loaded === dayFiles.length) {
        // Still try to render what we have
        dayDataArr.forEach((d) => {
          if (d) renderItinerary(d);
        });
        initializeCards();
        addCardListeners();
        setTimeout(() => {
          bindColonialPopup();
        }, 100);
      }
    };
    document.body.appendChild(script);
  });
}

function initializeDynamicContent(sectionName) {
  switch (sectionName) {
    case "local-eye":
      initializeLocalEye();
      break;
    case "itinerary":
      loadItineraryContent();
      break;
    case "budget":
      initializeBudgetChart();
      break;
    case "hotspots":
    case "toolkit":
      initializeCards();
      addCardListeners();
      break;
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", async () => {
    await showSection(link.dataset.target);
    if (mobileNav) mobileNav.value = link.dataset.target;
  });
});

if (mobileNav) {
  mobileNav.addEventListener("change", async (e) => {
    await showSection(e.target.value);
  });
}

// Load dashboard content on page load
document.addEventListener("DOMContentLoaded", async () => {
  await showSection("dashboard");
  if (mobileNav) mobileNav.value = "dashboard";
});

function handleNavDisplay() {
  if (window.innerWidth <= 430) {
    if (navButtons) navButtons.style.display = "none";
    if (mobileNav) mobileNav.style.display = "block";
  } else {
    if (navButtons) navButtons.style.display = "flex";
    if (mobileNav) mobileNav.style.display = "none";
  }
}
window.addEventListener("resize", handleNavDisplay);
handleNavDisplay();

// Chart.js: Salary Comparison Chart
function initializeLocalEye() {
  // Salary Chart
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

  // 河粉指數計算
  const vndInput = document.getElementById("vndInput");
  const feelPrice = document.getElementById("feelPrice");
  if (vndInput && feelPrice) {
    vndInput.addEventListener("keyup", () => {
      const vndValue = parseFloat(vndInput.value) || 0;
      const twdValue = vndValue / 880;
      const feelValue = twdValue * 5;
      feelPrice.textContent = `NT$ ${Math.round(feelValue).toLocaleString()}`;
    });
  }

  // 音頻播放速度控制
  const audio = document.getElementById("st9Audio");
  const speedSelect = document.getElementById("speedSelect");
  if (audio && speedSelect) {
    speedSelect.addEventListener("change", () => {
      const selectedSpeed = parseFloat(speedSelect.value);
      audio.playbackRate = selectedSpeed;
    });
  }
}

// Chart.js: Budget Donut Chart
function initializeBudgetChart() {
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
}

// Modal logic for colonial tour
function bindColonialPopup() {
  const colonialButtons = document.querySelectorAll(".colonial-activity");
  const colonialModal = document.getElementById("colonial-modal");
  const closeColonialModal = document.getElementById("close-colonial-modal");

  if (colonialButtons.length > 0 && colonialModal && closeColonialModal) {
    colonialButtons.forEach((button) => {
      button.addEventListener("click", function () {
        colonialModal.classList.remove("hidden");
      });
    });

    closeColonialModal.addEventListener("click", function () {
      colonialModal.classList.add("hidden");
    });

    colonialModal.addEventListener("click", function (e) {
      if (e.target === colonialModal) {
        colonialModal.classList.add("hidden");
      }
    });
  }
}

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

export { initializeCards, addCardListeners };
