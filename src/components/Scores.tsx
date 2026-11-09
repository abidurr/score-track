import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { scoresAtom, settingsAtom, type IScore } from "@/context/atoms";
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
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "motion/react";
import { styled } from "goober";
import { AnimatedNumber } from "./AnimatedNumber";

const ScoreInput = styled("input")`
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const getStepPrecision = (stepSize: number) => {
  if (!Number.isFinite(stepSize) || stepSize === 0) return 0;

  const [coefficient = "0", exponent = "0"] = Math.abs(stepSize)
    .toString()
    .split("e");
  const fractionDigits = coefficient.split(".")[1]?.length ?? 0;
  return Math.max(0, Math.min(15, fractionDigits - Number(exponent)));
};

const getEditableScore = (value: number, stepSize: number) => {
  if (!Number.isFinite(value)) return String(value);

  const precision = Math.max(3, getStepPrecision(stepSize));
  const roundedValue = Number(value.toFixed(precision));
  const tolerance =
    Number.EPSILON * Math.max(1, Math.abs(value), Math.abs(roundedValue)) * 512;

  return Math.abs(value - roundedValue) <= tolerance
    ? String(roundedValue)
    : String(value);
};

interface EditableScoreProps {
  value: number;
  stepSize: number;
  integerOnly: boolean;
  onSave: (value: number) => void;
}

const EditableScore: React.FC<EditableScoreProps> = ({
  value,
  stepSize,
  integerOnly,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(getEditableScore(value, stepSize));
  const inputRef = useRef<HTMLInputElement>(null);
  const handledRef = useRef(false);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  const cancel = () => {
    handledRef.current = true;
    setDraft(getEditableScore(value, stepSize));
    setIsEditing(false);
  };

  const save = (showValidationMessage: boolean) => {
    const input = inputRef.current;
    if (!input || handledRef.current) return;

    const nextValue = input.valueAsNumber;
    const isValid =
      input.checkValidity() &&
      Number.isFinite(nextValue) &&
      (!integerOnly || Number.isInteger(nextValue));

    if (!isValid) {
      if (showValidationMessage) input.reportValidity();
      return;
    }

    handledRef.current = true;
    onSave(nextValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ScoreInput
        ref={inputRef}
        type="number"
        step={integerOnly ? 1 : "any"}
        required
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => {
          if (handledRef.current) return;
          const input = inputRef.current;
          const nextValue = input?.valueAsNumber;
          if (
            input?.checkValidity() &&
            Number.isFinite(nextValue) &&
            (!integerOnly || Number.isInteger(nextValue))
          ) {
            save(false);
          } else {
            cancel();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            save(true);
          } else if (event.key === "Escape") {
            event.preventDefault();
            cancel();
          }
        }}
        aria-label="Edit score"
        style={{
          appearance: "textfield",
          width: `${Math.max(draft.length, String(value).length, 1)}ch`,
          minWidth: "1ch",
          padding: 0,
          margin: 0,
          border: 0,
          outline: 0,
          background: "transparent",
          color: "inherit",
          font: "inherit",
          textAlign: "inherit",
        }}
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Edit score ${value}`}
      onDoubleClick={() => {
        handledRef.current = false;
        setDraft(getEditableScore(value, stepSize));
        setIsEditing(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handledRef.current = false;
          setDraft(getEditableScore(value, stepSize));
          setIsEditing(true);
        }
      }}
      style={{ cursor: "text" }}
    >
      <AnimatedNumber value={value} />
    </span>
  );
};

interface SortableScoreRowProps {
  item: IScore;
  stepSize: number;
  integerOnly: boolean;
  onScoreChange: (playerId: string, value: number) => void;
  onStep: (playerId: string, amount: number) => void;
}

const SortableScoreRow: React.FC<SortableScoreRowProps> = ({
  item,
  stepSize,
  integerOnly,
  onScoreChange,
  onStep,
}) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={item}
      dragListener={false}
      dragControls={dragControls}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        height: 0,
        marginBottom: 0,
        overflow: "hidden",
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onPointerDownCapture={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const isAvatar = target.closest("[data-score-drag-handle]");
        const isInteractive = target.closest(
          "[data-score-no-drag], button, input, [role='button']",
        );

        if (
          isAvatar ||
          (!isInteractive && target.closest("[data-score-card]"))
        ) {
          dragControls.start(event);
        }
      }}
      style={{ width: 300, listStyle: "none" }}
    >
      <Card
        size="1"
        data-score-card
        style={{
          minWidth: "300px",
          width: "fit-content",
        }}
      >
        <Flex gap="3" align="center" justify="between">
          <Flex gap="3" align="center">
            <span
              data-score-drag-handle
              style={{
                display: "inline-flex",
                cursor: "grab",
                touchAction: "none",
              }}
            >
              <Avatar
                size="3"
                radius="full"
                fallback={item.user_name.substring(0, 1)}
                color={item.color}
                style={{ backgroundColor: item.color }}
              />
            </span>
            <Box>
              <Text
                as="div"
                size="2"
                weight="bold"
                color="gray"
                data-score-no-drag
                style={{ cursor: "default" }}
              >
                {item.user_name ?? "J. Doe"}
              </Text>
              <Text
                as="div"
                size="8"
                weight="bold"
                style={{ whiteSpace: "nowrap", cursor: "text" }}
                data-score-no-drag
              >
                <EditableScore
                  value={item.score_value ?? 0}
                  stepSize={stepSize}
                  integerOnly={integerOnly}
                  onSave={(value) => onScoreChange(item.id, value)}
                />
              </Text>
            </Box>
          </Flex>
          <Flex gap="2" direction="column">
            <IconButton
              type="button"
              variant="ghost"
              size="2"
              aria-label={`Increase ${item.user_name}'s score`}
              style={{ cursor: "pointer" }}
              onClick={() => onStep(item.id, stepSize)}
            >
              <ThickArrowUpIcon />
            </IconButton>
            <IconButton
              type="button"
              variant="ghost"
              size="2"
              aria-label={`Decrease ${item.user_name}'s score`}
              style={{ cursor: "pointer" }}
              onClick={() => onStep(item.id, -stepSize)}
            >
              <ThickArrowDownIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </Reorder.Item>
  );
};

export const Scores: React.FC = () => {
  const [scores, setScores] = useAtom(scoresAtom);
  const settings = useAtomValue(settingsAtom);

  const step_size = settings?.step_size;
  const updateScore = (playerId: string, value: number) => {
    setScores((currentScores) =>
      currentScores.map((score) =>
        score.id === playerId ? { ...score, score_value: value } : score,
      ),
    );
  };
  const updateScoreByStep = (playerId: string, amount: number) => {
    setScores((currentScores) =>
      currentScores.map((score) =>
        score.id === playerId
          ? { ...score, score_value: score.score_value + amount }
          : score,
      ),
    );
  };

  return (
    <Section style={{ width: "fit-content", margin: "auto" }}>
      <Flex direction="column" gap="4" wrap={"wrap"}>
        <Text size="8" weight={"bold"} style={{ marginBottom: "12px" }}>
          Scores
        </Text>
        <Flex wrap="wrap" gap={"5"} align={"start"} direction={"column"}>
          {scores.length ? (
            <Reorder.Group
              as="div"
              axis="y"
              values={scores}
              onReorder={setScores}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 20,
                width: "100%",
              }}
            >
              <AnimatePresence initial={false}>
                {scores.map((item) => (
                  <SortableScoreRow
                    key={`player-${item.id}`}
                    item={item}
                    stepSize={step_size}
                    integerOnly={settings.is_integer}
                    onScoreChange={updateScore}
                    onStep={updateScoreByStep}
                  />
                ))}
              </AnimatePresence>
            </Reorder.Group>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key="empty-scoreboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="soft"
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
              </motion.div>
            </AnimatePresence>
          )}
        </Flex>
      </Flex>
    </Section>
  );
};
