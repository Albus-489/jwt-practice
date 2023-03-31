const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError("Header required."));
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      next(ApiError.UnauthorizedError("No token found."));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (userData) {
      next(ApiError.UnauthorizedError("Invalid token."));
    }

    req.user = userData;
    next();
  } catch (error) {
    next(ApiError.UnauthorizedError("Unexpected error."));
  }
};
