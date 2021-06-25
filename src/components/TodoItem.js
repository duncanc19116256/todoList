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
    /*REVIEW2: 這邊的 keyDown 操作就是對的！根據 event 給的 key/keyCode 來操作都可以～
    有個小小瑕疵是既然做了 enter 可以新增一行的功能，但按完卻只有 blur，還是要用滑鼠操作點擊新的那行才可以輸入文字，
    建議可以練習看把 focus 帶到新增的那一行
    */
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
        onChange={updateMessage}
        onKeyDown={handleKeyDown}
      />

      <div className={tStyle.deleteContainer} onClick={deleteCurrent}>
        ✘
      </div>
    </div>
  );
}

export default Card;
