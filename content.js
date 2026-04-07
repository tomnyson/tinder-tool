// Lắng nghe message từ popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Kiểm tra action có phải là 'highlightLinks' không
    if (request.action === 'highlightLinks') {
        // Tìm tất cả các thẻ <a> trên trang
        const links = document.querySelectorAll('a');

        // Đổi màu nền của tất cả các thẻ <a> sang màu vàng
        links.forEach(link => {
            link.style.backgroundColor = 'yellow';
            link.style.padding = '2px 4px';
            link.style.borderRadius = '3px';
            link.style.transition = 'all 0.3s ease';
        });

        // Gửi phản hồi về popup.js với số lượng link tìm thấy
        sendResponse({ count: links.length });

        // Hiển thị thông báo trên console của trang web
        console.log(`🎨 Extension: Đã highlight ${links.length} đường dẫn`);
    }

    // Trả về true để giữ kênh message mở (cho sendResponse bất đồng bộ)
    return true;
});
