import React, {Fragment, useRef, useEffect, useState} from 'react';
import {nanoid} from "nanoid"
import Game from './Game'
import {generateSchemeIdList} from './SudokuApi'

export default function Menu(){
    const [schemesIdList, setSchemesIdList] = useState(generateSchemeIdList())
    const [showSchemesIdList, setShowSchemesIdList] = useState(false)
    const [showPlay, setShowPlay] = useState(true)
    const [showSudoku, setShowSudoku] = useState(false)
    const [selectId, setSelectId] = useState("")

    function selectedSudoku(id){
        setSelectId(id)
        setShowSudoku(true)
        setShowSchemesIdList(false)
    }
    
    const schemesIdListJs= schemesIdList.map(scheme => {
            return(
                <div>
                <h4 onClick={() => selectedSudoku(scheme.id)}>
                    {scheme.id}
                </h4>
                </div>
            )
        })
    function handlePlayButton(){
        setShowSchemesIdList(true) 
        setShowPlay(false)
    }
    
    function clickMenu(){
        setShowPlay(true)
        setShowSudoku(false)
        setShowSchemesIdList(false)
    }

    return(
        <Fragment>
            <h4 className="menu" disabled = {showPlay} onClick ={clickMenu}> Menu </h4>
            {showPlay && <button className = 'play' onClick ={handlePlayButton}>Play</button>}
            {showSchemesIdList && schemesIdListJs}
            {showSudoku &&  <Game schemeId = {selectId} id = {nanoid()} />}
        </Fragment >
    )
}