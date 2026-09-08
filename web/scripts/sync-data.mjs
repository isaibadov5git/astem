// Copies the canonical datasets from the repository root into the app so the
// build is self-contained. Canonical home stays ../data — never edit the copy.
import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, "../../data");
const dest = path.resolve(here, "../src/data");

if (!existsSync(src)) {
  console.error(`sync-data: canonical data directory missing at ${src}`);
  process.exit(1);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`sync-data: copied ${src} -> ${dest}`);
