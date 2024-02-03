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
      setPhotoArray((prevPhotoArray) => [...prevPhotoArray, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ photoArray });

  const imageLoaded = () => {
    setImagesLoaded((prevImagesLoaded) => prevImagesLoaded + 1);
    if (imagesLoaded === totalImages) {
      setReady(true);
      setCount(5);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Hit");
      console.log("window.scrollY", window.scrollY);
      console.log("window.innerHeight", window.innerHeight);
      console.log("document.body.offsetHeight", document.body.offsetHeight);
      console.log("ready", ready);
      if (
        window.scrollY + window.innerHeight >=
          document.body.offsetHeight - 1000 &&
        ready
      ) {
        getPhotos();
        setReady(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ready]);

  useEffect(() => {
    setTotalImages(photoArray.length);
  }, [photoArray]);

  return (
    <div>
      <h1 className="heading">Infinity Scroll - Unsplash API</h1>
      <div className="loader" style={{ display: ready ? "none" : "block" }}>
        Loading...
      </div>
      <div className="image-container">
        {photoArray.map((data, index) => (
          <a
            key={index}
            href={data.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={data.urls.regular}
              alt={data.alt_description || "Unknown"}
              title={data.alt_description || "Unknown"}
              onLoad={imageLoaded}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
