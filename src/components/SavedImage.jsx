function SavedImage({ data, onShowModal }) {
  return (
    <>
      <button className="relative max-w-xs overflow-hidden">
        <img
          className="object-cover w-full h-full transition duration-300 ease-in-out rounded hover:scale-110"
          src={data}
          alt="img"
          onClick={() => onShowModal(data)}
        />
      </button>
    </>
  );
}

export default SavedImage;
