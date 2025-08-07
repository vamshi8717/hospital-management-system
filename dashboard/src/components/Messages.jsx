import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const [filter, setFilter] = useState("active");
	const { isAuthenticated } = useContext(Context);

	// Fetch messages from backend
	const fetchMessages = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:4000/api/v1/message/getall",
				{ withCredentials: true }
			);
			setMessages(data.messages);
		} catch (error) {
			console.error(
				error.response?.data?.message || "Failed to fetch messages"
			);
		}
	};

	useEffect(() => {
		fetchMessages();
	}, []);

	const handleArchive = async (id) => {
		try {
			await axios.put(
				`http://localhost:4000/api/v1/message/update/${id}`,
				{ status: "archived" },
				{ withCredentials: true }
			);
			toast.success("Message archived");
			fetchMessages();
		} catch (error) {
			toast.error("Error archiving message");
			console.error(error);
		}
	};

	const handleUnarchive = async (id) => {
		try {
			await axios.put(
				`http://localhost:4000/api/v1/message/update/${id}`,
				{ status: "active" },
				{ withCredentials: true }
			);
			toast.success("Message unarchived");
			fetchMessages();
		} catch (error) {
			toast.error("Error unarchiving message");
			console.error(error);
		}
	};

	if (!isAuthenticated) {
		return <Navigate to={"/login"} />;
	}

	// Calculate counts
	const activeCount = messages.filter((msg) => msg.status === "active").length;
	const archivedCount = messages.filter((msg) => msg.status === "archived").length;

	return (
		<section className="page messages">
			<div className="message-header">
				<h1>📜 Ninja Scroll Messages</h1>
				<div className="filters">
					<button
						className={filter === "active" ? "active" : ""}
						onClick={() => setFilter("active")}
					>
						🔥 Active ({activeCount})
					</button>
					<button
						className={filter === "archived" ? "active" : ""}
						onClick={() => setFilter("archived")}
					>
						🌀 Archived ({archivedCount})
					</button>
				</div>
			</div>

			<div className="banner">
				{messages &&
				messages.filter((msg) => msg.status === filter).length > 0 ? (
					messages
						.filter((msg) => msg.status === filter)
						.map((element) => (
							<div className="card naruto-card" key={element._id}>
								<div className="details">
									<p>
										<span>First Name:</span> {element.firstName}
									</p>
									<p>
										<span>Last Name:</span> {element.lastName}
									</p>
									<p>
										<span>Email:</span> {element.email}
									</p>
									<p>
										<span>Phone:</span> {element.phone}
									</p>
									<p>
										<span>Message:</span> {element.message}
									</p>
								</div>
								<div className="actions">
									{filter === "active" ? (
										<button onClick={() => handleArchive(element._id)}>
											🗂 Archive
										</button>
									) : (
										<button onClick={() => handleUnarchive(element._id)}>
											🌟 Unarchive
										</button>
									)}
								</div>
							</div>
						))
				) : (
					<h2 className="empty-message">No messages in this category 🍥</h2>
				)}
			</div>
		</section>
	);
};

export default Messages;
