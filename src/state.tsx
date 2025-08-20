import { AutomergeUrl, BroadcastChannelNetworkAdapter, DocHandle, IndexedDBStorageAdapter, Repo, WebSocketClientAdapter } from "@automerge/react";
import { Accessor, createSignal, Setter, Signal } from "solid-js";
import { meet } from "@googleworkspace/meet-addons/meet.addons";
import config from "./config";

const CLOUD_PROJECT_NUMBER = '378533565670';
const SIDE_PANEL_URL = 'https://fgrcl.github.io/parking-lot/SidePanel.html';

export interface AppStateModel {
  list: Array<ParkingLotItemModel>
}

export interface ParkingLotItemModel {
  text: string;
  completed: boolean;
}

class AppStateController {
  public state: Accessor<AppStateModel>;
  private setState: Setter<AppStateModel>;
  private handle: DocHandle<AppStateModel>;


  constructor(signal: Signal<AppStateModel>, handle: DocHandle<AppStateModel>) {
    const [state, setState] = signal;
    this.state = state;
    this.setState = setState;
    this.handle = handle;

    handle.on("change", ({ doc }) => {
      this.setState(doc);
    });
  }


  public updateItem(index: number, value: string): void {
    this.handle.change((d: AppStateModel) => {
      d.list[index].text = value;
    })
  }

  public addItem(text: string): void {
    this.handle.change((d: AppStateModel) => {
      d.list.push({
        text: text,
        completed: false,
      } as ParkingLotItemModel)
    });
  }

  public updateCompletion(index: number, value: boolean) {
    this.handle.change((d: AppStateModel) => {
      d.list[index].completed = value;
    });
  }
}

async function initializeControllerSingleton(): Promise<AppStateController> {
  let handleUrl: AutomergeUrl = "" as AutomergeUrl;
  let sidePanelClient = null;

  if (config.enableMeets) {

    const session = await meet.addon.createAddonSession({
      cloudProjectNumber: CLOUD_PROJECT_NUMBER,
    });

    sidePanelClient = await session.createSidePanelClient();
    const startingState = await sidePanelClient.getActivityStartingState();
    handleUrl = startingState.additionalData as AutomergeUrl;
  }

  const repo = new Repo({
    storage: new IndexedDBStorageAdapter("parking-lot"),
    network: [
      new BroadcastChannelNetworkAdapter(),
      new WebSocketClientAdapter("wss://sync.automerge.org")
    ]
  });

  let handle: DocHandle<AppStateModel> | undefined = undefined;
  if (handleUrl ?? false) {
    handle = await repo.find(handleUrl)
  } else {
    handle = repo.create<AppStateModel>();
    handleUrl = handle.url;

    handle.change((d: AppStateModel) =>
      d.list = []
    )

    if (config.enableMeets) {
      sidePanelClient?.startActivity({
        sidePanelUrl: SIDE_PANEL_URL,
        additionalData: handleUrl
      });
    }
  }

  const signal = createSignal(handle.doc());
  return new AppStateController(signal, handle);
}

const appStateController = await initializeControllerSingleton()
export default appStateController;

