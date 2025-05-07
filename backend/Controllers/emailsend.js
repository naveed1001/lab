const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,  
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD, 
    },
});

const sendConfirmationEmail = (userEmail, userName, username, password) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: userEmail,
        subject: 'Welcome to Our Platform',
        html: `
            <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Welcome to ${userName}!</h2>
                <p>We are excited to have you on board. Your account has been successfully created, and you can now start using our platform.</p>
                
                <h3>Your login details:</h3>
                <ul>
                    <li><strong>Username:</strong> ${username}</li>
                    <li><strong>Password:</strong> ${password}</li>
                    <li><strong>Email:</strong> ${userEmail}</li>

                </ul>
                
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                
                <p>Thank you for joining us. We look forward to helping you achieve your goals!</p>
                
                <footer style="margin-top: 30px; font-size: 0.9em; color: #777;">
                    <p>Best regards,</p>
                    <p>The [Teknohus] Team</p>
                    <p><a href="http://localhost:3000/home" style="color: #4CAF50;">Visit Our Platform</a></p>
                </footer>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports = { sendConfirmationEmail };
