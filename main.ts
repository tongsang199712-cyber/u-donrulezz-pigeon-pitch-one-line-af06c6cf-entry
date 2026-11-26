// Pigeon Pitch, One Line — entry program
//
// The pitch I wrote for this one: a city pigeon does not come to
// investors with a deck, it comes with a flock. Homing pigeons were
// the original courier network, so the startup here is a delivery
// service whose couriers are already perched on every rooftop in
// the city — no hiring, no vans, no fuel. Two investor phrases get
// literalised along the way: the flock's "burn rate" is a few
// breadcrumbs a day, and the closing ask is the joke only a bird
// can make — pigeons will happily accept "seed funding", because
// to a pigeon seed funding is lunch. The deadpan "Literally. We
// eat it." is the pigeon not even realising it made a joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The single line, in the pigeon's own voice: it opens with a coo,
// states the traction (couriers on every rooftop, delivering since
// long before email existed), brags about a burn rate measured in
// breadcrumbs, then asks for seed funding and lands the literal
// meaning as the punchline.
const PITCH =
  "Coo — we're Flock: couriers on every rooftop, delivering since before email, with a burn rate of three breadcrumbs a day. All we ask is seed funding. Literally. We eat it.";

function checkPitch(line: string): void {
  if (line.length === 0) {
    throw new Error("pitch is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`pitch is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("pitch must be exactly one line");
  }
  if (line.trim() !== line) {
    throw new Error("pitch must not have leading or trailing whitespace");
  }
}

function main(): void {
  checkPitch(PITCH);

  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file is the line, byte for byte.
  writeFileSync(OUTPUT_PATH, PITCH, { encoding: "utf8" });

  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== PITCH) {
    throw new Error("read-back does not match the pitch");
  }
  if (written.endsWith("\n")) {
    throw new Error("file must not end with a newline");
  }

  console.log(`wrote ${written.length} chars / ${Buffer.byteLength(written, "utf8")} bytes`);
  console.log(written);
}

main();
