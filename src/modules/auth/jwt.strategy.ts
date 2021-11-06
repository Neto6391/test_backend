import { User } from ".prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: any) {
        const data: { user: Partial<User> }  = await this.userService.readById(payload.id) as { user: Partial<User> };

        if (data) {
            return {...data.user};
        }
       
        throw new NotFoundException('Usuario nao existe');
    }
}