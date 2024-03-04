const { login, create } = require("../controllers/car.controller");
const router = require("express").Router();

router.post("/login", login);
router.post("/create", create);

module.exports = router;
