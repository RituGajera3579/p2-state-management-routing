import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

function App() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
  ];

  return (
    <div>
      <Header
        name="Ritu Gajera"
        themeColor="black"
      />

      <NavBar />

      <About />

      <Skills skillList={skills} />

      <Footer email="ritu@example.com" />
    </div>
  );
}

export default App;

export default App;