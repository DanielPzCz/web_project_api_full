import successIcon from "../../images/success.svg";
import failIcon from "../../images/fail.svg";

export default function InfoTooltip(props) {
  const { isSuccess } = props;

  const iconSource = isSuccess ? successIcon : failIcon;
  const message = isSuccess
    ? "¡Correcto! Ya estás registrado."
    : "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

  return (
    <>
      <img
        className="tooltip__icon"
        src={iconSource}
        alt={isSuccess ? "Registro exitoso" : "Registro fallido"}
      />
      <h3 className="tooltip__message">{message}</h3>
    </>
  );
}
