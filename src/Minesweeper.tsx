import React, {useEffect, useState} from 'react';
import Tile from './components/Tile';
import GameState from "./components/GameState";

import {
    Dropdown,
    DropdownHeader,
    DropdownContent,
    DropdownElement
} from './components/Dropdown';

function generateMines(boardSize: number, difficulty: number) {
    const numberOfMines = Math.round((boardSize * boardSize) * (difficulty / 100));
    let mines = Array.from({ length: boardSize }, () => new Array(boardSize).fill(-1));

    // -1  - hidden tile
    //  0  - open tile (no bomb)
    //  1  - bomb

    let addedMines = 0; // Number of mines on board

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
    /*
        Changing board size
     */
    const [selectedBoard, setSelectedBoard] = useState({
        value: "0",
        label: "Small (8 x 8)"
    })
    const boardSizes = [8, 12, 16, 24];
    const [boardSize, setBoardSize] = useState<number>(boardSizes[0]);

    /*
        Changing game difficulty
     */
    const [selectedDifficulty, setSelectedDifficulty] = useState({
        value: "1",
        label: "Medium (15% mines)"
    })
    const difficulties = [10, 15, 20, 30];
    const [difficulty, setDifficulty] = useState<number>(difficulties[1]);

    /*
        Board
     */
    // Data about each tile on the board
    const [boardData, setBoardData] = useState(() =>
        Array.from({ length: boardSize }, (_, y) =>
            Array.from({ length: boardSize }, (_, x) => ({
                x,
                y,
                revealed: false,
                flagged: false,
                bomb: false
            }))
        )
    );
    const [board, setBoard] = useState<any>(generateBoard()); // Board JSX elements



    // Settings flags
    const [flags, setFlags] = useState<number>(0);

    // Bombs counter
    const [bombs, setBombs] = useState<number>(0);

    // Timer
    const [timer, setTimer] = useState({
        value: "00:00"
    });

    /*
        Game state
     */
    const [gameState, setGameState] = useState<string>("won");
    const [displayGameState, setDisplayGameState] = useState<boolean>(false);

    /* --------------------------------------------------------
        In game functions
    -------------------------------------------------------- */

    // Handle tile click -> reveal or flag tile
    function handleTileClick(x: number, y: number, mouseClick: "left" | "right") {
        const clickedTile = boardData[y][x];

        switch (mouseClick)
        {
            case "left":
                if (clickedTile.flagged || clickedTile.revealed) return; // Can't reveal flagged or already revealed tile
                if (clickedTile.bomb) {
                    // Game over
                    setGameState("lost");
                    console.log("Game Over!");
                    return;
                }


                break;
            case "right":
                if (clickedTile.revealed) return; // Can't flag revealed tile

                clickedTile.flagged = !clickedTile.flagged;
                console.log(clickedTile)
                break;

        }
    }

    function generateBoard() {
        let tiles = [];
        let keyEl = 0; // Keys for React elements
        let keyRow = 0; // Keys for React elements

        for (let y = 0; y < boardSize; y++)
        {
            let row = [];
            for (let x = 0; x < boardSize; x++)
            {
                row[x] = <Tile
                    key={keyEl++}
                    x={x}
                    y={y}
                    onTileClick={handleTileClick}
                />;
            }
            tiles[y] = <article key={keyRow++} className="board-row">{row}</article>
        }

        return tiles;
    }

    /* --------------------------------------------------------
        In game changing settings
    -------------------------------------------------------- */

    /*
        // Update board size and difficulty when selected values change
     */
    useEffect(() => {
        setBoardSize(boardSizes[parseInt(selectedBoard.value)]);
        setDifficulty(difficulties[parseInt(selectedDifficulty.value)]);
    }, [selectedBoard, selectedDifficulty]);

    /*
        Regenerate board when board size or difficulty changes
     */
    useEffect(() => {
        if (!boardSize || !difficulty) return; // Wait until both values are set

        console.log(boardSize)

        // Generate new board data
        setBoard(generateBoard());
    }, [boardSize, difficulty]);

    /*
        Update board when game state changes
     */
    useEffect(() => {
        if (!gameState) return; // Wait until game state is set

        switch (gameState)
        {
            case "pending":
                break;
            case "playing":
                break;
            case "won":
                setDisplayGameState(true);
                break;
            case "lost":
                setDisplayGameState(true);
                break;
        }
    }, [gameState]);

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
                <article>
                    <button className="new-game"> {/* TODO clicking this button should reset the game */}
                        <i className="fi fi-rr-rotate-left"></i>
                        New Game
                    </button>
                </article>
            </section>
            <section className="game-info">
                <div className="game-info-sec">
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
                </div>
                <div className="game-info-sec">
                    <GameState gameState={gameState} />
                </div>
            </section>
            <section className={`board board-size-${boardSizes[parseInt(selectedBoard.value)]}`}>
                {board}
            </section>
        </>
    );
}
