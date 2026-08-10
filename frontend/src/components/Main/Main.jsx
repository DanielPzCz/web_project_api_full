import { useContext } from "react";
import Card from "../Card/Card.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../Avatar/EditAvatar.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import RemoveCard from "../RemoveCard/RemoveCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const { cards, onOpenPopup, onCardLike, onCardDelete } = props;

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  function handleImageClick(card) {
    onOpenPopup({
      children: <ImagePopup card={card} />,
      contentClassName: "popup__content_content_image",
    });
  }

  function handleCardDeleteClick(card) {
    onOpenPopup({
      title: "¿Eliminar tarjeta?",
      children: <RemoveCard card={card} onConfirmRemove={onCardDelete} />,
    });
  }

  return (
    <main className="content" id="main__content">
      <section className="profile page__section">
        <div
          className="profile__avatar-container"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <button
            aria-label="Cambiar foto"
            className="profile__avatar-edit"
            type="button"
          ></button>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={"Avatar de " + currentUser.name}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onCardLike={onCardLike}
              onDeleteClick={handleCardDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
