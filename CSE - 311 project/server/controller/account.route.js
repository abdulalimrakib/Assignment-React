//

const router = require("express").Router();
const tokenGenerator = require("rand-token");

const createAccount = require("../model/account");

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

    // if (!user) console.log(MSG_DATA_INSUFFICIENT_ERROR);
    if (!user) throw new Error(MSG_DATA_INSUFFICIENT_ERROR);

    const { firstName, lastName, email, userType, mobile, address, password } =
      user;
    if (
      ![firstName, lastName, email, password, userType, mobile, address].every(
        (e) => e
      )
    ) {
    //   console.log(MSG_DATA_INSUFFICIENT_ERROR);
        throw new Error(MSG_DATA_INSUFFICIENT_ERROR);
    }

    const token = tokenGenerator.generate(10);
    const hashedPassword = await getHashedPassword(password);

    // if (!hashedPassword) console.log(MSG_INTERNAL_ERROR);
    if (!hashedPassword) throw new Error(MSG_INTERNAL_ERROR);

    const uid = await createAccount({ email, password: hashedPassword, token });

    // if (!uid) console.log(MSG_DUPLICATE_EMAIL_ERROR);
    if (!uid) throw new Error(MSG_DUPLICATE_EMAIL_ERROR);

    responseData.status = "success";
    responseData.message = MSG_SIGNUP_SUCCESS;
  } catch (error) {
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
});

module.exports = router;
