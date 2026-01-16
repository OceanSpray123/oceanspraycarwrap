import nodemailer, { TransportOptions } from "nodemailer";

// Create transporter with Zoho configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., smtp.zoho.com
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
  debug: true,
  logger: true,
} as TransportOptions);

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Error configuring email transporter:", error);
  } else {
    console.log(
      "✅ Email transporter is configured successfully, Email server is ready to send messages"
    );
  }
});

// Send notification email to admin when new application is received
export const sendAdminNotification = async (application: any) => {
  const mailOptions = {
    from: `"Ocean Spray Notifications" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "🚗 New Ocean Spray Car Wrap Application Received",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;}
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(to right, #2563eb, #06b6d4); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .header .icon { font-size: 48px; margin-bottom: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; padding: 10px; background: white; border-bottom: 1px solid #e5e7eb; }
            .info-section { background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;}
            .info-section h2 { color: #2563eb; font-size: 18px; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #06b6d4; padding-bottom: 8px;}
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #2563eb; min-width: 140px;  }
            .value { color: #4b5563; }
            .button { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;  }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">🚗</div>
              <h1>New Application Received!</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Ocean Spray Car Wrap Program</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; color: #4b5563;">
                A new applicant has submitted their information for the Ocean Spray Car Wrap program.
              </p>

              <div class="info-section">
                <h2>👤 Applicant Information</h2>
                <div class="info-row">
                  <span class="label">Name:</span>
                  <span class="value">${application.firstName} ${
      application.lastName
    }</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${
                    application.email
                  }" style="color: #2563eb;">${application.email}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${
                    application.phone
                  }" style="color: #2563eb;">${application.phone}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">Gender:</span>
                  <span class="value" style="text-transform: capitalize;">${
                    application.gender
                  }</span>
                </div>
              </div>

              <div class="info-section">
                <h2>📍 Address</h2>
                <div class="info-row">
                  <span class="label">Street:</span>
                  <span class="value">${application.currentAddress}</span>
                </div>
                ${
                  application.apt
                    ? `
                <div class="info-row">
                  <span class="label">Apartment:</span>
                  <span class="value">${application.apt}</span>
                </div>
                `
                    : ""
                }
                <div class="info-row">
                  <span class="label">City, State:</span>
                  <span class="value">${application.city}, ${
      application.state
    } ${application.zip}</span>
                </div>
              </div>

              <div class="info-section">
                <h2>🚘 Vehicle & Contract Details</h2>
                <div class="info-row">
                  <span class="label">Vehicle Type:</span>
                  <span class="value" style="text-transform: capitalize;">${
                    application.motorVehicleType
                  }</span>
                </div>
                <div class="info-row">
                  <span class="label">Contract Duration:</span>
                  <span class="value">${
                    application.contractDuration
                  } weeks</span>
                </div>
                <div class="info-row">
                  <span class="label">Bank Name:</span>
                  <span class="value">${application.bankName}</span>
                </div>
              </div>

              <div class="info-section">
                <h2>📅 Submission Details</h2>
                <div class="info-row">
                  <span class="label">Submitted At:</span>
                  <span class="value">${new Date(
                    application.submittedAt
                  ).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</span>
                </div>
                <div class="info-row">
                  <span class="label">Status:</span>
                  <span class="value" style="color: #f59e0b; font-weight: bold; text-transform: uppercase;">⏳ Pending Review</span>
                </div>
              </div>

              <div class="button-container">
                <a href="${
                  process.env.NEXT_PUBLIC_APP_URL
                }/admin/applications/${application._id}" class="button">
                  🔍 View Full Application & Documents
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
                Click the button above to review the applicant's driver's license documents and approve or reject their application.
              </p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Ocean Spray Car Wrap Program. All rights reserved.</p>
              <p>This is an automated notification from the Ocean Spray application system.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Admin notification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending admin notification email:", error);
    throw error;
  }
};

// Send confirmation email to applicant
export const sendApplicantConfirmation = async (application: any) => {
  const mailOptions = {
    from: `"Ocean Spray Car Wrap Program" <${process.env.EMAIL_USER}>`,
    to: application.email,
    subject: "✅ Your Ocean Spray Car Wrap Application Has Been Received",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;}
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);}
            .header { background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; padding: 40px 20px; text-align: center;}
            .success-icon { font-size: 60px; margin-bottom: 15px; animation: bounce 1s ease;}
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); }}
            .header h1 { margin: 0; font-size: 28px;}
            .content { padding: 40px 30px;}
            .greeting { font-size: 18px; color: #2563eb; font-weight: bold; margin-bottom: 20px;}
            .message { font-size: 16px; color: #4b5563; margin-bottom: 25px; }
            .details-box { background: #f9fafb; border-left: 4px solid #06b6d4; padding: 20px; margin: 25px 0; border-radius: 4px; }
            .details-box h3 { color: #2563eb; margin-top: 0; font-size: 16px; }}
            .details-box p { margin: 8px 0; color: #4b5563;}
            .next-steps { background: #eff6ff; border-radius: 8px; padding: 20px; margin: 25px 0;}
            .next-steps h3 { color: #2563eb; margin-top: 0; font-size: 18px;}
            .next-steps ul { margin: 15px 0; padding-left: 20px;}
            .next-steps li { margin: 10px 0; color: #4b5563;}
            .contact-info { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;}
            .contact-info p { margin: 8px 0; color: #4b5563;}
            .contact-info a { color: #2563eb; text-decoration: none; font-weight: bold;}
            .footer { background: #f9fafb; padding: 25px; text-align: center; color: #6b7280; font-size: 12px;}
            .footer p { margin: 5px 0;}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✅</div>
              <h1>Application Successfully Received!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">Ocean Spray Car Wrap Program</p>
            </div>
            
            <div class="content">
              <p class="greeting">Dear ${application.firstName},</p>
              
              <p class="message">
                Thank you for applying to the <strong>Ocean Spray Car Wrap Program</strong>! 
                We're excited to have you interested in joining our team of mobile brand ambassadors.
              </p>

              <p class="message">
                Your application has been successfully received and is now under review by our team.
              </p>

              <div class="details-box">
                <h3>📋 Your Application Details</h3>
                <p><strong>Applicant Name:</strong> ${application.firstName} ${
      application.lastName
    }</p>
                <p><strong>Vehicle Type:</strong> ${
                  application.motorVehicleType
                }</p>
                <p><strong>Contract Duration:</strong> ${
                  application.contractDuration
                } weeks</p>
                <p><strong>Submitted:</strong> ${new Date(
                  application.submittedAt
                ).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
                <p><strong>Application Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Pending Review</span></p>
              </div>

              <div class="next-steps">
                <h3>🎯 What Happens Next?</h3>
                <ul>
                  <li><strong>Application Review:</strong> Our team will carefully review your application and documents within 1-3 business days.</li>
                  <li><strong>Verification Process:</strong> We'll verify your driver's license information and vehicle details.</li>
                  <li><strong>Decision Notification:</strong> You'll receive an email notification once your application is processed with the decision.</li>
                  <li><strong>If Approved:</strong> We'll contact you directly to schedule the wrap installation at a convenient time for you.</li>
                  <li><strong>Wrap Installation:</strong> Our professional team will install the wrap on your vehicle (typically takes 2-3 hours).</li>
                  <li><strong>Start Earning:</strong> Once installed, you'll start earning $750/week just by driving!</li>
                </ul>
              </div>

              <div class="details-box">
                <h3>💰 Compensation Reminder</h3>
                <p>Upon approval, you will receive:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>$750.00 per week</strong> for displaying our advertisement</li>
                  <li>Payment via check delivered by courier service</li>
                  <li>Upfront payment of $750.00 after wrap installation</li>
                  <li>No application fees or hidden costs</li>
                </ul>
              </div>

              <div class="contact-info">
                <h3 style="color: #2563eb; margin-top: 0;">📞 Have Questions?</h3>
                <p>Our support team is here to help!</p>
                <p>
                  <strong>Email:</strong> <a href="mailto:${
                    process.env.EMAIL_USER
                  }">${process.env.EMAIL_USER}</a><br>
                </p>
                <p style="margin-top: 15px; font-size: 14px; color: #6b7280;">
                  Response time: Within 24 hours on business days
                </p>
              </div>

              <p class="message" style="margin-top: 30px;">
                We appreciate your interest in the Ocean Spray Car Wrap Program and look forward to potentially working with you!
              </p>

              <p style="margin-top: 30px; color: #4b5563;">
                Best regards,<br>
                <strong style="color: #2563eb;">The Ocean Spray Car Wrap Team</strong>
              </p>
            </div>

            <div class="footer">
              <p><strong>© ${new Date().getFullYear()} Ocean Spray Car Wrap Program</strong></p>
              <p>One Ocean Spray Drive, Lakeville-Middleboro, MA 02349</p>
              <p style="margin-top: 15px;">This is an automated confirmation email. Please do not reply directly to this message.</p>
              <p>For assistance, contact us at <a href="mailto:${
                process.env.EMAIL_USER
              }" style="color: #2563eb;">${process.env.EMAIL_USER}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Applicant confirmation email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error);
    // Don't throw error - we don't want to fail the application if email fails
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
};

// Send Status Update Email to Applicant (Approved/Rejected)
export const sendStatusUpdateEmail = async (
  application: {
    email: string;
    firstName: string;
    contractDuration: any;
    motorVehicleType: string;
  },
  newStatus: string
) => {
  const isApproved = newStatus === "approved";

  const mailOptions = {
    from: `"Ocean Spray Car Wrap Program" <${process.env.EMAIL_USER}>`,
    to: application.email,
    subject: isApproved
      ? "🎉 Congratulations! Your Ocean Spray Application Has Been Approved"
      : "📋 Update on Your Ocean Spray Application",
    html: isApproved
      ? `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {font-family: 'Arial', 'Helvetica' sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container {max-width: 600px;margin: 20px auto;background: white;border-radius: 10px;overflow: hidden;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);}
            .header {
              background: ${
                isApproved
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
              };
              color: white;
              padding: 40px 20px;
              text-align: center;}
            .icon {font-size: 60px;margin-bottom: 15px;  animation: bounce 1s ease;}
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 
            50% { transform: translateY(-10px); }
            }
            .header h1 {margin: 0;font-size: 28px;}
            .content {padding: 30px 20px;}
            .greeting {
              font-size: 18px;
              color: #10b981;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .message {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 20px;
            }
            .section-divider {
              border-top: 2px solid #e5e7eb;
              margin: 30px 0;
              padding-top: 20px;
            }
            .section-title {
              background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
              color: white;
              padding: 12px 15px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
            }
            .section-title-icon {
              margin-right: 10px;
              font-size: 20px;
            }
            .info-box {
              background: #f9fafb;
              border-left: 4px solid #10b981;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .info-box h3 {
              color: #10b981;
              margin-top: 0;
              font-size: 16px;
            }
            .step-list {
              margin: 15px 0;
              padding-left: 0;
              list-style: none;
            }
            .step-list li {
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
              font-size: 15px;
            }
            .step-list li:last-child {
              border-bottom: none;
            }
            .step-number {
              display: inline-block;
              background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
              color: white;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              text-align: center;
              line-height: 28px;
              font-weight: bold;
              margin-right: 10px;
              font-size: 14px;
            }
            .sub-list {
              margin: 10px 0 10px 40px;
              padding-left: 0;
              list-style: none;
            }
            .sub-list li {
              padding: 5px 0;
              font-size: 14px;
              color: #6b7280;
              border: none;
            }
            .sub-list li:before {
              content: "• ";
              color: #10b981;
              font-weight: bold;
              margin-right: 5px;
            }
            .checkmark-list {
              background: #eff6ff;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .checkmark-list ul {
              margin: 0;
              padding-left: 0;
              list-style: none;
            }
            .checkmark-list li {
              padding: 8px 0;
              font-size: 14px;
              color: #1e40af;
              display: flex;
              align-items: flex-start;
            }
            .checkmark {
              color: #10b981;
              font-weight: bold;
              margin-right: 10px;
              font-size: 16px;
              flex-shrink: 0;
            }
            .warning-box {
              background: #fef3c7;
              border: 2px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
            }
            .warning-box h3 {
              color: #92400e;
              margin-top: 0;
              font-size: 16px;
              display: flex;
              align-items: center;
            }
            .warning-icon {
              font-size: 24px;
              margin-right: 10px;
            }
            .contact-box {
              background: #f0f9ff;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .contact-box h3 {
              color: #1e40af;
              margin-top: 0;
              font-size: 18px;
            }
            .contact-info {
              margin: 10px 0;
              font-size: 15px;
            }
            .contact-info a {
              color: #2563eb;
              text-decoration: none;
              font-weight: bold;
            }
            .confirmation-box {
              background: #f9fafb;
              border: 2px dashed #9ca3af;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .confirmation-box p {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 15px;
            }
            .confirmation-template {
              background: white;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              padding: 15px;
              font-style: italic;
              color: #374151;
              font-size: 14px;
              line-height: 1.8;
            }
            .footer {
              background: #f9fafb;
              padding: 25px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              border-top: 1px solid #e5e7eb;
            }
            .footer p {
              margin: 5px 0;
            }
            .footer strong {
              color: #374151;
            }
            
            /* Responsive Design */
            @media only screen and (max-width: 600px) {
              .container {
                margin: 10px;
                border-radius: 8px;
              }
              .header {
                padding: 30px 15px;
              }
              .header h1 {
                font-size: 24px;
              }
              .content {
                padding: 20px 15px;
              }
              .section-title {
                font-size: 14px;
                padding: 10px 12px;
              }
              .step-list li {
                font-size: 14px;
              }
              .sub-list {
                margin-left: 30px;
              }
              .contact-box {
                padding: 15px;
              }
              .confirmation-template {
                font-size: 13px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">🎉</div>
              <h1>Congratulations!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Your Application Has Been Approved</p>
            </div>
            
            <div class="content">
              <p class="greeting">Dear ${application.firstName},</p>
              
              <p class="message">
                We are pleased to inform you that your application for the <strong>Ocean Spray® Car Wrap Program</strong> has been <strong style="color: #10b981;">APPROVED</strong>!
              </p>

              <p class="message">
                We're excited to welcome you to our team of mobile brand ambassadors.
              </p>

              <div class="section-divider">
                <div class="section-title">
                  <span class="section-title-icon">📋</span>
                  <span>NEXT STEPS - PLEASE READ CAREFULLY</span>
                </div>

                <p style="font-size: 15px; color: #4b5563; margin-bottom: 20px;">
                  Your upfront payment and installation details will be sent to you within the next <strong>24-48 hours</strong>. Please monitor your email inbox (and spam folder) for important updates.
                </p>
              </div>

              <div class="info-box">
                <h3>💰 PAYMENT PROCESS OVERVIEW</h3>
                <p style="margin: 10px 0; font-size: 14px; color: #6b7280;">
                  Once you receive your compensation check:
                </p>

                <ul class="step-list">
                  <li>
                    <span class="step-number">1</span>
                    <strong style="color: #1f2937;">DEPOSIT THE CHECK</strong>
                    <ul class="sub-list">
                      <li>Deposit the check at your bank, Bank ATM, or Mobile Deposit</li>
                      <li>Allow 1-3 business days for the funds to clear</li>
                    </ul>
                  </li>

                  <li>
                    <span class="step-number">2</span>
                    <strong style="color: #1f2937;">RETAIN YOUR PAYMENT</strong>
                    <ul class="sub-list">
                      <li>Deduct $750.00 from the total amount</li>
                      <li>This is your first week's compensation - keep it!</li>
                    </ul>
                  </li>

                  <li>
                    <span class="step-number">3</span>
                    <strong style="color: #1f2937;">FORWARD REMAINING FUNDS</strong>
                    <ul class="sub-list">
                      <li>The remaining balance covers the graphic artist's installation services</li>
                      <li>You will receive detailed payment instructions via email, including:</li>
                    </ul>
                    <ul class="sub-list" style="margin-left: 50px;">
                      <li>✓ Exact amount to send</li>
                      <li>✓ Recipient information</li>
                      <li>✓ Payment method (Money Order via USPS or Walmart)</li>
                      <li>✓ Graphic artist's head office address</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="checkmark-list">
                <div class="section-title" style="background: #dc2626; margin-bottom: 15px;">
                  <span class="section-title-icon">⚠️</span>
                  <span>IMPORTANT REMINDERS</span>
                </div>
                <ul>
                  <li><span class="checkmark">✓</span><span>Check your email daily for updates and instructions</span></li>
                  <li><span class="checkmark">✓</span><span>Respond promptly to all communications from our team</span></li>
                  <li><span class="checkmark">✓</span><span>Keep all payment receipts and documentation</span></li>
                  <li><span class="checkmark">✓</span><span>Contact us immediately if you have any questions or concerns</span></li>
                </ul>
              </div>

              <div class="contact-box">
                <h3>📞 NEED ASSISTANCE?</h3>
                <p style="color: #4b5563; margin: 10px 0;">Our support team is here to help you every step of the way.</p>
                <div class="contact-info">
                  <strong>Email:</strong> <a href="mailto:${
                    process.env.EMAIL_USER
                  }">${process.env.EMAIL_USER}</a>
                </div>
                <div class="contact-info">
                  <strong>Available:</strong> 24/7
                </div>
              </div>

              <div class="confirmation-box">
                <p style="font-weight: bold; color: #1f2937; font-size: 15px;">
                  ✉️ CONFIRMATION REQUIRED:
                </p>
                <p>
                  To proceed with your application and payment processing, please reply to this email with the following confirmation:
                </p>
                <div class="confirmation-template">
                  "I, [Your Full Name], confirm that I have received and understand the payment process outlined above. I agree to follow all instructions provided by the Ocean Spray team."
                </div>
              </div>

              <p style="margin-top: 30px; color: #4b5563; font-size: 15px;">
                We look forward to working with you and seeing your vehicle showcase the Ocean Spray® brand!
              </p>

              <p style="margin-top: 25px; color: #374151;">
                Best regards,<br><br>
                <strong style="color: #1f2937;">Peterson Bruno</strong><br>
                <span style="color: #6b7280;">Hiring Manager</span><br>
                <span style="color: #2563eb; font-weight: 600;">Ocean Spray® Car Wrap Program</span>
              </p>
            </div>

            <div class="footer">
              <p><strong>Ocean Spray® Car Wrap Program</strong></p>
              <p>One Ocean Spray Drive</p>
              <p>Lakeville-Middleboro, MA 02349</p>
              <p style="margin-top: 10px;"><a href="mailto:${
                process.env.EMAIL_USER
              }" style="color: #2563eb;">${process.env.EMAIL_USER}</a></p>
              <p style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
                This email was sent to ${
                  application.email
                } because your Ocean Spray application was approved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
      : `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .icon {
              font-size: 60px;
              margin-bottom: 15px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              padding: 40px 30px;
            }
            .status-badge {
              display: inline-block;
              background: #fee2e2;
              color: #991b1b;
              padding: 10px 20px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 14px;
              margin: 20px 0;
            }
            .footer {
              background: #f9fafb;
              padding: 25px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            @media only screen and (max-width: 600px) {
              .container {
                margin: 10px;
              }
              .content {
                padding: 20px 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">📋</div>
              <h1>Application Update</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; color: #2563eb; font-weight: bold;">Dear ${
                application.firstName
              },</p>
              
              <p style="font-size: 16px; color: #4b5563;">
                Thank you for your interest in the Ocean Spray Car Wrap Program. After careful review of your application, we regret to inform you that we are unable to move forward with your application at this time.
              </p>
              
              <div class="status-badge">📋 APPLICATION NOT APPROVED</div>
              
              <p style="font-size: 16px; color: #4b5563; margin-top: 20px;">
                This decision may be due to various factors including current program capacity, vehicle compatibility, or geographic considerations.
              </p>

              <p style="font-size: 16px; color: #4b5563;">
                We encourage you to reapply in the future as our program continues to grow and expand to new areas.
              </p>

              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <h3 style="color: #2563eb; margin-top: 0;">📞 Questions or Concerns?</h3>
                <p style="color: #4b5563; margin: 10px 0;">Contact our support team:</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
                  process.env.EMAIL_USER
                }" style="color: #2563eb;">${process.env.EMAIL_USER}</a></p>
              </div>

              <p style="margin-top: 30px; color: #4b5563;">
                Thank you for your interest in Ocean Spray Car Wrap Program.<br>
                <strong style="color: #2563eb;">The Ocean Spray Team</strong>
              </p>
            </div>

            <div class="footer">
              <p><strong>© ${new Date().getFullYear()} Ocean Spray Car Wrap Program</strong></p>
              <p>One Ocean Spray Drive, Lakeville-Middleboro, MA 02349</p>
              <p style="margin-top: 15px;">For assistance, contact us at <a href="mailto:${
                process.env.EMAIL_USER
              }" style="color: #2563eb;">${process.env.EMAIL_USER}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `✅ Status update email sent to ${application.email}:`,
      info.messageId
    );
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending status update email:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
};

export default transporter;
