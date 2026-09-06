// Retries a Gemini generateContent() call for transient failures only —
// network blips ("fetch failed"), 503 (model overloaded), 429 (rate limited).
// Anything else (bad API key, invalid request) fails immediately since
// retrying won't help.
export async function generateWithRetry(model, prompt, { retries = 3, baseDelayMs = 800 } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      lastError = error;
      const status = error?.status;
      const isRetryable = status === 503 || status === 429 || /fetch failed/i.test(error?.message || "");

      if (!isRetryable || attempt === retries) throw error;

      const delay = baseDelayMs * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
