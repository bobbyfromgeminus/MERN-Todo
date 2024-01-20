function TodoCreator(props) {

  const handleClick = () => {
    let todo = {
      title: document.querySelector('#title').value,
      comment: document.querySelector('#comment').value
    }
    props.createNewTodo(todo);
  }

  return (
    <>
      <button type="button" onClick={ () => props.switcher('table') }>Show Todos</button>
      <form>
          <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title"/>
          </div>
          <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <input type="text" name="comment" id="comment"/>
              <button type="button" onClick={handleClick}>Create Todo</button>
          </div>
      </form>
    </>
  )
}
  
export default TodoCreator;