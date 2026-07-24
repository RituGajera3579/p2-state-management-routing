function RepoList({ repos }) {
  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>
        GitHub Repositories
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {repos.map((repo) => (
          <li
            key={repo.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{repo.name}</h3>

            <p>
              ⭐ Stars: {repo.stargazers_count}
            </p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {repo.html_url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;