import { useState, useContext, useEffect, useRef } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");

  // Si el popup se abre antes de que lleguen los datos del servidor, los
  // campos nacerían vacíos. Al detectar que currentUser cambió, los
  // rellenamos durante el render: es el patrón que recomienda la
  // documentación de React para ajustar estado cuando cambia una entrada,
  // y evita el re-render extra que provocaría hacerlo en un useEffect.
  const [renderedUser, setRenderedUser] = useState(currentUser);

  if (renderedUser !== currentUser) {
    setRenderedUser(currentUser);
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }

  const formRef = useRef(null);
  const { errors, isValid, handleInput, resetValidation } = useFormValidation();

  useEffect(() => {
    resetValidation(formRef.current.checkValidity());
  }, [resetValidation]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateUser({ name: name, about: description });
  }

  return (
    <form
      ref={formRef}
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
    >
      <input
        className={`popup__input popup__input_type_name${
          errors.name ? " popup__input_type_error" : ""
        }`}
        name="name"
        id="name"
        placeholder="Nombre"
        type="text"
        minLength={2}
        maxLength={40}
        required
        value={name}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error name-input-error${
          errors.name ? " popup__input-error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        className={`popup__input popup__input_type_description${
          errors.description ? " popup__input_type_error" : ""
        }`}
        name="description"
        id="description"
        placeholder="Acerca de mí"
        type="text"
        minLength={2}
        maxLength={200}
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className={`popup__input-error description-input-error${
          errors.description ? " popup__input-error_active" : ""
        }`}
      >
        {errors.description}
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
