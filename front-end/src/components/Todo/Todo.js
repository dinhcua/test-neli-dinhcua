import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { GrClose } from 'react-icons/gr';
import { AiOutlineCheck } from 'react-icons/ai';
import { deleteSingleTodo, editSingleTodo } from '../../graphql/mutations';
import { getTodos } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
function Todo(props) {
    const [todo, setTodo] = useState("")
    useEffect(() => {
        setTodo(props.description)
    }, [])
    const [editTodo] = useMutation(editSingleTodo);
    const [deleteTodo] = useMutation(deleteSingleTodo);
    // toggle finished state of task 
    const toggleTodoCompleted = (id, isFinished, description) => {
        editTodo({
            variables: {
                id: id,
                description: description,
                isFinished: !isFinished
            },
        })
    }
    // Click on the content task description to edit the task. A completed task cannot be edited.
    const editContentTodo = (e, id) => {
        setTodo(e.target.value)
        editTodo({
            variables: {
                id: id,
                description: e.target.value,
                isFinished: false
            },
        })
    }
    // When you focus your mouse on the input box, if you delete all the text in the input box, then this task will be deleted.
    const handleFocusOut = (e, id) => {
        if (e.target.value === "") {
            deleteTodo({
                variables: {
                    id: id
                },
                refetchQueries: [{ query: getTodos }]
            })
        }
    }
    // delete this task when you click the delete button.
    const deleteThisTodo = (id) => {
        deleteTodo({
            variables: {
                id: id
            },
            refetchQueries: [{ query: getTodos }]
        })
    }
    return (
        <div className='Todo'>
            {(props.completed === true)
                ?
                <div className='todo-left'>
                    <div className='tickmark' onClick={() => toggleTodoCompleted(props.id, props.completed, todo)}>
                        <AiOutlineCheck color='white' fontWeight="bold" fontSize={24} />
                    </div>
                    <p className='todo-name todo-done'>{props.description}</p>
                </div>
                :
                <div className='todo-left'>
                    <span className="checkmark" onClick={() => toggleTodoCompleted(props.id, props.completed, todo)}></span>
                    <p className='todo-name'  >
                        <input type="text" value={todo} className="edit-todo" onChange={(e) => editContentTodo(e, props.id)} onBlur={(e) => handleFocusOut(e, props.id)} />
                    </p>
                </div>
            }
            <GrClose className='delete' onClick={() => deleteThisTodo(props.id)} />
        </div>
    )
}

export default Todo