import React from "react";
const SearchBar = ({ applySearch, handleChange, searchValue }) => {
  return (
    <form className="search" onSubmit={applySearch}>
      <label htmlFor="search">Search By Name</label>
      <input
        type="search"
        name="search"
        onChange={handleChange}
        value={searchValue}
        id="search"
      />
      <input type="submit" value="Search" />
    </form>
  );
};
export default SearchBar;
