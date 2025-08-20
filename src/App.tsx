import { Index, type Component } from 'solid-js';
import ParkingLotItem from './ParkingLotItem';
import NewItemInput from './NewItemInput';

import styles from './App.module.css';
import logo from './assets/logo.svg'
import appStateController from './state';

const App: Component = () => {
  const list = () => appStateController.state().list;

  return (
    <div>
      <header class={styles.header}>
        <div class={styles.logoContainer}>
          <img class={styles.logo} src={logo} alt="logo" />
        </div>
        <span class={styles.title}>Parking Lot</span>
        <div class={styles.action}></div>
      </header>
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

export default App;
