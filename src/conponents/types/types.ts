export interface IOrder {
    _id:string;
  transactionId: string;
  title: string;
  instructions: string;
  footageUrls: string[];
  deliveryTimeInDays: number;
  revisionCount: number;
  effects: string;
  additionalFeatures: string[];
  totalPrice: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  buyerId: string;
  createdAt: Date;
  updatedAt: Date;
}
