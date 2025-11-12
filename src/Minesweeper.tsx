import React from 'react';





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
        <section className="board">
            {tiles}
        </section>
    );
}
