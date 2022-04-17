import { gql } from "@apollo/client";

const getTodos = gql`
    query getTodosQuery {
        todos {
            id
            description
            isFinished
        }
    }
`

const getSingleTodo = gql`
    query getSingleTodoQuery ($id : ID!) {
        todo (id: $id) {
            id
            description
            isFinished
        }
    }
`

export { getTodos, getSingleTodo }