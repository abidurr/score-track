import React, { useState } from "react";
import { Text, Button, Flex, Container } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedNumber } from "./AnimatedNumber";

export const RandomDice = () => {
  const [rollScore, setRollScore] = useState("");
  const [rollSequence, setRollSequence] = useState(0);

  const showRoll = (value: string) => {
    setRollScore(value);
    setRollSequence((sequence) => sequence + 1);
  };

  return (
    <Container>
      <Flex direction={"column"} gap={"2"} width={"272px"}>
        <Text
          size={"7"}
          weight={"bold"}
          style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
        >
          Roll{!!rollScore && `: `}
          <span
            style={{
              opacity: 0.8,
              display: "inline-flex",
              whiteSpace: "nowrap",
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              {rollScore && (
                <motion.span
                  key={rollSequence}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/^[0-9]+$/.test(rollScore) ? (
                    <AnimatedNumber value={Number(rollScore)} />
                  ) : (
                    rollScore
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Text>
        <Button
          variant="soft"
          disabled={rollScore === ""}
          onClick={() => setRollScore("")}
          color="green"
        >
          Reset
        </Button>
        <Button
          variant="soft"
          onClick={() => {
            const random = Math.random();
            showRoll(random > 0.5 ? "heads" : "tails");
          }}
          color="blue"
        >
          Coin
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 4)}`)}
          color="blue"
        >
          Dice 4
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 6)}`)}
          color="blue"
        >
          Dice 6
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 8)}`)}
          color="blue"
        >
          Dice 8
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 10)}`)}
          color="blue"
        >
          Dice 10
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 12)}`)}
          color="blue"
        >
          Dice 12
        </Button>
        <Button
          variant="soft"
          onClick={() => showRoll(`${Math.ceil(Math.random() * 20)}`)}
          color="blue"
        >
          Dice 20
        </Button>
      </Flex>
    </Container>
  );
};
