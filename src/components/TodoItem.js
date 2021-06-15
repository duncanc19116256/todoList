/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * TodoItem.js
 * 
 * 
 * 
 * 
 */


import { useRef } from 'react';




import tStyle from './style/TodoItem.module.css';


function Card(props) {
    
    const {todoItemKey, deleteTodoItem, updateTodoItemMessage, todo, card} = props;
    const todoItemRef = useRef(null);

    
    
    
    const deleteCurrent = () => 
    {
        deleteTodoItem(todoItemKey);


    }

    const updateMessage = () =>
    {        
        updateTodoItemMessage(todoItemKey, todoItemRef.current.value);

    }
    
   



    return (
        <div className={tStyle.todoItemContainer}>
            <input type="text" 
                   placeholder="what to do... " 
                   value={todo} 
                   ref={todoItemRef}
                   className={tStyle.messageInput}
                   onChange={updateMessage}
                   />
            
            <div className={tStyle.deleteContainer} onClick={deleteCurrent}>✘</div>
        </div>
    );
}

export default Card;
