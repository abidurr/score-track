import React from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  darkModeAtom,
  scoresAtom,
  settingsAtom,
  type COLOR_OPTIONS,
  type IScore,
} from "@/context/atoms";
import { Section, Text, Avatar, Card, Flex, Box } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes/dist/cjs/components/button.js";
import { nanoid } from "nanoid";
import { CheckIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes/dist/cjs/components/index.js";
import { Grid } from "@radix-ui/themes/src/components/index.js";

const COLORS_LIST = [
  "ruby",
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
];

const AddNewScore = () => {
  const settings = useAtomValue(settingsAtom);
  const [scores, setScores] = useAtom(scoresAtom);
  const [newName, setNewName] = React.useState("");
  const [startingScore, setStartingScore] = React.useState(0);
  const [newColor, setNewColor] = React.useState("blue" as COLOR_OPTIONS);
  return (
    <Section>
      <Flex direction="column" gap="4">
        <Text>Player Name</Text>
        <input onChange={(e) => setNewName(e?.target?.value)} />
        <Text>Starting Score</Text>
        <input
          value={startingScore}
          type="number"
          step={settings?.is_integer ? "1" : "any"}
          onChange={(e) => {
            const value_now = settings?.is_integer
              ? Math.round(Number(e?.target?.value))
              : Number(e.target?.value);
            setStartingScore(value_now);
          }}
        />

        <Flex gap="2" wrap="wrap" justify="start">
          {COLORS_LIST.map((item) => (
            <IconButton
              style={{ backgroundColor: item }}
              onClick={() => setNewColor(item as COLOR_OPTIONS)}
            >
              {item === newColor && <CheckIcon height="40px" width="40px" />}
            </IconButton>
          ))}
        </Flex>

        <Button
          onClick={() => {
            setScores([
              ...scores,
              {
                id: nanoid(),
                user_name: newName,
                score_value: startingScore,
                color: newColor,
              },
            ]);
          }}
        >
          Add new player
        </Button>
      </Flex>
    </Section>
  );
};

export const Scores: React.FC = () => {
  const [scores, setScores] = useAtom(scoresAtom);

  const addNewScore = () => {};

  return (
    <Flex direction="column" gap="4">
      <Text size="3">Scores</Text>
      <AddNewScore />
      {scores?.map((item) => {
        return (
          <Box width="350px">
            <Card size="1">
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  radius="full"
                  fallback="T"
                  color={item?.color}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {item?.user_name ?? "J. Doe"}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {item?.score_value ?? 0}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        );
      })}
    </Flex>
  );
};
