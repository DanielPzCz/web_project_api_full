import { useRef, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarInputRef = useRef(null);

  const { errors, isValid, handleInput, resetValidation } = useFormValidation();

  useEffect(() => {
    resetValidation(false);
  }, [resetValidation]);

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateAvatar({ avatar: avatarInputRef.current.value });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
    >
      <input
        ref={avatarInputRef}
        className={`popup__input popup__input_type_avatar-url${
          errors.avatarLink ? " popup__input_type_error" : ""
        }`}
        name="avatarLink"
        id="avatarLink"
        placeholder="Enlace a la imagen"
        type="url"
        pattern="https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+[a-zA-Z0-9\-._~:\/?%#\[\]@!$&'\(\)*+,;=]*#?"
        data-error-message="Introduce una URL completa, por ejemplo https://ejemplo.com/imagen.jpg"
        required
      />
      <span
        className={`popup__input-error avatarLink-input-error${
          errors.avatarLink ? " popup__input-error_active" : ""
        }`}
      >
        {errors.avatarLink}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
