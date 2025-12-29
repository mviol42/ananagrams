import React from 'react';
import './Tile.css';

interface DraggingTileProps {
    letter: string | null;
}

const DraggingTile: React.FC<DraggingTileProps> = ({ letter }) => {
    return (
        <div className="tile bank dragging">
            {letter}
        </div>
    );
};

export default DraggingTile;
