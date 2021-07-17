import { KeyConstant } from "love.keyboard";

import { PaddleInput, Velocity } from "../components";
import { system } from "../lib/concord";

interface PaddlePool extends ConcordSystem {
  paddleInput: PaddleInput;
  velocity: Velocity;
}

interface InputSystem extends ConcordSystem {
  pool?: PaddlePool[];
  keypressed?: (this: InputSystem, key: KeyConstant) => void;
  keyreleased?: (this: InputSystem, key: KeyConstant) => void;
}

const InputSystem: InputSystem = system({
  pool: ["paddleInput", "velocity"],
});

InputSystem.keypressed = function (key: KeyConstant) {
  this.pool.forEach((entity) => {
    Object.entries(entity.paddleInput.keys).forEach(([inputName, input]) => {
      if (key === input.key) {
        (entity.paddleInput.keys as any)[inputName].value = true;
      }
    });
  });
};

InputSystem.keyreleased = function (key: KeyConstant) {
  this.pool.forEach((entity) => {
    Object.entries(entity.paddleInput.keys).forEach(([inputName, input]) => {
      if (key === input.key) {
        (entity.paddleInput.keys as any)[inputName].value = false;
      }
    });
  });
};

export default InputSystem;
