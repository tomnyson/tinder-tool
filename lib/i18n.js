const i18n = {
  lang: 'vi',

  t(key) {
    return (this.translations[this.lang] && this.translations[this.lang][key]) || this.translations['vi'][key] || key;
  },

  translations: {
    vi: {
      'app.title': 'Tinder Auto Tool',
      'app.subtitle': 'Tự động gửi tin nhắn hàng loạt',

      // Tabs
      'tab.swipe': 'Swipe',
      'tab.message': 'Message',
      'tab.history': 'History',
      'tab.ai': 'AI',

      // Swipe tab
      'swipe.title': 'Cấu hình Swipe',
      'swipe.count': 'Số lần swipe',
      'swipe.delay': 'Thời gian chờ (giây)',
      'swipe.delay.from': 'Từ',
      'swipe.delay.to': 'Đến',
      'swipe.start': 'Bắt đầu swipe',
      'swipe.stop': 'Dừng lại',
      'swipe.ready': 'Sẵn sàng',
      'swipe.running': 'Đang swipe...',
      'swipe.notTinder': 'Vui lòng mở trang Tinder!',
      'swipe.complete': 'Hoàn thành!',

      // Message tab
      'msg.sendMode': 'Chế độ gửi tin nhắn',
      'msg.randomQuotes': 'Gửi câu châm ngôn ngẫu nhiên',
      'msg.content': 'Nội dung tin nhắn',
      'msg.aiGenerate': 'Tạo tin nhắn bằng AI',
      'msg.aiPreview': 'Xem trước AI',
      'msg.useThis': 'Dùng tin này',
      'msg.regenerate': 'Tạo lại',
      'msg.generating': 'Đang tạo...',
      'msg.aiCreated': 'Đã tạo tin nhắn!',
      'msg.aiNoApiKey': 'Chưa cấu hình API Key! Vào tab AI để cấu hình.',

      'msg.quotesSection': 'Danh sách câu châm ngôn',
      'msg.messagePlaceholder': 'Nhập tin nhắn của bạn...',
      'msg.timeBased': 'Theo buổi trong ngày',
      'msg.timeNow': 'Hiện tại:',
      'msg.morning': 'Sáng (5h - 11h)',
      'msg.noon': 'Trưa (11h - 17h)',
      'msg.evening': 'Tối (17h - 5h)',
      'msg.quotesPlaceholder': 'Một câu mỗi dòng...',
      'msg.fetchQuotes': 'Lấy quotes từ API',
      'msg.fetching': 'Đang lấy...',
      'msg.quotesAdded': 'Đã thêm {n} quotes!',
      'msg.quotesFallback': 'Đã thêm {n} quotes (offline)',

      'msg.savedSection': 'Tin nhắn đã lưu',
      'msg.savedEmpty': 'Chưa có mẫu tin nào',
      'msg.savedNamePlaceholder': 'Tên mẫu tin nhắn...',
      'msg.save': 'Lưu',

      'msg.sendConfig': 'Cấu hình gửi',
      'msg.recipientCount': 'Số người gửi (0 = tất cả)',
      'msg.delayBetween': 'Delay giữa mỗi người (giây)',
      'msg.sendBulk': 'Gửi tin nhắn hàng loạt',
      'msg.notEnoughQuotes': 'Vui lòng nhập ít nhất 1 câu!',
      'msg.enterMessage': 'Vui lòng nhập tin nhắn!',
      'msg.noAiKey': 'Vui lòng cấu hình API Key trong tab AI!',
      'msg.cantStart': 'Không thể bắt đầu!',
      'msg.connecting': 'Đang kết nối...',
      'msg.connectingAi': 'Đang kết nối AI...',
      'msg.sending': 'Đang gửi tin nhắn...',
      'msg.sendingAi': 'Đang gửi tin nhắn AI...',
      'msg.stopped': 'Đã dừng!',

      // History tab
      'history.total': 'Tổng: {n} tin nhắn',
      'history.refresh': 'Refresh',
      'history.clearAll': 'Xóa tất cả',
      'history.empty': 'Chưa có tin nhắn nào',
      'history.clearConfirm': 'Bạn có chắc muốn xóa toàn bộ lịch sử?',
      'history.error': 'Lỗi tải lịch sử',

      // AI tab
      'ai.apiSection': 'OpenRouter API',
      'ai.apiConfigured': 'API Key đã cấu hình',
      'ai.apiNotConfigured': 'Chưa cấu hình API Key',
      'ai.apiKeyPlaceholder': 'sk-or-v1-...',
      'ai.save': 'Lưu',
      'ai.test': 'Test',
      'ai.apiKeySaved': 'Đã lưu API Key!',
      'ai.apiKeyValid': 'API Key hợp lệ!',
      'ai.apiKeyInvalid': 'API Key không hợp lệ',
      'ai.enterApiKey': 'Vui lòng nhập API Key!',
      'ai.checking': 'Đang kiểm tra...',
      'ai.saveFirst': 'Vui lòng lưu API Key trước!',

      'ai.modeSection': 'Chế độ tin nhắn',
      'ai.modeFixed': 'Tin nhắn cố định',
      'ai.modeFixedDesc': 'Gửi cùng một tin nhắn cho tất cả',
      'ai.modeRandom': 'Ngẫu nhiên',
      'ai.modeRandomDesc': 'Gửi câu châm ngôn ngẫu nhiên từ danh sách',
      'ai.modeAi': 'AI OpenRouter',
      'ai.modeAiDesc': 'Dùng AI để tạo tin nhắn cá nhân hoá',

      'ai.modelSection': 'Model AI',
      'ai.testGenerate': 'Thử tạo tin nhắn',
      'ai.generating': 'AI đang tạo tin nhắn...',
      'ai.preview': 'Xem trước tin nhắn AI',
      'ai.aiError': 'Lỗi AI:',

      'ai.promptSection': 'Prompt cấu hình',
      'ai.systemPrompt': 'System Prompt',
      'ai.systemPromptPlaceholder': 'Bạn là...',
      'ai.userPrompt': 'User Prompt (dùng {profile} để chèn thông tin)',
      'ai.userPromptPlaceholder': 'Viết một tin nhắn...',

      // Default prompts (VI)
      'default.systemPrompt': 'Ban la mot nguoi viet tin nhan tan gai (gui tin nhan dau tien cho phu nu tren Tinder). Viet tin nhan than thien, tu nhien, hai huoc nhe, phu hop voi van hoa Viet Nam. Khong qua 100 ky tu. Khong dung emoji qua nhieu.',
      'default.userPrompt': 'Viet mot tin nhan mo dau cho nguoi nay: {profile}. Viet bang tieng Viet, tu nhien nhu dang chat that.',

      // Time slots
      'time.morning': 'Buổi sáng',
      'time.noon': 'Buổi trưa',
      'time.evening': 'Buổi tối',

      // General
      'error': 'Lỗi: {msg}',
      'error.notTinder': 'Vui lòng mở trang Tinder!',
    },

    en: {
      // Header
      'app.title': 'Tinder Auto Tool',
      'app.subtitle': 'Auto send bulk messages',

      // Tabs
      'tab.swipe': 'Swipe',
      'tab.message': 'Message',
      'tab.history': 'History',
      'tab.ai': 'AI',

      // Swipe tab
      'swipe.title': 'Swipe Config',
      'swipe.count': 'Number of swipes',
      'swipe.delay': 'Wait time (seconds)',
      'swipe.delay.from': 'From',
      'swipe.delay.to': 'To',
      'swipe.start': 'Start swipe',
      'swipe.stop': 'Stop',
      'swipe.ready': 'Ready',
      'swipe.running': 'Swiping...',
      'swipe.notTinder': 'Please open Tinder page!',
      'swipe.complete': 'Complete!',

      // Message tab
      'msg.sendMode': 'Send mode',
      'msg.randomQuotes': 'Send random quotes',
      'msg.content': 'Message content',
      'msg.aiGenerate': 'Generate with AI',
      'msg.aiPreview': 'AI preview',
      'msg.useThis': 'Use this',
      'msg.regenerate': 'Regenerate',
      'msg.generating': 'Generating...',
      'msg.aiCreated': 'Message created!',
      'msg.aiNoApiKey': 'No API Key configured! Go to AI tab to set up.',

      'msg.quotesSection': 'Quote list',
      'msg.messagePlaceholder': 'Enter your message...',
      'msg.timeBased': 'By time of day',
      'msg.timeNow': 'Current:',
      'msg.morning': 'Morning (5am - 11am)',
      'msg.noon': 'Afternoon (11am - 5pm)',
      'msg.evening': 'Evening (5pm - 5am)',
      'msg.quotesPlaceholder': 'One quote per line...',
      'msg.fetchQuotes': 'Fetch quotes from API',
      'msg.fetching': 'Fetching...',
      'msg.quotesAdded': 'Added {n} quotes!',
      'msg.quotesFallback': 'Added {n} quotes (offline)',

      'msg.savedSection': 'Saved messages',
      'msg.savedEmpty': 'No saved templates',
      'msg.savedNamePlaceholder': 'Template name...',
      'msg.save': 'Save',

      'msg.sendConfig': 'Send config',
      'msg.recipientCount': 'Recipients (0 = all)',
      'msg.delayBetween': 'Delay between each (seconds)',
      'msg.sendBulk': 'Send bulk messages',
      'msg.notEnoughQuotes': 'Please enter at least 1 quote!',
      'msg.enterMessage': 'Please enter a message!',
      'msg.noAiKey': 'Please configure API Key in AI tab!',
      'msg.cantStart': 'Cannot start!',
      'msg.connecting': 'Connecting...',
      'msg.connectingAi': 'Connecting AI...',
      'msg.sending': 'Sending messages...',
      'msg.sendingAi': 'Sending AI messages...',
      'msg.stopped': 'Stopped!',

      // History tab
      'history.total': 'Total: {n} messages',
      'history.refresh': 'Refresh',
      'history.clearAll': 'Clear all',
      'history.empty': 'No messages yet',
      'history.clearConfirm': 'Clear all history?',
      'history.error': 'History load error',

      // AI tab
      'ai.apiSection': 'OpenRouter API',
      'ai.apiConfigured': 'API Key configured',
      'ai.apiNotConfigured': 'API Key not configured',
      'ai.apiKeyPlaceholder': 'sk-or-v1-...',
      'ai.save': 'Save',
      'ai.test': 'Test',
      'ai.apiKeySaved': 'API Key saved!',
      'ai.apiKeyValid': 'API Key valid!',
      'ai.apiKeyInvalid': 'API Key invalid',
      'ai.enterApiKey': 'Please enter API Key!',
      'ai.checking': 'Checking...',
      'ai.saveFirst': 'Please save API Key first!',

      'ai.modeSection': 'Message mode',
      'ai.modeFixed': 'Fixed message',
      'ai.modeFixedDesc': 'Send the same message to everyone',
      'ai.modeRandom': 'Random',
      'ai.modeRandomDesc': 'Send random quotes from list',
      'ai.modeAi': 'AI OpenRouter',
      'ai.modeAiDesc': 'Use AI to generate personalized messages',

      'ai.modelSection': 'AI Model',
      'ai.testGenerate': 'Test generate',
      'ai.generating': 'AI is generating...',
      'ai.preview': 'AI message preview',
      'ai.aiError': 'AI Error:',

      'ai.promptSection': 'Prompt config',
      'ai.systemPrompt': 'System Prompt',
      'ai.systemPromptPlaceholder': 'You are...',
      'ai.userPrompt': 'User Prompt (use {profile} to insert info)',
      'ai.userPromptPlaceholder': 'Write an opening message...',

      // Default prompts (EN)
      'default.systemPrompt': 'You are a skilled dating app message writer (sending first messages to women on Tinder). Write friendly, natural, light-humorous messages that fit Western dating culture. Under 100 characters. No excessive emojis.',
      'default.userPrompt': 'Write an opening message for this person: {profile}. Keep it casual and natural.',

      // Time slots
      'time.morning': 'Morning',
      'time.noon': 'Afternoon',
      'time.evening': 'Evening',

      // General
      'error': 'Error: {msg}',
      'error.notTinder': 'Please open Tinder page!',
    }
  },

  prompts: {
    vi: {
      system: 'Ban la mot nguoi viet tin nhan tan gai (gui tin nhan dau tien cho phu nu tren Tinder). Viet tin nhan than thien, tu nhien, hai huoc nhe, phu hop voi van hoa Viet Nam. Khong qua 100 ky tu. Khong dung emoji qua nhieu.',
      user: 'Viet mot tin nhan mo dau cho nguoi nay: {profile}. Viet bang tieng Viet, tu nhien nhu dang chat that.',
    },
    en: {
      system: 'You are a skilled dating app message writer (sending first messages to women on Tinder). Write friendly, natural, light-humorous messages that fit Western dating culture. Under 100 characters. No excessive emojis.',
      user: 'Write an opening message for this person: {profile}. Keep it casual and natural.',
    }
  }
};
