import React from 'react';
import Tile from './components/Tile';
import Number from './components/Number';
import data from "./components/data"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [sudoku, setSudoku] = React.useState(generateSudokuGrid())
    const [numbers, setNumbers] = React.useState(allNumbers())
    const [squares, setSquares] = React.useState(generateSquares())
    const [rows, setRows] = React.useState(generateRows())
    const [columns, setColumns] = React.useState(generateColumns())
    const [selectedId, setSelectedId] = React.useState()
    const [notesMode, setNotesMode] = React.useState(false)
    const [winGame, setWinGame] = React.useState(false)

    const rowNumber = numbers.map(n => {
        return(<Number
                value={n.value}
                isSelected={n.isSelected}
                id={n.id}
                count={n.count}
                selectNumber= {() => insertNum(n.value)}
                />)
    })
    const sudokuGrid = sudoku.map(s =>{
        return(
            <Tile
                id={s.id}
                number = {s.number}
                r = {s.r}
                c = {s.c}
                isInitValue={s.isInitValue}
                insertNum = {() => selectId(s.id)}
                note = {s.note}
                highligh = {s.highligh}
                isSelected = {s.isSelected}
            />)
            })


    React.useEffect(() => {
        const allSelected = numbers.slice(1,8).every(n => n.count === 9)
        if (allSelected ) {
            const squareCheck = squares.every(sq => {
                const uniqueSquare = Array.from(new Set(sq))
                return uniqueSquare.length === 9
               } )
            const rowCheck = rows.every(row => {
                const uniqueRow = Array.from(new Set(row))
                return uniqueRow.length === 9
            })
            const columnCheck = columns.every(column => {
                const uniqueColumn = Array.from(new Set(column))
                return uniqueColumn.length === 9
            })
           if(squareCheck && rowCheck && columnCheck){
              setWinGame(true)
              console.log("YOU WON")
           }
        }
    }, [numbers])

    function generateSudokuGrid() {
      const grid = []
          data.map(sudoku => {
                  (
                      sudoku.schema.map(row =>{
                          (
                              row.row.map(tile =>{
                                  grid.push({
                                          number: tile.n ,
                                          r: sudoku.schema.indexOf(row),
                                          c: row.row.indexOf(tile),
                                          id: nanoid(),
                                          isInitValue: (tile.n === "")? false : true,
                                          note: [],
                                          highligh: false,
                                          isSelected: false
                                          })
                              })
                          )
                      })
                  )
              })
        return grid
    }

    function allNumbers() {
            const numbers = []
            for (let i = 0; i < 10; i++) {
                numbers.push(createNumber(i))
            }
            return numbers
        }
    function createNumber(i) {
            return {
                value: ((i === 0)? "": i),
                isSelected: false,
                id: nanoid(),
                count: sudoku.filter((s) => s.number === i).length
                }
            }

    function generateSquares(){
        const sq = []
        for(let j = 0; j < 61; j = j + 27){
        for(let i = j; i < j + 8; i = i + 3){
            sq.push ((sudoku.slice(i, i +3).concat
            (sudoku.slice(i + 9, i + 12))).concat
            (sudoku.slice(i +18, i + 21)))
        }
        }
        return sq
    }
    function generateColumns(){
        const columns = []
        for(let i = 0; i < 9; i++){
            columns.push([])
            for(let j = 0; j < 9; j++){
                (columns[i]).push(rows[j][i])
            }
        }
        return columns;
    }
    function generateRows(){
        const rows = []
        for(let i = 0; i < 81; i = i + 9){
            rows.push(sudoku.slice(i, i + 9 ))
        }
        return rows;
    }

    function addNotes(){
        setNotesMode(old => !old)
    }

    function selectId(id){
        const tileValue = sudoku.filter(s => s.id === id )[0].number
        if(tileValue != ""){
            setSudoku(oldSudoku=> oldSudoku.map(s => {
              return (s.number === tileValue )? {...s, highligh: true}: {...s, highligh: false}
            }))
        }
        setSudoku(oldSudoku => oldSudoku.map(s => {
            return s.id === id ?
                {...s, isSelected: true} :
                {...s, isSelected: false}
        }))
    }
    function insertNum(value){
        if(!notesMode){
        const isOnBound = numbers.filter(n => n.value === value)[0].count < 9
       setSudoku(oldSudoku => oldSudoku.map(s => {
           if(!s.isInitValue && isOnBound && s.isSelected){
                setNumbers(oldNumber => oldNumber.map(n => {
                    if(n.value === value  && n.count < 9)
                        return {...n, count: (n.count + 1)}
                    else if(n.value === s.number  && n.count < 9)
                        return {...n, count: (n.count - 1)}
                    else
                       return  n
                     }))
                return {...s, number: value, note: [], highligh: false}
            }
            else
                return {...s, highligh: false}
        }))
        }
       if(value != ""){
       setSudoku(oldSudoku=> oldSudoku.map(s => {
            return (s.number === value )? {...s, highligh: true}: {...s, highligh: false}
       }))}
        else
        insertNotes(value)
    }

    function insertNotes(value) {
           setSudoku(oldSudoku => oldSudoku.map(s => {
            if (s.isSelected&& ((s.number) === "") && s.isSelected){
              if(((s.note).filter(note => note === value)).length === 1){
                return {...s, note: ((s.note).filter(note => note != value))}
              }
              else
                return {...s, note: [...s.note, value]}
              }
              return  s
           }))
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
            <button onClick={addNotes} >{notesMode ? "notes" : "write"}</button>
        </main>
    )
}
