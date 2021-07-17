import { KeyConstant } from "love.keyboard";

import { component } from "../lib/concord";

interface PaddleInput {
  keys: {
    up: KeyBind;
    down: KeyBind;
  }
}

interface KeyBind {
  key: KeyConstant;
  value: boolean;
}

const PaddleInput = component(
  "paddleInput",
  (component: PaddleInput, up: KeyConstant, down: KeyConstant) => {
    component.keys = {
     up: { key: up, value: false },
     down: { key: down, value: false },
    }
  },
);

export default PaddleInput;
