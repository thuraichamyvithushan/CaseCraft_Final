import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"]
        },
        email: {
            type: String,
            required: [true, "Please provide an email"]
        },
        phone: {
            type: String
        },
        comment: {
            type: String,
            required: [true, "Please provide a message"]
        },
        status: {
            type: String,
            enum: ["new", "read", "replied"],
            default: "new"
        }
    },
    { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
