import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserPayload } from './jwt.strategy';

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    async login(@Body() authBody: LoginUserDto) {
        return await this.authService.login({ authBody });
    }

    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        return await this.authService.register({ registerBody });
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAuthenticatedUser(@Request() request: RequestWithUser) {
        const user = await this.userService.getUser({ userId: request.user.userId });
        console.log(user);
        return user;
    }
}