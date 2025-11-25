import Tile from "../Tile";
import React from "react";

export class Board {
    size: number = 8;           // Size of the board (size x size)
    boardData: any[][] = [];    // Board data
    difficulty: number = 15;    // Percentage of mines

    // Data for user interface
    mines: number = 0;          // Number of mines on the board

    constructor(size: number, difficulty: number) {
        this.size = size;
        this.difficulty = difficulty;
        this.generateBoardData();
    }

    updateBoard(size: number, difficulty: number) {
        this.size = size;
        this.difficulty = difficulty;
        this.boardData = [];
        this.generateBoardData();
    }

    private generateBoardData() {
        this.boardData =
            Array.from({ length: this.size }, (_, y) =>
                Array.from({ length: this.size }, (_, x) => ({
                    x,
                    y,
                    revealed: false,
                    flagged: false,
                    bomb: false
                })
            ));

        this.generateMines();
    }

    generateJSXBoard(
        setGameState: (state: string) => void
    ) {
        let tiles = [];
        let keyEl = 0; // Keys for React elements
        let keyRow = 0; // Keys for React elements

        for (let y = 0; y < this.size; y++) {
            let row = [];
            for (let x = 0; x < this.size; x++) {
                row[x] = <Tile
                    key={keyEl++}
                    x={x}
                    y={y}
                    onTileClick={(mouseClick) => console.log(mouseClick)}
                    // TODO correct tile click handling
                />;
            }
            tiles[y] = <article key={keyRow++} className="board-row">{row}</article>;
        }

        return tiles;
    }

    private handleTileClick(
        x: number,
        y: number,
        mouseClick: "left" | "right",
        setGameState: (state: string) => void
    ) {
        const clickedTile = this.boardData[y][x];

        switch (mouseClick) {
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
                console.log(clickedTile);
                break;
        }
    }


    generateMines() {
        const numberOfMines = Math.round((this.size * this.size) * (this.difficulty / 100));

        let addedMines = 0; // Number of mines on board

        while (addedMines < numberOfMines) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);

            // Mine already on this tile
            if (this.boardData[x][y].bomb) continue;

            this.boardData[x][y].bomb = true;

            addedMines++;
        }

        // Update class mines count
        this.mines = addedMines;
    }
}