import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../model/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @Post('register')
    create(@Body() user: Partial<User>) {
      return this.authService.register(user);
    }
    @Get('profile')
    getProfile(@Request() req: any): User {
      return req.user;
    }
}
