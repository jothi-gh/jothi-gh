

import React, { useState, useEffect, useRef } from 'react';

import './TicTacToe.css';

import circle_icon from '../Assets/Assets/circle.png';
import cross_icon from '../Assets/Assets/cross.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);
    const titleRef = useRef(null);
    
    // Set up refs for each box
    const boxRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
        }
    }, []);

    const toggle = (index) => {
        if (lock || data[index]) return;

        const newData = [...data];
        newData[index] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        
        checkWin(newData);
    };

    const checkWin = (data) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setWinner(winner);
        setLock(true);
    };

    const reset = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setWinner(null);
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>
                {winner
                    ? `Congratulations! ${winner === "x" ? "X" : "O"} Wins!`
                    : "Tic Tac Toe Game In React"}
            </h1>

            <div className="board">
                <div className="row">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className="boxes"
                            ref={boxRefs.current[index]}
                            onClick={() => toggle(index)}
                        >
                            {value && (
                                <img src={value === "x" ? cross_icon : circle_icon} alt={value} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
