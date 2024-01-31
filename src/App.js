import React, { useState, useEfect } from "react";
import "./index.css";

function App() {
  // set state variables
  const [photoArray, setPhotoArray] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(5);

  // const getPhotos = async () => {
  //   const apiKey = "0NO6cOHvVei9ZEnf46-e_-_XoNoamNU_UITgcOFqSPg";
  //   const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}

export default App;
