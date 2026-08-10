import { useState, useContext } from "react";
import placeholder from "../../images/placeholder.jpg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function getOwnerId(card) {
  return card.owner && typeof card.owner === "object"
    ? card.owner._id
    : card.owner;
}

function checkIsLiked(card, userId) {
  if (Array.isArray(card.likes)) {
    return card.likes.some(
      (like) => (like && typeof like === "object" ? like._id : like) === userId,
    );
  }
  return Boolean(card.isLiked);
}

export default function Card(props) {
  const { card, onImageClick, onCardLike, onDeleteClick } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const [imageSource, setImageSource] = useState(card.link);

  const isLiked = checkIsLiked(card, currentUser._id);
  const isOwn = getOwnerId(card) === currentUser._id;

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  function handleImageClick() {
    onImageClick(card);
  }

  function handleImageError() {
    setImageSource(placeholder);
  }

  const likeButtonClassName = `card__like-button${
    isLiked ? " card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={imageSource}
        alt={card.name}
        onClick={handleImageClick}
        onError={handleImageError}
      />
      {isOwn && (
        <button
          aria-label="Eliminar tarjeta"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={likeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
