import { Component } from "react";

export default class Cell extends Component {

    getValue(value) {
        if (!value.isOpen) {
            return this.props.value.isFlag ? "🚩" : null;
        }
        if (value.isMine) {
            return "💣";
        }
        if (value.neighbour === 0){
            return null;
        }        
        return value.neighbour;
    }

    render(){
        const {value, onClick, cMenu} = this.props;
        // cMenu - what is doing?
        return (
            <div 
            onClick={onClick} 
            onContextMenu={cMenu}>
                {this.getValue(value)}
            </div>
        )
    }
}