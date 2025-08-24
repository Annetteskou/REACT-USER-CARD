import { useEffect, useState } from "react";
import User from "./components/User";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

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
        setLoading(false); // loader slukkes når data er hentet
      }
    }
    fetchUsers();
  }, []);

  // useEffect der tjekker om der ikke er nogen brugere
  useEffect(() => {
    if (!loading && users.length === 0) {
      alert("Ingen brugere!");
    }
  }, [users, loading]); // afhænger af users og loading

  return (
    <div className="page">
      <h1>Users</h1>

      {/* Loader vises mens data hentes */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <section className="grid">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </section>
      )}
    </div>
  );
}

export default App;
