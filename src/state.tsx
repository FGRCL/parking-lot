import { AutomergeUrl, BroadcastChannelNetworkAdapter, DocHandle, IndexedDBStorageAdapter, Repo, WebSocketClientAdapter } from "@automerge/react";
import { createSignal } from "solid-js";
import { meet } from "@googleworkspace/meet-addons/meet.addons";

const CLOUD_PROJECT_NUMBER = '378533565670';
const SIDE_PANEL_URL = 'https://fgrcl.github.io/parking-lot/SidePanel.html';

interface ParkingLot {
  list: Array<string>
}

export async function initializeState() {
  const session = await meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });

  const sidePanelClient = await session.createSidePanelClient();
  let handleUrl = await sidePanelClient.getActivityStartingState() as AutomergeUrl;
  const repo = new Repo({
    storage: new IndexedDBStorageAdapter("parking-lot"),
    network: [
      new BroadcastChannelNetworkAdapter(),
      new WebSocketClientAdapter("wss://sync.automerge.org")
    ]
  });

  let handle: DocHandle<ParkingLot>;
  console.log(handleUrl)
  if (handleUrl) {
    handle = await repo.find(handleUrl)
  } else {
    handle = repo.create<ParkingLot>();
    handleUrl = handle.url;
  }

  handle.change((d) =>
    d.list = []
  )

  handle.on("change", ({ doc }) => {
    console.log("on change", doc);
    setState(doc);
  });

  console.log(handle.url)
  const [state, setState] = createSignal(handle.doc());

  // export function updateItem(index: int): void {
  //   doc.change((d) => {
  //     d.list.push(d.);
  //
  //   })
  // }

  sidePanelClient.startActivity({
    sidePanelUrl: SIDE_PANEL_URL,
    additionalData: handleUrl
  });

  function addItem(text: string): void {
    handle.change((d) => {
      d.list.push(text)
    });
  }

  return [state, addItem];
}

