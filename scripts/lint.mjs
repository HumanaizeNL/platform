import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

let issues = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry === ".git") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { walk(full); continue; }
    if (![".mjs", ".js", ".json", ".html"].includes(extname(full))) continue;
    const content = readFileSync(full, "utf8");
    if (content.includes("\t")) { console.error(`tabs: ${full}`); issues++; }
    if (!content.endsWith("\n")) { console.error(`no trailing newline: ${full}`); issues++; }
  }
}

walk(".");
if (issues) { console.error(`${issues} lint issue(s)`); process.exit(1); }
console.log("Lint passed");
