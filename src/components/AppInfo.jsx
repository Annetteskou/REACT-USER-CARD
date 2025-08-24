function AppInfo({ userCount }) {
  return (
    <div className="app-info" style={{ textAlign: "center", margin: "1rem 0" }}>
      <p>Velkommen til UserCard App!</p>
      <p>Antal brugere: {userCount}</p>
    </div>
  );
}

export default AppInfo;
