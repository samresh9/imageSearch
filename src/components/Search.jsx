import { useState } from "react";
function Search({ setQuery, query, setPage, setShowSavedImg }) {
  const [searchTerm, setSearchTerm] = useState(query);
  const handleClick = () => {
    setStates()
  };
  const setStates= ()=>{
    setPage(1);
    setQuery(searchTerm);
    setShowSavedImg(false);
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setStates()
    }
  };
  return (
    <>
      <div className="flex">
        <input
          type="search"
          placeholder="Search Anything..."
          className="w-full px-5 py-5 border bg-gray-50 hover:border-red-500 hover:bg-slate-100 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
          onClick={handleClick}
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
