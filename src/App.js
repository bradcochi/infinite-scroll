import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [photoArray, setPhotoArray] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(5);

  const getPhotos = async () => {
    const apiKey = "0NO6cOHvVei9ZEnf46-e_-_XoNoamNU_UITgcOFqSPg";
    const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotoArray([...photoArray, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(photoArray);

  const imageLoaded = () => {
    setImagesLoaded(imagesLoaded + 1);
    if (imageLoaded === totalImages) {
      setReady(true);
      setCount(5);
    }
  };

  useEffect(() => {
    getPhotos();
    console.log(photoArray);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
          document.body.offsetHeight - 1000 &&
        ready
      ) {
        getPhotos(0);
        setReady(false);
      }
    };
  });

  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}

export default App;
