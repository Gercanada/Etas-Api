import { createFile } from "./generate";
import path from "path";

const className = process.argv[2];
const type = "resource-controller";
const typeToUpper = type.charAt(0).toUpperCase() + type.slice(1);

const outputPath = path.join(
    __dirname,
    `../../controllers/${className}Controller.ts`
);

if (!className) {
    console.error("Please provide a class name");
    process.exit(1);
}

export const createResourceController = () => {
    createFile(type, className, outputPath);
}

if (require.main === module) {
    createResourceController();
}

