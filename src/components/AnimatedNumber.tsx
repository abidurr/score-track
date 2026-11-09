import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Direction = 1 | -1;

type NumberToken = {
  key: string;
  text: string;
  digit?: number;
};

const numberFormatter = new Intl.NumberFormat();
const digitGlyphs = Array.from(
  { length: 10 },
  (_, digit) =>
    numberFormatter.formatToParts(digit).find((part) => part.type === "integer")
      ?.value ?? `${digit}`,
);

const getTokens = (value: number): NumberToken[] => {
  const parts = numberFormatter.formatToParts(value);
  const integerCount = parts
    .filter((part) => part.type === "integer")
    .reduce((count, part) => count + Array.from(part.value).length, 0);
  const tokens: NumberToken[] = [];
  let integerIndex = 0;
  let fractionIndex = 0;

  parts.forEach((part, partIndex) => {
    if (part.type === "integer" || part.type === "fraction") {
      Array.from(part.value).forEach((text) => {
        const digit = digitGlyphs.indexOf(text);
        const key =
          part.type === "integer"
            ? `integer-${integerCount - integerIndex - 1}`
            : `fraction-${fractionIndex}`;

        tokens.push({ key, text, digit: digit < 0 ? undefined : digit });
        if (part.type === "integer") integerIndex += 1;
        else fractionIndex += 1;
      });
    } else {
      const key =
        part.type === "group"
          ? `group-${integerCount - integerIndex}`
          : `${part.type}-${partIndex}`;
      tokens.push({ key, text: part.value });
    }
  });

  return tokens;
};

const NumberDigit: React.FC<{ digit: number; direction: Direction }> = ({
  digit,
  direction,
}) => (
  <span
    style={{
      display: "inline-grid",
      position: "relative",
      width: "0.8em",
      flex: "0 0 0.8em",
      verticalAlign: "baseline",
      textAlign: "center",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    <AnimatePresence initial={false} mode="popLayout" custom={direction}>
      <motion.span
        key={digit}
        custom={direction}
        initial={{ y: direction > 0 ? "110%" : "-110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: direction > 0 ? "-110%" : "110%", opacity: 0 }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
        style={{ gridArea: "1 / 1", whiteSpace: "nowrap" }}
      >
        {digitGlyphs[digit]}
      </motion.span>
    </AnimatePresence>
  </span>
);

export const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [previous, setPrevious] = useState({
    value,
    direction: 1 as Direction,
  });
  let direction = previous.direction;

  if (value !== previous.value) {
    direction = value > previous.value ? 1 : -1;
    setPrevious({ value, direction });
  }

  return (
    <span
      aria-label={numberFormatter.format(value)}
      style={{
        display: "inline-flex",
        position: "relative",
        alignItems: "baseline",
        whiteSpace: "nowrap",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {getTokens(value).map((token) => (
          <motion.span
            key={token.key}
            custom={direction}
            initial={{ y: direction > 0 ? "110%" : "-110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: direction > 0 ? "-110%" : "110%", opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{
              display: "inline-flex",
              overflow: "hidden",
              verticalAlign: "baseline",
              whiteSpace: "nowrap",
            }}
          >
            {token.digit === undefined ? (
              token.text
            ) : (
              <NumberDigit digit={token.digit} direction={direction} />
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
};
