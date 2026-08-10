import { useState } from "react";
import { Link } from "react-router";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Login(props) {
  const { onLogin } = props;

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
    onLogin(email, password);
  }

  return (
    <section className="auth page__section">
      <h2 className="auth__title">Iniciar sesión</h2>
      <form
        className="auth__form"
        id="login-form"
        noValidate
        onSubmit={handleSubmit}
        onInput={handleInput}
      >
        <input
          className={`auth__input${
            errors.email ? " auth__input_type_error" : ""
          }`}
          name="email"
          id="login-email"
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
          id="login-password"
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
          Iniciar sesión
        </button>
      </form>
      <p className="auth__caption">
        ¿Aún no eres miembro?{" "}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </section>
  );
}
