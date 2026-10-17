import { Theme, ThemePanel, Container, Grid, Section } from "@radix-ui/themes";
import { Settings, Scores, AddNewPlayer, DeletePlayer } from "../components/";
import { darkModeAtom } from "../context/atoms";
import { useAtomValue } from "jotai";
import { Flex } from "@radix-ui/themes";
import { styled } from "goober";

export const Scoreboard = () => {
  return (
    <Grid columns={"2"} gap={"6"} justify={"start"}>
      <Section>
        <Flex
          direction={"column"}
          gap={"6"}
          width={"272px"}
          align={"start"}
          justify={"start"}
          style={{ margin: "auto" }}
        >
          <DeletePlayer />
          <Settings />
          <AddNewPlayer />
        </Flex>
      </Section>
      <Scores />
    </Grid>
  );
};
