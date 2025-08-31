/**
 * Refleksion (Step 9.4):
 *
 * JSONPlaceholder returnerer altid status 201 for POST requests,
 * fordi det er et "fake" API, som kun simulerer serveradfærd.
 * Data gemmes ikke permanent på serveren – alle POST, PUT og DELETE
 * requests bliver accepteret, men påvirker ikke det rigtige dataset.
 *
 * Forskellen mellem lokal vs. server-data:
 * - Lokalt: ændringer opdateres kun i React state. Når siden genindlæses, forsvinder data.
 * - Rigtig server: ændringer gemmes på serveren og kan hentes igen ved næste request.
 *
 * Derfor bruger vi crypto.randomUUID() til at generere unikke IDs lokalt,
 * i stedet for at stole på serverens ID, da JSONPlaceholder ikke gemmer brugerne.
 */

import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import SimpleUserPosts from "./components/SimpleUserPosts";
import Footer from "./components/Footer";
import AppInfo from "./components/AppInfo";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false); // Dark mode
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
        );

        if (!response.ok) throw new Error("Kunne ikke hente brugere");

        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Fejl ved hentning af users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      id: crypto.randomUUID(),
      name: form.name.value,
      mail: form.mail.value,
      title: form.title.value,
      image: form.image.value,
      age: form.age.value,
    };

    setUsers([...users, newUser]);
    form.reset();
  }

  function handleDeleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => selectedTitle === "" || user.title === selectedTitle);

  return (
    <div className={darkMode ? "page dark-mode" : "page"}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: darkMode ? "#f1f1f1" : "#333",
          color: darkMode ? "#333" : "#fff",
          zIndex: 1000,
        }}
      >
        {darkMode ? "☀️ Lys Mode" : "🌙 Dark Mode"}
      </button>

      <Header />

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Navn" />
        <input name="mail" placeholder="Mail" />
        <input name="title" placeholder="Titel" />
        <input name="image" placeholder="Billede-URL" />
        <input name="age" placeholder="Alder" />
        <button type="submit">Tilføj bruger</button>
      </form>

      <AppInfo userCount={users.length} />

      <input
        type="text"
        placeholder="Søg efter navn..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
      >
        <option value="">Alle titler</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>

      <p>
        Viser {filteredUsers.length} af {users.length} brugere
      </p>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Fejl: {error}</p>
      ) : (
        <UserList users={filteredUsers} onDelete={handleDeleteUser} />
      )}

      {/* PostList med søgning */}
      <PostList />

      {/* SimpleUserPosts: kombinerer users og posts */}
      <SimpleUserPosts />

      <Footer />
    </div>
  );
}

export default App;
