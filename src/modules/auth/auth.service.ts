import { User } from '.prisma/client';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(login: string, pass: string) {
        const user = await this.userService.readByLogin(login);
        console.log("teste ", user);
        if (!user) {
            throw new Error("Usuario nao existe");
        }
        
        const match = await this.comparePassword(pass, user.senha);
        if (!match) {
            return null;
        }
   
        const { senha, ...data } = user;
        return data;
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { access_token: token };
    }

    public async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }
    

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
