import express from "express";
import cors from "cors";
import router from "./router/index.js";

const app = express();

app.use(express.json());
app.use(cors());

//set router
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`app is running on ${PORT}`));
