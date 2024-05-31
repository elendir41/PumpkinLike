import { Timestamp } from "firebase/firestore";

export interface Expense {
    id: string;
    billId: string;
    amount: number;
    date: Timestamp;
    creditor: string;
    debtors: string[]
}