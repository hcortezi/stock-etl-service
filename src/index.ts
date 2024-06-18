import express from "express";
import cors from "cors";
import stocksRouter from "./routers/stocks-router";
import ordersRouter from "./routers/orders-router";
import accountsRouter from "./routers/accounts-router";
import etlRouter from "./routers/etl-router";

const PORT = 4000;
const HOSTNAME = "http://localhost";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/stocks", stocksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/etl", etlRouter);

app.get("/", (req, res) => {
  res.send("Bem vindo ao Stock ETL API!");
});

app.use((req, res) => {
  res.status(404).send("Não encontrado");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando: ${HOSTNAME}:${PORT}`);
});

export { app, server };
