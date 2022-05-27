import { IUser } from "./IUser";

export interface IReimbursement{
    reimbursementId?: number,
    amount: number,
    dateSubmitted?: Date,
    dateResolved?: Date,
    description: string,
    reimbursementAuthor?: number,
    reimbursementResolver?: number,
    reimbursementType: number,
    reimbursementStatus?: number
}