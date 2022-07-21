import React from 'react'
import { TodoButton } from './TodoButton';
import { ImCross } from 'react-icons/im'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import uuid from 'react-uuid';

export const Todo = (props) => {
    const defineBackgroundColor = (todo) => {
        let result;
        const today = Date.now()
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

    /**
     * 
     * @param {*} event event généré par le clic (ne sera pas utilisé ici)
     * 
     * Cette fonction permet de récupérer le todo actuel (celui passé en props) pour changer la valeur de isDone.
     * Elle le renvoie ensuite à la méthode passée en props par le parent pour remonter la modification dans le state
     */
    const toggleDone = (event) => {
        const modifiedTodo = {...props.todo, isDone: !props.todo.isDone}
        props.toggleDone(modifiedTodo)
    }
    
    return (
        <>
            <div style={style.container}>
            <div style={style.cell}>
                <p>{props.todo.label}</p>
                <p>{props.todo.dateEcheance}</p>
                <div style={style.buttons}>
                    <TodoButton handleClick={deleteTodo}><ImCross /></TodoButton>
                    <TodoButton isDone={props.todo.isDone} handleClick={toggleDone}>{props.todo.isDone ? <FaRegThumbsDown /> : <FaRegThumbsUp />} </TodoButton>
                </div>
            </div>
        </div>
        </>
    )
}
