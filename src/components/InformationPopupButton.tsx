import './InformationPopupButton.css'
import React, { useState } from 'react';
import { Modal } from "react-bootstrap";

function InformationPopupButton() {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="InformationPopup">
            <button className='popup-button' onClick={handleOpen}>
                Ananagrams
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </button>

            <Modal show={showModal} onHide={handleClose} centered className="how-to-play-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Ananagrams!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Every day you get a new set of letters. Your goal is to use all of them to build a crossword-style grid where the words connect.
                    </p>
                    <p>
                        Use every letter and make sure all your words are linked together.
                    </p>
                    <p>
                        When you're done, hit "Check grid!" to see if your words are correct.
                    </p>
                    <p>
                        Don't worry - there's always at least one solution!
                    </p>
                    <p>
                        Happy solving!
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default InformationPopupButton;
