interface IUserDTO {
    id: number;
    email: string;
    username: string;
    password: string;
    name: string;
    birthDate?: Date;
    createAt: Date;
    updatedAt: Date;
}

export {IUserDTO}