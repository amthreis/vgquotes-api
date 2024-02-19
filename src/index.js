import { config } from "dotenv";
config();

import app from "./app.js";


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));