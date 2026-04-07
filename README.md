# Chrome Extension - DOM Practice

Extension Chrome cơ bản để thực hành thao tác DOM.

## 🎯 Chức năng

- Extension có một nút bấm trên popup
- Khi bấm nút, tìm tất cả các thẻ `<a>` trên trang web hiện tại
- Đổi màu nền của các thẻ `<a>` sang màu vàng
- Hiển thị thông báo số lượng đường dẫn tìm thấy

## 📁 Cấu trúc file

```
├── manifest.json    # Cấu hình extension (Manifest V3)
├── popup.html       # Giao diện popup
├── popup.js         # Logic xử lý popup
└── content.js       # Script thao tác DOM trên trang web
```

## 🔧 Cách hoạt động

### 1. **manifest.json**
- Sử dụng Manifest V3
- Khai báo permissions: `activeTab`, `scripting`
- Cho phép truy cập tất cả URL với `host_permissions`

### 2. **popup.html**
- Hiển thị giao diện với một nút bấm
- Thiết kế đẹp mắt với gradient và hiệu ứng hover

### 3. **popup.js** (Gửi message)
Khi người dùng click nút:
1. Lấy tab hiện tại đang active
2. Inject `content.js` vào trang web
3. Gửi message với action `highlightLinks` xuống content script
4. Nhận phản hồi và hiển thị alert

```javascript
chrome.tabs.sendMessage(tab.id, { action: 'highlightLinks' }, (response) => {
  alert(`Đã tìm thấy ${response.count} đường dẫn!`);
});
```

### 4. **content.js** (Nhận message và thao tác DOM)
1. Lắng nghe message từ popup
2. Tìm tất cả thẻ `<a>` bằng `document.querySelectorAll('a')`
3. Đổi màu nền sang vàng
4. Gửi phản hồi về popup với số lượng link

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightLinks') {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.style.backgroundColor = 'yellow';
    });
    sendResponse({ count: links.length });
  }
  return true; // Quan trọng: giữ kênh message mở
});
```

## 📝 Cơ chế Message Passing

**popup.js → content.js:**
```
chrome.tabs.sendMessage(tabId, { action: 'highlightLinks' })
```

**content.js nhận và phản hồi:**
```
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Xử lý request
  sendResponse({ count: links.length });
  return true; // Bắt buộc để sendResponse hoạt động
});
```

## 🚀 Cách cài đặt

1. Mở Chrome và truy cập `chrome://extensions/`
2. Bật "Developer mode" (Chế độ nhà phát triển)
3. Click "Load unpacked" (Tải tiện ích đã giải nén)
4. Chọn thư mục chứa extension này
5. Extension sẽ xuất hiện trên thanh công cụ

## 📌 Lưu ý

- Extension cần icon files (icon16.png, icon48.png, icon128.png) để hoạt động hoàn chỉnh
- Bạn có thể tạo icon đơn giản hoặc tạm thời comment phần icon trong manifest
- `return true` trong `onMessage.addListener` rất quan trọng để `sendResponse` hoạt động bất đồng bộ

## 🎮 Tinder Auto-Click Feature

### Chức năng
Extension tự động click vào phần tử `.gamepad-icon-wrapper` trên trang Tinder.

### Cách hoạt động

**1. Auto-click tự động:**
- Script `tinder-auto-click.js` được inject tự động vào trang Tinder
- Sử dụng `MutationObserver` để theo dõi DOM changes (vì Tinder là SPA)
- Tự động tìm và click `.gamepad-icon-wrapper` khi phát hiện phần tử

**2. Manual trigger:**
- Click nút "Click Gamepad Icon" trong popup
- Gửi message `{ action: 'clickGamepad' }` xuống content script
- Nhận phản hồi và hiển thị kết quả

### Code chi tiết

**manifest.json:**
```json
"content_scripts": [
  {
    "matches": ["https://tinder.com/*"],
    "js": ["tinder-auto-click.js"],
    "run_at": "document_idle"
  }
]
```

**tinder-auto-click.js:**
- Tự động chạy sau 1 giây
- MutationObserver theo dõi DOM trong 10 giây
- Ngừng observer sau khi click thành công hoặc timeout


## 🎓 Kiến thức học được

- Manifest V3 configuration
- Chrome Extension API: `chrome.tabs`, `chrome.scripting`
- Message passing giữa popup và content script
- DOM manipulation với JavaScript
- Event handling và async/await

---

**Chúc bạn học tốt! 🎉**
# tinder-tool
