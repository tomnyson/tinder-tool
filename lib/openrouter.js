const OpenRouter = {
  API_BASE: 'https://openrouter.ai/api/v1',

  async validateKey(apiKey) {
    try {
      const response = await fetch(`${this.API_BASE}/models`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { valid: true, models: data.data || [] };
      }

      if (response.status === 401) {
        return { valid: false, error: 'Invalid API key' };
      }

      return { valid: false, error: `HTTP ${response.status}` };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  async generateMessage(apiKey, { model, systemPrompt, userPrompt, profile }) {
    const defaultSystemPrompt = `Bạn là một người viết tin nhắn tán gái/sếp (sending first messages to women on dating apps like Tinder). Viết tin nhắn thân thiện, tự nhiên, hài hước nhẹ, phù hợp với văn hóa Việt Nam. Không quá 100 ký tự. Không dùng emoji quá nhiều.`;

    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;
    const finalUserPrompt = userPrompt || 'Viết một tin nhắn mở đầu cho người này: {{profile}}. Viết bằng tiếng Việt, tự nhiên như đang chat thật.';
    const finalModel = model || 'google/gemini-2.5-flash';

    const prompt = finalUserPrompt.replace('{{profile}}', profile || 'một cô gái');

    try {
      const response = await fetch(`${this.API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': chrome.runtime.getURL(''),
          'X-Title': 'Tinder Auto Tool'
        },
        body: JSON.stringify({
          model: finalModel,
          messages: [
            { role: 'system', content: finalSystemPrompt },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.9
        })
      });

      if (!response.ok) {
        let errorDetail = '';
        try {
          const errorData = await response.json();
          errorDetail = errorData.error?.message
            || errorData.error?.code
            || errorData.error?.type
            || JSON.stringify(errorData.error)
            || `HTTP ${response.status}`;
        } catch (_) {
          errorDetail = `HTTP ${response.status}`;
        }

        const errLower = errorDetail.toLowerCase();
        if (errLower.includes('invalid_api_key') || errLower.includes('api key')) {
          return { success: false, error: 'API Key không hợp lệ! Vào tab AI để cập nhật.' };
        }
        if (errLower.includes('insufficient') || errLower.includes('credit')) {
          return { success: false, error: 'Hết credits! Vào openrouter.ai để nạp thêm.' };
        }
        if (errLower.includes('model') && (errLower.includes('not found') || errLower.includes('not available'))) {
          return { success: false, error: `Model "${finalModel}" không khả dụng. Chọn model khác.` };
        }
        return { success: false, error: `[${response.status}] ${errorDetail}` };
      }

      const data = await response.json();
      const message = data.choices?.[0]?.message?.content?.trim();

      if (!message) {
        return { success: false, error: 'AI không trả lời. Thử lại hoặc đổi model.' };
      }

      return { success: true, message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
