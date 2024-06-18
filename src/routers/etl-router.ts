import express from "express";
import etlProcess from "../etl";

const etlRouter = express.Router();

etlRouter.post("/run", (req, res) => {
  etlProcess();
  res.status(200).send("ETL process started");
});

export default etlRouter;
