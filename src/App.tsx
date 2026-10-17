import "@radix-ui/themes/styles.css";
import "./styles.css";
import { Theme, ThemePanel, Container, Grid, Section } from "@radix-ui/themes";

import { Settings, Scores, AddNewPlayer, Scoreboard } from "./components/";
import { darkModeAtom } from "./context/atoms";
import { useAtomValue } from "jotai";
import { Flex } from "@radix-ui/themes";
import { styled } from "goober";

export function App() {
  const darkMode = useAtomValue(darkModeAtom);
  return (
    <div className="app">
      <Theme appearance={darkMode ? "dark" : "light"} accentColor="cyan">
        <Container size={"4"}>
          <Scoreboard />
        </Container>
      </Theme>
    </div>
  );
}

export default App;
