import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import TileBank from './TileBank';
import { DndContext } from '@dnd-kit/core';
import cn from 'classnames';

interface AppProps {}

export const boardSize = 8;

function App(props: AppProps) {
    var defaultValueInBoard = ''; // by default
    var defaultBoard = [...Array(boardSize)].map(e => Array(boardSize).fill(defaultValueInBoard));
    const [boardLetters, setBoardLetters] = useState<string[][]>(defaultBoard);
    const [tileBankLetters, setTileBankLetters] = useState<string[]>(['T', 'A', 'B', 'L', 'E', 'B', 'T', 'T', 'A', 'B', 'L', 'E', 'B', 'T', 'T', 'A', 'B', 'L', 'E', 'B', 'T']);

    const updateBoard = (e: { active: any; over: any }) => {
        if (e.active.data.current.row === e.over.data.current.row && e.active.data.current.col === e.over.data.current.col) { return; }
        const letter = e.active.data.current.letter;
        var tempBoardLetters = {...boardLetters};
        var tempLetter = "";

        if (tempBoardLetters[e.over.data.current.row][e.over.data.current.col]) {
            tempLetter = tempBoardLetters[e.over.data.current.row][e.over.data.current.col]
        }


        if (e.active.data.current.inBank) {
            const letterIndex = tileBankLetters.indexOf(letter);
            tileBankLetters.splice(letterIndex, 1);
        }

        else {
            tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = "";
        }

        if (tempLetter) { tileBankLetters.push(tempLetter); }

        tempBoardLetters[e.over.data.current.row][e.over.data.current.col] = letter;

        setTileBankLetters(tileBankLetters);
        setBoardLetters(tempBoardLetters);
    }

    const addToBank = (e: { active: any; over: any }) => {
        if (e.active.data.current.inBank) { return; }
        const letter = e.active.data.current.letter;
        var tempBoardLetters = {...boardLetters};
        tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = "";
        tileBankLetters.push(letter);

        setTileBankLetters(tileBankLetters);
        setBoardLetters(tempBoardLetters);
    }

    const handleDragEnd = (e: { active: any; over: any }) => {
        if (e.over === null) { return; }
        if (e.over.id === 'drop-box') { addToBank(e); }
        else { updateBoard(e); }
    };

    return (
        <div className="App">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="row">
                    <div className={cn("col-8", "board")}>
                        <Board currentBoard={boardLetters}/>
                    </div>
                    <div className={cn("col-4", "tile-bank")}>
                        <TileBank bank={tileBankLetters}/>
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default App;
