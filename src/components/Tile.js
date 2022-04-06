import React from 'react';

export default function Tile(props){
     let name
        if ((props.c===2 || props.c===5) && (props.r===2 || props.r===5)) {
            name = "singleTileThickCR"
        } else if (props.c===2 || props.c===5) {
            name = "singleTileThickC"
        } else if (props.r===2 || props.r===5){
            name = "singleTileThickR"
        } else {
            name = "singleTile"
        }
    const highligh = {
        backgroundColor: props.highligh? "#59E391" : "white"
    }
    return(
        <div className= {name} onClick = {props.insertNum} style = {highligh}>
            <h2 className="number" > {props.number} </h2>
            <h4 className="notes"> {props.note} </h4>
        </div>
    )
}