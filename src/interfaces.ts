interface iPurchase {
  name: string;
  quantity: string;
}

interface iPurchaseList {
  id: number;
  listName: string;
  data: iPurchase[];
}

type purchaseListKeyes = 'listName' | 'data';

export { iPurchase, iPurchaseList, purchaseListKeyes };
