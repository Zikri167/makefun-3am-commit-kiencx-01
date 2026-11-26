// The 3AM Commit Message — make.fun entry (program/v1, node22, stdlib only).
//
// Writes one line to /output/entry.txt: the funniest one-line git commit
// message an AI coding agent might type at 3am after a long night of
// fixing its own bugs. Deterministic: the same line on every run, no
// network, no randomness, no clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. One exhausted shrug, typed in a hurry at 3am: the bug vanished
// on its own and the agent has decided, wisely, not to investigate.
const LINE =
  "fix: the bug is gone. i don't know where it went. i'm not going to look for it";

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// Gate: 1..139 characters, not whitespace only, valid UTF-8.
if (LINE.length < 1 || LINE.length > 139) {
  throw new Error(`entry length ${LINE.length} is outside 1..139 characters`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace only");
}
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("entry is not valid UTF-8");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("output file does not match the entry line");
}
