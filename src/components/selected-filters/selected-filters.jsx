import React from "react";
import "./selected-filters.css";
const SelectedFilters = (props) => {
  let filters = [];
  for (let type in props.selectedFilters) {
    let applied = props.selectedFilters[type]
      .filter((item) => item.checked === true)
      .map((val) => ({ type: type, value: val.value }));
    if (applied && applied.length) {
      filters.push(applied[0]); //type of applied filter will be at zero index since map is returning array at 0
    }
  }
  return (
    <>
      {filters.length ? <h2>Selected Filters</h2> : null}
      <ul className="filtersList">
        {filters.map((filter) => {
          return (
            <li key={filter.value}>
              {filter.type + ": " + filter.value}{" "}
              <span onClick={() => props.removeFilter(filter.type)}>
                <img src="icons/close.svg" alt="close" />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default SelectedFilters;
