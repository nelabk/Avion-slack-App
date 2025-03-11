import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  retrieveChannelMessages,
  getAllUsersChannels,
  sendMessage,
} from "../lib/api";
import GeneralLayout from "../components/layout/GeneralLayout";

function Channels() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllUsersChannels();
        const channels = response.data;
        const channel = channels.find((channel) => channel.id === parseInt(id));
        setChannelName(channel ? channel.name : `Channel ${id}`);

        const messagesData = await retrieveChannelMessages(id);
        setMessages(messagesData.data);
      } catch (error) {
        console.error("Error fetching channel or messages", error);
      }
    }

    fetchData();
  }, [id]);

  function getInitials(email) {
    const initials = email.slice(0, 1).toUpperCase();
    return initials;
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(id, "Channel", message);
      setMessage("");

      const messagesData = await retrieveChannelMessages(id);
      setMessages(messagesData.data);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <GeneralLayout
      message={message}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
    >
      <div>
        <div className="flex">
          <h1 className="text-2xl">
            <strong>{channelName}</strong>
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

export default Channels;
