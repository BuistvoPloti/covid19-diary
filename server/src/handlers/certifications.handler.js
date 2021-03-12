const certificationsService = require("../services/mongodb/certifications.service");
const { throwCustomException } = require("../utils/response-helpers");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../utils/response-helpers");

const createCertificate = async (req, res, next) => {
  try {
    const { login } = req.session;
    const certificate = await certificationsService.createCertificate(login);
    return handleSuccessResponse({ certificate }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getUserCertificate = async (req, res, next) => {
  try {
    const { login } = req.session;
    const certificate = await certificationsService.getUserCertificate(login, "png");
    return handleSuccessResponse({ certificate }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const downloadUserCertificatePdf = async (req, res, next) => {
  try {
    const { login } = req.session;
    const certificate = await certificationsService.getUserCertificate(login, "pdf");
    return res.end(certificate, "binary");
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

module.exports = {
  createCertificate,
  getUserCertificate,
  downloadUserCertificatePdf,
};
