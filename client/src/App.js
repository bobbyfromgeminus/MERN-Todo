import { useState, useEffect } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import TodoTable from './components/TodoTable';
import TodoEditor from './components/TodoEditor';
import TodoCreator from './components/TodoCreator';

function App() {

  const apiUrl = '/todos';
  /*const components = {
    welcome: <Welcome/>,
    table: <TodoTable todos={todos} handleTodoEditor={handleTodoEditor} deleteTodo={deleteTodo} handleTodoCreator={handleTodoCreator}/>,
    editor: <TodoEditor selectedTodo={selectedTodo} updateTodo={updateTodo}/>,
    creator: <TodoCreator createNewTodo={createNewTodo}/>
  }*/

  const [fetchCounter, setFetchCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [component, setComponent] = useState('creator');

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

  const switcher = () => {
    let switchButton = document.getElementById('switcher');
    if (component === 'creator') {
      switchButton.textContent = 'Create new Todo';
      setComponent('table');
    } else if (component === 'table') {
      switchButton.textContent = 'Show Todos';
      setComponent('creator');
    } else if (component === 'editor') {
      switchButton.textContent = 'Show Todos';
      setComponent('table');
    }
  }


  // Fetch handlers ------------------------------------------------

  const createNewTodo = async (user) => {
    try {
      const createdTodo = await fetchData('POST', ``, user);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(createdTodo);
      switcher();
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
      switcher();
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
      <button type="button" id="switcher" onClick={switcher}>Show Todos</button>
      {
        component === 'creator' && <TodoCreator createNewTodo={createNewTodo}/>
      }
      {
        component === 'table' && <TodoTable todos={todos} handleTodoEditor={handleTodoEditor} deleteTodo={deleteTodo}/>
      }
      {
        component === 'editor' && <TodoEditor selectedTodo={selectedTodo} updateTodo={updateTodo}/>
      }
      {
        component !== 'creator' && component !== 'table' && component !== 'editor' && <Welcome/>
      }
      
      
    </div>
  )
}

export default App;
