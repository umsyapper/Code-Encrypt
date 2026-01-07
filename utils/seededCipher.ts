import { characters } from "./characters";
import { seedRandomize } from "./randomSeed";

function shuffleCharset(seed: number) {
  const rng = seedRandomize(seed);
  const chars = characters.split("");

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export function encrypt(text: string, seed: number) {
  const shuffled = shuffleCharset(seed);
  const map = new Map<string, string>();

  characters.split("").forEach((char, i) => {
    map.set(char, shuffled[i]);
  });

  return text
    .split("")
    .map((char) => map.get(char) ?? char)
    .join("");
}

export function decrypt(text: string, seed: number) {
  const shuffled = shuffleCharset(seed);
  const reverseMap = new Map<string, string>();

  shuffled.split("").forEach((char, i) => {
    reverseMap.set(char, characters[i]);
  });

  return text
    .split("")
    .map((char) => reverseMap.get(char) ?? char)
    .join("");
}
