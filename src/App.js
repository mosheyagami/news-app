import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const API_KEY = "pub_85824418b4d5a4cf656803573c41b1b82afb7";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("latest");
  const [category, setCategory] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=us`;

        if (searchTerm.trim() !== "") {
          url += `&q=${encodeURIComponent(searchTerm)}`;
        }

        if (category !== "") {
          url += `&category=${category}`;
        }

        const response = await axios.get(url);
        setArticles(response.data.results || []);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    };

    fetchNews();
  }, [searchTerm, category]);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">📰 React News App</div>

        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="controls">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div className="articles-container">
        {articles.length === 0 && <p>No articles found.</p>}
        {articles.slice(0, itemsPerPage).map((article, index) => (
          <div key={index} className="article">
            <h3>{article.title}</h3>
            {article.image_url && (
              <img src={article.image_url} alt={article.title} />
            )}
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
