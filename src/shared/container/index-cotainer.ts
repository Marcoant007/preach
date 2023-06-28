import { container } from 'tsyringe';
import { IUserRepository } from '../../module/user/repository/user-repository-interface';
import { UserRepository } from '../../module/user/repository/user-repository';


container.registerSingleton<IUserRepository>("UserRepository", UserRepository);