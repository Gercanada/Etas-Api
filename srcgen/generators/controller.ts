import { createFile } from "./generate";
import path from "path";

const className = process.argv[2];
const type = "controller";
const typeToUpper = type.charAt(0).toUpperCase() + type.slice(1);

const outputPath = path.join(
    __dirname,
    `../../${type}s/${className}${typeToUpper}.ts`
);

if (!className) {
    console.error("Please provide a class name");
    process.exit(1);
}

export const createController = () => {
    createFile(type, className, outputPath);
}

if (require.main === module) {
    createController();
}

