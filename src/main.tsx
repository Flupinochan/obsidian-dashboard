import { ItemView, Plugin } from "obsidian";
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { ReactView } from "./ReactView";

const VIEW_TYPE = "metalmental-dashboard-view";
const TAB_TITLE = "dashboard";
const ICON_NAME = "circle-gauge";
const ICON_TOOL_TIP = "Open Dashboard";

export default class MyPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE, (leaf) => new HelloView(leaf));

    this.addRibbonIcon(ICON_NAME, ICON_TOOL_TIP, () => {
      const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE);

      if (existing.length > 0) {
        for (const leaf of existing) {
          leaf.detach();
        }
      } else {
        const leaf = this.app.workspace.getLeaf("tab");
        leaf.setViewState({ type: VIEW_TYPE, active: true });
      }
    });
  }

  async onunload() {}
}

class HelloView extends ItemView {
  root: Root | null = null;
  icon = ICON_NAME;

  getViewType() {
    return VIEW_TYPE;
  }

  getDisplayText() {
    return TAB_TITLE;
  }

  async onOpen() {
    this.root = createRoot(this.contentEl);
    this.root.render(
      <StrictMode>
        <ReactView app={this.app} />
      </StrictMode>,
    );
  }

  async onClose() {
    this.root?.unmount();
  }
}
