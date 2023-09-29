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
        <OverlayTrigger placement="left" overlay={tooltip}>
            <button className='popup-button'>How to play</button>
        </OverlayTrigger>
    );
    return (
        <div className="InformationPopup">
            { positionerInstance }
        </div>
    );
}

export default InformationPopupButton;
