import React, { useState } from "react";
import { useAtom } from "jotai";
import { scoresAtom } from "../context/atoms";
import { Text, Button, Flex, Container } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { styled } from "goober";

export const DeletePlayer = () => {
  const [selectToDelete, setSelectedToDelete] = useState(undefined);
  const [areYouSure, setAreYouSure] = useState(false);
  const [scores, setScores] = useAtom(scoresAtom);

  const findUserFromId = (id?: string) => {
    const userToDelete = scores?.filter((item) => item?.id === id);
    return userToDelete[0]?.user_name ?? "this player";
  };

  return (
    <Container>
      <Flex direction={"column"} gap={"2"} width={"272px"} height={"120px"}>
        <Text size={"7"} weight={"bold"}>
          Delete player
        </Text>
        {areYouSure ? (
          <Flex direction={"column"} gap={"2"}>
            <Text>Delete {findUserFromId(selectToDelete)} ?</Text>
            <Flex gap={"3"} justify={"between"} style={{ margin: "10px 18px" }}>
              <Button
                color="green"
                variant="soft"
                onClick={() => setAreYouSure(false)}
              >
                No, go back
              </Button>
              <Button
                variant="soft"
                onClick={() => {
                  setScores(
                    scores.filter((score) => selectToDelete !== score.id),
                  );
                  setAreYouSure(false);
                  setSelectedToDelete(undefined);
                }}
                color="red"
              >
                Yes, delete it
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex gap={"3"} width={"272px"} style={{ marginTop: "12px" }}>
            <StyledSelect
              onChange={(e: any) => {
                setSelectedToDelete(e.target.value);
              }}
            >
              <option value={""} label="Select player to delete" />
              {scores.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  label={`${item.user_name} (${item.score_value})`}
                />
              ))}
            </StyledSelect>
            <Button
              onClick={() => setAreYouSure(true)}
              disabled={!selectToDelete}
              variant={"soft"}
              color="red"
              style={{ margin: 0 }}
            >
              <TrashIcon height={"22px"} width={"22px"} />
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

const StyledSelect = styled("select")`
  width: 100%;
`;
