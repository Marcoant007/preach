export interface IRequestAuth {
    email: string,
    password: string;
}

export interface IResponseAuth {
    user : {
        name: string;
        email: string;
    };
    
    token: string;
}