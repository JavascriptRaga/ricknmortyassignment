import React from 'react';
const CheckboxList = (props) => {
    const {heading, listData, onFilterChecked} = props;
    return (
        <>
            <div className="checkbox-list">
                {
                    heading? <h3>{heading}</h3> : null
                }
                <ul>
                    {
                        listData.map(data => {
                            return (
                                <li key={data.value}>
                                    <label>
                                        <input type="checkbox" checked={data.checked} value={data.value} onChange={(e) => onFilterChecked(heading, e)}/>{data.label}
                                    </label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>    
        </>
    )
}
export default CheckboxList;