import express from "express";
import { router as codeRouter } from "./routes/code";
import { router as usersRouter } from "./routes/users";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api/code", codeRouter);
app.use("/api/user", usersRouter);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
