"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routesListController_1 = require("../controllers/routesListController");
const router = (0, express_1.Router)();
router.get('/', routesListController_1.listRoutes);
exports.default = router;
//# sourceMappingURL=listRoutes.js.map