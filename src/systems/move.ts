import { Goal, PaddleInput, Position, Velocity } from "../components";
import * as Concord from "../lib/concord";

interface MovePool extends ConcordSystem {
  position: Position;
  velocity: Velocity;
}

interface PaddlePool extends ConcordSystem {
  position: Position;
  velocity: Velocity;
  paddleInput: PaddleInput;
}

interface BallPool extends ConcordSystem {
  position: Position;
  velocity: Velocity;
  goal: Goal;
}

interface MoveSystem extends ConcordSystem {
  movablePool?: MovePool[];
  playerPool?: PaddlePool[];
  ballPool?: BallPool[];
  update?: (this: MoveSystem, dt: number) => void;
}

const MoveSystem: MoveSystem = Concord.system({
  movablePool: ["position", "velocity"],
  playerPool: ["position", "velocity", "paddleInput"],
  ballPool: ["position", "velocity", "goal"],
});

MoveSystem.update = function (dt: number) {
  this.playerPool.forEach((paddle) => {
    if (paddle.paddleInput.keys.up.value) {
      paddle.velocity.y = -300;
    } else if (paddle.paddleInput.keys.down.value) {
      paddle.velocity.y = 300;
    } else {
      paddle.velocity.y = 0;
    }
  });
  this.movablePool.forEach((entity) => {
    entity.position.x += entity.velocity.x * dt;
    entity.position.y += entity.velocity.y * dt;
  });
  this.ballPool.forEach((entity) => {
    if (entity.position.x < 0) {
      entity.goal.rightPlayerScore.value += 1;
      entity.position.x = love.graphics.getWidth() / 2;
      entity.position.y = love.graphics.getHeight() / 2;
    } else if (entity.position.x > love.graphics.getWidth()) {
      entity.goal.leftPlayerScore.value += 1;
      entity.position.x = love.graphics.getWidth() / 2;
      entity.position.y = love.graphics.getHeight() / 2;
    }
  });
};

export default MoveSystem;
