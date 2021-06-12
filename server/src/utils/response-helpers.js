const handleResponse = ( res, code, body) => {
  res.status(code).json(body);
};

const handleSuccessResponse = (data, res, code) => {
  let responseBody = {
    status: "success",
  };
  responseBody = data && { ...responseBody, data };
  const statusCode = code || 200;
  handleResponse(res, statusCode, responseBody);
};

const handleErrorResponse = (res, error, code) => {
  const status = code || 404;
  const detail = error.message || "Internal server error";
  const responseBody = {
    errors: [{
      status,
      detail,
    }],
  };
  handleResponse(res, status, responseBody); //make return
};

const throwCustomException = (message) => {
  throw new Error(message || "Internal server error");
};

module.exports = {
  handleSuccessResponse,
  handleErrorResponse,
  throwCustomException
};

