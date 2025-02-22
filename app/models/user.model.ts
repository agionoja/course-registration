import { getModelForClass, prop } from "@typegoose/typegoose";
import { Base } from "~/models/base.model";

export enum Role {
  STUDENT = "STUDENT",
  LECTURER = "LECTURER",
}

export class User extends Base {
  @prop({ required: true, type: () => String })
  firstname!: string;

  @prop({ required: true, type: () => String })
  lastname!: string;

  @prop({ default: Role.STUDENT, enum: Role, type: () => String })
  role!: Role;

  @prop({ required: true, type: () => String })
  email!: string;

  @prop({ required: true, type: () => String })
  password!: string;

  @prop({ required: true, type: () => String })
  passwordConfirm!: string;
}

export const UserModel = getModelForClass(User);
