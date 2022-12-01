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
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
}

//message to be passed to the mailer
//   const message = {
//     from: '',
//     to: '',
//     subject: '',
//     text: '',
//     html: ''
//   };
