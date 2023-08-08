function PageHandler({ page, totalPages, onPageNext, onPagePrevious }) {
  return (
    <>
      <div className="flex items-center justify-center gap-4 py-5 md:gap-72">
        {page > 1 && (
          <>
            <button
              className="px-6 py-2 text-white bg-blue-600 rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
              onClick={onPagePrevious}
            >
              Previous
            </button>
            <p>{page}</p>
          </>
        )}
        {page < totalPages && (
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
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
