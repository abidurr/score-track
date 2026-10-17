import { Theme, ThemePanel, Container, Grid, Section } from "@radix-ui/themes";
import { Settings, Scores, AddNewPlayer, DeletePlayer } from "../components/";
import { darkModeAtom } from "../context/atoms";
import { useAtomValue } from "jotai";
import { Flex } from "@radix-ui/themes";
import { styled } from "goober";

const HrStyled = styled("div")`
  min-width: 100%;
  color: white;
  background: #0090f0;
  background: radial-gradient(
    circle,
    rgba(0, 144, 240, 1) 0%,
    rgba(59, 188, 217, 1) 65%,
    rgba(97, 188, 207, 1) 75%,
    rgba(74, 176, 194, 1) 94%
  );
  opacity: 0.6;
  height: 2px;
`;

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
          <Settings />
          <HrStyled />
          <DeletePlayer />
          <HrStyled />
          <AddNewPlayer />
        </Flex>
      </Section>
      <Scores />
    </Grid>
  );
};
