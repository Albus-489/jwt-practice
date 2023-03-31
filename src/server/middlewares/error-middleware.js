const ApiError = require("../exceptions/api-error");
module.exports = function (err, req, res, next) {
  console.log("ERROR : ", err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err, errors: err.errors });
  }

  return res.statur(500).json({ message: "Unexpected error" });
};
