import * as path from "node:path"
import * as url from "node:url";
import * as theme from "jsonresume-theme-even";
import { render } from "resumed";
import fs from "fs-jetpack";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, "_site");
const RESUME_FILENAME = "resume.json";
const OUTPUT_PATH = path.join(OUTPUT_DIR, "index.html");

// Removing previous build
if (fs.exists(OUTPUT_DIR)) {
  console.info(`removing previous builds...`);
  fs.remove(OUTPUT_DIR);
}
// Make sure that the output directory exists
if (!fs.exists(OUTPUT_DIR)) {
  console.info(`creating output directory...`, OUTPUT_DIR);
  fs.dir(OUTPUT_DIR);
}

try {
  const resume = fs.read(RESUME_FILENAME, "json");
  // Apply theme to resume JSON
  const html = await render(resume, theme);
  // Output HTML artifact so it can be uploaded by GitHub actions
  fs.write(OUTPUT_PATH, html);

  console.log(`done. output is in ${OUTPUT_PATH}`);
} catch (err) {
  console.error(`failed to render resume`, err);
  process.exit(1);
}
