import express from "express";
import accountsRepository from "../repositories/accounts-repository";
import Account from "../models/Account";

const accountsRouter = express.Router();

accountsRouter.post("/", (req, res) => {
  const account: Account = req.body;
  accountsRepository.addNew(account, (id) => {
    if (id) {
      res.status(201).location(`/api/accounts/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

accountsRouter.get("/:id", (req, res) => {
  const id = +req.params.id;
  accountsRepository.getById(id, (account) => {
    if (account) {
      res.json(account);
    } else {
      res.status(404).send();
    }
  });
});

export default accountsRouter;
