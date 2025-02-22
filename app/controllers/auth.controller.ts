import authService from "~/services/auth.service";
import invariant from "tiny-invariant";
import { NotFoundException } from "~/utils/exception";

export async function register(request: Request) {
  const regData = Object.fromEntries(await request.formData());

  invariant(
    typeof regData.firstname === "string" &&
      regData.lastname == "string" &&
      regData.phone == "string" &&
      regData.email === "string" &&
      regData.password == "string" &&
      regData.passwordConfirm === "string",
    "Invalid registration data",
  );

  await authService.register({
    firstname: regData.firstname,
    lastname: regData.lastname,
    email: regData.email,
    password: regData.password,
    passwordConfirm: regData.passwordConfirm,
  });
}

export async function login(request: Request) {
  const loginData = Object.fromEntries(await request.formData());

  invariant(
    typeof loginData.email === "string" &&
      typeof loginData.password === "string",
    "Invalid login data",
  );
  await authService.login({
    email: loginData.email.toString(),
    password: loginData.password.toString(),
  });
}

export function logout(request: Request) {}

export async function forgotPassword(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  invariant(typeof email === "string", "Expected email to be string");

  const user = await authService.forgotPassword({ email });

  if (!user) {
    throw new NotFoundException("Invalid email");
  }
}

export function resetPassword(request: Request) {}

export default { register, login, logout, resetPassword, forgotPassword };
