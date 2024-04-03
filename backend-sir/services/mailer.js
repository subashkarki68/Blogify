const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mail = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: '"Raktim Shrestha" <raktim@rumsan.com>',
    to,
    subject,
    html: `<b>${message}</b>`,
  });
  return info.messageId;
};

module.exports = { mail };
