import express, { Application } from "express";
import {
  createPurchaseList,
  deletePurchaseItem,
  deletePurchaseList,
  readPurchaseList,
  readPurchaseLists,
} from "./logic";
import { checkIfPurchaseList } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createPurchaseList);
app.get("/purchaseList", readPurchaseLists);
app.get(`/purchaseList/:id`, checkIfPurchaseList, readPurchaseList);
app.delete(`/purchaseList/:id`, checkIfPurchaseList, deletePurchaseList);
app.delete(`/purchaseList/:id/:name`, checkIfPurchaseList, deletePurchaseItem);

app.listen(3000, () => {
  console.log("Server is running!");
});
