function UserCard({ user, onDelete }) {
  const { name, mail, title, image } = user;

  return (
    <div className="user-card">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name || "Ukendt bruger"}
        className="user-image"
      />
      <h2>{name || "Ukendt navn"}</h2>
      <p>{mail || "Ingen mail"}</p>
      <p>{title || "Ingen titel"}</p>

      {onDelete && <button onClick={() => onDelete(user.id)}>Slet</button>}
    </div>
  );
}

// Default props hvis user ikke bliver sendt
UserCard.defaultProps = {
  user: {
    name: "Ukendt navn",
    mail: "Ingen mail",
    title: "Ingen titel",
    image: "https://via.placeholder.com/150",
  },
  onDelete: null,
};

export default UserCard;
