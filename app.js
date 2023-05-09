const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();

const { authRouter } = require("./routes/authRouter");
const { ownerRouter } = require("./routes/ownerRouter");
const { fileRouter } = require("./routes/fileRouter");
const { generatorRouter } = require("./routes/generatorRouter");
const { generalsettingsRouter } = require("./routes/generalSettingsRouter");
const { workingCyclesRouter } = require("./routes/workingCyclesRouter");
const { calcDataRouter } = require("./routes/calcDataRouter");

const { errorHandler } = require("./middleware/errorHandler");
const { deleteTMPFileController } = require("./controllers/fileController");
const { deleteNotAutorizedOwnerService } = require("./services/authService");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/owner", fileRouter);

app.use("/api/generator", generatorRouter);
app.use("/api/setting", generalsettingsRouter);
app.use("/api/cycles", workingCyclesRouter);
app.use("/api/calcdata", calcDataRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

cron.schedule("*/10 * * * *", () => {
  deleteTMPFileController();
});
cron.schedule("*/10 * * * *", () => {
  deleteNotAutorizedOwnerService();
});

module.exports = app;
