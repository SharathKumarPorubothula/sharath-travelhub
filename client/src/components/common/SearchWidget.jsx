import React from "react";

const SearchWidget = () => {
  return (
    <div className="search-widget">
      <input type="text" placeholder="From" />
      <input type="text" placeholder="To" />
      <input type="date" />
      <button>Search</button>
    </div>
  );
};

export default SearchWidget;