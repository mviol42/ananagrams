import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Board.css'
import Tile from './Tile';

export const boardSize = 10;

interface BoardProps {
    currentLayout: Map<string, string>;
    setSelected(tile: Tile): void;
}

interface BoardState {
    rowIndex: number | undefined;
    colIndex: number | undefined;
}

class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {rowIndex: -1, colIndex: -1}
    }

    selectIndex(tile: Tile) {
        this.props.setSelected(tile);
        this.setState({ rowIndex: tile.props.rowIndex, colIndex: tile.props.colIndex });
    }

    render () {
        const board = [];

        for (let i = 0; i < boardSize; i++) {
            const row = []
            for (let j = 0; j < boardSize; j++) {
                row.push(
                    <div className="col-1" key = {`${i}-${j}`}>
                    <Tile
                        letter={this.props.currentLayout.get(`${i}-${j}`)}
                        onClick={this.selectIndex.bind(this)}
                        isBoard={!(this.props.currentLayout.get(`${i}-${j}`) === "")}
                        isSelected={this.state.rowIndex === i && this.state.colIndex === j}
                        isEmpty={true}
                        rowIndex={i}
                        colIndex={j}
                    ></Tile>
                    </div>)
            }
            board.push(
                <div className="row mt-3" key = {`${i}`}> { row } </div>
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