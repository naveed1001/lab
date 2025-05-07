const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../Models/user');

// Request Password Reset Controller
const requestReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p style="font-size: 16px; color: #555;">
                        Hi <strong>${user.email}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        We received a request to reset your password. If you didn't request this change, please ignore this email.
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        To reset your password, click the link below:
                    </p>
                    <p>
                        <a href="http://localhost:3000/reset-password?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; font-size: 16px; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        This link will expire in 1 hour. If you have any issues, please contact support.
                    </p>
                    <p style="font-size: 14px; color: #888;">
                        If you didn't request a password reset, please disregard this email.
                    </p>
                    <footer style="font-size: 12px; color: #aaa; text-align: center; margin-top: 30px;">
                        <p>&copy; ${new Date().getFullYear()} Your Company</p>
                    </footer>
                </div>
            </body>
        </html>
    `,
        };

        await transporter.sendMail(mailOptions);
        res.send('Reset token sent to email');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).send('Token and password required');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, resetToken: token });

        if (!user || user.resetTokenExpiry < Date.now()) {
            return res.status(400).send('Invalid or expired token');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();
        res.send('Password has been reset successfully');
    } catch (error) {
        res.status(400).send('Invalid or expired token');
    }
};

module.exports = { requestReset, resetPassword };
