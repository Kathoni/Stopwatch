// src/Stopwatch.js

import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [running]);

    const startStopHandler = () => {
        setRunning(prevRunning => !prevRunning);
    };

    const resetHandler = () => {
        setRunning(false);
        setTime(0);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 1000) / 10;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#8e44ad',
        }}>
            <div
                style={{
                    padding: '30px',
                    borderRadius: '15px',
                    backgroundColor: '#ffffff',
                    fontSize: '2em',
                    fontWeight: 'bold'

                }}>{formatTime(time)}</div>
            <button onClick={startStopHandler}
                style={{
                    padding: '10px 20px',
                    fontSize: '1.5em',
                    background: '#ffffff',
                    border: "none",
                    borderRadius: '15px'
                }}>{running ? 'Stop' : 'Start'}
                <br />
                </button>
            <button onClick={resetHandler}
                style={{
                    padding: '10px 20px',
                    background: '#ffffff',
                    border: "none",
                    borderRadius: '15px'
                }}>Reset</button>

        </div>
    );
};

export default Stopwatch;
