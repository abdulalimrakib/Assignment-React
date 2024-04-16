const router = require("express").Router();
const { verifyToken } = require("../config/authentication");
const {
  recruiterGetApplicants,
  applicantGetApplicants,
  applicantDeleteApllication,
  postApllication,
} = require("../controller/application.controller");

router.get("/recruiter/:jid", verifyToken, recruiterGetApplicants);
router.get("/employer/getall", verifyToken, applicantGetApplicants);
router.delete("/delete/:aid", verifyToken, applicantDeleteApllication);
router.post("/job/:jid", verifyToken, postApllication);

module.exports = router;
