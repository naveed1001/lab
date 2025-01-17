const nodemailer = require("nodemailer");
const SavedRecord = require("../Models/Records");

const saveRecords = async (req, res) => {
    const { type, data, email } = req.body;

    if (!type || !Array.isArray(data) || !email) {
        return res.status(400).json({ message: "Invalid input" });
    }
    try {
        const savedRecord = new SavedRecord({ type, data });
        await savedRecord.save();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
       
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email, 
            subject: "Your Order Created Successfully",
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                            }
                            .header {
                                background-color: #007bff;
                                color: white;
                                padding: 10px;
                                text-align: center;
                            }
                            .content {
                                margin: 20px;
                            }
                            .order-details {
                                border: 1px solid #ddd;
                                padding: 15px;
                                border-radius: 5px;
                                margin-bottom: 20px;
                                background-color: #f9f9f9;
                            }
                            .order-details h3 {
                                margin-top: 0;
                            }
                            .footer {
                                text-align: center;
                                color: #777;
                                font-size: 12px;
                                margin-top: 30px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Order Created Successfully</h2>
                        </div>
                        <div class="content">
                            <p>Dear Customer,</p>
                            <p>Your order has been created successfully with the following details:</p>
                            <div class="order-details">
                                <h3>Order Details:</h3>
                                <ul>
                                    ${data.map((test) => `<li><strong>${test.testName}</strong></li>`).join('')}
                                </ul>
                            </div>
                            <p>Thank you for choosing our service!</p>
                            <p>Best Regards,<br>Your Company</p>
                        </div>
                        <div class="footer">
                            <p>© 2025 Your Company. All rights reserved.</p>
                        </div>
                    </body>
                </html>
            `,
        };
        
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "Records saved successfully, and email sent.",
            savedRecord,
        });
    } catch (error) {
        console.error("Error saving records or sending email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    saveRecords,
};
