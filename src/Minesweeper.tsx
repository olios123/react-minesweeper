import React from 'react';

function Tile()
{
    return (
        <div className="tile">

        </div>
    )
}

export default function Minesweeper()
{
    // Board size = x * x (always square)
    let boardSize = 6;

    let tiles = [];

    let key = 0;
    for (let x = 0; x < boardSize; x++)
        for (let y = 0; y < boardSize; y++)
            tiles.push(<Tile key={key++}/>);

    return (
        <section className="board">
            {tiles}
        </section>
    );
}
