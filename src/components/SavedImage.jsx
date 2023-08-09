function SavedImage({ data, onShowModal }) {
  return (
    <>
      <div className="mb-5">
        <img
          className="object-cover w-full h-full"
          src={data}
          alt="img"
          onClick={() => onShowModal(data)}
        />
      </div>
    </>
  );
}

export default SavedImage;
