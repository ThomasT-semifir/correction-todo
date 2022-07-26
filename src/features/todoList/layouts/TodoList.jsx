import React, { useEffect, useState } from 'react'
import { Todo } from '../components/Todo'
import { todoData } from '../services/todoData'
import { Button }from 'primereact/button'
import { todoService } from '../services/todoService'
import { TodoButton } from '../components/TodoButton'
import { TodoEdit } from '../components/TodoEdit'

export const TodoList = (props) => {
    
    const [filter, setFilter] = useState(null)
    const [selectedTodoId, setSelectedTodoId] = useState(0)
    const [selectedTodo, setSelectedTodo] = useState(null)

    useEffect(() => {
        findTodoById()
    }, [selectedTodoId])

    const findTodoById = () => {
        todoService.findById(selectedTodoId)
            .then(data => setSelectedTodo(data))
    }
    

    // création d'un objet filters afin de créer les boutons de filtre dynamiquement grâce à un map
    const filters = {
        "Terminés": "true",
        "A faire": "false",
        "Tous": null
    }

    const handleClickFilter = (event) => {
        setFilter(filters[event.target.innerText])
        setSelectedTodoId(null)
    }

    /**
     * 
     * @param {*} status Filtre à considérer pour retourner les éléments à afficher
     * @returns la liste de todos correspondant au filtre. Si aucun filtre n'est spécifé, je retourne l'ensemble de la liste
     */

    const filterByStatus = (status) => {
        if (!status) {
            return props.todos
        } else {
            const filteredList = props.todos.filter((todo) => todo.isDone.toString() === filter)
            return filteredList
        }
    }  

    return (
        <>
            <div>
                { Object.keys(filters).map((text, index) => {
                    return <TodoButton handleClick={handleClickFilter} key={index}>{text}</TodoButton>
                })}
            </div>
            {/* première écriture: si absence de filtre, je map sur tous les todo. Si un filtre est présent, je fais un filter pour ne récupérer que les todo souhaités et ensuite je map dessus*/}
            {/* { !filter && todos ? 
                todos.map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo} toggleDone={toggleDone}/>})
                : todos.filter((todo) => todo.isDone.toString() === filter)
                        .map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo} toggleDone={toggleDone}/>})
            } */}
            {/* deuxième écriture: je crée une fonction qui filtre automatquement les todo en fonction du filtre dans le state. C'est la fonction qui détermine les éléments sur lesquels je vais faire mon map*/}
            { (props.todos && !selectedTodoId) && filterByStatus(filter).map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={props.deleteTodo} toggleDone={props.toggleDone} handleClickText={setSelectedTodoId}/>})}
            { (selectedTodo && selectedTodoId) && <TodoEdit todo={selectedTodo} deleteTodo={props.deleteTodo} toggleDone={props.toggleDone} handleClickText={null}/> }
        </> 
    )
}
