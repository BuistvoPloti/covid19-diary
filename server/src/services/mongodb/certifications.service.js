const fs = require("fs");
const path = require("path");
const { createPDF, getImage } = require('node-pdf-report');
const Certificate = require("../../models/mongodb/certificate");
const usersService = require("../../services/mongodb/users.service");

const RELATIVE_CERTIFICATE_TEMPLATE_PATH = "./src/templates/certificate_template.ejs";
const RELATIVE_CERTIFICATE_OUT_PATH = "./src/templates/generated_assets";

const createCertificate = async (userLogin) => {
  const user = await usersService.getUserByLogin(userLogin);
  const userHasCertificate = await Certificate.exists({ user_id: user._id });
  if (userHasCertificate) {
    return;
  }
  const userDataForCertificate = {
    id: user._id,
    name: user.login,
    // infected_at: user.infected_at,
    // cured_at: user.cured_at,
    infected_at: "02.02.2021",
    cured_at: "09.02.2021",
  };
  const certificatePdfPath = `${RELATIVE_CERTIFICATE_OUT_PATH}/certificate.pdf`;
  const certificateBuffer = await createPDF({
    relativePath: RELATIVE_CERTIFICATE_TEMPLATE_PATH,
    data: userDataForCertificate,
    outPath: certificatePdfPath
  });
  const certificateImageBase64 = await getImage({
    relativePath: RELATIVE_CERTIFICATE_TEMPLATE_PATH,
    data: userDataForCertificate,
    type: "png",
    encoding: "base64"
  });
  const certificateBody = {
    user_id: user._id,
    pdf: certificateBuffer,
    png: certificateImageBase64,
  };
  const certificate = new Certificate(certificateBody);
  try {
    return certificate.save();
  } finally {
    fs.unlinkSync(certificatePdfPath);
  }
};

const getUserCertificate = async (userLogin, format) => {
  const user = await usersService.getUserByLogin(userLogin);
  const certificate = await Certificate.findOne({ user_id: user._id });
  const certificateBuffer = certificate[format];
  return certificateBuffer || null;
};

module.exports = {
  createCertificate,
  getUserCertificate,
};
