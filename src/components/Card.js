/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Card.js
 * 
 * 
 * 
 * 
 */


import {useState, useEffect, useRef} from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';

import TodoItem from '../components/TodoItem.js'


import cStyle from './style/Card.module.css';


function Card(props) {
    const {cardKey, card, cards, addTodoItem, deleteTodoItem, removeCard, updateTodoItemMessage, updateCardName, removeState} = props;
 
    
    const removeCardID = useRef(null);
    const cardRef = useRef(null);

    
    
    const switchColor = (elem) => {
        console.log("fired once");
        if (elem.target.style.textDecoration == "line-through") {
            console.log("clicked ", elem.target.style.textDecoration)
            elem.target.style.textDecoration = "";
            elem.target.style.backgroundColor = "#ffffff";
            elem.target.style.color = "#666668";
        }
        else {
            // elem.target.style.backgroundColor = "#9ecd49";
            elem.target.style.color = "#9ecd49";
            elem.target.style.textDecoration = "line-through";

            // elem.target.style.border = "#9ecd49 2px solid"
        }
      

    }

    /*  addTodo()
        Purpose:    calls addTodoItem and pass in cardKey
        Effect:     Calls props function addTodoItem and pass in CardID
        Parameters: none
    */
    const addTodo = () => 
    {
        addTodoItem(cardKey);
    }

 

    const updateCardNameWithTarget = () => 
    {
        console.log("cardjs updateCardNameWthTar targetval: ", cardRef.current.value);
        updateCardName(cardKey, cardRef.current.value)
    }

    const removeCardWithKey = () => 
    { 
        removeCard(cardKey);
    }

    /*  deleteTodoItemWithKey()
        Purpose:    calls deleteTodoItem and pass in cardKey
        Effect:     Calls props function deleteTodoItem and pass in 
                    cardKey with received arguments todoItemKey
        Parameters: int todoItemKey - the identifier to the todoItem that will
                                      be changed 
    */
    const deleteTodoItemWithKey = (todoItemKey) => 
    {
        deleteTodoItem(cardKey, todoItemKey);
    }

    /*  updateTodoItemMessageWithKey()
        Purpose:    calls updateTodoItemMessage and pass in cardKey
        Effect:     Calls props function updateTodoItemMessage and pass in 
                    cardKey with received arguments todoItemKey and message
        Parameters: int todoItemKey - the identifier to the todoItem that will
                                      be changed 
                    string message  - the message that needs to be saved
    */
    const updateTodoItemMessageWithKey = (todoItemKey, message) => 
    {
        updateTodoItemMessage(cardKey, todoItemKey, message);
    }


   


    return (
        <div className={removeState ? cStyle.cardRemoveContainer : cStyle.cardContainer} 
             /* onClick={async () => await props.removeCard(cardKey)} */>
            <div className={cStyle.titleContainer}> 
                <input type="text" 
                       placeholder="Enter a name..." 
                       defaultValue={card.name} 
                       ref={cardRef}
                       className={cStyle.titleInput}
                       onBlur={updateCardNameWithTarget}
                       />
                <div className={cStyle.addTodo} onClick={() => {addTodo(); console.log("add button clicked")}}>＋</div>
            </div>
            

            <div className={cStyle.scrollableContainer}> 
                
                {
                    Object.keys(card.todoList).map((todoItemKey, index) => {

                        return (
                            // console.log("card.js ")
                            <TodoItem todo={card.todoList[todoItemKey]}
                                      card={card}
                                      todoItemKey = {todoItemKey}
                                      key = {index}
                                      deleteTodoItem={deleteTodoItemWithKey}
                                      updateTodoItemMessage={updateTodoItemMessageWithKey}>
                                      </TodoItem>
                        )
                    })
                }
                
                
            </div>
            <div  ref={removeCardID} className={cStyle.removeOverlayContainer}>
                {removeState ? <div className={cStyle.removeOverlay} onClick={removeCardWithKey}>CLICK TO REMOVE</div> : <span></span>}
            </div>
        
        </div>
    );
}

export default Card;
