import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = ({ onSubmit, validate, loginError }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="rounded-xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
              <Field
                type="email"
                name="email"
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
              />
            </div>

            <div className="h-5 overflow-hidden">
              <div
                className={`text-red-500 text-sm mt-1 transition-all duration-300 ${
                  errors.email && touched.email
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                <ErrorMessage name="email" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="rounded-xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
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
              />
            </div>

            <div className="h-5 overflow-hidden">
              <div
                className={`text-red-500 text-sm mt-1 transition-all duration-300 ${
                  errors.password && touched.password
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>

          {/* Login error */}
          <div className="h-5">
            <div
              className={`text-red-500 text-center text-sm font-medium transition-all duration-300 ${
                loginError
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {loginError}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
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
              disabled:opacity-60
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
              {isSubmitting ? "Logging in..." : "Login"}
            </span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
