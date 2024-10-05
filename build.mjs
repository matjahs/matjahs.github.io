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

async function fetchResume() {
  const response = await fetch(GIST_URL);

  if (!response.ok) {
    return console.error(`request failed!`, await response.text());
  }

  const json = await response.json();

  await fs.writeAsync(RESUME_FILENAME, json, {jsonIndent: 2, atomic: true});

  return json;
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

console.info(`downloading ${GIST_URL}`);
const json = await fetchResume(); 

if (!json) {
  // fallback to resume.json
  console.warning("loading resume.json");
  json = JSON.parse(fs.readFileSync(`resume.json`, "utf8"));
}

// Apply theme to resume JSON
// const html = theme.render(resume);
const resume = fs.read(RESUME_FILENAME, "json");
const html = await render(resume, theme);
const outputPath = path.join(__dirname, `${OUTPUT_DIR}/index.html`)

fs.write(outputPath, html);

console.log(`done. output is in ${outputPath}`);
