import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types, HydratedDocument } from 'mongoose';
import { UserStatus } from "./user-enums";

/*----------*/
export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true, collection: 'all_users_datas' })
export class Users {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true, unique: true })
    mobile: string;

    @Prop({ default: 'NA' })
    address: string;

    @Prop({ type: String, enum: UserStatus, default: 'ACTIVE' })
    status: UserStatus;

    // @Prop({ default: now() })
    // createdAt: Date;

    // @Prop({ default: now() })
    // updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);