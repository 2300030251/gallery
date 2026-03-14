export default function ImageCard({ image, onClick }) {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}>
      <img src={image} alt="Lucky moment" />
    </div>
  );
}