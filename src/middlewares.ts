import { NextFunction, Request, Response } from "express";
import { lists } from "./database";

const checkIfPurchaseList = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id: number = Number(req.params.id);
  const indexPurchaseList = lists.findIndex((e) => e.id === id);

  if (indexPurchaseList === -1) {
    return res.status(404).json({
      message: `Purchase List with id=${id} not found!`,
    });
  }

  req.purchaseList = {
    indexPurchaseList: indexPurchaseList,
  };

  return next();
};


export { checkIfPurchaseList };
