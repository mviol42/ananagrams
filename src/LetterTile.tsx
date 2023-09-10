import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface LetterTileProps {
    letter:string | undefined;
}

interface LetterTileState {}

class LetterTile extends Component<LetterTileProps, LetterTileState> {
    constructor(props: LetterTileProps) {
        super(props);
    }

    render () {
        return (
            <div>
                <div className={`bank tile`}>
                    { this.props.letter }
                </div>
            </div>
        );
    }
}

export default LetterTile;