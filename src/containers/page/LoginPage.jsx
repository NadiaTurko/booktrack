import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { validateLogin } from "../../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (values, { setSubmitting }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      setLoginError("");
      navigate("/");
    } else {
      setLoginError("Invalid email or password");
    }

    setSubmitting(false);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      email: "demo@demo.com",
      password: "demo1234",
      name: "Demo User",
    };

    localStorage.setItem("user", JSON.stringify(demoUser));
    setLoginError("");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-emerald-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-700">
          Login
        </h2>

        <LoginForm
          onSubmit={handleSubmit}
          validate={validateLogin}
          loginError={loginError}
        />

        <button
          type="button"
          onClick={handleDemoLogin}
          className="mt-4 w-full bg-emerald-100 text-emerald-700 font-semibold py-2 rounded-lg border border-emerald-300 hover:bg-emerald-200 transition-colors duration-300 text-sm"
        >
          Увійти як демо користувач
        </button>
        <p className="mt-2 text-xs text-center text-gray-500">
          Демо акаунт: demo@demo.com / demo1234
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
