import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ setTimeString }: { setTimeString: (time: string) => void }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
    const [isVisible, setIsVisible] = useState(!document.hidden);
    const lastTickRef = useRef<number>(Date.now());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Handle visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
                // Reset the last tick to now so we don't count hidden time
                lastTickRef.current = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Timer logic - only runs when visible
    useEffect(() => {
        if (!isVisible) {
            // Clear interval when not visible
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        // Reset last tick when becoming visible
        lastTickRef.current = Date.now();

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const delta = now - lastTickRef.current;
            lastTickRef.current = now;
            setElapsedTime(prev => prev + delta);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isVisible]);

    // Update time string for parent component
    useEffect(() => {
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setTimeString(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, [elapsedTime, setTimeString]);

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <div className="timer">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
        </div>
    );
};

export default Timer;
