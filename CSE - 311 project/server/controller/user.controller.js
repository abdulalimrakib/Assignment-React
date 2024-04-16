const tokenGenerator = require("rand-token");
const database = require("../config/DBConfig");

const createAccount = require("../model/createAccount");
const createUser = require("../model/createUser");
const createRecruiter = require("../model/createRecruiter");
const createCandidate = require("../model/createCandidate");

const { getHashedPassword, isPasswordValid } = require("../config/auth");

const {
  MSG_DATA_INSUFFICIENT_ERROR,
  MSG_DUPLICATE_EMAIL_ERROR,
  MSG_INTERNAL_ERROR,
  MSG_SIGNUP_SUCCESS,
  MSG_INVALID_CREDS,
  MSG_LOGIN_SUCCESS,
} = require("../config/statasMassage");

const register = async (req, res) => {
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
        role: userType,
        address,
      });
      if (!isUserEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // create a new Recruiter
      const isRecruiterEntrySuccess = await createRecruiter({
        uid,
        position,
        company,
      });
      if (!isRecruiterEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // changing responseData to success
      responseData.status = "success";
      responseData.message = MSG_SIGNUP_SUCCESS;
      responseData.data = user;
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
        mobile: parseInt(mobile),
        role: userType,
        address,
      });
      if (!isUserEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      //
      const isCandidateEntrySuccess = await createCandidate({
        uid,
        dob,
        experience: parseInt(experience),
        highestEducation,
      });
      if (!isCandidateEntrySuccess) throw Error(MSG_INTERNAL_ERROR);

      // changing responseData to success
      responseData.status = "success";
      responseData.message = MSG_SIGNUP_SUCCESS;
      responseData.data = user;
    }
  } catch (error) {
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
};

const login = async (req, res) => {
  const responseData = {
    status: "failed",
    message: MSG_DATA_INSUFFICIENT_ERROR,
  };

  try {
    const { email, password } = req.body;
    if (![email, password].every((e) => e)) {
      throw new Error(MSG_DATA_INSUFFICIENT_ERROR);
    }

    const query = `SELECT * FROM Account
    WHERE email = '${email}'`;

    const user = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        // id = result.insertId;
        resolve(result[0]);
      });
    });

    if (!user) throw Error(MSG_INVALID_CREDS);
    const isUserValid = isPasswordValid(password, user.password);
    if (!isUserValid) throw Error(MSG_INVALID_CREDS);

    responseData.status = "success";
    responseData.message = MSG_LOGIN_SUCCESS;
    responseData.data = {
      token: user.token,
      uid: user.uid,
    };

    console.log(responseData.data);
  } catch (error) {
    responseData.status = "failed";
    responseData.message = error.message;
  } finally {
    res
      .cookie("token", responseData?.data?.token, {
        httpOnly: true,
      })
      .json(responseData);
  }
};

const logout = (req, res) => {
  const responseData = {
    status: "failed",
  };

  try {
    res.clearCookie("token").json({ message: "Successfully signed out!" });
  } catch (error) {
    res.json(responseData);
  }
};

module.exports = { register, login, logout };
