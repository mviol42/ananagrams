import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tile from './Tile';
import './TileBank.css'

interface TileBankProps {
    tileCount:Map<string, number>;
    setSelected(tile: Tile): void;
}

interface TileBankState {
    selectedLetter:string | undefined;
}

class TileBank extends Component<TileBankProps, TileBankState> {
    constructor(props: TileBankProps) {
        super(props);
        this.state = { selectedLetter:""};
    }

    // Function to handle tile selection
    selectLetter (tile: Tile)  {
        let letter = tile.props.letter;
        const stateLetter = letter === this.state.selectedLetter ? undefined : letter;
        this.setState({ selectedLetter: stateLetter });
        this.props.setSelected(tile);
    };

    render () {
        const tiles = Array.from({ length: 26 }, (_, index) => (
            <div key={index} className="col-3 mt-4">
                <div className="tile-wrapper">
                    <Tile
                        letter={String.fromCharCode(65 + index.valueOf())}
                        onClick={this.selectLetter.bind(this)}
                        isSelected={String.fromCharCode(65 + index) === this.state.selectedLetter}
                        isBoard={false}
                        isEmpty={this.props.tileCount.get(String.fromCharCode(65 + index.valueOf())) === 0}
                    ></Tile>
                    <div className="tile-count">
                        {this.props.tileCount.get(String.fromCharCode(65 + index.valueOf()))}
                    </div>
                </div>
            </div>
        ));
        const { selectedLetter } = this.state;

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center align-items-center ">
                        {tiles}
                    </div>
                </div>
            </div>

        );
    }
}

export default TileBank;

