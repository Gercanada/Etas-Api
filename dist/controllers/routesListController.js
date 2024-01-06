"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoutes = void 0;
const express_list_routes_1 = __importDefault(require("express-list-routes"));
const listRoutes = (req, res) => {
    console.log({ routelist: (0, express_list_routes_1.default)(req.app) });
    res.json({ data: (0, express_list_routes_1.default)(req.app) });
};
exports.listRoutes = listRoutes;
//# sourceMappingURL=routesListController.js.map