function Header({ name }) {
  return (
    <header
      style={{
        backgroundColor: "#000000",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          color: "white",
          margin: "0",
          fontSize: "50px",
        }}
      >
        Student Portfolio
      </h1>

      <h2
        style={{
          color: "white",
          marginTop: "15px",
          fontSize: "32px",
          fontWeight: "normal",
        }}
      >
        {name}
      </h2>
    </header>
  );
}

export default Header;