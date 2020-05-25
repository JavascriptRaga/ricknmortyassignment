import React from 'react';
import './profile-card.css';
//import styles from './styles/profileCard.module.css';
const ProfileCard = (props) => {
    const {id, name, image, status, species, gender, origin, location, created} = props.details;
    function getCreated(created) {
        let yearCreated = new Date(created).getFullYear();
        let currentYear = new Date().getFullYear();
        let diff = currentYear - yearCreated;
        return diff +' years ago';
    }
    return (
        <div className="profile_card">
            <div className="picture" style={{backgroundImage: `url(${image})`}}>
                <div className="profile-header">
                    <h3 className="name">{name}</h3>
                    <div className="created">
                        Id: {id} - created {getCreated(created)}
                    </div>
                </div>
            </div>
            <div className="details">
                <ul>
                    <li>
                        <label>Status</label>
                        <div className="info">{status}</div>
                    </li>
                    <li>
                        <label>Species</label>
                        <div className="info">{species}</div>
                    </li>
                    <li>
                        <label>Gender</label>
                        <div className="info">{gender}</div>
                    </li>
                    <li>
                        <label>Origin</label>
                        <div className="info">{origin.name}</div>
                    </li>
                    <li>
                        <label>Last Location</label>
                        <div className="info">{location.name}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default ProfileCard;