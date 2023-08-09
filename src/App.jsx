import { useEffect, useState } from "react";
import Header from "./components/Header";
import PageHandler from "./components/PageHandler";
import Search from "./components/Search";
import ImageList from "./components/ImageList";
import Modal from "./components/Modal";
import Main from "./components/Main";

import "./App.css";

function App() {
  const [image, setImage] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMsg, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [savedImg, setSavedImg] = useState([]);
  const [showSavedImg, setShowSavedImg] = useState(false);

  function handleShowModal(url) {
    setSelectedImg(url);
    setShowModal(true);
  }

  function handleHideModal() {
    setShowModal(false);
  }

  function handlePageIncrease() {
    setPage((page) => page + 1);
  }

  function handlePageDecrease() {
    setPage((page) => page - 1);
  }

  function handleKeyPress(e) {
    if (e.code === "Escape") {
      setShowModal(false);
    }
  }
  function handleAddSaved(newImg) {
    setSavedImg((savedImg) => [...savedImg, newImg]);
    setShowModal(false);
  }
  function handleDeleteSaved(img) {
    setSavedImg((savedImg) => savedImg.filter((imgs) => imgs !== img));
    setShowModal(false);
  }
  function handleShowSavedImg() {
    setShowSavedImg((value) => !value);
  }
  useEffect(() => {
    console.log(savedImg, "effect");
    if (savedImg.length === 0) {
      handleShowSavedImg();
    }
  }, [savedImg]);




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

          if (!response.ok) {
            throw new Error("Something went wrong. Please try again 🥲");
          }
          const data = await response.json();
          if (data.results.length === 0) throw new Error("Image not found");
          console.log(data.results);

          setImage(data.results);
          setTotalPages(data.total_pages);
          setError("");
        } catch (err) {
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
      <Header
        query={query}
        selectedImg={selectedImg}
        setShowSavedImg={handleShowSavedImg}
        savedImg={savedImg}
      >
        <Search
          setQuery={setQuery}
          query={query}
          setPage={setPage}
          setShowSavedImg={setShowSavedImg}
        />
      </Header>
      <Main
        showSavedImg={showSavedImg}
        savedImg={savedImg}
        onShowModal={handleShowModal}
        setSavedImg={selectedImg}
      >
        <ImageList
          images={image}
          isLoading={isLoading}
          errorMsg={errorMsg}
          query={query}
          selectedImg={selectedImg}
          showModal={showModal}
          onShowModal={handleShowModal}
        />

        {query && image.length > 0 && !isLoading && (
          <PageHandler
            page={page}
            totalPages={totalPages}
            onPageNext={handlePageIncrease}
            onPagePrevious={handlePageDecrease}
          />
        )}
      </Main>
      <Modal
        selectedImg={selectedImg}
        showModal={showModal}
        onHideModal={handleHideModal}
        onKeyPress={handleKeyPress}
        onHandleSave={handleAddSaved}
        onHandleDelete={handleDeleteSaved}
        showSavedImg={showSavedImg}
        onHandleShowSaveImg={handleShowSavedImg}
        savedImg={savedImg}
      />
    </>
  );
}

export default App;
