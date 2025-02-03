import { Request, Response } from 'express';
import sendEmail from '../utils/emailSender';

export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    await sendEmail(email, process.env.EMAIL_TO || '', `Message from ${name}`, message);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
