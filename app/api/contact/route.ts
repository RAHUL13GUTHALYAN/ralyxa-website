import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let data: ContactPayload = {};

    // ✅ Mode A: JSON submit
    if (contentType.includes("application/json")) {
      data = (await req.json()) as ContactPayload;
    }
    // ✅ Mode B: HTML form submit (urlencoded or multipart)
    else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      data = {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        message: String(form.get("message") || ""),
      };
    } else {
      // Fallback: try formData anyway
      const form = await req.formData().catch(() => null);
      if (form) {
        data = {
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          message: String(form.get("message") || ""),
        };
      }
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    // ✅ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
    const CONTACT_EMAIL_PASS = process.env.CONTACT_EMAIL_PASS;

    if (!CONTACT_EMAIL || !CONTACT_EMAIL_PASS) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Server email not configured. Please set CONTACT_EMAIL and CONTACT_EMAIL_PASS in .env.local.",
        },
        { status: 500 }
      );
    }

    // ✅ Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: CONTACT_EMAIL,
        pass: CONTACT_EMAIL_PASS, // App Password (not normal password)
      },
    });

    // ✅ Email to you (admin)
    const adminSubject = `RALAXA Contact: ${name}`;
    const adminText = `
New contact form submission:

Name: ${name}
Email: ${email}

Message:
${message}
    `.trim();

    // ✅ Optional: auto-reply user
    const userSubject = "Thanks for contacting RALAXA";
    const userText = `
Hi ${name},

Thanks for reaching out to RALAXA. We received your message and will get back to you within 24–48 hours.

Your message:
"${message}"

Regards,
RALAXA Team
    `.trim();

    // Send both emails
    await transporter.sendMail({
      from: `RALAXA Website <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email, // so you can hit Reply and respond to user
      subject: adminSubject,
      text: adminText,
    });

    await transporter.sendMail({
      from: `RALAXA <${CONTACT_EMAIL}>`,
      to: email,
      subject: userSubject,
      text: userText,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
