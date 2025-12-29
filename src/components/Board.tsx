import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Board.css'
import BoardTile from './tiles/BoardTile';
import { useDroppable } from '@dnd-kit/core';
import {blankTile, boardSize} from '../App';
import LetterTile from './tiles/LetterTile';
import cn from 'classnames';
import UndraggableLetterTile from "./tiles/UndraggableLetterTile";

interface BoardProps {
    currentBoard: string[][];
    editable: boolean;
    activeDragId?: string | null;
}

// Helper function to get corner class based on position
const getCornerClass = (row: number, col: number): string | undefined => {
    const lastIndex = boardSize - 1;
    if (row === 0 && col === 0) return 'corner-top-left';
    if (row === 0 && col === lastIndex) return 'corner-top-right';
    if (row === lastIndex && col === 0) return 'corner-bottom-left';
    if (row === lastIndex && col === lastIndex) return 'corner-bottom-right';
    return undefined;
};

class Board extends Component<BoardProps> {
    getEditableBoard() {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                const tileId = `${i}-${j}-tile`;
                const cornerClass = getCornerClass(i, j);
                let tile = this.props.currentBoard[i][j] === blankTile
                    ? <BoardTile cornerClass={cornerClass}/>
                    : <LetterTile id={tileId}
                                  letter={this.props.currentBoard[i][j]}
                                  inBank={false}
                                  row={i}
                                  col={j}
                                  isBeingDragged={this.props.activeDragId === tileId}
                                  cornerClass={cornerClass}
                      />

                row.push(
                    <Droppable id={`${i}-${j}`}
                                         children={tile}
                                         row={i}
                                         col={j}
                                         letter={this.props.currentBoard[i][j]}
                    />
                );
            }
            board.push(
                <div className={cn("row mt-3", "tile-row")} key = {`${i}`}> { row } </div>
            );
        }
        return board;
    }

    getFixedBoard() {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                const cornerClass = getCornerClass(i, j);
                row.push(
                    <div className='col' key={`${i}-${j}`}>
                        { this.props.currentBoard[i][j] === blankTile
                            ? <BoardTile cornerClass={cornerClass}/>
                            : <UndraggableLetterTile id={`${i}-${j}-tile`}
                                          letter={this.props.currentBoard[i][j]}
                                          inBank={false}
                                          row={i}
                                          col={j}
                                          cornerClass={cornerClass}/>
                        }
                    </div>
                );
            }
            board.push(
                <div className={cn("row mt-3", "tile-row")} key = {`${i}`}> { row } </div>
            );
        }
        return board;
    }

    render () {

        return (
            <div className="container-fluid board-container">
                { this.props.editable ? this.getFixedBoard() : this.getEditableBoard()}
            </div>
        );
    }
}

export default Board;

function Droppable(props: { id: any,
                    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined,
                    letter: string | undefined,
                    row: number,
                    col: number}) {
    const {setNodeRef} = useDroppable({
        id: props.id,
        data: {
            type: 'board',
            letter: props.letter,
            row: props.row,
            col: props.col,
        }
    });

    return (
        <div ref={setNodeRef} className='col' key={`${props.row}-${props.col}`}>
            { props.children }
        </div>
    );
}

