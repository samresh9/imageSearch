function Main ({children , showSavedImg , savedImg , onShowModal}){
    return (
      <>
        <div className="justify-center ">
        {showSavedImg ? (<SavedImageList savedImg={savedImg} onShowModal={onShowModal}/>) : children}
        </div>
      </>
    );
}
function SavedImageList({ savedImg , onShowModal }) {
  return (
    <div className="grid gap-4 px-4 mx-auto mt-10 mb-5 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
      {savedImg?.map((image) => (
        <SavedImage key={image.id} data={image} onShowModal={onShowModal} />
      ))}
    </div>
  );
}
function SavedImage({data , onShowModal}){
    return (
      <>
        <div>
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
