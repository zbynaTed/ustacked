import Joi from "joi";

import { getUserByUsername } from "../services/api/users";

export default function registerFormCompomentsTemplate(
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName
) {
  const validateEmail = async (email) => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: false }).required(),
    });

    const { error } = schema.validate({ email });

    if (error) {
      return { error: error.details[0].message };
    }

    if (email) {
      let { data } = await getUserByUsername(email);
      if (data && data.id) {
        return { error: "user already exists" };
      }
    }
  };

  const validatePassword = (password) => {
    const schema = Joi.object({
      password: Joi.string().min(8).max(20).required(),
    });
    const { error } = schema.validate({ password });

    if (error) {
      return { error: error.details[0].message };
    }
  };

  const validateName = (name) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });
    const { error } = schema.validate({ name });

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
      validation: validateEmail,
    },
    {
      id: "login-password",
      name: "password",
      type: "password",
      value: password,
      setValue: setPassword,
      validation: validatePassword,
    },
    {
      id: "login-name",
      name: "name",
      type: "text",
      value: name,
      setValue: setName,
      validation: validateName,
    },
  ];
}
