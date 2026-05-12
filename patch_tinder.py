import re

with open('tinder-auto-click.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Change MESSAGE_PAGE_RELOAD_INTERVAL to 40
code = code.replace('const MESSAGE_PAGE_RELOAD_INTERVAL = 10;', 'const MESSAGE_PAGE_RELOAD_INTERVAL = 40;')

# 2. Replace syncProcessedHrefsFromQueue
sync_code_old = """  function syncProcessedHrefsFromQueue() {
    processedHrefs = messageTargetQueue
      .slice(0, currentMessageIndex)
      .map((target) => target.href)
      .filter(Boolean);
  }"""
sync_code_new = """  function syncProcessedHrefsFromQueue() {
    // Không cần dùng queue nữa, processedHrefs được push trực tiếp
  }"""
code = code.replace(sync_code_old, sync_code_new)

# 3. Replace persistBulkMessageState to remove messageTargetQueue
persist_old = """  async function persistBulkMessageState(extra = {}) {
    const result = await StorageHelper.get(["bulkMsgState"]);
    if (!result.bulkMsgState || !result.bulkMsgState.isRunning) return;

    syncProcessedHrefsFromQueue();
    const nextState = {
      ...result.bulkMsgState,
      currentMessageIndex,
      totalMessages,
      msgMinDelay,
      msgMaxDelay,
      processedHrefs,
      messageTargetQueue,
      ...extra,
    };
    await StorageHelper.set({ bulkMsgState: nextState });
  }"""

persist_new = """  async function persistBulkMessageState(extra = {}) {
    const result = await StorageHelper.get(["bulkMsgState"]);
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
  }"""
code = code.replace(persist_old, persist_new)

# 4. Remove rebuildMessageTargetQueue, collectAllMessageTargets, ensureMessageItemVisible
# We can just replace the whole chunk from rebuildMessageTargetQueue up to waitForTextareaValue with a new ensureNextUnprocessedItemVisible function
chunk_regex = re.compile(r'  async function rebuildMessageTargetQueue.*?  // Wait for textarea value to actually be set', re.DOTALL)
ensure_next_code = """  async function ensureNextUnprocessedItemVisible() {
    const container = getMessageListContainer();
    if (!container) return null;

    let stagnantRounds = 0;
    let lastVisibleSignature = "";

    for (let attempt = 0; attempt < 200; attempt++) {
      const items = getMessageItems();
      
      for (const item of items) {
        if (item && item.href && !processedHrefs.includes(item.href)) {
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

  // Wait for textarea value to actually be set"""
code = chunk_regex.sub(ensure_next_code, code)


# 5. Rewrite startBulkMessage
start_old_regex = re.compile(r'  async function startBulkMessage\(.*?  // Hàm chính: click vào item và gửi tin nhắn', re.DOTALL)

start_new = """  async function startBulkMessage(
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


  // Hàm chính: click vào item và gửi tin nhắn"""
code = start_old_regex.sub(start_new, code)

# 6. Rewrite processCurrentItemUnified
process_old_regex = re.compile(r'  // Xử lý item hiện tại.*?  // Lên lịch xử lý người tiếp theo', re.DOTALL)
process_new = """  // Xử lý item hiện tại — resolver là async (index, name) => string
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
    console.log(`\\n========================================`);
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
          currentMessageIndex++;
          await persistBulkMessageState();
          chrome.runtime.sendMessage({ action: "updateProgress", current: currentMessageIndex, total: totalMessages });
          scheduleNextPerson(resolver);
        });
      }, 2000);
    }, 300);
  }

  // Lên lịch xử lý người tiếp theo"""
code = process_old_regex.sub(process_new, code)

# 7. Rewrite checkAndResumeSession
resume_old_regex = re.compile(r'  // ========== AUTO RESUME CHỐNG CRASH ==========.*?  // Kích hoạt kiểm tra khôi phục khi trang tải xong', re.DOTALL)
resume_new = """  // ========== AUTO RESUME CHỐNG CRASH ==========
  async function checkAndResumeSession() {
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

  // Kích hoạt kiểm tra khôi phục khi trang tải xong"""
code = resume_old_regex.sub(resume_new, code)

with open('tinder-auto-click.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Patch applied successfully.")
