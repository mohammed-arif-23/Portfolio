import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Server configuration error. Please contact the site administrator.' 
        },
        { status: 500 }
      );
    }

    // Configure nodemailer transporter with timeout
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Only for development, should be true in production
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Verify transporter configuration with timeout
    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('SMTP connection timeout')), 30000)
        )
      ]);
    } catch (verifyError: any) {
      console.error('SMTP configuration error:', verifyError);
      // Provide more specific error messages
      if (verifyError.code === 'ESOCKET') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Unable to connect to email server. Please check SMTP settings or try again later.' 
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { 
          success: false, 
          error: `Email service configuration error: ${verifyError.message || 'Unknown error'}` 
        },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
    };

    // Send email with timeout
    try {
      await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email sending timeout')), 30000)
        )
      ]);
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (sendError: any) {
      console.error('Email sending error:', sendError);
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to send email: ${sendError.message || 'Unknown error'}` 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: `Failed to process request: ${error.message || 'Unknown error'}` }, 
      { status: 500 }
    );
  }
}