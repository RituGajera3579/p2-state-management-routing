import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Header name="Ritu Gajera" />

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;