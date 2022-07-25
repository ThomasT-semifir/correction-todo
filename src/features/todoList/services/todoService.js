const URL ="http://localhost:3200/todoData"

class TodoService{

    findAll = () => {
        return fetch(URL)
            .then((response, rejected) => response.json())
            .catch(err => console.error(err))
    }

    delete = (id) => {
        return fetch(`${URL}/${id}`, {
            method: 'DELETE',
            }).then((res, rej) => res.json())
    }

    patch = (id, element) => {
        
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(element),
            headers: {"Content-Type": "application/json"}
            }).then((res, rej) => res.json())
        }

    findById = (id) => {
        return fetch(`${URL}/${id}`)
            .then(data => data.json())
    }

    createTodo = (todo) => {
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-Type":"application/json"}
        })
            .then((response, rejected) => response.json())
            .catch(err => console.error(err))
    }

    replaceTodo = (id, todo) => {
        return fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {"Content-Type":"application/json"}
        })
            .then((response, rejected) => response.json())
            .catch(err => console.error(err))
    }

}

export const todoService = Object.freeze(new TodoService())