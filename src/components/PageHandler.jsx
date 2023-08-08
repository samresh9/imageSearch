function PageHandler({ page, totalPages, onPageNext, onPagePrevious }) {
  return (
    <>
      <div className="flex justify-center gap-4 mb-4 md:gap-72">
        {page > 1 && (
          <>
            <button
              className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br 
            focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
              onClick={onPagePrevious}
            >
              Previous
            </button>
            <p>{page}</p>
          </>
        )}
        {page < totalPages && (
          <button
            className="bg-blue-600 px-6 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
            onClick={onPageNext}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default PageHandler;
