function TodoTable(props) {

  return (
    <>
      <table>
          <thead>
              <th>title</th>
              <th>comment</th>
              <th></th>
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
