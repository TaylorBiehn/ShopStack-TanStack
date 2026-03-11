import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_SERVER,
  port: Number(process.env.BREVO_SMTP_PORT) || 587,
  secure: false, // Use TLS (port 587 uses STARTTLS)
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

export interface SendEmailProps {
  to: string | string[];
  subject: string;
  body: ReactElement;
  from?: string;
}
export async function sendEmail({
  to,
  subject,
  body,
  from = "Shop Stack",
}: SendEmailProps) {
  try {
    // Convert React email component to HTML
    const emailHtml = await render(body);

    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html: emailHtml,
    });
    return { messageId: info.messageId };
  } catch (error: unknown) {
    console.error("Email sending error:", error);
    throw error;
  }
}
