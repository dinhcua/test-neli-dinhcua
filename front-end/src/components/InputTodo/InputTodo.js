import React, { useState } from 'react'
import './InputTodo.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation } from "@apollo/client";
import { addSingleTodo } from '../../graphql/mutations';
import { getTodos } from '../../graphql/queries';
function InputTodo() {
    //state todoTyping to store value task typing
    const [todoTyping, setTodoTyping] = useState("")
    //addTodo is mutation to add single todo
    const [addTodo] = useMutation(addSingleTodo);
    const test = () => {
        return 10
    }
    const setTodo = (e) => {
        setTodoTyping(e.target.value)
    }
    // Press cancel button to clear task typing
    const cancelTyping = () => {
        setTodoTyping("")
    }
    // When you press the Enter key, handle saves everything to the database.
    const handleEnterTodo = (e) => {
        if (e.key === "Enter") {
            addTodo({
                variables: {
                    description: todoTyping
                },
                refetchQueries: [{ query: getTodos }]
            })
            setTodoTyping("")
        }
    }

    return (
        <div className='input'>
            <div className='addmark'>
                <AiOutlinePlus color='white' fontWeight="bold" fontSize={24} />
            </div>
            <input className="input-todo" type="text" placeholder='Add your new task ...' onChange={(e) => setTodo(e)} value={todoTyping} onKeyDown={(e) => handleEnterTodo(e)} />
            <span className={todoTyping ? "cancel-input" : "cancel-input-hiden"} onClick={cancelTyping}>cancel</span>
        </div>
    )
}

export default InputTodo