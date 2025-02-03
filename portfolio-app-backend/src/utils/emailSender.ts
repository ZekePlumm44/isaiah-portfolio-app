import nodemailer from 'nodemailer';

const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  text: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({ from, to, subject, text });
};

export default sendEmail;
