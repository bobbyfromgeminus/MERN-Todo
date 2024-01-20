import { useState, useEffect } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import TodoTable from './components/TodoTable';
import TodoInfo from './components/TodoInfo';
import TodoEditor from './components/TodoEditor';
import TodoDelete from './components/TodoDelete';
import TodoCreator from './components/TodoCreator';

function App() {
  const [fetchCounter, setFetchCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [component, setComponent] = useState(<Welcome/>);

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

  const handleTodoInfo = (user) => {
    setSelectedTodo(user._id);
    setComponent(<TodoInfo selectedTodo={user} />);
  }

  const handleTodoEditor = (user) => {
    setSelectedTodo(user._id);
    setComponent(<TodoEditor selectedTodo={user} updateTodo={updateTodo}/>);
  }

  const handleTodoCreator = () => {
    setComponent(<TodoCreator createNewTodo={createNewTodo}/>);
  }


  // Fetch handlers ------------------------------------------------

  const createNewTodo = async (user) => {
    try {
      const createdTodo = await fetchData('POST', ``, user);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(createdTodo._id);
      setComponent(<TodoInfo selectedTodo={createdTodo} />);
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  const updateTodo = async (todo) => {
    const todoMod = {
      title: todo.name,
      comment: todo.email
    }
    try {
      const updatedTodo = await fetchData('PATCH', `/${todo._id}`, todoMod);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(updatedTodo._id);
      setComponent(<TodoInfo selectedTodo={updatedTodo} />);
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  const deleteTodo = async (todo) => {
    try {
      const deletedTodo = await fetchData('DELETE', `/${todo._id}`);
      setFetchCounter(fetchCounter + 1);
      setSelectedTodo(0);
      setComponent(<TodoDelete deletedTodo={deletedTodo}/>);
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  // ---------------------------------------------------------------

  return (
    <div id="layout-grid">
      <header>
          <i className="fas fa-todos"></i> TODO Editor
      </header>
      <aside>
        <TodoTable  todos={todos} 
                    handleTodoInfo={handleTodoInfo} 
                    handleTodoEditor={handleTodoEditor} 
                    deleteTodo={deleteTodo}
                    handleTodoCreator={handleTodoCreator}
        />
      </aside>

      <main>
        {component}
      </main>
    </div>
  )
}

export default App;
