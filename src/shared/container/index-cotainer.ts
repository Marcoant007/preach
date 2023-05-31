import { container } from 'tsyringe';
import { IUserRepository } from '../../module/users/repository/interface/user-repository-interface';
import { UserRepository } from '../../module/users/repository/user-repository';


container.registerSingleton<IUserRepository>("UserRepository", UserRepository);