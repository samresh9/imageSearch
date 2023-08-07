function Image({ url }) {
  return (
    <>
      <img className="inset-0 object-cover w-full h-72" src={url} alt="Image" />
    </>
  );
}

export default Image;
