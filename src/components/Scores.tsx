import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { scoresAtom, settingsAtom } from "@/context/atoms";
import {
  Section,
  Text,
  Avatar,
  Card,
  Flex,
  Box,
  Button,
} from "@radix-ui/themes";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { nanoid } from "nanoid";

export const Scores: React.FC = () => {
  const [scores, setScores] = useAtom(scoresAtom);
  const settings = useAtomValue(settingsAtom);

  const step_size = settings?.step_size;

  return (
    <Section>
      <Flex direction="column" gap="4" wrap={"wrap"}>
        <Text size="9" weight={"bold"}>
          Scores
        </Text>
        <Flex wrap="wrap" gap={"5"} align={"start"} direction={"column"}>
          {scores?.length ? (
            scores?.map((item) => {
              return (
                <Box key={`player-${item.id}`} width="260px">
                  <Card size="1">
                    <Flex gap="3" align="center" justify="between">
                      <Flex gap="3" align="center">
                        <Avatar
                          size="3"
                          radius="full"
                          fallback={item?.user_name.substring(0, 1)}
                          color={item?.color}
                          style={{ backgroundColor: item?.color }}
                        />
                        <Box>
                          <Text as="div" size="2" weight="bold" color="gray">
                            {item?.user_name ?? "J. Doe"}
                          </Text>
                          <Text as="div" size="8" weight="bold">
                            {item?.score_value ?? 0}
                          </Text>
                        </Box>
                      </Flex>
                      <Box>
                        <Flex gap="4" direction="column">
                          <IconButton
                            variant="ghost"
                            size="2"
                            onClick={() => {
                              setScores(
                                scores?.length
                                  ? scores.map((score) =>
                                      item.id === score.id
                                        ? {
                                            ...score,
                                            score_value:
                                              step_size +
                                              (score.score_value ?? 0),
                                          }
                                        : score,
                                    )
                                  : [],
                              );
                            }}
                          >
                            <ThickArrowUpIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setScores(
                                scores?.length
                                  ? scores.map((score) =>
                                      item.id === score.id
                                        ? {
                                            ...score,
                                            score_value:
                                              (score.score_value ?? 0) -
                                              step_size,
                                          }
                                        : score,
                                    )
                                  : [],
                              );
                            }}
                            size="2"
                            variant="ghost"
                          >
                            <ThickArrowDownIcon />
                          </IconButton>
                        </Flex>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
              );
            })
          ) : (
            <Button
              onClick={() =>
                setScores([
                  {
                    id: nanoid(),
                    user_name: "Player 1",
                    score_value: 0,
                    color: "bronze",
                  },
                ])
              }
            >
              Add Player 1
            </Button>
          )}
        </Flex>
      </Flex>
    </Section>
  );
};
