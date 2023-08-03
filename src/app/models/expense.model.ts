export interface Expense {
    id: string;
    billId: string;
    amount: number;
    creditor: string;
    debtors: string[]
}