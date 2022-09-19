import Joi from "joi";

export default function loginFormCompomentsTemplate(
  email,
  setEmail,
  password,
  setPassword
) {
  const validateEmail = (email) => {
    const schema = Joi.object({
      email: Joi.string().required(),
    });
    const { error } = schema.validate({ email });

    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validatePassword = (password) => {
    const schema = Joi.object({
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ password });

    if (error) {
      return { error: error.details[0].message };
    }
  };

  return [
    {
      id: "login-email",
      name: "email",
      type: "text",
      value: email,
      setValue: setEmail,
    },
    {
      id: "login-password",
      name: "password",
      type: "password",
      value: password,
      setValue: setPassword,
    },
  ];
}
