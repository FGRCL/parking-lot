import { For, type Component } from 'solid-js';
import { initializeState } from './state'

import styles from './App.module.css';

const App: Component = async () => {
  const [state, addItem] = await initializeState();
  const list = () => state().list;

  console.log("render", list())
  return (
    <div class={styles.App}>
      <ol>
        <For each={list()}>
          {(item) => (
            <li>
              {item}
            </li>
          )}
        </For>
      </ol>
      <button onClick={() => addItem("test")}>Add</button>
    </div >
  );
};

export default App;
