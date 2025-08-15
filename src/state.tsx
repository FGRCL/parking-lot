import { AutomergeUrl, BroadcastChannelNetworkAdapter, DocHandle, IndexedDBStorageAdapter, Repo, WebSocketClientAdapter } from "@automerge/react";
import { createSignal } from "solid-js";
import { meet } from "@googleworkspace/meet-addons/meet.addons";
import config from "./config";

const CLOUD_PROJECT_NUMBER = '378533565670';
const SIDE_PANEL_URL = 'https://fgrcl.github.io/parking-lot/SidePanel.html';

interface AppState {
  list: Array<string>
}

export async function initializeState() {
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

  let handle: DocHandle<AppState>;
  if (handleUrl ?? false) {
    handle = await repo.find(handleUrl)
  } else {
    handle = repo.create<AppState>();
    handleUrl = handle.url;

    handle.change((d: AppState) =>
      d.list = []
    )

    if (config.enableMeets) {
      sidePanelClient?.startActivity({
        sidePanelUrl: SIDE_PANEL_URL,
        additionalData: handleUrl
      });
    }
  }

  handle.on("change", ({ doc }) => {
    setState(doc);
  });

  const [state, setState] = createSignal<AppState>(handle.doc());

  function updateItem(index: number, start: number, end: number, insertedText: string): void {
    handle.change((d: AppState) => {
      d.list[index] = d.list[index].slice(0, start) + insertedText + d.list[index].slice(end);
    })
  }

  function addItem(text: string): void {
    handle.change((d: AppState) => {
      d.list.push(text)
    });
  }

  return [state, addItem, updateItem];
}

