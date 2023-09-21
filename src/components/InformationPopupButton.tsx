import './InformationPopupButton.css'
import React, { useState } from 'react';
import cn from 'classnames';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

interface InformationPopupButtonProps {}


function InformationPopupButton(props: InformationPopupButtonProps) {
    // using this package: https://atomiks.github.io/tippyjs/
    const tooltip = (
        <Tooltip className="my-tooltip" >
            <div>
                    <h6>Welcome to Terrace!</h6>
                    <p>
                        Each day, you'll be dealt letter tiles which you need to arrange into an intersecting word grid.
                        Each letter must be used and the grid must be fully contiguous.
                        Once your grid is ready, click "Validate" to check if it is a valid configuration.
                        Additionally, there is a theme each day. There is a guaranteed solution with this theme, but feel free to use any english words to solve the puzzle.
                    </p>
            </div>
        </Tooltip>
    );

    const positionerInstance = (
        <OverlayTrigger placement="left" overlay={tooltip}>
            <button className='popup-button'>i</button>
        </OverlayTrigger>
    );
    return (
        <div className="InformationPopup">
            { positionerInstance }
        </div>
    );
}

export default InformationPopupButton;
