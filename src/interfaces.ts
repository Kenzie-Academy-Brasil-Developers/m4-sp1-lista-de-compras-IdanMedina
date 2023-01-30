interface iPurchase {
  name: string;
  quantity: string;
}

interface iPurchaseListRequest {
  listName: string;
  data: iPurchase[];
}

interface iPurchaseList extends iPurchaseListRequest {
  id: number;
}

type purchaseListKeys = 'listName' | 'data';
type purchaseItemKeys = 'name' | 'quantity';

export { iPurchase, iPurchaseListRequest, iPurchaseList, purchaseListKeys, purchaseItemKeys };
