import React, { useState } from "react";

const MessageComposer: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    // Send message to Firestore
    setMessage("");
  };

  return (
    <div className="message-composer">
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message"
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageComposer;
