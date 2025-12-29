import React from 'react';
import './Tile.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import cn from 'classnames';

interface BoardTileProps {
    cornerClass?: string;
}

const BoardTile: React.FC<BoardTileProps> = ({ cornerClass }) => {
    return (
        <div className={cn('board-empty', 'tile', 'board-tile', cornerClass)}/>
    );
};

export default BoardTile;