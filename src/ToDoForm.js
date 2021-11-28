import React, { useState } from 'react';

const styles = {
    btn: {
        padding: '10px',
        margin: '5px',
    }
}


const ToDoForm = ({ addTask }) => {
    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input style={styles.btn}
            value={userInput} type="text" onChange={handleChange} placeholder="New task"/>
            <button style= {styles.btn}>
                Add
            </button>
        </form>
    );
};

export default ToDoForm;