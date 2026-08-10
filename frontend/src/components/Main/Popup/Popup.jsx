export default function Popup(props) {
  const { onClose, title, children, contentClassName } = props;

  const contentClass = contentClassName
    ? "popup__content " + contentClassName
    : "popup__content";

  return (
    <div className="popup popup_is-opened">
      <div className={contentClass}>
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
