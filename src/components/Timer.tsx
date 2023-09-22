import React from 'react';
import { useState, useEffect } from 'react';
import {defaultKeyboardCoordinateGetter} from "@dnd-kit/core/dist/sensors/keyboard/defaults";

const Timer = (props: any) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const start = Date.now();


    const getTime = () => {
        const time =  Date.now() - start;
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    const getTimeString = () => {
        return minutes + ':' + (seconds.toString().length > 1 ? `${seconds}` : `0${seconds}`);
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        props.setTimeString(getTimeString());
    }, [seconds])

    return (
        <div className="timer">
            {`${getTimeString()}`}
        </div>
    );
}

export default Timer;