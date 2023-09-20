import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import TileBank from './TileBank';
import { DndContext } from '@dnd-kit/core';
import cn from 'classnames';
import { getLetters, getTheme } from './DailyPuzzles/DailyPuzzleReader'

interface AppProps {}

export const boardSize = 10;


function App(props: AppProps) {
    var dictionary = require('an-array-of-english-words');
    var defaultValueInBoard = ' '; // by default
    var defaultBoard = [...Array(boardSize)].map(e => Array(boardSize).fill(defaultValueInBoard));
    const [boardLetters, setBoardLetters] = useState<string[][]>(defaultBoard);
    const [tileBankLetters, setTileBankLetters] = useState<string[]>(getLetters(new Date().toLocaleDateString()));
    const [theme, setTheme] = useState<string>(getTheme(new Date().toLocaleDateString()));

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
        setTileBankLetters(getLetters(new Date().toLocaleDateString()));
    }

    const validateContinuity = () => {
        return true;
    }

    const validateSpelling = () => {
        var words: string[] = []
        for (let i = 0; i < boardSize; i++) {
            words.push(boardLetters[i].join(""));
        }

        for (let i = 0; i < boardSize; i++) {
            var column: string[] = [];
            for (let j = 0; j < boardSize; j++) {
                column.push(boardLetters[j][i]);
            }
            words.push(column.join(""));
        }

        var toCheck = words.join().split(" ");

        for (let i = 0; i < toCheck.length; i++) {
            if (toCheck[i].length > 1 && dictionary.indexOf(toCheck[i].toLowerCase()) == -1) {
                return false;
            }
        }

        return true;
    }

    const validate = () => {
        console.log(validateContinuity() && validateSpelling());
        return validateContinuity() && validateSpelling();
    }

    return (
        <div className="App">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="row">
                    <div className={cn("col-8", "board")}>
                        <Board currentBoard={boardLetters}/>
                    </div>
                    <div className={cn("col-4", "tile-bank")}>
                        <div>
                            Today's Theme: {theme}
                        </div>
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
