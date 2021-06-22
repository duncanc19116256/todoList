/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * TodoItem.js
 *
 *
 *
 *
 */

import tStyle from "./style/TodoItem.module.css";

function Card(props) {
  const { todoItemKey, deleteTodoItem, updateTodoItemMessage, addTodo, todo } =
    props;

  const deleteCurrent = () => {
    deleteTodoItem(todoItemKey);
  };

  const updateMessage = (e) => {
    updateTodoItemMessage(todoItemKey, e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
      e.target.blur();
    }
  };

  return (
    <div className={tStyle.todoItemContainer}>
      <input
        type="text"
        placeholder="what to do... "
        value={todo}
        className={tStyle.messageInput}
        onChange={(e) => updateMessage(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <div className={tStyle.deleteContainer} onClick={deleteCurrent}>
        ✘
      </div>
    </div>
  );
}

export default Card;
