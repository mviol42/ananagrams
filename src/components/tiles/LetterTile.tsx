import React, {Component} from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {CSS} from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

interface LetterTileProps {
    letter:string | undefined;
    id: any,
    inBank: boolean,
    row?: number,
    col?: number,
    bankIndex?: number,
    isBeingDragged?: boolean
}

class LetterTile extends Component<LetterTileProps> {
    render () {
        return (
            <div className={this.props.inBank ? '' : 'board-full tile'}>
                <Draggable id={this.props.id}
                    children={this.props.letter}
                    letter={this.props.letter}
                    inBank={this.props.inBank}
                    row={this.props.row}
                    col={this.props.col}
                    bankIndex={this.props.bankIndex}
                    isBeingDragged={this.props.isBeingDragged}/>
            </div>
        );
    }
}

export default LetterTile;


function Draggable(props: { id: any;
                            children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined,
                            letter: string | undefined,
                            inBank: boolean,
                            row?: number,
                            col?: number,
                            bankIndex?: number,
                            isBeingDragged?: boolean}) {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.id,
        data: {
            inBank: props.inBank,
            letter: props.letter,
            row: props.row,
            col: props.col,
            bankIndex: props.bankIndex,
        }
    });

    // Hide original tile while dragging (DragOverlay shows the dragged tile)
    // Use parent-controlled isBeingDragged prop for proper timing
    const style = {
        opacity: props.isBeingDragged ? 0 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`bank tile`} {...listeners} {...attributes}>
                { props.letter }
        </div>

    );
}