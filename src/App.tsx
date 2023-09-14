import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import TileBank from './TileBank';
import { DndContext } from '@dnd-kit/core';
import cn from 'classnames';

var dictionary = require('dictionary-en');
var nspell = require('nspell');

interface AppProps {}

export const boardSize = 8;

function App(props: AppProps) {
    var defaultValueInBoard = ''; // by default

    var defaultBoard = [...Array(boardSize)].map(e => Array(boardSize).fill(defaultValueInBoard));
    var dailyLetters = ['T', 'A', 'B']
    const [boardLetters, setBoardLetters] = useState<string[][]>(defaultBoard);
    const [tileBankLetters, setTileBankLetters] = useState<string[]>(dailyLetters);

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
            tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = tempLetter;
        }

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

    const clear = () => {
        setBoardLetters(defaultBoard);
        setTileBankLetters(dailyLetters);
    }

    const validate = () => {
        for (let i = 0; i < boardSize; i++) {
            var currentRow: string = '';
            for (let j = 0; j < boardSize; j++) {
                if (boardLetters[i][j]) {
                    currentRow += boardLetters[i][j];
                } else {
                    currentRow += ' ';
                }
            }
            var words = currentRow.split(' ');
            words.forEach(function (word) {

            })
        }
    }

    return (
        <div className="App">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="row">
                    <div className={cn("col-8", "board")}>
                        <Board currentBoard={boardLetters}/>
                    </div>
                    <div className={cn("col-4", "tile-bank")}>
                        <TileBank bank={tileBankLetters}/>
                        <div>
                            <button className='button' onClick={clear}> Clear </button>
                            <button disabled={tileBankLetters.length !== 0} className='validate-button' onClick={validate}> Validate </button>
                        </div>

                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default App;
