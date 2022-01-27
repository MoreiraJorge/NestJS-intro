import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { Public } from "./modules/auth/auth.decorator";
import { AuthService } from "./modules/auth/auth.service";
import { LocalAuthGuard } from "./modules/auth/guards/local.auth.guard";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
