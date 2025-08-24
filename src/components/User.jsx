/**
 * User-komponenten modtager hele user-objektet som prop.
 * Vi bruger useState til antal likes og til at styre visning af detaljer.
 * useEffect bruges her til at logge antal likes hver gang det ændres.
 */
import { useState, useEffect } from "react";

/**
 * Ved at bruge { user } i funktionshovedet laver vi "destructuring".
 * Det betyder, at vi pakker user-prop direkte ud af props-objektet,
 * så vi kan bruge den som variabel i stedet for at skrive props.user.
 */
export default function User({ user }) {
  const { id, image, mail, name, title } = user; //Opgave 1.5: Metode 1 med destructuring er mest overskuelig,fordi koden bliver mere læsbar, og du slipper for at gentage user. foran hver værdi.

  // State til antal likes
  const [likes, setLikes] = useState(0);

  // State til at styre om detaljer skal vises
  const [showDetails, setShowDetails] = useState(true);

  // useEffect kører hver gang 'likes' ændres
 useEffect(() => {
   console.log("Likes:", likes);
 }, [likes]);// dependency array = kører kun, når 'likes' ændres

  return (
    <div className="user-card">
      <img src={image} alt={name} className="user-image" />
      <h2 className="user-name">{name}</h2>
      <p className="user-title">{title}</p>

      {/* Toggle-knap for detaljer */}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Skjul" : "Vis"} detaljer
      </button>

      {/* Detaljer vises kun hvis showDetails er true */}
      {showDetails && (
        <div className="user-details">
          <p className="user-mail"> {mail}</p>
          <p className="user-id">
            <small>ID: {id}</small>
          </p>
        </div>
      )}

      {/* Likes */}
      <p className="user-likes"> Likes: {likes}</p>

      {/* Knapper */}
      <div className="btns">
        <button onClick={() => setLikes(likes + 1)}>👍 Like</button>
        <button onClick={() => setLikes(0)}> Reset likes</button>
      </div>
    </div>
  );
}
