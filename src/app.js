import express from "express";
import cors from "cors";
import { addPost, deleteOldestPost, loadJSON as loadJson } from "./funcs.js";
import routes from "./routes.js";
import { data, unused } from "./db.js";

const app = express();

app.set('trust proxy', 1); //to work w/ render
app.use(cors({ origin: JSON.parse(process.env.CORS_ORIGIN) }));
app.use("/api", routes);

addPost(data, unused);
deleteOldestPost(data, unused);

export default app;