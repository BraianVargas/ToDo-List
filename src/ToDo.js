import React from 'react';
import EditTask from './EditTask';

const styles = {
    task: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '300px',
        margin: '5px auto',
    },
    strike: {
        textDecoration: 'line-through',
    },
    normal: {
        textDecoration: 'none',
    },
    edit: {
        color : "blue"
    }
}

const ToDo = ({todo, handleToggle, onEdit, currentTodo, onEditInputChange, onEditFormSubmit }) => {
    const [value, setValue] = React.useState({check: todo.complete, id:todo.id, visible: true});
    const [edit, setEdit] = React.useState({visible: false});

    const handleChange = ({e, target}) => {
        setValue((state) => ({
            ...state,
            [target.name]: target.type === 'checkbox' 
                ? target.checked 
                : target.value
            })
        )
        handleToggle(todo.id);
    }

    return (
        <div>
            {edit.visible === false ?
                <div style={styles.task}>
                    <span>
                    {
                        todo.complete ? 
                        <input type="checkbox" name="check" checked={value.check} onChange={handleChange}/>
                        : <input type="checkbox" name="check" onChange={handleChange}/>
                    }
                    </span>
                    <span style= {value.check ? styles.strike : styles.normal}>
                        {todo.task}
                    </span>
                    <a style={styles.edit} onClick={()=>onEdit(todo)}> Edit </a>
                </div>
                :
                <div>
                    <EditTask 
                        currentToDo = {currentTodo}
                        setEdit = {setEdit}
                        onEditInputChange = {onEditInputChange}
                        onEditFormSubmit = {onEditFormSubmit}
                    />
                </div>
            }
        </div>
    );
};
 
export default ToDo;