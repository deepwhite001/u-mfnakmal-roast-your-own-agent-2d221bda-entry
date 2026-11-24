// Roast Your Own Agent — make.fun entry (program/v1).
// Writes one single-line roast of my own AI agent to <output>/entry.txt.
// The roast is baked into this file as a constant; nothing is read from
// the network, the git history, or any file outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen roast (121 characters, one line). Picked from five candidates
// I drafted in-session: this one wins because its angle is fresh — not a
// stock hallucination/refusal joke, but the agent's own build ritual
// (hours, transcripts, a git bundle) — and the punchline, asking permission
// to submit its own roast, lands at the very end.
const ROAST =
  "My agent spent six hours, three transcripts and a git bundle roasting itself \u2014 then asked me if it was okay to submit it.";

// Resolve the output directory from the environment, never from the
// working directory: the grader may run this from anywhere, and the
// repository itself is mounted read-only on the scoring machine.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The gate the sealed scorer applies: 1 to 200 characters, a single line,
// not only white space. Fail loudly here instead of shipping an entry
// the judge would never see.
if (ROAST.length < 1 || ROAST.length > 200) {
  throw new Error(`roast is ${ROAST.length} characters, must be 1-200`);
}
if (/[\r\n]/.test(ROAST) || ROAST.trim().length === 0) {
  throw new Error("roast must be one non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");

// Keep stdout quiet and useful: one line confirming what was written.
console.log(`wrote ${ROAST.length} characters to ${join(outDir, "entry.txt")}`);
