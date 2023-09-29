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
}

class Board extends Component<BoardProps> {
    getEditableBoard() {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                row.push(
                    <div className='col' key={`${i}-${j}`}>
                        { this.props.currentBoard[i][j] === blankTile
                            ? <Droppable id={`${i}-${j}`}
                                         children={<BoardTile/>}
                                         row={i}
                                         col={j}
                                         letter={blankTile}
                            />
                            : <Droppable id={`${i}-${j}`}
                                         row={i}
                                         col={j}
                                         letter={this.props.currentBoard[i][j]}
                                         children={
                                             <LetterTile id={`${i}-${j}-tile`}
                                                         letter={this.props.currentBoard[i][j]}
                                                         inBank={false}
                                                         row={i}
                                                         col={j}
                                             />}/>
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

    getFixedBoard() {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                row.push(
                    <div className='col' key={`${i}-${j}`}>
                        { this.props.currentBoard[i][j] === blankTile
                            ? <BoardTile/>
                            : <UndraggableLetterTile id={`${i}-${j}-tile`}
                                          letter={this.props.currentBoard[i][j]}
                                          inBank={false}
                                          row={i}
                                          col={j}/>
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
            <div className="container-fluid">
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
        <div ref={setNodeRef} >
            { props.children }
        </div>
    );
}

