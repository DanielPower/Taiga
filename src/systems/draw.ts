import { Circle, Position, Rectangle, Score } from "../components";
import * as Concord from "../lib/concord";

const scoreFont = love.graphics.newFont(48);

interface RenderableCircle extends ConcordEntity {
  position: Position;
  circle: Circle;
}

interface RenderableRectangle extends ConcordEntity {
  position: Position;
  rectangle: Rectangle;
}

interface DrawSystem extends ConcordSystem {
  circles?: RenderableCircle[];
  rectangles?: RenderableRectangle[];
  draw?: (this: DrawSystem, leftPlayerScore: Score, rightPlayerScore: Score) => void;
}

const DrawSystem: DrawSystem = Concord.system({
  circles: ["position", "circle"],
  rectangles: ["position", "rectangle"],
});

DrawSystem.draw = function (leftPlayerScore: Score, rightPlayerScore: Score) {
  const midX = love.graphics.getWidth() / 2;
  const midY = love.graphics.getHeight() / 2;
  love.graphics.line(midX, 0, midX, love.graphics.getHeight());
  love.graphics.setFont(scoreFont);
  love.graphics.printf(tostring(leftPlayerScore.value), 0, midY - 28, midX - 30, "right");
  love.graphics.printf(tostring(rightPlayerScore.value), midX + 30, midY - 28, midX, "left");
  this.rectangles.forEach((entity) => {
    const xOffset = -entity.rectangle.width / 2;
    const yOffset = -entity.rectangle.height / 2;
    love.graphics.rectangle(
      "fill",
      entity.position.x + xOffset,
      entity.position.y + yOffset,
      entity.rectangle.width,
      entity.rectangle.height,
    );
  });
  this.circles.forEach((entity) => {
    love.graphics.circle("fill", entity.position.x, entity.position.y, entity.circle.radius);
  });
};

export default DrawSystem;
