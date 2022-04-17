import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { deleteSingleTodo } from '../../graphql/mutations';
import { getTodos } from '../../graphql/queries';
import "./TodoAction.css"
function TodoAction(props) {
    const [deleteTodo] = useMutation(deleteSingleTodo);
    const [active, setActive] = useState("all")
    // Get all the tasks that weren't finished when you clicked the "Active" button.
    const FilterActive = () => {
        let todos = props.data.todos
        let activeTodo = { todos: [] }
        activeTodo.todos = todos.filter(function (todo) {
            return todo.isFinished === false;
        });
        props.setDataTodo(activeTodo)
        setActive("active")
    }
    //Get all the tasks that were finished when you clicked the "completed" button.
    const FilterCompleted = () => {
        let todos = props.data.todos
        let completedTodo = { todos: [] }
        completedTodo.todos = todos.filter(function (todo) {
            return todo.isFinished === true;
        });
        props.setDataTodo(completedTodo)
        setActive("completed")
    }
    // Get all the tasks when you clicked the "All" button.
    const FilterAll = () => {
        let todos = props.data.todos
        let allTodo = { todos: todos }
        props.setDataTodo(allTodo)
        setActive("all")
    }
    // Delete all the tasks when you click "clear completed"
    const clearAllCompleted = () => {
        let todos = props.data.todos
        let completedTodo = { todos: [] }
        completedTodo.todos = todos.map(function (todo) {
            if (todo.isFinished === true) {
                deleteTodo({
                    variables: {
                        id: todo.id
                    },
                    refetchQueries: [{ query: getTodos }]
                })
            }
        });

    }
    return (
        <div className='TodoAction'>
            <p> <b>{props.dataTodo.todos.length}</b> items left</p>
            <div className='action-center'>
                <p className={`btn-all ${active}`} onClick={() => FilterAll()}>All</p>
                <p className={`btn-active ${active}`} onClick={() => FilterActive()}>Active</p>
                <p className={`btn-completed ${active}`} onClick={() => FilterCompleted()}>Completed</p>
            </div>
            <p className='btn-clear-completed' onClick={() => clearAllCompleted()}>Clear Completed</p>
        </div>
    )
}

export default TodoAction