/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [image, setImage] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMsg, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  function handlePageIncrease() {
    setPage((page) => page + 1);
  }
  function handlePageDecrease() {
    setPage((page) => page - 1);
  }
  console.log(import.meta.env.VITE_UNSPLASH_KEY, "key");
  useEffect(
    function () {
      const controller = new AbortController();
      async function getImages() {
        try {
          setIsloading(true);
          setError("");
          const response = await fetch(
            `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${
              import.meta.env.VITE_UNSPLASH_KEY
            }`,
            { signal: controller.signal }
          );
          console.log(response.ok);
          if (!response.ok) {
            throw new Error("Something went wrong. Please try again 🥲");
          }
          const data = await response.json();
          if (data.results.length === 0) throw new Error("Image not found");
          console.log(data);
          console.log("hi");
          setImage(data.results);
          setTotalPages(data.total_pages);
          setError("");
        } catch (err) {
          console.log(err);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 1) {
        setImage([]);
        setError("");
        return;
      }
      getImages();
      return function () {
        controller.abort();
      };
    },
    [query, page]
  );
  return (
    <>
      <Header query={query}>
        <Search setQuery={setQuery} query={query} setPage={setPage} />
      </Header>
      <ImageList
        images={image}
        isLoading={isLoading}
        errorMsg={errorMsg}
        query={query}
      />
      {isLoading ? null : (
        <PageHandler
          page={page}
          totalPages={totalPages}
          onPageNext={handlePageIncrease}
          onPagePrevious={handlePageDecrease}
        />
      )}
    </>
  );
}
function PageHandler({ page, totalPages, onPageNext, onPagePrevious }) {
  return (
    <>
      <div className="flex justify-center mb-4 gap-72">
        {console.log(page)}
        {page > 1 && (
          <>
            {" "}
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
function Search({ setQuery, query, setPage }) {
  const [searchTerm, setSearchTerm] = useState(query);
  const handleClick = () => {
    setPage(1);
    setQuery(searchTerm);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      setQuery(searchTerm);
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
        >
          Search
        </button>
      </div>
    </>
  );
}

function ImageList({ images, isLoading, errorMsg, query }) {
  console.log("ImageList - isLoading:", isLoading);
  console.log("ImageList - errorMsg:", errorMsg);
  return (
    <>
      {isLoading && <Loader />}
      {errorMsg && <Errors errorMsg={errorMsg} />}
      {!isLoading && !errorMsg && query && (
        <>
          <h1 className="mt-5 text-2xl text-center">{`Results For ${query}`}</h1>
          <div className="grid gap-4 px-4 mx-auto my-10 grid-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
            {images?.map((image) => (
              <Image key={image.id} url={image.urls.small} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Image({ url }) {
  return (
    <>
      <img className="inset-0 object-cover w-full h-72" src={url} alt="Image" />
    </>
  );
}

function Loader() {
  return <h2 className="mt-20 text-center"> LOADING...</h2>;
}
function Errors({ errorMsg }) {
  return <h2 className="mt-20 text-center text-red-500 ">{errorMsg}</h2>;
}
export default App;
