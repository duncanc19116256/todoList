/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Todo.js
 * 
 * 
 * 
 * 
 */


import {useState, useEffect} from 'react';

import Card from '../components/Card.js'
import tStyle from './style/Todo.module.css';


function Todo() {

    const [addState, setAddState] = useState(false);
    const [ident, setIdent] = useState(1);
    const [removeState, setRemoveState] = useState(false);
    let [cards, setCards] = useState([
                                            {
                                                id: 0,
                                                name: "Enter a Name...",
                                                description: "",
                                                todo: [""]
                                            },
                                            
                                        ]);
    /* let [cards, setCards] = useState([
                                            {
                                                id: 0,
                                                name: "Work",
                                                description: "This is card number 1, it is...",
                                                todo: ["item number 1", "item number 2", "item number 3"]
                                            },
                                            {
                                                id: 1,
                                                name: "Summer 2021",
                                                description: "This is card number 1, it is a it is a it is a it is a ...",
                                                todo: ["item number 1 finish my homework on time during ", "item number 2", "item number 3", "comp11 homework", "midterm on thursday", "ec-13 stats pset"]
                                            }
                                        ]); */

    
    const addCard = () => {
        setRemoveState(false);
        cards.push({
                        id: ident,
                        name: "Enter a Name...",
                        description: "",
                        todo: [""] 

        })
        setIdent(ident + 1);
    }

    const removeCard = async(e) => { 
        if (removeState) 
        {
            var ind = 0;
            /* to find the ind of target to be removed */
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].id == e.target.id) {
                    console.log("cards: " , cards[i]);
                    ind = i;
                }
            }

            setCards(cards.filter((_, i) => i !== ind));
            console.log("after delete: " , cards.length);
        }
    }
    
    useEffect( () => {
        
        
    }, [])

    return (
        <div className={tStyle.todoContainer}>
            <div className={tStyle.editsContainer}>
                <button className={tStyle.addEvent}
                        onClick={addCard}>
                    ＋
                </button>
                <button className={tStyle.removeEvent}
                        onClick={() => {console.log(removeState); setRemoveState(!removeState); console.log(removeState)}}>
                    －
                </button>
            </div>

            <div className={tStyle.cardsContainer}> 
                {
                    cards.map((card) => {
                        console.log(card);
                        return ( <Card removeCard={removeCard}
                                       removeState={removeState}
                                       card={card}></Card>);
                    })
                }
                
            </div>

        </div>
    );
}

export default Todo;
