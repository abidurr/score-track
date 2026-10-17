import React from "react";
import { useAtom } from "jotai";
import { darkModeAtom, settingsAtom, scoresAtom } from "../context/atoms";
import { Text, Button, Flex, Switch, Container } from "@radix-ui/themes";

export const DeletePlayer = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [selectToDelete, setSelectedToDelete] = React.useState(undefined);
  const [areYouSure, setAreYouSure] = React.useState(false);

  const [scores, setScores] = useAtom(scoresAtom);

  const options_to_delete = scores.map((score) => ({
    label: score.user_name,
    value: score.id,
  }));

  return (
    <Container>
      <Flex direction={"column"} gap={"2"}>
        <select onChange={(e) => setSelectedToDelete(e.target.value)}>
          {scores.map((item) => (
            <option key={item.id}>{item.id}</option>
          ))}
        </select>
        {selectToDelete}
      </Flex>
    </Container>
  );
};
