// import React, { Component } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { LoadMore } from 'components/Button/Button';
import ModalWindow from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);

  const getImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const { hits } = await fetchImages(query, currentPage);
      if (currentPage === 1) {
        if (hits.length === 0) {
          toast.error('oh not found');
        } else {
          setItems(prev => [...prev, ...hits]);
          setCurrentPage(prev => prev + 1);
        }
      } else {
        setItems(prev => [...prev, ...hits]);
        setCurrentPage(prev => prev + 1);
      }
    } catch (error) {
      console.log('error');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    if (!query) {
      return;
    }
    setItems([]);
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function handleSubmit(query) {
    setQuery(query);
    setCurrentPage(1);
  }

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleGalleryItem = fullImageUrl => {
    setLargeImage(fullImageUrl);
    toggleModal();
  };

  const visibleLoadMoreBtn = items.length > 0 && items.length >= 12;
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && <p>{error.message}</p>}
      {isLoading && <Loader />}
      {showModal && <ModalWindow onClose={toggleModal} fullImg={largeImage} />}
      <ImageGallery items={items} getFullImg={handleGalleryItem} />
      {visibleLoadMoreBtn && <LoadMore onClick={getImages} />}
      <ToastContainer />
    </>
  );
};
export default App;
