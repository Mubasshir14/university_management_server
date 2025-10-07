/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

export const sendStudentApprovalEmail = async (
  to: string,
  courseRegistration: string,
  departmentName: any,
  sessionName: any,
  sessionYear: any,
  year: any,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.from_email,
      pass: config.from_pass,
    },
  });

  // HTML email template
  const htmlContent = `
  <div style="font-family: 'Sansita', Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="text-align: center; padding: 30px;">
        <img src="https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg" alt="University Logo" style="width: 120px; font-family: 'Sansita'; margin-bottom: 20px;" />
        <h1 style="font-size: 24px; font-family: 'Sansita'; color: #1a202c; margin-bottom: 10px;">Welcome to State UNIVERSITY!</h1>
        <p style="color: #4a5568; font-size: 16px; font-family: 'Sansita'; line-height: 1.5;">
          Congratulations! Your registration for <strong style="color:linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);">Department:${departmentName}</strong> in the <strong style="color:linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);">Session: ${sessionName} ${sessionYear}</strong>, <strong style="color:linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);">Semester: ${year}</strong>, has been successfully approved. You can now select your courses and complete your course registration.
        </p>
        <a href="${courseRegistration}"
           style="display: inline-block; margin-top: 25px; padding: 12px 30px; font-size: 16px; font-weight: 600; color: #fff; text-decoration: none; border-radius: 8px; background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899); transition: all 0.3s; font-family: 'Sansita';">
          Course Registration
        </a>
      </div>
    </div>
    <p style="text-align: center; font-family: 'Sansita'; color: #a0aec0; font-size: 12px; margin-top: 20px;">
      &copy; ${new Date().getFullYear()} State UNIVERSITY. All rights reserved.
    </p>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"State UNIVERSITY" <${config.from_email}>`,
      to,
      subject: `🎓 Registration Approved – Welcome to ${departmentName}!`,
      html: htmlContent,
    });
    console.log('✅ Email sent successfully to:', to);
  } catch (err: any) {
    console.error('❌ Failed to send email:', err.message);
  }
};

