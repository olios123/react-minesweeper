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
        let keyRow = 0; // Keys for React elements

        for (let y = 0; y < this.size; y++) {
            let row = [];
            for (let x = 0; x < this.size; x++) {
                row[x] = <Tile
                    key={`${x}-${y}`}
                    tileData={this.boardData[y][x]}
                    onClick={() => this.handleTileClick(x, y, "left", setGameState)}
                    onContextMenu={() => this.handleTileClick(x, y, "right", setGameState)}
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
                if (clickedTile.bomb) { // Clicked on a mine
                    // Game over
                    setGameState("lost");

                    // Reveal all mines and mark the clicked one
                    this.revealMines();

                    return;
                }

                // Handle tile clicked

                break;
            case "right":
                if (clickedTile.revealed) return; // Can't flag revealed tile

                // Toggle flagged state
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
            if (this.boardData[y][x].bomb) continue;

            this.boardData[y][x].bomb = true;

            addedMines++;
        }

        // Update class mines count
        this.mines = addedMines;
    }

    private revealMines() {
        for (const row of this.boardData) {
            for (const tile of row) {
                if (tile.bomb) {
                    console.log(tile, tile.x, tile.y)
                    tile.revealed = true;
                }
            }
        }
    }
}