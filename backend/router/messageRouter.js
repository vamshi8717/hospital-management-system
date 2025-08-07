import express from "express";
import {
	getAllMessages,
	sendMessage,
	updateMessageStatus,
} from "../controllers/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);
router.put("/update/:id", isAdminAuthenticated, updateMessageStatus); // ✅ NEW ROUTE

export default router;
