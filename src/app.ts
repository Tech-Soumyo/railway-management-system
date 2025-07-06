import express from "express";
import { config } from "./config/env.config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
