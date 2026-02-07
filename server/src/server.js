import dotenv from "dotenv";


const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });


// validate env vars on startup
import { validateEnv } from "./config/validateEnv.js";
validateEnv();

const PORT = process.env.PORT || 5000;

import app from "./app.js";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
