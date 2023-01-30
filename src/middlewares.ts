import { NextFunction, Request, Response } from "express";
import { lists } from "./database";
import {
  iPurchase,
  iPurchaseList,
  purchaseItemKeys,
  purchaseListKeys,
} from "./interfaces";

const checkIfPurchaseList = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id: number = Number(req.params.id);
  const indexPurchaseList = lists.findIndex((e) => e.id === id);
  const purchaseList: iPurchaseList | undefined = lists.find(
    (e) => e.id === id
  );

  if (indexPurchaseList === -1) {
    return res.status(404).json({
      message: `Purchase List with id=${id} not found!`,
    });
  }

  req.indexPurchaseList = indexPurchaseList;
  req.purchaseList = purchaseList;

  return next();
};

const checkPostBodyRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const requiredKeys: Array<purchaseListKeys> = ["listName", "data"];
  const requiredDataKeys: Array<purchaseItemKeys> = ["name", "quantity"];

  const checkBodyKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!checkBodyKeys) {
    return res.status(400).json({
      message: `Required keys are: ${requiredKeys}`,
    });
  }

  if (typeof req.body.listName !== "string") {
    return res.status(400).json({
      message: `The list name need to be a string`,
    });
  }

  /*   req.body.data.forEach((item: iPurchase) => {
    const dataKeys: Array<string> = Object.keys(item);
    console.log(dataKeys);
    console.log(dataKeys === requiredDataKeys)
    const checkKeys = requiredDataKeys.every((key: string) => {
      dataKeys.includes(key);
    });
    console.log(checkKeys);
    if (!checkKeys) {
      return res.status(400).json({
        message: `Required keys are: ${requiredDataKeys}`,
      });
    }
  }); */

  req.body.data.forEach((item: iPurchase) => {
    if (typeof item.name !== "string") {
      return res.status(400).json({
        message: `The product name need to be a string`,
      });
    }

    if (typeof item.quantity !== "string") {
      return res.status(400).json({
        message: `The product quantity need to be a string`,
      });
    }
  });

  return next();
};

const checkPatchBodyRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const requiredDataKeys: Array<purchaseItemKeys> = ["name", "quantity"];

  const checkBodyKeys: boolean = requiredDataKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!checkBodyKeys) {
    return res.status(400).json({
      message: `Required keys are: ${requiredDataKeys}`,
    });
  }

  if (typeof req.body.name !== "string") {
    return res.status(400).json({
      message: `The product name need to be a string`,
    });
  }

  if (typeof req.body.quantity !== "string") {
    return res.status(400).json({
      message: `The product quantity need to be a string`,
    });
  }

  return next();
};

export { checkIfPurchaseList, checkPostBodyRequest, checkPatchBodyRequest };
