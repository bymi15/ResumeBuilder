const fs = require("fs-extra");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const templatesDir = path.join("src", "components", "dashboard", "templates", "templates");
  const registryPath = path.join(templatesDir, "registry.json");

  const id = await ask('🆔 Template ID (e.g. "modern")? ');
  const name = await ask('📛 Template name (e.g. "Modern Clean")? ');

  const templatePath = path.join(templatesDir, id);

  if (await fs.pathExists(templatePath)) {
    console.error(`❌ Template '${id}' already exists.`);
    process.exit(1);
  }

  await fs.mkdirp(templatePath);

  // Create basic index.tsx
  const indexContent = `
  "use client";

  import { cn } from "@/lib/utils";
  import { TemplateProps } from "@/types/template";
  import { forwardRef } from "react";

  const ${capitalise(
    id
  )}Template = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto bg-white px-10 py-8 font-serif text-[13px] leading-[1.7] tracking-wide",
          className
        )}
      >
        <p>${name} Template</p>
        <h1>
          {data.fullName || "Your Name"}
        </h1>
      </div>
    );
  };

  ${capitalise(id)}Template.displayName = "${capitalise(id)}Template";
  export default ${capitalise(id)}Template;
  `;

  await fs.writeFile(path.join(templatePath, "index.tsx"), indexContent);

  // Read registry and add new entry
  const registry = await fs.readJSON(registryPath);
  registry.push({
    id,
    name,
    thumbnail: `/images/templates/${id}.jpg`,
  });

  await fs.writeJSON(registryPath, registry, { spaces: 2 });

  console.log(`✅ Template '${name}' created in ${templatePath}`);
  console.log(`📎 Added to registry.json`);
  console.log(
    `🖼️  Don't forget to run: 'npm run generate:thumbnail' to re-generate thumbnails at /public/images/templates/`
  );

  rl.close();
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  rl.close();
});
