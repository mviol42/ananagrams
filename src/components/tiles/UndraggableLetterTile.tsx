import React from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import cn from 'classnames';

interface UndraggableLetterTileProps {
    letter:string | undefined;
    id: any,
    inBank: boolean,
    row?: number,
    col?: number,
    cornerClass?: string
}

const UndraggableLetterTile: React.FC<UndraggableLetterTileProps> = ({ letter, cornerClass }) => {
    return (
        <div className={cn('fixed-letter', 'tile', 'board-tile', cornerClass)}>
            { letter }
        </div>
    );
};

export default UndraggableLetterTile;