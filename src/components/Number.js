import React from 'react';

export default function Number(props){
    const styles = {
        backgroundColor: props.isSelected ? "#59E391" : "white"
    }
    return(
        <div style={styles} onClick = {(props.count < 9) ? props.selectNumber : undefined} >
            <h2 className= "num">{props.value}</h2>
        </div>
    )
}