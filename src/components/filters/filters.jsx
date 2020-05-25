import React from "react";
import "./filters.css";
import CheckboxList from "../../atoms/checkbox-list";
const Filters = (props) => {
  return (
    <div className="filtersWrap">
      <h2>Filters</h2>
      {Object.keys(props.filtersData).map((type) => {
        return (
          <CheckboxList
            key={type}
            heading={type}
            listData={props.filtersData[type]}
            onFilterChecked={props.onFilterChecked}
          />
        );
      })}
    </div>
  );
};
export default Filters;
