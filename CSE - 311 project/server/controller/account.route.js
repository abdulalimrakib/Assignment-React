const router = require("express").Router();
const tokenGenerator = require("rand-token");

const createAccount = require("../model/createAccount");
const createUser = require("../model/createUser");
const createRecruiter = require("../model/createRecruiter");
const createCandidate = require("../model/createCandidate");

const { getHashedPassword } = require("../config/auth");

const {
  MSG_DATA_INSUFFICIENT_ERROR,
  MSG_DUPLICATE_EMAIL_ERROR,
  MSG_INTERNAL_ERROR,
  MSG_SIGNUP_SUCCESS,
} = require("../config/statasMassage");

router.post("/new", async (req, res) => {
  const responseData = {
    status: "failed",
    message: MSG_DATA_INSUFFICIENT_ERROR,
  };

  try {
    const user = req.body;
    console.log(user);
    if (!user) throw new Error(MSG_DATA_INSUFFICIENT_ERROR);

    const { firstName, lastName, email, userType, mobile, address, password } =
      user;
    if (
      ![firstName, lastName, email, password, userType, mobile, address].every(
        (e) => e
      )
    ) {
      throw new Error(MSG_DATA_INSUFFICIENT_ERROR);
    }

    const token = tokenGenerator.generate(10);
    const hashedPassword = await getHashedPassword(password);
    if (!hashedPassword) throw new Error(MSG_INTERNAL_ERROR);

    // if user is a recruiter
    if (userType.toLowerCase() === "recruiter") {
      // cheaking all fields are exist or not for recruiter
      const { position, company } = user;
      if (![position, company].every((e) => e)) {
        throw Error(MSG_DATA_INSUFFICIENT_ERROR);
      }

      // creating a new account
      const uid = await createAccount({
        email,
        password: hashedPassword,
        token,
      });
      if (!uid) throw new Error(MSG_DUPLICATE_EMAIL_ERROR);

      // creating a new user
      const isUserEntrySuccess = await createUser({
        uid,
        name: `${firstName} ${lastName}`,
        mobile: parseInt(mobile, 10),
        role: 2,
        address,
      });
      if (!isUserEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // create a new Recruiter
      const isRecruiterEntrySuccess = await createRecruiter({
        uid,
        position,
        company,
        status: 0,
      });
      if (!isRecruiterEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // changing responseData to success
      responseData.status = "success";
      responseData.message = MSG_SIGNUP_SUCCESS;
    }
    // if user is a candidate
    else {
      // cheaking all fields are exist or not for candidate
      const { dob, highestEducation, experience } = user;
      if (![dob, highestEducation, experience].every((e) => e)) {
        throw Error(MSG_DATA_INSUFFICIENT_ERROR);
      }

      // creating a new account
      const uid = await createAccount({
        email,
        password: hashedPassword,
        token,
      });
      if (!uid) throw new Error(MSG_DUPLICATE_EMAIL_ERROR);

      // creating a new user
      const isUserEntrySuccess = await createUser({
        uid,
        name: `${firstName} ${lastName}`,
        mobile: parseInt(mobile, 10),
        role: 3,
        address,
      });
      if (!isUserEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // 
      const isCandidateEntrySuccess = await createCandidate({
        uid,
        dob,
        experience: parseInt(experience, 10),
        highestEducation,
      });
      if (!isCandidateEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // changing responseData to success
      responseData.status = "success";
      responseData.message = MSG_SIGNUP_SUCCESS;
    }
  } catch (error) {
    responseData.message = error;
  } finally {
    res.json(responseData);
  }
});

module.exports = router;
