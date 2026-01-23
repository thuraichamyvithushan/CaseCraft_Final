import ContactMessage from "../models/ContactMessage.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
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

        // Send email to admin
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
            // We don't return error here because the message is already saved in DB
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

// @desc    Get all contact messages
// @route   GET /api/admin/contacts
// @access  Private/Admin
export const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update message status
// @route   PATCH /api/admin/contacts/:id
// @access  Private/Admin
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

// @desc    Delete a message
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
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
