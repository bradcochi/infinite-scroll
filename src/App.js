import React, { useState, useEffect, useCallback } from "react";
import "./index.css";

function App() {
  const [photoArray, setPhotoArray] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log({ photoArray });

  const getPhotos = useCallback(
    async (abortController) => {
      if (loading === false) {
        setLoading(true);
        const apiKey = "0NO6cOHvVei9ZEnf46-e_-_XoNoamNU_UITgcOFqSPg";
        const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=5`;

        try {
          const response = await fetch(url, {
            signal: abortController.signal,
          });
          const data = await response.json();
          setPhotoArray((prevPhotoArray) => [...prevPhotoArray, ...data]);
        } catch (error) {
          console.error(error);
          if (error.name !== "AbortError") {
            console.error("AbortError");
          }
        }
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    const abortController = new AbortController();

    const handleScroll = () => {
      // console.log("Hit");
      // console.log("window.scrollY", window.scrollY);
      // console.log("window.innerHeight", window.innerHeight);
      // console.log("document.body.offsetHeight", document.body.offsetHeight);

      if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight - 1000
      ) {
        getPhotos(abortController);
      }
    };

    getPhotos(abortController);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h1 className="heading">Infinity Scroll - Unsplash API</h1>
      {/* {<div className="loader" style={{ display: ready ? "none" : "block" }}>
        Loading...
      </div>} */}
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
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
