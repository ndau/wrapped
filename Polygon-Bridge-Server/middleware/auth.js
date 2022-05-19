const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const { checkSession } = require('../utils/sessionLogger');
// Auth

exports.registered = asyncHandler(async (req, res, next) => {
  let token;
  // return next();


  if (req.headers.usertoken) {
    token = req.headers.usertoken;
  } else if (req.cookies.userToken) {
    token = req.cookies.userToken;
  }

  if (!token) {
    return next(new ErrorResponse('401: Unauthorized', 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const isValidated = await checkSession(req, token);

    if (!isValidated == true) {
      return next(new ErrorResponse('Invalid Session', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('401: Unauthorized', 401));
  }
});
