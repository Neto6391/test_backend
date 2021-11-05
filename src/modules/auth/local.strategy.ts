import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({usernameField: "login", passwordField: 'senha'});
    }

    async validate(login: string, senha: string): Promise<any> {
        try {
            const user = await this.authService.validateUser(login, senha);
            if (!user) {
                throw new UnauthorizedException('Credenciais invalidas');
            }
            return user;
        } catch(err: any) {
            throw new NotFoundException('Usuario nao existe');
        }
    }
}