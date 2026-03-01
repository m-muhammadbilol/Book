import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { customToast } from "../lib/toast";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const username = formData.get("username");
    const password = formData.get("password");

    if (!username) {
      customToast.error("Username to‘ldirilmagan!");
      evt.target.username.focus();
      return;
    }

    if (!password) {
      customToast.error("Password to‘ldirilmagan!");
      evt.target.password.focus();
      return;
    }

    fetch("https://json-api.uz/api/project/chizmachilik/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.access_token);
        navigate("/");
      })
      .catch(() => {
        customToast.error("Login yoki parol Xato! Ro'yxatdan qayta oting");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-white to-amber-200 p-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-700">
          Tizimga Kirish
        </h1>

        <p className="text-center text-gray-500 text-sm">
          Username va parolni kiriting
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input
              name="username"
              type="text"
              placeholder="Username kiriting"
              className="h-11"
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              name="password"
              type="password"
              placeholder="Password kiriting"
              className="h-11"
            />
          </Field>

          <Button
            type="submit"
            className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition">
            Yuborish
          </Button>
        </form>

        <div className="flex flex-col gap-3 pt-4">
          <Link to="/">
            <Button variant="outline" className="w-full h-10">
              Bosh Sahifaga
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="w-full h-10 bg-black text-white hover:bg-gray-800">
              Ro‘yxatdan o‘tish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
