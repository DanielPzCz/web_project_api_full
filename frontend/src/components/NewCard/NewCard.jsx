import { useState, useRef, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function NewCard() {
  const { handleAddCard } = useContext(CurrentUserContext);
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  const formRef = useRef(null);
  const { errors, isValid, handleInput, resetValidation } = useFormValidation();

  useEffect(() => {
    resetValidation(false);
  }, [resetValidation]);

  function handleNameChange(event) {
    setPlaceName(event.target.value);
  }

  function handleLinkChange(event) {
    setPlaceLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAddCard({ name: placeName, link: placeLink });
  }

  return (
    <form
      ref={formRef}
      className="popup__form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
    >
      <input
        className={`popup__input popup__input_type_card-name${
          errors.placeName ? " popup__input_type_error" : ""
        }`}
        name="placeName"
        id="cardName"
        placeholder="Título"
        type="text"
        minLength={2}
        maxLength={30}
        required
        value={placeName}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error cardName-input-error${
          errors.placeName ? " popup__input-error_active" : ""
        }`}
      >
        {errors.placeName}
      </span>
      <input
        className={`popup__input popup__input_type_url${
          errors.link ? " popup__input_type_error" : ""
        }`}
        name="link"
        id="cardLink"
        placeholder="Enlace a la imagen"
        type="url"
        pattern="https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+[a-zA-Z0-9\-._~:\/?%#\[\]@!$&'\(\)*+,;=]*#?"
        data-error-message="Introduce una URL completa, por ejemplo https://ejemplo.com/imagen.jpg"
        required
        value={placeLink}
        onChange={handleLinkChange}
      />
      <span
        className={`popup__input-error cardLink-input-error${
          errors.link ? " popup__input-error_active" : ""
        }`}
      >
        {errors.link}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Crear
      </button>
    </form>
  );
}
