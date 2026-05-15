// Tinder Auto-Click Script
// Prevent duplicate injection
if (window.__tinderAutoToolLoaded) {
  console.log("🔥 Tinder matches đã được load trước đó, bỏ qua...");
} else {
  window.__tinderAutoToolLoaded = true;
  console.log("🔥 Tinder matches đã được load");

  // ========== FLOATING QUOTE BUTTON UI ==========

  // Time-based quotes data
  const quotesByTime = {
    morning: {
      label: "🌅 Sáng",
      emoji: "☀️",
      quotes: [
        "Chào buổi sáng! Chúc bạn một ngày mới tràn đầy năng lượng! ☀️",
        "Sáng nay thức dậy, mình nghĩ đến bạn đầu tiên 🌸",
        "Mỗi buổi sáng là một khởi đầu mới. Chúc bạn nhiều niềm vui! 🌈",
        "Good morning! Ngày mới tuyệt vời nhé! ✨",
        "Chào ngày mới! Hãy luôn mỉm cười bạn nhé 😊",
        "Dậy chưa em?",
        "Sáng nay em ngủ có ngon không?",
        "Em ăn sáng chưa?",
        "Sáng nay em định làm gì?",
        "Hôm nay em có bận không?",
        "Em uống cà phê hay trà?",
        "Sáng nay tâm trạng em thế nào?",
        "Sáng nay em muốn nghe một điều vui không?",
        "Hôm nay em muốn mọi thứ diễn ra kiểu nhẹ nhàng hay bận rộn?",
        "Em thường làm gì vào cuối tuần?",
        "Em thích uống đồ uống nào?",
        "Nếu được chọn một nơi để đi du lịch ngay bây giờ, em sẽ chọn nơi nào?",
        'Em có hay nghe nhạc không? Thể loại nào là "gu" của em?',
        "Em là người hướng nội hay hướng ngoại?",
      ],
    },
    noon: {
      label: "🌞 Trưa",
      emoji: "🌞",
      quotes: [
        "Buổi trưa vui vẻ! Nhớ ăn trưa đầy đủ nhé 🍜",
        "Giữa ngày bận rộn, gửi bạn chút năng lượng tích cực! 💪",
        "Chúc buổi trưa an lành, chiều thêm may mắn! ✨",
        "Trưa rồi, nghỉ ngơi tí đi bạn ơi! ☕",
        "Gửi bạn một buổi trưa thật vui! 🌟",
        "Em ăn cơm chưa?",
        "Em ăn mấy bát? 😄",
        "Trưa nay em ăn gì?",
        "Em nghỉ trưa được không?",
        "Buổi sáng nay của em ổn không?",
        "Trưa nóng lắm, em uống nước chưa?",
        "Trưa nay em có đi đâu không?",
        "Có món nào em thèm mà lâu rồi chưa ăn không?",
        "Kỷ niệm tuổi thơ nào khiến em nhớ nhất?",
        "Điều gì khiến em cảm thấy hạnh phúc nhất gần đây?",
        "Ai là người truyền cảm hứng lớn nhất cho em?",
        "Nếu được chọn một siêu năng lực, em muốn có gì?",
        "Em có tin vào tình yêu sét đánh không?",
      ],
    },
    afternoon: {
      label: "🌤️ Chiều",
      emoji: "🌤️",
      quotes: [
        "Chiều nay em đang làm gì?",
        "Hôm nay em mệt không?",
        "Việc học/công việc chiều nay ổn chứ?",
        "Em có cần nghỉ một chút không?",
        "Chiều nay em uống gì cho tỉnh?",
        "Có chuyện gì làm em vui (hoặc khó chịu) hôm nay không?",
        "Chiều nay em muốn tan làm/tan học sớm không?",
        "Nếu được chọn, chiều nay em muốn đi dạo hay ở nhà nghỉ?",
        "Em là kiểu người thích lên kế hoạch hay sống ngẫu hứng?",
        "Nếu có một ngày rảnh hoàn toàn, em sẽ dùng nó như thế nào?",
        "Em nghĩ một mối quan hệ lâu dài cần nhất điều gì?",
        "Em có bao giờ cảm thấy ai đó đang âm thầm quan tâm mình không?",
        "Em nghĩ tình cảm nên bắt đầu từ tình bạn hay ánh nhìn đầu tiên?",
      ],
    },
    evening: {
      label: "🌙 Tối",
      emoji: "🌙",
      quotes: [
        "Buổi tối an lành! Ngày hôm nay của bạn thế nào? 🌙",
        "Chúc bạn một đêm ngủ ngon và những giấc mơ đẹp 💤",
        "Cuối ngày rồi, thư giãn và nghỉ ngơi thật tốt nhé! 🌟",
        "Tối nay có gì vui không? Kể mình nghe đi! 💬",
        "Good night! Ngủ ngon nhé bạn 🌟",
        "Em ăn tối chưa?",
        "Tối nay em định làm gì?",
        "Em về nhà chưa?",
        "Hôm nay của em thế nào rồi?",
        "Tối nay em muốn thư giãn kiểu gì?",
        "Em có muốn kể anh nghe một chuyện trong ngày không?",
        "Ngủ sớm nha, mai còn năng lượng.",
        "Tối nay em muốn xem phim, nghe nhạc hay đi dạo?",
        "Nếu có người thích em thầm lặng mỗi ngày, em có muốn biết không?",
        "Điều gì làm em cảm thấy mình đang sống thật sự?",
        "Em sợ điều gì nhất trong một mối quan hệ?",
        "Nếu mai là ngày tận thế, em sẽ làm gì hôm nay?",
        "Nếu anh là người duy nhất còn lại trên Trái Đất, em có đi tìm anh không?",
        "Nếu một ngày thức dậy và em đổi giới tính, em sẽ làm gì trước tiên?",
        "Nếu em viết sách về cuộc đời mình, tên sách sẽ là gì?",
        "Nếu có thể ăn một món duy nhất cả đời, em chọn gì?",
        "Em đã từng muốn thử điều gì mà chưa dám không?",
        "Nếu được chọn, em muốn đi picnic, du lịch biển hay leo núi?",
      ],
    },
    deep: {
      label: "💘 Deep",
      emoji: "💘",
      quotes: [
        "Em thường làm gì vào cuối tuần?",
        "Em thích uống đồ uống nào?",
        "Nếu được chọn một nơi để đi du lịch ngay bây giờ, em sẽ chọn nơi nào?",
        'Em có hay nghe nhạc không? Thể loại nào là "gu" của em?',
        "Em là người hướng nội hay hướng ngoại?",
        "Kỷ niệm tuổi thơ nào khiến em nhớ nhất?",
        "Điều gì khiến em cảm thấy hạnh phúc nhất gần đây?",
        "Ai là người truyền cảm hứng lớn nhất cho em?",
        "Nếu được chọn một siêu năng lực, em muốn có gì?",
        "Em có tin vào tình yêu sét đánh không?",
        "Em là kiểu người thích lên kế hoạch hay sống ngẫu hứng?",
        "Nếu có một ngày rảnh hoàn toàn, em sẽ dùng nó như thế nào?",
        "Em nghĩ một mối quan hệ lâu dài cần nhất điều gì?",
        "Em có bao giờ cảm thấy ai đó đang âm thầm quan tâm mình không?",
        "Em nghĩ tình cảm nên bắt đầu từ tình bạn hay ánh nhìn đầu tiên?",
        "Nếu có người thích em thầm lặng mỗi ngày, em có muốn biết không?",
        "Điều gì làm em cảm thấy mình đang sống thật sự?",
        "Em sợ điều gì nhất trong một mối quan hệ?",
        "Nếu mai là ngày tận thế, em sẽ làm gì hôm nay?",
        "Nếu anh là người duy nhất còn lại trên Trái Đất, em có đi tìm anh không?",
        "Nếu một ngày thức dậy và em đổi giới tính, em sẽ làm gì trước tiên?",
        "Nếu em viết sách về cuộc đời mình, tên sách sẽ là gì?",
        "Nếu có thể ăn một món duy nhất cả đời, em chọn gì?",
        "Em đã từng muốn thử điều gì mà chưa dám không?",
        "Nếu được chọn, em muốn đi picnic, du lịch biển hay leo núi?",
      ],
    },
  };

  function getCurrentTimeSlot() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 14) return "noon";
    if (hour >= 14 && hour < 17) return "afternoon";
    return "evening";
  }

  function createFloatingQuoteUI() {
    // Check if already exists
    if (document.getElementById("tinder-quote-btn")) return;

    // Create styles
    const styles = document.createElement("style");
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
    const btn = document.createElement("button");
    btn.id = "tinder-quote-btn";
    btn.innerHTML = "💬";
    btn.title = "Chọn Quote";
    document.body.appendChild(btn);

    // Create menu
    const menu = document.createElement("div");
    menu.id = "tinder-quote-menu";

    const currentSlot = getCurrentTimeSlot();
    const currentLabel = quotesByTime[currentSlot].label;

    menu.innerHTML = `
    <div class="quote-menu-header">
      <span>💬 Chọn Quote</span>
      <span class="current-time-badge">Hiện tại: ${currentLabel}</span>
      <button class="quote-menu-close">✕</button>
    </div>
    <div class="quote-tabs">
      <button class="quote-tab ${currentSlot === "morning" ? "active" : ""}" data-slot="morning">🌅 Sáng</button>
      <button class="quote-tab ${currentSlot === "noon" ? "active" : ""}" data-slot="noon">🌞 Trưa</button>
      <button class="quote-tab ${currentSlot === "afternoon" ? "active" : ""}" data-slot="afternoon">🌤️ Chiều</button>
      <button class="quote-tab ${currentSlot === "evening" ? "active" : ""}" data-slot="evening">🌙 Tối</button>
      <button class="quote-tab" data-slot="deep">💘 Deep</button>
    </div>
    <div class="quote-list" id="quote-list-content"></div>
  `;
    document.body.appendChild(menu);

    // Render quotes
    function renderQuotes(slot) {
      const listEl = document.getElementById("quote-list-content");
      const quotes = quotesByTime[slot].quotes;
      listEl.innerHTML = quotes
        .map(
          (q, i) => `
      <div class="quote-item" data-quote="${q.replace(/"/g, "&quot;")}">${q}</div>
    `,
        )
        .join("");
    }

    // Initial render
    renderQuotes(currentSlot);

    // Tab switching
    menu.querySelectorAll(".quote-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        menu
          .querySelectorAll(".quote-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderQuotes(tab.dataset.slot);
      });
    });

    // Quote click - insert to textarea
    menu.querySelector(".quote-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("quote-item")) {
        const quote = e.target.dataset.quote;
        insertQuoteToTextarea(quote);
        menu.classList.remove("show");
      }
    });

    // Toggle menu
    btn.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // Close button
    menu.querySelector(".quote-menu-close").addEventListener("click", () => {
      menu.classList.remove("show");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.classList.remove("show");
      }
    });

    console.log("✅ Quote UI đã được tạo!");
  }

  function insertQuoteToTextarea(quote) {
    const textarea = document.querySelector(TEXTAREA_SELECTOR);
    if (textarea) {
      textarea.focus();
      setReactTextareaValue(textarea, quote);
      console.log("✅ Đã chèn quote:", quote);
    } else {
      alert("Vui lòng mở một cuộc trò chuyện trước!");
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
    const likeButton = document.querySelector(
      'button[class*="gamepad-sparks-like"]',
    );
    if (likeButton) {
      likeButton.click();
      console.log("💚 Clicked LIKE button");
      return true;
    }

    // Fallback: try to find by the wrapper class with like styling
    const likeWrapper = document.querySelector(
      '.gamepad-button-wrapper button[class*="sparks-like"]',
    );
    if (likeWrapper) {
      likeWrapper.click();
      console.log("💚 Clicked LIKE button (fallback)");
      return true;
    }

    console.log("❌ Like button not found");
    return false;
  }

  function startAutoClick(count, minDelay, maxDelay) {
    stopAutoClick();
    currentClick = 0;
    totalClicks = count;
    minDelayMs = minDelay;
    maxDelayMs = maxDelay;
    isRunning = true;
    console.log(
      `🚀 Auto click: ${count} lần, delay ${minDelay / 1000}s - ${maxDelay / 1000}s`,
    );
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
      chrome.runtime.sendMessage({ action: "completed", total: currentClick });
      return;
    }

    if (clickGamepadIcon()) {
      currentClick++;
      chrome.runtime.sendMessage({
        action: "updateProgress",
        current: currentClick,
        total: totalClicks,
      });
      scheduleNextClick();
    } else {
      stopAutoClick();
      chrome.runtime.sendMessage({
        action: "error",
        message: "Không tìm thấy gamepad icon!",
      });
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
  let messageToSend = "";
  let quotesArray = [];
  let useRandomQuotes = false;
  let msgMinDelay = 3000;
  let msgMaxDelay = 5000;
  let processedHrefs = [];
  let processedHrefsSet = new Set(); // O(1) lookup thay vì O(n)
  const MESSAGE_PAGE_RELOAD_INTERVAL = 40;

  // ========== STORAGE HELPER ==========
  // StorageHelper is loaded from lib/storage-helper.js (declared globally before this script).

  // ========== MESSAGE HISTORY ==========
  // Lưu lịch sử tin nhắn đã gửi
  async function saveMessageHistory(name, message) {
    try {
      const result = await StorageHelper.get(["messageHistory"]);
      const history = result.messageHistory || [];

      history.unshift({
        name: name,
        message: message,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString("vi-VN"),
      });

      // Giới hạn 500 bản ghi
      if (history.length > 500) {
        history.splice(500);
      }

      await StorageHelper.set({ messageHistory: history });
      console.log(`📝 Đã lưu lịch sử: ${name}`);
    } catch (e) {
      console.error("❌ Lỗi lưu lịch sử:", e);
    }
  }

  // Lấy lịch sử tin nhắn
  async function getMessageHistory() {
    const result = await StorageHelper.get(["messageHistory"]);
    return result.messageHistory || [];
  }

  // Xóa lịch sử
  async function clearMessageHistory() {
    await StorageHelper.set({ messageHistory: [] });
    console.log("🗑️ Đã xóa lịch sử");
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

  function isScrollableElement(element) {
    if (
      !element ||
      element === document.body ||
      element === document.documentElement
    )
      return { started: false, error: "Không tìm thấy danh sách tin nhắn!" };
    const style = window.getComputedStyle(element);
    const overflowY = style.overflowY;
    const canScrollByStyle =
      overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
    return canScrollByStyle && element.scrollHeight > element.clientHeight + 4;
  }

  function findScrollableParent(element) {
    let current = element;
    while (
      current &&
      current !== document.body &&
      current !== document.documentElement
    ) {
      if (isScrollableElement(current)) return current;
      current = current.parentElement;
    }
    return null;
  }

  // Cache selector result để tránh 3 DOM queries mỗi lần
  let _cachedMessageItems = null;
  let _lastMessageItemsQuery = 0;

  // Lấy danh sách message items từ sidebar
  function getMessageItems() {
    const now = Date.now();
    // Cache trong 500ms để tránh query quá nhiều
    if (_cachedMessageItems && now - _lastMessageItemsQuery < 500) {
      return _cachedMessageItems;
    }

    // Thử nhiều selector khác nhau - dùng fallback pattern
    let items = document.querySelectorAll(".messageList ul li > a.messageListItem");
    if (items.length === 0) {
      items = document.querySelectorAll('ul[aria-label="Your recent messages"] li > a');
    }
    if (items.length === 0) {
      items = document.querySelectorAll("a.messageListItem");
    }
    
    _cachedMessageItems = Array.from(items);
    _lastMessageItemsQuery = now;
    console.log(`📋 Tìm thấy ${items.length} items trong sidebar`);
    return _cachedMessageItems;
  }

  // Lấy container scroll của message list
  function getMessageListContainer() {
    const items = getMessageItems();
    if (items.length > 0) {
      const fromItem = findScrollableParent(items[0]);
      if (fromItem) {
        return fromItem;
      }
    }

    const candidates = [
      document.querySelector('ul[aria-label="Your recent messages"]'),
      document.querySelector(".messageList"),
      document.querySelector('[class*="MessageList"]'),
      document.querySelector('[class*="messageList"]'),
    ].filter(Boolean);

    for (const candidate of candidates) {
      const scrollable = isScrollableElement(candidate)
        ? candidate
        : findScrollableParent(candidate);
      if (scrollable) {
        return scrollable;
      }
    }

    return null;
  }

  // Cuộn xuống cho đến khi tìm thấy tin nhắn chưa được xử lý hoặc chạm đáy danh sách
  async function scrollToFindNewPerson() {
    const container = getMessageListContainer();
    if (!container) {
      console.log("⚠️ Không tìm thấy container để scroll");
      return {
        started: false,
        error: "Không quét được danh sách người cần nhắn tin!",
      };
    }

    console.log(`📜 Đang scroll để tìm người nhắn mới...`);

    let stagnantScrolls = 0;

    let attempts = 0;

    while (true) {
      const items = getMessageItems();

      // Check if there is any item not in processedHrefs
      const hasNew = items.some(
        (item) => item && item.href && !processedHrefs.includes(item.href),
      );
      if (hasNew) {
        console.log(`✅ Đã tìm thấy người mới sau ${attempts} lần cuộn.`);
        return true;
      }

      const reachedBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 2;
      if (reachedBottom) {
        console.log("⚠️ Đã chạm đáy danh sách, không còn item mới để load.");
        return false;
      }

      const beforeScrollTop = container.scrollTop;
      container.scrollBy({
        top: Math.max(container.clientHeight * 0.9, 800),
        behavior: "auto",
      });
      attempts++;
      // Đợi load để React kịp render layout, tránh layout thrashing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (container.scrollTop === beforeScrollTop) {
        stagnantScrolls++;
        if (stagnantScrolls >= 3) {
          console.log("⚠️ Scroll không còn tiến triển, dừng tìm thêm.");
          return false;
        }
      } else {
        stagnantScrolls = 0;
      }
    }
  }

  // Scroll item vào view
  function scrollItemIntoView(item) {
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  async function scrollMessageListToTop() {
    const container = getMessageListContainer();
    if (!container) return;
    container.scrollTo({ top: 0, behavior: "auto" });
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  function getTargetName(item) {
    return (
      item?.getAttribute("aria-label") ||
      item?.querySelector(".messageListItem__name")?.textContent?.trim() ||
      ""
    );
  }

  // Debounce persist để tránh gọi storage quá nhiều lần
  let _persistTimeout = null;
  let _lastPersistTime = 0;

  async function persistBulkMessageState(extra = {}) {
    // Throttle: chỉ persist mỗi 5 giây hoặc khi có thay đổi quan trọng
    const now = Date.now();
    if (now - _lastPersistTime < 5000 && Object.keys(extra).length === 0) {
      return; // Bỏ qua nếu chưa đủ 5s và không có thay đổi quan trọng
    }
    _lastPersistTime = now;

    try {
      const result = await StorageHelper.get(["bulkMsgState"]);
      // Nếu StorageHelper fail hoàn toàn, không crash mà bỏ qua persist
      if (!result || typeof result !== 'object') {
        console.warn('persistBulkMessageState — StorageHelper returned invalid result, skipping');
        return;
      }
      if (!result.bulkMsgState || !result.bulkMsgState.isRunning) return;

      const nextState = {
        ...result.bulkMsgState,
        currentMessageIndex,
        totalMessages,
        msgMinDelay,
        msgMaxDelay,
        processedHrefs,
        ...extra,
      };
      await StorageHelper.set({ bulkMsgState: nextState });
    } catch (e) {
      console.error('persistBulkMessageState — failed:', e);
    }
  }

  function shouldReloadMessagePage() {
    return (
      currentMessageIndex > 0 &&
      currentMessageIndex < totalMessages &&
      currentMessageIndex % MESSAGE_PAGE_RELOAD_INTERVAL === 0
    );
  }

  function scheduleStabilityReload(reason) {
    console.log(
      `🧹 Reload trang message để tránh crash sau ${currentMessageIndex} lượt (${reason}).`,
    );

    messageTimeout = setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  async function ensureNextUnprocessedItemVisible() {
    const container = getMessageListContainer();
    if (!container) return null;

    let stagnantRounds = 0;
    let lastVisibleSignature = "";

    for (let attempt = 0; attempt < 200; attempt++) {
      const items = getMessageItems();
      
      // O(1) lookup với Set thay vì O(n) với Array.includes()
      for (const item of items) {
        if (item && item.href && !processedHrefsSet.has(item.href)) {
          return item;
        }
      }

      const visibleSignature = items
        .map((item) => item?.href || "")
        .filter(Boolean)
        .join("|");

      const beforeScrollTop = container.scrollTop;
      container.scrollBy({
        top: Math.max(container.clientHeight * 0.9, 800),
        behavior: "auto",
      });
      // Invalidate cache sau khi scroll để items mới được load
      _cachedMessageItems = null;
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (
        container.scrollTop === beforeScrollTop &&
        visibleSignature === lastVisibleSignature
      ) {
        stagnantRounds++;
        if (stagnantRounds >= 3) {
          console.log("⚠️ Đã cuộn đến đáy nhưng không tìm thấy item mới.");
          break;
        }
      } else {
        stagnantRounds = 0;
      }

      lastVisibleSignature = visibleSignature;
    }

    return null;
  }

  // Wait for textarea value to actually be set (React state sync)
  function waitForTextareaValue(textarea, expectedValue, maxWait = 3000) {
    return new Promise((resolve) => {
      if (textarea.value === expectedValue) {
        resolve(true);
        return;
      }
      const start = Date.now();
      const check = () => {
        if (textarea.value === expectedValue) {
          resolve(true);
          return;
        }
        if (Date.now() - start > maxWait) {
          console.log(
            `⚠️ Timeout chờ textarea value. Current: "${textarea.value}", Expected: "${expectedValue}"`,
          );
          resolve(false);
          return;
        }
        setTimeout(check, 100);
      };
      check();
    });
  }

  async function startBulkMessage(
    message,
    quotes,
    useRandom,
    count,
    minDelay,
    maxDelay,
    aiConfig, // optional: { apiKey, systemPrompt, userPrompt, model }
  ) {
    stopBulkMessage();

    const isAI = !!(aiConfig?.apiKey);
    messageToSend = message;
    quotesArray = quotes || [];
    useRandomQuotes = useRandom || false;
    msgMinDelay = minDelay;
    msgMaxDelay = maxDelay;

    const items = getMessageItems();
    if (items.length === 0) {
      chrome.runtime.sendMessage({ action: "error", message: "Không tìm thấy danh sách tin nhắn!" });
      return { started: false, error: "Không tìm thấy danh sách tin nhắn!" };
    }

    totalMessages = count > 0 ? count : 9999;
    currentMessageIndex = 0;
    processedHrefs = [];
    processedHrefsSet = new Set(); // Reset Set khi bắt đầu campaign mới
    isSendingMessages = true;
    await scrollMessageListToTop();

    const state = {
      isRunning: true,
      aiMode: isAI,
      messageToSend,
      quotesArray,
      useRandomQuotes,
      totalMessages,
      currentMessageIndex: 0,
      msgMinDelay,
      msgMaxDelay,
      processedHrefs: [],
      ...(isAI && {
        openRouterApiKey: aiConfig.apiKey,
        aiSystemPrompt: aiConfig.systemPrompt,
        aiUserPrompt: aiConfig.userPrompt,
        aiModel: aiConfig.model,
      }),
    };
    await StorageHelper.set({ bulkMsgState: state });

    console.log(`📩 Bắt đầu gửi ${isAI ? "AI" : "bulk"} tin nhắn...`);

    const resolver = isAI
      ? async (index, name) => {
          const profile = extractProfileInfo() || name;
          const result = await generateAIMessage(
            aiConfig.apiKey, aiConfig.systemPrompt, aiConfig.userPrompt, aiConfig.model, profile,
          );
          if (!result.success) {
            console.error("[AI] Lỗi tạo tin nhắn:", result.error);
            return null;
          }
          return result.message;
        }
      : async (index) => getMessageForPerson(index);

    clickAndSendMessage(resolver);
    return { started: true, totalCollected: totalMessages === 9999 ? "Tất cả" : totalMessages };
  }


  // Hàm chính: click vào item và gửi tin nhắn (cả hai mode)
  function clickAndSendMessage(resolver) {
    if (!isSendingMessages) {
      console.log("⚠️ Đã bị dừng");
      return;
    }

    if (currentMessageIndex >= totalMessages) {
      console.log("✅ Hoàn thành tất cả!");
      stopBulkMessage();
      chrome.runtime.sendMessage({ action: "completed", total: currentMessageIndex });
      return;
    }

    persistBulkMessageState().catch((e) => console.error("Lỗi lưu tiến trình:", e));
    processCurrentItemUnified(resolver);
  }

  // Xử lý item hiện tại — resolver là async (index, name) => string
  async function processCurrentItemUnified(resolver) {
    let currentItem = await ensureNextUnprocessedItemVisible();
    if (!currentItem) {
      console.log("✅ Không còn người nào để nhắn tin hoặc đã cuộn đến cuối.");
      stopBulkMessage();
      chrome.runtime.sendMessage({ action: "completed", total: currentMessageIndex });
      return;
    }

    const targetHref = currentItem.href;
    const name = getTargetName(currentItem) || `Person ${currentMessageIndex + 1}`;
    console.log(`
========================================`);
    console.log(`📩 [${currentMessageIndex + 1}/${totalMessages === 9999 ? "Tất cả" : totalMessages}] Đang xử lý: ${name}`);
    console.log(`========================================`);

    scrollItemIntoView(currentItem);

    setTimeout(() => {
      currentItem.click();

      setTimeout(async () => {
        const textarea = document.querySelector(TEXTAREA_SELECTOR);
        if (!textarea) {
          console.log("❌ Không tìm thấy textarea, bỏ qua người này");
          processedHrefs.push(targetHref);
          processedHrefsSet.add(targetHref);
          currentMessageIndex++;
          await persistBulkMessageState();
          chrome.runtime.sendMessage({ action: "updateProgress", current: currentMessageIndex, total: totalMessages });
          scheduleNextPerson(resolver);
          return;
        }

        const currentMessage = await resolver(currentMessageIndex, name);
        if (!currentMessage) {
          console.log("❌ Không lấy được tin nhắn từ resolver, bỏ qua người này");
          processedHrefs.push(targetHref);
          processedHrefsSet.add(targetHref);
          currentMessageIndex++;
          await persistBulkMessageState();
          chrome.runtime.sendMessage({ action: "updateProgress", current: currentMessageIndex, total: totalMessages });
          scheduleNextPerson(resolver);
          return;
        }

        textarea.focus();
        setReactTextareaValue(textarea, currentMessage);
        console.log(`✅ Đã nhập tin nhắn [${currentMessageIndex + 1}]:`, currentMessage);

        waitForTextareaValue(textarea, currentMessage, 3000).then(async (synced) => {
          if (!synced) console.log("⚠️ Textarea chưa sync, vẫn tiếp tục gửi...");

          const sendButton = document.querySelector('button[type="submit"]');
          if (sendButton) {
            sendButton.click();
            saveMessageHistory(name, currentMessage);
          } else {
            console.log("❌ Không tìm thấy nút SEND");
          }

          processedHrefs.push(targetHref);
          processedHrefsSet.add(targetHref);
          currentMessageIndex++;
          await persistBulkMessageState();
          chrome.runtime.sendMessage({ action: "updateProgress", current: currentMessageIndex, total: totalMessages });
          scheduleNextPerson(resolver);
        });
      }, 2000);
    }, 300);
  }

  // Lên lịch xử lý người tiếp theo — resolver được truyền lại cho vòng lặp tiếp theo
  function scheduleNextPerson(resolver) {
    if (!isSendingMessages) return;

    if (currentMessageIndex >= totalMessages) {
      console.log("🎉 Đã hoàn thành tất cả!");
      stopBulkMessage();
      chrome.runtime.sendMessage({ action: "completed", total: currentMessageIndex });
      return;
    }

    if (shouldReloadMessagePage()) {
      scheduleStabilityReload("bulk message");
      return;
    }

    const delay = getRandomDelay(msgMinDelay, msgMaxDelay);
    console.log(`⏱️ Chờ ${delay / 1000}s rồi xử lý người tiếp theo (${currentMessageIndex + 1}/${totalMessages === 9999 ? "Tất cả" : totalMessages})...`);
    messageTimeout = setTimeout(() => clickAndSendMessage(resolver), delay);
  }


  function stopBulkMessage() {
    console.log("🛑 stopBulkMessage() được gọi");
    isSendingMessages = false;
    if (messageTimeout) {
      clearTimeout(messageTimeout);
      messageTimeout = null;
    }

    // Hủy trạng thái chạy
    StorageHelper.get(["bulkMsgState"])
      .then((res) => {
        if (res.bulkMsgState) {
          res.bulkMsgState.isRunning = false;
          StorageHelper.set({ bulkMsgState: res.bulkMsgState });
        }
      })
      .catch((e) => console.error("Lỗi hủy trạng thái:", e));
  }

  // ========== AUTO RESUME CHỐNG CRASH ==========
  let _resumeRetryCount = 0;
  const MAX_RESUME_RETRIES = 10; // Max 20s retry (10 x 2s)

  async function checkAndResumeSession() {
    _resumeRetryCount++;

    // Nếu đã retry quá nhiều lần, dừng lại
    if (_resumeRetryCount > MAX_RESUME_RETRIES) {
      console.warn('⚠️ Đã hết số lần retry khôi phục, bỏ qua auto-resume');
      _resumeRetryCount = 0;
      return;
    }

    // Retry nếu StorageHelper chưa sẵn sàng
    if (typeof StorageHelper === 'undefined' || !StorageHelper.isValid?.()) {
      console.warn(`⚠️ StorageHelper unavailable, retrying in 2s... (${_resumeRetryCount}/${MAX_RESUME_RETRIES})`);
      setTimeout(checkAndResumeSession, 2000);
      return;
    }

    // Đã có StorageHelper hợp lệ, reset retry count
    _resumeRetryCount = 0;

    try {
      const res = await StorageHelper.get(["bulkMsgState"]);
      const state = res.bulkMsgState;

      if (!state || !state.isRunning) return;

      console.log("🔄 Phát hiện phiên gửi tin nhắn đang dở. Đang khôi phục...");

      isSendingMessages = true;
      messageToSend = state.messageToSend || "";
      quotesArray = Array.isArray(state.quotesArray) ? state.quotesArray : [];
      useRandomQuotes = state.useRandomQuotes || false;
      totalMessages = state.totalMessages || 9999;
      currentMessageIndex = state.currentMessageIndex || 0;
      msgMinDelay = state.msgMinDelay || 3000;
      msgMaxDelay = state.msgMaxDelay || 5000;
      processedHrefs = Array.isArray(state.processedHrefs) ? state.processedHrefs : [];
      processedHrefsSet = new Set(processedHrefs); // Khôi phục Set từ Array

      console.log(`📋 Đã khôi phục: Mode AI=${state.aiMode}, index=${currentMessageIndex}, processed=${processedHrefs.length}`);

      const tryResume = async (retries = 0) => {
        const list = getMessageItems();
        if (list.length === 0 && retries < 5) {
          console.log(`⏳ Chờ message list load... (thử lần ${retries + 1})`);
          setTimeout(() => tryResume(retries + 1), 2000);
          return;
        }

        await scrollMessageListToTop();
        console.log("▶️ Đang tiếp tục gửi tin...");
        
        const resolver = state.aiMode
          ? async (index, name) => {
              const profile = extractProfileInfo() || name;
              const result = await generateAIMessage(
                state.openRouterApiKey, state.aiSystemPrompt, state.aiUserPrompt, state.aiModel, profile,
              );
              if (!result.success) {
                console.error("[AI] Lỗi tạo tin nhắn:", result.error);
                return null;
              }
              return result.message;
            }
          : async (index) => getMessageForPerson(index);

        clickAndSendMessage(resolver);
      };

      setTimeout(tryResume, 8000);
    } catch (e) {
      console.error("❌ Lỗi khi tự động resume:", e);
    }
  }

  // Kích hoạt kiểm tra khôi phục khi trang tải xong
  setTimeout(checkAndResumeSession, 4000);

  // ========== AI MESSAGE GENERATION ==========
  // Delegates to OpenRouter (lib/openrouter.js), loaded before this script.
  function generateAIMessage(apiKey, systemPrompt, userPrompt, model, profile) {
    return OpenRouter.generateMessage(apiKey, { model, systemPrompt, userPrompt, profile });
  }

  function extractProfileInfo() {
    let profileText = "";
    const nameEl = document.querySelector(
      'h1[class*="profile"], div[class*="profileName"], span[class*="matchName"]',
    );
    if (nameEl) {
      profileText += nameEl.textContent.trim();
    }
    const bioSelectors = [
      'div[class*="bio"] span',
      'div[class*="Bio"] p',
      'p[class*="bio"]',
      'span[class*="bio"]',
      'div[class*="description"]',
    ];
    for (const selector of bioSelectors) {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        const text = el.textContent.trim();
        if (text && text.length > 10 && text.length < 500) {
          profileText += ". " + text;
        }
      });
    }
    profileText = profileText.replace(/\s+/g, " ").trim();
    return profileText || "một cô gái";
  }

  // ========== MESSAGE LISTENER ==========
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("📩 Nhận message từ popup:", request.action);

    switch (request.action) {
      case "startAutoClick":
        startAutoClick(request.count, request.minDelay, request.maxDelay);
        sendResponse({ started: true });
        break;

      case "stopAutoClick":
        stopAutoClick();
        sendResponse({ stopped: true });
        break;

      case "startBulkMessage":
        (async () => {
          try {
            if (request.aiMode) {
              const aiConfig = {
                apiKey: request.openRouterApiKey,
                systemPrompt: request.aiSystemPrompt,
                userPrompt: request.aiUserPrompt,
                model: request.aiModel
              };
              const result = await startBulkMessage(
                "", // message
                [], // quotes
                false, // useRandom
                request.count,
                request.minDelay,
                request.maxDelay,
                aiConfig
              );
              sendResponse(result);
            } else {
              const result = await startBulkMessage(
                request.message,
                request.quotes,
                request.useRandomQuotes,
                request.count,
                request.minDelay,
                request.maxDelay,
              );
              sendResponse(result);
            }
          } catch (e) {
            sendResponse({ started: false, error: e.message });
          }
        })();
        return true;

      case "stopBulkMessage":
        stopBulkMessage();
        sendResponse({ stopped: true });
        break;

      case "generateProfileAIMessage":
        return (async () => {
          try {
            const profileInfo = extractProfileInfo();
            const result = await generateAIMessage(
              request.apiKey,
              request.systemPrompt,
              request.userPrompt,
              request.model,
              profileInfo,
            );
            if (result.success) {
              return { success: true, message: result.message };
            } else {
              return { success: false, error: result.error };
            }
          } catch (e) {
            return { success: false, error: e.message };
          }
        })();

      case "getHistory":
        getMessageHistory().then((history) => {
          sendResponse({ history: history });
        });
        return true;

      case "clearHistory":
        clearMessageHistory().then(() => {
          sendResponse({ cleared: true });
        });
        return true;
    }

    return true;
  });



  console.log("✅ Tinder matches sẵn sàng!");
} // End of else block - prevent duplicate injection
