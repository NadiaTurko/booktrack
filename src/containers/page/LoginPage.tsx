import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { FormikHelpers } from "formik";
import LoginForm from "../../components/Form/LoginForm";
import { validateLogin, type LoginFormValues } from "../../utils/validation";
import { loginWithEmail } from "../../services/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setLoginError("");
      await loginWithEmail({ email: values.email, password: values.password });
      navigate("/");
    } catch {
      setLoginError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoginError("");
      await loginWithEmail({ email: "demo@demo.com", password: "demo1234" });
      navigate("/");
    } catch {
      setLoginError(
        "Demo user not found. Please create demo@demo.com in Firebase Auth."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=50)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-cream/88" />

      <div className="relative w-full max-w-md animate-softRise">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-burgundy font-bold text-white">
            B
          </div>
          <p className="font-display text-2xl font-semibold text-ink">BookTrack</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Reading Library
          </p>
        </div>

        <div className="library-panel rounded-[28px] p-8">
          <h2 className="mb-1 text-center font-display text-2xl font-semibold text-ink">
            Welcome back
          </h2>
          <p className="mb-6 text-center text-sm text-ink-muted">
            Sign in to your private shelf.
          </p>

          <LoginForm
            onSubmit={handleSubmit}
            validate={validateLogin}
            loginError={loginError}
          />

          <button
            type="button"
            onClick={handleDemoLogin}
            className="mt-4 w-full rounded-full border border-sand bg-parchment/70 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-burgundy/30 hover:bg-white active:scale-[0.99]"
          >
            Sign in as demo user
          </button>

          <p className="mt-5 text-center text-sm text-ink-muted">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-burgundy hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
