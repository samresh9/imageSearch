import { useEffect } from "react";


function Modal({ showModal, selectedImg, onHideModal }) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          console.log("closing");
          onHideModal();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onHideModal]
  );
  return (
    <>
      {showModal && selectedImg && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div>
            <div className="flex justify-end md:mt-4">
              <button
                onClick={onHideModal}
                className="px-0.5 py-0.5 mb-2 text-white bg-gray-600 rounded-md hover:bg-gray-300"
              >
                ❌
              </button>
            </div>
            <img
              src={selectedImg}
              alt="Image"
              className="object-contain w-full h-[60vh] sm:h-[60vh] md:h-[75vh] "
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
