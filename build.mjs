import fs from "fs";
import got from "got";

const THEME_NAME = "elegant";
const USE_GIST = false;
const OUTPUT_DIR = "dist";
const RESUME_JSON_URL =
  "https://gist.githubusercontent.com/matjahs/00071c5d8c74d4a9c7b88b856b31fd63/raw/resume.json";

// Import theme
const theme = await import(`jsonresume-theme-${THEME_NAME}`);
// Fetch gist containing resume data
let resume = JSON.parse(fs.readFileSync(`resume.json`, "utf8"));
if (USE_GIST) {
  resume = await got.get(RESUME_JSON_URL).json();
}
// Apply theme to resume JSON
const html = theme.render(resume);
// Make sure that the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const script = `<script type="text/javascript">
  (function (d, u, h, s) {
    h = d.getElementsByTagName('head')[0];
    s = d.createElement('script');
    s.async = 1;
    s.src = u + new Date().getTime();
    h.appendChild(s);
  })(document, 'https://grow.clearbitjs.com/api/pixel.js?v=');
</script>`
const injectScript = (html) => html.replace("</head>", script + "</head>");
// Write the HTML to the output directory
fs.writeFileSync("./dist/index.html", injectScript(html));

console.log(`Built resume with ${THEME_NAME} theme into ./dist/index.html`);
