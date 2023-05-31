interface IUserDTO {
    id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    birthDate?: string;
    createAt: Date;
    updatedAt: Date;
}

export {IUserDTO}