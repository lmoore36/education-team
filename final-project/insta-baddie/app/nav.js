import React from 'react';
import './w3.css';

function Nav() {
    return (
        <body>
            <div class="w3-container">
                <div class="w3-bar w3-border w3-light-grey">
                    <a href="/" class="w3-bar-item w3-button"> Home </a>
                    <a href="/login" class="w3-bar-item w3-button w3-hover-green"> Login </a>
                    <a href="/account" class="w3-bar-item w3-button w3-hover-blue"> Account</a>
                    <a href="/feed" class="w3-bar-item w3-button w3-hover-blue"> Feed </a>
                    <a href="/profile" class="w3-bar-item w3-button w3-hover-blue"> Profile </a>
                </div>  
            </div>
        </body>
    )
}

export default Nav