/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Todo.js
 *
 *
 *
 *
 */

import { useState, useEffect } from "react";

import Card from "../components/Card.js";
import tStyle from "./style/Todo.module.css";

/**
 * REVIEW: default value 建議使用 object 結構，
 * 以利於 addCard 或相似時機時取用，就不用重寫相似 code。可
 * 想像極端點，例如： default value 若擁有 20 個 props，
 * 則 addCard assign temp 時就不需重寫這些 props
 */
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
    // REVIEW: 使用 const / let 取代 var
    /** REVIEW: 此處建議 spread `cardsDefault` 的預設結構，再另外寫 cardKey Prod 。
     *  const temp = {...cardsDefault, cardKey: key, }
     */
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
      prevArr.map((eachCard) =>
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
        // if (eachCard.cardKey === cardKey) {
        //   let tempTodoItem = { message: "", todoItemKey: eachCard.todoItemKeyTrack };

        //   let temp = { ...eachCard };
        //   temp.todoItemKeyTrack++;
        //   temp.todoList = [...temp.todoList, tempTodoItem];
        //   return temp;
        // }
        // return eachCard;
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
     eachCard.cardKey === cardKey?
     //REVIEW2: 這邊也是像上次 REVIEW 所寫避免直接 assign 
          {...eachCard,todoList:eachCard.todoList.filter(
            (todoItem) => todoItem.todoItemKey != todoItemKey
          )}
      :eachCard
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

  /*  acts like a callback function to setCards */
  useEffect(() => {
    updateLocal();
    console.log("useEffect cards: ", cards);
  }, [cards]);

  useEffect(() => {
    /* REVIEW2: 你這個 useEffect 裡面的 code 有下列問題存在
        1. 這邊監聽 'keydown' 是去監聽 keyboard event，Ting 的 review 看起來意思應該是：
           在 remove state 的時候，若用滑鼠點擊畫面上的空白處可以取消 remove state
        2. 不知道你是不是要做成按 space bar 就會取消 remove state ，如果這邊真的要做成 space bar 的效果的話
           在 addEventListener 的 handler (第二個參數) 裡面會提供一個參數可以拿到 event key code，
           你可以查一下 space bar 的 key code 來實作這樣的效果
        3. 在 handleSpacePress 這個 handler 裡面的 removeState 因為 closure 的關係所以會永遠是最一開始傳進去的值，
           所以理論上會一直都是 false，所以將永遠不會執行 setRemoveState，只有在 initial 時當 removeState 是 true 才有可能有效
           我建議最簡單的方式就是這樣就好
            const handleSpacePress = () => {
              setRemoveState(false));
              };
        4. 如果要做成 space bar 的功能，可能要注意一下在使用者操作的時候，目前使用者在網頁 focus 的位置，
           因為 space bar 在瀏覽器有預設像 enter 的行為，建議還是做 Ting 說的點空白處取消，
           或是非要用 keyboard 操縱的話，改用 esc 或其他 key
    */
    const handleSpacePress = () => {
      setRemoveState(false)
    };

    document.addEventListener("keydown", handleSpacePress);

    return () => {
      document.removeEventListener("keydown", handleSpacePress);
    };
  }, []);

  return (
    <div className={tStyle.todoContainer}>
      <div className={tStyle.editsContainer}>
        <div className={tStyle.editButtons}>
          <button className={tStyle.addEvent} onClick={addCard}>
            ＋
          </button>
          {/* REVIEW ：覺得這裡刪除的 UI 做得蠻有趣蠻棒的，
                    若是我，會加入按空白處可以取消 remove state 的機制
                    */}
          <button
            className={tStyle.removeEvent}
            onClick={() => setRemoveState((prev) => !prev)}
          >
            －
          </button>
        </div>

        <label className={tStyle.saveListContainer}>
          <input
            type="checkbox"
            name="saveList"
            className={tStyle.saveCheckbox}
            checked={saveList}
            onChange={() => {
              localStorage.setItem("saveAction", !saveList);
              setSaveList((prev) => !prev);
            }}
          />
          Auto Save
        </label>
      </div>

      <div className={tStyle.cardsContainer}>
        {
          // REVIEW: key word: optional chain
          // 可簡化為 cards?.map((card))
          // REVIEW [] && 'a' 會返回 'a'，這裏的 cards && ... 前面的判斷式會永遠是 true
          cards.map((card) => {
            return (
              <Card
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
