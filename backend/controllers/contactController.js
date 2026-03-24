import ContactMessage from "../models/contactMessage.js";
import sendEmail from "../utils/sendEmail.js";


export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, comment } = req.body;

        if (!email || !comment) {
            return res.status(400).json({ message: "Please provide email and message" });
        }

        const newMessage = await ContactMessage.create({
            name,
            email,
            phone,
            comment
        });

        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        const emailSubject = `New Contact Form Submission from ${name}`;
        const emailHtml = `
      <h3>New Message Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${comment}</p>
    `;

        try {
            await sendEmail({
                to: adminEmail,
                subject: emailSubject,
                html: emailHtml
            });
        } catch (emailError) {
            console.error("Error sending admin notification email:", emailError);
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteContactMessage = async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const replyToMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;

        if (!replyMessage) {
            return res.status(400).json({ message: "Reply message is required" });
        }

        const message = await ContactMessage.findById(id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        try {
            await sendEmail({
                to: message.email,
                subject: "Re: Inquiry from CaseCraft",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 12px;">
                        <h2 style="color: #02225b; border-bottom: 2px solid #FFC107; padding-bottom: 10px;">CaseCraft Response</h2>
                        <p>Hi ${message.name},</p>
                        <p>Thank you for reaching out to us. Here is our response to your inquiry:</p>
                        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #02225b; margin: 20px 0; font-style: italic;">
                            ${replyMessage}
                        </div>
                        <p>For your reference, your original message was:</p>
                        <p style="color: #64748b; font-size: 0.9em; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                            ${message.comment}
                        </p>
                        <p style="margin-top: 30px;">Best regards,<br>The CaseCraft Team</p>
                    </div>
                `
            });

            message.status = "replied";
            await message.save();

            res.status(200).json({
                success: true,
                message: "Reply sent successfully",
                data: message
            });
        } catch (emailError) {
            console.error("Error sending reply email:", emailError);
            res.status(500).json({ message: "Failed to send email" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
