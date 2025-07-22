const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

// Load registry.json
const registryPath = path.resolve(
  __dirname,
  "../components/dashboard/templates/templates/registry.json"
);
const registry = fs.readJSONSync(registryPath);

// Dynamically get template IDs
const TEMPLATE_IDS = registry.map((template) => template.id);

async function generateThumbnails() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const id of TEMPLATE_IDS) {
    const url = `http://localhost:3000/templates/${id}`;

    console.log(`📸 Generating thumbnail for: ${id}`);
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    const outputPath = path.join("public", "images", "templates", `${id}.jpg`);
    await fs.ensureDir(path.dirname(outputPath));
    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 80,
      clip: { x: 0, y: 0, width: 794, height: 1123 },
    });

    console.log(`✅ Saved to ${outputPath}`);
  }

  await browser.close();
}

generateThumbnails().catch((err) => {
  console.error("❌ Error generating thumbnails:", err);
  process.exit(1);
});
