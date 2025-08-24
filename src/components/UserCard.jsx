function UserCard({ user, onDelete }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} className="user-image" />
      <h2>{user.name}</h2>
      <p>{user.mail}</p>
      <p>{user.title}</p>

      <button onClick={() => onDelete(user.id)}>Slet</button>
    </div>
  );
}

export default UserCard;
