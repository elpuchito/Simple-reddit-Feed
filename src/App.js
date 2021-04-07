import "./App.css";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [articles, setarticles] = useState([]);
  const [subreddit, setsubreddit] = useState("spacex");

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then((res) => {
      if (res.status != 200) {
        console.log("error");
        return;
      }
      res.json().then((res) => {
        if (res != null) {
          setarticles(res.data.children);
        }
      });
    });
    return () => {};
  }, [subreddit]);
  return (
    <div>
      <header className="App-header">
        <input
          type="text"
          name=""
          id=""
          className="search"
          value={subreddit}
          onChange={(e) => setsubreddit(e.target.value)}
        />
      </header>
      <div className="articles">
        {articles != null
          ? articles.map((article, index) => (
              <Article key={index} article={article.data}></Article>
            ))
          : ""}
      </div>
    </div>
  );
};

const Article = (props) => {
  return (
    <article>
      <div className="count-container">
        <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
        <p>{props.article.ups}</p>
        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
      </div>
      <a href={"https://www.reddit.com" + props.article.permalink}>
        <p>{props.article.title}</p>
      </a>
    </article>
  );
};

export default App;
