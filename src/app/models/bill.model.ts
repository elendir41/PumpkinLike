export interface Bill {
    id: string;
    name: string;
    description: string;
    creator: string; // UID
    amount: number;
    expenses: string[] // tableau d'id d'expense
    balance: { [key: string]: number}; // dictionnaire d'uid et de solde
}