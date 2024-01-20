function TodoTable(props) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>comment</th>
            <th>createdAt</th>
            <th className='right'>controllers</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo, index) => (
            <tr key={index} id={todo._id}>
              <td className='bold'>{todo.title}</td>
              <td className='small'>{todo.comment}</td>
              <td className='small'>{new Date(todo.createdAt).toLocaleString('hu-HU')}</td>
              <td className='right'>
                <i className="far fa-eye" onClick={ () => { props.handleTodoInfo(todo) } }></i>
                <i className="fas fa-edit" onClick={ () => { props.handleTodoEditor(todo) } }></i>
                <i className="fas fa-trash" onClick={ () => { props.deleteTodo(todo) } }></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={ () => { props.handleTodoCreator() } }><i className="fas fa-plus-circle"></i> Create New Todo</button>
    </>
  )
}

export default TodoTable;
