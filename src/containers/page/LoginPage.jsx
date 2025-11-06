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
      </div>
    </div>
  );
};

export default LoginPage;
