const fs = require("fs");
const path = require("path");

const THEME_NAME = "elegant";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function getTheme(theme = "elegant") {
  const themePkg = require(`jsonresume-theme-${theme}`);
  if (!theme) {
    throw new Error(`theme ${theme} not found`);
  }
  return themePkg;
}

try {
  const theme = getTheme(THEME_NAME);

  const resumeJson = require(path.join(__dirname, "resume.json"));

  const html = theme.render(resumeJson);

  ensureDir("dist");
  fs.writeFileSync("./dist/index.html", html);
} catch (error) {
  console.error(error);
  process.exit(1);
}
