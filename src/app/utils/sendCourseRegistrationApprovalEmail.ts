/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

export const sendCourseRegistrationApprovalEmail = async (
  to: string,
  studentName: string,
  studentId: any,
  courses: { name: string; credits: number }[],
  departmentName: string,
  sessionName: string,
  sessionYear: string,
  semester: string,
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

  // Generate HTML for courses table
  const coursesHtml = courses
    .map(
      (c, idx) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${idx + 1}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${c.name}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align:center;">${c.credits}</td>
    </tr>
  `
    )
    .join('');

  const htmlContent = `
  <div style="font-family: 'Sansita', Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="text-align: center; padding: 30px;">
        <img src="https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg" alt="University Logo" style="width: 120px; margin-bottom: 20px;" />
        <h1 style="font-size: 24px; color: #1a202c; margin-bottom: 10px;">🎉Course Registration Approved!</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.5;">
          Dear <strong>${studentName}</strong> (ID: <strong>${studentId}</strong>),<br/>
          Your  course registration for <strong >${departmentName}</strong> in the <strong >${sessionName} ${sessionYear}</strong> session, <strong >Semester ${semester}</strong> has been successfully approved.
        </p>

        <h3 style="text-align: left; color: #1a202c; margin-top: 20px;">Your Courses:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd;">#</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Course Name</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Credits</th>
            </tr>
          </thead>
          <tbody>
            ${coursesHtml}
          </tbody>
        </table>

       

      </div>
    </div>

    <p style="text-align: center; color: #a0aec0; font-size: 12px; margin-top: 20px;">
      &copy; ${new Date().getFullYear()} State UNIVERSITY. All rights reserved.
    </p>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"State UNIVERSITY" <${config.from_email}>`,
      to,
      subject: `🎓 ${studentName}, Your Course Registration is Approved!`,
      html: htmlContent,
    });
    console.log('✅ Email sent successfully to:', to);
  } catch (err: any) {
    console.error('❌ Failed to send email:', err.message);
  }
};
