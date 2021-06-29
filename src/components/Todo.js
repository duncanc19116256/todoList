/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Todo.js
 *
 *
 *
 *
 */

import { useState, useEffect, useRef } from "react";
import {
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Card from "../components/Card.js";
import tStyle from "./style/Todo.module.css";

const cardsDefault = {
  name: "",
  todoList: [{ message: "", todoItemKey: 0 }],
  todoItemKeyTrack: 1,
  cardKey: 0,
};
const checkSaveAction = localStorage.getItem("saveAction") === "true";

function Todo() {
  const [cards, setCards] = useState(
    checkSaveAction
      ? JSON.parse(localStorage.getItem("savedCards"))
      : [cardsDefault]
  );
  const [key, setKey] = useState(
    checkSaveAction ? parseInt(localStorage.getItem("cardKey")) : 1
  ); // cardKey
  const [removeState, setRemoveState] = useState(false);

  const [saveList, setSaveList] = useState(true);

  const cardsRef = useRef([]); /*  Ref to array of cards  */
  const removeButtonRef = useRef(null); /*  Ref to the Remove Button  */

  const updateLocal = () => {
    localStorage.setItem("savedCards", JSON.stringify(cards));
    localStorage.setItem("saveAction", saveList);
    localStorage.setItem("cardKey", key);
  };

  /*  addCard()
        Purpose:    to add an additional card 
        Effect:     sets the state of "remove" to false, preventing users 
                    to add cards while remove state is on. Then makes a copy 
                    of card Object to set new card by adding value of 
                    "cardsDefault[0]" with key "key." finaly, increment key 
                    state.
        Parameters: none
    */

  const addCard = () => {
    setRemoveState(false);

    setCards((prevArr) => [
      ...prevArr,
      {
        ...cardsDefault,
        cardKey: key,
      },
    ]);

    /*  increment key by 1 */
    setKey((prev) => prev + 1);
  };

  /*  removeCard()
        Purpose:    to remove a card with given cardKey identifier
        Effect:     On removeState being true, create a copy of cards Object 
                    to delete the identified card with given parameter cardKey.
                    Then updates the state of cards. 
        Parameters: int cardKey - key to the card to be removed 
    */
  const removeCard = (cardKey) => {
    setCards((prev) => prev.filter((eachCard) => eachCard.cardKey !== cardKey));
  };

  /*  updateCardName()
        Purpose:    to update name of specified card onChange
        Effect:     Creates a copy of cards Object, then alter the name of 
                    specified card. 
        Parameters: int cardKey     - the identifier to the card
                    string cardName  - the name to be saved
    */
  const updateCardName = (cardKey, cardName) => {
    setCards((prevArr) =>
      prevArr.map(
        (eachCard) =>
          eachCard.cardKey === cardKey
            ? { ...eachCard, name: cardName }
            : eachCard
        // REVIEW2: 若沒必要，就不要再 spread ㄧ次，每次 spread 就是一次 loop
      )
    );
  };

  /*  addTodoItem()
        Purpose:    to add an additional todoItem
        Effect:     makes a copy of "cards" to add additional string value
                    to the new key "cards[cardKey].todoListKey". Then increment
                    cards[cardKey].todoListKey by 1. lastly, setCards with the 
                    mutated tempCards Object 
        Parameters: int cardKey  - the identifier to the card that needs 
                                      needs to be altered
    */
  const addTodoItem = (cardKey) => {
    setCards((prevArr) =>
      prevArr.map((eachCard) => {
        return eachCard.cardKey === cardKey
          ? {
              ...eachCard,
              todoItemKeyTrack: eachCard.todoItemKeyTrack + 1,
              todoList: [
                ...eachCard.todoList,
                {
                  message: "",
                  todoItemKey: eachCard.todoItemKeyTrack,
                },
              ],
            }
          : eachCard;
      })
    );
  };

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
  const deleteTodoItem = (cardKey, todoItemKey) => {
    setCards((prevArr) =>
      prevArr.map((eachCard) =>
        eachCard.cardKey === cardKey
          ? //REVIEW2: 這邊也是像上次 REVIEW 所寫避免直接 assign
            {
              ...eachCard,
              todoList: eachCard.todoList.filter(
                (todoItem) => todoItem.todoItemKey != todoItemKey
              ),
            }
          : eachCard
      )
    );
  };

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
  const updateTodoItemMessage = (cardKey, todoItemKey, message) => {
    setCards((prevArr) =>
      prevArr.map((eachCard) => {
        return eachCard.cardKey === cardKey
          ? {
              ...eachCard,
              todoList: eachCard.todoList.map((eachTodoItem) => {
                return eachTodoItem.todoItemKey === todoItemKey
                  ? {
                      ...eachTodoItem,
                      message,
                    }
                  : eachTodoItem;
              }),
            }
          : eachCard;
      })
    );
  };

  /*  Turns off removeState when mouse is clicked on spare spaces  */
  useEffect(() => {
    const handleClickAway = (e) => {
      let checkCards = false;
      /*  Loops through the ref array of cards  */
      for (let boolCheck of cards?.map((card) =>
        cardsRef.current[card.cardKey]?.contains(e.target)
      )) {
        if (boolCheck) {
          checkCards = true;
        }
      }
      const check = removeButtonRef.current.contains(e.target) || checkCards;

      if (!check) {
        setRemoveState(false);
      }
    };

    if (removeState) {
      document.addEventListener("mousedown", handleClickAway);
    } else {
      document.removeEventListener("mousedown", handleClickAway);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [removeState]);

  /*  acts like a callback function to setCards */
  useEffect(() => {
    updateLocal();
  }, [cards]);

  return (
    <div className={tStyle.backgroundContainer}>
      <div className={tStyle.todoContainer}>
        <div className={tStyle.editsContainer}>
          <div className={tStyle.editButtons}>
            <Tooltip title="ADD CARD">
              <IconButton className={tStyle.addEvent} onClick={addCard}>
                <AddIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="REMOVE CARDS">
              <IconButton
                id="removeButtonID"
                className={tStyle.removeEvent}
                onClick={() => {
                  setRemoveState((prev) => !prev);
                }}
                ref={removeButtonRef}
              >
                <RemoveIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>

          <div className={tStyle.saveListContainer}>
            <FormControlLabel
              control={
                <Switch
                  name="saveList"
                  color="primary"
                  checked={saveList}
                  onChange={() => {
                    localStorage.setItem("saveAction", !saveList);
                    setSaveList((prev) => !prev);
                  }}
                />
              }
              label="Auto Save"
            />
          </div>
        </div>

        <div className={tStyle.cardsContainer}>
          {
            // REVIEW: key word: optional chain
            // 可簡化為 cards?.map((card))
            // REVIEW [] && 'a' 會返回 'a'，這裏的 cards && ... 前面的判斷式會永遠是 true
            cards.map((card) => {
              return (
                <Card
                  ref={(elem) => {
                    cardsRef.current[card.cardKey] = elem;
                  }}
                  addCard={addCard}
                  removeCard={removeCard}
                  removeState={removeState}
                  card={card}
                  // REVIEW2: 這邊已經把 card 整包傳下去了，Card 已經可以取得 cardKey 所以沒必要再另外把 cardKey 傳下去
                  addTodoItem={addTodoItem}
                  key={card.cardKey}
                  deleteTodoItem={deleteTodoItem}
                  updateTodoItemMessage={updateTodoItemMessage}
                  updateCardName={updateCardName}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Todo;

/**
 * REVIEW: 其他可注意的點
 * 1. 有些地方使用了 arrow function，有些則使用 function(){}，
 *    建議語法統一，可了解其差別
 * 2. 團隊合作會使用一些工具維持一致的 coding style，
 *    可練習安裝 es lint & prettier ，配合 editor 的 format 功能
 * 3. todo item 可練習以“Enter”加入新的一行
 *
 */
