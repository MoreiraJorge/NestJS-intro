import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { Public } from './modules/auth/constants';
import { LocalAuthGuard } from './modules/auth/local.auth.guard';

@Controller()
export class AppController {

    constructor(private authService: AuthService) { }
    
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}