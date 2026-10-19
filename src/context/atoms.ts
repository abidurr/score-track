import { atomWithStorage } from "jotai/utils";

const darkModeAtom = atomWithStorage("darkMode", false);

export type COLOR_OPTIONS =
  | "ruby"
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky"
  | undefined;

export interface IScore {
  id: string;
  user_name: string;
  score_value: number;
  color: COLOR_OPTIONS;
}

interface ISettings {
  is_integer: boolean;
  step_size: number;
}

const scoresAtom = atomWithStorage("scores", [] as IScore[]);

const settingsAtom = atomWithStorage("settings", {
  is_integer: true,
  step_size: 10,
} as ISettings);

export { darkModeAtom, scoresAtom, settingsAtom };
