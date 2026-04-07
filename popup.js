// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`${tab.dataset.tab}-panel`).classList.add('active');
  });
});

// Elements - Gamepad
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clickCountInput = document.getElementById('clickCount');
const minDelayInput = document.getElementById('minDelay');
const maxDelayInput = document.getElementById('maxDelay');

// Elements - Message
const startMsgBtn = document.getElementById('startMsgBtn');
const stopMsgBtn = document.getElementById('stopMsgBtn');
const messageTextInput = document.getElementById('messageText');
const messageCountInput = document.getElementById('messageCount');
const msgMinDelayInput = document.getElementById('msgMinDelay');
const msgMaxDelayInput = document.getElementById('msgMaxDelay');
const randomQuoteCheckbox = document.getElementById('randomQuote');
const quotesListInput = document.getElementById('quotesList');
const singleMessageGroup = document.getElementById('singleMessageGroup');
const quotesGroup = document.getElementById('quotesGroup');
const timeBasedQuotesCheckbox = document.getElementById('timeBasedQuotes');
const singleQuotesGroup = document.getElementById('singleQuotesGroup');
const timeBasedQuotesGroup = document.getElementById('timeBasedQuotesGroup');
const morningQuotesInput = document.getElementById('morningQuotes');
const noonQuotesInput = document.getElementById('noonQuotes');
const eveningQuotesInput = document.getElementById('eveningQuotes');
const currentTimeSlotEl = document.getElementById('currentTimeSlot');

// Get current time slot
function getCurrentTimeSlot() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return { slot: 'morning', label: 'Buổi sáng 🌅', emoji: '☀️' };
  } else if (hour >= 11 && hour < 17) {
    return { slot: 'noon', label: 'Buổi trưa 🌞', emoji: '🌞' };
  } else {
    return { slot: 'evening', label: 'Buổi tối 🌙', emoji: '🌙' };
  }
}

// Get quotes based on current time
function getTimeBasedQuotes() {
  const timeSlot = getCurrentTimeSlot();
  let quotesText = '';

  switch (timeSlot.slot) {
    case 'morning':
      quotesText = morningQuotesInput.value;
      break;
    case 'noon':
      quotesText = noonQuotesInput.value;
      break;
    case 'evening':
      quotesText = eveningQuotesInput.value;
      break;
  }

  return quotesText.trim().split('\n').map(q => q.trim()).filter(q => q.length > 0);
}

// Update time slot display
function updateTimeSlotDisplay() {
  if (currentTimeSlotEl) {
    const timeSlot = getCurrentTimeSlot();
    currentTimeSlotEl.textContent = timeSlot.label;
  }
}

// Toggle time-based quotes mode
if (timeBasedQuotesCheckbox) {
  timeBasedQuotesCheckbox.addEventListener('change', () => {
    if (timeBasedQuotesCheckbox.checked) {
      singleQuotesGroup.style.display = 'none';
      timeBasedQuotesGroup.style.display = 'block';
      updateTimeSlotDisplay();
    } else {
      singleQuotesGroup.style.display = 'block';
      timeBasedQuotesGroup.style.display = 'none';
    }
  });
}

// Update time slot on load
setTimeout(updateTimeSlotDisplay, 100);

// Toggle random quote mode
randomQuoteCheckbox.addEventListener('change', () => {
  if (randomQuoteCheckbox.checked) {
    singleMessageGroup.style.display = 'none';
    quotesGroup.style.display = 'block';
  } else {
    singleMessageGroup.style.display = 'block';
    quotesGroup.style.display = 'none';
  }
});

// Fetch quotes from API
const fetchQuotesBtn = document.getElementById('fetchQuotesBtn');
const quotesStatusEl = document.getElementById('quotesStatus');

fetchQuotesBtn.addEventListener('click', async () => {
  fetchQuotesBtn.disabled = true;
  fetchQuotesBtn.textContent = '⏳ Đang lấy...';
  quotesStatusEl.textContent = '';

  try {
    // ZenQuotes API
    const response = await fetch('https://zenquotes.io/api/quotes');

    if (!response.ok) {
      throw new Error('API không phản hồi');
    }

    const data = await response.json();

    // Format quotes - ZenQuotes format: { q: "quote", a: "author" }
    const quotes = data.slice(0, 40).map(q => `${q.q} - ${q.a}`);

    // Thêm vào textarea
    const currentQuotes = quotesListInput.value.trim();
    const newQuotes = quotes.join('\n');
    quotesListInput.value = currentQuotes ? `${currentQuotes}\n${newQuotes}` : newQuotes;

    quotesStatusEl.textContent = `✅ Đã thêm ${quotes.length} quotes!`;
    quotesStatusEl.style.color = '#4CAF50';

  } catch (error) {
    console.error('Lỗi fetch quotes:', error);

    // Fallback: thêm quotes tiếng Việt mặc định
    const fallbackQuotes = [
      'Hạnh phúc không đến từ việc có nhiều, mà từ việc biết đủ. 🌸',
      'Mỗi ngày là một cơ hội mới để bắt đầu lại. 🌅',
      'Cuộc sống ngắn ngủi, hãy yêu thương nhiều hơn. ❤️',
      'Nụ cười là ngôn ngữ chung của nhân loại. 😊',
      'Thành công bắt đầu từ việc dám ước mơ. ⭐',
      'Hãy là phiên bản tốt nhất của chính mình. 💪',
      'Mọi thứ đều có thể nếu bạn tin tưởng. 🌈',
      'Yêu thương bản thân là bước đầu tiên. 💕'
    ];

    const currentQuotes = quotesListInput.value.trim();
    const newQuotes = fallbackQuotes.join('\n');
    quotesListInput.value = currentQuotes ? `${currentQuotes}\n${newQuotes}` : newQuotes;

    quotesStatusEl.textContent = `✅ Đã thêm ${fallbackQuotes.length} quotes (offline)`;
    quotesStatusEl.style.color = '#FF9800';
  }

  fetchQuotesBtn.disabled = false;
  fetchQuotesBtn.textContent = '🔄 Lấy quotes từ API';
});

// Common elements
const statusEl = document.getElementById('status');
const progressEl = document.getElementById('progress');

// Helper: Inject content script và gửi message
async function sendMessageToTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes('tinder.com')) {
    throw new Error('NOT_TINDER');
  }

  // Inject content script trước
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['tinder-auto-click.js']
    });
  } catch (e) {
    console.log('Script đã được inject hoặc lỗi:', e);
  }

  // Đợi một chút để script load
  await new Promise(resolve => setTimeout(resolve, 300));

  // Gửi message
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tab.id, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}

// Update UI
function updateGamepadUI(running) {
  startBtn.style.display = running ? 'none' : 'block';
  stopBtn.style.display = running ? 'block' : 'none';
}

function updateMessageUI(running) {
  startMsgBtn.style.display = running ? 'none' : 'block';
  stopMsgBtn.style.display = running ? 'block' : 'none';
}

// === GAMEPAD AUTO CLICK ===
startBtn.addEventListener('click', async () => {
  try {
    const clickCount = parseInt(clickCountInput.value) || 10;
    const minDelay = (parseFloat(minDelayInput.value) || 1) * 1000;
    const maxDelay = (parseFloat(maxDelayInput.value) || 3) * 1000;

    statusEl.textContent = '⏳ Đang kết nối...';

    const response = await sendMessageToTab({
      action: 'startAutoClick',
      count: clickCount,
      minDelay: minDelay,
      maxDelay: maxDelay
    });

    if (response?.started) {
      updateGamepadUI(true);
      statusEl.textContent = '🔄 Đang click gamepad...';
      statusEl.className = 'status running';
    }
  } catch (e) {
    if (e.message === 'NOT_TINDER') {
      statusEl.textContent = '⚠️ Vui lòng mở trang Tinder!';
    } else {
      statusEl.textContent = '❌ Lỗi: ' + e.message;
    }
    statusEl.className = 'status stopped';
  }
});

stopBtn.addEventListener('click', async () => {
  try {
    const response = await sendMessageToTab({ action: 'stopAutoClick' });
    if (response?.stopped) {
      updateGamepadUI(false);
      statusEl.textContent = '⏹️ Đã dừng!';
      statusEl.className = 'status stopped';
    }
  } catch (e) {
    statusEl.textContent = '❌ Lỗi: ' + e.message;
    statusEl.className = 'status stopped';
  }
});

// === BULK MESSAGE ===
startMsgBtn.addEventListener('click', async () => {
  try {
    let message = '';
    let quotes = [];
    const useRandomQuotes = randomQuoteCheckbox.checked;

    if (useRandomQuotes) {
      // Check if time-based quotes mode is enabled
      const useTimeBased = timeBasedQuotesCheckbox && timeBasedQuotesCheckbox.checked;

      if (useTimeBased) {
        // Get quotes based on current time slot
        quotes = getTimeBasedQuotes();
        const timeSlot = getCurrentTimeSlot();
        console.log(`📍 Sử dụng quotes ${timeSlot.label}:`, quotes);
      } else {
        // Parse single quotes list
        const quotesText = quotesListInput.value.trim();
        quotes = quotesText.split('\n').map(q => q.trim()).filter(q => q.length > 0);
      }

      if (quotes.length === 0) {
        statusEl.textContent = '⚠️ Vui lòng nhập ít nhất 1 câu châm ngôn!';
        statusEl.className = 'status stopped';
        return;
      }
    } else {
      message = messageTextInput.value.trim();
      if (!message) {
        statusEl.textContent = '⚠️ Vui lòng nhập tin nhắn!';
        statusEl.className = 'status stopped';
        return;
      }
    }

    const count = parseInt(messageCountInput.value) || 0;
    const minDelay = (parseFloat(msgMinDelayInput.value) || 3) * 1000;
    const maxDelay = (parseFloat(msgMaxDelayInput.value) || 5) * 1000;

    statusEl.textContent = '⏳ Đang kết nối...';

    const response = await sendMessageToTab({
      action: 'startBulkMessage',
      message: message,
      quotes: quotes,
      useRandomQuotes: useRandomQuotes,
      count: count,
      minDelay: minDelay,
      maxDelay: maxDelay
    });

    if (response?.started) {
      updateMessageUI(true);
      statusEl.textContent = '📨 Đang gửi tin nhắn...';
      statusEl.className = 'status running';
    } else {
      statusEl.textContent = '❌ Không thể bắt đầu!';
      statusEl.className = 'status stopped';
    }
  } catch (e) {
    if (e.message === 'NOT_TINDER') {
      statusEl.textContent = '⚠️ Vui lòng mở trang Tinder!';
    } else {
      statusEl.textContent = '❌ Lỗi: ' + e.message;
    }
    statusEl.className = 'status stopped';
  }
});

stopMsgBtn.addEventListener('click', async () => {
  try {
    const response = await sendMessageToTab({ action: 'stopBulkMessage' });
    if (response?.stopped) {
      updateMessageUI(false);
      statusEl.textContent = '⏹️ Đã dừng!';
      statusEl.className = 'status stopped';
    }
  } catch (e) {
    statusEl.textContent = '❌ Lỗi: ' + e.message;
    statusEl.className = 'status stopped';
  }
});

// Listen for progress updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateProgress') {
    progressEl.textContent = `${request.current} / ${request.total}`;
  }

  if (request.action === 'completed') {
    updateGamepadUI(false);
    updateMessageUI(false);
    statusEl.textContent = '✅ Hoàn thành!';
    statusEl.className = 'status';
    progressEl.textContent = `Đã xử lý ${request.total} mục`;
  }

  if (request.action === 'error') {
    updateGamepadUI(false);
    updateMessageUI(false);
    statusEl.textContent = `❌ ${request.message}`;
    statusEl.className = 'status stopped';
  }
});

// ========== HISTORY ==========
const historyListEl = document.getElementById('historyList');
const historyCountEl = document.getElementById('historyCount');
const refreshHistoryBtn = document.getElementById('refreshHistoryBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Render history từ chrome.storage.local (popup có thể truy cập trực tiếp)
async function loadHistory() {
  try {
    const result = await chrome.storage.local.get(['messageHistory']);
    const history = result.messageHistory || [];

    historyCountEl.textContent = `📊 Tổng: ${history.length} tin nhắn`;

    if (history.length === 0) {
      historyListEl.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">Chưa có tin nhắn nào được gửi</div>';
      return;
    }

    historyListEl.innerHTML = history.slice(0, 100).map(item => `
      <div class="history-item">
        <div class="name">👤 ${item.name || 'Unknown'}</div>
        <div class="message">💬 ${item.message || ''}</div>
        <div class="time">🕐 ${item.date || ''}</div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Lỗi load history:', e);
    historyListEl.innerHTML = '<div style="color: red;">Lỗi tải lịch sử</div>';
  }
}

// Clear history
async function clearHistory() {
  if (!confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) return;

  try {
    await chrome.storage.local.set({ messageHistory: [] });
    loadHistory();
  } catch (e) {
    console.error('Lỗi xóa history:', e);
  }
}

// Event listeners
if (refreshHistoryBtn) {
  refreshHistoryBtn.addEventListener('click', loadHistory);
}

if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener('click', clearHistory);
}

// Auto load history khi chuyển sang tab history
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab === 'history') {
      loadHistory();
    }
  });
});
