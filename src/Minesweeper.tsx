import React, {useState} from 'react';
import Tile from './components/Tile';

import {
    Dropdown,
    DropdownHeader,
    DropdownContent,
    DropdownElement
} from './components/Dropdown';

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

    const [selected, setSelected] = useState({
        value: "0",
        label: "Small (8 x 8)"
    })

    return (
        <>
            <header className="game-title">
                <i className="fi fi-rr-bomb"></i>
                <h1>Minesweeper</h1>
            </header>
            <section className="game-options">
                <article className="board-size">
                    <p>Board size</p>

                    <Dropdown
                        id="board-size"
                        value={selected.value}
                        onChange={(value, label) => setSelected({ value, label })}
                    >
                        <DropdownHeader>
                            <p className="dropdown-selected">{selected.label}</p>
                        </DropdownHeader>

                        <DropdownContent>
                            <DropdownElement value="0">
                                <i className="fi fi-rr-check"></i>
                                Small (8 x 8)
                            </DropdownElement>

                            <DropdownElement value="1">
                                Medium (12 x 12)
                            </DropdownElement>

                            <DropdownElement value="2">
                                Large (20 x 20)
                            </DropdownElement>
                        </DropdownContent>
                    </Dropdown>

                    {/*<div className="dropdown" id="board-size">*/}
                    {/*    <div className="dropdown-header">*/}
                    {/*        <p className="dropdown-selected">Small (8 x 8)</p>*/}

                    {/*    </div>*/}
                    {/*    <div className="dropdown-content">*/}
                    {/*        <ol>*/}
                    {/*            <li value="0">*/}
                    {/*                <i className="fi fi-rr-check"></i>*/}
                    {/*                Small (8 x 8)*/}
                    {/*            </li>*/}
                    {/*            <li value="1">Medium (12 x 12)</li>*/}
                    {/*            <li value="2">Large (16 x 16)</li>*/}
                    {/*            <li value="3">HUGE (24 x 24)</li>*/}
                    {/*        </ol>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </article>
                <article className="game-difficulty">
                    <p>Difficulty</p>
                    <div className="game-difficulty-buttons">
                        <div className="dropdown" id="game-difficulty">
                            <div className="dropdown-header">
                                <p className="dropdown-selected">Medium (15% mines)</p>
                                <i className="fi fi-rr-angle-small-down"></i>
                            </div>
                            <div className="dropdown-content">
                                <ol>
                                    <li value="0">Easy (10% mines)</li>
                                    <li value="1">
                                        <i className="fi fi-rr-check"></i>
                                        Medium (15% mines)
                                    </li>
                                    <li value="2">Hard (20% mines)</li>
                                    <li value="3">VERY HARD (30% mines)</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </article>
                <article className="new-game">
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
