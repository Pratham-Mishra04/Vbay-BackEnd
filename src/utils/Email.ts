// import * as nodemailer from 'nodemailer';
// import * as path from 'path';
// import * as hbs from 'nodemailer-express-handlebars';

// errors in Emails

// interface Values {
//   email: string;
//   subject: string;
//   body: string;
// }

// const sendEmail = async (values: Values): Promise<void> => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const handlebarOptions: hbs.ExpressHandlebarsOptions = {
//     viewEngine: {
//       extName: '.handlebars',
//       partialsDir: path.resolve('./utils/email_templates'),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve('./utils/email_templates'),
//     extName: '.handlebars',
//   };

//   transporter.use('compile', hbs(handlebarOptions));

//   const mailOptions: nodemailer.SendMailOptions = {
//     from: `Some User`,
//     to: values.email,
//     subject: values.subject,
//     template: 'forgotPassword',
//     context: {
//       mainText: values.body,
//     },
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;
