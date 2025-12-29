import './InformationPopupButton.css'
import React from 'react';
import { OverlayTrigger, Tooltip} from "react-bootstrap";

function InformationPopupButton() {
    const tooltip = (
        <Tooltip className="my-tooltip" >
            <div>
                    <h6>Welcome to Ananagrams!</h6>
                    <p>
                        Each day, you'll be dealt letter tiles which you need to arrange into an intersecting word grid. <br />
                        <br />
                        Each letter must be used and the grid must be fully contiguous. <br />
                        <br />
                        Once your grid is ready, click "Validate" to check if it is a valid configuration.<br />
                        <br />
                        There is always a guaranteed solution to the puzzle using english words.
                        <br />
                        Happy solving!
                    </p>
            </div>
        </Tooltip>
    );

    const positionerInstance = (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
            <button className='popup-button'>
                Ananagrams
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </button>
        </OverlayTrigger>
    );
    return (
        <div className="InformationPopup">
            { positionerInstance }
        </div>
    );
}

export default InformationPopupButton;
