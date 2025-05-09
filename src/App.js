import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 
const API_KEY = "pub_85824b6043b752b175d245a5fc8f6baf592d2"; 
function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("latest");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true); 
      setError(""); 
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
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchNews();
  }, [searchTerm, category]);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  const truncateDescription = (description, maxLength = 150) => {
    if (description && description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description || ""; 
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <h2>📰 React News App</h2>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {isLoading && <div className="loading">Loading...</div>}


      {error && <div className="error">{error}</div>}

      <div>
        {articles.length === 0 && !isLoading && !error && (
          <p>No articles found. Try a different search term or category.</p>
        )}

        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h3>{article.title}</h3>
            {article.image_url && (
              <img src={article.image_url} alt="article" />
            )}
            <p>{truncateDescription(article.description)}</p>
            <a href={article.link} className="read-more" target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
