import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Ocean Spray Test" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "✅ Zoho Email Configuration Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #10b981; margin-top: 0;">✅ Email Configuration Successful!</h1>
            <p style="font-size: 16px; color: #4b5563;">
              Your Zoho email is configured correctly and ready to send notifications.
            </p>
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>SMTP Server:</strong> ${process.env.EMAIL_HOST}</p>
              <p style="margin: 5px 0;"><strong>Port:</strong> ${process.env.EMAIL_PORT}</p>
              <p style="margin: 5px 0;"><strong>From Email:</strong> ${process.env.EMAIL_USER}</p>
              <p style="margin: 5px 0;"><strong>Test Sent To:</strong> ${process.env.ADMIN_EMAIL}</p>
            </div>
            <p style="color: #059669; font-weight: bold;">
              🎉 All systems are ready! Your Ocean Spray application will now send automated emails.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully! Check your inbox.",
      messageId: info.messageId,
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
    });
  } catch (error) {
    console.error("Email test error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email",
        error: errorMessage,
        details: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          user: process.env.EMAIL_USER,
          hasPassword: !!process.env.EMAIL_PASSWORD,
        },
      },
      { status: 500 }
    );
  }
}
