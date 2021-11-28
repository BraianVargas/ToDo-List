import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({toDoList, handleToggle, onEdit, toDo, setEdit, onEditInputChange, onEditFormSubmit}) => {
    return (
        <div>
            {toDoList.map(todo => {
                return (
                    <ToDo
                        todo={todo}
                        handleToggle = {handleToggle}
                        onEdit = {onEdit}
                        
                        currentToDo = {toDo}
                        setEdit = {setEdit}
                        onEditInputChange = {onEditInputChange}
                        onEditFormSubmit = {onEditFormSubmit}
                        currentTodo= {toDo}
                    />
                )
            })}
        </div>
    );
};
 
export default ToDoList;