import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Board.css'
import BoardTile from './BoardTile';
import { useDroppable } from '@dnd-kit/core';
import App, { boardSize }from './App';
import LetterTile from './LetterTile';
import cn from 'classnames';

interface BoardProps {
    currentBoard: string[][];
}

interface BoardState {
}

class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
    }

    render () {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                row.push(
                    <div className='col' key={`${i}-${j}`}>
                        { this.props.currentBoard[i][j] === ''
                            ? <Droppable id={`${i}-${j}`}
                                         children={<BoardTile/>}
                                         row={i}
                                         col={j}
                                         letter={""}
                                        ></Droppable>
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
                                            />}></Droppable>
                        }
                    </div>
                );
            }
            board.push(
                <div className={cn("row mt-3", "tile-row")} key = {`${i}`}> { row } </div>
            );
        }
        return (
            <div className="container-fluid">
                {board}
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
    const {isOver, setNodeRef} = useDroppable({
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

