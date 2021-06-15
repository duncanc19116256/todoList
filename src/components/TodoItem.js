/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * TodoItem.js
 * 
 * 
 * 
 * 
 */


import { useState, useEffect, useRef} from 'react';
import { TextInput } from 'react-native';
import { isCompositeComponent } from 'react-dom/test-utils';
import { ClickAwayListener } from '@material-ui/core';



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
        console.log("uipdateMessage onBlur");
        updateTodoItemMessage(todoItemKey, todoItemRef.current.value);

    }
    
   



    return (
        <div className={tStyle.todoItemContainer}>
            <input type="text" 
                   placeholder="what to do... " 
                   defaultValue={card.todoList[todoItemKey]} 
                   ref={todoItemRef}
                   className={tStyle.messageInput}
                   onBlur={updateMessage}
                   />
            
            <div className={tStyle.deleteContainer} onClick={deleteCurrent}>✘</div>
        </div>
    );
}

export default Card;
