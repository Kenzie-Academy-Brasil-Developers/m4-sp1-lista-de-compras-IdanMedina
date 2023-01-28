import { Request, Response } from "express";
import { ids, lists } from "./database";
import { iPurchaseList, purchaseListKeyes } from "./interfaces";

let idCounter = 0;

const checkDataList = (payload: any): iPurchaseList => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys: Array<purchaseListKeyes> = ["listName", "data"];

  const checkRequirements: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!checkRequirements) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  return payload;
};

const createPurchaseList = (req: Request, res: Response): Response => {
  try {
    const purchaseListData: iPurchaseList = checkDataList(req.body);
    const id: number = idCounter + 1;
    idCounter += 1;

    const newPurchaseListData: iPurchaseList = {
      id: id,
      listName: req.body.listName,
      data: req.body.data,
    };

    ids.push(id);
    lists.push(newPurchaseListData);
    return res.status(201).json(newPurchaseListData);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const readPurchaseLists = (req: Request, res: Response): Response => {
  return res.json(lists);
};

const readPurchaseList = (req: Request, res: Response): Response => {
  const index: number = req.purchaseList.indexPurchaseList;
  return res.json(lists[index]);
};

const deletePurchaseList = (req: Request, res: Response): Response => {
  const index: number = req.purchaseList.indexPurchaseList;
  lists.splice(index, 1);
  return res.status(204).send();
};

const deletePurchaseItem = (req: Request, res: Response): Response => {
  const index: number = req.purchaseList.indexPurchaseList;
  const name: string = req.params.name;

  const itemIndex: number = lists[index].data.findIndex((e) => e.name === name);
  if (itemIndex === -1) {
    return res.status(404).json({
      message: `Item named as ${name} not found`,
    });
  }
  lists[index].data.splice(itemIndex, 1);
  return res.status(204).send();
};

export {
  createPurchaseList,
  readPurchaseLists,
  readPurchaseList,
  deletePurchaseList,
  deletePurchaseItem,
};
