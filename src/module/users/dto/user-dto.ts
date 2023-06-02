import { StatusEnum } from "../enum/status-enum";

interface IUserDTO {
    username: string;
    email: string;
    password: string;
    status?: StatusEnum;
    blocked?: boolean;
    active?: boolean;
    birthDate?: string;
    attempt?: number;
    emailChecked?: boolean;
    urlImg?: string;
}

export {IUserDTO}