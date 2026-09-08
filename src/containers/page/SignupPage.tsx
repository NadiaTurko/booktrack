import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupWithEmail } from "../../services/auth";

const fieldClass =
  "w-full rounded-full border border-sand bg-white/90 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/15";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      setError("");
      await signupWithEmail({ name, email, password });
      navigate("/");
    } catch {
      setError("Registration failed. Try another email or stronger password.");
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
            Create an account
          </h2>
          <p className="mb-6 text-center text-sm text-ink-muted">
            Start your private reading library.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Full name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="At least 6 characters"
                className={fieldClass}
                required
                minLength={6}
              />
            </div>

            <div className="h-5">
              <div
                className={`text-center text-sm font-medium text-burgundy transition-all duration-300 ${
                  error
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                {error}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-burgundy py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-burgundy-dark active:scale-[0.99]"
            >
              Sign up
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-burgundy hover:underline"
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
