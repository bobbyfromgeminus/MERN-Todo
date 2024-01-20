function TodoInfo(props) {

    return (
      <>
        <h1>Todo Data</h1>
        <h2>{props.selectedTodo.title}</h2>
        <p>comment: <b>{props.selectedTodo.comment}</b></p>
        <p>created at: {new Date(props.selectedTodo.createdAt).toLocaleString('hu-HU')}</p>
      </>
    )
  }
  
  export default TodoInfo;
  