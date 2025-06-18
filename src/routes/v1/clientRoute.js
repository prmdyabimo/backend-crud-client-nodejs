import express from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from "../../controllers/clientController.js";

const clientRoute = express.Router();

clientRoute.get("/", getClients);
clientRoute.get("/:id", getClientById);
clientRoute.post("/", createClient);
clientRoute.put("/:id", updateClient);
clientRoute.delete("/:id", deleteClient);

export default clientRoute;
