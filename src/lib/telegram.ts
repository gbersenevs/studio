type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  cityOfInterest: string;
  contactChannel: "email" | "whatsapp" | "telegram";
  message?: string;
  listingSlug?: string;
};

export async function sendLeadToTelegram(payload: LeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      "[Lead] Telegram credentials are not configured yet. Payload was not sent.",
      payload
    );
    return { ok: false, reason: "not_configured" as const };
  }

  // Placeholder: actual Telegram delivery will be implemented later.
  console.log(
    `[Lead] Telegram delivery stub. Would send to chat ${chatId} with token ${token.slice(
      0,
      4
    )}...`,
    payload
  );

  return { ok: true };
}
