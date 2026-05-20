const OpenRouter = {
  API_BASE: "https://openrouter.ai/api/v1",

  async validateKey(apiKey) {
    try {
      const response = await fetch(`${this.API_BASE}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { valid: true, models: data.data || [] };
      }

      if (response.status === 401) {
        return { valid: false, error: "Invalid API key" };
      }

      return { valid: false, error: `HTTP ${response.status}` };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  async generateMessage(apiKey, { model, systemPrompt, userPrompt, profile }) {
    const defaultSystemPrompt = `Ban la mot nguoi viet tin nhan tan gai (gui tin nhan dau tien cho phu nu tren Tinder). Viet tin nhan than thien, tu nhien, hai huoc nhe, phu hop voi van hoa Viet Nam. Khong qua 100 ky tu. Khong dung emoji qua nhieu.`;

    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;
    const finalUserPrompt =
      userPrompt ||
      "Viet mot tin nhan mo dau cho nguoi nay: {profile}. Viet bang tieng Viet, tu nhien nhu dang chat that.";
    const finalModel = model || "google/gemini-2.5-flash-preview-05-20";

    const prompt = finalUserPrompt.replace(
      "{profile}",
      profile || "mot co gai",
    );
    let referer = "https://tinder.com/";
    try {
      if (typeof chrome !== "undefined" && chrome?.runtime?.id) {
        referer = chrome.runtime.getURL("");
      }
    } catch (_) {}

    try {
      const response = await fetch(`${this.API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": referer,
          "X-Title": "Tinder matches",
        },
        body: JSON.stringify({
          model: finalModel,
          messages: [
            { role: "system", content: finalSystemPrompt },
            { role: "user", content: prompt },
          ],
          max_tokens: 150,
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        let errorDetail = "";
        try {
          const errorData = await response.json();
          errorDetail =
            errorData.error?.message ||
            errorData.error?.code ||
            errorData.error?.type ||
            JSON.stringify(errorData.error) ||
            `HTTP ${response.status}`;
        } catch (_) {
          errorDetail = `HTTP ${response.status}`;
        }

        const errLower = errorDetail.toLowerCase();
        if (
          errLower.includes("invalid_api_key") ||
          errLower.includes("api key")
        ) {
          return {
            success: false,
            error: "API Key khong hop le! Vao tab AI de cap nhat.",
          };
        }
        if (errLower.includes("insufficient") || errLower.includes("credit")) {
          return {
            success: false,
            error: "Het credits! Vao openrouter.ai de nap them.",
          };
        }
        if (
          errLower.includes("model") &&
          (errLower.includes("not found") || errLower.includes("not available"))
        ) {
          return {
            success: false,
            error: `Model "${finalModel}" khong kha dung. Chon model khac.`,
          };
        }
        return { success: false, error: `[${response.status}] ${errorDetail}` };
      }

      const data = await response.json();
      const message = data.choices?.[0]?.message?.content?.trim();

      if (!message) {
        return {
          success: false,
          error: "AI khong tra loi. Thu lai hoac doi model.",
        };
      }

      return { success: true, message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

globalThis.OpenRouter = OpenRouter;
