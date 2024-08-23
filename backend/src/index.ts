import express from "express";
import { router as codeRouter } from "./routes/code";
import { router as userRouter } from "./routes/user";
import { router as storeRouter } from "./routes/store";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api/code", codeRouter);
app.use("/api/user", userRouter);
app.use("/api/store", storeRouter);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
