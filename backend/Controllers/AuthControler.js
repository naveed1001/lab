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
            name,
            role
        } = req.body;

        console.log("req.body ", req.body);

        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         message: "Passwords do not match.",
        //         success: false
        //     });
        // }

        const fullName = name || `${firstName} ${lastName}`.trim();
        if (!fullName) {
            return res.status(400).json({
                message: "Name is required.",
                success: false
            });
        }

        const existingUser = await UserModel.findOne({ email });
        console.log("existingUser ", existingUser);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists. You can login.",
                success: false
            });
        }

        const userRole = assignRoles || role || 'user';

        // if (req.user) {
        //     console.log("Authenticated user registration, req.user:", req.user);
        //     const loggedInUser = req.user;

        //     if (loggedInUser.role !== 'admin' && userRole === 'admin') {
        //         return res.status(403).json({
        //             message: "Only admins can create another admin.",
        //             success: false
        //         });
        //     }
        // } else {
        //     console.log("Public registration (no token), assigning 'user' role");
        // }

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
            role: userRole,
            status,
            password
        });

        console.log("newUser", newUser);

        // Send confirmation email with username and password
        sendConfirmationEmail(newUser.email, newUser.firstName, newUser.username, password);

        try {
            newUser.password = await bcrypt.hash(password, 10);
        } catch (error) {
            console.error("Error hashing password", error);
            return res.status(500).json({
                message: 'Error hashing password',
                success: false
            });
        }

        await newUser.save();

        res.status(201).json({
            message: 'Signup successful',
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
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
