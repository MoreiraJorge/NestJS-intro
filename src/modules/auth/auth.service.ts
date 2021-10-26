import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor( private userService: UsersService,
        private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if(!user) {
            return null;
        }

        if(await bcrypt.compare(password, user.password)){
            return user
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.firstName, sub: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
