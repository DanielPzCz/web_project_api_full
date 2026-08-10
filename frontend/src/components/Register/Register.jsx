import { useState } from "react";
import { Link } from "react-router";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Register(props) {
  const { onRegister } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isValid, handleInput } = useFormValidation();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="auth page__section">
      <h2 className="auth__title">Regístrate</h2>
      <form
        className="auth__form"
        id="register-form"
        noValidate
        onSubmit={handleSubmit}
        onInput={handleInput}
      >
        <input
          className={`auth__input${
            errors.email ? " auth__input_type_error" : ""
          }`}
          name="email"
          id="register-email"
          type="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span
          className={`auth__input-error${
            errors.email ? " auth__input-error_active" : ""
          }`}
        >
          {errors.email}
        </span>
        <input
          className={`auth__input${
            errors.password ? " auth__input_type_error" : ""
          }`}
          name="password"
          id="register-password"
          type="password"
          placeholder="Contraseña"
          minLength={4}
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span
          className={`auth__input-error${
            errors.password ? " auth__input-error_active" : ""
          }`}
        >
          {errors.password}
        </span>
        <button className="button auth__button" type="submit" disabled={!isValid}>
          Regístrate
        </button>
      </form>
      <p className="auth__caption">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </section>
  );
}
