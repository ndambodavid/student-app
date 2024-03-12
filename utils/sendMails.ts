
// import path from 'path';
// import axios from 'axios';
// import { config } from 'dotenv';
// config();

// interface EmailOptions {
//     email: string;
//     subject: string;
//     template?: string;
//     data: { [key: string]: any };
// }

// const sendMail = async (options: EmailOptions): Promise<void> => {
//     // const transporter: Transporter = nodemailer.createTransport({
//     //     host: process.env.SMTP_HOST,
//     //     port: parseInt(process.env.SMTP_PORT || '587'),
//     //     service: process.env.SMTP_SERVICE,
//     //     auth: {
//     //         user: process.env.SMTP_MAIL,
//     //         pass: process.env.SMTP_PASSWORD
//     //     }
//     // });
//     // const {email, subject, template, data} = options;

//     // // get the path to email template file
//     // const templatePath = path.join(__dirname, '../mails',  template);

//     // //render the mail template with ejs
//     // const html:string = await ejs.renderFile(templatePath,data);

//     // const mailOptions = { 
//     //     from: process.env.SMTP_MAIL,
//     //     to: email,
//     //     subject,
//     //     html
//     // };
//     // await transporter.sendMail(mailOptions);

//     // axios.post('http://localhost:4100/mails/edhana-otp', options)
//     //  .then((response: any) => {
//     //     console.log('Response: ', response)
//     //  })
//     //  .catch((error: any) => {
//     //     console.log('Error: ', error)
//     //  })
//     // Create a transporter object using SMTP transport
//     const transporter: Transporter = nodemailer.createTransport({
//         host: 'mail.vincowoods.com', // Your SMTP server host
//         port: 465, // SMTP port (typically 587 for TLS or 465 for SSL)
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'edhana@vincowoods.com', // Your email address
//             pass: '#G4oxI+J,_+m' // Your email password or app-specific password if using Gmail
//         }
//     });

//     // Define email options
//     const mailOptions = {
//         from: String(process.env.SMTP_MAIL), // Sender address
//         to: options.email, // List of recipients
//         subject: options.subject, // Subject line
//         text: options.data.code // Plain text body
//         // You can also include html: '<h1>This is a test email</h1>' for HTML body
//     };

//     try {
//         // Send email
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.messageId);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }

// export default sendMail;