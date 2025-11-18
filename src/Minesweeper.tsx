import React, {useEffect, useState} from 'react';
import Tile from './components/Tile';

import {
    Dropdown,
    DropdownHeader,
    DropdownContent,
    DropdownElement
} from './components/Dropdown';

function generateBoard(boardSize: number) {
    let tiles = [];
    let keyEl = 0;
    let keyRow = 0;

    for (let y = 0; y < boardSize; y++)
    {
        let row = [];
        for (let x = 0; x < boardSize; x++)
        {
            row[x] = <Tile key={keyEl++} x={x} y={y}/>;
        }
        tiles[y] = <article key={keyRow++} className="board-row">{row}</article>
    }

    return tiles;
}

function generateMines(boardSize: number, difficulty: number) {
    const numberOfMines = Math.round((boardSize * boardSize) * (difficulty / 100));
    let mines = Array.from({ length: boardSize }, () => new Array(boardSize).fill(-1));

    // -1  - hidden tile
    //  0  - open tile (no bomb)
    //  1  - bomb

    let addedMines = 0;

    while (addedMines < numberOfMines) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);

        // Mine already on this tile
        if (mines[x][y] == 1) continue;

        mines[x][y] = 1;
        addedMines++;
    }

    return mines;
}

export default function Minesweeper() {
    // Changing board size
    const [selectedBoard, setSelectedBoard] = useState({
        value: "0",
        label: "Small (8 x 8)"
    })
    const boardSizes = [8, 12, 16, 24];

    // Changing game difficulty
    const [selectedDifficulty, setSelectedDifficulty] = useState({
        value: "1",
        label: "Medium (15% mines)"
    })
    let difficulties = [10, 15, 20, 30];

    // Board
    const [board, setBoard] = useState<any>();

    // Settings flags
    const [flags, setFlags] = useState<number>(0);

    // Bombs counter
    const [bombs, setBombs] = useState<number>(0);

    // Timer
    const [timer, setTimer] = useState({
        value: "00:00"
    });



    /* --------------------------------------------------------
        In game changing settings
    -------------------------------------------------------- */

    useEffect(() => {
        const boardSize = boardSizes[parseInt(selectedBoard.value)];
        const boardMines = difficulties[parseInt(selectedDifficulty.value)];

        setBoard(generateBoard(boardSize));

        // There are stored information about bombs, clicked tiles etc.
        // -1  - hidden tile
        //  0  - open tile
        //  1  - bomb on tile
        let gameBoard = generateMines(boardSize, boardMines);

    }, [selectedBoard, selectedDifficulty]);

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
                        value={selectedBoard.value}
                        onChange={(value, label) => setSelectedBoard({ value, label })}
                    >
                        <DropdownHeader>
                            <p className="dropdown-selected">{selectedBoard.label}</p>
                        </DropdownHeader>
                        <DropdownContent>
                            <DropdownElement value="0">
                                Small (8 x 8)
                            </DropdownElement>
                            <DropdownElement value="1">
                                Medium (12 x 12)
                            </DropdownElement>
                            <DropdownElement value="2">
                                Large (16 x 16)
                            </DropdownElement>
                            <DropdownElement value="3">
                                HUGE (24 x 24)
                            </DropdownElement>
                        </DropdownContent>
                    </Dropdown>

                </article>
                <article className="game-difficulty">
                    <p>Difficulty</p>
                    <div className="game-difficulty-buttons">

                        <Dropdown
                            id="game-difficulty"
                            value={selectedDifficulty.value}
                            onChange={(value, label) => setSelectedDifficulty({ value, label })}
                        >
                            <DropdownHeader>
                                <p className="dropdown-selected">{selectedDifficulty.label}</p>
                            </DropdownHeader>
                            <DropdownContent>
                                <DropdownElement value="0">
                                    Easy (10% mines)
                                </DropdownElement>
                                <DropdownElement value="1">
                                    Medium (15% mines)
                                </DropdownElement>
                                <DropdownElement value="2">
                                    Hard (20% mines)
                                </DropdownElement>
                                <DropdownElement value="2">
                                    HARDCORE (30% mines)
                                </DropdownElement>
                            </DropdownContent>
                        </Dropdown>

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
                    <p>{bombs}</p>
                </article>
                <article className="flags">
                    <i className="fi fi-rr-flag-alt flag"></i>
                    <p>{flags}</p>
                </article>
                <article className="time">
                    <i className="fi fi-rr-clock-three time"></i>
                    <p>{timer.value}</p>
                </article>
            </section>
            <section className={`board board-size-${boardSizes[parseInt(selectedBoard.value)]}`}>
                {board}
            </section>
        </>
    );
}
