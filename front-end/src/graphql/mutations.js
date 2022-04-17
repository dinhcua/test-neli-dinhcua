import { gql } from "@apollo/client";

const addSingleTodo = gql`
    mutation addSingleTodoMutation ($description: String) {
        createTodo(description: $description) {
            description
        }
    }
`

const editSingleTodo = gql`
    mutation editSingleTodoMutation ($id: Int!, $description: String, $isFinished: Boolean){
        editTodo(id: $id, description: $description, isFinished: $isFinished){
            id
            description
            isFinished
        }
    }
`

const deleteSingleTodo = gql`
mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`
export { addSingleTodo, editSingleTodo, deleteSingleTodo }