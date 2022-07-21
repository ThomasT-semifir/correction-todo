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
}

export const todoService = Object.freeze(new TodoService())