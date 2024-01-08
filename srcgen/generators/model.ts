import { createFile } from "./generate";
const className = process.argv[2];

if (!className) {
    console.error("Please provide a class name");
    process.exit(1);
}
createFile("model", className);