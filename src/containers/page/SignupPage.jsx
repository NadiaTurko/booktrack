import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupWithEmail } from "../../services/auth";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    try {
      setError("");
      await signupWithEmail({ name, email, password });
      navigate("/");
    } catch (e) {
      setError("Registration failed. Try another email or stronger password.");
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
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="rounded-xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
                <input
                  name="name"
                  placeholder="John Doe"
                  className="
                    w-full
                    px-3 py-2
                    rounded-[11px]
                    bg-white/90
                    backdrop-blur-sm
                    text-gray-800
                    outline-none
                    transition-all duration-300
                    focus:ring-2 focus:ring-emerald-400/60
                  "
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="rounded-xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full
                    px-3 py-2
                    rounded-[11px]
                    bg-white/90
                    backdrop-blur-sm
                    text-gray-800
                    outline-none
                    transition-all duration-300
                    focus:ring-2 focus:ring-emerald-400/60
                  "
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="rounded-xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
                <input
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  className="
                    w-full
                    px-3 py-2
                    rounded-[11px]
                    bg-white/90
                    backdrop-blur-sm
                    text-gray-800
                    outline-none
                    transition-all duration-300
                    focus:ring-2 focus:ring-emerald-400/60
                  "
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Error */}
            <div className="h-5">
              <div
                className={`
                  text-red-500 text-center text-sm font-medium
                  transition-all duration-300
                  ${
                    error
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }
                `}
              >
                {error}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full
                rounded-xl
                p-[1.5px]
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
                  py-2
                  rounded-[11px]
                  font-semibold
                  text-emerald-900
                  bg-gradient-to-b
                  from-emerald-100
                  via-emerald-200
                  to-emerald-300
                "
              >
                Sign up
              </span>
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
