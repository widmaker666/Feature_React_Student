import React from "react";

function SendMessageToStudent({ studentEmail }) {
  const handleSendMessage = () => {
    window.location.href = `mailto:${studentEmail}`;
  };

  return (
    <button className="email-btn" onClick={handleSendMessage}>Send a Email</button>
  );
}

export default SendMessageToStudent;
