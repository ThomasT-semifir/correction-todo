import React, { useEffect, useState } from 'react'
import { AddTodo } from './layouts/AddTodo'
import { TodoList } from './layouts/TodoList'
import { todoData } from './services/todoData'
import { todoService } from './services/todoService'

export const TodoPage = () => {
    const [todos, setTodos] = useState()
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        findAllTodo()
    }, [])
    
    const findAllTodo = () => {
        todoService.findAll().then(data => setTodos(data))
    }

    const deleteTodo = (id) => {
        todoService.delete(id)
            .then(() => findAllTodo())
    }
    
    
    /**
     * 
     * @param {*} modifiedTodo todo dont la valeur isDone a été modifié en cliquant sur le bouton
     * 
     * Cette fonction permet de mettre le state à jour en incluant la nouvelle valeur de isDone du todo concerné
     */
    const toggleDone = (id, element) => {
        // j'itère sur l'ensemble de ma liste de todos actuellement dans le state: 
        // lorsqu'il rencontre l'id du todo modifié, il remplace le todo dont la valeur isDone a été changée
        // par le nouveau todo généré par le composant <Todo /> (nommé en tant que modifiedTodo)
        // const tempTodoList = todos.map(todo => todo.id === modifiedTodo.id ? modifiedTodo : todo )

        // j'écrase la valeur précédente du state pour avoir un nouveau rendu
        // setTodos(tempTodoList)
        todoService.patch(id, element).then(() => findAllTodo())
    }

    /**
     * 
     * @param {*} newTodo todo à ajouter
     * 
     * Cette fonction ajoute un todo à la liste. Elle permet également de ne plus afficher le composant AddTodo une fois qu'on a cliqué sur sauvegarder
     */
    const addTodo = (newTodo) => {
        setTodos((todos) => {return [...todos, newTodo]})
        setShowAdd((value) => !value)
    }

    return (
        <>
            <TodoList todos={todos} toggleDone={toggleDone} deleteTodo={deleteTodo} /> 
            <button onClick={() => setShowAdd((value) => !value)}>ajouter</button>
            {showAdd && <AddTodo addTodo={addTodo}/>}
        </>
    )
}
