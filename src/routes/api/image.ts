import express from "express";
import processImage from "../../util/process";

const imgRoute = express.Router();

imgRoute.get('/image', processImage, (req: express.Request, res: express.Response): void => {
    res.send("image route")
})

export default imgRoute