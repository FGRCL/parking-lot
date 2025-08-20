import { Match, Switch } from 'solid-js';
import styles from './ParkingLotItem.module.css';
import appStateController, { ParkingLotItemModel } from './state';

const ParkingLotItem = (props: { item: () => ParkingLotItemModel; index: number; }) => {
  function handleItemChange(index: number, event) {
    appStateController.updateItem(index, event.target.value)
  }

  function handleCheckbox() {
    appStateController.updateCompletion(props.index, !props.item().completed)
  }

  return (
    <div class={styles.itemContainer}>
      <input
        class={styles.checkbox}
        type="checkbox"
        onChange={handleCheckbox}
        checked={props.item().completed}
      />
      <Switch>
        <Match when={!props.item().completed}>
          <input
            class={styles.input}
            type="text"
            value={props.item().text}
            on:input={(e) => handleItemChange(props.index, e)}
          />
        </Match>
        <Match when={props.item().completed}>
          <input
            class={`${styles.input} ${styles.strike}`}
            type="text"
            value={props.item().text}
            disabled={true}
            on:input={(e) => handleItemChange(props.index, e)}
          />
        </Match>
      </Switch>
    </div>
  )
}

export default ParkingLotItem;
