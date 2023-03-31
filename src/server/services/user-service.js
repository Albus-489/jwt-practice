const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const mailService = require("./mail-service");
const UserDTO = require("../DTOs/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      console.log(candidate);
      throw ApiError.BadRequestError(
        `User with email ${candidate.email} already registered`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequestError("Activation error!");
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
