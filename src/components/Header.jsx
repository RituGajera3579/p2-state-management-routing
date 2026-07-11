function Header({ name, themeColor }) {
  return (
    <header
      style={{
        backgroundColor: themeColor,
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "white" }}>Student Portfolio</h1>

      <h2 style={{ color: "white" }}>{name}</h2>
    </header>
  );
}

export default Header;