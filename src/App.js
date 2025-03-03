import { useState, useEffect, useRef } from 'react';

const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4";
const utm = "?utm_source=scrimba_degree&utm_medium=referral";

const loadData = (options) => {
  fetch(options.url)
    .then(response => response.json())
    .then(data => {
      if (options.onSuccess) options.onSuccess(data);
    });
};

const App = (props) => {
  let [photos, setPhotos] = useState([]);
  // CHALLENGE: Change the query to one of your interests
  let [query, setQuery] = useState("AI");  // Default search query
  let [numPhotos, setNumPhotos] = useState(20); // Default number of photos
  let [error, setError] = useState(""); // ✅ Error state
  const queryInput = useRef(null); // Ref for input field 
  const numInput = useRef(null); // Ref for number field 

  useEffect(() => {
    const url = `https://api.unsplash.com/photos/random/?count=${numPhotos}&client_id=${clientID}&query=${query}`;
    loadData({
      url: url,
      onSuccess: res => setPhotos(res),
    });
  }, [query, numPhotos]); // Fetches Images when `query` or `numPhotos` changes

  // Function to handle search input
  const searchPhotos = e => {
    e.preventDefault();
    if (queryInput.current.value.trim() !== "") setQuery(queryInput.current.value);
  };

  // Handle number of photos change
  const changeNumPhotos = () => {
    const newNum = parseInt(numInput.current.value, 10);
    if (!isNaN(newNum) && newNum > 0 && newNum <= 30) { // Unsplash max is 30
      setNumPhotos(newNum);
      setError(""); // ✅ Clear error if input is valid
    } else {
      setError("❌ Please enter a number between 1 and 30.");
    }
  };

  return (
    <div className="box">
      <h2>{props.emoji}</h2>
      <h1>{props.name}'s website</h1>

      {/* ✅ Search Form */}
      <form onSubmit={searchPhotos}>
        <input type="text" ref={queryInput} placeholder="Search for images..." />
        <button type="submit">Search</button>
      </form>

      {/* ✅ Number of Photos Input */}
      <div id="number">
        <label>Number of Photos (1-30): </label>
        <input type="number" ref={numInput} defaultValue={numPhotos} min="1" max="30" onChange={changeNumPhotos} />
      </div>
      
      {/* ✅ Styled Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* ✅ Display Images */}
      <div className="grid">
        { query ? photos.map(photo => (
          <div key={photo.id} className="item">
            <img className="img" src={photo.urls.regular} alt={"From Unsplash by " + photo.user.name} />
            <div className="caption">
              <span className="credits">Photo by 
                <a href={photo.user.links.html + utm}> {photo.user.name} </a>
                <span> on </span> 
                <a href={"https://unsplash.com" + utm}>Unsplash</a>
              </span>
            </div>
          </div>
        )) : ""}
      </div>
    </div>
  );
};

export default App;