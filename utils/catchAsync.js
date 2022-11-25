const catchAsync = (fn) => async (req, res, next) => {
  await Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

module.exports = catchAsync;
