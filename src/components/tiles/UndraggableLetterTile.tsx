import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface UndraggableLetterTileProps {
    letter:string | undefined;
    id: any,
    inBank: boolean,
    row?: number,
    col?: number
}

class UndraggableLetterTile extends Component<UndraggableLetterTileProps> {
    render () {
        return (
            <div  className={'fixed-letter tile'}>
                { this.props.letter }
            </div>
        );
    }
}

export default UndraggableLetterTile;