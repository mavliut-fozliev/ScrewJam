import { _decorator, Collider2D, Component, Enum, EventTouch, Node, RigidBody2D } from "cc";
const { ccclass, property } = _decorator;

export enum ScrewType {
  RED,
  BLUE,
}

@ccclass("Screw")
export class Screw extends Component {
  @property({ type: Enum(ScrewType) })
  public type: ScrewType = ScrewType.RED;

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onScrewClick, this);
  }

  onScrewClick(event: EventTouch) {
    this.node.off(Node.EventType.TOUCH_START, this.onScrewClick, this);

    this.node.emit("screw-clicked", this.node, this.type);

    let rigidBody = this.node.getComponent(RigidBody2D);
    if (rigidBody) {
      rigidBody.destroy();
    }

    let collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.destroy();
    }
  }

  update(deltaTime: number) {}
}
