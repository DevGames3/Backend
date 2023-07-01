const express = require("express");
const { validateToken } = require("../middleware/validateToken");
const {
  userRegister,
  userLogin,
  userMe,
  userMeEdit,
  userLogout,
  allUsers,
  adminAccessToUser,
  adminDeleteAUser,
} = require("../controllers/users");

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.put("/me/edit", validateToken, userMeEdit);

router.post("/admin", validateToken, allUsers);

router.put("/admin/access/:id", validateToken, adminAccessToUser);

router.post("/admin/delete/:id", validateToken, adminDeleteAUser);

module.exports = router;
