import React from 'react';
import './w3.css';
import { POST } from './auth/signout/route.js'; // Import the signOut function from another file

// SignOutButton is now a Client Component that handles the sign out logic
function SignOutButton() {
    const handleSignOut = () => {
        POST();
    };

    return (
        <button onClick={handleSignOut} className="w3-bar-item w3-button w3-hover-blue"> Sign Out </button>
    );
}

function Nav() {
    return (
        <div className="w3-container">
            <div className="w3-bar w3-border w3-light-grey">
                <a href="/" className="w3-bar-item w3-button"> Home </a>
                <a href="/login" className="w3-bar-item w3-button w3-hover-green"> Login </a>
                <a href="/account" className="w3-bar-item w3-button w3-hover-blue"> Account</a>
                <a href="/feed" className="w3-bar-item w3-button w3-hover-blue"> Feed </a>
                <a href="/profile" className="w3-bar-item w3-button w3-hover-blue"> Profile </a>
                <SignOutButton />
            </div>  
        </div>
    );
}

export default Nav;