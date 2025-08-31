/**
 * Datastruktur sammenligning:
 * Users-data fra GitHub:
 *   - Har felter: id, name, mail, title, image, age
 *   - Bruges til at vise brugerprofiler
 *
 * Posts-data fra JSONPlaceholder:
 *   - Har felter: userId, id, title, body
 *   - Bruges til at vise indhold skrevet af en bruger
 *
 * Konsekvens:
 * - Når vi arbejder med users, viser vi typisk navn + profiloplysninger.
 * - Når vi arbejder med posts, viser vi tekstindhold (title + body).
 * - Derfor må komponenterne (UserCard vs PostList) håndtere data forskelligt.
 */
import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem("favoritePosts");
    return stored ? JSON.parse(stored) : [];
  });

  async function fetchPosts(pageNumber = 1) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("❌ Fejl ved hentning af posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(page);
  }, []);

  // Scroll listener til infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.offsetHeight &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  // Toggle favorit
  function toggleFavorite(postId) {
    let updated;
    if (favorites.includes(postId)) {
      updated = favorites.filter((id) => id !== postId);
    } else {
      updated = [...favorites, postId];
    }
    setFavorites(updated);
    localStorage.setItem("favoritePosts", JSON.stringify(updated));
  }

  // Filtrér posts baseret på søgning og user
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser =
      selectedUserId === "" || post.userId.toString() === selectedUserId;
    return matchesSearch && matchesUser;
  });

  return (
    <div className="posts-section">
      <h2>Latest Posts</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Søg i posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">👥 Alle brugere</option>
          {[1, 2, 3, 4, 5].map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>

      <ul className="posts-list">
        {filteredPosts.map((post) => (
          <li key={post.id} className="post-item">
            <h3>
              Post #{post.id}: {post.title}
            </h3>
            <p>{post.body.substring(0, 100)}...</p>
            <button
              onClick={() => toggleFavorite(post.id)}
              className={`favorite-btn ${
                favorites.includes(post.id) ? "favorite" : ""
              }`}
            >
              {favorites.includes(post.id)
                ? "★ Favorit"
                : "☆ Marker som favorit"}
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>⏳ Henter flere posts...</p>}
      {!hasMore && <p>📌 Ingen flere posts</p>}
    </div>
  );
}

export default PostList;

