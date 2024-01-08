import fs from "fs";
import path from "path";

export const createFile = (type: string, className: string): void => {
  const typeToUpper = type.charAt(0).toUpperCase() + type.slice(1);
  const stubPath = path.join(__dirname, `../stubs/${type}.stub`);
  const outputPath = path.join(
    __dirname,
    `../../${type}s/${className}${typeToUpper}.ts`
  );
  console.log('writted.');

  let content = fs.readFileSync(stubPath, "utf8");
  content = content.replace(/\[CLASS_NAME\]/g, className);
  content = content.replace(/\[FILENAME\]/g, className.toLowerCase());

  fs.writeFileSync(outputPath, content);
  console.log(`Created ${outputPath}`);
};

const className = process.argv[2];

if (!className) {
  console.error("Please provide a class name");
  process.exit(1);
}
/* createFile("model", className);
createFile("controller", className);
createFile("route", className); */
