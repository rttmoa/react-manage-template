import React from 'react'
import { connect } from 'react-redux'
import { delTodo } from '../store/action'

interface todoIn {
	id: number
	completed?: boolean
	text?: string
	onTodoClick?: any 
}

const Todo = ({id, completed, text, onTodoClick}: todoIn) => {

    return (
        <li>
            <div className="view" onClick={() => {onTodoClick(id)}}>
                <input type="checkbox" checked={completed} readOnly className="toggle"/>
                <label className={completed ? 'completed':''}>{text}</label>
                <button className="destroy" onClick={e => {e.stopPropagation(); delTodo(id) }}></button>
            </div>
        </li>
    )
}
export default connect(null, delTodo => { delTodo })(Todo)
