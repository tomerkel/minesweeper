import { Component } from "react";

class Board extends Component {
    state = {
        board: this.initBoard(this.props.height, this.props.width, this.props.mines),
        
        minesCounter: this.props.mines
    };


    initBoard(height, width, mines) {
        let board = this.createEmptyBoard(height, width);
        board = this.setMines(board, height, width, mines);
        board = this.setNumbersToNeighbours(board, height, width);
        return board;
    }

    createEmptyBoard(height, width) {

    }

    setMines(board, height, width, mines) {

    }

    setNumbersToNeighbours(board, height, width) {

    }
}