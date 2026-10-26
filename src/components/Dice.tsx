import React, { useState } from "react";
import { useAtom } from "jotai";
import { scoresAtom } from "../context/atoms";
import { Text, Button, Flex, Container } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { styled } from "goober";

export const RandomDice = () => {
  const [rollScore, setRollScore] = useState("");

  const getD2value = () => {};

  return (
    <Container>
      <Flex direction={"column"} gap={"2"} width={"272px"}>
        <Text size={"7"} weight={"bold"}>
          Roll{!!rollScore && `: `}
          <span style={{ opacity: 0.8 }}>{!!rollScore && `${rollScore}`}</span>
        </Text>
        <Button
          variant="soft"
          disabled={rollScore === ""}
          onClick={() => {
            setRollScore("");
          }}
          color="green"
        >
          Reset
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            const random = Math.random();
            setRollScore(random > 0.5 ? "heads" : "tails");
          }}
          color="blue"
        >
          Coin
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 4)}`);
          }}
          color="blue"
        >
          Dice 4
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 6)}`);
          }}
          color="blue"
        >
          Dice 6
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 8)}`);
          }}
          color="blue"
        >
          Dice 8
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 10)}`);
          }}
          color="blue"
        >
          Dice 10
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 12)}`);
          }}
          color="blue"
        >
          Dice 12
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            setRollScore(`${Math.ceil(Math.random() * 20)}`);
          }}
          color="blue"
        >
          Dice 20
        </Button>
      </Flex>
    </Container>
  );
};

const StyledSelect = styled("select")`
  width: 100%;
`;
