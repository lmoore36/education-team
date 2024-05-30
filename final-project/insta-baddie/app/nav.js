import React from 'react';
import './w3.css';

function Nav() {
    return (
        <div className="w3-container">
            <div className="w3-bar w3-border w3-light-grey">
                <a href="/feed" className="w3-bar-item w3-button w3-hover-blue"> Feed </a>
                <a href="/account" className="w3-bar-item w3-button w3-hover-blue"> Account Settings</a>
                <a href="/profile" className="w3-bar-item w3-button w3-hover-blue"> Profile </a>
            </div>  
        </div>
    );
}

export default Nav;