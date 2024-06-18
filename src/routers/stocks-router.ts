import express from "express";
import stocksRepository from "../repositories/stocks-repository";

const stocksRouter = express.Router();

stocksRouter.get("/", (req, res) => {
  stocksRepository.getAll((stocks) => res.json(stocks));
});

export default stocksRouter;
