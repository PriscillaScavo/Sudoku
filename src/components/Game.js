import React, {useRef, useEffect, useState} from 'react';
import Tile from './Tile';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Number from './Number'
import {generateSudokuGrid, allNumbers,checkWin} from './SudokuApi'

export default function Game(props) {
    const [sudoku, setSudoku] = useState(JSON.parse(localStorage.getItem("sudoku_" + props.schemeId)) || generateSudokuGrid(props.schemeId))
    const [numbers, setNumbers] = useState(JSON.parse(localStorage.getItem("numbers" + props.schemeId)) || allNumbers())
    const [selectTile, setSelectTile] = useState(JSON.parse(localStorage.getItem("selectTile" + props.schemeId)) || '')
    const [notesMode, setNotesMode] = useState(JSON.parse(localStorage.getItem("notesMode" + props.schemeId)) || false)
    const [winGame, setWinGame] = useState(false)

    const sudokuGrid = sudoku.map(s =>{
        return(
            <Tile
                id={s.id}
                value = {s.value}
                r = {s.r}
                c = {s.c}
                isNotInitValue={s.isNotInitValue}
                fillTile = {() => setSelectTile(s)}
                notesMode = {s.notesMode}
                note = {s.note}
            />)
        })
    const rowNumber = numbers.map(n => {
        return(<Number
                number={n.value}
                id={n.id}
                count={n.count}
                selectNumber= {() => fillTile(n.value)}  
                />)
    })
    useEffect(() => {
        localStorage.setItem("notesMode" + props.schemeId, JSON.stringify(notesMode))
    }, [notesMode])
       
    useEffect(() => {
        localStorage.setItem("selectTile" + props.schemeId, JSON.stringify(selectTile))
    }, [selectTile])
    
    useEffect(() => {
        const totCount = sudoku.reduce((tot, {value}) => {
            tot[value] = tot[value] + 1
            return tot }, [0,0,0,0,0,0,0,0,0,0])
            
          setNumbers(oldNum => oldNum.map(n => {
                return {...n, count: totCount[n.value]} 
            }))       
            localStorage.setItem("sudoku_" + props.schemeId, JSON.stringify(sudoku)) 
    }, [sudoku])

    React.useEffect(() => {
        localStorage.setItem("numbers" + props.schemeId, JSON.stringify(numbers))
        if (numbers[0].count === 0 ) {
            if(checkWin(sudoku)){
                setWinGame(true)
                console.log("YOU WON")
            }
        }
    }, [numbers])

    function fillTile(value){
        setSudoku(oldSudoku => oldSudoku.map(s => {
            if(s.id === selectTile.id && s.isNotInitValue) {
                return notesMode?
                {...s, notesMode: true,  note: value, value: ''} :
                {...s, notesMode: false, note : '',value: value} 
            }
            else
                return s
        }))
    }
    
    function switchNotesMode(){
        setNotesMode(old => !old)
    }

    function restart(){
        localStorage.removeItem("sudoku_" + props.schemeId)
        localStorage.removeItem("numbers" + props.schemeId)
        localStorage.removeItem("selectTile" + props.schemeId)
        localStorage.removeItem("notesMode" + props.schemeId)
        setSudoku(generateSudokuGrid(props.schemeId))
        setNumbers(allNumbers())
        setSelectTile('')
        setNotesMode(false)
        setWinGame(false)

    }

    return (
        <main>
            {winGame && <Confetti />}
            <div className= "sudoku-grid">
                {sudokuGrid}
            </div>
            <div className= "num-grid">
                {rowNumber}
            </div>
            <button onClick={switchNotesMode} >{notesMode ? "notes" : "write"}</button>
            <button onClick={restart} >Restart</button>
        </main>
    )
}