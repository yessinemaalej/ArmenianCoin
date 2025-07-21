import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });
};

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your ArmenianToken account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Verify your email address</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #D4AF37 0%, #1E3A8A 100%); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          This link will expire in 24 hours. If you didn't request this verification, please ignore this email.
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your ArmenianToken password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Reset your password</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>You requested a password reset. Click the button below to set a new password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #D4AF37 0%, #1E3A8A 100%); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}

export async function sendTwoFactorEmail(email: string, code: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your ArmenianToken 2FA code',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Two-Factor Authentication</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <p>Your 2FA verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #D4AF37; letter-spacing: 4px; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 14px; color: #666;">
            This code will expire in 10 minutes.
          </p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          If you didn't request this code, please secure your account immediately.
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to ArmenianToken',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Welcome to our community</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>Hello ${name || 'there'},</p>
          <p>Welcome to ArmenianToken! We're thrilled to have you join our community.</p>
          <p>With ArmenianToken, you can:</p>
          <ul style="margin-top: 10px; margin-bottom: 10px;">
            <li>Support Armenian families and children in need</li>
            <li>Be part of a global Armenian community</li>
            <li>Participate in our transparent charity initiatives</li>
            <li>Hold and trade ARMT tokens</li>
          </ul>
          <p>If you have any questions, our support team is always here to help.</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.APP_URL}/dashboard" 
               style="background: linear-gradient(135deg, #D4AF37 0%, #1E3A8A 100%); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      display: inline-block;">
              Go to Dashboard
            </a>
          </div>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          "With heart, soul and by the law" - ArmenianToken Team
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}

export async function sendWalletLinkEmail(email: string, walletAddress: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Wallet Linked to Your ArmenianToken Account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Wallet Linked Successfully</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>Your Ethereum wallet has been successfully linked to your ArmenianToken account.</p>
          <div style="background: #f0f0f0; padding: 10px; border-radius: 4px; margin: 15px 0; font-family: monospace; word-break: break-all;">
            ${walletAddress}
          </div>
          <p>You can now use this wallet to:</p>
          <ul style="margin-top: 10px; margin-bottom: 10px;">
            <li>Sign in to your account</li>
            <li>Purchase and hold ARMT tokens</li>
            <li>Participate in our charity initiatives</li>
          </ul>
          <p>If you did not link this wallet to your account, please contact our support team immediately.</p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          For security reasons, you'll need to verify your wallet again if you use a different browser or device.
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}

export async function sendSecurityAlertEmail(email: string, activity: string, ipAddress?: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Security Alert - ArmenianToken Account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37;">ArmenianToken</h1>
          <p style="color: #666;">Security Alert</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p>We detected the following activity on your ArmenianToken account:</p>
          <div style="background: #fff0f0; border-left: 4px solid #ff5555; padding: 10px; margin: 15px 0;">
            <p style="margin: 0; color: #333;"><strong>${activity}</strong></p>
            ${ipAddress ? `<p style="margin: 5px 0 0; font-size: 14px; color: #666;">IP Address: ${ipAddress}</p>` : ''}
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">Time: ${new Date().toUTCString()}</p>
          </div>
          <p>If this was you, no action is needed.</p>
          <p>If you did not perform this action, please secure your account immediately:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.APP_URL}/profile/settings" 
               style="background: #ff5555; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      display: inline-block;">
              Secure My Account
            </a>
          </div>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          ArmenianToken takes your account security seriously. If you need assistance, please contact our support team.
        </p>
      </div>
    `
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
}