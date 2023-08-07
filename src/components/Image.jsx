function Image({ data, onShowModal }) {
  return (
    <>
      <div>
        <img
          className="object-cover w-full sm:h-full"
          src={data.urls.small}
          alt={data.alt_description}
          onClick={() => onShowModal(data.urls.regular)}
        />
      </div>
    </>
  );
}

export default Image;
