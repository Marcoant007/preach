export interface IRequestAuth {
    email: string,
    password: string;
}

export interface IResponseAuth {
    user : {
        name: string;
        email: string;
        id: number
    };
    
    token: string;
}