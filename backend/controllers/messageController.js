import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, phone, message } = req.body;

	if (!firstName || !lastName || !email || !phone || !message) {
		return next(new ErrorHandler("Plese fill Full form", 400));
	}

	await Message.create({ firstName, lastName, email, phone, message });

	res.status(200).json({
		success: true,
		message: "Form submiteed successfully",
	});
});

export const updateMessageStatus = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const { status } = req.body;

	if (!["active", "archived"].includes(status)) {
		return next(new ErrorHandler("Invalid status value", 400));
	}

	const message = await Message.findById(id);

	if (!message) {
		return next(new ErrorHandler("Message not found", 404));
	}

	message.status = status;
	await message.save();

	res.status(200).json({
		success: true,
		message: `Message marked as ${status}`,
	});
});


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
	const messages = await Message.find();
	res.status(200).json({
		success: true,
		message: "fetching all messages",
		messages,
	});
});
