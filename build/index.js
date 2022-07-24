"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var image_1 = __importDefault(require("./routes/api/image"));
var app = (0, express_1.default)();
var port = 3000;
app.use("/api", image_1.default);
// add routing for / path
app.get('/api', function (req, res) {
    res.send('Hello Api World');
});
// start server
app.listen(port, function () {
    console.log("Server is starting at http://localhost:".concat(port));
});
exports.default = app;
