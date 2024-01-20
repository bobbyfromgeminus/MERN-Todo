import { useState, useEffect } from 'react';
import './App.css';
import TodoTable from './components/TodoTable';
import TodoEditor from './components/TodoEditor';
import TodoCreator from './components/TodoCreator';

function App() {

  const [fetchCounter, setFetchCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [component, setComponent] = useState('creator');
  
  const apiUrl = '/todos';

  const fetchData = async (reqMethod, urlExt = '', data = null) => {
    const url = apiUrl + urlExt;
    const options = {
      method: reqMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
      const getTodos = async () => {
        try {
          const todosResponse = await fetchData('GET');
          setTodos(todosResponse);
        } catch (error) {
          console.error('Hiba történt:', error);
        }
      };
    
      getTodos();
  }, [fetchCounter]);



  // Component handlers --------------------------------------------

  const handleTodoEditor = (todo) => {
    setSelectedTodo(todo);
    setComponent('editor');
  }

  const switcher = (target) => {
    if (target === 'table') setComponent('table');
    else if (target === 'creator') setComponent('creator');
    else if (target === 'editor') setComponent('editor');
  }


  // Fetch handlers ------------------------------------------------

  const createNewTodo = async (user) => {
    try {
      const createdTodo = await fetchData('POST', ``, user);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(createdTodo);
      switcher('table');
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  const updateTodo = async (todo) => {
    const todoMod = {
      title: todo.title,
      comment: todo.comment
    }
    try {
      const updatedTodo = await fetchData('PATCH', `/${todo._id}`, todoMod);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(updatedTodo);
      switcher('table');
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  const deleteTodo = async (todo) => {
    try {
      await fetchData('DELETE', `/${todo._id}`);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo({});
      setComponent('table');
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  // ---------------------------------------------------------------

  return (
    <div id="root-content">
      <h2>T O D O</h2>
      { component === 'creator' && <TodoCreator switcher={switcher} createNewTodo={createNewTodo}/> }
      { component === 'table' && <TodoTable switcher={switcher} todos={todos} handleTodoEditor={handleTodoEditor} deleteTodo={deleteTodo}/> }
      { component === 'editor' && <TodoEditor switcher={switcher} selectedTodo={selectedTodo} updateTodo={updateTodo}/> }
      
    </div>
  )

}

export default App;
