import React from 'react';

interface GameStateProps {
    gameState: string
}

export default function GameState({ gameState } : GameStateProps) {
    return (
        <div className={`game-state ${gameState}`}>
            {/* Pending */}
            <p>{gameState === "pending" ? "Click a tile to start the game" : null}</p>
            {/* Playing */}
            <p>{gameState === "playing" ? "Good luck!" : null}</p>
            {/* Won */}
            <p>{gameState === "won" ? "You won!" : null}</p>
            {/* Lost */}
            <p>{gameState === "lost" ? "Game over" : null}</p>
        </div>
    );
}