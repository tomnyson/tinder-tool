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

// AI mode toggle in Message panel
let selectedAIMode = 'fixed';

// Model selector elements
const modelSelect = document.getElementById('modelSelect');
const customModelInput = document.getElementById('customModelInput');

// AI panel elements (declared early for saveAIConfig)
const apiKeyInput = document.getElementById('apiKeyInput');
const systemPromptInput = document.getElementById('systemPromptInput');
const userPromptInput = document.getElementById('userPromptInput');
const testAiGenerateBtn = document.getElementById('testAiGenerateBtn');
const aiGeneratingEl = document.getElementById('aiGenerating');
const aiPreviewEl = document.getElementById('aiPreview');
const aiPreviewTextEl = document.getElementById('aiPreviewText');

// Toggle custom model input visibility
if (modelSelect) {
  modelSelect.addEventListener('change', () => {
    if (customModelInput) {
      customModelInput.style.display = modelSelect.value === 'custom' ? 'block' : 'none';
    }
    // Auto-save on change
    saveAIConfig();
  });
}

// Auto-save AI config helper
async function saveAIConfig() {
  try {
    const modelValue = modelSelect && modelSelect.value === 'custom'
      ? (customModelInput ? customModelInput.value.trim() : '')
      : (modelSelect ? modelSelect.value : 'google/gemini-2.5-flash');
    await chrome.storage.local.set({
      openRouterApiKey: apiKeyInput.value.trim(),
      aiSystemPrompt: systemPromptInput.value.trim(),
      aiUserPrompt: userPromptInput.value.trim(),
      aiModel: modelValue
    });
  } catch (e) {
    console.error('Lỗi saveAIConfig:', e);
  }
}

function getSelectedModel() {
  const model = modelSelect && modelSelect.value === 'custom'
    ? (customModelInput ? customModelInput.value.trim() : 'google/gemini-2.5-flash')
    : (modelSelect ? modelSelect.value : 'google/gemini-2.5-flash');
  return model || 'google/gemini-2.5-flash';
}

if (customModelInput) {
  customModelInput.addEventListener('input', saveAIConfig);
}

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

// ========== SAVED MESSAGES ==========
const savedMessagesListEl = document.getElementById('savedMessagesList');
const savedMsgNameInput = document.getElementById('savedMsgNameInput');
const saveMsgPresetBtn = document.getElementById('saveMsgPresetBtn');
const savedMessagesSection = document.getElementById('savedMessagesSection');

const MAX_SAVED = 20;

async function loadSavedMessages() {
  const result = await chrome.storage.local.get(['savedMessages']);
  return result.savedMessages || [];
}

async function persistSavedMessages(messages) {
  await chrome.storage.local.set({ savedMessages: messages });
}

async function renderSavedMessages() {
  const messages = await loadSavedMessages();
  if (messages.length === 0) {
    savedMessagesListEl.innerHTML = '<div class="saved-empty">Chua co mau tin nao</div>';
    return;
  }

  savedMessagesListEl.innerHTML = messages.map((msg, idx) => `
    <div class="saved-item" data-idx="${idx}">
      <div class="saved-item-body">
        <div class="saved-item-name">${escapeHtml(msg.name || 'Khong co tieu de')}</div>
        <div class="saved-item-preview">${escapeHtml(msg.message || '')}</div>
      </div>
      <button class="saved-item-delete" data-idx="${idx}" title="Xoa">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  // Click to load
  savedMessagesListEl.querySelectorAll('.saved-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.saved-item-delete')) return;
      const idx = parseInt(item.dataset.idx);
      loadSavedPreset(idx);
    });
  });

  // Delete buttons
  savedMessagesListEl.querySelectorAll('.saved-item-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      deleteSavedPreset(idx);
    });
  });
}

async function loadSavedPreset(idx) {
  const messages = await loadSavedMessages();
  const preset = messages[idx];
  if (!preset) return;

  messageTextInput.value = preset.message || '';
  randomQuoteCheckbox.checked = false;
  quotesGroup.style.display = 'none';
  singleMessageGroup.style.display = 'block';

  if (savedMessagesSection) savedMessagesSection.open = false;
  savedMsgNameInput.value = preset.name || '';
  messageTextInput.focus();
}

async function deleteSavedPreset(idx) {
  const messages = await loadSavedMessages();
  messages.splice(idx, 1);
  await persistSavedMessages(messages);
  await renderSavedMessages();
}

if (saveMsgPresetBtn) {
  saveMsgPresetBtn.addEventListener('click', async () => {
    const name = savedMsgNameInput.value.trim();
    const message = messageTextInput.value.trim();

    if (!message) {
      savedMsgNameInput.style.borderColor = 'var(--red)';
      setTimeout(() => { savedMsgNameInput.style.borderColor = ''; }, 1500);
      return;
    }

    const messages = await loadSavedMessages();
    if (messages.length >= MAX_SAVED) {
      messages.shift();
    }
    messages.push({ name: name || '', message });
    await persistSavedMessages(messages);

    savedMsgNameInput.value = '';
    await renderSavedMessages();
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


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

    statusEl.textContent = 'Dang ket noi...';
    statusEl.style.display = 'block';
    statusEl.style.color = 'var(--text-secondary)';

    const response = await sendMessageToTab({
      action: 'startAutoClick',
      count: clickCount,
      minDelay: minDelay,
      maxDelay: maxDelay
    });

    if (response?.started) {
      updateGamepadUI(true);
      statusEl.textContent = 'Dang click gamepad...';
      statusEl.style.color = 'var(--green)';
      progressEl.style.display = 'block';
      progressEl.textContent = '0 / ' + clickCount;
    }
  } catch (e) {
    if (e.message === 'NOT_TINDER') {
      statusEl.textContent = 'Vui long mo trang Tinder!';
    } else {
      statusEl.textContent = 'Loi: ' + e.message;
    }
    statusEl.style.color = 'var(--red)';
  }
});

stopBtn.addEventListener('click', async () => {
  try {
    const response = await sendMessageToTab({ action: 'stopAutoClick' });
    if (response?.stopped) {
      updateGamepadUI(false);
      statusEl.textContent = 'Da dung!';
      statusEl.style.color = 'var(--text-muted)';
      progressEl.style.display = 'none';
    }
  } catch (e) {
    statusEl.textContent = 'Loi: ' + e.message;
    statusEl.style.color = 'var(--red)';
  }
});

// === BULK MESSAGE ===
startMsgBtn.addEventListener('click', async () => {
  try {
    let message = '';
    let quotes = [];
    let useRandomQuotes = false;

    if (selectedAIMode === 'ai') {
      const result = await chrome.storage.local.get([
        'openRouterApiKey',
        'aiSystemPrompt',
        'aiUserPrompt',
        'aiModel'
      ]);

      if (!result.openRouterApiKey) {
        statusEl.textContent = i18n.t('msg.noAiKey');
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--red)';
        return;
      }

      const count = parseInt(messageCountInput.value) || 0;
      const minDelay = (parseFloat(msgMinDelayInput.value) || 3) * 1000;
      const maxDelay = (parseFloat(msgMaxDelayInput.value) || 5) * 1000;

      statusEl.textContent = 'Dang ket noi AI...';
      statusEl.style.display = 'block';
      statusEl.style.color = 'var(--accent)';

      const response = await sendMessageToTab({
        action: 'startBulkMessage',
        message: '',
        quotes: [],
        useRandomQuotes: false,
        count: count,
        minDelay: minDelay,
        maxDelay: maxDelay,
        aiMode: true,
        openRouterApiKey: result.openRouterApiKey,
        aiSystemPrompt: result.aiSystemPrompt,
        aiUserPrompt: result.aiUserPrompt,
        aiModel: result.aiModel || 'google/gemini-2.5-flash'
      });

      if (response?.started) {
        updateMessageUI(true);
        statusEl.textContent = 'Dang gui tin nhan AI...';
        statusEl.style.color = 'var(--green)';
        progressEl.style.display = 'block';
        progressEl.textContent = '0 / ' + (count || '?');
      } else {
        statusEl.textContent = 'Khong the bat dau!';
        statusEl.style.color = 'var(--red)';
      }
      return;
    }

    useRandomQuotes = randomQuoteCheckbox.checked;

    if (useRandomQuotes) {
      const useTimeBased = timeBasedQuotesCheckbox && timeBasedQuotesCheckbox.checked;

      if (useTimeBased) {
        quotes = getTimeBasedQuotes();
        const timeSlot = getCurrentTimeSlot();
        console.log(`Using quotes for ${timeSlot.label}:`, quotes);
      } else {
        const quotesText = quotesListInput.value.trim();
        quotes = quotesText.split('\n').map(q => q.trim()).filter(q => q.length > 0);
      }

      if (quotes.length === 0) {
        statusEl.textContent = 'Vui long nhap it nhat 1 cau!';
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--red)';
        return;
      }
    } else {
      message = messageTextInput.value.trim();
      if (!message) {
        statusEl.textContent = 'Vui long nhap tin nhan!';
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--red)';
        return;
      }
    }

    const count = parseInt(messageCountInput.value) || 0;
    const minDelay = (parseFloat(msgMinDelayInput.value) || 3) * 1000;
    const maxDelay = (parseFloat(msgMaxDelayInput.value) || 5) * 1000;

    statusEl.textContent = 'Dang ket noi...';
    statusEl.style.display = 'block';
    statusEl.style.color = 'var(--accent)';

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
      statusEl.textContent = 'Dang gui tin nhan...';
      statusEl.style.color = 'var(--green)';
      progressEl.style.display = 'block';
      progressEl.textContent = '0 / ' + (count || '?');
    } else {
      statusEl.textContent = 'Khong the bat dau!';
      statusEl.style.color = 'var(--red)';
    }
  } catch (e) {
    if (e.message === 'NOT_TINDER') {
      statusEl.textContent = 'Vui long mo trang Tinder!';
    } else {
      statusEl.textContent = 'Loi: ' + e.message;
    }
    statusEl.style.color = 'var(--red)';
  }
});

stopMsgBtn.addEventListener('click', async () => {
  try {
    const response = await sendMessageToTab({ action: 'stopBulkMessage' });
    if (response?.stopped) {
      updateMessageUI(false);
      statusEl.textContent = 'Da dung!';
      statusEl.style.color = 'var(--text-muted)';
      progressEl.style.display = 'none';
    }
  } catch (e) {
    statusEl.textContent = 'Loi: ' + e.message;
    statusEl.style.color = 'var(--red)';
  }
});

// ========== SINGLE AI MESSAGE GENERATION (Message Tab) ==========
const generateAiMsgBtn = document.getElementById('generateAiMsgBtn');
const generateAiStatus = document.getElementById('generateAiStatus');
const generateAiPreview = document.getElementById('generateAiPreview');
const generateAiPreviewText = document.getElementById('generateAiPreviewText');
const useAiMsgBtn = document.getElementById('useAiMsgBtn');
const regenerateAiMsgBtn = document.getElementById('regenerateAiMsgBtn');
let lastGeneratedMessage = '';

async function generateSingleAIMessage() {
  statusEl.textContent = i18n.t('msg.generating');
  statusEl.style.display = 'block';
  statusEl.style.color = 'var(--accent)';

  const aiConfig = await chrome.storage.local.get([
    'openRouterApiKey',
    'aiSystemPrompt',
    'aiUserPrompt',
    'aiModel'
  ]);

  if (!aiConfig.openRouterApiKey) {
    showGenStatus(i18n.t('msg.aiNoApiKey'), 'error');
    statusEl.textContent = i18n.t('msg.aiNoApiKey');
    statusEl.style.color = 'var(--red)';
    return null;
  }

  generateAiMsgBtn.disabled = true;
  generateAiMsgBtn.innerHTML = '<svg class="spinner" style="width:14px;height:14px;border:2px solid rgba(232,96,76,0.2);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite;display:inline-block;flex-shrink:0;" viewBox="0 0 24 24"></svg> <span>' + i18n.t('msg.generating') + '</span>';

  try {
    const response = await sendMessageToTab({
      action: 'generateProfileAIMessage',
      apiKey: aiConfig.openRouterApiKey,
      systemPrompt: aiConfig.aiSystemPrompt,
      userPrompt: aiConfig.aiUserPrompt,
      model: aiConfig.aiModel || 'google/gemini-2.5-flash'
    });

    generateAiMsgBtn.disabled = false;
    generateAiMsgBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5h2v2h-2zm1.61-9.96a2.5 2.5 0 01.89 2.46h-1.78a1.5 1.5 0 00-1.78 1.33V15h2v1h-3.5a.5.5 0 010-1H11v-1.54a2.5 2.5 0 012.61-2.5z"/></svg> <span>' + i18n.t('msg.aiGenerate') + '</span>';

    if (response?.success && response.message) {
      lastGeneratedMessage = response.message;
      generateAiPreviewText.textContent = response.message;
      generateAiPreview.classList.add('show');
      document.getElementById('aiPreviewActions').style.display = 'flex';
      showGenStatus(i18n.t('msg.aiCreated'), 'success');
      statusEl.textContent = i18n.t('msg.aiCreated');
      statusEl.style.color = 'var(--green)';
      return response.message;
    } else {
      const errMsg = response?.error || 'Khong nhan duoc phan hoi';
      showGenStatus(errMsg, 'error');
      statusEl.textContent = errMsg;
      statusEl.style.color = 'var(--red)';
      return null;
    }
  } catch (e) {
    generateAiMsgBtn.disabled = false;
    generateAiMsgBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5h2v2h-2zm1.61-9.96a2.5 2.5 0 01.89 2.46h-1.78a1.5 1.5 0 00-1.78 1.33V15h2v1h-3.5a.5.5 0 010-1H11v-1.54a2.5 2.5 0 012.61-2.5z"/></svg> <span>' + i18n.t('msg.aiGenerate') + '</span>';
    showGenStatus('Loi: ' + e.message, 'error');
    statusEl.textContent = 'Loi: ' + e.message;
    statusEl.style.color = 'var(--red)';
    return null;
  }
}

function showGenStatus(msg, type) {
  generateAiStatus.textContent = msg;
  generateAiStatus.style.display = 'block';
  generateAiStatus.className = 'alert ' + (type === 'success' ? 'alert-success' : 'alert-error');
  generateAiStatus.classList.add('show');
}

if (generateAiMsgBtn) {
  generateAiMsgBtn.addEventListener('click', () => {
    generateSingleAIMessage();
  });
}

if (useAiMsgBtn) {
  useAiMsgBtn.addEventListener('click', () => {
    if (lastGeneratedMessage) {
      const messageTextInput = document.getElementById('messageText');
      if (messageTextInput) {
        messageTextInput.value = lastGeneratedMessage;
        messageTextInput.focus();
      }
      generateAiPreview.style.display = 'none';
      generateAiStatus.style.display = 'none';
      lastGeneratedMessage = '';
    }
  });
}

if (regenerateAiMsgBtn) {
  regenerateAiMsgBtn.addEventListener('click', () => {
    generateSingleAIMessage();
  });
}

// Listen for progress updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateProgress') {
    progressEl.textContent = `${request.current} / ${request.total}`;
    progressEl.style.display = 'block';
  }

  if (request.action === 'completed') {
    updateGamepadUI(false);
    updateMessageUI(false);
    statusEl.textContent = 'Hoan thanh!';
    statusEl.style.display = 'none';
    progressEl.textContent = `Da xu ly ${request.total} muc`;
  }

  if (request.action === 'error') {
    updateGamepadUI(false);
    updateMessageUI(false);
    statusEl.textContent = request.message;
    statusEl.style.display = 'block';
    statusEl.style.color = 'var(--red)';
    progressEl.style.display = 'none';
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

    historyCountEl.textContent = `Tong: ${history.length} tin nhan`;

    if (history.length === 0) {
      historyListEl.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">' + i18n.t('history.empty') + '</div>';
      return;
    }

    historyListEl.innerHTML = history.slice(0, 100).map(item => `
      <div class="history-item">
        <div class="history-name">${item.name || 'Unknown'}</div>
        <div class="history-msg">${item.message || ''}</div>
        <div class="history-time">${item.date || ''}</div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Lỗi load history:', e);
      historyListEl.innerHTML = '<div style="color: red; text-align:center; padding:20px;">' + i18n.t('history.error') + '</div>';
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

// ========== AI PANEL ==========
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const testApiKeyBtn = document.getElementById('testApiKeyBtn');
const testResultEl = document.getElementById('testResult');
const apiKeyStatusEl = document.getElementById('apiKeyStatus');
const modeOptions = document.querySelectorAll('.mode-option');

// Load saved AI config on startup
async function loadAIConfig() {
  try {
    const result = await chrome.storage.local.get([
      'openRouterApiKey',
      'aiSystemPrompt',
      'aiUserPrompt',
      'aiMode',
      'aiModel'
    ]);

    if (result.openRouterApiKey) {
      apiKeyInput.value = result.openRouterApiKey;
      updateApiKeyStatus(true);
    }

    if (result.aiSystemPrompt) {
      systemPromptInput.value = result.aiSystemPrompt;
    }

    if (result.aiUserPrompt) {
      userPromptInput.value = result.aiUserPrompt;
    }

    const mode = result.aiMode || 'fixed';
    selectedAIMode = mode;
    setAIMode(mode);

    // Load saved model
    if (result.aiModel) {
      if (modelSelect) {
        // Check if saved model exists in options
        const exists = [...modelSelect.options].some(opt => opt.value === result.aiModel);
        if (exists) {
          modelSelect.value = result.aiModel;
        } else {
          modelSelect.value = 'custom';
          if (customModelInput) {
            customModelInput.value = result.aiModel;
            customModelInput.style.display = 'block';
          }
        }
      }
    }
  } catch (e) {
    console.error('Lỗi load AI config:', e);
  }
}

function updateApiKeyStatus(configured) {
  const lang = i18n.lang;
  if (configured) {
    apiKeyStatusEl.className = 'api-badge configured';
    apiKeyStatusEl.innerHTML = '<div class="dot"></div><span>' + i18n.t('ai.apiConfigured') + '</span>';
  } else {
    apiKeyStatusEl.className = 'api-badge not-configured';
    apiKeyStatusEl.innerHTML = '<div class="dot"></div><span>' + i18n.t('ai.apiNotConfigured') + '</span>';
  }
}

function showTestResult(msg, type) {
  testResultEl.textContent = msg;
  testResultEl.className = 'alert ' + (type === 'success' ? 'alert-success' : type === 'info' ? 'alert-info' : 'alert-error');
  testResultEl.classList.add('show');
}

function clearTestResult() {
  testResultEl.className = 'alert';
  testResultEl.classList.remove('show');
}

function setAIMode(mode) {
  selectedAIMode = mode;
  modeOptions.forEach(opt => {
    opt.classList.remove('selected');
    const radio = opt.querySelector('input[type="radio"]');
    radio.checked = opt.dataset.mode === mode;
    if (opt.dataset.mode === mode) {
      opt.classList.add('selected');
    }
  });
  chrome.storage.local.set({ aiMode: mode });
}

modeOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    const mode = opt.dataset.mode;
    const radio = opt.querySelector('input[type="radio"]');
    radio.checked = true;
    setAIMode(mode);
  });
});

saveApiKeyBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showTestResult(i18n.t('ai.enterApiKey'), 'error');
    return;
  }

  saveApiKeyBtn.disabled = true;
  saveApiKeyBtn.innerHTML = '<span>Dang luu...</span>';

  try {
    const modelValue = modelSelect && modelSelect.value === 'custom'
      ? (customModelInput ? customModelInput.value.trim() : '')
      : (modelSelect ? modelSelect.value : 'google/gemini-2.5-flash');

    await chrome.storage.local.set({
      openRouterApiKey: apiKey,
      aiSystemPrompt: systemPromptInput.value.trim(),
      aiUserPrompt: userPromptInput.value.trim(),
      aiModel: modelValue
    });

    showTestResult(i18n.t('ai.apiKeySaved'), 'success');
    updateApiKeyStatus(true);
    setTimeout(clearTestResult, 2000);
  } catch (e) {
    showTestResult('Loi luu: ' + e.message, 'error');
  }

  saveApiKeyBtn.disabled = false;
  saveApiKeyBtn.innerHTML = '<span>' + i18n.t('ai.save') + '</span>';
});

testApiKeyBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showTestResult(i18n.t('ai.enterApiKey'), 'error');
    return;
  }

  testApiKeyBtn.disabled = true;
  testApiKeyBtn.textContent = i18n.t('ai.checking');
  showTestResult(i18n.t('ai.checking'), 'info');

  try {
    const openrouter = OpenRouter;
    const result = await openrouter.validateKey(apiKey);
    if (result.valid) {
      showTestResult(i18n.t('ai.apiKeyValid'), 'success');
      updateApiKeyStatus(true);
    } else {
      showTestResult(result.error || i18n.t('ai.apiKeyInvalid'), 'error');
      updateApiKeyStatus(false);
    }
  } catch (e) {
    showTestResult('Loi: ' + e.message, 'error');
  }

  testApiKeyBtn.disabled = false;
  testApiKeyBtn.textContent = i18n.t('ai.test');
  setTimeout(clearTestResult, 5000);
});

testAiGenerateBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showTestResult(i18n.t('ai.saveFirst'), 'error');
    return;
  }

  aiGeneratingEl.style.display = 'flex';
  aiPreviewEl.classList.remove('show');
  testAiGenerateBtn.disabled = true;

  try {
    const model = getSelectedModel();
    const openrouter = OpenRouter;
    const result = await openrouter.generateMessage(apiKey, {
      model: model,
      systemPrompt: systemPromptInput.value.trim(),
      userPrompt: userPromptInput.value.trim(),
      profile: 'mot co gai 25 tuoi, thich du lich va chup anh, song o TP.HCM'
    });

    aiGeneratingEl.style.display = 'none';
    testAiGenerateBtn.disabled = false;

    if (result.success) {
      aiPreviewTextEl.textContent = result.message;
      aiPreviewEl.classList.add('show');
    } else {
      showTestResult(i18n.t('ai.aiError') + ' ' + result.error, 'error');
    }
  } catch (e) {
    aiGeneratingEl.style.display = 'none';
    testAiGenerateBtn.disabled = false;
    showTestResult('Loi: ' + e.message, 'error');
  }
});

loadAIConfig();
renderSavedMessages();

// ========== I18N (Language Switch) ==========
const langViBtn = document.getElementById('langVi');
const langEnBtn = document.getElementById('langEn');

async function applyLanguage(lang) {
  i18n.lang = lang;
  await chrome.storage.local.set({ appLang: lang });

  // Update textContent for all [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n.t(key);
  });

  // Update placeholders for all [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18n.t(key);
  });

  // Update button active states
  langViBtn.classList.toggle('active', lang === 'vi');
  langEnBtn.classList.toggle('active', lang === 'en');

  // Update AI prompts with language defaults
  if (systemPromptInput) {
    const p = i18n.prompts[lang];
    systemPromptInput.value = p.system;
    userPromptInput.value = p.user;
  }

  // Update saved messages empty state if visible
  const savedEmpty = document.querySelector('.saved-empty');
  if (savedEmpty) savedEmpty.textContent = i18n.t('msg.savedEmpty');
}

function switchToLang(lang) {
  applyLanguage(lang);
}

if (langViBtn) langViBtn.addEventListener('click', () => switchToLang('vi'));
if (langEnBtn) langEnBtn.addEventListener('click', () => switchToLang('en'));

// Init language — load from storage or default to Vietnamese
(async () => {
  const result = await chrome.storage.local.get(['appLang']);
  const savedLang = result.appLang || 'vi';
  applyLanguage(savedLang);
})();
