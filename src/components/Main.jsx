import { useEffect } from "react";
import SavedImageList from "./SavedImageList";
function Main({ children, showSavedImg, savedImg, onShowModal, setSavedImg }) {
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
        {showSavedImg ? (
          <SavedImageList
            savedImg={savedImg}
            onShowModal={onShowModal}
            setSavedImg={setSavedImg}
          />
        ) : (
          children
        )}
      </div>
    </>
  );
}

export default Main;
