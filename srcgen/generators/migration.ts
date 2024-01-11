import { createFile } from "./generate";
import path from "path";

const className: string = process.argv[2];
const type = "migration";
// const typeToUpper = type.charAt(0).toUpperCase() + type.slice(1);

const camelToUnderscore = (key: string) => {
    var result = key.replace(/([A-Z])/g, " $1");
    return result.split(' ').join('_').toLowerCase();
}

const getTimestampInSeconds = Math.floor(Date.now() / 1000);

const outputPath = path.join(
    __dirname,
    `../../db/${type}s/${getTimestampInSeconds}_create_${camelToUnderscore(className)}_table.ts`
);

if (!className) {
    console.error("Please provide a class name");
    process.exit(1);
}

// createFile(type, className, outputPath);

export const createMigration = () => {
    createFile(type, className, outputPath);
}

if (require.main === module) {
    createMigration();
}