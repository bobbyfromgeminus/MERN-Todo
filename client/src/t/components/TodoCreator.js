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
      <h1>Creator</h1>
      <label htmlFor="title">title</label>
      <input type="text" name="title" id="title"/>

      <label htmlFor="comment">comment</label>
      <input type="text" name="comment" id="comment"/>

      <button type="button" onClick={handleClick}><i className="fas fa-plus-circle"></i> Create</button>
    </>
  )
}
  
export default TodoCreator;