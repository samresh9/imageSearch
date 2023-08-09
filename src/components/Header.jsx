function Header({ children, query , selectedImg , setShowSavedImg  , savedImg}) {

  
  return (
    <>
      <div
        className={`flex items-center  px-5 py-10 bg-blue-500 ${
          query ? " " : "h-screen"
        }`}
      >
        <div className="w-full max-w-md mx-auto">
          <h1 className="mb-5 text-2xl font-bold text-center text-white">
            Search Image
          </h1>
          {children}
          <div className="flex justify-center mt-8">
            {query && (
              <SavedImages
                selectedImg={selectedImg}
                setShowSavedImg={setShowSavedImg}
                savedImg={savedImg}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
function SavedImages({  setShowSavedImg , savedImg}) {
  return (
    <>
      <button
        className="px-6 py-2 text-blue-800 bg-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
        onClick={setShowSavedImg}
        disabled={savedImg.length === 0 }
      >
        Saved Images
      </button>
    </>
  );
}

export default Header;
