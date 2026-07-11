function NavBar() {
  return (
    <nav
      style={{
        textAlign: "center",
        padding: "15px",
      }}
    >
      <a
        href="#about"
        style={{
          margin: "0 15px",
          color: "black",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        About
      </a>

      <a
        href="#skills"
        style={{
          margin: "0 15px",
          color: "black",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Skills
      </a>

      <a
        href="#contact"
        style={{
          margin: "0 15px",
          color: "black",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Contact
      </a>
    </nav>
  );
}

export default NavBar;