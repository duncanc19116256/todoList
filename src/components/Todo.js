/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Todo.js
 * 
 * 
 * 
 * 
 */


import {useState, useEffect } from 'react';


import Card from '../components/Card.js'
import tStyle from './style/Todo.module.css';

const cardsDefault = [{
    name: "",
    todoList: [{message: "", todoItemKey: 0}],
    todoItemKeyTrack: 1,
    cardKey: 0,
}];
const checkSaveAction = localStorage.getItem("saveAction") === "true";


function Todo() {


    console.log("cardsDefault: ", cardsDefault)
    const [cards, setCards] = useState(checkSaveAction ? JSON.parse(localStorage.getItem("savedCards")) : cardsDefault);
    const [key, setKey] = useState(checkSaveAction ? parseInt(localStorage.getItem("cardKey")) : 1);                      // cardKey
    const [removeState, setRemoveState] = useState(false);

    const [saveList, setSaveList] = useState(true);


    const updateLocal = () =>
    {

        localStorage.setItem("savedCards", JSON.stringify(cards));
        localStorage.setItem("saveAction", saveList);
        localStorage.setItem("cardKey", key);

        
            
    }


    /*  addCard()
        Purpose:    to add an additional card 
        Effect:     sets the state of "remove" to false, preventing users 
                    to add cards while remove state is on. Then makes a copy 
                    of card Object to set new card by adding value of 
                    "cardsDefault[0]" with key "key." finaly, increment key 
                    state.
        Parameters: none
    */
    const addCard = () => 
    {

        setRemoveState(false);
        var temp = {
            name: "",
            todoList: [{message: "", todoItemKey: 0}],
            todoItemKeyTrack: 1,
            cardKey: key,
        }
        setCards(prevArr => prevArr.concat(temp));
        
        
        /*  increment key by 1 */
        setKey(prev => prev + 1);


    }


    /*  removeCard()
        Purpose:    to remove a card with given cardKey identifier
        Effect:     On removeState being true, create a copy of cards Object 
                    to delete the identified card with given parameter cardKey.
                    Then updates the state of cards. 
        Parameters: int cardKey - key to the card to be removed 
    */
    const removeCard = (cardKey) => 
    { 

        setCards(prev => prev.filter(eachCard => eachCard.cardKey !== cardKey));

        

    }
    
    /*  updateCardName()
        Purpose:    to update name of specified card onChange
        Effect:     Creates a copy of cards Object, then alter the name of 
                    specified card. 
        Parameters: int cardKey     - the identifier to the card
                    string cardName  - the name to be saved
    */
    const updateCardName = (cardKey, cardName) => 
    {

        setCards(prevArr => prevArr.map(eachCard => 
                                            eachCard.cardKey === cardKey ? 
                                                {... eachCard, name: cardName}:
                                                {... eachCard}));

    }


    /*  addTodoItem()
        Purpose:    to add an additional todoItem
        Effect:     makes a copy of "cards" to add additional string value
                    to the new key "cards[cardKey].todoListKey". Then increment
                    cards[cardKey].todoListKey by 1. lastly, setCards with the 
                    mutated tempCards Object 
        Parameters: int cardKey  - the identifier to the card that needs 
                                      needs to be altered
    */
    const addTodoItem = (cardKey) => 
    {
        
        setCards(prevArr => prevArr.map(function(eachCard) {
            if (eachCard.cardKey == cardKey) {
                var tempTodoItem = {message: "", todoItemKey: eachCard.todoItemKeyTrack};
                var temp = {...eachCard};
                temp.todoItemKeyTrack++;
                temp.todoList = [...temp.todoList, tempTodoItem];
                return temp;
            }
            return eachCard;
        }))
        
     

    }

    
   
    /*  deleteTodoItem()
        Purpose:    to delete a todoItem
        Effect:     Only allows the deletion of a todoItem if the specified 
                    card has a todoItemList greater than 1. On true, creates 
                    a copy of cards Object to delete the todoItem of at given
                    cardKey at given todoItemKey. finally, update state of 
                    cards. 
        Parameters: int cardKey     - the identifier to the card that contains 
                                      the todoItem
                    int todoItemKey - the identifier to the todoItem that will
                                      be deleted 
    */
    const deleteTodoItem = (cardKey, todoItemKey) => 
    {

        setCards(prevArr => prevArr.map(function(eachCard) {
            if (eachCard.cardKey === cardKey) {
                eachCard.todoList = eachCard.todoList.filter(todoItem => todoItem.todoItemKey != todoItemKey);
            }
            return eachCard;
        }))



    }

    /*  updateTodoItemMessage()
        Purpose:    to update todoItem Message onChange
        Effect:     Creates a copy of cards Object to change the todoItem of at 
                    given cardKey of given todoItemKey. finally, update state 
                    of cards. 
        Parameters: int cardKey     - the identifier to the card that contains 
                                      the todoItem
                    int todoItemKey - the identifier to the todoItem that will
                                      be changed 
                    string message  - the message that needs to be saved
    */
    const updateTodoItemMessage = (cardKey, todoItemKey, message) => 
    {

        setCards(prevArr => prevArr.map(function(eachCard) {
            if (eachCard.cardKey === cardKey) {

                eachCard.todoList.map(function(eachTodoItem, todoItemIdx) {
                    if (eachTodoItem.todoItemKey === todoItemKey) {
                        eachCard.todoList[todoItemIdx].message = message;
                    }
                })
            }
            return eachCard;
        }))
        
       
    }


    /*  acts like a callback function to setCards */
    useEffect(() =>
    {
        updateLocal()

    }, [cards])




    return (
        <div className={tStyle.todoContainer}>
            <div className={tStyle.editsContainer}>
                <div className={tStyle.editButtons}>
                    <button className={tStyle.addEvent}
                            onClick={addCard}>
                        ＋
                    </button>
                    <button className={tStyle.removeEvent}
                            onClick={() => setRemoveState((prev) => !prev)} >
                        －
                    </button>
                </div>
                
                <label className={tStyle.saveListContainer}>
                    <input type="checkbox" name="saveList" className={tStyle.saveCheckbox} checked={saveList} onChange={() => {localStorage.setItem("saveAction", !saveList); setSaveList((prev) => !prev);   }}/>
                    Auto Save
                </label>
            </div>

            <div className={tStyle.cardsContainer}> 
                { 
                    cards &&
                    
                    cards.map((card) => {
                        return (
                            <Card removeCard = {removeCard}
                                  removeState = {removeState} 
                                  cards={cards}
                                  card = {card}
                                  cardKey = {card.cardKey}
                                  addTodoItem={addTodoItem}
                                  key={card.cardKey}
                                  deleteTodoItem={deleteTodoItem}
                                  updateTodoItemMessage={updateTodoItemMessage}
                                  updateCardName={updateCardName}>
                                    
                            </Card>
                        )
                        console.log("card from cards", card)
                    })
                }
             
                
            </div>

        </div>
    );
}

export default Todo;
