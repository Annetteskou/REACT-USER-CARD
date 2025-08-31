import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error(`Fejl ${response.status}: Kunne ikke hente data`);
      }

      const data = await response.json();
      setPosts(data.slice(0, 10)); // Vis kun første 10 posts
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrér posts baseret på søgeterm
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="posts-section">
      <h2>Latest Posts</h2>

      {/* Søgefelt */}
      <input
        type="text"
        placeholder="🔍 Søg i posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Loading state */}
      {loading && <p>⏳ Henter posts...</p>}

      {/* Error state */}
      {error && <p style={{ color: "red" }}>❌ Fejl: {error}</p>}

      {/* Data */}
      {!loading && !error && (
        <>
          <p>
            📊 Viser {filteredPosts.length} af {posts.length} posts
          </p>
          <ul className="posts-list">
            {filteredPosts.map((post) => (
              <li key={post.id} className="post-item">
                <h3>
                  Post #{post.id}: {post.title}
                </h3>
                <p>{post.body.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostList;
