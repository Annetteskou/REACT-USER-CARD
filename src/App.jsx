import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import AppInfo from "./components/AppInfo";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fejl ved hentning af users:", error);
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

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <UserList users={users} onDelete={handleDeleteUser} />
      )}

      <Footer />
    </div>
  );
}

export default App;
