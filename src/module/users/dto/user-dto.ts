import { User } from "@prisma/client";
import { StatusEnum } from "../enum/status-enum";

interface IUserDTO {
    username: string;
    email: string;
    password: string;
    // status?: StatusEnum;
    blocked?: boolean;
    active?: boolean;
    birthDate?: string;
    attempt?: number;
    emailChecked?: boolean;
    urlImg?: string;
  }
  
  class UserDTO implements IUserDTO {
    constructor(
      public username: string,
      public email: string,
      public password: string,
    //   public status?: StatusEnum,
      public blocked?: boolean,
      public active?: boolean,
      public birthDate?: string,
      public attempt?: number,
      public emailChecked?: boolean,
      public urlImg?: string
    ) {}
  
    static fromUser(user: User): UserDTO {
      return new UserDTO(
        user.username,
        user.email,
        user.password,
        user.blocked != null ? user.blocked : false,
        user.active != null ? user.active : false,
        user.birthDate != null ? user.birthDate : "",
        user.attempt != null ? user.attempt : 0,
        user.emailChecked != null ?  user.emailChecked : false,
        user.urlImg != null ? user.urlImg : ""
      );
    }
  }
  
  export { UserDTO };
  