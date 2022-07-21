const URL ="http://localhost:3200/todoData"

class TodoService{

    findAll = () => {
        return fetch(URL).then((res, rej) => res.json())
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

}

export const todoService = Object.freeze(new TodoService())