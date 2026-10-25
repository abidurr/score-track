import { Grid, Section } from "@radix-ui/themes";
import { Settings, Scores, AddNewPlayer, DeletePlayer } from "../components/";
import { Flex } from "@radix-ui/themes";
import { styled } from "goober";
import { EditPlayerName } from "./EditPlayerName";
import { RandomDice } from "./Dice";

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

const ResponsiveGrid = styled("div")`
  display: grid;
  gap: 6px;
  justify: start;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    margin: auto;
  }
`;

export const Scoreboard = () => {
  return (
    <ResponsiveGrid>
      <Section>
        <Flex
          direction={"column"}
          gap={"6"}
          width={"272px"}
          align={"start"}
          justify={"start"}
          style={{ margin: "auto" }}
        >
          <AddNewPlayer />
          <HrStyled />
          <DeletePlayer />
          <HrStyled />
          <EditPlayerName />
          <HrStyled />
          <RandomDice />
          <HrStyled />
          <Settings />
        </Flex>
      </Section>
      <Section>
        <Scores />
      </Section>
    </ResponsiveGrid>
  );
};
