import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ setTimeString }: { setTimeString: (time: string) => void }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
    const [isActive, setIsActive] = useState(true);
    const lastTickRef = useRef<number>(Date.now());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Handle visibility change and window focus/blur
    useEffect(() => {
        const updateActiveState = (active: boolean) => {
            setIsActive(active);
            if (active) {
                lastTickRef.current = Date.now();
            }
        };

        const handleVisibilityChange = () => {
            updateActiveState(!document.hidden);
        };

        const handleBlur = () => {
            updateActiveState(false);
        };

        const handleFocus = () => {
            updateActiveState(true);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    // Timer logic - only runs when active (visible and focused)
    useEffect(() => {
        if (!isActive) {
            // Clear interval when not active
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        // Reset last tick when becoming active
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
    }, [isActive]);

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
