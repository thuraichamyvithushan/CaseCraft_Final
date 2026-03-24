import express from "express";
import {
    submitContactForm,
    getContactMessages,
    updateMessageStatus,
    deleteContactMessage,
    replyToMessage
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.post("/", submitContactForm);

// Admin
router.get("/admin", protect, adminOnly, getContactMessages);
router.patch("/admin/:id", protect, adminOnly, updateMessageStatus);
router.post("/admin/:id/reply", protect, adminOnly, replyToMessage);
router.delete("/admin/:id", protect, adminOnly, deleteContactMessage);

export default router;
