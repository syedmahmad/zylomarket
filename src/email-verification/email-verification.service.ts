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
        pass: process.env.SMPT_PASSWORD,
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'team@zylospace.com',
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
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Zylospace Verification</title>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eaeaea; }
                .logo { max-width: 150px; }
                .content { padding: 20px 0; }
                .otp-code { 
                    font-size: 24px; 
                    letter-spacing: 3px; 
                    padding: 15px 20px; 
                    background: #f5f5f5; 
                    display: inline-block; 
                    margin: 15px 0; 
                    border-radius: 4px;
                    color: #2c3e50;
                    font-weight: bold;
                }
                .footer { 
                    margin-top: 30px; 
                    padding-top: 20px; 
                    border-top: 1px solid #eaeaea; 
                    font-size: 12px; 
                    color: #777; 
                    text-align: center;
                }
                .button {
                    background-color: #4CAF50;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 15px 0;
                    cursor: pointer;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="https://www.zylospace.com/images/logo-transparent.png" alt="Zylospace Logo" class="logo">
                <h2>Account Verification</h2>
            </div>
            
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to verify your email address. Your one-time verification code is:</p>
                
                <div class="otp-code">${otp}</div>
                
                <p>This code will expire in <strong>5 minutes</strong>. Please enter this code in the verification page to complete the process.</p>
                
                <p>If you didn't request this code, please ignore this email or contact our support team immediately at <a href="mailto:contact@zylospace.com">contact@zylospace.com</a>.</p>
                
                <p>Thank you for choosing Zylospace!</p>
            </div>
            
            <div class="footer">
                <p>© ${new Date().getFullYear()} Zylospace. All rights reserved.</p>
                <p>Zylospace, 1141 F-Block State Life Housing Society, Lahore, Pakistan</p>
                <p><a href="https://zylospace.com">Business Site</a> | <a href="https://zylospace.com/about">About Us</a></p>
            </div>
        </body>
        </html>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
