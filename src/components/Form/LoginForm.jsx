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
        <Form className="space-y-2">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Field
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
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
            <label className="block mb-1 font-medium">Password</label>
            <Field
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
