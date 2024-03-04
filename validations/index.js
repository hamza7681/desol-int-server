const Joi = require("joi");

exports.userValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please enter your password.",
  }),
});

exports.carValidation = Joi.object({
  carModel: Joi.string().min(3).required().messages({
    "string.empty": "Please enter the car model.",
    "string.min":
      "Car model is too short. Minimum allowed length is {limit} characters.",
  }),
  price: Joi.number().required().messages({
    "string.empty": "Please enter the car price.",
  }),
  phone: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid 11-digit phone number.",
      "string.empty": "Please enter the phone number.",
    }),
  picNumber: Joi.number().required().messages({
    "string.empty": "Please select pic number.",
  }),
  userId: Joi.string().required().messages({
    "string.empty": "Please provide the user ID.",
  }),
  images: Joi.array().items(Joi.string().required()).min(1).messages({
    "array.min": "Please upload at least one image.",
  }),
});
