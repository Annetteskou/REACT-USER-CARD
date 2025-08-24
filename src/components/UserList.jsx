import UserCard from "./UserCard";

/**
 * UserList-komponenten modtager et array af users som prop
 * og mapper dem til individuelle User-komponenter.
 */
function UserList({ users, onDelete }) {
  return (
    <div className="grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default UserList;


