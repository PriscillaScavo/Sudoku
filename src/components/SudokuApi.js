import React, { Fragment } from 'react';
import Tile from './Tile';
import data from "./data"
import {nanoid} from "nanoid"

export function generateSudokuGrid(schemaId) {
    const sudoku = data.filter(sudoku => sudoku.id === schemaId)[0]
    const grid = []
    sudoku.schema.map(row =>{
        (   row.row.map(tile =>{
                grid.push({
                        value: tile.n ,
                        r: sudoku.schema.indexOf(row),
                        c: row.row.indexOf(tile),
                        id: nanoid(),
                        isNotInitValue: (tile.n === 0)? true : false,
                        note: 0
                        })
            })
        )
    })
    return grid
  }

  export function generateSchemeIdList() {
    const schemesId = []
    data.map(sudoku => {schemesId.push({id: sudoku.id})})
    return schemesId
  }

export function allNumbers() {
    const numbers = []
    for (let i = 0; i <= 9; i++) {
        numbers.push(createNumber(i))
    }
    return numbers
}

function createNumber(i) {
    return {
        value: i,
        id: nanoid(),
        count: null
        }
    }

    function generateRows(sudoku){
        const rows = []
        for(let i = 0; i < 81; i = i + 9){
            rows.push(sudoku.slice(i, i + 9 ))
        }
        return rows;
    }
    function generateColumns(rows){
        const columns = []
        for(let i = 0; i < 9; i++){
            columns.push([])
            for(let j = 0; j < 9; j++){
                (columns[i]).push(rows[j][i])
            }
        }
        return columns;
    }


    function generateSquares(sudoku){
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

export function checkWin(sudoku) {
    const rows = generateRows(sudoku)
    const squareCheck = checkNine(generateSquares(sudoku))
    const rowCheck = checkNine(rows)
    const columnCheck = checkNine(generateColumns(rows))

  if(squareCheck && rowCheck && columnCheck){
      return true
   }
   return false
}

function checkNine(arrayCheck){
    return arrayCheck.reduce((condition, subArray) => {
        return (checkSubArray(subArray) && condition)
    }, true)
}

function checkSubArray(subArray){
    return subArray.reduce((tot, {value}) => {
        return value != ""? tot.add(value): tot
     }, new Set()).size === 9

}