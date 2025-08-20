import { Component } from 'solid-js';
import styles from './NewItemInput.module.css'
import appStateController from './state';

const NewItemInput: Component = () => {
  let textInput: HTMLInputElement | undefined = undefined;

  function handleKeydown(event: any) {
    if (event.code === "Enter" && textInput?.value) {
      appStateController.addItem(textInput.value);
      textInput.value = "";
    }
  }

  return (<input class={styles.input} type="text" on:keydown={handleKeydown} ref={textInput} />);
}

export default NewItemInput;
