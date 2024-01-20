function TodoDelete(props) {

    return (
      <>
        <h1>Todo deleted successfully</h1>
        <h2>{props.deletedTodo.title}</h2>
        <p>comment: <b>{props.deletedTodo.comment}</b></p>
        <p>created at: {new Date(props.deletedTodo.createdAt).toLocaleString('hu-HU')}</p>
      </>
    )
  }
  
  export default TodoDelete;