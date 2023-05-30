import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Board from "./components/board"; 
import './index.css';


class Game extends Component {
  state = {
    height: document.getElementById("heightRange").value,
    width: document.getElementById("widthRange").value,
    mines: document.getElementById("minesRange").value,
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));