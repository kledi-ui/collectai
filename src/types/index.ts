interface ILineItem {
  description: string;
  price: number;
  id:number;
}

interface IOrder {
  id: string;
  lineItems: ILineItem[];
  email: string;
  fullName: string;
  company: string;
  createdAt: string;
  dueAt: string;
}

export type { ILineItem, IOrder };
