import Errors from "./Errors";
import Loader from "./Loader";
import Image from "./Image";
function ImageList({ images, isLoading, errorMsg, query , onShowModal}) {
  return (
    <>
      {isLoading && <Loader />}
      {errorMsg && <Errors errorMsg={errorMsg} />}
      {!isLoading && !errorMsg && query && (
        <>
          <h1 className="mt-5 text-2xl text-center">Results For <span className="text-blue-500">{query.toUpperCase()}</span></h1>
          <div className="grid gap-4 px-4 mx-auto mt-10 mb-5 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
            {images?.map((image) => (
              <Image key={image.id} data={image} onShowModal={onShowModal} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ImageList;
