import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login({ authBody }: { authBody: LoginUserDto }) {
        try {
            const { email, password } = authBody;

            const user = await this.userService.findByEmail(email);

            if (!user) throw new Error("User not found");

            const isValid = await compare(password, user.password);

            if (!isValid) throw new Error("Wrong password");

            return this.authenticateUser(user);

        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    async register({ registerBody }: { registerBody: CreateUserDto }) {
        try {
            const { email, password } = registerBody;

            const existingUser = await this.userService.findByEmail(email);

            if (existingUser) throw new Error("Email already used");

            const hashedPassword = await hash(password, 10);

            const user = await this.userService.create({
                email,
                password: hashedPassword,
            });

            return this.authenticateUser(user);

        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    private async authenticateUser(user: any) {
        const payload = { userId: user.id, role: user.role };
        const token = await this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
    }
}