const router = require("express").Router();

const userRoutes = require("./userRoutes");
const postRouter = require("./postRoute");

router.use("/users", userRoutes);
router.use("posts", postRouter);

module.exports = router;
