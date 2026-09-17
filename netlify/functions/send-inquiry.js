// Routes website inquiries to the right inbox based on category, using Resend.
// Requires the RESEND_API_KEY environment variable to be set in Netlify
// (Project configuration > Environment variables). Also requires a verified
// sending domain in Resend so mail can reach any of the destination inboxes
// below, not just the Resend account owner's own address.

const RECIPIENTS = {
  "route-suggestion": "penafranciashipcorp@gmail.com",
  "general": "penafranciashipcorp@gmail.com",
  "booking": "pscsc.collections@gmail.com",
  "cargo": "pscsc.collections@gmail.com",
  "complaint": "hrscpsc.corporation@yahoo.com.ph",
  "employment": "pscsc.recruitment@yahoo.com",
  "other": "penafranciashipcorp@gmail.com",
};

const FROM_ADDRESS = "Santa Clara & Penafrancia Shipping Website <inquiries@santaclarashippingcorp.com>";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { type, name, email, subject, message, route, notes } = data;

  if (!name || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: "Name and email are required" }) };
  }

  const isRouteSuggestion = type === "route-suggestion";
  const recipientKey = isRouteSuggestion ? "route-suggestion" : (subject || "other");
  const to = RECIPIENTS[recipientKey] || RECIPIENTS.other;

  const subjectLine = isRouteSuggestion
    ? `New Route Suggestion: ${route || "(not specified)"}`
    : `Website Inquiry — ${subject || "Other"}`;

  const bodyText = isRouteSuggestion
    ? `Name: ${name}\nEmail: ${email}\nSuggested Route: ${route || "(not specified)"}\nNotes: ${notes || "(none)"}`
    : `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(not specified)"}\nMessage:\n${message || "(no message)"}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email service is not configured yet. Please contact us directly instead." }),
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        reply_to: email,
        subject: subjectLine,
        text: bodyText,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Failed to send. Please contact us directly instead." }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("send-inquiry error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong. Please contact us directly instead." }),
    };
  }
};

