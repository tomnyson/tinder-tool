// Tinder Auto-Click Script
// Prevent duplicate injection
if (window.__tinderAutoToolLoaded) {
    console.log('🔥 Tinder Auto Tool đã được load trước đó, bỏ qua...');
} else {
    window.__tinderAutoToolLoaded = true;
    console.log('🔥 Tinder Auto Tool đã được load');

    // ========== FLOATING QUOTE BUTTON UI ==========

    // Time-based quotes data
    const quotesByTime = {
        morning: {
            label: '🌅 Sáng',
            emoji: '☀️',
            quotes: [
                'Chào buổi sáng! Chúc bạn một ngày mới tràn đầy năng lượng! ☀️',
                'Sáng nay thức dậy, mình nghĩ đến bạn đầu tiên 🌸',
                'Mỗi buổi sáng là một khởi đầu mới. Chúc bạn nhiều niềm vui! 🌈',
                'Good morning! Ngày mới tuyệt vời nhé! ✨',
                'Chào ngày mới! Hãy luôn mỉm cười bạn nhé 😊',
                'Dậy chưa em?',
                'Sáng nay em ngủ có ngon không?',
                'Em ăn sáng chưa?',
                'Sáng nay em định làm gì?',
                'Hôm nay em có bận không?',
                'Em uống cà phê hay trà?',
                'Sáng nay tâm trạng em thế nào?',
                'Sáng nay em muốn nghe một điều vui không?',
                'Hôm nay em muốn mọi thứ diễn ra kiểu nhẹ nhàng hay bận rộn?',
                'Em thường làm gì vào cuối tuần?',
                'Em thích uống đồ uống nào?',
                'Nếu được chọn một nơi để đi du lịch ngay bây giờ, em sẽ chọn nơi nào?',
                'Em có hay nghe nhạc không? Thể loại nào là "gu" của em?',
                'Em là người hướng nội hay hướng ngoại?'
            ]
        },
        noon: {
            label: '🌞 Trưa',
            emoji: '🌞',
            quotes: [
                'Buổi trưa vui vẻ! Nhớ ăn trưa đầy đủ nhé 🍜',
                'Giữa ngày bận rộn, gửi bạn chút năng lượng tích cực! 💪',
                'Chúc buổi trưa an lành, chiều thêm may mắn! ✨',
                'Trưa rồi, nghỉ ngơi tí đi bạn ơi! ☕',
                'Gửi bạn một buổi trưa thật vui! 🌟',
                'Em ăn cơm chưa?',
                'Em ăn mấy bát? 😄',
                'Trưa nay em ăn gì?',
                'Em nghỉ trưa được không?',
                'Buổi sáng nay của em ổn không?',
                'Trưa nóng lắm, em uống nước chưa?',
                'Trưa nay em có đi đâu không?',
                'Có món nào em thèm mà lâu rồi chưa ăn không?',
                'Kỷ niệm tuổi thơ nào khiến em nhớ nhất?',
                'Điều gì khiến em cảm thấy hạnh phúc nhất gần đây?',
                'Ai là người truyền cảm hứng lớn nhất cho em?',
                'Nếu được chọn một siêu năng lực, em muốn có gì?',
                'Em có tin vào tình yêu sét đánh không?'
            ]
        },
        afternoon: {
            label: '🌤️ Chiều',
            emoji: '🌤️',
            quotes: [
                'Chiều nay em đang làm gì?',
                'Hôm nay em mệt không?',
                'Việc học/công việc chiều nay ổn chứ?',
                'Em có cần nghỉ một chút không?',
                'Chiều nay em uống gì cho tỉnh?',
                'Có chuyện gì làm em vui (hoặc khó chịu) hôm nay không?',
                'Chiều nay em muốn tan làm/tan học sớm không?',
                'Nếu được chọn, chiều nay em muốn đi dạo hay ở nhà nghỉ?',
                'Em là kiểu người thích lên kế hoạch hay sống ngẫu hứng?',
                'Nếu có một ngày rảnh hoàn toàn, em sẽ dùng nó như thế nào?',
                'Em nghĩ một mối quan hệ lâu dài cần nhất điều gì?',
                'Em có bao giờ cảm thấy ai đó đang âm thầm quan tâm mình không?',
                'Em nghĩ tình cảm nên bắt đầu từ tình bạn hay ánh nhìn đầu tiên?'
            ]
        },
        evening: {
            label: '🌙 Tối',
            emoji: '🌙',
            quotes: [
                'Buổi tối an lành! Ngày hôm nay của bạn thế nào? 🌙',
                'Chúc bạn một đêm ngủ ngon và những giấc mơ đẹp 💤',
                'Cuối ngày rồi, thư giãn và nghỉ ngơi thật tốt nhé! 🌟',
                'Tối nay có gì vui không? Kể mình nghe đi! 💬',
                'Good night! Ngủ ngon nhé bạn 🌟',
                'Em ăn tối chưa?',
                'Tối nay em định làm gì?',
                'Em về nhà chưa?',
                'Hôm nay của em thế nào rồi?',
                'Tối nay em muốn thư giãn kiểu gì?',
                'Em có muốn kể anh nghe một chuyện trong ngày không?',
                'Ngủ sớm nha, mai còn năng lượng.',
                'Tối nay em muốn xem phim, nghe nhạc hay đi dạo?',
                'Nếu có người thích em thầm lặng mỗi ngày, em có muốn biết không?',
                'Điều gì làm em cảm thấy mình đang sống thật sự?',
                'Em sợ điều gì nhất trong một mối quan hệ?',
                'Nếu mai là ngày tận thế, em sẽ làm gì hôm nay?',
                'Nếu anh là người duy nhất còn lại trên Trái Đất, em có đi tìm anh không?',
                'Nếu một ngày thức dậy và em đổi giới tính, em sẽ làm gì trước tiên?',
                'Nếu em viết sách về cuộc đời mình, tên sách sẽ là gì?',
                'Nếu có thể ăn một món duy nhất cả đời, em chọn gì?',
                'Em đã từng muốn thử điều gì mà chưa dám không?',
                'Nếu được chọn, em muốn đi picnic, du lịch biển hay leo núi?'
            ]
        },
        deep: {
            label: '💘 Deep',
            emoji: '💘',
            quotes: [
                'Em thường làm gì vào cuối tuần?',
                'Em thích uống đồ uống nào?',
                'Nếu được chọn một nơi để đi du lịch ngay bây giờ, em sẽ chọn nơi nào?',
                'Em có hay nghe nhạc không? Thể loại nào là "gu" của em?',
                'Em là người hướng nội hay hướng ngoại?',
                'Kỷ niệm tuổi thơ nào khiến em nhớ nhất?',
                'Điều gì khiến em cảm thấy hạnh phúc nhất gần đây?',
                'Ai là người truyền cảm hứng lớn nhất cho em?',
                'Nếu được chọn một siêu năng lực, em muốn có gì?',
                'Em có tin vào tình yêu sét đánh không?',
                'Em là kiểu người thích lên kế hoạch hay sống ngẫu hứng?',
                'Nếu có một ngày rảnh hoàn toàn, em sẽ dùng nó như thế nào?',
                'Em nghĩ một mối quan hệ lâu dài cần nhất điều gì?',
                'Em có bao giờ cảm thấy ai đó đang âm thầm quan tâm mình không?',
                'Em nghĩ tình cảm nên bắt đầu từ tình bạn hay ánh nhìn đầu tiên?',
                'Nếu có người thích em thầm lặng mỗi ngày, em có muốn biết không?',
                'Điều gì làm em cảm thấy mình đang sống thật sự?',
                'Em sợ điều gì nhất trong một mối quan hệ?',
                'Nếu mai là ngày tận thế, em sẽ làm gì hôm nay?',
                'Nếu anh là người duy nhất còn lại trên Trái Đất, em có đi tìm anh không?',
                'Nếu một ngày thức dậy và em đổi giới tính, em sẽ làm gì trước tiên?',
                'Nếu em viết sách về cuộc đời mình, tên sách sẽ là gì?',
                'Nếu có thể ăn một món duy nhất cả đời, em chọn gì?',
                'Em đã từng muốn thử điều gì mà chưa dám không?',
                'Nếu được chọn, em muốn đi picnic, du lịch biển hay leo núi?'
            ]
        }
    };

    function getCurrentTimeSlot() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return 'morning';
        if (hour >= 11 && hour < 14) return 'noon';
        if (hour >= 14 && hour < 17) return 'afternoon';
        return 'evening';
    }

    function createFloatingQuoteUI() {
        // Check if already exists
        if (document.getElementById('tinder-quote-btn')) return;

        // Create styles
        const styles = document.createElement('style');
        styles.textContent = `
    #tinder-quote-btn {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF6B6B, #FF8E53);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s ease;
    }
    #tinder-quote-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
    }
    #tinder-quote-menu {
      position: fixed;
      bottom: 160px;
      right: 20px;
      background: white;
      color: #333;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      z-index: 99998;
      min-width: 280px;
      max-height: 400px;
      overflow: hidden;
      display: none;
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    #tinder-quote-menu.show { display: block; }
    .quote-menu-header {
      background: linear-gradient(135deg, #FF6B6B, #FF8E53);
      color: white;
      padding: 12px 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .quote-menu-close {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
    }
    .quote-tabs {
      display: flex;
      border-bottom: 2px solid #eee;
    }
    .quote-tab {
      flex: 1;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      background: none;
      border: none;
      font-size: 14px;
      color: #666;
      transition: all 0.2s;
    }
    .quote-tab.active {
      background: #fff3e0;
      color: #FF6B6B;
      font-weight: bold;
    }
    .quote-tab:hover { background: #f5f5f5; color: #333; }
    .quote-list {
      max-height: 250px;
      overflow-y: auto;
      padding: 8px;
    }
    .quote-item {
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 6px;
      font-size: 13px;
      color: #333;
      line-height: 1.4;
      border: 1px solid #eee;
    }
    .quote-item:hover {
      background: #fff3e0;
      border-color: #FF6B6B;
    }
    .current-time-badge {
      font-size: 11px;
      background: rgba(255,255,255,0.3);
      padding: 2px 8px;
      border-radius: 10px;
    }
  `;
        document.head.appendChild(styles);

        // Create main button
        const btn = document.createElement('button');
        btn.id = 'tinder-quote-btn';
        btn.innerHTML = '💬';
        btn.title = 'Chọn Quote';
        document.body.appendChild(btn);

        // Create menu
        const menu = document.createElement('div');
        menu.id = 'tinder-quote-menu';

        const currentSlot = getCurrentTimeSlot();
        const currentLabel = quotesByTime[currentSlot].label;

        menu.innerHTML = `
    <div class="quote-menu-header">
      <span>💬 Chọn Quote</span>
      <span class="current-time-badge">Hiện tại: ${currentLabel}</span>
      <button class="quote-menu-close">✕</button>
    </div>
    <div class="quote-tabs">
      <button class="quote-tab ${currentSlot === 'morning' ? 'active' : ''}" data-slot="morning">🌅 Sáng</button>
      <button class="quote-tab ${currentSlot === 'noon' ? 'active' : ''}" data-slot="noon">🌞 Trưa</button>
      <button class="quote-tab ${currentSlot === 'afternoon' ? 'active' : ''}" data-slot="afternoon">🌤️ Chiều</button>
      <button class="quote-tab ${currentSlot === 'evening' ? 'active' : ''}" data-slot="evening">🌙 Tối</button>
      <button class="quote-tab" data-slot="deep">💘 Deep</button>
    </div>
    <div class="quote-list" id="quote-list-content"></div>
  `;
        document.body.appendChild(menu);

        // Render quotes
        function renderQuotes(slot) {
            const listEl = document.getElementById('quote-list-content');
            const quotes = quotesByTime[slot].quotes;
            listEl.innerHTML = quotes.map((q, i) => `
      <div class="quote-item" data-quote="${q.replace(/"/g, '&quot;')}">${q}</div>
    `).join('');
        }

        // Initial render
        renderQuotes(currentSlot);

        // Tab switching
        menu.querySelectorAll('.quote-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                menu.querySelectorAll('.quote-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderQuotes(tab.dataset.slot);
            });
        });

        // Quote click - insert to textarea
        menu.querySelector('.quote-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('quote-item')) {
                const quote = e.target.dataset.quote;
                insertQuoteToTextarea(quote);
                menu.classList.remove('show');
            }
        });

        // Toggle menu
        btn.addEventListener('click', () => {
            menu.classList.toggle('show');
        });

        // Close button
        menu.querySelector('.quote-menu-close').addEventListener('click', () => {
            menu.classList.remove('show');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== btn) {
                menu.classList.remove('show');
            }
        });

        console.log('✅ Quote UI đã được tạo!');
    }

    function insertQuoteToTextarea(quote) {
        const textarea = document.querySelector('textarea[placeholder="Type a message"]');
        if (textarea) {
            textarea.focus();
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            nativeInputValueSetter.call(textarea, quote);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            console.log('✅ Đã chèn quote:', quote);
        } else {
            alert('Vui lòng mở một cuộc trò chuyện trước!');
        }
    }

    // Initialize UI when page loads
    setTimeout(createFloatingQuoteUI, 1500);

    // ========== GAMEPAD AUTO CLICK ==========
    let autoClickTimeout = null;
    let isRunning = false;
    let currentClick = 0;
    let totalClicks = 0;
    let minDelayMs = 1000;
    let maxDelayMs = 3000;

    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clickGamepadIcon() {
        // Target the Like button specifically (has sparks-like class)
        const likeButton = document.querySelector('button[class*="gamepad-sparks-like"]');
        if (likeButton) {
            likeButton.click();
            console.log('💚 Clicked LIKE button');
            return true;
        }

        // Fallback: try to find by the wrapper class with like styling
        const likeWrapper = document.querySelector('.gamepad-button-wrapper button[class*="sparks-like"]');
        if (likeWrapper) {
            likeWrapper.click();
            console.log('💚 Clicked LIKE button (fallback)');
            return true;
        }

        console.log('❌ Like button not found');
        return false;
    }

    function startAutoClick(count, minDelay, maxDelay) {
        stopAutoClick();
        currentClick = 0;
        totalClicks = count;
        minDelayMs = minDelay;
        maxDelayMs = maxDelay;
        isRunning = true;
        console.log(`🚀 Auto click: ${count} lần, delay ${minDelay / 1000}s - ${maxDelay / 1000}s`);
        performClick();
    }

    function scheduleNextClick() {
        if (!isRunning || currentClick >= totalClicks) return;
        const delay = getRandomDelay(minDelayMs, maxDelayMs);
        autoClickTimeout = setTimeout(performClick, delay);
    }

    function performClick() {
        if (!isRunning || currentClick >= totalClicks) {
            stopAutoClick();
            chrome.runtime.sendMessage({ action: 'completed', total: currentClick });
            return;
        }

        if (clickGamepadIcon()) {
            currentClick++;
            chrome.runtime.sendMessage({ action: 'updateProgress', current: currentClick, total: totalClicks });
            scheduleNextClick();
        } else {
            stopAutoClick();
            chrome.runtime.sendMessage({ action: 'error', message: 'Không tìm thấy gamepad icon!' });
        }
    }

    function stopAutoClick() {
        isRunning = false;
        if (autoClickTimeout) {
            clearTimeout(autoClickTimeout);
            autoClickTimeout = null;
        }
    }

    // ========== BULK MESSAGE ==========
    let isSendingMessages = false;
    let messageTimeout = null;
    let currentMessageIndex = 0;
    let totalMessages = 0;
    let messageToSend = '';
    let quotesArray = [];
    let useRandomQuotes = false;
    let msgMinDelay = 3000;
    let msgMaxDelay = 5000;
    let processedHrefs = [];

    // ========== STORAGE HELPER ==========
    // Chống lỗi "Cannot read properties of undefined (reading 'local')" nếu script thay vì content script bị chạy ở môi trường thường (như extension dev reload, userscript, paste console...).
    const StorageHelper = {
        async get(keys) {
            try {
                if (typeof chrome !== 'undefined' && chrome && chrome.storage && chrome.storage.local) {
                    return await chrome.storage.local.get(keys);
                }
            } catch (e) {
                console.warn("Chrome storage not available, fallback to localStorage", e);
            }
            // Fallback
            const result = {};
            keys.forEach(key => {
                const val = localStorage.getItem('tinder_ext_' + key);
                if (val) result[key] = JSON.parse(val);
            });
            return result;
        },
        async set(obj) {
            try {
                if (typeof chrome !== 'undefined' && chrome && chrome.storage && chrome.storage.local) {
                    await chrome.storage.local.set(obj);
                    return;
                }
            } catch (e) {
                console.warn("Chrome storage not available, fallback to localStorage", e);
            }
            // Fallback
            Object.keys(obj).forEach(key => {
                localStorage.setItem('tinder_ext_' + key, JSON.stringify(obj[key]));
            });
        }
    };

    // ========== MESSAGE HISTORY ==========
    // Lưu lịch sử tin nhắn đã gửi
    async function saveMessageHistory(name, message) {
        try {
            const result = await StorageHelper.get(['messageHistory']);
            const history = result.messageHistory || [];

            history.unshift({
                name: name,
                message: message,
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleString('vi-VN')
            });

            // Giới hạn 500 bản ghi
            if (history.length > 500) {
                history.splice(500);
            }

            await StorageHelper.set({ messageHistory: history });
            console.log(`📝 Đã lưu lịch sử: ${name}`);
        } catch (e) {
            console.error('❌ Lỗi lưu lịch sử:', e);
        }
    }

    // Lấy lịch sử tin nhắn
    async function getMessageHistory() {
        const result = await StorageHelper.get(['messageHistory']);
        return result.messageHistory || [];
    }

    // Xóa lịch sử
    async function clearMessageHistory() {
        await StorageHelper.set({ messageHistory: [] });
        console.log('🗑️ Đã xóa lịch sử');
    }

    // Lấy tin nhắn cho người thứ N (mỗi người 1 quote khác nhau)
    function getMessageForPerson(index) {
        if (useRandomQuotes && quotesArray.length > 0) {
            // Lấy quote theo index, nếu hết thì quay vòng lại từ đầu
            const quoteIndex = index % quotesArray.length;
            return quotesArray[quoteIndex];
        }
        return messageToSend;
    }

    // Lấy danh sách message items từ sidebar
    function getMessageItems() {
        // Thử nhiều selector khác nhau
        let items = document.querySelectorAll('.messageList ul li > a.messageListItem');
        if (items.length === 0) {
            items = document.querySelectorAll('ul[aria-label="Your recent messages"] li > a');
        }
        if (items.length === 0) {
            items = document.querySelectorAll('a.messageListItem');
        }
        console.log(`📋 Tìm thấy ${items.length} items trong sidebar`);
        return Array.from(items);
    }

    // Lấy container scroll của message list
    function getMessageListContainer() {
        // Thử nhiều selector
        let container = document.querySelector('.messageList');
        if (!container) {
            container = document.querySelector('[class*="MessageList"]');
        }
        if (!container) {
            // Tìm parent của message items
            const items = getMessageItems();
            if (items.length > 0) {
                container = items[0].closest('ul')?.parentElement || items[0].closest('[class*="message"]');
            }
        }
        return container;
    }

    // Cuộn xuống cho đến khi tìm thấy tin nhắn chưa được xử lý
    async function scrollToFindNewPerson(maxScrolls = 20) {
        const container = getMessageListContainer();
        if (!container) {
            console.log('⚠️ Không tìm thấy container để scroll');
            return false;
        }

        console.log(`📜 Đang scroll để tìm người nhắn mới...`);

        for (let i = 0; i < maxScrolls; i++) {
            const items = getMessageItems();
            
            // Check if there is any item not in processedHrefs
            const hasNew = items.some(item => item && item.href && !processedHrefs.includes(item.href));
            if (hasNew) {
                console.log(`✅ Đã tìm thấy người mới sau ${i} lần cuộn.`);
                return true;
            }

            container.scrollBy({ top: 1200, behavior: 'smooth' });
            // Đợi load để React kịp render layout, tránh layout thrashing
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        console.log(`⚠️ Không tìm thấy thêm người mới sau ${maxScrolls} lần cuộn.`);
        return false;
    }

    // Scroll item vào view
    function scrollItemIntoView(item) {
        if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function startBulkMessage(message, quotes, useRandom, count, minDelay, maxDelay) {
        stopBulkMessage();

        messageToSend = message;
        quotesArray = quotes || [];
        useRandomQuotes = useRandom || false;
        msgMinDelay = minDelay;
        msgMaxDelay = maxDelay;

        const items = getMessageItems();
        if (items.length === 0) {
            chrome.runtime.sendMessage({ action: 'error', message: 'Không tìm thấy danh sách tin nhắn!' });
            return;
        }

        // Limit count if specified. If count === 0 (all), use a large boundary.
        totalMessages = count > 0 ? count : 9999;
        currentMessageIndex = 0;
        processedHrefs = [];
        isSendingMessages = true;

        // Lưu trạng thái để phục hồi sau khi reload
        const state = {
            isRunning: true,
            messageToSend,
            quotesArray,
            useRandomQuotes,
            totalMessages,
            currentMessageIndex: 0,
            msgMinDelay,
            msgMaxDelay,
            processedHrefs: []
        };
        StorageHelper.set({ bulkMsgState: state });

        console.log(`📨 Bắt đầu gửi tin nhắn cho ${totalMessages === 9999 ? 'tất cả' : totalMessages} người`);
        console.log(`📋 Mode: ${useRandomQuotes ? 'Random quotes (' + quotesArray.length + ' câu)' : 'Single message'}`);

        // Bắt đầu với item đầu tiên ngay lập tức, scroll động thay vì load hàng loạt lúc bắt đầu
        clickAndSendMessage();

        return true;
    }

    // Hàm chính: click vào item và gửi tin nhắn
    function clickAndSendMessage() {
        if (!isSendingMessages) {
            console.log('⚠️ Đã bị dừng');
            return;
        }

        if (currentMessageIndex >= totalMessages) {
            console.log('✅ Hoàn thành tất cả!');
            stopBulkMessage();
            chrome.runtime.sendMessage({ action: 'completed', total: currentMessageIndex });
            return;
        }

        // Lưu tiến trình
        StorageHelper.get(['bulkMsgState']).then((res) => {
            if (res.bulkMsgState && res.bulkMsgState.isRunning) {
                res.bulkMsgState.currentMessageIndex = currentMessageIndex;
                res.bulkMsgState.processedHrefs = processedHrefs;
                StorageHelper.set({ bulkMsgState: res.bulkMsgState });
            }
        }).catch(e => console.error("Lỗi lưu tiến trình:", e));

        processCurrentItem();
    }

    // Xử lý item hiện tại
    function processCurrentItem() {
        const items = getMessageItems();
        
        // CƠ CHẾ CHỐNG DUPLICATE TUYỆT ĐỐI KHÔNG DỰA VÀO INDEX THAY ĐỔI
        let targetItem = null;
        for (let i = 0; i < items.length; i++) {
            if (items[i] && items[i].href && !processedHrefs.includes(items[i].href)) {
                targetItem = items[i];
                break;
            }
        }

        if (!targetItem) {
            console.log('📜 Hết người mới hiển thị trên màn hình, đang cuộn để tìm thêm...');
            
            scrollToFindNewPerson(15).then((foundNew) => {
                if (!foundNew) {
                    console.log('⚠️ Không tìm thấy người mới nào nữa. Đã hết danh sách.');
                    stopBulkMessage();
                    chrome.runtime.sendMessage({ action: 'completed', total: currentMessageIndex });
                    return;
                }
                
                // Nếu tìm thấy, tiếp tục chạy lại để xử lý
                setTimeout(processCurrentItem, 1000);
            });
            return;
        }

        const currentItem = targetItem;
        // Đánh dấu là ĐÃ TIN NHẮN (ngay lập tức) để tránh bị duplicate vĩnh viễn (kể cả khi DOM bị xáo trộn hoặc reload)
        processedHrefs.push(currentItem.href);

        const name = currentItem.getAttribute('aria-label') || `Person ${currentMessageIndex + 1}`;

        console.log(`\n========================================`);
        console.log(`📩 [${currentMessageIndex + 1}/${totalMessages}] Đang xử lý: ${name}`);
        console.log(`========================================`);

        // Step 1: Scroll item vào view trước
        console.log('📜 Step 0: Scroll item vào view...');
        scrollItemIntoView(currentItem);

        // Step 2: Click vào item trong sidebar (sau khi scroll)
        setTimeout(() => {
            console.log('👆 Step 1: Click vào item...');
            currentItem.click();

            // Step 2: Đợi conversation load rồi type và send
            setTimeout(() => {
                console.log('✍️ Step 2: Tìm textarea và nhập tin nhắn...');

                const textarea = document.querySelector('textarea[placeholder="Type a message"]');
                if (!textarea) {
                    console.log('❌ Không tìm thấy textarea, bỏ qua người này');
                    currentMessageIndex++;
                    chrome.runtime.sendMessage({ action: 'updateProgress', current: currentMessageIndex, total: totalMessages });
                    scheduleNextPerson();
                    return;
                }

                // Type message - lấy tin nhắn cho người này (mỗi người 1 quote khác nhau)
                const currentMessage = getMessageForPerson(currentMessageIndex);
                textarea.focus();
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
                nativeInputValueSetter.call(textarea, currentMessage);
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Đã nhập tin nhắn [${currentMessageIndex + 1}]:`, currentMessage);

                // Step 3: Click nút Send
                setTimeout(() => {
                    console.log('📤 Step 3: Click nút SEND...');
                    const sendButton = document.querySelector('button[type="submit"]');

                    if (sendButton) {
                        sendButton.click();
                        console.log('✅ Đã click SEND!');

                        // Lưu lịch sử tin nhắn đã gửi
                        saveMessageHistory(name, currentMessage);
                    } else {
                        console.log('❌ Không tìm thấy nút SEND');
                    }

                    // Update progress
                    currentMessageIndex++;
                    chrome.runtime.sendMessage({
                        action: 'updateProgress',
                        current: currentMessageIndex,
                        total: totalMessages
                    });

                    // Step 4: Đợi delay rồi xử lý người tiếp theo
                    console.log('⏳ Step 4: Chờ delay rồi xử lý người tiếp theo...');
                    scheduleNextPerson();

                }, 800); // Đợi textarea update

            }, 2000); // Đợi conversation load
        }, 300); // Đợi scroll
    }

    // Lên lịch xử lý người tiếp theo
    function scheduleNextPerson() {
        if (!isSendingMessages) {
            console.log('⚠️ Đã bị dừng, không tiếp tục');
            return;
        }

        if (currentMessageIndex >= totalMessages) {
            console.log('🎉 Đã hoàn thành tất cả!');
            stopBulkMessage();
            chrome.runtime.sendMessage({ action: 'completed', total: currentMessageIndex });
            return;
        }

        let delay = getRandomDelay(msgMinDelay, msgMaxDelay);
        
        // Anti-crash mechanism: every 10 messages, clear React memory by navigating to empty messages route
        if (currentMessageIndex > 0 && currentMessageIndex % 10 === 0) {
            console.log(`🧹 Đã gửi ${currentMessageIndex} tin nhắn. Đang CHUYỂN HƯỚNG để dọn dẹp bộ nhớ chống Crash (OOM)...`);
            
            // LƯU LẠI INDEX MỚI TRƯỚC KHI RELOAD ĐỂ TRÁNH TRÙNG LẶP TIN NHẮN (DUPLICATE BUG)
            StorageHelper.get(['bulkMsgState']).then((res) => {
                if (res.bulkMsgState && res.bulkMsgState.isRunning) {
                    res.bulkMsgState.currentMessageIndex = currentMessageIndex;
                    res.bulkMsgState.processedHrefs = processedHrefs;
                    StorageHelper.set({ bulkMsgState: res.bulkMsgState });
                }
            }).catch(e => console.error("Lỗi lưu trước khi reload:", e));

            setTimeout(() => {
                // Reload page to clear React memory without losing the current message thread state
                window.location.reload();
            }, 3000);
            return; // Script sẽ dừng chờ page xả bộ nhớ và auto-resume sau
        }

        console.log(`⏱️ Chờ ${delay / 1000}s rồi click người tiếp theo (${currentMessageIndex + 1}/${totalMessages === 9999 ? 'Tất cả' : totalMessages})...`);

        messageTimeout = setTimeout(() => {
            console.log('🔄 Bắt đầu xử lý người tiếp theo...');
            clickAndSendMessage();
        }, delay);
    }

    function stopBulkMessage() {
        console.log('🛑 stopBulkMessage() được gọi');
        isSendingMessages = false;
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
        
        // Hủy trạng thái chạy
        StorageHelper.get(['bulkMsgState']).then((res) => {
            if (res.bulkMsgState) {
                res.bulkMsgState.isRunning = false;
                StorageHelper.set({ bulkMsgState: res.bulkMsgState });
            }
        }).catch(e => console.error("Lỗi hủy trạng thái:", e));
    }

    // ========== AUTO RESUME CHỐNG CRASH ==========
    async function checkAndResumeBulkMessage() {
        try {
            const res = await StorageHelper.get(['bulkMsgState']);
            const state = res.bulkMsgState;
            
            if (state && state.isRunning) {
                console.log("🔄 Phát hiện phiên gửi tin nhắn đang dang dở. Đang khôi phục...");
                
                // Khôi phục bộ đệm
                isSendingMessages = true;
                messageToSend = state.messageToSend;
                quotesArray = state.quotesArray;
                useRandomQuotes = state.useRandomQuotes;
                totalMessages = state.totalMessages;
                currentMessageIndex = state.currentMessageIndex;
                msgMinDelay = state.msgMinDelay;
                msgMaxDelay = state.msgMaxDelay;
                processedHrefs = state.processedHrefs || [];
                
                // Cố gắng tìm phần tử container. Nếu chưa có, đợi thêm 1 chút.
                const tryResume = async (retries = 0) => {
                    const list = getMessageItems();
                    if (list.length === 0 && retries < 5) {
                        setTimeout(() => tryResume(retries + 1), 2000);
                        return;
                    }

                    console.log(`▶️ Tìm đến vị trí người chưa được nhắn tin...`);
                    if (currentMessageIndex > 0) {
                        // Cuộn sâu hơn để bắt kịp index hiện tại, dự trù mỗi cuộn 1200px ~ 15-20 người
                        const requiredScrolls = Math.max(5, Math.ceil(currentMessageIndex / 10));
                        await scrollToFindNewPerson(requiredScrolls + 10);
                    }
                    console.log("▶️ Đang tiếp tục gửi tin...");
                    clickAndSendMessage();
                };

                setTimeout(tryResume, 8000); // Khởi động kiểm tra resume sau 8s
            }
        } catch (e) {
            console.error('❌ Lỗi khi tự động resume:', e);
        }
    }

    // Kích hoạt kiểm tra khôi phục khi trang tải xong
    setTimeout(checkAndResumeBulkMessage, 4000);

    // ========== MESSAGE LISTENER ==========
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('📩 Nhận message từ popup:', request.action);

        switch (request.action) {
            case 'startAutoClick':
                startAutoClick(request.count, request.minDelay, request.maxDelay);
                sendResponse({ started: true });
                break;

            case 'stopAutoClick':
                stopAutoClick();
                sendResponse({ stopped: true });
                break;

            case 'startBulkMessage':
                const started = startBulkMessage(
                    request.message,
                    request.quotes,
                    request.useRandomQuotes,
                    request.count,
                    request.minDelay,
                    request.maxDelay
                );
                sendResponse({ started: started });
                break;

            case 'stopBulkMessage':
                stopBulkMessage();
                sendResponse({ stopped: true });
                break;

            case 'getHistory':
                getMessageHistory().then(history => {
                    sendResponse({ history: history });
                });
                return true; // async response

            case 'clearHistory':
                clearMessageHistory().then(() => {
                    sendResponse({ cleared: true });
                });
                return true; // async response
        }

        return true;
    });

    console.log('✅ Tinder Auto Tool sẵn sàng!');
} // End of else block - prevent duplicate injection
