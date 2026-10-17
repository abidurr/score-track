import React from "react";
import { useAtom } from "jotai";
import { darkModeAtom, settingsAtom } from "@/context/atoms";
import {
  Text,
  Button,
  IconButton,
  Section,
  Flex,
  Switch,
} from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

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
    <Section>
      <Flex gap="3" direction="column">
        <Text>Settings</Text>
        <IconButton onClick={() => setDarkMode(!darkMode)} variant="soft">
          {darkMode ? (
            <MoonIcon width="18" height="18" />
          ) : (
            <SunIcon width="18" height="18" />
          )}
        </IconButton>
        <Switch
          id="is-integer"
          variant="surface"
          checked={settings?.is_integer}
          onCheckedChange={() => toggleIsIntegerState()}
        />
        <Text>{settings?.is_integer ? "yes" : "no"}</Text>
        <Text>{settings?.step_size}</Text>
      </Flex>
    </Section>
  );
};
