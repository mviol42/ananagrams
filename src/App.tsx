import React, { useState} from 'react';
import './App.css';
import Board from './components/Board';
import TileBank from './components/TileBank';
import InformationPopupButton from './components/InformationPopupButton'
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { getLetters } from './utils/DailyPuzzles/DailyPuzzleReader'
import Timer from "./components/Timer";
import DraggingTile from './components/tiles/DraggingTile';
import VictoryModal from './components/VictoryModal';

interface AppProps {}

export const boardSize = 9;
export const blankTile = " "

function App(props: AppProps) {
    const dictionary = require('an-array-of-english-words');
    const defaultValueInBoard = blankTile; // by default
    const defaultBoard = [...Array(boardSize)].map(e => Array(boardSize).fill(defaultValueInBoard));
    const [boardLetters, setBoardLetters] = useState<string[][]>(defaultBoard);
    let today = new Intl.DateTimeFormat('en-US').format(new Date())
    const [tileBankLetters, setTileBankLetters] = useState<string[]>(getLetters(today));
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [wasIncorrect, setWasIncorrect] = useState<boolean>(false);
    const [timeString, setTimeString] = useState<string>('');
    const [winningTimeString, setWinningTimeString] = useState<string>('');
    const [activeDragLetter, setActiveDragLetter] = useState<string | null>(null);
    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);



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

        // Create a new array to avoid mutating state directly
        let newTileBankLetters = [...tileBankLetters];

        if (e.active.data.current.inBank) {
            // Use the specific bankIndex to remove the correct tile
            const bankIndex = e.active.data.current.bankIndex;
            newTileBankLetters.splice(bankIndex, 1);

            if (tempLetter !== blankTile) {
                newTileBankLetters.push(tempLetter)
            }
        }

        else {
            tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = tempLetter;
        }

        tempBoardLetters[e.over.data.current.row][e.over.data.current.col] = letter;

        setTileBankLetters(newTileBankLetters);
        setBoardLetters(tempBoardLetters);
    }

    const addToBank = (e: { active: any; over: any }) => {
        if (e.active.data.current.inBank) { return; }
        const letter = e.active.data.current.letter;
        var tempBoardLetters = {...boardLetters};
        tempBoardLetters[e.active.data.current.row][e.active.data.current.col] = blankTile;

        // Create new array to avoid mutating state directly
        const newTileBankLetters = [...tileBankLetters, letter];

        setTileBankLetters(newTileBankLetters);
        setBoardLetters(tempBoardLetters);
    }

    const handleDragStart = (e: { active: any }) => {
        setActiveDragLetter(e.active.data.current.letter);
        setActiveDragId(e.active.id);
    };

    const handleDragEnd = (e: { active: any; over: any }) => {
        if (e.over === null) {
            // Dropped outside - just clear drag state
            setActiveDragLetter(null);
            setActiveDragId(null);
            return;
        }

        // Perform the action first, then clear drag state
        if (e.over.id === 'drop-box') { addToBank(e); }
        else { updateBoard(e); }
        setWasIncorrect(false);

        // Clear drag state after state updates
        setActiveDragLetter(null);
        setActiveDragId(null);
    };

    const clear = () => {
        setBoardLetters(defaultBoard);
        setTileBankLetters(getLetters(today.toString()));
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
        const correct = validateContinuity() && validateSpelling();
        if (correct) {
            setWinningTimeString(timeString);
            setHasWon(true);
            setShowVictoryModal(true);
        } else {
            setWasIncorrect(true);
        }
    }

    const handleCloseModal = () => {
        setShowVictoryModal(false);
    };

    const handleViewSolution = () => {
        setShowVictoryModal(false);
        // Board remains displayed since hasWon is true
    };

    const validateIsRed = wasIncorrect ? 'red-' : '';
    const gameIsBlurred = showVictoryModal ? 'blur' : '';

    // Controls section content (tile bank and buttons)
    let controls;
    if (hasWon) {
        controls = (
            <div className='completion-message'>
                <p>Completed in <strong>{winningTimeString}</strong></p>
                <button className='button' onClick={() => setShowVictoryModal(true)}>
                    Share
                </button>
            </div>
        );
    } else {
        controls = (
            <>
                <TileBank bank={tileBankLetters} activeDragId={activeDragId}/>
                <div className='d-flex'>
                    <button className='button' onClick={clear}>Clear</button>
                    <button disabled={tileBankLetters.length !== 0}
                            className={`${validateIsRed}validate-button`}
                            onClick={validate}>{wasIncorrect ? 'Try again' : 'Check grid!'}</button>
                </div>
            </>
        );
    }

    return (
        <div className="App">
            {/* Header with timer and Ananagrams - always at top */}
            <div className="header-section">
                <InformationPopupButton/>
                {!hasWon && <Timer setTimeString={(value: any) => setTimeString(value)}/>}
            </div>

            <div className={`${gameIsBlurred} game`} >
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="game-container">
                        <div className="board-section">
                            <Board currentBoard={boardLetters} editable={hasWon} activeDragId={activeDragId}/>
                        </div>
                        <div className="controls-section">
                            { controls }
                        </div>
                    </div>
                    <DragOverlay dropAnimation={null} style={{ zIndex: 9999 }}>
                        {activeDragLetter ? <DraggingTile letter={activeDragLetter} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
            <VictoryModal
                show={showVictoryModal}
                timeString={winningTimeString}
                onClose={handleCloseModal}
                onViewSolution={handleViewSolution}
            />
        </div>
    );
}

export default App;
