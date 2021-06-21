/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Card.js
 * 
 * 
 * 
 * 
 */

import TodoItem from '../components/TodoItem.js'


import cStyle from './style/Card.module.css';


function Card(props) {
    const {cardKey, card, addTodoItem, deleteTodoItem, removeCard, updateTodoItemMessage, updateCardName, removeState} = props;
    

    /*  addTodo()
        Purpose:    calls addTodoItem and pass in cardKey
        Effect:     Calls props function addTodoItem and pass in CardID
        Parameters: none
    */
    const addTodo = () => 
    {
        addTodoItem(cardKey);
    }

 

    const updateCardNameWithTarget = (e) => 
    {

        updateCardName(cardKey, e.target.value)
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
        console.log("what is the cardKey: ", cardKey)

    }




    return (
        <div className={removeState ? cStyle.cardRemoveContainer : cStyle.cardContainer} 
             /* onClick={async () => await props.removeCard(cardKey)} */>
            <div className={cStyle.titleContainer}> 
                <input type="text" 
                       placeholder="Enter a name..." 
                       value={card.name} 
                       className={cStyle.titleInput}
                       onChange={(e) => updateCardNameWithTarget(e)}
                       />
                <div className={cStyle.addTodo} onClick={() => {addTodo();}}>＋</div>
            </div>
            

            <div className={cStyle.scrollableContainer}> 
                
                {
                    card.todoList &&
                    card.todoList.map((todoItem) => {

                        return (

                            <TodoItem todo={todoItem.message}
                                    //    REVIEW: 這個 card 沒有用到
                                      card={card}
                                      todoItemKey = {todoItem.todoItemKey}
                                      key = {todoItem.todoItemKey}
                                      deleteTodoItem={deleteTodoItemWithKey}
                                      updateTodoItemMessage={updateTodoItemMessageWithKey}>
                                      </TodoItem>
                        )
                    })
                }
                
                
            </div>
            <div  className={cStyle.removeOverlayContainer}>
                {removeState ? <div className={cStyle.removeOverlay} onClick={removeCardWithKey}>CLICK TO REMOVE</div> : <span></span>}
            </div>
        
        </div>
    );
}

export default Card;
