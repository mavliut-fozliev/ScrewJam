import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Elem")
export class Elem extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onElemClick, this);
  }

  onElemClick() {}

  update(deltaTime: number) {}
}
