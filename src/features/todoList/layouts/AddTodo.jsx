import React, { useState } from 'react'
import uuid from 'react-uuid'
import { TodoInput } from '../components/TodoInput'

export const AddTodo = (props) => {
    const [newTodo, setNewTodo] = useState({
        id: uuid(),
        label: "",
        dateEcheance: "",
        isDone: false
    })

    const todoKeys = [{
        name: "label",
        text: "tâche",
        type: "text"
    },
    {
        name: "dateEcheance",
        text: "",
        type: "date"
    }]

    const style = {
        container: {
            display: "flex",
            flexDirection: "row",
            marginTop: "5vh",
            maxWidth: "30vh"
        }
    }

    const saveInput = (name, value) => {
        setNewTodo((previousTodo) => {return {...previousTodo, [name]: value}})
    }

    const handleClickSave = () => {
        // setNewTodo((todo) => {return {...todo, id: uuid()}})
        props.addTodo(newTodo)
    }

    return (
        <>
            <h2>Ajouter un Todo</h2>
            <div style={style.container}>
                {todoKeys.map((item, index) => (<TodoInput item={item} key={index} todo={newTodo} saveInput={saveInput}/>))}
            </div>
            <button onClick={handleClickSave}>Save</button>
        </>
    )
}
