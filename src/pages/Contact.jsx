import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h2>Contact Me</h2>
    <button
        onClick={() => setShowHelp(!showHelp)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        {showHelp ? "Hide Help" : "Show Help"}
      </button>

      {showHelp && (
        <p>Please enter your message below.</p>
      )}

      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />

      <h3>Your Message</h3>

      <p>{message}</p>

      <p>Characters: {message.length}</p>
    </div>
  );
}

export default Contact;