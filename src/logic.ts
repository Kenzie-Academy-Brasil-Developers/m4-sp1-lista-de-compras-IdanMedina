import { Request, Response } from "express";
import { ids, lists } from "./database";
import {
  iPurchaseList
} from "./interfaces";

let idCounter = 0;

const createPurchaseList = (req: Request, res: Response): Response => {
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
};

const readPurchaseLists = (req: Request, res: Response): Response => {
  return res.json(lists);
};

const readPurchaseList = (req: Request, res: Response): Response => {
  const index: number = req.indexPurchaseList;
  return res.json(lists[index]);
};

const deletePurchaseList = (req: Request, res: Response): Response => {
  const index: number = req.indexPurchaseList;
  lists.splice(index, 1);
  return res.status(204).send();
};

const deletePurchaseItem = (req: Request, res: Response): Response => {
  const index: number = req.indexPurchaseList;
  const itemIndex: number = lists[index].data.findIndex(
    (e) => e.name === req.params.name
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      message: `Item named as ${req.params.name} not found`,
    });
  }
  lists[index].data.splice(itemIndex, 1);
  return res.status(204).send();
};

const updatePurchaseItem = (req: Request, res: Response): Response => {
  const index: number = req.indexPurchaseList;
  const itemIndex: number = lists[index].data.findIndex(
    (e) => e.name === req.params.name
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      message: `Item named as ${req.params.name} not found`,
    });
  }

  lists[index].data[itemIndex] = {
    ...lists[index].data[itemIndex],
    ...req.body,
  };
  return res.json(lists[index].data[itemIndex]);
};

export {
  createPurchaseList,
  readPurchaseLists,
  readPurchaseList,
  updatePurchaseItem,
  deletePurchaseList,
  deletePurchaseItem,
};
