import { type User, UserModel } from "~/models/user.model";
import { scrypt } from "~/utils/scrypt";

export async function register(
  user: Pick<
    User,
    "firstname" | "lastname" | "email" | "password" | "passwordConfirm"
  >
) {
  await UserModel.create(user);
}

export async function login({
  email,
  password,
}: Pick<User, "email" | "password">) {
  await UserModel.findOne({ email, password: scrypt.hash(password) });
}

export async function forgotPassword({ email }: Pick<User, "email">) {
  return UserModel.findOne({ email }).lean().exec();
}

export function resetPassword(token: string) {}

export default { register, login, resetPassword, forgotPassword };
