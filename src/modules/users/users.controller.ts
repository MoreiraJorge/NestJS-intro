import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/dto/registerUser.dto";
import { Public } from "../auth/auth.decorator";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(":mail")
  async getByEmail(@Param("mail") mail: string) {
    return await this.userService.findOne(mail);
  }

  @Public()
  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }
}
