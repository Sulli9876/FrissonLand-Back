import nodemailer from 'nodemailer';
import HTTPError from '../errors/httpError.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

transporter.verify().then(() => {
    console.log('Ready for messages');
});

const contactController = {


    async sendEmail(req, res) {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            throw new HTTPError(400, 'All fields are required');
        }
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.MAIL_USER, // L’adresse qui reçoit le message
            subject: `[Contact Zombieland] ${subject}`,
            text: `
        Vous avez reçu un message depuis le formulaire de contact Zombieland :
        
        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}
        
        Message:
        ${message}
        
            `,
            html: `
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sujet:</strong> ${subject}</p>
                <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            `,
            replyTo: email
          };

          try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: 'Email sent successfully' });
          } catch (error) {
            console.error('Error sending email:', error);
            throw new HTTPError(500, 'Error sending email');
          }
    }






    

}

export default contactController