import { APITester } from "./APITester";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container } from "@radix-ui/themes";
import { Settings } from "./components/Settings";
import { Scores } from "./components/Scores";
import { darkModeAtom } from "./context/atoms";
import { useAtomValue } from "jotai";

export function App() {
  const darkMode = useAtomValue(darkModeAtom);
  return (
    <div className="app">
      <Theme appearance={darkMode ? "dark" : "light"} accentColor="cyan">
        <Container size="2">
          <ThemePanel />
          <Scores />
          <Settings />
        </Container>

        {/*<div className="logo-container">
          <img src={logo} alt="Bun Logo" className="logo bun-logo" />
          <img src={reactLogo} alt="React Logo" className="logo react-logo" />
        </div>

        <h1>Bun + React</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <APITester />*/}
      </Theme>
    </div>
  );
}

export default App;
