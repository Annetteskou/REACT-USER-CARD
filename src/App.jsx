import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import AppInfo from "./components/AppInfo";
import "./index.css";

function App() {
  const [error, setError] = useState(null); // Holder fejlbesked
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State til søgning
  const [selectedTitle, setSelectedTitle] = useState(""); // "" = ingen filter

useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
      );

      if (!response.ok) {
        throw new Error("Kunne ikke hente brugere");
      }

      const data = await response.json();
      setUsers(data);
      setError(null); // ryd tidligere fejl
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
    e.preventDefault(); // Forhindrer siden i at genindlæses
    const form = e.target;

    const newUser = {
      id: crypto.randomUUID(), // unik id til React key
      name: form.name.value,
      mail: form.mail.value,
      title: form.title.value,
      image: form.image.value,
      age: form.age.value,
    };

    setUsers([...users, newUser]); // Tilføjer den nye bruger til state
    form.reset(); // Tømmer inputfelterne
  }

  function handleDeleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }
  <UserList users={users} onDelete={handleDeleteUser} />;

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => selectedTitle === "" || user.title === selectedTitle);

  return (
    <div className="page">
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
        {/* Tilføj flere titler efter behov */}
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

      <Footer />
    </div>
  );
}

export default App;
