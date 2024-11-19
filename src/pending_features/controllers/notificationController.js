const nodemailer = require('nodemailer');

const notificationController = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }),

    sendEmail: async (req, res) => {
        try {
            const { to, subject, text } = req.body;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text
            };

            await this.transporter.sendMail(mailOptions);

            res.status(200).json({
                message: 'Email sent successfully'
            });
        } catch (error) {
            console.error('Send email error:', error);
            res.status(500).json({
                message: 'Error sending email',
                error: error.message
            });
        }
    },

    // You can add more notification-related methods here
    // For example:
    sendPasswordResetEmail: async (req, res) => {
        try {
            const { to, resetToken } = req.body;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: 'Password Reset Request',
                text: `Here is your password reset token: ${resetToken}`
            };

            await this.transporter.sendMail(mailOptions);

            res.status(200).json({
                message: 'Password reset email sent successfully'
            });
        } catch (error) {
            console.error('Password reset email error:', error);
            res.status(500).json({
                message: 'Error sending password reset email',
                error: error.message
            });
        }
    }
};

module.exports = notificationController;
