import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const darkModeAtom = atomWithStorage("darkMode", false);

interface IScore {
  id: string;
  user_name: string;
  score_value: number;
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

export { darkModeAtom };
