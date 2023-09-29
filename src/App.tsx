import React, {useRef, useState} from 'react';
import './App.css';
import Board from './components/Board';
import TileBank from './components/TileBank';
import InformationPopupButton from './components/InformationPopupButton'
import { DndContext } from '@dnd-kit/core';
import cn from 'classnames';
import { getLetters, getTheme } from './utils/DailyPuzzles/DailyPuzzleReader'
import Timer from "./components/Timer";

interface AppProps {}

export const boardSize = 10;
export const blankTile = " "

function App(props: AppProps) {
    const dictionary = require('an-array-of-english-words');
    const defaultValueInBoard = blankTile; // by default
    const defaultBoard = [...Array(boardSize)].map(e => Array(boardSize).fill(defaultValueInBoard));
    const [boardLetters, setBoardLetters] = useState<string[][]>(defaultBoard);
    let today = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris' }).format(new Date)
    const [tileBankLetters, setTileBankLetters] = useState<string[]>(getLetters(today));
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [wasIncorrect, setWasIncorrect] = useState<boolean>(false);
    const [timeString, setTimeString] = useState<string>('');
    const [winningTimeString, setWinningTimeString] = useState<string>('');



    const updateBoard = (e: { active: any; over: any }) => {
        // if we move over the same box we were just on, do nothing
        if (e.active.data.current.row === e.over.data.current.row && e.active.data.current.col === e.over.data.current.col) { return; }
        const letter = e.active.data.current.letter;
        var tempBoardLetters = {...boardLetters};
        var tempLetter = blankTile;

        // if we move one letter from over the same letter, do nothing
        if (tempBoardLetters[e.over.data.current.row][e.over.data.current.col] === letter) { return; }

        if (tempBoardLetters[e.over.data.current.row][e.over.data.current.col] !== blankTile) {
            tempLetter = tempBoardLetters[e.over.data.current.row][e.over.data.current.col]
        }


        if (e.active.data.current.inBank) {
            const letterIndex = tileBankLetters.indexOf(letter);
            tileBankLetters.splice(letterIndex, 1);

            if (tempLetter !== blankTile) {
                tileBankLetters.push(tempLetter)
            }
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
        tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = blankTile;
        tileBankLetters.push(letter);

        setTileBankLetters(tileBankLetters);
        setBoardLetters(tempBoardLetters);
    }

    const handleDragEnd = (e: { active: any; over: any }) => {
        if (e.over === null) { return; }
        if (e.over.id === 'drop-box') { addToBank(e); }
        else { updateBoard(e); }
        setWasIncorrect(false);
    };

    const clear = () => {
        setBoardLetters(defaultBoard);
        setTileBankLetters(getLetters(new Date().toLocaleDateString()));
        setHasWon(false);
    }

    const validateContinuity = () => {
        var counter = 0;
        var grid: string[][] = [];

        for (var i = 0; i < boardSize; i++)
            grid[i] = boardLetters[i].slice();

        const dfs = (i: number, j: number) => {
            if (i >= 0 && j >= 0 && i < boardSize && j < boardSize && grid[i][j] !== blankTile) {
                grid[i][j] = ' ';
                dfs(i + 1, j); // top
                dfs(i, j + 1); // right
                dfs(i - 1, j); // bottom
                dfs(i, j - 1); // left
            }
        };

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (grid[i][j] !== ' ') {
                    counter++;
                    dfs(i, j);
                }
            }
        }

        return counter === 1;
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

        var toCheck = words.join("").split(" ");

        for (let i = 0; i < toCheck.length; i++) {
            if (toCheck[i].length > 1 && dictionary.indexOf(toCheck[i].toLowerCase()) === -1) {
                return false;
            }
        }

        return true;
    }

    const validate = () => {
        console.log(timeString);
        const correct =  validateContinuity() && validateSpelling();
        if (correct) {
            setWinningTimeString(timeString);
            setHasWon(true);
        } else {
            setWasIncorrect(true);
        }
    }

    const validateIsRed = wasIncorrect ? 'red-' : '';
    const gameIsBlurred = hasWon ? 'blur' : '';

    let left;
    if (hasWon) {
        left = <div className='victory-banner center'> You solved today's puzzle in {winningTimeString}! </div>
    } else {
        left =
            <>
                <div>
                    <InformationPopupButton/>
                    {/*{ theme }*/}
                    <Timer setTimeString={(value: any) => setTimeString(value)}/>
                </div>
                <TileBank bank={tileBankLetters}/>
                <div className='d-flex'>
                    <button className='button' onClick={clear}> Clear</button>
                    <button disabled={tileBankLetters.length !== 0}
                            className={`${validateIsRed}validate-button`}
                            onClick={validate}> {wasIncorrect ? 'Try Again' : 'Validate'} </button>
                </div>
            </>
    }

    return (
        <div className="App">
            <div className={`${gameIsBlurred} game`} >
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="row">
                        <div className={cn("col-8", "board")}>
                            <Board currentBoard={boardLetters} editable={hasWon}/>
                        </div>
                        <div className={cn("col-4", "tile-bank")}>
                            { left }
                        </div>
                    </div>
                </DndContext>
            </div>
        </div>
    );
}

export default App;
