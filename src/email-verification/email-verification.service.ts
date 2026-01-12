// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log(',,,,,.......', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      passExists: !!process.env.SMTP_PASSWORD,
    });
  }

  /**
   * Send a generic email
   */
  async sendMail({
    to,
    subject,
    html,
    text,
  }: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'No-reply@zylospace.com',
        to,
        subject,
        html,
        text,
      });
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'No-reply@zylospace.com',
      to: email,
      subject: 'Your OTP for Email Verification',
      text: `
        Zylospace Account Verification
        
        Your One-Time Password (OTP) is: ${otp}
        
        This code will expire in 5 minutes. Please don't share this code with anyone.
        
        If you didn't request this code, please ignore this email or contact our support team.
        
        Thanks,
        The Zylospace Team
      `,
      html: `
              <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zylospace Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f6; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f6; padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px; border-bottom:1px solid #eeeeee;">
              <img src="https://www.zylospace.com/images/logo-transparent.png" alt="Zylospace" width="140" style="display:block; margin-bottom:10px;" />
              <h2 style="margin:0; color:#2c3e50;">Email Verification</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin-top:0;">Hello 👋,</p>

              <p>
                We received a request to verify your email address for your
                <strong>Zylospace</strong> account. Please use the verification code below:
              </p>

              <!-- OTP -->
              <div style="text-align:center; margin:24px 0;">
                <span style="
                  display:inline-block;
                  background-color:#f5f7fa;
                  padding:16px 28px;
                  font-size:26px;
                  letter-spacing:4px;
                  font-weight:bold;
                  color:#2c3e50;
                  border-radius:6px;
                  border:1px dashed #dcdcdc;
                ">
                  ${otp}
                </span>
              </div>

              <p style="text-align:center; font-size:14px; color:#555;">
                ⏳ This code will expire in <strong>5 minutes</strong>
              </p>

              <p>
                If you did not request this verification, please ignore this email
                or contact our support team immediately at
                <a href="mailto:contact@zylospace.com" style="color:#4CAF50; text-decoration:none;">
                  contact@zylospace.com
                </a>.
              </p>

              <p style="margin-bottom:0;">
                Thanks for choosing <strong>Zylospace</strong> 🚀
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px; background-color:#fafafa; border-top:1px solid #eeeeee; font-size:12px; color:#777;">
              <p style="margin:4px 0;">
                © ${new Date().getFullYear()} Zylospace. All rights reserved.
              </p>
              <p style="margin:4px 0;">
                1141 F-Block, State Life Housing Society, Lahore, Pakistan
              </p>
              <p style="margin:6px 0;">
                <a href="https://zylospace.com" style="color:#4CAF50; text-decoration:none;">Website</a> |
                <a href="https://zylospace.com/about" style="color:#4CAF50; text-decoration:none;">About Us</a>
              </p>
                </td>
              </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
