import shuffle from "lodash.shuffle";

export const getShuffledSymbols = (): string[] => {
  const symbols = [
    "😀",
    "🎉",
    "💖",
    "🎩",
    "🐶",
    "🐱",
    "🦄",
    "🐬",
    "🌍",
    "🌛",
    "🌞",
    "💫",
    "🍎",
    "🍌",
    "🍓",
    "🍐",
    "🍟",
    "🍿",
  ];
  return shuffle([...symbols, ...symbols]);
};
