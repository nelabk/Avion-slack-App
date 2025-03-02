import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { sendMessage, retrieveUserMessages } from "../lib/api";
import GeneralLayout from "../components/layout/GeneralLayout";
import { getAllUsers } from "../lib/api";

function Messages({ directMsgUser, onDirectMsgUserChange }) {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  console.log("messages:", messages);
  const [message, setMessage] = useState("");
  const [allUsersDm, setAllUsersDm] = useState([]);
  console.log("allUsersDm:", allUsersDm);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsersDm(users.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await retrieveUserMessages(userId);
      setMessages(messagesData.data);
    };
    fetchMessages();
  }, [userId]);

  const getUserEmail = () => {
    console.log("User id:", userId);
    const numericUserId = Number(userId);
    const user = allUsersDm.find((user) => user.id === numericUserId);
    console.log("user:", user);
    return user ? user.email : "User not found";
  };

  function getInitials(email) {
    const initials = email.slice(0, 1).toUpperCase();
    return initials;
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(userId, "User", message);
      setMessage("");

      const messagesData = await retrieveUserMessages(userId);
      setMessages(messagesData.data);
      onDirectMsgUserChange(getUserEmail());
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <GeneralLayout
      message={message}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
      directMsgUser={directMsgUser}
      messages={messages}
    >
      <div>
        <div className="flex">
          <h1 className="text-2xl">
            <strong>{getUserEmail()}</strong>
          </h1>
        </div>

        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id}>
              <div className="flex">
                <div className="bg-neutral-400 w-12 h-12 items-center justify-center flex m-2 rounded-full">
                  {getInitials(msg.sender.email)}
                </div>
                <div className="m-2">
                  <p>
                    <strong>{msg.sender.email}</strong>
                  </p>
                  <p>{msg.body}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </GeneralLayout>
  );
}

export default Messages;
