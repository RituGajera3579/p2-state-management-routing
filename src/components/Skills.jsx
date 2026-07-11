function Skills({ skillList }) {
  return (
    <div
      id="skills"
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2>Skills</h2>

      <ul
        style={{
          display: "inline-block",
          textAlign: "left",
        }}
      >
        {skillList.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;