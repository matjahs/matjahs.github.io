import * as path from "node:path"
import * as url from "node:url";
import * as theme from "jsonresume-theme-even";
import {render} from "resumed";
import fs from "fs-jetpack"
import fetch from "node-fetch";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const OUTPUT_DIR = '_site';
const GIST_URL =
  "https://gist.githubusercontent.com/matjahs/00071c5d8c74d4a9c7b88b856b31fd63/raw/resume.json";
const RESUME_FILENAME = `resume.json`;
const OUTPUT_PATH = path.join(__dirname, OUTPUT_DIR, 'index.html');

async function fetchResume() {
  console.info(`downloading ${GIST_URL}`);

  const response = await fetch(GIST_URL);

  if (!response.ok) {
    return console.error(`request failed!`, await response.text());
  }

  return response.json();
}

// Removing previous build
if (!fs.exists(OUTPUT_DIR)) {
  console.info(`removing previous builds...`);
  fs.remove(OUTPUT_DIR);
}
// Make sure that the output directory exists
if (!fs.exists(OUTPUT_DIR)) {
  console.info(`creating output directory...`, OUTPUT_DIR);
  fs.dir(OUTPUT_DIR);
}

try {
  const jsonData = await fetchResume();

  await fs.writeAsync(RESUME_FILENAME, jsonData, {jsonIndent: 2, atomic: true});
} catch (err) {
  console.error(`failed to download resume.json`, err);
  process.exit(1);
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
