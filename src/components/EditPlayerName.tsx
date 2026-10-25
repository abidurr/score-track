import React, { useState } from "react";
import { useAtom } from "jotai";
import { scoresAtom } from "../context/atoms";
import { Text, Button, Flex, Container } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { styled } from "goober";
import { StyledInput, StyledLabel } from "./elements";

export const EditPlayerName = () => {
  const [scores, setScores] = useAtom(scoresAtom);
  const [selectToDelete, setSelectedToDelete] = useState(undefined);
  const [newName, setNewName] = useState("");

  const editScore = ({ id, name }: { id?: string; name: string }) => {
    if (id && name) {
      const newScore = scores.map((item) =>
        item.id === id ? { ...item, user_name: name } : item,
      );
      setScores(newScore);
    }
  };

  return (
    <Container>
      <Flex direction={"column"} gap={"1"} width={"272px"}>
        <Text size={"7"} weight={"bold"} style={{ marginBottom: "0px" }}>
          Edit name
        </Text>
        <StyledLabel>New name</StyledLabel>
        <StyledInput onChange={(e) => setNewName(e.target?.value ?? "")} />
        <Flex gap={"3"} width={"272px"} style={{ marginTop: "12px" }}>
          <StyledSelect
            onChange={(e: any) => {
              setSelectedToDelete(e.target.value);
            }}
          >
            <option value={""} label="Select player to edit" />
            {scores.map((item) => (
              <option
                key={item.id}
                value={item.id}
                label={`${item.user_name} (${item.score_value})`}
              />
            ))}
          </StyledSelect>
          <Button
            onClick={() => editScore({ id: selectToDelete, name: newName })}
            disabled={!selectToDelete || !newName}
            variant={"soft"}
            color="green"
            style={{ margin: 0 }}
          >
            <Pencil2Icon height={"22px"} width={"22px"} />
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

const StyledSelect = styled("select")`
  width: 100%;
`;
