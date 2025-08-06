import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({ mensagem: "Olá, Mundo" });
});

export default app;
