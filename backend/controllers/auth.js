const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await authModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
            },
            process.env.JWT_SECRET
        );
        res.status(201).json({
            success: true,
            user: result,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await authModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const matchedPassword = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!matchedPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET
        );
        res.status(200).json({ success: true, user: existingUser, token, msg:"user logged in succesfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

const sendResetPasswordEmail = async (email, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Reset Your Password",
            html: `<p>Hello,</p><p>Please click on the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Reset password link sent to ${email}`);
    } catch (error) {
        console.error("Error sending reset password email:", error.message);
    }
};
const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await authModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const resetToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiry = Date.now() + 3600000
        await user.save()

        await sendResetPasswordEmail(email, resetToken)

        res.status(200).json({ message: 'password reset token send to your email' })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
}
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const user = await authModel.findOne({ resetPasswordToken: token, resetPasswordTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null;
        await user.save();
        // Send a password reset success notification to the user's email
        const resetEmail = user.email;
        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: resetEmail,
            subject: "Password Reset Successful",
            html: `<p>Hello,</p><p>Your password has been successfully reset. You can now log in with your new password.</p>`,
        };
        // Replace the following email configuration with your SMTP settings
        const transporter = nodemailer.createTransport({
            // host: "smtp.example.com",
            service:'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        await transporter.sendMail(mailOptions);
        console.log("Reset Token:", token);
        console.log(`Password reset success email sent to ${resetEmail}`);
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
}
const logout = (req, res) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    res.json({ token });
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
