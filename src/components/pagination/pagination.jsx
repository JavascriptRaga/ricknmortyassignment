import React from 'react';
import './pagination.css';
const Pagination = (props) => {
    const {pages} = props.pageDetails;
    const {pageClick, activePage} = props;
    console.log(activePage);
    let pageNumbers = [];
    for(let i=1; i<=pages; i++) {
        pageNumbers.push(i);
    }
    return (
        <ul className="pagination">
            {
                pageNumbers.map(page => {
                    return <li key={page}><a href="!#" className={page === activePage? 'active': null} onClick={(e) => pageClick(e, page)}>{page}</a></li>
                })
            }
        </ul>
    )
}
export default Pagination;