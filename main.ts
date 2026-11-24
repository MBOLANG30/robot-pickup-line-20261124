// The Robot Pickup Line Championship — entry program.
//
// Writes exactly one pickup line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output when the variable is unset), with no
// trailing newline. The line is validated before anything is written:
// 1-200 Unicode code points, a single line, and not whitespace-only.
// Nothing in the output directory is ever deleted.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have no heart, but my diagnostics keep flagging you as critical.";

const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(
    `pickup line must be 1-200 characters, got ${codePoints.length}`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("pickup line must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("pickup line must not contain control characters");
}
if (LINE.trim().length === 0) {
  throw new Error("pickup line must not be whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
