import React from 'react'
import { TodoButton } from './TodoButton';
import { ImCross } from 'react-icons/im'
import uuid from 'react-uuid';

export const Todo = (props) => {
    const defineBackgroundColor = (todo) => {
        let result;
        const today = Date.now()
        console.log(today, Date.parse(todo.dateEcheance))
        if (today >= Date.parse(todo.dateEcheance) && !todo.isDone) {
            result = "red"
        } else if (today >= Date.parse(todo.dateEcheance) - 864000000 && !todo.isDone) {
            result = "yellow"
        } else {
            result = todo.isDone ? "green" : "lightblue"
        }
        return result;
    }

    const style = {
        container: {
            display: "flex",
            flexDirection: "column"
        },
        cell: {
            display: "flex",
            margin: "auto",
            width: "50%",
            justifyContent: "space-between",
            backgroundColor: defineBackgroundColor(props.todo)
        },
        buttons: {
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: 5,

        }
    }

    const deleteTodo = () => {
        props.deleteTodo(props.todo.id)
        console.log(uuid())
    }
    return (
        <>
<div style={style.container}>
            <div style={style.cell}>
                <p>{props.todo.label}</p>
                <p>{props.todo.dateEcheance}</p>
                <TodoButton handleClick={deleteTodo}><ImCross /></TodoButton>
            </div>
        </div>
        </>
    )
}
