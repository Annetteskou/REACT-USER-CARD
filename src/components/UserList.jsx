import UserCard from "./UserCard";

/**
 * UserList-komponenten modtager et array af users som prop
 * og mapper dem til individuelle User-komponenter.
 * 
 * Om keys i React:
 * - Keys hjælper React med at identificere hvilke elementer i en liste,
 *   der er ændret, tilføjet eller slettet.
 * - Uden keys kan React ikke optimere rendering og kan lave fejl,
 *   hvor det genbruger forkerte komponenter.
 * - En god key skal være:
 */


function UserList({ users, onDelete }) {
  return (
    <div className="grid">
      {users.map((user) => (
        <UserCard user={user} key={user.id} onDelete={onDelete} />
      ))}
    </div>
  );
}

UserList.defaultProps = {
  users: [],
  onDelete: null,
};

export default UserList;


