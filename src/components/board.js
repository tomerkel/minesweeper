import { Component } from "react";
import Cell from "./cell"; 
// import PropTypes from 'prop-types';

export default class Board extends Component {
    state = {
        board: this.initBoard(this.props.height, this.props.width, this.props.mines),
        gameStatus: false,
        minesCounter: this.props.mines
    };

    render() {
        return (
            <div className="board">
                <div className="gameInfo">
                    <span className="info">
                        mines: {this.state.minesCounter}
                    </span>
                    <span className="info">
                        {this.state.gameStatus}
                    </span>
                </div>
                {this.renderBoard()} 
            </div>
            // maybe to change name of renderBoard function
        );
    }

    renderBoard() {
        this.state.board.map((row) => {
            return row.map((cell) => {
                return (
                    <div key={cell.x * row.length + cell.y}>
                        <Cell
                        value = {cell}
                        onClick={()=> this.handleClick(cell.x, cell.y)}
                        cMenu={(e) => this.handleContextMenu(e, cell.x, cell.y)}/>
                        
                        {(row[row.length-1] === cell) ? <div className="clear" /> : ""}
                    </div>
                )
            })
        })
    }

    initBoard(height, width, mines) {
        let board = this.createEmptyBoard(height, width);
        board = this.setMines(board, height, width, mines);
        board = this.setNumbersToCells(board, height, width);
        return board;
    }

    createEmptyBoard(height, width) {
        let board = [];
        for (let i=0; i< height; i++) {
            let row = [];
            for (let j=0; j<width; j++) {
                row.push({
                    x: i,
                    y: j,
                    isMine: false,
                    isFlag: false,
                    isOpen: false,
                    neighbour: 0,
                })
            }
            board.push(row);
        }
        return board;
    }

    setMines(board, height, width, mines) {
        let randX, randY, planted = 0;
        while (planted < mines) {
            randX = this.generateRandomNumber(height);
            randY = this.generateRandomNumber(width);
            if (!(board[randX][randY].isMine)){
                board[randX][randY].isMine = true;
                planted++;
            }
        }
    }

    generateRandomNumber(maxNum){
        return Math.floor(Math.random()*(maxNum + 1))
    }

    setNumbersToCells(board, height, width) {
        // made the change inplace, check if works
        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++){
                let cell = board[i][j];
                if (!(cell.isMine)){
                    let minesAsNeighbours = this.scanNeighbours(cell, board);
                    cell.neighbour = minesAsNeighbours;
                    board[i][j] = cell
                }
            }
        }
    }

    scanNeighbours(cell, board){
        let row = cell.x;
        let col = cell.y;
        let count = 0;

        let up = row > 0 // not in the first row
        let left = col > 0 // not in the first column
        let right = col < (this.props.width-1) // not in the last column
        let down = row < (this.props.height-1) // not in the last row
        //up
        if (up) {
            if (board[row-1][col].isMine){ count++;}
        }
        // up right
        if (up && right) {
            if (board[row-1][col+1].isMine) {count++;}
        }
        // right
        if (right) {
            if (board[row][col+1].isMine) {count++;}
        }
        //down right
        if (down && right) {
            if (board[row+1][col+1].isMine) {count++;}
        }
        //down
        if(down) {
            if (board[row+1][col].isMine) {count++;}
        }
        // down left
        if (down && left) {
            if (board[row+1][col-1].isMine) {count++;}
        }
        // left
        if (left) {
            if (board[row][col-1].isMine) {count++;}
        }
        // up left
        if (up && left) {
            if (board[row-1][col-1].isMine) {count++;}
        }
        return count
    }


}

// Board.propTypes = {
//     height: PropTypes.number,
//     width: PropTypes.number,
//     mines: PropTypes.number
// }