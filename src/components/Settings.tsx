import * as React from "react";
import { useAtom } from "jotai";
import { darkModeAtom, settingsAtom } from "@/context/atoms";
import { Text, Button, Flex, Switch } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { StyledInput, StyledLabel } from "./elements";

export const Settings = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [settings, setSettings] = useAtom(settingsAtom);

  const toggleIsIntegerState = () => {
    setSettings({
      is_integer: !settings.is_integer,
      step_size: settings.step_size,
    });
  };

  return (
    <>
      <Flex gap="4" direction="column" width={"272px"}>
        <Text size={"7"} weight={"bold"}>
          Settings
        </Text>
        <Button onClick={() => setDarkMode(!darkMode)} variant="soft">
          {darkMode ? (
            <MoonIcon width="18" height="18" />
          ) : (
            <SunIcon width="18" height="18" />
          )}{" "}
          Switch Theme
        </Button>

        <Flex gap="1" direction="column">
          <StyledLabel style={{ margin: "0px" }}>Smallest step</StyledLabel>
          <StyledInput
            type="number"
            value={settings?.step_size}
            step={settings?.is_integer ? "1" : "any"}
            onChange={(e) =>
              setSettings({
                is_integer: settings?.is_integer,
                step_size: settings?.is_integer
                  ? Math.round(Number(e.target.value))
                  : Number(e.target.value),
              })
            }
          />
        </Flex>
        <Flex gap={"4"} align={"center"}>
          <Switch
            id="is-integer"
            variant="surface"
            checked={settings?.is_integer}
            onCheckedChange={() => toggleIsIntegerState()}
          />
          <Text color="gray">Whole numbers only</Text>
        </Flex>
      </Flex>
    </>
  );
};
