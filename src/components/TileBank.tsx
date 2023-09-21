import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TileBank.css'
import LetterTile from './tiles/LetterTile';
import { useDroppable } from '@dnd-kit/core';


interface TileBankProps {
    bank: string[];
}

class TileBank extends Component<TileBankProps> {
    render () {
        const tiles = Array.from({ length: this.props.bank.length }, (_, i) => (
            <div key={i} className="col-3 mt-4">
                <LetterTile id={`${this.props.bank[i]}-${i}`}
                            key={`${i}`}
                            letter={this.props.bank[i]}
                            inBank={true}/>
            </div>
        ));

        return (
            <div>
                <div className="container">
                    <TileBankDroppable id='drop-box' children={
                        <div className='drop-box row justify-content-center align-items-center'>
                            {tiles}
                        </div>}/>
                </div>
            </div>
        );
    }
}

export default TileBank;

function TileBankDroppable(props: { id: any, children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined}) {
    const {setNodeRef} = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} >
            { props.children }
        </div>
    );
}

