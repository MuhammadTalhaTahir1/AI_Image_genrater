import React, { useRef, useState } from "react";
import "./ImageGenrator.css";
import default_image from "../Assets/medium.png";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const ImageGenrator = () => {
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenrator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt="Generated"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Describe what you want to see"
          ref={inputRef}
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenrator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenrator;
