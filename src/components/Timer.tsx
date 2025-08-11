import React, { useState, useEffect } from 'react';

const Timer = ({ setTimeString }: { setTimeString: (time: string) => void }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const start = Date.now();

        const updateTime = () => {
            const elapsed = Date.now() - start;
            setMinutes(Math.floor((elapsed / 1000 / 60) % 60));
            setSeconds(Math.floor((elapsed / 1000) % 60));
        };

        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeString(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, [minutes, seconds, setTimeString]);

    return (
        <div className="timer">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
        </div>
    );
};

export default Timer;