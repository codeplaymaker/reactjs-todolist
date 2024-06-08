import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import TodoInput from './components/TodoInput'; // Import the TodoInput component
import TodoList from './components/TodoList'; // Import the TodoList component

// Main App component
function App() {
  const [todos, setTodos] = useState([]); // State to hold the list of todos
  const [todoValue, setTodoValue] = useState(''); // State to hold the current value of the todo input

  // Function to persist todos to localStorage
  const persistData = (newList) => {
    localStorage.setItem('todos', JSON.stringify(newList)); // Save the updated list of todos to localStorage
  };

  // Function to handle adding a new todo
  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo]; // Create a new list with the added todo
    persistData(newTodoList); // Persist the new list to localStorage
    setTodos(newTodoList); // Update the state with the new list
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index); // Filter out the todo to be deleted
    persistData(newTodoList); // Persist the new list to localStorage
    setTodos(newTodoList); // Update the state with the new list
  };

  // Function to handle editing a todo
  const handleEditTodo = (index) => {
    const valueToBeEdited = todos[index]; // Get the value of the todo to be edited
    setTodoValue(valueToBeEdited); // Set the input value to the todo's value for editing
    handleDeleteTodo(index); // Delete the todo from the list to be re-added after editing
  };

  // useEffect hook to load todos from localStorage on component mount
  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos')) || []; // Get todos from localStorage or set to empty array if not present
    setTodos(localTodos); // Update the state with the todos from localStorage
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      {/* Render TodoInput component with necessary props */}
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
      {/* Render TodoList component with necessary props */}
    </>
  );
}

export default App; // Export the App component as the default export
