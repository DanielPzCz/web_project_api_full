export default function RemoveCard(props) {
  const { card, onConfirmRemove } = props;

  function handleSubmit(event) {
    event.preventDefault();
    if (card) {
      onConfirmRemove(card);
    }
  }

  return (
    <form
      className="popup__form"
      id="delete-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  );
}
