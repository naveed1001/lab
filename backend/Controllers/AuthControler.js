const UserModel = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../Controllers/emailsend');

// Signup Controller
const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            name,
            practiceName,
            phone,
            streetAddress,
            city,
            state,
            zip,
            email,
            username,
            assignRoles,
            status,
            password,
            confirmPassword,
            role
        } = req.body;

        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         message: "Passwords do not match.",
        //         success: false
        //     });
        // }

        const fullName = name || `${firstName} ${lastName}`.trim();
        if (!fullName) {
            return res.status(400).json({
                message: "First name and last name are required.",
                success: false
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists. You can login.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            firstName,
            lastName,
            name: fullName,
            practiceName,
            phone,
            streetAddress,
            city,
            state,
            zip,
            email,
            username,
            role: assignRoles || role || 'user',
            status: status || 'Active',
            password: hashedPassword
        });

        await newUser.save();

        try {
            await sendConfirmationEmail(newUser.email, newUser.firstName, newUser.username, password);
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr.message);
            // We won't fail signup if email fails — optional: inform the user about this
        }

        res.status(201).json({
            message: 'Signup successful',
            success: true,
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({
            message: error.message || 'Internal server error',
            success: false,
        });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found. Please sign up.",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials. Please try again.",
                success: false
            });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({
            message: "Login successful",
            success: true,
            token: token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};



module.exports = { signup, login };
