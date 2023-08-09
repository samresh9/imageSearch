import SavedImage from "./SavedImage";
function SavedImageList({ savedImg, onShowModal }) {
  return (
    <>
      {savedImg && (
        <h1 className="mt-3 text-4xl font-bold text-center text-blue-500">
          Your Saved Images
        </h1>
      )}
      <div className="grid gap-4 px-4 mx-auto mt-5 mb-5 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
        {savedImg?.map((image, i) => (
          <SavedImage key={i} data={image} onShowModal={onShowModal} />
        ))}
      </div>
    </>
  );
}
export default SavedImageList;
