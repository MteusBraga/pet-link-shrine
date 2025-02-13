import express from "express";
import mainRouter from "./router";

const app = express();

app.use(mainRouter);

export default app;
