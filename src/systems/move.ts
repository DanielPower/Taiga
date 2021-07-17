import { Position, Velocity, PaddleInput } from "../components";
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

interface MoveSystem extends ConcordSystem {
  pool?: MovePool[];
  paddlePool?: PaddlePool[];
  update?: (this: MoveSystem, dt: number) => void;
}

const MoveSystem: MoveSystem = Concord.system({
  pool: ["position", "velocity"],
  paddlePool: ["position", "velocity", "paddleInput"],
});

MoveSystem.update = function (dt: number) {
  this.paddlePool.forEach((paddle) => {
    if (paddle.paddleInput.keys.up.value) {
      paddle.velocity.y = -300;
    } else if (paddle.paddleInput.keys.down.value) {
      paddle.velocity.y = 300;
    } else {
      paddle.velocity.y = 0;
    }
  });
  this.pool.forEach((entity) => {
    entity.position.x += entity.velocity.x * dt;
    entity.position.y += entity.velocity.y * dt;
  });
};

export default MoveSystem;
