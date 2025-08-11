# Modal Popup 組織指南

## 概述

我們已經在 `itinerary.html` 中建立了一個可擴展的 modal 系統，可以輕鬆添加新的彈出視窗。

## Modal 命名規範

### 1. HTML 結構

每個 modal 都遵循以下命名模式：

```html
<!-- [主題]-modal -->
<div id="colonial-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 hidden">
  <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fade-in">
    <!-- close-[主題]-modal -->
    <button id="close-colonial-modal" class="absolute top-3 right-3...">×</button>
    <div class="space-y-6 text-stone-800...">
      <!-- 內容 -->
    </div>
  </div>
</div>
```

### 2. 觸發按鈕

在行程卡片或其他地方使用以下 class 來觸發 modal：

```html
<!-- [主題]-activity -->
<span class="colonial-activity font-bold cursor-pointer text-amber-700 hover:underline">
  法式殖民建築漫遊
</span>
```

## 目前可用的 Modal

### 1. 法式殖民建築漫遊 Modal

- **Modal ID**: `colonial-modal`
- **觸發 Class**: `colonial-activity`
- **關閉按鈕 ID**: `close-colonial-modal`
- **用途**: 法式建築詳細介紹

### 2. 湄公河三角洲攻略 Modal  

- **Modal ID**: `mekong-modal`
- **觸發 Class**: `mekong-activity`
- **關閉按鈕 ID**: `close-mekong-modal`
- **用途**: 湄公河行程詳細攻略

### 3. 美食推薦 Modal

- **Modal ID**: `food-modal`
- **觸發 Class**: `food-activity`
- **關閉按鈕 ID**: `close-food-modal`
- **用途**: 餐廳詳細介紹和攻略

### 4. 交通攻略 Modal

- **Modal ID**: `transport-modal`
- **觸發 Class**: `transport-activity`
- **關閉按鈕 ID**: `close-transport-modal`
- **用途**: 交通方式詳細說明

### 5. 夜市攻略 Modal

- **Modal ID**: `nightmarket-modal`
- **觸發 Class**: `nightmarket-activity`
- **關閉按鈕 ID**: `close-nightmarket-modal`
- **用途**: 夜市購物和美食攻略

### 6. 碎米飯深度導覽 Modal

- **Modal ID**: `comtam-modal`
- **觸發 Class**: `comtam-activity`
- **關閉按鈕 ID**: `close-comtam-modal`
- **用途**: 巴海姐碎米飯詳細介紹與文化背景

### 7. 水上木偶戲深度導覽 Modal

- **Modal ID**: `waterpuppet-modal`
- **觸發 Class**: `waterpuppet-activity`
- **關閉按鈕 ID**: `close-waterpuppet-modal`
- **用途**: 越南國粹水上木偶戲完整攻略

## 如何添加新的 Modal

### 步驟 1: 在 itinerary.html 中添加 Modal HTML

```html
<!-- 5. 新主題 Modal -->
<div
  id="newtheme-modal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 hidden"
>
  <div
    class="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative animate-fade-in"
    style="max-height: 80vh; overflow-y: auto"
  >
    <button
      id="close-newtheme-modal"
      class="absolute top-3 right-3 text-stone-400 hover:text-stone-700 text-2xl font-bold"
    >
      ×
    </button>
    <div class="space-y-4 text-stone-800 text-base max-h-[60vh] overflow-y-auto pr-2">
      <h3 class="font-bold text-xl text-purple-600 mb-3">🎯 新主題標題</h3>
      <!-- 內容 -->
      <p class="text-stone-600">新主題的詳細內容...</p>
    </div>
  </div>
</div>
```

### 步驟 2: 在 main-ui.js 中添加配置

在 `bindItineraryModals()` 函數的 `modalConfigs` 陣列中添加：

```javascript
{
  triggerClass: "newtheme-activity",
  modalId: "newtheme-modal", 
  closeId: "close-newtheme-modal"
}
```

### 步驟 3: 在行程中使用觸發按鈕

在 day*.js 文件中的 activity 字段使用：

```javascript
activity: "<span class='newtheme-activity font-bold cursor-pointer text-purple-700 hover:underline'>新主題詳細介紹</span>"
```

## 使用範例

在您的 day3.js 湄公河行程中，可以這樣使用：

```javascript
activity: "<span class='mekong-activity font-bold cursor-pointer text-blue-700 hover:underline'>湄公河三角洲一日遊詳細攻略</span>"
```

這樣點擊後就會開啟湄公河的詳細 modal。

## 優點

1. **統一管理**: 所有 modal 都在 itinerary.html 中
2. **易於擴展**: 只需添加 HTML 和配置即可
3. **自動綁定**: JavaScript 會自動處理所有事件綁定
4. **一致體驗**: 所有 modal 都有相同的開啟/關閉行為
5. **命名規範**: 清晰的命名模式，易於維護
