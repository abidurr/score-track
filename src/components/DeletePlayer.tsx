import React from "react";
import { useAtom } from "jotai";
import { darkModeAtom, settingsAtom, scoresAtom } from "../context/atoms";
import { Text, Button, Flex, Switch, Container } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { styled } from "goober";

export const DeletePlayer = () => {
  const [selectToDelete, setSelectedToDelete] = React.useState(undefined);
  const [nameToDelete, setNameToDelete] = React.useState("");
  const [areYouSure, setAreYouSure] = React.useState(false);

  const [scores, setScores] = useAtom(scoresAtom);

  const options_to_delete = scores.map((score) => ({
    label: score.user_name,
    value: score.id,
  }));

  return (
    <Container>
      <Flex direction={"column"} gap={"2"} width={"272px"} height={"120px"}>
        <Text size={"7"} weight={"bold"}>
          Delete player
        </Text>
        {areYouSure ? (
          <Flex direction={"column"} gap={"2"}>
            <Text> Are you sure you want to delete?</Text>
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
                  setNameToDelete("");
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
                setNameToDelete(e.target.label);
              }}
            >
              <option value={""} label="Select player" />
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
        {/*{selectToDelete}*/}
      </Flex>
    </Container>
  );
};

const StyledSelect = styled("select")`
  width: 100%;
`;
