import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { validateLogin } from "../../utils/validation";
import { loginWithEmail } from "../../services/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError("");
      await loginWithEmail({ email: values.email, password: values.password });
      navigate("/");
    } catch (e) {
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
    } catch (e) {
      setLoginError(
        "Demo user not found. Please create demo@demo.com in Firebase Auth."
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      bg-gradient-to-b
      from-emerald-50
      via-emerald-100
      to-emerald-200
    "
    >
      {/* Card with gradient border */}
      <div
        className="
          w-full max-w-sm
          p-[1.5px]
          rounded-3xl
          bg-gradient-to-b
          from-emerald-200
          via-emerald-300
          to-emerald-400
        "
      >
        <div
          className="
            bg-white/90
            backdrop-blur-xl
            rounded-[22px]
            p-8
            shadow-xl
          "
        >
          <h2 className="text-2xl font-extrabold text-center mb-6 text-emerald-800">
            Welcome back
          </h2>

          <LoginForm
            onSubmit={handleSubmit}
            validate={validateLogin}
            loginError={loginError}
          />

          <button
            type="button"
            onClick={handleDemoLogin}
            className="
              mt-4 w-full
              rounded-xl
              p-[1px]
              bg-gradient-to-b
              from-emerald-200
              via-emerald-300
              to-emerald-400
              transition-transform duration-300
              hover:scale-[1.02]
              active:scale-95
            "
          >
            <span
              className="
                block w-full
                px-4 py-2
                rounded-[11px]
                text-sm font-semibold
                text-emerald-700
                bg-white/90
                backdrop-blur-sm
              "
            >
              Sign in as demo user
            </span>
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="
                font-semibold
                text-emerald-700
                hover:underline
              "
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
