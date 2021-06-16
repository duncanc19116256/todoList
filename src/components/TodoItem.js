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

    
    
    
    
    const deleteCurrent = () => 
    {
        deleteTodoItem(todoItemKey);


    }

    const updateMessage = (e) =>
    {        
        updateTodoItemMessage(todoItemKey, e.target.value);

    }
    
   



    return (
        <div className={tStyle.todoItemContainer}>
            <input type="text" 
                   placeholder="what to do... " 
                   value={todo} 
                   className={tStyle.messageInput}
                   onChange={(e) => updateMessage(e)}
                   />
            
            <div className={tStyle.deleteContainer} onClick={deleteCurrent}>✘</div>
        </div>
    );
}

export default Card;
