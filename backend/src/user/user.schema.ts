import { Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserType = User & Document

@Schema({timestamps:true})
export class User{
    @Prop({required:true , unique:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop({required:true})
    name:string
}

export const UserSchema = SchemaFactory.createForClass(User)
