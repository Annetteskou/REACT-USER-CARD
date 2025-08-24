import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
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

  return (
    <div className="page">
      <Header />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <UserList users={users} />
      )}

      <Footer />
    </div>
  );
}

export default App;
