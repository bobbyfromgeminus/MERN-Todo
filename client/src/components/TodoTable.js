function TodoTable(props) {

  return (
    <>
      <button type="button" onClick={ () => props.switcher('creator') }>Create new Todo</button>
      <table>
          <thead>
            <tr>
              <th>title</th>
              <th>comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.todos.map((todo, index) => (
              <tr key={index} id={todo._id}>
                  <td>{todo.title}</td>
                  <td>{todo.comment}</td>
                  <td>
                      <i className="fas fa-pen-square" onClick={ () => { props.handleTodoEditor(todo) } }></i>
                      <i className="fas fa-trash" onClick={ () => { props.deleteTodo(todo) } }></i>
                  </td>
              </tr>
            ))}
          </tbody>
      </table>
    </>
  )
}

export default TodoTable;
