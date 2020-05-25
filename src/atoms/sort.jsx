import React from 'react';
const SortField = (props) => {
    return (
        <div className="sort">
            <select selected={props.order} onChange={(e) => props.handleSort(e.target.value)}>
                <option value="">Sort By ID</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )
}
export default SortField;