interface TileProps {
    tileData: {
        x: number,
        y: number,
        revealed: boolean,
        flagged: boolean,
        bomb: boolean,
    }
    onClick: () => void,
    onContextMenu: () => void,
    content?: any,
}

export default function Tile({tileData, onClick, onContextMenu} : TileProps) {
    let className = "";
    if (tileData.revealed && tileData.bomb) className = "bomb";
    else if (tileData.revealed) className = "revealed";

    return (
        <div className={
            `tile 
                ${className}
            `}
             position-x={tileData.x}
             position-y={tileData.y}
             onClick={onClick} // Left click
             onContextMenu={onContextMenu} // Right click
        >
            {/* There goes bomb or flag */}

            {/* Tile flagged */}
            {tileData.flagged ? <i className="fi fi-rr-flag-alt"></i> : null}

            {/* Tile with bomb and reveal */}
            {tileData.revealed && tileData.bomb ? <i className="fi fi-rr-bomb"></i> : null}
        </div>
    )
}