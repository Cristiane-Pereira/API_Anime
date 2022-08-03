import React, { useEffect, useState } from "react";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { isEmpty } from "lodash";
import "./styles.css";

const api = "https://kitsu.io/api/edge/";

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  console.log(text);

  useEffect(() => {
    setInfo({});
    if (!isEmpty(text)) {
      fetch(`${api}anime?filter[text]=${text}&page[limit]=5`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
          // console.log(response);
        });
    }
  }, [text]);

  return (
    <div className="App">
      <h1 className="title">Animes</h1>
      <center>
        <SearchInput onChange={(e) => setText(e)} value={text} />
      </center>

      {text && !info.data && (
        <center>
          <div
            style={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={require("./image/spinner.gif")} alt="loader" />
          </div>
        </center>
      )}

      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
