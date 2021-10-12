import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from "../../context";
import "./TodoItem.css";

function TodoItem({ todo, index, onChange }) {
    const { removeTodo } = useContext( Context );
    const classes = [];

    if (todo.completed) {
        classes.push('done')
    }
    return (
    <li className="list-item">
        <span className={classes.join(' ')}>
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => onChange(todo.id)} />
            <strong>{index + 1}</strong>
            &nbsp;
            {todo.title}
        </span>

        <button onClick={removeTodo.bind(null, todo.id)} className='delete-btn'>&times;</button>
    </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;