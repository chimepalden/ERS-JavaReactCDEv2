import {IReimbursement} from "./IReimbursement";

export interface IUser {
    userId: number,
    userName: string,
    password?: string,
    firstName: string,
    lastName: string,
    email: string,
    userRole: number,
    Reimbursements?: IReimbursement[]
}