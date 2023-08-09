function Image({ data, onShowModal }) {
  return (
    <>
      <button className="relative max-w-xs overflow-hidden ">
        <img
          className="object-cover w-full h-full transition duration-300 ease-in-out rounded hover:scale-110"
          src={data.urls.small }
          alt={data.alt_description}
          onClick={() => onShowModal(data.urls.regular)}
        />
      </button>
    </>
  );
}

export default Image;
