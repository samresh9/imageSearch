import Errors from "./Errors";
import Loader from "./Loader";
import Image from "./Image";
function ImageList({ images, isLoading, errorMsg, query }) {
  console.log("ImageList - isLoading:", isLoading);
  console.log("ImageList - errorMsg:", errorMsg);
  return (
    <>
      {isLoading && <Loader />}
      {errorMsg && <Errors errorMsg={errorMsg} />}
      {!isLoading && !errorMsg && query && (
        <>
          <h1 className="mt-5 text-2xl text-center">{`Results For ${query}`}</h1>
          <div className="grid gap-4 px-4 mx-auto my-10 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
            {images?.map((image) => (
              <Image key={image.id} url={image.urls.small} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ImageList;
