import * as Concord from "../lib/concord";

interface Score {
  value: number;
}

const Score = Concord.component("score", (component: Score, value: number) => {
  component.value = value;
});

export default Score;
