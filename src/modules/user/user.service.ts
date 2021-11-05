import { User } from '.prisma/client';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    ) {}

    async create(user: CreateUserDto): Promise<any> {
        const passwordHashed = await this.hashPassword(user.senha);
        
        const createdUser: User = await this.prismaService.user.create({ data: Object.assign({}, {...user}, {senha: passwordHashed}) });
        const token = await this.authService.generateToken(createdUser);
        return { user: createdUser, token };
    }

    async authenticate(user) {
        return await this.authService.login(user);
    }

    async readByLogin(login: string): Promise<User> {
        const user = await await this.prismaService.user.findFirst({where: { login, isDeleted: false }}); 
        return user;
    }

    async readById(userId: number): Promise<{ user: Partial<User> }> {
        const userFound: User = await this.prismaService.user.findFirst({ where: { id: userId,  } });
        if (userFound) {
            const { senha, ...user } = userFound;
            return { user };
        }
        return null;
    }

    async readAll(): Promise<{ users:Partial<User>[] }> {
        let users: Partial<User>[] = await this.prismaService.user.findMany({where: { isDeleted: false }});
        users = users.map(user => {
            const { senha, ...userFormated } = user;
            return {...userFormated};
        });
        return { users };
    }

    async update(user: CreateUserDto, userId: number): Promise<{ user: Partial<User> }> {
        const passwordHashed = await this.hashPassword(user.senha);
        const { senha, ...userPartial } = await this.prismaService.user.update({
            where: { id: userId },
            data: Object.assign({}, {...user}, { senha: passwordHashed })
        });
        
        return { user: userPartial };
    }

    async softDelete(userId: number): Promise<User> {
        const foundUser: User = await this.prismaService.user.findUnique({where: { id: userId }});
        if (foundUser && foundUser.isDeleted) {
            return await this.prismaService.user.delete({ where: { id: userId }});
        }
        return await this.prismaService.user.update({where: { id: userId }, data: { isDeleted: true }});
    }

    private async hashPassword(password): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}
