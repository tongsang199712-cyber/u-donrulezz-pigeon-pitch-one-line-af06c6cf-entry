// Pigeon Pitch, One Line
//
// The joke: a city pigeon pitching investors — and its startup is
// monetizing the one thing pigeons already do to every parked car in
// the city. "Impressions" is ad-industry jargon, but here it is
// literal: bird droppings on windshields. The pitch sounds like a
// real startup deck (impressions, zero ad spend, captive audience)
// until the last clause lands the twist: the drivers can't opt out,
// because nobody can opt out of pigeons. "Peck" is the startup's
// name — and what pigeons do.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE: string =
  "Investors, meet Peck: the app that turns every parked car into ad space — 40 million impressions a day, zero ad spend, and the drivers literally cannot opt out.";

function main(): void {
  // Length gate: the entry line must be 1-200 characters, per the gate.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`Line length ${LINE.length} is outside the 1-200 gate`);
  }

  mkdirSync("/output", { recursive: true });

  // Write the line with no trailing newline.
  writeFileSync("/output/entry.txt", LINE, "utf8");

  // Read it back and verify it matches exactly.
  const readBack: string = readFileSync("/output/entry.txt", "utf8");
  if (readBack !== LINE) {
    throw new Error("Verification failed: file content does not match the line");
  }
  if (readBack.endsWith("\n")) {
    throw new Error("Verification failed: file must not end with a newline");
  }

  console.log(`Verified: ${readBack.length} characters`);
  console.log(readBack);
}

main();
