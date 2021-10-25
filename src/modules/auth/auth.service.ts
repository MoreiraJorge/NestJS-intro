import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor( private userService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if(!user) {
            return null;
        }
        if(bcrypt.compare(password, user.passwordHash)){
            return user
        }
        return null;
    }
}
