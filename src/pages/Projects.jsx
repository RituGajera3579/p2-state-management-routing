import { useState, useEffect } from "react";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RepoList from "../components/RepoList";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/RituGajera3579/repos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchRepos}
      />
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        My GitHub Repositories
      </h2>

      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search Repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
          }}
        />
      </div>

      <RepoList repos={filteredRepos} />
    </div>
  );
}

export default Projects;