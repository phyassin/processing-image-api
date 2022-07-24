"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var process_1 = __importDefault(require("../../util/process"));
var imgRoute = express_1.default.Router();
imgRoute.get('/image', process_1.default, function (req, res) {
    res.send("image route");
});
exports.default = imgRoute;
