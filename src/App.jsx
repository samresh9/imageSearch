/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "./components/Header";
import PageHandler from "./components/PageHandler";
import Search from "./components/Search";
import ImageList from "./components/ImageList";

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

export default App;
