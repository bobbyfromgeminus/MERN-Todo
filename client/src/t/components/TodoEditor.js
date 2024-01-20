import React, { useState, useEffect } from 'react';

function TodoEditor(props) {

  const [todoData, setTodoData] = useState({
    _id: props.selectedTodo._id,
    title: props.selectedTodo.title,
    comment: props.selectedTodo.comment,
  });

  useEffect(() => {
    setTodoData({
      _id: props.selectedTodo._id,
      title: props.selectedTodo.title,
      comment: props.selectedTodo.comment,
    });
  }, [props.selectedTodo]);


  const handleClick = () => {
    props.updateTodo(todoData);
  }


  return (
    <>
      <h1>Editor</h1>
      <label htmlFor="title">title</label>
      <input type="text" name="title" id="title" value={todoData.title} onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}/>

      <label htmlFor="comment">comment</label>
      <input type="text" name="comment" id="comment" value={todoData.comment} onChange={(e) => setTodoData({ ...todoData, comment: e.target.value })}/>

      <button type="button" onClick={handleClick}><i className="fas fa-plus-circle"></i> Update</button>
    </>
  )
}
  
export default TodoEditor;
  