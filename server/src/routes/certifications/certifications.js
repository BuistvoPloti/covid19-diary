const router = require("express").Router();
const certifications = require("../../handlers/certifications.handler");

router
  .route("/")
  .post(certifications.createCertificate);

router
  .route("/")
  .get(certifications.getUserCertificate);

router
  .route("/download")
  .get(certifications.downloadUserCertificatePdf);

module.exports = router;
