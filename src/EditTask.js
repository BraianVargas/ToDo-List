import React from "react";
import { useState } from "react";
import Header from "./Header";


const styles = {
    btn: {
        padding: '10px',
        margin: '5px',
    }
}

const EditTask = ({currentToDo, toDo, setEdit, onEditInputChange, onEditFormSubmit}) => {
    const [userInput] = useState({task: toDo.task});

    
    // function handleEditInputChange(e) {
    //     // set the new state value to what's currently in the edit input box
    //     setValue({ ...todo, text: e.target.value });
    //     console.log(todo);
    // }
    return (
        <div>
        <Header 
            message = {'Editing "' + userInput.task + '"'}
        />
        <form onSubmit={onEditFormSubmit}>
            <input
                style={styles.btn}
                name="updateTodo"
                type="text"
                placeholder="Edit ToDo"
                value={toDo.task}
                onChange={onEditInputChange}
            />
            <button style={styles.btn} type="submit" onClick={onEditFormSubmit}>
                Save
            </button>
            <button style={styles.btn} onClick={() => setEdit(false)}>Cancel</button>
        </form>
        </div>
    );
}

export default EditTask;