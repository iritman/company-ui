// import React from "react";
import { errorLanguage } from "./language";
import Joi from "joi-browser";
import { message } from "antd";
import Words from "../resources/words";

export const validateProperty = (name, schema, value) => {
  const obj = { [name]: value };
  const fieldSchema = { [name]: schema[name] };
  const options = { language: errorLanguage };

  const { error } = Joi.validate(obj, fieldSchema, options);

  return error ? error.details[0].message : null;
};

export const validateForm = (formConfig) => {
  const { record, schema } = formConfig;
  const options = { abortEarly: false, language: errorLanguage };

  // just validate properties of record, which included in schema
  const validateObject = {};
  for (const key in schema) {
    validateObject[key] = record[key];
  }

  const { error } = Joi.validate(validateObject, schema, options);

  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;

  return errors;
};

export const hasFormError = (errors) => Object.keys(errors).length > 0;

export const handleError = (ex) => {
  if (ex.response && ex.response.status === 400) {
    if (ex.response.data.Error) {
      message.error(ex.response.data.Error);
    } else {
      message.error(Words.messages.operation_failed);
    }
  } else {
    message.error(Words.messages.operation_failed);
  }
};

export const handleTextChange = (
  errors,
  data,
  schema,
  record,
  setRecord,
  setErrors
) => {
  const { currentTarget: input } = data;
  const name = input.id.replace("dataForm_", "");
  const { value } = input;

  const errs = { ...errors };
  const errorMessage = validateProperty(name, schema, value);
  if (errorMessage) errs[name] = errorMessage;
  else delete errs[name];

  const rec = { ...record };
  rec[name] = input.value;
  setRecord(rec);
  setErrors(errs);
};
