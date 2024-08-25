import { _decorator, Component, Node, EventTouch } from "cc";
const { ccclass } = _decorator;

@ccclass("ClickBlocker")
export class ClickBlocker extends Component {
  onLoad() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  }

  private onTouchStart(event: EventTouch) {
    event.propagationStopped = true;
  }

  private onTouchMove(event: EventTouch) {
    event.propagationStopped = true;
  }

  private onTouchEnd(event: EventTouch) {
    event.propagationStopped = true;
  }

  private onTouchCancel(event: EventTouch) {
    event.propagationStopped = true;
  }
}
