"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRouter = void 0;
const express_1 = __importDefault(require("express"));
const ShowController_1 = require("../controller/ShowController");
exports.showRouter = express_1.default.Router();
const showController = new ShowController_1.ShowController();
exports.showRouter.post("/create", showController.createShow);
exports.showRouter.get("/", showController.getShowByDay);
