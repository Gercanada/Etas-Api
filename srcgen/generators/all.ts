import { createController } from "./controller";
import { createResourceController } from "./resource-controller";
import { createMigration } from "./migration";
import { createModel } from "./model";
import { createRoute } from "./route";


const className = process.argv[2];

if (!className) {
    console.error("Please provide a class name");
    process.exit(1);
}

// createMigration();
createModel();
createRoute();
createResourceController();
// createController();


