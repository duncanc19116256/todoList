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
    
    const {todoItemKey, deleteTodoItem, updateTodoItemMessage, todo} = props;
    const todoItemRef = useRef(null);
    // const [inputEdited, setInputEdited] = useState(false);
    let inputEdited = false;
    var message = todo;

    const deleteCurrent = () => 
    {
        deleteTodoItem(todoItemKey);


    }

    const updateMessage = () =>
    {        
        
        updateTodoItemMessage(todoItemKey, todoItemRef.current.value);

    }
    
    useEffect(() =>
    {
        const todoInput = document.getElementById(todoItemKey);


        function checkOutside(e) 
        {
            // console.log("todoItem checkOutside called: ", todoItemRef);
            var clickedInsideInput = todoInput.contains(e.target);
            if (inputEdited && !clickedInsideInput) {

                updateMessage();
                inputEdited = false;
            }
        }

        document.addEventListener("click", (e) => checkOutside(e));

        return (() => 
        {
            document.removeEventListener("click", (e) => checkOutside(e));
        })

    })



    return (
        <div className={tStyle.todoItemContainer}>
            <input type="text" 
                   placeholder="what to do... " 
                   defaultValue={message} 
                   id = {todoItemKey}
                   ref={todoItemRef}
                   className={tStyle.messageInput}
                   onChange={(e) => {inputEdited = true; console.log("textinput changed");}}
                   />
            
            <div className={tStyle.deleteContainer} onClick={deleteCurrent}>✘</div>
        </div>
    );
}

export default Card;
