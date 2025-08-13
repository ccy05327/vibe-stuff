import { addCardListeners, initializeCards } from "./main-ui.js";

const dayFiles = [
  { file: "daily/day1.js", key: "day1Itinerary", label: "第一天" },
  { file: "daily/day2.js", key: "day2Itinerary", label: "第二天" },
  { file: "daily/day3.js", key: "day3Itinerary", label: "第三天" },
  { file: "daily/day4.js", key: "day4Itinerary", label: "第四天" },
  { file: "daily/day5.js", key: "day5Itinerary", label: "第五天" },
  { file: "daily/day6.js", key: "day6Itinerary", label: "第六天" },
];
const itineraryContainer = document.getElementById("itinerary-container");

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

function loadAllDays() {
  itineraryContainer.innerHTML = "";
  // 按照 dayFiles 順序依序載入
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
        // 全部載入後依序渲染
        dayDataArr.forEach((d) => {
          if (d) renderItinerary(d);
        });
        initializeCards();
        addCardListeners();
        // 重新綁定 popup
        setTimeout(() => {
          if (typeof bindColonialPopup === "function") bindColonialPopup();
        }, 0);
      }
    };
    document.body.appendChild(script);
  });
}

// Remove automatic execution - let main-ui.js handle the loading
// loadAllDays();
