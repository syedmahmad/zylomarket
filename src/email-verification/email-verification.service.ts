// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: 'devm.ahmad@gmail.com',
        pass: 'hiqyjcxbarvcgwuh',
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'devm.ahmad@gmail.com',
      to: email,
      subject: 'Your OTP for Email Verification',
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}