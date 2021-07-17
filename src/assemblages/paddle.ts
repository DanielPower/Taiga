import { KeyConstant } from "love.keyboard";

const Cart = (entity: ConcordEntity, x: number, y: number, width: number, height: number, up: KeyConstant, down: KeyConstant) => {
  entity
    .give("position", x, y)
    .give("velocity", 0, 0)
    .give("rectangle", width, height)
    .give("collisionBox", width, height)
    .give("paddleInput", up, down);
};

export default Cart;
