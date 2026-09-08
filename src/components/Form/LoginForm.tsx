import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import type { LoginFormErrors, LoginFormValues } from "../../utils/validation";

const fieldClass =
  "w-full rounded-full border border-sand bg-white/90 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/15";

interface LoginFormProps {
  onSubmit: (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => void | Promise<void>;
  validate: (values: LoginFormValues) => LoginFormErrors;
  loginError?: string;
}

const LoginForm = ({ onSubmit, validate, loginError }: LoginFormProps) => {
  const initialValues: LoginFormValues = {
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
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
            <div className="h-5 overflow-hidden">
              <div
                className={`mt-1 text-sm text-burgundy transition-all duration-300 ${
                  errors.email && touched.email
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                <ErrorMessage name="email" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="••••••••"
              className={fieldClass}
            />
            <div className="h-5 overflow-hidden">
              <div
                className={`mt-1 text-sm text-burgundy transition-all duration-300 ${
                  errors.password && touched.password
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>

          <div className="h-5">
            <div
              className={`text-center text-sm font-medium text-burgundy transition-all duration-300 ${
                loginError
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              {loginError}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-burgundy py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-burgundy-dark active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
