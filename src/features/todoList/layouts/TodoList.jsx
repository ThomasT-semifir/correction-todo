import React, { useState } from 'react'
import { Todo } from '../components/Todo'
import { todoData } from '../services/todoData'

export const TodoList = () => {

    const [todos, setTodos] = useState(todoData)

    const deleteTodo = (id) => {
        setTodos((todos) => {return todos.filter(todo => todo.id !== id)})
    }

    return (
        <>
            { todos.map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo}/>})}
        </>
    )
}
