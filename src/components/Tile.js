import React,{ Fragment, useContext, useState, useEffect }  from 'react';
import {nanoid} from "nanoid"

export default function Tile(props){
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes" + props.id))?
    (JSON.parse(localStorage.getItem("notes" + props.id)).map(({value: element}) => {return element} )) : createNotes())
    const [value, setValue] = useState() 

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

    useEffect(() => {
        if(props.note && props.note != ""){
            setNotes(old => [...new Set([...old, props.note])])
        }
        else 
            setNotes(() => [])
    }, [props.note])

    function createNotes(){
        return (props.note && props.note != "")? [props.note] : []
    }
    useEffect(() => {
        localStorage.setItem("notes"+ props.id, JSON.stringify(notes.map(element => {return {value:element}})))
    }, [notes])
    
    useEffect(() => {
        setValue(() => 
        {return (props.value === 0)? ' ':props.value
        })
    }, [props.value])

    function handleChange(event) {
        const value = event.target.value.charAt(1)
        if (value.isDigit() )
        setValue(value)
    }
    return(
        
        <button className= {name} onClick = {props.fillTile} >
            {!props.notesMode &&
                <input
                    id ="tile"
                    type="text"
                    onChange={handleChange}
                    value={value}
                    required
                    maxlength="2" size="1"
                />
            }
            {false && <h2 className="number" > {props.value === 0 ? "": props.value} </h2>}
            <div>
            {props.notesMode && <h4 className="notes"> {notes} </h4>}
            </div>
         </button>
    )
}