import React from "react";

const WelcomeComponent = ({ onStart }) => {
    return (
        <div className="welcome-wrapper">
            <h2>MindPad*</h2>
            <h1>Welcome to your notes app!</h1>
            <p>
                This app allows you to create, edit and save your personal
                notes.
            </p>
            <button onClick={onStart}>Get started</button>
        </div>
    );
};

export default WelcomeComponent;
