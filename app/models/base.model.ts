import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";
import { Exclude, Expose, Transform } from "class-transformer";

export class Base {
  @Expose()
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value) => {
    if ("value" in value) {
      // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879
      // return value.value.toString(); // because "toString" is also a wrapper for "toHexString"
      return value.obj[value.key].toString();
    }

    return "unknown value";
  })
  public _id!: string;

  @Expose()
  public __v!: number;

  __t?: string;

  createdAt!: Date;
  updatedAt!: Date;
}
