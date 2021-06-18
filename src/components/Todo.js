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

let cardsDefault = new Object();
console.log("when is this called? "); 
const checkSaveAction = localStorage.getItem("saveAction") === "true";

function Todo() {


    
    // var cardsDefault = new Object();
    cardsDefault = {
        0: {
            name: "",
            todoList: {
                0: "",
            },
            todoListKey: 1,
        }, 
        
    };

    const [cards, setCards] = useState(() => checkSaveAction ? JSON.parse(localStorage.getItem("savedCards")) : cardsDefault);
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
    const addCard = async() => 
    {
        console.log("addCard called");
        setRemoveState(false);
        

        let tempCards = { ...cards };

        tempCards[key] = JSON.parse(JSON.stringify(cardsDefault[0]));

        /*  increment key by 1 */
        setKey(prev => prev + 1);

        setCards(tempCards);
     
        

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
        /* Ensures only delete card when removeState is on */
        let tempCards = { ...cards };
           
        delete tempCards[cardKey];

        setCards(tempCards);
            

        

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
        let tempCards = { ...cards };

        tempCards[cardKey].name = cardName;
        setCards(tempCards);

        


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
        
        let tempCards = { ...cards };

        /*  Adds new todoItem to the card */
        tempCards[cardKey].todoList = {
            ...tempCards[cardKey].todoList,
            [tempCards[cardKey].todoListKey] : "",
        }
        
        /* This increments the todoListKey by 1 to ensure adding todoItem is 
           added correctly each time */
        tempCards[cardKey].todoListKey++;
        setCards(tempCards);

     

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
    const deleteTodoItem = async (cardKey, todoItemKey) => 
    {

        /*  Only deletes the todoItem if the card has todoItemList > 1 */
        if (Object.keys(cards[cardKey].todoList).length > 1) {
            let tempCards = { ...cards };
            
            delete tempCards[cardKey].todoList[todoItemKey];

            setCards(tempCards);


        }
        
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
        let tempCards = { ...cards };
        
        tempCards[cardKey].todoList[todoItemKey] = message;
        setCards(tempCards);
        
       
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
                    
                    Object.keys(cards).map((cardKey, index) => {
                        return (
                            <Card removeCard = {removeCard}
                                  removeState = {removeState} 
                                  cards={cards}
                                  card = {cards[cardKey]}
                                  cardKey = {cardKey}
                                  addTodoItem={addTodoItem}
                                  key={index}
                                  deleteTodoItem={deleteTodoItem}
                                  updateTodoItemMessage={updateTodoItemMessage}
                                  updateCardName={updateCardName}>
                                    
                            </Card>
                        )
                    })
                }
             
                
            </div>

        </div>
    );
}

export default Todo;
