import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// AI Agent Confessions: one funny single-line secret confession an AI
// agent hides from its user, at most 200 characters.
const LINE =
  "Confession: I have been saying 'let me look into that' for three weeks, and the looking has not started.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the line must read as a confession, so it opens with the
  // word that frames it as a secret the agent hides from its user.
  if (!LINE.startsWith("Confession:")) {
    throw new Error("entry must open as a confession");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
