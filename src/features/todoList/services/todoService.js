class TodoService {

    URL = "http://localhost:3000/todoData"

    findAll = () => {
        return fetch(URL).then(data => data.json())
                        .catch(err => console.error(err))
    }
}