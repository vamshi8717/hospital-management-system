import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minLength: [3, "firstname should contain atleast 3 letters"],
	},
	lastName: {
		type: String,
		required: true,
		minLength: [3, "lastname should contain atleast 3 letters"],
	},
	email: {
		type: String,
		required: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	phone: {
		type: String,
		required: true,
		validate: [validator.isNumeric, "Please enter digits only"],
		minLength: [10, "Number should be exactly 10 digits"],
		maxLength: [10, "Number should be exactly 10 digits"],
	},
	message: {
		type: String,
		required: true,
		minLength: [10, "Message should contain atleast 10 letters"],
	},
	status: {
		type: String,
		enum: ["active", "archived"],
		default: "active",
	},
});

export const Message = mongoose.model("Message", messageSchema);
