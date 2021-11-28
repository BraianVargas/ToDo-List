import React, { useState } from 'react';
import data from "./data.json";
//components
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import EditTask from "./EditTask";
 
import './App.css';
import Header from './Header';

function App() {
  const [ toDoList, setToDoList ] = useState(data);
  const [edit, setEdit] = React.useState();
  const [currentTodo, setCurrentTodo] = useState('');

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === id ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }
  
  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }
  

// *******************************************************************  
  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, task: e.target.value });
  }

  
  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = toDoList.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setEdit(false);
    setToDoList(updatedItem);
  }

  const handleEdit = (todo) => {
    setEdit(true);
    setCurrentTodo({ ...todo });
  }

// *********************************************************************
  return (
    <div className="App">
      {edit ?
        (
          <div>
            <EditTask 
              currentToDo = {currentTodo}
              setEdit = {setEdit}
              onEditInputChange = {handleEditInputChange}
              onEditFormSubmit = {handleEditFormSubmit}
              toDo= {currentTodo}
            />
          </div>
        ) : (
        <div>
          <Header 
            message = "ToDo List"
          />
          <ToDoList 
            toDoList={toDoList} 
            handleToggle={handleToggle}
            onEdit={handleEdit}
            
            currentToDo = {currentTodo}
            setEdit = {setEdit}
            onEditInputChange = {handleEditInputChange}
            onEditFormSubmit = {handleEditFormSubmit}
            toDo= {currentTodo}
            
          />
          <ToDoForm
            addTask={addTask}
          />
        </div>
        )
      }
    </div>
  );
}
 
export default App;