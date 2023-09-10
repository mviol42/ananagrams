import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface TileProps {
    letter:string | undefined;
    onClick(selected: Tile): void;
    isSelected?: boolean;
    isEmpty?: boolean;
    isBoard?: boolean;
    rowIndex?: number;
    colIndex?: number;
}

interface TileState {}

class Tile extends Component<TileProps, TileState> {
    constructor(props: TileProps) {
        super(props);
    }

    render () {
        var tileClass = "";
        tileClass += this.props.isSelected ? "selected-" : "";
        tileClass += this.props.isBoard ? "board" : "bank";
        tileClass += this.props.isEmpty ? "-empty" : "";
        return (
            <div>
                <div className={`${tileClass} tile`} onClick={() => this.props.onClick(this)}>
                    { this.props.letter }
                </div>
            </div>
        );
    }
}

export default Tile;