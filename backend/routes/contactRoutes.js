import express from "express";
import {
    submitContactForm,
    getContactMessages,
    updateMessageStatus,
    deleteContactMessage
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public route to submit contact form
router.post("/", submitContactForm);

// Admin routes
router.get("/admin", protect, adminOnly, getContactMessages);
router.patch("/admin/:id", protect, adminOnly, updateMessageStatus);
router.delete("/admin/:id", protect, adminOnly, deleteContactMessage);

export default router;
