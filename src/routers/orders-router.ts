import express from "express";
import ordersRepository from "../repositories/orders-repository";
import Order from "../models/Order";

const ordersRouter = express.Router();

ordersRouter.post("/", (req, res) => {
  const order: Order = req.body;
  order.status = 'open'; // Define o status padrão ao criar uma ordem
  ordersRepository.addNew(order, (id) => {
    if (id) {
      res.status(201).location(`/api/orders/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

ordersRouter.patch("/:id/cancel", (req, res) => {
  const id = +req.params.id;
  ordersRepository.updateStatus(id, 'cancelled', (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default ordersRouter;
