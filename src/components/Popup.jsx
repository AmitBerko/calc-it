import React from 'react';

function Popup({ link, handleClose }) {
    return (
        <div className="popup-container">
            <div className="popup">
                <h1>Level Saved</h1>
                <div className="link-container">
                    <a href={link}>
                        <h2>{link}</h2>
                    </a>
                </div>
                <p>Your level has been created. Share the link to challenge your friends.</p>
                <button onClick={handleClose} className="close-button">Close</button>
            </div>
        </div>
    );
}

export default Popup;
