import { _decorator, Component, EventTouch, Node, Vec3 } from "cc";
import { ScrewType } from "./Screw";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: Node })
  public gameOverOverlay: Node | null = null;

  private _currentBoxType: ScrewType = ScrewType.RED;

  private _box1: Node = null;
  private _box2: Node = null;

  private _boxSpacePositions: Vec3[] = Array(3)
    .fill(null)
    .map(() => new Vec3(0, 0, 0));

  private _boxScrews: { node: Node; type: ScrewType }[] = [];

  private _extraSpacePositions: Vec3[] = Array(5)
    .fill(null)
    .map(() => new Vec3(0, 0, 0));

  private _extraScrews: { node: Node; type: ScrewType }[] = [];

  start() {
    this.node.children.forEach((child) => {
      child.on("screw-clicked", this.onScrewClicked, this);
    });

    const Box1 = this.node.getChildByName("Box1");
    const Box2 = this.node.getChildByName("Box2");
    if (!Box1 || !Box2) return;

    this._box1 = Box1;
    this._box2 = Box2;

    const Box1Children = Box1.children;

    this._boxSpacePositions.forEach((_, index) => {
      Vec3.add(this._boxSpacePositions[index], Box1.position, Box1Children[index].position);
    });

    const ExtraScrews = this.node.getChildByName("ExtraScrews");
    if (!ExtraScrews) return;

    const ExtraScrewsPosition = ExtraScrews.position;
    const ExtraScrewsChildren = ExtraScrews.children;

    this._extraSpacePositions.forEach((_, index) => {
      Vec3.add(this._extraSpacePositions[index], ExtraScrewsPosition, ExtraScrewsChildren[index].position);
    });
  }

  addToBox = (node: Node, type: ScrewType) => {
    this._boxScrews.push({ node, type: type });
    const boxScrewsAmount = this._boxScrews.length;

    node.setPosition(this._boxSpacePositions[boxScrewsAmount - 1]);

    if (boxScrewsAmount === 3) {
      this._currentBoxType = this._currentBoxType === ScrewType.RED ? ScrewType.BLUE : ScrewType.RED;

      const firstPosition = new Vec3(this._box1.position.x, this._box1.position.y, 0);

      this._box1.setPosition(this._box2.position);
      this._box2.setPosition(firstPosition);

      this._boxScrews.forEach((screw) => screw.node.destroy());
      this._boxScrews = [];
    }
  };

  onScrewClicked(screwNode: Node, screwType: ScrewType) {
    if (screwType === this._currentBoxType) {
      this.addToBox(screwNode, screwType);

      const newExtraScrews: { node: Node; type: ScrewType }[] = [];

      this._extraScrews.forEach((screw) => {
        if (screw.type === this._currentBoxType) {
          this.addToBox(screw.node, screw.type);
        } else {
          newExtraScrews.push(screw);

          const position = this._extraSpacePositions[newExtraScrews.length - 1];
          screw.node.setPosition(position);
        }
      });

      this._extraScrews = newExtraScrews;
    } else {
      this._extraScrews.push({ node: screwNode, type: screwType });
      const extraScrewAmount = this._extraScrews.length;

      const position = this._extraSpacePositions[extraScrewAmount - 1];
      screwNode.setPosition(position);

      const extraSpacePositionsAmount = this._extraSpacePositions.length;

      if (extraScrewAmount === extraSpacePositionsAmount) {
        console.error("GAME OVER");
        this.gameOverOverlay.active = true;
      }
    }
  }

  update(deltaTime: number) {}
}
