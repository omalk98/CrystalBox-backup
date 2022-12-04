import { createTransport } from 'nodemailer';

export default function sendMail(message) {
  const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });

  transporter.sendMail(
    { from: process.env.MAIL_ADDRESS, ...message },
    (err) => {
      if (err) throw 400;
    }
  );
}
