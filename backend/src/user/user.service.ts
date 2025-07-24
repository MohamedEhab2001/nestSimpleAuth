import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserType>) {}


    async createUser(email:string,password:string,name:string){
        const user = await this.userModel.create({email,password,name})
        return user
    }

    async findByEmail(email: string , selectPassword = false) {
        const query = this.userModel.findOne({ email });
        if (!selectPassword) {
          query.select('-password');
        }
        return query.exec();
      }

}
