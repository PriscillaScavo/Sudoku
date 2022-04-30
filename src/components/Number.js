import React, { Fragment } from 'react';

export default function Number(props){
    return(
        <Fragment>
            <button className = 'buttonNumber' disabled = {props.number != 0 && props.count >= 9} onClick ={props.selectNumber}> {props.number}</button>
        </Fragment>
    )
}