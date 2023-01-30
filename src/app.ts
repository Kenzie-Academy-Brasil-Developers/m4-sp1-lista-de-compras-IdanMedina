import express, { Application } from "express";
import {
  createPurchaseList,
  deletePurchaseItem,
  deletePurchaseList,
  readPurchaseList,
  readPurchaseLists,
  updatePurchaseItem,
} from "./logic";
import { checkIfPurchaseList, checkPatchBodyRequest, checkPostBodyRequest } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", checkPostBodyRequest, createPurchaseList);
app.get("/purchaseList", readPurchaseLists);
app.get(`/purchaseList/:id`, checkIfPurchaseList, readPurchaseList);
app.patch(`/purchaseList/:id/:name`, checkIfPurchaseList, checkPatchBodyRequest, updatePurchaseItem)
app.delete(`/purchaseList/:id`, checkIfPurchaseList, deletePurchaseList);
app.delete(`/purchaseList/:id/:name`, checkIfPurchaseList, deletePurchaseItem);

app.listen(3000, () => {
  console.log("Server is running!");
});
