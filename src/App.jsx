import Collection from "./components/Collections";
import React, { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [page, isPage] = useState(1);
  const [tagId, setTagId] = useState(0);
  const [isLoad, setIsLoad] = useState(true);

  const category = tagId ? `category=${tagId}` : "";

  const tags = ["Все", "Горы", "Море", "Архитектура", "Города"];
  useEffect(() => {
    setIsLoad(true);
    fetch(
      `https://65c356f239055e7482c0a1db.mockapi.io/collections?page=${page}&limit=3&${category}`
    )
      .then((obj) => obj.json())
      .then((json) => {
        setPhotos(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Произошла ошибка при получении данных");
      })
      .finally(() => setIsLoad(false));
  }, [tagId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {tags.map((tag, index) => (
            <li
              key={index} 
              onClick={() => {
                setTagId(index);
                isPage(1);
              }}
              className={`${tagId === index ? "active" : ""}`}
            >
              {tag}
            </li>
          ))}
        </ul>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoad ? (
          <h2>Идет загрузка...</h2>
        ) : (
          photos
            .filter((photo) => {
              return photo.name
                .toLowerCase()
                .includes(inputVal.toLocaleLowerCase());
            })
            .map((photo, index) => (
              <Collection key={index} name={photo.name} images={photo.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            onClick={() => isPage(index + 1)}
            className={`${page === index + 1 ? "active" : ""}`}
            key={index + 1}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
