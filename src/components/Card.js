/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Card.js
 * 
 * 
 * 
 * 
 */


import {useState, useEffect, useRef} from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';



import cStyle from './style/Card.module.css';


function Card(props) {

    const [addState, setAddState] = useState(false);
    const [textElem, setTextElem] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [todo, setTodo] = useState(props.card.todo);
    const todoRef = useRef(null);
        


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

    const addTodo = () => {
        if (todo.length >= 1 && !(todo[todo.length - 1] == " ")) {
            var joined = todo.concat(" ");
            setTodo(joined);
        }
        
    }

    const removeTodo = (deets) => {
        console.log("hey ", deets);
        console.log("todo len ", todo.length);
        console.log("todo: ", todo);
        if (todo.length > 1) {
            var ind = 0;
            /* to find the ind of target to be removed */
            for (var i = 0; i < todo.length; i++) {
                console.log("items", i, ":  " , todo[i] );
                if (todo[i] == deets) {
                    ind = i;
                }
            }

            console.log("find ind: ", ind);
            setTodo(todo.filter((_, i) => i !== ind));
        }
        

    }

    return (
        <div className={props.removeState ? cStyle.cardRemoveContainer : cStyle.cardContainer} id={props.card.id} onClick={(e) => {props.removeCard(e)}}>
            <div className={cStyle.titleContainer}> 
                <div className={cStyle.cardName}
                    dangerouslySetInnerHTML={{__html: props.card.name}}
                    contentEditable="true">
                </div>
                <div className={cStyle.addTodo} onClick={() => {addTodo(); console.log("add button clicked")}}>＋</div>
            </div>
            

            <div className={cStyle.scrollableContainer}> 
                {/* <div className={cStyle.cardDescription}
                    dangerouslySetInnerHTML={{__html: props.card.description}}
                    contentEditable="true">
                </div> */}
                <br/>
                {
                    todo.map((deets) => {
                        console.log("Card.js len of todo: ", todo.length);
                        console.log("Card.js len of deets: ", deets.length);
                        if (!(todo.length > 1 && deets.length == 0)) {
                            return (
                                <div className={cStyle.todoContainer} ref={todoRef} id={deets}> 
                                    <div className={cStyle.cardDetails} 
                                         onDoubleClick={(e) => {switchColor(e); console.log("clicked? ", clicked);}}
                                         contenteditable={props.removeState ? "false" :"true"}>
                                        {deets}
                                    </div>
                                    <div className={cStyle.todoDelete} onClick={() => {removeTodo(deets)}}>✘</div>
                                </div>
                                
                            );
                        }
                        
                    })
                }
                
            </div>
           {props.removeState ? <div className={cStyle.removeOverlay}>CLICK TO REMOVE</div> : <span></span>}
        
        </div>
    );
}

export default Card;
