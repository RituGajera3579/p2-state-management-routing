import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "#4B5563",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 30px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Home
      </Link>

      <Link
        to="/projects"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 30px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Projects
      </Link>

      <Link
        to="/contact"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 30px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Contact
      </Link>
    </nav>
  );
}

export default NavBar;