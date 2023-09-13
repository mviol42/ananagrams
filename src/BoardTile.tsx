import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface BoardTileProps {}

interface BoardTileState {}

class BoardTile extends Component<BoardTileProps, BoardTileState> {
    constructor(props: BoardTileProps) {
        super(props);
    }

    render () {
        return (
                <div className='board-empty tile'></div>
        );
    }
}

export default BoardTile;