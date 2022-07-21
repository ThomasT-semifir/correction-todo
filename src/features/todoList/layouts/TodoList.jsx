import React, { useState } from 'react'
import { Todo } from '../components/Todo'
import { todoData } from '../services/todoData'
import { Button }from 'primereact/button'

export const TodoList = () => {
    const [todos, setTodos] = useState(todoData)
    const [filter, setFilter] = useState(null)

    // création d'un objet filters afin de créer les boutons de filtre dynamiquement grâce à un map
    const filters = {
        "Terminés": "true",
        "A faire": "false",
        "tous": null
    }

    const deleteTodo = (id) => {
        setTodos((todos) => {return todos.filter(todo => todo.id !== id)})
    }

    /**
     * 
     * @param {*} modifiedTodo todo dont la valeur isDone a été modifié en cliquant sur le bouton
     * 
     * Cette fonction permet de mettre le state à jour en incluant la nouvelle valeur de isDone du todo concerné
     */
    const toggleDone = (modifiedTodo) => {
        // j'itère sur l'ensemble de ma liste de todos actuellement dans le state: 
        // lorsqu'il rencontre l'id du todo modifié, il remplace le todo dont la valeur isDone a été changée
        // par le nouveau todo généré par le composant <Todo /> (nommé en tant que modifiedTodo)
        const tempTodoList = todos.map(todo => todo.id === modifiedTodo.id ? modifiedTodo : todo )

        // j'écrase la valeur précédente du state pour avoir un nouveau rendu
        setTodos(tempTodoList)
    }

    const handleClickFilter = (event) => {
        console.log(Object.keys(filters))
        setFilter(filters[event.target.innerText])
    }

    /**
     * 
     * @param {*} status Filtre à considérer pour retourner les éléments à afficher
     * @returns la liste de todos correspondant au filtre. Si aucun filtre n'est spécifé, je retourne l'ensemble de la liste
     */
    const filterByStatus = (status) => {
        if (!status) {
            return todos
        } else {
            const filteredList = todos.filter((todo) => todo.isDone.toString() === filter)
            return filteredList
        }
    }  

    return (
        <>
            <div>
                { Object.keys(filters).map((text, index) => {
                    return <Button onClick={handleClickFilter} key={index}>{text}</Button>
                })}
            </div>
            {/* première écriture: si absence de filtre, je map sur tous les todo. Si un filtre est présent, je fais un filter pour ne récupérer que les todo souhaités et ensuite je map dessus*/}
            {/* { !filter && todos ? 
                todos.map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo} toggleDone={toggleDone}/>})
                : todos.filter((todo) => todo.isDone.toString() === filter)
                        .map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo} toggleDone={toggleDone}/>})
            } */}
            {/* deuxième écriture: je crée une fonction qui filtre automatquement les todo en fonction du filtre dans le state. C'est la fonction qui détermine les éléments sur lesquels je vais faire mon map*/}
            { todos && filterByStatus(filter).map((todo, index) => {return <Todo key={index} todo={todo} deleteTodo={deleteTodo} toggleDone={toggleDone}/>})}
        </> 
    )
}
