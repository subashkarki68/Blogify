const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const mail = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: '"Blogify" <support@blogify.com>',
    to,
    subject,
    html: `<b>${message}</b>`,
  });
  return info.messageId;
};

module.exports = { mail };
