import { Index, type Component } from 'solid-js';
import { initializeState } from './state'

import styles from './App.module.css';

const [state, addItem, updateItem] = await initializeState();

const App: Component = () => {
  const list = () => state().list;
  let textInput;

  function handleKeydown(event: any) {
    if (event.code === "Enter" && textInput.value) {
      addItem(textInput.value);
      textInput.value = "";
    }
  }


  return (
    <div class={styles.App}>
      <Index each={list()}>
        {(item, index) => (
          <ParkingLotItem item={item} index={index} />
        )}
      </Index>
      <input type="text" on:keydown={handleKeydown} ref={textInput} />
    </div >
  );
};

const ParkingLotItem = (props) => {
  let inputRef: HTMLInputElement;

  function handleItemChange(index: number, event: any) {
    if (inputRef) {
      const start = inputRef?.selectionStart;
      const end = inputRef?.selectionEnd;
      const data = event.data ?? "";

      if (event.inputType == "deleteContentBackward") {
        if (start === end) {
          const deleteStart = Math.max(0, start - 1)
          updateItem(index, deleteStart, end, "")
          setCursorPosition(deleteStart)
        } else {
          updateItem(index, start, end, "")
          setCursorPosition(start)
        }
      } else {
        updateItem(index, start, end, data)
        setCursorPosition(end + 1)
      }

      event.preventDefault();
    }
  }

  function setCursorPosition(position: number) {
    if (inputRef) {
      inputRef.selectionStart = position;
      inputRef.selectionEnd = position;
    }
  }

  return (
    < input type="text" value={props.item()} ref={inputRef} on:beforeinput={(event) => handleItemChange(props.index, event)} />
  )
}


export default App;
