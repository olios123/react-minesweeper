import React, {useEffect, useState} from 'react';
import GameState from "./components/GameState";

import {
    Dropdown,
    DropdownHeader,
    DropdownContent,
    DropdownElement
} from './components/Dropdown';
import {Board} from "./components/classes/Board";


// Game config
const boardSizes = [8, 12, 16, 24];
const difficulties = [10, 15, 20, 30];


export default function Minesweeper() {
    /*
        ----------------------------------------------------------
                           Changing board size
        ----------------------------------------------------------
     */
    const [selectedBoard, setSelectedBoard] = useState({
        value: "0",
        label: "Small (8 x 8)"
    })
    const [boardSize, setBoardSize] = useState<number>(boardSizes[0]);

    /*
        ----------------------------------------------------------
                         Changing game difficulty
        ----------------------------------------------------------
     */
    const [selectedDifficulty, setSelectedDifficulty] = useState({
        value: "1",
        label: "Medium (15% mines)"
    })
    const [difficulty, setDifficulty] = useState<number>(difficulties[1]);

    /*
        ----------------------------------------------------------
                            Data and stats
        ----------------------------------------------------------
     */
    const [flags, setFlags] = useState<number>(0); // Settings flags
    const [bombs, setBombs] = useState<number>(0); // Bombs counter
    const [timer, setTimer] = useState<number>(0); // Timer
    // Game state
    // "pending" | "playing" | "won" | "lost"
    const [gameState, setGameState] = useState<string>("pending");

    /*
        ----------------------------------------------------------
                                Board
        ----------------------------------------------------------
     */
    // Main board class instance
    const [board, setBoard] = useState<any>(new Board(boardSize, difficulty));
    const [boardJSX, setBoardJSX] = useState<any>(board.generateJSXBoard(setGameState));


    // New game trigger
    const [newGame, setNewGame] = useState<boolean>(false);

    /* --------------------------------------------------------
        In game changing settings
    -------------------------------------------------------- */

    /*
        Update board size and difficulty when selected values change
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

        // Generate new board data
        board.updateBoard(boardSize, difficulty);
        setBoardJSX(board.generateJSXBoard(setGameState));

        // Reset all game data
        setTimer(0);
        setFlags(0);
        setGameState("pending");

    }, [boardSize, difficulty, newGame]);

    /*
        Update board when game state changes
     */
    useEffect(() => {
        setBoardJSX(board.generateJSXBoard(setGameState));
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
                    <button className="new-game" onClick={() => setNewGame(!newGame)}>
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
                        <p>{timer}</p>
                    </article>
                </div>
                <div className="game-info-sec">
                    <GameState gameState={gameState} />
                </div>
            </section>
            <section className={`board board-size-${boardSizes[parseInt(selectedBoard.value)]}`}>
                {boardJSX}
            </section>
        </>
    );
}
