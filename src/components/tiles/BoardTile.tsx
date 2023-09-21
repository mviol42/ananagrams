import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class BoardTile extends Component {

    render () {
        return (
                <div className='board-empty tile'/>
        );
    }
}

export default BoardTile;