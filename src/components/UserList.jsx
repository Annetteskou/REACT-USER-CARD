import UserCard from "./UserCard";

/**
 * UserList-komponenten modtager et array af users som prop
 * og mapper dem til individuelle User-komponenter.
 */
function UserList({ users }) {
  return (
    <div className="grid">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;

