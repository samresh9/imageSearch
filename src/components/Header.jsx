
function Header({ children, query }) {
  return (
    <>
      <div
        className={`flex items-center py-10 bg-gray-500 ${
          query ? " " : "h-screen"
        }`}
      >
        <div className="w-full max-w-md mx-auto">
          <h1 className="mb-5 text-2xl font-bold text-center text-white">
            Search Image
          </h1>
          {children}
        </div>
      </div>
    </>
  );
}
export default Header;
