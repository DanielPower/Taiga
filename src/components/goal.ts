import * as Concord from "../lib/concord";
import Score from "./score";

interface Goal {
  leftPlayerScore: Score;
  rightPlayerScore: Score;
}

const Goal = Concord.component(
  "goal",
  (component: Goal, leftPlayerScore: Score, rightPlayerScore: Score) => {
    component.leftPlayerScore = leftPlayerScore;
    component.rightPlayerScore = rightPlayerScore;
  },
);

export default Goal;
