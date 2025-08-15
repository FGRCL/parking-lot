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

  function handleItemChange(index: number) {
    if (inputRef) {
      updateItem(index, inputRef.value)
    }
  }

  return (
    < input type="text" value={props.item()} ref={inputRef} on:beforeinput={() => handleItemChange(props.index)} />
  )
}


export default App;
