function Header({ children, query , selectedImg , setShowSavedImg }) {
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
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
function SavedImages({  setShowSavedImg }) {
  return (
    <>
      <button onClick={setShowSavedImg}>Saved Images</button>
    </>
  );
}

export default Header;
