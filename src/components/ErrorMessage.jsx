function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h2 style={{ color: "red" }}>
        Error: {message}
      </h2>

      <button
        onClick={onRetry}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;