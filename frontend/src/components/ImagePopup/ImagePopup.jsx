export default function ImagePopup(props) {
  const { card } = props;

  return (
    <>
      <img
        alt={card ? card.name : ""}
        className="popup__image"
        src={card ? card.link : ""}
      />
      <p className="popup__caption">{card ? card.name : ""}</p>
    </>
  );
}
