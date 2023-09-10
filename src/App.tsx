import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Board, { boardSize }from './Board';
import Tile from './Tile';
import TileBank from './TileBank';

interface AppProps {}

interface AppState {
    alphabetMap: Map<string, number>;
    boardMap: Map<string, string>;
    isBoardSelected: boolean;
    isLetterSelected:boolean;
    boardSelected: Tile | undefined;
    letterSelected: Tile | undefined;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
      let alphabetMap = new Map<string, number>();
      for (let i = 65; i <= 91; i++) {
          const letter = String.fromCharCode(i); // Convert ASCII code to letter
          const randomValue = Math.random() < 0.5 ? 0 : 1; // Generate a random 0 or 1
          alphabetMap.set(letter, randomValue);
      }

      let boardMap = new Map<string, string>();
      for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
              boardMap.set(`${i}-${j}`, "");
          }
      }
    this.state = { alphabetMap:alphabetMap,
        boardMap:boardMap,
        isBoardSelected: false,
        isLetterSelected: false,
        boardSelected: undefined,
        letterSelected: undefined
        };
  }

  render () {
    return (
        <div className="App">
            <div className='row'>
                <div className='col-8'>
                    <Board currentLayout={this.state.boardMap} setSelected={this.setBoardSelected.bind(this)}/>
                </div>
                <div className='col-4'>
                    <TileBank tileCount={this.state.alphabetMap} setSelected={this.setLetterSelected.bind(this)}/>
                </div>
            </div>
        </div>
    );
  }

  setBoardSelected(tile: Tile) {
      let isBoardSelected = !(tile === undefined)
      this.setState({isBoardSelected:isBoardSelected, boardSelected:isBoardSelected ? tile : undefined});
      this.checkSwap();
  }

  setLetterSelected(tile: Tile) {
      let isLetterSelected = !(tile === undefined)
      this.setState({isLetterSelected:isLetterSelected, letterSelected:isLetterSelected ? tile : undefined});
      this.checkSwap();
  }

  checkSwap () {
    if (this.state.isLetterSelected
        && this.state.isBoardSelected
        && this.state.boardSelected
        && this.state.letterSelected
        && this.state.letterSelected.props.letter) {
        let index: string = `${this.state.boardSelected.props.rowIndex}-${this.state.boardSelected.props.colIndex}`;

        this.state.boardMap.set(index, this.state.letterSelected.props.letter);
    }
  }
}

export default App;
