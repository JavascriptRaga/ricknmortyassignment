import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = "https://rickandmortyapi.com/api/character/";
const Details = (props) => {
    const param = props.location.pathname;
    const userId = param.split("/")[2];
    const [user, setUser] = useState(null);
    useEffect(() => { 
        async function getCharacter(id) {
            let resp = await axios.get(API_URL + id);
            setUser(resp.data);
        }
        getCharacter(userId);
    }, [userId])
    return (
        <div className="details">
            <h2>{user && user.name}</h2>
            <img alt="" src={user && user.image} />
        </div>
    )
}
export default Details;