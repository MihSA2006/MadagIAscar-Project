import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type UserPayload = {
    userId: string;
    role: string;
};

// const jwtSecret = process.env.JWT_SECRET;
// if (!jwtSecret) {
//     throw new Error('JWT_SECRET is not defined');
// }
// console.log("jwt.strategy.ts : ", jwtSecret);


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: UserPayload) {
        return payload;
    }
}