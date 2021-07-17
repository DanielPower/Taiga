import "./components/index";

import { Ball, Paddle } from "./assemblages/index";
import * as Concord from "./lib/concord";
import { BounceSystem, DrawSystem, MoveSystem, InputSystem } from "./systems/index";

const world = Concord.world();
world.addSystems(MoveSystem, DrawSystem, BounceSystem, InputSystem);

Concord.entity(world).assemble(Paddle, 30, 200, 20, 60, "w", "s");
Concord.entity(world).assemble(Paddle, 770, 200, 20, 60, "up", "down");
Concord.entity(world).assemble(
  Ball,
  love.graphics.getWidth() / 2,
  love.graphics.getHeight() / 2,
  10,
  300,
  -300,
);

let isPaused = true;

love.keypressed = (key) => {
  if (key === "p") {
    isPaused = !isPaused;
  }
  world.emit("keypressed", key);
};

love.keyreleased = (key) => {
  world.emit("keyreleased", key);
}

love.update = (dt) => {
  if (!isPaused) {
    world.emit("update", dt);
  }
};

love.draw = () => {
  love.graphics.setColor([1, 1, 1, 1]);
  world.emit("draw");
};
