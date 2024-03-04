const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { userValidation, carValidation } = require("../validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;
const Car = require("../models/car.model");

const carCtrl = {
  login: async (req, res) => {
    try {
      const { error, value } = userValidation.validate(req.body);
      const { email, password } = value;
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: error.details[0].message });
      } else {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "No user found against this email" });
        } else {
          const isMatch = await bcrypt.compare(password, findUser.password);
          if (isMatch) {
            const token = jwt.sign(findUser.id, secret);
            return res.status(StatusCodes.OK).json({
              msg: "Login Successfully",
              token: token,
              user: findUser,
            });
          } else {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ msg: "Invalid Credentials" });
          }
        }
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const data = req.body;
      const { value, error } = carValidation.validate(data);
      const { carModel, price, phone, picNumber, images, userId } = value;
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: error.details[0].message });
      } else {
        const newCar = new Car({
          carModel,
          price,
          phone,
          picNumber,
          images,
          userId,
        });
        await newCar.save();
        return res.status(StatusCodes.CREATED).json(newCar);
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

module.exports = carCtrl;
