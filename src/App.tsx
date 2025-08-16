import { Index, type Component } from 'solid-js';
import { initializeState } from './state'

import styles from './App.module.css';
import logo from './assets/logo.svg'

const [state, addItem, updateItem] = await initializeState();

const App: Component = () => {
  const list = () => state().list;

  return (
    <div>
      <header class={styles.header}>
        <img class={styles.logo} src={logo} alt="logo" />
        <h1>Parking Lot</h1>
        <div></div>
      </header >
      <div class={styles.content}>
        <div class={styles.list}>
          <Index each={list()}>
            {(item, index) => (
              <ParkingLotItem item={item} index={index} />
            )}
          </Index>
        </div>
        <NewItemInput />
      </div>
    </div >
  );
};

const NewItemInput: Component = () => {
  let textInput: HTMLInputElement | undefined = undefined;

  function handleKeydown(event: any) {
    if (event.code === "Enter" && textInput?.value) {
      addItem(textInput.value);
      textInput.value = "";
    }
  }

  return (<input class={styles.input} placeholder="Enter a parking lot item" type="text" on:keydown={handleKeydown} ref={textInput} />);
}

const ParkingLotItem = (props: { item: () => string | number | string[] | undefined; index: number; }) => {
  let inputRef: HTMLInputElement | undefined = undefined;

  function handleItemChange(index: number) {
    if (inputRef) {
      updateItem(index, inputRef.value)
    }
  }

  return (
    <div class={styles.itemContainer}>
      <input
        class={styles.checkbox}
        type="checkbox"
      />
      <input
        class={styles.input}
        type="text"
        value={props.item()}
        ref={inputRef}
        on:beforeinput={() => handleItemChange(props.index)}
      ></input>
    </div>
  )
}


export default App;
