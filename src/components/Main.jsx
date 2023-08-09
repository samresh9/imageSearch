import { useEffect } from "react";
function Main ({children , showSavedImg , savedImg , onShowModal, setSavedImg}){
    useEffect(() => {
      const savedImgs = JSON.parse(localStorage.getItem("savedImgs"));
      if (savedImgs) {
        setSavedImg(savedImgs);
      }
    }, [setSavedImg]);

    useEffect(() => {
      localStorage.setItem("savedImgs", JSON.stringify(savedImg));
    }, [savedImg]);


    return (
      <>
        <div className="justify-center ">
        {showSavedImg ? (<SavedImageList savedImg={savedImg} onShowModal={onShowModal} setSavedImg={setSavedImg}/>) : children}
        </div>
      </>
    );
}
function SavedImageList({ savedImg , onShowModal  }) {


  return (
    <>
      {savedImg && <h1 className="mt-3 text-4xl font-bold text-center text-blue-500">Your Saved Images</h1>}
      <div className="grid gap-4 px-4 mx-auto mt-5 mb-5 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
        {savedImg?.map((image, i) => (
          <SavedImage key={i} data={image} onShowModal={onShowModal} />
        ))}
      </div>
    </>
  );
}
function SavedImage({data , onShowModal}){
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

 export default Main;
