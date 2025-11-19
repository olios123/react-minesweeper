import React from 'react';

interface GameStateProps {
    gameState: string
}

export default function GameState({ gameState } : GameStateProps) {
    return (
        <div className={`game-state ${gameState}`}>
            <p>{gameState === "won" ? "You won!" : gameState === "lost" ? "Game over" : "Game in progress"}</p>
        </div>
    );
}