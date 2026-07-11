function Footer({ email }) {
  return (
    <footer
      id="contact"
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p>Contact: {email}</p>

      <p>© 2026 Student Portfolio</p>
    </footer>
  );
}

export default Footer;