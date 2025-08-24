import User from "./User";

/**
 * UserList-komponenten modtager et array af users som prop
 * og mapper dem til individuelle User-komponenter.
 */
function UserList({ users }) {
  return (
    <div className="grid">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
