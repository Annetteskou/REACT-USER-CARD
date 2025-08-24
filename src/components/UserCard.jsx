function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} className="user-image" />
      <h2 className="user-name">{user.name}</h2>
      <p className="user-mail">{user.mail}</p>
      <p className="user-title">{user.title}</p>
    </div>
  );
}

export default UserCard;
