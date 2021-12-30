import fs from "fs";
import got from "got";

const THEME_NAME = "elegant";
const OUTPUT_DIR = "dist";
const RESUME_JSON_URL =
  "https://gist.githubusercontent.com/matjahs/00071c5d8c74d4a9c7b88b856b31fd63/raw/8ec0e8f7d9e9b549c2b0cd6b436de62ae641ee0c/resume.json";

// Import theme
const theme = await import(`jsonresume-theme-${THEME_NAME}`);
// Fetch gist containing resume data
const resume = await got.get(RESUME_JSON_URL).json();
// Apply theme to resume JSON
const html = theme.render(resume);
// Make sure that the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}
// Write the HTML to the output directory
fs.writeFileSync("./dist/index.html", html);

console.log(`Built resume with ${THEME_NAME} theme into ./dist/index.html`);
