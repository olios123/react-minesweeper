import React from 'react';
import Tile from './components/Tile';

export default function Minesweeper() {
    let boardSize = {
        x: 8,
        y: 8
    }

    let tiles = [];
    let keyEl = 0;
    let keyRow = 0;

    for (let y = 0; y < boardSize.y; y++)
    {
        let row = [];
        for (let x = 0; x < boardSize.x; x++)
        {
            row[x] = <Tile key={keyEl++} x={x} y={y}/>;
        }
        tiles[y] = <article key={keyRow++} className="board-row">{row}</article>
    }

    return (
        <>
            <header className="game-title">
                <i className="fi fi-rr-bomb"></i>
                <h1>Minesweeper</h1>
            </header>
            <section className="game-options">
                <article>
                    <p>Board size</p>
                    <button>
                        <i className="fi fi-rr-rotate-left"></i>
                        New Game
                    </button>
                </article>
                <article>
                    <p>Difficulty</p>
                    <button>
                        <i className="fi fi-rr-rotate-left"></i>
                        New Game
                    </button>
                </article>
                <article>
                    <button>
                        <i className="fi fi-rr-rotate-left"></i>
                        New Game
                    </button>
                </article>
            </section>
            <section className="game-info">
                <article className="bombs">
                    <i className="fi fi-rr-bomb bomb"></i>
                    <p>12</p>
                </article>
                <article className="flags">
                    <i className="fi fi-rr-flag-alt flag"></i>
                    <p>20</p>
                </article>
                <article className="time">
                    <i className="fi fi-rr-clock-three time"></i>
                    <p>12:20</p>
                </article>
            </section>
            <section className="board">
                {tiles}
            </section>
        </>
    );
}
