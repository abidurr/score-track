import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { COLORS_LIST, randomColor } from "../context/utils";
import { StyledInput, StyledLabel } from "./elements";
import { nanoid } from "nanoid";
import {
  darkModeAtom,
  scoresAtom,
  settingsAtom,
  type COLOR_OPTIONS,
  type IScore,
} from "@/context/atoms";
import {
  Section,
  Text,
  Avatar,
  Card,
  Flex,
  Box,
  Button,
  IconButton,
  Grid,
  Tooltip,
  Container,
} from "@radix-ui/themes";
import {
  BoxIcon,
  CheckIcon,
  MinusCircledIcon,
  PlusCircledIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

export const AddNewPlayer = () => {
  const settings = useAtomValue(settingsAtom);
  const [scores, setScores] = useAtom(scoresAtom);
  const [newName, setNewName] = React.useState(`Player ${scores.length + 1}`);
  const [startingScore, setStartingScore] = React.useState(0);
  const [newColor, setNewColor] = React.useState(
    randomColor() as COLOR_OPTIONS,
  );
  return (
    <Box>
      <Flex direction="column" gap="1">
        <Text size={"7"}>New player</Text>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          value={newName}
          onChange={(e) => setNewName(e?.target?.value)}
        />
        <StyledLabel>Score</StyledLabel>
        <StyledInput
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

        <StyledLabel>Color</StyledLabel>

        <Flex gap="2" wrap="wrap" justify="start">
          {COLORS_LIST.map((item) => (
            <>
              <Tooltip content={`${item.toLocaleUpperCase()}`} />
              <IconButton
                style={{ backgroundColor: item }}
                onClick={() => setNewColor(item as COLOR_OPTIONS)}
              >
                {item === newColor && <CheckIcon height="40px" width="40px" />}
              </IconButton>
            </>
          ))}
        </Flex>

        <Button
          // type="submit"
          variant="soft"
          style={{ marginTop: "24px" }}
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
            setNewColor(randomColor() as COLOR_OPTIONS);
            setNewName(`Player ${scores.length + 2}`);
          }}
        >
          <PlusIcon />
          Add Player
        </Button>
      </Flex>
    </Box>
  );
};
