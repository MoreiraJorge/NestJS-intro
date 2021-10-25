import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async findOne(emailParam: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email: emailParam });
    }

    async register(registerParams: RegisterUserDto) {
        registerParams.password = await bcrypt.hash(registerParams.password, 10);
        await this.userModel.create(registerParams);
        return true;
    }
}
