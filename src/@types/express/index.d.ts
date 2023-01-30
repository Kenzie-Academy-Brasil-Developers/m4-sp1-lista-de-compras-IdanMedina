import * as express from 'express'
import { iPurchaseList } from '../../interfaces'

declare global {
    namespace Express {
        interface Request {
            indexPurchaseList: number,
            purchaseList: iPurchaseList | undefined
        }
    }
}